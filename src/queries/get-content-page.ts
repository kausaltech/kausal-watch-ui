import { gql } from '@apollo/client';

import type {
  GetContentPageQuery,
  GetContentPageQueryVariables,
} from '@/common/__generated__/graphql';
import images from '@/common/images';
import { ALL_ACTION_LIST_FILTERS } from '@/fragments/action-list.fragment';

import { ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT } from '../fragments/action-attribute.fragment';
import { CATEGORY_FRAGMENT } from '../fragments/category.fragment';
import { STREAM_FIELD_FRAGMENT } from '../fragments/stream-field.fragment';
import { getClient } from '../utils/apollo-rsc-client';

export const getContentPage = async (plan: string, path: string) =>
  await (
    await getClient()
  ).query<GetContentPageQuery, GetContentPageQueryVariables>({
    query: GET_CONTENT_PAGE,
    variables: {
      plan,
      path,
    },
    fetchPolicy: 'no-cache',
  });

const TEMPLATED_CATEGORY_PAGE_FRAGMENT = gql`
  fragment TemplatedCategoryPageFragment on CategoryPage {
    layout {
      id
      __typename
      iconSize
      layoutMainTop {
        ... on StreamFieldInterface {
          id
        }
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
            id
            identifier
          }
        }
        ... on CategoryPageProgressBlock {
          blocks {
            id
            ... on ChoiceBlock {
              value
            }
          }
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
                id
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
      }
    }
  }
`;

export const PlanDatasetsBlockFragment = gql`
  fragment PlanDatasetsBlockFragment on Dataset {
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
  query GetContentPage($plan: ID!, $path: String!, $onlyWithActions: Boolean = true) {
    planPage(plan: $plan, path: $path) {
      __typename
      id
      slug
      title
      ... on StaticPage {
        headerImage {
          id
          ...MultiUseImageFragment
        }
        leadParagraph
        body {
          ...StreamFieldFragment
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
          ...StreamFieldFragment
        }
      }
      ... on PrivacyPolicyPage {
        leadContent
      }
      ... on CategoryPage {
        ...TemplatedCategoryPageFragment
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
            id
            ...MultiUseImageFragment
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
            ...CategoryFragment
          }
          parent {
            id
            ...CategoryParentFragment
            ...RecursiveCategoryParentFragment
            identifier
            name
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
            ...PlanDatasetsBlockFragment
          }
        }
        body {
          ...StreamFieldFragment
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
  ${images.fragments.multiUseImage}
  ${ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${ALL_ACTION_LIST_FILTERS}

  fragment CategoryParentFragment on Category {
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
  fragment RecursiveCategoryParentFragment on Category {
    parent {
      id
      ...CategoryParentFragment
      parent {
        id
        ...CategoryParentFragment
        parent {
          id
          ...CategoryParentFragment
        }
      }
    }
  }
`;
