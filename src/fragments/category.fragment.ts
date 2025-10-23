import { gql } from '@apollo/client';

import images from '@/common/images';

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
        id
        date
        value
      }
      goals {
        id
        date
        value
      }
      unit {
        id
        name
        shortName
      }
    }
    color
    iconSvgUrl
    helpText
    iconImage {
      id
      rendition(size: "400x400", crop: false) {
        id
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
      id
      ...CategoryFragment
      parent {
        id
        ...CategoryFragment
        parent {
          id
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
