import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';
import '../styles/main.scss';


const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!open-city-design/src/scss/helsinki/_colors.scss');


const Layout = ({ children, subPageName }) => (
  <ThemeProvider theme={theme}>
    <PlanContext.Consumer>
      {plan => (
        <div>
          <Head>
            <title>{(subPageName ? `${subPageName} | ` : '') + (plan ? plan.name : 'Toimenpideohjelman seuranta')}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Header siteTitle={plan ? plan.name : 'Toimenpideohjelma'} />
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
