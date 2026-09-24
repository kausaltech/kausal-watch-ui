import type { LineChartVisualizationFragment } from '@/common/__generated__/graphql';
import { linearRegression } from '@/common/math';
import { escapeHtml } from '@/common/utils';
import {
  type TimeResolution,
  compareDates,
  formatDateLabel,
  normalizeDate,
} from '@/components/graphs/chart-dates';
import { DEFAULT_GOAL_SYMBOL, markerItemStyle } from '@/components/graphs/chart-symbols';
import {
  type AriaDetail,
  type AriaLocalePack,
  buildAriaDescription,
} from '@/components/graphs/indicator-graph-aria';
import {
  type FormatValue,
  type YRange,
  resolveValueRounding,
} from '@/components/graphs/indicator-graph.utils';
import { formatUnitLabel } from '@/components/indicators/indicator-data-helpers';

type LineChartBlock = Omit<
  Extract<LineChartVisualizationFragment, { __typename: 'DashboardIndicatorLineChartBlock' }>,
  '__typename'
>;

export interface GraphsTheme {
  categoryColors?: string[];
  totalLineColor?: string;
  trendLineColor?: string;
  goalLineColors?: string[];
  showTrendline?: boolean;
  lineShape?: string;
  /** Marker symbols cycled per series, as ECharts names */
  categorySymbols?: string[];
  /** Goal marker symbol, as an ECharts name */
  goalSymbol?: string;
  /** Tenant-configured chart background; the canvas is white when unset. */
  customBackground?: string;
}

/** Whether lines should be drawn smoothed, from the theme's `lineShape`
 *  setting. Follows the same convention as IndicatorGraph: 'spline' (the
 *  default when unset) and 'smooth' curve, anything else is linear. */
export function shouldSmoothLines(graphsTheme: GraphsTheme): boolean {
  const lineShape = graphsTheme.lineShape ?? 'spline';
  return lineShape === 'spline' || lineShape === 'smooth';
}

/** Unit label matching IndicatorVisualisation's default graph. */
export function getUnitLabel(indicator: LineChartBlock['indicator']): string {
  return formatUnitLabel(indicator?.unit);
}

export type TrendSeries = {
  name: string;
  type: 'line';
  symbol: 'none';
  showSymbol: boolean;
  smooth: boolean;
  data: [string, number][];
  lineStyle: { type: 'dashed'; width: number; color: string };
  itemStyle: { color: string };
  tooltip: { show: boolean };
};

/** Date key at the chart's resolution: '2020', '2020-03' or '2020-03-15'. */
export function formatDateKey(date: string, timeResolution?: string | null): string {
  return formatDateLabel(date, toChartTimeResolution(timeResolution));
}

function getTimeKeyForSorting(key: string, timeResolution?: string | null): number {
  if (timeResolution === 'YEAR') {
    return parseInt(key, 10);
  } else if (timeResolution === 'MONTH') {
    const [year, month] = key.split('-').map(Number);
    return year * 12 + (month - 1);
  } else {
    return new Date(key).getTime();
  }
}

export function buildDimSeries(
  chartSeries: LineChartBlock['chartSeries'],
  palette: string[],
  timeResolution?: string | null
) {
  const dimCategoryMap = new Map<
    string,
    { color: string; values: { date: string | null; value: number }[] }
  >();

  (chartSeries ?? [])
    .filter((s) => s != null)
    .filter((s) => s.dimensionCategory)
    .forEach((s) => {
      const name = s.dimensionCategory!.name;
      const fallbackColor = palette[Array.from(dimCategoryMap.keys()).length % palette.length];
      const rawColor = s.dimensionCategory!.defaultColor;
      const color = rawColor && rawColor.trim() !== '' ? rawColor : fallbackColor;

      if (!dimCategoryMap.has(name)) {
        dimCategoryMap.set(name, { color, values: [] });
      }

      dimCategoryMap.get(name)!.values.push(...s.values.filter((v) => v != null));
    });

  return Array.from(dimCategoryMap.entries()).map(([name, { color, values }]) => {
    const timeMap = new Map<string, number>();
    values.forEach((v) => {
      if (v.value != null && v.date) {
        const key = formatDateKey(v.date, timeResolution);
        timeMap.set(key, (timeMap.get(key) ?? 0) + v.value);
      }
    });
    const raw = Array.from(timeMap.entries())
      .map(([key, value]) => [key, value] as [string, number])
      .sort(
        (a, b) =>
          getTimeKeyForSorting(a[0], timeResolution) - getTimeKeyForSorting(b[0], timeResolution)
      );
    return { name, color, raw };
  });
}

/**
 * Whether any value carries a date. Category-only indicators (a value per
 * category, no time axis) have none; the schema permits null dates.
 */
