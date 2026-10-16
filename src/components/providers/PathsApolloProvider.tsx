'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

import type { ApolloClient } from '@apollo/client';
import { useLocale } from 'next-intl';

import { makePathsClient } from '@common/apollo/paths-client';

import pathsPossibleTypes from '@/common/__generated__/paths/possible_types.json';
import { isServer } from '@/common/environment';
import { PATHS_API_PROXY_PATH } from '@/constants/routes';
import { usePaths } from '@/context/paths/paths';
import { resolvePathsLocale } from '@/utils/paths/paths-locale';

const PathsApolloClientContext = createContext<ApolloClient | null>(null);

/** The Paths API client, or null when the plan has no Paths instance. */
export const usePathsApolloClient = () => useContext(PathsApolloClientContext);

function createClient(instanceIdentifier: string, locale: string) {
  return makePathsClient({
    instanceIdentifier,
    locale,
    possibleTypes: pathsPossibleTypes.possibleTypes,
    browserProxyPath: PATHS_API_PROXY_PATH,
  });
}

/**
 * One client per browser, so its cache survives client-side navigation. It is
 * replaced when navigating to a plan that uses another Paths instance, or to
 * another locale: the cache does not tell the languages apart, so cached data
 * would keep showing labels in the previous one.
 */
let browserClient: { instanceIdentifier: string; locale: string; client: ApolloClient } | undefined;

function getBrowserClient(instanceIdentifier: string, locale: string) {
  if (browserClient?.instanceIdentifier !== instanceIdentifier || browserClient.locale !== locale) {
    browserClient = {
      instanceIdentifier,
      locale,
      client: createClient(instanceIdentifier, locale),
    };
  }
  return browserClient.client;
}

type Props = {
  /** Identifier of the plan's Paths instance, if it has one. */
  instanceIdentifier: string | undefined;
  children: ReactNode;
};

/**
 * Provides the Apollo client for the Paths API, separate from the Watch
 * client provided by `ApolloWrapper`. Use it through `usePathsQuery` and
 * `usePathsMutation`; plain `useQuery` keeps using the Watch client.
 *
 * The Paths client is a plain `ApolloClient`: `ApolloNextAppProvider` holds a
 * single client per browser, so it cannot provide a second one.
 */
export default function PathsApolloProvider({ instanceIdentifier, children }: Props) {
  const paths = usePaths();
  const watchLocale = useLocale();
  // The same language the server picked for the instance context
  const locale = resolvePathsLocale(
    watchLocale,
    paths?.instance.supportedLanguages,
    paths?.instance.defaultLanguage
  );
  // A module-level client on the server would be shared between requests,
  // so create one per request there.
  const [serverClient] = useState(() =>
    isServer && instanceIdentifier ? createClient(instanceIdentifier, locale) : null
  );

  // A request has a single locale, so the server client is always current
  let client: ApolloClient | null = null;
  if (instanceIdentifier) {
    client = isServer ? serverClient : getBrowserClient(instanceIdentifier, locale);
  }

  return (
    <PathsApolloClientContext.Provider value={client}>{children}</PathsApolloClientContext.Provider>
  );
}
