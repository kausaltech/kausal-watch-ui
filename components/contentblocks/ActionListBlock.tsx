import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { getActionTermContext } from 'common/i18n';
import ActionCard from 'components/actions/ActionCard';
import ActionCardList from 'components/actions/ActionCardList';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext, { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import { mapActionsToExpandDependencies } from '@/utils/actions.utils';
import { useWorkflowSelector } from '@/context/workflow-selector';

const GET_ACTION_LIST_FOR_BLOCK = gql`
  query GetActionListForBlock(
    $plan: ID!
    $category: ID
    $clientUrl: String
    $workflow: WorkflowState
  ) @workflow(state: $workflow) {
    planActions(plan: $plan, category: $category) {
      ...ActionCard
    }
  }
  ${ActionCard.fragments.action}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0;
`;

const SectionHeader = styled.h2`
  text-align: center;
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s300};
  font-size: ${(props) => props.theme.fontSizeLg};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const ActionListBlock = (props) => {
  const { id = '', categoryId, color } = props;
  const t = useTranslations();

  const plan = usePlan();
  const { workflow, setLoading } = useWorkflowSelector();
  const { loading, error, data } = useQuery(GET_ACTION_LIST_FOR_BLOCK, {
    variables: {
      plan: plan.identifier,
      category: categoryId,
      clientUrl: plan.viewUrl,
      workflow,
    },
  });
  useEffect(() => {
    if (!loading) setLoading(false);
  }, [loading]);
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  const groupBy = plan.primaryOrgs.length > 0 ? 'primaryOrg' : 'none';

  const actionsWithDependencies =
    planActions?.map(mapActionsToExpandDependencies) ?? [];

  const heading = t('actions', getActionTermContext(plan));
  return (
    <ActionListSection id={id}>
      <Container>
        {heading && <SectionHeader>{heading}</SectionHeader>}
        <ActionCardList
          actions={actionsWithDependencies}
          groupBy={groupBy}
          showOtherCategory={false}
        />
      </Container>
    </ActionListSection>
  );
};

ActionListBlock.propTypes = {
  id: PropTypes.string,
  categoryId: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default ActionListBlock;
