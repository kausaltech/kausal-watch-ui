type DeploymentType =
  | 'production'
  | 'staging'
  | 'development'
  | 'testing'
  | 'wip';

export const isServer = typeof window === 'undefined';

export const deploymentType: DeploymentType =
  (process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE as DeploymentType | undefined) ||
  'development';

export const isLocal = process.env.NODE_ENV === 'development';

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.watch.kausal.tech/v1';

export const wildcardDomains = process.env.NEXT_PUBLIC_WILDCARD_DOMAINS
  ? process.env.NEXT_PUBLIC_WILDCARD_DOMAINS.split(',').map((s) =>
      s.toLowerCase()
    )
  : isLocal
  ? ['localhost']
  : [];

export const gqlUrl = `${apiUrl}/graphql/`;

export const authIssuer = process.env.NEXT_PUBLIC_AUTH_ISSUER;

export const logGraphqlQueries =
  isServer && process.env.LOG_GRAPHQL_QUERIES === 'true';
