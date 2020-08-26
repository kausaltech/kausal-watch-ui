import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Container, Navbar, Nav, NavItem, NavbarToggler,
  UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from 'reactstrap';
import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { transparentize } from 'polished';
import { withTranslation } from '../../common/i18n';
import { Link } from '../../routes';
import { NavigationLink } from '../../common/links';

import Icon from './Icon';

const TopNav = styled(Navbar)`
  background-color: ${(props) => props.theme.brandNavBackground};
`;

const Logo = styled.div`
  height: ${(props) => props.theme.spaces.s300};
  max-width: 12em;
  margin: ${(props) => props.theme.spaces.s050}
          ${(props) => props.theme.spaces.s200}
          ${(props) => props.theme.spaces.s050}
          0;

  svg {
    height: 100%;
    width: auto;
  }
`;

const BotNav = styled(Navbar)`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: 0;
  box-shadow: 0 1px 0 ${(props) => props.theme.themeColors.light};

  .navbar-nav {
    padding: 0;
  }

  .nav-item.active a .nav-highlighter {
    border-bottom: 2px solid ${(props) => props.theme.brandDark};
  }
`;

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.themeColors.white};
  font-weight: ${(props) => props.theme.fontWeightBold};

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.themeColors.light};
  }
`;

const NavLink = styled.a`
  display: block;
  margin: 0 ${(props) => props.theme.spaces.s150};
  color: ${(props) => props.theme.neutralDark};

  &:first-child {
    margin-left: 0;
  }

  &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.neutralDark};

      span {
        border-bottom: 5px solid ${(props) => props.theme.brandDark};
      }
    }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 0 .5rem;
  }
`;

const NavHighlighter = styled.span`
  display: block;
  padding: ${(props) => props.theme.spaces.s150} 0 calc(${(props) => props.theme.spaces.s150} - 5px);
  border-bottom: 5px solid transparent;
  transition: border 200ms;

  &.active {
    border-bottom: 5px solid ${(props) => props.theme.brandDark};
  }
`;

const DropDownHighlighter = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s150} 0 calc(${(props) => props.theme.spaces.s150} - 5px);
  border-bottom: 5px solid transparent;
  transition: border 200ms;

  &.active {
    border-bottom: 5px solid ${(props) => props.theme.brandDark};
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: block;
  margin: 0 ${(props) => props.theme.spaces.s150};
  padding: 0;
  color: ${(props) => props.theme.neutralDark};

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.neutralDark};
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 0 .5rem;
  }
`;

const StyledDropdown = styled(UncontrolledDropdown)`

  .dropdown-menu {
    border: 0px;
    box-shadow: 3px 3px 6px 2px ${(props) => transparentize(0.85, props.theme.themeColors.dark)}};
  }
  .dropdown-item {
    margin: 0;
    color: ${(props) => props.theme.neutralDark};

    &:hover {
    background-color: transparent;

      .nav-highlighter {
        padding-bottom: 2px;
        border-bottom: 2px solid ${(props) => props.theme.brandDark};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    .dropdown-menu {
      padding-top: 0;
      box-shadow: none;
    }

    .dropdown-item {
      margin: 0;
    }
  }
`;

function DropdownList(props) {
  const { parent, items, active } = props;
  return (
    <StyledDropdown nav inNavbar className={active && 'active'}>
      <StyledDropdownToggle nav caret>
        <DropDownHighlighter>{ parent.name }</DropDownHighlighter>
      </StyledDropdownToggle>
      <DropdownMenu left>
        { items && items.map((child) => (
          <DropdownItem>
            <span className="nav-highlighter">
              {child.name}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </StyledDropdown>
  );
}

DropdownList.defaultProps = {
  active: false,
};

DropdownList.propTypes = {
  parent: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    children: PropTypes.node,
  })).isRequired,
  active: PropTypes.bool,
};

function GlobalNav(props) {
  const [navIsFixed, setnavIsFixed] = useState(false);
  const [isOpen, toggleOpen] = useState(false);
  const {
    t, theme, siteTitle, ownerName, navItems, fullwidth, sticky,
  } = props;

  const OrgLogo = () => (
    <SVG
      src={theme.themeLogoUrl}
      title={`${ownerName}, ${siteTitle} ${t('front-page')}`}
      preserveAspectRatio="xMinYMin meet"
    />
  );

  if (sticky) {
    useScrollPosition(
      ({ prevPos, currPos }) => {
        const goingUp = currPos.y > prevPos.y && currPos.y < -70;
        if (goingUp !== navIsFixed) setnavIsFixed(goingUp);
      },
      [navIsFixed],
      null,
      false,
      300,
    );
  }

  return (
    <div>
      <TopNav expand="md">
        <Container fluid={fullwidth}>
          <Link href="/" passHref>
            <HomeLink>
              <Logo>
                <OrgLogo />
              </Logo>
              {siteTitle}
            </HomeLink>
          </Link>
        </Container>
      </TopNav>
      <BotNav expand="md" fixed={navIsFixed ? 'top' : ''}>
        <Container fluid={fullwidth}>
          <NavbarToggler onClick={() => toggleOpen(!isOpen)}>
            <Icon name="bars" color={theme.neutralDark} />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              { navItems && navItems.map((page) => (
                page.children
                  ? (
                    <DropdownList
                      parent={page}
                      items={page.children}
                      active={page.active}
                    />
                  ) : (
                    <NavItem key={page.slug} active={page.active}>
                      <NavigationLink slug={page.slug}>
                        <NavLink>
                          <NavHighlighter className={page.active && 'active'}>
                            {page.name}
                          </NavHighlighter>
                        </NavLink>
                      </NavigationLink>
                    </NavItem>
                  )
              ))}
            </Nav>
          </Collapse>
        </Container>
      </BotNav>
    </div>
  );
}

GlobalNav.defaultProps = {
  fullwidth: false,
  sticky: false,
  ownerName: '',
};

GlobalNav.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  ownerName: PropTypes.string,
  navItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape),
  })).isRequired,
  theme: PropTypes.shape({}).isRequired,
  fullwidth: PropTypes.bool,
  sticky: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(withTheme(React.memo(GlobalNav)));
