/** The readable `aria-label` description of indicator charts. */
import type { EChartsLocalePack } from '@common/components/chart-aria';

import { capitalizeFirstLetter } from '@/common/utils';

import { type TimeResolution, formatDateLabel, normalizeDate, parseChartDate } from './chart-dates';
import {
  type ChartTrace,
  type FormatValue,
  type GoalTrace,
  type Translator,
  type YRange,
  formatNumber,
} from './indicator-graph.utils';

type AriaPoint = { x: string | number; label: string; value: number };

/** Points of a trace with a value, as (label, value) pairs in axis order. */
function tracePoints(
  trace: { x: Array<string | number | null>; y: Array<number | null> },
  hasTimeDimension: boolean,
  timeResolution: TimeResolution
): AriaPoint[] {
  const points: AriaPoint[] = [];
  trace.x.forEach((x, i) => {
    const value = trace.y[i];
    if (x == null || value == null || Number.isNaN(value)) return;
    points.push({
      x,
      label: hasTimeDimension ? formatDateLabel(x, timeResolution) : String(x),
      value,
    });
  });
  return points;
}

/**
 * The earliest and latest points across all series by date (not by array
 * position: series are concatenated, so the first series' start and the last
 * series' end need not be the extremes).
 */
function timeSpan(points: AriaPoint[], timeResolution: TimeResolution): [AriaPoint, AriaPoint] {
  const dated = points.flatMap((point) => {
    const ts = parseChartDate(normalizeDate(point.x, timeResolution));
    return Number.isNaN(ts) ? [] : [{ point, ts }];
  });
  if (dated.length === 0) {
    return [points[0], points[points.length - 1]];
  }
  const earliest = dated.reduce((a, b) => (b.ts < a.ts ? b : a));
  const latest = dated.reduce((a, b) => (b.ts > a.ts ? b : a));
  return [earliest.point, latest.point];
}

/** Above this many points a series is summarized (range and latest) instead of listed. */
const ARIA_MAX_LISTED_POINTS = 24;

/**
 * How much of the data the aria description recites. 'full' lists every
 * value and is for charts that stand alone; 'summary' gives the extremes and
 * the latest value only, for charts with a data table beside them — the
 * table is navigable cell by cell, an aria-label is read in one breath.
 */
export type AriaDetail = 'full' | 'summary';

/**
 * The ECharts locale-pack fields the description reads. The shared
 * EChartsLocalePack type only names line and bar series; the packs also
 * carry a pie name, which the pie chart block needs.
 */
export type AriaLocalePack = {
  aria?: EChartsLocalePack['aria'];
  series?: { typeNames?: { line?: string; bar?: string; pie?: string } };
};

/**
 * A readable description of the chart for its `aria-label`, replacing
 * ECharts' generated one (which recites series indices and unrounded raw
 * values, including NaN padding). Names the indicator, the unit and the time
 * span, then lists each series' values rounded like the chart itself, or
 * summarizes long series by their range and latest value. Goals are listed
 * per scenario; the trend line by its end point.
 *
 * The chart-type name and the "data is as follows" lead-in come from ECharts'
 * own locale pack (translated for every registered chart locale); the rest
 * is app translations.
 */
