import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';
import { useTheme } from 'styled-components';

import type {
  GetActionListForGraphsQuery,
  GetActionListForGraphsQueryVariables,
} from '@/common/__generated__/graphql';
import type { CommonContentBlockProps } from '@/common/blocks.types';
import ContentLoader from '@/components/common/ContentLoader';
import ErrorMessage from '@/components/common/ErrorMessage';
import type { ActionsStatusGraphsProps } from '@/components/dashboard/ActionStatusGraphs';
import ActionStatusGraphs from '@/components/dashboard/ActionStatusGraphs';
import { usePlan } from '@/context/plan';

const GET_ACTION_LIST_FOR_GRAPHS = gql`
  query GetActionListForGraphs($plan: ID!, $categoryId: ID) {
    planActions(plan: $plan, category: $categoryId) {
      color
      scheduleContinuous
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

interface Props
  extends CommonContentBlockProps,
    Pick<ActionsStatusGraphsProps, 'chart' | 'shownDatasets'> {
  categoryId?: string;
}

const ActionStatusGraphsBlock = (props: Props) => {
  const { id = '', categoryId, columnProps, ...graphsProps } = props;
  const plan = usePlan();
  const t = useTranslations();
  const theme = useTheme();

  // add plan.feature.showActionUpdateStatus to backend
  const showUpdateStatus =
    theme.settings.dashboard?.showActionUpdateStatus === false ? false : true;

  const { loading, error, data } = useQuery<
    GetActionListForGraphsQuery,
    GetActionListForGraphsQueryVariables
  >(GET_ACTION_LIST_FOR_GRAPHS, {
    variables: {
      plan: plan.identifier,
      categoryId,
    },
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading || !data) return <ContentLoader />;
  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  return (
    <Container id={id}>
      <Row>
        <Col xl={{ size: 8, offset: 2 }} lg={{ size: 10, offset: 1 }} {...columnProps}>
          <ActionStatusGraphs
            actions={planActions}
            shownDatasets={{
              phase: true,
              progress: true,
              timeliness: showUpdateStatus,
            }}
            {...graphsProps}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ActionStatusGraphsBlock;
