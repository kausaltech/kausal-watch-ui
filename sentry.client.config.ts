// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { deploymentType } from './common/environment';

Sentry.init({
  environment: deploymentType,

  dsn: 'https://9b7a344624774da8a5aa5752baad826b@sentry.kausal.tech/2',

  ignoreErrors: ['NEXT_NOT_FOUND'],

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      maskAllText: false,
      // Additional Replay configuration goes in here, for example:
      blockAllMedia: false,
      networkDetailAllowUrls: ['https://api.watch.kausal.tech/v1/graphql/'],
    }),
  ],
});
