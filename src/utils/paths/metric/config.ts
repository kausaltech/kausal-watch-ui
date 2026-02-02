import { getSliceableDims } from './dimensions';
import { getChoicesForGoal } from './goals';
import type {
  CatDimChoice,
  InstanceGoal,
  MetricCategoryChoice,
  MetricDimension,
  ParsedMetric,
  SliceConfig,
} from './types';

/**
 * Convert a choice selection to category filters.
 */
function choiceToCats(
  dim: MetricDimension,
  old: MetricCategoryChoice,
  newChoice: readonly { id: string }[]
): MetricCategoryChoice {
  const out: { [dimId: string]: CatDimChoice | undefined } = {
    ...old,
    [dim.id]: undefined,
  };

  if (!newChoice.length) return out;

  const ids = newChoice.map((ch) => ch.id);
  let val: CatDimChoice;

  if (dim.groups.length) {
    const groups = ids.map((id) => dim.groupsById.get(id)!);
    const cats = groups.flatMap((grp) => grp.categories);
    val = {
      groups: groups.map((grp) => grp.id),
      categories: cats.map((cat) => cat.id),
    };
  } else {
    val = {
      groups: null,
      categories: ids,
    };
  }

  out[dim.id] = val;
  return out;
}

/**
 * Update a category choice and return new slice config.
 *
 * @param metric - The parsed metric
 * @param dim - The dimension being updated
 * @param oldConfig - Current slice configuration
 * @param newChoice - New selection for the dimension
 * @returns Updated slice configuration
 */
export function updateChoice(
  metric: ParsedMetric,
  dim: MetricDimension,
  oldConfig: SliceConfig,
  newChoice: readonly { id: string }[]
): SliceConfig {
  let dimensionId = oldConfig.dimensionId;
  let sliceableDims = getSliceableDims(metric, oldConfig);

  if (dimensionId === dim.id) {
    dimensionId = sliceableDims.find((sd) => sd.id !== dim.id)?.id;
    if (!dimensionId && dim.groups.length) {
      dimensionId = dim.id;
    }
  }

  const val: SliceConfig = {
    categories: choiceToCats(dim, oldConfig.categories, newChoice),
    dimensionId,
  };

  if (!dimensionId) {
    sliceableDims = getSliceableDims(metric, val);
    if (sliceableDims.length) {
      return { ...val, dimensionId: sliceableDims[0].id };
    }
  }

  return val;
}

/**
 * Get the default slice configuration, optionally based on an active goal.
 *
 * By default, we group by the first dimension the metric has.
 * If the currently selected goal has category selections for this metric,
 * we might choose another dimension.
 *
 * @param metric - The parsed metric
 * @param activeGoal - The currently selected goal, if any
 * @returns Default slice configuration
 */
export function getDefaultSliceConfig(
  metric: ParsedMetric,
  activeGoal: InstanceGoal | null
): SliceConfig {
  const defaultConfig: SliceConfig = {
    dimensionId: metric.dimensions[0]?.id,
    categories: {},
  };

  if (!activeGoal) return defaultConfig;

  const cubeDefault = getChoicesForGoal(metric, activeGoal);
  if (!cubeDefault) return defaultConfig;

  const configWithGoal: SliceConfig = {
    ...defaultConfig,
    categories: cubeDefault,
  };

  // Check if our default dimension to slice by is affected by the
  // goal-based default filters. If so, choose another dimension.
  if (
    configWithGoal.dimensionId &&
    Object.prototype.hasOwnProperty.call(cubeDefault, configWithGoal.dimensionId)
  ) {
    const firstPossible = metric.dimensions.find(
      (dim) => !Object.prototype.hasOwnProperty.call(cubeDefault, dim.id)
    );
    return { ...configWithGoal, dimensionId: firstPossible?.id };
  }

  return configWithGoal;
}
