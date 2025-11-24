import React from 'react';

import { useQuery } from '@apollo/client';
import type { DatasetComponentOption } from 'echarts/components';
import { useFormatter, useTranslations } from 'next-intl';
import ContentLoader from 'react-content-loader';
import styled, { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

import type {
  IndicatorSparklineGraphDataQuery,
  IndicatorSparklineGraphDataQueryVariables,
} from '@/common/__generated__/graphql';
import type { IndicatorCategoryRelationshipType } from '@/common/__generated__/graphql';
import { IndicatorDesiredTrend } from '@/common/__generated__/graphql';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/utils/indicatorData';

const SparklineLoader = (props: React.ComponentProps<typeof ContentLoader>) => (
  <ContentLoader
    speed={2}
    width={300}
    height={110}
    viewBox="0 0 300 110"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="39" y="113" rx="3" ry="3" width="243" height="8" />
    <rect x="25" y="15" rx="3" ry="3" width="9" height="93" />
    <rect x="43" y="17" rx="3" ry="3" width="73" height="18" />
  </ContentLoader>
);

const IndicatorSparklineContainer = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: ${({ theme }) => `${theme.spaces.s050} ${theme.spaces.s050} ${theme.spaces.s100}`};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const SparkLineHeader = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  margin-bottom: ${(props) => props.theme.spaces.s050};

  h3 {
    font-size: ${(props) => props.theme.fontSizeSm};
    font-family: ${(props) => props.theme.fontFamily};
    line-height: ${(props) => props.theme.lineHeightSm};
    margin-bottom: ${(props) => props.theme.spaces.s050};
  }
`;

const RelationshipType = styled.p`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamily};
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const PLAN_START_YEAR = 2022;
const PLAN_END_YEAR = 2040;

type IndicatorSparklineProps = {
  indicatorId: string;
  relationshipType: IndicatorCategoryRelationshipType;
};
// Extract types from the query result
type IndicatorValue = NonNullable<
  NonNullable<IndicatorSparklineGraphDataQuery['indicator']>['values']
>[number];
type IndicatorGoal = NonNullable<
  NonNullable<NonNullable<IndicatorSparklineGraphDataQuery['indicator']>['goals']>[number]
>;

