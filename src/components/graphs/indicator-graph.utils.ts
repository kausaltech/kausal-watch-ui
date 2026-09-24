/**
 * Pure builders and helpers for the ECharts IndicatorGraph. Everything here
 * is framework-free: the component parses hooks/theme input and delegates to
 * these functions to assemble the chart option.
 *
 * Note: the dashboard chart blocks have their own, category-axis-based
 * equivalents in components/contentblocks/indicator-chart/. Per the chart
 * migration plan the blocks eventually absorb this renderer; don't grow the
 * two toolkits further apart.
 */
import type { Theme } from '@kausal/themes/types';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import type { MarkLineOption } from 'echarts/types/dist/shared';
import { transparentize } from 'polished';

import { DEFAULT_SIGNIFICANT_DIGITS } from '@common/utils/format';

import { IndicatorNonQuantifiedGoal } from '@/common/__generated__/graphql';
import { escapeHtml } from '@/common/utils';
import { getDefaultColors } from '@/components/contentblocks/indicator-chart/indicator-chart-colors';

import {
  type TimeResolution,
  compareDates,
  formatDateLabel,
  isCalendarDate,
  normalizeDate,
  parseChartDate,
} from './chart-dates';
import { categorySymbol, lineMarkerSizing, markerItemStyle } from './chart-symbols';

/** Formats a value with the indicator's rounding and the active locale. */
export type FormatValue = (value: number) => string;
export type Translator = (key: string, values?: Record<string, string | number>) => string;

export type ChartTrace = {
  name: string;
  dataType?: 'total' | null;
  xType?: 'time' | 'category';
  /** Null dates are schema-permitted; the axis collectors skip them */
  x: Array<string | number | null>;
  y: Array<number | null>;
  _parentName?: string | null;
  /** Editor-chosen color of the trace's dimension category (backend `defaultColor`). */
  color?: string | null;
  /** Per-point editor colors for category-axis traces, aligned with `x`. */
  colors?: Array<string | null>;
};

export type GoalTrace = {
  name: string;
  x: Array<string | number>;
  y: Array<number | null>;
};

export type YRange = {
  unit: string;
  ticksCount: number | undefined;
  ticksRounding: number | undefined;
  valueRounding: number;
  range: number[];
};

export type NonQuantifiedGoalProp = {
  trend: IndicatorNonQuantifiedGoal | null;
  date: string | null;
};

export type ReferenceValueProp = {
  date: string | null;
  value: number;
} | null;

export type GraphSettings = {
  totalLineColor?: string;
  categoryColors?: string[];
  goalLineColors?: string[];
  trendLineColor?: string;
  areaGraphs?: boolean;
  lineShape?: string;
  drawGoalLine?: boolean;
  categorySymbols?: string[];
  goalSymbol?: string;
  /** Tenant-configured chart background; the canvas is white when unset. */
  customBackground?: string;
};

export type GraphColors = {
  totalLineColor: string;
  categoryColors: string[];
  goalColors: string[];
  trendColor: string;
};

/** Narrow the untyped theme settings into the graph settings we consume. */
export function parseGraphSettings(rawGraphSettings: unknown): GraphSettings {
  const raw = (rawGraphSettings ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === 'string' ? v : undefined);
  const bool = (v: unknown) => (typeof v === 'boolean' ? v : undefined);
  const strArray = (v: unknown) =>
    Array.isArray(v) ? v.filter((item): item is string => typeof item === 'string') : undefined;

  return {
    totalLineColor: str(raw.totalLineColor),
    categoryColors: strArray(raw.categoryColors),
    goalLineColors: strArray(raw.goalLineColors),
    trendLineColor: str(raw.trendLineColor),
    areaGraphs: bool(raw.areaGraphs),
    lineShape: str(raw.lineShape),
    drawGoalLine: bool(raw.drawGoalLine),
    categorySymbols: strArray(raw.categorySymbols),
    goalSymbol: str(raw.goalSymbol),
    customBackground: str(raw.customBackground),
  };
}

