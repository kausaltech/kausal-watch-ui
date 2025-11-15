'use client';

import React, { useEffect, useMemo } from 'react';

import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import { transparentize } from 'polished';
import styled, { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

type ChartTrace = {
  name: string;
  dataType?: 'total' | null;
  xType?: 'time' | 'category';
  x: Array<string | number>;
  y: Array<number | null>;
  _parentName?: string | null;
};

type GoalTrace = {
  name: string;
  x: Array<string | number>;
  y: Array<number | null>;
};

type IndicatorGraphProps = {
  yRange: {
    unit: string;
    minDigits: number;
    maxDigits: number;
    ticksCount: number | undefined;
    ticksRounding: number | undefined;
    valueRounding: number | undefined;
    includeZero: boolean;
    range: number[];
  };
  timeResolution?: 'YEAR' | 'MONTH';
  traces: ChartTrace[];
  goalTraces: GoalTrace[];
  trendTrace: GoalTrace | null;
  specification: {
    axes: Array<[string, number]>;
  };
};

const CATEGORY_XAXIS_LABEL_EXTRA_MARGIN = 200;

const PlotContainer = styled.div<{ $vizHeight: number }>`
  height: ${(props) => props.$vizHeight}px;
`;

const formatNumber = (value: number, digits?: number) => {
  if (value == null || Number.isNaN(value)) return '';
  if (digits == null) return new Intl.NumberFormat().format(value);
  return new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: digits,
  }).format(value);
};

type GraphSettings = {
  totalLineColor?: string;
  categoryColors?: string[];
  goalLineColors?: string[];
  trendLineColor?: string;
  areaGraphs?: boolean;
  lineShape?: string;
  showTrendLine?: boolean;
  drawGoalLine?: boolean;
  roundIndicatorValue?: boolean;
};

const buildSeriesFromTraces = ({
  traces,
  colors,
  hasTimeDimension,
  useAreaGraph,
  lineShape,
  valueRounding,
}: {
  traces: ChartTrace[];
  colors: {
    totalLine: string;
    categoryColors: string[];
  };
  hasTimeDimension: boolean;
  useAreaGraph: boolean;
  lineShape: string;
  valueRounding?: number;
}): Array<LineSeriesOption | BarSeriesOption> => {
  const traceCount = traces.length;
  return traces.map<LineSeriesOption | BarSeriesOption>((trace, idx) => {
    const color =
      trace.dataType === 'total'
        ? colors.totalLine
        : colors.categoryColors[idx % colors.categoryColors.length];

    if (hasTimeDimension) {
      const series: LineSeriesOption = {
        type: 'line',
        name: trace.name,
        data: trace.x.map((value, index) => [value, trace.y[index]]),
        connectNulls: true,
        showSymbol: trace.x.length <= 30,
        symbolSize: 8,
        sampling: 'lttb',
        smooth: lineShape === 'spline' || lineShape === 'smooth',
        lineStyle: {
          width: trace.dataType === 'total' ? 3 : 2,
          color,
        },
        itemStyle: {
          color,
        },
        emphasis: {
          focus: 'series',
        },
        tooltip: {
          valueFormatter: (val: number) => formatNumber(val, valueRounding),
        },
      };

      if (traceCount === 1 && useAreaGraph) {
        series.areaStyle = {
          color: transparentize(0.8, color),
        };
      }

      return series;
    }

    const series: BarSeriesOption = {
      type: 'bar',
      name: trace.name,
      data: trace.y,
      barGap: '20%',
      itemStyle: {
        color,
      },
      emphasis: {
        focus: 'series',
      },
      tooltip: {
        valueFormatter: (val: number) => formatNumber(val, valueRounding),
      },
    };
    return series;
  });
};

