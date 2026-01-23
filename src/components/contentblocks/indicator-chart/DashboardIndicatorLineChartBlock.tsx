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
  collectAllDates,
} from './indicator-charts-utility';

echarts.use([LineChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = TDashboardIndicatorLineChartBlock;

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
  const timeResolution = indicator?.timeResolution ?? 'YEAR';
  const totalLabel = t('total');
  const goalLabel = t('goal');
  const trendLabel = t('current-trend');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const dimSeries = buildDimSeries(chartSeries, palette, timeResolution);
  const totalDef = buildTotalSeries(
    chartSeries,
    graphsTheme.totalLineColor ?? '#000',
    totalLabel,
    timeResolution
  );
  const totalRaw = totalDef.raw;

  const goalDates = indicator?.goals?.map((g) => g.date) ?? [];
  const { xCategories } = collectAllDates(
    [...dimSeries.map((d) => d.raw), totalRaw],
    timeResolution,
    goalDates
  );

  function buildLines(arr: { name: string; color: string; raw: [string, number][] }[], width = 2) {
    return arr.map(({ name, color, raw }) => {
      const dataMap = new Map(raw.map(([key, value]) => [key, value]));
      const data = xCategories.map(
        (key) => [key, dataMap.get(key) ?? null] as [string, number | null]
      );

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
    trendLabel,
    timeResolution
  );
  const goalSeries = buildGoalSeries(
    indicator,
    unit,
    graphsTheme.goalLineColors ?? [],
    goalLabel,
    timeResolution
  );

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
      formatter: buildTooltipFormatter(
        unit,
        legendData,
        t,
        dimension,
        indicator?.valueRounding,
        timeResolution
      ),
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
