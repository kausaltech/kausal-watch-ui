import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import { getBgImageAlignment } from 'common/images';
import { Link } from 'common/links';
import Card from 'components/common/Card';
import { MultiUseImageFragmentFragment } from 'common/__generated__/graphql';
import { useFallbackCategories } from 'context/categories';
import { CommonContentBlockProps } from 'common/blocks.types';
import { readableColor } from 'polished';
import { Theme } from '@kausal/themes/types';
import { CATEGORY_FRAGMENT } from '@/fragments/category.fragment';

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

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.neutralDark};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey070};
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

interface CategoryListBlockProps extends CommonContentBlockProps {
  categories?: Array<CategoryListBlockCategory>;
  fallbackImage?: MultiUseImageFragmentFragment;
  heading?: string;
  lead: string;
  style?: 'treemap' | 'cards';
}

const CategoryListBlock = (props: CategoryListBlockProps) => {
  const fallbackCategories = useFallbackCategories();
  const {
    id = '',
    fallbackImage,
    heading,
    lead,
    categories = fallbackCategories,
  } = props;

  /*
    Determine what image to use on category card
    If category has no own image but has icon use icon on colored bg
    If category has no own color use bradDark color as background
    If category has no own image and no icon use fallback image
    If category has own image use that
  */
  type CardImageType = (category: CategoryListBlockCategory) => {
    type: 'image' | 'svgIcon' | 'bitmapIcon';
    src: string | undefined;
    alignment: string;
  };

  const getCardImage: CardImageType = (category) => {
    const categryImageSrc = category.image?.small?.src;

    if (!categryImageSrc && category.iconSvgUrl) {
      return {
        type: 'svgIcon',
        src: category.iconSvgUrl,
        alignment: 'center',
      };
    }
    if (!categryImageSrc && category.iconImage) {
      return {
        type: 'bitmapIcon',
        src: category.iconImage?.rendition?.src,
        alignment: 'center',
      };
    } else
      return {
        type: 'image',
        src: categryImageSrc || fallbackImage?.small?.src,
        alignment: getBgImageAlignment(category.image || fallbackImage),
      };
  };

  return (
    <CategoryListSection id={id}>
      <Container>
        {heading && <SectionHeader>{heading}</SectionHeader>}
        <RichText html={lead} className="lead-text" />
        <Row tag="ul" className="justify-content-center">
          {categories
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
                          imageUrl={getCardImage(cat).src}
                          imageAlign={getCardImage(cat).alignment}
                          imageType={getCardImage(cat).type}
                          colorEffect={cat.color ?? undefined}
                        >
                          <div>
                            <CardHeader className="card-title">
                              {!cat?.type.hideCategoryIdentifiers && (
                                <Identifier>{cat.identifier}. </Identifier>
                              )}
                              {cat.name}
                            </CardHeader>
                            {cat.leadParagraph && <p>{cat.leadParagraph}</p>}
                          </div>
                        </Card>
                      </a>
                    </Link>
                  </Col>
                )
            )}
        </Row>
      </Container>
    </CategoryListSection>
  );
};

CategoryListBlock.fragments = {
  category: CATEGORY_FRAGMENT,
};

export default CategoryListBlock;
