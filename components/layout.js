import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';


let theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + process.env.THEME_IDENTIFIER + '/_theme-variables.scss');


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
          {plan.currentURL && (
            <meta property="og:url" content={plan.currentURL.domain + plan.currentURL.path} />
          )}
          <meta property="og:site_name" content={siteTitle} />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#000000" />
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content="#ffffff" />
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
  // In ogTitle we don't want to repeat the site name.
  const ogTitle = title || siteTitle;
  const ogDescription = description || generalContent.siteDescription;
  const ogImage = shareImageUrl || plan.imageUrl;

  return (
    <Head>
      <title key="head-title">{pageTitle}</title>
      <meta property="og:title" key="head-og-title" content={ogTitle} />
      {ogDescription && (
        <meta property="og:description" key="head-og-description" content={ogDescription} />
      )}
      {ogImage && (
        <meta property="og:image" key="head-og-image" content={ogImage} />
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
