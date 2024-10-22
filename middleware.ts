import { NextRequest, NextResponse } from 'next/server';

import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { setContext } from '@apollo/client/link/context';
import * as Sentry from '@sentry/nextjs';
import createIntlMiddleware from 'next-intl/middleware';

import type {
  GetPlansByHostnameQuery,
  GetPlansByHostnameQueryVariables,
} from '@/common/__generated__/graphql';
import possibleTypes from '@/common/__generated__/possible_types.json';
import { getClientIP } from '@/common/client-ip';
import { getWildcardDomains } from '@/common/environment';
import { getLogger } from '@/common/log';
import {
  API_HEALTH_CHECK_PATH,
  API_SENTRY_TUNNEL_PATH,
  HEALTH_CHECK_ALIAS_PATH,
  SENTRY_TUNNEL_PUBLIC_PATH,
  UNPUBLISHED_PATH,
} from '@/constants/routes.mjs';
import { GET_PLANS_BY_HOSTNAME } from '@/queries/get-plans';
import { tryRequest } from '@/utils/api.utils';
import {
  createSentryLink,
  getHttpLink,
  logOperationLink,
} from '@/utils/apollo.utils';
import { stripLocaleAndPlan } from '@/utils/urls';
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

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages();
  loadErrorMessages();
}

const logger = getLogger('middleware');

const httpHeadersMiddleware = setContext(
  async (_, { headers: initialHeaders = {} }) => {
    const wildcardDomains = getWildcardDomains();
    const headers = {
      ...initialHeaders,
    };
    if (wildcardDomains.length) {
      headers['x-wildcard-domains'] = wildcardDomains.join(',');
    }
    return {
      headers,
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
        keyFields: ['id'],
      },
      PlanDomain: {
        keyFields: ['hostname', 'basePath'],
      },
    },
    // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
    possibleTypes: possibleTypes.possibleTypes,
  }),
  link: from([
    logOperationLink,
    createSentryLink(),
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
    '/((?!api/|_next/|_static/|static/).*)', // |[\\w-]+\\.\\w+).*)
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
      logger.info('Clearing Apollo cache');
    }
  };
})();

async function handleRequest(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = request.nextUrl;

  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto');
  const hostUrl = new URL(`${protocol}://${host}`);
  const hostname = hostUrl.hostname;
  const nextUrl = request.nextUrl;

  if (pathname === HEALTH_CHECK_ALIAS_PATH) {
    url.pathname = API_HEALTH_CHECK_PATH;
    return NextResponse.rewrite(url);
  }

  // Proxying for Sentry events
  if (pathname === SENTRY_TUNNEL_PUBLIC_PATH) {
    url.pathname = API_SENTRY_TUNNEL_PATH;
    return NextResponse.rewrite(url);
  }

  if (request.headers.has('x-plan-identifier')) {
    console.log('middleware yes yes');
    return NextResponse.next();
  }

  logger.info({
    method: request.method,
    path: nextUrl.pathname,
    host,
    remote_ip: getClientIP(request),
  });

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

  const { data, error } = await tryRequest(
    apolloClient.query<
      GetPlansByHostnameQuery,
      GetPlansByHostnameQueryVariables
    >({
      query: GET_PLANS_BY_HOSTNAME,
      variables: { hostname },
      fetchPolicy: 'cache-first',
    })
  );
  if (error || !data?.plansForHostname?.length) {
    if (error) {
      Sentry.captureException(error, { extra: { hostname, ...error } });
      logger.error(
        { error: error.toString(), hostname },
        'Unable to get plans for hostname'
      );
    } else {
      logger.warn(
        { hostname, 'wildcard-domains': getWildcardDomains() },
        'No plans found for hostname'
      );
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

  // Properly formatted requests
  console.log(Sentry.getActiveSpan()?.spanContext());
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

export const middleware = Sentry.wrapMiddlewareWithSentry(handleRequest);
