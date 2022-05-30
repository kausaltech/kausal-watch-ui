import React from 'react';

import {
  Container, Row, Col,
}
  from 'reactstrap';
import styled from 'styled-components';
import { Spring, Keyframes } from 'react-spring/renderprops.cjs';
import LazyLoad from 'react-lazyload';
import {
  IndicatorLink,
  IndicatorListLink,
  ActionListLink,
  StaticPageLink,
} from 'common/links';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';

const SiteHero = styled.div`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s300};
  background-color: ${(props) => props.theme.themeColors.white};

  h1 {
    color: ${(props) => props.theme.brandDark};
    font-size: ${(props) => props.theme.fontSizeXl};
  }

  a {
    color: inherit;
  }

  a:hover {
    text-decoration: none;
  }
`;

const MainIllustration = styled.div`
  margin: 0 2em 2em;
  text-align: center;

  img {
    max-width: 320px;
  }
`;

const Illustration = styled.div`
  margin-bottom: 1em;

  img {
    max-width: 80px;
  }
`;

const ProgressGraph = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s400};

  img {
    max-width: 600px;
  }
`;

const SiteTitle = styled.div`
  margin-bottom: 3em;
  text-align: center;
`;

const Highlight = styled.div`
  height: 100%;

  background: ${(props) => props.theme.themeColors.white};

  &:hover {
    box-shadow: 6px 6px 10px ${(props) => props.theme.brandDark};
    transform: translate(0, -10px);
    transition: all 0.5s ease;
  }

  h2 {
    color: ${(props) => props.theme.brandDark};
    font-size: ${(props) => props.theme.fontSizeLg};
  }

  p {
    hyphens: auto;
    margin-bottom: 0;
  }
`;

const EmissionScaleBanner = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  position: relative;
  padding: 9rem 0 6rem;

  h2 {
    margin-bottom: ${(props) => props.theme.spaces.s100};
    color: ${(props) => props.theme.themeColors.white};
  }

  h3 {
    color: ${(props) => props.theme.themeColors.white};
  }

  p {
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }

  a {
    color: #fff;
    text-decoration: underline;
  }

  a.btn {
    text-decoration: none;
  }

  &::before {
    content: " ";
    @include koro("storm", $hel-summer, 600);
    width: 100%;
    height: ${(props) => props.theme.spaces.s300};
    margin-bottom: ${(props) => props.theme.spaces.s300};
    position: absolute;
    top: -5px;
    transform: rotate(180deg);
  }
`;

