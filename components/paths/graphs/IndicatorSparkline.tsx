import React from 'react';

import type { DatasetComponentOption } from 'echarts/components';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import {
  IndicatorGoal,
  IndicatorGraphDataQuery,
  IndicatorValue,
} from '@/common/__generated__/graphql';
import Icon from '@/components/common/Icon';
import PopoverTip from '@/components/common/PopoverTip';
import Unit from '@/components/indicators/Unit';
import Chart, { ECOption } from '@/components/paths/graphs/Chart';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/utils/indicatorData';
import { useQuery } from '@apollo/client';

const IndicatorSparklineContainer = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: ${({ theme }) =>
    `${theme.spaces.s050} ${theme.spaces.s100} ${theme.spaces.s100}`};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const SparkLineHeader = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const TrendIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.05rem;
  height: 1.05rem;
  background-color: ${(props) => props.theme.graphColors.green030};
  margin-right: ${(props) => props.theme.spaces.s050};
  border-radius: 50%;
`;

type IndicatorSparklineProps = {
  indicatorId: string;
};

const IndicatorSparkline = (props: IndicatorSparklineProps) => {
  const { indicatorId } = props;
  const theme = useTheme();
  const t = useTranslations();
  const plan = usePlan();
  const { loading, error, data } = useQuery<IndicatorGraphDataQuery>(
    GET_INDICATOR_GRAPH_DATA,
    {
      variables: {
        id: indicatorId,
        plan: plan.identifier,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const indicator = data?.indicator;
  if (!indicator) return null;

  const { maxValue, minValue, desiredTrend } = indicator;

  const indicatorGoals:
    | Array<IndicatorGoal | null | undefined>
    | null
    | undefined = indicator.goals || [];
  const indicatorValues:
    | Array<IndicatorValue | null | undefined>
    | null
    | undefined = indicator.values || [];

  interface CombinedDataItem {
    value?: number;
    goal?: number;
  }

  interface CombinedData {
    [date: string]: CombinedDataItem;
  }
  const combinedData: CombinedData = {};

  const items = [...(indicatorValues || []), ...(indicatorGoals || [])] as (
    | IndicatorValue
    | IndicatorGoal
    | null
    | undefined
  )[];
  items.forEach((item) => {
    if (!item) return;
    const date = item.date as string;
    if (!(date in combinedData)) {
      combinedData[date] = {};
    }
    if (item.__typename === 'IndicatorValue') {
      combinedData[date].value = item.value;
    } else if (item.__typename === 'IndicatorGoal') {
      combinedData[date].goal = item.value;
    }
  });

  //const sortedDates = Object.keys(combinedData).sort((a, b) => new Date(a) - new Date(b));

  const sortedDates = Object.keys(combinedData).sort(
    (a, b) => new Date(a as string).getTime() - new Date(b as string).getTime()
  );

  const dataset: DatasetComponentOption = {
    dimensions: ['date', 'value', 'goal'],
    source: sortedDates.map((date) => ({
      date: date,
      value: combinedData[date].value || null,
      goal: combinedData[date].goal || null,
    })),
  };

  const option: ECOption = {
    dataset: dataset,
    xAxis: {
      show: true,
      type: 'time',
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
        hideOverlap: true,
        formatter: function (value: number) {
          return new Date(value).getFullYear().toString();
        },
        fontSize: 10,
      },
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
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
        hideOverlap: true,
        inside: false,
        fontSize: 10,
        formatter: function (value: number) {
          return value.toLocaleString();
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
      interval: 'auto',
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
          color: theme.graphColors.blue050,
          width: 2,
        },
        z: 2,
      },
    ],
    grid: {
      left: 15,
      right: 15,
      top: 10,
      bottom: 5,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const date = params[0].value.date;
        const year = new Date(date).getFullYear();
        let result = `${t('table-year')}: ${year}<br/>`;
        params.forEach((param) => {
          const value = param.value[param.dimensionNames[param.encode.y]];
          if (value !== null) {
            result += `${param.seriesName}: ${value.toLocaleString()} ${
              indicator.unit.shortName || indicator.unit.name
            }<br/>`;
          }
        });
        return result;
      },
    },
  };

  return (
    <IndicatorSparklineContainer>
      <SparkLineHeader>
        {desiredTrend && (
          <TrendIconWrapper>
            <Icon
              name={desiredTrend === 'INCREASING' ? 'arrow-up' : 'arrow-down'}
            />
          </TrendIconWrapper>
        )}
        <Unit unit={indicator.unit} />{' '}
        <PopoverTip content={indicator.name} identifier={indicator.id} />
      </SparkLineHeader>

      <Chart data={option} isLoading={false} height="110px" />
    </IndicatorSparklineContainer>
  );
};

export default IndicatorSparkline;
