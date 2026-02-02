// Types
export type {
  MetricInput,
  MetricDimension,
  MetricDimensionCategory,
  MetricCategoryGroup,
  MetricRow,
  DimCats,
  ParsedMetric,
  CatDimChoice,
  MetricCategoryChoice,
  SliceConfig,
  InstanceGoal,
  MetricCategory,
  MetricCategoryValues,
  MetricSliceData,
  SingleYearData,
  TableData,
  TableLabels,
  ExportOptions,
} from './types';

// Parse
export { parseMetric } from './parse';

// Accessors
export {
  getName,
  getUnit,
  getUnitShort,
  getForecastFrom,
  getHistoricalYears,
  getForecastYears,
  isForecastYear,
} from './accessors';

// Dimensions
export { hasDimension, getOptionsForDimension, getSliceableDims } from './dimensions';

// Goals
export { getGoalsForChoice, getChoicesForGoal } from './goals';

// Config
export { getDefaultSliceConfig, updateChoice } from './config';

// Slicing
export { sliceBy, flatten, getSingleYear } from './slicing';

// Export
export { downloadData } from './export';

// Slice utilities
export { createTable, type MetricSlice } from '../metric-slice';
