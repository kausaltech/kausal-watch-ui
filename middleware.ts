import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';

import possibleTypes from './common/__generated__/possible_types.json';
import { GET_PLANS_BY_HOSTNAME } from './queries/get-plans';
import {
  GetPlansByHostnameQuery,
  GetPlansByHostnameQueryVariables,
  PublicationStatus,
} from './common/__generated__/graphql';
import { stripLocaleAndPlan, stripSlashes } from './utils/urls';
import { UNPUBLISHED_PATH } from './constants/routes';
import { httpLink, operationEnd, operationStart } from './utils/apollo.utils';
import { captureException } from '@sentry/nextjs';

const BASIC_AUTH_ENV_VARIABLE = 'BASIC_AUTH_FOR_HOSTNAMES';

const apolloClient = new ApolloClient({
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
  link: from([operationStart, operationEnd, httpLink]),
});

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public
     */
    '/((?!api/|_next/|_static/|static/|[\\w-]+\\.\\w+).*)',
  ],
};

type PlanForHostname = NonNullable<
  GetPlansByHostnameQuery['plansForHostname']
>[0];

type PlanFromPlansQuery = PlanForHostname & { __typename: 'Plan' };

function getSearchParamsString(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();

  return searchParams.length > 0 ? `?${searchParams}` : '';
}

const isRestrictedPlan = (plan: PlanForHostname) =>
  plan?.__typename === 'RestrictedPlanNode';

const isPlan = (plan: PlanForHostname) =>
  plan?.__typename === 'Plan' || isRestrictedPlan(plan);

const isPlanPublished = (plan: PlanFromPlansQuery) =>
  !plan.domain?.status || // No status indicates the plan is published
  plan.domain.status === PublicationStatus.Published;

function getParsedPlan(
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
        (domain) =>
          domain?.basePath &&
          possiblePlans.includes(stripSlashes(domain.basePath))
      )
  );

  if (plan) {
    return plan;
  }

  // If no plan is found by path, return the default plan
  return (
    plans.find(
      (plan) =>
        isPlan(plan) &&
        plan.domains?.find((domain) => domain?.basePath === null)
    ) ?? undefined
  );
}

function getParsedLocale(
  localePossibilities: string[],
  plan: PlanFromPlansQuery
) {
  const locale = localePossibilities.find(
    (possibleLocale) =>
      plan.primaryLanguage === possibleLocale ||
      plan.otherLanguages?.includes(possibleLocale)
  );

  return locale || plan.primaryLanguage;
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

  const [authHostname, username, password] = planAuthConfig.split(':');

  return { username, password };
}

function isAuthenticated(request: NextRequest, hostname: string) {
  const authConfig = getAuthenticationForPlan(hostname);

  if (!authConfig) {
    return true;
  }

  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [username, password] = Buffer.from(authValue, 'base64')
      .toString('utf-8')
      .split(':');

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
function getLocaleAndPlan(pathname: string, plans: PlanForHostname[]) {
  // Slice the first two segments of the pathname, e.g. '/en/plan-id/foo' --> ['en', 'plan-id']
  const possibleLocaleAndPlan = stripSlashes(pathname).split('/').slice(0, 2);

  const parsedPlan = getParsedPlan(
    possibleLocaleAndPlan,
    plans.filter((plan): plan is PlanFromPlansQuery => isPlan(plan))
  );

  if (!parsedPlan) {
    return { parsedPlan: undefined, parsedLocale: undefined };
  }

  const parsedLocale = getParsedLocale(possibleLocaleAndPlan, parsedPlan);

  return { parsedPlan, parsedLocale };
}

/**
 * Legacy paths followed the pattern "/<plan-id>/<locale>/", new paths always
 * contain the locale at the root i.e. "/<locale>/<plan-id>/". Test for legacy
 * paths so that we can support old links.
 */
function isLegacyPathStructure(
  pathname: string,
  locale: string,
  plan: NonNullable<PlanForHostname>
) {
  if (!plan.domain?.basePath) {
    return false;
  }

  return new RegExp(
    `/${stripSlashes(plan.domain.basePath)}/${locale}(/|$)`
  ).test(pathname);
}

function convertPathnameFromLegacy(
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

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = request.nextUrl;

  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto');
  const hostUrl = new URL(`${protocol}://${host}`);
  const hostname = hostUrl.hostname;

  console.log(`
  ⚙ Middleware ${url}
    ↝ protocol: ${protocol}
    ↝ pathname: ${pathname}
    ↝ hostname: ${hostname}
  `);

  // Rewrite root application to `sunnydale` tenant
  if (hostname === 'localhost') {
    return NextResponse.redirect(new URL(`http://sunnydale.${host}`));
  }

  if (pathname === '/_health') {
    url.pathname = '/api/health';

    return NextResponse.rewrite(url);
  }

  if (!isAuthenticated(request, hostname)) {
    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
  }

  const { data, error } = await apolloClient.query<
    GetPlansByHostnameQuery,
    GetPlansByHostnameQueryVariables
  >({
    query: GET_PLANS_BY_HOSTNAME,
    variables: { hostname },
  });

  if (error || !data.plansForHostname?.length) {
    if (error) {
      captureException(error);
    }

    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const { parsedLocale, parsedPlan } = getLocaleAndPlan(
    pathname,
    data.plansForHostname
  );

  if (!parsedPlan) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  if (isLegacyPathStructure(pathname, parsedLocale, parsedPlan)) {
    const newPathname = convertPathnameFromLegacy(
      pathname,
      parsedLocale,
      parsedPlan
    );

    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  const handleI18nRouting = createIntlMiddleware({
    locales: [parsedPlan.primaryLanguage, ...(parsedPlan.otherLanguages ?? [])],
    defaultLocale: parsedPlan.primaryLanguage,
    localePrefix: 'as-needed',
    localeDetection: false,
  });

  const response = handleI18nRouting(request);

  if (isRestrictedPlan(parsedPlan) || !isPlanPublished(parsedPlan)) {
    const message = parsedPlan.domain?.statusMessage;
    const queryParams = message
      ? `?${new URLSearchParams({
          message,
        }).toString()}`
      : '';
    const rewrittenUrl = new URL(
      `/${hostname}/${parsedLocale}${UNPUBLISHED_PATH}${queryParams}`,
      request.url
    );

    return rewriteUrl(request, response, hostUrl, rewrittenUrl);
  }

  const searchParams = getSearchParamsString(request);
  const strippedPath = stripLocaleAndPlan(parsedPlan, parsedLocale, pathname);
  const rewrittenUrl = new URL(
    `/${hostname}/${parsedLocale}/${parsedPlan.id}/${strippedPath}${searchParams}`,
    request.url
  );

  return rewriteUrl(request, response, hostUrl, rewrittenUrl);
}

function rewriteUrl(
  request: NextRequest,
  response: NextResponse,
  hostUrl: URL,
  rewrittenUrl: URL
) {
  // The user facing URL, provided via the x-url header to be used in metadata
  const url = new URL(request.nextUrl.pathname, hostUrl).toString();

  response.headers.set('x-url', url);
  response.headers.set('x-middleware-rewrite', rewrittenUrl.toString());

  return response;
}
