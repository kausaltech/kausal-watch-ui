import React from 'react';

import type { DatasetComponentOption } from 'echarts/components';
import styled, { useTheme } from 'styled-components';

import {
  IndicatorGoal,
  IndicatorGraphDataQuery,
  IndicatorValue,
} from '@/common/__generated__/graphql';
import PopoverTip from '@/components/common/PopoverTip';
import Chart, { ECOption } from '@/components/paths/graphs/Chart';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/utils/indicatorData';
import { useQuery } from '@apollo/client';

const IndicatorSparklineContainer = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: 0% ${(props) => props.theme.spaces.s100};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  border-radius: 0.5rem;
`;

type IndicatorSparklineProps = {
  indicatorId: string;
};

const IndicatorSparkline = (props: IndicatorSparklineProps) => {
  const { indicatorId } = props;
  const theme = useTheme();
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
  //console.log('Indicator for sparkline', indicator);

  if (!indicator) return null;
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

  [...indicatorValues, ...indicatorGoals].forEach((item) => {
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
      show: false,
      type: 'category',
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        name: 'Value',
        type: 'line',
        encode: {
          x: 'date',
          y: 'value',
        },
        showSymbol: true,
        lineStyle: {
          color: '#5470c6',
        },
      },
      {
        name: 'Goal',
        type: 'line',
        encode: {
          x: 'date',
          y: 'goal',
        },
        showSymbol: true,
        symbol: 'diamond',
        symbolSize: 10,
        itemStyle: {
          color: 'rgba(145, 204, 117, 255)', // Faint green color for 'x' symbols
        },
        lineStyle: {
          color: 'rgba(145, 204, 117, 0.2)', // Very faint green color for the line
          type: 'dashed',
          width: 1,
        },
      },
    ],
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '10%',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const date = params[0].value.date;
        const year = new Date(date).getFullYear();
        let result = `Year: ${year}<br/>`;
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
      Main indicator{' '}
      <PopoverTip content={indicator.name} identifier={indicator.id} />
      <Chart data={option} isLoading={false} />
    </IndicatorSparklineContainer>
  );
};

export default IndicatorSparkline;