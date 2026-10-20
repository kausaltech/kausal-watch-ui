import { useReactiveVar } from '@apollo/client/react';

import { activeGoalVar, activeScenarioVar, yearRangeVar } from '@common/apollo/paths-cache';

import { usePaths } from '@/context/paths/paths';
import {
  getDefaultGoal,
  getInitialScenario,
  getInitialYearRange,
} from '@/utils/paths/paths-settings';

/*
 * The Paths settings reactive vars are only set in the browser, once
 * `SettingsPanelFull` has mounted. Until then, and always on the server,
 * these hooks return the initial values it sets, so the server and the first
 * browser render agree.
 */

export function useActiveGoal() {
  const activeGoal = useReactiveVar(activeGoalVar);
  const paths = usePaths();
  if (activeGoal || !paths) return activeGoal;
  return getDefaultGoal(paths.instance.goals) ?? null;
}

export function useActiveScenario() {
  const activeScenario = useReactiveVar(activeScenarioVar);
  const paths = usePaths();
  if (activeScenario || !paths) return activeScenario;
  return getInitialScenario(paths.scenarios) ?? null;
}

export function useYearRange() {
  const yearRange = useReactiveVar(yearRangeVar);
  const paths = usePaths();
  if (yearRange || !paths) return yearRange;
  return getInitialYearRange(paths.instance);
}
