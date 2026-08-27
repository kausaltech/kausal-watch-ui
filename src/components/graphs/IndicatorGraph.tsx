'use client';

import { useEffect, useMemo } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useFormatter, useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';

import type { IndicatorDesiredTrend } from '@/common/__generated__/graphql';
import { capitalizeFirstLetter } from '@/common/utils';

import {
  type ChartTrace,
  type GoalTrace,
  type NonQuantifiedGoalProp,
  type ReferenceValueProp,
  type YRange,
  alignTracesToDates,
  applyGoalMarkers,
  buildGoalSeries,
  buildSeriesFromTraces,
  buildTimeTooltipFormatter,
  buildTimeXAxis,
  buildTrendSeries,
  buildXAxisCategories,
  collectChartDates,
  datesSpanSingleYear,
  detectTimeDimension,
  formatNumber,
  niceTickInterval,
  parseGraphSettings,
  resolveGraphColors,
  tickSignificantDigits,
  wrapTitle,
} from './indicator-graph.utils';

type IndicatorGraphProps = {
  yRange: YRange;
  timeResolution?: 'YEAR' | 'MONTH';
  traces: ChartTrace[];
  goalTraces: GoalTrace[];
  trendTrace: GoalTrace | null;
  specification: {
    axes: Array<[string, number]>;
  };
  title: string | null;
  desiredTrend?: IndicatorDesiredTrend | null;
  nonQuantifiedGoal?: NonQuantifiedGoalProp;
  referenceValue: ReferenceValueProp;
  height?: number;
  xAxisRange?: { min: number; max: number };
};

const CATEGORY_XAXIS_LABEL_EXTRA_MARGIN = 200;
const TITLE_WIDTH = 50;
const LEGEND_HEIGHT = 60;

const PlotContainer = styled.div<{ $vizHeight: number }>`
  height: ${(props) => props.$vizHeight}px;
`;