/**
 * Resolve the concrete colors used by the graph. Falls back to the same
 * palette as the dashboard indicator chart blocks, so the same category gets
 * the same color in both views.
 */
export function resolveGraphColors(graphSettings: GraphSettings, theme: Theme): GraphColors {
  const fallbackColor = graphSettings.totalLineColor || theme.brandDark || '#0070f3';
  const categoryColors =
    graphSettings.categoryColors && graphSettings.categoryColors.length > 0
      ? graphSettings.categoryColors
      : getDefaultColors(theme);
  const goalColors =
    graphSettings.goalLineColors && graphSettings.goalLineColors.length > 0
      ? graphSettings.goalLineColors
      : [graphSettings.trendLineColor || fallbackColor];

  return {
    totalLineColor: fallbackColor,
    categoryColors,
    goalColors,
    trendColor: graphSettings.trendLineColor || fallbackColor,
  };
}

export const wrapTitle = (title: string, maxWidth: number): string => {
  if (title.length <= maxWidth) {
    return title;
  }

  const words = title.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      // If a single word is longer than maxWidth, we still need to add it
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.join('\n');
};

/**
 * The significant digits an indicator's values are shown with everywhere
 * (graph, tooltip, aria text, table): the editor-set valueRounding, else
 * the shared default.
 */
export const resolveValueRounding = (valueRounding: number | null | undefined): number =>
  valueRounding ?? DEFAULT_SIGNIFICANT_DIGITS;

/**
 * Safely format a number with null/NaN checks.
 * ECharts valueFormatters can receive null values from missing data points.
 */
export const formatNumber = (
  value: number | null | undefined,
  formatValue: FormatValue
): string => {
  if (value == null || Number.isNaN(value)) return '';
  return formatValue(value);
};

/**
 * Collect the sorted unique dates of all value and goal traces (normalized
 * per `normalizeDate`), extended to the non-quantified goal date when a
 * directional goal arrow needs to reach it. For category-axis data, returns
 * the first trace's x values as-is.
 */
export function collectChartDates({
  traces,
  goalTraces,
  hasTimeDimension,
  timeResolution,
  nonQuantifiedGoal,
}: {
  traces: ChartTrace[];
  goalTraces: GoalTrace[];
  hasTimeDimension: boolean;
  timeResolution: TimeResolution;
  nonQuantifiedGoal?: NonQuantifiedGoalProp;
}): Array<string | number | null> {
  if (!hasTimeDimension) {
    // For non-time dimension, return category data
    return traces.length > 0 ? traces[0].x : [];
  }

  const dateSet = new Set<string>();
  [...traces, ...goalTraces].forEach((trace) => {
    trace.x.forEach((date) => {
      if (date != null) {
        dateSet.add(normalizeDate(date, timeResolution));
      }
    });
  });

  const datesArray = Array.from(dateSet);
  datesArray.sort(compareDates);

  // Extend to nonQuantifiedGoalDate if needed (for directional goal arrow)
  if (nonQuantifiedGoal?.trend && nonQuantifiedGoal?.date && timeResolution === 'YEAR') {
    const planEndDate = normalizeDate(nonQuantifiedGoal.date, 'YEAR');
    if (isCalendarDate(planEndDate) && !datesArray.includes(planEndDate)) {
      datesArray.push(planEndDate);
      datesArray.sort(compareDates);
    }
  }

  return datesArray;
}

/**
 * Category labels for the x axis: raw values for category data, formatted
 * dates for time data with consecutive duplicates blanked out (empty strings
 * keep index alignment; ECharts hides them).
 */
