import { gql } from '@apollo/client';

const ACTION_LIST_FILTER = gql`
  fragment ActionListFilter on StreamFieldInterface {
    __typename
    field
    id
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
    }
  }
`;

export const ALL_ACTION_LIST_FILTERS = gql`
  fragment ActionListPageFilters on ActionListPage {
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
  fragment ActionTableColumnFragment on ActionListPage {
    dashboardColumns {
      __typename
      ... on IdentifierColumnBlock {
        columnLabel
      }
      ... on NameColumnBlock {
        columnLabel
      }
      ... on ImplementationPhaseColumnBlock {
        columnLabel
      }
      ... on StatusColumnBlock {
        columnLabel
      }
      ... on TasksColumnBlock {
        columnLabel
      }
      ... on ResponsiblePartiesColumnBlock {
        columnLabel
      }
      ... on IndicatorsColumnBlock {
        columnLabel
      }
      ... on UpdatedAtColumnBlock {
        columnLabel
      }
      ... on OrganizationColumnBlock {
        columnLabel
      }
      ... on ImpactColumnBlock {
        columnLabel
      }
    }
  }
`;
