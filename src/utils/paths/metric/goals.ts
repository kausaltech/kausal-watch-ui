import type {
  CatDimChoice,
  InstanceGoal,
  MetricCategoryChoice,
  MetricCategoryGroup,
  ParsedMetric,
} from './types';

/**
 * Get goal values that match the given category choice.
 *
 * @param metric - The parsed metric
 * @param categoryChoice - Current category selections
 * @returns Goal values if a matching goal is found, null otherwise
 */
export function getGoalsForChoice(
  metric: ParsedMetric,
  categoryChoice: MetricCategoryChoice | null | undefined
): readonly { year: number; value: number; isInterpolated: boolean }[] | null {
  let selectedCategories: string[];
  if (categoryChoice) {
    selectedCategories = Object.values(categoryChoice)
      .map((ch) => ch?.categories ?? [])
      .flat();
  } else {
    selectedCategories = [];
  }

  const catStr = JSON.stringify(selectedCategories.slice().sort());
  const goals = metric.goals.find((g) => JSON.stringify([...g.categories].sort()) === catStr);

  if (!goals) return null;
  return goals.values;
}

/**
 * Get the default dimension slicing config when a goal is selected.
 *
 * @param metric - The parsed metric
 * @param activeGoal - The currently selected goal
 * @returns An object describing the default category selections,
 *   or null if the current goal does not have an effect on this cube.
 */
export function getChoicesForGoal(
  metric: ParsedMetric,
  activeGoal: InstanceGoal
): MetricCategoryChoice | null {
  const metricDims = new Map(metric.dimensions.map((dim) => [dim.originalId, dim]));
  const matchingDims = activeGoal.dimensions.filter((gdim) => metricDims.has(gdim.dimension));

  if (!matchingDims.length) return null;

  const choice: { [dimId: string]: CatDimChoice | undefined } = {};

  matchingDims.forEach((gdim) => {
    const metricDim = metricDims.get(gdim.dimension)!;
    let out: CatDimChoice | undefined;

    if (gdim.groups) {
      const grpMap = new Map<string, MetricCategoryGroup>(
        metricDim.groups.map((grp) => [grp.originalId, grp])
      );
      const groupMatches = gdim.groups
        .filter((grpId) => grpMap.has(grpId))
        .map((grpId) => grpMap.get(grpId)!);
      const catMatches = groupMatches.flatMap((grp) => grp.categories);
      out = {
        groups: groupMatches.map((grp) => grp.id),
        categories: catMatches.map((cat) => cat.id),
      };
    } else {
      const catMatches = metricDim.categories.filter((cat) =>
        gdim.categories.some((goalCat) => goalCat === cat.originalId)
      );
      out = {
        groups: null,
        categories: catMatches.map((cat) => cat.id),
      };
    }

    if (out) choice[metricDim.id] = out;
  });

  return choice;
}
