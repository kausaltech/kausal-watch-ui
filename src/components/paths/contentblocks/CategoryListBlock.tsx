'use client';

import React, { Suspense } from 'react';

import styled from '@emotion/styled';
import { Col, Container, Row } from 'reactstrap';

import { CategoryFragmentFragment } from '@/common/__generated__/graphql';
import { CommonContentBlockProps } from '@/common/blocks.types';
import { useFallbackCategories } from '@/context/categories';
import { usePaths } from '@/context/paths/paths';
import { CATEGORY_FRAGMENT } from '@/fragments/category.fragment';

import CategoryCard from '../CategoryCard';

const CategoryListSection = styled.div`
  background-color: ${(props) =>
    props.theme.section.categoryList?.background || props.theme.neutralLight};
  padding: ${(props) => `${props.theme.spaces.s200} 0 ${props.theme.spaces.s100} 0`};
  color: ${(props) => props.theme.section.categoryList?.color || props.theme.neutralDark};
`;

const CategoryList = ({ categories, pathsInstance, group }) => (
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
            group={group}
            pathsInstance={pathsInstance}
            onLoaded={() => void 0}
          />
        </Col>
      ))}
  </Row>
);

interface CategoryListBlockProps extends CommonContentBlockProps {
  categories?: Array<CategoryFragmentFragment>;
  heading?: string;
  lead?: string | null;
  style?: 'treemap' | 'cards';
  group?: CategoryFragmentFragment;
}

const CategoryListBlock = (props: CategoryListBlockProps) => {
  const fallbackCategories = useFallbackCategories();
  const paths = usePaths();
  const { id = '', categories = fallbackCategories, heading, group } = props;

  const pathsInstance = paths?.instance;

  return (
    <CategoryListSection id={id}>
      <Container>
        {heading && <h4>{heading}</h4>}
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryList categories={categories} pathsInstance={pathsInstance} group={group} />
        </Suspense>
      </Container>
    </CategoryListSection>
  );
};

CategoryListBlock.fragments = {
  category: CATEGORY_FRAGMENT,
};

export default CategoryListBlock;
