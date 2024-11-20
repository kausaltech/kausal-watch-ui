import images from 'common/images';

import { gql } from '@apollo/client';

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
      key
      ... on AttributeRichText {
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
