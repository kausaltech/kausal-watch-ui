import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Container, Row, Col } from 'reactstrap';

import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';

import { useTranslation } from 'common/i18n';
import { mapActionStatusSummaries } from 'common/preprocess';
import ActionStatusGraphs from 'components/dashboard/ActionStatusGraphs';

const GET_ACTION_LIST_FOR_GRAPHS = gql`
query GetActionListForGraphs($plan: ID!) {
  planActions(plan: $plan) {
    statusSummary {
      identifier
    }
    timeliness {
      identifier
    }
    implementationPhase {
      identifier
      name
    }
  }
}
`

const ActionStatusGraphsBlock = () => {
  const plan = useContext(PlanContext);
  const { t } = useTranslation()
  const { loading, error, data } = useQuery(GET_ACTION_LIST_FOR_GRAPHS, {
    variables: {
      plan: plan.identifier,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  return <Container><Row><Col xl={{size: 8, offset: 2}} lg={{ size: 10, offset: 1}}>
    <ActionStatusGraphs actions={mapActionStatusSummaries(planActions, plan.actionStatusSummaries)} />;
  </Col></Row></Container>
}

export default ActionStatusGraphsBlock;
