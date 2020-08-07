import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Nav, NavItem, NavLink,
} from 'reactstrap';

import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { withTranslation } from '../common/i18n';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import { StaticPageLink, IndicatorListLink, ActionListLink } from '../common/links';
import PlanContext from '../context/plan';

const Logo = styled.div`
  height: ${(props) => props.theme.spaces.s400};
  margin-bottom: ${(props) => props.theme.spaces.s400};
`;

const StyledFooter = styled.footer`
  position: relative;
  min-height: 14em;
  clear: both;
  background-color: ${(props) => props.theme.neutralDark};
  color: ${(props) => props.theme.themeColors.white};
  padding: 6rem 0;

  .footer-column {
    margin-bottom: ${(props) => props.theme.spaces.s200};
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
    fill: ${(props) => props.theme.themeColors.white};
    max-height: ${(props) => props.theme.spaces.s200};
    max-width: 100%;
  }
`;

function SiteFooter(props) {
  const plan = React.useContext(PlanContext);
  const generalContent = plan.generalContent || {};
  const { t, theme, siteTitle, instanceType } = props;

  const OrgLogo = () => <SVG src={theme.themeLogo} />;

  return (
    <>
      <ApplicationStateBanner instanceType={instanceType} />
      <StyledFooter className="site-footer">
        <Container fluid>
          <Row>
            <Col md="4" className="footer-column">
              <h5>{siteTitle}</h5>
              <div className="funding-instrument-logo-container">
                <div className="funding-instrument-logo" />
              </div>
            </Col>
            <Col md="4" className="footer-column">
              <OrgBrand>
                <a href={generalContent.ownerUrl}>
                  <OrgLogo aria-hidden="true" className="footer-org-logo" />
                </a>
              </OrgBrand>
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
                  { plan.staticPages && plan.staticPages.filter((page) => page.footer).map((page) => (
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
                { generalContent.creativeCommonsLicense && (
                  <Nav vertical>
                    <NavItem>{ generalContent.creativeCommonsLicense }</NavItem>
                  </Nav>
                )}
                { generalContent.copyrightText && (
                  <Nav vertical>
                    <NavItem className="list-inline-item">{ generalContent.copyrightText }</NavItem>
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
  instanceType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(withTheme(SiteFooter));
