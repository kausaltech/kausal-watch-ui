import { gql } from '@apollo/client';
import { apolloQuery, getClient } from '../utils/apollo-rsc-client';
import { ALL_ACTION_LIST_FILTERS } from '../fragments/action-list.fragment';
import type {
  GetActionListPageIncludeRelatedQuery,
  GetActionListPageIncludeRelatedQueryVariables,
  GetActionListPageQuery,
  GetActionListPageQueryVariables,
} from '@/common/__generated__/graphql';

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
  await apolloQuery<
    GetActionListPageIncludeRelatedQuery,
    GetActionListPageIncludeRelatedQueryVariables
  >({
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

export const getActionsListPage = async (
  plan: string,
  excludeCategoriesWithoutActions: boolean
) =>
  await apolloQuery<GetActionListPageQuery, GetActionListPageQueryVariables>({
    query: GET_ACTIONS_LIST_PAGE,
    variables: {
      plan,
      onlyWithActions: excludeCategoriesWithoutActions,
    },
    fetchPolicy: 'no-cache',
  });