function beautifyValue(x) {
  let out;

  if (!Number.isInteger(x)) {
    out = x.toFixed(0);
  } else {
    out = x;
  }
  const s = out.toString();
  const displayNumber = s.replace('.', ',');
  return displayNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const GraphAnimation = Keyframes.Spring({
  play: async (next, cancel, ownProps) => {
    await next({
      from: {
        emissions: ownProps.emissionsStart,
        trans: 'translate(8,98)',
        barWidth: 142,
        emissionsNow: 0,
      },
      to: {
        emissions: ownProps.emissionsNow,
        trans: 'translate(142,98)',
        barWidth: 0,
        emissionsNow: 0,
      },
      delay: 2000,
      config: { tension: 20, friction: 15 },
    });
    await next({
      from: {
        emissionsNow: 0,
      },
      to: {
        emissionsNow: 1,
      },
    });
  },
});

const HelsinkiEmissionsViz = () => (
  <GraphAnimation
    state="play"
    emissionsStart={3514}
    emissionsNow={2559}
  >
    {(animatedProps) => (
      <svg viewBox="0 0 516 135">
        <defs>
          <style>
            {
              '.prefix__d{fill:none;stroke:#fff;stroke-width:2px;stroke-linecap:square}'
              + '.prefix__ai,.prefix__e,.prefix__k{isolation:isolate}'
              + '.prefix__e{font-size:21px;fill:#fff;font-family:HelsinkiGrotesk;font-weight:700}'
              + '.prefix__k{font-size:10px;fill:#ebedf1;font-family:HelsinkiGrotesk;font-weight:500}'
              + '.prefix__ab,.prefix__v,.prefix__w{letter-spacing:-.01em}'
            }
          </style>
        </defs>
        <title>Helsingin päästötilanne</title>
        <path fill="none" stroke="#fff" strokeWidth={2} d="M2 92.47h512v41H2z" />
        <g>
          <text
            transform="translate(8.2 117.51)"
            fill="#dedfe1"
            fontSize={12}
            fontFamily="HelsinkiGrotesk"
            fontWeight={500}
          >
            Vähennetty
          </text>
          <text
            transform="translate(72.91 118.51)"
            style={{
              isolation: 'isolate',
            }}
            letterSpacing="-.01em"
            fontSize={16}
            fontFamily="HelsinkiGrotesk"
            fontWeight={700}
            fill="#fff"
          >
            { beautifyValue(3514 - animatedProps.emissions) }
          </text>
        </g>
        <g transform={animatedProps.trans}>
          <rect fill="#ffce43" x="0" y="0" width={288 + animatedProps.barWidth} height="30" />
          <g>
            <text
              transform="translate(8 20)"
              fontSize={12}
              fontFamily="HelsinkiGrotesk"
              fontWeight={500}
            >
              { 'Vähennettävää ' }
              <tspan
                style={{
                  isolation: 'isolate',
                }}
                fontSize={16}
                fontFamily="HelsinkiGrotesk"
                fontWeight={700}
              >
                { beautifyValue(animatedProps.emissions - 702) }
              </tspan>
              <tspan
                style={{
                  isolation: 'isolate',
                }}
                fontSize={12}
                fontFamily="HelsinkiGrotesk"
                fontWeight={500}
              >
                { ' kt CO\u2082e' }
              </tspan>
            </text>
          </g>
        </g>
        <path fill="#29b770" d="M429.5 97.97h79.75v30H429.5z" />
        Tavoite
        <path
          className="prefix__d"
          d="M430 82 v -13"
        />
        <g>
          <text className="prefix__k" transform="translate(2 11.54)">
            1990
          </text>
          <text className="prefix__e" transform="translate(.2 34.86)">
            3 514
            <tspan className="prefix__k">
              {' kt CO\u2082e'}
            </tspan>
          </text>
          <path className="prefix__d" d="M2 82 v -40" />
        </g>
        <g opacity={animatedProps.emissionsNow}>
          <text className="prefix__k" transform="translate(137 11.54)">
            2018
          </text>
          <text
            transform="translate(137 44.86)"
            fontSize={36}
            fontFamily="HelsinkiGrotesk"
            fontWeight={700}
            fill="#ffce43"
          >
            {beautifyValue(animatedProps.emissions)}
            <tspan className="prefix__k">
              {' kt CO\u2082e'}
            </tspan>
          </text>
          <path className="prefix__d" d="M142 82 v -25" />
        </g>
        <g>
          <text
            transform="translate(436 117.51)"
            fontSize={12}
            fontFamily="HelsinkiGrotesk"
            fontWeight={500}
          >
            Tavoite
          </text>
          <text
            transform="translate(424.75 11.54)"
            style={{
              isolation: 'isolate',
            }}
            letterSpacing="-.01em"
            fontFamily="HelsinkiGrotesk"
            fontWeight={500}
            fontSize={10}
            fill="#ebedf1"
          >
            2035
          </text>
          <text className="prefix__k" transform="translate(425.62 26.97)">
            Enintään
          </text>
          <text className="prefix__e" transform="translate(425.61 47.86)">
            702
            <tspan className="prefix__k">
              {' kt CO\u2082e'}
            </tspan>
          </text>
          <text className="prefix__k" transform="translate(425 61.03)">
            joka kompensoidaan
          </text>
        </g>
      </svg>
    )}
  </GraphAnimation>
);

const HnhHero = () => (
  <div>
    <SiteHero>
      <Container>
        <Row>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
          >
            {(props) => (
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <MainIllustration style={props}>
                  <img
                    src="./static/themes/hnh2035/images/main-illustration.svg"
                    alt="Piirroskuvitus Helsinki rantamaisema"
                  />
                </MainIllustration>
                <SiteTitle style={props}>
                  <h1>Helsingin ilmastovahti</h1>
                  <p className="lead">Seuraa Helsingin ilmasto-ohjelman edistymistä.</p>
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
              {props => (
                <ActionListLink>
                  <a>
                    <Highlight
                      className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
                      style={props}
                    >
                      <Illustration className="me-4 w-50">
                        <img
                          src="./static/themes/hnh2035/images/actions-illustration.svg"
                          alt=""
                        />
                      </Illustration>
                      <div>
                        <h2>Toimenpiteet</h2>
                        <p>
                          Helsingin kaupunki vähentää kasvihuonekaasupäästöjä 147 toimenpiteen avulla.
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
              {(props) => (
                <IndicatorListLink>
                  <a>
                    <Highlight
                      className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
                      style={props}
                    >
                      <Illustration className="me-4 w-50">
                        <img
                          src="./static/themes/hnh2035/images/indicators-illustration.svg"
                          alt=""
                        />
                      </Illustration>
                      <div>
                        <h2>Mittarit</h2>
                        <p>
                          Seuraamme toimenpiteiden edistymistä ja kasvihuonekaasupäästöjen kehitystä mittareilla.
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
    </SiteHero>
    <EmissionScaleBanner className="hero-banner-bottom">
      <Container>
        <LazyLoad height={640}>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            delay={200}
          >
            {(props) => (
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }} style={props}>
                  <h2>Hiilineutraaliksi 2035 mennessä</h2>
                  <p>
                    Hiilineutraalissa Helsingissä kasvihuonekaasupäästöt saavat olla
                    {' '}
                    enintään 702 kt CO
                    <sub>2</sub>
                    e vuodessa, ja nämä päästöt kompensoidaan.
                    {' '}
                    Tällä hetkellä
                    {' '}
                    <IndicatorLink id={5}><a>päästöjä kertyy</a></IndicatorLink>
                    {' '}
                    vuodessa 2 559 kt CO
                    <sub>2</sub>
                    e, joten vuosipäästöjä pitää vähentää vielä 1 857 kt CO
                    <sub>2</sub>
                    e. Tällä sivustolla seuraamme, kuinka kaupungin
                    {' '}
                    <ActionListLink><a>147 ilmastotekoa</a></ActionListLink>
                    {' '}
                    auttavat meitä pääsemään oikeaan suuntaan kohti hiilineutraaliutta.
                  </p>
                  <ProgressGraph aria-hidden="true">
                    <h3 className="mb-4">Helsingin päästötilanne</h3>
                    <HelsinkiEmissionsViz />
                  </ProgressGraph>
                  <StaticPageLink slug="tietoa">
                    <Button outline color="light" tag="a" href="">
                      Lue lisää tavoitteesta ja tästä palvelusta
                      {' '}
                      <Icon name="arrowRight" color="white" />
                    </Button>
                  </StaticPageLink>
                </Col>
              </Row>
            )}
          </Spring>
        </LazyLoad>
      </Container>
    </EmissionScaleBanner>
  </div>
);

export default HnhHero;
