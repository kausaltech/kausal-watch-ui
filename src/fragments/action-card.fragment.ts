import { gql } from '@apollo/client';

import { RECURSIVE_CATEGORY_FRAGMENT } from '@/fragments/category.fragment';

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
        id
        rendition(size: "128x128", crop: true) {
          id
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
        id
        rendition(size: "128x128", crop: true) {
          id
          src
        }
      }
    }
  }
  ${RECURSIVE_CATEGORY_FRAGMENT}
`;
