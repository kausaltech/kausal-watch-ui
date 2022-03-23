import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import { useTheme } from 'common/theme';
import { getBgImageAlignment } from 'common/images';
import { Link } from 'common/links';
import CategoryTreeBlock from 'components/contentblocks/CategoryTreeBlock';
import Card from 'components/common/Card';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0;

  a.card-wrapper {
    display: flex;
    width: 100%;
    color: ${(props) => props.theme.themeColors.black};

    &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.themeColors.black};
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
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey050};
`;

const CategoryListBlock = (props) => {
  const { categories, color, fallbackImage, heading, lead, style } = props;
  const themeColor = color;
  const theme = useTheme();

  if (style === 'treemap') {
    return <CategoryTreeBlock />;
  }

  return (
    <CategoryListSection bg={themeColor}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <RichText html={lead} className="lead-text" />
        <Row>
          { categories?.map((cat) => cat.categoryPage && (
            <Col
              tag="li"
              xs="12"
              sm="6"
              lg="4"
              key={cat.id}
              className="mb-5 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
              role="listitem"
            >
              <Link href={cat.categoryPage.urlPath}>
                <a className="card-wrapper">
                  <Card
                    imageUrl={cat.image?.small.src || fallbackImage.small.src}
                    imageAlign={getBgImageAlignment(cat.image || fallbackImage)}
                    imageTone={cat.color}
                  >
                    <div>
                      <CardHeader>
                        { theme.settings.categories.showIdentifiers && (
                          <Identifier>
                            {cat.identifier}
                            .
                            {' '}
                          </Identifier>
                        )}
                        { cat.name }
                      </CardHeader>
                      <p>{cat.shortDescription}</p>
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
