/* istanbul ignore file */
import type { NextRequest, NextResponse } from 'next/server';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import * as Sentry from '@sentry/nextjs';
import type { NextAuthRequest } from 'next-auth';
import type { Logger } from 'pino';

import type { ApolloClientType } from '@common/apollo';
import { createSentryLink, logOperationLink } from '@common/apollo/links';
import { FORWARDED_HEADER, WILDCARD_DOMAINS_HEADER } from '@common/constants/headers.mjs';
import {
  getAssetPrefix,
  getDeploymentType,
  getSentryDsn,
  getSentryRelease,
  getWatchBackendUrl,
  getWatchGraphQLUrl,
  getWildcardDomains,
} from '@common/env';
import { getClientIP } from '@common/utils';
import LRUCache from '@common/utils/lru-cache';

import type { PlansByHostnameQuery } from '@/common/__generated__/graphql';
import { PlanDomainStatus } from '@/common/__generated__/graphql';
import possibleTypes from '@/common/__generated__/possible_types.json';
import { GET_PLANS_BY_HOSTNAME } from '@/queries/get-plans';

import { stripSlashes } from './urls';

const BASIC_AUTH_ENV_VARIABLE = 'BASIC_AUTH_FOR_HOSTNAMES';

type PlanForHostname = NonNullable<PlansByHostnameQuery['plansForHostname']>[0];

export type PlanFromPlansQuery = PlanForHostname;
type AvailablePlan = Extract<PlanForHostname, { __typename: 'Plan' }>;

export function getSearchParamsString(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();

  return searchParams.length > 0 ? `?${searchParams}` : '';
}

export const isRestrictedPlan = (plan: PlanForHostname) =>
  plan?.__typename === 'RestrictedPlanNode';

const isPlan = (plan: PlanForHostname) => plan?.__typename === 'Plan' || isRestrictedPlan(plan);

const KNOWN_STATUSES: string[] = Object.values(PlanDomainStatus);

/**
 * What the backend says this hostname serves the current viewer.
 *
 * The backend folds the plan's visibility, the viewer's access, whether the site has launched
 * and whether the hostname is a production or preview surface into this one answer, and derives
 * the plan's `__typename` from the same value. Gating on anything else here is how a production
 * domain once served a plan nobody had published.
 *
 * A backend that predates this vocabulary answers with the old publication statuses instead
 * (PUBLISHED, UNPUBLISHED, SCHEDULED). Treating an unrecognised value as authoritative would send
 * every site to the placeholder, so we fall back to `__typename`, which is what this proxy gated
 * on before. That keeps a backend rollback safe, but it is a degraded answer, so the backend ships
 * first. Remove the fallback once no deployed backend answers with the old values.
 */
export const getDomainStatus = (plan: PlanFromPlansQuery): PlanDomainStatus => {
  const status = plan.domain?.status;

  if (status && KNOWN_STATUSES.includes(status)) {
    return status;
  }

  if (plan.__typename === 'Plan') {
    return PlanDomainStatus.Available;
  }

  // Restricted, and an older backend cannot tell us whether signing in would help. Offering it
  // where it cannot help is a dead end; withholding it where it could strands someone who has
  // access, so offer it.
  return PlanDomainStatus.SignInRequired;
};

/**
 * Whether this viewer is served the plan's site at this hostname.
 *
 * Narrowing to the full `Plan` here relies on a backend guarantee rather than on the response
 * shape: `PlanInterface.resolve_type` returns `PlanNode` exactly when the status is `AVAILABLE`,
 * both derived from one call, and `test_graphql_domain_status.py` asserts the two agree across
 * the whole matrix. Checking `__typename` here as well would put the frontend back in the
 * business of combining two signals, which is how an unpublished plan once reached production.
 */
export const isPlanAvailable = (plan: PlanFromPlansQuery): plan is AvailablePlan =>
  getDomainStatus(plan) === PlanDomainStatus.Available;

/** The optional message the backend attaches to a hostname that is not serving its site. */
export const getStatusMessage = (plan: PlanFromPlansQuery): string | undefined =>
  plan.domain?.statusMessage ?? plan.statusMessage ?? undefined;

export type StalePlanResolution =
  | { kind: 'unavailable'; status: PlanDomainStatus; message: string | undefined }
  | { kind: 'not-found' }
  | { kind: 'available' };

/**
 * What a hostname serves, according to a lookup made after the proxy's answer turned out stale.
 *
 * The proxy caches anonymous lookups, so a plan that stops being served — made internal, or its
 * site taken down — keeps being routed to its pages for the rest of the cache lifetime, and those
 * pages then find no plan. Given a fresh lookup, this names what the proxy would have done
 * instead: rewrite to a placeholder, or 404 a hostname that no longer resolves a plan. A fresh
 * lookup that still says the site is available cannot explain the missing plan.
 */
