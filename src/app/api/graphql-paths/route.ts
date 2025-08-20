import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { captureException } from '@sentry/nextjs';

import { forwardSetCookie, getClientCookieAsHeader } from '@/common/cookies';
import { pathsGqlUrl } from '@/common/environment';

export const dynamic = 'force-dynamic';

const PASS_HEADERS = [
  'x-paths-instance-identifier',
  'x-paths-instance-hostname',
  'x-wildcard-domains',
  'user-agent',
  'authorization',
  'accept-language',
  'dnt',
  'referer',
];

const PATHS_COOKIE_PREFIX = 'paths_api_';

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const requestData = await request.json();
  const backendCookieHeader = getClientCookieAsHeader(request, {
    prefix: PATHS_COOKIE_PREFIX,
  });

  // Determine headers to send to the backend
  const backendHeaders: Record<string, string> = {};
  PASS_HEADERS.forEach((header) => {
    const value = headersList.get(header);
    if (value) backendHeaders[header] = value;
  });
  backendHeaders['Content-Type'] = 'application/json';
  if (backendCookieHeader) {
    backendHeaders['Cookie'] = backendCookieHeader;
  }

  // Do the fetch from the backend
  const backendResponse = await fetch(pathsGqlUrl, {
    method: 'POST',
    headers: backendHeaders,
    body: JSON.stringify(requestData),
    next: { revalidate: 0 },
  });

  // Set response headers
  const responseHeaders: Record<string, string> = {
    'Content-Type': backendResponse.headers.get('Content-Type') ?? 'application/json',
    'Content-Language': backendResponse.headers.get('Content-Language') ?? '',
    'Cache-Control': 'no-store',
  };

  if (!backendResponse.ok) {
    console.error('Backend responded with ', backendResponse.status);
    let data: object | undefined, errorMessage: string | undefined;
    try {
      if (backendResponse.headers.get('content-type') === 'application/json') {
        data = await backendResponse.json();
      }
    } catch (error) {
      captureException(error);
    }
    if (!data) {
      errorMessage = await backendResponse.text();
      data = { errors: [{ message: errorMessage }] };
    }
    return NextResponse.json(data, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  }

  try {
    const data = await backendResponse.json();
    await forwardSetCookie(request, backendResponse, { prefix: PATHS_COOKIE_PREFIX });
    return NextResponse.json(data, { status: 200, headers: responseHeaders });
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: `Response is invalid JSON: ${error?.message}` }] },
      { status: 500, headers: responseHeaders }
    );
  }
}
