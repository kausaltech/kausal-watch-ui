'use client';

import { useTheme } from '@emotion/react';

import { LineChart, ScatterChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

import { Chart } from '@common/components/Chart';
import { getEChartsLocaleStrings } from '@common/components/register-echarts-locales';

import type { LineChartVisualizationFragment } from '@/common/__generated__/graphql';
import useNumberFormatter from '@/common/numbers';
import {
  type AriaDetail,
  buildSaveAsImageToolbox,
  buildTimeTooltipFormatter,
  getChartDownloadFilename,
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
  /** Detail of the generated aria description; 'summary' when a data table accompanies the chart */
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
  const format = useFormatter();
  const locale = useLocale();
  const formatValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.valueRounding ?? undefined,
  });
  const formatAxisValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.ticksRounding ?? 100,
  });
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  // Same rule as IndicatorGraph: honor the tenant-configured chart
  // background, white when unset
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

  const goalDates = indicator?.goals?.map((g) => g?.date).filter((d) => d != null) ?? [];
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
        // Draw through gap periods without data, like the legacy time axis
        connectNulls: true,
        showLine: true,
        showSymbol: true,
        symbolSize: 8,
        smooth: shouldSmoothLines(graphsTheme) && raw.length > 1,
        lineStyle: { width, color },
        itemStyle: { color },
      };
    });
  }

  const seriesLines = buildLines(dimSeries);
  const seriesTotal = showTotalLine && totalRaw.length ? buildLines([totalDef], 3) : [];
  // The trend regresses the categoryless aggregate; when the editor hides
  // the total line, an aggregate trend over category series would be
  // unattributed — same gate the generic indicator view applies
  const trendSeries =
    showTotalLine && totalRaw.length
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
    formatValue
  );

  const legendData = [
    ...dimSeries.map((d) => d.name),
    ...(showTotalLine && totalRaw.length ? [totalLabel] : []),
    ...goalSeries.map((g) => g.name),
    ...(trendSeries.length ? [trendLabel] : []),
  ];

  // ECharts sets this as the canvas' aria-label; same wording as the
  // generic IndicatorGraph so screen-reader users hear one style of chart
  const ariaDescription = buildBlockAriaDescription({
    title: indicator?.name,
    series: [...dimSeries, ...(showTotalLine && totalRaw.length ? [totalDef] : [])],
    goals: goalSeries,
    trend: trendSeries[0] ?? null,
    timeResolution,
    unit,
    valueRounding: indicator?.valueRounding,
    format,
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
      // Same formatter as the generic IndicatorGraph: one row per series
      // with a value at the hovered date, hidden when there is none
      formatter: buildTimeTooltipFormatter({
        timeResolution: toChartTimeResolution(timeResolution),
        trendName: trendLabel,
        yRange: blockYRange(unit, indicator?.valueRounding),
        format,
      }),
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
