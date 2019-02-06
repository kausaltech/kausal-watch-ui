import React from 'react';
import App, { Container } from 'next/app';
import getConfig from 'next/config';
import { aplans } from '../common/api';
import PlanContext from '../context/plan';


const { publicRuntimeConfig } = getConfig();

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

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, plan };
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
