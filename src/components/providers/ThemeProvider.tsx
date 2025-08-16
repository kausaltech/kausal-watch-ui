'use client';

import type { ReactNode } from 'react';

import type { Theme } from '@kausal/themes/types';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { CommonThemeProvider } from '@common/providers/CommonThemeProvider';

type Props = {
  theme: Theme;
  children: ReactNode;
};

export default function ThemeProvider({ theme, children }: Props) {
  return (
    <SCThemeProvider theme={theme}>
      <CommonThemeProvider theme={theme}>{children}</CommonThemeProvider>
    </SCThemeProvider>
  );
}
