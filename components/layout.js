import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';

dynamic(import('../styles/' + process.env.PLAN_IDENTIFIER + '/main.scss'));

let theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + process.env.PLAN_IDENTIFIER + '/_variables.scss');

//theme = {brandDark: '#333', brandLight: '#ccc'}
const Layout = ({ children, subPageName }) => 

{
  return(
  <ThemeProvider theme={theme}>
    <PlanContext.Consumer>
      {plan => (
        <div>
          <Head>
            <title>{(subPageName ? `${subPageName} | ` : '') + plan.name}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={subPageName || plan.name} />
            {plan.currentURL &&
              <meta property="og:url" content={plan.currentURL.domain + plan.currentURL.path} />
            }
            <meta property="og:site_name" content={plan.name} />
          </Head>
          <Header siteTitle={plan.name} />
          {children}
          <SiteFooter siteTitle={plan.name} />
        </div>
      )}
    </PlanContext.Consumer>
  </ThemeProvider>
)};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  subPageName: PropTypes.string,
};

Layout.defaultProps = {
  subPageName: undefined,
};

export default Layout;
