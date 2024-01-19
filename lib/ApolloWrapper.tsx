'use client';

import { useLocale } from 'next-intl';
import { ApolloLink, useApolloClient } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { errorLink, localeMiddleware, httpLink } from './utils/apollo.utils';
import { isServer } from '@/common/environment';
import { useEffect } from 'react';

function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([
      errorLink,
      localeMiddleware,
      ...(isServer
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
          ]
        : []),
      httpLink,
    ]),
  });
}

/**
 * On locale change:
 *  - Update the Apollo client context to include the current locale, which
 *    allows us to inject the "@locale" directive into queries via an Apollo link.
 *  - Reset the cache so that stale locale cache isn't used. Required because the
 *    locale isn't passed to query calls as an argument.
 */
function UpdateLocale({ children }: React.PropsWithChildren) {
  const locale = useLocale();
  const apolloClient = useApolloClient();

  useEffect(() => {
    apolloClient.defaultContext.locale = locale;
    apolloClient.resetStore();
  }, [locale, apolloClient]);

  return children;
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <UpdateLocale>{children}</UpdateLocale>
    </ApolloNextAppProvider>
  );
}
