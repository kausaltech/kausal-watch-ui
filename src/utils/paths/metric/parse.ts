import type {
  DimCats,
  MetricCategoryGroup,
  MetricDimension,
  MetricInput,
  MetricRow,
  ParsedMetric,
} from './types';

/**
 * Creates flattened rows from the metric data.
 * Each row represents one combination of dimension categories for one year.
 */
function createRows(
  data: MetricInput,
  dimensions: readonly MetricDimension[]
): readonly MetricRow[] {
  const rows: MetricRow[] = [];

  function buildRows(dimsLeft: readonly MetricDimension[], dimPath: DimCats): void {
    const dim = dimsLeft[0];

    if (!dim) {
      // No more dimensions - create rows for all years
      data.years.forEach((year) => {
        const idx = rows.length;
        const value = data.values[idx];
        rows.push({
          year,
          value,
          dimCats: dimPath,
        });
      });
    } else {
      // Recurse through all categories of this dimension
      dim.categories.forEach((cat) => {
        const path: DimCats = {
          ...dimPath,
          [dim.id]: cat,
        };
        buildRows(dimsLeft.slice(1), path);
      });
    }
  }

  buildRows(dimensions, {});
  return rows;
}

/**
 * Parses a GraphQL DimensionalMetricFragment into a processed ParsedMetric.
 * This is the main entry point for creating the data structure.
 */
export function parseMetric(data: MetricInput): ParsedMetric {
  // Enhance dimensions with resolved groups
  const dimensions: MetricDimension[] = data.dimensions.map((dimIn) => {
    const groups: MetricCategoryGroup[] = dimIn.groups.map((grpIn) => ({
      ...grpIn,
      categories: dimIn.categories.filter((cat) => cat.group === grpIn.id),
    }));

    return {
      ...dimIn,
      groupsById: new Map(groups.map((grp) => [grp.id, grp])),
      groups,
    };
  });

  // Create dimension lookup map
  const dimsById = new Map(dimensions.map((dim) => [dim.id, dim]));

  // Create flattened rows
  const rows = createRows(data, dimensions);

  return {
    id: data.id,
    name: data.name,
    unit: data.unit,
    stackable: data.stackable,
    forecastFrom: data.forecastFrom,
    years: data.years,
    values: data.values,
    dimensions,
    dimsById,
    rows,
    goals: data.goals,
    normalizedBy: data.normalizedBy,
  };
}
