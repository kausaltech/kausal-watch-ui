import pino, { DestinationStream, Logger, LoggerOptions } from 'pino';

let rootLogger: Logger;

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
    base: {},
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
  options.formatters!.level = (label, number) => ({ level: label });
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
