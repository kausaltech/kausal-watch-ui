import React, { useMemo, useState } from 'react';

import Script from 'next/script';

import { useTranslations } from 'next-intl';
import SVG from 'react-inlinesvg';
import { Collapse, Nav, NavItem, Navbar } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { deploymentType } from '@/common/environment';
import { NavigationLink } from '@/common/links';
import { getThemeStaticURL } from '@/common/theme';
import { NavItem as NavItemType } from '@/components/Header';
import Icon from '@/components/common/Icon';

//import NavDropdown, { type NavDropdownProps } from '@/components/common/NavDropdown';
//import type { GlobalNavProps } from '@/components/common/GlobalNav';

const SecondaryNav = styled(Navbar)<{ $dark?: boolean }>`
  padding: 0;
  background-color: ${(props) =>
    props.$dark ? 'var(--stzh-color-zueriblue)' : 'var(--stzh-color-white)'};

  &.show {
    padding: 0 0 ${(props) => props.theme.spaces.s150} 0;
  }

  .container {
    flex-wrap: nowrap;
  }

  .navbar-nav {
    padding: ${(props) => props.theme.spaces.s150} 0 0;
    align-items: flex-start;
  }

  .nav-item {
    display: flex;
    flex-direction: column;

    a {
      .highlighter {
        color: ${(props) => props.$dark && 'var(--stzh-color-white)'};
      }
      &:active .highlighter,
      &:hover .highlighter {
        color: ${(props) => props.$dark && 'var(--stzh-color-white64)'} !important;
      }

      .highlighter.active {
        text-decoration: ${(props) => (props.$dark ? 'underline' : 'inherit')};
        text-underline-offset: 6px;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    .navbar-nav {
      padding: 0;
    }

    .nav-item {
      flex-direction: row;
    }
  }
`;

const HomeLink = styled.div`
  display: flex;
  align-items: flex-start;
  color: ${(props) => props.theme.brandNavColor};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  hyphens: auto;
  word-break: break-word;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.brandNavColor};
  }

  svg {
    display: block;
    width: 135px;
    height: auto;
    margin: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s150}
      ${(props) => props.theme.spaces.s050} 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    svg {
      width: 180px;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointXl}) {
    svg {
      width: 242px;
    }
  }
`;

const NavLink = styled.div`
  a {
    display: block;
    margin: 0 0 ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s100};
    color: ${(props) => props.theme.neutralDark};

    &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.neutralDark};

      .highlighter {
        color: var(--stzh-color-primary);
      }
    }

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      align-self: flex-end;
      margin: 0 ${(props) => props.theme.spaces.s200} 0 0;
    }
  }
`;

const NavHighlighter = styled.span`
  display: inline-block;
  color: var(--stzh-base-color);

  &.active {
    color: var(--stzh-color-primary);
  }
`;

const StyledCollapse = styled(Collapse)<{ $dark?: boolean }>`
  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    background-color: ${(props) =>
      props.$dark ? 'var(--stzh-color-zueriblue)' : 'var(--stzh-color-white)'};
    height: 4rem;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
`;

const SiteTitle = styled.span`
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    display: none;
  }
`;

const SecondaryNavWrapper = styled.div<{ $dark?: boolean }>`
  background-color: ${(props) =>
    props.$dark ? 'var(--stzh-color-zueriblue)' : 'var(--stzh-color-white)'};
`;

const StyledHeaderMain = styled.div`
  &.header__main {
    z-index: 1;
  }
`;

const NavbarToggler = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  width: ${(props) => props.theme.spaces.s300};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: auto;
  border: none;
  overflow: visible;
  background: transparent;
  border-radius: 0;
  -webkit-appearance: none;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: none;
  }
