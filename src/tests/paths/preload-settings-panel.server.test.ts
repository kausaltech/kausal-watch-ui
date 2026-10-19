/**
 * @jest-environment node
 */
import type { ApolloClient } from '@apollo/client';

import { loadTheme } from '@common/themes/theme-init.server';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { getContentPage } from '@/queries/get-content-page';
import { getHomePage } from '@/queries/get-home-page';
import { getPlan } from '@/queries/get-plan';
import { GET_INSTANCE_GOAL_OUTCOME } from '@/queries/paths/get-paths-goal-outcome';
import { GET_SCENARIOS } from '@/queries/paths/get-paths-scenarios';
import { getPathsData } from '@/utils/paths/get-paths-data';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';
import { getPreloadKey } from '@/utils/paths/preload-key';
import {
  getSettingsPanelVisibility,
  preloadSettingsPanel,
} from '@/utils/paths/preload-settings-panel';

const requestHeaders = new Map<string, string>();

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }));
jest.mock('next/headers', () => ({
  headers: () => Promise.resolve({ get: (name: string) => requestHeaders.get(name) ?? null }),
}));
jest.mock('@common/utils/request.server', () => ({
  getRequestOrigin: () => Promise.resolve('http://zuerich.localhost:3000'),
}));
jest.mock('@common/themes/theme-init.server', () => ({ loadTheme: jest.fn() }));
jest.mock('@/queries/get-plan', () => ({ getPlan: jest.fn() }));
jest.mock('@/queries/get-content-page', () => ({ getContentPage: jest.fn() }));
jest.mock('@/queries/get-home-page', () => ({ getHomePage: jest.fn() }));
jest.mock('@/utils/paths/get-paths-data', () => ({ getPathsData: jest.fn() }));
jest.mock('@/utils/paths/paths-rsc-client', () => ({ getPathsClient: jest.fn() }));

const scenarios = [
  { __typename: 'ScenarioType', id: 'default', name: 'Netto-Null 2040', isActive: true },
];

function mockPlan(
  theme: { disableScenarioEditing?: boolean; allowHidingSettingsPanel?: boolean } = {}
) {
  jest.mocked(getPlan).mockResolvedValue({
    data: {
      plan: {
        kausalPathsInstanceUuid: 'zuerich-2025',
        themeIdentifier: 'zuerich',
        domain: { basePath: null },
      },
    },
  } as Awaited<ReturnType<typeof getPlan>>);
  jest.mocked(loadTheme).mockResolvedValue({
    settings: {
      paths: {
        disableScenarioEditing: theme.disableScenarioEditing ?? false,
        allowHidingSettingsPanel: theme.allowHidingSettingsPanel ?? true,
      },
    },
  } as Awaited<ReturnType<typeof loadTheme>>);
  jest.mocked(getPathsData).mockResolvedValue({
    instance: { id: 'zuerich-2025', goals: [{ id: 'net_emissions', default: true }] },
    scenarios,
  } as unknown as GetInstanceContextQuery);
  const query = jest.fn().mockResolvedValue({ data: { instance: { id: 'zuerich-2025' } } });
  jest.mocked(getPathsClient).mockResolvedValue({ query } as unknown as ApolloClient);
  return query;
}

function mockPage(page: { __typename: string; body?: { blockType: string }[] } | null) {
  const result = { data: { planPage: page } };
  jest
    .mocked(getContentPage)
    .mockResolvedValue(result as Awaited<ReturnType<typeof getContentPage>>);
  jest.mocked(getHomePage).mockResolvedValue(result as Awaited<ReturnType<typeof getHomePage>>);
}

const visibility = (path: string) => {
  requestHeaders.set('x-url', `https://zuerich.example.com/de-CH${path}`);
  return getSettingsPanelVisibility('zuerich', 'zuerich', 'de-CH');
};

afterEach(() => {
  jest.resetAllMocks();
  requestHeaders.clear();
});

describe('preloadSettingsPanel', () => {
  it('serves the scenarios from the instance context and preloads the goal outcome', async () => {
    const query = mockPlan();

    const preloaded = await preloadSettingsPanel('zuerich', 'zuerich', Promise.resolve(true));

    await expect(preloaded[getPreloadKey(GET_SCENARIOS, {})]).resolves.toEqual({ scenarios });
    const outcomeKey = getPreloadKey(GET_INSTANCE_GOAL_OUTCOME, { goal: 'net_emissions' });
    await expect(preloaded[outcomeKey]).resolves.toEqual({ instance: { id: 'zuerich-2025' } });
    // Only the goal outcome is queried
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('preloads nothing when the panel does not show on the page', async () => {
    mockPlan();

    await expect(
      preloadSettingsPanel('zuerich', 'zuerich', Promise.resolve(false))
    ).resolves.toEqual({});
    expect(getPathsData).not.toHaveBeenCalled();
  });
});

describe('getSettingsPanelVisibility', () => {
  it('shows the panel on a page with Paths blocks', async () => {
    mockPlan();
    mockPage({ __typename: 'StaticPage', body: [{ blockType: 'PathsOutcomeBlock' }] });

    await expect(visibility('/klimaschutzplan/handlungsfelder')).resolves.toBe(true);
    expect(getContentPage).toHaveBeenCalledWith('zuerich', '/klimaschutzplan/handlungsfelder');
  });

  it('shows the panel on category pages', async () => {
    mockPlan();
    mockPage({ __typename: 'CategoryPage', body: [] });

    await expect(visibility('/handlungsfelder/gebaeude')).resolves.toBe(true);
  });

  it('hides the panel on a page without Paths blocks', async () => {
    mockPlan();
    mockPage({ __typename: 'StaticPage', body: [{ blockType: 'RichTextBlock' }] });

    await expect(visibility('/about')).resolves.toBe(false);
  });

  it('reads the front page with the home page query', async () => {
    mockPlan();
    mockPage({ __typename: 'PlanRootPage', body: [{ blockType: 'PathsOutcomeBlock' }] });

    await expect(visibility('/')).resolves.toBe(true);
    expect(getHomePage).toHaveBeenCalledWith('zuerich');
    expect(getContentPage).not.toHaveBeenCalled();
  });

  it('hides the panel on static routes without querying their content', async () => {
    mockPlan();

    await expect(visibility('/actions/12')).resolves.toBe(false);
    expect(getContentPage).not.toHaveBeenCalled();
  });

  it('shows the panel everywhere when the theme does not allow hiding it', async () => {
    mockPlan({ allowHidingSettingsPanel: false });

    await expect(visibility('/actions')).resolves.toBe(true);
    expect(getContentPage).not.toHaveBeenCalled();
  });

  it('hides the panel when the theme disables scenario editing', async () => {
    mockPlan({ disableScenarioEditing: true, allowHidingSettingsPanel: false });

    await expect(visibility('/')).resolves.toBe(false);
  });
});
