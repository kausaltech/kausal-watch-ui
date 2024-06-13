import 'styled-components';
import type { Theme } from '@kausal/themes/types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const DEFAULT_THEME_ID = 'default';

export async function loadTheme(themeIdentifier: string): Promise<Theme> {
  try {
    const theme = await import(
      `@/public/static/themes/${themeIdentifier}/theme.json`
    );

    return theme.default;
  } catch (error) {
    console.error(`> Theme with identifier ${themeIdentifier} not found`);
    console.error(error);
    const theme = await import(
      `public/static/themes/${DEFAULT_THEME_ID}/theme.json`
    );

    return theme.default;
  }
}

export function getThemeStaticURL(path: string) {
  return `/static/themes/${path}`;
}
