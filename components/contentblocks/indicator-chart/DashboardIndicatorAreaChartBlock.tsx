'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslations } from 'next-intl';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import Chart, { ECOption } from '@/components/paths/graphs/Chart';
import { DashboardIndicatorAreaChartBlock as TDashboardIndicatorAreaChartBlock } from '@/common/__generated__/graphql';
import { getDefaultColors } from './indicator-chart-colors';
import {
  buildDimSeries,
  buildTotalSeries,
  buildTooltipFormatter,
  buildYAxisConfig,
  buildTrendSeries,
} from './indicator-charts-utility';

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = TDashboardIndicatorAreaChartBlock;

const DashboardIndicatorAreaChartBlock = ({
  chartSeries,
  indicator,
  dimension,
}: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const graphsTheme = theme.settings?.graphs ?? {};
  const unit = indicator?.unit?.name ?? '';
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);

  const totalLabel = t('total');
  const trendLabel = t('current-trend');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const hasDimension = !!dimension;
  const dimSeries = hasDimension ? buildDimSeries(chartSeries, palette) : [];

  const totalDef = buildTotalSeries(
    chartSeries,
    graphsTheme.totalLineColor ?? palette[0],
    totalLabel
  );
  const totalRaw = totalDef.raw;

  const trendSeries =
    indicator?.showTrendline && totalRaw.length >= 2
      ? buildTrendSeries(
          totalRaw,
          indicator,
          graphsTheme.trendLineColor ?? '#aaa',
          trendLabel
        )
      : [];

  const legendData = [
    ...(hasDimension ? dimSeries.map((d) => d.name) : [totalLabel]),
    ...(trendSeries.length ? [trendLabel] : []),
  ];

  const xCategories = Array.from(
    new Set([
      ...(hasDimension
        ? dimSeries.flatMap((d) => d.raw.map(([y]) => String(y)))
        : totalRaw.map(([y]) => String(y))),
    ])
  ).sort();

  const series = hasDimension
    ? dimSeries.map((d) => ({
        name: d.name,
        type: 'line' as const,
        areaStyle: {},
        symbol: 'none' as const,
        data: d.raw.map(([year, value]) => [String(year), value]),
        itemStyle: { color: d.color },
        lineStyle: { color: d.color },
        emphasis: { focus: 'series' },
      }))
    : [
        {
          name: totalDef.name,
          type: 'line' as const,
          areaStyle: {},
          symbol: 'circle' as const,
          symbolSize: 6,
          data: totalRaw.map(([year, value]) => [String(year), value]),
          itemStyle: { color: totalDef.color },
          lineStyle: { color: totalDef.color },
          emphasis: { focus: 'series' },
        },
      ];

  const option: ECOption = {
    legend: {
      show: true,
      bottom: 0,
      data: legendData,
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
        indicator?.valueRounding
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
    yAxis: buildYAxisConfig(
      indicator?.unit?.name ?? '',
      indicator,
      theme.textColor.primary
    ),
    series: [...series, ...trendSeries],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorAreaChartBlock;
