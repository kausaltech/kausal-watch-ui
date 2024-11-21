import React, { useMemo, useState } from 'react';

import { Link } from 'common/links';
import SVG from 'react-inlinesvg';
import { Collapse, Nav, Navbar, NavItem } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { getThemeStaticURL } from '@/common/theme';

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
        color: ${(props) =>
          props.$dark && 'var(--stzh-color-white64)'} !important;
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

const HomeLink = styled.a`
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
    margin: ${(props) => props.theme.spaces.s050}
      ${(props) => props.theme.spaces.s150}
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
    margin: 0 0 ${(props) => props.theme.spaces.s050}
      ${(props) => props.theme.spaces.s100};
    color: ${(props) => props.theme.neutralDark};

    &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.neutralDark};

      .highlighter {
        color: var(--hover-color);
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
    color: var(--hover-color);
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

function GlobalNav(props) {
  const { siteTitle, ownerName, navItems } = props;
  const theme = useTheme();
  const [subNav, setSubNav] = useState(false);

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

  return (
    <>
      <div className="header header--has-appnav">
        <div className="header__inner">
          <StyledHeaderMain className="header__main">
            <div className="header__logobar" id="branding-navigation-bar">
              <div className="header__logobar-logo">
                <Link href="/" passHref>
                  <HomeLink href="dummy" className="header__logo-link">
                    {orgLogo}
                  </HomeLink>
                </Link>
              </div>
            </div>
          </StyledHeaderMain>

          <SecondaryNavWrapper>
            <SecondaryNav
              expand="md"
              id="global-navigation-bar"
              className="header__appnav-inner"
              container={false}
            >
              <StyledCollapse navbar>
                <Nav
                  navbar
                  className="stzh-appnav__items sc-stzh-appnav sc-stzh-appnav-s me-auto"
                >
                  <NavItem
                    className="sc-stzh-link-h sc-stzh-link-s"
                    active={false}
                  >
                    <NavLink>
                      <Link href="/">
                        <NavHighlighter
                          className={`highlighter ${false && 'active'}`}
                        >
                          Treibhausgasemissionen
                        </NavHighlighter>
                      </Link>
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
                              onClick={() =>
                                setSubNav(subNav ? null : page.children)
                              }
                              active={page.active}
                              key={page.slug}
                            >
                              <NavHighlighter
                                className={`highlighter ${
                                  page.active && 'active'
                                }`}
                              >
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
                            <Link
                              href={page.urlPath}
                              onClick={() => setSubNav(false)}
                            >
                              <NavHighlighter
                                className={`highlighter ${
                                  page.active && 'active'
                                }`}
                              >
                                {page.name}
                              </NavHighlighter>
                            </Link>
                          </NavLink>
                        </NavItem>
                      )
                    )}
                </Nav>
              </StyledCollapse>
              <SiteTitle>{siteTitle}</SiteTitle>
            </SecondaryNav>
          </SecondaryNavWrapper>
          {subNav && (
            <SecondaryNavWrapper $dark={true}>
              <SecondaryNav
                expand="md"
                id="global-navigation-bar"
                className="header__appnav-inner"
                container={false}
                $dark={true}
              >
                <StyledCollapse navbar $dark={true}>
                  <Nav
                    navbar
                    className="stzh-appnav__items sc-stzh-appnav sc-stzh-appnav-s me-auto"
                  >
                    {subNav.map((item) => (
                      <NavItem
                        className="sc-stzh-link-h sc-stzh-link-s"
                        key={item.id}
                        active={item.active}
                      >
                        <NavLink>
                          <Link href={item.urlPath}>
                            <NavHighlighter
                              className={`highlighter ${
                                item.active && 'active'
                              }`}
                            >
                              {item.name}
                            </NavHighlighter>
                          </Link>
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
    </>
  );
}

export default GlobalNav;
