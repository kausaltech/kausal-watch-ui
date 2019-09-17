import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Navbar, Nav, NavItem, NavbarToggler,
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { Link } from '../routes';
import PlanContext from '../context/plan';

import Icon from './Common/Icon';

const TopNav = styled(Navbar)`
  background-color: ${props => props.theme.brandNavBackground};
`;

const BotNav = styled(Navbar)`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.brandDark};
`;

const Logo = styled.div`
  height: 2em;
`;

class Header extends React.Component {
  static contextType = PlanContext;

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
    const { theme, siteTitle } = this.props;
    const plan = this.context;

    return (
      <div>
        <TopNav expand="md">
          <Link route="/">
            <a aria-label="Helsinki, palvelun etusivu" className="navbar-brand">
              <Logo aria-hidden="true" className="nav-org-logo" />
            </a>
          </Link>
        </TopNav>
        <BotNav expand="md">
          <Link route="/">
            <a className="navbar-brand">{siteTitle}</a>
          </Link>
          <NavbarToggler onClick={this.toggle}><Icon name="bars" color={theme.brandDark}/></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem key='actions'>
                <Link route="/#actions" passHref={ true }>
                  <a className="nav-link">Toimenpiteet</a>
                </Link>
              </NavItem>
              <NavItem key='indicators'>
                <Link route="indicators" passHref={ true }>
                  <a className="nav-link">Mittarit</a>
                </Link>
              </NavItem>
              { plan.staticPages && plan.staticPages.map((page) => (
                <NavItem key={page.slug}>
                  <Link route={page.slug} passHref={ true }>
                    <a className="nav-link">{page.title}</a>
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </BotNav>
      </div>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default withTheme(Header);
