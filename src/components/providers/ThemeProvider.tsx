'use client';

import type { ReactNode } from 'react';

import type { Theme } from '@kausal/themes/types';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { initializeMuiTheme } from '@common/themes/mui-theme/theme';

type Props = {
  theme: Theme;
  children: ReactNode;
};

export default function ThemeProvider({ theme, children }: Props) {
  const muiTheme = initializeMuiTheme(theme);
  return <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>;
}
