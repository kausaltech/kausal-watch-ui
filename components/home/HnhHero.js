import React from 'react';

import {
  Container, Row, Col,
}
  from 'reactstrap';
import styled from 'styled-components';
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



const HnhHero = () => (
  <div>
    <SiteHero>
      <Container>
        <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <MainIllustration>
                <img
                  src="./static/themes/hnh2035/images/main-illustration.svg"
                  alt="Piirroskuvitus Helsinki rantamaisema"
                />
              </MainIllustration>
              <SiteTitle>
                <h1>Helsingin ilmastovahti</h1>
                <p className="lead">Seuraa Helsingin ilmasto-ohjelman edistymistä.</p>
              </SiteTitle>
            </Col>
        </Row>
        <Row>
          <Col md="6" lg={{ size: 5, offset: 1 }}>
            <ActionListLink>
              <a>
                <Highlight
                  className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
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
          </Col>
          <Col md="6" lg="5">
            <IndicatorListLink>
              <a>
                <Highlight
                  className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start"
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
          </Col>
        </Row>
      </Container>
    </SiteHero>
    <EmissionScaleBanner className="hero-banner-bottom">
      <Container>
        <LazyLoad height={640}>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
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
              <StaticPageLink slug="tietoa">
                <Button outline color="light" tag="a" href="">
                  Lue lisää tavoitteesta ja tästä palvelusta
                  {' '}
                  <Icon name="arrowRight" color="white" />
                </Button>
              </StaticPageLink>
            </Col>
          </Row>
        </LazyLoad>
      </Container>
    </EmissionScaleBanner>
  </div>
);

export default HnhHero;
