/*
######### New version of site footer ###########
#########  Isolated from API calls   ###########
*/

import React from 'react';
import PropTypes, { array } from 'prop-types';
import {
  Container, Row, Col,
} from 'reactstrap';

import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { withTranslation } from '../../common/i18n';
import { StaticPageLink } from '../../common/links';

const StyledFooter = styled.footer`
  position: relative;
  min-height: 14em;
  clear: both;
  background-color: ${(props) => props.theme.neutralDark};
  color: ${(props) => props.theme.themeColors.white};
  padding: 6rem 0;

  a {
      color: ${(props) => props.theme.themeColors.white};

      &:hover {
        color: ${(props) => props.theme.themeColors.white};
        text-decoration: underline;
      }
    }
`;

const Logo = styled.div`
  height: 3em;
  width: 6em;
  margin-bottom: ${(props) => props.theme.spaces.s150};

  svg {
    height: 100%;
    width: auto;
  }
`;

const ServiceTitle = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
  font-size: ${(props) => props.theme.fontSizeMd};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const OrgTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const FooterNav = styled.nav`
    line-height: ${(props) => props.theme.lineHeightSm};
`;

const FooterNavItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const FooterNavItem = styled.li`
  flex: 1 1 25%;
  padding-right: ${(props) => props.theme.spaces.s150};
  margin-bottom: ${(props) => props.theme.spaces.s300};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const FooterSubnav = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterNavSubItem = styled.li`
  margin-top: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const Divider = styled.hr`
  border-top: 2px solid ${(props) => props.theme.themeColors.white};
`;

function SiteFooter(props) {
  const {
    t,
    theme,
    siteTitle,
    ownerUrl,
    ownerName,
    creativeCommonsLicense,
    copyrightText,
    navItems,
  } = props;

  const OrgLogo = () => <SVG src={theme.themeLogoUrl} />; 

  return (
    <>
      <StyledFooter className="site-footer">
        <Container>
          <Row>
            <Col md="4">
              <Logo>
                <a href={ownerUrl}>
                  <OrgLogo aria-hidden="true" className="footer-org-logo" />
                </a>
              </Logo>
              <ServiceTitle>
                {siteTitle}
              </ServiceTitle>
              <OrgTitle>
                <a href={ownerUrl} target="_blank">
                  {ownerName}
                </a>
              </OrgTitle>
              <div className="funding-instrument-logo-container">
                <div className="funding-instrument-logo" />
              </div>
            </Col>
            <Col md="8">
              <FooterNav>
                <FooterNavItems>
                  { navItems && navItems.map((page) => (
                    <FooterNavItem key={page.id}>
                      <StaticPageLink slug={page.slug}>
                        <strong><a href="true">{page.name}</a></strong>
                      </StaticPageLink>
                      { page.children && (
                        <FooterSubnav>
                          { page.children.map((childPage) => (
                            <FooterNavSubItem key={childPage.slug}>
                              <StaticPageLink slug={childPage.slug}>
                                <a href="true">{childPage.name}</a>
                              </StaticPageLink>
                            </FooterNavSubItem>
                          ))}
                        </FooterSubnav>
                      )}
                    </FooterNavItem>
                  ))}
                </FooterNavItems>
              </FooterNav>
            </Col>

          </Row>
          <Row>
            <Col>
              <Divider />
              <div className="site-footer-small-print">
                {creativeCommonsLicense}
                {' '}&#8226;{' '}
                {copyrightText}
                {' '}&#8226;{' '}
                Terms & Conditions
                {' '}&#8226;{' '}
                Accessibility
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
  ownerName: PropTypes.string.isRequired,
  creativeCommonsLicense: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf({}).isRequired,
};

export default withTranslation('common')(withTheme(SiteFooter));