export function buildXAxisCategories({
  traces,
  allDates,
  hasTimeDimension,
  timeResolution,
}: {
  traces: ChartTrace[];
  allDates: Array<string | number | null>;
  hasTimeDimension: boolean;
  timeResolution: TimeResolution;
}): string[] {
  if (!hasTimeDimension && traces.length > 0) {
    return traces[0].x.map((value) => String(value));
  }

  if (hasTimeDimension && allDates.length > 0) {
    const formattedLabels: string[] = [];
    allDates.forEach((value) => {
      const formattedValue = formatDateLabel(value, timeResolution);
      if (
        formattedLabels.length === 0 ||
        formattedLabels[formattedLabels.length - 1] !== formattedValue
      ) {
        formattedLabels.push(formattedValue);
      } else {
        formattedLabels.push('');
      }
    });
    return formattedLabels;
  }

  return [];
}

/**
 * Whether the chart has a time x-axis: declared by the specification, hinted
 * by trace types, or inferred from date-like x values.
 */
export function detectTimeDimension(
  specification: { axes: Array<[string, number]> },
  traces: ChartTrace[],
  goalTraces: GoalTrace[]
): boolean {
  if (specification.axes.some((axis) => axis[0] === 'time')) {
    return true;
  }
  if (traces.some((trace) => trace.xType === 'time')) {
    return true;
  }
  // An explicit category axis wins over inference and over dated goals:
  // category names such as "2020" would otherwise parse as dates, and goals
  // always carry a date even when the indicator's data is undated
  if (traces.some((trace) => trace.xType === 'category')) {
    return false;
  }
  if (goalTraces.length > 0 && goalTraces.some((goal) => goal.x.length > 0)) {
    return true;
  }
  // Traces without a declared axis type: infer from date-like x values (even for single datapoint)
  if (traces.length > 0 && traces[0].x.length > 0) {
    const firstX = traces[0].x[0];
    if (typeof firstX === 'string' && !Number.isNaN(new Date(firstX).getTime())) {
      return true;
    }
    if (typeof firstX === 'number' && firstX > 1900 && firstX < 2100) {
      // Likely a year
      return true;
    }
  }
  return false;
}

// Same rule as buildDimSeries in the dashboard chart blocks: an editor-chosen
// category color from the backend wins; blank/missing falls back to the palette.
export const resolveCategoryColor = (
  explicitColor: string | null | undefined,
  paletteColor: string
): string => (explicitColor && explicitColor.trim() !== '' ? explicitColor : paletteColor);

/**
 * The tick interval ECharts derives from an extent (its nice() rounding with
 * round=true). Also used to snap padded axis bounds in indicator-data-helpers:
 * both must agree, or the boundary tick lands between nice ticks and its
 * rounded label can duplicate the neighboring one.
 */
export function niceTickInterval(span: number, splitNumber: number): number {
  const roughStep = span / Math.max(splitNumber, 1);
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const fraction = roughStep / magnitude;
  const niceFraction =
    fraction < 1.5 ? 1 : fraction < 2.5 ? 2 : fraction < 4 ? 3 : fraction < 7 ? 5 : 10;
  return niceFraction * magnitude;
}

/**
 * ticksRounding is a maximum-significant-digits setting; applied blindly it
 * collapses neighboring ticks into the same label once values need more
 * digits (with 1 significant digit, the 110 tick renders as "100" right
 * above the real 100). Never round a tick label below the precision of the
 * tick interval.
 */
export function tickSignificantDigits(
  value: number,
  rounding: number,
  tickInterval: number | null
): number {
  if (!tickInterval || value === 0) return rounding;
  const needed = Math.floor(Math.log10(Math.abs(value))) - Math.floor(Math.log10(tickInterval)) + 1;
  return Math.min(Math.max(rounding, needed), 21);
}

/**
 * A trace's values at each axis date (nulls where it has none), keyed by the
 * trace's dates normalized to match the already-normalized axis dates.
 */
function alignToDates(
  trace: { x: Array<string | number | null>; y: Array<number | null> },
  allDates: Array<string | number | null>,
  timeResolution: TimeResolution
): Array<[string, number | null]> {
  const valueByDate = new Map<string, number | null>();
  trace.x.forEach((date, i) => {
    valueByDate.set(normalizeDate(date, timeResolution), trace.y[i] ?? null);
  });
  return allDates.map((date) => [String(date), valueByDate.get(String(date)) ?? null]);
}

