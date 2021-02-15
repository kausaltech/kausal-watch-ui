import React from 'react';
import { useTranslation } from 'common/i18n';
import { useTheme } from 'common/theme';
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

const Hero = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.neutralLight};
`;

const HeroMain = styled.div`
  position: relative;
  min-height: 24rem;
  background-size: cover;
  background-position: ${(props) => props.imageAlign};
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    min-height: 38rem;
    background-size: cover;
  }
`;

const MainCard = styled.div`
  padding: ${(props) => props.theme.spaces.s200};
  margin-top: 8rem;
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.neutralDark};

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }

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

  p {
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightMd};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin-top: 10rem;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: ${(props) => props.theme.spaces.s300} 0;

    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }

    p {
      font-size: ${(props) => props.theme.fontSizeMd};
    }
  }
`;

const Highlight = styled.div`
  height: 100%;
  margin-bottom: 0;

  &:hover {
    h2 {
      text-decoration: underline;
    }
  }

  h2 {
    color: ${(props) => props.theme.neutralDark};
    font-size: ${(props) => props.theme.fontSizeMd};

    .icon {
      margin-left: ${(props) => props.theme.spaces.s025};
    }
  }

  p {
    hyphens: auto;
    margin-bottom: 0;
    color: ${(props) => props.theme.neutralDark};
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

const Illustration = styled.div`
  svg {
    width: ${(props) => props.theme.spaces.s400};
    height: ${(props) => props.theme.spaces.s400};
    margin: 0 1rem 0 0;
    display: block;
    fill: ${(props) => props.theme.brandDark};
  }
`;

function HeroFullImage(props) {
  const {
    bgImage, imageAlign, title, siteDescription, actionsDescription, indicatorsDescription,
  } = props;
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  let ActionsIcon = null;
  if (theme.iconActionsUrl !== '') ActionsIcon = () => <SVG src={theme.iconActionsUrl} />;
  let IndicatorsIcon = null;
  if (theme.iconIndicatorsUrl !== '') IndicatorsIcon = () => <SVG src={theme.iconIndicatorsUrl} />;

  return (
    <Hero>
      <HeroMain image={bgImage} imageAlign={imageAlign}>
        <Container>
          <Row>
            <Col md={8} lg={6} >
              <MainCard>
                <h1>{ title }</h1>
                <div dangerouslySetInnerHTML={{ __html: siteDescription }} />
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
                        <h2>
                          { t('actions') }
                          <Icon name="arrowRight" color={theme.neutralDark} />
                        </h2>
                        <p>
                          { actionsDescription }
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
                        <h2>
                          { t('indicators') }
                          <Icon name="arrowRight" color={theme.neutralDark} />
                        </h2>
                        <p>
                          { indicatorsDescription }
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
  bgImage: PropTypes.string.isRequired,
  imageAlign: PropTypes.string,
  title: PropTypes.string.isRequired,
  siteDescription: PropTypes.string.isRequired,
  actionsDescription: PropTypes.string.isRequired,
  indicatorsDescription: PropTypes.string.isRequired,
};

export default withTranslation('common')(withTheme(HeroFullImage));
