import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col,
} from 'reactstrap';

import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { withTranslation } from '../../common/i18n';
import { Link } from '../../routes';
import { NavigationLink } from '../../common/links';

const StyledFooter = styled.footer`
  position: relative;
  min-height: 14em;
  clear: both;
  background-color: ${(props) => props.theme.themeColors.black};
  color: ${(props) => props.theme.themeColors.white};
  padding: 6rem 0;
 
  a {
      color: ${(props) => props.theme.themeColors.white};

      &:hover {
        color: ${(props) => props.theme.themeColors.white};
        text-decoration: underline;
      }
    }

  .footer-column{
    @media (max-width: ${(props) => props.theme.breakpointMd}) {
      margin-bottom: ${(props) => props.theme.spaces.s300};
      text-align: center;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
      text-align: center;
    }
`;

const Logo = styled.div`
  height: ${(props) => props.theme.spaces.s400};
  width: calc( 4 * ${(props) => props.theme.spaces.s300});
  margin: 0 0 ${(props) => props.theme.spaces.s150};

  svg {
    height: 100%;
    max-width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 auto ${(props) => props.theme.spaces.s150};
  }
`;

const FundingInstrumentContainer = styled.div`
  height: ${(props) => props.theme.spaces.s500};
  width: calc( 3 * ${(props) => props.theme.spaces.s500});
  text-align: right;

  svg {
    height: 100%;
    max-width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    text-align: center;
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

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const FooterNavItem = styled.li`
  width: 25%;
  padding-right: ${(props) => props.theme.spaces.s150};
  margin-bottom: ${(props) => props.theme.spaces.s300};
  font-size: ${(props) => props.theme.fontSizeBase};
  
  .parent-item {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin-bottom: ${(props) => props.theme.spaces.s100};
    padding-right: 0;
  }
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

const SmallPrint = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${(props) => props.theme.spaces.s100} 0;
  padding: ${(props) => props.theme.spaces.s100} 0;
  border-top: 1px solid ${(props) => props.theme.themeColors.light};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const SmallPrintSection = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const SmallPrintItem = styled.li`
  margin-left: ${(props) => props.theme.spaces.s050};
  &:before {
    content: "\\2022";
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  &:first-child {
    margin-left: 0;

    &:before {
      content: "";
      margin-right: 0;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    &:before {
      content: "";
      margin-left: 0;
    }
  }
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
    additionalLinks,
    feedbackLink,
  } = props;

  const OrgLogo = () => (
    <SVG
      src={theme.themeLogoWhiteUrl}
      preserveAspectRatio="xMinYMin meet"
      title={`${ownerName}, ${siteTitle} ${t('front-page')}`}
    />
  );

  const FundingLogo = () => (
    <SVG
      src="/static/images/hnh2035/climate-kic-logo-white.svg"
      preserveAspectRatio="xMinYMin meet"
      title={t('funding-instrument')}
    />
  );

  return (
    <>
      <StyledFooter className="site-footer">
        <Container>
          <Row>
            <Col md="4" className="footer-column">
              <Logo>
                <Link href="/">
                  <a>
                    <OrgLogo aria-hidden="true" className="footer-org-logo" />
                  </a>
                </Link>
              </Logo>
              <ServiceTitle>
                <Link href="/">
                  <a>
                    {siteTitle}
                    </a>
                </Link>
              </ServiceTitle>
              <OrgTitle>
                <a href={ownerUrl} target="_blank">
                  {ownerName}
                </a>
              </OrgTitle>
            </Col>
            <Col md="8">
              <FooterNav>
                <FooterNavItems>
                  { navItems && navItems.map((page) => (
                    <FooterNavItem key={page.id}>
                      <NavigationLink slug={page.slug}>
                        <a className="parent-item">{page.name}</a>
                      </NavigationLink>
                      { page.children && (
                        <FooterSubnav>
                          { page.children.map((childPage) => (
                            <FooterNavSubItem key={childPage.slug}>
                              <NavigationLink slug={childPage.slug}>
                                <a>{childPage.name}</a>
                              </NavigationLink>
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
              <SmallPrint>
                <SmallPrintSection>
                  { creativeCommonsLicense && <SmallPrintItem>{creativeCommonsLicense}</SmallPrintItem>}
                  { copyrightText && <SmallPrintItem>{copyrightText}</SmallPrintItem> }
                  { additionalLinks && additionalLinks.map((page) => (
                    <SmallPrintItem>
                      <NavigationLink slug={childPage.slug}>
                        <a>{page.name}</a>
                      </NavigationLink>
                    </SmallPrintItem>
                  ))}
                </SmallPrintSection>
                <SmallPrintSection>
                  { feedbackLink && (
                    <SmallPrintItem>
                      <NavigationLink slug={feedbackLink.slug}>
                        <a>{feedbackLink.name}</a>
                      </NavigationLink>
                    </SmallPrintItem>
                  )}
                </SmallPrintSection>
              </SmallPrint>
            </Col>
          </Row>
          <FundingInstrumentContainer>
            <FundingLogo />
          </FundingInstrumentContainer>
        </Container>
      </StyledFooter>
    </>
  );
}

SiteFooter.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.shape({}).isRequired,
  ownerUrl: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  creativeCommonsLicense: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  additionalLinks: PropTypes.arrayOf(PropTypes.shape({})),
  feedbackLink: PropTypes.PropTypes.shape({}),
};

export default withTranslation('common')(withTheme(SiteFooter));
