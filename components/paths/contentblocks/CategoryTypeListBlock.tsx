'use client';
import React, { useState } from 'react';

import { MultiUseImageFragmentFragment } from 'common/__generated__/graphql';
import { CommonContentBlockProps } from 'common/blocks.types';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import ContentLoader from 'react-content-loader';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { getDeepParents } from '@/common/categories';
import { usePaths } from '@/context/paths/paths';
import { usePlan } from '@/context/plan';
import {
  CATEGORY_FRAGMENT,
  RECURSIVE_CATEGORY_FRAGMENT,
} from '@/fragments/category.fragment';
import { gql, useQuery } from '@apollo/client';
import { Theme } from '@kausal/themes/types';

import CategoryCard from '../CategoryCard';

const getColor = (theme: Theme, darkFallback = theme.themeColors.black) =>
  theme.section.categoryList?.color ||
  readableColor(theme.neutralLight, darkFallback, theme.themeColors.white);

const getBackgroundColor = (theme: Theme) =>
  theme.section.categoryList?.background || theme.neutralLight;

const getSortOptions = (t: TFunction): SortActionsConfig[] => [
  {
    key: 'STANDARD',
    label: t('actions-sort-default'),
    sortKey: 'order',
  },
  {
    key: 'IMPACT',
    label: t('actions-sort-impact'),
    sortKey: 'impactOnTargetYear',
  },
];

const GET_CATEGORIES_FOR_CATEGORY_TYPE_LIST = gql`
  query GetCategoriesForCategoryTypeList($plan: ID!, $categoryType: ID!) {
    planCategories(plan: $plan, categoryType: $categoryType) {
      ...CategoryRecursiveFragment
      indicators {
        id
        name
      }
    }
  }
  ${RECURSIVE_CATEGORY_FRAGMENT}
`;

const CategoryListContentLoader = (props) => {
  const theme = useTheme();
  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 600 80"
      backgroundColor={theme.graphColors.grey010}
      foregroundColor={theme.graphColors.grey030}
      style={{ width: '100%' }}
      {...props}
    >
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <rect x="5" y="2" rx="3" ry="3" width="180" height="69" />
      <rect x="211" y="1" rx="3" ry="3" width="180" height="69" />
      <rect x="413" y="0" rx="3" ry="3" width="180" height="69" />
    </ContentLoader>
  );
};

const HeaderSection = styled.div`
  padding: 4rem 0;
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
`;

const StyledTitle = styled.h1`
  margin-bottom: 2rem;
  font-size: ${(props) => props.theme.fontSizeLg};
  color: inherit;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const GroupHeader = styled.h4`
  border-left: 6px solid ${(props) => props.$color};
  margin-bottom: 24px;
`;

const CategoryListSection = styled.div`
  padding-bottom: 6rem;
  a.card-wrapper {
    display: flex;
    width: 100%;
    color: ${({ theme }) => theme.themeColors.black};

    &:hover {
      color: ${({ theme }) => theme.themeColors.black};
      text-decoration: none;

      .card-title {
        text-decoration: underline;
      }
    }
  }

  ul {
    padding: 0;
  }

  .lead-text {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightMd};
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    .lead-text {
      font-size: ${(props) => props.theme.fontSizeMd};
      line-height: ${(props) => props.theme.lineHeightBase};
    }
  }
