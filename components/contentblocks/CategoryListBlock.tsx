import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import RichText from 'components/common/RichText';
import { useTheme } from 'common/theme';
import { getBgImageAlignment } from 'common/images';
import { Link } from 'common/links';
import CategoryTreeBlock from 'components/contentblocks/CategoryTreeBlock';
import Card from 'components/common/Card';
import { string } from 'prop-types';
import { MultiUseImageFragmentFragment } from 'common/__generated__/graphql';
import { useFallbackCategories } from 'context/categories';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0;
  color: ${
    (props) => readableColor(props.theme.neutralLight, props.theme.themeColors.black, props.theme.themeColors.white)
    };

  h2 {
    color: ${
    (props) => readableColor(props.theme.neutralLight, props.theme.headingsColor, props.theme.themeColors.white)
    };
  }

  a.card-wrapper {
    display: flex;
    width: 100%;
    color: ${(props) => props.theme.themeColors.black};

    &:hover {
      color: ${(props) => props.theme.themeColors.black};
      text-decoration: none;

      .card-title {
        text-decoration: underline;
      }
    }
  }

  .lead-text {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.neutralDark};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey050};
`;

export type CategoryListBlockCategory = {
    id: string,
    image?: MultiUseImageFragmentFragment,
    color?: string,
    identifier: string,
    name: string,
    shortDescription?: string,
    categoryPage: {
        urlPath: string,
    }
}

type CategoryListBlockProps = {
    categories?: Array<CategoryListBlockCategory>,
    color: string,
    fallbackImage: MultiUseImageFragmentFragment,
    heading?: string,
    lead: string,
    style?: "treemap" | "cards",
}

const CategoryListBlock = (props: CategoryListBlockProps) => {
  let { categories } = props;
  const { color, fallbackImage, heading, lead, style } = props;
  const themeColor = color;
  const theme = useTheme();
  const fallbackCategories = useFallbackCategories();

  if (!categories) categories = fallbackCategories;
  return (
    <CategoryListSection bg={themeColor}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <RichText html={lead} className="lead-text" />
        <Row tag="ul">
          { categories?.map((cat) => cat.categoryPage && (
            <Col
              tag="li"
              xs="12"
              sm="6"
              lg="4"
              key={cat.id}
              className="mb-5 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
            >
              <Link href={cat.categoryPage.urlPath}>
                <a className="card-wrapper">
                  <Card
                    imageUrl={cat.image?.small.src || fallbackImage.small.src}
                    imageAlign={getBgImageAlignment(cat.image || fallbackImage)}
                    colorEffect={cat.color}
                  >
                    <div>
                      <CardHeader className="card-title">
                        { theme.settings.categories.showIdentifiers && (
                          <Identifier>
                            {cat.identifier}
                            .
                            {' '}
                          </Identifier>
                        )}
                        { cat.name }
                      </CardHeader>
                      { cat.leadParagraph && (<p>{cat.leadParagraph}</p>) }
                    </div>
                  </Card>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </CategoryListSection>
  );
};

export default CategoryListBlock;
