import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
//import { HostMetrics } from '@opentelemetry/host-metrics';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { RuntimeNodeInstrumentation } from '@opentelemetry/instrumentation-runtime-node';
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici';
import {
  Resource,
  detectResourcesSync,
  envDetector,
  hostDetector,
  processDetector,
} from '@opentelemetry/resources';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

const metricsPort = process.env.METRICS_PORT
  ? Number(process.env.METRICS_PORT)
  : 9464;

const exporter = new PrometheusExporter({
  port: metricsPort,
});
const detectedResources = detectResourcesSync({
  detectors: [envDetector, processDetector, hostDetector],
});

const customResources = new Resource({
  [SEMRESATTRS_SERVICE_NAME]: process.env.SENTRY_PROJECT,
  [SEMRESATTRS_SERVICE_VERSION]: process.env.BUILD_ID,
});

const resources = detectedResources.merge(customResources);

const meterProvider = new MeterProvider({
  readers: [exporter],
  resource: resources,
});
/*
const hostMetrics = new HostMetrics({
    name: process.env.SENTRY_PROJECT!,
    meterProvider,
});
*/
registerInstrumentations({
  meterProvider,
  instrumentations: [
    new HttpInstrumentation(),
    new RuntimeNodeInstrumentation(),
    new UndiciInstrumentation(),
  ],
});

console.log(`Prometheus metrics served at :${metricsPort}`);

exporter.startServer();
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
