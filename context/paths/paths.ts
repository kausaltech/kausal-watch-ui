import React, { useContext } from 'react';

// import type { GetInstanceContextQuery } from 'common/__generated__/graphql';

export type SiteContextScenario = any;

export type SiteI18nConfig = {
  locale: string;
  defaultLocale: string;
  supportedLocales: string[];
};

export type PathsContextType =
  | {
      instance: any;
      availableNormalizations: any[];
      menuPages: any[];
      parameters: any[];
      scenarios: SiteContextScenario[];
    }
  | undefined;

const PathsContext = React.createContext<PathsContextType>(null!);

export const usePaths = () => {
  return useContext(PathsContext);
};

export default PathsContext;
