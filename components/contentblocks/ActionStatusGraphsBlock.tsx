import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Container, Row, Col } from 'reactstrap';

import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import ActionStatusGraphs, {
  ActionsStatusGraphsProps,
} from 'components/dashboard/ActionStatusGraphs';
import { CommonContentBlockProps } from 'common/blocks.types';

const GET_ACTION_LIST_FOR_GRAPHS = gql`
  query GetActionListForGraphs($plan: ID!, $categoryId: ID) {
    planActions(plan: $plan, category: $categoryId) {
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

interface Props
  extends CommonContentBlockProps,
    Pick<ActionsStatusGraphsProps, 'chart' | 'shownDatasets'> {
  categoryId?: string;
}

const ActionStatusGraphsBlock = ({
  id = '',
  categoryId,
  columnProps,
  ...graphsProps
}: Props) => {
  const plan = useContext(PlanContext);
  const { t } = useTranslation();
  const theme = useTheme();

  // add plan.feature.showActionUpdateStatus to backend
  const showUpdateStatus =
    theme.settings.dashboard?.showActionUpdateStatus === false ? false : true;

  const { loading, error, data } = useQuery(GET_ACTION_LIST_FOR_GRAPHS, {
    variables: {
      plan: plan.identifier,
      categoryId,
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
        <Col
          xl={{ size: 8, offset: 2 }}
          lg={{ size: 10, offset: 1 }}
          {...columnProps}
        >
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
