import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Container, Navbar, Nav, NavItem, NavbarToggler,
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { Link } from '../routes';
import { StaticPageLink } from '../common/links';
import { IndicatorListLink, ActionListLink } from '../common/links';
import { withTranslation } from '../common/i18n';
import PlanContext from '../context/plan';

import Icon from './common/Icon';
import ApplicationStateBanner from './common/ApplicationStateBanner';

// TODO: get page content from API

const TopNav = styled(Navbar)`
  background-color: ${props => props.theme.brandNavBackground};
`;

const BotNav = styled(Navbar)`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.brandDark};
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
    const {
      t, i18n, theme, siteTitle,
    } = this.props;
    const plan = this.context;

    return (
      <div>
        <ApplicationStateBanner instanceType={plan.instanceType} />
        <TopNav expand="md">
          <Container>
            <Link href="/">
              <a aria-label={`${siteTitle}, palvelun etusivu`} className="navbar-brand">
                <div aria-hidden="true" className="nav-org-logo" />
              </a>
            </Link>
          </Container>
        </TopNav>
        <BotNav expand="md">
        <Container>
          <Link href="/">
            <a className="navbar-brand">{siteTitle}</a>
          </Link>
          <NavbarToggler onClick={this.toggle}><Icon name="bars" color={theme.brandDark}/></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem key="actions">
                <ActionListLink>
                  <a className="nav-link">{t('actions')}</a>
                </ActionListLink>
              </NavItem>
              <NavItem key="indicators">
                <IndicatorListLink>
                  <a className="nav-link">{t('indicators')}</a>
                </IndicatorListLink>
              </NavItem>
              { plan.staticPages && plan.staticPages.filter((page) => page.topMenu).map((page) => (
                <NavItem key={page.slug}>
                  <StaticPageLink slug={page.slug}>
                    <a className="nav-link">{page.name}</a>
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

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(withTheme(Header));
