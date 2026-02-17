'use client';

import React, { useEffect, useMemo } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import type { MarkLineOption } from 'echarts/types/dist/shared';
import { useFormatter, useTranslations } from 'next-intl';
import { transparentize } from 'polished';

import { Chart, type ECOption } from '@common/components/Chart';

import type { IndicatorDesiredTrend } from '@/common/__generated__/graphql';
import { IndicatorNonQuantifiedGoal } from '@/common/__generated__/graphql';

type ChartTrace = {
  name: string;
  dataType?: 'total' | null;
  xType?: 'time' | 'category';
  x: Array<string | number>;
  y: Array<number | null>;
  _parentName?: string | null;
};

type GoalTrace = {
  name: string;
  x: Array<string | number>;
  y: Array<number | null>;
};

type IndicatorGraphProps = {
  yRange: {
    unit: string;
    minDigits: number;
    maxDigits: number;
    ticksCount: number | undefined;
    ticksRounding: number | undefined;
    valueRounding: number | undefined;
    includeZero: boolean;
    range: number[];
  };
  timeResolution?: 'YEAR' | 'MONTH';
  traces: ChartTrace[];
  goalTraces: GoalTrace[];
  trendTrace: GoalTrace | null;
  specification: {
    axes: Array<[string, number]>;
  };
  title: string | null;
  desiredTrend?: IndicatorDesiredTrend | null;
  nonQuantifiedGoal?: {
    trend: IndicatorNonQuantifiedGoal | null;
    date: string | null;
  };
  referenceValue: {
    date: string | null;
    value: number;
  } | null;
};

const CATEGORY_XAXIS_LABEL_EXTRA_MARGIN = 200;
const TITLE_WIDTH = 50;

const PlotContainer = styled.div<{ $vizHeight: number }>`
  height: ${(props) => props.$vizHeight}px;
`;

const wrapTitle = (title: string, maxWidth: number): string => {
  if (title.length <= maxWidth) {
    return title;
  }

  const words = title.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      // If a single word is longer than maxWidth, we still need to add it
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.join('\n');
};

