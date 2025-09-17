import React, { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import type {
  GetActionListForBlockQuery,
  GetActionListForBlockQueryVariables,
} from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import ActionCard from '@/components/actions/ActionCard';
import ActionCardList from '@/components/actions/ActionCardList';
import ContentLoader from '@/components/common/ContentLoader';
import ErrorMessage from '@/components/common/ErrorMessage';
import { usePlan } from '@/context/plan';
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
      hasDependencyRelationships
    }
  }
  ${ActionCard.fragments.action}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0;
`;

export const SectionHeader = styled.h2`
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

type ActionListBlockProps = {
  id?: string;
  categoryId: string;
  heading?: string | null;
  lead?: string | null;
};

const ActionListBlock = (props: ActionListBlockProps) => {
  const { id = '', categoryId, heading, lead } = props;
  const t = useTranslations();

  const plan = usePlan();
  const { workflow, setLoading } = useWorkflowSelector();
  const { loading, error, data } = useQuery<
    GetActionListForBlockQuery,
    GetActionListForBlockQueryVariables
  >(GET_ACTION_LIST_FOR_BLOCK, {
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
  if (error) return <ErrorMessage message={error.message} />;
  if (loading || !data) return <ContentLoader />;

  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  const groupBy = plan.primaryOrgs.length > 0 ? 'primaryOrg' : 'none';

  const displayHeader = heading ? heading : t('actions', getActionTermContext(plan));
  return (
    <ActionListSection id={id}>
      <Container>
        {/* Terrible hack to be able to hide header completely if it's set to '-' */}
        {displayHeader && displayHeader !== '-' ? (
          <SectionHeader>{displayHeader}</SectionHeader>
        ) : null}
        <ActionCardList actions={planActions} groupBy={groupBy} showOtherCategory={false} />
      </Container>
    </ActionListSection>
  );
};

export default ActionListBlock;
