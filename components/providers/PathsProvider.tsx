'use client';

import { ReactNode } from 'react';

import PathsContext, { SiteContextType } from '@/context/paths/paths';

type Props = {
  instance: SiteContextType | undefined;
  children: ReactNode;
};

export default function PathsProvider({ instance, children }: Props) {
  console.log('Paths instance', instance);
  return (
    <PathsContext.Provider value={instance}>{children}</PathsContext.Provider>
  );
}
