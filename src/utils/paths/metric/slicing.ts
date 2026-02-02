import { isForecastYear } from './accessors';
import type {
  MetricCategoryChoice,
  MetricCategoryGroup,
  MetricCategoryValues,
  MetricDimensionCategory,
  MetricRow,
  MetricSliceData,
  ParsedMetric,
  SingleYearData,
} from './types';

/**
 * Check if a row matches the given category choice filters.
 */
function rowMatchesChoice(row: MetricRow, categoryChoice: MetricCategoryChoice): boolean {
  const noMatch = Object.entries(categoryChoice).some(([dimId, choice]) => {
    if (!choice) return false;
    if (choice.categories.length === 0) return false;
    if (!choice.categories.includes(row.dimCats[dimId].id)) return true;
    return false;
  });
  return !noMatch;
}

/**
 * Slice data by a dimension, grouping values by category.
 *
 * @param metric - The parsed metric
 * @param dimensionId - Dimension to group by
 * @param sort - Whether to sort by latest value
 * @param categoryChoice - Category filters to apply
 * @param useGroups - Whether to use groups instead of categories
 * @param years - Specific years to include (defaults to all)
 * @returns Sliced data or null if no matching categories
 */
export function sliceBy(
  metric: ParsedMetric,
  dimensionId: string,
  sort: boolean = false,
  categoryChoice: MetricCategoryChoice | undefined,
  useGroups: boolean = true,
  years?: readonly number[]
): MetricSliceData | null {
  const byYear = new Map<number, Map<string, number>>();
  const dim = metric.dimensions.find((d) => d.id === dimensionId);
  if (!dim) return null;

  // If categoryChoice has empty categories array for this dimension, return null
  if (categoryChoice && categoryChoice[dim.id]?.categories.length === 0) {
    return null;
  }

  const yearsToUse = years ?? metric.years;

  // Determine if we should use groups
  let effectiveUseGroups = useGroups;
  if (dim.groups.length) {
    if (categoryChoice?.[dim.id]) {
      effectiveUseGroups = false;
    }
  } else {
    effectiveUseGroups = false;
  }

  // Process all rows
  metric.rows.forEach((row) => {
    const { year } = row;

    if (!yearsToUse.includes(year)) return;

    let catVals = byYear.get(year);
    if (!catVals) {
      catVals = new Map();
      byYear.set(year, catVals);
    }

    // Filter by category choice
    if (categoryChoice && !rowMatchesChoice(row, categoryChoice)) return;

    const cat = row.dimCats[dimensionId];
    const rowId = effectiveUseGroups ? cat.group! : cat.id;
    let val = catVals.get(rowId) ?? 0;
    const rowVal = row.value;
    if (rowVal !== null) val += rowVal;
    catVals.set(rowId, val);
  });

  const totalColor = '#777777';
  const totalValues: MetricCategoryValues = {
    category: {
      id: 'total',
      label: 'total',
      color: totalColor,
      order: null,
    },
    forecastValues: yearsToUse.filter((year) => isForecastYear(metric, year)).map(() => null),
    historicalValues: yearsToUse.filter((year) => !isForecastYear(metric, year)).map(() => null),
    isNegative: false,
    color: totalColor,
  };

  const groupsOrCats = effectiveUseGroups ? dim.groups : dim.categories;

  const categoryValues: MetricCategoryValues[] = (
    groupsOrCats as (MetricCategoryGroup | MetricDimensionCategory)[]
  )
    .map((cat) => {
      const historicalValues: (number | null)[] = [];
      const forecastValues: (number | null)[] = [];

      yearsToUse.forEach((year) => {
        const yearData = byYear.get(year);
        const val: number | null = yearData?.get(cat.id) ?? null;
        if (isForecastYear(metric, year)) {
          forecastValues.push(val);
        } else {
          historicalValues.push(val);
        }
      });

      // Update totals
      historicalValues.forEach((val, idx) => {
        if (val === null) return;
        const oldVal = (totalValues.historicalValues as (number | null)[])[idx] ?? 0;
        (totalValues.historicalValues as (number | null)[])[idx] = oldVal + val;
      });
      forecastValues.forEach((val, idx) => {
        if (val === null) return;
        const oldVal = (totalValues.forecastValues as (number | null)[])[idx] ?? 0;
        (totalValues.forecastValues as (number | null)[])[idx] = oldVal + val;
      });

      const isNegative = cat.order !== null && cat.order !== undefined ? cat.order < 0 : false;

      return {
        category: cat,
        forecastValues,
        historicalValues,
        isNegative,
        color: cat.color,
      };
    })
    .filter((cv) => {
      const hasVals = [...cv.historicalValues, ...cv.forecastValues].some(
        (val) => val !== null && val !== 0
      );
      return hasVals;
    });

  const historicalYears = yearsToUse.filter((year) => !isForecastYear(metric, year));
  const forecastYears = yearsToUse.filter((year) => isForecastYear(metric, year));

  // Sort: ordered categories first, then unordered
  const ordered = categoryValues
    .filter((cv) => cv.category.order != null)
    .sort((a, b) => a.category.order! - b.category.order!);
  const unordered = categoryValues.filter((cv) => cv.category.order == null);

  if (sort) {
    let idx = historicalYears.length - 1;
    let key: 'historicalValues' | 'forecastValues' = 'historicalValues';
    if (idx < 0) {
      idx = forecastYears.length - 1;
      key = 'forecastValues';
    }
    unordered.sort((a, b) => (b[key][idx] ?? 0) - (a[key][idx] ?? 0));
  }

  return {
    categoryValues: [...ordered, ...unordered],
    historicalYears,
    forecastYears,
    totalValues,
    dimensionLabel: dim.label,
    unit: metric.unit.short,
  };
}

