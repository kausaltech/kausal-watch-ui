import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  AdaptationLinkedActionQuery,
  AdaptationLinkedActionQueryVariables,
} from '@/common/__generated__/graphql';
import { getClient } from '@/utils/apollo-rsc-client';

const GET_LINKED_ACTION: TypedDocumentNode<
  AdaptationLinkedActionQuery,
  AdaptationLinkedActionQueryVariables
> = gql`
  query AdaptationLinkedAction($plan: ID!, $identifier: ID!) {
    action(plan: $plan, identifier: $identifier) {
      id
      identifier
      name
      statusSummary {
        identifier
        label
      }
      primaryOrg {
        id
        name
      }
      mergedWith {
        id
        identifier
      }
    }
  }
`;

export type LinkedAction = NonNullable<AdaptationLinkedActionQuery['action']>;

/** An action of the plan that responds to a hazard, with its own owner and status. */
export const getLinkedAction = async (plan: string, identifier: string) =>
  await (
    await getClient()
  ).query({
    query: GET_LINKED_ACTION,
    variables: { plan, identifier },
    fetchPolicy: 'no-cache',
  });
