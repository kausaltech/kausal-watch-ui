import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import possibleTypes from '@/common/__generated__/possible_types.json';

import { headers as getHeaders } from 'next/headers';
import {
  errorLink,
  localeMiddleware,
  httpLink,
  operationEnd,
  operationStart,
} from './utils/apollo.utils';

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
