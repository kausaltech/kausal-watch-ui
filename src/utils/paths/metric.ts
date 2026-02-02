/**
 * @deprecated This file provides backwards compatibility.
 * Use imports from '@/utils/paths/metric' for the new functional API instead.
 *
 * Example migration:
 * ```typescript
 * // Old:
 * import { DimensionalMetric } from '@/utils/paths/metric';
 * const cube = new DimensionalMetric(data);
 * const slice = cube.sliceBy(dimId, true, categories);
 *
 * // New:
 * import { parseMetric, sliceBy } from '@/utils/paths/metric';
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

import { createTable } from './metric-slice';
import * as accessors from './metric/accessors';
import * as config from './metric/config';
import * as dimensions from './metric/dimensions';
import { downloadData } from './metric/export';
import * as goals from './metric/goals';
import { parseMetric } from './metric/parse';
import * as slicing from './metric/slicing';
// Import for internal use
import type {
  InstanceGoal,
  MetricCategoryChoice,
  MetricDimension,
  MetricInput,
  MetricSliceData,
  ParsedMetric,
  SliceConfig,
  TableLabels,
} from './metric/types';

// Re-export types for backwards compatibility
export type {
  SliceConfig,
  MetricCategoryChoice,
  MetricCategoryValues,
  MetricCategory,
  MetricSliceData,
  InstanceGoal,
  MetricInput,
  ParsedMetric,
  MetricDimension,
  MetricDimensionCategory,
  MetricCategoryGroup,
  CatDimChoice,
} from './metric/types';

// Re-export functions for new API usage
export { parseMetric } from './metric/parse';
export {
  getName,
  getUnit,
  getUnitShort,
  getForecastFrom,
  getHistoricalYears,
  getForecastYears,
  isForecastYear,
} from './metric/accessors';
export { hasDimension, getOptionsForDimension, getSliceableDims } from './metric/dimensions';
export { getGoalsForChoice, getChoicesForGoal } from './metric/goals';
export { getDefaultSliceConfig, updateChoice } from './metric/config';
export { sliceBy, flatten, getSingleYear } from './metric/slicing';
export { downloadData } from './metric/export';
export { createTable } from './metric-slice';

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

  getName = () => accessors.getName(this.parsed);
  getUnit = () => accessors.getUnit(this.parsed);
  getForecastFrom = () => accessors.getForecastFrom(this.parsed);
  getHistoricalYears = () => accessors.getHistoricalYears(this.parsed);
  getForecastYears = () => accessors.getForecastYears(this.parsed);
  isForecastYear = (year: number) => accessors.isForecastYear(this.parsed, year);

  hasDimension = (originalDimId: string) => dimensions.hasDimension(this.parsed, originalDimId);

  getOptionsForDimension = (dimId: string, cfg: MetricCategoryChoice) =>
    dimensions.getOptionsForDimension(this.parsed, dimId, cfg);

  getSliceableDims = (selection: SliceConfig) =>
    dimensions.getSliceableDims(this.parsed, selection);

  getGoalsForChoice = (choice: MetricCategoryChoice | null | undefined) =>
    goals.getGoalsForChoice(this.parsed, choice);

  getChoicesForGoal = (activeGoal: InstanceGoal) =>
    goals.getChoicesForGoal(this.parsed, activeGoal);

  getDefaultSliceConfig = (activeGoal: InstanceGoal | null) =>
    config.getDefaultSliceConfig(this.parsed, activeGoal);

  updateChoice = (dim: MetricDimension, old: SliceConfig, newChoice: readonly { id: string }[]) =>
    config.updateChoice(this.parsed, dim, old, newChoice);

  sliceBy = (
    dimensionId: string,
    sort: boolean = false,
    categoryChoice?: MetricCategoryChoice,
    useGroups: boolean = true,
    years?: number[]
  ): MetricSlice | null => {
    const data = slicing.sliceBy(this.parsed, dimensionId, sort, categoryChoice, useGroups, years);
    return data ? new MetricSlice(data) : null;
  };

  flatten = (categoryChoice?: MetricCategoryChoice, years?: number[]): MetricSlice => {
    const data = slicing.flatten(this.parsed, categoryChoice, years);
    return new MetricSlice(data);
  };

  getSingleYear = (year: number, categoryChoice?: MetricCategoryChoice) =>
    slicing.getSingleYear(this.parsed, year, categoryChoice);

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
