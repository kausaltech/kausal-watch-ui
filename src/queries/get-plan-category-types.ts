import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  PlanCategoryTypesQuery,
  PlanCategoryTypesQueryVariables,
} from '@/common/__generated__/graphql';

export const GET_PLAN_CATEGORY_TYPES: TypedDocumentNode<
  PlanCategoryTypesQuery,
  PlanCategoryTypesQueryVariables
> = gql`
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
