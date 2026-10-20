import { captureException } from '@sentry/nextjs';

import { loadTheme } from '@common/themes/theme-init.server';
import { getRequestOrigin } from '@common/utils/request.server';

import { getPlan } from '@/queries/get-plan';
import {
  GET_INSTANCE_GOAL_OUTCOME,
  getGoalOutcomeVariables,
} from '@/queries/paths/get-paths-goal-outcome';
import { GET_SCENARIOS } from '@/queries/paths/get-paths-scenarios';
import { tryRequest } from '@/utils/api.utils';
import { getDefaultGoal } from '@/utils/paths/paths-settings';
import {
  type PathsPreloadedQueries,
  preloadPathsQueries,
} from '@/utils/paths/preload-paths-queries';

/**
 * Preload the data of the Paths settings panel (`SettingsPanelFull`): the
 * scenarios for `ScenarioSelector` and the default goal's outcome for
 * `GoalOutcomeBar`. See `preloadPathsQueries`.
 */
export async function preloadSettingsPanel(
  domain: string,
  plan: string
): Promise<PathsPreloadedQueries> {
  try {
    return await startSettingsPanelQueries(domain, plan);
  } catch (error) {
    captureException(error, { extra: { domain, plan, context: 'preloadSettingsPanel' } });
    return {};
  }
}

async function startSettingsPanelQueries(
  domain: string,
  plan: string
): Promise<PathsPreloadedQueries> {
  // Cached for the request, the plan layout made this request already
  const { data: planData } = await tryRequest(getPlan(domain, plan, await getRequestOrigin()));
  if (!planData?.plan?.kausalPathsInstanceUuid) return {};
  // The panel is not shown when the theme disables scenario editing
  const theme = await loadTheme(planData.plan.themeIdentifier || plan);
  if (theme.settings.paths.disableScenarioEditing) return {};

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
