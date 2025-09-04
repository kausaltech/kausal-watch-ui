import React from 'react';

import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import Card from '@/components/common/Card';

const CardListSection = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  padding: ${(props) => `${props.theme.spaces.s400} 0 ${props.theme.spaces.s100} 0`};

  a.card-wrapper {
    display: flex;
    width: 100%;
    color: ${(props) => props.theme.themeColors.black};

    &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.themeColors.black};

      .card-title {
        text-decoration: underline;
      }
    }
  }

  ul {
    padding: 0;
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )} !important;
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const Content = styled.p`
  text-align: center;
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  font-size: ${(props) => props.theme.fontSizeMd};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const CardHeader = styled.h3`
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CardListBlock = (props) => {
  const { id = '', heading, lead, cards } = props;
  const theme = useTheme();
  // TODO : Summon a key value for cards
  return (
    <CardListSection id={id}>
      <Container>
        {heading && <SectionHeader>{heading}</SectionHeader>}
        <Content>{lead}</Content>
        <Row tag="ul" className="justify-content-center">
          {cards?.map((card, inx) => (
            <Col
              tag="li"
              xs="12"
              sm="6"
              lg="4"
              className="mb-5 d-flex align-items-stretch"
              key={inx}
            >
              <a href={card.link} className="card-wrapper">
                <Card
                  imageUrl={card.image?.rendition && card.image.rendition.src}
                  imageAlign="center"
                  customBackgroundColor={theme.brandDark}
                  customColor={readableColor(
                    theme.brandDark,
                    theme.themeColors.black,
                    theme.themeColors.white
                  )}
                  outline
                >
                  <div>
                    <CardHeader className="card-title">{card.heading}</CardHeader>
                    <p>{card.content}</p>
                  </div>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </CardListSection>
  );
};

export default CardListBlock;
