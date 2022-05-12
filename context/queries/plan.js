import { gql } from '@apollo/client';
import images from 'common/images';

export default gql`
query PlanContext($identifier: ID, $hostname: String, $clientUrl: String) {
  plan(id: $identifier) {
    id
    identifier
    name
    shortName
    themeIdentifier
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
    features {
      enableSearch
      hasActionIdentifiers
      hasActionOfficialName
      hasActionLeadParagraph
      hasActionPrimaryOrgs
      publicContactPersons
      showAdminLink
    }
    allRelatedPlans {
      id
      identifier
      name
      shortName
      image {
          rendition(size: "128x128", crop: true) {
            src
          }
        }
      organization {
        name
      }
      viewUrl(clientUrl: $clientUrl)
    }
    children {
      id
      identifier
      name
      shortName
      image {
          rendition(size: "128x128", crop: true) {
            src
          }
        }
      organization {
        name
      }
      viewUrl(clientUrl: $clientUrl)
    }
    parent {
      id
      identifier
      name
      shortName
      generalContent {
        id
        siteTitle
      }
      image {
          rendition(size: "128x128", crop: true) {
            src
          }
        }
      organization {
        name
      }
      viewUrl(clientUrl: $clientUrl)
    }
  }
}
${images.fragments.multiUseImage}
`;
