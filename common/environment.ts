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

export const isServer = typeof window === 'undefined';

export const deploymentType: DeploymentType =
  (env('NEXT_PUBLIC_DEPLOYMENT_TYPE') as DeploymentType | undefined) ||
  'development';

export const isLocal = process.env.NODE_ENV === 'development';

export const apiUrl =
  env('NEXT_PUBLIC_API_URL') || 'https://api.watch.kausal.tech/v1';

const WILDCARD_DOMAINS = env('NEXT_PUBLIC_WILDCARD_DOMAINS');
export const wildcardDomains = WILDCARD_DOMAINS
  ? WILDCARD_DOMAINS.split(',').map((s) => s.toLowerCase())
  : isLocal
  ? ['localhost']
  : [];

export const gqlUrl = `${apiUrl}/graphql/`;

export const authIssuer = env('NEXT_PUBLIC_AUTH_ISSUER');

export const sentryDsn = env('NEXT_PUBLIC_SENTRY_DSN');

export const logGraphqlQueries =
  isServer && process.env.LOG_GRAPHQL_QUERIES === 'true';

export function getRuntimeConfig() {
  const config: RuntimeConfig = {
    isServer,
    deploymentType,
    isLocal,
    apiUrl,
    gqlUrl,
    wildcardDomains,
    authIssuer,
    logGraphqlQueries,
    runtimeEnv: process.env.NEXT_RUNTIME as RuntimeConfig['runtimeEnv'],
  };
  return config;
}
