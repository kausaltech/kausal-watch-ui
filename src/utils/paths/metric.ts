/**
 * @deprecated This file provides backwards compatibility.
 * Use imports from '@common/paths/metric' for the new functional API instead.
 *
 * Example migration:
 * ```typescript
 * // Old:
 * import { DimensionalMetric } from '@/utils/paths/metric';
 * const cube = new DimensionalMetric(data);
 * const slice = cube.sliceBy(dimId, true, categories);
 *
 * // New:
 * import { parseMetric, sliceBy } from '@common/paths/metric';
 * const metric = parseMetric(data);
 * const slice = sliceBy(metric, dimId, true, categories, true);
 *
 * // Or use the hook:
 * import { useDimensionalMetric } from '@/utils/paths/hooks/useDimensionalMetric';
 * const { metric, sliceConfig, getSlice } = useDimensionalMetric(data);
 * ```
 */
import type { DocumentNode } from '@apollo/client';
import { gql } from '@apollo/client';

// Import everything from the shared library
import {
  createTable,
  downloadData,
  flatten,
  getChoicesForGoal,
  getDefaultSliceConfig,
  getForecastFrom,
  getForecastYears,
  getGoalsForChoice,
  getHistoricalYears,
  getName,
  getOptionsForDimension,
  getSingleYear,
  getSliceableDims,
  getUnit,
  getUnitShort,
  hasDimension,
  isForecastYear,
  parseMetric,
  sliceBy,
  updateChoice,
} from '@common/utils/paths/metric';
import type {
  InstanceGoalInput,
  MetricCategoryChoice,
  MetricDimension,
  MetricInput,
  MetricSliceData,
  ParsedMetric,
  SliceConfig,
  TableLabels,
} from '@common/utils/paths/metric';

// Re-export types for backwards compatibility
// InstanceGoal is an alias for InstanceGoalInput from the shared lib
export type InstanceGoal = InstanceGoalInput;

export type {
  SliceConfig,
  MetricCategoryChoice,
  MetricCategoryValues,
  MetricCategory,
  MetricSliceData,
  MetricInput,
  ParsedMetric,
  MetricDimension,
  MetricDimensionCategory,
  MetricCategoryGroup,
  CatDimChoice,
} from '@common/utils/paths/metric';

// Re-export functions for new API usage
export {
  parseMetric,
  getName,
  getUnit,
  getUnitShort,
  getForecastFrom,
  getHistoricalYears,
  getForecastYears,
  isForecastYear,
  hasDimension,
  getOptionsForDimension,
  getSliceableDims,
  getGoalsForChoice,
  getChoicesForGoal,
  getDefaultSliceConfig,
  updateChoice,
  sliceBy,
  flatten,
  getSingleYear,
  downloadData,
  createTable,
} from '@common/utils/paths/metric';

const DIMENSIONAL_METRIC_FRAGMENT = gql`
  fragment DimensionalMetric on DimensionalMetricType {
    id
    name
    dimensions {
      id
      label
      originalId
      helpText
      categories {
        id
        originalId
        label
        color
        order
        group
      }
      groups {
        id
        originalId
        label
        color
        order
      }
    }
    goals {
      categories
      groups
      values {
        year
        value
        isInterpolated
      }
    }
    unit {
      htmlShort
      short
    }
    stackable
    normalizedBy {
      id
      name
    }
    forecastFrom
    years
    values
  }
`;

/**
 * @deprecated Use `MetricSliceData` type and `createTable` function instead.
 */
export class MetricSlice {
  historicalYears: number[];
  forecastYears: number[];
  categoryValues: MetricSliceData['categoryValues'];
  totalValues: MetricSliceData['totalValues'];
  dimensionLabel: string;
  unit: string;

  constructor(input: MetricSliceData) {
    this.historicalYears = [...input.historicalYears];
    this.forecastYears = [...input.forecastYears];
    this.categoryValues = input.categoryValues;
    this.totalValues = input.totalValues;
    this.dimensionLabel = input.dimensionLabel;
    this.unit = input.unit;
  }

  createTable(
    years?: number[],
    totalLabel?: string,
    typeLabel?: string,
    yearLabel?: string,
    unitLabel?: string,
    historicalLabel?: string,
    forecastLabel?: string
  ) {
    const labels: TableLabels = {
      total: totalLabel,
      type: typeLabel,
      year: yearLabel,
      unit: unitLabel,
      historical: historicalLabel,
      forecast: forecastLabel,
    };
    return createTable(this, years, labels);
  }
}

/**
 * @deprecated Use `parseMetric()` and functional utilities instead.
 * This class is maintained for backwards compatibility.
 */
export class DimensionalMetric {
  private readonly parsed: ParsedMetric;

  // Expose dimensions for direct access (backwards compat)
  get dimensions(): readonly MetricDimension[] {
    return this.parsed.dimensions;
  }

  constructor(data: MetricInput) {
    this.parsed = parseMetric(data);
  }

  getName = () => getName(this.parsed);
  getUnit = () => getUnit(this.parsed);
  getForecastFrom = () => getForecastFrom(this.parsed);
  getHistoricalYears = () => getHistoricalYears(this.parsed);
  getForecastYears = () => getForecastYears(this.parsed);
  isForecastYear = (year: number) => isForecastYear(this.parsed, year);

  hasDimension = (originalDimId: string) => hasDimension(this.parsed, originalDimId);

  getOptionsForDimension = (dimId: string, cfg: MetricCategoryChoice) =>
    getOptionsForDimension(this.parsed, dimId, cfg);

  getSliceableDims = (selection: SliceConfig) => getSliceableDims(this.parsed, selection);

  getGoalsForChoice = (choice: MetricCategoryChoice | null | undefined) =>
    getGoalsForChoice(this.parsed, choice);

  getChoicesForGoal = (activeGoal: InstanceGoal) => getChoicesForGoal(this.parsed, activeGoal);

  getDefaultSliceConfig = (activeGoal: InstanceGoal | null) =>
    getDefaultSliceConfig(this.parsed, activeGoal);

  updateChoice = (dim: MetricDimension, old: SliceConfig, newChoice: readonly { id: string }[]) =>
    updateChoice(this.parsed, dim, old, newChoice);

  sliceBy = (
    dimensionId: string,
    sort: boolean = false,
    categoryChoice?: MetricCategoryChoice,
    useGroups: boolean = true,
    years?: number[]
  ): MetricSlice | null => {
    const data = sliceBy(this.parsed, dimensionId, sort, categoryChoice, useGroups, years);
    return data ? new MetricSlice(data) : null;
  };

  flatten = (categoryChoice?: MetricCategoryChoice, years?: number[]): MetricSlice => {
    const data = flatten(this.parsed, categoryChoice, years);
    return new MetricSlice(data);
  };

  getSingleYear = (year: number, categoryChoice?: MetricCategoryChoice) =>
    getSingleYear(this.parsed, year, categoryChoice);

  async downloadData(
    cfg: SliceConfig,
    format: 'xlsx' | 'csv',
    years?: number[],
    tableTitle?: string,
    totalLabel?: string,
    typeLabel?: string,
    yearLabel?: string,
    unitLabel?: string,
    historicalLabel?: string,
    forecastLabel?: string
  ) {
    return downloadData(this.parsed, cfg, format, {
      years,
      tableTitle,
      labels: {
        total: totalLabel,
        type: typeLabel,
        year: yearLabel,
        unit: unitLabel,
        historical: historicalLabel,
        forecast: forecastLabel,
      },
    });
  }

  static fragment: DocumentNode = DIMENSIONAL_METRIC_FRAGMENT;
}
