import { createTooltipFormatter } from '../DashboardIndicatorPieChartBlock';

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
