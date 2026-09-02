import { gql } from '@apollo/client';

import { ATTRIBUTE_TYPE_FRAGMENT } from '../fragments/action-attribute.fragment';

const ACTION_LIST_FILTER = gql`
  fragment ActionListFilter on StreamFieldInterface {
    __typename
    field
    id
    ... on ResponsiblePartyFilterBlock {
      fieldLabel
      fieldHelpText
      showAllLabel
    }
    ... on CategoryTypeFilterBlock {
      style
      showAllLabel
      depth
      categoryType {
        id
        identifier
        name
        hideCategoryIdentifiers
        selectionType
        helpText
        categories(onlyWithActions: $onlyWithActions) {
          id
          identifier
          name
          order
          helpText
          parent {
            id
          }
          common {
            id
          }
        }
      }
    }
    ... on ActionAttributeTypeFilterBlock {
      showAllLabel
      attributeType {
        id
        identifier
        format
        name
        helpText
        choiceOptions {
          id
          identifier
          name
        }
      }
    }
    ... on ContinuousActionFilterBlock {
      id
      fieldLabel
      fieldHelpText
      showAllLabel
    }
    ... on ActionImplementationPhaseFilterBlock {
      fieldLabel
      fieldHelpText
      showAllLabel
    }
    ... on ActionStatusFilterBlock {
      fieldLabel
      fieldHelpText
      showAllLabel
    }
    ... on PrimaryOrganizationFilterBlock {
      fieldLabel
      fieldHelpText
      showAllLabel
    }
    ... on ActionScheduleFilterBlock {
      fieldLabel
      fieldHelpText
      showAllLabel
    }
    ... on PlanFilterBlock {
      fieldLabel
      fieldHelpText
      showAllLabel
    }
  }
`;

export const ALL_ACTION_LIST_FILTERS = gql`
  fragment ActionListPageFilters on ActionListPage {
    id
    primaryFilters {
      ...ActionListFilter
    }
    mainFilters {
      ...ActionListFilter
    }
    advancedFilters {
      ...ActionListFilter
    }
  }

  ${ACTION_LIST_FILTER}
`;

export const ACTION_TABLE_COLUMN_FRAGMENT = gql`
  fragment ActionTableColumn on ActionListPage {
    id
    dashboardColumns {
      __typename
      ... on IdentifierColumnBlock {
        id
        columnLabel
      }
      ... on NameColumnBlock {
        id
        columnLabel
      }
      ... on ImplementationPhaseColumnBlock {
        id
        columnLabel
      }
      ... on StatusColumnBlock {
        id
        columnLabel
      }
      ... on TasksColumnBlock {
        id
        columnLabel
      }
      ... on ResponsiblePartiesColumnBlock {
        id
        columnLabel
      }
      ... on IndicatorsColumnBlock {
        id
        columnLabel
      }
      ... on UpdatedAtColumnBlock {
        id
        columnLabel
      }
      ... on StartDateColumnBlock {
        id
        columnLabel
      }
      ... on EndDateColumnBlock {
        id
        columnLabel
      }
      ... on ScheduleContinuousColumnBlock {
        id
        columnLabel
      }
      ... on OrganizationColumnBlock {
        id
        columnLabel
      }
      ... on FieldColumnBlock {
        id
        columnLabel
        field
        __typename
        attributeType {
          ...AttributesBlockAttributeType
        }
      }
    }
  }
  ${ATTRIBUTE_TYPE_FRAGMENT}
`;
