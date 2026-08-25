'use client';

import { useTheme } from '@emotion/react';

import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';

import type { AreaChartVisualizationFragment } from '@/common/__generated__/graphql';
import useNumberFormatter from '@/common/numbers';

import { getDefaultColors } from './indicator-chart-colors';
import {
  type GraphsTheme,
  buildDimSeries,
  buildTooltipFormatter,
  buildTotalSeries,
  buildTrendSeries,
  buildYAxisConfig,
  collectAllDates,
  getUnitLabel,
  shouldSmoothLines,
} from './indicator-charts-utility';

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = Omit<
  Extract<AreaChartVisualizationFragment, { __typename: 'DashboardIndicatorAreaChartBlock' }>,
  '__typename'
>;

const DashboardIndicatorAreaChartBlock = ({ chartSeries, indicator, dimension }: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const formatValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.valueRounding ?? undefined,
  });
  const formatAxisValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.ticksRounding ?? 100,
  });
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  const unit = getUnitLabel(indicator);
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

  const dataSources = hasDimension ? dimSeries.map((d) => d.raw) : [totalRaw];
  const { xCategories } = collectAllDates(dataSources, timeResolution);

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
          connectNulls: true,
          smooth: shouldSmoothLines(graphsTheme),
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
          connectNulls: true,
          smooth: shouldSmoothLines(graphsTheme),
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
    backgroundColor: theme.themeColors.white,
    // Same legend style as the pie chart block
    legend: {
      show: true,
      orient: 'horizontal',
      bottom: 0,
      right: 0,
      // Keep swatches left of their labels (auto flips them for a
      // right-anchored legend)
      align: 'left',
      type: 'plain',
      data: legendData,
      // Also the gap between wrapped legend rows — ECharts has no separate
      // row-gap setting
      itemGap: 10,
      itemWidth: 18,
      itemHeight: 12,
      textStyle: { color: theme.textColor.primary },
    },
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'line' },
      formatter: buildTooltipFormatter(
        unit,
        legendLabels,
        t,
        formatValue,
        dimension ?? undefined,
        timeResolution
      ),
    },
    grid: {
      left: 20,
      right: 20,
      top: 40,
      // Reserve the bottom ~quarter for the wrapping legend (up to ~4
      // rows), like the pie chart block does
      bottom: 100,
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
    yAxis: buildYAxisConfig(unit, formatAxisValue, indicator ?? undefined, theme.textColor.primary),
    series: [...seriesWithStack, ...trendSeries],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="400px" />
    </>
  );
};

export default DashboardIndicatorAreaChartBlock;
