import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';


let theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + process.env.PLAN_IDENTIFIER + '/_theme-variables.scss');


function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <PlanContext.Consumer>
        {(plan) => (
          <div>
            <Meta />
            <Head>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta property="og:type" content="website" />
              {plan.currentURL &&
                <meta property="og:url" content={plan.currentURL.domain + plan.currentURL.path} />
              }
              <meta property="og:site_name" content={plan.name} />
            </Head>
            <Header siteTitle={plan.name} />
            {children}
            <SiteFooter siteTitle={plan.name} instanceType={plan.instanceType} />
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


export class Meta extends React.Component {
  static contextType = PlanContext;

  render() {
    const { title, shareImageUrl, description } = this.props;
    const plan = this.context;
    const pageTitle = title ? `${title} | ${plan.name}` : plan.name;
    const ogTitle = pageTitle;
    const ogDescription = description ? description : 'Hiilineutraali Helsinki 2035 toimenpideohjelman seurantapalvelu';
    const ogImage = shareImageUrl ? shareImageUrl : plan.imageUrl;

    return (
      <Head>
        <title key="head-title">{pageTitle}</title>
        <meta property="og:title" key="head-og-title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
      </Head>
    );
  }
}

Meta.defaultProps = {
  title: null,
  shareImageUrl: null,
  description: null,
};

Meta.propTypes = {
  title: PropTypes.string,
  shareImageUrl: PropTypes.string,
  description: PropTypes.string,
};