/** Series tooltip showing values with the indicator's rounding. */
const valueTooltip = (formatValue: FormatValue) => ({
  valueFormatter: (val: number | null) => formatNumber(val, formatValue),
});

/** Align time traces to the full axis-date range, padding gaps with nulls. */
export function alignTracesToDates(
  traces: ChartTrace[],
  allDates: Array<string | number | null>,
  timeResolution: TimeResolution
): ChartTrace[] {
  return traces.map((trace) => {
    const aligned = alignToDates(trace, allDates, timeResolution);
    return {
      ...trace,
      x: aligned.map(([date]) => date),
      y: aligned.map(([, value]) => value),
    };
  });
}

export const buildSeriesFromTraces = ({
  traces,
  colors,
  hasTimeDimension,
  useAreaGraph,
  lineShape,
  categorySymbols,
  formatValue,
}: {
  traces: ChartTrace[];
  colors: {
    totalLine: string;
    categoryColors: string[];
  };
  hasTimeDimension: boolean;
  useAreaGraph: boolean;
  lineShape: string;
  categorySymbols: string[] | undefined;
  formatValue: FormatValue;
}): Array<LineSeriesOption | BarSeriesOption> => {
  const traceCount = traces.length;
  // Count palette slots per category, skipping total traces, so a category
  // keeps the same slot as in the dashboard chart blocks (whose palette
  // indexing never includes the total series).
  let categoryIdx = 0;
  return traces.map<LineSeriesOption | BarSeriesOption>((trace, idx) => {
    const color =
      trace.dataType === 'total'
        ? colors.totalLine
        : resolveCategoryColor(
            trace.color,
            colors.categoryColors[categoryIdx++ % colors.categoryColors.length]
          );

    // Use line chart for time dimension
    if (hasTimeDimension) {
      // 8px symbols cycled per trace from the theme's categorySymbols.
      const symbol = categorySymbol(categorySymbols, idx);
      // Count actual data points — the trace may be aligned to the full
      // axis-date range with null padding (e.g. for goal years)
      const { showSymbol, symbolSize, borderWidth } = lineMarkerSizing(
        trace.y.filter((value) => value != null).length,
        traceCount
      );
      // Map x and y values together for time axis
      const data = trace.x.map((xVal, idx) => [xVal, trace.y[idx] ?? null]);
      const series: LineSeriesOption = {
        type: 'line',
        name: trace.name,
        data: data,
        connectNulls: true,
        showSymbol,
        symbol,
        symbolSize,
        sampling: 'lttb',
        smooth: lineShape === 'spline' || lineShape === 'smooth',
        lineStyle: {
          width: trace.dataType === 'total' ? 3 : 2,
          color,
        },
        itemStyle: markerItemStyle(color, borderWidth),
        z: 2,
        emphasis: {
          focus: 'series',
        },
        tooltip: valueTooltip(formatValue),
      };

      if (traceCount === 1 && useAreaGraph) {
        series.areaStyle = {
          color: transparentize(0.8, color),
        };
      }

      return series;
    }

    // Like the legacy graph: when one trace holds all the category bars,
    // color each bar by its own category; with multiple traces, color per trace.
    const colorPerBar = traceCount === 1 && trace.y.length > 1;
    const series: BarSeriesOption = {
      type: 'bar',
      name: trace.name,
      data: colorPerBar
        ? trace.y.map((value, i) => ({
            value: value ?? undefined,
            itemStyle: {
              color: resolveCategoryColor(
                trace.colors?.[i],
                colors.categoryColors[i % colors.categoryColors.length]
              ),
            },
          }))
        : trace.y,
      barGap: '20%',
      itemStyle: {
        color,
      },
      emphasis: {
        focus: 'series',
      },
      tooltip: valueTooltip(formatValue),
    };
    return series;
  });
};

