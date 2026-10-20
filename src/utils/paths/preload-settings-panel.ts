import { cache } from 'react';

import { headers } from 'next/headers';

import { captureException } from '@sentry/nextjs';

import { loadTheme } from '@common/themes/theme-init.server';
import { getRequestOrigin } from '@common/utils/request.server';

import { STATIC_ROUTES } from '@/constants/routes';
import { getContentPage } from '@/queries/get-content-page';
import { getHomePage } from '@/queries/get-home-page';
import { getPlan } from '@/queries/get-plan';
import {
  GET_INSTANCE_GOAL_OUTCOME,
  getGoalOutcomeVariables,
} from '@/queries/paths/get-paths-goal-outcome';
import { GET_SCENARIOS } from '@/queries/paths/get-paths-scenarios';
import { tryRequest } from '@/utils/api.utils';
import { pageShowsPathsSettings } from '@/utils/paths/paths-content';
import { getDefaultGoal } from '@/utils/paths/paths-settings';
import {
  type PathsPreloadedQueries,
  preloadPathsQueries,
} from '@/utils/paths/preload-paths-queries';
import { stripLocaleAndPlan } from '@/utils/urls';

/** The page's path within the plan, from the visitor-facing URL */
async function getRequestPagePath(
  plan: { domain?: { basePath?: string | null } | null },
  locale: string
) {
  const url = (await headers()).get('x-url');
  if (!url) return null;
  const path = stripLocaleAndPlan(plan, locale, new URL(url).pathname);
  return `/${path.split('/').map(decodeURIComponent).join('/')}`;
}

/**
 * Whether the settings panel shows on the page being rendered, by
 * `pageShowsPathsSettings`, as the page's `SettingsPanelVisibility` decides.
 */
export const getSettingsPanelVisibility = cache(async function getSettingsPanelVisibility(
  domain: string,
  plan: string,
  locale: string
): Promise<boolean> {
  try {
    // Cached for the request, the plan layout made this request already
    const { data: planData } = await tryRequest(getPlan(domain, plan, await getRequestOrigin()));
    const planInfo = planData?.plan;
    if (!planInfo?.kausalPathsInstanceUuid) return false;
    const { settings } = await loadTheme(planInfo.themeIdentifier || plan);
    if (settings.paths.disableScenarioEditing) return false;
    if (!settings.paths.allowHidingSettingsPanel) return true;

    const path = await getRequestPagePath(planInfo, locale);
    if (!path) return false;
    if (STATIC_ROUTES.some((route) => path === route || path.startsWith(`${route}/`))) {
      return false;
    }
    const page =
      path === '/'
        ? (await tryRequest(getHomePage(plan))).data?.planPage
        : (await tryRequest(getContentPage(plan, path))).data?.planPage;
    return !!page && pageShowsPathsSettings(page);
  } catch (error) {
    captureException(error, { extra: { domain, plan, context: 'getSettingsPanelVisibility' } });
    return false;
  }
});

/**
 * Preload the settings panel's scenarios and default goal outcome, when the
 * panel shows. See `preloadPathsQueries`.
 */
export async function preloadSettingsPanel(
  domain: string,
  plan: string,
  visible: Promise<boolean>
): Promise<PathsPreloadedQueries> {
  if (!(await visible)) return {};
  return preloadPathsQueries(domain, plan, (paths) => {
    const goal = getDefaultGoal(paths.instance.goals)?.id;
    return [
      // The instance context has the scenarios already, fetched for this session
      { query: GET_SCENARIOS, variables: {}, data: { scenarios: paths.scenarios } },
      ...(goal
        ? [{ query: GET_INSTANCE_GOAL_OUTCOME, variables: getGoalOutcomeVariables(goal) }]
        : []),
    ];
  });
}
