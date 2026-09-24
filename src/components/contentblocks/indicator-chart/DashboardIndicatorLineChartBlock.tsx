'use client';

import { useTheme } from '@emotion/react';

import { LineChart, ScatterChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { useLocale, useTranslations } from 'next-intl';

import { Chart } from '@common/components/Chart';
import { getEChartsLocaleStrings } from '@common/components/register-echarts-locales';

import type { LineChartVisualizationFragment } from '@/common/__generated__/graphql';
import useNumberFormatter from '@/common/numbers';
import {
  type AriaDetail,
  buildSaveAsImageToolbox,
  buildTimeTooltipFormatter,
  categorySymbol,
  getChartDownloadFilename,
  goalSymbol,
  markerItemStyle,
} from '@/components/graphs/indicator-graph.utils';

import { getDefaultColors } from './indicator-chart-colors';
import {
  type GraphsTheme,
  blockYRange,
  buildBlockAriaDescription,
  buildDimSeries,
  buildGoalSeries,
  buildTotalSeries,
  buildTrendSeries,
  buildYAxisConfig,
  collectAllDates,
  getUnitLabel,
  shouldSmoothLines,
  toChartTimeResolution,
} from './indicator-charts-utility';

echarts.use([LineChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = Omit<
  Extract<LineChartVisualizationFragment, { __typename: 'DashboardIndicatorLineChartBlock' }>,
  '__typename'
> & {
  /** Aria description detail; 'summary' when a data table accompanies the chart */
  ariaDetail?: AriaDetail;
};

const DashboardIndicatorLineChartBlock = ({
  chartSeries,
  indicator,
  dimension,
  showTotalLine,
  ariaDetail,
}: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const formatValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.valueRounding ?? undefined,
  });
  const formatAxisValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.ticksRounding ?? 100,
  });
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  // Tenant chart background, white when unset (as in IndicatorGraph)
  const chartBackground = graphsTheme.customBackground || theme.themeColors.white;
  const unit = getUnitLabel(indicator);
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
  // Without a dimension the aggregate is the only series, so always draw it
  const includeTotal = (!dimension || showTotalLine) && totalRaw.length > 0;

  const goalDates = indicator?.goals?.map((g) => g?.date).filter((d) => d != null) ?? [];
  const { xCategories } = collectAllDates(
    [...dimSeries.map((d) => d.raw), totalRaw],
    timeResolution,
    goalDates
  );

  function buildLines(
    arr: { name: string; color: string; raw: [string, number][] }[],
    width = 2,
    // Markers cycle the theme's categorySymbols by series position
    symbolOffset = 0
  ) {
    return arr.map(({ name, color, raw }, idx) => {
      const dataMap = new Map(raw.map(([key, value]) => [key, value]));
      const data = xCategories.map(
        (key) => [key, dataMap.get(key) ?? null] as [string, number | null]
      );

      return {
        name,
        type: 'line' as const,
        data,
        // Draw through periods without data
        connectNulls: true,
        showLine: true,
        showSymbol: true,
        symbol: categorySymbol(graphsTheme.categorySymbols, symbolOffset + idx),
        symbolSize: 8,
        smooth: shouldSmoothLines(graphsTheme) && raw.length > 1,
        lineStyle: { width, color },
        itemStyle: markerItemStyle(color),
      };
    });
  }

  const seriesLines = buildLines(dimSeries);
  const seriesTotal = includeTotal ? buildLines([totalDef], 3, dimSeries.length) : [];
  // The trend regresses the aggregate, so show it only with the aggregate line
  const trendSeries = includeTotal
    ? buildTrendSeries(
        totalRaw,
        indicator,
        graphsTheme.trendLineColor ?? '#aaa',
        trendLabel,
        timeResolution
      )
    : [];
  const goalSeries = buildGoalSeries(
    indicator,
    unit,
    graphsTheme.goalLineColors ?? [],
    goalLabel,
    timeResolution,
    formatValue,
    goalSymbol(graphsTheme.goalSymbol)
  );

  const legendData = [
    ...dimSeries.map((d) => d.name),
    ...(includeTotal ? [totalLabel] : []),
    ...goalSeries.map((g) => g.name),
    ...(trendSeries.length ? [trendLabel] : []),
  ];

  // Canvas aria-label, worded like IndicatorGraph's
  const ariaDescription = buildBlockAriaDescription({
    title: indicator?.name,
    series: [...dimSeries, ...(includeTotal ? [totalDef] : [])],
    goals: goalSeries,
    trend: trendSeries[0] ?? null,
    timeResolution,
    unit,
    valueRounding: indicator?.valueRounding,
    formatValue,
    t,
    localePack: getEChartsLocaleStrings(locale),
    detail: ariaDetail,
  });

  const option = {
    aria: {
      enabled: true,
      label: { description: ariaDescription },
    },
    toolbox: buildSaveAsImageToolbox({
      filename: getChartDownloadFilename(indicator?.name),
      buttonTitle: t('download-chart-as-png'),
      backgroundColor: chartBackground,
    }),
    backgroundColor: chartBackground,
    // Same legend style as the pie chart block
    legend: {
      show: true,
      orient: 'horizontal',
      bottom: 0,
      right: 0,
      // Keep swatches left of labels in a right-anchored legend
      align: 'left',
      type: 'plain',
      data: legendData,
      // Also sets the gap between wrapped rows
      itemGap: 10,
      itemWidth: 18,
      itemHeight: 12,
      textStyle: { color: theme.textColor.primary },
    },
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'line' },
      // Same formatter as IndicatorGraph
      formatter: buildTimeTooltipFormatter({
        timeResolution: toChartTimeResolution(timeResolution),
        trendName: trendLabel,
        yRange: blockYRange(unit, indicator?.valueRounding),
        formatValue,
      }),
    },
    grid: {
      left: 20,
      right: 20,
      top: 40,
      // Room for up to ~4 legend rows, as in the pie chart block
      bottom: 100,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xCategories,
      boundaryGap: false,
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: buildYAxisConfig(unit, formatAxisValue, indicator ?? undefined, theme.textColor.primary),
    series: [...seriesLines, ...seriesTotal, ...goalSeries, ...trendSeries],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="400px" />
    </>
  );
};

export default DashboardIndicatorLineChartBlock;
