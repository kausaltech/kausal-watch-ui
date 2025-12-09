import { makeVar } from '@apollo/client';

import type { PathsInstanceType } from '@/components/providers/PathsProvider';

export const yearRangeVar = makeVar<[number, number]>(null!);
export const activeScenarioVar = makeVar<PathsInstanceType['scenarios'][number] | null>(null);
export const activeGoalVar = makeVar<PathsInstanceType['instance']['goals'][number] | null>(null);

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
