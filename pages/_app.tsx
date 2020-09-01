import React from 'react';
import App, { AppProps } from 'next/app';
import getConfig from 'next/config';
import { gql, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ReactPiwik from 'react-piwik';
import { I18nextProvider, withSSR } from 'react-i18next';

import { Router } from 'routes';
import { captureException } from 'common/sentry';
import { appWithTranslation, i18n } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';
import withApollo from '../common/apollo';

require('../styles/default/main.scss');

const { publicRuntimeConfig } = getConfig();

if (process.browser && process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    exclude: [/KeyframesImpl/],
  });
}

const GET_PLAN = gql`
  query Plan($plan: ID!) {
    plan(id: $plan) {
      id
      identifier
      name
      imageUrl(size: "1800x600")
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
  plan: any;
}

function WatchApp({
  Component, pageProps, apollo, plan, siteContext,
}: WatchAppProps) {
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

  return (
    <SiteContext.Provider value={siteContext}>
      <ApolloProvider client={apollo}>
        <PlanContext.Provider value={plan}>
          <Component {...pageProps} />
        </PlanContext.Provider>
      </ApolloProvider>
    </SiteContext.Provider>
  );
}
WatchApp.whyDidYouRender = true;

let cachedPlan;

async function getPlan(ctx) {
  const { apolloClient, req } = ctx;
  // FIXME: Determine identifier based on hostname
  const { planIdentifier } = publicRuntimeConfig;
  let plan;

  if (process.browser && cachedPlan) return cachedPlan;
  if (req?.requestPlan) return req.requestPlan;

  try {
    const { data, error } = await apolloClient.query({
      query: GET_PLAN,
      variables: {
        plan: planIdentifier,
      },
    });
    if (error) throw error;
    plan = data.plan;
  } catch (error) {
    // We got an error from the API, but if we have a cached version of the plan, use that.
    if (cachedPlan) {
      captureException(error, ctx);
      return cachedPlan;
    }
    // No? Nothing we can do...
    throw error;
  }
  cachedPlan = plan;
  if (req) req.requestPlan = plan;
  return plan;
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
  let plan;

  try {
    appProps = await App.getInitialProps(appContext);
    plan = await getPlan(ctx);
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