export function buildAriaDescription({
  title,
  traces,
  goalTraces,
  trendTrace,
  hasTimeDimension,
  timeResolution,
  yRange,
  formatValue,
  t,
  localePack,
  chartKind,
  periodLabel,
  detail = 'full',
}: {
  title: string | null | undefined;
  traces: ChartTrace[];
  goalTraces: GoalTrace[];
  trendTrace: GoalTrace | null;
  hasTimeDimension: boolean;
  timeResolution: TimeResolution;
  yRange: YRange;
  formatValue: FormatValue;
  t: Translator;
  localePack: AriaLocalePack;
  /** Marks drawn; defaults to lines on a time axis and bars on a category axis */
  chartKind?: 'line' | 'bar' | 'pie';
  /** For pies: the period the slices represent, e.g. the configured year */
  periodLabel?: string;
  detail?: AriaDetail;
}): string {
  const typeNames = localePack.series?.typeNames;
  const kind = chartKind ?? (hasTimeDimension ? 'line' : 'bar');
  const chartType =
    kind === 'line'
      ? (typeNames?.line ?? 'Line chart')
      : kind === 'bar'
        ? (typeNames?.bar ?? 'Bar chart')
        : (typeNames?.pie ?? 'Pie chart');
  const dataLead = localePack.aria?.data?.allData ?? 'The data is as follows: ';
  const sentenceEnd = (localePack.aria?.data?.separator?.end ?? '. ').trim();
  const num = (value: number) => formatNumber(value, formatValue);
  const series = traces
    .map((trace) => ({
      name: trace.name,
      points: tracePoints(trace, hasTimeDimension, timeResolution),
    }))
    .filter((entry) => entry.points.length > 0);
  if (series.length === 0) {
    return title ?? '';
  }

  const chartTitle = title || series[0].name;
  const allPoints = series.flatMap((entry) => entry.points);
  const [earliest, latest] = hasTimeDimension
    ? timeSpan(allPoints, timeResolution)
    : [allPoints[0], allPoints[allPoints.length - 1]];
  const start = earliest.label;
  const end = latest.label;
  // "from 2020 to 2020" reads oddly when all values share one date
  const singleDate = hasTimeDimension && new Set(allPoints.map((point) => point.label)).size === 1;
  const sentences: string[] = [];

  if (series.length === 1 && kind === 'pie' && periodLabel) {
    sentences.push(
      t('chart-aria-pie', {
        title: chartTitle,
        chartType,
        count: allPoints.length,
        date: periodLabel,
      })
    );
  } else if (series.length === 1) {
    sentences.push(
      singleDate
        ? t('chart-aria-time-single-date', { title: chartTitle, chartType, date: start })
        : t(hasTimeDimension ? 'chart-aria-time-single' : 'chart-aria-category-single', {
            title: chartTitle,
            chartType,
            count: allPoints.length,
            start,
            end,
          })
    );
  } else {
    const categories = new Set(allPoints.map((point) => point.label));
    const names = series.map((entry) => entry.name).join(', ');
    sentences.push(
      singleDate
        ? t('chart-aria-time-multi-single-date', {
            title: chartTitle,
            chartType,
            count: series.length,
            date: start,
            names,
          })
        : t(hasTimeDimension ? 'chart-aria-time-multi' : 'chart-aria-category-multi', {
            title: chartTitle,
            chartType,
            count: series.length,
            categories: categories.size,
            names,
            start,
            end,
          })
    );
  }
  if (yRange.unit) {
    sentences.push(t('chart-aria-unit', { unit: yRange.unit }));
  }

  const listValues = (points: Array<{ label: string; value: number }>) =>
    points.map((point) => `${point.label}: ${num(point.value)}`).join('; ');

  series.forEach((entry) => {
    const { points } = entry;
    const single = series.length === 1;
    // Series names open their sentence, so read them capitalized even when
    // the catalog label is lowercase (e.g. "goal")
    const name = capitalizeFirstLetter(entry.name);
    const listed = `${dataLead}${listValues(points)}${sentenceEnd}`;
    if (detail === 'full' && points.length <= ARIA_MAX_LISTED_POINTS) {
      sentences.push(
        single ? listed : t('chart-aria-series-values', { name, values: listValues(points) })
      );
      return;
    }
    // Summary, or a series too long to list: the extremes and the latest
    // value. Categories have no "latest"; a lone category point is listed.
    const parts: string[] = [];
    if (points.length > 1) {
      const lowest = points.reduce((a, b) => (b.value < a.value ? b : a));
      const highest = points.reduce((a, b) => (b.value > a.value ? b : a));
      parts.push(
        t('chart-aria-range', {
          min: num(lowest.value),
          minDate: lowest.label,
          max: num(highest.value),
          maxDate: highest.label,
        })
      );
    }
    if (hasTimeDimension) {
      const latest = points[points.length - 1];
      parts.push(t('chart-aria-latest', { value: num(latest.value), date: latest.label }));
    }
    const summary = parts.length > 0 ? parts.join(' ') : listed;
    sentences.push(single ? summary : `${name}: ${summary}`);
  });

  goalTraces.forEach((goal) => {
    const points = tracePoints(goal, hasTimeDimension, timeResolution);
    if (points.length > 0) {
      sentences.push(
        t('chart-aria-series-values', {
          name: capitalizeFirstLetter(goal.name),
          values: listValues(points),
        })
      );
    }
  });

  if (trendTrace) {
    const points = tracePoints(trendTrace, hasTimeDimension, timeResolution);
    const start = points[0];
    const end = points[points.length - 1];
    if (start && end) {
      sentences.push(
        t('chart-aria-trend', {
          startValue: num(start.value),
          startDate: start.label,
          endValue: num(end.value),
          endDate: end.label,
        })
      );
    }
  }

  return sentences.join(' ');
}
