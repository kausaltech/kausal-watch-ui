/**
 * @jest-environment node
 */
import type { ApolloClient } from '@apollo/client';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { getPlan } from '@/queries/get-plan';
import { GET_NODE_PAGE } from '@/queries/paths/get-paths-node-page';
import { getPathsData } from '@/utils/paths/get-paths-data';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';
import { getPreloadKey } from '@/utils/paths/preload-key';
import { getPathsNodeInfo, preloadNodePage } from '@/utils/paths/preload-node-page';

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }));
jest.mock('@common/utils/request.server', () => ({
  getRequestOrigin: () => Promise.resolve('http://zuerich.localhost:3000'),
}));
jest.mock('@/queries/get-plan', () => ({ getPlan: jest.fn() }));
jest.mock('@/utils/paths/get-paths-data', () => ({ getPathsData: jest.fn() }));
jest.mock('@/utils/paths/paths-rsc-client', () => ({ getPathsClient: jest.fn() }));

const node = { __typename: 'ActionNode', id: 'solar_panels', name: 'Solar panels' };

function mockPlan(pathsInstance: string | null, query: jest.Mock) {
  jest.mocked(getPlan).mockResolvedValue({
    data: { plan: { kausalPathsInstanceUuid: pathsInstance } },
  } as Awaited<ReturnType<typeof getPlan>>);
  jest
    .mocked(getPathsData)
    .mockResolvedValue(
      pathsInstance
        ? ({ instance: { id: 'zuerich-2025', goals: [] } } as unknown as GetInstanceContextQuery)
        : undefined
    );
  jest.mocked(getPathsClient).mockResolvedValue({ query } as unknown as ApolloClient);
}

describe('getPathsNodeInfo', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the node of the plan model', async () => {
    mockPlan('zuerich-2025', jest.fn().mockResolvedValue({ data: { node } }));

    await expect(getPathsNodeInfo('zuerich', 'zuerich', 'solar_panels')).resolves.toEqual(node);
  });

  it('returns null for a node the model does not have', async () => {
    mockPlan('zuerich-2025', jest.fn().mockResolvedValue({ data: { node: null } }));

    await expect(getPathsNodeInfo('zuerich', 'zuerich', 'nope')).resolves.toBeNull();
  });

  it('returns null without querying when the plan has no model', async () => {
    const query = jest.fn();
    mockPlan(null, query);

    await expect(getPathsNodeInfo('zuerich', 'zuerich', 'solar_panels')).resolves.toBeNull();
    expect(query).not.toHaveBeenCalled();
  });

  it("throws when the plan model's instance context fails, rather than answering not found", async () => {
    const query = jest.fn();
    mockPlan('zuerich-2025', query);
    // getPathsData reports a failed request and resolves without data
    jest.mocked(getPathsData).mockResolvedValue(undefined);

    await expect(getPathsNodeInfo('zuerich', 'zuerich', 'solar_panels')).rejects.toThrow(
      'Could not load Paths instance zuerich-2025'
    );
    expect(query).not.toHaveBeenCalled();
  });

  it('throws when the Paths API fails, rather than answering not found', async () => {
    mockPlan('zuerich-2025', jest.fn().mockRejectedValue(new Error('Bad gateway')));

    await expect(getPathsNodeInfo('zuerich', 'zuerich', 'solar_panels')).rejects.toThrow(
      'Bad gateway'
    );
  });
});

describe('preloadNodePage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('preloads the node page query with the variables the page uses', async () => {
    const pageData = { node: { ...node, metricDim: null } };
    mockPlan('zuerich-2025', jest.fn().mockResolvedValue({ data: pageData }));

    const preloaded = await preloadNodePage('zuerich', 'zuerich', 'solar_panels');

    await expect(
      preloaded[getPreloadKey(GET_NODE_PAGE, { node: 'solar_panels' })]
    ).resolves.toEqual(pageData);
  });
});
