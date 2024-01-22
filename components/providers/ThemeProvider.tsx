'use client';

import { ReactNode } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { Theme } from '@kausal/themes/types';

type Props = {
  theme: Theme;
  children: ReactNode;
};

export default function ThemeProvider({ theme, children }: Props) {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
