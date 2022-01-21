import { gql } from '@apollo/client';
import images from 'common/images';

export default gql`
query PlanContext($identifier: ID, $hostname: String) {
  plan(id: $identifier) {
    id
    identifier
    name
    primaryLanguage
    otherLanguages
    hideActionIdentifiers
    domain(hostname: $hostname) {
      id
      googleSiteVerificationTag
      matomoAnalyticsUrl
    }
    image { 
      ...MultiUseImageFragment
    }
    serveFileBaseUrl
    actionSchedules {
      id
      name
      beginsAt
      endsAt
    }
    actionImplementationPhases {
      id
      identifier
      name
      order
    }
    actionImpacts {
      id
      identifier
      name
      order
    }
    actionStatuses {
      id
      identifier
      name
      isCompleted
    }
    impactGroups {
      id
    }
    primaryOrgs {
      id
    }
    generalContent {
      id
      siteTitle
      siteDescription
      officialNameDescription
      copyrightText
      creativeCommonsLicense
      ownerUrl
      ownerName
    }
    mainMenu {
      items(withDescendants: true) {
        id
        linkText
        page {
          urlPath
          slug
        }
        parent {
          id
          page {
            __typename
          }
        }
      }
    }
    footer {
      items {
        id
        linkText
        page {
          urlPath
          slug
        }
        parent {
          id
          page {
            __typename
          }
        }
        children {
          __typename
          id
          linkText
          page {
            urlPath
            slug
          }
        }
      }
    }
    adminUrl
    accessibilityStatementUrl
  }
}
${images.fragments.multiUseImage}
`;
