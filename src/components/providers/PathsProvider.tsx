'use client';

import type { ReactNode } from 'react';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import PathsContext from '@/context/paths/paths';

type InstanceGoalEntry = GetInstanceContextQuery['instance']['goals'][number];
// Complex way to define augmented instance context type
type AugmentedInstanceGoal = InstanceGoalEntry & {
  separateYears: number[] | null;
  colorAdjust: number;
  hideForecast: boolean;
};

type AugmentedInstanceType = Omit<GetInstanceContextQuery['instance'], 'goals'> & {
  goals: AugmentedInstanceGoal[];
  outcomeDisclaimers: {
    year: number;
    node: string;
    goal: string;
    disclaimer: string;
  }[];
  colorAdjust: Record<string, number>;
};

export type PathsInstanceType = GetInstanceContextQuery & {
  instance: AugmentedInstanceType;
};

type PathsProviderProps = {
  instance: PathsInstanceType | undefined;
  children: ReactNode;
};

const PER_INSTANCE_SETTINGS: Record<
  string,
  {
    separateYears?: Record<string, number[] | null>;
    outcomeDisclaimers?: { year: number; node: string; goal: string; disclaimer: string }[];
    colorAdjust?: Record<string, number>;
    hideForecast?: Record<string, boolean>;
  }
> = {
  'lappeenranta-nzc': {
    separateYears: {
      net_emissions: null,
    },
    outcomeDisclaimers: [
      {
        year: 2020,
        node: 'net_emissions',
        goal: 'net_emissions',
        disclaimer: 'Testing disclaimer',
      },
    ],
  },
  zuerich: {
    separateYears: {
      'net_emissions/emission_scope:indirect': [1990, 2010, 2015, 2020, 2022, 2023],
      'net_emissions/emission_scope:direct+negative': null,
    },
    outcomeDisclaimers: [
      {
        year: 2023,
        node: 'net_emissions',
        goal: 'net_emissions/emission_scope:direct+negative',
        disclaimer: 'Die Werte für den Bereich Mobilität 2023 sind provisorisch',
      },
    ],
    colorAdjust: {
      'net_emissions/emission_scope:indirect': 1.75,
      'net_emissions/emission_scope:direct+negative': 0,
    },
    hideForecast: {
      'net_emissions/emission_scope:indirect': true,
      'net_emissions/emission_scope:direct+negative': false,
    },
  },
  'zuerich-dev': {
    separateYears: {
      'net_emissions/emission_scope:indirect': [1990, 2010, 2015, 2020, 2022, 2023, 2024],
      'net_emissions/emission_scope:direct+negative': null,
    },
    outcomeDisclaimers: [
      {
        year: 2024,
        node: 'net_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer: 'Text TBC',
      },
    ],
    colorAdjust: {
      'net_emissions/emission_scope:indirect': 1.75,
      'net_emissions/emission_scope:direct+negative': 0,
    },
    hideForecast: {
      'net_emissions/emission_scope:indirect': true,
      'net_emissions/emission_scope:direct+negative': false,
    },
  },
};

export default function PathsProvider({ instance, children }: PathsProviderProps) {
  const pathsInstance = instance?.instance;
  if (!pathsInstance) return undefined;
  const instanceSettings = PER_INSTANCE_SETTINGS[pathsInstance.id];

  // Augment instance with attributes that have no backend support
  const instanceGoals: AugmentedInstanceGoal[] | undefined = pathsInstance?.goals.map((goal) => {
    // Used to visualise indirect emissions as separate years
    const separateYears = instanceSettings?.separateYears?.[goal.id] ?? null;
    // Used to adjust the color of the indirect emissions
    const colorAdjust = instanceSettings?.colorAdjust?.[goal.id] ?? 0;
    // Used to hide the forecast for the indirect emissions
    const hideForecast = instanceSettings?.hideForecast?.[goal.id] ?? false;
    return {
      ...goal,
      separateYears,
      colorAdjust,
      hideForecast,
    };
  });

  const outcomeDisclaimers: {
    year: number;
    node: string;
    goal: string;
    disclaimer: string;
  }[] = instanceSettings?.outcomeDisclaimers || [];

  const augmentedInstance: PathsInstanceType | undefined =
    instance && pathsInstance
      ? {
          ...instance,
          instance: { ...pathsInstance, goals: instanceGoals || [], outcomeDisclaimers },
        }
      : undefined;

  return <PathsContext.Provider value={augmentedInstance}>{children}</PathsContext.Provider>;
}
