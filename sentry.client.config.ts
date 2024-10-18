// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { SENTRY_TUNNEL_PUBLIC_PATH } from './constants/routes.mjs';

Sentry.init({
  environment: process.env.DEPLOYMENT_TYPE || 'development',
  dsn: process.env.SENTRY_DSN,
  tunnel: SENTRY_TUNNEL_PUBLIC_PATH,
  ignoreErrors: ['NEXT_NOT_FOUND'],
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
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
