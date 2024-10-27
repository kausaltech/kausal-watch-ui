import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import {
  detectResourcesSync,
  envDetector,
  hostDetector,
  processDetector,
  Resource,
} from '@opentelemetry/resources';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import {
  type NodeClient,
  SentryContextManager,
  validateOpenTelemetrySetup,
} from '@sentry/nextjs';
import {
  SentryPropagator,
  SentrySampler,
  SentrySpanProcessor,
} from '@sentry/opentelemetry';
import type { Configuration } from '@vercel/otel';

function getResources() {
  const customResources = new Resource({
    [ATTR_SERVICE_NAME]: process.env.SENTRY_PROJECT,
    [ATTR_SERVICE_VERSION]: process.env.BUILD_ID,
  });
  return customResources;
}

export function initMetrics() {
  const metricsPort = process.env.METRICS_PORT
    ? Number(process.env.METRICS_PORT)
    : 9464;

  const exporter = new PrometheusExporter({
    port: metricsPort,
  });
  const detectedResources = detectResourcesSync({
    detectors: [envDetector, processDetector, hostDetector],
  });

  const resources = detectedResources.merge(getResources());

  const meterProvider = new MeterProvider({
    readers: [exporter],
    resource: resources,
  });

  console.log(`Prometheus metrics served at :${metricsPort}`);
  exporter.startServer();
  return meterProvider;
}
/*
const hostMetrics = new HostMetrics({
    name: process.env.SENTRY_PROJECT!,
    meterProvider,
});
*/

export function registerTracer(sentryClient: NodeClient | undefined) {
  const provider = new NodeTracerProvider({
    sampler: sentryClient ? new SentrySampler(sentryClient) : undefined,
  });
  provider.addSpanProcessor(new SentrySpanProcessor());
  provider.register({
    // Ensure trace propagation works
    // This relies on the SentrySampler for correct propagation
    propagator: new SentryPropagator(),
    // Ensure context & request isolation are correctly managed
    contextManager: new SentryContextManager(),
  });
  validateOpenTelemetrySetup();
}

export function getSentryOtelNodeConfig() {
  const config: Partial<Configuration> = {
    contextManager: new SentryContextManager(),
  };
  return config;
}

/*
function initLogging() {
  // To start a logger, you first need to initialize the Logger provider.
  const loggerProvider = new LoggerProvider();
  // Add a processor to export log record
  loggerProvider.addLogRecordProcessor(
    new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
  );

  // You can also use global singleton
  logs.setGlobalLoggerProvider(loggerProvider);
  const logger = logs.getLogger('default');

  // emit a log record
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: 'this is a log record body',
    attributes: { 'log.type': 'LogRecord' },
  });
  return logger;
}

const logger = initLogging();
*/
