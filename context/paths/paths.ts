import React, { useContext } from 'react';

import {
  InstanceType,
  NormalizationType,
  ParameterInterface,
  ScenarioType,
} from '@/common/__generated__/paths/graphql';

export type SiteI18nConfig = {
  locale: string;
  defaultLocale: string;
  supportedLocales: string[];
};

export type PathsContextType =
  | {
      instance: InstanceType;
      availableNormalizations: NormalizationType[];
      parameters: ParameterInterface[];
      scenarios: ScenarioType[];
    }
  | undefined;

const PathsContext = React.createContext<PathsContextType>(null!);

export const usePaths = () => {
  return useContext(PathsContext);
};

export default PathsContext;
