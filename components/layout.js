import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';
import '../styles/main.scss';

const defaultTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/theme-default.scss');

const GlobalStyle = createGlobalStyle`
  a {
    color: ${props => props.theme.brandDark};
  }
`;

function getPlanTheme(planId) {
  const theme = defaultTheme;
  switch (planId) {
    case 'hnh2035':
      theme.brandLight = defaultTheme.helSummer;
      theme.brandDark = defaultTheme.helTram;
      break;
    case 'kuvadigi':
      theme.brandLight = defaultTheme.helSuomenlinna;
      theme.brandDark = defaultTheme.helCoat;
      break;
    default:
      theme.brandLight = defaultTheme.helFog;
      theme.brandDark = defaultTheme.helCoat;
  }
  return theme;
}

class Layout extends React.Component {
  render() {
    const { children, subPageName } = this.props;
    const { identifier } = this.context;
    return (
      <ThemeProvider theme={getPlanTheme(identifier)}>
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
              <GlobalStyle theme={getPlanTheme(identifier)} />
            </div>
          )}
        </PlanContext.Consumer>
      </ThemeProvider>
    );
  }
}

Layout.contextType = PlanContext;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  subPageName: PropTypes.string,
};

Layout.defaultProps = {
  subPageName: undefined,
};

export default Layout;
