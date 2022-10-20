import React from 'react';
import { Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { getActionTermContext, useTranslation } from 'common/i18n';
import ActionCard from 'components/actions/ActionCard';
import ActionCardList from 'components/actions/ActionCardList';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import { usePlan } from 'context/plan';
import { GetActionListForBlockQuery } from 'common/__generated__/graphql';
import { constructCatHierarchy, mapActionCategories } from 'common/categories';

const GET_ACTION_LIST_FOR_BLOCK = gql`
query GetActionListForBlock($plan: ID!, $category: ID) {
  planActions(plan: $plan, category: $category) {
    ...ActionCard
  }
  plan(id: $plan) {
    id
    primaryActionClassification {
      id
      categories {
        id
        parent {
          id
        }
      }
    }
    secondaryActionClassification {
      id
      categories {
        id
        parent {
          id
        }
      }
    }
  }
}
${ActionCard.fragments.action}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.color};
  padding: ${(props) => props.theme.spaces.s600} 0 ${(props) => props.theme.spaces.s600};
`;

const SectionHeader = styled.h2`
  text-align: center;
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

type ActionListBlockProps = {
  categoryId: string,
  color?: string,
}

const ActionListBlock = (props: ActionListBlockProps) => {
  const { categoryId, color } = props;
  const { t } = useTranslation();
  const plan = usePlan();
  const { loading, error, data } = useQuery<GetActionListForBlockQuery>(GET_ACTION_LIST_FOR_BLOCK, {
    variables: {
      plan: plan.identifier,
      category: categoryId,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planActions, plan: queriedPlan } = data || {};
  if (!planActions || !queriedPlan) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  const cts = constructCatHierarchy([queriedPlan.primaryActionClassification]);
  const actions = mapActionCategories()

  const groupBy = plan.primaryOrgs.length > 0 ? 'primaryOrg' : 'none';

  const heading = t('actions', getActionTermContext(plan));
  return (
    <ActionListSection color={color}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Row>
          <ActionCardList
            actions={planActions}
            groupBy={groupBy}
          />
        </Row>
      </Container>
    </ActionListSection>
  );
};

export default ActionListBlock;
