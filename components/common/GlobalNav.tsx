import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import debounce from 'lodash/debounce';
import SVG from 'react-inlinesvg';
import styled, { css, useTheme } from 'styled-components';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { transparentize } from 'polished';
import { NavigationLink, Link } from 'common/links';

import type { Theme } from '@kausal/themes/types';
import Icon from './Icon';
import PlanSelector from 'components/plans/PlanSelector';
import PlanVersionSelector from 'components/versioning/PlanVersionSelector';
import LanguageSelector from './LanguageSelector';
import NavbarSearch from './NavbarSearch';
import { usePlan } from 'context/plan';
import { isServer } from 'common/environment';
import { useTranslations } from 'next-intl';

const baseFixedNavStyles = css`
  @keyframes slide-in {
    0% {
      top: -100%;
    }
    100% {
      top: 0px;
    }
  }

  box-shadow: 3px 3px 6px -2px ${({ theme }) => transparentize(0.9, theme.themeColors.black)};
  animation: slide-in 0.4s;
`;

const TopNav = styled(Navbar)`
  padding: 0;
  background-color: ${(props) => props.theme.brandNavBackground};
  flex-wrap: nowrap;

  ${({ fixed }) => fixed && baseFixedNavStyles}

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: 0 ${(props) => props.theme.spaces.s100};
    border-bottom: 1px solid ${(props) => props.theme.themeColors.light};
  }
`;

const BotNav = styled(Navbar)<{ $offsetTop?: number; $expanded: boolean }>`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);

  ${({ fixed, $expanded }) => fixed && !$expanded && baseFixedNavStyles}

  ${({ $offsetTop, $expanded }) =>
    !!$expanded &&
    // Allow secondary nav to be scrolled when expanded
    `
    max-height: calc(100vh - ${$offsetTop}px);
    overflow: scroll;
    top: ${$offsetTop}px;
    `}

  .container {
    flex-wrap: nowrap;
  }

  .navbar-nav {
    padding: ${(props) => props.theme.spaces.s150} 0;
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

const SiteTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeBase};
  font-family: ${(props) => props.theme.brandNavFontFamily};
  line-height: 1;
  padding: ${(props) => props.theme.spaces.s150} 0
    ${(props) => props.theme.spaces.s150};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeMd};
  }
`;

const Site = styled.div`
  display: flex;
  align-items: center;
`;

const HomeLink = styled.a<{ $hideLogoOnMobile: boolean }>`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.brandNavColor};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  hyphens: manual;
  word-break: break-word;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.brandNavColor};
  }

  svg {
    display: ${(props) => (props.$hideLogoOnMobile ? 'none' : 'block')};
    max-width: 6em;
    height: ${(props) => props.theme.spaces.s200};
    margin: ${(props) => props.theme.spaces.s050}
      ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s050} 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    svg {
      display: block;
      max-width: 10em;
      height: calc(
        ${(props) => props.theme.spaces.s200} +
          ${(props) => props.theme.spaces.s050}
      );
      margin: ${(props) => props.theme.spaces.s050}
        ${(props) => props.theme.spaces.s150}
        ${(props) => props.theme.spaces.s050} 0;
    }
  }
`;

const EmptyLogo = styled.div`
  width: 0;
  height: ${(props) => props.theme.spaces.s200};
  margin: ${(props) => props.theme.spaces.s050} 0
    ${(props) => props.theme.spaces.s050} 0;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    width: 0;
    height: calc(
      ${(props) => props.theme.spaces.s200} +
        ${(props) => props.theme.spaces.s050}
    );
    margin: ${(props) => props.theme.spaces.s050} 0
      ${(props) => props.theme.spaces.s050} 0;
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
        border-bottom: 5px solid ${(props) => props.theme.brandDark};
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
  padding: ${(props) => props.theme.spaces.s050} 0
    calc(${(props) => props.theme.spaces.s050} - 5px);
  border-bottom: 5px solid transparent;
  transition: border 200ms;

  &.active {
    border-bottom: 5px solid ${(props) => props.theme.brandDark};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s150} 0
      calc(${(props) => props.theme.spaces.s150} - 5px);
  }

  .icon {
    margin: -0.25rem 0;
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: block;
  padding: 0;
  margin: 0 0 ${(props) => props.theme.spaces.s100}
    ${(props) => props.theme.spaces.s100};
  color: ${(props) => props.theme.neutralDark};

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.neutralDark};

    .highlighter {
      border-bottom: 5px solid ${(props) => props.theme.brandDark};
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    align-self: flex-end;
    margin: 0 ${(props) => props.theme.spaces.s200} 0 0;
  }
`;

