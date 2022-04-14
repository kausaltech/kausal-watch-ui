import * as Sentry from "@sentry/nextjs";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const SENTRY_DSN = (
  publicRuntimeConfig?.sentryDsn || process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
);
const DEPLOYMENT_TYPE = (
  publicRuntimeConfig?.deploymentType || process.env.DEPLOYMENT_TYPE || 'development'
);
const API_DOMAIN = new URL(publicRuntimeConfig.aplansApiBaseURL).hostname;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 50,
  environment: DEPLOYMENT_TYPE,
  integrations: [
    new Sentry.BrowserTracing({
      tracingOrigins: [API_DOMAIN],
    }),
  ],
  // debug: (process.env.NODE_ENV !== 'production') && SENTRY_DSN,
});
