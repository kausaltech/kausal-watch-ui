import { gql } from '@apollo/client';
import {
  CATEGORY_FRAGMENT,
  RECURSIVE_CATEGORY_FRAGMENT,
} from './category.fragment';

export const ATTRIBUTE_FRAGMENT = gql`
  ${CATEGORY_FRAGMENT}

  fragment AttributesBlockAttribute on AttributeInterface {
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
    ... on AttributeCategoryChoice {
      categories {
        ...CategoryRecursiveFragment
      }
    }
  }

  ${RECURSIVE_CATEGORY_FRAGMENT}
`;

export const ATTRIBUTE_TYPE_FRAGMENT = gql`
  fragment AttributesBlockAttributeType on AttributeType {
    __typename
    id
    format
    name
    identifier
    helpText
    choiceOptions {
      id
      identifier
    }
    unit {
      id
      name
    }
    showChoiceNames
    hasZeroOption
  }
`;

export const ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT = gql`
  fragment AttributesBlockAttributeWithNestedType on AttributeInterface {
    ...AttributesBlockAttribute
    type {
      ...AttributesBlockAttributeType
    }
  }

  ${ATTRIBUTE_FRAGMENT}
  ${ATTRIBUTE_TYPE_FRAGMENT}
`;
