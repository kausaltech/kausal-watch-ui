import { gql } from '@apollo/client';

import {
  type GetPlanPageIndicatorListQuery,
  type GetPlanPageIndicatorListQueryVariables,
} from '@/common/__generated__/graphql';
import { apolloQuery } from '../utils/apollo-rsc-client';

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
  await apolloQuery<
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
