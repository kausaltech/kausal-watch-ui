import { gql } from '@apollo/client';

export const ACTION_CARD_FRAGMENT = gql`
  fragment ActionCard on Action {
    id
    identifier
    name(hyphenated: true)
    viewUrl
    color
    status {
      id
      identifier
      name
      color
    }
    dependencyRole {
      id
      name
    }
    allDependencyRelationships {
      preceding {
        id
      }
      dependent {
        id
      }
    }
    completion
    categories {
      id
      identifier
      name
      iconSvgUrl
      type {
        id
      }
    }
    statusSummary {
      identifier
    }
    implementationPhase {
      id
      identifier
      name
    }
    primaryOrg {
      id
      abbreviation
      name
      logo {
        rendition(size: "128x128", crop: true) {
          src
        }
      }
    }
    mergedWith {
      id
      identifier
      plan {
        id
        shortName
        versionName
        viewUrl(clientUrl: $clientUrl)
      }
    }
    plan {
      id
      shortName
      versionName
      viewUrl(clientUrl: $clientUrl)
      hideActionIdentifiers
      publishedAt
      image {
        rendition(size: "128x128", crop: true) {
          src
        }
      }
    }
  }
`;
