'use client';

import { ReactNode } from 'react';

import PathsContext from '@/context/paths/paths';
import {
  GetInstanceContextQuery,
  InstanceGoalEntry,
} from '@/common/__generated__/paths/graphql';

type PathsProviderProps = {
  instance: GetInstanceContextQuery | undefined;
  children: ReactNode;
};

// Complex way to define augmented instance context type
type AugmentedInstanceGoal = InstanceGoalEntry & {
  separateYears: number[] | null;
  colorAdjust: number;
  hideForecast: boolean;
};

type AugmentedInstanceType = Omit<
  GetInstanceContextQuery['instance'],
  'goals'
> & {
  goals: AugmentedInstanceGoal[];
};

export type PathsInstanceType = GetInstanceContextQuery & {
  instance: AugmentedInstanceType;
};

export default function PathsProvider({
  instance,
  children,
}: PathsProviderProps) {
  const pathsInstance = instance?.instance;
  const pathsAvailableNormalizations = instance?.availableNormalizations;
  const pathsParameters = instance?.parameters;
  const pathsScenarios = instance?.scenarios;

  // Augment instance with attributes that have no backend support
  const instanceGoals: AugmentedInstanceGoal[] | undefined =
    pathsInstance?.goals.map((goal) => {
      const separateYears =
        goal.id === 'net_emissions/emission_scope:indirect'
          ? [1990, 2010, 2015, 2020, 2022, 2023]
          : null;
      const colorAdjust =
        goal.id === 'net_emissions/emission_scope:indirect' ? 1.75 : 0;
      const hideForecast =
        goal.id === 'net_emissions/emission_scope:indirect' ? true : false;
      return {
        ...(goal as InstanceGoalEntry),
        separateYears,
        colorAdjust,
        hideForecast,
      };
    });

  const augmentedInstance: PathsInstanceType | undefined =
    instance && pathsInstance
      ? {
          instance: { ...pathsInstance, goals: instanceGoals || [] },
          availableNormalizations: pathsAvailableNormalizations || [],
          parameters: pathsParameters || [],
          scenarios: pathsScenarios || [],
        }
      : undefined;

  return (
    <PathsContext.Provider value={augmentedInstance}>
      {children}
    </PathsContext.Provider>
  );
}
