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
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { getLogger } from './common/log';

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages();
  loadErrorMessages();
}

const logger = getLogger('middleware');

logger.info(`Wildcard domains: ${wildcardDomains.join(', ')}`);

const httpHeadersMiddleware = setContext(
  async (_, { headers: initialHeaders = {} }) => {
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

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = request.nextUrl;

  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto');
  const hostUrl = new URL(`${protocol}://${host}`);
  const hostname = hostUrl.hostname;
  const nextUrl = request.nextUrl;

  if (pathname === '/_health') {
    url.pathname = '/api/health';

    return NextResponse.rewrite(url);
  }

  logger.info(
    { method: request.method, path: nextUrl.pathname, host },
    'middleware request'
  );

  // Redirect the root application locally to `sunnydale` tenant
  if (hostname === 'localhost') {
    return NextResponse.redirect(new URL(`http://sunnydale.${host}`));
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
      captureException(error, { extra: { hostname, ...error } });
      logger.error(
        { error: error.toString(), hostname },
        'Unable to get plans for hostname'
      );
    } else {
      logger.warn(
        { hostname, 'wildcard-domains': wildcardDomains },
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
