import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';


let theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + process.env.PLAN_IDENTIFIER + '/_theme-variables.scss');


function Layout({ children }) {
  const plan = useContext(PlanContext);
  const generalContent = plan.generalContent || {};
  const siteTitle = generalContent.siteTitle || plan.name;

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Meta />
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta property="og:type" content="website" />
          {plan.currentURL &&
            <meta property="og:url" content={plan.currentURL.domain + plan.currentURL.path} />
          }
          <meta property="og:site_name" content={siteTitle} />
        </Head>
        <Header siteTitle={siteTitle} />
        {children}
        <SiteFooter siteTitle={siteTitle} instanceType={plan.instanceType} />
      </div>
    </ThemeProvider>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;


export function Meta(props) {
  const plan = React.useContext(PlanContext);
  const { title, shareImageUrl, description } = props;
  const generalContent = plan.generalContent || {};
  const siteTitle = generalContent.siteTitle || plan.name;
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const ogTitle = pageTitle;
  const ogDescription = description || generalContent.siteDescription;
  const ogImage = shareImageUrl || plan.imageUrl;

  return (
    <Head>
      <title key="head-title">{pageTitle}</title>
      <meta property="og:title" key="head-og-title" content={ogTitle} />
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogImage && (
        <meta property="og:image" content={ogImage} />
      )}
    </Head>
  );
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
