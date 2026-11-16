import type { StreamFieldFragment } from '@/common/__generated__/graphql';

/**
 * Whether a block has the data it needs to render anything. Blocks without it
 * are left out before layout, so the blocks around them get the spacing they
 * would have if the block weren't there.
 */
export function blockHasContent(block: StreamFieldFragment): boolean {
  switch (block.__typename) {
    // The indicator may have been deleted since the block was saved
    case 'IndicatorShowcaseBlock':
      return !!block.indicator;
    case 'IndicatorGroupBlock':
      return !!block.indicators?.some(
        (item) => item?.__typename === 'IndicatorBlock' && !!item.indicator
      );
    default:
      return true;
  }
}

/**
 * Leaves out blocks without content. Section numbers count every block, so a
 * block's `section-N` anchor stays the same when a block before it is left out.
 */
export function keepBlocksWithContent(allBlocks: StreamFieldFragment[]) {
  const kept = allBlocks
    .map((block, index) => ({ block, sectionNumber: index + 1 }))
    .filter(({ block }) => blockHasContent(block));
  return {
    blocks: kept.map(({ block }) => block),
    sectionNumbers: kept.map(({ sectionNumber }) => sectionNumber),
  };
}