function IndicatorGraph({
  yRange,
  timeResolution,
  traces,
  goalTraces,
  trendTrace,
  specification,
}: IndicatorGraphProps) {
  const theme = useTheme();

  const rawGraphSettings = theme.settings?.graphs;
  const rawGraphsRecord =
    rawGraphSettings && typeof rawGraphSettings === 'object'
      ? (rawGraphSettings as Record<string, unknown>)
      : undefined;

  const graphSettings: GraphSettings = {
    totalLineColor:
      typeof rawGraphSettings?.totalLineColor === 'string'
        ? rawGraphSettings.totalLineColor
        : undefined,
    categoryColors: Array.isArray(rawGraphSettings?.categoryColors)
      ? rawGraphSettings.categoryColors.filter(
          (color): color is string => typeof color === 'string'
        )
      : undefined,
    goalLineColors: Array.isArray(rawGraphSettings?.goalLineColors)
      ? rawGraphSettings.goalLineColors.filter(
          (color): color is string => typeof color === 'string'
        )
      : undefined,
    trendLineColor:
      typeof rawGraphSettings?.trendLineColor === 'string'
        ? rawGraphSettings.trendLineColor
        : undefined,
    areaGraphs:
      typeof rawGraphSettings?.areaGraphs === 'boolean' ? rawGraphSettings.areaGraphs : undefined,
    lineShape:
      typeof rawGraphSettings?.lineShape === 'string' ? rawGraphSettings.lineShape : undefined,
    showTrendLine: (() => {
      const legacyValue = rawGraphsRecord?.['showTrendline'];
      if (typeof legacyValue === 'boolean') {
        return legacyValue;
      }
      if (typeof rawGraphSettings?.showTrendLine === 'boolean') {
        return rawGraphSettings.showTrendLine;
      }
      return undefined;
    })(),
    drawGoalLine:
      typeof rawGraphSettings?.drawGoalLine === 'boolean'
        ? rawGraphSettings.drawGoalLine
        : undefined,
    roundIndicatorValue:
      typeof rawGraphSettings?.roundIndicatorValue === 'boolean'
        ? rawGraphSettings.roundIndicatorValue
        : undefined,
  };

  const fallbackColor = graphSettings.totalLineColor || theme.brandDark || '#0070f3';
  const categoryColors =
    graphSettings.categoryColors && graphSettings.categoryColors.length > 0
      ? graphSettings.categoryColors
      : [fallbackColor];
  const goalColors =
    graphSettings.goalLineColors && graphSettings.goalLineColors.length > 0
      ? graphSettings.goalLineColors
      : [graphSettings.trendLineColor || fallbackColor];

  const colors = {
    totalLineColor: fallbackColor,
    categoryColors,
    goalColors,
    trendColor: graphSettings.trendLineColor || fallbackColor,
  };

  const hasTimeDimension = useMemo(
    () => specification.axes.some((axis) => axis[0] === 'time') || traces.length === 0,
    [specification.axes, traces.length]
  );

  const useAreaGraph = graphSettings.areaGraphs === true;
  const lineShape = graphSettings.lineShape ?? 'spline';
  const showTrendline = graphSettings.showTrendLine ?? true;

  const chartHeight = 450 + (!hasTimeDimension ? CATEGORY_XAXIS_LABEL_EXTRA_MARGIN : 0);

  const option = useMemo<ECOption>(() => {
    const baseSeries = buildSeriesFromTraces({
      traces,
      hasTimeDimension,
      useAreaGraph,
      lineShape,
      colors: {
        totalLine: colors.totalLineColor,
        categoryColors: colors.categoryColors,
      },
      valueRounding: graphSettings.roundIndicatorValue === false ? undefined : yRange.valueRounding,
    });

    const goalSeries: LineSeriesOption[] = goalTraces.map((goalTrace, idx) => ({
      type: 'line',
      name: goalTrace.name,
      data: goalTrace.x.map((value, index) => [value, goalTrace.y[index]]),
      showSymbol: true,
      symbolSize: 10,
      lineStyle: {
        width: 2,
        type: graphSettings.drawGoalLine ? 'dashed' : 'solid',
        color: colors.goalColors[idx % colors.goalColors.length],
      },
      itemStyle: {
        color: colors.goalColors[idx % colors.goalColors.length],
      },
      opacity: 0.8,
      connectNulls: true,
      tooltip: {
        valueFormatter: (val: number) => formatNumber(val, yRange.valueRounding),
      },
    }));

    const trendSeries: LineSeriesOption[] =
      trendTrace && showTrendline
        ? [
            {
              type: 'line',
              name: trendTrace.name,
              data: trendTrace.x.map((value, index) => [value, trendTrace.y[index]]),
              showSymbol: false,
              lineStyle: {
                width: 3,
                color: colors.trendColor,
                type: 'dashed',
              },
              emphasis: {
                disabled: true,
              },
              tooltip: {
                valueFormatter: (val: number) => formatNumber(val, yRange.valueRounding),
              },
            },
          ]
        : [];

    const xAxisCategories =
      !hasTimeDimension && traces.length > 0 ? traces[0].x.map((value) => String(value)) : [];

    const option: ECOption = {
      color: colors.categoryColors,
      legend: {
        top: 0,
      },
      grid: {
        left: 24,
        right: 24,
        bottom: hasTimeDimension ? 48 : CATEGORY_XAXIS_LABEL_EXTRA_MARGIN,
        top: 48,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: hasTimeDimension ? 'line' : 'shadow',
        },
        valueFormatter: (value: number) => formatNumber(value, yRange.valueRounding),
      },
      xAxis: hasTimeDimension
        ? {
            type: 'time',
            boundaryGap: ['0%', '0%'],
            axisLabel: {
              formatter: (value: number, _index: number, _extra: { level: number }) => {
                const date = new Date(value);
                if (Number.isNaN(date.getTime())) {
                  return String(value);
                }
                if (timeResolution === 'YEAR') {
                  return String(date.getFullYear());
                }
                if (timeResolution === 'MONTH') {
                  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                }
                return date.toISOString().split('T')[0];
              },
            },
          }
        : {
            type: 'category',
            data: xAxisCategories,
            axisLabel: {
              interval: 0,
              rotate: xAxisCategories.length > 6 ? 45 : 0,
            },
          },
      yAxis: {
        type: 'value',
        name: yRange.unit,
        min:
          yRange.range[0] != null
            ? yRange.range[0]
            : yRange.includeZero
              ? (value: { min: number }) => (value.min > 0 ? 0 : value.min)
              : undefined,
        max: yRange.range[1] != null ? yRange.range[1] : undefined,
        axisLabel: {
          formatter: (value: number) =>
            formatNumber(value, yRange.ticksRounding ?? yRange.valueRounding),
        },
      },
      series: [...baseSeries, ...trendSeries, ...goalSeries],
    };

    return option;
  }, [
    traces,
    hasTimeDimension,
    useAreaGraph,
    lineShape,
    colors.categoryColors,
    colors.goalColors,
    colors.totalLineColor,
    colors.trendColor,
    goalTraces,
    graphSettings.drawGoalLine,
    showTrendline,
    timeResolution,
    yRange.includeZero,
    yRange.range,
    yRange.ticksRounding,
    yRange.unit,
    yRange.valueRounding,
    graphSettings.roundIndicatorValue,
    trendTrace,
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
