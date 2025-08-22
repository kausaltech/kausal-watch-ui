import React, { useCallback, useMemo, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import * as Sentry from '@sentry/nextjs';
import { concat } from 'lodash';
import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import type { GetCategoriesForTreeMapQuery } from '@/common/__generated__/graphql';
import type { CommonContentBlockProps } from '@/common/blocks.types';
import CategoryActionList from '@/components/actions/CategoryActionList';
import CategoryCardContent from '@/components/common/CategoryCardContent';
import ContentLoader from '@/components/common/ContentLoader';
import ErrorMessage from '@/components/common/ErrorMessage';
import CategoryTreeMap from '@/components/graphs/CategoryTreeMap';
import { usePlan } from '@/context/plan';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s100};

  h2 {
    text-align: center;
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s400} 0;
  }
`;

const TreemapContent = styled.div`
  text-align: center;

  .pathbar .slicetext {
    text-decoration: underline;
  }

  .pathbar.cursor-pointer .surface {
    stroke: ${(props) => props.theme.neutralLight} !important;
    stroke-opacity: 1 !important;
    stroke-width: 2px !important;
  }
`;

const CategoryCard = styled.div`
  position: relative;
  z-index: 199;
  background-color: white;
  padding: 1rem;
  margin: 1rem 3px 3px 3px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  border-left: 0.5rem solid ${(props) => props.color};
  border-radius: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    right: 75%;
    z-index: 200;
    top: -1.25rem;
    width: 0;
    height: 0;
    border-top: 0;
    border-left: 1.25rem solid transparent;
    border-right: 1.25rem solid transparent;
    border-bottom: 1.25rem solid white;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: 2rem 1rem 3px 0;
    height: calc(100% - 2rem);

    &::after {
      right: -1.5rem;
      top: 33%;
      border-top: 1.5rem solid transparent;
      border-bottom: 1.5rem solid transparent;
      border-left: 1.5rem solid white;
      border-right: 0;
    }
  }
`;

const CategoryTreeLayout = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: row;
  }
`;

const CategoryCardColumn = styled.div`
  flex: 0 0 50%;

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    flex: 0 0 33%;
  }
`;

const CategoryVizColumn = styled.div`
  flex: 0 0 50%;

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    flex: 0 0 66%;
  }
`;

// TODO: clean out unecessary fields. Fetching a lot for now

const GET_CATEGORIES_FOR_TREEMAP = gql`
  query GetCategoriesForTreeMap($plan: ID!, $categoryType: ID!, $attributeType: ID!) {
    planCategories(plan: $plan, categoryType: $categoryType) {
      id
      name
      leadParagraph
      image {
        id
        title
        imageCredit
        altText
        rendition(size: "600x300") {
          id
          width
          height
          src
          alt
        }
      }
      categoryPage {
        id
        title
        path
        slug
        url
        urlPath
        depth
        contentType
        body {
          ... on RichTextBlock {
            value
          }
        }
      }
      color
      parent {
        id
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
      attributes(id: $attributeType) {
        ... on AttributeNumericValue {
          value
        }
      }
    }
  }
`;

type CategoryTreeSectionProps = {
  id?: string;
  heading?: string | null;
  lead?: string | null;
  sections: NonNullable<GetCategoriesForTreeMapQuery['planCategories']>;
  valueAttribute: {
    unit: {
      shortName: string | null;
    } | null;
  };
  hasSidebar?: boolean;
};

