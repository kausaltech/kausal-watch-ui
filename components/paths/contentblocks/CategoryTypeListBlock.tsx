'use client';
import React from 'react';

import { MultiUseImageFragmentFragment } from 'common/__generated__/graphql';
import { CommonContentBlockProps } from 'common/blocks.types';
import { beautifyValue } from 'common/data/format';
import { Link } from 'common/links';
import Card from 'components/common/Card';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { getDeepParents } from '@/common/categories';
import {
  activeGoalVar,
  activeScenarioVar,
  yearRangeVar,
} from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { usePlan } from '@/context/plan';
import {
  CATEGORY_FRAGMENT,
  RECURSIVE_CATEGORY_FRAGMENT,
} from '@/fragments/category.fragment';
import { GET_PATHS_ACTION_LIST } from '@/queries/paths/get-paths-actions';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { Theme } from '@kausal/themes/types';

import ActionParameters from '../ActionParameters';

const getColor = (theme: Theme, darkFallback = theme.themeColors.black) =>
  theme.section.categoryList?.color ||
  readableColor(theme.neutralLight, darkFallback, theme.themeColors.white);

const getBackgroundColor = (theme: Theme) =>
  theme.section.categoryList?.background || theme.neutralLight;

const GET_CATEGORIES_FOR_CATEGORY_TYPE_LIST = gql`
  query GetCategoriesForCategoryTypeList($plan: ID!, $categoryType: ID!) {
    planCategories(plan: $plan, categoryType: $categoryType) {
      ...CategoryRecursiveFragment
    }
  }
  ${RECURSIVE_CATEGORY_FRAGMENT}
`;

const GroupHeader = styled.h4`
  border-left: 6px solid ${(props) => props.$color};
  margin-bottom: 24px;
`;

const GroupIdentifierHeader = styled.div`
  background-color: ${(props) => props.$color};
  color: ${(props) => readableColor(props.$color || '#ffffff')};
  padding: 6px;
  margin-bottom: 12px;
`;

const CategoryListSection = styled.div`
  background-color: ${({ theme }) => getBackgroundColor(theme)};
  padding: ${(props) =>
    `${props.theme.spaces.s400} 0 ${props.theme.spaces.s100} 0`};
  color: ${({ theme }) => getColor(theme)};

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    color: ${({ theme }) => getColor(theme, theme.headingsColor)};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    h2 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }

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

const CardHeader = styled.h3`
  color: ${(props) => props.theme.neutralDark};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
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

const getPathsActionForCategory = (category, actions) => {
  const pathsActionForCategory = actions.find(
    (action) => action.id === category.kausalPathsNodeUuid
  );
  if (!pathsActionForCategory) {
    return null;
  }
  return new PathsActionNode(pathsActionForCategory);
};

const getCategoryColor = (category) => {
  // We have many ways to define the color of a category.
  // For now get the color from category paths group data
  return category.pathsAction?.data.group.color || '#eeeeee';
};

const CategoryList = (props) => {
  const { categories, groups } = props;
  const plan = usePlan();
  const paths = usePaths();
  const activeGoal = useReactiveVar(activeGoalVar);
  const activeScenario = useReactiveVar(activeScenarioVar);
  const yearRange = useReactiveVar(yearRangeVar);
  const t = useTranslations();
  const pathsInstance = paths.instance.id;
  const { data, loading } = useQuery(GET_PATHS_ACTION_LIST, {
    fetchPolicy: 'no-cache',
    variables: { goal: null },
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: pathsInstance }),
    },
  });

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  const categoryData = categories?.map((cat) => {
    const pathsAction = getPathsActionForCategory(cat, data.actions);
    return {
      ...cat,
      pathsAction: pathsAction,
    };
  });

  return (
    <>
      {groups?.map((group) => (
        <Row key={group?.id}>
          <GroupHeader
            $color={getCategoryColor(
              categoryData?.find(
                (cat) => cat?.categoryPage?.live && hasParent(cat, group.id)
              )
            )}
          >
            {group.name}
          </GroupHeader>
          {categoryData
            ?.filter(
              (cat) => cat?.categoryPage?.live && hasParent(cat, group.id)
            )
            .map(
              (cat) =>
                cat.categoryPage && (
                  <Col
                    tag="li"
                    xs="12"
                    sm="6"
                    lg="4"
                    key={cat.id}
                    className="mb-5 d-flex align-items-stretch"
                  >
                    <Card
                      colorEffect={getCategoryColor(cat)}
                      altText={cat.image?.altText}
                    >
                      <GroupIdentifierHeader $color={getCategoryColor(cat)}>
                        {group.name}
                      </GroupIdentifierHeader>
                      <div>
                        {' '}
                        <Link href={cat.categoryPage.urlPath} legacyBehavior>
                          <a className="card-wrapper">
                            <CardHeader className="card-title">
                              {!cat?.type.hideCategoryIdentifiers && (
                                <Identifier>{cat.identifier}. </Identifier>
                              )}
                              {cat.name}
                            </CardHeader>
                          </a>
                        </Link>
                        {cat.leadParagraph && <p>{cat.leadParagraph}</p>}
                        {cat.pathsAction && (
                          <div>
                            {t('impact')} {yearRange[1]}
                            <h4>
                              {yearRange ? (
                                beautifyValue(
                                  cat.pathsAction.getYearlyImpact(yearRange[1])
                                )
                              ) : (
                                <span>---</span>
                              )}
                              {cat.pathsAction.getUnit()}
                            </h4>
                            <ActionParameters
                              parameters={cat.pathsAction.data.parameters}
                            />
                          </div>
                        )}
                      </div>
                    </Card>
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
    return [];
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

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const categories = data.planCategories.filter(
    (cat) => cat.level.id === listByLevel
  );
  return (
    <CategoryListSection id={id}>
      <Container>
        <h3>FILTERS HERE</h3> <h3>SORTING HERE</h3>
        <Row>
          <Col className="mb-4">{heading && <h2>{heading}</h2>}</Col>
        </Row>
        <CategoryList
          categories={categories}
          groups={getParentCategoriesOfLevel(categories, groupByLevel)}
        />
      </Container>
    </CategoryListSection>
  );
};

CategoryTypeListBlock.fragments = {
  category: CATEGORY_FRAGMENT,
};

export default CategoryTypeListBlock;
