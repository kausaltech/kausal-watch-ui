import React from 'react';

type SiteContextProps = {
  deploymentType: string;
  themeIdentifier: string;
  hostname: string;
  baseURL: string;
  path: string;
};

const SiteContext = React.createContext<Partial<SiteContextProps>>({
  deploymentType: 'development',
});

export const useSite = () => useContext(SiteContext);
export default SiteContext;
