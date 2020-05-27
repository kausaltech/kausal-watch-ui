import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import {
  Row, Col, Container,
} from 'reactstrap';

import styled, { withTheme } from 'styled-components';
import { withTranslation } from '../../common/i18n';
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
  min-height: 34rem;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const MainCard = styled.div`
  padding: 2rem;
  margin: 2rem 0;
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.brandDark};

  a {
    color: ${(props) => props.theme.brandDark};

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
`;

const Highlight = styled.div`
  height: 100%;
  margin-bottom: 0;

  h5 {
    color: ${(props) => props.theme.brandDark};
  }
 
  p {
    hyphens: auto;
    margin-bottom: 0;
    color: ${(props) => props.theme.brandDark};
  }
`;

const Illustration = styled.div`
  svg {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
    display: block;
    fill: ${(props) => props.theme.brandDark};
  }
`;

function HeroFullImage(props) {
  const {
    t, theme, bgImage, title, siteDescription, actionsDescription, indicatorsDescription,
  } = props;
  const ActionsIcon = () => <SVG src={theme.iconActions} />;
  const IndicatorsIcon = () => <SVG src={theme.iconIndicators} />;

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
                      <Illustration className="mr-4">
                        <ActionsIcon />
                      </Illustration>
                      <div>
                        <h5>{ t('actions') }</h5>
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
                      <Illustration className="mr-4">
                        <IndicatorsIcon />
                      </Illustration>
                      <div>
                        <h5>{ t('indicators') }</h5>
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
