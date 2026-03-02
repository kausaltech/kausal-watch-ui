import { gql } from '@apollo/client';

import type {
  GetActionDetailsQuery,
  GetActionDetailsQueryVariables,
  WorkflowState,
} from '@/common/__generated__/graphql';
import images from '@/common/images';

import {
  ATTRIBUTE_FRAGMENT,
  ATTRIBUTE_TYPE_FRAGMENT,
} from '../fragments/action-attribute.fragment';
import { ACTION_CARD_FRAGMENT } from '../fragments/action-card.fragment';
import { CATEGORY_TYPE_FRAGMENT } from '../fragments/category-tags.fragment';
import { RECURSIVE_CATEGORY_FRAGMENT } from '../fragments/category.fragment';
import { getClient } from '../utils/apollo-rsc-client';

export const getActionDetails = async (
  plan: string,
  id: string,
  clientUrl: string,
  workflow?: WorkflowState
) =>
  await (
    await getClient()
  ).query<GetActionDetailsQuery, GetActionDetailsQueryVariables>({
    query: GET_ACTION_DETAILS,
    variables: {
      plan,
      clientUrl,
      id,
      workflow: workflow ?? null,
    },
    fetchPolicy: 'no-cache',
  });

const GET_ACTION_DETAILS = gql`
  query GetActionDetails($plan: ID!, $id: ID!, $clientUrl: String!, $workflow: WorkflowState)
  @workflow(state: $workflow) {
    action(plan: $plan, identifier: $id) {
      ...ActionDependencies
      id
      identifier
      name
      officialName
      leadParagraph
      workflowStatus {
        matchingVersion {
          id
          description
        }
      }
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
        dateFormat
        completedAt
        details
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
      dateFormat
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
        indicatesActionProgress
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
      changeLogMessage {
        content
        createdBy {
          firstName
          lastName
          avatarUrl
        }
        updatedAt
      }
      datasets {
        schema {
          uuid
          name
          timeResolution
          metrics {
            unit
          }
          dimensions {
            order
            dimension {
              name
              uuid
              categories {
                uuid
                label
              }
            }
          }
        }
        uuid
        dataPoints {
          uuid
          value
          date
          dimensionCategories {
            uuid
            label
            dimension {
              uuid
            }
          }
        }
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
        id
        actionDateFormat
        taskDateFormat
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

  fragment ActionDependencies on Action {
    dependencyRole {
      id
      name
    }
    allDependencyRelationships {
      preceding {
        ...ActionCardWithDependencyRole
      }
      dependent {
        ...ActionCardWithDependencyRole
      }
    }
  }

  fragment ActionAsideContentBlocksFragment on ActionAsideContentBlock {
    ... on ActionContentBlockInterface {
      fieldLabel
      fieldHelpText
    }
    ... on FieldBlockMetaInterface {
      meta {
        restricted
        hidden
      }
    }
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
    ... on FieldBlockMetaInterface {
      meta {
        restricted
        hidden
      }
    }
    __typename
    ... on StreamFieldInterface {
      id
    }
    ... on ActionDescriptionBlock {
      fieldLabel
      fieldHelpText
    }
    ... on ActionLeadParagraphBlock {
      fieldLabel
      fieldHelpText
    }
    ... on ActionDependenciesBlock {
      fieldLabel
      fieldHelpText
    }
    ... on IndicatorCausalChainBlock {
      id
      field
    }
    ... on StreamFieldInterface {
      id
    }
    ... on ActionOfficialNameBlock {
      fieldLabel
      caption
    }
    ... on ActionRelatedActionsBlock {
      fieldLabel
      fieldHelpText
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
    ... on ActionContactFormBlock {
      heading
      description
      emailVisible
      emailRequired
      feedbackVisible
      feedbackRequired
      fields {
        ... on FormFieldBlock {
          id
          fieldLabel
          fieldType
          fieldRequired
          choices {
            ... on FormChoiceBlock {
              choiceLabel
              choiceValue
            }
          }
        }
      }
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
        ... on ActionRelatedActionsBlock {
          fieldLabel
          fieldHelpText
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
        ... on ActionContactFormBlock {
          heading
          description
          emailVisible
          emailRequired
          feedbackVisible
          feedbackRequired
          fields {
            ... on FormFieldBlock {
              id
              fieldLabel
              fieldType
              fieldRequired
              choices {
                ... on FormChoiceBlock {
                  choiceLabel
                  choiceValue
                }
              }
            }
          }
        }
      }
    }
    ... on PlanDatasetsBlock {
      id
      heading
      helpText
      datasetSchema {
        uuid
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

  fragment ActionCardWithDependencyRole on Action {
    ...ActionCard
    dependencyRole {
      id
      name
    }
  }

  ${ACTION_CARD_FRAGMENT}
  ${images.fragments.multiUseImage}
  ${ATTRIBUTE_FRAGMENT}
  ${ATTRIBUTE_TYPE_FRAGMENT}
  ${RECURSIVE_CATEGORY_FRAGMENT}
  ${CATEGORY_TYPE_FRAGMENT}
`;
