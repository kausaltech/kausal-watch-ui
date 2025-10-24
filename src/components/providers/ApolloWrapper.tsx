'use client';

import { ApolloLink, useApolloClient } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';
import { setContext } from '@apollo/client/link/context';
import { disableFragmentWarnings } from 'graphql-tag';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';

import { createSentryLink, logOperationLink } from '@common/apollo/links';
import { getWatchGraphQLUrl } from '@common/env';

import { isServer } from '@/common/environment';

import { getHttpLink, headersMiddleware, localeMiddleware } from '../../utils/apollo.utils';

const authMiddleware = setContext((_, { sessionToken, headers: initialHeaders = {} }) => {
  return {
    headers: {
      ...initialHeaders,
      ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
    },
  };
});

function makeClient(config: {
  initialLocale: string;
  sessionToken?: string;
  planIdentifier: string;
  planDomain: string;
  noProxy?: boolean;
}) {
  const { initialLocale, sessionToken, planIdentifier, planDomain, noProxy } = config;
  return new ApolloClient({
    defaultContext: {
      locale: initialLocale,
      sessionToken,
      planIdentifier,
      planDomain,
    },
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      logOperationLink,
      createSentryLink(getWatchGraphQLUrl()),
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
      getHttpLink(noProxy),
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

export function ApolloWrapper({ initialLocale, planIdentifier, planDomain, children }: Props) {
  const session = useSession();
  const token = session.status === 'authenticated' ? session.data.idToken : undefined;

  const clientConfig = {
    initialLocale,
    sessionToken: token,
    planIdentifier,
    planDomain,
    noProxy: planIdentifier === 'minneapolis-climate',
  };

  // Disable fragment warnings for now.
  // https://github.com/apollographql/apollo-client-integrations/issues/328
  disableFragmentWarnings();

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(clientConfig)}>
      <UpdateLocale>{children}</UpdateLocale>
    </ApolloNextAppProvider>
  );
}
