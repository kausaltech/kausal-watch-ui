/* istanbul ignore file */
import type { NextRequest, NextResponse } from 'next/server';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import * as Sentry from '@sentry/nextjs';
import type { NextAuthRequest } from 'next-auth/lib';
import type { Logger } from 'pino';

import type { ApolloClientType } from '@common/apollo';
import { createSentryLink, logOperationLink } from '@common/apollo/links';
import { FORWARDED_HEADER, WILDCARD_DOMAINS_HEADER } from '@common/constants/headers.mjs';
import { getWatchGraphQLUrl, getWildcardDomains, isLocalDev } from '@common/env';
import { getClientIP } from '@common/utils';
import LRUCache from '@common/utils/lru-cache';

import type {
  GetPlansByHostnameQuery,
  GetPlansByHostnameQueryVariables,
} from '@/common/__generated__/graphql';
import { PublicationStatus } from '@/common/__generated__/graphql';
import possibleTypes from '@/common/__generated__/possible_types.json';
import { GET_PLANS_BY_HOSTNAME } from '@/queries/get-plans';

import { stripSlashes } from './urls';

const BASIC_AUTH_ENV_VARIABLE = 'BASIC_AUTH_FOR_HOSTNAMES';

type PlanForHostname = NonNullable<GetPlansByHostnameQuery['plansForHostname']>[0];

export type PlanFromPlansQuery = PlanForHostname & { __typename: 'Plan' };

export function getSearchParamsString(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();

  return searchParams.length > 0 ? `?${searchParams}` : '';
}

export const isRestrictedPlan = (plan: PlanForHostname) =>
  plan?.__typename === 'RestrictedPlanNode';

const isPlan = (plan: PlanForHostname) => plan?.__typename === 'Plan' || isRestrictedPlan(plan);

export const isPlanPublished = (plan: PlanFromPlansQuery) =>
  !plan.domain?.status || // No status indicates the plan is published
  plan.domain.status === PublicationStatus.Published;

export function getParsedPlan(
  possiblePlans: string[],
  plans: PlanFromPlansQuery[]
): PlanFromPlansQuery | undefined {
  // If only one plan exists return that
  if (plans.length === 1 && isPlan(plans[0])) {
    return plans[0];
  }

  // Find and return the plan associated with the plan in the pathname
  const plan = plans.find(
    (plan) =>
      isPlan(plan) &&
      plan.domains?.find(
        (domain) => domain?.basePath && possiblePlans.includes(stripSlashes(domain.basePath))
      )
  );

  if (plan) {
    return plan;
  }

  // If no plan is found by path, return the default plan
  return (
    plans.find(
      (plan) => isPlan(plan) && plan.domains?.find((domain) => domain?.basePath === null)
    ) ?? undefined
  );
}

export function getParsedLocale(localePossibilities: string[], plan: PlanFromPlansQuery) {
  const locale = [plan.primaryLanguage, ...(plan.otherLanguages ?? [])].find((locale) =>
    localePossibilities
      .map((possibleLocale) => possibleLocale.toLowerCase())
      .includes(locale.toLowerCase())
  );

  const isCaseInvalid =
    !!locale &&
    !localePossibilities.includes(locale) &&
    localePossibilities.map((locale) => locale.toLowerCase()).includes(locale.toLowerCase());

  return { parsedLocale: locale || plan.primaryLanguage, isCaseInvalid };
}

function getAuthenticationForPlan(hostname: string):
  | {
      username: string;
      password: string;
    }
  | undefined {
  const authConfig = process.env[BASIC_AUTH_ENV_VARIABLE];

  if (!authConfig || authConfig.trim().length === 0) {
    return undefined;
  }

  const planAuthConfig = authConfig
    .split(',')
    .find((authForPlan) => authForPlan.startsWith(`${hostname}:`));

  if (!planAuthConfig) {
    return undefined;
  }

  const [_authHostname, username, password] = planAuthConfig.split(':');

  return { username, password };
}

export function isAuthenticated(request: NextRequest, hostname: string) {
  const authConfig = getAuthenticationForPlan(hostname);

  if (!authConfig) {
    return true;
  }

  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [username, password] = Buffer.from(authValue, 'base64').toString('utf-8').split(':');

    if (username === authConfig.username && password === authConfig.password) {
      return true;
    }
  }

  return false;
}

/**
 * We can't be sure of the order of locale and plan ID segments in the path because:
 * - The default locale is optional
 * - Legacy paths followed the pattern /<plan-id>/<locale>/ but now locale is always the root segment
 *
 * So we test the first two path segments against plan data to get the exact locale and plan ID
 */
export function getLocaleAndPlan(pathname: string, plans: PlanForHostname[]) {
  // Slice the first two segments of the pathname, e.g. '/en/plan-id/foo' --> ['en', 'plan-id']
  const possibleLocaleAndPlan = stripSlashes(pathname).split('/').slice(0, 2);

  const parsedPlan = getParsedPlan(
    possibleLocaleAndPlan,
    plans.filter((plan): plan is PlanFromPlansQuery => isPlan(plan))
  );

  if (!parsedPlan) {
    return { parsedPlan: undefined, parsedLocale: undefined };
  }

  const { parsedLocale, isCaseInvalid } = getParsedLocale(possibleLocaleAndPlan, parsedPlan);

  return { parsedPlan, parsedLocale, isLocaleCaseInvalid: isCaseInvalid };
}

