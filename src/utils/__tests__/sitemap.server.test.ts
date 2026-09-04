import type * as ApolloClientModule from '@apollo/client';
import { Kind } from 'graphql';
import type { DocumentNode } from 'graphql';

import {
  getSitemapUrlVariantsForPlan,
  getSitemapUrlsForOrigin,
  getSitemapUrlsForPlan,
} from '../sitemap.server';

type MockQueryOptions = { query: DocumentNode };
type MockQueryResult = { data: Record<string, unknown> };

const mockQuery = jest.fn<Promise<MockQueryResult>, [MockQueryOptions]>();

jest.mock('@apollo/client', () => ({
  ...jest.requireActual<typeof ApolloClientModule>('@apollo/client'),
  // Indirection so the client picks up the mock defined below at call time,
  // rather than dereferencing it while `jest.mock` is still hoisted.
  ApolloClient: jest.fn(() => ({
    query: (options: MockQueryOptions) => mockQuery(options),
  })),
}));

const getOperationName = (query: DocumentNode) =>
  query.definitions.find((definition) => definition.kind === Kind.OPERATION_DEFINITION)?.name
    ?.value;

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

  it('treats an empty base path as a root domain', () => {
    // `domain(hostname:)` resolves wildcard/staging hosts to an empty base path
    // rather than null; these should still be treated as root domains.
    expect(getSitemapUrlVariantsForPlan('/actions/foo', makePlan(''), origin, hostname)).toEqual([
      'https://example.com/actions/foo',
      'https://example.com/de/actions/foo',
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

const hiddenPlanDomain = { id: '1', hostname, basePath: null, __typename: 'PlanDomain' };

const hiddenPlan = {
  id: '1',
  primaryLanguage: 'en',
  otherLanguages: [],
  domain: hiddenPlanDomain,
  features: { hideFromSearchEngines: true, __typename: 'PlanFeatures' },
  actions: [{ id: '1', identifier: 'foo', __typename: 'Action' }],
  pages: [],
  __typename: 'Plan',
};

beforeEach(() => {
  mockQuery.mockReset();
  mockQuery.mockImplementation(({ query }) => {
    switch (getOperationName(query)) {
      case 'PlansByHostname':
        return Promise.resolve({
          data: {
            plansForHostname: [
              {
                ...hiddenPlan,
                identifier: 'plan',
                domains: [hiddenPlanDomain],
              },
            ],
          },
        });
      case 'Sitemap':
        return Promise.resolve({ data: { planIndicators: [], plan: hiddenPlan } });
      default:
        throw new Error(`Unexpected query: ${getOperationName(query) ?? 'unnamed'}`);
    }
  });
});

type SitemapUrlOptions = Parameters<typeof getSitemapUrlsForOrigin>[1];

/**
 * Both url builders resolve a plan themselves, so each needs to honour the
 * indexing feature the same way.
 */
function describeHiddenPlanHandling(
  name: string,
  getUrls: (options: SitemapUrlOptions) => Promise<string[]>
) {
  describe(name, () => {
    it('returns no urls for a hidden plan when excluding plans hidden from search engines', async () => {
      await expect(getUrls({ excludeHiddenFromSearchEngines: true })).resolves.toEqual([]);
    });

    it('returns urls for a hidden plan by default', async () => {
      // Callers that authorise access to pages rather than advertise urls to
      // crawlers, such as the PDF export, must not be affected by the feature.
      await expect(getUrls({})).resolves.toContain(`${origin}/actions/foo`);
    });
  });
}

describeHiddenPlanHandling('getSitemapUrlsForOrigin', (options) =>
  getSitemapUrlsForOrigin(origin, options)
);

describeHiddenPlanHandling('getSitemapUrlsForPlan', (options) =>
  getSitemapUrlsForPlan(origin, '1', options)
);