/** Goal markers, one line series per goal trace, aligned to the axis dates. */
export function buildGoalSeries({
  goalTraces,
  allDates,
  timeResolution,
  goalColors,
  goalSymbol,
  drawGoalLine,
  formatValue,
}: {
  goalTraces: GoalTrace[];
  allDates: Array<string | number | null>;
  timeResolution: TimeResolution;
  goalColors: string[];
  /** Resolved ECharts symbol, see goalSymbol() */
  goalSymbol: string;
  drawGoalLine: boolean | undefined;
  formatValue: FormatValue;
}): LineSeriesOption[] {
  return goalTraces.map((goalTrace, idx) => {
    const goalData = alignToDates(goalTrace, allDates, timeResolution);
    const color = goalColors[idx % goalColors.length];

    return {
      type: 'line',
      name: goalTrace.name,
      data: goalData,
      showSymbol: true,
      symbol: goalSymbol,
      symbolSize: 12,
      lineStyle: {
        width: drawGoalLine ? 2 : 0,
        type: drawGoalLine ? 'dashed' : 'dotted',
        color,
      },
      itemStyle: markerItemStyle(color),
      connectNulls: true,
      z: 1,
      tooltip: valueTooltip(formatValue),
    };
  });
}

/** The dashed trend line, aligned to the axis dates on time charts. */
export function buildTrendSeries({
  trendTrace,
  hasTimeDimension,
  allDates,
  timeResolution,
  trendColor,
  formatValue,
}: {
  trendTrace: GoalTrace | null;
  hasTimeDimension: boolean;
  allDates: Array<string | number | null>;
  timeResolution: TimeResolution;
  trendColor: string;
  formatValue: FormatValue;
}): LineSeriesOption[] {
  if (!trendTrace) {
    return [];
  }
  const tooltip = valueTooltip(formatValue);
  const lineStyle = {
    width: 3,
    color: trendColor,
    // ECharts' 'dashed' scales with line width (12px dashes at width 3);
    // use a tighter fixed pattern.
    type: [6, 4],
  };

  if (!hasTimeDimension) {
    return [
      {
        type: 'line',
        name: trendTrace.name,
        data: trendTrace.y,
        showSymbol: false,
        symbol: 'none',
        lineStyle,
        emphasis: {
          disabled: true,
        },
        tooltip,
      },
    ];
  }

  const trendData = alignToDates(trendTrace, allDates, timeResolution);

  return [
    {
      type: 'line',
      name: trendTrace.name,
      data: trendData,
      symbol: 'none',
      // The trend extends to the highest goal year, so its data has
      // nulls at goal-only dates in between — connect over them so
      // the line reaches the end instead of stopping at the last
      // consecutive point.
      connectNulls: true,
      lineStyle,
      itemStyle: {
        color: trendColor,
        opacity: 0,
      },
      emphasis: {
        disabled: true,
      },
      tooltip,
    },
  ];
}

/**
 * Mutates the first base series with the reference-value / non-quantified
 * goal annotations: a shaded markArea from the reference point towards the
 * goal direction, a vertical reference line, and a directional goal arrow.
 */
