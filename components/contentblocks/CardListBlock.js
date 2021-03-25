import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { getBgImageAlignment } from 'common/images';
import { DynamicLink } from 'common/links';
import Card from 'components/common/Card';

const CardListSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: ${(props) => props.theme.spaces.s400} 0;
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.themeColors.black};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const Content = styled.p`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeMd};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CardListBlock = (props) => {
  const { heading, lead, cards } = props;

  // TODO : Summon a key value for cards
  return (
    <CardListSection>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Content>{ lead }</Content>
        <Row role="list">
          { cards?.map((card,inx) => (
            <Col
              tag="li"
              xs="12"
              sm="6"
              lg="4"
              className="mb-5 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
              role="listitem"
              key={inx}
            >
              <Card
                imageUrl={card.image && card.image.rendition.src}
                imageAlign="center"
                negative
              >
                <div>
                  <a href={card.link} className="card-wrapper">
                    <CardHeader>{ card.heading }</CardHeader>
                  </a>
                  <p>{card.content}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </CardListSection>
  );
};

export default CardListBlock;
