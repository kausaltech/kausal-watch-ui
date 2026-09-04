import type { Metadata } from 'next';

import { getRobotsMetadata } from '../metadata';

/**
 * Next.js merges each layout's metadata into the parent's per *own enumerable
 * key*, so a key that is present with an `undefined` value still overwrites
 * the inherited value with nothing. This mirrors that loop for the `robots`
 * key alone, so the tests below assert the behaviour that actually reaches
 * the rendered page rather than just the shape of our helper's return value.
 */
function mergeRobotsLikeNext(
  parentRobots: Metadata['robots'],
  childMetadata: Metadata
): Metadata['robots'] | null {
  let resolved: Metadata['robots'] | null = parentRobots;

  for (const key in childMetadata) {
    if (key === 'robots') {
      resolved = childMetadata.robots ?? null;
    }
  }

  return resolved;
}

const NOINDEX = { index: false, follow: false };

describe('getRobotsMetadata', () => {
  it('asks crawlers not to index when the plan is hidden from search engines', () => {
    expect(getRobotsMetadata(true)).toEqual({ robots: NOINDEX });
  });

  it('omits the robots key entirely when the plan is not hidden', () => {
    // Not `{ robots: undefined }`: see mergeRobotsLikeNext above.
    expect('robots' in getRobotsMetadata(false)).toBe(false);
  });

  it('keeps a parent layout noindex when the plan is not hidden', () => {
    const merged = mergeRobotsLikeNext(NOINDEX, {
      title: 'A plan',
      ...getRobotsMetadata(false),
    });

    expect(merged).toEqual(NOINDEX);
  });

  it('still asks crawlers not to index when the parent allows indexing', () => {
    const merged = mergeRobotsLikeNext(undefined, {
      title: 'A plan',
      ...getRobotsMetadata(true),
    });

    expect(merged).toEqual(NOINDEX);
  });
});
