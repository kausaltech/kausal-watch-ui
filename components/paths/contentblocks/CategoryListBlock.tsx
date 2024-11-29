'use client';
import React, { Suspense } from 'react';

import { CommonContentBlockProps } from 'common/blocks.types';
import { useFallbackCategories } from 'context/categories';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { CATEGORY_FRAGMENT } from '@/fragments/category.fragment';
import { CategoryFragmentFragment } from 'common/__generated__/graphql';
import { usePaths } from '@/context/paths/paths';

import CategoryCard from '../CategoryCard';

const CategoryListSection = styled.div`
  background-color: ${(props) =>
    props.theme.section.categoryList?.background || props.theme.neutralLight};
  padding: ${(props) =>
    `${props.theme.spaces.s200} 0 ${props.theme.spaces.s100} 0`};
  color: ${(props) =>
    props.theme.section.categoryList?.color || props.theme.neutralDark};
`;

const CategoryList = ({ categories, pathsInstance }) => (
  <Row>
    {categories
      ?.filter((cat) => cat?.categoryPage?.live)
      .map((cat) => (
        <Col
          tag="li"
          xs="12"
          sm="6"
          lg="4"
          key={cat.id}
          className="mb-5 d-flex align-items-stretch"
        >
          <CategoryCard
            category={cat}
            pathsInstance={pathsInstance}
            onLoaded={(id, impact) => {
              console.log(`Category ${id} loaded with impact: ${impact}`);
            }}
          />
        </Col>
      ))}
  </Row>
);

interface CategoryListBlockProps extends CommonContentBlockProps {
  categories?: Array<CategoryFragmentFragment>;
  heading?: string;
  lead: string;
  style?: 'treemap' | 'cards';
}

const CategoryListBlock = (props: CategoryListBlockProps) => {
  const fallbackCategories = useFallbackCategories();
  const paths = usePaths();
  const { id = '', categories = fallbackCategories, heading } = props;

  const pathsInstance = paths?.instance?.id;

  return (
    <CategoryListSection id={id}>
      <Container>
        {heading && <h4>{heading}</h4>}
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryList categories={categories} pathsInstance={pathsInstance} />
        </Suspense>
      </Container>
    </CategoryListSection>
  );
};

CategoryListBlock.fragments = {
  category: CATEGORY_FRAGMENT,
};

export default CategoryListBlock;