const StyledDropdown = styled(UncontrolledDropdown)`
  .dropdown-toggle.nav-link {
    padding-left: 0;
    padding-right: 0;
  }

  .dropdown-menu {
    border: 0px;
    padding-top: ${(props) => props.theme.spaces.s150};
    box-shadow: none;
  }
  .dropdown-item {
    margin: 0 0 0 ${(props) => props.theme.spaces.s150};
    color: ${(props) => props.theme.neutralDark};

    .highlighter {
      display: inline-block;
      padding: 0 0 calc(${(props) => props.theme.spaces.s050} - 5px);
    }

    &:hover {
    background-color: transparent;

      .highlighter {
        border-bottom: 5px solid ${(props) => props.theme.brandDark};
      }
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    .dropdown-menu {
      background-color: ${(props) => props.theme.themeColors.white};
      box-shadow: 3px 3px 6px 2px ${(props) =>
        transparentize(0.85, props.theme.themeColors.black)}};
    }

    .dropdown-item {
      margin: 0;
    }
  }
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  &.dropdown-menu[data-bs-popper] {
    top: unset;
  }
`;

const NavbarToggler = styled.button`
  display: inline-block;
  padding: 0;
  margin: 0;
  text-align: right;
  font-size: 1.5rem;
  width: ${(props) => props.theme.spaces.s300};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: manual;
  border: none;
  overflow: visible;
  background: transparent;
  border-radius: 0;
  -webkit-appearance: none;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: none;
  }
`;

function DropdownList(props) {
  const { parentName, items, active = false } = props;
  return (
    <StyledDropdown nav inNavbar className={active && 'active'}>
      <StyledDropdownToggle nav caret>
        <NavHighlighter className={`highlighter ${active && 'active'}`}>
          {parentName}
        </NavHighlighter>
      </StyledDropdownToggle>
      <StyledDropdownMenu>
        {items &&
          items.map((child) => (
            <DropdownItem key={child.id}>
              <NavLink>
                <NavigationLink slug={child.urlPath}>
                  <NavHighlighter className="highlighter">
                    {child.name}
                  </NavHighlighter>
                </NavigationLink>
              </NavLink>
            </DropdownItem>
          ))}
      </StyledDropdownMenu>
    </StyledDropdown>
  );
}

DropdownList.propTypes = {
  parentName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      children: PropTypes.node,
    })
  ).isRequired,
  active: PropTypes.bool,
};

const NavSpacer = styled.div<{ $height?: number }>`
  display: block;
  width: 100%;
  height: ${({ $height = 0 }) => $height}px;
`;

const getIsPrimaryNavSticky = (theme: Theme, width: number) =>
  width < parseInt(theme.breakpointMd);

/**
 * Monitors and returns the height of the nav bar to support
 * rendering a nav spacer. This prevents content from jumping
 * when the main nav switches from static to fixed.
 */
const useStickyNavigation = (isStickyEnabled: boolean = false) => {
  const primaryNavRef = useRef<HTMLDivElement>(null);
  const secondaryNavRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(!isServer ? window.innerWidth : 0);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState<number>();
  const theme = useTheme();

  const isPrimaryNavSticky = getIsPrimaryNavSticky(theme, width);

  useEffect(() => {
    if (!isStickyEnabled) {
      return;
    }

    const handleSetNavHeight = (width: number) => {
      const navRef = getIsPrimaryNavSticky(theme, width)
        ? primaryNavRef
        : secondaryNavRef;

      setNavHeight((height) => navRef.current?.clientHeight || height);
    };

    const handleResize = debounce(() => {
      handleSetNavHeight(window.innerWidth);
      setWidth(window.innerWidth);
      setIsOpen(false);
    }, 200);

    handleSetNavHeight(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isStickyEnabled, theme]);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (isStickyEnabled && !isOpen) {
        setIsNavFixed(currPos.y > prevPos.y && currPos.y < -70);
      }
    },
    [isStickyEnabled, isOpen, isNavFixed],
    undefined,
    false,
    100
  );

  return {
    isOpen,
    setIsOpen,
    isNavFixed,
    navHeight,
    primaryNavRef,
    secondaryNavRef,
    isPrimaryNavSticky,
  };
};

