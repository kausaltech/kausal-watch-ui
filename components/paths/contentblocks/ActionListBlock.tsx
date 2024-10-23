import React, { useState } from 'react';

import { getActionTermContext } from 'common/i18n';
import ActionCard from 'components/actions/ActionCard';
import ActionCardList from 'components/actions/ActionCardList';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import type {
  ActionCardFragment,
  Category,
  CategoryLevel,
  GetActionListForBlockQuery,
} from '@/common/__generated__/graphql';
import { getDeepParents } from '@/common/categories';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

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

const ActionTabs = styled.div`
  display: flex;
  max-width: 100%;
  overflow-x: auto;
`;

const ActionTab = styled.button<{
  $isActive: boolean;
  $isEnabled?: boolean;
}>`
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1 1 90px;
  margin-right: 5px;
  border: 1px solid ${(props) => props.theme.graphColors.grey020};
  border-top: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.graphColors.blue070
        : props.theme.graphColors.grey020};
  border-bottom: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.graphColors.grey000
        : props.theme.graphColors.grey010};
  padding: 0.75rem 0.75rem 1.25rem 0.75rem;
  text-align: left;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.cardBackground.primary : theme.cardBackground.secondary};

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.cardBackground.primary};
    border-top: 1px solid ${({ theme }) => theme.graphColors.blue070};
  }
`;

const DisabledActionTab = styled.button`
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1 1 90px;
  margin-right: 5px;
  padding: 0.75rem 0.75rem 1.25rem 0.75rem;
  text-align: left;
  border: 0;
  color: ${({ theme }) => theme.textColor.primary};
`;

const TabTitle = styled.h3`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizeBase};
  font-weight: 700;
  line-height: 1.2;

  div {
    margin-right: 6px;
  }
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

const actionsWithCategory = (
  actions: ActionCardFragment[],
  activeTab: string
) => {
  if (!activeTab) return actions;
  return actions.filter((action) =>
    action.categories.findIndex((cat) => cat.id === activeTab)
  );
};

const getParentCategoryOfLevel = (cat, levelId: string) => {
  const catParents = getDeepParents(cat);
  return catParents.find((parent) => parent.level.id === levelId);
};

type TabbedActionListProps = {
  actions: ActionCardFragment[];
  actionGroups: Category[];
};

const TabbedActionList = (props: TabbedActionListProps) => {
  const { actions, actionGroups } = props;
  const [activeTab, setActiveTab] = useState(actionGroups[0]?.id || 'null');

  return (
    <>
      {actionGroups.length > 1 && (
        <ActionTabs role="tablist" aria-labelledby="subactions">
          {actionGroups.map((groupCategory) => (
            <ActionTab
              role="tab"
              aria-selected={groupCategory.id === activeTab}
              aria-controls={`action-content-${groupCategory.id}`}
              id={`action-tab-${groupCategory.id}`}
              tabIndex={0}
              key={groupCategory.id}
              onClick={() => setActiveTab(groupCategory.id)}
              $isActive={groupCategory.id === activeTab}
            >
              <TabTitle>
                <div>{groupCategory.name}</div>
              </TabTitle>
            </ActionTab>
          ))}
        </ActionTabs>
      )}
      <ActionCardList
        actions={actionsWithCategory(actions, activeTab)}
        showOtherCategory={false}
      />
    </>
  );
};

type ActionListBlockProps = {
  heading?: string;
  lead?: string;
  groupByLevel?: CategoryLevel;
  categoryId: string;
};

const ActionListBlock = (props: ActionListBlockProps) => {
  const { categoryId, lead, heading, groupByLevel, id } = props;
  const t = useTranslations();

  const plan = usePlan();

  const { loading, error, data } = useQuery<GetActionListForBlockQuery>(
    GET_ACTION_LIST_FOR_BLOCK,
    {
      variables: {
        plan: plan.identifier,
        category: categoryId,
        clientUrl: plan.viewUrl,
      },
    }
  );

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planActions } = data;
  if (!planActions) {
    return <>NO ACTIONS</>;
  }

  const actionGroups: Category[] = [];

  if (groupByLevel)
    planActions.forEach((act) => {
      // Find the recursive category in action categories that matches the grouping category
      const categoryOfGroupLevel = act.categories.find(
        (cat) => cat.type.id === groupByLevel.type.id
      );
      // From that category, find the parent category of the grouping level
      const groupingCategory = getParentCategoryOfLevel(
        categoryOfGroupLevel,
        groupByLevel.id
      );

      if (
        groupingCategory &&
        actionGroups.findIndex((grp) => grp.id === groupingCategory.id) === -1
      )
        actionGroups.push(groupingCategory);
    });
  const displayHeading = heading || t('actions', getActionTermContext(plan));

  return (
    <ActionListSection id={id}>
      <Container>
        {heading && <SectionHeader>{displayHeading}</SectionHeader>}
        {planActions.length > 0 && (
          <TabbedActionList actions={planActions} actionGroups={actionGroups} />
        )}
      </Container>
    </ActionListSection>
  );
};

export default ActionListBlock;
