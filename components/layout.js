import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Header from './header';
import SiteFooter from './SiteFooter';
import PlanContext from '../context/plan';

 let theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + process.env.THEME_IDENTIFIER + '/_theme-variables.scss');
// let theme = require('../styles/' + process.env.THEME_IDENTIFIER + '/tokens.json');

const GlobalStyle = createGlobalStyle`

  // Import Helsinki font files here. For licencing reasons font files are not publicly shared.
  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/565d73a693abe0776c801607ac28f0bf.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }
  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/5bb29e3b7b1d3ef30121229bbe67c3e1.woff') format('woff');
    font-weight: 400;
    font-style: italic;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/7c46f288e8133b87e6b12b45dac71865.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/e62dc97e83a385e4d8cdc939cf1e4213.woff') format('woff');
    font-weight: 500;
    font-style: italic;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/533af26cf28d7660f24c2884d3c27eac.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }
  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/20d494430c87e15e194932b729d48270.woff') format('woff');
    font-weight: 700;
    font-style: italic;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/a50a1bd245ce63abcc0d1da80ff790d2.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }
  @font-face {
    font-family: 'HelsinkiGrotesk';
    src: url('https://makasiini.hel.ninja/delivery/HelsinkiGrotesk/62a1781d8b396fbb025b0552cf6304d2.woff') format('woff');
    font-weight: 900;
    font-style: italic;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: ${(props) => props.theme.fontFamilySansSerif};
  }

  a {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      color: ${(props) => props.theme.brandDark};
    }
  }
`;

function Layout({ children }) {
  const plan = useContext(PlanContext);
  const generalContent = plan.generalContent || {};
  const siteTitle = generalContent.siteTitle || plan.name;

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Meta />
        <GlobalStyle />
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta property="og:type" content="website" />
          {plan.currentURL && (
            <meta property="og:url" content={plan.currentURL.domain + plan.currentURL.path} />
          )}
          <meta property="og:site_name" content={siteTitle} />
          <link rel="apple-touch-icon" sizes="180x180" href={`/static/images/${process.env.THEME_IDENTIFIER}/favicon/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`/static/images/${process.env.THEME_IDENTIFIER}/favicon/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`/static/images/${process.env.THEME_IDENTIFIER}/favicon/favicon-16x16.png`} />
          <link rel="mask-icon" href={`/static/images/${process.env.THEME_IDENTIFIER}/favicon/safari-pinned-tab.svg`} color={theme.brandDark} />
          <meta name="msapplication-TileColor" content={theme.brandDark} />
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
