import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import { useTheme } from 'common/theme';
import { getBgImageAlignment } from 'common/images';
import { DynamicLink } from 'common/links';
import Card from 'components/common/Card';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0;

  .lead-text {
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: 3rem;
  }

  a:hover {
    text-decoration: none;
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.themeColors.black};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.themeColors.dark};
`;

const CategoryListBlock = (props) => {
  const { categories, color, fallbackImage, heading, lead } = props;
  const themeColor = color;
  const theme = useTheme();

  return (
    <CategoryListSection bg={themeColor}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <RichText html={lead} className="lead-text" />
        <Row role="list">
          { categories?.map((cat) => (
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
              <Card
                imageUrl={cat.image?.small.src || fallbackImage.small.src}
                imageAlign={getBgImageAlignment(cat.image || fallbackImage)}
                imageTone={themeColor}
              >
                <div>
                  <DynamicLink href={cat.categoryPage.urlPath}>
                    <a href>
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
                    </a>
                  </DynamicLink>
                  <p>{cat.shortDescription}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </CategoryListSection>
  );
};

export default CategoryListBlock;
