import React from 'react';

import Image from 'next/image';

import { gql, useQuery } from '@apollo/client';
import type { Theme } from '@kausal/themes/types';
import { useTranslations } from 'next-intl';
import SVG from 'react-inlinesvg';
import { Col, Container, Row } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import type { CategoryPage } from '@/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/[...slug]/ContentPage';
import type {
  AttributesBlockAttributeFragment,
  GetCategoryAttributeTypesQuery,
  MultiUseImageFragmentFragment,
} from '@/common/__generated__/graphql';
import { getBreadcrumbsFromCategoryHierarchy } from '@/common/categories';
import AttributesBlock, { Attributes } from '@/components/common/AttributesBlock';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CategoryPageStreamField, {
  type CategoryPageMainTopBlock,
} from '@/components/common/CategoryPageStreamField';
import { ChartType } from '@/components/dashboard/ActionStatusGraphs';
import { usePaths } from '@/context/paths/paths';
import { usePlan } from '@/context/plan';

import PathsNodeSummary from '../paths/PathsNodeSummary';
import ActionStatusGraphsBlock from './ActionStatusGraphsBlock';

export const GET_CATEGORY_ATTRIBUTE_TYPES = gql`
  query GetCategoryAttributeTypes($plan: ID!) {
    plan(id: $plan) {
      id
      categoryTypes {
        id
        name
        attributeTypes {
          __typename
          id
          format
          name
          identifier
          helpText
          showChoiceNames
          hasZeroOption
          choiceOptions {
            id
            identifier
          }
          unit {
            id
            name
          }
        }
      }
    }
  }
`;

enum IconSize {
  S = 'S',
  M = 'M',
  L = 'L',
}

const CategoryHeader = styled.div<{ $bg: string | null | undefined; $hasImage?: boolean }>`
  width: 100%;
  position: relative;
  background-color: ${({ $bg }) => $bg};
  min-height: 14rem;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    align-items: flex-start;
    padding: ${({ theme }) => `${theme.spaces.s300} 0`};
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    min-height: ${(props) => (props.$hasImage ? '28rem' : '0')};
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
    min-height: ${(props) => (props.$hasImage ? '32rem' : '0')};
  }
`;

const HeaderImage = styled.div<{
  $imageAlign?: string | null | undefined;
}>`
  height: 320px;
  width: 100%;
  position: relative;
  object-position: ${(props) => props.$imageAlign};
  border-radius: ${(props) => props.theme.cardBorderRadius}
    ${(props) => props.theme.cardBorderRadius} 0 0;
  overflow: hidden;
  background-color: ${(props) => props.theme.brandDark};

  &.full-width {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 14rem;
    border-radius: 0;

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      min-height: 20rem;
    }

    @media (min-width: ${(props) => props.theme.breakpointLg}) {
      min-height: 28rem;
    }

    @media (min-width: ${(props) => props.theme.breakpointXl}) {
      min-height: 32rem;
    }
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.1rem 0.25rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
`;

const HeaderContent = styled.div<{
  $alignWithContent?: boolean;
  $hasImage: boolean;
  $moveDown?: boolean;
}>`
  position: relative;
  text-align: ${({ $alignWithContent }) => ($alignWithContent ? 'left' : 'center')};
  padding: ${({ theme }) => theme.spaces.s200};
  border-radius: ${({ theme, $hasImage }) =>
    $hasImage ? `0 0 ${theme.cardBorderRadius} ${theme.cardBorderRadius}` : theme.cardBorderRadius};
  background-color: ${(props) => props.theme.cardBackground.primary};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: ${({ $moveDown, $hasImage }) => ($moveDown ? '11rem' : $hasImage ? '0' : '1rem')};

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};

    &:last-child {
      margin-bottom: 0;
    }
  }

  p {
    font-size: ${(props) => props.theme.fontSizeBase};
    margin-bottom: ${(props) => props.theme.spaces.s100};

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const AttributesContainer = styled.div`
  max-width: ${(props) => props.theme.breakpointMd};
  margin: 0 ${({ theme }) => (theme.settings.layout.leftAlignCategoryPages ? '0' : 'auto')};
`;

const PathsContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpointSm};
  margin-top: ${({ theme }) => theme.spaces.s100};
`;

