import { useCallback } from 'react';

import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

import { usePathsApolloClient } from '@/components/providers/PathsApolloProvider';

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
      return execute(...args);
    },
    [client, execute]
  ) as typeof execute;

  return [executeOnPaths, result];
}
