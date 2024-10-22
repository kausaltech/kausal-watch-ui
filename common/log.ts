import type { DestinationStream, Logger, LoggerOptions } from 'pino';
import pino from 'pino';

import { isServer } from './environment';

let rootLogger: Logger;

const ENV_ATTR_MAP: Record<string, string> = {
  CLUSTER_NAME: 'k8s.cluster.name',
  NODE_NAME: 'k8s.node.name',
  POD_NAME: 'k8s.pod.name',
};

export function getOtelAttributes() {
  const definedVars = Object.entries(ENV_ATTR_MAP).filter(
    ([varName]) => process.env[varName]
  );
  return Object.fromEntries(
    definedVars.map(([varName, attrName]) => [attrName, process.env[varName]])
  );
}

function setupEdgeLogging(options: LoggerOptions) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const write = (obj) => {
    const { time, level, ...rest } = obj;
    const rec = {
      level,
      time: new Date(time).toISOString(),
      ...rest,
    };
    const logFunc = console[level] || console.log;
    logFunc(JSON.stringify(rec));
    // try {
    //   console.log(JSON.stringify(rec));
    // } catch (err) {
    //   if (err instanceof Error) {
    //     // Without a `replacer` argument, stringify on Error results in `{}`
    //     console.log(JSON.stringify(err, ["name", "message", "stack"]));
    //   } else {
    //     console.log(JSON.stringify({ message: "Unknown error type" }));
    //   }
    // }
  };
  options.browser = {
    formatters: {
      level: options.formatters!.level,
    },
    write,
  };
}

function initRootLogger() {
  const isProd = (process.env.NODE_ENV || 'development') == 'production';
  const isEdgeRuntime = process.env.NEXT_RUNTIME === 'edge';
  let stream: DestinationStream | undefined;
  const logLevel = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug');
  const options: LoggerOptions = {
    level: logLevel,
    formatters: {},
    base: {
      runtime: isServer ? (isEdgeRuntime ? 'edge' : 'nodejs') : 'browser',
    },
  };
  if (
    process.env.PRODUCTION_LOG_MODE !== '1' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_RUNTIME === 'nodejs'
  ) {
    // Use pino-pretty for everything
    const pretty = require('pino-pretty'); // eslint-disable-line
    stream = pretty({ colorize: true });
    rootLogger = pino(options, stream);
    return rootLogger;
  }
  options.formatters!.level = (label) => ({ level: label });
  if (isEdgeRuntime) {
    setupEdgeLogging(options);
  } else {
    options.timestamp = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
  }
  rootLogger = pino(options);
  return rootLogger;
}

export const getLogger = (name?: string) => {
  if (!rootLogger) {
    rootLogger = initRootLogger();
  }
  if (name) return rootLogger.child({ logger: name });
  return rootLogger;
};
