import { IndicatorNonQuantifiedGoal } from '@/common/__generated__/graphql';

import {
  applyGoalMarkers,
  buildTimeTooltipFormatter,
  buildTimeXAxis,
  collectChartDates,
  detectTimeDimension,
  niceTickInterval,
  parseGraphSettings,
  tickSignificantDigits,
  wrapTitle,
} from '../indicator-graph.utils';

describe('buildTimeXAxis', () => {
  it('labels the tick of a lone yearly point', () => {
    const { axisLabel } = buildTimeXAxis({
      timeResolution: 'YEAR',
      allDates: ['2020-01-01'],
      hasSingleYear: true,
    });
    const point = new Date(2020, 0, 1).getTime();
    const day = 24 * 60 * 60 * 1000;
    expect(axisLabel.formatter(point)).toBe('2020');
    expect(axisLabel.formatter(point - day)).toBe('');
    expect(axisLabel.formatter(point + day)).toBe('');
  });
});

describe('niceTickInterval', () => {
  it('mirrors the ECharts nice() rounding', () => {
    // Employment-rate case: span 120 over 10 ticks → interval 10
    expect(niceTickInterval(120, 10)).toBe(10);
    // Electricity case: span 25000 over 5 ticks → interval 5000
    expect(niceTickInterval(25000, 5)).toBe(5000);
    expect(niceTickInterval(1, 5)).toBe(0.2);
  });
});

describe('tickSignificantDigits', () => {
  it('never rounds a tick label below the interval precision', () => {
    // With ticksRounding 1, the 110 boundary tick must not collapse to "100"
    expect(tickSignificantDigits(110, 1, 10)).toBe(2);
    expect(tickSignificantDigits(100, 1, 10)).toBe(2);
    expect(tickSignificantDigits(90, 1, 10)).toBe(1);
  });

  it('keeps the configured rounding when no interval is known', () => {
    expect(tickSignificantDigits(110, 1, null)).toBe(1);
    expect(tickSignificantDigits(0, 1, 10)).toBe(1);
  });
});

describe('collectChartDates', () => {
  const trace = { name: 'a', x: [2022, '2023-06-30'], y: [1, 2] };
  const goal = { name: 'goal', x: ['2025-12-31'], y: [5] };

  it('collects, normalizes and sorts trace and goal dates', () => {
    expect(
      collectChartDates({
        traces: [trace],
        goalTraces: [goal],
        hasTimeDimension: true,
        timeResolution: 'YEAR',
      })
    ).toEqual(['2022-01-01', '2023-01-01', '2025-01-01']);
  });

  it('extends to the non-quantified goal date', () => {
    expect(
      collectChartDates({
        traces: [trace],
        goalTraces: [],
        hasTimeDimension: true,
        timeResolution: 'YEAR',
        nonQuantifiedGoal: { trend: 'INCREASE' as never, date: '2030-06-30' },
      })
    ).toEqual(['2022-01-01', '2023-01-01', '2030-01-01']);
  });

  it('returns the category values for non-time data', () => {
    expect(
      collectChartDates({
        traces: [{ name: 'a', x: ['Cat A', 'Cat B'], y: [1, 2] }],
        goalTraces: [],
        hasTimeDimension: false,
        timeResolution: 'YEAR',
      })
    ).toEqual(['Cat A', 'Cat B']);
  });
});

describe('wrapTitle', () => {
  it('leaves short titles alone', () => {
    expect(wrapTitle('Short title', 50)).toBe('Short title');
  });

  it('wraps long titles at word boundaries', () => {
    expect(wrapTitle('one two three four', 9)).toBe('one two\nthree\nfour');
  });
});

describe('parseGraphSettings', () => {
  it('parses the custom chart background', () => {
    expect(parseGraphSettings({ customBackground: '#f4efe9' }).customBackground).toBe('#f4efe9');
  });

  it('drops non-string values and tolerates missing settings', () => {
    expect(parseGraphSettings({ customBackground: 42 }).customBackground).toBeUndefined();
    expect(parseGraphSettings(undefined).customBackground).toBeUndefined();
  });
});

