import {
  createTooltipFormatter,
  selectPieSlices,
  showSegmentedPercentage,
} from '../DashboardIndicatorPieChartBlock';

type Params = Parameters<ReturnType<typeof createTooltipFormatter>>[0];

describe('createTooltipFormatter', () => {
  const seriesData = [
    { name: 'Housing', value: 123456.789 },
    { name: 'Transport', value: 50 },
  ];
  const format = (v: number) => v.toLocaleString('en', { maximumSignificantDigits: 3 });

  it('formats the value and appends the unit and share', () => {
    const formatter = createTooltipFormatter(null, seriesData, format, 'kt');
    const text = formatter({ name: 'Housing', value: 123456.789, percent: 71.2 } as Params);
    expect(text).toBe('Housing: 123,000 kt (71%)');
  });

  it('omits the unit suffix when the indicator has none', () => {
    const formatter = createTooltipFormatter(null, seriesData, format, '');
    const text = formatter({ name: 'Transport', value: 50, percent: 28.8 } as Params);
    expect(text).toBe('Transport: 50 (29%)');
  });

  it('escapes editor-controlled names and units', () => {
    const formatter = createTooltipFormatter(null, seriesData, format, '<b>kt</b>');
    const text = formatter({ name: '<img src=x onerror=alert(1)>', value: 50 } as Params);
    expect(text).not.toContain('<');
    expect(text).toBe('&lt;img src=x onerror=alert(1)&gt;: 50 &lt;b&gt;kt&lt;/b&gt;');
  });
});

describe('showSegmentedPercentage', () => {
  const percentUnit = { name: 'percent', shortName: '%' };

  it('omits the share for a percentage indicator whose slices add up to about 100', () => {
    const slices = [5, 14.3, 8.1, 20.9, 11.7, 9, 6.2, 10.1, 8.3, 6.2].map((value, i) => ({
      name: `Sector ${i}`,
      value,
    }));
    expect(showSegmentedPercentage(percentUnit, slices)).toBe(false);
    expect(showSegmentedPercentage({ name: '%', shortName: '' }, slices)).toBe(false);
  });

  it('keeps the share when the percentages are not shares of one whole', () => {
    const slices = [
      { name: 'A', value: 40 },
      { name: 'B', value: 35 },
    ];
    expect(showSegmentedPercentage(percentUnit, slices)).toBe(true);
  });

  it('keeps the share for non-percentage units and missing units', () => {
    const slices = [
      { name: 'A', value: 60 },
      { name: 'B', value: 40 },
    ];
    expect(showSegmentedPercentage({ name: 'kilotonnes', shortName: 'kt' }, slices)).toBe(true);
    expect(showSegmentedPercentage(null, slices)).toBe(true);
  });

  it('feeds through to the tooltip text', () => {
    const slices = [
      { name: 'A', value: 60 },
      { name: 'B', value: 40 },
    ];
    const indicator = { unit: percentUnit } as unknown as Parameters<
      typeof createTooltipFormatter
    >[0];
    const formatter = createTooltipFormatter(indicator, slices, String, '%');
    const params = { name: 'A', value: 60, percent: 60 } as Parameters<typeof formatter>[0];
    expect(formatter(params)).toBe('A: 60 %');
  });
});

describe('selectPieSlices fallback year', () => {
  type ChartSeries = Parameters<typeof selectPieSlices>[0];
  const category = (id: string, name: string) => ({ id, name, defaultColor: '' });
  const chartSeries = [
    // Stale first category: its last observation is older than the others'
    {
      dimensionCategory: category('a', 'Stale'),
      values: [{ id: '1', date: '2019-01-01', value: 5 }],
    },
    {
      dimensionCategory: category('b', 'Fresh'),
      values: [
        { id: '2', date: '2019-01-01', value: 7 },
        { id: '3', date: '2024-01-01', value: 9 },
      ],
    },
    { dimensionCategory: category('c', 'Empty'), values: [] },
  ] as unknown as ChartSeries;

  it('uses the most recent year found in any series', () => {
    const { year, slices } = selectPieSlices(chartSeries, null);
    expect(year).toBe(2024);
    expect(slices).toEqual([{ name: 'Fresh', value: 9, itemStyle: { color: undefined } }]);
  });

  it('still honors an explicitly configured year', () => {
    const { year, slices } = selectPieSlices(chartSeries, 2019);
    expect(year).toBe(2019);
    expect(slices.map((slice) => slice.name)).toEqual(['Stale', 'Fresh']);
  });

  it('reports no year when nothing is dated', () => {
    const undated = [
      { dimensionCategory: category('a', 'A'), values: [{ id: '1', date: null, value: 5 }] },
    ] as unknown as ChartSeries;
    expect(selectPieSlices(undated, null)).toEqual({ year: undefined, slices: [] });
  });
});
