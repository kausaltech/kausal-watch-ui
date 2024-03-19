import React from 'react';
import PropTypes from 'prop-types';
import { Container, Spinner } from 'reactstrap';
import { transparentize } from 'polished';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { NavigationLink, Link } from 'common/links';
import Icon from './Icon';
import PlanSelector from 'components/plans/PlanSelector';
import { useTheme } from 'styled-components';
import { useTranslations } from 'next-intl';
import { usePlan } from '@/context/plan';
import { signIn, useSession } from 'next-auth/react';
import Button from './Button';
import { useHandleSignOut } from '@/utils/auth.utils';

const StyledButton = styled(Button)`
  &.btn-link {
    font-size: inherit;
    padding: 0;
    background: transparent;
    color: ${({ theme }) => theme.footerColor};
    text-decoration: none;
    line-height: unset;

    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.footerColor};
      text-decoration: underline;
    }
  }
`;

const StyledFooter = styled.footer`
  position: relative;
  min-height: 14em;
  clear: both;
  background-color: ${(props) => props.theme.footerBackgroundColor};
  color: ${(props) => transparentize(0.2, props.theme.footerColor)};
  padding: ${(props) => props.theme.spaces.s400} 0;

  a {
    color: ${(props) => props.theme.footerColor};

    &:hover {
      color: ${(props) => props.theme.footerColor};
      text-decoration: underline;
    }
  }

  .footer-column {
    @media (max-width: ${(props) => props.theme.breakpointMd}) {
      margin-bottom: ${(props) => props.theme.spaces.s300};
      text-align: center;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    text-align: center;
  }

  @media print {
    display: none;
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
  margin-bottom: ${(props) => props.theme.spaces.s300};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Logo = styled.div`
  height: calc(
    ${(props) => props.theme.footerLogoSize} *
      ${(props) => props.theme.spaces.s400}
  );
  max-width: calc(
    ${(props) => props.theme.footerLogoSize} * 4 *
      ${(props) => props.theme.spaces.s300}
  );
  margin-right: ${(props) => props.theme.spaces.s200};
  margin: ${(props) => props.theme.spaces.s150}
    ${(props) => props.theme.spaces.s200} ${(props) => props.theme.spaces.s150}
    0;

  svg {
    height: 100%;
    max-width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 auto ${(props) => props.theme.spaces.s200};
  }
`;

const ServiceTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizeMd};
  font-weight: ${(props) => props.theme.fontWeightBold};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: column;
  }
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
  justify-content: flex-start;
  gap: ${(props) => props.theme.spaces.s300};
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-bottom: ${(props) => props.theme.spaces.s300};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    gap: ${(props) => props.theme.spaces.s300}
      ${(props) => props.theme.spaces.s200};
    justify-content: center;
    width: 100%;
  }
`;

const FooterNavItem = styled.li`
  flex: 1 0 240px;
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    flex: 1 0 auto;
    max-width: 240px;
  }

  .parent-item {
    &:after {
      content: '';
    }
  }
`;

const FooterSubnav = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterNavSubItem = styled.li`
  margin-top: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const UtilitySection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-top: 1px solid
    ${(props) => transparentize(0.8, props.theme.footerColor)};
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
      content: '';
      margin-left: 0;
    }
  }
`;

const TopButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: ${(props) => props.theme.fontWeightBold};
  cursor: pointer;
  color: ${(props) => props.theme.footerColor};

  .icon {
    margin-top: -0.25em;
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
  border-top: 1px solid
    ${(props) => transparentize(0.8, props.theme.footerColor)};
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
  margin: 0 0 ${(props) => props.theme.spaces.s100}
    ${(props) => props.theme.spaces.s050};

  &:before {
    content: '\\2022';
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  &:first-child {
    margin-left: 0;

    &:before {
      content: '';
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

const SecondFooter = styled.div`
  background-color: ${(props) => props.theme.secondFooterBackgroundColor};
  color: ${(props) => props.theme.secondFooterColor};
`;

const FooterExtras = styled.div`
  padding: ${(props) => props.theme.spaces.s100} 0;
`;

const FooterStatement = styled.div`
  max-width: 800px;
  margin-bottom: ${(props) => props.theme.spaces.s100};

  h1,
  h2,
  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
    color: ${(props) => props.theme.footerColor};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin-right: ${(props) => props.theme.spaces.s200};
  }
`;

const FundingInstruments = styled.div<{ $wrap?: boolean }>`
  width: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.$wrap ? 'center' : 'flex-end')};
  padding: 0;
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const FundingHeader = styled.div`
  flex-basis: 100%;
  text-align: right;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    text-align: center;
  }
`;

const FundingInstrumentContainer = styled.div<{ $small?: boolean }>`
  height: ${(props) => (props.$small ? '10rem' : '12rem')};
  width: ${(props) => (props.$small ? '10rem' : '12rem')};
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

export type UtilityLink = {
  id: string;
  name: string;
  slug: string;
  icon?: string;
};

type SiteFooterProps = {
  siteTitle: string;
  ownerUrl: string;
  ownerName: string;
  creativeCommonsLicense: string;
  copyrightText: string;
  footerStatement: string;
  ownerLinks: { id: string; title: string; url: string }[];
  navItems: {
    id: string;
    name: string;
    slug: string;
    children: {
      id: string;
      name: string;
      slug: string;
    }[];
  }[];
  utilityLinks: UtilityLink[];
  additionalLinks: {
    id: string;
    name: string;
    slug: string;
    url: string;
    crossPlanLink: boolean;
    viewUrl: string;
  }[];
  fundingInstruments: {
    id: string;
    name: string;
    link: string;
    logo: string;
  }[];
  otherLogos: {
    id: string;
    name: string;
    link: string;
    logo: string;
  }[];
};

function SiteFooter(props: SiteFooterProps) {
  const t = useTranslations();
  const theme = useTheme();
  const plan = usePlan();
  const session = useSession();
  const handleSignOut = useHandleSignOut();
  const {
    siteTitle,
    ownerUrl,
    ownerName,
    creativeCommonsLicense,
    copyrightText,
    navItems,
    additionalLinks = [],
    utilityLinks = [],
    fundingInstruments = [],
    otherLogos,
    footerStatement,
    ownerLinks = [],
  } = props;

  const showUiLogin = plan.features.allowPublicSiteLogin;
  const isAuthLoading = session.status === 'loading';
  const isAuthenticated = session.status === 'authenticated';

  const OrgLogo = () => {
    return (
      <SVG
        src={theme.themeLogoWhiteUrl}
        preserveAspectRatio="xMinYMid meet"
        title={`${ownerName}, ${siteTitle} ${t('front-page')}`}
        style={{ display: 'block' }}
      />
    );
  };

  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  const isLocalLink = (link: string) => link.endsWith('.localhost');

  function appendPort(link?: string) {
    if (typeof link !== 'string') {
      return link;
    }

    if (isLocalLink(link)) {
      return `${link}:3000`;
    }

    return link;
  }

  const absoluteLink = (link: string, slug: string) =>
    `${appendPort(link)}${slug}`;

  return (
    <StyledFooter className="site-footer">
      <Container>
        <FooterNav aria-label={t('nav-footer')}>
          <Branding>
            {theme.themeLogoWhiteUrl !== '' && (
              <Logo>
                {theme?.footerLogoLink ? (
                  <a
                    href={theme.footerLogoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <OrgLogo aria-hidden="true" className="footer-org-logo" />
                  </a>
                ) : (
                  <OrgLogo aria-hidden="true" className="footer-org-logo" />
                )}
              </Logo>
            )}
            {!theme.settings.footerLogoOnly && (
              <ServiceTitle>
                <Link href="/">{siteTitle}</Link>
                <PlanSelector />
              </ServiceTitle>
            )}
          </Branding>
          <FooterNavItems>
            {navItems &&
              navItems.map((page) => (
                <FooterNavItem key={page.id}>
                  {!page.children && page.slug && (
                    <NavigationLink slug={page.slug} className="parent-item">
                      <>
                        {theme?.navLinkIcons && (
                          <Icon
                            name="angleRight"
                            color={theme.footerColor}
                            aria-hidden="true"
                            className="me-1"
                          />
                        )}
                        {page.name}
                      </>
                    </NavigationLink>
                  )}
                  {page.children && (
                    <>
                      <span className="parent-item">{page.name}</span>
                      <FooterSubnav>
                        {page.children.map((childPage) => (
                          <FooterNavSubItem key={childPage.slug}>
                            <NavigationLink slug={childPage.slug}>
                              <>
                                {theme?.navLinkIcons && (
                                  <Icon
                                    name="angleRight"
                                    color={theme.footerColor}
                                    aria-hidden="true"
                                    className="me-1"
                                  />
                                )}
                                {childPage.name}
                              </>
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
                {ownerUrl ? (
                  <a href={ownerUrl} target="_blank" rel="noreferrer">
                    {theme?.navLinkIcons && (
                      <Icon
                        name="angleRight"
                        color={theme.footerColor}
                        aria-hidden="true"
                        className="me-1"
                      />
                    )}
                    {ownerName}
                  </a>
                ) : (
                  ownerName
                )}
              </OrgTitle>
            </UtilityItem>
            {ownerLinks &&
              ownerLinks.map((page) => (
                <UtilityItem key={page.id}>
                  <NavigationLink slug={page.url}>
                    {theme?.navLinkIcons && (
                      <Icon
                        name="angleRight"
                        color={theme.footerColor}
                        aria-hidden="true"
                        className="me-1"
                      />
                    )}
                    {page.title}
                  </NavigationLink>
                </UtilityItem>
              ))}
          </UtilityColumn>
          <UtilityColumn>
            {utilityLinks &&
              utilityLinks.map((page) => (
                <UtilityItem key={page.id}>
                  <NavigationLink slug={page.slug}>
                    {page.icon && (
                      <Icon
                        name={page.icon}
                        color={theme.footerColor}
                        aria-hidden="true"
                        className="me-1"
                      />
                    )}
                    {page.name}
                  </NavigationLink>
                </UtilityItem>
              ))}
            {showUiLogin && (
              <UtilityItem>
                <StyledButton
                  disabled={isAuthLoading}
                  color="link"
                  onClick={() =>
                    isAuthenticated
                      ? handleSignOut()
                      : signIn('watch-oidc-provider')
                  }
                >
                  {isAuthLoading ? (
                    <Spinner size="sm" color="light" />
                  ) : (
                    <Icon
                      name="lock"
                      color={theme.footerColor}
                      aria-hidden="true"
                      className="me-1"
                    />
                  )}
                  {isAuthenticated ? t('ui-sign-out') : t('ui-sign-in')}
                </StyledButton>
              </UtilityItem>
            )}
            <UtilityItem>
              <TopButton type="button" onClick={scrollToTop}>
                {t('back-to-top')}{' '}
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
            {copyrightText && (
              <BaseItem>
                &copy;
                {copyrightText}
              </BaseItem>
            )}
            {creativeCommonsLicense && (
              <BaseItem>{creativeCommonsLicense}</BaseItem>
            )}
          </BaseColumn>
          <BaseColumn>
            {additionalLinks &&
              additionalLinks.map((page) => {
                if (page.crossPlanLink) {
                  return (
                    <BaseLink key={page.slug}>
                      <NavigationLink
                        slug={absoluteLink(page.viewUrl, page.slug)}
                      >
                        {page.name}
                      </NavigationLink>
                    </BaseLink>
                  );
                } else {
                  return (
                    <BaseLink key={page.slug}>
                      <NavigationLink slug={page.slug}>
                        {page.name}
                      </NavigationLink>
                    </BaseLink>
                  );
                }
              })}
            <BaseLink>
              {t('published-on')}{' '}
              <a href="https://kausal.tech" target="_blank" rel="noreferrer">
                Kausal Watch
              </a>
            </BaseLink>
          </BaseColumn>
        </BaseSection>
      </Container>
      <SecondFooter>
        <Container>
          <FooterExtras>
            {fundingInstruments?.length > 0 && (
              <FundingInstruments>
                <FundingHeader>{t('supported-by')}</FundingHeader>
                {fundingInstruments.map((funder) => (
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
            {/* If we have more than 4 otherLogos render them smaller  */}
            {otherLogos?.length > 0 && (
              <FundingInstruments $wrap={otherLogos.length > 4}>
                {otherLogos.map((logo) => (
                  <FundingInstrumentContainer
                    key={logo.id}
                    $small={otherLogos.length > 4}
                  >
                    <a
                      href={logo.link ? logo.link : '#'}
                      target={logo.link ? '_blank' : '_self'}
                      rel={logo.link ? 'noreferrer' : ''}
                    >
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
            {footerStatement && (
              <FooterStatement
                dangerouslySetInnerHTML={{ __html: footerStatement }}
              />
            )}
          </FooterExtras>
        </Container>
      </SecondFooter>
    </StyledFooter>
  );
}

SiteFooter.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  ownerUrl: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  creativeCommonsLicense: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  utilityLinks: PropTypes.arrayOf(PropTypes.shape({})),
  additionalLinks: PropTypes.arrayOf(PropTypes.shape({})),
  fundingInstruments: PropTypes.arrayOf(PropTypes.shape({})),
  otherLogos: PropTypes.arrayOf(PropTypes.shape({})),
  footerStatement: PropTypes.string,
  ownerLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SiteFooter;