describe('detectTimeDimension', () => {
  const noTimeSpec = { axes: [['categories', 0]] as Array<[string, number]> };

  it('honors an explicit category axis even when category names look like dates', () => {
    const traces = [{ name: 'Sector', xType: 'category' as const, x: ['2020', '2021'], y: [1, 2] }];
    expect(detectTimeDimension(noTimeSpec, traces, [])).toBe(false);
  });

  it('keeps an explicit category axis even when dated goals are present', () => {
    const traces = [{ name: 'Sector', xType: 'category' as const, x: ['Housing'], y: [1] }];
    const goals = [{ name: 'Goal', x: ['2030-01-01'], y: [2] }];
    expect(detectTimeDimension(noTimeSpec, traces, goals)).toBe(false);
  });

  it('uses the time axis when a trace declares it', () => {
    const traces = [{ name: 'Value', xType: 'time' as const, x: ['2020-01-01'], y: [1] }];
    expect(detectTimeDimension(noTimeSpec, traces, [])).toBe(true);
  });

  it('infers dates only for traces without a declared axis type', () => {
    const traces = [{ name: 'Value', x: ['2020-01-01'], y: [1] }];
    expect(detectTimeDimension(noTimeSpec, traces, [])).toBe(true);
    expect(detectTimeDimension(noTimeSpec, [{ name: 'Value', x: ['Housing'], y: [1] }], [])).toBe(
      false
    );
  });
});

describe('buildTimeTooltipFormatter', () => {
  const formatValue = (v: number) => String(v);
  const yRange = {
    unit: '<u>kt</u>',
    ticksCount: undefined,
    ticksRounding: undefined,
    valueRounding: 2,
    range: [0, 10],
  };
  const marker = '<span style="background-color:#111"></span>';

  it('escapes series names and units but keeps the ECharts marker', () => {
    const formatter = buildTimeTooltipFormatter({
      timeResolution: 'YEAR',
      trendName: null,
      yRange,
      formatValue,
    });
    const text = formatter([
      {
        seriesName: '<img src=x onerror=alert(1)>',
        axisValue: '2020-01-01',
        value: ['2020-01-01', 5],
        marker,
      },
    ]);
    expect(text).toBe(
      `2020<br/>${marker} &lt;img src=x onerror=alert(1)&gt;: 5 &lt;u&gt;kt&lt;/u&gt;<br/>`
    );
  });

  it('skips the trend series', () => {
    const formatter = buildTimeTooltipFormatter({
      timeResolution: 'YEAR',
      trendName: 'Trend',
      yRange: { ...yRange, unit: 'kt' },
      formatValue,
    });
    const text = formatter([
      { seriesName: 'Trend', axisValue: '2020-01-01', value: ['2020-01-01', 5], marker },
      { seriesName: 'Value', axisValue: '2020-01-01', value: ['2020-01-01', 7], marker },
    ]);
    expect(text).toBe(`2020<br/>${marker} Value: 7 kt<br/>`);
  });

  it('returns an empty string when only the trend or valueless series are hovered', () => {
    const formatter = buildTimeTooltipFormatter({
      timeResolution: 'YEAR',
      trendName: 'Trend',
      yRange: { ...yRange, unit: 'kt' },
      formatValue,
    });
    const text = formatter([
      { seriesName: 'Trend', axisValue: '2033-01-01', value: ['2033-01-01', 61], marker },
      { seriesName: 'Value', axisValue: '2033-01-01', value: ['2033-01-01', null], marker },
    ]);
    expect(text).toBe('');
  });
});

describe('applyGoalMarkers', () => {
  const yRange = {
    unit: 'kt',
    ticksCount: undefined,
    ticksRounding: undefined,
    valueRounding: 2,
    range: [-5, 20],
  };
  const theme = { graphColors: { blue030: '#00f', grey030: '#999' } } as unknown as Parameters<
    typeof applyGoalMarkers
  >[0]['theme'];
  const t = ((key: string) => key) as Parameters<typeof applyGoalMarkers>[0]['t'];

  function goalArrow(referenceValue: Parameters<typeof applyGoalMarkers>[0]['referenceValue']) {
    const baseSeries: Parameters<typeof applyGoalMarkers>[0]['baseSeries'] = [
      { type: 'line', data: [] },
    ];
    applyGoalMarkers({
      baseSeries,
      referenceValue,
      nonQuantifiedGoal: { trend: IndicatorNonQuantifiedGoal.Increase, date: '2030-01-01' },
      hasTimeDimension: true,
      timeResolution: 'YEAR',
      xAxisCategories: [],
      yRange,
      theme,
      t,
    });
    const data = baseSeries[0].markLine?.data ?? [];
    const arrow = data.find((item) => Array.isArray(item)) as
      [{ yAxis?: unknown }, { yAxis?: unknown }] | undefined;
    return arrow;
  }

  it('starts the goal arrow at a zero-valued reference value', () => {
    const arrow = goalArrow({ date: '2020-01-01', value: 0 });
    expect(arrow?.[0].yAxis).toBe(0);
    expect(arrow?.[1].yAxis).toBe(20);
  });

  it('falls back to the axis end only when there is no reference value', () => {
    const arrow = goalArrow(null);
    expect(arrow?.[0].yAxis).toBe(-5);
  });
});
