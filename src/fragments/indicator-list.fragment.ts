import { gql } from '@apollo/client';

const INDICATOR_LIST_FILTER = gql`
  fragment IndicatorListFilter on StreamFieldInterface {
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