`;

export type CategoryListBlockCategory = {
  id: string;
  image?: MultiUseImageFragmentFragment | null;
  color?: string | null;
  iconSvgUrl?: string | null;
  iconImage?: {
    rendition: {
      src: string;
    };
  };
  identifier: string;
  name: string;
  shortDescription?: string;
  leadParagraph?: string;
  categoryPage: {
    urlPath: string;
    live: boolean;
  };
  type: {
    hideCategoryIdentifiers: boolean;
  };
};

const CategoryList = (props) => {
  const { categories, groups } = props;
  const paths = usePaths();
  const t = useTranslations();

  const pathsInstance = paths?.instance.id;
  const sortOptions = getSortOptions(t);

  const [sortBy, setSortBy] = useState<SortActionsConfig>(sortOptions[0]);
  const [categoriesData, setCategoriesData] = useState(categories);
  const [categoriesPathsData, setCategoriesPathsData] = useState(
    categories.map((cat) => {
      return { id: cat.id, impact: null };
    })
  );

  const handleCardLoaded = (id, impact) => {
    //console.log('handleCardLoaded', id, impact);
    setCategoriesPathsData((prevCategories) => {
      const updatedCategories = [...prevCategories];
      const index = updatedCategories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        updatedCategories[index].impact = impact;
      }
      return updatedCategories;
    });
    //console.log('categoriesPathsData', categoriesPathsData);
    //setLoadedCards(prev => ({ ...prev, [id]: impact }));
  };

  const handleChangeSort = (sort: SortActionsBy) => {
    const selectedSorter =
      sortOptions.find((option) => option.key === sort) ?? sortOptions[0];
    setSortBy(selectedSorter);
    const sortedCategories = [...categoriesData].sort((a, b) => {
      if (selectedSorter.key === 'IMPACT') {
        const aValue = categoriesPathsData.find(
          (cat) => cat.id === a.id
        )?.impact;
        const bValue = categoriesPathsData.find(
          (cat) => cat.id === b.id
        )?.impact;
        return bValue - aValue;
      }
      if (selectedSorter.key === 'STANDARD') {
        return a[selectedSorter.sortKey] - b[selectedSorter.sortKey];
      }
      return 0;
    });
    setCategoriesData(sortedCategories);
  };

  return (
    <>
      <Row>
        <Col xs={{ size: 6, offset: 6 }} md={{ size: 2, offset: 10 }}>
          <FormGroup>
            <Label for="sort">{t('actions-sort-by')}</Label>
            <Input
              id="sort"
              name="select"
              type="select"
              onChange={(e) =>
                handleChangeSort(e.target.value as SortActionsBy)
              }
              defaultValue={sortBy.key}
            >
              {sortOptions.map(
                (sortOption) =>
                  !sortOption.isHidden && (
                    <option key={sortOption.key} value={sortOption.key}>
                      {sortOption.label}
                    </option>
                  )
              )}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      {groups?.map((group) => (
        <Row key={group?.id}>
          {group?.id !== 'all' && (
            <GroupHeader $color={group?.color || '#eeeeee'}>
              {group.name}
            </GroupHeader>
          )}
          {categoriesData
            ?.filter(
              (cat) =>
                (cat?.categoryPage?.live && hasParent(cat, group.id)) ||
                group.id === 'all'
            )
            .map(
              (cat) =>
                cat.categoryPage?.live && (
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
                      onLoaded={handleCardLoaded}
                    />
                  </Col>
                )
            )}
        </Row>
      ))}
    </>
  );
};

interface CategoryTypeListBlockProps extends CommonContentBlockProps {
  categories?: Array<CategoryListBlockCategory>;
  groupByLevel?: string;
  listByLevel?: string;
  categoryType?: string;
  heading?: string;
  lead: string;
  style?: 'treemap' | 'cards';
}

const hasParent = (cat, parentId) => {
  const catParents = getDeepParents(cat);
  return catParents.some((parent) => parent.id === parentId);
};

const getParentCategoryOfLevel = (cat, levelId: string) => {
  const catParents = getDeepParents(cat);
  return catParents.find((parent) => parent.level.id === levelId);
};

const getParentCategoriesOfLevel = (cats, levelId: string | undefined) => {
  if (!levelId) {
    return [{ id: 'all', name: 'All' }];
  }
  console.log('cats=', cats, levelId);
  const categoriesOfLevel = cats.map((cat) =>
    getParentCategoryOfLevel(cat, levelId)
  );
  return categoriesOfLevel.filter(
    (cat1, i, arr) => arr.findIndex((cat2) => cat2.id === cat1.id) === i
  );
};

const CategoryTypeListBlock = (props: CategoryTypeListBlockProps) => {
  const { id = '', heading, groupByLevel, listByLevel, categoryType } = props;
  const plan = usePlan();

  const { data, loading, error } = useQuery(
    GET_CATEGORIES_FOR_CATEGORY_TYPE_LIST,
    {
      variables: {
        plan: plan.identifier,
        categoryType: categoryType,
      },
    }
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const categories = data
    ? data.planCategories.filter((cat) => cat.level.id === listByLevel)
    : [];
  const groups = getParentCategoriesOfLevel(categories, groupByLevel);
  return (
    <CategoryListSection id={id}>
      <HeaderSection>
        <Container>
          <Row>
            <Col className="mb-4">
              {heading && <StyledTitle>{heading}</StyledTitle>}
            </Col>
          </Row>
        </Container>
      </HeaderSection>
      <Container>
        {loading ? (
          <CategoryListContentLoader />
        ) : (
          <CategoryList categories={categories} groups={groups} />
        )}
      </Container>
    </CategoryListSection>
  );
};

CategoryTypeListBlock.fragments = {
  category: CATEGORY_FRAGMENT,
};

export default CategoryTypeListBlock;
