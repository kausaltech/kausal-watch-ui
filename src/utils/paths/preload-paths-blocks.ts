import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { GET_NODE_CONTENT, getNodeContentVariables } from '@/queries/paths/get-paths-node';
import { GET_OUTCOME_NODE, getOutcomeNodeVariables } from '@/queries/paths/get-paths-page';
import { getDefaultGoal } from '@/utils/paths/paths-settings';
import {
  type PathsPreloadRequest,
  type PathsPreloadedQueries,
  preloadPathsQueries,
} from '@/utils/paths/preload-paths-queries';

/** The stream field block fields the preload reads; other blocks are ignored. */
type StreamFieldBlock = {
  __typename: string;
  outcomeNodeId?: string | null;
  pathsTargetNodeId?: string | null;
  categoryLevel?: { id: string } | null;
  categoryBlockType?: {
    categories: readonly {
      kausalPathsNodeUuid?: string | null;
      level?: { id: string } | null;
      categoryPage?: { live?: boolean } | null;
    }[];
  } | null;
} | null;

/**
 * The Paths queries a block makes when it renders, with the variables it
 * will use: these must follow the block components.
 */
function getBlockRequests(
  block: StreamFieldBlock,
  paths: GetInstanceContextQuery
): PathsPreloadRequest[] {
  switch (block?.__typename) {
    case 'PathsOutcomeBlock': {
      const goal = getDefaultGoal(paths.instance.goals)?.id ?? null;
      return [
        { query: GET_OUTCOME_NODE, variables: getOutcomeNodeVariables(block.outcomeNodeId, goal) },
      ];
    }
    // CategoryTypeListBlock renders a CategoryCard, with a PathsNodeSummary,
    // for each category of the level that has a live page and a Paths node
    case 'CategoryTypeLevelListBlock': {
      const levelId = block.categoryLevel?.id;
      return (block.categoryBlockType?.categories ?? [])
        .filter((cat) => cat.level?.id === levelId && cat.categoryPage?.live)
        .flatMap((cat) =>
          cat.kausalPathsNodeUuid
            ? [
                {
                  query: GET_NODE_CONTENT,
                  variables: getNodeContentVariables(
                    cat.kausalPathsNodeUuid,
                    paths.instance.goals,
                    block.pathsTargetNodeId
                  ),
                },
              ]
            : []
        );
    }
    default:
      return [];
  }
}

const PRELOADED_BLOCK_TYPES = new Set(['PathsOutcomeBlock', 'CategoryTypeLevelListBlock']);

/**
 * Preload the Paths data of a page's top-level stream field blocks. See
 * `preloadPathsQueries`.
 */
export function preloadPathsBlocks(
  domain: string,
  plan: string,
  blocks: readonly StreamFieldBlock[] | null | undefined
): Promise<PathsPreloadedQueries> {
  if (!blocks?.some((block) => block && PRELOADED_BLOCK_TYPES.has(block.__typename))) {
    return Promise.resolve({});
  }
  return preloadPathsQueries(domain, plan, (paths) =>
    blocks.flatMap((block) => getBlockRequests(block, paths))
  );
}
