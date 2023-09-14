import React, { useEffect } from 'react';
import App, { AppProps } from 'next/app';
import getConfig from 'next/config';
import {
  gql,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import ReactPiwik from 'react-piwik';
import { ThemeProvider } from 'styled-components';
import { Router, useRouter } from 'next/router';
import numbro from 'numbro';

import StatusMessage from 'components/common/StatusMessage';
import { captureException } from 'common/sentry';
import { appWithTranslation } from 'common/i18n';
import withApollo, {
  initializeApolloClient,
  setApolloPlanIdentifier,
} from 'common/apollo';
import { setBasePath } from 'common/links';
import { loadTheme } from 'common/theme';
import { getI18n } from 'common/i18n';
import dayjs from 'common/dayjs';
import PlanContext, { GET_PLAN_CONTEXT, customizePlan } from 'context/plan';
import SiteContext from 'context/site';

import '@kausal/mapboxgl-legend/dist/style.css';

const { publicRuntimeConfig } = getConfig();
const isServer = typeof window === 'undefined';

require('../styles/default/main.scss');

if (!isServer) {
  setBasePath();
}

let piwik;

function onRouteChange(url) {
  const parts = url.split('?');
  const pathname = parts[0];
  const path = pathname.substring(1);

  piwik.track({ path, pathname, search: '' });
}

interface SiteContext {
  deploymentType: string;
  domain: string;
  path: string;
}

interface GlobalProps {
  siteProps: SiteContext;
  themeProps: any;
  plan: any;
}

interface WatchAppProps extends AppProps, GlobalProps {
  apollo: ApolloClient<InMemoryCache>;
}

function WatchApp(props: WatchAppProps) {
  const {
    Component,
    pageProps,
    apollo,
    siteProps,
    themeProps,
    plan,
    unpublished,
    statusMessage,
  } = props;

  const router = useRouter();
  const matomoAnalyticsUrl = plan?.domain?.matomoAnalyticsUrl;
  let matomoURL, matomoSiteId;

  if (matomoAnalyticsUrl) {
    [matomoURL, matomoSiteId] = matomoAnalyticsUrl.split('?');
  } else {
    ({ matomoURL, matomoSiteId } = publicRuntimeConfig);
  }

  useEffect(() => {
    // Launch Piwik after rendering the app
    if (piwik || isServer || !matomoURL || !matomoSiteId) return;
    piwik = new ReactPiwik({
      url: matomoURL,
      siteId: matomoSiteId,
      jsFilename: 'js/',
      phpFilename: 'js/',
    });
    // Disable cookies
    ReactPiwik.push(['disableCookies']);
    // Track the initial page view
    ReactPiwik.push(['trackPageView']);
    Router.events.on('routeChangeComplete', onRouteChange);
  }, [matomoURL, matomoSiteId]);

  if (unpublished === true) {
    return <StatusMessage message={statusMessage} noindex={true} />;
  }

  dayjs.locale(router.locale);

  const i18n = getI18n();
  if (i18n) {
    numbro.setLanguage(i18n.language);
  }

  if (!isServer) {
    setApolloPlanIdentifier(plan.identifier);
  }
  return (
    <SiteContext.Provider value={siteProps}>
      <ThemeProvider theme={themeProps}>
        <ApolloProvider client={apollo}>
          <PlanContext.Provider value={plan}>
            <Component {...pageProps} />
          </PlanContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </SiteContext.Provider>
  );
}

async function getI18nProps(ctx) {
  const {
    serverSideTranslations,
  } = require('next-i18next/serverSideTranslations');
  const nextI18nConfig = require('../next-i18next.config');
  const { publicRuntimeConfig } = getConfig();
  let locale = ctx.locale || publicRuntimeConfig.locale;
  const i18n = getI18n();

  if (!locale) {
    throw new Error('Locale not set');
  }
  if (i18n) {
    await i18n.changeLanguage(locale);
  }
  const conf = {
    ...nextI18nConfig,
    i18n: {
      ...nextI18nConfig.i18n,
      defaultLocale: ctx.defaultLocale,
      locales: ctx.locales,
    },
  };
  const i18nConfig = await serverSideTranslations(
    locale,
    ['common', 'actions', 'a11y'],
    conf
  );
  return i18nConfig;
}

async function getPlan(ctx) {
  const apollo = initializeApolloClient({ ctx });
  const planIdentifier = ctx.req.planIdentifier;
  let plan;

  const { data, error } = await apollo.query({
    query: GET_PLAN_CONTEXT,
    variables: {
      identifier: ctx.req.planIdentifier,
      hostname: ctx.req.currentURL.hostname,
      clientUrl: ctx.req.currentURL.baseURL,
    },
  });
  if (error) throw error;
  plan = data.plan;

  if (!plan) {
    throw new Error(`No plan found for identifier '${planIdentifier}'`);
  }
  return customizePlan(plan);
}

function getSiteContext(ctx) {
  const { currentURL } = ctx.req;
  const { deploymentType } = publicRuntimeConfig;

  return {
    deploymentType,
    hostname: currentURL.hostname,
    path: currentURL.path,
  };
}

WatchApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { req, err } = ctx;
  setBasePath();
  const appProps = await App.getInitialProps(appContext);

  if (!isServer) {
    const nextData = window.__NEXT_DATA__;
    const { _nextI18Next } = nextData.props.pageProps;
    const { plan, themeProps, siteProps } = nextData.props;
    const ret = {
      ...appProps,
      plan,
      siteProps,
      themeProps,
      pageProps: {
        ...appProps.pageProps,
        _nextI18Next,
      },
    };
    return ret;
  }
  const { publicationStatus, publicationStatusMessage } = ctx.req;
  if (publicationStatus != null && publicationStatus !== 'PUBLISHED') {
    return {
      ...appProps,
      unpublished: true,
      statusMessage: publicationStatusMessage,
    };
  }
  /*
  if (err) {
    return {...appProps}
  }
  */
  const i18nProps = await getI18nProps(ctx);
  const plan = await getPlan(ctx);
  const pageProps = {
    ...appProps.pageProps,
    ...i18nProps,
  };
  const theme = await loadTheme(plan.themeIdentifier || plan.identifier);
  return {
    ...appProps,
    plan,
    themeProps: theme,
    pageProps: pageProps,
    siteProps: getSiteContext(ctx),
  };
};

let siteContext;

/*

MemoizedApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { apolloClient } = ctx;

  const transaction = Sentry.getCurrentHub().getScope().getTransaction();
  let tracingSpan;

  let globalProps: GlobalProps;

  if (!process.browser) {

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

    globalProps = {
      plan,
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
const ApolloApp = withApollo(appWithTranslation(WatchApp));
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
*/

export default withApollo(appWithTranslation(WatchApp));
