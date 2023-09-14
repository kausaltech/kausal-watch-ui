import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import 'styled-components';

import type { Theme } from '@kausal/themes/types';
import { makeThemePropType } from '@kausal/themes/props';

export function useTheme() {
  return useContext<Theme>(ThemeContext);
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// TODO: Missing css validator is throwing errors
export const themeProp = await makeThemePropType();

export async function loadTheme(themeIdentifier: string) {
  let themeProps: Theme;

  try {
    const theme = await import(
      `public/static/themes/${themeIdentifier}/theme.json`
    );
    themeProps = theme.default;
  } catch (error) {
    console.error(`Theme with identifier ${themeIdentifier} not found`);
    console.error(error);
    const theme = await import(`public/static/themes/default/theme.json`);
    themeProps = theme.default;
  }
  return themeProps;
}

export function getThemeCSS(themeIdentifier: string) {
  return `/static/themes/${themeIdentifier}/main.css`;
}
