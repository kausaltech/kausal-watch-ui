import { gql } from '@apollo/client';

export const GET_PLAN_CATEGORY_TYPES = gql`
  query GetPlanCategoryTypes($plan: ID!) {
    plan(id: $plan) {
      id
      categoryTypes(usableForIndicators: true) {
        id
        name
        identifier
      }
    }
  }
`;
