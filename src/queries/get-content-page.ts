import { gql } from '@apollo/client';

import type { ContentPageQuery, ContentPageQueryVariables } from '@/common/__generated__/graphql';
import images from '@/common/images';
import { ALL_ACTION_LIST_FILTERS } from '@/fragments/action-list.fragment';
import { INDICATOR_LIST_PAGE_FRAGMENT } from '@/fragments/indicator-list.fragment';

import { ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT } from '../fragments/action-attribute.fragment';
import { CATEGORY_FRAGMENT } from '../fragments/category.fragment';
import { STREAM_FIELD_FRAGMENT } from '../fragments/stream-field.fragment';
import { getClient } from '../utils/apollo-rsc-client';

export const getContentPage = async (plan: string, path: string) =>
  await (
    await getClient()
  ).query<ContentPageQuery, ContentPageQueryVariables>({
    query: GET_CONTENT_PAGE,
    variables: {
      plan,
      path,
    },
    fetchPolicy: 'no-cache',
  });

const TEMPLATED_CATEGORY_PAGE_FRAGMENT = gql`
  fragment TemplatedCategoryPage on CategoryPage {
    id
    layout {
      id
      __typename
      iconSize
      layoutMainTop {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
            id
            identifier
          }
        }
        ... on CategoryPageProgressBlock {
          blocks {
            ... on ChoiceBlock {
              value
            }
          }
        }
        ... on PathsNodeSummaryBlock {
          id
          heading
          pathsTargetNodeId
        }
      }
      layoutMainBottom {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
            id
            identifier
          }
        }
        ... on CategoryPageContactFormBlock {
          id
          heading
          description
          emailVisible
          emailRequired
          feedbackVisible
          feedbackRequired
          fields {
            ... on FormFieldBlock {
              id
              fieldLabel
              fieldType
              fieldRequired
              choices {
                ... on FormChoiceBlock {
                  choiceLabel
                  choiceValue
                }
              }
            }
          }
        }
        ... on CategoryTypeDatasetsBlock {
          id
          heading
          helpText
          datasetSchema {
            uuid
          }
        }
        ... on ChangeLogMessageBlock {
          fieldLabel
          fieldHelpText
        }
      }
    }
  }
`;

export const PlanDatasetsBlockFragment = gql`
  fragment PlanDatasetsBlock on Dataset {
    schema {
      uuid
      name
      timeResolution
      metrics {
        unit
      }
      dimensions {
        order
        dimension {
          name
          uuid
          categories {
            uuid
            label
          }
        }
      }
    }
    uuid
    dataPoints {
      uuid
      value
      date
      dimensionCategories {
        uuid
        label
        dimension {
          uuid
        }
      }
    }
  }
`;

const GET_CONTENT_PAGE = gql`
  query ContentPage($plan: ID!, $path: String!, $onlyWithActions: Boolean = true) {
    planPage(plan: $plan, path: $path) {
      __typename
      id
      slug
      title
      ... on StaticPage {
        changeLogMessage {
          id
          content
          createdAt
          createdBy {
            id
            firstName
            lastName
            avatarUrl
          }
        }
        headerImage {
          ...HeroImage
          ...SocialImage
        }
        leadParagraph
        body {
          ...StreamField
        }
        siblings {
          id
          title
          slug
          live
          urlPath
        }
        parent {
          ... on EmptyPage {
            childrenUseSecondaryNavigation
          }
          ... on StaticPage {
            childrenUseSecondaryNavigation
          }
          id
          title
          slug
          urlPath
          children {
            id
            title
            slug
            live
            urlPath
          }
        }
      }
      ... on AccessibilityStatementPage {
        body {
          ...StreamField
        }
      }
      ... on PrivacyPolicyPage {
        leadContent
      }
      ... on IndicatorListPage {
        ...IndicatorListPage
      }
      ... on CategoryPage {
        ...TemplatedCategoryPage
        category {
          id
          identifier
          name
          kausalPathsNodeUuid
          categoryPage {
            id
            urlPath
          }
          level {
            id
            name
            namePlural
          }
          type {
            id
            hideCategoryIdentifiers
          }
          image {
            ...HeroImage
            ...SocialImage
            ...CardImage
          }
          indicators {
            id
          }
          leadParagraph
          color
          iconSvgUrl
          iconImage {
            id
            rendition(size: "400x400", crop: false) {
              id
              src
            }
          }
          children {
            ...Category
          }
          parent {
            ...CategoryParent
            ...RecursiveCategoryParent
            id
            identifier
            name
            level {
              id
              name
              namePlural
            }
            image {
              ...HeroImage
              ...SocialImage
              ...CardImage
            }
            color
            iconSvgUrl
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
            }
            type {
              id
              hideCategoryIdentifiers
            }
          }
          attributes {
            ...AttributesBlockAttributeWithNestedType
          }
          datasets {
            ...PlanDatasetsBlock
          }
          changeLogMessage {
            content
            createdBy {
              id
              firstName
              lastName
              avatarUrl
            }
            updatedAt
          }
        }
        body {
          ...StreamField
        }
      }
      ... on CategoryTypePage {
        contentType
      }
      ... on ActionListPage {
        leadContent
        defaultView
        headingHierarchyDepth
        includeRelatedPlans
        ...ActionListPageFilters
      }
      lastPublishedAt
    }
  }
  ${PlanDatasetsBlockFragment}
  ${TEMPLATED_CATEGORY_PAGE_FRAGMENT}
  ${STREAM_FIELD_FRAGMENT}
  ${images.fragments.heroImage}
  ${images.fragments.socialImage}
  ${images.fragments.cardImage}
  ${ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${ALL_ACTION_LIST_FILTERS}
  ${INDICATOR_LIST_PAGE_FRAGMENT}

  fragment CategoryParent on Category {
    id
    parent {
      id
      identifier
      name
      categoryPage {
        id
        urlPath
      }
      type {
        id
        hideCategoryIdentifiers
      }
    }
  }

  # Fetch basic parent category data up to three levels deep for breadcrumbs
  fragment RecursiveCategoryParent on Category {
    id
    parent {
      id
      ...CategoryParent
      parent {
        id
        ...CategoryParent
        parent {
          id
          ...CategoryParent
        }
      }
    }
  }
`;
