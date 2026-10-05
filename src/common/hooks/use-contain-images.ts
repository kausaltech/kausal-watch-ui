import { useTheme } from '@emotion/react';

// TODO: Remove before merging; previews the contained layout without a theme change
const PREVIEW_CONTAINED = false as boolean;

/**
 * Whether page headers and content blocks use the contained layout, where
 * header images are limited to the container width and content aligns left.
 */
export function useContainImages(): boolean {
  const theme = useTheme();
  return PREVIEW_CONTAINED || (theme.settings.layout.containImages ?? false);
}
