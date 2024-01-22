import { gql } from '@apollo/client';
import { ACTION_CARD_FRAGMENT } from '../fragments/action-card.fragment';
import images from '@/common/images';
import { RECURSIVE_CATEGORY_FRAGMENT } from '../fragments/category.fragment';
import { CATEGORY_TYPE_FRAGMENT } from '../fragments/category-tags.fragment';
import {
  ATTRIBUTE_FRAGMENT,
  ATTRIBUTE_TYPE_FRAGMENT,
} from '../fragments/action-attribute.fragment';

import {
  GetActionDetailsQuery,
  GetActionDetailsQueryVariables,
} from '@/common/__generated__/graphql';
import { getClient } from '../utils/apollo-rsc-client';

export const getActionDetails = async (
  plan: string,
  id: string,
  clientUrl: string
) =>
  await getClient().query<
    GetActionDetailsQuery,
    GetActionDetailsQueryVariables
  >({
    query: GET_ACTION_DETAILS,
    variables: {
      plan,
      clientUrl,
      id,
    },
    fetchPolicy: 'no-cache',
  });

export const GET_ACTION_DETAILS = gql`
  query GetActionDetails($plan: ID!, $id: ID!, $clientUrl: String!) {
    action(plan: $plan, identifier: $id) {
      id
      identifier
      name
      officialName
      leadParagraph
      description
      completion
      image {
        ...MultiUseImageFragment
      }
      color
      statusSummary {
        identifier
        label
        color
        sentiment
        isCompleted
        isActive
      }
      links {
        id
        order
        url
        title
      }
      updatedAt
      mergedActions {
        id
        identifier
        name
        officialName
        plan {
          id
          viewUrl(clientUrl: $clientUrl)
        }
      }
      categories {
        ...CategoryRecursiveFragment
      }
      emissionScopes: categories(categoryType: "emission_scope") {
        id
        identifier
        name
        leadParagraph
      }
      contactPersons {
        id
        person {
          id
          firstName
          lastName
          avatarUrl(size: "150x150")
          title
          organization {
            name
          }
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
      responsibleParties {
        id
        organization {
          id
          abbreviation
          name
          email
        }
        role
        specifier
      }
      tasks {
        id
        name
        dueAt
        completedAt
        comment
        state
      }
      status {
        id
        identifier
        name
        color
      }
      manualStatusReason
      implementationPhase {
        id
        identifier
        name
      }
      schedule {
        id
        name
        beginsAt
        endsAt
      }
      scheduleContinuous
      startDate
      endDate
      impact {
        id
        identifier
        name
      }
      statusUpdates {
        id
      }
      relatedIndicators {
        id
        indicator {
          id
          name
          latestGraph {
            id
          }
          latestValue {
            id
            date
            value
          }
          actions {
            id
            identifier
            name
          }
          plans {
            id
          }
        }
      }
      relatedActions {
        ...ActionCard
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
      supersededBy {
        ...ActionCard
      }
      supersededActions {
        ...ActionCard
      }
      nextAction {
        id
        identifier
      }
      previousAction {
        id
        identifier
      }
      attributes {
        ...AttributesBlockAttribute
      }
      plan {
        id
        shortName
        versionName
        viewUrl(clientUrl: $clientUrl)
        hideActionIdentifiers
        image {
          rendition(size: "128x128", crop: true) {
            src
          }
        }
      }
    }
    plan(id: $plan) {
      actionListPage {
        detailsMainTop {
          ...ActionMainContentBlocksFragment
        }
        detailsMainBottom {
          ...ActionMainContentBlocksFragment
        }
        detailsAside {
          ...ActionAsideContentBlocksFragment
        }
      }
      actionAttributeTypes {
        ...AttributesBlockAttributeType
      }
      generalContent {
        actionTerm
      }
    }
  }

  fragment ActionAsideContentBlocksFragment on ActionAsideContentBlock {
    __typename
    ... on ActionResponsiblePartiesBlock {
      heading
    }
    ... on StreamFieldInterface {
      id
    }
    ... on ActionContentAttributeTypeBlock {
      attributeType {
        ...AttributesBlockAttributeType
      }
    }
    ... on ActionContentCategoryTypeBlock {
      categoryType {
        ...CategoryTypeFragment
      }
    }
  }

  fragment ActionMainContentBlocksFragment on ActionMainContentBlock {
    __typename
    ... on StreamFieldInterface {
      id
    }
    ... on ActionOfficialNameBlock {
      fieldLabel
      caption
    }
    ... on ActionContentAttributeTypeBlock {
      attributeType {
        ...AttributesBlockAttributeType
      }
    }
    ... on ActionContentCategoryTypeBlock {
      categoryType {
        ...CategoryTypeFragment
      }
    }
    ... on ReportComparisonBlock {
      ...ReportComparisonBlockActionContent
    }
    ... on ActionContentSectionBlock {
      id
      heading
      helpText
      layout
      blocks {
        ... on StreamFieldInterface {
          id
        }
        ... on ActionOfficialNameBlock {
          fieldLabel
          caption
        }
        ... on ActionContentAttributeTypeBlock {
          attributeType {
            ...AttributesBlockAttributeType
          }
        }
        ... on ActionContentCategoryTypeBlock {
          categoryType {
            ...CategoryTypeFragment
          }
        }
        ... on ReportComparisonBlock {
          ...ReportComparisonBlockActionContent
        }
      }
    }
  }

  fragment ReportComparisonBlockActionContent on ReportComparisonBlock {
    reportField
    reportType {
      name
    }
    reportsToCompare {
      identifier
      name
      startDate
      endDate
      valuesForAction(actionIdentifier: $id) {
        field {
          __typename
          ... on StreamFieldInterface {
            id
          }
        }
        ... on ActionAttributeReportValue {
          attribute {
            ...AttributesBlockAttribute
          }
        }
      }
    }
  }

  ${ACTION_CARD_FRAGMENT}
  ${images.fragments.multiUseImage}
  ${ATTRIBUTE_FRAGMENT}
  ${ATTRIBUTE_TYPE_FRAGMENT}
  ${RECURSIVE_CATEGORY_FRAGMENT}
  ${CATEGORY_TYPE_FRAGMENT}
`;
