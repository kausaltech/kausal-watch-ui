/* istanbul ignore file */
import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  RequestPlanAccessMutation,
  RequestPlanAccessMutationVariables,
} from '@/common/__generated__/graphql';

export const REQUEST_PLAN_ACCESS: TypedDocumentNode<
  RequestPlanAccessMutation,
  RequestPlanAccessMutationVariables
> = gql`
  mutation RequestPlanAccess($identifier: ID!, $email: String!)
  @context(input: { identifier: $identifier }) {
    requestPlanAccess(input: { email: $email }) {
      ok
    }
  }
`;
