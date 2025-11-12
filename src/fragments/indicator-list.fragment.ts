import { gql } from '@apollo/client';

const INDICATOR_LIST_FILTER = gql`
  fragment IndicatorListFilter on StreamFieldInterface {
    __typename
    field
    id
    ... on IndicatorFilterBlock {
      fieldLabel
      fieldHelpText
      showAllLabel
      sourceField
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
        categories(onlyWithActions: false) {
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
  }
`;

export const ALL_INDICATOR_LIST_FILTERS = gql`
  fragment IndicatorListPageFilters on IndicatorListPage {
    primaryFilters {
      ...IndicatorListFilter
    }
    mainFilters {
      ...IndicatorListFilter
    }
    advancedFilters {
      ...IndicatorListFilter
    }
  }
  ${INDICATOR_LIST_FILTER}
`;

export const INDICATOR_LIST_PAGE_FRAGMENT = gql`
  fragment IndicatorListPageFragment on IndicatorListPage {
    leadContent
    displayInsights
    displayLevel
    includeRelatedPlans
    listColumns {
      __typename
      ... on IndicatorListColumn {
        id
        columnLabel
        columnHelpText
        sourceField
      }
      ... on IndicatorValueColumn {
        id
        columnLabel
        columnHelpText
        sourceField
        isNormalized
        valueType
      }
      ... on IndicatorCategoryColumn {
        id
        columnLabel
        columnHelpText
        categoryType {
          id
          name
        }
        categoryLevel {
          id
          name
          namePlural
        }
      }
    }
    ...IndicatorListPageFilters
  }
  ${ALL_INDICATOR_LIST_FILTERS}
`;