function GlobalNav(props) {
  const t = useTranslations();
  const theme = useTheme();
  const plan = usePlan();
  const {
    siteTitle,
    ownerName = '',
    navItems,
    externalItems = [],
    fullwidth = false,
    sticky = false,
    activeBranch,
  } = props;
  const {
    isOpen,
    setIsOpen,
    isNavFixed,
    navHeight,
    primaryNavRef,
    secondaryNavRef,
    isPrimaryNavSticky,
  } = useStickyNavigation(sticky);

  const OrgLogo = () => {
    const logoElement = theme.navLogoVisible ? (
      <SVG
        src={theme.themeLogoUrl}
        title={`${ownerName}, ${siteTitle} ${t('front-page')}`}
        preserveAspectRatio="xMinYMid meet"
      />
    ) : (
      <EmptyLogo />
    );
    return logoElement;
  };

  const homeLink = theme.settings.homeLink || false;

  const siblings = plan.allRelatedPlans.filter(
    (pl) => pl.id !== plan.parent?.id
  );
  const hideLogoOnMobile = !!(theme.navTitleVisible && siblings.length);

  const rootLink = plan.parent ? plan.parent.viewUrl : '/';

  return (
    <div>
      <div ref={primaryNavRef}>
        <TopNav
          expand="md"
          fixed={isNavFixed && isPrimaryNavSticky ? 'top' : ''}
          id="branding-navigation-bar"
          aria-label={t('nav-tools')}
          container={fullwidth ? 'fluid' : true}
        >
          <Site>
            <Link href={rootLink} passHref legacyBehavior>
              <HomeLink $hideLogoOnMobile={hideLogoOnMobile}>
                <OrgLogo className="org-logo" />
                <SiteTitle>
                  {theme.navTitleVisible ? siteTitle : '\u00A0'}
                </SiteTitle>
              </HomeLink>
            </Link>
            <PlanSelector />
          </Site>

          <Nav navbar className="ml-auto d-none d-md-flex">
            <NavbarSearch />
            <LanguageSelector mobile={false} />
          </Nav>
          <NavbarToggler
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('nav-menu-close') : t('nav-menu-open')}
            aria-controls="global-navigation-bar"
            aria-expanded={isOpen}
            type="button"
          >
            {isOpen ? (
              <Icon name="times" color={theme.brandNavColor} />
            ) : (
              <Icon name="bars" color={theme.brandNavColor} />
            )}
          </NavbarToggler>
        </TopNav>
      </div>

      <div ref={secondaryNavRef}>
        <BotNav
          $offsetTop={
            isNavFixed && isPrimaryNavSticky && isOpen ? navHeight : undefined
          }
          $expanded={isOpen}
          expand="md"
          fixed={isNavFixed && (!isPrimaryNavSticky || isOpen) ? 'top' : ''}
          id="global-navigation-bar"
          container={fullwidth ? 'fluid' : true}
          aria-label={t('nav-primary')}
        >
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="me-auto">
              {homeLink && (
                <NavItem active={activeBranch === ''}>
                  <NavLink>
                    <NavigationLink slug={plan.domain?.basePath ?? '/'}>
                      <NavHighlighter
                        className={`highlighter ${
                          activeBranch === '' ? 'active' : ''
                        }`}
                      >
                        {homeLink === 'icon' ? (
                          <Icon name="home" width="1.5rem" height="1.5rem" />
                        ) : (
                          <span>{t('navigation-home')}</span>
                        )}
                      </NavHighlighter>
                    </NavigationLink>
                  </NavLink>
                </NavItem>
              )}
              {navItems &&
                navItems.map((page) =>
                  page.children ? (
                    <DropdownList
                      parentName={page.name}
                      items={page.children}
                      active={page.active}
                      key={page.slug}
                    />
                  ) : (
                    <NavItem key={page.slug} active={page.active}>
                      <NavLink>
                        <NavigationLink slug={page.urlPath}>
                          <NavHighlighter
                            className={`highlighter ${page.active && 'active'}`}
                          >
                            {page.name}
                          </NavHighlighter>
                        </NavigationLink>
                      </NavLink>
                    </NavItem>
                  )
                )}
              {plan.features.enableSearch && (
                <NavItem className="d-md-none">
                  <NavLink>
                    <NavigationLink slug="/search">
                      <NavHighlighter>
                        <Icon name="search" className="me-2" />
                        {t('search')}
                      </NavHighlighter>
                    </NavigationLink>
                  </NavLink>
                </NavItem>
              )}
              <LanguageSelector mobile="true" />
            </Nav>
            <Nav navbar>
              <PlanVersionSelector plan={plan} />
              {externalItems.length > 0 &&
                externalItems.map((item, index) => (
                  <NavItem key={`external${index}`}>
                    <NavLink>
                      <NavigationLink slug={item.url}>
                        <NavHighlighter className="highlighter">
                          {item.name}
                        </NavHighlighter>
                      </NavigationLink>
                    </NavLink>
                  </NavItem>
                ))}
            </Nav>
          </Collapse>
        </BotNav>
      </div>
      {isNavFixed && <NavSpacer $height={navHeight} />}
    </div>
  );
}

GlobalNav.propTypes = {
  activeBranch: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  ownerName: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      urlPath: PropTypes.string,
      active: PropTypes.bool,
      children: PropTypes.arrayOf(PropTypes.shape),
    })
  ).isRequired,
  fullwidth: PropTypes.bool,
  sticky: PropTypes.bool,
  externalItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default GlobalNav;
