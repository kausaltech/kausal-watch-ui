import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components';

import Header from './header'
import SiteFooter from './SiteFooter'
import "../styles/main.scss"

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!open-city-design/src/scss/helsinki/_colors.scss');


const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Head>
        <title>Carbon Neutral Helsinki</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header siteTitle="Carbon Neutral Helsinki" />
      {children}
      <SiteFooter />
    </div>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
