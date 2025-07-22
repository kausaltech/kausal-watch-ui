import { gql } from '@apollo/client';

import {
  type OrganizationDetailsQuery,
  type OrganizationDetailsQueryVariables,
} from '@/common/__generated__/graphql';

import { ACTION_TABLE_COLUMN_FRAGMENT } from '../fragments/action-list.fragment';
import { getClient } from '../utils/apollo-rsc-client';

export const getOrganizationDetails = async (
  plan: string,
  organizationId: string,
  clientUrl: string
) =>
  await (
    await getClient()
  ).query<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>({
    query: GET_ORG_DETAILS,
    variables: {
      plan,
      id: organizationId,
      clientUrl,
    },
    fetchPolicy: 'no-cache',
  });

const GET_ORG_DETAILS = gql`
  query OrganizationDetails($id: ID!, $plan: ID!, $clientUrl: String!) {
    organization(id: $id) {
      id
      classification {
        id
        name
        identifier
      }
      name
      abbreviation
      distinctName
      description
      url
      ancestors {
        id
      }
      plansWithActionResponsibilities(exceptPlan: $plan) {
        ...OrgContentPlan
      }
      actionCount
      contactPersonCount
      parent {
        id
        name
      }
      logo(parentFallback: true) {
        id
        altText
        rendition(size: "255x255", crop: false) {
          id
          src
          alt
        }
      }
    }
    plan(id: $plan) {
      ...OrgContentPlan

      actionListPage {
        ...ActionTableColumnFragment
      }
    }
  }

  fragment OrgContentPlan on Plan {
    id
    name
    shortName
    versionName
    viewUrl(clientUrl: $clientUrl)
    organization {
      id
      name
      abbreviation
    }
    primaryOrgs {
      id
      name
    }
    actionImpacts {
      id
    }
    actionStatusSummaries {
      identifier
      label
      color
      isCompleted
      isActive
      sentiment
    }
    image {
      rendition(size: "128x128", crop: true) {
        id
        src
        alt
      }
    }
    actionImplementationPhases {
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
    features {
      hasActionIdentifiers
      hasActionOfficialName
      hasActionPrimaryOrgs
    }
    actions(responsibleOrganization: $id) {
      id
      identifier
      name(hyphenated: true)
      officialName
      completion
      updatedAt
      scheduleContinuous
      startDate
      endDate
      order
      attributes {
        __typename
        id
        type {
          id
          identifier
          name
          unit {
            id
            name
            shortName
          }
          format
        }
        ... on AttributeChoice {
          choice {
            id
            name
          }
          text
        }
        ... on AttributeText {
          value
        }
        ... on AttributeRichText {
          value
        }
        ... on AttributeNumericValue {
          numericValue: value
        }
      }
      plan {
        id
        viewUrl(clientUrl: $clientUrl)
      }
      statusSummary {
        identifier
      }
      schedule {
        id
      }
      status {
        id
        identifier
        name
        color
      }
      implementationPhase {
        id
        identifier
        name
        order
      }
      impact {
        id
        identifier
      }
      categories {
        id
      }
      responsibleParties {
        id
        organization {
          id
          abbreviation
          name
        }
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
      tasks {
        id
        state
        dueAt
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
      indicators {
        id
        goals {
          id
        }
      }
      relatedIndicators {
        id
        indicatesActionProgress
        indicator {
          id
          goals {
            id
          }
        }
      }
    }
    generalContent {
      organizationTerm
    }
  }

  ${ACTION_TABLE_COLUMN_FRAGMENT}
`;