export function applyGoalMarkers({
  baseSeries,
  referenceValue,
  nonQuantifiedGoal,
  hasTimeDimension,
  timeResolution,
  xAxisCategories,
  yRange,
  theme,
  t,
}: {
  baseSeries: Array<LineSeriesOption | BarSeriesOption>;
  referenceValue: ReferenceValueProp;
  nonQuantifiedGoal?: NonQuantifiedGoalProp;
  hasTimeDimension: boolean;
  timeResolution: TimeResolution;
  xAxisCategories: string[];
  yRange: YRange;
  theme: Theme;
  t: Translator;
}): void {
  if (baseSeries.length === 0) {
    return;
  }
  const firstSeries = baseSeries[0];

  // Add markArea for referenceValue if it exists and nonQuantifiedGoal is set
  if (referenceValue?.date && nonQuantifiedGoal?.trend) {
    const markAreaStyle = {
      silent: true as const,
      itemStyle: {
        color: theme.graphColors.blue030,
        opacity: 0.1,
      },
      label: {
        position: [0, -15] as [number, number],
        fontSize: 11,
      },
    };
    if (hasTimeDimension) {
      firstSeries.markArea = {
        ...markAreaStyle,
        data: [
          [
            {
              xAxis: normalizeDate(referenceValue.date, timeResolution),
              yAxis: referenceValue.value,
            },
            {
              xAxis: 'max',
              yAxis:
                nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase
                  ? yRange.range[1]
                  : yRange.range[0],
            },
          ],
        ],
      };
    } else {
      // For category-based graphs, find the index of the reference date
      const refDateIndex = xAxisCategories.findIndex((cat) => cat === String(referenceValue.date));
      if (refDateIndex >= 0) {
        firstSeries.markArea = {
          ...markAreaStyle,
          data: [
            [
              {
                xAxis: refDateIndex,
              },
              {
                xAxis: xAxisCategories.length - 1,
              },
            ],
          ],
        };
      }
    }
  }

  const markLines: MarkLineOption['data'] = [];

  // Vertical line at the reference value date
  if (referenceValue?.date && hasTimeDimension) {
    markLines.push({
      xAxis: normalizeDate(referenceValue.date, timeResolution),
      symbol: 'none',
      lineStyle: {
        color: theme.graphColors.grey030 || '#999999',
        width: 2,
        type: 'solid',
      },
      name: 'Reference Value',
      label: {
        formatter: `${formatDateLabel(referenceValue.date, 'YEAR')}: ${t('indicator-graph-reference-line')}`,
        position: 'insideEndBottom',
      },
    });
  }

  // Directional arrow towards the non-quantified goal
  if (nonQuantifiedGoal?.date && hasTimeDimension) {
    const nonQuantifiedGoalDate = normalizeDate(nonQuantifiedGoal.date, timeResolution);
    const goalDirection = nonQuantifiedGoal.trend ? nonQuantifiedGoal.trend.toString() : '';
    const goalStartValue =
      referenceValue?.value ??
      (nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase
        ? yRange.range[0]
        : yRange.range[1]);
    const goalEndValue =
      nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase
        ? yRange.range[1]
        : yRange.range[0];
    markLines.push([
      {
        xAxis: nonQuantifiedGoalDate,
        yAxis: goalStartValue,
        lineStyle: {
          color: theme.graphColors.blue030 || '#999999',
          width: 2,
          type: 'solid',
        },
        symbol: 'none',
        name: 'Goal',
        label: {
          formatter: `${t('indicator-goal')} ${formatDateLabel(nonQuantifiedGoal.date, 'YEAR')}: ${t(`indicator-desired-trend-${goalDirection.toLowerCase()}`)}`,
          position: 'insideEndBottom',
        },
      },
      {
        xAxis: nonQuantifiedGoalDate,
        yAxis: goalEndValue,
        symbol: 'arrow',
      },
    ]);
  }

  if (markLines.length > 0) {
    firstSeries.markLine = {
      silent: true,
      z: 1,
      symbol: ['none', 'none'],
      data: markLines,
    };
  }
}

/**
 * Tooltip formatter for time charts: formats the axis date per resolution,
 * lists each series value with unit, and skips the trend series.
 *
 * ECharts renders the returned string as HTML. Series names and units are
 * editor-controlled, so they are escaped; the marker is ECharts' own markup.
 */
