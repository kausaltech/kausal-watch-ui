import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import type {
  GetActionListForGraphsQuery,
  GetActionListForGraphsQueryVariables,
} from '@/common/__generated__/graphql';
import type { CommonContentBlockProps } from '@/common/blocks.types';
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
  extends CommonContentBlockProps, Pick<ActionsStatusGraphsProps, 'chart' | 'shownDatasets'> {
  categoryId?: string;
  withContainer?: boolean;
}

const ActionStatusGraphsBlock = (props: Props) => {
  const { id = '', categoryId, columnProps, withContainer = true, ...graphsProps } = props;
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
      categoryId: categoryId ?? null,
    },
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading || !data) return <ContentLoader message={t('loading')} />;
  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  if (withContainer) {
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
  }

  return (
    <ActionStatusGraphs
      actions={planActions}
      shownDatasets={{ phase: true, progress: true, timeliness: showUpdateStatus }}
      {...graphsProps}
    />
  );
};

export default ActionStatusGraphsBlock;
