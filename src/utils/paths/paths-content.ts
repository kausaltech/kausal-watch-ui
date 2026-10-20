/** Stream field blocks that show Paths model data */
const PATHS_BLOCK_TYPES = new Set(['PathsOutcomeBlock', 'CategoryTypeLevelListBlock']);

type Block = { readonly __typename: string } | null;

/** Whether a page shows the settings panel, if the theme allows hiding it */
export function pageShowsPathsSettings(page: {
  readonly __typename: string;
  readonly body?: readonly Block[] | null;
}) {
  return (
    page.__typename === 'CategoryPage' ||
    (page.body ?? []).some((block) => !!block && PATHS_BLOCK_TYPES.has(block.__typename))
  );
}
