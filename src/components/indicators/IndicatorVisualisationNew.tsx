'use client';

import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { Alert } from 'reactstrap';
import { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

import type {
  IndicatorGraphDataQuery,
  IndicatorGraphDataQueryVariables,
} from '@/common/__generated__/graphql';
import ContentLoader from '@/components/common/ContentLoader';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/queries/get-indicator-graph-data';

import IndicatorGraph from './IndicatorGraphNew';
import IndicatorTable from './IndicatorTable';
import {
  generateCubeFromValues,
  generateGoalTraces,
  getEchartTraces,
} from './indicator-data-helpers';

type IndicatorVisualisationProps = {
  indicatorId: string;
  indicatorLink?: string;
};

function IndicatorVisualisation({ indicatorId, indicatorLink }: IndicatorVisualisationProps) {
  const plan = usePlan();
  //const enableIndicatorComparison = plan.features.enableIndicatorComparison === true;
  const t = useTranslations();
  const locale = useLocale();
  const theme = useTheme();
  const format = useFormatter();

  const { loading, error, data } = useQuery<
    IndicatorGraphDataQuery,
    IndicatorGraphDataQueryVariables
  >(GET_INDICATOR_GRAPH_DATA, {
    variables: {
      id: indicatorId,
      plan: plan.identifier,
    },
  });

  if (loading) return <ContentLoader />;
  if (error) return <Alert color="danger">{`${t('error')}: ${error.message}`}</Alert>;
  if (!data || !data.plan) return null;

  const {
    indicator,
    plan: { scenarios },
  } = data;

  console.log('indicator', indicator);
  console.log('scenarios', scenarios);
  if (!indicator) return <Alert color="danger">{t('indicator-not-found')}</Alert>;
  if (indicator.values.length === 0) return null;
  const cube = generateCubeFromValues(indicator, indicator.dimensions, indicator.values);
  console.log('cube', cube);

  const traces = getEchartTraces(
    indicator.dimensions.length > 0 ? indicator.dimensions[0].dimension : null,
    cube,
    t,
    theme
  );

  const [goalTraces, goalBounds] = generateGoalTraces(indicator, scenarios, t, theme);

  const allTraces = [...(traces || []), ...(goalTraces || [])];
  console.log('goalTraces', goalTraces);
  console.log('goalBounds', goalBounds);

  if (!traces || traces.length === 0)
    return (
      <div>
        <h4>Chart type not supported</h4>
      </div>
    );
  const option: ECOption = {
    title: {
      text: indicator.name,
      subtext: indicator.unit.shortName || indicator.unit.name,
      left: '75',
      top: 10,
      padding: [0, 0, 48, 0],
      itemGap: 5,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.themeColors.dark,
      },
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: allTraces,
    tooltip: {
      trigger: 'axis',
      formatter: function (params: CallbackDataParams) {
        const date = params[0].value.date as string;
        const year = new Date(date).getFullYear();
        let result = `${t('table-year')}: ${year}<br/>`;
        params.forEach((param) => {
          const value = param.value[param.dimensionNames[param.encode.y]];
          if (value !== null) {
            result += `${param.seriesName}: ${format.number(value as number, {
              maximumSignificantDigits: 2,
            })} ${indicator.unit.shortName || indicator.unit.name}<br/>`;
          }
        });
        return result;
      },
    },
  };
  console.log('option', option);
  return (
    <div>
      <div aria-hidden="true">
        <Chart data={option} isLoading={false} height="300px" />
      </div>
    </div>
  );
}

export default IndicatorVisualisation;
