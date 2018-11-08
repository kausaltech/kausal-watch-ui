import React from 'react'

import { Navbar, NavbarBrand } from 'reactstrap';

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
      <NavbarBrand href="/" aria-label="Helsinki, palvelun etusivu">
        <Logo src={`${helLogo}`} aria-hidden="true" />
      </NavbarBrand>
    </TopNav>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        Hiilineutraali Helsinki
      </NavbarBrand>
    </Navbar>
  </div>
)

export default Header
