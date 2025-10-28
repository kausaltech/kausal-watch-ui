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
import { usePlan } from '@/context/plan';

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

const CategoryHeader = styled.div<{ $bg?: string | null | undefined; $hasImage?: boolean }>`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.brandDark};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    align-items: flex-start;
    padding: ${({ theme }) => `${theme.spaces.s300} 0`};
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    ${(props) => (props.$hasImage ? '28rem' : '0')};
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
    ${(props) => (props.$hasImage ? '30rem' : '0')};
  }
`;

const HeaderImage = styled.div<{
  $imageAlign?: string | null | undefined;
}>`
  height: 420px;
  width: 100%;
  position: relative;
  object-position: ${(props) => props.$imageAlign};

  &.full-width {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 420px;
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

const HeaderContent = styled.div<{ $alignWithContent?: boolean; $hasImage: boolean }>`
  position: relative;
  text-align: ${({ $alignWithContent }) => ($alignWithContent ? 'left' : 'center')};
  padding: ${({ theme }) => theme.spaces.s200};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};

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
}

const CategoryHeaderAttributes = ({ layout, page }: CategoryHeaderAttributesProps) =>
  layout.length ? (
    <AttributesContainer>
      <Attributes>
        <Row>
          {layout.map((block, i) => (
            <CategoryPageStreamField key={i} block={block} page={page} context="hero" />
          ))}
        </Row>
      </Attributes>
    </AttributesContainer>
  ) : null;

interface LegacyCategoryHeaderAttributesProps
  extends Pick<Props, 'attributes' | 'categoryId' | 'typeId'> {
  categoryTypes?: CategoryTypes;
}

const LegacyCategoryHeaderAttributes = ({
  attributes,
  categoryId,
  categoryTypes,
  typeId,
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
      <AttributesBlock attributes={attributes} types={attributeTypes} />
      {plan.actionStatuses.length ? (
        <ActionStatusGraphsBlock
          categoryId={categoryId}
          chart={ChartType.BAR}
          shownDatasets={{ progress: true }}
          columnProps={{ md: 12, lg: 12, xl: 12 }}
        />
      ) : null}
    </AttributesContainer>
  ) : null;
};

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

  const imageLayout = theme.settings.layout.containImages ? 'contained' : 'full-width';
  const contentAlignment = theme.settings.layout.leftAlignCategoryPages ? 'left' : 'center';
  const showIdentifiers = !plan.primaryActionClassification?.hideCategoryIdentifiers;

  const { data } = useQuery<GetCategoryAttributeTypesQuery>(GET_CATEGORY_ATTRIBUTE_TYPES, {
    variables: {
      plan: plan.identifier,
    },
  });

  const columnSizing = theme.settings.layout.containImages
    ? { md: 12 }
    : {
        xl: { size: 8, offset: 2 },
        lg: { size: 8, offset: 2 },
        md: { size: 10, offset: 1 },
      };

  const showLevel = level && !theme.settings.categories.categoryPageHideCategoryLabel;
  const parentCategory = page.category?.parent;
  return (
    <CategoryHeader $bg={color} $hasImage={!!headerImage}>
      <Container className="header-container">
        {headerImage && headerImage.large && (
          <HeaderImage $imageAlign={imageAlign} className={imageLayout}>
            <Image
              src={headerImage.large.src}
              alt="Picture of the author"
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
              $hasImage={!!headerImage}
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
                <CategoryHeaderAttributes page={page} layout={layout} />
              ) : (
                <LegacyCategoryHeaderAttributes
                  attributes={attributes}
                  categoryTypes={data?.plan?.categoryTypes}
                  categoryId={categoryId}
                  typeId={typeId}
                />
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
