import type { ParsedMetric } from './types';

/**
 * Get the metric name.
 */
export function getName(metric: ParsedMetric): string {
  return metric.name;
}

/**
 * Get the metric unit (HTML formatted).
 */
export function getUnit(metric: ParsedMetric): string {
  return metric.unit.htmlShort;
}

/**
 * Get the metric unit (short text).
 */
export function getUnitShort(metric: ParsedMetric): string {
  return metric.unit.short;
}

/**
 * Get the year from which forecasts begin.
 */
export function getForecastFrom(metric: ParsedMetric): number | null {
  return metric.forecastFrom;
}

/**
 * Get all historical years (before forecastFrom).
 */
export function getHistoricalYears(metric: ParsedMetric): readonly number[] {
  return metric.years.filter((year) => (metric.forecastFrom ? year < metric.forecastFrom : true));
}

/**
 * Get all forecast years (from forecastFrom onwards).
 */
export function getForecastYears(metric: ParsedMetric): readonly number[] {
  return metric.years.filter((year) => (metric.forecastFrom ? year >= metric.forecastFrom : false));
}

/**
 * Check if a year is in the forecast period.
 */
export function isForecastYear(metric: ParsedMetric, year: number): boolean {
  return metric.forecastFrom != null && year >= metric.forecastFrom;
}
