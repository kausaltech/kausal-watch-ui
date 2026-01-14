'use client';

import React from 'react';

import { LineChart, ScatterChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

import type { DashboardIndicatorBlockFragmentFragment as TDashboardIndicatorLineChartBlock } from '@/common/__generated__/graphql';

import { getDefaultColors } from './indicator-chart-colors';
import {
  type GraphsTheme,
  buildDimSeries,
  buildGoalSeries,
  buildTooltipFormatter,
  buildTotalSeries,
  buildTrendSeries,
  buildYAxisConfig,
} from './indicator-charts-utility';

echarts.use([LineChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = TDashboardIndicatorLineChartBlock;

type Granularity = 'day' | 'month' | 'year';

function detectGranularity(timestamps: number[]): Granularity {
  if (timestamps.length < 2) return 'year';

  const dates = timestamps.map(ts => new Date(ts));
  const intervals = [];
  
  for (let i = 1; i < dates.length; i++) {
    const diff = dates[i].getTime() - dates[i - 1].getTime();
    intervals.push(diff);
  }

  intervals.sort((a, b) => a - b);
  const medianInterval = intervals[Math.floor(intervals.length / 2)];
  
  const day = 24 * 60 * 60 * 1000;
  const month = 30 * day;
  const year = 365 * day;
}

function formatDate(timestamp: number, granularity: Granularity): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (granularity) {
    case 'daily':
      return `${year}-${month}-${day}`;
    case 'monthly':
      return `${year}-${month}`;
    case 'yearly':
      return `${year}`;
  }
}
function formatAxisLabel(dateStr: string, granularity: Granularity, locale?: string): string {
  const parts = dateStr.split('-');
  const year = parseInt(parts[0]);
  const month = parts[1] ? parseInt(parts[1]) - 1 : 0;
  const day = parts[2] ? parseInt(parts[2]) : 1;
  
  const date = new Date(year, month, day);

  switch (granularity) {
    case 'day':
      return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
    case 'month':
      return date.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
    case 'year':
      return `${year}`;
  }
}

function addTimeInterval(timestamp: number, granularity: Granularity): number {
  const date = new Date(timestamp);
  
  switch (granularity) {
    case 'day':
      date.setDate(date.getDate() + 1);
      break;
    case 'month':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'year':
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  
  return date.getTime();
}

const DashboardIndicatorLineChartBlock = ({
  chartSeries,
  indicator,
  dimension,
  showTotalLine,
}: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  const unit = indicator?.unit?.name ?? '';
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);

  const totalLabel = t('total');
  const goalLabel = t('goal');
  const trendLabel = t('current-trend');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const dimSeries = buildDimSeries(chartSeries, palette);
  const totalDef = buildTotalSeries(chartSeries, graphsTheme.totalLineColor ?? '#000', totalLabel);
  const totalRaw = totalDef.raw;

  const xYearSet = new Set<number>();
  dimSeries.forEach((d) => d.raw.forEach(([y]) => xYearSet.add(y)));
  totalRaw.forEach(([y]) => xYearSet.add(y));
  indicator?.goals?.forEach((g) => xYearSet.add(new Date(g.date).getFullYear()));
  const xCategories = Array.from(xYearSet)
    .sort((a, b) => a - b)
    .map(String);

  function buildLines(arr: { name: string; color: string; raw: [number, number][] }[], width = 2) {
    return arr.map(({ name, color, raw }) => {
      const data =
        raw.length === 1
          ? [
              [String(raw[0][0]), raw[0][1]],
              [String(raw[0][0] + 1), raw[0][1]],
            ]
          : raw.map(([y, v]) => [String(y), v] as [string, number]);

      return {
        name,
        type: 'line' as const,
        data,
        showLine: true,
        showSymbol: true,
        symbolSize: 8,
        smooth: raw.length > 1,
        lineStyle: { width, color },
        itemStyle: { color },
      };
    });
  }

  const seriesLines = buildLines(dimSeries);
  const seriesTotal = showTotalLine && totalRaw.length ? buildLines([totalDef], 3) : [];
  const trendSeries = buildTrendSeries(
    totalRaw,
    indicator,
    graphsTheme.trendLineColor ?? '#aaa',
    trendLabel
  );
  const goalSeries = buildGoalSeries(indicator, unit, graphsTheme.goalLineColors ?? [], goalLabel);

  const legendData = [
    ...dimSeries.map((d) => d.name),
    ...(showTotalLine && totalRaw.length ? [totalLabel] : []),
    ...(goalSeries.length ? [goalLabel] : []),
    ...(trendSeries.length ? [trendLabel] : []),
  ];

  const option: ECOption = {
    legend: {
      show: true,
      data: legendData,
      left: 'center',
      bottom: 0,
      textStyle: { color: theme.textColor.secondary },
    },
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'line' },
      formatter: buildTooltipFormatter(unit, legendData, t, dimension, indicator?.valueRounding),
    },
    grid: {
      left: 20,
      right: 20,
      top: 40,
      bottom: 60,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xCategories,
      boundaryGap: false,
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: buildYAxisConfig(indicator?.unit?.name ?? '', indicator, theme.textColor.primary),
    series: [...seriesLines, ...seriesTotal, ...goalSeries, ...trendSeries],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorLineChartBlock;
