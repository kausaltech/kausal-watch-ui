import { gql } from '@apollo/client';

import type { GetPlanContextQuery } from '@/common/__generated__/graphql';
import images from '@/common/images';

import { getClient } from '../utils/apollo-rsc-client';

export type ActionStatusSummary = NonNullable<
  NonNullable<GetPlanContextQuery['plan']>['actionStatusSummaries']
>[number];

const GET_PLAN_CONTEXT = gql`
  query GetPlanContext($identifier: ID, $hostname: String, $clientUrl: String) {
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
      color
      isCompleted
      isActive
      sentiment
    }
    actionTimelinessClasses {
      identifier
      label
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
      organizationTerm
      sitewideAnnouncement
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
      showAdminLink
      enableIndicatorComparison
      minimalStatuses
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
            crossPlanLink
            viewUrl
            page {
              title
              url
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
    actionListPage {
      includeRelatedPlans
      actionDateFormat
      taskDateFormat
    }
  }
  ${images.fragments.multiUseImage}
`;

export const getPlan = async (hostname: string, planIdentifier: string, clientUrl: string) =>
  await (
    await getClient()
  ).query<GetPlanContextQuery>({
    query: GET_PLAN_CONTEXT,
    variables: {
      identifier: planIdentifier,
      hostname,
      clientUrl,
    },
    fetchPolicy: 'no-cache',
  });
