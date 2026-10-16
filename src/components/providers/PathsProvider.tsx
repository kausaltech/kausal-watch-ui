'use client';

import { type ReactNode } from 'react';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { PATHS_INSTANCE_SETTINGS } from '@/config/paths-instances';
import PathsContext from '@/context/paths/paths';

type InstanceGoalEntry = GetInstanceContextQuery['instance']['goals'][number];
// Complex way to define augmented instance context type
// Settings per goal
type AugmentedInstanceGoal = InstanceGoalEntry & {
  separateYears: number[] | null;
  colorAdjust: number;
  hideForecast: boolean;
  defaultOutcomeGraphType?: 'area' | 'line' | 'bar';
};

type AugmentedInstanceType = Omit<GetInstanceContextQuery['instance'], 'goals'> & {
  goals: AugmentedInstanceGoal[];
  outcomeDisclaimers: {
    year: number;
    node: string;
    goal: string;
    disclaimer: string;
  }[];
  showOutcomeNodeDetails: boolean;
};

export type PathsInstanceType = GetInstanceContextQuery & {
  instance: AugmentedInstanceType;
};

type PathsProviderProps = {
  instance: GetInstanceContextQuery | undefined;
  children: ReactNode;
};

export default function PathsProvider({ instance, children }: PathsProviderProps) {
  const pathsInstance = instance?.instance;

  const instanceSettings = pathsInstance ? PATHS_INSTANCE_SETTINGS[pathsInstance.id] : undefined;

  // Augment instance with attributes that have no backend support
  const instanceGoals: AugmentedInstanceGoal[] | undefined = pathsInstance?.goals.map((goal) => {
    // Used to visualise indirect emissions as separate years
    const separateYears = instanceSettings?.separateYears?.[goal.id] ?? null;
    // Used to adjust the color of the indirect emissions
    const colorAdjust = instanceSettings?.colorAdjust?.[goal.id] ?? 0;
    // Used to hide the forecast for the indirect emissions
    const hideForecast = instanceSettings?.hideForecast?.[goal.id] ?? false;
    // Used to set a default graph type for the goal
    const defaultOutcomeGraphType =
      instanceSettings?.defaultOutcomeGraphType?.[goal.id] ?? undefined;
    return {
      ...goal,
      separateYears,
      colorAdjust,
      hideForecast,
      defaultOutcomeGraphType,
    };
  });

  const outcomeDisclaimers: {
    year: number;
    node: string;
    goal: string;
    disclaimer: string;
  }[] = instanceSettings?.outcomeDisclaimers ?? [];

  const augmentedInstance: PathsInstanceType | undefined =
    instance && pathsInstance
      ? {
          ...instance,
          instance: {
            ...pathsInstance,
            goals: instanceGoals ?? [],
            outcomeDisclaimers,
            showOutcomeNodeDetails: instanceSettings?.showOutcomeNodeDetails ?? true,
          },
        }
      : undefined;

  return <PathsContext.Provider value={augmentedInstance}>{children}</PathsContext.Provider>;
}
