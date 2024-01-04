import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import possibleTypes from './common/__generated__/possible_types.json';
import { gqlUrl } from './lib/api.utils';
import { GET_PLANS_BY_HOSTNAME } from './lib/queries/get-plans';
import { GetPlansByHostnameQuery } from './common/__generated__/graphql';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
    possibleTypes: possibleTypes.possibleTypes,
  }),
  link: new HttpLink({
    uri: gqlUrl,
    fetchOptions: { cache: 'no-store' },
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
    '/((?!api/|_next/|_static/|static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

type PlanFromPlansQuery = NonNullable<
  GetPlansByHostnameQuery['plansForHostname']
>[0] & { __typename: 'Plan' };

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

function getParsedPlan(
  possiblePlans: string[],
  plans: PlanFromPlansQuery[]
): PlanFromPlansQuery | undefined {
  if (plans.length === 1 && plans[0]?.__typename === 'Plan') {
    return plans[0];
  }

  return plans.find(
    (plan) =>
      (plan?.__typename === 'Plan' &&
        plan.domains?.find(
          (domain) =>
            domain?.basePath &&
            possiblePlans.includes(stripSlashes(domain.basePath))
        )) ??
      plans.find(
        (plan) =>
          plan?.__typename === 'Plan' &&
          plan.domains?.find((domain) => domain?.basePath === null)
      ) ??
      undefined
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

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = request.nextUrl;

  const host = request.headers.get('host');

  // Get hostname of request (e.g. demo.kausal.tech, demo.localhost:3000)
  const hostname = request.headers
    .get('host')!
    .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    .replace(
      'kausal-watch-ui.vercel.app',
      `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    );

  console.log(`
      > Middleware
        > host: ${request.headers.get('host')}
        > hostname: ${hostname}
    `);

  // Rewrite root application to `sunnydale` tenant
  if (
    hostname === 'localhost:3000' ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.redirect(new URL(`http://sunnydale.${host}`));
  }

  const { data, error } = await apolloClient.query<GetPlansByHostnameQuery>({
    query: GET_PLANS_BY_HOSTNAME,
    variables: { hostname },
    fetchPolicy: 'no-cache',
  });

  console.log('> Middleware > plans', data.plansForHostname);

  if (error || !data.plansForHostname?.length) {
    // TODO: Redirect to 500
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const [locale, plan, rest] = stripSlashes(pathname).split('/');

  console.log(`
  > Middleware
    > ${url}
      > pathname: ${pathname}
      > locale: ${locale}
      > plan: ${plan}
      > rest: ${rest}
  `);

  const parsedPlan = getParsedPlan(
    [plan, locale],
    data.plansForHostname.filter(
      (plan): plan is PlanFromPlansQuery => plan?.__typename === 'Plan'
    )
  );

  console.log(`    >> parsedPlan: ${parsedPlan?.id}`);

  if (!parsedPlan) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const parsedLocale = getParsedLocale(locale, parsedPlan);

  console.log(`    >> parsedLocale: ${parsedLocale}`);

  const handleI18nRouting = createIntlMiddleware({
    locales: [parsedPlan.primaryLanguage, ...(parsedPlan.otherLanguages ?? [])],
    defaultLocale: parsedPlan.primaryLanguage,
  });

  const response = handleI18nRouting(request);

  // if (hasSinglePlan) {
  //   const planId = getPlanId(data.plansForHostname![0]);

  //   if (plan !== planId) {
  //     request.nextUrl.pathname = `/${locale}/${planId}/${rest}`;
  //     console.log(
  //       `    >> Add plan to next pathname: ${request.nextUrl.pathname}`
  //     );
  //   }
  // }

  const searchParams = request.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  const strippedPath = stripLocaleAndPlan(parsedLocale, parsedPlan, path);

  if (response) {
    const url = new URL(
      `/${hostname}/${parsedLocale}/${parsedPlan.id}/${strippedPath}`,
      request.url
    );

    console.log(`    >> x-middleware-rewrite: ${url.toString()}`);

    response.headers.set('x-middleware-rewrite', url.toString());
  }

  return response;

  // rewrite everything else to `/[domain]/ dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));
}
