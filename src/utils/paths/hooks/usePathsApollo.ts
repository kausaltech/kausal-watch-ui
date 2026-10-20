import { use, useCallback } from 'react';

import {
  type DocumentNode,
  NetworkStatus,
  type OperationVariables,
  type TypedDocumentNode,
} from '@apollo/client';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client/react';

import { usePathsApolloClient } from '@/components/providers/PathsApolloProvider';
import { usePathsPreload } from '@/components/providers/PathsPreloadProvider';
import { pathsSessionVersionVar } from '@/utils/paths/paths-session';
import { getPreloadKey } from '@/utils/paths/preload-key';

/**
 * Like `useQuery` without `returnPartialData`, data is either complete,
 * streaming or empty.
 */
type PathsQueryResult<TData, TVariables extends OperationVariables> = useQuery.Result<
  TData,
  TVariables,
  'empty' | 'complete' | 'streaming'
>;

/*
 * Apollo's own hook signatures resolve options and variables through
 * conditional types that TypeScript cannot evaluate for a generic wrapper.
 * These aliases give the hooks a plain signature for forwarding; the wrappers
 * below keep the strict signatures for their callers.
 */
const useQueryWithOptions = useQuery as unknown as <TData, TVariables extends OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: useQuery.Options<NoInfer<TData>, NoInfer<TVariables>>
) => PathsQueryResult<TData, TVariables>;

const useMutationWithOptions = useMutation as unknown as <
  TData,
  TVariables extends OperationVariables,
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: useMutation.Options<NoInfer<TData>, NoInfer<TVariables>>
) => useMutation.ResultTuple<TData, TVariables>;

type PathsQueryOptions<TData, TVariables extends OperationVariables> = Omit<
  useQuery.Options<NoInfer<TData>, NoInfer<TVariables>>,
  'client'
>;

type PathsMutationOptions<TData, TVariables extends OperationVariables> = Omit<
  useMutation.Options<NoInfer<TData>, NoInfer<TVariables>>,
  'client'
>;

/**
 * `useQuery` against the Paths API client from `PathsApolloProvider`.
 *
 * Without a Paths instance the query is skipped and stays in its initial
 * state.
 */
export function usePathsQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  // Like `useQuery`, options are required when the query has required variables
  ...[options]: Record<string, never> extends TVariables
    ? [options?: PathsQueryOptions<TData, TVariables>]
    : [options: PathsQueryOptions<TData, TVariables>]
): PathsQueryResult<TData, TVariables> {
  const client = usePathsApolloClient();
  const queryOptions = {
    ...options,
    client: client ?? undefined,
    skip: !client || options?.skip,
  } as useQuery.Options<NoInfer<TData>, NoInfer<TVariables>>;
  return useQueryWithOptions<TData, TVariables>(query, queryOptions);
}

/**
 * `useMutation` against the Paths API client from `PathsApolloProvider`.
 *
 * Without a Paths instance, running the mutation rejects instead of sending
 * it to the Watch API.
 */
export function usePathsMutation<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: PathsMutationOptions<TData, TVariables> = {}
): useMutation.ResultTuple<TData, TVariables> {
  const client = usePathsApolloClient();
  const [execute, result] = useMutationWithOptions<TData, TVariables>(mutation, {
    ...options,
    client: client ?? undefined,
  });

  const executeOnPaths = useCallback(
    (...args: Parameters<typeof execute>) => {
      if (!client) {
        return Promise.reject(new Error('No Paths instance for this plan'));
      }
      // Rejects on failure, so the session changed only when this resolves
      return execute(...args).then((executed) => {
        pathsSessionVersionVar(pathsSessionVersionVar() + 1);
        return executed;
      });
    },
    [client, execute]
  ) as typeof execute;

  return [executeOnPaths, result];
}

/**
 * The page's preloaded data for this query and variables, if any. Suspends
 * until it has arrived.
 */
function usePreloadedPathsData<TData>(query: DocumentNode, variables: OperationVariables) {
  const preload = usePathsPreload();
  const queries = preload ? use(preload.queries) : null;
  const pending = queries?.[getPreloadKey(query, variables)];
  const data = pending ? (use(pending) as TData | null) : null;
  return data !== null && preload ? { data, sessionVersion: preload.sessionVersion } : null;
}

/**
 * `usePathsQuery` for a block whose data the page can preload on the server
 * (see `preloadPathsQueries`). Wrap the block in `Suspense`: it suspends
 * until the preloaded data for its variables has arrived.
 *
 * While the variables match and the Paths session is unchanged, the
 * preloaded data is the result and nothing is fetched; nothing is written to
 * the cache either, so this works with any fetch policy. Once a Paths
 * mutation changes the session, the query runs as usual, with the preloaded
 * data shown as refetching meanwhile.
 */
export function usePreloadedPathsQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: PathsQueryOptions<TData, TVariables> & { variables: TVariables }
): PathsQueryResult<TData, TVariables> {
  const preloaded = usePreloadedPathsData<TData>(query, options.variables);
  const sessionVersion = useReactiveVar(pathsSessionVersionVar);
  const preloadIsCurrent = preloaded !== null && preloaded.sessionVersion === sessionVersion;

  const queryOptions = {
    ...options,
    skip: (options.skip ?? false) || preloadIsCurrent,
  } as PathsQueryOptions<TData, TVariables>;
  const result = usePathsQuery<TData, TVariables>(query, queryOptions);

  if (!preloaded) return result;
  if (preloadIsCurrent) {
    return {
      ...result,
      data: preloaded.data,
      dataState: 'complete',
      loading: false,
      networkStatus: NetworkStatus.ready,
    };
  }
  if (result.data === undefined && result.loading) {
    return {
      ...result,
      data: preloaded.data,
      previousData: preloaded.data,
      dataState: 'complete',
      networkStatus: NetworkStatus.refetch,
    };
  }
  return result;
}
