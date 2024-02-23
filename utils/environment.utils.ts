import { Metadata } from 'next';

type PublicEnv = {
  [key: `KAUSAL_PUBLIC_${string}`]: string;
};

const isServer = typeof window === 'undefined';

const PUBLIC_ENV_PREFIX = 'KAUSAL_PUBLIC_';

function getEnvVarsFromMeta(): PublicEnv {
  if (isServer) {
    return {};
  }

  const envNodes = document.querySelectorAll<HTMLMetaElement>('meta[name=env]');

  if (!envNodes.length) {
    return {};
  }

  return [...envNodes].reduce((envVars, envVar) => {
    const [key, value] = envVar.content.split('=');

    if (!key.startsWith(PUBLIC_ENV_PREFIX) || !value) {
      return envVars;
    }

    return { ...envVars, [key]: value };
  }, {});
}

/**
 * getPublicEnvVariables allows us to use runtime variables in both server and client side
 * code (replacing the need for NEXT_PUBLIC_ build time env variables) so that single Docker
 * images can be deployed to multiple environments.
 *
 * To support these variables client side, variables are injected into meta tags in the root server
 * rendered layout component in the format <meta name="env" content="KAUSAL_PUBLIC_WHATEVER=whatever"} />
 */
export function getPublicEnvVariables(): PublicEnv {
  if (!isServer) {
    return getEnvVarsFromMeta();
  }

  const publicEnvVariables = Object.entries(process.env)
    .filter(([name, value]) => name.startsWith(PUBLIC_ENV_PREFIX) && !!value)
    .reduce((envVars, envVar) => ({ ...envVars, [envVar[0]]: envVar[1] }), {});

  return publicEnvVariables;
}

export const envMetadata: Metadata = {
  other: {
    env: Object.entries(getPublicEnvVariables()).map(
      ([name, value]) => `${name}=${value}`
    ),
  },
};
