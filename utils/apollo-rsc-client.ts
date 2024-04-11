import { ApolloClient, ApolloLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import possibleTypes from '@/common/__generated__/possible_types.json';

import { cookies, headers as getHeaders, headers } from 'next/headers';
import {
  errorLink,
  localeMiddleware,
  operationEnd,
  operationStart,
  getHttpLink,
  headersMiddleware,
} from './apollo.utils';
import { SELECTED_WORKFLOW_COOKIE_KEY } from '@/constants/workflow';
import { auth } from '@/config/auth';
import { wildcardDomains } from '@/common/environment';

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
export const { getClient } = registerApolloClient(() => {
  const headers = getHeaders();
  const cookiesList = cookies();
  const locale = headers.get('x-next-intl-locale') ?? undefined;
  const plan = headers.get('x-plan-identifier') ?? undefined;
  const domain = headers.get('x-plan-domain') ?? undefined;
  const versionCookie = cookiesList.get(SELECTED_WORKFLOW_COOKIE_KEY);

  return new ApolloClient({
    defaultContext: {
      locale,
      planDomain: domain,
      planIdentifier: plan,
      wildcardDomains,
      selectedWorkflow: versionCookie?.value,
    },
    connectToDevTools: false,
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    link: from([
      operationStart,
      errorLink,
      localeMiddleware,
      authMiddleware,
      headersMiddleware,
      operationEnd,
      getHttpLink(),
    ]),
  });
});
