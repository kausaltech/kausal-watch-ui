/* istanbul ignore file */
import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  PlansByHostnameQuery,
  PlansByHostnameQueryVariables,
} from '@/common/__generated__/graphql';

export const GET_PLANS_BY_HOSTNAME: TypedDocumentNode<
  PlansByHostnameQuery,
  PlansByHostnameQueryVariables
> = gql`
  query PlansByHostname($hostname: String) {
    plansForHostname(hostname: $hostname) {
      domain {
        id
        hostname
        redirectToHostname
        basePath
        status
        statusMessage
      }
      domains {
        id
        hostname
        redirectToHostname
        basePath
        status
        statusMessage
      }
      primaryLanguage
      statusMessage
      loginEnabled
      ... on Plan {
        id
        identifier
        otherLanguages
      }
    }
  }
`;
