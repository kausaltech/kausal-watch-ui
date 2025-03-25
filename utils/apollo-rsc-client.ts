import {
  cookies,
  headers as getHeaders,
  type UnsafeUnwrappedCookies,
  type UnsafeUnwrappedHeaders,
} from 'next/headers';

import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';

import possibleTypes from '@/common/__generated__/possible_types.json';
import { getWildcardDomains } from '@/common/environment';
import { auth } from '@/config/auth';
import { SELECTED_WORKFLOW_COOKIE_KEY } from '@/constants/workflow';
import {
  getHttpLink,
  headersMiddleware,
  localeMiddleware,
  logOperationLink,
} from './apollo.utils';

const authMiddleware = setContext(
  async (_, { headers: initialHeaders = {} }) => {
    const session = await auth();
    const token = session?.idToken;

    return {
      headers: {
        ...initialHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  }
);

/**
 * Apollo client used in React Server Components (fully server-side). For client components
 * (which are also server-side rendered) use the separate useQuery hooks provided by ApolloWrapper.
 */
export const { getClient } = registerApolloClient(async () => {
  const headers =
    (await getHeaders()) as unknown as UnsafeUnwrappedHeaders as unknown as UnsafeUnwrappedHeaders;
  const cookiesList =
    (await cookies()) as unknown as UnsafeUnwrappedCookies as unknown as UnsafeUnwrappedCookies;
  const locale = headers.get('x-next-intl-locale') ?? undefined;
  const plan = headers.get('x-plan-identifier') ?? undefined;
  const domain = headers.get('x-plan-domain') ?? undefined;
  const versionCookie = cookiesList.get(SELECTED_WORKFLOW_COOKIE_KEY);

  return new ApolloClient({
    defaultContext: {
      locale,
      planDomain: domain,
      planIdentifier: plan,
      wildcardDomains: getWildcardDomains(),
      selectedWorkflow: versionCookie?.value,
    },
    connectToDevTools: false,
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    link: from([
      logOperationLink,
      localeMiddleware,
      authMiddleware,
      headersMiddleware,
      getHttpLink(),
    ]),
  });
});

export const apolloQuery: typeof ApolloClient.prototype.query = async (
  ...args
) => {
  const client = await getClient();
  return client.query(...args);
};
