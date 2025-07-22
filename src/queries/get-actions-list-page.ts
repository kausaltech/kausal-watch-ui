import { gql } from '@apollo/client';

import {
  GetActionListPageIncludeRelatedQuery,
  GetActionListPageIncludeRelatedQueryVariables,
  GetActionListPageQuery,
  GetActionListPageQueryVariables,
} from '@/common/__generated__/graphql';

import { ALL_ACTION_LIST_FILTERS } from '../fragments/action-list.fragment';
import { getClient } from '../utils/apollo-rsc-client';

const GET_INCLUDE_RELATED_ACTIONS = gql`
  query GetActionListPageIncludeRelated($plan: ID!) {
    plan(id: $plan) {
      actionListPage {
        includeRelatedPlans
      }
    }
  }
`;

export const getIncludeRelatedActions = async (plan: string) =>
  await (
    await getClient()
  ).query<GetActionListPageIncludeRelatedQuery, GetActionListPageIncludeRelatedQueryVariables>({
    query: GET_INCLUDE_RELATED_ACTIONS,
    variables: { plan },
    fetchPolicy: 'no-cache',
  });

const GET_ACTIONS_LIST_PAGE = gql`
  query GetActionListPage($plan: ID!, $onlyWithActions: Boolean!) {
    plan(id: $plan) {
      actionListPage {
        __typename
        id
        slug
        title
        ... on ActionListPage {
          leadContent
          defaultView
          headingHierarchyDepth
          includeRelatedPlans
          ...ActionListPageFilters
        }
        lastPublishedAt
      }
    }
  }
  ${ALL_ACTION_LIST_FILTERS}
`;

export const getActionsListPage = async (plan: string, excludeCategoriesWithoutActions: boolean) =>
  await (
    await getClient()
  ).query<GetActionListPageQuery, GetActionListPageQueryVariables>({
    query: GET_ACTIONS_LIST_PAGE,
    variables: {
      plan,
      onlyWithActions: excludeCategoriesWithoutActions,
    },
    fetchPolicy: 'no-cache',
  });
