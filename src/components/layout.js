import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { StaticQuery, graphql } from 'gatsby'

import { Container } from 'reactstrap';
import { ThemeProvider } from 'styled-components';

import Header from './header'
import "../styles/main.scss"

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!open-city-design/src/scss/helsinki/_colors.scss');


const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Container>
          {children}
        </Container>
      </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
