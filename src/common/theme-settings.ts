import type { Theme } from '@kausal/themes/types';

/** Header images within the container and header content in the page flow, on every page */
export function themeUsesContainedLayout(theme: Theme): boolean {
  return theme.settings.layout.containedLayout ?? false;
}

/** Left-align the category page header content, which is centred by default */
export function themeLeftAlignsCategoryHeroContent(theme: Theme): boolean {
  return theme.settings.layout.leftAlignCategoryHeroContent ?? false;
}

/** Label category page headers with the category type's name when the category has no level */
export function themeLabelsCategoryPagesWithType(theme: Theme): boolean {
  return theme.settings.categories.categoryPageTypeAsLabel ?? false;
}

/** Explain the action card colors above action lists */
export function themeShowsActionColorLegend(theme: Theme): boolean {
  return theme.settings.showActionColorLegend ?? false;
}