const getIconHeight = (size: IconSize = IconSize.M, theme: Theme) => {
  switch (size) {
    case IconSize.L:
      return '180px';
    case IconSize.S:
      return theme.spaces.s400;
    case IconSize.M:
    default:
      return theme.spaces.s600;
  }
};

const CategoryIconImage = styled.img<{ size?: IconSize }>`
  max-height: ${({ theme, size }) => getIconHeight(size, theme)};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CategoryIconSvg = styled(SVG)<{ size?: IconSize; $color?: string | null | undefined }>`
  max-height: ${({ theme, size }) => getIconHeight(size, theme)};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  fill: ${(props) => props.$color || props.theme.brandDark} !important;
  path,
  stroke {
    fill: ${(props) => props.$color || props.theme.brandDark} !important;
  }
`;

const CategoryLevelName = styled.div`
  color: ${(props) => props.theme.textColor.tertiary};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

type CategoryTypes = NonNullable<GetCategoryAttributeTypesQuery['plan']>['categoryTypes'];

interface CategoryHeaderAttributesProps extends Pick<Props, 'page'> {
  layout: CategoryPageMainTopBlock[];
  children?: React.ReactNode;
}

const CategoryHeaderAttributes = ({ layout, page, children }: CategoryHeaderAttributesProps) =>
  layout.length ? (
    <AttributesContainer>
      <Attributes>
        <Row>
          {layout.map((block, i) => (
            <CategoryPageStreamField key={i} block={block} page={page} context="hero" />
          ))}
        </Row>
        {children}
      </Attributes>
    </AttributesContainer>
  ) : null;

interface LegacyCategoryHeaderAttributesProps
  extends Pick<Props, 'attributes' | 'categoryId' | 'typeId'> {
  categoryTypes?: CategoryTypes;
  children?: React.ReactNode;
}

const LegacyCategoryHeaderAttributes = ({
  attributes,
  categoryId,
  categoryTypes,
  typeId,
  children,
}: LegacyCategoryHeaderAttributesProps) => {
  const plan = usePlan();

  const attributeTypes = categoryTypes
    ? (categoryTypes.find((type) => type.id === typeId)?.attributeTypes ?? [])
    : [];

  // AttributeCategoryChoice type can be empty, so we need to filter those out
  const attributesWithContent =
    attributes?.filter(
      (attribute) =>
        attribute.__typename !== 'AttributeCategoryChoice' || attribute.categories?.length > 0
    ) ?? [];

  return attributesWithContent.length > 0 && attributes && attributeTypes ? (
    <AttributesContainer>
      <AttributesBlock attributes={attributes} types={attributeTypes}>
        {plan.actionStatuses.length ? (
          <ActionStatusGraphsBlock
            categoryId={categoryId}
            chart={ChartType.BAR}
            shownDatasets={{ progress: true }}
            columnProps={{ md: 12, lg: 12, xl: 12 }}
            withContainer={false}
          />
        ) : null}
        {children}
      </AttributesBlock>
    </AttributesContainer>
  ) : null;
};

/*
Category header can have several variations

Two layout options for header image:

theme.settings.layout.containImages: true
-- header image width is limited by container
-- header content directly underneath the image, container width block
-- background color of the section is brandDark

theme.settings.layout.containImages: false (default)
-- header image is full browser width
-- header content overlaps the image, narrow width block
-- background color of the section is the category color

Header content alignment:

theme.settings.layout.leftAlignCategoryPages: true
-- the text content is left aligned
theme.settings.layout.leftAlignCategoryPages: false (default)
-- the text content is centered

Category attributes:

Layout configured in category page level layout admin
-- Configured attributes displayed in header content
Layout not configured in category page level layout admin
-- All available attributes (LegacyCategoryHeaderAttributes) displayed in header content
-- Category's actions status graph is always displayed if plan.actionStatuses.length > 0

*/
interface Props {
  page: CategoryPage;
  title: string;
  categoryId: string;
  identifier: string | null | undefined;
  lead?: string;
  iconImage: string | null | undefined;
  headerImage: MultiUseImageFragmentFragment | null | undefined;
  imageAlign?: string;
  color?: string | null | undefined;
  attributes: AttributesBlockAttributeFragment[] | null | undefined;
  typeId: string;
  level: string | null | undefined;
  layout?: CategoryPageMainTopBlock[] | null;
}

