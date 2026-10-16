/**
 * @jest-environment node
 */
import { getPlan } from '@/queries/get-plan';
import { preloadPathsBlocks } from '@/utils/paths/preload-paths-blocks';

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }));
jest.mock('@common/utils/request.server', () => ({
  getRequestOrigin: () => Promise.resolve('http://patchenstein.localhost:3000'),
}));
jest.mock('@/queries/get-plan', () => ({ getPlan: jest.fn() }));
jest.mock('@/utils/paths/get-paths-data', () => ({ getPathsData: jest.fn() }));
jest.mock('@/utils/paths/paths-rsc-client', () => ({ getPathsClient: jest.fn() }));

const mockedGetPlan = jest.mocked(getPlan);

describe('preloadPathsBlocks', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('does nothing for a page without Paths outcome blocks', async () => {
    const blocks = [{ __typename: 'RichTextBlock' }, null];

    await expect(preloadPathsBlocks('patchenstein', 'patchenstein', blocks)).resolves.toEqual([]);
    expect(mockedGetPlan).not.toHaveBeenCalled();
  });

  it('resolves with no data instead of rejecting when a request fails', async () => {
    mockedGetPlan.mockRejectedValue(new Error('Watch API unavailable'));
    const blocks = [{ __typename: 'PathsOutcomeBlock', outcomeNodeId: 'net_emissions' }];

    await expect(preloadPathsBlocks('patchenstein', 'patchenstein', blocks)).resolves.toEqual([]);
  });
});
