import React from 'react'
import PropTypes from 'prop-types';
import {Link} from '../routes'
import {Navbar} from 'reactstrap';

import styled from 'styled-components';

const TopNav = styled(Navbar)`
  background-color: ${props => props.theme.helTram};
`

const BotNav = styled(Navbar)`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.helTram};
`

const Logo = styled.div`
  width: 5em;
  height: 2em;
`

const Header = ({siteTitle}) => (
  <div>
    <TopNav expand="md">
      <Link route="/">
        <a aria-label="Helsinki, palvelun etusivu" className="navbar-brand">
          <Logo aria-hidden="true" className="hel-logo-summer"/>
        </a>
      </Link>
    </TopNav>
    <BotNav expand="md">
      <Link route="/">
        <a className="navbar-brand">{siteTitle}</a>
      </Link>
    </BotNav>
  </div>
)
Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
}

export default Header
