import { gql } from '@apollo/client';

import images from '@/common/images';

import { CATEGORY_FRAGMENT, RECURSIVE_CATEGORY_FRAGMENT } from './category.fragment';
import { DASHBOARD_INDICATOR_BLOCK_FRAGMENT } from './dashboard-indicator-block.fragment';

export const STREAM_FIELD_FRAGMENT = gql`
  fragment StreamField on StreamFieldInterface {
    id
    blockType
    field
    ... on CharBlock {
      value
    }
    ... on ChangeLogMessageBlock {
      __typename
      fieldLabel
      fieldHelpText
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
        id
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
        id
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
      id
      heading
      helpText
      categoryFilter {
        id
      }
      groupByCategoryLevel {
        id
      }
    }
    ... on AdaptiveEmbedBlock {
      title
      description
      fullWidth
      embed {
        html
      }
    }
    ... on CartographyVisualisationBlock {
      cartographyStyle: style
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
          ...CategoryRecursive
        }
      }
      category {
        id
        children {
          ...Category
        }
      }
    }
    ... on CategoryTypeLevelListBlock {
      heading
      helpText
      pathsTargetNodeId
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
          ...CategoryRecursive
          indicators {
            id
            name
          }
        }
      }
    }
    ... on PathsOutcomeBlock {
      heading
      helpText
      outcomeNodeId
    }
    ... on FrontPageHeroBlock {
      layout
      image {
        ...HeroImage
      }
      heading
      lead
      additionalSettings {
        id
        backgroundColour
        fitImage
        showImageAccent
        backgroundCoversFullSection
      }
    }
    ... on LargeImageBlock {
      image {
        id
        title
        altText
        width
        height
        renditionUncropped: rendition(size: "1320x1320", crop: false) {
          id
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
      significantDigits
      indicatorIsNormalized
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
              id
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
        id
        blockType
        ... on PageLinkBlock {
          text
          page {
            id
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
        id
        ... on CardBlock {
          image {
            ...CardImage
          }
          heading
          content
          link
        }
      }
    }
    ... on ActionCategoryFilterCardsBlock {
      cards {
        id
        ... on ActionCategoryFilterCardBlock {
          heading
          lead
          category {
            id
            type {
              id
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
        id
        identifier
        unit {
          id
          shortName
        }
      }
      treeMapCategoryType: categoryType {
        id
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
    ... on DashboardRowBlock {
      ...DashboardIndicatorBlock
    }
  }
  ${images.fragments.heroImage}
  ${images.fragments.cardImage}
  ${CATEGORY_FRAGMENT}
  ${RECURSIVE_CATEGORY_FRAGMENT}
  ${DASHBOARD_INDICATOR_BLOCK_FRAGMENT}
`;
