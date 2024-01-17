'use client';

import { gqlUrl } from '@/common/environment';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { errorLink } from './utils/apollo.utils';

function makeClient() {
  const httpLink = new HttpLink({
    uri: gqlUrl,
    fetchOptions: { next: { revalidate: 3600 } },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            errorLink,
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : ApolloLink.from([errorLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
