import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import Card from 'components/common/Card';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.theme.spaces.s300};
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.themeColors.white};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.black};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CategoryListBlock = (props) => {
  const placemarkerImageUrl = "https://kausal.watch.kausal.tech/media/images/Visit_Tampere_Foggy_sunset_Panorama_from_Nasinn.original.jpg";
  const fakeprops = {
    heading: 'Toimenpidekokonaisuudet',
    categories: [
      {
        id: '1',
        imageUrl: placemarkerImageUrl,
        title: 'Toimenpidekokonaisuus 1',
        progress: '60',
      },
      {
        id: '2',
        imageUrl: placemarkerImageUrl,
        title: 'Toimenpidekokonaisuus 2',
        progress: '60',
      },
      {
        id: '3',
        imageUrl: placemarkerImageUrl,
        title: 'Toimenpidekokonaisuus 3',
        progress: '60',
      },
      {
        id: '4',
        imageUrl: placemarkerImageUrl,
        title: 'Toimenpidekokonaisuus 4',
        progress: '60',
      },
      {
        id: '5',
        imageUrl: placemarkerImageUrl,
        title: 'Toimenpidekokonaisuus 5',
        progress: '60',
      },
    ],
    themeColor: '#29549A',
  };

  const { heading, categories, themeColor } = fakeprops;
  return (
    <CategoryListSection bg={themeColor}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Row>
          { categories.map((cat) => (
            <Col lg="3" md="4" sm="6" key={cat.id} className="mb-4">
              <Card imageUrl={cat.imageUrl}>
                <CardHeader>{ cat.title }</CardHeader>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </CategoryListSection>
  );
};

export default CategoryListBlock;