/**
 * Flatten metric data, summing all categories by year.
 *
 * @param metric - The parsed metric
 * @param categoryChoice - Category filters to apply
 * @param years - Specific years to include (defaults to all)
 * @returns Flattened data as a single category
 */
export function flatten(
  metric: ParsedMetric,
  categoryChoice: MetricCategoryChoice | undefined,
  years?: readonly number[]
): MetricSliceData {
  const yearsToUse = years ?? metric.years;
  const byYear = new Map<number, number>();

  metric.rows.forEach((row) => {
    const { year } = row;
    if (categoryChoice && !rowMatchesChoice(row, categoryChoice)) return;
    if (!yearsToUse.includes(year)) return;

    let val = byYear.get(year) ?? 0;
    const rowVal = row.value;
    if (rowVal !== null) val += rowVal;
    byYear.set(year, val);
  });

  const historicalValues: (number | null)[] = [];
  const forecastValues: (number | null)[] = [];

  yearsToUse.forEach((year) => {
    const val: number | null = byYear.get(year) ?? null;
    if (isForecastYear(metric, year)) {
      forecastValues.push(val);
    } else {
      historicalValues.push(val);
    }
  });

  const historicalYears = yearsToUse.filter((year) => !isForecastYear(metric, year));
  const forecastYears = yearsToUse.filter((year) => isForecastYear(metric, year));

  return {
    categoryValues: [
      {
        forecastValues,
        historicalValues,
        category: {
          id: metric.id,
          label: metric.name,
          color: null,
          order: null,
        },
        isNegative: false,
        color: null,
      },
    ],
    historicalYears,
    forecastYears,
    totalValues: null,
    dimensionLabel: metric.name,
    unit: metric.unit.short,
  };
}

/**
 * Get data for a single year, organized as a matrix.
 *
 * @param metric - The parsed metric
 * @param year - The year to get data for
 * @param categoryChoice - Category filters to apply
 * @returns Matrix data for the year
 */
export function getSingleYear(
  metric: ParsedMetric,
  year: number,
  categoryChoice: MetricCategoryChoice | undefined
): SingleYearData {
  // Filter rows for the specified year and category choice
  const yearRows = metric.rows.filter(
    (row) => row.year === year && (categoryChoice ? rowMatchesChoice(row, categoryChoice) : true)
  );

  // Get all labels for easier lookup
  const allLabels = metric.dimensions.flatMap((dim) =>
    dim.groups.length
      ? dim.groups.map((grp) => ({
          id: grp.id,
          label: grp.label,
          color: grp.color,
        }))
      : dim.categories.map((cat) => ({
          id: cat.id,
          label: cat.label,
          color: cat.color,
        }))
  );

  // Get all used dimensions and their categories/groups
  const categoryTypes = metric.dimensions.map((dim) => ({
    id: dim.id,
    type: (dim.groups.length ? 'group' : 'category') as 'group' | 'category',
    options: dim.groups.length
      ? [...new Set(yearRows.map((row) => row.dimCats[dim.id].group!))]
      : [...new Set(yearRows.map((row) => row.dimCats[dim.id].id))],
  }));

  // Build the data matrix
  const rows =
    categoryTypes[0]?.options.map(
      (rowId) =>
        categoryTypes[1]?.options.map((columnId) => {
          // Collect multiple rows as for groups we need values of all their categories
          const matchingRows = yearRows.filter((yearRow) => {
            const rowCategory0 = yearRow.dimCats[categoryTypes[0].id];
            const rowCategory1 = yearRow.dimCats[categoryTypes[1].id];
            const matchRow =
              (categoryTypes[0].type === 'group' && rowCategory0.group === rowId) ||
              (categoryTypes[0].type === 'category' && rowCategory0.id === rowId);
            const matchCol =
              (categoryTypes[1].type === 'group' && rowCategory1.group === columnId) ||
              (categoryTypes[1].type === 'category' && rowCategory1.id === columnId);
            return matchRow && matchCol;
          });
          return matchingRows.length
            ? matchingRows.reduce((a, b) => (b.value ? a + b.value : a), 0)
            : null;
        }) ?? []
    ) ?? [];

  return {
    categoryTypes,
    allLabels,
    rows,
  };
}
