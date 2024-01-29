import {
  ApolloClient,
  ApolloQueryResult,
  InMemoryCache,
  from,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import possibleTypes from '@/common/__generated__/possible_types.json';

import { headers as getHeaders } from 'next/headers';
import {
  errorLink,
  localeMiddleware,
  httpLink,
  operationEnd,
  operationStart,
} from './apollo.utils';

type FailedRequest = {
  error: any;
  data: undefined;
};

/**
 * Simple wrapper to wrap queries in a try/catch block
 */
export async function tryRequest<T>(
  request: Promise<ApolloQueryResult<T>>
): Promise<ApolloQueryResult<T> | FailedRequest> {
  try {
    const response = await request;

    return response;
  } catch (error) {
    return { error, data: undefined };
  }
}

/**
 * Apollo client used in React Server Components (fully server-side). For client components
 * (which are also server-side rendered) use the separate useQuery hooks provided by ApolloWrapper.
 */
export const { getClient } = registerApolloClient(() => {
  const headers = getHeaders();
  const locale = headers.get('x-next-intl-locale') ?? undefined;

  return new ApolloClient({
    defaultContext: {
      locale,
    },
    connectToDevTools: false,
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    link: from([
      operationStart,
      errorLink,
      localeMiddleware,
      operationEnd,
      httpLink,
    ]),
  });
});
