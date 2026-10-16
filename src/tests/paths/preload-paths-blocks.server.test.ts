/**
 * @jest-environment node
 */
import type { ApolloClient } from '@apollo/client';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { getPlan } from '@/queries/get-plan';
import { GET_NODE_CONTENT } from '@/queries/paths/get-paths-node';
import { getPathsData } from '@/utils/paths/get-paths-data';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';
import { getPreloadKey } from '@/utils/paths/preload-key';
import { preloadPathsBlocks } from '@/utils/paths/preload-paths-blocks';

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }));
jest.mock('@common/utils/request.server', () => ({
  getRequestOrigin: () => Promise.resolve('http://zuerich.localhost:3000'),
}));
jest.mock('@/queries/get-plan', () => ({ getPlan: jest.fn() }));
jest.mock('@/utils/paths/get-paths-data', () => ({ getPathsData: jest.fn() }));
jest.mock('@/utils/paths/paths-rsc-client', () => ({ getPathsClient: jest.fn() }));

const mockedGetPlan = jest.mocked(getPlan);

const categoryListBlock = {
  __typename: 'CategoryTypeLevelListBlock',
  pathsTargetNodeId: null,
  categoryLevel: { id: 'field' },
  categoryBlockType: {
    categories: [
      { kausalPathsNodeUuid: 'heating', level: { id: 'field' }, categoryPage: { live: true } },
      // Not listed: another level, an unpublished page, no Paths node
      { kausalPathsNodeUuid: 'buildings', level: { id: 'sector' }, categoryPage: { live: true } },
      { kausalPathsNodeUuid: 'draft', level: { id: 'field' }, categoryPage: { live: false } },
      { kausalPathsNodeUuid: null, level: { id: 'field' }, categoryPage: { live: true } },
    ],
  },
};

function mockPathsInstance() {
  mockedGetPlan.mockResolvedValue({
    data: { plan: { kausalPathsInstanceUuid: 'zuerich-2025' } },
  } as Awaited<ReturnType<typeof getPlan>>);
  jest.mocked(getPathsData).mockResolvedValue({
    instance: { id: 'zuerich-2025', goals: [{ id: 'net_emissions', default: true }] },
  } as GetInstanceContextQuery);
  const query = jest.fn().mockResolvedValue({ data: { node: { id: 'heating' } } });
  jest.mocked(getPathsClient).mockResolvedValue({ query } as unknown as ApolloClient);
}

describe('preloadPathsBlocks', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('does nothing for a page without preloadable Paths blocks', async () => {
    const page = { __typename: 'StaticPage', body: [{ __typename: 'RichTextBlock' }, null] };

    await expect(preloadPathsBlocks('zuerich', 'zuerich', page)).resolves.toEqual({});
    expect(mockedGetPlan).not.toHaveBeenCalled();
  });

  it('starts a node summary query for each listed category', async () => {
    mockPathsInstance();

    const preloaded = await preloadPathsBlocks('zuerich', 'zuerich', {
      __typename: 'StaticPage',
      body: [categoryListBlock],
    });

    const key = getPreloadKey(GET_NODE_CONTENT, {
      node: 'heating',
      goal: 'net_emissions',
      targetNodeId: null,
    });
    expect(Object.keys(preloaded)).toEqual([key]);
    await expect(preloaded[key]).resolves.toEqual({ node: { id: 'heating' } });
  });

  it('starts the node summary query of a category page layout for its category', async () => {
    mockPathsInstance();
    const page = {
      __typename: 'CategoryPage',
      body: [],
      category: { kausalPathsNodeUuid: 'heating' },
      layout: { layoutMainTop: [{ __typename: 'PathsNodeSummaryBlock', pathsTargetNodeId: '' }] },
    };

    const preloaded = await preloadPathsBlocks('zuerich', 'zuerich', page);

    // An empty target node id means none, as in CategoryPageStreamField
    const key = getPreloadKey(GET_NODE_CONTENT, {
      node: 'heating',
      goal: 'net_emissions',
      targetNodeId: null,
    });
    expect(Object.keys(preloaded)).toEqual([key]);
  });

  it('does nothing for a category page whose category has no Paths node', async () => {
    const page = {
      __typename: 'CategoryPage',
      category: { kausalPathsNodeUuid: null },
      layout: { layoutMainTop: [{ __typename: 'PathsNodeSummaryBlock', pathsTargetNodeId: null }] },
    };

    await expect(preloadPathsBlocks('zuerich', 'zuerich', page)).resolves.toEqual({});
    expect(mockedGetPlan).not.toHaveBeenCalled();
  });

  it('resolves with no data instead of rejecting when a request fails', async () => {
    mockedGetPlan.mockRejectedValue(new Error('Watch API unavailable'));

    const page = { __typename: 'StaticPage', body: [categoryListBlock] };

    await expect(preloadPathsBlocks('zuerich', 'zuerich', page)).resolves.toEqual({});
  });
});
