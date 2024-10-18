import { env } from 'next-runtime-env/build/script/env';

type DeploymentType =
  | 'production'
  | 'staging'
  | 'development'
  | 'testing'
  | 'wip';

type RuntimeConfig = {
  isServer: boolean;
  deploymentType: DeploymentType;
  isLocal: boolean;
  apiUrl: string;
  gqlUrl: string;
  wildcardDomains: string[];
  authIssuer?: string;
  logGraphqlQueries: boolean;
  runtimeEnv: 'nodejs' | 'edge';
};

// These are not dependent on environment variables.
export const isServer = typeof window === 'undefined';
export const isLocal = process.env.NODE_ENV === 'development';

export function getDeploymentType(): DeploymentType {
  return (
    (env('NEXT_PUBLIC_DEPLOYMENT_TYPE') as DeploymentType | undefined) ||
    'development'
  );
}

export function isProductionDeployment() {
  return getDeploymentType() === 'production';
}

export function getApiUrl() {
  return env('NEXT_PUBLIC_API_URL') || 'https://api.watch.kausal.tech/v1';
}

export const apiUrl = getApiUrl();

export function getWildcardDomains(): string[] {
  const domains = env('NEXT_PUBLIC_WILDCARD_DOMAINS');

  // In dev mode, default to `localhost` being a wildcard domain.
  if (!domains) return isLocal ? ['localhost'] : [];

  return domains.split(',').map((s) => s.toLowerCase());
}

export function getGqlUrl() {
  return `${getApiUrl()}/graphql/`;
}

export const authIssuer = env('NEXT_PUBLIC_AUTH_ISSUER');

export const sentryDsn = env('NEXT_PUBLIC_SENTRY_DSN');

export const logGraphqlQueries =
  isServer && process.env.LOG_GRAPHQL_QUERIES === 'true';

export function getRuntimeConfig() {
  const config: RuntimeConfig = {
    isServer,
    isLocal,
    deploymentType: getDeploymentType(),
    apiUrl: getApiUrl(),
    gqlUrl: getGqlUrl(),
    wildcardDomains: getWildcardDomains(),
    authIssuer,
    logGraphqlQueries,
    runtimeEnv: process.env.NEXT_RUNTIME as RuntimeConfig['runtimeEnv'],
  };
  return config;
}
