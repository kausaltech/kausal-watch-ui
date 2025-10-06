/* istanbul ignore file */
import { NextResponse } from 'next/server';

import * as Sentry from '@sentry/nextjs';
import type { NextAuthRequest } from 'next-auth/lib';
import createIntlMiddleware from 'next-intl/middleware';

import { HEALTH_CHECK_PUBLIC_PATH } from '@common/constants/routes.mjs';
import { getDeploymentType, getSpotlightUrl, isLocalDev } from '@common/env';
import { generateCorrelationID, getLogger } from '@common/logging';
import { LOGGER_SPAN_ID, LOGGER_TRACE_ID } from '@common/logging/init';
import { LOGGER_CORRELATION_ID } from '@common/logging/logger';

import { auth } from './config/auth';
import { UNPUBLISHED_PATH } from './constants/routes';
import {
  clearHostnameCache,
  convertPathnameFromInvalidLocaleCasing,
  convertPathnameFromLegacy,
  getLocaleAndPlan,
  getPlansForHostname,
  getSearchParamsString,
  isAuthenticated,
  isLegacyPathStructure,
  isRestrictedPlan,
  rewriteUrl,
} from './utils/middleware.utils';
import { stripLocaleAndPlan } from './utils/urls';

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

function getMiddlewareLogger(request: NextAuthRequest, host: string, pathname: string) {
  const reqId = request.headers.get('X-Correlation-ID') || generateCorrelationID();
  const span = Sentry.getActiveSpan();
  const spanBindings = {};
  if (span) {
    spanBindings[LOGGER_TRACE_ID] = span.spanContext().traceId;
    spanBindings[LOGGER_SPAN_ID] = span.spanContext().spanId;
    spanBindings['sampled'] = span.isRecording();
  }
  const logger = getLogger({
    name: 'middleware',
    bindings: {
      ...spanBindings,
      [LOGGER_CORRELATION_ID]: reqId,
      host,
      path: pathname,
    },
    request,
  });
  // If spotlight is enabled, we enrich the span with the request headers
  // for nicer debug experience.
  if (span && getSpotlightUrl()) {
    request.headers.forEach((headerValue, headerName) => {
      const key = `http.request.header.${headerName}`;
      span.setAttribute(key, headerValue);
    });
  }
  return logger;
}

const middleware = auth(async (request: NextAuthRequest) => {
  const url = request.nextUrl;
  const { pathname } = request.nextUrl;

  const host =
    request.headers.get('host') || request.headers.get('x-forwarded-host') || request.nextUrl.host;
  const hostname = host.split(':')[0];
  const protocol = request.headers.get('x-forwarded-proto');
  const hostUrl = new URL(`${protocol}://${host}`);

  if (request.nextUrl.pathname === HEALTH_CHECK_PUBLIC_PATH) {
    return NextResponse.json({ status: 'OK' });
  }
  if (
    request.nextUrl.pathname === '/__nextjs_original-stack-frame' ||
    request.nextUrl.pathname.startsWith('/_next/static/')
  ) {
    return NextResponse.next();
  }

  const logger = getMiddlewareLogger(request, host, pathname);
  logger.info({ method: request.method }, `${request.method} ${request.nextUrl.pathname}`);

  if (isLocalDev && pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    return NextResponse.json({
      root: process.env.PWD,
      uuid: 'b03cc551-04f7-4eb3-bb80-89b81607eafe',
    });
  }

  // Redirect the root application locally to `sunnydale` tenant
  if (hostname === 'localhost') {
    return NextResponse.redirect(new URL(`http://sunnydale.${host}`));
  }

  if (pathname === '/_invalidate-middleware-cache') {
    clearHostnameCache();
    return NextResponse.json({
      message: 'Middleware cache cleared',
    });
  }

  if (!isAuthenticated(request, hostname)) {
    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
  }

  const { plans, error } = await getPlansForHostname(request, logger, hostname);
  if (error) {
    const errorPreamble = `Error fetching plans for hostname ${hostname}`;
    // If we're not in production, we'll return the error to the user for easier debugging.
    if (getDeploymentType() !== 'production') {
      if (error instanceof Error) {
        return new NextResponse(`${errorPreamble} (${error.name}: ${error.message})`, {
          status: 500,
        });
      }
      return new NextResponse(`${errorPreamble} (${String(error)})`, { status: 500 });
    }
  }
  if (!plans || plans.length === 0) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const { parsedLocale, parsedPlan, isLocaleCaseInvalid } = getLocaleAndPlan(pathname, plans);

  if (!parsedPlan) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  if (isLegacyPathStructure(pathname, parsedLocale, parsedPlan)) {
    const newPathname = convertPathnameFromLegacy(pathname, parsedLocale, parsedPlan);

    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  if (isLocaleCaseInvalid) {
    const newPathname = convertPathnameFromInvalidLocaleCasing(pathname, parsedLocale);

    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  const handleI18nRouting = createIntlMiddleware({
    locales: [parsedPlan.primaryLanguage, ...(parsedPlan.otherLanguages ?? [])],
    defaultLocale: parsedPlan.primaryLanguage,
    localePrefix: 'as-needed',
    localeDetection: false,
  });

  if (parsedPlan.domain?.redirectToHostname) {
    const url = new URL(request.url);
    url.hostname = parsedPlan.domain.redirectToHostname;
    url.port = '';
    return NextResponse.redirect(url, { status: 301 });
  }

  const response = handleI18nRouting(request);

  if (isRestrictedPlan(parsedPlan)) {
    // Pass the status message to the unpublished page as search params
    const message = parsedPlan.domain?.statusMessage ?? parsedPlan.statusMessage;
    const loginEnabled = parsedPlan.loginEnabled ?? false;
    const queryParams = message
      ? `?${new URLSearchParams({
          message,
          loginEnabled: String(loginEnabled),
        }).toString()}`
      : '';
    const rewrittenUrl = new URL(
      `/root/${hostname}/${parsedLocale}${UNPUBLISHED_PATH}${queryParams}`,
      request.url
    );

    return rewriteUrl(request, response, hostUrl, rewrittenUrl, parsedPlan.identifier);
  }

  const searchParams = getSearchParamsString(request);
  const strippedPath = stripLocaleAndPlan(parsedPlan, parsedLocale, pathname);
  const rewrittenUrl = new URL(
    `/root/${hostname}/${parsedLocale}/${parsedPlan.id}/${strippedPath}${searchParams}`,
    request.url
  );

  return rewriteUrl(request, response, hostUrl, rewrittenUrl, parsedPlan.identifier);
});

export default middleware;
