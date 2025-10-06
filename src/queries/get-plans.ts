/* istanbul ignore file */
import { gql } from '@apollo/client';

export const GET_PLANS_BY_HOSTNAME = gql`
  query GetPlansByHostname($hostname: String) {
    plansForHostname(hostname: $hostname) {
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
      ... on Plan {
        id
        identifier
        otherLanguages
      }
    }
  }
`;
