import { useTheme } from '@emotion/react';

import { themeUsesContainedLayout } from '@/common/theme-settings';

// Forces the contained layout on every plan, for previewing it locally
const PREVIEW_CONTAINED = false as boolean;

/**
 * Whether page headers and content blocks use the contained layout
 * (`settings.layout.containedLayout`): header
 * images limited to the container width, and header content in the page flow,
 * aligned with the page content.
 *
 * Not the same as the theme's older `settings.layout.containImages`, which only
 * switches the category page header to its contained card variant.
 */
export function useContainedLayout(): boolean {
  const theme = useTheme();
  return PREVIEW_CONTAINED || themeUsesContainedLayout(theme);
}
