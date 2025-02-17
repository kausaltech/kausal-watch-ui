import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import type { NextAuthRequest } from 'next-auth/lib';
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

import { auth } from './config/auth';

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
  link: from([operationStart, operationEnd, getHttpLink()]),
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

const clearCacheIfTimedOut = (function handleCacheTTL() {
  let timeCached: number | null = null;
  const THIRTY_MINS = 30 * 60 * 1000;

  return () => {
    if (!timeCached) {
      timeCached = Date.now();
    } else if (Date.now() - timeCached > THIRTY_MINS) {
      timeCached = Date.now();
      apolloClient.clearStore();
    }
  };
})();

export default auth(async (request: NextAuthRequest) => {
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

  if (pathname === '/_invalidate-middleware-cache') {
    await apolloClient.clearStore();

    return NextResponse.json({
      message: 'Middleware cache cleared',
    });
  }

  if (!isAuthenticated(request, hostname)) {
    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
  }

  clearCacheIfTimedOut();
  const token = request.auth?.idToken;

  const { data, error } = await tryRequest(
    apolloClient.query<
      GetPlansByHostnameQuery,
      GetPlansByHostnameQueryVariables
    >({
      query: GET_PLANS_BY_HOSTNAME,
      context: { headers: token ? { Authorization: `Bearer ${token}` } : {} },
      variables: { hostname },
      fetchPolicy:
        token == null || request.auth?.user == null
          ? 'cache-first'
          : 'no-cache',
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

  if (isRestrictedPlan(parsedPlan)) {
    // Pass the status message to the unpublished page as search params
    const message =
      parsedPlan.domain?.statusMessage ?? parsedPlan.statusMessage;
    const queryParams = message
      ? `?${new URLSearchParams({
          message,
        }).toString()}`
      : '';
    const rewrittenUrl = new URL(
      `/root/${hostname}/${parsedLocale}${UNPUBLISHED_PATH}${queryParams}`,
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
    `/root/${hostname}/${parsedLocale}/${parsedPlan.id}/${strippedPath}${searchParams}`,
    request.url
  );

  return rewriteUrl(
    request,
    response,
    hostUrl,
    rewrittenUrl,
    parsedPlan.identifier
  );
});
