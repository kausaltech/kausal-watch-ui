'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { LineChart, ScatterChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import Chart, { ECOption } from '@/components/paths/graphs/Chart';
import { DashboardIndicatorLineChartBlock as TDashboardIndicatorLineChartBlock } from '@/common/__generated__/graphql';
import { getDefaultColors } from './indicator-chart-colors';

echarts.use([
  LineChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

type DashboardIndicatorLineChartBlockProps = TDashboardIndicatorLineChartBlock;

const DashboardIndicatorLineChartBlock = ({
  chartSeries,
  indicator,
  dimension,
  showTotalLine,
}: DashboardIndicatorLineChartBlockProps) => {
  const theme = useTheme();
  const unit = indicator?.unit?.name ?? '';
  const colorPalette = getDefaultColors(theme);

  if (!chartSeries || chartSeries.length === 0) {
    return <div>No data</div>;
  }

  const filteredChartSeries = chartSeries.filter(
    (series) =>
      Array.isArray(series?.values) &&
      series.values.some((v) => v?.value != null && v?.date)
  );

  const mainSeries = filteredChartSeries.map((series, idx) => {
    const name = series?.dimensionCategory?.name || `Series ${idx + 1}`;
    const color =
      series?.dimensionCategory?.defaultColor ||
      colorPalette[idx % colorPalette.length];

    const data = series.values
      .filter((v): v is { value: number; date: string } =>
        Boolean(v?.value != null && v?.date)
      )
      .map((v) => [new Date(v.date).getFullYear(), v.value])
      .sort((a, b) => a[0] - b[0]);

    return {
      name,
      type: 'line',
      data,
      showSymbol: true,
      symbolSize: 8,
      smooth: true,
      lineStyle: { width: 2, color },
      itemStyle: { color },
    };
  });

  const totalDataMap = new Map<number, number>();
  mainSeries.forEach((series) => {
    series.data.forEach(([year, value]) => {
      totalDataMap.set(year, (totalDataMap.get(year) || 0) + value);
    });
  });

  const totalLine = showTotalLine
    ? {
        name: 'Total',
        type: 'line',
        data: Array.from(totalDataMap.entries()).sort((a, b) => a[0] - b[0]),
        showSymbol: true,
        symbolSize: 8,
        smooth: true,
        lineStyle: { width: 3, color: theme.settings.graphs.totalLineColor },
        itemStyle: { color: theme.settings.graphs.totalLineColor },
      }
    : null;

  const goalMarkers =
    indicator?.goals?.map((goal, i) => ({
      name: 'Goal',
      type: 'scatter',
      symbol: 'diamond',
      symbolSize: 14,
      data: [[new Date(goal.date).getFullYear(), goal.value]],
      itemStyle: {
        color: theme.textColor.primary,
      },
      tooltip: {
        formatter: `Goal: ${goal.value} ${unit}`,
      },
    })) ?? [];

  const allYears = new Set<number>();
  [...mainSeries, totalLine].filter(Boolean).forEach((series) => {
    series?.data.forEach(([year]) => allYears.add(year));
  });
  indicator?.goals?.forEach((goal) =>
    allYears.add(new Date(goal.date).getFullYear())
  );

  const xAxisYears = Array.from(allYears).sort((a, b) => a - b);

  const option: ECOption = {
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      formatter: (params) =>
        params
          .map((p) => {
            const year = p.data?.[0];
            const value = p.data?.[1];
            return `${p.marker} ${p.seriesName} (${year}): ${value} ${unit}`;
          })
          .join('<br/>'),
    },
    legend: {
      show: true,
      left: 'center',
      bottom: 0,
      textStyle: {
        color: theme.textColor.secondary,
      },
    },
    color: colorPalette,
    grid: {
      left: 20,
      right: 20,
      top: 40,
      bottom: 60,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Year',
      min: Math.min(...xAxisYears),
      max: Math.max(...xAxisYears),
      axisLabel: {
        color: theme.textColor.primary,
        formatter: (value) => `${value}`,
      },
    },
    yAxis: {
      type: 'value',
      name: unit,
      min: 0,
      axisLabel: {
        color: theme.textColor.primary,
      },
    },
    series: [...(totalLine ? [totalLine] : mainSeries), ...goalMarkers],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorLineChartBlock;
