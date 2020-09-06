import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Container, Navbar, Nav, NavItem,
  UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from 'reactstrap';
import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { themeProp } from 'common/theme';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { transparentize } from 'polished';
import { useTranslation } from 'common/i18n';
import { Link } from '../../routes';
import { NavigationLink } from '../../common/links';

import Icon from './Icon';

// TODO: Skip to main content -link
// TODO: Active states for links and buttons
// TODO: Restyle dropdown elements

const TopNav = styled(Navbar)`
  background-color: ${(props) => props.theme.brandNavBackground};
`;

const BotNav = styled(Navbar)`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: 0;
  box-shadow: 0 1px 0 ${(props) => props.theme.themeColors.light};

  .container {
    flex-wrap: nowrap;
  }

  .navbar-nav {
    padding: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    .navbar-nav {
      padding: ${(props) => props.theme.spaces.s150} 0;
    }
  }
`;

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.themeColors.white};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  hyphens: auto;
  word-break: break-word;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.themeColors.light};
  }

  svg {
    display: block;
    max-width: 10em;
    height: calc(${(props) => props.theme.spaces.s200} + ${(props) => props.theme.spaces.s050});
    margin: ${(props) => props.theme.spaces.s050}
          ${(props) => props.theme.spaces.s200}
          ${(props) => props.theme.spaces.s050}
          0;
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    svg {
      max-width: 6em;
      height: ${(props) => props.theme.spaces.s200};
      margin: ${(props) => props.theme.spaces.s050}
              ${(props) => props.theme.spaces.s150}
              ${(props) => props.theme.spaces.s050}
              0;
    }
  }
`;

const NavLink = styled.a`
  display: block;
  margin-right: ${(props) => props.theme.spaces.s200};
  color: ${(props) => props.theme.neutralDark};

  &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.neutralDark};

      span {
        border-bottom: 5px solid ${(props) => props.theme.brandDark};
      }
    }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 0 ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s100};
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

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    display: inline-block;
    padding: ${(props) => props.theme.spaces.s050} 0 calc(${(props) => props.theme.spaces.s050} - 5px);
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

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    display: inline-block;
    padding: ${(props) => props.theme.spaces.s050} 0 calc(${(props) => props.theme.spaces.s050} - 5px);
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: block;
  padding: 0;
  margin-right: ${(props) => props.theme.spaces.s150};
  color: ${(props) => props.theme.neutralDark};

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.neutralDark};
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 0 ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s100};
  }
`;

const StyledDropdown = styled(UncontrolledDropdown)`

  .dropdown-menu {
    border: 0px;
    background-color: ${(props) => props.theme.themeColors.white};
    box-shadow: 3px 3px 6px 2px ${(props) => transparentize(0.85, props.theme.themeColors.dark)}};
  }
  .dropdown-item {
    margin: 0;
    color: ${(props) => props.theme.neutralDark};

    span {
      display: inline-block;
      padding: ${(props) => props.theme.spaces.s050} 0 calc(${(props) => props.theme.spaces.s050} - 5px);
    }

    &:hover {
    background-color: transparent;

      span {
        border-bottom: 5px solid ${(props) => props.theme.brandDark};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    .dropdown-menu {
      padding-top: 0;
      box-shadow: none;
    }

    .dropdown-item {
      margin: 0 0 0 ${(props) => props.theme.spaces.s150};
    }
  }
`;

const NavbarToggler = styled.button`
  display: none;
  padding: 0;
  margin: 0;
  text-align: right;
  font-size: 1.5rem;
  width: ${(props) => props.theme.spaces.s300};
  color: ${(props) => props.theme.brandDark};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: auto;
  border: none;
  overflow: visible;
  background: transparent;
  border-radius: 0;
  -webkit-appearance: none;

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    display: inline-block 
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
            <NavHighlighter>
              {child.name}
            </NavHighlighter>
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
  const { t } = useTranslation();
  const [navIsFixed, setnavIsFixed] = useState(false);
  const [isOpen, toggleOpen] = useState(false);
  const {
    theme, siteTitle, ownerName, navItems, fullwidth, sticky,
  } = props;

  const OrgLogo = () => (
    <SVG
      src={theme.themeLogoUrl}
      title={`${ownerName}, ${siteTitle} ${t('front-page')}`}
      preserveAspectRatio="xMinYMid meet"
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
              <OrgLogo className="org-logo" />
              <span>{siteTitle}</span>
            </HomeLink>
          </Link>
          <NavbarToggler
            onClick={() => toggleOpen(!isOpen)}
            aria-label={t('toggle-navigation')}
            type="button"
          >
            { isOpen
              ? <Icon name="times" color={theme.themeColors.white} />
              : <Icon name="bars" color={theme.themeColors.white} /> }
          </NavbarToggler>
        </Container>
      </TopNav>
      <BotNav expand="md" fixed={navIsFixed ? 'top' : ''}>
        <Container fluid={fullwidth}>
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
  theme: themeProp.isRequired,
  fullwidth: PropTypes.bool,
  sticky: PropTypes.bool,
};

export default withTheme(React.memo(GlobalNav));
