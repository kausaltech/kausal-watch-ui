'use client';

import { type ReactNode, useMemo } from 'react';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import type { Theme } from '@kausal/themes/types';

import { initializeMuiTheme } from '@common/themes/mui-theme/theme';

type Props = {
  theme: Theme;
  children: ReactNode;
};

export default function ThemeProvider({ theme, children }: Props) {
  // Rebuilt whenever the plan's theme changes, including across a client-side
  // navigation between two plans that share a hostname and differ only by
  // basePath. `initializeMuiTheme` must not cache across themes itself.
  const muiTheme = useMemo(() => initializeMuiTheme(theme), [theme]);

  return <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>;
}