export function resolveStalePlan(
  pathname: string,
  plans: PlanFromPlansQuery[]
): StalePlanResolution {
  const { parsedPlan } = getLocaleAndPlan(pathname, plans);

  if (!parsedPlan) {
    return { kind: 'not-found' };
  }
  if (isPlanAvailable(parsedPlan)) {
    return { kind: 'available' };
  }
  return {
    kind: 'unavailable',
    status: getDomainStatus(parsedPlan),
    message: getStatusMessage(parsedPlan),
  };
}

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
  const otherLanguages = 'otherLanguages' in plan ? plan.otherLanguages : [];
  const locale = [plan.primaryLanguage, ...otherLanguages].find((locale) =>
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
  plan: string | undefined
) {
  // The user facing URL, provided via the x-url header to be used in metadata
  const url = new URL(request.nextUrl.pathname, hostUrl).toString();

  response.headers.set('x-url', url);
  response.headers.set('x-middleware-rewrite', rewrittenUrl.toString());

  /**
   * Support reading plan details from headers while creating the RSC Apollo client. This
   * allows us to add cache headers to GraphQL requests from RSC queries.
   *
   * A restricted plan resolves no identifier. The header is then left out
   * rather than filled with a placeholder, because the RSC client would pass
   * the placeholder on as a cache header, which the backend rejects.
   */
  response.headers.set('x-plan-domain', hostUrl.hostname);

  if (plan) {
    response.headers.set('x-plan-identifier', plan);
  }

  return response;
}

const SECURITY_HEADERS: Record<string, string> = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

/*
 * The policy is built when this module loads, so a malformed environment value must not throw:
 * that would fail every request rather than leave one entry out of a header nothing enforces.
 */
const originOf = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
};

function securityReportUri(dsn: string, environment: string, release: string) {
  let parsed: URL;

  try {
    parsed = new URL(dsn);
  } catch {
    return undefined;
  }

  const { origin, username, pathname } = parsed;
  const segments = pathname.split('/').filter(Boolean);
  const projectId = segments.pop();
  const prefix = segments.length ? `/${segments.join('/')}` : '';

  if (!username || !projectId) {
    return undefined;
  }

  const params = new URLSearchParams({
    sentry_key: username,
    sentry_environment: environment,
    sentry_release: release,
  });

  return `${origin}${prefix}/api/${projectId}/security/?${params.toString()}`;
}

/*
 * Theme CSS imports webfonts from Adobe Typekit, so the host comes from theme data rather
 * than from the code. Enforcing a policy without it would leave those themes without their
 * webfonts.
 */
const TYPEKIT_HOSTS = ['https://use.typekit.net', 'https://p.typekit.net'];

/* The cartography block renders with Mapbox GL, which fetches styles, tiles and glyphs. */
const MAPBOX_HOSTS = ['https://api.mapbox.com', 'https://events.mapbox.com'];

/* Our own Matomo, which most plans report to. */
const ANALYTICS_HOST = 'https://ana.kausal.tech';

type ReportOnlyOptions = {
  dsn: string | undefined;
  assetPrefix: string;
  backendUrl: string;
  environment: string;
  release: string;
};

/*
 * Deliberately permissive on inline scripts and styles: without per-request nonces every
 * framework-emitted inline block would report, burying the thing worth learning, which is
 * which external hosts plans actually load from.
 */
export function buildReportOnlyPolicy({
  dsn,
  assetPrefix,
  backendUrl,
  environment,
  release,
}: ReportOnlyOptions) {
  const reportUri =
    dsn && environment !== 'ci' ? securityReportUri(dsn, environment, release) : undefined;

  if (!reportUri) {
    return undefined;
  }

  const sentryOrigin = new URL(reportUri).origin;
  const cdn = originOf(assetPrefix);
  /* Themes reference webfonts uploaded as documents on the backend, which differs per region. */
  const backendSources = [originOf(backendUrl)].filter((o) => o !== undefined);
  const withCdn = (...sources: string[]) => [...sources, cdn].filter(Boolean).join(' ');

  return [
    "default-src 'self'",
    `script-src ${withCdn("'self'", "'unsafe-inline'", "'unsafe-eval'", ANALYTICS_HOST)}`,
    `style-src ${withCdn("'self'", "'unsafe-inline'", ...TYPEKIT_HOSTS)}`,
    `font-src ${withCdn("'self'", 'data:', ...TYPEKIT_HOSTS, ...backendSources)}`,
    "img-src 'self' data: blob: https:",
    "worker-src 'self' blob:",
    `connect-src ${withCdn("'self'", sentryOrigin, ...MAPBOX_HOSTS, ANALYTICS_HOST, ...backendSources)}`,
    'frame-src https:',
    `report-uri ${reportUri}`,
  ].join('; ');
}

