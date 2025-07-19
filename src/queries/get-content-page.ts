import { gql } from '@apollo/client';

import { GetContentPageQuery, GetContentPageQueryVariables } from '@/common/__generated__/graphql';
import images from '@/common/images';
import { ALL_ACTION_LIST_FILTERS } from '@/fragments/action-list.fragment';

import { ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT } from '../fragments/action-attribute.fragment';
import { CATEGORY_FRAGMENT } from '../fragments/category.fragment';
import { STREAM_FIELD_FRAGMENT } from '../fragments/stream-field.fragment';
import { getClient } from '../utils/apollo-rsc-client';

export const getContentPage = async (plan: string, path: string) =>
  await getClient().query<GetContentPageQuery, GetContentPageQueryVariables>({
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
      __typename
      iconSize
      layoutMainTop {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
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
      }
      layoutMainBottom {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
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
      }
      layoutAside {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
            identifier
          }
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
            rendition(size: "400x400", crop: false) {
              src
            }
          }
          children {
            ...CategoryFragment
          }
          parent {
            ...CategoryParentFragment
            ...RecursiveCategoryParentFragment
            id
            identifier
            name
            level {
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
              rendition(size: "400x400", crop: false) {
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
            schema {
              uuid
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
  ${TEMPLATED_CATEGORY_PAGE_FRAGMENT}
  ${STREAM_FIELD_FRAGMENT}
  ${images.fragments.multiUseImage}
  ${ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${ALL_ACTION_LIST_FILTERS}

  fragment CategoryParentFragment on Category {
    parent {
      identifier
      name
      categoryPage {
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
      ...CategoryParentFragment
      parent {
        ...CategoryParentFragment
        parent {
          ...CategoryParentFragment
        }
      }
    }
  }
`;
