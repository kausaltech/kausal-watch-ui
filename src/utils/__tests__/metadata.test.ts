import type { Metadata } from 'next';

import {
  getGoogleSiteVerificationTag,
  getRobotsMetadata,
  getSiteVerificationMetadata,
} from '../metadata';

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

describe('getSiteVerificationMetadata', () => {
  it('adds the verification tag when the domain has one', () => {
    expect(getSiteVerificationMetadata('token')).toEqual({
      other: { 'google-site-verification': 'token' },
    });
  });

  it.each([null, undefined, ''])('omits the other key entirely for %p', (tag) => {
    // As with `robots`, a present `other: undefined` would overwrite whatever
    // a parent layout resolved.
    expect('other' in getSiteVerificationMetadata(tag)).toBe(false);
  });
});

describe('getGoogleSiteVerificationTag', () => {
  const planWithTag = { domain: { googleSiteVerificationTag: 'token' } };
  const planWithoutTag = { domain: { googleSiteVerificationTag: null } };
  const planWithoutDomain = { domain: null };

  it('returns the tag configured for the hostname', () => {
    expect(getGoogleSiteVerificationTag([planWithTag])).toBe('token');
  });

  it('finds the tag when another plan on the hostname has none', () => {
    // A hostname can serve several plans, each with its own domain record; any
    // tag configured for the host verifies ownership of it.
    expect(getGoogleSiteVerificationTag([planWithoutDomain, planWithoutTag, planWithTag])).toBe(
      'token'
    );
  });

  it.each([
    ['no plan has a tag', [planWithoutTag, planWithoutDomain]],
    ['the hostname serves no plans', []],
    ['the query returned nothing', undefined],
    ['the query returned null', null],
  ])('returns null when %s', (_case, plans) => {
    expect(getGoogleSiteVerificationTag(plans)).toBeNull();
  });
});