`;

type GlobalNavProps = {
  siteTitle: string;
  ownerName: string;
  navItems: NavItemType[];
  activeBranch: string;
  activePath: string;
  isDark?: boolean;
};

function GlobalNav(props: GlobalNavProps) {
  const { siteTitle, ownerName, navItems, activeBranch, activePath } = props;
  const theme = useTheme();
  const t = useTranslations();
  // Handle custom category page hierarchy --------------------------------------
  const activePathParts = activePath.split('/');
  const isSubCategory = activePathParts[1] === 'bereiche' && activePathParts.length >= 4;
  if (isSubCategory && navItems[0].children && navItems[0].children.length > 1) {
    navItems[0].children[0].active = false;
    navItems[0].children[1].active = true;
  }
  // ----------------------------------------------------------------------------

  // Check if we need to open subnav by default (active top level has children)
  const activeMainItemIndex = navItems.findIndex((item) => item.active);
  const initialSubnav =
    navItems[activeMainItemIndex]?.children && navItems[activeMainItemIndex]?.children.length > 0
      ? navItems[activeMainItemIndex].id
      : null;

  const [subNavState, setSubNavState] = useState<string | null>(initialSubnav);
  const [isOpen, toggleOpen] = useState(false);

  const orgLogo = useMemo(() => {
    const url = getThemeStaticURL(theme.themeLogoUrl);
    return (
      <SVG
        className="org-logo"
        src={url}
        title={`${ownerName}, ${siteTitle}`}
        preserveAspectRatio="xMinYMid meet"
      />
    );
  }, [theme.themeLogoUrl, ownerName, siteTitle]);

  const isProduction = deploymentType === 'production';
  const analyticsUrl =
    'https://www.stadt-zuerich.ch/etc/clientlibs/stzh/analytics/294297d554c0/068a31a4609c/launch-9189fcb507a0.min.js';

  return (
    <React.Fragment>
      {isProduction && <Script key="zuerich-analytics" src={analyticsUrl} async />}
      <div className="header header--has-appnav">
        <div className="header__inner">
          <StyledHeaderMain className="header__main">
            <div className="header__logobar" id="branding-navigation-bar">
              <div className="header__logobar-logo">
                <NavigationLink slug="/" onClick={() => setSubNavState(null)}>
                  <HomeLink className="header__logo-link">{orgLogo}</HomeLink>
                </NavigationLink>
              </div>
              <NavbarToggler
                onClick={() => toggleOpen(!isOpen)}
                aria-label={isOpen ? t('nav-menu-close') : t('nav-menu-open')}
                aria-controls="global-navigation-bar"
                aria-expanded={isOpen}
                type="button"
              >
                {isOpen ? (
                  <Icon.Times color={theme.themeColors.white} />
                ) : (
                  <Icon.Bars color={theme.themeColors.white} />
                )}
              </NavbarToggler>
            </div>
          </StyledHeaderMain>

          <SecondaryNavWrapper>
            <SecondaryNav
              expand="md"
              id="global-navigation-bar"
              className="header__appnav-inner"
              container={false}
            >
              <StyledCollapse isOpen={isOpen} navbar>
                <Nav navbar className="stzh-appnav__items sc-stzh-appnav sc-stzh-appnav-s me-auto">
                  <NavItem className="sc-stzh-link-h sc-stzh-link-s" active={false}>
                    <NavLink>
                      <NavigationLink slug="/" onClick={() => setSubNavState(null)}>
                        <NavHighlighter
                          className={`highlighter ${activeBranch === '' && 'active'}`}
                        >
                          Treibhausgasemissionen
                        </NavHighlighter>
                      </NavigationLink>
                    </NavLink>
                  </NavItem>
                  {navItems &&
                    navItems.map((page) =>
                      page?.children ? (
                        <NavItem
                          className="sc-stzh-link-h sc-stzh-link-s"
                          key={page.slug}
                          active={page.active}
                        >
                          <NavLink>
                            <a
                              role="button"
                              onClick={() => setSubNavState(page.id)}
                              key={page.slug}
                            >
                              <NavHighlighter className={`highlighter ${page.active && 'active'}`}>
                                {page.name}
                              </NavHighlighter>
                            </a>
                          </NavLink>
                        </NavItem>
                      ) : (
                        <NavItem
                          className="sc-stzh-link-h sc-stzh-link-s"
                          key={page.slug}
                          active={page.active}
                        >
                          <NavLink>
                            <NavigationLink
                              slug={page.urlPath}
                              onClick={() => setSubNavState(null)}
                            >
                              <NavHighlighter className={`highlighter ${page.active && 'active'}`}>
                                {page.name}
                              </NavHighlighter>
                            </NavigationLink>
                          </NavLink>
                        </NavItem>
                      )
                    )}
                </Nav>
              </StyledCollapse>
              <SiteTitle>{siteTitle}</SiteTitle>
            </SecondaryNav>
          </SecondaryNavWrapper>
          {subNavState && (
            <SecondaryNavWrapper $dark={true}>
              <SecondaryNav
                expand="md"
                id="global-navigation-bar"
                className="header__appnav-inner dark-nav"
                container={false}
                $dark={true}
              >
                <StyledCollapse navbar $dark={true} isOpen={isOpen}>
                  <Nav
                    navbar
                    className="stzh-appnav__items sc-stzh-appnav sc-stzh-appnav-s me-auto"
                  >
                    {navItems
                      ?.find((item) => item.id === subNavState)
                      ?.children?.map((item) => (
                        <NavItem
                          className="sc-stzh-link-h sc-stzh-link-s"
                          key={item.id}
                          active={activePath === item.urlPath}
                        >
                          <NavLink>
                            <NavigationLink slug={item.urlPath}>
                              <NavHighlighter
                                className={`highlighter xxx ${item.active && 'active'}`}
                              >
                                {item.name}
                              </NavHighlighter>
                            </NavigationLink>
                          </NavLink>
                        </NavItem>
                      ))}
                  </Nav>
                </StyledCollapse>
              </SecondaryNav>
            </SecondaryNavWrapper>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default GlobalNav;
