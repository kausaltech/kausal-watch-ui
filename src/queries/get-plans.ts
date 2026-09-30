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
        availability
        statusMessage
      }
      domains {
        id
        hostname
        redirectToHostname
        basePath
        availability
        statusMessage
      }
      identifier
      name
      themeIdentifier
      accessRequestsEnabled
      primaryLanguage
      statusMessage
      ... on Plan {
        id
        otherLanguages
      }
    }
  }
`;
