'use client';

import { type ReactNode, createContext, use, useContext } from 'react';

import type {
  GetOutcomeNodeContentQuery,
  GetOutcomeNodeContentQueryVariables,
} from '@/common/__generated__/paths/graphql';
import { usePathsApolloClient } from '@/components/providers/PathsApolloProvider';
import { GET_OUTCOME_NODE } from '@/queries/paths/get-paths-page';

export type PreloadedOutcomeNode = {
  variables: GetOutcomeNodeContentQueryVariables;
  data: GetOutcomeNodeContentQuery;
};

const PathsPreloadContext = createContext<Promise<PreloadedOutcomeNode[]> | null>(null);

type Props = {
  /** Paths data the page started fetching on the server; never rejects. */
  preload: Promise<PreloadedOutcomeNode[]>;
  children: ReactNode;
};

/**
 * Hands Paths data that a page fetched on the server to its Paths blocks.
 *
 * The page passes the promise without waiting for it, so the rest of the page
 * renders and streams while the Paths API computes the data.
 */
export default function PathsPreloadProvider({ preload, children }: Props) {
  return <PathsPreloadContext.Provider value={preload}>{children}</PathsPreloadContext.Provider>;
}

/** Preloaded results already written into a Paths client's cache. */
const writtenToCache = new WeakMap<object, WeakSet<PreloadedOutcomeNode[]>>();

/**
 * Wait for the page's preloaded outcome node data and write it into the Paths
 * client cache, so `usePathsQuery` renders it on the server and in the first
 * browser render alike. Suspends until the data is there.
 *
 * Returns whether the data for `variables` was preloaded.
 */
export function usePreloadedOutcomeNode(variables: GetOutcomeNodeContentQueryVariables) {
  const preload = useContext(PathsPreloadContext);
  const client = usePathsApolloClient();
  const preloaded = preload ? use(preload) : null;
  if (!preloaded || !client) return false;

  let written = writtenToCache.get(client);
  if (!written) {
    written = new WeakSet();
    writtenToCache.set(client, written);
  }
  if (!written.has(preloaded)) {
    // Written during render, so nothing is notified: the components reading
    // this data render after this.
    for (const { variables: preloadedVariables, data } of preloaded) {
      client.cache.writeQuery({
        query: GET_OUTCOME_NODE,
        variables: preloadedVariables,
        data,
        broadcast: false,
      });
    }
    written.add(preloaded);
  }
  return preloaded.some(
    (entry) => entry.variables.node === variables.node && entry.variables.goal === variables.goal
  );
}
