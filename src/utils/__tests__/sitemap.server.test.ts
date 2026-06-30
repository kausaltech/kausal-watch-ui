import { getSitemapUrlVariantsForPlan } from '../sitemap.server';

const origin = 'https://example.com';
const hostname = 'example.com';

function makePlan(domainBasePath: string | null, domainsBasePaths: Array<string | null> = []) {
  return {
    id: 'plan',
    identifier: 'plan',
    primaryLanguage: 'en',
    otherLanguages: ['de'],
    domain: {
      hostname,
      basePath: domainBasePath,
    },
    domains: domainsBasePaths.map((basePath) => ({
      hostname,
      basePath,
    })),
    __typename: 'Plan',
  } as Parameters<typeof getSitemapUrlVariantsForPlan>[1];
}

describe('getSitemapUrlVariantsForPlan', () => {
  it('generates root and locale variants for root-domain plans', () => {
    expect(getSitemapUrlVariantsForPlan('/actions/foo', makePlan(null), origin, hostname)).toEqual([
      'https://example.com/actions/foo',
      'https://example.com/de/actions/foo',
    ]);
  });

  it('does not generate root variants for base-path-only plans', () => {
    expect(
      getSitemapUrlVariantsForPlan('/actions/foo', makePlan('climate'), origin, hostname)
    ).toEqual([
      'https://example.com/climate/actions/foo',
      'https://example.com/de/climate/actions/foo',
    ]);
  });

  it('generates both root and base-path variants when both matching domains exist', () => {
    expect(
      getSitemapUrlVariantsForPlan('/actions/foo', makePlan(null, ['climate']), origin, hostname)
    ).toEqual([
      'https://example.com/actions/foo',
      'https://example.com/climate/actions/foo',
      'https://example.com/de/actions/foo',
      'https://example.com/de/climate/actions/foo',
    ]);
  });
});
