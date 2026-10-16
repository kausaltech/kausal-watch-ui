import { captureException } from '@sentry/nextjs';

import { getRequestOrigin } from '@common/utils/request.server';

import type {
  GetOutcomeNodeContentQuery,
  GetOutcomeNodeContentQueryVariables,
} from '@/common/__generated__/paths/graphql';
import type { PreloadedOutcomeNode } from '@/components/providers/PathsPreloadProvider';
import { getPlan } from '@/queries/get-plan';
import { GET_OUTCOME_NODE, getOutcomeNodeVariables } from '@/queries/paths/get-paths-page';
import { tryRequest } from '@/utils/api.utils';
import { getPathsData } from '@/utils/paths/get-paths-data';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';
import { getDefaultGoal } from '@/utils/paths/paths-settings';

type StreamFieldBlock = { __typename: string; outcomeNodeId?: string | null } | null;

/**
 * Fetch the Paths data of a page's top-level Paths blocks on the server.
 *
 * Pass the returned promise to `PathsPreloadProvider` without awaiting it.
 * Model computations can take seconds, and the blocks stream in when they are
 * done. The promise never rejects: a failed query is left for the block to
 * fetch in the browser.
 */
export async function preloadPathsBlocks(
  domain: string,
  plan: string,
  blocks: readonly StreamFieldBlock[] | null | undefined
): Promise<PreloadedOutcomeNode[]> {
  try {
    return await fetchPathsBlocks(domain, plan, blocks);
  } catch (error) {
    captureException(error, { extra: { domain, plan, context: 'preloadPathsBlocks' } });
    return [];
  }
}

async function fetchPathsBlocks(
  domain: string,
  plan: string,
  blocks: readonly StreamFieldBlock[] | null | undefined
): Promise<PreloadedOutcomeNode[]> {
  const outcomeNodeIds = new Set(
    (blocks ?? [])
      .filter((block) => block?.__typename === 'PathsOutcomeBlock')
      .map((block) => block?.outcomeNodeId)
  );
  if (!outcomeNodeIds.size) return [];

  // Both requests are cached for the request, the plan layout made them already
  const { data: planData } = await tryRequest(getPlan(domain, plan, await getRequestOrigin()));
  const pathsData = await getPathsData(planData?.plan?.kausalPathsInstanceUuid ?? '');
  if (!pathsData) return [];

  const instanceId = pathsData.instance.id;
  const client = await getPathsClient(instanceId);
  // The goal the block uses before the visitor picks one
  const goal = getDefaultGoal(pathsData.instance.goals)?.id ?? null;

  const preloaded = await Promise.all(
    [...outcomeNodeIds].map(async (outcomeNodeId) => {
      const variables: GetOutcomeNodeContentQueryVariables = getOutcomeNodeVariables(
        outcomeNodeId,
        goal
      );
      const { data } = await tryRequest(
        client.query<GetOutcomeNodeContentQuery, GetOutcomeNodeContentQueryVariables>({
          query: GET_OUTCOME_NODE,
          variables,
          fetchPolicy: 'no-cache',
        }),
        { pathsInstance: instanceId, context: 'preloadPathsBlocks', variables }
      );
      return data ? { variables, data } : null;
    })
  );
  return preloaded.filter((entry) => entry !== null);
}
