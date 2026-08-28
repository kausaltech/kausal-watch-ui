import { useTheme } from '@emotion/react';

import { PieChart } from 'echarts/charts';
import type { PieSeriesOption } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import { useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';

import type { PieChartVisualizationFragment } from '@/common/__generated__/graphql';
import {
  buildSaveAsImageToolbox,
  getChartDownloadFilename,
} from '@/components/graphs/indicator-graph.utils';

import { getDefaultColors } from './indicator-chart-colors';
import type { GraphsTheme } from './indicator-charts-utility';

echarts.use([PieChart, LegendComponent]);

type Props = Omit<
  Extract<PieChartVisualizationFragment, { __typename: 'DashboardIndicatorPieChartBlock' }>,
  '__typename'
>;
type IndicatorType = NonNullable<Props['indicator']>;
type UnitType = IndicatorType['unit'];

interface SeriesData {
  name: string;
  value: number;
}

/**
 * Read the year from an ISO-ish date string textually. Parsing through
 * `Date` is timezone-dependent: date-only ISO values parse as UTC midnight,
 * so local getters report the previous year for users west of UTC — a
 * configured 2024 pie would then reject every 2024 value.
 */
function yearOfDate(date: string): number | undefined {
  const match = /^(\d{4})\b/.exec(date);
  return match ? Number(match[1]) : undefined;
}

function getLatestYear(chartSeries: Props['chartSeries']) {
  const lastDate = chartSeries?.[0]?.values?.[chartSeries?.[0]?.values.length - 1]?.date;

  if (!lastDate) {
    return undefined;
  }

  return yearOfDate(lastDate);
}

function doYearsMatch(year: number, date: string) {
  return yearOfDate(date) === year;
}

/**
 * Determine if we should show the segmented percentage in addition to the value.
 * If the indicator is already a percentage that sums to 100, we don't want to show the segmented percentage.
 */
function showSegmentedPercentage(unit: UnitType | undefined, values: SeriesData[]) {
  if (!unit) {
    return true;
  }

  const isPercentage = unit.name === '%';
  const valuesSumTo100 = values.reduce((acc, curr) => acc + curr.value, 0) === 100;

  if (isPercentage && valuesSumTo100) {
    return false;
  }

  return true;
}

function createTooltipFormatter(indicator: IndicatorType | null, seriesData: SeriesData[]) {
  const showPercentage = showSegmentedPercentage(indicator?.unit, seriesData);

  return (tooltipParams: CallbackDataParams) => {
    const nameAndValue = `${tooltipParams.name}: ${tooltipParams.value}`;

    if (!showPercentage || !tooltipParams.percent) {
      return nameAndValue;
    }

    return `${nameAndValue} (${Math.round(tooltipParams.percent)}%)`;
  };
}

const DashboardIndicatorPieChartBlock = ({ chartSeries, dimension, indicator, year }: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  // Same palette resolution as the bar/line/area chart blocks, so a
  // category gets the same color in every chart type
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  // Same rule as IndicatorGraph: honor the tenant-configured chart
  // background, white when unset
  const chartBackground = graphsTheme.customBackground || theme.themeColors.white;
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);
  const assertedYear = year ?? getLatestYear(chartSeries);

  // No explicit year and none derivable from the data means there is
  // nothing to slice
  if (!assertedYear) {
    return <div>{t('data-not-available')}</div>;
  }

  const seriesData =
    chartSeries?.reduce((acc, series) => {
      if (!series?.dimensionCategory?.name) {
        return acc;
      }

      const categoryName = series.dimensionCategory.name;
      const valueForYear = series.values?.find(
        (v): v is NonNullable<typeof v> => v?.date != null && doYearsMatch(assertedYear, v.date)
      )?.value;

      // A category with no value for the chosen year gets no slice — a
      // zero-value slice would misrepresent missing data as a measured zero
      if (valueForYear == null) {
        return acc;
      }

      return [
        ...acc,
        {
          name: categoryName,
          value: valueForYear,
          itemStyle: {
            // An unset defaultColor is returned as an empty string
            color: series.dimensionCategory.defaultColor || undefined,
          },
        },
      ];
    }, [] as SeriesData[]) ?? [];

  if (!seriesData.length) {
    return <div>{t('data-not-available')}</div>;
  }

  // With only a few categories there's room to name the slices directly, so
  // the legend would just duplicate the labels; with more, the slice labels
  // fall back to percent only and the legend carries the names.
  const labelSegments = seriesData.length < 5;

  const option: ECOption & { series: PieSeriesOption[] } = {
    toolbox: buildSaveAsImageToolbox({
      filename: getChartDownloadFilename(indicator?.name),
      buttonTitle: t('download-chart-as-png'),
      backgroundColor: chartBackground,
    }),
    backgroundColor: chartBackground,
    tooltip: {
      appendTo: 'body',
      trigger: 'item',
      formatter: createTooltipFormatter(indicator ?? null, seriesData),
    },
    legend: {
      show: !labelSegments,
      orient: 'horizontal',
      bottom: 0,
      right: 0,
      // Keep swatches left of their labels (auto flips them for a
      // right-anchored legend)
      align: 'left',
      type: 'plain',
      selectedMode: false,
      // Also the gap between wrapped legend rows — ECharts has no separate
      // row-gap setting
      itemGap: 10,
      itemWidth: 18,
      itemHeight: 12,
      textStyle: {
        color: theme.textColor.primary,
      },
      pageTextStyle: {
        color: theme.textColor.primary,
      },
      pageIconColor: theme.textColor.primary,
      pageIconInactiveColor: theme.textColor.tertiary,
    },
    color: palette,
    series: [
      {
        type: 'pie',
        // Pin the pie to the upper part of the chart with an explicit
        // center and radius, leaving the bottom ~quarter free for the
        // wrapping legend (up to ~4 rows) so they can't overlap. Without a
        // legend the pie takes the full height.
        center: ['50%', labelSegments ? '50%' : '40%'],
        radius: '58%',
        avoidLabelOverlap: true,
        // Sliver slices get no label; their share is still in the tooltip.
        // When the legend is hidden the label is a category's only
        // identification, so always attempt one.
        minShowLabelAngle: labelSegments ? 0 : 8,
        itemStyle: {
          borderRadius: 0,
          borderColor: theme.themeColors.white,
          borderWidth: 0,
        },

        label: {
          show: true,
          fontSize: 14,
          // Wrap long category names instead of running off the canvas
          width: 160,
          overflow: 'break',
          formatter: (params: CallbackDataParams) => {
            const percent = params.percent ? `${Math.round(params.percent)}%` : '';
            return labelSegments ? `${params.name}\n${percent}` : percent;
          },
        },
        labelLine: {
          show: true,
          length: labelSegments ? 10 : 0,
          length2: 6,
        },
        labelLayout: {
          hideOverlap: true,
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold',
          },
        },

        data: seriesData,
      },
    ],
  };

  return (
    <>
      <h5>
        {dimension?.name} ({assertedYear})
      </h5>
      <Chart data={option} isLoading={false} height="400px" />
    </>
  );
};

export default DashboardIndicatorPieChartBlock;
