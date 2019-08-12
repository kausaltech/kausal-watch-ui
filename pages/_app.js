import React from 'react';
import App, { Container } from 'next/app';
import getConfig from 'next/config';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

import { aplans } from '../common/api';
import { captureException } from '../common/sentry';
import PlanContext from '../context/plan';
import withApollo from '../common/apollo';
import Error from './_error';


const { publicRuntimeConfig } = getConfig();

const GET_PLAN = gql`
  query Plan($plan: ID!) {
    plan(id: $plan) {
      id
      identifier
      name
      imageUrl
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
    }
  }
`;

// cache the global plan object here
let globalPlan;


class AplansApp extends App {
  constructor(props) {
    super(props);
    // This might be a little bit naughty, but we're setting the global
    // plan here so that we don't need to fetch the data client-side.
    const { plan } = props;
    if (!globalPlan && plan) {
      globalPlan = plan;
    }
    this.state = {
      hasError: false,
      errorEventId: undefined,
    };
  }

  static async getInitialProps(args) {
    const { Component, ctx } = args;
    let pageProps = {};
    let currentURL;

    if (ctx.req) {
      // The current, full URL is used in SSR to render the opengraph tags.
      currentURL = ctx.req.currentURL;
    }

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

  render() {
    const {
      Component, pageProps, apollo, currentURL,
    } = this.props;
    const { planIdentifier } = publicRuntimeConfig;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Query query={GET_PLAN} variables={{ plan: planIdentifier }}>
            {({ data, loading, error }) => {
              if (error) return <Error message={error} />;
              if (loading) return null;

              const { plan } = data;
              if (currentURL) plan.currentURL = currentURL;
              return (
                <PlanContext.Provider value={data.plan}>
                  <Component {...pageProps} />
                </PlanContext.Provider>
              );
            }}
          </Query>
        </ApolloProvider>
      </Container>
    );
  }
}


export default withApollo(AplansApp);
