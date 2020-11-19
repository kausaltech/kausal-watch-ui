import React from 'react';

type SiteContextProps = {
  instanceType: string,
  themeIdentifier: string,
  hostname: string,
  baseURL: string,
  path: string,
};

const SiteContext = React.createContext<Partial<SiteContextProps>>({
  instanceType: 'development',
});

export default SiteContext;
