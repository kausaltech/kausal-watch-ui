import { type TypedDocumentNode, gql } from '@apollo/client';

import {
  type ActionListPageIncludeRelatedQuery,
  type ActionListPageIncludeRelatedQueryVariables,
  type ActionListPageQuery,
  type ActionListPageQueryVariables,
} from '@/common/__generated__/graphql';

import { ALL_ACTION_LIST_FILTERS } from '../fragments/action-list.fragment';
import { getClient } from '../utils/apollo-rsc-client';

const GET_INCLUDE_RELATED_ACTIONS: TypedDocumentNode<
  ActionListPageIncludeRelatedQuery,
  ActionListPageIncludeRelatedQueryVariables
> = gql`
  query ActionListPageIncludeRelated($plan: ID!) {
    plan(id: $plan) {
      id
      actionListPage {
        id
        includeRelatedPlans
      }
    }
  }
`;

export const getIncludeRelatedActions = async (plan: string) =>
  await (
    await getClient()
  ).query({
    query: GET_INCLUDE_RELATED_ACTIONS,
    variables: { plan },
    fetchPolicy: 'no-cache',
  });

const GET_ACTIONS_LIST_PAGE: TypedDocumentNode<ActionListPageQuery, ActionListPageQueryVariables> =
  gql`
    query ActionListPage($plan: ID!, $onlyWithActions: Boolean!) {
      plan(id: $plan) {
        id
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
  ).query({
    query: GET_ACTIONS_LIST_PAGE,
    variables: {
      plan,
      onlyWithActions: excludeCategoriesWithoutActions,
    },
    fetchPolicy: 'no-cache',
  });
