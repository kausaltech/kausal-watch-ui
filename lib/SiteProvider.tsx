'use client';

import { ReactNode } from 'react';

import SiteContext, { SiteContextProps } from '@/context/site';

export default function SiteProvider({
  baseURL,
  path,
  hostname,
  themeIdentifier,
  children,
}: SiteContextProps & { children: ReactNode }) {
  return (
    <SiteContext.Provider
      value={{
        deploymentType: process.env.DEPLOYMENT_TYPE || 'development',
        baseURL,
        path,
        hostname,
        themeIdentifier,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}
