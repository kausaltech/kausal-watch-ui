import { headers } from 'next/headers';
import { NextAuthRequest } from 'next-auth/lib';
import { gqlUrl } from '@/common/environment';

export const dynamic = 'force-dynamic';

/**
 * Simple proxy which handles our GraphQL requests
 * to prevent CORS issues and attach auth headers.
 */
export const POST = async (request: NextAuthRequest) => {
  const headersList = headers();
  const requestData = await request.json();
  const copyHeaders = [
    'user-agent',
    'x-plan-domain',
    'x-plan-identifier',
    'x-wildcard-domains',
    'authorization',
  ];

  const fetchHeaders = {
    'Content-Type': 'application/json',
  };
  copyHeaders.forEach((hdr) => {
    const val = headersList.get(hdr);
    if (val) {
      fetchHeaders[hdr] = val;
    }
  });

  const response = await fetch(gqlUrl, {
    method: 'POST',
    headers: fetchHeaders,
    body: JSON.stringify(requestData),
    next: { revalidate: 0 },
  });

  const responseHeaders = {
    'Content-Type': response.headers.get('Content-Type') ?? '',
    'Content-Language': response.headers.get('Content-Language') ?? '',
  };

  try {
    const data = await response.json();

    return Response.json(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    // An error occurred parsing the error response as JSON
    if (!response.ok) {
      try {
        const errorText = await response.text();

        return Response.json(
          { errors: [{ message: errorText }] },
          { status: response.status, headers: responseHeaders }
        );
      } catch (error) {
        return Response.json(
          { errors: [{ message: 'An unknown error occurred' }] },
          { status: 500, headers: responseHeaders }
        );
      }
    }

    return Response.json(
      { errors: [{ message: `Response is invalid JSON: ${error?.message}` }] },
      { status: 500, headers: responseHeaders }
    );
  }
};
