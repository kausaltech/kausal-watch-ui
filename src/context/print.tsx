'use client';

import { createContext, useContext } from 'react';

import { useSearchParams } from 'next/navigation';

const PrintContext = createContext<boolean>(false);

export function PrintProvider({ children }: React.PropsWithChildren) {
  const searchParams = useSearchParams();
  const isPrint = searchParams.get('print') === 'true';

  return <PrintContext.Provider value={isPrint}>{children}</PrintContext.Provider>;
}

export const usePrint = () => useContext(PrintContext);
