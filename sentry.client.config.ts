// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import type { SamplingContext } from '@sentry/types';

import { getSentryTraceSampleRate } from './common/environment';

Sentry.init({
  //environment: process.env.DEPLOYMENT_TYPE || 'development',
  dsn: process.env.SENTRY_DSN,
  //tunnel: SENTRY_TUNNEL_PUBLIC_PATH,
  ignoreErrors: ['NEXT_NOT_FOUND'],
  tracesSampler(ctx: SamplingContext) {
    console.dir(ctx, { depth: 4 });
    if (ctx.parentSampled !== undefined) return ctx.parentSampled;
    return getSentryTraceSampleRate();
  },
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.SENTRY_DEBUG === '1',
  replaysOnErrorSampleRate: 1.0,
  // You may want this to be 100% while in development and sample at a lower rate in production
  replaysSessionSampleRate: process.env.SENTRY_DEBUG === '1' ? 1.0 : 0.0,
  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      // Additional Replay configuration goes in here, for example:
      blockAllMedia: false,
      // FIXME networkDetailAllowUrls: [env.getRuntimeConfig().gqlUrl],
    }),
    //Sentry.feedbackIntegration()
  ],
});
