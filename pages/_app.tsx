import React from 'react';
import App, { AppProps } from 'next/app';
import getConfig from 'next/config';
import { gql, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ReactPiwik from 'react-piwik';
import { I18nextProvider, withSSR } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import * as Sentry from "@sentry/react";

import { Router } from 'routes';
import { captureException } from 'common/sentry';
import { appWithTranslation, i18n, configureFromPlan as configureI18nFromPlan } from 'common/i18n';
import withApollo, {
  setRequestContext as setApolloRequestContext,
  setPlanIdentifier as setApolloPlanIdentifier
} from 'common/apollo';
import theme, { setTheme, applyTheme } from 'common/theme';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';

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
      primaryLanguage
      otherLanguages
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
      actionStatuses {
        id
        identifier
        name
        isCompleted
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
      accessibilityStatementUrl
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

interface GlobalProps {
  siteContext: SiteContext,
  themeProps: any,
  plan: any,
}


interface WatchAppProps extends AppProps, GlobalProps {
  apollo: ApolloClient<InMemoryCache>,
}

function WatchApp(props: WatchAppProps) {
  const { Component, pageProps, apollo, plan, siteContext, themeProps } = props;

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

  if (process.browser) {
    setTheme(themeProps);
    setApolloPlanIdentifier(plan.identifier);
  }

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

WatchApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  let appProps;
  try {
    appProps = await App.getInitialProps(appContext);
  } catch (error) {
    // Capture errors that happen during a page's getInitialProps.
    // This will work on both client and server sides.
    captureException(error, ctx);
    if (ctx.res) {
      ctx.res.statusCode = 500;
    }
    throw error;
  }

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
const MemoizedApp = React.memo(I18nApp) as any;


let cachedPlan;
const cachedPlansForHostnames = {};
const cachedThemesForHostnames = {};

async function getPlan(ctx) {
  const { apolloClient, req } = ctx;
  const { defaultPlanIdentifier } = publicRuntimeConfig;
  let plan;

  if (process.browser && cachedPlan) return cachedPlan;
  if (req?.requestPlan) return req.requestPlan;

  const queryVariables: GetPlanParams = {
    identifier: null,
    domain: null,
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
      context: {
        planIdentifier: queryVariables.identifier,
        planDomain: queryVariables.domain,
      }
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

  return plan;
}

let siteContext;


MemoizedApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { instanceType } = publicRuntimeConfig;
  const { apolloClient } = ctx;

  const transaction = Sentry.getCurrentHub().getScope().getTransaction();
  let tracingSpan;

  if (!siteContext) siteContext = {};

  if (siteContext.instanceType !== instanceType) {
    siteContext.instanceType = instanceType;
  }

  let globalProps: GlobalProps;

  if (!process.browser) {
    const { currentURL } = ctx.req;

    // The current, full URL is used in SSR to render the opengraph tags.
    if (siteContext.domain !== currentURL.domain) siteContext.domain = currentURL.domain;
    if (siteContext.path !== currentURL.path) siteContext.path = currentURL.path;

    // We pass the request to Apollo so that we can inform the backend about
    // the refering URL
    setApolloRequestContext(ctx.req);

    if (transaction) {
      tracingSpan = transaction.startChild({
        op: 'getPlan',
      })
    }

    let plan;
    try {
      plan = await getPlan(ctx);
    } catch (error) {
      captureException(error, ctx);
      if (ctx.res) {
        ctx.res.statusCode = 500;
      }
      throw error;
    }

    if (tracingSpan) tracingSpan.finish();

    applyTheme(plan.identifier);

    globalProps = {
      plan,
      themeProps: theme,
      siteContext,
    }
  } else {
    // @ts-ignore
    const { siteContext, plan, themeProps } = window.__NEXT_DATA__.props;
    globalProps = {
      plan,
      themeProps: theme,
      siteContext,
    }
  }

  configureI18nFromPlan(globalProps.plan);
  setApolloPlanIdentifier(globalProps.plan.identifier);
  Sentry.setTag("plan", globalProps.plan.identifier);

  const appProps = await TransApp.getInitialProps(appContext);
  if (tracingSpan) tracingSpan.finish();

  return {...appProps, ...globalProps};
};

// appWithTranslation is not a pure component, so it re-renders much too often.
// We only use its getInitialProps() but do not render it.
const TransApp = appWithTranslation(WatchApp);
const ApolloApp = withApollo(MemoizedApp);
const getInitialPropsApollo = ApolloApp.getInitialProps

ApolloApp.getInitialProps = async (appContext) => {
  const transaction = Sentry.getCurrentHub().getScope().getTransaction();
  let tracingSpan;

  if (transaction) {
    tracingSpan = transaction.startChild({
      op: 'getInitialProps',
    })
  }
  const appProps = await getInitialPropsApollo(appContext);
  if (tracingSpan) tracingSpan.finish();
  return appProps;
};

const ProfiledApp = Sentry.withProfiler(ApolloApp);

export default ProfiledApp;