export function hasDatedValues(chartSeries: LineChartBlock['chartSeries']): boolean {
  return (chartSeries ?? []).some((s) => s?.values.some((v) => v?.date != null));
}

/**
 * Undated values per dimension category, for category-only indicators drawn
 * as one bar per category. Categories without an undated value are left out.
 */
export function buildCategoryValues(
  chartSeries: LineChartBlock['chartSeries'],
  palette: string[]
): Array<{ name: string; color: string; value: number }> {
  const out: Array<{ name: string; color: string; value: number }> = [];
  (chartSeries ?? []).forEach((s) => {
    if (!s?.dimensionCategory) return;
    const undated = s.values.filter(
      (v): v is NonNullable<typeof v> => v != null && v.date == null && v.value != null
    );
    if (undated.length === 0) return;
    const rawColor = s.dimensionCategory.defaultColor;
    out.push({
      name: s.dimensionCategory.name,
      color: rawColor && rawColor.trim() !== '' ? rawColor : palette[out.length % palette.length],
      value: undated.reduce((sum, v) => sum + v.value, 0),
    });
  });
  return out;
}

/** The undated categoryless value, i.e. a total without a time axis. */
export function buildUndatedTotal(chartSeries: LineChartBlock['chartSeries']): number | null {
  const undated =
    (chartSeries ?? [])
      .find((s) => s != null && !s.dimensionCategory)
      ?.values.filter(
        (v): v is NonNullable<typeof v> => v != null && v.date == null && v.value != null
      ) ?? [];
  return undated.length ? undated.reduce((sum, v) => sum + v.value, 0) : null;
}

export function buildTotalSeries(
  chartSeries: LineChartBlock['chartSeries'],
  totalLineColor: string,
  label = 'Total',
  timeResolution?: string | null
) {
  const totalMap = new Map<string, number>();
  (chartSeries ?? [])
    .filter((s) => s != null)
    .find((s) => !s.dimensionCategory)
    ?.values.filter((v) => v != null)
    .forEach((v) => {
      if (v.date) {
        const key = formatDateKey(v.date, timeResolution);
        totalMap.set(key, (totalMap.get(key) ?? 0) + v.value);
      }
    });

  const totalRaw = Array.from(totalMap.entries())
    .map(([key, value]) => [key, value] as [string, number])
    .sort(
      (a, b) =>
        getTimeKeyForSorting(a[0], timeResolution) - getTimeKeyForSorting(b[0], timeResolution)
    );
  return {
    name: label,
    color: totalLineColor,
    raw: totalRaw,
  };
}

/**
 * Goal markers, one scatter series per scenario so that targets from
 * different scenarios keep their own name and color, like the generic
 * indicator graph. Goals without a scenario fall back to the plain label.
 */
export function buildGoalSeries(
  indicator: LineChartBlock['indicator'],
  unit: string,
  goalLineColors: string[],
  label = 'Goal',
  timeResolution?: string | null,
  formatValue: (value: number) => string = String,
  /** Resolved ECharts symbol (see goalSymbol() in indicator-graph.utils) */
  symbol: string = DEFAULT_GOAL_SYMBOL
) {
  type Goal = NonNullable<NonNullable<LineChartBlock['indicator']>['goals']>[number];
  const byScenario = new Map<string | null, { name: string; goals: Array<NonNullable<Goal>> }>();
  indicator?.goals?.forEach((goal) => {
    if (goal?.date == null) return;
    const scenarioId = goal.scenario?.id ?? null;
    const group = byScenario.get(scenarioId) ?? {
      name: goal.scenario?.name || label,
      goals: [],
    };
    group.goals.push(goal);
    byScenario.set(scenarioId, group);
  });

  return Array.from(byScenario.values(), ({ name, goals }, idx) => {
    const color = goalLineColors[idx % goalLineColors.length] ?? '#3E9C88';
    return {
      name,
      type: 'scatter' as const,
      symbol,
      symbolSize: 12,
      data: goals
        .sort((a, b) => a.date!.localeCompare(b.date!))
        .map((g) => [formatDateKey(g.date!, timeResolution), g.value] as [string, number]),
      itemStyle: markerItemStyle(color),
      tooltip: {
        formatter: (params: { value?: unknown }) => {
          const value: unknown = Array.isArray(params.value)
            ? (params.value as unknown[])[1]
            : params.value;
          const formatted = typeof value === 'number' ? formatValue(value) : '-';
          return `${escapeHtml(name)}: ${formatted} ${escapeHtml(unit)}`.trim();
        },
      },
    };
  });
}

