import { IndicatorTimeResolution } from '@/common/__generated__/graphql';

import type { IndicatorVisualizationBlockData } from '../IndicatorVisualizationBlock';
import { buildVisualizationTableData } from '../visualization-table-data';

const t = (key: string) => key;

const series = (
  category: { id: string; name: string } | null,
  points: Array<[string, number]>
) => ({
  dimensionCategory: category && { ...category, defaultColor: '' },
  values: points.map(([date, value], i) => ({
    id: `${category?.id ?? 'total'}-${i}`,
    date,
    value,
  })),
});

const indicator = {
  timeResolution: IndicatorTimeResolution.Year,
  valueRounding: 2,
  unit: { name: 'kilotonnes', shortName: 'kt' },
  goals: [
    { id: 'g1', date: '2030-01-01', value: 10, scenario: { id: 's1', name: 'Ambitious' } },
    { id: 'g2', date: '2025-01-01', value: 30, scenario: null },
  ],
};

const dimension = { id: 'd', name: 'Sector', categories: [] };

const housing = { id: 'h', name: 'Housing' };
const transport = { id: 'tr', name: 'Transport' };

const chartSeries = [
  series(housing, [
    ['2020-01-01', 60],
    ['2021-01-01', 50],
  ]),
  series(transport, [
    ['2020-01-01', 40],
    ['2021-01-01', 45],
  ]),
  series(null, [
    ['2020-01-01', 100],
    ['2021-01-01', 95],
  ]),
];

const block = (fields: Record<string, unknown>) =>
  ({ indicator, dimension, chartSeries, ...fields }) as unknown as IndicatorVisualizationBlockData;

describe('buildVisualizationTableData', () => {
  it('mirrors a line chart: category series, the total when enabled, goals by scenario', () => {
    const table = buildVisualizationTableData(
      block({ __typename: 'IndicatorDefaultLineChart', showTotalLine: true }),
      IndicatorTimeResolution.Day,
      t
    );
    expect(table?.traces.map((trace) => trace.name)).toEqual(['Housing', 'Transport', 'total']);
    expect(table?.traces[0]).toEqual({
      name: 'Housing',
      xType: 'time',
      x: ['2020', '2021'],
      y: [60, 50],
    });
    expect(table?.goalTraces).toEqual([
      { name: 'Ambitious', xType: 'time', x: ['2030'], y: [10] },
      { name: 'goal', xType: 'time', x: ['2025'], y: [30] },
    ]);
    expect(table?.timeResolution).toBe(IndicatorTimeResolution.Year);
    expect(table?.specification).toEqual({ unit: 'kt', valueRounding: 2 });
  });

  it('omits the total from a line chart when the block hides it', () => {
    const table = buildVisualizationTableData(
      block({ __typename: 'DashboardIndicatorLineChartBlock', showTotalLine: false }),
      IndicatorTimeResolution.Year,
      t
    );
    expect(table?.traces.map((trace) => trace.name)).toEqual(['Housing', 'Transport']);
  });

  it('mirrors a pie chart: one column for the configured year, categories as rows', () => {
    const table = buildVisualizationTableData(
      block({ __typename: 'IndicatorDefaultPieChart', year: 2020 }),
      IndicatorTimeResolution.Year,
      t
    );
    expect(table?.traces).toEqual([
      { name: '2020', xType: 'category', x: ['Housing', 'Transport'], y: [60, 40] },
    ]);
    expect(table?.goalTraces).toEqual([]);
  });

  it('falls back to the latest year for a pie without a configured year', () => {
    const table = buildVisualizationTableData(
      block({ __typename: 'IndicatorDefaultPieChart', year: null }),
      IndicatorTimeResolution.Year,
      t
    );
    expect(table?.traces[0].name).toBe('2021');
    expect(table?.traces[0].y).toEqual([50, 45]);
  });

  it('uses only the total for a bar chart without a dimension', () => {
    const table = buildVisualizationTableData(
      block({ __typename: 'IndicatorDefaultBarChart', dimension: null, barType: null }),
      IndicatorTimeResolution.Year,
      t
    );
    expect(table?.traces).toEqual([
      { name: 'total', xType: 'time', x: ['2020', '2021'], y: [100, 95] },
    ]);
    expect(table?.goalTraces).toEqual([]);
  });

  it('adds the total overlay to a dimensional area chart only when enabled', () => {
    const withTotal = buildVisualizationTableData(
      block({ __typename: 'IndicatorDefaultAreaChart', showTotalLine: true }),
      IndicatorTimeResolution.Year,
      t
    );
    const withoutTotal = buildVisualizationTableData(
      block({ __typename: 'IndicatorDefaultAreaChart', showTotalLine: false }),
      IndicatorTimeResolution.Year,
      t
    );
    expect(withTotal?.traces.map((trace) => trace.name)).toEqual(['Housing', 'Transport', 'total']);
    expect(withoutTotal?.traces.map((trace) => trace.name)).toEqual(['Housing', 'Transport']);
  });

  it('returns null for summaries and for charts with nothing to draw', () => {
    expect(
      buildVisualizationTableData(
        block({ __typename: 'IndicatorDefaultSummary' }),
        IndicatorTimeResolution.Year,
        t
      )
    ).toBeNull();
    expect(
      buildVisualizationTableData(
        block({ __typename: 'IndicatorDefaultLineChart', showTotalLine: true, chartSeries: [] }),
        IndicatorTimeResolution.Year,
        t
      )
    ).toBeNull();
  });
});
