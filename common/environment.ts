export const isServer = typeof window === 'undefined';

export const deploymentType =
  process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE || 'development';

export const isLocal = process.env.NODE_ENV === 'development';

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.watch.kausal.tech/v1';

export const gqlUrl = `${apiUrl}/graphql/`;

console.log(
  'TEST ENVS',
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE
);
