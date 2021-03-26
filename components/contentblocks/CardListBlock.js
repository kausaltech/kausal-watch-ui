import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
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

const StyledLink = styled.a`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const CardListBlock = (props) => {
  const { heading, lead, cards } = props;
  const theme = useTheme();

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
                customColor={theme.themeColors.neutralDark}
                negative
              >
                <div>
                  <StyledLink href={card.link}>
                    <CardHeader>{ card.heading }</CardHeader>
                  </StyledLink>
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
