import {
  type DeploymentType,
  getAuthIssuer,
  getDeploymentType,
  getPathsBackendUrl,
  getWatchApiUrl,
  isLocalDev,
} from '@common/env';

export type { DeploymentType };

export const isServer = typeof window === 'undefined';

export const deploymentType: DeploymentType = getDeploymentType();

export const isLocal = isLocalDev;

export const apiUrl = getWatchApiUrl();

export const gqlUrl = `${apiUrl}/graphql/`;

export const authIssuer = getAuthIssuer();

export const logGraphqlQueries = isServer && process.env.LOG_GRAPHQL_QUERIES === 'true';

export const pathsBackendUrl = getPathsBackendUrl();
export const pathsGqlUrl = `${pathsBackendUrl}/v1/graphql/`;
