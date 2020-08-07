import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Container, Navbar, Nav, NavItem, NavbarToggler,
} from 'reactstrap';
import SVG from 'react-inlinesvg';
import styled, { withTheme } from 'styled-components';
import { Link } from '../routes';
import { StaticPageLink } from '../common/links';
import {
  DashboardLink,
  IndicatorListLink,
  ActionListLink,
} from '../common/links';
import { withTranslation } from '../common/i18n';
import PlanContext from '../context/plan';

import Icon from './common/Icon';
import ApplicationStateBanner from './common/ApplicationStateBanner';

const Logo = styled.div`
  height: 2.2em;
  width: 6em;

  svg {
    max-height: 2.2rem;
    max-width: 100%;
  }
`;

const TopNav = styled(Navbar)`
  background-color: ${props => props.theme.brandNavBackground};
`;

const BotNav = styled(Navbar)`
  background-color: ${(props) => props.theme.themeColors.white};

  a {
    color: ${props => props.theme.neutralDark};
  }
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
    const hasActionImpacts = plan.actionImpacts.length > 0;
    const OrgLogo = () => <SVG src={theme.themeLogoUrl} />;

    return (
      <div>
        <ApplicationStateBanner instanceType={plan.instanceType} />
        <TopNav expand="md">
          <Container>
            <Logo>
              <Link href="/">
                <a aria-label={`${siteTitle}, palvelun etusivu`}>
                <OrgLogo aria-hidden="true" />
                </a>
              </Link>
            </Logo>
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
              { hasActionImpacts && (
                <NavItem key="dasboard">
                  <DashboardLink>
                    <a className="nav-link">{t('dashboard')}</a>
                  </DashboardLink>
                </NavItem>
              )}
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
