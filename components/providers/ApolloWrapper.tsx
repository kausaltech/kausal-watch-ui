'use client';

import { useLocale } from 'next-intl';
import { ApolloLink, useApolloClient } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import {
  errorLink,
  localeMiddleware,
  getHttpLink,
  headersMiddleware,
} from '../../utils/apollo.utils';
import { isServer } from '@/common/environment';

function makeClient(initialLocale: string, origin?: string) {
  return new NextSSRApolloClient({
    defaultContext: {
      locale: initialLocale,
    },
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([
      errorLink,
      localeMiddleware,
      headersMiddleware,
      ...(isServer
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
          ]
        : []),
      getHttpLink(origin),
    ]),
  });
}

/**
 * On locale change update the Apollo client context to include the current locale, which
 * allows us to inject the "@locale" directive into queries via an Apollo link. Required
 * because ApolloNextAppProvider makeClient is only called on initial render.
 */
function UpdateLocale({ children }: React.PropsWithChildren) {
  const locale = useLocale();
  const apolloClient = useApolloClient();

  apolloClient.defaultContext.locale = locale;

  return children;
}

type Props = {
  origin?: string;
  initialLocale: string;
} & React.PropsWithChildren;

export function ApolloWrapper({ origin, initialLocale, children }: Props) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(initialLocale, origin)}>
      <UpdateLocale>{children}</UpdateLocale>
    </ApolloNextAppProvider>
  );
}
