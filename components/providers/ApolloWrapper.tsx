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

function makeClient(config: {
  initialLocale: string;
  sessionToken?: string;
  planIdentifier: string;
  planDomain: string;
}) {
  const { initialLocale, sessionToken, planIdentifier, planDomain } = config;
  return new NextSSRApolloClient({
    defaultContext: {
      locale: initialLocale,
      sessionToken,
      planIdentifier,
      planDomain,
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
  planIdentifier: string;
  planDomain: string;
} & React.PropsWithChildren;

export function ApolloWrapper({
  initialLocale,
  planIdentifier,
  planDomain,
  children,
}: Props) {
  const session = useSession();
  const token =
    session.status === 'authenticated' ? session.data.idToken : undefined;

  const clientConfig = {
    initialLocale,
    sessionToken: token,
    planIdentifier,
    planDomain,
  };

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(clientConfig)}>
      <UpdateLocale>{children}</UpdateLocale>
    </ApolloNextAppProvider>
  );
}
