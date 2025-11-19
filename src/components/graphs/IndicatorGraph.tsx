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
  title: string;
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

    // Use line chart for time dimension (now using category axis with formatted labels)
    if (hasTimeDimension) {
      const series: LineSeriesOption = {
        type: 'line',
        name: trace.name,
        // Use simple y values array since we're using category axis
        data: trace.y,
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
  title,
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

  // Create category labels - either from traces or from formatted time data
  const xAxisCategories = useMemo(() => {
    if (!hasTimeDimension && traces.length > 0) {
      return traces[0].x.map((value) => String(value));
    }

    if (hasTimeDimension && traces.length > 0) {
      // Format time values and deduplicate consecutive labels
      const formattedLabels: string[] = [];
      const firstTrace = traces[0];

      firstTrace.x.forEach((value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          formattedLabels.push(String(value));
          return;
        }

        let formattedValue: string;
        if (timeResolution === 'YEAR') {
          formattedValue = String(date.getFullYear());
        } else if (timeResolution === 'MONTH') {
          formattedValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        } else {
          formattedValue = date.toISOString().split('T')[0];
        }

        // Only add label if it's different from the previous one
        if (
          formattedLabels.length === 0 ||
          formattedLabels[formattedLabels.length - 1] !== formattedValue
        ) {
          formattedLabels.push(formattedValue);
        } else {
          // Add empty string to maintain index alignment, but ECharts will hide duplicates
          formattedLabels.push('');
        }
      });

      return formattedLabels;
    }

    return [];
  }, [hasTimeDimension, traces, timeResolution]);

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
      // Use simple y values array since we're using category axis
      data: goalTrace.y,
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
              // Use simple y values array since we're using category axis
              data: trendTrace.y,
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

    const option: ECOption = {
      title: {
        text: title,
        subtext: undefined,
        left: '75',
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
        orient: 'horizontal',
        right: 10,
        bottom: 10,
      },
      grid: {
        left: '75',
        right: '24',
        bottom: 100,
        top: 65,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: hasTimeDimension ? 'line' : 'shadow',
        },
        valueFormatter: (value: number) => formatNumber(value, yRange.valueRounding),
      },
      xAxis: {
        type: 'category',
        data: xAxisCategories,
        boundaryGap: hasTimeDimension ? false : undefined,
        axisLabel: {
          interval: 0,
          rotate: xAxisCategories.length > 6 ? 45 : 0,
          // Hide empty labels (duplicates)
          formatter: (value: string) => (value === '' ? '' : value),
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
    yRange.includeZero,
    yRange.range,
    yRange.ticksRounding,
    yRange.unit,
    yRange.valueRounding,
    graphSettings.roundIndicatorValue,
    trendTrace,
    xAxisCategories,
    title,
    theme.themeColors.dark,
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