export function buildTrendSeries(
  totalRaw: [string, number][],
  indicator: LineChartBlock['indicator'],
  trendLineColor: string,
  label = 'Trend',
  timeResolution?: string | null
): TrendSeries[] {
  const regData = totalRaw.slice(-Math.min(totalRaw.length, 10));
  const predictedTimes = regData.map(([key]) => getTimeKeyForSorting(key, timeResolution));

  if (indicator?.goals?.length) {
    const goalTimes = indicator.goals
      .map((g) => g?.date)
      .filter((d) => d != null)
      .map((d) => getTimeKeyForSorting(formatDateKey(d, timeResolution), timeResolution));
    if (goalTimes.length) {
      const highestGoalTime = Math.max(...goalTimes);
      if (highestGoalTime > predictedTimes[predictedTimes.length - 1]) {
        predictedTimes.push(highestGoalTime);
      }
    }
  }

  const numericData = regData.map(
    ([key, value]) => [getTimeKeyForSorting(key, timeResolution), value] as [number, number]
  );
  const model = linearRegression(numericData);
  const predictedValues = predictedTimes.map((timeKey) => model.m * timeKey + model.b);

  const predictedKeys = predictedTimes.map((timeKey) => {
    if (timeResolution === 'YEAR') {
      return String(timeKey);
    } else if (timeResolution === 'MONTH') {
      const year = Math.floor(timeKey / 12);
      const month = (timeKey % 12) + 1;
      return `${year}-${String(month).padStart(2, '0')}`;
    } else {
      return new Date(timeKey).toISOString().split('T')[0];
    }
  });

  return regData.length >= 2 && (indicator?.showTrendline ?? true)
    ? [
        {
          name: label,
          type: 'line' as const,
          symbol: 'none' as const,
          showSymbol: false,
          smooth: false,
          data: predictedKeys.map((key, i) => [key, predictedValues[i]] as [string, number]),
          lineStyle: { type: 'dashed' as const, width: 2, color: trendLineColor },
          itemStyle: { color: trendLineColor },
          tooltip: { show: false },
        },
      ]
    : [];
}

type KeyedPoints = [string, number][];

/** The blocks' resolution strings ('YEAR', 'year', ...) as the chart layer's type. */
export function toChartTimeResolution(timeResolution: string | null | undefined): TimeResolution {
  const resolution = String(timeResolution ?? 'YEAR').toUpperCase();
  return resolution === 'YEAR' || resolution === 'MONTH' || resolution === 'DAY'
    ? resolution
    : undefined;
}

/** The y-axis facts the chart layer's tooltip and aria builders read; blocks let ECharts scale the axis. */
export function blockYRange(unit: string, valueRounding: number | null | undefined): YRange {
  return {
    unit,
    ticksCount: undefined,
    ticksRounding: undefined,
    valueRounding: resolveValueRounding(valueRounding),
    range: [],
  };
}

const toTrace = (name: string, points: KeyedPoints) => ({
  name,
  x: points.map(([key]) => key),
  y: points.map(([, value]) => value),
});

/**
 * The chart's aria-label for a dashboard chart block, built from the same
 * series the block draws (category/total lines, per-scenario goals, trend)
 * with IndicatorGraph's description builder, so both chart kinds describe
 * themselves alike. Blocks key their points by formatted date ('2020',
 * '2020-03'), which the builder's date formatter reads back as-is.
 */
export function buildBlockAriaDescription({
  title,
  series,
  goals = [],
  trend = null,
  timeResolution,
  unit,
  valueRounding,
  formatValue,
  t,
  localePack,
  chartKind = 'line',
  detail,
}: {
  title: string | null | undefined;
  series: Array<{ name: string; raw: KeyedPoints }>;
  goals?: Array<{ name: string; data: KeyedPoints }>;
  trend?: { name: string; data: KeyedPoints } | null;
  timeResolution: string | null | undefined;
  unit: string;
  valueRounding: number | null | undefined;
  formatValue: FormatValue;
  t: (key: string, values?: Record<string, string | number>) => string;
  localePack: AriaLocalePack;
  chartKind?: 'line' | 'bar';
  detail?: AriaDetail;
}): string {
  return buildAriaDescription({
    title,
    traces: series.map((entry) => toTrace(entry.name, entry.raw)),
    goalTraces: goals.map((goal) => toTrace(goal.name, goal.data)),
    trendTrace: trend ? toTrace(trend.name, trend.data) : null,
    hasTimeDimension: true,
    timeResolution: toChartTimeResolution(timeResolution),
    yRange: blockYRange(unit, valueRounding),
    formatValue,
    t,
    localePack,
    chartKind,
    detail,
  });
}

/**
 * The aria-label for a category chart block — a pie's slices for the selected
 * year, or a category-only indicator's bars — as a single category series
 * named by the indicator.
 */
