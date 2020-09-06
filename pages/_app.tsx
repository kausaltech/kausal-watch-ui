import React from 'react';
import App, { AppProps } from 'next/app';
import getConfig from 'next/config';
import { gql, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ReactPiwik from 'react-piwik';
import { I18nextProvider, withSSR } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import { Router } from 'routes';
import { captureException } from 'common/sentry';
import { appWithTranslation, i18n } from 'common/i18n';
import withApollo from 'common/apollo';
import theme, { setTheme } from 'common/theme';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';

require('../styles/default/main.scss');

const { publicRuntimeConfig } = getConfig();

if (process.browser && process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    exclude: [/KeyframesImpl/],
  });
}

interface GetPlanParams {
  identifier?: string;
  domain?: string;
}

const GET_PLAN = gql`
  query Plan($identifier: ID, $domain: String) {
    plan(id: $identifier, domain: $domain) {
      id
      identifier
      name
      imageUrl(size: "1500x500")
      mainImage {
        largeRendition: rendition(size: "1500x500") {
          src
          width
          height
          alt
        }
        smallRendition: rendition(size: "600x600") {
          src
          width
          height
          alt
        }
      }
      serveFileBaseUrl
      actionSchedules {
        id,
        beginsAt,
        endsAt
      }
      actionImpacts {
        id,
        identifier,
        name,
        order
      }
      impactGroups {
        id
      }
      staticPages {
        id,
        name,
        slug,
        topMenu,
        footer
      }
      generalContent {
        id
        siteTitle
        siteDescription
        officialNameDescription
        copyrightText
        creativeCommonsLicense
        ownerUrl
        ownerName
        actionShortDescription
        indicatorShortDescription
      }
      mainMenu {
        items(withDescendants: true) {
          id
          linkText
          page {
            urlPath
            slug
          }
          parent {
            id
          }
        }
      }
    }
  }
`;

let piwik;

function onRouteChange(url) {
  const parts = url.split('?');
  const pathname = parts[0];
  const path = pathname.substring(1);

  piwik.track({ path, pathname, search: '' });
}


interface SiteContext {
  instanceType: string;
  domain: string;
  path: string;
}


interface WatchAppProps extends AppProps {
  apollo: ApolloClient<InMemoryCache>,
  siteContext: SiteContext,
  plan: any,
  theme: any,
}

function WatchApp(props: WatchAppProps) {
  const { Component, pageProps, apollo, plan, siteContext } = props;

  if (!piwik && process.browser && publicRuntimeConfig.matomoURL && publicRuntimeConfig.matomoSiteId) {
    piwik = new ReactPiwik({
      url: publicRuntimeConfig.matomoURL,
      siteId: publicRuntimeConfig.matomoSiteId,
      jsFilename: 'matomo.js',
      phpFilename: 'matomo.php',
    });
    // Track the initial page view
    piwik.push(['trackPageView']);
    Router.events.on('routeChangeComplete', onRouteChange);
  }

  setTheme(props.theme);

  return (
    <SiteContext.Provider value={siteContext}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <PlanContext.Provider value={plan}>
            <Component {...pageProps} />
          </PlanContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </SiteContext.Provider>
  );
}
WatchApp.whyDidYouRender = true;

let cachedPlan;
const cachedPlansForHostnames = {};
const cachedThemesForHostnames = {};

async function getPlanAndTheme(ctx) {
  const { apolloClient, req } = ctx;
  const { defaultPlanIdentifier } = publicRuntimeConfig;
  let plan;

  if (process.browser && cachedPlan) return cachedPlan;
  if (req?.requestPlan) return req.requestPlan;

  const queryVariables: GetPlanParams = {
    identifier: '',
    domain: '',
  }

  if (defaultPlanIdentifier) {
    queryVariables.identifier = defaultPlanIdentifier;
  } else {
    queryVariables.domain = req?.currentURL?.hostname;
  }

  try {
    const { data, error } = await apolloClient.query({
      query: GET_PLAN,
      variables: queryVariables,
    });
    if (error) throw error;
    plan = data.plan;
    if (!plan) {
      throw new Error(`No plan found for identifier '${queryVariables.identifier}' and hostname '${queryVariables.domain}'`)
    }
  } catch (error) {
    // We got an error from the API, but if we have a cached version of the plan, use that.
    if (queryVariables.domain) {
      plan = cachedPlansForHostnames[queryVariables.domain];
    } else {
      plan = cachedPlan;
    }
    if (cachedPlan) {
      captureException(error, ctx);
      plan = cachedPlan;
    } else {
      // No? Nothing we can do...
      throw error;
    }
  }
  cachedPlan = plan;
  if (queryVariables.domain) cachedPlansForHostnames[queryVariables.domain] = plan;
  if (req) req.requestPlan = plan;

  let themeVars = {};
  // Initialize theme variables
  if (!process.browser && queryVariables.domain) {
    // FIXME: Get this from GraphQL
    themeVars = cachedThemesForHostnames[queryVariables.domain];
    if (!themeVars || process.env.DISABLE_THEME_CACHE) {
      const fs = require('fs');
      try {
        const data = fs.readFileSync(`./styles/${plan.identifier}.json`, {encoding: 'utf8'});
        themeVars = JSON.parse(data);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        } else {
          captureException(error, ctx);
        }
        themeVars = {};
      }
      if (!process.env.DISABLE_THEME_CACHE) {
        cachedThemesForHostnames[queryVariables.domain] = themeVars;
      }
    }
  }

  return {plan, theme: themeVars};
}

let siteContext;

WatchApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { instanceType } = publicRuntimeConfig;
  const { apolloClient } = ctx;

  if (!siteContext) siteContext = {};

  if (siteContext.instanceType !== instanceType) {
    siteContext.instanceType = instanceType;
  }
  if (ctx.req) {
    const { currentURL } = ctx.req;

    // The current, full URL is used in SSR to render the opengraph tags.
    if (siteContext.domain !== currentURL.domain) siteContext.domain = currentURL.domain;
    if (siteContext.path !== currentURL.path) siteContext.path = currentURL.path;

    // For SSR, the Apollo cache should be cleared on every request to
    // avoid stale data.
    apolloClient.resetStore();
  }

  let appProps;
  let plan, themeVars;

  try {
    appProps = await App.getInitialProps(appContext);
    const data = await getPlanAndTheme(ctx);
    plan = data.plan;
    themeVars = data.theme;
  } catch (error) {
    // Capture errors that happen during a page's getInitialProps.
    // This will work on both client and server sides.
    captureException(error, ctx);
    if (ctx.res) {
      ctx.res.statusCode = 500;
    }
    throw error;
  }

  appProps.plan = plan;
  appProps.theme = themeVars;
  appProps.siteContext = siteContext;

  return { ...appProps };
};

function I18nApp(props) {
  const { initialLanguage, initialI18nStore, i18nServerInstance } = props;
  const SSRWrappedApp = withSSR()(WatchApp);

  return (
    <I18nextProvider i18n={i18nServerInstance || i18n}>
      <SSRWrappedApp initialLanguage={initialLanguage} initialI18nStore={initialI18nStore} {...props} />
    </I18nextProvider>
  );
}
const MemoApp = React.memo(I18nApp) as any;

MemoApp.getInitialProps = async (appContext) => {
  const appProps = await TransApp.getInitialProps(appContext);
  return appProps;
};

// appWithTranslation is not a pure component, so it re-renders much too often.
// We only use its getInitialProps() but do not render it.
const TransApp = appWithTranslation(WatchApp);

export default withApollo(MemoApp);
