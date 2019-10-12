import React from 'react';

import {
  Container, Row, Col, Button,
}
  from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../routes';
import { IndicatorLink, IndicatorListLink, ActionListLink } from '../common/links';
import Icon from './common/Icon';

const SiteHero = styled.div`
  margin: 6em 0 3em;
  background-color: ${(props) => props.theme.themeColors.white};

  h1 {
    color: ${(props) => props.theme.brandDark};
  }

  a {
    color: inherit;
  }

  a:hover {
    text-decoration: none;
  }
`;

const MainIllustration = styled.div`
  margin: 0 2em 3em;
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
  margin-bottom: 4em;

  img {
    max-width: 600px;
  }
`;

const SiteTitle = styled.div`
  margin-bottom: 5em;
  text-align: center;
`;

const Highlight = styled.div`
  margin-bottom: 3em;
  background: #fff;

  &:hover {
    box-shadow: 6px 6px 10px ${(props) => props.theme.brandDark};
    transform: translate(0, -10px);
    transition: all 0.5s ease;
  }

  h3 {
    color: ${(props) => props.theme.brandDark};
  }

  p {
    hyphens: auto;
    margin-bottom: 0;
  }
`;

const EmissionScaleBanner = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  color: #fff;
  position: relative;
  padding: 9rem 0 6rem;

  h2 {
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 3em;
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
    height: 3rem;
    position: absolute;
    top: -5px;
    transform: rotate(180deg);
  }
`;

const HnhHero = () => (
  <div>
    <SiteHero>
      <Container>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <MainIllustration>
              <img
                src="/static/images/hnh2035/main-illustration.svg"
                alt="ilmastovahti-kuvitus"
              />
            </MainIllustration>
            <SiteTitle>
              <h1>Helsingin Ilmastovahti</h1>
              <p className="lead">Seuraa Helsingin ilmasto-ohjelman edistymistä.</p>
            </SiteTitle>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg={{ size: 5, offset: 1 }}>
            <ActionListLink>
              <a>
                <Highlight className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start">
                  <Illustration className="mr-4 w-50">
                    <img src="/static/images/hnh2035/actions-illustration.svg" alt="toimenpitteet-kuvitus" />
                  </Illustration>
                  <div>
                    <h3>Toimenpiteet</h3>
                    <p>
                      Toimenpiteet ovat ilmastotekoja joita toteuttamalla kaupunki
                      {' '}
                      vähentää kasvihuonekaasupäästöjään.
                    </p>
                  </div>
                </Highlight>
              </a>
            </ActionListLink>
          </Col>
          <Col md="6" lg="5">
            <IndicatorListLink>
              <a>
                <Highlight className="d-flex p-3 bd-highlight flex-row justify-content-center justify-content-md-start">
                  <Illustration className="mr-4 w-50">
                    <img src="/static/images/hnh2035/indicators-illustration.svg" alt="mittarit-kuvitus" />
                  </Illustration>
                  <div>
                    <h3>Mittarit</h3>
                    <p>
                      Mittarit ovat mitattavia ilmiöitä joiden avulla arvioimme
                      {' '}
                      toimenpiteiden vaikutuksen kokonaispäästöihin.
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
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h2>Hiilineutraaliksi 2035 mennessä</h2>
            <p>
              Hiiineutraalissa Helsingissä kasvihuonekaasupäästöt saavat olla
              {' '}
              enintään 702 kt CO
              <sub>2</sub>
              e vuodessa, ja nämä päästöt kompensoidaan.
              {' '}
              Tällä hetkellä
              {' '}
              <IndicatorLink id={5}>päästöjä kertyy</IndicatorLink>
              {' '}
              vuodessa 2559 kt CO
              <sub>2</sub>
              e, joten vuosipäästöjä pitää vähentää vielä 1857 kt CO
              <sub>2</sub>
              e. Tällä sivustolla seuraamme, kuinka kaupungin
              {' '}
              <a href="#actions">147 ilmastotekoa</a>
              {' '}
              auttavat meitä pääsemään oikeaan suuntaan kohti hiilineutraaliutta.
            </p>
            <ProgressGraph>
              <img
                src="/static/images/hnh2035/main-graph-horizontal.svg"
                alt="Helsingin vuosipäästöt tällä hetkellä 2559 ktCO2e"
              />
            </ProgressGraph>
            <Link href="/tietoa">
              <Button outline color="light">
                Lue lisää tavoitteesta ja tästä palvelusta
                {' '}
                <Icon name="arrowRight" color="white" />
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </EmissionScaleBanner>
  </div>
);

export default HnhHero;
