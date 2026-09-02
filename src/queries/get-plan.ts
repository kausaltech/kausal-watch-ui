import { gql } from '@apollo/client';

import type { PlanContextQuery } from '@/common/__generated__/graphql';
import images from '@/common/images';

import { getClient } from '../utils/apollo-rsc-client';

export type ActionStatusSummary = NonNullable<
  NonNullable<PlanContextQuery['plan']>['actionStatusSummaries']
>[number];

const GET_PLAN_CONTEXT = gql`
  query PlanContext($identifier: ID, $hostname: String, $clientUrl: String) {
    plan(id: $identifier) {
      ...PlanContext
    }
    workflowStates(plan: $identifier) {
      id
      description
    }
  }

  fragment PlanContext on Plan {
    id
    identifier
    name
    shortName
    versionName
    themeIdentifier
    timezone
    primaryLanguage
    otherLanguages
    hideActionIdentifiers
    publishedAt
    kausalPathsInstanceUuid
    viewUrl(clientUrl: $clientUrl)
    actionReportExportViewUrl
    primaryActionClassification {
      id
      identifier
      hideCategoryIdentifiers
      common {
        identifier
      }
    }
    secondaryActionClassification {
      id
      identifier
    }
    domain(hostname: $hostname) {
      id
      basePath
      googleSiteVerificationTag
      matomoAnalyticsUrl
    }
    image {
      ...HeroImage
      ...CardImage
      ...SocialImage
      square: rendition(size: "128x128", crop: true) {
        id
        src
      }
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
      color
    }
    actionDependencyRoles {
      id
      name
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
    actionStatusSummaries {
      identifier
      label
      isCompleted
      isActive
      sentiment
    }
    actionTimelinessClasses {
      identifier
      color
      sentiment
      comparison
      days
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
      actionTaskTerm
      indicatorTerm
      organizationTerm
      sitewideAnnouncement
    }
    mainMenu {
      items(withDescendants: true) {
        __typename
        ... on PageMenuItem {
          id
          page {
            id
            title
            urlPath
            slug
          }
          parent {
            id
            page {
              id
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
            id
            title
            urlPath
            slug
          }
          parent {
            id
            page {
              id
              __typename
            }
          }
          children {
            __typename
            id
            page {
              id
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
    externalFeedbackUrl
    features {
      allowPublicSiteLogin
      hasActionContactPersonRoles
      contactPersonsPublicData
      contactPersonsShowPicture
      contactPersonsShowOrganizationAncestors
      enableSearch
      hasActionIdentifiers
      hasActionOfficialName
      hasActionLeadParagraph
      hasActionPrimaryOrgs
      indicatorsOpenInModal
      showAdminLink
      enableIndicatorComparison
      minimalStatuses
      enableChangeLog
      enableActionPdfExportInPublicUi
    }
    allRelatedPlans {
      id
      identifier
      name
      shortName
      image {
        id
        rendition(size: "128x128", crop: true) {
          id
          src
        }
      }
      organization {
        id
        name
      }
      viewUrl(clientUrl: $clientUrl)
    }
    supersededBy {
      id
      name
      shortName
      versionName
      identifier
      viewUrl(clientUrl: $clientUrl)
      publishedAt
    }
    supersededPlans(recursive: true) {
      id
      name
      shortName
      versionName
      identifier
      viewUrl(clientUrl: $clientUrl)
      publishedAt
    }
    supersedingPlans(recursive: true) {
      id
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
        id
        rendition(size: "128x128", crop: true) {
          id
          src
        }
      }
      organization {
        id
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
        id
        rendition(size: "128x128", crop: true) {
          id
          src
        }
      }
      organization {
        id
        name
      }
      viewUrl(clientUrl: $clientUrl)
    }
    additionalLinks {
      ... on AdditionalLinks {
        items {
          ... on PageMenuItem {
            id
            crossPlanLink
            viewUrl
            page {
              id
              title
              url
              urlPath
              slug
              ... on AccessibilityStatementPage {
                body {
                  ... on AccessibilityStatementContactInformationBlock {
                    id
                    blocks {
                      id
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
    actionListPage {
      id
      includeRelatedPlans
      actionDateFormat
      taskDateFormat
    }
  }
  ${images.fragments.heroImage}
  ${images.fragments.cardImage}
  ${images.fragments.socialImage}
`;

export const getPlan = async (hostname: string, planIdentifier: string, clientUrl: string) =>
  await (
    await getClient()
  ).query<PlanContextQuery>({
    query: GET_PLAN_CONTEXT,
    variables: {
      identifier: planIdentifier,
      hostname,
      clientUrl,
    },
    fetchPolicy: 'no-cache',
  });
