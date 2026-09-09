import {
  createTooltipFormatter,
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
