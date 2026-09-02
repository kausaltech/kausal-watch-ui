import { gql } from '@apollo/client';

export const GET_PLAN_CATEGORY_TYPES = gql`
  query PlanCategoryTypes($plan: ID!) {
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
