import { gql } from '@apollo/client';
import images from 'common/images';

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    identifier
    name
    leadParagraph
    order
    kausalPathsNodeUuid
    level {
      id
      name
      namePlural
    }
    image {
      id
      ...MultiUseImageFragment
    }
    indicators {
      id
      values {
        date
        value
      }
      goals {
        date
        value
      }
      unit {
        name
        shortName
      }
    }
    color
    iconSvgUrl
    helpText
    iconImage {
      rendition(size: "400x400", crop: false) {
        src
      }
    }
    categoryPage {
      id
      title
      urlPath
      live
    }
    type {
      id
      identifier
      hideCategoryIdentifiers
    }
    attributes {
      id
      key
      ... on AttributeRichText {
        value
      }
      ... on AttributeText {
        value
      }
    }
  }
  ${images.fragments.multiUseImage}
`;

export const RECURSIVE_CATEGORY_FRAGMENT = gql`
  # Support parent categories up to two levels deep
  fragment CategoryWithParentsFragment on Category {
    parent {
      ...CategoryFragment
      parent {
        ...CategoryFragment
        parent {
          ...CategoryFragment
        }
      }
    }
  }

  fragment CategoryRecursiveFragment on Category {
    ...CategoryFragment
    ...CategoryWithParentsFragment
  }

  ${CATEGORY_FRAGMENT}
`;
