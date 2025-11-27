import React from 'react';

import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

import { DashboardIndicatorBarChartBlock as TDashboardIndicatorBarChartBlock } from '@/common/__generated__/graphql';

import { getDefaultColors } from './indicator-chart-colors';
import {
  buildDimSeries,
  buildTooltipFormatter,
  buildTotalSeries,
  buildYAxisConfig,
} from './indicator-charts-utility';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = TDashboardIndicatorBarChartBlock;

const DashboardIndicatorBarChartBlock = ({ chartSeries, indicator, dimension, barType }: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const graphsTheme = theme.settings?.graphs ?? {};
  const unit = indicator?.unit?.name ?? '';
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);

  const totalLabel = t('total');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const dimSeries = dimension
    ? buildDimSeries(chartSeries, palette)
    : [buildTotalSeries(chartSeries, graphsTheme.totalLineColor ?? palette[0], totalLabel)];

  const xCategoriesSet = new Set<string>();
  const seriesDataMap: Record<string, (number | null)[]> = {};

  dimSeries.forEach(({ name, raw }) => {
    seriesDataMap[name] = [];
    raw.forEach(([year]) => {
      xCategoriesSet.add(String(year));
    });
  });

  const xCategories = Array.from(xCategoriesSet).sort();

  dimSeries.forEach(({ name, raw }) => {
    const valuesByYear: Record<string, number> = Object.fromEntries(
      raw.map(([year, value]) => [String(year), value])
    );
    seriesDataMap[name] = xCategories.map((year) => valuesByYear[year] ?? null);
  });

  const series = Object.entries(seriesDataMap).map(([name, data]) => ({
    name,
    type: 'bar' as const,
    stack: barType === 'stacked' ? 'total' : undefined,
    data,
    emphasis: { focus: 'series' },
    itemStyle: {
      color: dimSeries.find((d) => d.name === name)?.color,
    },
  }));

  const legendData = dimSeries.map((d) => d.name);

  const buildLegend = (theme: any): ECOption['legend'] => ({
    show: true,
    bottom: 10,
    left: 'center',
    orient: 'horizontal',
    itemGap: 30,
    itemWidth: 18,
    itemHeight: 12,
    textStyle: {
      color: theme.textColor.secondary,
    },
  });

  const option: ECOption = {
    legend: buildLegend(theme),
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'shadow' },
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
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: buildYAxisConfig(indicator?.unit?.name ?? '', indicator, theme.textColor.primary),
    series,
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorBarChartBlock;
