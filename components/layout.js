import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';

dynamic(import('../styles/' + process.env.PLAN_IDENTIFIER + '/main.scss'));

let theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + process.env.PLAN_IDENTIFIER + '/_theme-variables.scss');


function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <PlanContext.Consumer>
        {plan => (
          <div>
            <Head>
              <title key="head-title">{plan.name}</title>
              <meta property="og:title" key="head-og-title" content={plan.name} />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;


export class SubpageTitle extends React.Component {
  static contextType = PlanContext;

  render() {
    const { title } = this.props;
    const plan = this.context;

    return (
      <Head>
        <title key="head-title">{`${title} | ${plan.name}`}</title>
        <meta property="og:title" key="head-og-title" content={title} />
      </Head>
    );
  }
}

SubpageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
