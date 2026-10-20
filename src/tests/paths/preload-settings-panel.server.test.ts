/**
 * @jest-environment node
 */
import type { ApolloClient } from '@apollo/client';

import { loadTheme } from '@common/themes/theme-init.server';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { getPlan } from '@/queries/get-plan';
import { GET_INSTANCE_GOAL_OUTCOME } from '@/queries/paths/get-paths-goal-outcome';
import { GET_SCENARIOS } from '@/queries/paths/get-paths-scenarios';
import { getPathsData } from '@/utils/paths/get-paths-data';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';
import { getPreloadKey } from '@/utils/paths/preload-key';
import { preloadSettingsPanel } from '@/utils/paths/preload-settings-panel';

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }));
jest.mock('@common/utils/request.server', () => ({
  getRequestOrigin: () => Promise.resolve('http://zuerich.localhost:3000'),
}));
jest.mock('@common/themes/theme-init.server', () => ({ loadTheme: jest.fn() }));
jest.mock('@/queries/get-plan', () => ({ getPlan: jest.fn() }));
jest.mock('@/utils/paths/get-paths-data', () => ({ getPathsData: jest.fn() }));
jest.mock('@/utils/paths/paths-rsc-client', () => ({ getPathsClient: jest.fn() }));

const scenarios = [
  { __typename: 'ScenarioType', id: 'default', name: 'Netto-Null 2040', isActive: true },
];

function mockPlan({ disableScenarioEditing }: { disableScenarioEditing: boolean }) {
  jest.mocked(getPlan).mockResolvedValue({
    data: { plan: { kausalPathsInstanceUuid: 'zuerich-2025', themeIdentifier: 'zuerich' } },
  } as Awaited<ReturnType<typeof getPlan>>);
  jest.mocked(loadTheme).mockResolvedValue({
    settings: { paths: { disableScenarioEditing } },
  } as Awaited<ReturnType<typeof loadTheme>>);
  jest.mocked(getPathsData).mockResolvedValue({
    instance: { id: 'zuerich-2025', goals: [{ id: 'net_emissions', default: true }] },
    scenarios,
  } as unknown as GetInstanceContextQuery);
  const query = jest.fn().mockResolvedValue({ data: { instance: { id: 'zuerich-2025' } } });
  jest.mocked(getPathsClient).mockResolvedValue({ query } as unknown as ApolloClient);
  return query;
}

describe('preloadSettingsPanel', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('serves the scenarios from the instance context and preloads the goal outcome', async () => {
    const query = mockPlan({ disableScenarioEditing: false });

    const preloaded = await preloadSettingsPanel('zuerich', 'zuerich');

    await expect(preloaded[getPreloadKey(GET_SCENARIOS, {})]).resolves.toEqual({ scenarios });
    const outcomeKey = getPreloadKey(GET_INSTANCE_GOAL_OUTCOME, { goal: 'net_emissions' });
    await expect(preloaded[outcomeKey]).resolves.toEqual({ instance: { id: 'zuerich-2025' } });
    // Only the goal outcome is queried
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('preloads nothing when the theme hides the settings panel', async () => {
    mockPlan({ disableScenarioEditing: true });

    await expect(preloadSettingsPanel('zuerich', 'zuerich')).resolves.toEqual({});
    expect(getPathsData).not.toHaveBeenCalled();
  });
});
