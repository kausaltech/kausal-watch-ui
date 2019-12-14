import React from 'react';

import {
  Row, Col, Container,
} from 'reactstrap';

import { Spring } from 'react-spring/renderprops.cjs';
import styled from 'styled-components';
import {
  IndicatorListLink,
  ActionListLink,
} from '../common/links';

import IconActions from '../static/images/default/icon-actions.svg';
import IconIndicators from '../static/images/default/icon-indicators.svg';

const HeroVisual = styled.div`
  position: relative;
  height: 11em;
  width: 11em;
  margin: 0 auto 2em;

  &:before {
    content: "";
    position: absolute;
    z-index: 11;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background-color: ${(props) => props.theme.brandDark};
  }

  &:after {
    content: "";
    position: absolute;
    left: -5.5em;
    top: 0;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background-color: ${(props) => props.theme.brandLight};
  }
`;

const HeroImage = styled.div`
  background-image: url(${(props) => props.pic});
  background-size: cover;
  position: relative;
  z-index: 13;
  height: 11em;
  width: 11em;
  border-radius: 50%;
`;

const BannerContent = styled.div`
  padding: 3em 0;
  max-width: 48em;
  margin: 0 auto 0;
  background-color: #ffffff;
  
  //text-shadow: 3px 3px 8px rgba(0,0,0, 0.3);
  h1 {
    font-size: 48px;
  }

  a:hover {
    text-decoration: none;
  }
`;

const Illustration = styled.div`
  margin-bottom: 1em;

  svg {
    max-width: 8em;
    margin: auto;
    display: block;
    .a {
      fill: ${(props) => props.theme.brandLight};
    }
    .b {
      fill: ${(props) => props.theme.brandDark};
    }
  }
`;

const SiteTitle = styled.div`
  margin-bottom: 3em;
  text-align: center;
  color: ${(props) => props.theme.brandDark};
  h1 {
    font-size: 2.5em;
  }
`;

const Highlight = styled.div`
  margin-bottom: 3em;
  background: #fff;

  &:hover {
    box-shadow: 6px 6px 10px ${(props) => props.theme.brandDark};
    transform: translate(0, -10px);
    transition: all 0.5s ease;
    a {
      text-decoration: none;
    }
  }

  h3 {
    color: ${(props) => props.theme.brandDark};
  }
 
  p {
    hyphens: auto;
    margin-bottom: 0;
  }
`;

function FrontHero(props) {
  const { bgImage, heroText } = props;
  return (
    <BannerContent>
      <Container>
        <Row>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
          >
            {(sprops) => (
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <SiteTitle style={sprops}>
                  <HeroVisual>
                    <HeroImage pic={bgImage} />
                  </HeroVisual>
                  <h1>{ heroText }</h1>
                  <p className="lead">Insert byline here</p>
                </SiteTitle>
              </Col>
            )}
          </Spring>
        </Row>
        <Row>
          <Col md="6" lg={{ size: 5, offset: 1 }}>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              delay={250}
            >
              {(sprops) => (
                <ActionListLink>
                  <a href>
                    <Highlight
                      className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
                      style={sprops}
                    >
                      <Illustration className="mr-4">
                        <IconActions />
                      </Illustration>
                      <div>
                        <h3>Actions</h3>
                        <p>
                          Insert actions byline here
                        </p>
                      </div>
                    </Highlight>
                  </a>
                </ActionListLink>
              )}
            </Spring>
          </Col>
          <Col md="6" lg="5">
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              delay={200}
            >
              {(sprops) => (
                <IndicatorListLink>
                  <a href>
                    <Highlight
                      className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
                      style={sprops}
                    >
                      <Illustration className="mr-4">
                        <IconIndicators />
                      </Illustration>
                      <div>
                        <h3>Indicators</h3>
                        <p>
                          Insert Indicators byline here
                        </p>
                      </div>
                    </Highlight>
                  </a>
                </IndicatorListLink>
              )}
            </Spring>
          </Col>
        </Row>
      </Container>
    </BannerContent>
  );
}


export default FrontHero;
