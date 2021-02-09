import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import styled, { ThemeProvider } from 'styled-components';

import { useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';
import ThemedGlobalStyles from 'common/ThemedGlobalStyles';
import theme from 'common/theme';

import Header from './header';
import Footer from './Footer';

const Content = styled.main`
  min-height: 800px;
`;

function Layout({ children }) {
  const plan = useContext(PlanContext);
  const site = useContext(SiteContext);
  const generalContent = plan.generalContent || {};
  const siteTitle = generalContent.siteTitle || plan.name;
  const iconBase = theme.name ? `/static/themes/${theme.name}/images/favicon` : null;
  const googleSiteVerificationTag = plan.domain?.googleSiteVerificationTag;

  return (
    <>
      <Meta />
      <ThemedGlobalStyles />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        {site.baseURL && (
          <meta property="og:url" content={site.baseURL + site.path} />
        )}
        <meta property="og:site_name" content={siteTitle} />
        {iconBase && (
          <>
            <link rel="icon" href={`${iconBase}/icon.svg`} type="image/svg+xml" />
            <link rel="icon" href={`${iconBase}/favicon.ico`} />
            <link rel="apple-touch-icon" href={`${iconBase}/apple.png`} />
          </>
        )}
        { theme.themeCustomStylesUrl && <link rel="stylesheet" type="text/css" href={theme.themeCustomStylesUrl} />}
        { googleSiteVerificationTag && <meta name="google-site-verification" content={googleSiteVerificationTag} />}
      </Head>
      <Header siteTitle={siteTitle} />
      <Content id="main">
        {children}
      </Content>
      <Footer />
    </>
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
  const ogImage = shareImageUrl || plan.image?.smallRendition?.src || plan.image?.rendition.src;

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
