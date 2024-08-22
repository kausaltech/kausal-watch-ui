import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { captureException } from '@sentry/nextjs';

export const dynamic = 'force-dynamic';

const gqlUrl = 'https://api.paths.kausal.dev/v1/graphql/';

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

export async function POST(request: Request) {
  const headersList = headers();
  const requestData = await request.json();

  // Determine headers to send to the backend
  const backendHeaders: Record<string, string> = {};
  PASS_HEADERS.forEach((header) => {
    const value = headersList.get(header);
    if (value) backendHeaders[header] = value;
  });
  backendHeaders['Content-Type'] = 'application/json';

  // Do the fetch from the backend
  const backendResponse = await fetch(gqlUrl, {
    method: 'POST',
    headers: backendHeaders,
    body: JSON.stringify(requestData),
    next: { revalidate: 0 },
  });

  // Set response headers
  const responseHeaders: Record<string, string> = {
    'Content-Type':
      backendResponse.headers.get('Content-Type') ?? 'application/json',
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
    if (process.env.NODE_ENV !== 'production') {
      console.log(data);
    }
    return NextResponse.json(data, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  }

  try {
    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 200, headers: responseHeaders });
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: `Response is invalid JSON: ${error?.message}` }] },
      { status: 500, headers: responseHeaders }
    );
  }
}
