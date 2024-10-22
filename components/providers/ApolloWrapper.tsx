'use client';

import { ApolloLink, useApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';

import { getRuntimeConfig, isServer } from '@/common/environment';
import {
  getHttpLink,
  headersMiddleware,
  localeMiddleware,
  logOperationLink,
} from '../../utils/apollo.utils';

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
  return new ApolloClient({
    defaultContext: {
      locale: initialLocale,
      sessionToken,
      wildcardDomains,
    },
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      logOperationLink,
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
} & React.PropsWithChildren;

export function ApolloWrapper({ initialLocale, children }: Props) {
  const session = useSession();
  const token =
    session.status === 'authenticated' ? session.data.idToken : undefined;
  const wildcardDomains = getRuntimeConfig().wildcardDomains;

  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient(initialLocale, token, wildcardDomains)}
    >
      <UpdateLocale>{children}</UpdateLocale>
    </ApolloNextAppProvider>
  );
}
