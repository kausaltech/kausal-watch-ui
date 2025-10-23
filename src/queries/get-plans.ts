/* istanbul ignore file */
import { gql } from '@apollo/client';

export const GET_PLANS_BY_HOSTNAME = gql`
  query GetPlansByHostname($hostname: String) {
    plansForHostname(hostname: $hostname) {
      __typename
      ... on PlanInterface {
        loginEnabled
        domain {
          hostname
          redirectToHostname
          basePath
          status
          statusMessage
        }
        domains {
          hostname
          redirectToHostname
          basePath
          status
          statusMessage
        }
        primaryLanguage
        statusMessage
        loginEnabled
      }
      ... on RestrictedPlanNode {
        loginEnabled
      }
      ... on Plan {
        id
        identifier
        otherLanguages
      }
    }
  }
`;
