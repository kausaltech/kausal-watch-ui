import { cookies, headers as getHeaders } from 'next/headers';

import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { setContext } from '@apollo/client/link/context';

import { createSentryLink, logOperationLink } from '@common/apollo/links';
import { getWatchGraphQLUrl } from '@common/env';

import possibleTypes from '@/common/__generated__/possible_types.json';
import { auth } from '@/config/auth';
import { SELECTED_WORKFLOW_COOKIE_KEY } from '@/constants/workflow';

import { getHttpLink, headersMiddleware, localeMiddleware } from './apollo.utils';

const authMiddleware = setContext(async (_, { headers: initialHeaders = {} }) => {
  const session = await auth();
  const token = session?.idToken;

  return {
    headers: {
      ...initialHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

/**
 * Apollo client used in React Server Components (fully server-side). For client components
 * (which are also server-side rendered) use the separate useQuery hooks provided by ApolloWrapper.
 */
export const { getClient } = registerApolloClient(async () => {
  const headers = await getHeaders();
  const cookiesList = await cookies();
  const locale = headers.get('x-next-intl-locale') ?? undefined;
  const plan = headers.get('x-plan-identifier') ?? undefined;
  const domain = headers.get('x-plan-domain') ?? undefined;
  const versionCookie = cookiesList.get(SELECTED_WORKFLOW_COOKIE_KEY);

  return new ApolloClient({
    defaultContext: {
      locale,
      planDomain: domain,
      planIdentifier: plan,
      selectedWorkflow: versionCookie?.value,
    },
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    link: from([
      createSentryLink(getWatchGraphQLUrl()),
      logOperationLink,
      localeMiddleware,
      authMiddleware,
      headersMiddleware,
      getHttpLink(),
    ]),
  });
});
