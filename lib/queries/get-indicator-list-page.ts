import { gql } from '@apollo/client';
import { getClient } from '../apollo-client';
import {
  GetPlanPageIndicatorListQuery,
  GetPlanPageIndicatorListQueryVariables,
} from '@/common/__generated__/graphql';

const GET_INDICATOR_LIST_PAGE = gql`
  query GetPlanPageIndicatorList($plan: ID!, $path: String!) {
    planPage(plan: $plan, path: $path) {
      __typename
      id
      slug
      title
      ... on IndicatorListPage {
        leadContent
        displayInsights
      }
      lastPublishedAt
    }
  }
`;

export const getIndicatorListPage = async (plan: string) =>
  await getClient().query<
    GetPlanPageIndicatorListQuery,
    GetPlanPageIndicatorListQueryVariables
  >({
    query: GET_INDICATOR_LIST_PAGE,
    variables: {
      plan,
      path: '/indicators',
    },
    fetchPolicy: 'no-cache',
  });