export function buildCategoryAriaDescription({
  title,
  year,
  slices,
  unit,
  valueRounding,
  formatValue,
  t,
  localePack,
  detail,
  chartKind = 'pie',
}: {
  title: string | null | undefined;
  year?: number | undefined;
  slices: Array<{ name: string; value: number }>;
  unit: string;
  valueRounding: number | null | undefined;
  formatValue: FormatValue;
  t: (key: string, values?: Record<string, string | number>) => string;
  localePack: AriaLocalePack;
  detail?: AriaDetail;
  chartKind?: 'pie' | 'bar';
}): string {
  return buildAriaDescription({
    title,
    traces: [
      {
        name: title ?? '',
        xType: 'category',
        x: slices.map((slice) => slice.name),
        y: slices.map((slice) => slice.value),
      },
    ],
    goalTraces: [],
    trendTrace: null,
    hasTimeDimension: false,
    timeResolution: undefined,
    yRange: blockYRange(unit, valueRounding),
    formatValue,
    t,
    localePack,
    chartKind,
    periodLabel: year != null ? String(year) : undefined,
    detail,
  });
}

export const buildPieAriaDescription = buildCategoryAriaDescription;

export function buildYAxisConfig(
  unit: string,
  formatValue: (value: number) => string,
  indicator?: {
    minValue?: number | null;
    maxValue?: number | null;
    ticksCount?: number | null;
  },
  color?: string
) {
  const yAxis: {
    type: 'value';
    name: string;
    nameTextStyle: { align: 'left' | 'center' | 'right'; padding: number[]; fontSize: number };
    axisLabel: { color?: string; formatter: (value: number) => string };
    min?: number;
    max?: number;
    scale?: boolean;
    splitNumber?: number;
  } = {
    type: 'value',
    name: unit,
    nameTextStyle: {
      align: 'left',
      padding: [0, 0, 0, -25],
      fontSize: 12,
    },
    axisLabel: {
      color,
      formatter: formatValue,
    },
  };

  if (typeof indicator?.minValue === 'number') {
    yAxis.min = indicator.minValue;
  } else {
    // Without an explicit minimum, don't force zero into the range: data
    // lying away from zero (e.g. 95–105) would otherwise be compressed
    // into a 0-based axis. `scale` lets ECharts pick nice bounds around
    // the data, matching the ordinary indicator view's derived range.
    yAxis.scale = true;
  }
  if (typeof indicator?.maxValue === 'number') {
    yAxis.max = indicator.maxValue;
  }
  if (typeof indicator?.ticksCount === 'number') {
    yAxis.splitNumber = indicator.ticksCount;
  }

  return yAxis;
}

/**
 * Fills the gaps between the first and last date so the category x-axis
 * represents a continuous timeline (a year without data still occupies a
 * slot, like on a continuous time axis). Only YEAR and MONTH resolutions
 * are filled; anything unparseable or absurdly long is returned as-is.
 */
function fillMissingPeriods(
  allDates: string[],
  timeResolution: string | null | undefined
): string[] {
  const resolution = String(timeResolution || 'YEAR').toUpperCase();
  if (allDates.length < 2 || (resolution !== 'YEAR' && resolution !== 'MONTH')) {
    return allDates;
  }
  const parsed = allDates.map((d) => new Date(d));
  if (parsed.some((d) => Number.isNaN(d.getTime()))) {
    return allDates;
  }
  if (resolution === 'YEAR') {
    const years = parsed.map((d) => d.getUTCFullYear());
    const min = Math.min(...years);
    const max = Math.max(...years);
    if (max - min > 500) return allDates;
    return Array.from({ length: max - min + 1 }, (_, i) => `${min + i}-01-01`);
  }
  const months = parsed.map((d) => d.getUTCFullYear() * 12 + d.getUTCMonth());
  const min = Math.min(...months);
  const max = Math.max(...months);
  if (max - min > 1200) return allDates;
  return Array.from({ length: max - min + 1 }, (_, i) => {
    const month = min + i;
    return `${Math.floor(month / 12)}-${String((month % 12) + 1).padStart(2, '0')}-01`;
  });
}

/**
 * Collects and sorts all unique dates from multiple raw series arrays,
 * filling gap periods so the axis is a continuous timeline.
 * Returns both the sorted normalized dates and the display-formatted categories.
 */
export function collectAllDates(
  sources: Array<[string, number][]>,
  timeResolution: string | null | undefined,
  additionalDates?: (string | number)[]
): { allDates: string[]; xCategories: string[] } {
  const normalizedDateSet = new Set<string>();

  const resolution = toChartTimeResolution(timeResolution);

  sources.forEach((raw) =>
    raw.forEach(([key]) => normalizedDateSet.add(normalizeDate(key, resolution)))
  );

  additionalDates?.forEach((date) => normalizedDateSet.add(normalizeDate(date, resolution)));

  const sortedDates = Array.from(normalizedDateSet).sort(compareDates);
  const allDates = fillMissingPeriods(sortedDates, timeResolution);
  const xCategories = allDates.map((d) => formatDateLabel(d, resolution));

  return { allDates, xCategories };
}