const IndicatorSparkline = (props: IndicatorSparklineProps) => {
  const { indicatorId, relationshipType } = props;
  const theme = useTheme();
  const t = useTranslations();
  const format = useFormatter();
  const plan = usePlan();
  const { loading, error, data } = useQuery<
    IndicatorSparklineGraphDataQuery,
    IndicatorSparklineGraphDataQueryVariables
  >(GET_INDICATOR_GRAPH_DATA, {
    variables: {
      id: indicatorId,
      plan: plan.identifier,
    },
  });

  // console.log('data', data, props);
  if (loading)
    return (
      <IndicatorSparklineContainer>
        <SparklineLoader />
      </IndicatorSparklineContainer>
    );
  if (error) return <p>Error :(</p>;
  const indicator = data?.indicator;
  if (!indicator) return null;
  const { maxValue, minValue, desiredTrend } = indicator;

  const indicatorGoals: Array<IndicatorGoal | null> = indicator.goals || [];
  const indicatorValues: Array<IndicatorValue> = indicator.values || [];

  interface CombinedDataItem {
    value?: number;
    goal?: number;
  }

  interface CombinedData {
    [date: string]: CombinedDataItem;
  }
  const combinedData: CombinedData = {};

  const items: Array<IndicatorValue | IndicatorGoal | null> = [
    ...indicatorValues,
    ...indicatorGoals,
  ];

  items.forEach((item) => {
    if (!item) return;
    const date = item.date;
    if (!date) return;
    const year = new Date(date).getFullYear().toString();
    if (!(year in combinedData)) {
      combinedData[year] = {};
    }
    if (item.__typename === 'IndicatorValue') {
      combinedData[year].value = item.value;
    } else if (item.__typename === 'IndicatorGoal') {
      combinedData[year].goal = item.value;
    }
  });

  //const sortedDates = Object.keys(combinedData).sort((a, b) => new Date(a) - new Date(b));

  const sortedYears = Object.keys(combinedData).sort((a, b) => Number(a) - Number(b));

  // Check if there are goal values after the last indicator value
  let lastIndicatorValueYear: string | null = null;
  sortedYears.forEach((year) => {
    if (combinedData[year].value !== undefined && combinedData[year].value !== null) {
      lastIndicatorValueYear = year;
    }
  });

  const hasGoalsAfterLastValue = lastIndicatorValueYear
    ? sortedYears.some((year) => {
        const yearNum = Number(year);
        const lastValueYearNum = Number(lastIndicatorValueYear);
        return (
          yearNum > lastValueYearNum &&
          combinedData[year].goal !== undefined &&
          combinedData[year].goal !== null
        );
      })
    : false;

  // TODO: make this dynamic
  const allYears = Array.from({ length: PLAN_END_YEAR - PLAN_START_YEAR + 1 }, (_, i) =>
    (PLAN_START_YEAR + i).toString()
  );

  const dataset: DatasetComponentOption = {
    dimensions: ['date', 'value', 'goal'],
    source: sortedYears.map((year) => ({
      date: year,
      value: combinedData[year].value !== undefined ? combinedData[year].value : null,
      goal: combinedData[year].goal !== undefined ? combinedData[year].goal : null,
    })),
  };

  // Calculate actual min and max values from the data for y-axis label display
  const allValues: number[] = [];
  sortedYears.forEach((year) => {
    if (combinedData[year].value !== undefined && combinedData[year].value !== null) {
      allValues.push(combinedData[year].value);
    }
    if (combinedData[year].goal !== undefined && combinedData[year].goal !== null) {
      allValues.push(combinedData[year].goal);
    }
  });
  const dataMin = allValues.length > 0 ? Math.min(...allValues) : 0;
  const dataMax = allValues.length > 0 ? Math.max(...allValues) : 0;
  const actualMin = minValue ?? dataMin;
  const actualMax = maxValue === null ? dataMax : maxValue;

  const option: ECOption = {
    dataset: dataset,
    xAxis: {
      show: true,
      type: 'category',
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
        hideOverlap: false,
        fontSize: 10,
      },
      data: allYears,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      show: true,
      type: 'value',
      position: 'left',
      max: maxValue === null ? 'dataMax' : maxValue,
      min: minValue ?? 'dataMin',
      splitNumber: 1, // Only show min and max ticks
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
        hideOverlap: true,
        inside: false,
        fontSize: 10,
        formatter: function (value: number) {
          // Only show label if it's the min or max value
          const tolerance = Math.abs(actualMax - actualMin) * 0.001; // Small tolerance for floating point comparison
          if (Math.abs(value - actualMin) < tolerance || Math.abs(value - actualMax) < tolerance) {
            return format.number(value);
          }
          return '';
        },
        margin: 12,
        align: 'right',
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
        inside: false,
        length: 6,
      },
      axisLine: {
        show: false,
      },
      scale: maxValue === null && minValue === null,
    },
    series: [
      {
        name: t('target'),
        type: 'line',
        encode: {
          x: 'date',
          y: 'goal',
        },
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: theme.graphColors.green030,
        },
        lineStyle: {
          color: theme.graphColors.green030,
          type: 'dashed',
          width: 2,
        },
        connectNulls: true,
        z: 1,
      },
      {
        name: t('plot-total'),
        type: 'line',
        encode: {
          x: 'date',
          y: 'value',
        },
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: theme.graphColors.blue070,
          width: 2,
        },
        z: 2,
      },
    ],
    grid: {
      left: 15,
      right: 15,
      top: 15,
      bottom: 5,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: unknown) {
        if (!Array.isArray(params) || params.length === 0) return '';
        const firstParam = params[0] as {
          value?: { date?: string | number; value?: number | null; goal?: number | null };
          seriesName?: string;
        };
        const valueObj = firstParam.value;
        if (!valueObj || !valueObj.date) return '';
        const year = new Date(valueObj.date).getFullYear();
        let result = `${t('table-year')}: ${year}<br/>`;
        params.forEach((param: unknown) => {
          const typedParam = param as {
            value?: { date?: string | number; value?: number | null; goal?: number | null };
            seriesName?: string;
          };
          if (!typedParam.value || !typedParam.seriesName) return;
          // Extract the value based on which series it is (goal or value)
          const dataValue =
            typedParam.seriesName === t('target') ? typedParam.value.goal : typedParam.value.value;
          if (dataValue !== null && dataValue !== undefined && typeof dataValue === 'number') {
            result += `${typedParam.seriesName}: ${format.number(dataValue, {
              maximumSignificantDigits: 2,
            })} ${indicator.unit.shortName || indicator.unit.name}<br/>`;
          }
        });
        return result;
      },
    },
    graphic:
      !hasGoalsAfterLastValue && desiredTrend && lastIndicatorValueYear
        ? [
            {
              type: 'group',
              right: 24,
              top: '25%',
              children: [
                {
                  type: 'polygon',
                  shape: {
                    points:
                      desiredTrend === IndicatorDesiredTrend.Increasing
                        ? [
                            [0, -20],
                            [-20, 0],
                            [-10, 0],
                            [-10, 30],
                            [10, 30],
                            [10, 0],
                            [20, 0],
                          ]
                        : [
                            [0, 10],
                            [-20, -10],
                            [-10, -10],
                            [-10, -40],
                            [10, -40],
                            [10, -10],
                            [20, -10],
                          ],
                  },
                  style: {
                    fill: {
                      type: 'linear',
                      x: 0,
                      y: desiredTrend === IndicatorDesiredTrend.Increasing ? 0 : 1,
                      x2: 0,
                      y2: desiredTrend === IndicatorDesiredTrend.Increasing ? 1 : 0,
                      colorStops: [
                        { offset: 0, color: theme.graphColors.green030 },
                        { offset: 1, color: 'white' },
                      ],
                    },
                    stroke: theme.graphColors.green010,
                    lineWidth: 0,
                  },
                  z: 100,
                },
              ],
            },
          ]
        : undefined,
  };

  return (
    <IndicatorSparklineContainer>
      <SparkLineHeader>
        {/*desiredTrend && (
          <TrendIconWrapper>
            <Icon
              name={desiredTrend === IndicatorDesiredTrend.Increasing ? 'arrow-up' : 'arrow-down'}
            />
          </TrendIconWrapper>
        )*/}
        <RelationshipType>
          {t(`indicator-relationship-${relationshipType.toLowerCase()}`)}
        </RelationshipType>
        <h3>
          {indicator.name} ({indicator.unit.shortName || indicator.unit.name})
        </h3>
      </SparkLineHeader>

      <Chart data={option} isLoading={false} height="110px" withResizeLegend={false} />
    </IndicatorSparklineContainer>
  );
};

export default IndicatorSparkline;
