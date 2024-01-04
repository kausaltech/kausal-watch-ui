import { gql } from '@apollo/client';

export const GET_PLANS_BY_HOSTNAME = gql`
  query GetPlansByHostname($hostname: String) {
    plansForHostname(hostname: $hostname) {
      domains {
        hostname
        basePath
        status
        statusMessage
      }
      primaryLanguage
      ... on Plan {
        id
        identifier
        otherLanguages
      }
    }
  }
`;
