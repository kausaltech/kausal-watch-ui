import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Col, Container,
} from 'reactstrap';

import { Spring } from 'react-spring/renderprops.cjs';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import {
  IndicatorListLink,
  ActionListLink,
} from '../../common/links';

import IconActions from '../../public/static/images/default/icon-actions.svg';
import IconIndicators from '../../public/static/images/default/icon-indicators.svg';


const Hero = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.neutralLight};
`;

const HeroMain = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 24rem;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const HeroLinks = styled.div`
  padding: 1rem 0;
  background-color: ${(props) => props.theme.neutralLight};
  display: flex;
  justify-content: center;
`;

const MainCard = styled.div`
  background-color: ${(props) => props.theme.imageOverlay};
  opacity: 0.75;
  width: 640px;
  padding: 2rem;
  margin-bottom: 1rem;
  color: #fff;
  h1 {
    opacity: 1;
  }
`;

const LinkCards = styled.div`
  display: flex;
  align-items: stretch;
  width: 640px;
`;

const Highlight = styled.div`
  height: 100%;
  margin-bottom: 0;
  background-color: ${(props) => props.theme.brandLight};

  &:hover {
    box-shadow: 6px 6px 10px ${(props) => props.theme.brandDark};
    transform: translate(0, -10px);
    transition: all 0.5s ease;
    a {
      text-decoration: none;
    }
  }

  h3 {
    color: ${(props) => props.theme.neutralDark};
  }
 
  p {
    hyphens: auto;
    margin-bottom: 0;
    color: ${(props) => props.theme.neutralDark};
  }
`;

const Illustration = styled.div`

  svg {
    width: 4rem;
    height: 4rem;
    margin: auto;
    display: block;
    .a {
      fill: ${(props) => props.theme.neutralLight};
    }
    .b {
      fill: ${(props) => props.theme.neutralDark};
    }
  }
`;


function HeroFullImage(props) {
  const {
    t, bgImage, title, siteDescription, actionsDescription, indicatorsDescription,
  } = props;
  return (
    <Hero>
      <HeroMain image={bgImage}>
          <MainCard>
            <h1>{ title || 'Site Title' }</h1>
            <p className="lead">{ siteDescription || 'Site Description' }</p>
          </MainCard>
      </HeroMain>
      <HeroLinks>
        <LinkCards>
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
                      <IconActions />
                    </Illustration>
                    <div>
                      <h3>{ t('actions') }</h3>
                      <p>
                        { actionsDescription || 'Actions Description' }
                      </p>
                    </div>
                  </Highlight>
                </a>
              </IndicatorListLink>
            )}
          </Spring> 
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
                      <h3>{ t('indicators') }</h3>
                      <p>
                        { indicatorsDescription || 'Indicator Description' }
                      </p>
                    </div>
                  </Highlight>
                </a>
              </IndicatorListLink>
            )}
          </Spring>
        </LinkCards>
      </HeroLinks>
    </Hero>
  );
}

HeroFullImage.propTypes = {
  t: PropTypes.func.isRequired,
  bgImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  siteDescription: PropTypes.string.isRequired,
  actionsDescription: PropTypes.string.isRequired,
  indicatorsDescription: PropTypes.string.isRequired,
};

export default withTranslation('common')(HeroFullImage);
