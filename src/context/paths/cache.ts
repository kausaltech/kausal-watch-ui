import { makeVar } from '@apollo/client';

import { type GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';

export const yearRangeVar = makeVar<[number, number]>(null!);
export const activeScenarioVar = makeVar<GetInstanceContextQuery['scenarios'][number] | null>(null);
export const activeGoalVar = makeVar<GetInstanceContextQuery['instance']['goals'][number] | null>(
  null
);

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
