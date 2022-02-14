import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
} from 'reactstrap';
import { transparentize } from 'polished';
import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { Link } from 'routes';

import { withTranslation } from 'common/i18n';
import { NavigationLink } from 'common/links';
import Icon from './Icon';

const StyledFooter = styled.footer`
  position: relative;
  min-height: 14em;
  clear: both;
  background-color: ${(props) => props.theme.footerBackgroundColor};
  color: ${(props) => props.theme.footerColor};
  padding: ${(props) => props.theme.spaces.s400} 0;

  a {
      color: ${(props) => props.theme.footerColor};

      &:hover {
        color: ${(props) => props.theme.footerColor};
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

const Branding = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    let direction;
    switch (props.theme.footerLogoPlacement) {
      case 'left':
        direction = 'row';
        break;
      case 'top':
        direction = 'column';
        break;
      default:
        direction = 'row';
    }
    return direction;
  }};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Logo = styled.div`
  height: calc(${(props) => props.theme.footerLogoSize} * ${(props) => props.theme.spaces.s400});
  max-width: calc(${(props) => props.theme.footerLogoSize} * 4 * ${(props) => props.theme.spaces.s300});
  margin-right: ${(props) => props.theme.spaces.s200};
  margin-bottom: ${(props) => props.theme.spaces.s300};

  svg {
    height: 100%;
    max-width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    width: 100%;
    margin: 0 auto ${(props) => props.theme.spaces.s150};
  }
`;

const ServiceTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spaces.s300};
  font-size: ${(props) => props.theme.fontSizeMd};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const OrgTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
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
    justify-content: center;
    width: 100%;
  }
`;

const FooterNavItem = styled.li`
  max-width: 300px;
  padding-right: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s300};
  font-size: ${(props) => props.theme.fontSizeBase};

  .parent-item {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }

  @media (max-width: ${(props) => props.theme.breakpointLg}) {
    width: 25%;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    max-width: 100%;
    width: 50%;
    padding: 0 ${(props) => props.theme.spaces.s100};

    &:last-child:nth-child(odd) {
      margin-right: 50%;
    }
  }
`;

const FooterSubnav = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterNavSubItem = styled.li`
  margin-top: ${(props) => props.theme.spaces.s100};
  font-size: 90%;
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const UtilitySection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-top: 1px solid  ${(props) => transparentize(0.8, props.theme.footerColor)};
  line-height: ${(props) => props.theme.lineHeightSm};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const UtilityColumn = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    align-items: center;
    width: 100%;

    &:first-child {
      margin-bottom: ${(props) => props.theme.spaces.s150};
    }
  }
`;

const UtilityItem = styled.li`
  margin-left: ${(props) => props.theme.spaces.s150};
  margin-bottom: ${(props) => props.theme.spaces.s200};
  font-weight: ${(props) => props.theme.fontWeightBold};

  &:first-child {
    margin-left: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin-left: 0;

    &:before {
      content: "";
      margin-left: 0;
    }
  }
`;

const TopButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: ${(props) => props.theme.fontFamily}, ${(props) => props.theme.fontFamilyFallback};
  font-weight: ${(props) => props.theme.fontWeightBold};
  cursor: pointer;
  color: ${(props) => props.theme.footerColor};

  .icon {
    margin-top: -.25em;
  }

  &:hover {
    color: ${(props) => props.theme.footerColor};
    text-decoration: underline;
  }
`;

const BaseSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spaces.s200} 0;
  margin-bottom: ${(props) => props.theme.spaces.s200};
  border-top: 1px solid  ${(props) => transparentize(0.8, props.theme.footerColor)};
  line-height: ${(props) => props.theme.lineHeightSm};

  @media (max-width: ${(props) => props.theme.breakpointLg}) {
    flex-direction: column;
    align-items: left;
  }
`;

const BaseColumn = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakpointLg}) {
    justify-content: left;
    flex-basis: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    justify-content: center;
  }
`;

const BaseItem = styled.li`
  margin: 0 0 ${(props) => props.theme.spaces.s100} ${(props) => props.theme.spaces.s050};

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
`;

const BaseLink = styled.li`

  margin-left: ${(props) => props.theme.spaces.s200};

  a {
  text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointLg}) {
    &:first-child {
      margin-left: 0;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 0 ${(props) => props.theme.spaces.s200};
    max-width: 100%;
    width: 50%;
    padding: 0 ${(props) => props.theme.spaces.s100};
  }
`;

const FundingInstruments = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 0;
  margin-bottom: ${(props) => props.theme.spaces.s200};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const FundingHeader = styled.div`
  flex-basis: 100%;
  text-align: right;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    text-align: center;
  }