/**
 * Legacy paths followed the pattern "/<plan-id>/<locale>/", new paths always
 * contain the locale at the root i.e. "/<locale>/<plan-id>/". Test for legacy
 * paths so that we can support old links.
 */
export function isLegacyPathStructure(
  pathname: string,
  locale: string,
  plan: NonNullable<PlanForHostname>
) {
  if (!plan.domain?.basePath) {
    return false;
  }

  return new RegExp(`/${stripSlashes(plan.domain.basePath)}/${locale}(/|$)`, 'i').test(pathname);
}

export function convertPathnameFromLegacy(
  pathname: string,
  parsedLocale: string,
  parsedPlan: NonNullable<PlanForHostname>
) {
  // Get everything after the plan and locale parts of the pathname
  const slug = stripSlashes(pathname).split('/').slice(2).join('/');

  if (!parsedPlan.domain?.basePath) {
    return `/${parsedLocale}/${slug}`;
  }

  return `/${parsedLocale}/${parsedPlan.domain?.basePath}/${slug}`;
}

export function convertPathnameFromInvalidLocaleCasing(pathname: string, locale: string) {
  return (
    pathname
      .split('/')
      // Replace incorrect locale casing with the correctly cased locale
      .map((path, i) =>
        (i === 0 || i === 1) && path.toLowerCase() === locale.toLowerCase() ? locale : path
      )
      .join('/')
  );
}

export function rewriteUrl(
  request: NextRequest,
  response: NextResponse,
  hostUrl: URL,
  rewrittenUrl: URL,
  plan: string
) {
  // The user facing URL, provided via the x-url header to be used in metadata
  const url = new URL(request.nextUrl.pathname, hostUrl).toString();

  response.headers.set('x-url', url);
  response.headers.set('x-middleware-rewrite', rewrittenUrl.toString());

  /**
   * Support reading plan details from headers while creating the RSC Apollo client. This
   * allows us to add cache headers to GraphQL requests from RSC queries.
   */
  response.headers.set('x-plan-domain', hostUrl.hostname);
  response.headers.set('x-plan-identifier', plan);

  return response;
}

function createApolloClient(req: NextAuthRequest, logger: Logger) {
  const uri = getWatchGraphQLUrl();
  const httpLink = new HttpLink({
    uri,
    credentials: 'include',
    fetchOptions: {
      referrerPolicy: 'unsafe-url',
    },
  });

  const client: ApolloClientType = new ApolloClient({
    ssrMode: false,
    link: ApolloLink.from([
      logOperationLink,
      createSentryLink(uri),
      new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }) => {
          const ctxHeaders: Record<string, string> = {};
          const clientIp = getClientIP(req);
          if (clientIp) {
            headers[FORWARDED_HEADER] = `for="${clientIp}"`;
          }
          const wildcardDomains = getWildcardDomains();
          if (wildcardDomains.length > 0) {
            ctxHeaders[WILDCARD_DOMAINS_HEADER] = wildcardDomains.join(',');
          }
          if (req.auth?.idToken) {
            ctxHeaders['Authorization'] = `Bearer ${req.auth.idToken}`;
          }
          const newHeaders = {
            ...headers,
            ...ctxHeaders,
          };
          return {
            headers: newHeaders,
          };
        });
        return forward(operation);
      }),
      httpLink,
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Plan: {
          /**
           * Prevent cache conflicts between multi-plan plans when visited via basePath
           * (e.g. umbrella.city.gov/x-plan) vs a dedicated plan subdomain (e.g. x-plan.city.gov/)
           */
          keyFields: ['id', 'domain', ['hostname']],
        },
      },
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    defaultContext: {
      logger: logger,
    },
  });
  return client;
}

async function queryPlansForHostname(req: NextAuthRequest, logger: Logger, hostname: string) {
  const apolloClient = createApolloClient(req, logger);
  try {
    const { data, error } = await apolloClient.query<
      GetPlansByHostnameQuery,
      GetPlansByHostnameQueryVariables
    >({
      query: GET_PLANS_BY_HOSTNAME,
      variables: { hostname },
      fetchPolicy: 'no-cache',
    });
    return { plans: error ? null : data?.plansForHostname || [], error };
  } catch (error) {
    Sentry.captureException(error);
    return { plans: null, error: error as Error };
  }
}

const DEFAULT_TTL = 30 * 60 * 1000;

const hostnamePlanCache = new LRUCache<string, PlanForHostname[]>();

export async function getPlansForHostname(req: NextAuthRequest, logger: Logger, hostname: string) {
  if (false && isLocalDev) {
    hostnamePlanCache.print((plans) =>
      plans
        .map((plan) => `${plan!.__typename} ${plan!.__typename == 'Plan' ? plan!.id : ''}`)
        .join(', ')
    );
  }
  const cacheEntry = hostnamePlanCache.getMetadata(hostname);
  if (cacheEntry) {
    const now = Date.now();
    const age = now - cacheEntry.createdAt;
    if (age < cacheEntry.ttl) {
      return { plans: cacheEntry.value as PlanForHostname[], error: null };
    }
  }
  const { plans, error } = await queryPlansForHostname(req, logger, hostname);
  if (plans) {
    hostnamePlanCache.set(hostname, plans, undefined, DEFAULT_TTL);
    return { plans, error: null };
  }
  return { plans: null, error };
}

export function clearHostnameCache() {
  hostnamePlanCache.clearAll();
}
