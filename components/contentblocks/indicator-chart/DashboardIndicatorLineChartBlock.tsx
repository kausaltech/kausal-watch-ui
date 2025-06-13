'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslations } from 'next-intl';
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
import {
  GraphsTheme,
  buildDimSeries,
  buildGoalSeries,
  buildTotalSeries,
  buildTrendSeries,
  buildTooltipFormatter,
  buildYAxisConfig,
} from './indicator-charts-utility';

echarts.use([
  LineChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

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

  const totalLabel = t('total');
  const goalLabel = t('goal');
  const trendLabel = t('current-trend');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const dimSeries = buildDimSeries(chartSeries, palette);
  const totalDef = buildTotalSeries(
    chartSeries,
    graphsTheme.totalLineColor ?? '#000',
    totalLabel
  );
  const totalRaw = totalDef.raw;

  const xYearSet = new Set<number>();
  dimSeries.forEach((d) => d.raw.forEach(([y]) => xYearSet.add(y)));
  totalRaw.forEach(([y]) => xYearSet.add(y));
  indicator?.goals?.forEach((g) =>
    xYearSet.add(new Date(g.date).getFullYear())
  );
  const xCategories = Array.from(xYearSet)
    .sort((a, b) => a - b)
    .map(String);

  function buildLines(
    arr: { name: string; color: string; raw: [number, number][] }[],
    width = 2
  ) {
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
  const seriesTotal =
    showTotalLine && totalRaw.length ? buildLines([totalDef], 3) : [];
  const trendSeries = buildTrendSeries(
    totalRaw,
    indicator,
    graphsTheme.trendLineColor ?? '#aaa',
    trendLabel
  );
  const goalSeries = buildGoalSeries(
    indicator,
    unit,
    graphsTheme.goalLineColors ?? [],
    goalLabel
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
    yAxis: buildYAxisConfig(
      indicator?.unit?.name ?? '',
      indicator,
      theme.textColor.primary
    ),
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