export default function CategoryPageHeaderBlock(props: Props) {
  const {
    page,
    title,
    categoryId,
    identifier,
    lead,
    iconImage,
    headerImage,
    imageAlign,
    color,
    attributes,
    typeId,
    level,
    layout,
  } = props;
  console.log('CategoryPageHeaderBlock', props);
  const plan = usePlan();
  const theme = useTheme();
  const t = useTranslations();
  const paths = usePaths();
  const pathsInstance = paths?.instance;

  const containImages = theme.settings.layout.containImages ?? false;
  const imageLayout = containImages ? 'contained' : 'full-width';
  //const contentAlignment = theme.settings.layout.leftAlignCategoryPages ? 'left' : 'center';
  const showIdentifiers = !plan.primaryActionClassification?.hideCategoryIdentifiers;

  const { data } = useQuery<GetCategoryAttributeTypesQuery>(GET_CATEGORY_ATTRIBUTE_TYPES, {
    variables: {
      plan: plan.identifier,
    },
  });

  const columnSizing = containImages
    ? { md: 12 }
    : {
        xl: { size: 8, offset: 2 },
        lg: { size: 8, offset: 2 },
        md: { size: 10, offset: 1 },
      };

  const showLevel = level && !theme.settings.categories.categoryPageHideCategoryLabel;
  const parentCategory = page.category?.parent;

  const pathsNodeId = page.category?.kausalPathsNodeUuid;
  const PathsNodeAttribute =
    pathsNodeId && pathsInstance?.id ? (
      <AttributesContainer>
        <PathsNodeSummary
          categoryId={identifier ?? ''}
          node={pathsNodeId}
          pathsInstance={pathsInstance}
        />
      </AttributesContainer>
    ) : null;
  return (
    <CategoryHeader $bg={containImages ? theme.brandDark : color} $hasImage={!!headerImage}>
      <Container className="header-container">
        {headerImage && headerImage.large && (
          <HeaderImage $imageAlign={imageAlign} className={imageLayout}>
            <Image
              src={headerImage.large.src}
              alt={headerImage.altText ?? ''}
              sizes="100vw"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: imageAlign,
              }}
            />
          </HeaderImage>
        )}
        <Row>
          <Col {...columnSizing}>
            <HeaderContent
              $alignWithContent={theme.settings.layout.leftAlignCategoryPages}
              $hasImage={!!headerImage && imageLayout === 'contained'}
              $moveDown={!!headerImage && !containImages}
            >
              {showLevel && <CategoryLevelName>{level}</CategoryLevelName>}

              {!!parentCategory && (
                <Breadcrumbs
                  breadcrumbs={getBreadcrumbsFromCategoryHierarchy(
                    [parentCategory],
                    showIdentifiers
                  )}
                />
              )}

              {iconImage &&
                (iconImage.toLowerCase().split('?')[0].endsWith('.svg') ? (
                  <CategoryIconSvg
                    size={(page?.layout?.iconSize as IconSize) ?? undefined}
                    src={iconImage}
                    title=""
                    $color={color}
                  />
                ) : (
                  <CategoryIconImage
                    size={(page?.layout?.iconSize as IconSize) ?? undefined}
                    src={iconImage}
                    alt=""
                  />
                ))}
              <h1>
                {identifier && <Identifier>{identifier}.</Identifier>} {title}
              </h1>
              {lead && <p>{lead}</p>}

              {layout ? (
                <CategoryHeaderAttributes page={page} layout={layout}>
                  {PathsNodeAttribute}
                </CategoryHeaderAttributes>
              ) : (
                <LegacyCategoryHeaderAttributes
                  attributes={attributes}
                  categoryTypes={data?.plan?.categoryTypes}
                  categoryId={categoryId}
                  typeId={typeId}
                >
                  {PathsNodeAttribute}
                </LegacyCategoryHeaderAttributes>
              )}
            </HeaderContent>
          </Col>
        </Row>
      </Container>
      {headerImage?.altText && (
        <span className="sr-only" role="img" aria-label={headerImage?.altText} />
      )}
      {headerImage?.imageCredit && (
        <ImageCredit>{`${t('image-credit')}: ${headerImage?.imageCredit}`}</ImageCredit>
      )}
    </CategoryHeader>
  );
}
