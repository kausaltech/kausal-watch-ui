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
  getYAxisBounds,
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

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const dimSeries = dimension
    ? buildDimSeries(chartSeries, palette)
    : [
        buildTotalSeries(
          chartSeries,
          graphsTheme.totalLineColor ?? palette[0],
          indicator.name ?? t('total')
        ),
      ];

  const legendData = dimSeries.map((d) => d.name);

  const xCategories = Array.from(
    new Set(dimSeries.flatMap((d) => d.raw.map(([y]) => String(y))))
  ).sort();

  const series = dimSeries.map((d) => ({
    name: d.name,
    type: 'line' as const,
    areaStyle: {},
    symbol: 'none' as const,
    data: d.raw.map(([year, value]) => [String(year), value]),
    itemStyle: { color: d.color },
    lineStyle: { color: d.color },
    emphasis: { focus: 'series' },
  }));

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
    grid: { left: 20, right: 20, top: 40, bottom: 60, containLabel: true },
    xAxis: {
      type: 'category',
      data: xCategories,
      boundaryGap: false,
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: {
      type: 'value',
      name: unit,
      ...getYAxisBounds(indicator?.minValue, indicator?.maxValue),
      axisLabel: { color: theme.textColor.primary },
    },
    series,
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorAreaChartBlock;
