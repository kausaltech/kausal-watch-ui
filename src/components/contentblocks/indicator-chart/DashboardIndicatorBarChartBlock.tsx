import { useTheme } from '@emotion/react';

import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';
import { getEChartsLocaleStrings } from '@common/components/register-echarts-locales';

import type { BarChartVisualizationFragment } from '@/common/__generated__/graphql';
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
  buildCategoryAriaDescription,
  buildCategoryValues,
  buildDimSeries,
  buildTotalSeries,
  buildUndatedTotal,
  buildYAxisConfig,
  collectAllDates,
  getUnitLabel,
  hasDatedValues,
  toChartTimeResolution,
} from './indicator-charts-utility';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = Omit<
  Extract<BarChartVisualizationFragment, { __typename: 'DashboardIndicatorBarChartBlock' }>,
  '__typename'
> & {
  /** Detail of the generated aria description; 'summary' when a data table accompanies the chart */
  ariaDetail?: AriaDetail;
};

const DashboardIndicatorBarChartBlock = ({
  chartSeries,
  indicator,
  dimension,
  barType,
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

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const totalColor = graphsTheme.totalLineColor ?? palette[0];
  const ariaCommon = {
    title: indicator?.name,
    unit,
    valueRounding: indicator?.valueRounding,
    format,
    t,
    localePack: getEChartsLocaleStrings(locale),
    detail: ariaDetail,
  };

  // Category-only indicators carry undated values (the schema permits null
  // dates): one bar per category on a category axis, like the generic graph
  // draws them, instead of a time axis with nothing on it.
  const categoryOnly = !hasDatedValues(chartSeries);
  let xCategories: string[];
  let series: ECOption['series'];
  let showLegend: boolean;
  let ariaDescription: string;

  if (categoryOnly) {
    const undatedTotal = buildUndatedTotal(chartSeries);
    const bars = dimension
      ? buildCategoryValues(chartSeries, palette)
      : undatedTotal != null
        ? [{ name: totalLabel, color: totalColor, value: undatedTotal }]
        : [];
    if (bars.length === 0) {
      return <div>{t('data-not-available')}</div>;
    }
    xCategories = bars.map((bar) => bar.name);
    series = [
      {
        name: dimension?.name ?? totalLabel,
        type: 'bar' as const,
        data: bars.map((bar) => ({ value: bar.value, itemStyle: { color: bar.color } })),
        emphasis: { focus: 'series' as const },
      },
    ];
    // The categories are on the axis; a legend would only repeat them
    showLegend = false;
    ariaDescription = buildCategoryAriaDescription({
      ...ariaCommon,
      slices: bars,
      chartKind: 'bar',
    });
  } else {
    const dimSeries = dimension
      ? buildDimSeries(chartSeries, palette, timeResolution)
      : [buildTotalSeries(chartSeries, totalColor, totalLabel, timeResolution)];

    xCategories = collectAllDates(
      dimSeries.map((d) => d.raw),
      timeResolution
    ).xCategories;

    // An explicit block barType wins over the indicator's own
    // dataCategoriesAreStackable default; without one, the indicator decides.
    const stackBars = barType
      ? barType === 'stacked'
      : (indicator?.dataCategoriesAreStackable ?? false);

    series = dimSeries.map(({ name, raw, color }) => {
      const valuesByKey: Record<string, number> = Object.fromEntries(raw);
      return {
        name,
        type: 'bar' as const,
        stack: stackBars ? 'total' : undefined,
        data: xCategories.map((key) => valuesByKey[key] ?? null),
        emphasis: { focus: 'series' as const },
        itemStyle: { color },
      };
    });
    showLegend = true;
    // ECharts sets this as the canvas' aria-label; same wording as the
    // generic IndicatorGraph so screen-reader users hear one style of chart
    ariaDescription = buildBlockAriaDescription({
      ...ariaCommon,
      series: dimSeries,
      timeResolution,
      chartKind: 'bar',
    });
  }

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
      show: showLegend,
      orient: 'horizontal',
      bottom: 0,
      right: 0,
      // Keep swatches left of their labels (auto flips them for a
      // right-anchored legend)
      align: 'left',
      type: 'plain',
      // Also the gap between wrapped legend rows — ECharts has no separate
      // row-gap setting
      itemGap: 10,
      itemWidth: 18,
      itemHeight: 12,
      textStyle: {
        color: theme.textColor.primary,
      },
    },
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'shadow' },
      // Same formatter as the generic IndicatorGraph: one row per series
      // with a value at the hovered date, hidden when there is none
      formatter: buildTimeTooltipFormatter({
        timeResolution: toChartTimeResolution(timeResolution),
        trendName: null,
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
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: buildYAxisConfig(unit, formatAxisValue, indicator ?? undefined, theme.textColor.primary),
    series,
  };

  return (
    <div>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="400px" />
    </div>
  );
};

export default DashboardIndicatorBarChartBlock;
