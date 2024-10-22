import type { NodeClient } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';
import {
  SentryPropagator,
  SentrySampler,
  SentrySpanProcessor,
} from '@sentry/opentelemetry';
import type { IntegrationFn } from '@sentry/types';
import { serializeEnvelope } from '@sentry/utils';
import { registerOTel } from '@vercel/otel';
import { makeEnvPublic } from 'next-runtime-env';

import {
  getPublicEnvVariableNames,
  getRuntimeConfig,
  isLocal,
} from './common/environment';
import { getLogger } from './common/log';

const logger = getLogger();

function matchAnyPath(hostname: string): RegExp {
  // Escape special characters in the hostname
  const escapedHostname = hostname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a RegExp that matches the hostname followed by any path
  return new RegExp(`^https?://${escapedHostname}(:[0-9]+)?(/.*)?$`);
}

const enableSpotlight = isLocal;

const edgeSpotlightIntegration: IntegrationFn = (options = {}) => {
  return {
    name: 'EdgeSpotlight',
    setup(client) {
      client.on('beforeEnvelope', (envelope) => {
        const serializedEnvelope = serializeEnvelope(envelope);
        console.log('middleware send');
        fetch('http://localhost:8969/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-sentry-envelope',
          },
          body: serializedEnvelope,
        });
      });
    },
  };
};

async function initSentry() {
  const runtimeConfig = getRuntimeConfig();
  const backendHost = new URL(runtimeConfig.apiUrl).hostname;
  const tracePropagationTargets = [matchAnyPath(backendHost)];
  if (isLocal) {
    tracePropagationTargets.push(matchAnyPath('localhost'));
  }
  Sentry.init({
    dsn: runtimeConfig.sentryDsn,
    environment: runtimeConfig.deploymentType,
    /*
    beforeSend(event, hint) {
      console.log(`\n\nbefore send ${process.env.NEXT_RUNTIME}`)
      return event;
    },
    beforeSendTransaction(event, hint) {
      console.log(`before send transaction ${process.env.NEXT_RUNTIME}`)
      console.log(event.contexts?.trace);
      console.log(event.spans);
      return event;
    },
    */
    ignoreErrors: ['NEXT_NOT_FOUND'],
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: runtimeConfig.sentryTraceSampleRate,
    //tracePropagationTargets,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: process.env.SENTRY_DEBUG === '1',
    spotlight: true,
    integrations:
      process.env.NEXT_RUNTIME === 'edge'
        ? [edgeSpotlightIntegration()]
        : undefined,
    /*
    integrations: [
      Sentry.requestDataIntegration({
        include: {
          ip: true,
        },
      }),
    ],*/
    // skipOpenTelemetrySetup: true,
  });
  /*
  if (enableSpotlight) {
    const Spotlight = await import('@spotlightjs/spotlight');
    Spotlight.init();
  }
    */
  const client = Sentry.getClient();
  return client;
}

export const register = async () => {
  const runtimeConfig = getRuntimeConfig();
  makeEnvPublic(getPublicEnvVariableNames());
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    logger.info(`Initializing app (build id '${runtimeConfig.buildId})'`);
    logger.info(runtimeConfig, 'Runtime config');
  }
  const sentryClient = await initSentry();
  registerOTel({
    serviceName: 'next-app',
    contextManager: new Sentry.SentryContextManager(),
    propagators: [new SentryPropagator()],
    traceSampler: new SentrySampler(sentryClient as NodeClient),
    spanProcessors: [new SentrySpanProcessor()],
  });
  Sentry.validateOpenTelemetrySetup();
  return;
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const nodeOtel = await import('./instrumentation-node');
    nodeOtel.initMetrics();
    nodeOtel.registerTracer(sentryClient as NodeClient | undefined);
  }
};