function IndicatorGraph({
  yRange,
  timeResolution,
  traces,
  goalTraces,
  trendTrace,
  specification,
  title,
  nonQuantifiedGoal,
  referenceValue,
  height = 450,
  xAxisRange,
}: IndicatorGraphProps) {
  const theme = useTheme();
  const t = useTranslations();
  const format = useFormatter();

  const graphSettings = parseGraphSettings(theme.settings?.graphs);
  const colors = resolveGraphColors(graphSettings, theme);
  const useAreaGraph = graphSettings.areaGraphs === true;
  const lineShape = graphSettings.lineShape ?? 'spline';

  const hasTimeDimension = useMemo(
    () => detectTimeDimension(specification, traces, goalTraces),
    [specification, traces, goalTraces]
  );

  // Hack to check if the only plot is the value line, we will hide the legend in this case
  const singleValueLabel = capitalizeFirstLetter(t('value'));
  const hideLegend =
    traces.length === 1 &&
    traces[0].name === singleValueLabel &&
    goalTraces.length === 0 &&
    !trendTrace;

  const chartHeight =
    height +
    (!hasTimeDimension ? CATEGORY_XAXIS_LABEL_EXTRA_MARGIN : 0) -
    (hideLegend ? LEGEND_HEIGHT : 0);

  const allDates = useMemo(
    () =>
      collectChartDates({
        traces,
        goalTraces,
        hasTimeDimension,
        timeResolution,
        nonQuantifiedGoal,
      }),
    [traces, goalTraces, hasTimeDimension, timeResolution, nonQuantifiedGoal]
  );

  const xAxisCategories = useMemo(
    () => buildXAxisCategories({ traces, allDates, hasTimeDimension, timeResolution }),
    [traces, allDates, hasTimeDimension, timeResolution]
  );

  const hasSingleYear = useMemo(
    () =>
      hasTimeDimension && timeResolution === 'YEAR' && allDates.length > 0
        ? datesSpanSingleYear(allDates)
        : false,
    [hasTimeDimension, timeResolution, allDates]
  );

  const option = useMemo<ECOption>(() => {
    const baseSeries = buildSeriesFromTraces({
      traces: hasTimeDimension ? alignTracesToDates(traces, allDates, timeResolution) : traces,
      hasTimeDimension,
      useAreaGraph,
      lineShape,
      categorySymbols: graphSettings.categorySymbols ?? ['circle'],
      fillMarkers: graphSettings.fillMarkers === true,
      colors: {
        totalLine: colors.totalLineColor,
        categoryColors: colors.categoryColors,
      },
      valueRounding: graphSettings.roundIndicatorValue === false ? undefined : yRange.valueRounding,
      format,
    });

    applyGoalMarkers({
      baseSeries,
      referenceValue,
      nonQuantifiedGoal,
      hasTimeDimension,
      timeResolution,
      xAxisCategories,
      yRange,
      theme,
      t,
    });

    const goalSeries = buildGoalSeries({
      goalTraces,
      allDates,
      timeResolution,
      goalColors: colors.goalColors,
      goalSymbol: graphSettings.goalSymbol ?? 'circle',
      drawGoalLine: graphSettings.drawGoalLine,
      valueRounding: yRange.valueRounding,
      format,
    });

    const trendSeries = buildTrendSeries({
      trendTrace,
      hasTimeDimension,
      allDates,
      timeResolution,
      trendColor: colors.trendColor,
      valueRounding: yRange.valueRounding,
      format,
    });

    const wrappedTitle = title ? wrapTitle(title, TITLE_WIDTH) : null;
    const titleLines = wrappedTitle ? wrappedTitle.split('\n').length : 0;
    const gridTop = 65 + (titleLines - 1) * 24;

    // The tick interval ECharts will derive from the axis extent (the same
    // nice() rounding padAndRoundBounds uses when snapping the range).
    const [rangeMin, rangeMax] = yRange.range;
    const yTickInterval =
      rangeMin != null && rangeMax != null && rangeMax > rangeMin
        ? niceTickInterval(rangeMax - rangeMin, yRange.ticksCount ?? 5)
        : null;

    return {
      backgroundColor: theme.themeColors.white,
      title: {
        text: wrappedTitle ?? undefined,
        subtext: yRange.unit,
        left: '24',
        right: '24',
        top: 10,
        padding: [0, 0, 48, 0],
        itemGap: 5,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: theme.themeColors.dark,
        },
      },
      color: colors.categoryColors,
      legend: {
        show: !hideLegend,
        orient: 'horizontal' as const,
        right: 10,
        bottom: 10,
        data: [
          ...baseSeries
            .map((s) => s.name)
            .filter((name): name is string => typeof name === 'string'),
          ...goalSeries
            .map((s) => s.name)
            .filter((name): name is string => typeof name === 'string'),
          ...(trendTrace && trendTrace.name ? [trendTrace.name] : []),
        ],
      },
      grid: {
        left: '24',
        right: '24',
        bottom: hideLegend ? 24 : 100,
        top: gridTop,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: hasTimeDimension ? 'line' : 'shadow',
        },
        valueFormatter: (value: number | null) =>
          formatNumber(
            value,
            format,
            yRange.valueRounding ? { maximumSignificantDigits: yRange.valueRounding } : undefined
          ),
        formatter: hasTimeDimension
          ? buildTimeTooltipFormatter({
              timeResolution,
              trendName: trendTrace?.name ?? null,
              yRange,
              format,
            })
          : undefined,
      },
      xAxis: hasTimeDimension
        ? buildTimeXAxis({ timeResolution, allDates, hasSingleYear, xAxisRange })
        : {
            type: 'category',
            data: xAxisCategories,
            boundaryGap: undefined,
            axisLabel: {
              interval: 0,
              rotate: xAxisCategories.length > 6 ? 45 : 0,
              formatter: (value: string) => (value === '' ? '' : value),
            },
          },
      yAxis: {
        type: 'value',
        name: undefined,
        nameTextStyle: {
          align: 'left',
        },
        splitNumber: yRange.ticksCount ?? undefined,
        min: yRange.range[0] ?? undefined,
        max: yRange.range[1] ?? undefined,
        axisLabel: {
          formatter: (value: number) => {
            const rounding = yRange.ticksRounding ?? yRange.valueRounding;
            return formatNumber(
              value,
              format,
              rounding
                ? {
                    maximumSignificantDigits: tickSignificantDigits(value, rounding, yTickInterval),
                  }
                : undefined
            );
          },
        },
      },
      series: [...baseSeries, ...trendSeries, ...goalSeries],
    };
  }, [
    traces,
    allDates,
    hasTimeDimension,
    hasSingleYear,
    useAreaGraph,
    lineShape,
    colors.categoryColors,
    colors.goalColors,
    colors.totalLineColor,
    colors.trendColor,
    goalTraces,
    graphSettings.drawGoalLine,
    graphSettings.roundIndicatorValue,
    graphSettings.categorySymbols,
    graphSettings.fillMarkers,
    graphSettings.goalSymbol,
    timeResolution,
    yRange,
    trendTrace,
    xAxisCategories,
    xAxisRange,
    title,
    theme,
    nonQuantifiedGoal,
    referenceValue,
    format,
    hideLegend,
    t,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const event = new Event('indicator_graph_ready');
    document.dispatchEvent(event);
  }, [option]);

  if (!traces.length && !goalTraces.length) {
    return null;
  }

  return (
    <PlotContainer data-element="indicator-graph-plot-container" $vizHeight={chartHeight}>
      <Chart data={option} isLoading={false} height={`${chartHeight}px`} />
    </PlotContainer>
  );
}

export default IndicatorGraph;
