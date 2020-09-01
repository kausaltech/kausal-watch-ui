import React from 'react';

type SiteContextProps = {
  instanceType: string,
  domain: string,
  theme: string,
};

const SiteContext = React.createContext<Partial<SiteContextProps>>({
  instanceType: 'development',
});

export default SiteContext;
