import React, { Suspense } from 'react';

import { MultiUseImageFragmentFragment } from 'common/__generated__/graphql';
import { CommonContentBlockProps } from 'common/blocks.types';
import { Link } from 'common/links';
import Card from 'components/common/Card';
import { useFallbackCategories } from 'context/categories';
import { readableColor } from 'polished';
import { GET_ACTION_LIST } from 'queries/get-paths-actions';
import { Col } from 'reactstrap';
import styled from 'styled-components';

import { usePlan } from '@/context/plan';
import { CATEGORY_FRAGMENT } from '@/fragments/category.fragment';
import { getHttpHeaders } from '@/utils/paths.utils';
import { useSuspenseQuery } from '@apollo/client';
import { Theme } from '@kausal/themes/types';

const getColor = (theme: Theme, darkFallback = theme.themeColors.black) =>
  theme.section.categoryList?.color ||
  readableColor(theme.neutralLight, darkFallback, theme.themeColors.white);

const getBackgroundColor = (theme: Theme) =>
  theme.section.categoryList?.background || theme.neutralLight;

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

const PATHS_WATCH_MOCK_MAP = {
  MP3: 'reduce_transportation_demand',
  MP4: 'shift_to_sustainable_transport_modes',
  MP5: 'improved_vehicle_fleet',
};

const getPathsActionForCategory = (category, actions) => {
  return actions.find(
    (action) => action.id === PATHS_WATCH_MOCK_MAP[category.identifier]
  );
};

const CategoryList = (props) => {
  const { categories } = props;
  const plan = usePlan();
  const pathsInstance = plan.kausalPathsInstanceUuid;
  const { data } = useSuspenseQuery(GET_ACTION_LIST, {
    variables: { goal: null },
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: pathsInstance }),
    },
  });
  console.log('paths actions', data);

  const categoryData = categories?.map((cat) => {
    const pathsAction = getPathsActionForCategory(cat, data.actions);
    console.log('pathsAction', pathsAction);
    return {
      ...cat,
      level: pathsAction?.decisionLevel,
      unit:
        pathsAction?.unit.htmlShort ||
        pathsAction?.unit.htmlLong ||
        pathsAction?.unit.short ||
        pathsAction?.unit.long,
      cumulativeForecast: pathsAction?.impactMetric.cumulativeForecastValue,
    };
  });

  console.log('categoryData', categoryData);
  return (
    <>
      {categoryData
        ?.filter((cat) => cat?.categoryPage?.live)
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
                <Link href={cat.categoryPage.urlPath} legacyBehavior>
                  <a className="card-wrapper">
                    <Card
                      colorEffect={cat.color ?? undefined}
                      altText={cat.image?.altText}
                    >
                      <div>
                        {cat.level}
                        <CardHeader className="card-title">
                          {!cat?.type.hideCategoryIdentifiers && (
                            <Identifier>{cat.identifier}. </Identifier>
                          )}
                          {cat.name}
                        </CardHeader>
                        {cat.leadParagraph && <p>{cat.leadParagraph}</p>}
                        {cat.cumulativeForecast} {cat.unit}
                      </div>
                    </Card>
                  </a>
                </Link>
              </Col>
            )
        )}
    </>
  );
};

interface CategoryListBlockProps extends CommonContentBlockProps {
  categories?: Array<CategoryListBlockCategory>;
  heading?: string;
  lead: string;
  style?: 'treemap' | 'cards';
}

const CategoryListBlock = (props: CategoryListBlockProps) => {
  const fallbackCategories = useFallbackCategories();
  const { id = '', categories = fallbackCategories } = props;

  return (
    <CategoryListSection id={id}>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList categories={categories} />
      </Suspense>
    </CategoryListSection>
  );
};

CategoryListBlock.fragments = {
  category: CATEGORY_FRAGMENT,
};

export default CategoryListBlock;
