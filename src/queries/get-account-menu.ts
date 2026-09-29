/* istanbul ignore file */
import { type TypedDocumentNode, gql } from '@apollo/client';

import type { AccountMenuQuery, AccountMenuQueryVariables } from '@/common/__generated__/graphql';

export const GET_ACCOUNT_MENU: TypedDocumentNode<AccountMenuQuery, AccountMenuQueryVariables> = gql`
  query AccountMenu($plan: ID!) {
    me {
      id
      email
      canAccessAdmin(plan: $plan)
    }
  }
`;
