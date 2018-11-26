import React from 'react'
import { Link } from "gatsby";
import { Navbar } from 'reactstrap';

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

const Header = ({ siteTitle }) => (
  <div>
    <TopNav expand="md">
      <Link to="/" aria-label="Helsinki, palvelun etusivu" className="navbar-brand"><Logo aria-hidden="true" className="hel-logo-summer"/></Link>
    </TopNav>
    <BotNav expand="md">
      <Link to="/" className="navbar-brand">Hiilineutraali Helsinki</Link>
    </BotNav>
  </div>
)

export default Header
