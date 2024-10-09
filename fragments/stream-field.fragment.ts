import images from '@/common/images';
import { gql } from '@apollo/client';

import {
  CATEGORY_FRAGMENT,
  RECURSIVE_CATEGORY_FRAGMENT,
} from './category.fragment';

export const STREAM_FIELD_FRAGMENT = gql`
  fragment StreamFieldFragment on StreamFieldInterface {
    id
    blockType
    field
    ... on CharBlock {
      value
    }
    ... on TextBlock {
      value
    }
    ... on RichTextBlock {
      value
    }
    ... on ChoiceBlock {
      value
      choices {
        key
        value
      }
    }
    ... on QuestionAnswerBlock {
      heading
      questions {
        ... on QuestionBlock {
          question
          answer
        }
      }
    }
    ... on IndicatorBlock {
      style
      indicator {
        id
      }
    }
    ... on IndicatorGroupBlock {
      title
      indicators {
        ... on IndicatorBlock {
          style
          indicator {
            id
            identifier
            name
            unit {
              id
              name
            }
            description
            timeResolution
            latestValue {
              id
              date
              value
            }
            goals {
              id
              date
              value
            }
            level(plan: $plan)
          }
        }
      }
    }
    ... on ActionListBlock {
      categoryFilter {
        id
      }
      heading
      helpText
      groupByCategoryLevel {
        id
      }
    }
    ... on AdaptiveEmbedBlock {
      fullWidth
      embed {
        html
      }
    }
    ... on CartographyVisualisationBlock {
      style
      styleOverrides
      account {
        provider
        account
        publicAccessToken
      }
    }
    ... on CategoryListBlock {
      style
      heading
      lead
      categoryType: categoryType {
        id
        hideCategoryIdentifiers
        categories {
          ...CategoryRecursiveFragment
        }
      }
      category {
        id
        children {
          ...CategoryFragment
        }
      }
    }
    ... on CategoryTypeLevelListBlock {
      heading
      helpText
      categoryLevel {
        id
        name
        namePlural
      }
      groupByCategoryLevel {
        id
      }
      categoryBlockType: categoryType {
        id
        identifier
        hideCategoryIdentifiers
        categories {
          ...CategoryRecursiveFragment
        }
      }
    }
    ... on FrontPageHeroBlock {
      layout
      image {
        ...MultiUseImageFragment
      }
      heading
      lead
    }
    ... on LargeImageBlock {
      image {
        title
        altText
        width
        height
        renditionUncropped: rendition(size: "1320x1320", crop: false) {
          src
        }
        imageCredit
      }
      width
    }
    ... on IndicatorShowcaseBlock {
      blocks {
        id
        __typename
      }
      title
      body
      indicator {
        id
        identifier
        name
        unit {
          id
          shortName
          name
        }
        minValue
        maxValue
        latestValue {
          id
          date
          value
        }
        values {
          id
          date
          value
          normalizedValues {
            normalizerId
            value
          }
          categories {
            id
          }
        }
        goals {
          id
          date
          value
          normalizedValues {
            normalizerId
            value
          }
        }
        common {
          id
          normalizations {
            unit {
              shortName
              name
            }
            normalizer {
              name
              id
              identifier
            }
          }
        }
      }
      linkButton {
        blockType
        ... on PageLinkBlock {
          text
          page {
            url
            urlPath
            slug
          }
        }
      }
    }
    ... on CardListBlock {
      heading
      lead
      cards {
        ... on CardBlock {
          image {
            ...MultiUseImageFragment
          }
          heading
          content
          link
        }
      }
    }
    ... on ActionCategoryFilterCardsBlock {
      cards {
        ... on ActionCategoryFilterCardBlock {
          heading
          lead
          category {
            id
            type {
              identifier
            }
          }
        }
      }
    }
    ... on CategoryTreeMapBlock {
      heading
      lead
      valueAttribute {
        identifier
        unit {
          shortName
        }
      }
      categoryType: categoryType {
        identifier
      }
    }
    ... on AccessibilityStatementComplianceStatusBlock {
      id
      blockType
      field
    }
    ... on AccessibilityStatementPreparationInformationBlock {
      id
      blockType
      field
    }
    ... on AccessibilityStatementContactInformationBlock {
      id
      blockType
      field
      blocks {
        id
        field
        ... on CharBlock {
          value
        }
      }
    }
  }
  ${images.fragments.multiUseImage}
  ${CATEGORY_FRAGMENT}
  ${RECURSIVE_CATEGORY_FRAGMENT}
`;
