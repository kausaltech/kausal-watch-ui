import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Container, Row, Col } from 'reactstrap';

import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import ActionStatusGraphs from 'components/dashboard/ActionStatusGraphs';
import { CommonContentBlockProps } from 'common/blocks.types';

const GET_ACTION_LIST_FOR_GRAPHS = gql`
  query GetActionListForGraphs($plan: ID!) {
    planActions(plan: $plan) {
      color
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
`;

const ActionStatusGraphsBlock = ({ id = '' }: CommonContentBlockProps) => {
  const plan = useContext(PlanContext);
  const { t } = useTranslation();
  const theme = useTheme();

  // add plan.feature.showActionUpdateStatus to backend
  const showUpdateStatus =
    theme.settings.dashboard?.showActionUpdateStatus === false ? false : true;

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
  return (
    <Container id={id}>
      <Row>
        <Col xl={{ size: 8, offset: 2 }} lg={{ size: 10, offset: 1 }}>
          <ActionStatusGraphs
            actions={planActions}
            showUpdateStatus={showUpdateStatus}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ActionStatusGraphsBlock;
