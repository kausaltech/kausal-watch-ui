import * as Sentry from '@sentry/nextjs';

import { getRuntimeConfig } from './common/environment';
import { getLogger } from './common/log';

const logger = getLogger('init');

logger.info({ config: getRuntimeConfig() }, 'Initializing app');

function initSentry() {
  if (
    process.env.NEXT_RUNTIME !== 'nodejs' &&
    process.env.NEXT_RUNTIME !== 'edge'
  ) {
    return;
  }
  Sentry.init({
    environment: getRuntimeConfig().deploymentType,
    ignoreErrors: ['NEXT_NOT_FOUND'],
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.1,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}

export const register = async () => {
  initSentry();
  if (process.env.NODE_ENV !== 'production') return;
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node');
  }
};
