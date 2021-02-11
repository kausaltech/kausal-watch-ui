import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { DynamicLink } from 'common/links';
import Card from 'components/common/Card';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.black};
  padding: ${(props) => props.theme.spaces.s300};

  a.card-wrapper {
    display: flex;
    width: 100%;
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.themeColors.white};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CategoryListBlock = ({ categories, color, fallbackImageUrl }) => {
  const heading = 'Toimenpidekokonaisuudet';
  const themeColor = color;
  return (
    <CategoryListSection bg={themeColor}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Row>
          { categories.map((cat) => (
            <Col
              tag="li"
              xs="6"
              lg="4"
              key={cat.id}
              className="mb-5 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
              role="listitem">
              <DynamicLink href={cat.categoryPage.urlPath}>
                <a className="card-wrapper">
                  <Card
                   imageUrl={cat.imageUrl || fallbackImageUrl}
                   imageTone={themeColor}
                  >
                    <CardHeader>{ cat.name }</CardHeader>
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
