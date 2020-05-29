/*
######### New version of site footer ###########
#########  Isolated from API calls   ###########
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Nav, NavItem, NavLink,
} from 'reactstrap';

import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { withTranslation } from '../../common/i18n';
import { StaticPageLink, IndicatorListLink, ActionListLink } from '../../common/links';

const StyledFooter = styled.footer`
  position: relative;
  min-height: 14em;
  clear: both;
  background-color: ${(props) => props.theme.neutralDark};
  color: #ffffff;
  padding: 6rem 0;

  .footer-column {
    margin-bottom: 2rem;
    text-align: center;

    a.nav-link {
      color: ${(props) => props.theme.themeColors.white};

      &:hover {
        color: ${(props) => props.theme.neutralLight};
      }
    }
  }
`;

const OrgBrand = styled.div`
  svg {
    max-height: 2.5rem;
    max-width: 100%;
  }
`;

function SiteFooter(props) {

  const { t, theme, siteTitle, ownerUrl, staticPages, creativeCommonsLicense, copyrightText } = props;

  const OrgLogo = () => <SVG src={theme.themeLogo} />;

  return (
    <>
      <StyledFooter className="site-footer">
        <Container fluid>
          <Row>
            <Col md="4" className="footer-column">
              <OrgBrand>
                <a href={ownerUrl}>
                  <OrgLogo aria-hidden="true" className="footer-org-logo" />
                </a>
              </OrgBrand>
              <h5>{siteTitle}</h5>
              <div className="funding-instrument-logo-container">
                <div className="funding-instrument-logo" />
              </div>
            </Col>
            <Col md="4" className="footer-column">

            </Col>
            <Col md="4" className="footer-column">
              <div className="page-footer-block">
                <Nav vertical>
                  <NavItem>
                    <NavLink className="nav-link active" href="/">{ t('front-page') }</NavLink>
                  </NavItem>
                  <NavItem key="actions">
                    <ActionListLink>
                      <a className="nav-link" href="true">{t('actions')}</a>
                    </ActionListLink>
                  </NavItem>
                  <NavItem key="indicators">
                    <IndicatorListLink>
                      <a className="nav-link" href="true">{t('indicators')}</a>
                    </IndicatorListLink>
                  </NavItem>
                  { staticPages && staticPages.filter((page) => page.footer).map((page) => (
                    <NavItem key={page.slug}>
                      <StaticPageLink slug={page.slug}>
                        <a className="nav-link" href="true">{page.name}</a>
                      </StaticPageLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="footer-column">
              <div className="site-footer-small-print">
                { creativeCommonsLicense && (
                  <Nav vertical>
                    <NavItem>{ creativeCommonsLicense }</NavItem>
                  </Nav>
                )}
                { copyrightText && (
                  <Nav vertical>
                    <NavItem className="list-inline-item">{ copyrightText }</NavItem>
                  </Nav>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </StyledFooter>
    </>
  );
}

SiteFooter.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  staticPages: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.shape({}).isRequired,
  ownerUrl: PropTypes.string.isRequired,
  creativeCommonsLicense: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
};

export default withTranslation('common')(withTheme(SiteFooter));
