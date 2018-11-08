import React from 'react'

import { Navbar, NavbarBrand } from 'reactstrap';

import helLogo from 'open-city-design/src/assets/helsinki-logo-white.svg';

import styled from 'styled-components';

const Logo = styled.img`
  height: 2em;
`

const Header = ({ siteTitle }) => (
  <nav>
    <Navbar expand="md" dark color="secondary">
      <NavbarBrand href="/" aria-label="Helsinki, palvelun etusivu">
        <Logo src={`${helLogo}`} aria-hidden="true" />
      </NavbarBrand>
    </Navbar>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        Hiilineutraali Helsinki
      </NavbarBrand>
    </Navbar>
  </nav>
)

export default Header
