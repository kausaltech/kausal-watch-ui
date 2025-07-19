import React from 'react';

import Image from 'next/image';

import { gql } from '@apollo/client';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { CategoryPage } from 'components/common/CategoryPageStreamField';
import { usePaths } from 'context/paths/paths';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import { Category } from '@/common/__generated__/graphql';
import { getBreadcrumbsFromCategoryHierarchy } from '@/common/categories';

import PathsNodeSummary from '../PathsNodeSummary';

export const GET_CATEGORY_ATTRIBUTE_TYPES = gql`
  query GetCategoryAttributeTypes($plan: ID!) {
    plan(id: $plan) {
      id
      categoryTypes {
        id
        name
        attributeTypes {
          __typename
          format
          identifier
          choiceOptions {
            identifier
          }
        }
      }
    }
  }
`;

const Background = styled.div<{ $hasHeaderImage: boolean }>`
  padding: ${(props) => (props.$hasHeaderImage ? '2rem 0' : '4rem 0 2em')};
  background-color: ${(props) => props.theme.brandDark};
`;

const HeaderImage = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
`;

const CategoryHeader = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBackground.primary};
  margin-bottom: 1rem;

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

const PathsContentWrapper = styled.div`
  max-width: 500px;
`;

interface CategoryPageHeaderProps {
  page: CategoryPage;
  title: string;
  identifier;
  lead?: string;
  color?;
  attributes;
  pathsNodeId;
}

function CategoryPageHeaderBlock(props: CategoryPageHeaderProps) {
  const { title, identifier, lead, pathsNodeId, page } = props;
  const paths = usePaths();
  const pathsInstance = paths?.instance;
  const headerImage = page.category?.image || page.category?.parent?.image;

  const breadcrumbs = page.category?.parent
    ? getBreadcrumbsFromCategoryHierarchy([page.category.parent as Category], false)
    : [];

  /*
  // Not needed, leaving this here for reference
  const rootCategoryListPage =
    page?.category && page.category.type.id === '76'
      ? { id: 0, name: 'Bereiche', url: '/klimaschutzplan/bereiche' }
      : null;
  const currentCategoryListPage =
    page?.category && page.category.level?.id === '25'
      ? {
          id: 1,
          name: page.category.level.namePlural,
          url: '/klimaschutzplan/massnahmenpakete',
        }
      : null;
  if (rootCategoryListPage) breadcrumbs.unshift(rootCategoryListPage);
  if (currentCategoryListPage) breadcrumbs.push(currentCategoryListPage);
  */

  return (
    <Background $hasHeaderImage={!!headerImage}>
      <Container>
        {headerImage && headerImage.large && (
          <HeaderImage>
            <Image
              src={headerImage.large.src}
              alt="Picture of the author"
              sizes="100vw"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </HeaderImage>
        )}
        <CategoryHeader>
          {!!breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          <h1>
            {identifier && <Identifier>{identifier}.</Identifier>} {title}
          </h1>
          {lead && <p>{lead}</p>}
          {pathsNodeId && pathsInstance?.id && (
            <PathsContentWrapper>
              <PathsNodeSummary
                categoryId={identifier}
                node={pathsNodeId}
                pathsInstance={pathsInstance}
              />
            </PathsContentWrapper>
          )}
        </CategoryHeader>
      </Container>
    </Background>
  );
}

export default CategoryPageHeaderBlock;
