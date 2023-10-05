import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import styled from 'styled-components';

import PlanContext from 'context/plan';
import { useSite } from 'context/site';
import EmbedContext from 'context/embed';
import ThemedGlobalStyles from 'common/ThemedGlobalStyles';
import { useTheme } from 'common/theme';
import { CombinedIconSymbols } from 'components/common/Icon';

import Header from './header';
import Footer from './Footer';

const Content = styled.main`
  min-height: ${(props) => (props.embed ? '0' : '800px')};
`;

function Layout({ children }) {
  const plan = useContext(PlanContext);
  const site = useSite();
  const embed = useContext(EmbedContext);
  const theme = useTheme();
  const iconBase = theme.name
    ? `/static/themes/${theme.name}/images/favicon`
    : null;
  const googleSiteVerificationTag = plan.domain?.googleSiteVerificationTag;

  const displaySite = {
    generalContent: plan.generalContent || {},
    title: plan.generalContent.siteTitle || plan.name,
    navigationTitle: plan.generalContent.siteTitle || plan.name,
  };

  if (plan.parent) {
    // Plan has a parent plan
    displaySite.title = plan.parent.name;
    displaySite.navigationTitle =
      plan.parent.generalContent.siteTitle || plan.parent.name;
  }

  //const hideLogoOnMobile = theme.navTitleVisible && hasPlanSiblings;
  //const displayTitle = plan.parent ? plan.parent.name  : siteTitle;
  //const rootLink = plan.parent ? plan.parent.viewUrl : '/';

  const websiteJson = `{
    "@context" : "https://schema.org",
    "@type" : "WebSite",
    "name" : "${displaySite.title}",
    "url" : "${site.baseURL}"
  }`;

  return (
    <>
      <Meta />
      <ThemedGlobalStyles />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        {site.baseURL && (
          <>
            <meta property="og:url" content={site.baseURL + site.path} />
            <link rel="canonical" href={`${site.baseURL + site.path}`} />
          </>
        )}
        <meta property="og:site_name" content={displaySite.title} />
        {iconBase && (
          <>
            <link
              rel="icon"
              href={`${iconBase}/icon.svg`}
              type="image/svg+xml"
            />
            <link rel="icon" href={`${iconBase}/favicon.ico`} />
            <link rel="apple-touch-icon" href={`${iconBase}/apple.png`} />
          </>
        )}
        {
          // TODO: perhaps hide google tag on embed?
        }
        {googleSiteVerificationTag && (
          <meta
            name="google-site-verification"
            content={googleSiteVerificationTag}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJson }}
        />
      </Head>
      {!embed.active && <Header siteTitle={displaySite.navigationTitle} />}
      <Content id="main" embed={embed.active}>
        <CombinedIconSymbols />
        {children}
      </Content>
      {!embed.active && <Footer siteTitle={displaySite.navigationTitle} />}
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

type MetaProps = {
  title?: string;
  shareImageUrl?: string;
  description?: string;
};

export function Meta({ title, shareImageUrl, description }: MetaProps) {
  const plan = React.useContext(PlanContext);
  const parentPlanTitle = plan.parent
    ? `${plan.parent.name}/${plan.shortName || plan.name}`
    : null;
  const siteTitle =
    parentPlanTitle || plan.generalContent.siteTitle || plan.name;
  const generalContent = plan.generalContent || {};
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  // In ogTitle we don't want to repeat the site name.
  const ogTitle = title || siteTitle;
  const ogDescription = description || generalContent.siteDescription;
  const ogImage =
    shareImageUrl || plan.image?.social?.src || plan.image?.rendition?.src;

  return (
    <Head>
      <title key="head-title">{pageTitle}</title>
      <meta property="og:title" key="head-og-title" content={ogTitle} />
      {ogDescription && (
        <meta
          property="og:description"
          key="head-og-description"
          content={ogDescription}
        />
      )}
      {ogImage && (
        <meta property="og:image" key="head-og-image" content={ogImage} />
      )}
    </Head>
  );
}
