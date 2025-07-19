import type { Theme } from '@kausal/themes/types';
import 'styled-components';

import { getAssetPrefix } from '@/kausal_common/src/env';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const DEFAULT_THEME_ID = 'default';

export async function loadTheme(themeIdentifier: string): Promise<Theme> {
  try {
    const theme = await import(`@/public/static/themes/${themeIdentifier}/theme.json`);

    return theme.default;
  } catch (error) {
    console.error(`> Theme with identifier ${themeIdentifier} not found`);
    console.error(error);
    const theme = await import(`@/public/static/themes/${DEFAULT_THEME_ID}/theme.json`);

    return theme.default;
  }
}

export function formatStaticUrl(url: string) {
  if (!url) return url;
  if (url.startsWith('/')) {
    const pathPrefix = getAssetPrefix() || '';
    return `${pathPrefix}${url}`;
  }
  return url;
}

export function getThemeStaticURL(path: string) {
  return formatStaticUrl(`/static/themes/${path}`);
}
