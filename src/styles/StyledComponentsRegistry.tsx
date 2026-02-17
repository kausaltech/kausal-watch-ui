'use client';

import type { PropsWithChildren } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export function EmotionRegistry({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>{children}</AppRouterCacheProvider>
  );
}
