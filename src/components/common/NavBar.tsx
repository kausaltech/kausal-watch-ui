import React from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { Collapse, Nav, NavItem, Navbar } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { NavigationLink } from '@/common/links';
import { usePlan } from '@/context/plan';

const BotNav = styled(Navbar)`
  background-color: ${(props) => props.theme.siteNavBackground};
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);

  .container {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    background-image:
      ${({ theme }) =>
        `linear-gradient(to right, ${theme.themeColors.white}, ${theme.themeColors.white}),
        linear-gradient(to right, ${theme.themeColors.white}, ${theme.themeColors.white})`},
      linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
      linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
    background-position:
      left center,
      right center,
      left center,
      right center;
    background-repeat: no-repeat;
    background-color: ${(props) => props.theme.themeColors.white};
    background-size:
      20px 100%,
      20px 100%,
      10px 100%,
      10px 100%;
    background-attachment: local, local, scroll, scroll;
  }

  .navbar-nav {
    padding: ${(props) => props.theme.spaces.s150} 0;
    overflow: visible;
  }

  .navbar-collapse {
    align-items: stretch;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    .navbar-nav {
      padding: 0;
    }

    .nav-item {
      flex-direction: row;

      &:last-child {
        a {
          margin-right: 0;
        }
      }
    }
  }
`;

const NavLink = styled.div`
  height: 100%;
  a {
    height: 100%;
    display: flex;
    margin: 0 0 ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s100};
    color: ${(props) => props.theme.siteNavColor};

    &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.siteNavColor};

      .highlighter {
        border-bottom: 5px solid ${(props) => props.theme.siteNavHighlightColor};
      }
    }

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      align-self: flex-end;
      margin: 0 ${(props) => props.theme.spaces.s200} 0 0;
    }
  }
`;

const NavHighlighter = styled.span`
  height: 100%;
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s050} 0 calc(${(props) => props.theme.spaces.s050} - 5px);
  border-bottom: 5px solid transparent;
  transition: border 200ms;
  line-height: 1;

  &.active {
    border-bottom: 5px solid ${(props) => props.theme.siteNavHighlightColor};
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s150} 0
      calc(${(props) => props.theme.spaces.s150} - 5px);

    &.external {
      text-align: right;
    }
  }

  .icon {
    margin: -0.25rem 0;
  }
`;

type NavItemContent = {
  id: string;
  name: string;
  slug: string;
  urlPath: string;
  active: boolean;
  children?: NavItem[]; // Note: This is recursive
};

interface NavBarProps {
  navItems: NavItemContent[];
}

const NavBar: React.FC<NavBarProps> = ({ navItems }) => {
  // Your component logic here
  const t = useTranslations();
  const theme = useTheme();
  const locale = useLocale();
  const plan = usePlan();

  return (
    <div>
      <BotNav expand="md" id="global-navigation-bar" aria-label={t('nav-primary')} container={true}>
        <Collapse navbar>
          <Nav navbar className="me-auto">
            {navItems &&
              navItems.map((page) => (
                <NavItem key={page.slug} active={page.active}>
                  <NavLink>
                    <NavigationLink slug={page.urlPath}>
                      <NavHighlighter className={`highlighter ${page.active && 'active'}`}>
                        {page.name}
                      </NavHighlighter>
                    </NavigationLink>
                  </NavLink>
                </NavItem>
              ))}
          </Nav>
        </Collapse>
      </BotNav>
    </div>
  );
};

export default NavBar;
