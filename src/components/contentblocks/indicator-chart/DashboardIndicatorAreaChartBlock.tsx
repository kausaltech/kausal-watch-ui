'use client';

import { useTheme } from '@emotion/react';

import { LineChart, type LineSeriesOption } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';
import { getEChartsLocaleStrings } from '@common/components/register-echarts-locales';

import type { AreaChartVisualizationFragment } from '@/common/__generated__/graphql';
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
  buildTotalSeries,
  buildTrendSeries,
  buildYAxisConfig,
  collectAllDates,
  getUnitLabel,
  shouldSmoothLines,
  toChartTimeResolution,
} from './indicator-charts-utility';

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = Omit<
  Extract<AreaChartVisualizationFragment, { __typename: 'DashboardIndicatorAreaChartBlock' }>,
  '__typename'
> & {
  /** Detail of the generated aria description; 'summary' when a data table accompanies the chart */
  ariaDetail?: AriaDetail;
};

const DashboardIndicatorAreaChartBlock = ({
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
  const trendLabel = t('current-trend');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const hasDimension = !!dimension;
  const stackable = indicator?.dataCategoriesAreStackable === true;
  const dimSeries = hasDimension ? buildDimSeries(chartSeries, palette, timeResolution) : [];

  const totalDef = buildTotalSeries(
    chartSeries,
    graphsTheme.totalLineColor ?? palette[0],
    totalLabel,
    timeResolution
  );
  const totalRaw = totalDef.raw;
  // On dimensional charts the categoryless aggregate isn't among the area
  // series; when the block enables the total, draw it as a line on top,
  // like the line chart block does. Without a dimension the total IS the
  // area, so no overlay is needed.
  const showTotalOverlay = hasDimension && !!showTotalLine && totalRaw.length > 0;

  // The trend regresses the categoryless aggregate. On dimensional charts
  // that aggregate is only visible as the total overlay — without it an
  // aggregate trend over category areas would be unattributed (the generic
  // indicator view gates the same way). Dimensionless charts render the
  // aggregate as the area itself, so the trend always has its anchor.
  const trendVisible = !hasDimension || showTotalOverlay;
  const trendSeries =
    trendVisible && indicator?.showTrendline && totalRaw.length >= 2
      ? buildTrendSeries(
          totalRaw,
          indicator,
          graphsTheme.trendLineColor ?? '#aaa',
          trendLabel,
          timeResolution
        )
      : [];

  const areaLegendItems: LegendComponentOption['data'] = hasDimension
    ? dimSeries.map((d) => ({ name: d.name, icon: 'roundRect' as const }))
    : [{ name: totalLabel, icon: 'roundRect' as const }];

  const trendLegendItems: LegendComponentOption['data'] = trendSeries.length
    ? [{ name: trendLabel }]
    : [];

  const totalLegendItems: LegendComponentOption['data'] = showTotalOverlay
    ? [{ name: totalLabel }]
    : [];

  const legendData: LegendComponentOption['data'] = [
    ...areaLegendItems,
    ...totalLegendItems,
    ...trendLegendItems,
  ];

  const dataSources = hasDimension
    ? [...dimSeries.map((d) => d.raw), ...(showTotalOverlay ? [totalRaw] : [])]
    : [totalRaw];
  const { xCategories } = collectAllDates(dataSources, timeResolution);

  // Annotated so the dimensional/dimensionless branches don't form an
  // inference-hostile union (`.map` over it degrades to `any`)
  const series: LineSeriesOption[] = hasDimension
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
          emphasis: { focus: 'series' as const },
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
          emphasis: { focus: 'series' as const },
        },
      ];

  const seriesWithStack = stackable ? series.map((s) => ({ ...s, stack: 'categories' })) : series;

  const totalLineColor = graphsTheme.totalLineColor ?? '#000';
  const totalLineSeries = showTotalOverlay
    ? [
        (() => {
          const dataMap = new Map(totalRaw.map(([key, value]) => [key, value]));
          return {
            name: totalLabel,
            type: 'line' as const,
            data: xCategories.map(
              (key) => [key, dataMap.get(key) ?? null] as [string, number | null]
            ),
            connectNulls: true,
            smooth: shouldSmoothLines(graphsTheme),
            showSymbol: true,
            symbolSize: 8,
            lineStyle: { width: 3, color: totalLineColor },
            itemStyle: { color: totalLineColor },
            z: 3,
          };
        })(),
      ]
    : [];

  // ECharts sets this as the canvas' aria-label; same wording as the
  // generic IndicatorGraph so screen-reader users hear one style of chart
  const ariaDescription = buildBlockAriaDescription({
    title: indicator?.name,
    series: hasDimension ? [...dimSeries, ...(showTotalOverlay ? [totalDef] : [])] : [totalDef],
    trend: trendSeries[0] ?? null,
    timeResolution,
    unit,
    valueRounding: indicator?.valueRounding,
    format,
    t,
    localePack: getEChartsLocaleStrings(locale),
    detail: ariaDetail,
  });

  const option: ECOption = {
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
      axisLabel: {
        color: theme.textColor.primary,
      },
    },
    yAxis: buildYAxisConfig(unit, formatAxisValue, indicator ?? undefined, theme.textColor.primary),
    series: [...seriesWithStack, ...totalLineSeries, ...trendSeries],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="400px" />
    </>
  );
};

export default DashboardIndicatorAreaChartBlock;