const CategoryTreeSection = ({
  id = '',
  sections,
  valueAttribute,
  heading = 'Categories',
  hasSidebar,
}: CategoryTreeSectionProps) => {
  // console.log(sections);
  const rootSection = sections.find((sect) => sect.parent === null)!;
  const [activeCategory, setCategory] = useState(rootSection);

  // useCallback, so function prop does not cause graph re-rendering
  const onChangeSection = useCallback(
    (cat: string) => {
      const allSections = concat(rootSection, sections);
      const newCat = allSections.find((sect) => sect.id === cat);
      if (!newCat) return;
      setCategory(newCat);
    },
    [sections, rootSection]
  );
  return (
    <CategoryListSection id={id}>
      <Container>
        <Row>
          <Col
            xl={{ size: 9, offset: hasSidebar ? 3 : 2 }}
            lg={{ size: 8, offset: hasSidebar ? 4 : 2 }}
            md={{ size: 10, offset: 1 }}
          >
            {heading && <h2>{heading}</h2>}
            <CategoryTreeLayout>
              <CategoryCardColumn>
                <CategoryCard color={activeCategory.color}>
                  <CategoryCardContent
                    category={activeCategory}
                    isRoot={activeCategory.id == rootSection.id}
                    sumValues={rootSection.attributes[0].value}
                    key={activeCategory.id}
                  />
                </CategoryCard>
              </CategoryCardColumn>
              <CategoryVizColumn>
                <TreemapContent>
                  <CategoryTreeMap
                    data={sections}
                    onChangeSection={onChangeSection}
                    valueAttribute={valueAttribute}
                    heading={heading}
                  />
                </TreemapContent>
              </CategoryVizColumn>
            </CategoryTreeLayout>
            <CategoryActionList activeCategory={activeCategory} categories={sections} />
          </Col>
        </Row>
      </Container>
    </CategoryListSection>
  );
};

interface CategoryTreeBlockProps extends CommonContentBlockProps {
  treeMapCategoryType: {
    identifier: string;
  };
  valueAttribute: {
    identifier: string;
    unit: {
      shortName: string | null;
    } | null;
  };
  hasSidebar: boolean;
  heading: string | null;
  lead: string | null;
}

function CategoryTreeBlockBrowser(
  props: CategoryTreeBlockProps & {
    categories: NonNullable<GetCategoriesForTreeMapQuery['planCategories']>;
  }
) {
  const { id = '', categories: cats, heading, lead, hasSidebar } = props;
  const catMap = useMemo(() => new Map(cats.map((cat) => [cat.id, cat])), [cats]);

  const findFirstAncestorColor = useCallback(
    (id: string) => {
      const cat = catMap.get(id)!;
      if (cat.color) return cat.color;
      let parentId = cat.parent?.id;
      while (parentId) {
        const parent = catMap.get(parentId)!;
        if (parent.color) return parent.color;
        parentId = parent.parent?.id;
      }
      return '';
    },
    [catMap]
  );

  const augmentedCategories = useMemo(
    () =>
      cats.map((cat) => ({
        ...cat,
        color: findFirstAncestorColor(cat.id),
      })),
    [cats, findFirstAncestorColor]
  );

  return (
    <CategoryTreeSection
      id={id}
      heading={heading}
      lead={lead}
      sections={augmentedCategories}
      valueAttribute={props.valueAttribute}
      hasSidebar={hasSidebar}
    />
  );
}

function CategoryTreeBlock(props: CategoryTreeBlockProps) {
  const { treeMapCategoryType, valueAttribute, hasSidebar } = props;
  const plan = usePlan();
  const { data, loading, error } = useQuery<GetCategoriesForTreeMapQuery>(
    GET_CATEGORIES_FOR_TREEMAP,
    {
      variables: {
        plan: plan.identifier,
        categoryType: treeMapCategoryType.identifier,
        attributeType: valueAttribute.identifier,
      },
      skip: typeof window === 'undefined',
    }
  );

  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }

  if (error) return <ErrorMessage message={error.message} />;
  if (loading || !data) return <ContentLoader />;
  if (!data.planCategories) {
    Sentry.captureMessage('CategoryTreeBlock missing categories');
    return null;
  }

  return (
    <CategoryTreeBlockBrowser categories={data.planCategories} {...props} hasSidebar={hasSidebar} />
  );
}

export default CategoryTreeBlock;
