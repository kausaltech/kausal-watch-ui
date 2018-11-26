import React from 'react'
import { Container, Row, Col, Nav, NavItem, NavLink, Alert } from 'reactstrap';

import helLogo from 'open-city-design/src/assets/helsinki-logo-white.svg';

import styled from 'styled-components';

const Logo = styled.img`
  height: 4em;
  margin-bottom: 4rem;
`

const SiteFooter = ({ siteTitle }) => (
  <footer class="site-footer">
    <Container fluid>
      <Row>
        <Col  sm="12" md={{ size: 8, offset: 2 }} className="footer-column">
          <Alert className="mb-5">Tämä on palvelun Alpha-kehitysversio. Sivustolla saattaa esiintyä esimerkinomaisia sisältöjä ja toiminnallisuuksia jotka eivät ole oikeita.</Alert>
        </Col>
      </Row>
      <Row>
        <Col md="4" className="footer-column">
          <h5>Hiilineutraali Helsinki</h5>
        </Col>
        <Col md="4" className="footer-column">
          <div className="footer-branding footer-branding-helsinki">
            <a href="http://www.hel.fi">
              <Logo src={`${helLogo}`} aria-hidden="true" />
            </a>
          </div>
        </Col>
        <Col md="4" className="footer-column">
          <div class="page-footer-block">
            <Nav vertical>
              <NavItem>
                <NavLink class="nav-link active" href="/">Etusivu</NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="footer-column">
          <div class="site-footer-small-print">
            <Nav vertical>
              <NavItem>Creative Commons</NavItem>
            </Nav>
            <Nav vertical>
              <NavItem class="list-inline-item">2018 Helsingin kaupunki</NavItem>
            </Nav>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default SiteFooter
