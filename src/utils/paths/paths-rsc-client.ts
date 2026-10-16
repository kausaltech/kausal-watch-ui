import { cache } from 'react';

import { headers } from 'next/headers';

import { makePathsClient } from '@common/apollo/paths-client';
import { getLogger } from '@common/logging';

import pathsPossibleTypes from '@/common/__generated__/paths/possible_types.json';
import { PATHS_COOKIE_PREFIX, getBackendCookieHeader } from '@/common/cookies';

const pathsRscLogger = getLogger('apollo-paths-rsc');

/**
 * Apollo client for the Paths API in React Server Components, one per request
 * and Paths instance. It forwards the visitor's Paths session cookies, so
 * session state such as the active scenario matches what the browser sees.
 *
 * For client components use `usePathsQuery` and `usePathsMutation`.
 */
export const getPathsClient = cache(async (instanceIdentifier: string) => {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? undefined;
  const clientCookies = await getBackendCookieHeader({ prefix: PATHS_COOKIE_PREFIX });

  return makePathsClient({
    instanceIdentifier,
    locale,
    clientCookies: clientCookies ?? undefined,
    possibleTypes: pathsPossibleTypes.possibleTypes,
    logger: pathsRscLogger,
  });
});
