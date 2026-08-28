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
import type { useFormatter } from 'next-intl';
import { transparentize } from 'polished';

import { IndicatorNonQuantifiedGoal } from '@/common/__generated__/graphql';
import { getDefaultColors } from '@/components/contentblocks/indicator-chart/indicator-chart-colors';

export type Formatter = ReturnType<typeof useFormatter>;
type Translator = (key: string) => string;

export type TimeResolution = 'YEAR' | 'MONTH' | undefined;

export type ChartTrace = {
  name: string;
  dataType?: 'total' | null;
  xType?: 'time' | 'category';
  x: Array<string | number>;
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
  minDigits: number;
  maxDigits: number;
  ticksCount: number | undefined;
  ticksRounding: number | undefined;
  valueRounding: number | undefined;
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
  roundIndicatorValue?: boolean;
  categorySymbols?: string[];
  fillMarkers?: boolean;
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
    roundIndicatorValue: bool(raw.roundIndicatorValue),
    categorySymbols: strArray(raw.categorySymbols),
    fillMarkers: bool(raw.fillMarkers),
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
 * Safely format a number with null/NaN checks.
 * ECharts valueFormatters can receive null values from missing data points.
 */
export const formatNumber = (
  value: number | null | undefined,
  format: Formatter,
  options?: { maximumSignificantDigits?: number }
): string => {
  if (value == null || Number.isNaN(value)) return '';
  return format.number(value, options);
};

/**
 * Date-string handling must be timezone-proof. ECharts parses timezone-less
 * date strings as LOCAL time with its own parser (unlike native `Date`,
 * which treats ISO date-only strings as UTC midnight) — so tick timestamps
 * and hovered data points sit on local calendar boundaries. Format date
 * STRINGS by extracting their calendar parts textually (never through
 * `Date`, whose UTC/local behavior depends on the string format), and
 * format tick TIMESTAMPS with local getters, matching how ECharts placed
 * them.
 */
const DATE_PARTS_RE = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/;

export function normalizeDate(
  d: string | number | null | undefined,
  timeResolution: TimeResolution
): string {
  // Normalized dates use the ISO-padded YYYY-01-01 form; ECharts parses it
  // as local time like every other timezone-less date string it receives.
  // Null dates (schema-permitted) must not fall into Date parsing, where
  // new Date(null) would silently become the 1970 epoch.
  if (d == null) {
    return String(d);
  }
  if (typeof d === 'number') {
    // If it's a number (likely a year), treat it as one
    if (d > 1900 && d < 2100) {
      return `${d}-01-01`;
    }
    return String(d);
  }
  const parts = DATE_PARTS_RE.exec(d);
  if (parts) {
    if (timeResolution === 'YEAR') {
      return `${parts[1]}-01-01`;
    }
    return d;
  }
  const dateObj = new Date(d);
  if (Number.isNaN(dateObj.getTime())) {
    return String(d);
  }
  if (timeResolution === 'YEAR') {
    return `${dateObj.getUTCFullYear()}-01-01`;
  }
  return d;
}

/** Format a date (string, timestamp or Date) as an axis/tooltip label. */
export function formatDateLabel(
  value: string | number | Date,
  timeResolution: TimeResolution
): string {
  if (typeof value === 'string') {
    const parts = DATE_PARTS_RE.exec(value);
    if (parts) {
      if (timeResolution === 'YEAR') {
        return parts[1];
      }
      if (timeResolution === 'MONTH') {
        return `${parts[1]}-${parts[2].padStart(2, '0')}`;
      }
      return `${parts[1]}-${parts[2].padStart(2, '0')}-${(parts[3] ?? '1').padStart(2, '0')}`;
    }
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  // Timestamps come from ECharts' local-calendar tick placement — read them
  // back with local getters (toISOString would shift the period near
  // midnight boundaries in non-UTC timezones)
  if (timeResolution === 'YEAR') {
    return String(date.getFullYear());
  }
  if (timeResolution === 'MONTH') {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const compareDateStrings = (a: string | number, b: string | number): number => {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
    return String(a).localeCompare(String(b));
  }
  return dateA - dateB;
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
}): Array<string | number> {
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
  datesArray.sort(compareDateStrings);

  // Extend to nonQuantifiedGoalDate if needed (for directional goal arrow)
  if (nonQuantifiedGoal?.trend && nonQuantifiedGoal?.date && timeResolution === 'YEAR') {
    const planEndDate = normalizeDate(nonQuantifiedGoal.date, 'YEAR');
    if (DATE_PARTS_RE.test(planEndDate) && !datesArray.includes(planEndDate)) {
      datesArray.push(planEndDate);
      datesArray.sort(compareDateStrings);
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
  allDates: Array<string | number>;
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

/** Whether all (time) dates fall within one calendar year. */
export function datesSpanSingleYear(allDates: Array<string | number>): boolean {
  const years = new Set<string>();
  allDates.forEach((date) => {
    const year = formatDateLabel(date, 'YEAR');
    if (/^\d{4}$/.test(year)) {
      years.add(year);
    }
  });
  return years.size === 1;
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
  if (goalTraces.length > 0 && goalTraces.some((goal) => goal.x.length > 0)) {
    return true;
  }
  // If we have traces with dates, use time dimension (even for single datapoint)
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

/**
 * Themes define marker symbols with Plotly symbol names. Map them to ECharts
 * equivalents: built-in symbols have `empty*` hollow variants, the rest are
 * drawn as `path://` shapes (unit coordinates; ECharts scales the bounding
 * box to symbolSize) and made hollow by swapping fill/border styles.
 */
const BUILTIN_SYMBOLS: Record<string, string> = {
  circle: 'circle',
  square: 'rect',
  diamond: 'diamond',
  'triangle-up': 'triangle',
};

const PATH_SYMBOLS: Record<string, string> = {
  pentagon: 'path://M0,-1L0.951,-0.309L0.588,0.809L-0.588,0.809L-0.951,-0.309Z',
  hexagram:
    'path://M0,-1L-0.289,-0.5L-0.866,-0.5L-0.577,0L-0.866,0.5L-0.289,0.5L0,1L0.289,0.5L0.866,0.5L0.577,0L0.866,-0.5L0.289,-0.5Z',
  'star-diamond': 'path://M1,0L0.283,0.283L0,1L-0.283,0.283L-1,0L-0.283,-0.283L0,-1L0.283,-0.283Z',
  hash: 'path://M-0.6,-1L-0.2,-1L-0.2,1L-0.6,1ZM0.2,-1L0.6,-1L0.6,1L0.2,1ZM-1,-0.6L1,-0.6L1,-0.2L-1,-0.2ZM-1,0.2L1,0.2L1,0.6L-1,0.6Z',
  'y-down':
    'path://M-0.15,0L0.15,0L0.15,1L-0.15,1ZM0.075,-0.13L-0.075,0.13L-0.941,-0.37L-0.791,-0.63ZM-0.075,-0.13L0.075,0.13L0.941,-0.37L0.791,-0.63Z',
  x: 'path://M0,-0.4L0.6,-1L1,-0.6L0.4,0L1,0.6L0.6,1L0,0.4L-0.6,1L-1,0.6L-0.4,0L-1,-0.6L-0.6,-1Z',
  cross:
    'path://M-0.2,-1L0.2,-1L0.2,-0.2L1,-0.2L1,0.2L0.2,0.2L0.2,1L-0.2,1L-0.2,0.2L-1,0.2L-1,-0.2L-0.2,-0.2Z',
};

export function resolveMarkerSymbol(
  name: string,
  hollow: boolean
): { symbol: string; manualHollow: boolean } {
  const builtin = BUILTIN_SYMBOLS[name];
  if (builtin) {
    return {
      symbol: hollow ? `empty${builtin[0].toUpperCase()}${builtin.slice(1)}` : builtin,
      manualHollow: false,
    };
  }
  const path = PATH_SYMBOLS[name];
  if (path) {
    return { symbol: path, manualHollow: hollow };
  }
  return { symbol: hollow ? 'emptyCircle' : 'circle', manualHollow: false };
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

/** Align time traces to the full axis-date range, padding gaps with nulls. */
export function alignTracesToDates(
  traces: ChartTrace[],
  allDates: Array<string | number>,
  timeResolution: TimeResolution
): ChartTrace[] {
  return traces.map((trace) => {
    const traceMap = new Map<string, number | null>();
    trace.x.forEach((date, i) => {
      traceMap.set(normalizeDate(date, timeResolution), trace.y[i] ?? null);
    });

    // allDates already contains normalized dates (as strings), so we can match directly
    const alignedY = allDates.map((date) => traceMap.get(String(date)) ?? null);

    return {
      ...trace,
      x: allDates.map((d) => String(d)),
      y: alignedY,
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
  fillMarkers,
  valueRounding,
  format,
}: {
  traces: ChartTrace[];
  colors: {
    totalLine: string;
    categoryColors: string[];
  };
  hasTimeDimension: boolean;
  useAreaGraph: boolean;
  lineShape: string;
  categorySymbols: string[];
  fillMarkers: boolean;
  valueRounding?: number;
  format: Formatter;
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
      // Markers follow the legacy graph: 8px symbols cycled per trace from
      // the theme's categorySymbols, hollow with a 2px rim in the trace
      // color unless the theme sets fillMarkers.
      const symbolName = categorySymbols.length
        ? categorySymbols[idx % categorySymbols.length]
        : 'circle';
      const { symbol, manualHollow } = resolveMarkerSymbol(symbolName, !fillMarkers);
      // Dense traces get smaller markers instead of hiding them like the
      // legacy graph did; on very dense traces (e.g. daily values) even
      // small markers fuse into a solid band, so hide them entirely there.
      // Count actual data points — the trace may be aligned to the full
      // axis-date range with null padding (e.g. for goal years), which
      // must not count towards density.
      const dataPointCount = trace.y.filter((value) => value != null).length;
      const denseMarkers = dataPointCount > 30;
      const hideMarkers = dataPointCount > 100;
      // Map x and y values together for time axis
      const data = trace.x.map((xVal, idx) => [xVal, trace.y[idx] ?? null]);
      const series: LineSeriesOption = {
        type: 'line',
        name: trace.name,
        data: data,
        connectNulls: true,
        showSymbol: !hideMarkers,
        symbol,
        symbolSize: denseMarkers ? 5 : 8,
        sampling: 'lttb',
        smooth: lineShape === 'spline' || lineShape === 'smooth',
        lineStyle: {
          width: trace.dataType === 'total' ? 3 : 2,
          color,
        },
        itemStyle: manualHollow
          ? {
              color: '#ffffff',
              borderColor: color,
              borderWidth: denseMarkers ? 1 : 2,
            }
          : {
              color,
              borderColor: color,
              borderWidth: denseMarkers ? 1 : 2,
            },
        z: 2,
        emphasis: {
          focus: 'series',
        },
        tooltip: {
          valueFormatter: (val: number | null) =>
            formatNumber(
              val,
              format,
              valueRounding ? { maximumSignificantDigits: valueRounding } : undefined
            ),
        },
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
      tooltip: {
        valueFormatter: (val: number | null) =>
          formatNumber(
            val,
            format,
            valueRounding ? { maximumSignificantDigits: valueRounding } : undefined
          ),
      },
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
  valueRounding,
  format,
}: {
  goalTraces: GoalTrace[];
  allDates: Array<string | number>;
  timeResolution: TimeResolution;
  goalColors: string[];
  goalSymbol: string;
  drawGoalLine: boolean | undefined;
  valueRounding: number | undefined;
  format: Formatter;
}): LineSeriesOption[] {
  return goalTraces.map((goalTrace, idx) => {
    const goalMap = new Map<string, number | null>();
    goalTrace.x.forEach((date, i) => {
      goalMap.set(normalizeDate(date, timeResolution), goalTrace.y[i] ?? null);
    });

    // allDates already contains normalized dates (as strings), so we can match directly
    const goalData = allDates.map((date) => {
      const dateStr = String(date);
      return [dateStr, goalMap.get(dateStr) ?? null];
    });

    return {
      type: 'line',
      name: goalTrace.name,
      data: goalData,
      showSymbol: true,
      // Goal markers follow the legacy graph: the theme's goalSymbol
      // ('x' in most themes) at size 12, filled in the goal color,
      // drawn translucent.
      symbol: resolveMarkerSymbol(goalSymbol, false).symbol,
      symbolSize: 12,
      lineStyle: {
        width: drawGoalLine ? 2 : 0,
        type: drawGoalLine ? 'dashed' : 'dotted',
        color: goalColors[idx % goalColors.length],
        opacity: 0.5,
      },
      itemStyle: {
        color: goalColors[idx % goalColors.length],
        // Goal markers are translucent in the legacy graph; ECharts ignores
        // series-level opacity for line series, so set it on the styles.
        opacity: 0.5,
      },
      connectNulls: true,
      z: 1,
      tooltip: {
        valueFormatter: (val: number | null) =>
          formatNumber(
            val,
            format,
            valueRounding ? { maximumSignificantDigits: valueRounding } : undefined
          ),
      },
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
  valueRounding,
  format,
}: {
  trendTrace: GoalTrace | null;
  hasTimeDimension: boolean;
  allDates: Array<string | number>;
  timeResolution: TimeResolution;
  trendColor: string;
  valueRounding: number | undefined;
  format: Formatter;
}): LineSeriesOption[] {
  if (!trendTrace) {
    return [];
  }
  const tooltip = {
    valueFormatter: (val: number | null) =>
      formatNumber(
        val,
        format,
        valueRounding ? { maximumSignificantDigits: valueRounding } : undefined
      ),
  };
  const lineStyle = {
    width: 3,
    color: trendColor,
    type: 'dashed' as const,
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

  const trendMap = new Map<string, number | null>();
  trendTrace.x.forEach((date, i) => {
    trendMap.set(normalizeDate(date, timeResolution), trendTrace.y[i] ?? null);
  });

  // allDates already contains normalized dates (as strings), so we can match directly
  const trendData = allDates.map((date) => {
    const dateStr = String(date);
    return [dateStr, trendMap.get(dateStr) ?? null];
  });

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
    // Not `??`: a reference value of 0 intentionally falls back to the axis end
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const goalStartValue = referenceValue?.value
      ? referenceValue.value
      : nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase
        ? yRange.range[0]
        : yRange.range[1];
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
 */
export function buildTimeTooltipFormatter({
  timeResolution,
  trendName,
  yRange,
  format,
}: {
  timeResolution: TimeResolution;
  trendName: string | null;
  yRange: YRange;
  format: Formatter;
}): (params: unknown) => string {
  return (params: unknown) => {
    if (!Array.isArray(params) || params.length === 0) return '';
    const firstParam = params[0] as { axisValue?: number | string };
    const axisValue = firstParam.axisValue;
    if (axisValue == null) return '';

    let result = `${formatDateLabel(axisValue, timeResolution)}<br/>`;
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
        const formattedValue = formatNumber(
          value,
          format,
          yRange.valueRounding ? { maximumSignificantDigits: yRange.valueRounding } : undefined
        );
        result += `${typedParam.marker || ''} ${typedParam.seriesName}: ${formattedValue} ${yRange.unit}<br/>`;
      }
    });
    return result;
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
  allDates: Array<string | number>;
  hasSingleYear: boolean;
  xAxisRange?: { min: number; max: number };
}) {
  // For single year case, we need to track the year range to show only middle label
  const yearRange =
    hasSingleYear && timeResolution === 'YEAR' && allDates.length > 0
      ? (() => {
          const timestamps = allDates
            .map((d) => new Date(d).getTime())
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
          const position = (value - yearRange.min) / range;
          if (position < 0.3 || position > 0.7) {
            return '';
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
    itemSize: 18,
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
