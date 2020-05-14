import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Container, Navbar, Nav, NavItem, NavbarToggler,
  UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import { Link } from '../../routes';
import { StaticPageLink } from '../../common/links';

import Icon from './Icon';

const TopNav = styled(Navbar)`
  background-color: ${(props) => props.theme.brandNavBackground};
`;

const BotNav = styled(Navbar)`
  background-color: ${(props) => props.theme.white};

  .nav-item.active a span {
    border-bottom: 2px solid ${(props) => props.theme.brandDark};
  }
`;

const HomeLink = styled.a`
  color: ${(props) => props.theme.neutralDark};
  margin-bottom: 2px;

  &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.brandDark};
    }
`;

const NavLink = styled.a`
  display: block;
  margin: 0 1rem;
  color: ${(props) => props.theme.neutralDark};
  
  span {
    border-bottom: 2px solid transparent;
  }

  &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.neutralDark};

      span {
        border-bottom: 2px solid ${(props) => props.theme.brandDark};
      }
    }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    margin: 0 0 .5rem;
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: block;
  padding:0 !important;
  margin: 0 1rem;
  color: ${(props) => props.theme.neutralDark};

  .nav-highlighter {
    border-bottom: 2px solid transparent;
  }

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.neutralDark};

    .nav-highlighter {
      border-bottom: 2px solid ${(props) => props.theme.brandDark};
    }
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
        <span className="nav-highlighter">{ parent.name }</span>
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
    children: PropTypes.array,
  })).isRequired,
  active: PropTypes.bool,
};


class GlobalNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const {
      theme, siteTitle, navItems, active, fullwidth,
    } = this.props;

    const { isOpen } = this.state;

    return (
      <div>
        <TopNav expand="md">
          <Container fluid={fullwidth}>
            <Link href="/">
              <a
                href
                aria-label={`${siteTitle}, palvelun etusivu`}
                className="navbar-brand"
              >
                {/* Organization logo currently rendered by compiled CSS */}
                <div aria-hidden="true" className="nav-org-logo" />
              </a>
            </Link>
          </Container>
        </TopNav>
        <BotNav expand="md">
          <Container fluid={fullwidth}>
            <Link href="/">
              <HomeLink href="" className="navbar-brand">{siteTitle}</HomeLink>
            </Link>
            <NavbarToggler onClick={this.toggle}>
              <Icon name="bars" color={theme.brandDark} />
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar>
              <Nav navbar>
                { navItems && navItems.map((page) => (
                  page.children
                    ? (
                      <DropdownList
                        parent={page}
                        items={page.children}
                        active={page.slug === active}
                      />
                    ) : (
                      <NavItem key={page.slug} active={page.slug === active}>
                        <StaticPageLink slug={page.slug}>
                          <NavLink href="">
                            <span className="nav-highlighter">{page.name}</span>
                          </NavLink>
                        </StaticPageLink>
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
}

GlobalNav.defaultProps = {
  active: '',
  fullwidth: false,
};

GlobalNav.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    children: PropTypes.array,
  })).isRequired,
  active: PropTypes.string,
  theme: PropTypes.shape.isRequired,
  fullwidth: PropTypes.bool,
};

export default withTheme(GlobalNav);
