import type { MetricSliceData, TableData, TableLabels } from './metric/types';

// Re-export the type for convenience
export type MetricSlice = MetricSliceData;

/**
 * Create a table representation of the slice data.
 *
 * @param slice - The slice data
 * @param years - Specific years to include (defaults to all)
 * @param labels - Custom labels for table headers
 * @returns Table data structure
 */
export function createTable(
  slice: MetricSliceData,
  years?: readonly number[],
  labels?: TableLabels
): TableData {
  const viewTotalLabel = labels?.total ?? 'Total';
  const viewTypeLabel = labels?.type ?? 'Type';
  const viewYearLabel = labels?.year ?? 'Year';
  const viewUnitLabel = labels?.unit ?? 'Unit';
  const viewHistoricalLabel = labels?.historical ?? 'Historical';
  const viewForecastLabel = labels?.forecast ?? 'Forecast';
  const NO_VALUE = '';

  const header = [
    { key: 'year', label: viewYearLabel },
    { key: 'type', label: viewTypeLabel },
    { key: 'unit', label: viewUnitLabel },
    ...slice.categoryValues.map((cv) => ({
      key: cv.category.id,
      label: cv.category.label,
    })),
    { key: 'total', label: viewTotalLabel },
  ];

  const useYears = years ?? [...slice.historicalYears, ...slice.forecastYears];

  const rows = useYears.map((year) => {
    const row: { [key: string]: string | number | null } = {
      year: year.toString(),
      unit: slice.unit,
    };

    const historicalYearIndex = slice.historicalYears.indexOf(year);
    const forecastYearIndex = slice.forecastYears.indexOf(year);
    let total = 0;

    slice.categoryValues.forEach((cv) => {
      if (historicalYearIndex >= 0) {
        const value = cv.historicalValues[historicalYearIndex] || null;
        row[cv.category.id] = value !== null ? parseFloat(value?.toPrecision(2) || '') : NO_VALUE;
        total += value || 0;
      } else if (forecastYearIndex >= 0) {
        const value = cv.forecastValues[forecastYearIndex] || null;
        row[cv.category.id] = value !== null ? parseFloat(value?.toPrecision(2) || '') : NO_VALUE;
        total += value || 0;
      } else {
        row[cv.category.id] = NO_VALUE;
      }
    });

    row.total = parseFloat(total.toPrecision(2) || '') ?? NO_VALUE;
    row.type = historicalYearIndex >= 0 ? viewHistoricalLabel : viewForecastLabel;
    return row;
  });

  const forecastFromColumn = 1 + slice.historicalYears.length;

  return {
    header,
    rows,
    hasTotals: slice.totalValues !== null,
    forecastFromColumn,
  };
}