const REPORT_ONLY_POLICY = buildReportOnlyPolicy({
  dsn: getSentryDsn(),
  assetPrefix: getAssetPrefix(),
  backendUrl: getWatchBackendUrl(),
  environment: getDeploymentType(),
  release: getSentryRelease(),
});

/*
 * Decided from the rewritten path (`/root/<host>/<locale>/<plan>/<app path>`), because only
 * there have the plan's base path and the locale been stripped. An incoming path cannot tell
 * an embed view from a content page slugged `embed`: both go through the catch-all route.
 */
const isEmbedResponse = (response: Response) => {
  const rewrite = response.headers.get('x-middleware-rewrite');

  if (!rewrite) {
    return false;
  }

  let pathname: string;

  try {
    pathname = new URL(rewrite, 'http://n').pathname;
  } catch {
    return false;
  }

  const segments = pathname.split('/').slice(5);

  return segments[0] === 'embed' && /^v\d+$/.test(segments[1] ?? '');
};

/*
 * Keyed on how the request arrived, not on the build: the production image is also served
 * over plain HTTP (the e2e workflow), where asking browsers to upgrade would break assets.
 */
const isSecureRequest = (request: NextRequest) =>
  request.headers.get('x-forwarded-proto') === 'https' || request.nextUrl.protocol === 'https:';

export function applySecurityHeaders<R>(response: R, request: NextRequest): R {
  if (!(response instanceof Response)) {
    return response;
  }

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }

  const directives = isSecureRequest(request) ? ['upgrade-insecure-requests'] : [];

  if (!isEmbedResponse(response)) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    directives.unshift("frame-ancestors 'self'");
  }

  if (directives.length) {
    response.headers.set('Content-Security-Policy', directives.join('; '));
  }

  if (REPORT_ONLY_POLICY) {
    response.headers.set('Content-Security-Policy-Report-Only', REPORT_ONLY_POLICY);
  }

  return response;
}

function createApolloClient(req: NextAuthRequest, logger: Logger, skipAuth = false) {
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
          if (!skipAuth && req.auth?.idToken) {
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

async function queryPlansForHostname(
  req: NextAuthRequest,
  logger: Logger,
  hostname: string,
  skipAuth = false
) {
  const apolloClient = createApolloClient(req, logger, skipAuth);
  try {
    const { data, error } = await apolloClient.query({
      query: GET_PLANS_BY_HOSTNAME,
      variables: { hostname },
      fetchPolicy: 'no-cache',
    });
    return { plans: error ? null : (data?.plansForHostname ?? []), error };
  } catch (error) {
    Sentry.captureException(error);
    return { plans: null, error: error as Error };
  }
}

const DEFAULT_TTL = 5 * 60 * 1000;

/*
 * The proxy and the pages are bundled separately, so each loads its own copy of this module. The
 * cache is anchored on `globalThis` so that both copies hold the same one, which is what lets a
 * page evict an entry it has found to be stale.
 */
const HOSTNAME_PLAN_CACHE_KEY = Symbol.for('kausal-watch-ui.hostnamePlanCache');
type GlobalWithHostnameCache = typeof globalThis & {
  [HOSTNAME_PLAN_CACHE_KEY]?: LRUCache<string, PlanForHostname[]>;
};
const cacheHolder = globalThis as GlobalWithHostnameCache;
const hostnamePlanCache = (cacheHolder[HOSTNAME_PLAN_CACHE_KEY] ??= new LRUCache<
  string,
  PlanForHostname[]
>());

export function getCachedHostnamePlans(hostname: string): PlanForHostname[] | undefined {
  const cacheEntry = hostnamePlanCache.getMetadata(hostname);
  if (!cacheEntry) {
    return undefined;
  }
  if (Date.now() - cacheEntry.createdAt >= cacheEntry.ttl) {
    return undefined;
  }
  return cacheEntry.value as PlanForHostname[];
}

export function cacheHostnamePlans(hostname: string, plans: PlanForHostname[]) {
  hostnamePlanCache.set(hostname, plans, undefined, DEFAULT_TTL);
}

export function evictHostnamePlans(hostname: string) {
  hostnamePlanCache.delete(hostname);
}

export async function getPlansForHostname(
  req: NextAuthRequest,
  logger: Logger,
  hostname: string,
  skipAuth = false
) {
  const isUnauthenticatedRequest = !req.auth || skipAuth;

  if (isUnauthenticatedRequest) {
    const cachedPlans = getCachedHostnamePlans(hostname);
    if (cachedPlans) {
      return { plans: cachedPlans, error: null };
    }
  }
  const { plans, error } = await queryPlansForHostname(req, logger, hostname, skipAuth);
  if (plans) {
    if (isUnauthenticatedRequest) {
      cacheHostnamePlans(hostname, plans);
    }
    return { plans, error: null };
  }
  return { plans: null, error };
}

export function clearHostnameCache() {
  hostnamePlanCache.clearAll();
}