`;

const FundingInstrumentContainer = styled.div`
  height: calc( 2 * ${(props) => props.theme.spaces.s600});
  width: calc( 2 * ${(props) => props.theme.spaces.s800});
  margin-left: ${(props) => props.theme.spaces.s300};
  text-align: right;

  svg {
    height: 100%;
    max-width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: ${(props) => props.theme.spaces.s200};
    text-align: center;
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
    utilityLinks,
    fundingInstruments,
    otherLogos,
  } = props;

  function OrgLogo() {
    return (
      <SVG
        src={theme.themeLogoWhiteUrl}
        preserveAspectRatio="xMinYMid meet"
        title={`${ownerName}, ${siteTitle} ${t('front-page')}`}
        style={{ display: 'block' }}
      />
    );
  }

  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  return (
    <StyledFooter className="site-footer">
      <Container>
        <FooterNav>
          <Branding>
            <Logo>
              { theme?.footerLogoLink
                ? (
                  <a href={theme.footerLogoLink} target="_blank" rel="noreferrer">
                    <OrgLogo aria-hidden="true" className="footer-org-logo" />
                  </a>
                )
                : (
                  <Link href="/">
                    <a>
                      <OrgLogo aria-hidden="true" className="footer-org-logo" />
                    </a>
                  </Link>
                )}
            </Logo>
            { !theme.settings.footerLogoOnly
            && (
            <ServiceTitle>
              <Link href="/">
                <a>
                  {siteTitle}
                </a>
              </Link>
            </ServiceTitle>
            )}
          </Branding>
          <FooterNavItems>
            { navItems && navItems.map((page) => (
              <FooterNavItem key={page.id}>
                { !page.children && page.slug && (
                <NavigationLink slug={page.slug} className="parent-item">
                  {page.name}
                </NavigationLink>
                )}
                { page.children && (
                <>
                  <span className="parent-item">{page.name}</span>
                  <FooterSubnav>
                    { page.children.map((childPage) => (
                      <FooterNavSubItem key={childPage.slug}>
                        <NavigationLink slug={childPage.slug}>
                          {childPage.name}
                        </NavigationLink>
                      </FooterNavSubItem>
                    ))}
                  </FooterSubnav>
                </>
                )}
              </FooterNavItem>
            ))}
          </FooterNavItems>
        </FooterNav>
        <UtilitySection>
          <UtilityColumn>
            <UtilityItem>
              <OrgTitle>
                <a href={ownerUrl} target="_blank" rel="noreferrer">
                  {ownerName}
                </a>
              </OrgTitle>
            </UtilityItem>
          </UtilityColumn>
          <UtilityColumn>
            { utilityLinks && utilityLinks.map((page) => (
              <UtilityItem key={page.id}>
                <NavigationLink slug={page.slug}>
                  { page.icon && (
                  <Icon
                    name={page.icon}
                    color={theme.footerColor}
                    aria-hidden="true"
                    className="mr-1"
                  />
                  )}
                  {page.name}
                </NavigationLink>
              </UtilityItem>
            ))}
            <UtilityItem>
              <TopButton type="button" onClick={scrollToTop}>
                {t('back-to-top')}
                {' '}
                <Icon
                  name="arrowUp"
                  color={theme.footerColor}
                  aria-hidden="true"
                  width="1.25em"
                  height="1.25em"
                />
              </TopButton>
            </UtilityItem>
          </UtilityColumn>
        </UtilitySection>
        <BaseSection>
          <BaseColumn>
            { copyrightText && (
            <BaseItem>
              &copy;
              {copyrightText}
            </BaseItem>
            )}
            { creativeCommonsLicense && <BaseItem>{creativeCommonsLicense}</BaseItem> }
          </BaseColumn>
          <BaseColumn>
            { additionalLinks && additionalLinks.map((page) => (
              <BaseLink key={page.slug}>
                <NavigationLink slug={page.slug}>
                  {page.name}
                </NavigationLink>
              </BaseLink>
            ))}
            <BaseLink>
              {t('published-on')}
              {' '}
              <a href="https://kausal.tech" target="_blank" rel="noreferrer">Kausal Watch</a>
            </BaseLink>
          </BaseColumn>
        </BaseSection>

        {fundingInstruments?.length > 0 && (
        <FundingInstruments>
          <FundingHeader>{t('supported-by')}</FundingHeader>
          { fundingInstruments.map((funder) => (
            <FundingInstrumentContainer key={funder.id}>
              <a href={funder.link} target="_blank" rel="noreferrer">
                <SVG
                  src={funder.logo}
                  preserveAspectRatio="xMidYMid meet"
                  title={funder.name}
                />
              </a>
            </FundingInstrumentContainer>
          ))}
        </FundingInstruments>
        )}
        {otherLogos?.length > 0 && (
        <FundingInstruments>
          { otherLogos.map((logo) => (
            <FundingInstrumentContainer key={logo.id}>
              <a href={logo.link} target="_blank" rel="noreferrer">
                <SVG
                  src={logo.logo}
                  preserveAspectRatio="xMidYMid meet"
                  title={logo.name}
                  style={{ display: 'block' }}
                />
              </a>
            </FundingInstrumentContainer>
          ))}
        </FundingInstruments>
        )}
      </Container>
    </StyledFooter>
  );
}

SiteFooter.defaultProps = {
  utilityLinks: [],
  additionalLinks: [],
  fundingInstruments: [],
};

SiteFooter.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.shape({}).isRequired,
  ownerUrl: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  creativeCommonsLicense: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  utilityLinks: PropTypes.arrayOf(PropTypes.shape({})),
  additionalLinks: PropTypes.arrayOf(PropTypes.shape({})),
  fundingInstruments: PropTypes.arrayOf(PropTypes.shape({})),
  otherLogos: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withTranslation('common')(withTheme(SiteFooter));
