import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import possibleTypes from './common/__generated__/possible_types.json';
import { GET_PLANS_BY_HOSTNAME } from './lib/queries/get-plans';
import {
  GetPlansByHostnameQuery,
  GetPlansByHostnameQueryVariables,
} from './common/__generated__/graphql';
import { gqlUrl } from './common/environment';

const BASIC_AUTH_ENV_VARIABLE = 'BASIC_AUTH_FOR_HOSTNAMES';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
    possibleTypes: possibleTypes.possibleTypes,
  }),
  link: new HttpLink({
    uri: gqlUrl,
    fetchOptions: { next: { revalidate: 3600 } },
  }),
});

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|static/|sitemap|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

type PlanForHostname = NonNullable<
  GetPlansByHostnameQuery['plansForHostname']
>[0];

type PlanFromPlansQuery = PlanForHostname & { __typename: 'Plan' };

function stripSlashes(path: string) {
  return path.replace(/^\/|\/$/g, '');
}

function stripLocaleAndPlan(
  locale: string,
  plan: PlanFromPlansQuery,
  pathname: string
) {
  return stripSlashes(pathname)
    .split('/')
    .filter((part, i) => {
      const isLocalePosition = i === 0;
      const isPlanPosition = i === 0 || i === 1;

      return !(
        (part === locale && isLocalePosition) ||
        (plan.domains?.length &&
          plan.domains.some(
            (domain) =>
              domain?.basePath && stripSlashes(domain.basePath) === part
          ) &&
          isPlanPosition)
      );
    })
    .join('/');
}

const isPlan = (plan: PlanForHostname) => plan?.__typename === 'Plan';

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

function getParsedLocale(possibleLocale: string, plan: PlanFromPlansQuery) {
  if (
    plan.primaryLanguage === possibleLocale ||
    plan.otherLanguages?.includes(possibleLocale)
  ) {
    return possibleLocale;
  }

  return plan.primaryLanguage;
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

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = request.nextUrl;

  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto');
  const hostname = new URL(`${protocol}://${host}`).hostname;

  console.log(`
    > Middleware
      > ${url}
        > protocol: ${protocol}
        > pathname: ${pathname}
        > hostname: ${hostname}
      > env
        > NODE_ENV: ${process.env.NODE_ENV}
        > NEXT_PUBLIC_DEPLOYMENT_TYPE: ${process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE}
        > DEPLOYMENT_TYPE (legacy): ${process.env.DEPLOYMENT_TYPE}
        > NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}
        > NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}
        > APLANS_API_BASE_URL (legacy): ${process.env.APLANS_API_BASE_URL}
  `);

  // Rewrite root application to `sunnydale` tenant
  if (hostname === 'localhost') {
    return NextResponse.redirect(new URL(`http://sunnydale.${host}`));
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
    // TODO: Log errors
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const [locale, plan] = stripSlashes(pathname).split('/');

  const parsedPlan = getParsedPlan(
    [plan, locale],
    data.plansForHostname.filter((plan): plan is PlanFromPlansQuery =>
      isPlan(plan)
    )
  );

  if (!parsedPlan) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const parsedLocale = getParsedLocale(locale, parsedPlan);

  const handleI18nRouting = createIntlMiddleware({
    locales: [parsedPlan.primaryLanguage, ...(parsedPlan.otherLanguages ?? [])],
    defaultLocale: parsedPlan.primaryLanguage,
  });

  const response = handleI18nRouting(request);

  const searchParams = request.nextUrl.searchParams.toString();

  // Get the pathname of the request (e.g. /, /about, /actions/XY1?foo=bar)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  const strippedPath = stripLocaleAndPlan(parsedLocale, parsedPlan, path);

  if (response) {
    const url = new URL(
      `/${hostname}/${parsedLocale}/${parsedPlan.id}/${strippedPath}`,
      request.url
    );

    response.headers.set('x-url', request.url.toString());
    response.headers.set('x-middleware-rewrite', url.toString());
  }

  return response;
}
