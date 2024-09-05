import {
  InstanceGoalEntry,
  ScenarioType,
} from '@/common/__generated__/paths/graphql';
import { makeVar } from '@apollo/client';

export const yearRangeVar = makeVar<[number, number]>(null!);
export const activeScenarioVar = makeVar<ScenarioType>(null!);
export const activeGoalVar = makeVar<InstanceGoalEntry | null>(null);

type SettingsVarType = {
  iconBase: string;
  ogImage: string;
  baselineName: string | null | undefined;
  minYear: number;
  maxYear: number;
  referenceYear: number;
  targetYear: number;
  latestMetricYear: number;
};

export const settingsVar = makeVar<SettingsVarType>(null!);
