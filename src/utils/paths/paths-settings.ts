import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';

/*
 * Initial values of the Paths settings (goal, scenario, year range) before the
 * visitor changes them. `SettingsPanelFull` seeds the reactive vars with
 * these in the browser; server rendering uses them directly, since the vars
 * are never set on the server.
 */

export function getDefaultGoal<Goal extends { default: boolean }>(goals: readonly Goal[]) {
  return goals.length > 1 ? goals.find((goal) => goal.default) : goals[0];
}

export function getInitialScenario<Scenario extends { isActive: boolean }>(
  scenarios: readonly Scenario[]
) {
  return scenarios.find((scenario) => scenario.isActive);
}

type YearRangeInstance = Pick<
  GetInstanceContextQuery['instance'],
  'minimumHistoricalYear' | 'referenceYear' | 'targetYear' | 'modelEndYear'
>;

export function getInitialYearRange(instance: YearRangeInstance): [number, number] {
  return [
    instance.minimumHistoricalYear ?? instance.referenceYear ?? 2010,
    instance.targetYear ?? instance.modelEndYear,
  ];
}
