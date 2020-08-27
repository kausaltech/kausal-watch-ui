import React from 'react';
import App from 'next/app';
import getConfig from 'next/config';
import { Query } from '@apollo/client/react/components';
import { gql, ApolloProvider } from '@apollo/client';
import ReactPiwik from 'react-piwik';

import { Router } from '../routes';
import { captureException } from '../common/sentry';
import { appWithTranslation, initPromise as i18nInitPromise, i18n } from '../common/i18n';
import PlanContext from '../context/plan';
import SiteContext from '../context/site';
import withApollo, { clearCache as clearApolloCache } from '../common/apollo';
import Error from './_error';

require('../styles/default/main.scss');

const { publicRuntimeConfig } = getConfig();

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

class AplansApp extends App {
  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);

    if (process.browser && publicRuntimeConfig.matomoURL && publicRuntimeConfig.matomoSiteId) {
      this.piwik = new ReactPiwik({
        url: publicRuntimeConfig.matomoURL,
        siteId: publicRuntimeConfig.matomoSiteId,
        jsFilename: 'matomo.js',
        phpFilename: 'matomo.php',
      });
      // Track the initial page view
      ReactPiwik.push(['trackPageView']);
    }
  }

  static async getInitialProps(args) {
    const { Component, ctx } = args;
    let pageProps = {};
    let currentURL;

    if (ctx.req) {
      // The current, full URL is used in SSR to render the opengraph tags.
      currentURL = ctx.req.currentURL;
      clearApolloCache();
    }

    await i18nInitPromise;

    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      captureException(error, ctx);
      throw error;
    }

    return { pageProps, currentURL };
  }

  componentDidCatch(error, errorInfo) {
    captureException(error, { errorInfo });
    throw error;
  }

  handleRouteChange(url) {
    if (!process.browser || !this.piwik) return;

    const parts = url.split('?');
    const pathname = parts[0];
    const path = pathname.substring(1);

    this.piwik.track({ path, pathname, search: '' });
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  shouldComponentUpdate(nextProps) {
    // Optimize performance by updating this component only
    // when props change. State is not used in render() so
    // no need to check it here.
    const out = Object.entries(this.props).some(([key, val]) => {
      if (key === 'pageProps') {
        return JSON.stringify(val) !== JSON.stringify(nextProps[key]);
      }
      if (nextProps[key] !== val) {
        return true;
      }
      return false;
    });
    return out;
  }

  render() {
    const {
      Component, pageProps, apollo, currentURL,
    } = this.props;
    const { planIdentifier, instanceType } = publicRuntimeConfig;
    const siteContext = {
      instanceType,
      currentURL,
    };

    return (
      <SiteContext.Provider value={siteContext}>
        <ApolloProvider client={apollo}>
          <Query query={GET_PLAN} variables={{ plan: planIdentifier }}>
            {({ data, loading, error }) => {
              if (error) return <Error message={error} />;
              if (loading) return null;

              const { plan } = data;

              return (
                <PlanContext.Provider value={plan}>
                  <Component {...pageProps} />
                </PlanContext.Provider>
              );
            }}
          </Query>
        </ApolloProvider>
      </SiteContext.Provider>
    );
  }
}

export default appWithTranslation(withApollo(AplansApp));
