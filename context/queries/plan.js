import { gql } from '@apollo/client';
import images from 'common/images';

export default gql`
query GetPlanContext($identifier: ID, $hostname: String, $clientUrl: String) {
  plan(id: $identifier) {
    ...PlanContext
  }
}
fragment PlanContext on Plan {
  id
  identifier
  name
  shortName
  versionName
  themeIdentifier
  primaryLanguage
  otherLanguages
  hideActionIdentifiers
  publishedAt
  viewUrl(clientUrl: $clientUrl)
  primaryActionClassification {
    id
    identifier
    hideCategoryIdentifiers
  }
  secondaryActionClassification {
    id
    identifier
  }
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
    actionTerm
  }
  mainMenu {
    items(withDescendants: true) {
      __typename
      ... on PageMenuItem {
        id
        page {
          title
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
      ... on ExternalLinkMenuItem {
        linkText
        url
      }
    }
  }
  footer {
    items {
      ... on PageMenuItem {
        id
        page {
          title
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
          page {
            title
            urlPath
            slug
          }
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
    enableIndicatorComparison
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
  supersededBy {
      name
      shortName
      versionName
      identifier
      viewUrl(clientUrl: $clientUrl)
      publishedAt
    }
  supersededPlans(recursive: true) {
    name
    shortName
    versionName
    identifier
    viewUrl(clientUrl: $clientUrl)
    publishedAt
  }
  supersedingPlans(recursive: true) {
    name
    shortName
    versionName
    identifier
    viewUrl(clientUrl: $clientUrl)
    publishedAt
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
  additionalLinks {
    ... on AdditionalLinks {
      items {
        ... on PageMenuItem {
          id
          page {
            title
            urlPath
            slug
            ... on AccessibilityStatementPage {
              body {
                ... on AccessibilityStatementContactInformationBlock {
                  blocks {
                    field
                    ... on CharBlock {
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
${images.fragments.multiUseImage}
`;
