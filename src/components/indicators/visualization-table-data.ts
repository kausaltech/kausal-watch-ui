/**
 * Accessible-table data for a configured indicator visualization.
 *
 * The chart's aria description summarizes the data; the table beside it is
 * the navigable long description, so it must be built from the same backend
 * `chartSeries` the block renders — with the same grouping dimension, the
 * same total/goal series, and for pies the same year — rather than from the
 * generic cube pipeline.
 */
import type { IndicatorTimeResolution } from '@/common/__generated__/graphql';
import { selectPieSlices } from '@/components/contentblocks/indicator-chart/DashboardIndicatorPieChartBlock';
import {
  buildCategoryValues,
  buildDimSeries,
  buildTotalSeries,
  buildUndatedTotal,
  formatDateKey,
  getUnitLabel,
  hasDatedValues,
} from '@/components/contentblocks/indicator-chart/indicator-charts-utility';

import type { IndicatorVisualizationBlockData } from './IndicatorVisualizationBlock';

export type TableTrace = {
  name: string;
  xType: 'time' | 'category';
  x: string[];
  y: Array<number | null>;
};

export type VisualizationTableData = {
  traces: TableTrace[];
  goalTraces: TableTrace[];
  timeResolution: IndicatorTimeResolution;
  specification: { unit: string; valueRounding: number | null };
};

// The table needs no colors; buildDimSeries only reads the palette for them
const NO_PALETTE: string[] = [];

type ChartBlock = Exclude<
  IndicatorVisualizationBlockData,
  { __typename: 'DashboardIndicatorSummaryBlock' | 'IndicatorDefaultSummary' }
>;

const toTimeTrace = (series: { name: string; raw: [string, number][] }): TableTrace => ({
  name: series.name,
  xType: 'time',
  x: series.raw.map(([key]) => key),
  y: series.raw.map(([, value]) => value),
});

/** Goal markers grouped by scenario, mirroring the line chart block. */
function goalTraces(
  indicator: ChartBlock['indicator'],
  timeResolution: string,
  t: (key: string) => string
): TableTrace[] {
  const byScenario = new Map<string | null, TableTrace>();
  indicator?.goals?.forEach((goal) => {
    if (goal?.date == null) return;
    const scenarioId = goal.scenario?.id ?? null;
    const trace = byScenario.get(scenarioId) ?? {
      name: goal.scenario?.name || t('goal'),
      xType: 'time' as const,
      x: [],
      y: [],
    };
    trace.x.push(formatDateKey(goal.date, timeResolution));
    trace.y.push(goal.value);
    byScenario.set(scenarioId, trace);
  });
  return Array.from(byScenario.values());
}

/**
 * Table traces equivalent to what the block draws, or null for blocks that
 * either aren't charts (the summary is meaningful text on its own) or have
 * nothing to draw — in both cases the block must stay visible to AT.
 */
export function buildVisualizationTableData(
  block: IndicatorVisualizationBlockData,
  fallbackTimeResolution: IndicatorTimeResolution,
  t: (key: string) => string
): VisualizationTableData | null {
  if (
    block.__typename === 'DashboardIndicatorSummaryBlock' ||
    block.__typename === 'IndicatorDefaultSummary'
  ) {
    return null;
  }
  const { indicator, dimension, chartSeries } = block;
  const timeResolution = indicator?.timeResolution ?? fallbackTimeResolution;
  const specification = {
    unit: getUnitLabel(indicator),
    valueRounding: indicator?.valueRounding ?? null,
  };
  const totalLabel = t('total');
  let traces: TableTrace[] = [];
  let goals: TableTrace[] = [];

  switch (block.__typename) {
    case 'DashboardIndicatorPieChartBlock':
    case 'IndicatorDefaultPieChart': {
      const { year, slices } = selectPieSlices(chartSeries, block.year);
      if (year != null && slices.length > 0) {
        traces = [
          {
            name: String(year),
            xType: 'category',
            x: slices.map((slice) => slice.name),
            y: slices.map((slice) => slice.value),
          },
        ];
      }
      break;
    }
    case 'DashboardIndicatorBarChartBlock':
    case 'IndicatorDefaultBarChart': {
      if (!hasDatedValues(chartSeries)) {
        // Category-only indicator: the block draws one bar per category
        const undatedTotal = buildUndatedTotal(chartSeries);
        const bars: Array<{ name: string; value: number }> = dimension
          ? buildCategoryValues(chartSeries, NO_PALETTE)
          : undatedTotal != null
            ? [{ name: totalLabel, value: undatedTotal }]
            : [];
        traces = bars.length
          ? [
              {
                name: dimension?.name ?? totalLabel,
                xType: 'category',
                x: bars.map((bar) => bar.name),
                y: bars.map((bar) => bar.value),
              },
            ]
          : [];
        break;
      }
      const series = dimension
        ? buildDimSeries(chartSeries, NO_PALETTE, timeResolution)
        : [buildTotalSeries(chartSeries, '', totalLabel, timeResolution)];
      traces = series.map(toTimeTrace);
      goals = goalTraces(indicator, timeResolution, t);
      break;
    }
    case 'DashboardIndicatorAreaChartBlock':
    case 'IndicatorDefaultAreaChart': {
      const total = buildTotalSeries(chartSeries, '', totalLabel, timeResolution);
      const series = dimension
        ? [
            ...buildDimSeries(chartSeries, NO_PALETTE, timeResolution),
            ...(block.showTotalLine && total.raw.length ? [total] : []),
          ]
        : [total];
      traces = series.map(toTimeTrace);
      goals = goalTraces(indicator, timeResolution, t);
      break;
    }
    case 'DashboardIndicatorLineChartBlock':
    case 'IndicatorDefaultLineChart': {
      const total = buildTotalSeries(chartSeries, '', totalLabel, timeResolution);
      // Same rule as the block: without a dimension the total is the data itself
      const series = [
        ...buildDimSeries(chartSeries, NO_PALETTE, timeResolution),
        ...((!dimension || block.showTotalLine) && total.raw.length ? [total] : []),
      ];
      traces = series.map(toTimeTrace);
      goals = goalTraces(indicator, timeResolution, t);
      break;
    }
  }

  traces = traces.filter((trace) => trace.x.length > 0);
  if (traces.length === 0) {
    return null;
  }
  return { traces, goalTraces: goals, timeResolution, specification };
}
