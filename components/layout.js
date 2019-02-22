import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';

dynamic(import('../styles/' + process.env.PLAN_IDENTIFIER + '.scss'));

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!open-city-design/src/scss/helsinki/_colors.scss');


const Layout = ({ children, subPageName }) => (
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
          <SiteFooter />
        </div>
      )}
    </PlanContext.Consumer>
  </ThemeProvider>
);


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  subPageName: PropTypes.string,
};

Layout.defaultProps = {
  subPageName: undefined,
};

export default Layout;
