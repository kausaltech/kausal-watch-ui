'use client';

import { ReactNode } from 'react';

import PathsContext, { SiteContextType } from '@/context/paths/paths';

type Props = {
  instance: SiteContextType | undefined;
  children: ReactNode;
};

export default function PathsProvider({ instance, children }: Props) {
  console.log('Paths instance', instance);
  const pathsInstance = instance?.instance;
  const pathsAvailableNormalizations = instance?.availableNormalizations;
  const pathsParameters = instance?.parameters;
  const pathsScenarios = instance?.scenarios;

  // Augment instance with attributes that have no backend support
  const instanceGoals = pathsInstance?.goals.map((goal) => {
    const separateYears =
      goal.id === 'net_emissions/emission_scope:indirect'
        ? [1990, 2010, 2015, 2020, 2022, 2023]
        : null;
    return {
      ...goal,
      separateYears,
    };
  });

  const augmentedInstance = {
    instance: { ...pathsInstance, goals: instanceGoals },
    availableNormalizations: pathsAvailableNormalizations,
    parameters: pathsParameters,
    scenarios: pathsScenarios,
  };
  return (
    <PathsContext.Provider value={augmentedInstance}>
      {children}
    </PathsContext.Provider>
  );
}
