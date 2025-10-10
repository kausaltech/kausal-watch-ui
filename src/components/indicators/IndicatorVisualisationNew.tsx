'use client';

import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { useLocale, useTranslations } from 'next-intl';
import { Alert } from 'reactstrap';

import type {
  IndicatorGraphDataQuery,
  IndicatorGraphDataQueryVariables,
} from '@/common/__generated__/graphql';
import ContentLoader from '@/components/common/ContentLoader';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/queries/get-indicator-graph-data';

type IndicatorVisualisationProps = {
  indicatorId: string;
  indicatorLink?: string;
};

function IndicatorVisualisation({ indicatorId, indicatorLink }: IndicatorVisualisationProps) {
  const plan = usePlan();
  const enableIndicatorComparison = plan.features.enableIndicatorComparison === true;
  const t = useTranslations();
  const locale = useLocale();

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

  return (
    <div>
      <div aria-hidden="true">
        <h1>GRAPH HERE</h1>
      </div>
    </div>
  );
}

export default IndicatorVisualisation;
