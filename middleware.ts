import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';

import possibleTypes from './common/__generated__/possible_types.json';
import { GET_PLANS_BY_HOSTNAME } from './queries/get-plans';
import {
  GetPlansByHostnameQuery,
  GetPlansByHostnameQueryVariables,
} from './common/__generated__/graphql';
import { stripLocaleAndPlan } from './utils/urls';
import { UNPUBLISHED_PATH } from './constants/routes';
import {
  getHttpLink,
  operationEnd,
  operationStart,
} from './utils/apollo.utils';
import { captureException } from '@sentry/nextjs';
import {
  convertPathnameFromInvalidLocaleCasing,
  convertPathnameFromLegacy,
  getLocaleAndPlan,
  getSearchParamsString,
  isAuthenticated,
  isLegacyPathStructure,
  isPlanPublished,
  isRestrictedPlan,
  rewriteUrl,
} from './utils/middleware.utils';
import { tryRequest } from './utils/api.utils';
import { setContext } from '@apollo/client/link/context';
import { wildcardDomains } from './common/environment';

const httpHeadersMiddleware = setContext(
  async (_, { headers: initialHeaders = {} }) => {
    if (!wildcardDomains.length) {
      return {
        headers: initialHeaders,
      };
    }
    return {
      headers: {
        ...initialHeaders,
        //'x-wildcard-domains': wildcardDomains.join(','),
      },
    };
  }
);

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
  link: from([
    operationStart,
    operationEnd,
    httpHeadersMiddleware,
    getHttpLink(),
  ]),
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

  // Redirect the root application locally to `sunnydale` tenant
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

  const { data, error } = await tryRequest(
    apolloClient.query<
      GetPlansByHostnameQuery,
      GetPlansByHostnameQueryVariables
    >({
      query: GET_PLANS_BY_HOSTNAME,
      variables: { hostname },
    })
  );
  if (error || !data?.plansForHostname?.length) {
    if (error) {
      captureException(error, { extra: { hostname, ...error } });
    }

    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const { parsedLocale, parsedPlan, isLocaleCaseInvalid } = getLocaleAndPlan(
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

  if (isLocaleCaseInvalid) {
    const newPathname = convertPathnameFromInvalidLocaleCasing(
      pathname,
      parsedLocale
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
    // Pass the status message to the unpublished page as search params
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

    return rewriteUrl(
      request,
      response,
      hostUrl,
      rewrittenUrl,
      parsedPlan.identifier
    );
  }

  const searchParams = getSearchParamsString(request);
  const strippedPath = stripLocaleAndPlan(parsedPlan, parsedLocale, pathname);
  const rewrittenUrl = new URL(
    `/${hostname}/${parsedLocale}/${parsedPlan.id}/${strippedPath}${searchParams}`,
    request.url
  );

  return rewriteUrl(
    request,
    response,
    hostUrl,
    rewrittenUrl,
    parsedPlan.identifier
  );
}
