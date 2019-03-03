import React from 'react';
import App, { Container } from 'next/app';
import getConfig from 'next/config';
import { aplans } from '../common/api';
import sentry from '../common/sentry';
import PlanContext from '../context/plan';


const { publicRuntimeConfig } = getConfig();
const { captureException } = sentry({ release: process.env.SENTRY_RELEASE });


// cache the global plan object here
let globalPlan;


export default class AplansApp extends App {
  constructor(props) {
    super(props);
    // This might be a little bit naughty, but we're setting the global
    // plan here so that we don't need to fetch the data client-side.
    const planContext = { props };
    if (!globalPlan && planContext.plan) {
      globalPlan = planContext.plan;
    }
    this.state = {
      hasError: false,
      errorEventId: undefined,
    };
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let plan;

    if (globalPlan) {
      plan = globalPlan;
    } else {
      const resp = await aplans.findAll('plan', {
        'filter[identifier]': publicRuntimeConfig.planIdentifier,
        include: 'action_schedules',
      });
      if (resp && resp.data) {
        [plan] = resp.data;
      }
    }
    ctx.plan = plan;

    if (ctx.req) {
      // The current, full URL is used in SSR to render the opengraph tags.
      plan.currentURL = ctx.req.currentURL;
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

    return { pageProps, plan };
  }

  componentDidCatch(error, errorInfo) {
    captureException(error, { errorInfo });
    throw error;
  }

  render() {
    const { Component, pageProps, plan } = this.props;

    return (
      <Container>
        <PlanContext.Provider value={plan}>
          <Component {...pageProps} />
        </PlanContext.Provider>
      </Container>
    );
  }
}
