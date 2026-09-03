/* istanbul ignore file */
import { gql } from '@apollo/client';

export const GET_PLANS_BY_HOSTNAME = gql`
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
