import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { getBgImageAlignment } from 'common/images';
import { DynamicLink } from 'common/links';
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
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.themeColors.black};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CategoryListBlock = ({ categories, color, fallbackImage }) => {
  const heading = 'Teemat';
  const themeColor = color;
  return (
    <CategoryListSection bg={themeColor}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Row>
          { categories?.map((cat) => (
            <Col
              tag="li"
              xs="6"
              lg="4"
              key={cat.id}
              className="mb-5 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
              role="listitem"
            >
              <DynamicLink href={cat.categoryPage.urlPath}>
                <a className="card-wrapper">
                  <Card
                    imageUrl={cat.image?.small.src || fallbackImage.small.src}
                    imageAlign={getBgImageAlignment(cat.image || fallbackImage)}
                    imageTone={themeColor}
                  >
                    <div>
                      <CardHeader>{ cat.name }</CardHeader>
                      <p>{cat.shortDescription}</p>
                    </div>
                  </Card>
                </a>
              </DynamicLink>
            </Col>
          ))}
        </Row>
      </Container>
    </CategoryListSection>
  );
};

export default CategoryListBlock;
