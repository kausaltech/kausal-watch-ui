import { RECURSIVE_CATEGORY_FRAGMENT } from '@/fragments/category.fragment';
import { gql } from '@apollo/client';

export const ACTION_CARD_FRAGMENT = gql`
  fragment ActionCard on Action {
    id
    identifier
    name(hyphenated: true)
    viewUrl
    color
    scheduleContinuous
    status {
      id
      identifier
      name
      color
    }
    hasDependencyRelationships
    completion
    categories {
      ...CategoryRecursiveFragment
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
  ${RECURSIVE_CATEGORY_FRAGMENT}
`;
