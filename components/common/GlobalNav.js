import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Container, Navbar, Nav, NavItem, NavbarToggler,
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { Link } from '../../routes';
import { StaticPageLink } from '../../common/links';
import { withTranslation } from '../../common/i18n';

import Icon from './Icon';

const TopNav = styled(Navbar)`
  background-color: ${(props) => props.theme.brandNavBackground};
`;

const BotNav = styled(Navbar)`
  background-color: ${(props) => props.theme.white};

  .active a{
    border-bottom: 2px solid ${(props) => props.theme.brandDark};
  }
`;

const HomeLink = styled.a`
  color: ${(props) => props.theme.neutralDark};

  &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.brandDark};
    }
`;

const NavLink = styled.a`
  margin: 0 1rem;
  color: ${(props) => props.theme.neutralDark};

  &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.neutralDark};
      border-bottom: 2px solid ${(props) => props.theme.brandDark};
    }
`;

class GlobalNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {
      t, i18n, theme, siteTitle, navItems, active,
    } = this.props;

    return (
      <div>
        <TopNav expand="md">
          <Container>
            <Link href="/">
              <a href="" aria-label={`${siteTitle}, palvelun etusivu`} className="navbar-brand">
                {/* Organization logo currently rendered by compiled CSS */}
                <div aria-hidden="true" className="nav-org-logo" />
              </a>
            </Link>
          </Container>
        </TopNav>
        <BotNav expand="md">
          <Container>
            <Link href="/">
              <HomeLink href="" className="navbar-brand">{siteTitle}</HomeLink>
            </Link>
            <NavbarToggler onClick={this.toggle}><Icon name="bars" color={theme.brandDark}/></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                { navItems && navItems.map((page) => (
                  <NavItem key={page.slug} active={page.slug === active}>
                    <StaticPageLink slug={page.slug}>
                      <NavLink href="">{page.name}</NavLink>
                    </StaticPageLink>
                  </NavItem>
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
};

GlobalNav.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    children: PropTypes.object,
  })).isRequired,
  active: PropTypes.string,
};

export default withTranslation('common')(withTheme(GlobalNav));
