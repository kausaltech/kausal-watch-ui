import { type NextRequest } from 'next/server';

import proxyGraphQLRequest from '@common/graphql/proxy';

import { getFreshAccessToken } from '@/config/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

/**
 * The proxy (src/proxy.ts) doesn't run for /api/* routes, so this is where the
 * access token of client-side queries is refreshed before it goes out.
 */
export async function POST(request: NextRequest) {
  const accessToken = await getFreshAccessToken();
  return proxyGraphQLRequest(request, 'watch', { accessToken: accessToken ?? undefined });
}
