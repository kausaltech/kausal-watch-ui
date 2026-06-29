'use client';

import { ApolloLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';
import { setContext } from '@apollo/client/link/context';
import { useApolloClient } from '@apollo/client/react';
import { disableFragmentWarnings } from 'graphql-tag';
import { signOut, useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';

import { createSentryLink, logOperationLink } from '@common/apollo/links';
import { getWatchGraphQLUrl } from '@common/env';

import { isServer } from '@/common/environment';

import {
  createErrorLink,
  getHttpLink,
  headersMiddleware,
  localeMiddleware,
} from '../../utils/apollo.utils';
import { clearPledgeAuth } from '../pledge/use-pledge-auth';

const authMiddleware = setContext((_, { sessionToken, headers: initialHeaders = {} }) => {
  return {
    headers: {
      ...initialHeaders,
      ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
    },
  };
});

// Injects the pledge bearer token for authenticated public users.
const pledgeAuthMiddleware = setContext((_, context) => {
  if (isServer || context.sessionToken) return {};

  const pledgeToken = localStorage.getItem('pledge-auth-token');

  if (!pledgeToken) return {};

  return {
    headers: {
      ...(context.headers ?? {}),
      'X-Public-User-Token': pledgeToken,
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
  const unauthErrorLink = createErrorLink((errors) => {
    // Backend returns UNAUTHENTICATED with an `invalid_token:` message for
    // expired/invalid pledge bearer tokens. Clear the pledge token locally
    // rather than triggering a full next-auth sign-out redirect, which would
    // loop because the token persists in localStorage across the redirect.
    const hasPledgeTokenError = errors.some((e) => e.message.startsWith('invalid_token'));
    if (hasPledgeTokenError) {
      clearPledgeAuth();
      return;
    }
    signOut({ redirect: true });
  });
  return new ApolloClient({
    defaultContext: {
      locale: initialLocale,
      sessionToken,
      planIdentifier,
      planDomain,
    },
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      unauthErrorLink,
      logOperationLink,
      createSentryLink(getWatchGraphQLUrl()),
      localeMiddleware,
      authMiddleware,
      pledgeAuthMiddleware,
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
