import { getPublicEnvVariables } from '../utils/environment.utils';

type DeploymentType =
  | 'production'
  | 'staging'
  | 'development'
  | 'testing'
  | 'wip';

export const isServer = typeof window === 'undefined';

export const publicEnvVars = getPublicEnvVariables();

export const deploymentType: DeploymentType =
  (publicEnvVars.KAUSAL_PUBLIC_DEPLOYMENT_TYPE as DeploymentType | undefined) ||
  'development';

export const isLocal = process.env.NODE_ENV === 'development';

export const apiUrl = publicEnvVars.KAUSAL_PUBLIC_API_URL;

export const gqlUrl = `${apiUrl}/graphql/`;

export const authIssuer = publicEnvVars.KAUSAL_PUBLIC_AUTH_ISSUER;