export function buildTimeTooltipFormatter({
  timeResolution,
  trendName,
  yRange,
  formatValue,
}: {
  timeResolution: TimeResolution;
  trendName: string | null;
  yRange: YRange;
  formatValue: FormatValue;
}): (params: unknown) => string {
  return (params: unknown) => {
    if (!Array.isArray(params) || params.length === 0) return '';
    const firstParam = params[0] as { axisValue?: number | string };
    const axisValue = firstParam.axisValue;
    if (axisValue == null) return '';

    const rows: string[] = [];
    params.forEach((param: unknown) => {
      const typedParam = param as {
        seriesName?: string;
        value?: number | [string | number, number | null];
        marker?: string;
      };
      if (!typedParam.seriesName) return;

      // Skip trend series in tooltip
      if (trendName && typedParam.seriesName === trendName) {
        return;
      }

      // Extract value - could be number or [date, value] array
      let value: number | null = null;
      if (Array.isArray(typedParam.value)) {
        value = typedParam.value[1];
      } else if (typeof typedParam.value === 'number') {
        value = typedParam.value;
      }

      if (value !== null && value !== undefined && !Number.isNaN(value)) {
        const formattedValue = formatNumber(value, formatValue);
        rows.push(
          `${typedParam.marker || ''} ${escapeHtml(typedParam.seriesName)}: ${formattedValue} ${escapeHtml(yRange.unit)}<br/>`
        );
      }
    });
    // An empty string makes ECharts hide the tooltip (e.g. at dates only
    // the skipped trend line occupies)
    if (rows.length === 0) return '';
    return `${escapeHtml(formatDateLabel(axisValue, timeResolution))}<br/>${rows.join('')}`;
  };
}

/**
 * Time x-axis configuration. With single-year data the min/max labels are
 * hidden and only ticks near the middle of the range get the year label.
 */
export function buildTimeXAxis({
  timeResolution,
  allDates,
  hasSingleYear,
  xAxisRange,
}: {
  timeResolution: TimeResolution;
  allDates: Array<string | number | null>;
  hasSingleYear: boolean;
  xAxisRange?: { min: number; max: number };
}) {
  // For single year case, we need to track the year range to show only middle label
  const yearRange =
    hasSingleYear && timeResolution === 'YEAR' && allDates.length > 0
      ? (() => {
          const timestamps = allDates
            .filter((d): d is string | number => d != null)
            .map(parseChartDate)
            .filter((ts) => !Number.isNaN(ts));
          return {
            min: Math.min(...timestamps),
            max: Math.max(...timestamps),
          };
        })()
      : null;

  return {
    type: 'time' as const,
    ...(xAxisRange ? { min: xAxisRange.min, max: xAxisRange.max } : {}),
    axisLabel: {
      hideOverlap: true,
      showMinLabel: hasSingleYear ? false : true,
      showMaxLabel: hasSingleYear ? false : true,
      formatter: (value: number) => {
        if (timeResolution === 'YEAR' && yearRange) {
          // For single year case, only show label for ticks in the middle
          // 40% of the range (30% to 70%)
          const range = yearRange.max - yearRange.min;
          if (range === 0) {
            // A lone point: label only its own tick, not the neighboring
            // day ticks ECharts pads the axis with
            if (value !== yearRange.min) {
              return '';
            }
          } else {
            const position = (value - yearRange.min) / range;
            if (position < 0.3 || position > 0.7) {
              return '';
            }
          }
        }
        return formatDateLabel(value, timeResolution);
      },
    },
    // Configure time axis to show appropriate intervals
    ...(timeResolution === 'YEAR'
      ? {
          // For year resolution, show one tick per year
          minInterval: 31536000000, // 1 year in milliseconds
        }
      : {}),
  };
}

/** Slugified filename for chart image downloads. */
export function getChartDownloadFilename(
  title: string | null | undefined,
  fallback = 'indicator'
): string {
  const slug = (title ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '');
  return slug || fallback;
}

/**
 * The save-as-PNG toolbox button — the ECharts equivalent of the legacy
 * Plotly modebar's toImage option. ToolboxComponent is registered globally
 * by the shared Chart wrapper.
 */
export function buildSaveAsImageToolbox({
  filename,
  buttonTitle,
  backgroundColor,
}: {
  filename: string;
  buttonTitle: string;
  backgroundColor: string;
}) {
  return {
    show: true,
    right: 0,
    top: 0,
    itemSize: 14,
    feature: {
      saveAsImage: {
        show: true,
        type: 'png' as const,
        name: filename,
        title: buttonTitle,
        pixelRatio: 2,
        backgroundColor,
      },
    },
  };
}
