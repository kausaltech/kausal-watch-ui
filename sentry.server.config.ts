// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { deploymentType, gqlUrl, pathsGqlUrl } from './common/environment';

Sentry.init({
  environment: deploymentType,

  dsn: 'https://9b7a344624774da8a5aa5752baad826b@sentry.kausal.tech/2',

  ignoreErrors: ['NEXT_NOT_FOUND'],

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  tracePropagationTargets: ['localhost', /^\//, gqlUrl, pathsGqlUrl],
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
