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
import { setContext } from '@apollo/client/link/context';
import { useSession } from 'next-auth/react';

const authMiddleware = setContext(
  (_, { sessionToken, headers: initialHeaders = {} }) => {
    return {
      headers: {
        ...initialHeaders,
        ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
      },
    };
  }
);

function makeClient(
  initialLocale: string,
  sessionToken?: string,
  wildcardDomains?: string[]
) {
  return new NextSSRApolloClient({
    defaultContext: {
      locale: initialLocale,
      sessionToken,
      wildcardDomains,
    },
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([
      errorLink,
      localeMiddleware,
      authMiddleware,
      headersMiddleware,
      ...(isServer
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
          ]
        : []),
      getHttpLink(),
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
  initialLocale: string;
  wildcardDomains: string[];
} & React.PropsWithChildren;

export function ApolloWrapper({
  initialLocale,
  wildcardDomains,
  children,
}: Props) {
  const session = useSession();
  const token =
    session.status === 'authenticated' ? session.data.idToken : undefined;

  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient(initialLocale, token, wildcardDomains)}
    >
      <UpdateLocale>{children}</UpdateLocale>
    </ApolloNextAppProvider>
  );
}
