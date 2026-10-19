/** Stream field blocks that show Paths model data */
const PATHS_BLOCK_TYPES = new Set(['PathsOutcomeBlock', 'CategoryTypeLevelListBlock']);

type Block = { readonly blockType?: string | null } | null;

/** Whether any of the blocks shows Paths model data */
export function hasPathsContent(blocks: readonly Block[]) {
  return blocks.some((block) => !!block?.blockType && PATHS_BLOCK_TYPES.has(block.blockType));
}

/** Whether a page shows the settings panel, if the theme allows hiding it. Used in the browser and on the server. */
export function pageShowsPathsSettings(page: {
  readonly __typename: string;
  readonly body?: readonly Block[] | null;
}) {
  return page.__typename === 'CategoryPage' || hasPathsContent(page.body ?? []);
}
