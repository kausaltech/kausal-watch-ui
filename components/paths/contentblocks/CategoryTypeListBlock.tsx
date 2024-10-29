'use client';
import React, { useMemo, useState } from 'react';

import {
  Category,
  CategoryFragmentFragment,
} from 'common/__generated__/graphql';
import { useTranslations } from 'next-intl';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import styled from 'styled-components';

import { getDeepParents } from '@/common/categories';
import { TFunction } from '@/common/i18n';
import { usePaths } from '@/context/paths/paths';
import { CATEGORY_FRAGMENT } from '@/fragments/category.fragment';

import CategoryCard from '../CategoryCard';

/*
const getColor = (theme: Theme, darkFallback = theme.themeColors.black) =>
  theme.section.categoryList?.color ||
  readableColor(theme.neutralLight, darkFallback, theme.themeColors.white);

const getBackgroundColor = (theme: Theme) =>
  theme.section.categoryList?.background || theme.neutralLight;
*/

type SortActionsConfig = {
  key: 'IMPACT' | 'STANDARD';
  label: string;
  sortKey: string;
  isHidden?: boolean;
};

const getSortOptions = (t: TFunction): SortActionsConfig[] => [
  {
    key: 'STANDARD',
    label: t('actions-sort-default'),
    sortKey: 'order',
  },
  {
    key: 'IMPACT',
    label: t('actions-sort-impact'),
    sortKey: 'impact',
  },
];

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

const GroupHeader = styled.h4<{ $color: string }>`
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

interface CategoryTypeListBlockProps {
  id?: string;
  categories: CategoryFragmentFragment[];
  groupByLevelId?: string;
  heading?: string;
  lead?: string | null;
  style?: 'treemap' | 'cards';
}

interface ImpactData {
  id: string;
  impact: number | null;
}

const CategoryTypeListBlock = (props: CategoryTypeListBlockProps) => {
  const { id = '', heading, groupByLevelId, categories } = props;

  const paths = usePaths();
  const t = useTranslations();
  const pathsInstance = paths?.instance.id;
  const sortOptions = getSortOptions(t);

  const groups = useMemo(
    () =>
      getParentCategoriesOfLevel(categories, groupByLevelId) || [
        { id: 'all', name: 'All' } as CategoryFragmentFragment,
      ],
    [categories, groupByLevelId]
  );
  const [sortBy, setSortBy] = useState<SortActionsConfig>(sortOptions[0]);
  const [categoriesPathsData, setCategoriesPathsData] = useState<ImpactData[]>(
    categories?.map((cat) => {
      return { id: cat.id, impact: null };
    })
  );

  /*
   * Augment listed categories with loaded impact data from Paths
   * to enable sorting by impact. We call it all 'impact' for now
   */
  const handleCardLoaded = (id: string, impact: number) => {
    setCategoriesPathsData((prevCategories) => {
      const updatedCategories = [...prevCategories];
      const index = updatedCategories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        updatedCategories[index].impact = impact;
      }
      return updatedCategories;
    });
  };

  const handleChangeSort = (sort: SortActionsConfig['key']) => {
    const selectedSorter =
      sortOptions.find((option) => option.key === sort) ?? sortOptions[0];
    setSortBy(selectedSorter);
  };

  const sortedCategories: CategoryFragmentFragment[] = useMemo(
    () =>
      [...categories].sort((a, b) => {
        if (sortBy.key === 'IMPACT') {
          // if cat has no impact make sure it gets sorted to the bottom
          const aValue =
            categoriesPathsData.find((cat) => cat.id === a.id)?.impact ||
            Number.NEGATIVE_INFINITY;
          const bValue =
            categoriesPathsData.find((cat) => cat.id === b.id)?.impact ||
            Number.NEGATIVE_INFINITY;
          return bValue - aValue;
        }
        if (sortBy.key === 'STANDARD') {
          return b[sortBy.sortKey] - a[sortBy.sortKey];
        }
        return 0;
      }),
    [sortBy, categories, categoriesPathsData]
  );

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
        <Row>
          <Col xs={{ size: 6, offset: 6 }} md={{ size: 2, offset: 10 }}>
            <FormGroup>
              <Label for="sort">{t('actions-sort-by')}</Label>
              <Input
                id="sort"
                name="select"
                type="select"
                onChange={(e) =>
                  handleChangeSort(e.target.value as SortActionsConfig['key'])
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
            {sortedCategories
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
                        category={cat as Category}
                        group={group}
                        pathsInstance={pathsInstance}
                        onLoaded={handleCardLoaded}
                      />
                    </Col>
                  )
              )}
          </Row>
        ))}
      </Container>
    </CategoryListSection>
  );
};

const hasParent = (cat, parentId) => {
  const catParents = getDeepParents(cat);
  return catParents.some((parent) => parent.id === parentId);
};

const getParentCategoryOfLevel = (
  cat: CategoryFragmentFragment,
  levelId: string
): CategoryFragmentFragment => {
  const catParents = getDeepParents(cat as Category);
  return catParents.find(
    (parent) => parent.level?.id === levelId
  ) as CategoryFragmentFragment;
};

const getParentCategoriesOfLevel = (
  cats: CategoryFragmentFragment[],
  levelId: string | undefined
): CategoryFragmentFragment[] | undefined => {
  if (!levelId) {
    return undefined;
  }
  const categoriesOfLevel = cats.map((cat) =>
    getParentCategoryOfLevel(cat, levelId)
  );
  return categoriesOfLevel.filter(
    (cat1, i, arr) => arr.findIndex((cat2) => cat2?.id === cat1?.id) === i
  );
};

CategoryTypeListBlock.fragments = {
  category: CATEGORY_FRAGMENT,
};

export default CategoryTypeListBlock;
