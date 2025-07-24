import { type NextRequest } from 'next/server';

import proxyGraphQLRequest from '@common/graphql/proxy';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

export async function POST(request: NextRequest) {
  return proxyGraphQLRequest(request, 'watch');
}
