import type { MetricCategoryChoice, MetricDimension, ParsedMetric, SliceConfig } from './types';

/**
 * Checks if the metric has a matching dimension.
 *
 * @param metric - The parsed metric
 * @param originalDimId - The non-prefixed (canonical) id for the dimension
 */
export function hasDimension(metric: ParsedMetric, originalDimId: string): boolean {
  return metric.dimensions.some((dim) => dim.originalId === originalDimId);
}

/**
 * Get options (categories or groups) for a dimension based on current config.
 *
 * @param metric - The parsed metric
 * @param dimId - The dimension ID
 * @param config - Current category choice configuration
 * @returns Array of options with selection state
 */
export function getOptionsForDimension(
  metric: ParsedMetric,
  dimId: string,
  config: MetricCategoryChoice
): readonly { id: string; label: string; selected: boolean }[] {
  const dim = metric.dimensions.find((d) => d.id === dimId);
  if (!dim) return [];

  const choice = config[dimId];

  if (dim.groups.length) {
    const selected = choice?.groups || [];
    return dim.groups.map((grp) => ({
      id: grp.id,
      label: grp.label,
      selected: selected.some((grpId) => grp.id === grpId),
    }));
  }

  const selected = choice?.categories || [];
  return dim.categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    selected: selected.some((catId) => cat.id === catId),
  }));
}

/**
 * Get dimensions that can be used for slicing (not already filtered).
 *
 * @param metric - The parsed metric
 * @param selection - Current slice configuration
 * @returns Dimensions available for slicing
 */
export function getSliceableDims(
  metric: ParsedMetric,
  selection: SliceConfig
): readonly MetricDimension[] {
  return metric.dimensions.filter((dim) => !selection.categories[dim.id]);
}
