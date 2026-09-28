import { useTheme } from '@emotion/react';

import { useIsPrintMode } from '@/context/print';

/** Chart background: the theme's (possibly off-white) white, but pure white in PDF exports */
export function useChartBackground(customBackground?: string): string {
  const theme = useTheme();
  const isPrint = useIsPrintMode();
  if (isPrint) return '#fff';
  return customBackground || theme.themeColors.white;
}
