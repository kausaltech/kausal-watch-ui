import { useTheme } from '@emotion/react';

import { PieChart } from 'echarts/charts';
import type { PieSeriesOption } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';
import { getEChartsLocaleStrings } from '@common/components/register-echarts-locales';

import type { PieChartVisualizationFragment } from '@/common/__generated__/graphql';
import useNumberFormatter from '@/common/numbers';
import { escapeHtml } from '@/common/utils';
import {
  type AriaDetail,
  buildSaveAsImageToolbox,
  getChartDownloadFilename,
} from '@/components/graphs/indicator-graph.utils';

import { getDefaultColors } from './indicator-chart-colors';
import {
  type GraphsTheme,
  buildPieAriaDescription,
  getUnitLabel,
} from './indicator-charts-utility';

echarts.use([PieChart, LegendComponent]);

type Props = Omit<
  Extract<PieChartVisualizationFragment, { __typename: 'DashboardIndicatorPieChartBlock' }>,
  '__typename'
> & {
  /** Detail of the generated aria description; 'summary' when a data table accompanies the chart */
  ariaDetail?: AriaDetail;
};
type IndicatorType = NonNullable<Props['indicator']>;

export interface SeriesData {
  name: string;
  value: number;
  itemStyle?: { color?: string };
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

/**
 * The most recent year with a value in any series. Series may end at
 * different years (a stale or empty first category must not hide newer
 * observations elsewhere), so every dated value is considered.
 */
function getLatestYear(chartSeries: Props['chartSeries']) {
  let latest: number | undefined;
  chartSeries?.forEach((series) => {
    series?.values?.forEach((value) => {
      if (value?.date == null || value.value == null) return;
      const year = yearOfDate(value.date);
      if (year != null && (latest == null || year > latest)) {
        latest = year;
      }
    });
  });
  return latest;
}

function doYearsMatch(year: number, date: string) {
  return yearOfDate(date) === year;
}

/**
 * The slices of the pie: one per dimension category, holding that category's
 * value for the configured year (or the latest year in the data when none is
 * configured). Shared with the accessible data table so both show the same
 * year and categories.
 */
export function selectPieSlices(
  chartSeries: Props['chartSeries'],
  year: number | null | undefined
): { year: number | undefined; slices: SeriesData[] } {
  const assertedYear = year ?? getLatestYear(chartSeries);
  if (!assertedYear) {
    return { year: undefined, slices: [] };
  }
  const slices =
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
  return { year: assertedYear, slices };
}

/**
 * Slices whose sum lands this close to 100 are taken to be shares of a whole
 * (rounding each of up to a dozen slices to one decimal can drift by ~1).
 */
const PERCENT_SUM_TOLERANCE = 2;

/**
 * Whether to append each slice's share of the pie to its value. When the
 * indicator is itself a percentage whose categories add up to (about) 100,
 * the share would just restate the value ("14.3 % (14%)"), so it is omitted.
 */
export function showSegmentedPercentage(
  unit: { name?: string | null; shortName?: string | null } | null | undefined,
  values: SeriesData[]
) {
  if (!unit) {
    return true;
  }

  const isPercentage = unit.name === '%' || unit.shortName === '%';
  const sum = values.reduce((acc, curr) => acc + curr.value, 0);
  const valuesSumTo100 = Math.abs(sum - 100) <= PERCENT_SUM_TOLERANCE;

  return !(isPercentage && valuesSumTo100);
}

/**
 * Tooltip text for a slice: the value rounded and localized like every other
 * chart type, followed by the indicator's unit and, unless the indicator is
 * itself a percentage summing to 100, the slice's share.
 */
export function createTooltipFormatter(
  indicator: IndicatorType | null,
  seriesData: SeriesData[],
  formatValue: (value: number) => string,
  unit: string
) {
  const showPercentage = showSegmentedPercentage(indicator?.unit, seriesData);

  return (tooltipParams: CallbackDataParams) => {
    // The pie data is plain numbers, but the ECharts callback type is a broad
    // union — narrow before formatting
    const value = typeof tooltipParams.value === 'number' ? formatValue(tooltipParams.value) : '-';
    // Rendered as HTML by ECharts: the category name and unit are editor input
    const nameAndValue = `${escapeHtml(tooltipParams.name)}: ${value} ${escapeHtml(unit)}`.trim();

    if (!showPercentage || !tooltipParams.percent) {
      return nameAndValue;
    }

    return `${nameAndValue} (${Math.round(tooltipParams.percent)}%)`;
  };
}

const DashboardIndicatorPieChartBlock = ({
  chartSeries,
  dimension,
  indicator,
  year,
  ariaDetail,
}: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const format = useFormatter();
  const locale = useLocale();
  const formatValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.valueRounding ?? undefined,
  });
  const unit = getUnitLabel(indicator);
  // Same palette resolution as the bar/line/area chart blocks, so a
  // category gets the same color in every chart type
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  // Same rule as IndicatorGraph: honor the tenant-configured chart
  // background, white when unset
  const chartBackground = graphsTheme.customBackground || theme.themeColors.white;
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);
  const { year: assertedYear, slices: seriesData } = selectPieSlices(chartSeries, year);

  // No explicit year and none derivable from the data means there is
  // nothing to slice
  if (!assertedYear || !seriesData.length) {
    return <div>{t('data-not-available')}</div>;
  }

  // With only a few categories there's room to name the slices directly, so
  // the legend would just duplicate the labels; with more, the slice labels
  // fall back to percent only and the legend carries the names.
  const labelSegments = seriesData.length < 5;

  if (!assertedYear) {
    return <div>No year provided</div>;
  }

  // ECharts sets this as the canvas' aria-label; same wording as the
  // generic IndicatorGraph so screen-reader users hear one style of chart
  const ariaDescription = buildPieAriaDescription({
    title: indicator?.name,
    year: assertedYear,
    slices: seriesData,
    unit,
    valueRounding: indicator?.valueRounding,
    format,
    t,
    localePack: getEChartsLocaleStrings(locale),
    detail: ariaDetail,
  });

  const option: ECOption & { series: PieSeriesOption[] } = {
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
    tooltip: {
      appendTo: 'body',
      trigger: 'item',
      formatter: createTooltipFormatter(indicator ?? null, seriesData, formatValue, unit),
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
