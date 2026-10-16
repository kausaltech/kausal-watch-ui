import type { DocumentNode, OperationVariables } from '@apollo/client';
import { captureException } from '@sentry/nextjs';

import { getRequestOrigin } from '@common/utils/request.server';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { getPlan } from '@/queries/get-plan';
import { tryRequest } from '@/utils/api.utils';
import { getPathsData } from '@/utils/paths/get-paths-data';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';
import { getPreloadKey } from '@/utils/paths/preload-key';

export type PathsPreloadRequest = {
  query: DocumentNode;
  variables: OperationVariables;
  /** Data the server already has for this query, so it isn't queried again. */
  data?: unknown;
};

/**
 * Preloaded query results by `getPreloadKey`. Each promise resolves with the
 * query data, or null if the query failed; none of them reject.
 */
export type PathsPreloadedQueries = Record<string, Promise<unknown>>;

/**
 * Start Paths queries for a page on the server, for `PathsPreloadProvider`.
 *
 * Pass the returned promise on without awaiting it. It resolves as soon as
 * the queries are started, with one promise per query, so a block waits for
 * its own data only and the rest of the page streams meanwhile. Model
 * computations can take seconds on a cold cache.
 *
 * `getRequests` gets the plan's Paths instance context, to compute the same
 * variables the blocks will use.
 */
export async function preloadPathsQueries(
  domain: string,
  plan: string,
  getRequests: (paths: GetInstanceContextQuery) => PathsPreloadRequest[]
): Promise<PathsPreloadedQueries> {
  try {
    return await startQueries(domain, plan, getRequests);
  } catch (error) {
    captureException(error, { extra: { domain, plan, context: 'preloadPathsQueries' } });
    return {};
  }
}

async function startQueries(
  domain: string,
  plan: string,
  getRequests: (paths: GetInstanceContextQuery) => PathsPreloadRequest[]
): Promise<PathsPreloadedQueries> {
  // Both requests are cached for the request, the plan layout made them already
  const { data: planData } = await tryRequest(getPlan(domain, plan, await getRequestOrigin()));
  const pathsData = await getPathsData(planData?.plan?.kausalPathsInstanceUuid ?? '');
  if (!pathsData) return {};

  const instanceId = pathsData.instance.id;
  const client = await getPathsClient(instanceId);
  const requests = new Map(
    getRequests(pathsData).map((request) => [
      getPreloadKey(request.query, request.variables),
      request,
    ])
  );

  return Object.fromEntries(
    [...requests].map(([key, { query, variables, data: knownData }]) => [
      key,
      knownData !== undefined
        ? Promise.resolve(knownData)
        : client.query({ query, variables, fetchPolicy: 'no-cache' }).then(
            ({ data }) => data ?? null,
            (error: unknown) => {
              captureException(error, {
                extra: { pathsInstance: instanceId, context: 'preloadPathsQueries', key },
              });
              return null;
            }
          ),
    ])
  );
}