const roundTickValue = (value: number): number => {
  if (value === 0 || !isFinite(value)) return value;
  const absValue = Math.abs(value);

  // Determine rounding precision based on magnitude
  // For larger numbers, round to fewer decimal places
  if (absValue >= 1000) {
    // Round to nearest 10 for values >= 1000
    return Math.round(value / 10) * 10;
  } else if (absValue >= 100) {
    // Round to nearest integer for values >= 100
    return Math.round(value);
  } else if (absValue >= 10) {
    // Round to 1 decimal place for values >= 10
    return Math.round(value * 10) / 10;
  } else if (absValue >= 1) {
    // Round to 2 decimal places for values >= 1
    return Math.round(value * 100) / 100;
  } else {
    // For values < 1, use more precision
    const magnitude = Math.floor(Math.log10(absValue));
    const precision = Math.abs(magnitude) + 2;
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
};

/**
 * Safely format a number with null/NaN checks.
 * ECharts valueFormatters can receive null values from missing data points.
 */
const formatNumber = (
  value: number | null | undefined,
  format: ReturnType<typeof useFormatter>,
  options?: { maximumSignificantDigits?: number }
): string => {
  if (value == null || Number.isNaN(value)) return '';
  return format.number(value, options);
};

type GraphSettings = {
  totalLineColor?: string;
  categoryColors?: string[];
  goalLineColors?: string[];
  trendLineColor?: string;
  areaGraphs?: boolean;
  lineShape?: string;
  drawGoalLine?: boolean;
  roundIndicatorValue?: boolean;
};

const buildSeriesFromTraces = ({
  traces,
  colors,
  hasTimeDimension,
  useAreaGraph,
  lineShape,
  valueRounding,
  format,
}: {
  traces: ChartTrace[];
  colors: {
    totalLine: string;
    categoryColors: string[];
  };
  hasTimeDimension: boolean;
  useAreaGraph: boolean;
  lineShape: string;
  valueRounding?: number;
  format: ReturnType<typeof useFormatter>;
}): Array<LineSeriesOption | BarSeriesOption> => {
  const traceCount = traces.length;
  return traces.map<LineSeriesOption | BarSeriesOption>((trace, idx) => {
    const color =
      trace.dataType === 'total'
        ? colors.totalLine
        : colors.categoryColors[idx % colors.categoryColors.length];

    // Use line chart for time dimension
    if (hasTimeDimension) {
      // Map x and y values together for time axis
      const data = trace.x.map((xVal, idx) => [xVal, trace.y[idx] ?? null]);
      const series: LineSeriesOption = {
        type: 'line',
        name: trace.name,
        data: data,
        connectNulls: true,
        showSymbol: trace.x.length <= 30,
        symbol: 'circle',
        symbolSize: 7,
        sampling: 'lttb',
        smooth: false && (lineShape === 'spline' || lineShape === 'smooth'), // TODO: remove false once we have a proper smooth line shape
        lineStyle: {
          width: trace.dataType === 'total' ? 3 : 2,
          color,
        },
        itemStyle: {
          color,
          borderWidth: 0,
        },
        z: 2,
        emphasis: {
          focus: 'series',
        },
        tooltip: {
          valueFormatter: (val: number | null) =>
            formatNumber(
              val,
              format,
              valueRounding ? { maximumSignificantDigits: valueRounding } : undefined
            ),
        },
      };

      if (traceCount === 1 && useAreaGraph) {
        series.areaStyle = {
          color: transparentize(0.8, color),
        };
      }

      return series;
    }

    const series: BarSeriesOption = {
      type: 'bar',
      name: trace.name,
      data: trace.y,
      barGap: '20%',
      itemStyle: {
        color,
      },
      emphasis: {
        focus: 'series',
      },
      tooltip: {
        valueFormatter: (val: number | null) =>
          formatNumber(
            val,
            format,
            valueRounding ? { maximumSignificantDigits: valueRounding } : undefined
          ),
      },
    };
    return series;
  });
};

function IndicatorGraph({
  yRange,
  timeResolution,
  traces,
  goalTraces,
  trendTrace,
  specification,
  title,
  nonQuantifiedGoal,
  referenceValue,
}: IndicatorGraphProps) {
  const theme = useTheme();
  const t = useTranslations();
  const format = useFormatter();
  const rawGraphSettings = theme.settings?.graphs;

  const graphSettings: GraphSettings = {
    totalLineColor:
      typeof rawGraphSettings?.totalLineColor === 'string'
        ? rawGraphSettings.totalLineColor
        : undefined,
    categoryColors: Array.isArray(rawGraphSettings?.categoryColors)
      ? rawGraphSettings.categoryColors.filter(
          (color): color is string => typeof color === 'string'
        )
      : undefined,
    goalLineColors: Array.isArray(rawGraphSettings?.goalLineColors)
      ? rawGraphSettings.goalLineColors.filter(
          (color): color is string => typeof color === 'string'
        )
      : undefined,
    trendLineColor:
      typeof rawGraphSettings?.trendLineColor === 'string'
        ? rawGraphSettings.trendLineColor
        : undefined,
    areaGraphs:
      typeof rawGraphSettings?.areaGraphs === 'boolean' ? rawGraphSettings.areaGraphs : undefined,
    lineShape:
      typeof rawGraphSettings?.lineShape === 'string' ? rawGraphSettings.lineShape : undefined,
    drawGoalLine:
      typeof rawGraphSettings?.drawGoalLine === 'boolean'
        ? rawGraphSettings.drawGoalLine
        : undefined,
    roundIndicatorValue:
      typeof rawGraphSettings?.roundIndicatorValue === 'boolean'
        ? rawGraphSettings.roundIndicatorValue
        : undefined,
  };

  const fallbackColor = graphSettings.totalLineColor || theme.brandDark || '#0070f3';
  const categoryColors =
    graphSettings.categoryColors && graphSettings.categoryColors.length > 0
      ? graphSettings.categoryColors
      : [fallbackColor];
  const goalColors =
    graphSettings.goalLineColors && graphSettings.goalLineColors.length > 0
      ? graphSettings.goalLineColors
      : [graphSettings.trendLineColor || fallbackColor];

  const colors = {
    totalLineColor: fallbackColor,
    categoryColors,
    goalColors,
    trendColor: graphSettings.trendLineColor || fallbackColor,
  };

  // Check if we have time-based data by looking at traces or goalTraces
  // If any trace has xType 'time' or if we have goalTraces with dates, use time dimension
  const hasTimeDimension = useMemo(() => {
    // Check specification axes
    if (specification.axes.some((axis) => axis[0] === 'time')) {
      return true;
    }
    // Check if any trace has xType 'time'
    if (traces.some((trace) => trace.xType === 'time')) {
      return true;
    }
    // If we have goalTraces with dates, we should use time dimension
    if (goalTraces.length > 0 && goalTraces.some((goal) => goal.x.length > 0)) {
      return true;
    }
    // If we have traces with dates, use time dimension (even for single datapoint)
    if (traces.length > 0 && traces[0].x.length > 0) {
      // Check if x values look like dates (strings that can be parsed as dates)
      const firstX = traces[0].x[0];
      if (typeof firstX === 'string' && !Number.isNaN(new Date(firstX).getTime())) {
        return true;
      }
      if (typeof firstX === 'number' && firstX > 1900 && firstX < 2100) {
        // Likely a year
        return true;
      }
    }
    return false;
  }, [specification.axes, traces, goalTraces]);

  const useAreaGraph = graphSettings.areaGraphs === true;
  const lineShape = graphSettings.lineShape ?? 'spline';

  const chartHeight = 450 + (!hasTimeDimension ? CATEGORY_XAXIS_LABEL_EXTRA_MARGIN : 0);

  // Collect all unique dates from both value traces and goal traces
  const allDates = useMemo(() => {
    if (!hasTimeDimension) {
      // For non-time dimension, return category data
      return traces.length > 0 ? traces[0].x : [];
    }

    // Normalize dates to ensure consistent format for deduplication
    const normalizeDateForSet = (d: string | number): string => {
      if (typeof d === 'number') {
        // If it's a number (likely a year), convert to YYYY-1-1 format
        if (d > 1900 && d < 2100) {
          return `${d}-1-1`;
        }
        return String(d);
      }
      // If it's already a date string, use it as-is
      const dateObj = new Date(d);
      if (Number.isNaN(dateObj.getTime())) {
        return String(d);
      }
      // For YEAR resolution, ensure format is YYYY-1-1
      if (timeResolution === 'YEAR') {
        return `${dateObj.getFullYear()}-1-1`;
      }
      return d;
    };

    const dateSet = new Set<string>();
    // Add dates from value traces
    traces.forEach((trace) => {
      trace.x.forEach((date) => {
        if (date != null) {
          dateSet.add(normalizeDateForSet(date));
        }
      });
    });
    // Add dates from goal traces
    goalTraces.forEach((goalTrace) => {
      goalTrace.x.forEach((date) => {
        if (date != null) {
          dateSet.add(normalizeDateForSet(date));
        }
      });
    });

    // Convert to array and sort
    const datesArray = Array.from(dateSet);
    datesArray.sort((a, b) => {
      const dateA = new Date(a).getTime();
      const dateB = new Date(b).getTime();
      if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
        return String(a).localeCompare(String(b));
      }
      return dateA - dateB;
    });

    // Extend to nonQuantifiedGoalDate if needed (for directional goal arrow)
    if (nonQuantifiedGoal?.trend && nonQuantifiedGoal?.date && timeResolution === 'YEAR') {
      // Normalize the date to YYYY-1-1 format for YEAR resolution
      const goalDateObj = new Date(nonQuantifiedGoal.date);
      if (!Number.isNaN(goalDateObj.getTime())) {
        const goalYear = goalDateObj.getFullYear();
        const planEndDate = `${goalYear}-1-1`;
        if (!datesArray.includes(planEndDate)) {
          datesArray.push(planEndDate);
          datesArray.sort((a, b) => {
            const dateA = new Date(a).getTime();
            const dateB = new Date(b).getTime();
            if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
              return String(a).localeCompare(String(b));
            }
            return dateA - dateB;
          });
        }
      }
    }

    return datesArray;
  }, [
    hasTimeDimension,
    traces,
    goalTraces,
    timeResolution,
    nonQuantifiedGoal?.trend,
    nonQuantifiedGoal?.date,
  ]);

  // Create category labels - either from traces or from formatted time data
  const xAxisCategories = useMemo(() => {
    if (!hasTimeDimension && traces.length > 0) {
      return traces[0].x.map((value) => String(value));
    }

    if (hasTimeDimension && allDates.length > 0) {
      // Format time values and deduplicate consecutive labels
      const formattedLabels: string[] = [];

      allDates.forEach((value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          formattedLabels.push(String(value));
          return;
        }

        let formattedValue: string;
        if (timeResolution === 'YEAR') {
          formattedValue = String(date.getFullYear());
        } else if (timeResolution === 'MONTH') {
          formattedValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        } else {
          formattedValue = date.toISOString().split('T')[0];
        }

        // Only add label if it's different from the previous one
        if (
          formattedLabels.length === 0 ||
          formattedLabels[formattedLabels.length - 1] !== formattedValue
        ) {
          formattedLabels.push(formattedValue);
        } else {
          // Add empty string to maintain index alignment, but ECharts will hide duplicates
          formattedLabels.push('');
        }
      });

      return formattedLabels;
    }

    return [];
  }, [hasTimeDimension, traces, timeResolution, allDates]);

  // Check if all dates are in the same year (for YEAR resolution)
  const hasSingleYear = useMemo(() => {
    if (!hasTimeDimension || timeResolution !== 'YEAR' || allDates.length === 0) {
      return false;
    }
    const years = new Set<number>();
    allDates.forEach((date) => {
      const dateObj = new Date(date);
      if (!Number.isNaN(dateObj.getTime())) {
        years.add(dateObj.getFullYear());
      }
    });
    return years.size === 1;
  }, [hasTimeDimension, timeResolution, allDates]);

  const option = useMemo<ECOption>(() => {
    // Normalize dates for consistent comparison (shared helper)
    const normalizeDateForComparison = (d: string | number): string => {
      if (typeof d === 'number') {
        if (d > 1900 && d < 2100) {
          return `${d}-1-1`;
        }
        return String(d);
      }
      const dateObj = new Date(d);
      if (Number.isNaN(dateObj.getTime())) {
        return String(d);
      }
      if (timeResolution === 'YEAR') {
        return `${dateObj.getFullYear()}-1-1`;
      }
      return d;
    };

    // Map value traces to align with allDates array
    const alignedTraces = hasTimeDimension
      ? traces.map((trace) => {
          // Create a map of normalized trace dates to values
          const traceMap = new Map<string, number | null>();
          trace.x.forEach((date, i) => {
            const normalizedDate = normalizeDateForComparison(date);
            traceMap.set(normalizedDate, trace.y[i] ?? null);
          });

          // Map trace values to positions in allDates array
          // allDates already contains normalized dates (as strings), so we can match directly
          const alignedY = allDates.map((date) => {
            const dateStr = String(date);
            return traceMap.get(dateStr) ?? null;
          });

          return {
            ...trace,
            x: allDates.map((d) => String(d)),
            y: alignedY,
          };
        })
      : traces;

    const baseSeries = buildSeriesFromTraces({
      traces: alignedTraces,
      hasTimeDimension,
      useAreaGraph,
      lineShape,
      colors: {
        totalLine: colors.totalLineColor,
        categoryColors: colors.categoryColors,
      },
      valueRounding: graphSettings.roundIndicatorValue === false ? undefined : yRange.valueRounding,
      format,
    });

    // Add markArea for referenceValue if it exists and nonQuantifiedGoal is set
    if (referenceValue?.date && nonQuantifiedGoal?.trend && baseSeries.length > 0) {
      const firstSeries = baseSeries[0];
      if (hasTimeDimension) {
        // For time-based graphs, use the normalized date
        const normalizedRefDate = normalizeDateForComparison(referenceValue.date);
        firstSeries.markArea = {
          silent: true,
          itemStyle: {
            color: theme.graphColors.blue030,
            opacity: 0.1,
          },
          label: {
            position: [0, -15],
            fontSize: 11,
          },
          data: [
            [
              {
                xAxis: normalizedRefDate,
                yAxis: referenceValue.value,
              },
              {
                xAxis: 'max',
                yAxis:
                  nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase
                    ? yRange.range[1]
                    : yRange.range[0],
              },
            ],
          ],
        };
      } else {
        // For category-based graphs, find the index of the reference date
        const refDateIndex = xAxisCategories.findIndex(
          (cat) => cat === String(referenceValue.date)
        );
        if (refDateIndex >= 0) {
          firstSeries.markArea = {
            silent: true,
            itemStyle: {
              color: theme.graphColors.blue030,
              opacity: 0.1,
            },
            label: {
              position: [0, -15],
              fontSize: 11,
            },
            data: [
              [
                {
                  xAxis: refDateIndex,
                },
                {
                  xAxis: xAxisCategories.length - 1,
                },
              ],
            ],
          };
        }
      }
    }

    const markLines: MarkLineOption['data'] = [];

    // Add markLine (vertical line) for referenceValue if it exists
    if (referenceValue?.date && baseSeries.length > 0) {
      if (hasTimeDimension) {
        // For time-based graphs, use the normalized date
        const normalizedRefDate = normalizeDateForComparison(referenceValue.date);
        markLines.push({
          xAxis: normalizedRefDate,
          symbol: 'none',
          lineStyle: {
            color: theme.graphColors.grey030 || '#999999',
            width: 2,
            type: 'solid',
          },
          name: 'Reference Value',
          label: {
            formatter: `${new Date(referenceValue.date ?? '').getFullYear().toString()}: ${t('indicator-graph-reference-line')}`,
            position: 'insideEndBottom',
          },
        });
      }
    }

    // Add markLine (vertical line) for referenceValue if it exists
    if (nonQuantifiedGoal?.date && baseSeries.length > 0) {
      if (hasTimeDimension) {
        // For time-based graphs, use the normalized date
        const nonQuantifiedGoalDate = normalizeDateForComparison(nonQuantifiedGoal.date);
        const goalDirection = nonQuantifiedGoal.trend ? nonQuantifiedGoal.trend.toString() : '';
        const goalStartValue = referenceValue?.value
          ? referenceValue.value
          : nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase
            ? yRange.range[0]
            : yRange.range[1];
        const goalEndValue =
          nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase
            ? yRange.range[1]
            : yRange.range[0];
        markLines.push([
          {
            xAxis: nonQuantifiedGoalDate,
            yAxis: goalStartValue,
            lineStyle: {
              color: theme.graphColors.blue030 || '#999999',
              width: 2,
              type: 'solid',
            },
            symbol: 'none',
            name: 'Goal',
            label: {
              formatter: `${t('indicator-goal')} ${new Date(nonQuantifiedGoal.date ?? '').getFullYear().toString()}: ${t(`indicator-desired-trend-${goalDirection.toLowerCase()}`)}`,
              position: 'insideEndBottom',
            },
          },
          {
            xAxis: nonQuantifiedGoalDate,
            yAxis: goalEndValue,
            symbol: 'arrow',
          },
        ]);
      }
    }
    if (markLines.length > 0) {
      baseSeries[0].markLine = {
        silent: true,
        z: 1,
        symbol: ['none', 'none'],
        data: markLines,
      };
    }
    // Map goal values to the correct positions in the x-axis categories
    const goalSeries: LineSeriesOption[] = goalTraces.map((goalTrace, idx) => {
      // Normalize dates for consistent comparison
      const normalizeDateForComparison = (d: string | number): string => {
        if (typeof d === 'number') {
          if (d > 1900 && d < 2100) {
            return `${d}-1-1`;
          }
          return String(d);
        }
        const dateObj = new Date(d);
        if (Number.isNaN(dateObj.getTime())) {
          return String(d);
        }
        if (timeResolution === 'YEAR') {
          return `${dateObj.getFullYear()}-1-1`;
        }
        return d;
      };

      // Create a map of normalized goal dates to values
      const goalMap = new Map<string, number | null>();
      goalTrace.x.forEach((date, i) => {
        const normalizedDate = normalizeDateForComparison(date);
        goalMap.set(normalizedDate, goalTrace.y[i] ?? null);
      });

      // Map goal values to positions in allDates array
      // allDates already contains normalized dates (as strings), so we can match directly
      const goalData = allDates.map((date) => {
        const dateStr = String(date);
        const value = goalMap.get(dateStr) ?? null;
        return [dateStr, value];
      });

      return {
        type: 'line',
        name: goalTrace.name,
        data: goalData,
        showSymbol: true,
        symbolSize: 11,
        lineStyle: {
          width: graphSettings.drawGoalLine ? 2 : 0,
          type: graphSettings.drawGoalLine ? 'dashed' : 'dotted',
          color: colors.goalColors[idx % colors.goalColors.length],
        },
        itemStyle: {
          color: colors.goalColors[idx % colors.goalColors.length],
        },
        opacity: 0.8,
        connectNulls: true,
        z: 1,
        tooltip: {
          valueFormatter: (val: number | null) =>
            formatNumber(
              val,
              format,
              yRange.valueRounding ? { maximumSignificantDigits: yRange.valueRounding } : undefined
            ),
        },
      };
    });

    // Map trend trace to align with allDates array
    const trendSeries: LineSeriesOption[] =
      trendTrace && hasTimeDimension
        ? (() => {
            // Create a map of normalized trend dates to values
            const trendMap = new Map<string, number | null>();
            trendTrace.x.forEach((date, i) => {
              const normalizedDate = normalizeDateForComparison(date);
              trendMap.set(normalizedDate, trendTrace.y[i] ?? null);
            });

            // Map trend values to positions in allDates array
            // allDates already contains normalized dates (as strings), so we can match directly
            const trendData = allDates.map((date) => {
              const dateStr = String(date);
              const value = trendMap.get(dateStr) ?? null;
              return [dateStr, value];
            });

            return [
              {
                type: 'line',
                name: trendTrace.name,
                data: trendData,
                symbol: 'none',
                lineStyle: {
                  width: 3,
                  color: colors.trendColor,
                  type: 'dotted',
                },
                itemStyle: {
                  color: colors.trendColor,
                  opacity: 0,
                },
                emphasis: {
                  disabled: true,
                },
                tooltip: {
                  valueFormatter: (val: number | null) =>
                    formatNumber(
                      val,
                      format,
                      yRange.valueRounding
                        ? { maximumSignificantDigits: yRange.valueRounding }
                        : undefined
                    ),
                },
              },
            ];
          })()
        : trendTrace
          ? [
              {
                type: 'line',
                name: trendTrace.name,
                data: trendTrace.y,
                showSymbol: false,
                symbol: 'none',
                lineStyle: {
                  width: 3,
                  color: colors.trendColor,
                  type: 'dashed',
                },
                emphasis: {
                  disabled: true,
                },
                tooltip: {
                  valueFormatter: (val: number | null) =>
                    formatNumber(
                      val,
                      format,
                      yRange.valueRounding
                        ? { maximumSignificantDigits: yRange.valueRounding }
                        : undefined
                    ),
                },
              },
            ]
          : [];

    const wrappedTitle = title ? wrapTitle(title, TITLE_WIDTH) : null;
    const titleLines = wrappedTitle ? wrappedTitle.split('\n').length : 0;
    const extraLines = titleLines - 1;
    const gridTop = 65 + extraLines * 24;

    const option: ECOption = {
      title: {
        text: wrappedTitle ?? undefined,
        subtext: yRange.unit,
        left: '24',
        right: '24',
        top: 10,
        padding: [0, 0, 48, 0],
        itemGap: 5,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: theme.themeColors.dark,
        },
      },
      color: colors.categoryColors,
      legend: {
        orient: 'horizontal',
        right: 10,
        bottom: 10,
        data: [
          ...baseSeries
            .map((s) => s.name)
            .filter((name): name is string => typeof name === 'string'),
          ...goalSeries
            .map((s) => s.name)
            .filter((name): name is string => typeof name === 'string'),
          ...(trendTrace && trendTrace.name ? [trendTrace.name] : []),
        ],
      },
      grid: {
        left: '24',
        right: '24',
        bottom: 100,
        top: gridTop,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: hasTimeDimension ? 'line' : 'shadow',
        },
        valueFormatter: (value: number | null) =>
          formatNumber(
            value,
            format,
            yRange.valueRounding ? { maximumSignificantDigits: yRange.valueRounding } : undefined
          ),
        formatter: hasTimeDimension
          ? (params: unknown) => {
              if (!Array.isArray(params) || params.length === 0) return '';
              const firstParam = params[0] as { axisValue?: number | string };
              const axisValue = firstParam.axisValue;
              if (axisValue == null) return '';

              // Format the date based on timeResolution
              let formattedDate: string;
              if (timeResolution === 'YEAR') {
                const date = new Date(axisValue);
                formattedDate = String(date.getFullYear());
              } else if (timeResolution === 'MONTH') {
                const date = new Date(axisValue);
                formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
              } else {
                const date = new Date(axisValue);
                formattedDate = date.toISOString().split('T')[0];
              }

              // Build tooltip content
              let result = `${formattedDate}<br/>`;
              params.forEach((param: unknown) => {
                const typedParam = param as {
                  seriesName?: string;
                  value?: number | [string | number, number | null];
                  marker?: string;
                };
                if (!typedParam.seriesName) return;

                // Skip trend series in tooltip
                if (trendTrace && typedParam.seriesName === trendTrace.name) {
                  return;
                }

                // Extract value - could be number or [date, value] array
                let value: number | null = null;
                if (Array.isArray(typedParam.value)) {
                  value = typedParam.value[1];
                } else if (typeof typedParam.value === 'number') {
                  value = typedParam.value;
                }

                if (value !== null && value !== undefined && !Number.isNaN(value)) {
                  const formattedValue = formatNumber(
                    value,
                    format,
                    yRange.valueRounding
                      ? { maximumSignificantDigits: yRange.valueRounding }
                      : undefined
                  );
                  result += `${typedParam.marker || ''} ${typedParam.seriesName}: ${formattedValue} ${yRange.unit}<br/>`;
                }
              });
              return result;
            }
          : undefined,
      },
      xAxis: hasTimeDimension
        ? (() => {
            // For single year case, we need to track the year range to show only middle label
            const yearRange =
              hasSingleYear && timeResolution === 'YEAR' && allDates.length > 0
                ? (() => {
                    const timestamps = allDates
                      .map((d) => new Date(d).getTime())
                      .filter((t) => !Number.isNaN(t));
                    return {
                      min: Math.min(...timestamps),
                      max: Math.max(...timestamps),
                      year: new Date(timestamps[0]).getFullYear(),
                    };
                  })()
                : null;

            return {
              type: 'time',
              axisLabel: {
                hideOverlap: true,
                showMinLabel: hasSingleYear ? false : true,
                showMaxLabel: hasSingleYear ? false : true,
                formatter: (value: number) => {
                  const date = new Date(value);
                  if (timeResolution === 'YEAR') {
                    // For single year case, only show label for ticks near the middle
                    if (yearRange) {
                      const timestamp = date.getTime();
                      const range = yearRange.max - yearRange.min;
                      const position = (timestamp - yearRange.min) / range;
                      // Only show label if tick is in the middle 40% of the range (30% to 70%)
                      if (position < 0.3 || position > 0.7) {
                        return '';
                      }
                    }
                    return String(date.getFullYear());
                  } else if (timeResolution === 'MONTH') {
                    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                  }
                  return date.toISOString().split('T')[0];
                },
              },
              // Configure time axis to show appropriate intervals
              ...(timeResolution === 'YEAR'
                ? {
                    // For year resolution, show one tick per year
                    minInterval: 31536000000, // 1 year in milliseconds
                  }
                : {}),
            };
          })()
        : {
            type: 'category',
            data: xAxisCategories,
            boundaryGap: undefined,
            axisLabel: {
              interval: 0,
              rotate: xAxisCategories.length > 6 ? 45 : 0,
              formatter: (value: string) => (value === '' ? '' : value),
            },
          },
      yAxis: {
        type: 'value',
        name: undefined,
        nameTextStyle: {
          align: 'left',
        },
        min:
          yRange.range[0] != null
            ? yRange.range[0]
            : yRange.includeZero
              ? (value: { min: number }) => (value.min > 0 ? 0 : value.min)
              : undefined,
        max: yRange.range[1] != null ? yRange.range[1] : undefined,
        axisLabel: {
          formatter: (value: number) => {
            // Round tick values more aggressively for cleaner labels
            const roundedValue = roundTickValue(value);
            const rounding = yRange.ticksRounding ?? yRange.valueRounding;
            return formatNumber(
              roundedValue,
              format,
              rounding ? { maximumSignificantDigits: rounding } : undefined
            );
          },
        },
      },
      series: [...baseSeries, ...trendSeries, ...goalSeries],
    };

    return option;
  }, [
    traces,
    allDates,
    hasTimeDimension,
    hasSingleYear,
    useAreaGraph,
    lineShape,
    colors.categoryColors,
    colors.goalColors,
    colors.totalLineColor,
    colors.trendColor,
    goalTraces,
    graphSettings.drawGoalLine,
    timeResolution,
    yRange.includeZero,
    yRange.range,
    yRange.ticksRounding,
    yRange.unit,
    yRange.valueRounding,
    graphSettings.roundIndicatorValue,
    trendTrace,
    xAxisCategories,
    title,
    theme.themeColors.dark,
    nonQuantifiedGoal?.trend,
    nonQuantifiedGoal?.date,
    referenceValue,
    theme.graphColors.blue030,
    theme.graphColors.grey030,
    format,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const event = new Event('indicator_graph_ready');
    document.dispatchEvent(event);
  }, [option]);

  if (!traces.length && !goalTraces.length) {
    return null;
  }

  return (
    <PlotContainer data-element="indicator-graph-plot-container" $vizHeight={chartHeight}>
      <Chart data={option} isLoading={false} height={`${chartHeight}px`} />
    </PlotContainer>
  );
}

export default IndicatorGraph;
