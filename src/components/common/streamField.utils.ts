import type { SeverityLevel } from '@sentry/nextjs';

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
 * Blocks whose stored data points to something that no longer exists, with
 * their section numbers. The indicator chooser of a showcase block requires an
 * indicator, so a null one was deleted after the block was saved or never
 * existed in this database. An empty indicator group isn't listed: the backend
 * drops deleted indicators from it, so it looks like a group an editor left empty.
 */
export function findBrokenReferences(allBlocks: StreamFieldFragment[]) {
  return allBlocks
    .map((block, index) => ({ block, sectionNumber: index + 1 }))
    .filter(({ block }) => block.__typename === 'IndicatorShowcaseBlock' && !block.indicator);
}

type BrokenReference = ReturnType<typeof findBrokenReferences>[number];

/**
 * The Sentry report for a block with a broken reference. The message names the
 * page and section: Sentry's Dedupe integration drops an event whose message
 * and fingerprint match the previous event's, ignoring tags and extra data, so
 * a second broken block would otherwise go unreported. The fixed fingerprint
 * keeps every report in one issue.
 */
export function buildBrokenReferenceReport(
  { block, sectionNumber }: BrokenReference,
  page: { __typename: string; id?: string | null; slug: string },
  planId: string
) {
  const section = `section-${sectionNumber}`;
  return {
    message:
      `${block.__typename} left out: its indicator no longer exists ` +
      `(${page.__typename} ${page.id ?? page.slug}, ${section})`,
    captureContext: {
      level: 'warning' as SeverityLevel,
      fingerprint: ['stream-field-broken-reference', block.__typename],
      tags: {
        'page-type': page.__typename,
        'block-type': block.__typename,
        plan: planId,
      },
      extra: {
        pageId: page.id,
        pageSlug: page.slug,
        section,
        field: block.field,
      },
    },
  };
}

const REPORTED_BROKEN_BLOCKS_KEY = 'reported-broken-stream-field-blocks';

/** Covers the current page load when session storage can't be used */
const reportedBrokenBlocks = new Set<string>();

/**
 * Marks a broken block as reported and returns whether it already was. The
 * keys are kept in session storage, so reloading the page or coming back to
 * it in the same tab doesn't report the block again.
 */
export function markBrokenBlockReported(key: string): boolean {
  if (reportedBrokenBlocks.has(key)) return true;
  reportedBrokenBlocks.add(key);
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(REPORTED_BROKEN_BLOCKS_KEY) ?? '[]');
    const keys: unknown[] = Array.isArray(stored) ? stored : [];
    if (keys.includes(key)) return true;
    sessionStorage.setItem(REPORTED_BROKEN_BLOCKS_KEY, JSON.stringify([...keys, key]));
  } catch {
    // Storage is blocked, full or holds something else; the set above still applies
  }
  return false;
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
