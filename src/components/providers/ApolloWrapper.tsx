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
import { useLocale } from 'next-intl';

import { createSentryLink, logOperationLink } from '@common/apollo/links';
import { useAuthSession } from '@common/auth/session-context';
import { getWatchGraphQLUrl } from '@common/env';

import { isServer } from '@/common/environment';
import { recoverFromInvalidToken } from '@/config/auth-client';

import {
  createErrorLink,
  getHttpLink,
  headersMiddleware,
  localeMiddleware,
} from '../../utils/apollo.utils';
import { clearPledgeAuth } from '../pledge/use-pledge-auth';

// The OAuth access token is not sent from the browser: the GraphQL proxy
// (src/app/api/graphql/route.ts) injects it server-side.

// Injects the pledge bearer token for authenticated public users.
const pledgeAuthMiddleware = setContext((_, context) => {
  if (isServer || context.hasAccessToken) return {};

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
  hasAccessToken: boolean;
  planIdentifier?: string;
  planDomain: string;
  noProxy?: boolean;
}) {
  const { initialLocale, hasAccessToken, planIdentifier, planDomain, noProxy } = config;
  const unauthErrorLink = createErrorLink((errors) => {
    // The pledge token is only sent without an OAuth access token, so with
    // one, an UNAUTHENTICATED error concerns the OAuth session.
    if (!hasAccessToken) {
      // Backend returns UNAUTHENTICATED with an `invalid_token:` message for
      // expired/invalid pledge bearer tokens. Clear the pledge token locally
      // rather than triggering a full sign-out and reload, which would
      // loop because the token persists in localStorage across the reload.
      const hasPledgeTokenError = errors.some((e) => e.message.startsWith('invalid_token'));
      if (hasPledgeTokenError) {
        clearPledgeAuth();
        return;
      }
    }
    recoverFromInvalidToken();
  });
  return new ApolloClient({
    defaultContext: {
      locale: initialLocale,
      hasAccessToken,
      planIdentifier,
      planDomain,
    },
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      unauthErrorLink,
      logOperationLink,
      createSentryLink(getWatchGraphQLUrl()),
      localeMiddleware,
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

  // Apollo intentionally exposes mutable defaults for updating link context.
  // eslint-disable-next-line react-hooks/immutability
  apolloClient.defaultContext.locale = locale;

  return children;
}

type Props = {
  initialLocale: string;
  /** Absent on pages served in place of a restricted plan. */
  planIdentifier?: string;
  planDomain: string;
} & React.PropsWithChildren;

export function ApolloWrapper({ initialLocale, planIdentifier, planDomain, children }: Props) {
  const session = useAuthSession();
  const hasAccessToken = session.status === 'authenticated' && session.data.hasAccessToken;

  const clientConfig = {
    initialLocale,
    hasAccessToken,
    planIdentifier,
    planDomain,
    // Signed-in users need the proxy, which adds their access token.
    noProxy: planIdentifier === 'minneapolis-climate' && !hasAccessToken,
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
