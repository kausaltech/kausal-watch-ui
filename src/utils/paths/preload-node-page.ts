import { cache } from 'react';

import type { TypedDocumentNode } from '@apollo/client';

import { getRequestOrigin } from '@common/utils/request.server';

import type {
  GetNodeInfoQuery,
  GetNodeInfoQueryVariables,
} from '@/common/__generated__/paths/graphql';
import { getPlan } from '@/queries/get-plan';
import { GET_NODE_INFO } from '@/queries/paths/get-paths-node';
import { GET_NODE_PAGE, getNodePageVariables } from '@/queries/paths/get-paths-node-page';
import { tryRequest } from '@/utils/api.utils';
import { getPathsData } from '@/utils/paths/get-paths-data';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';
import {
  type PathsPreloadedQueries,
  preloadPathsQueries,
} from '@/utils/paths/preload-paths-queries';

const GET_NODE_INFO_TYPED: TypedDocumentNode<GetNodeInfoQuery, GetNodeInfoQueryVariables> =
  GET_NODE_INFO;

/**
 * A node of the plan's Paths model, or null if the plan has no model or the
 * model has no such node. Cheap, as it computes no metrics: the node page
 * uses it for its title and to answer 404 before streaming. Throws if the
 * Paths API fails, so an outage shows as an error rather than a 404.
 *
 * Fetched once per request, for both the page and its metadata.
 */
export const getPathsNodeInfo = cache(async function getPathsNodeInfo(
  domain: string,
  plan: string,
  nodeId: string
): Promise<NonNullable<GetNodeInfoQuery['node']> | null> {
  // Cached for the request, the plan layout made these requests already
  const { data: planData } = await tryRequest(getPlan(domain, plan, await getRequestOrigin()));
  const pathsInstance = planData?.plan?.kausalPathsInstanceUuid;
  if (!pathsInstance) return null;
  const pathsData = await getPathsData(pathsInstance);
  // The plan has a model, so a missing instance context is a failed request
  // (already reported), not a missing node
  if (!pathsData) {
    throw new Error(`Could not load Paths instance ${pathsInstance} for plan ${plan}`);
  }

  const client = await getPathsClient(pathsData.instance.id);
  // Throws if the Paths API fails: that is an error, not a missing node
  const { data } = await client.query({
    query: GET_NODE_INFO_TYPED,
    variables: { node: nodeId },
    fetchPolicy: 'no-cache',
  });
  return data?.node ?? null;
});

/**
 * Preload the data of a node page (`PathsNodePage`). See `preloadPathsQueries`.
 */
export function preloadNodePage(
  domain: string,
  plan: string,
  nodeId: string
): Promise<PathsPreloadedQueries> {
  return preloadPathsQueries(domain, plan, () => [
    { query: GET_NODE_PAGE, variables: getNodePageVariables(nodeId) },
  ]);
}
