import type { Theme } from '@kausal/themes/types';

/*
 * Accessors for theme settings added to @kausal/themes after the version
 * watch-ui is built against.
 *
 * TODO: After bumping @kausal/themes, drop the type extensions and the
 * `leftAlignCategoryPages` fallback, and read the settings directly.
 */

type LayoutSettings = Theme['settings']['layout'] & {
  containedLayout?: boolean;
  leftAlignCategoryHeroContent?: boolean;
  /** The earlier name of `leftAlignCategoryHeroContent` */
  leftAlignCategoryPages?: boolean;
};

type CategorySettings = Theme['settings']['categories'] & {
  categoryPageTypeAsLabel?: boolean;
};

/** Header images within the container and header content in the page flow, on every page */
export function themeUsesContainedLayout(theme: Theme): boolean {
  return (theme.settings.layout as LayoutSettings).containedLayout ?? false;
}

/** Left-align the category page header content, which is centred by default */
export function themeLeftAlignsCategoryHeroContent(theme: Theme): boolean {
  const layout = theme.settings.layout as LayoutSettings;
  return layout.leftAlignCategoryHeroContent ?? layout.leftAlignCategoryPages ?? false;
}

/** Label category page headers with the category type's name when the category has no level */
export function themeLabelsCategoryPagesWithType(theme: Theme): boolean {
  return (theme.settings.categories as CategorySettings).categoryPageTypeAsLabel ?? false;
}
