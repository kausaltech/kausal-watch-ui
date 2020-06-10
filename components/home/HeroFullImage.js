import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import {
  Row, Col, Container,
} from 'reactstrap';

import styled, { withTheme } from 'styled-components';
import { withTranslation } from '../../common/i18n';
import Icon from '../common/Icon';
import {
  IndicatorListLink,
  ActionListLink,
} from '../../common/links';


/*
######### WORK IN PROGRESS ###########
*/

const Hero = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.neutralLight};
`;

const HeroMain = styled.div`
  position: relative;
  min-height: 38rem;
  //background-color: ${(props) => props.theme.themeColors.black};
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    min-height: 24rem;
    background-size: contain;
    background-position: top;
  }
`;

const MainCard = styled.div`
  padding: 2rem;
  margin: 3rem 0;
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};

  a {
    color: ${(props) => props.theme.neutralDark};

    &:hover {
      text-decoration: none;

      h5 {
        text-decoration: underline;
      }

      svg .a {
        fill: ${(props) => props.theme.brandlight};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin-top: 20rem;
  }

  @media (max-width: ${(props) => props.theme.breakpointSm}) {
    margin-top: 14rem;
  }
`;

const Highlight = styled.div`
  height: 100%;
  margin-bottom: 0;

  h5 {
    color: ${(props) => props.theme.neutralDark};

    .icon {
      margin-left: .25rem;
    }
  }
 
  p {
    hyphens: auto;
    margin-bottom: 0;
    color: ${(props) => props.theme.neutralDark};
  }
`;

const Illustration = styled.div`
  svg {
    width: 3rem;
    height: 3rem;
    margin: 0 1rem 0 0;
    display: block;
    fill: ${(props) => props.theme.brandDark};
  }
`;

function HeroFullImage(props) {
  const {
    t, theme, bgImage, title, siteDescription, actionsDescription, indicatorsDescription,
  } = props;

  let ActionsIcon = null;
  if (theme.iconActions) ActionsIcon = () => <SVG src={theme.iconActions} />;
  let IndicatorsIcon = null;
  if (theme.iconIndicators) IndicatorsIcon = () => <SVG src={theme.iconIndicators} />;

  return (
    <Hero>
      <HeroMain image={bgImage}>
        <Container>
          <Row>
            <Col md={8} lg={6} >
              <MainCard>
                <h2>{ title || 'Site Title' }</h2>
                <p className="lead">{ siteDescription || 'Site Description' }</p>
                <ActionListLink>
                  <a href>
                    <Highlight
                      className="d-flex py-3 bd-highlight flex-row"
                    >
                      {ActionsIcon && (
                        <Illustration>
                          <ActionsIcon />
                        </Illustration>
                      )}
                      <div>
                        <h5>
                          { t('actions') }
                          <Icon name="arrowRight" color="black" />
                        </h5>
                        <p>
                          { actionsDescription || 'Actions Description' }
                        </p>
                      </div>
                    </Highlight>
                  </a>
                </ActionListLink>
                <IndicatorListLink>
                  <a href>
                    <Highlight
                      className="d-flex py-3 bd-highlight flex-row"
                    >
                      {IndicatorsIcon && (
                        <Illustration>
                          <IndicatorsIcon />
                        </Illustration>
                      )}
                      <div>
                        <h5>
                          { t('indicators') }
                          <Icon name="arrowRight" color="black" />
                        </h5>
                        <p>
                          { indicatorsDescription || 'Indicator Description' }
                        </p>
                      </div>
                    </Highlight>
                  </a>
                </IndicatorListLink>
              </MainCard>
            </Col>
          </Row>
        </Container>
      </HeroMain>
    </Hero>
  );
}

HeroFullImage.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.shape({}).isRequired,
  bgImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  siteDescription: PropTypes.string.isRequired,
  actionsDescription: PropTypes.string.isRequired,
  indicatorsDescription: PropTypes.string.isRequired,
};

export default withTranslation('common')(withTheme(HeroFullImage));
