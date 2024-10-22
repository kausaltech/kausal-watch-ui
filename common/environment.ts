import { env as getPublicEnv } from 'next-runtime-env/build/script/env';

export type DeploymentType =
  | 'production'
  | 'staging'
  | 'development'
  | 'testing'
  | 'ci'
  | 'wip';

const KNOWN_DEPLOYMENT_TYPES = [
  'production',
  'staging',
  'development',
  'testing',
  'ci',
  'wip',
];

type RuntimeConfig = {
  isServer: boolean;
  deploymentType: DeploymentType;
  isLocal: boolean;
  buildId: string;
  apiUrl: string;
  gqlUrl: string;
  wildcardDomains: string[];
  authIssuer?: string;
  logGraphqlQueries: boolean;
  sentryDsn: string | undefined;
  sentryTraceSampleRate: number;
  sentryReplaysSampleRate: number;
};

// These are not dependent on environment variables.
export const isServer = typeof window === 'undefined';
export const isLocal = process.env.NODE_ENV === 'development';
export const isEdgeRuntime = isServer && process.env.NEXT_RUNTIME === 'edge';
export const isNodeRuntime = isServer && process.env.NEXT_RUNTIME === 'nodejs';

function ensureKnownDeploymentType(val: string): DeploymentType {
  if (!KNOWN_DEPLOYMENT_TYPES.includes(val)) return 'development';
  return val as DeploymentType;
}

function env(key: string) {
  if (!isServer && !/^NEXT_PUBLIC_/i.test(key)) {
    key = `NEXT_PUBLIC_${key}`;
  }
  return getPublicEnv(key);
}

export function getDeploymentType(): DeploymentType {
  const val =
    env('DEPLOYMENT_TYPE') ||
    env('NEXT_PUBLIC_DEPLOYMENT_TYPE') ||
    'development';
  return ensureKnownDeploymentType(val);
}

export function isProductionDeployment() {
  return getDeploymentType() === 'production';
}

export function getWatchBackendUrl() {
  return env('WATCH_BACKEND_URL') || 'https://api.watch.kausal.tech';
}

export function getWatchApiUrl() {
  return env('NEXT_PUBLIC_API_URL') || 'https://api.watch.kausal.tech/v1';
}

export function getWildcardDomains(): string[] {
  const domains =
    env('WILDCARD_DOMAINS') ?? env('NEXT_PUBLIC_WILDCARD_DOMAINS');

  // In dev mode, default to `localhost` being a wildcard domain.
  if (!domains) return isLocal ? ['localhost'] : [];

  return domains.split(',').map((s) => s.toLowerCase());
}

export function getWatchGraphQLUrl() {
  return `${getWatchBackendUrl()}/v1/graphql/`;
}

export function getAuthIssuer() {
  return (
    env('NEXT_PUBLIC_AUTH_ISSUER') || env('AUTH_ISSUER') || getWatchBackendUrl()
  );
}

export function getSentryDsn(): string | undefined {
  return env('SENTRY_DSN') || env('NEXT_PUBLIC_SENTRY_DSN');
}

export function getBuildId(): string {
  const envVal = env('BUILD_ID');
  if (envVal) return envVal;
  return 'dev';
}

function getSentryRate(envVar: string, defaultRate?: number) {
  const defaultVal = defaultRate ?? (isLocal ? 1.0 : 0.1);
  const envVal = env(envVar);
  if (envVal === undefined) return defaultVal;
  const val = Number.parseFloat(envVal);
  if (!(val >= 0 && val <= 1)) return defaultVal;
  return val;
}

export function getSentryTraceSampleRate(): number {
  return getSentryRate('SENTRY_TRACE_SAMPLE_RATE');
}

export function getSentryReplaysSampleRate(): number {
  const debugEnabled = process.env.SENTRY_DEBUG === '1';
  const defaultRate = debugEnabled ? 1.0 : 0.0;
  return getSentryRate('SENTRY_REPLAYS_SAMPLE_RATE', defaultRate);
}

export const authIssuer = env('NEXT_PUBLIC_AUTH_ISSUER');

export const logGraphqlQueries =
  isServer && process.env.LOG_GRAPHQL_QUERIES === 'true';

export function getRuntimeConfig() {
  const config: RuntimeConfig = {
    isServer,
    isLocal,
    buildId: getBuildId(),
    deploymentType: getDeploymentType(),
    apiUrl: getWatchApiUrl(),
    gqlUrl: getWatchGraphQLUrl(),
    wildcardDomains: getWildcardDomains(),
    authIssuer: getAuthIssuer(),
    logGraphqlQueries,
    sentryDsn: getSentryDsn(),
    sentryTraceSampleRate: getSentryTraceSampleRate(),
    sentryReplaysSampleRate: getSentryReplaysSampleRate(),
  };
  return config;
}

const PUBLIC_ENV_VARS = [
  'WATCH_BACKEND_URL',
  'DEPLOYMENT_TYPE',
  'WILDCARD_DOMAINS',
  'SENTRY_DSN',
  'SENTRY_TRACE_SAMPLE_RATE',
  'BUILD_ID',
];

export function getPublicEnvVariableNames() {
  return PUBLIC_ENV_VARS.filter((key) => key in process.env);
}
