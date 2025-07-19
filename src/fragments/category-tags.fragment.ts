import { gql } from '@apollo/client';

export const CATEGORY_TYPE_FRAGMENT = gql`
  fragment CategoryTypeFragment on CategoryType {
    id
    name
    identifier
    helpText
    hideCategoryIdentifiers
    levels {
      id
      order
      name
      namePlural
    }
  }
`;
