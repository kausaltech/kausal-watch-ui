import React from 'react'
import { Link } from "gatsby";
import { Navbar } from 'reactstrap';

import helLogo from 'open-city-design/src/assets/helsinki-logo-white.svg';

import styled from 'styled-components';

const TopNav = styled(Navbar)`
  background-color: ${props => props.theme.helTram};
`

const Logo = styled.img`
  height: 2em;
`

const Header = ({ siteTitle }) => (
  <div>
    <TopNav expand="md">
      <Link to="/" aria-label="Helsinki, palvelun etusivu" className="navbar-brand"><Logo src={`${helLogo}`} aria-hidden="true" /></Link>
    </TopNav>
    <Navbar color="light" light expand="md">
      <Link to="/" className="navbar-brand">Hiilineutraali Helsinki</Link>
    </Navbar>
  </div>
)

export default Header
