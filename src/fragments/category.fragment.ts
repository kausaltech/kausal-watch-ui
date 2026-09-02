import { gql } from '@apollo/client';

import images from '@/common/images';

/* Detailed category query for category card lists */

export const CATEGORY_FRAGMENT = gql`
  fragment Category on Category {
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
      ...CardImage
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
    indicatorRelationships {
      id
      indicator {
        id
      }
      type
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
  ${images.fragments.cardImage}
`;

export const RECURSIVE_CATEGORY_FRAGMENT = gql`
  # Support parent categories up to two levels deep
  fragment CategoryWithParents on Category {
    id
    parent {
      ...Category
      parent {
        ...Category
        parent {
          ...Category
        }
      }
    }
  }

  fragment CategoryRecursive on Category {
    ...Category
    ...CategoryWithParents
  }

  ${CATEGORY_FRAGMENT}
`;

/*
 * Hero-quality images for a category and its parents. Layer this on top of
 * CategoryRecursive in contexts where the category image can end up
 * as a page hero or og image (e.g. the action details page via getActionImage).
 */
export const CATEGORY_HERO_IMAGES_FRAGMENT = gql`
  fragment CategoryHeroImages on Category {
    id
    image {
      ...HeroImage
      ...SocialImage
    }
    parent {
      id
      image {
        ...HeroImage
        ...SocialImage
      }
      parent {
        id
        image {
          ...HeroImage
          ...SocialImage
        }
        parent {
          id
          image {
            ...HeroImage
            ...SocialImage
          }
        }
      }
    }
  }

  ${images.fragments.heroImage}
  ${images.fragments.socialImage}
`;

/* Simplified category query for category tags */

export const CATEGORY_TAG_FRAGMENT = gql`
  fragment CategoryTag on Category {
    id
    identifier
    name
    order
    level {
      id
      name
      namePlural
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
      name
      identifier
      hideCategoryIdentifiers
      helpText
      levels {
        id
        order
        name
        namePlural
      }
    }
  }
`;

export const RECURSIVE_CATEGORY_TAG_FRAGMENT = gql`
  # Support parent categories up to two levels deep
  fragment CategoryTagWithParents on Category {
    id
    parent {
      ...CategoryTag
      parent {
        ...CategoryTag
        parent {
          ...CategoryTag
        }
      }
    }
  }

  fragment CategoryTagRecursive on Category {
    ...CategoryTag
    ...CategoryTagWithParents
  }

  ${CATEGORY_TAG_FRAGMENT}
`;
