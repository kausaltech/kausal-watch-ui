import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Theme } from '@kausal/themes/types';
import PlanContext, { usePlan } from 'context/plan';
import { Link } from 'common/links';
import { useTranslation } from 'common/i18n';
import AttributesBlock, { Attributes } from 'components/common/AttributesBlock';
import { useTheme } from 'common/theme';
import {
  CategoryPageMainTopBlock,
  CategoryTypePageLevelLayout,
  GetCategoryAttributeTypesQuery,
} from 'common/__generated__/graphql';
import CategoryPageStreamField, {
  CategoryPage,
} from 'components/common/CategoryPageStreamField';
import { ChartType } from 'components/dashboard/ActionStatusGraphs';
import ActionStatusGraphsBlock from './ActionStatusGraphsBlock';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { getBreadcrumbsFromCategoryHierarchy } from 'common/categories';

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

enum IconSize {
  S = 'S',
  M = 'M',
  L = 'L',
}

const CategoryHeader = styled.div<{
  $bg?: string;
  $hasImage?: boolean;
}>`
  width: 100%;
  position: relative;
  background-color: ${(props) =>
    props.$bg ? props.$bg : props.theme.neutralLight};
  padding: 0 0 2rem;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    align-items: flex-start;
    min-height: ${(props) => (props.$hasImage ? '32rem' : '0')};
    padding: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    ${(props) => (props.$hasImage ? '28rem' : '0')};
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
    ${(props) => (props.$hasImage ? '30rem' : '0')};
  }
`;

const CategoryHeaderImage = styled.div<{
  $bg?: string;
  $image?: string;
  $imageAlign?: string;
}>`
  min-height: ${(props) => (props.$image ? '14rem' : '0')};
  margin: 0 -1rem;
  background-size: cover;
  background-color: ${(props) =>
    props.$bg ? props.$bg : props.theme.brandDark};
  background-position: ${(props) => props.$imageAlign};
  background-image: url(${(props) => props.$image});
  background-repeat: no-repeat;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    position: absolute;
    width: 100%;
    min-height: ${(props) => (props.$image ? '32rem' : '0')};
    margin: 0;
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey050};
`;

const ImageCredit = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.66);
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    top: inherit;
    bottom: 0;
  }
`;

const HeaderContent = styled.div<{
  $alignWithContent?: boolean;
  hasImage: boolean;
}>`
  position: relative;
  max-width: ${(props) => props.theme.breakpointMd};
  margin-top: ${({ hasImage }) => (hasImage ? '-2rem' : '1rem')};
  margin-bottom: ${({ hasImage }) => (hasImage ? '0' : undefined)};
  margin-left: ${({ $alignWithContent, theme }) =>
    $alignWithContent ? `-${theme.spaces.s200}` : 'auto'};
  margin-right: ${({ $alignWithContent, theme }) =>
    $alignWithContent ? `-${theme.spaces.s200}` : 'auto'};
  text-align: ${({ $alignWithContent }) =>
    $alignWithContent ? 'left' : 'center'};
  padding: ${({ theme }) => theme.spaces.s200};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};
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
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: ${(props) => props.theme.spaces.s100};

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin-top: ${({ hasImage }) => (hasImage ? '14rem' : '3rem')};
    margin-bottom: 3rem;

    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const AttributesContainer = styled.div`
  max-width: ${(props) => props.theme.breakpointMd};
  margin: 0 auto;
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

const CategoryLevelName = styled.div`
  color: ${(props) => props.theme.graphColors.grey070};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

type CategoryTypes = NonNullable<
  GetCategoryAttributeTypesQuery['plan']
>['categoryTypes'];

interface CategoryHeaderAttributesProps extends Pick<Props, 'page'> {
  layout: CategoryPageMainTopBlock[];
}

const CategoryHeaderAttributes = ({
  layout,
  page,
}: CategoryHeaderAttributesProps) =>
  layout.length ? (
    <AttributesContainer>
      <Attributes>
        <Row>
          {layout.map((block, i) => (
            <CategoryPageStreamField
              key={i}
              block={block}
              page={page}
              context="hero"
            />
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
    ? categoryTypes.find((type) => type.id === typeId)?.attributeTypes ?? []
    : [];

  // AttributeCategoryChoice type can be empty, so we need to filter those out
  const attributesWithContent = attributes?.filter(
    (attribute) =>
      attribute.__typename !== 'AttributeCategoryChoice' ||
      attribute.categories?.length > 0
  );

  return attributesWithContent.length > 0 ? (
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

// TODO: Type props
interface Props {
  page: CategoryPage;
  title: string;
  categoryId: string;
  identifier;
  lead?: string;
  iconImage;
  headerImage;
  imageAlign?: string;
  color;
  attributes;
  typeId;
  level;
  layout?: CategoryTypePageLevelLayout['layoutMainTop'];
}

function CategoryPageHeaderBlock({
  page,
  title,
  categoryId,
  identifier,
  lead,
  iconImage,
  headerImage,
  imageAlign = 'center',
  color,
  attributes,
  typeId,
  level,
  layout,
}: Props) {
  const plan = useContext(PlanContext);
  const theme = useTheme();
  const { t } = useTranslation();

  const showIdentifiers =
    !plan.primaryActionClassification?.hideCategoryIdentifiers;

  const { loading, error, data } = useQuery<GetCategoryAttributeTypesQuery>(
    GET_CATEGORY_ATTRIBUTE_TYPES,
    {
      variables: {
        plan: plan.identifier,
      },
    }
  );

  const columnSizing = theme.settings.leftAlignCategoryPages
    ? {
        xl: { size: 6, offset: 3 },
        lg: { size: 8, offset: 2 },
        md: { size: 10, offset: 1 },
      }
    : {
        lg: { size: 10, offset: 1 },
        xl: { size: 12, offset: 0 },
      };

  return (
    <CategoryHeader $bg={color} $hasImage={!!headerImage}>
      <CategoryHeaderImage
        $bg={color}
        $imageAlign={imageAlign}
        $image={headerImage?.large?.src}
      />
      <Container className="header-container">
        <Row>
          <Col {...columnSizing}>
            <HeaderContent
              $alignWithContent={theme.settings.leftAlignCategoryPages}
              hasImage={!!headerImage}
            >
              {level && <CategoryLevelName>{level}</CategoryLevelName>}

              {!!page.category?.parent && (
                <Breadcrumbs
                  breadcrumbs={getBreadcrumbsFromCategoryHierarchy(
                    [page.category.parent],
                    showIdentifiers
                  )}
                />
              )}

              {iconImage && (
                <CategoryIconImage
                  size={(page?.layout?.iconSize as IconSize) ?? undefined}
                  src={iconImage}
                  alt=""
                />
              )}
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
        <span
          className="sr-only"
          role="img"
          aria-label={headerImage?.altText}
        />
      )}
      {headerImage?.imageCredit && (
        <ImageCredit>
          {`${t('image-credit')}: ${headerImage?.imageCredit}`}
        </ImageCredit>
      )}
    </CategoryHeader>
  );
}

export default CategoryPageHeaderBlock;
