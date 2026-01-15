'use client';

import React from 'react';

import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

import { DashboardIndicatorAreaChartBlock as TDashboardIndicatorAreaChartBlock } from '@/common/__generated__/graphql';

import { getDefaultColors } from './indicator-chart-colors';
import {
  buildDimSeries,
  buildTooltipFormatter,
  buildTotalSeries,
  buildTrendSeries,
  buildYAxisConfig,
} from './indicator-charts-utility';

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = TDashboardIndicatorAreaChartBlock;

const DashboardIndicatorAreaChartBlock = ({ chartSeries, indicator, dimension }: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const graphsTheme = theme.settings?.graphs ?? {};
  const unit = indicator?.unit?.name ?? '';
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);
  const timeResolution = indicator?.timeResolution ?? 'YEAR';

  const totalLabel = t('total');
  const trendLabel = t('current-trend');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const hasDimension = !!dimension;
  const stackable = indicator?.dataCategoriesAreStackable;
  const dimSeries = hasDimension ? buildDimSeries(chartSeries, palette, timeResolution) : [];

  const totalDef = buildTotalSeries(
    chartSeries,
    graphsTheme.totalLineColor ?? palette[0],
    totalLabel,
    timeResolution
  );
  const totalRaw = totalDef.raw;

  const trendSeries =
    indicator?.showTrendline && totalRaw.length >= 2
      ? buildTrendSeries(
          totalRaw,
          indicator,
          graphsTheme.trendLineColor ?? '#aaa',
          trendLabel,
          timeResolution
        )
      : [];

  const legendLabels: string[] = [
    ...(hasDimension ? dimSeries.map((d) => d.name) : [totalLabel]),
    ...(trendSeries.length ? [trendLabel] : []),
  ];

  const areaLegendItems: LegendComponentOption['data'] = hasDimension
    ? dimSeries.map((d) => ({ name: d.name, icon: 'roundRect' as const }))
    : [{ name: totalLabel, icon: 'roundRect' as const }];

  const trendLegendItems: LegendComponentOption['data'] = trendSeries.length
    ? [{ name: trendLabel }]
    : [];

  const legendData: LegendComponentOption['data'] = [...areaLegendItems, ...trendLegendItems];

  const normalizeDateForSet = (key: string | number): string => {
    if (typeof key === 'number') {
      if (key > 1900 && key < 2100) {
        return `${key}-1-1`;
      }
      return String(key);
    }
    const dateObj = new Date(key);
    if (Number.isNaN(dateObj.getTime())) {
      return String(key);
    }
    if (timeResolution === 'YEAR') {
      return `${dateObj.getFullYear()}-1-1`;
    }
    return key;
  };

  const normalizedDateSet = new Set<string>();
  if (hasDimension) {
    dimSeries.forEach((d) =>
      d.raw.forEach(([key]) => normalizedDateSet.add(normalizeDateForSet(key)))
    );
  } else {
    totalRaw.forEach(([key]) => normalizedDateSet.add(normalizeDateForSet(key)));
  }

  const allDates = Array.from(normalizedDateSet);
  allDates.sort((a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
      return String(a).localeCompare(String(b));
    }
    return dateA - dateB;
  });

  const formatForDisplay = (normalizedDate: string): string => {
    const date = new Date(normalizedDate);
    if (Number.isNaN(date.getTime())) {
      return normalizedDate;
    }
    if (timeResolution === 'YEAR') {
      return String(date.getFullYear());
    } else if (timeResolution === 'MONTH') {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    } else {
      return date.toISOString().split('T')[0];
    }
  };

  const xCategories = allDates.map(formatForDisplay);

  const series = hasDimension
    ? dimSeries.map((d) => {
        const dataMap = new Map(d.raw.map(([key, value]) => [key, value]));
        const data = xCategories.map(
          (key) => [key, dataMap.get(key) ?? null] as [string, number | null]
        );
        return {
          name: d.name,
          type: 'line' as const,
          areaStyle: { opacity: 0.9 },
          symbol: 'none' as const,
          data,
          itemStyle: { color: d.color },
          lineStyle: { color: d.color },
          emphasis: { focus: 'series' },
        };
      })
    : [
        {
          name: totalDef.name,
          type: 'line' as const,
          areaStyle: { opacity: 0.9 },
          symbol: 'circle' as const,
          symbolSize: 6,
          data: (() => {
            const dataMap = new Map(totalRaw.map(([key, value]) => [key, value]));
            return xCategories.map(
              (key) => [key, dataMap.get(key) ?? null] as [string, number | null]
            );
          })(),
          itemStyle: { color: totalDef.color },
          lineStyle: { color: totalDef.color },
          emphasis: { focus: 'series' },
        },
      ];

  const seriesWithStack = stackable ? series.map((s) => ({ ...s, stack: 'categories' })) : series;

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
        legendLabels,
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
      axisLabel: {
        color: theme.textColor.primary,
        formatter: (value: string) => {
          if (timeResolution === 'YEAR') {
            return String(value);
          } else if (timeResolution === 'MONTH') {
            return String(value);
          } else {
            return value;
          }
        },
      },
    },
    yAxis: buildYAxisConfig(indicator?.unit?.name ?? '', indicator, theme.textColor.primary),
    series: [...seriesWithStack, ...trendSeries],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorAreaChartBlock;
