'use client';

import { useLocale } from 'next-intl';
import { ApolloLink, useApolloClient } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import {
  errorLink,
  localeMiddleware,
  getHttpLink,
  headersMiddleware,
} from '../../utils/apollo.utils';
import { isServer } from '@/common/environment';

/**
 * Ensure auth cookies are passed to requests when rendering client components on the
 * server. This ensures authorisation works on first render.
 */
function cookieMiddleware(cookie) {
  return new ApolloLink((operation, forward) => {
    if (isServer && cookie) {
      operation.setContext(({ headers = {} }) => {
        return {
          headers: {
            ...headers,
            cookie,
          },
        };
      });
    }

    return forward(operation);
  });
}

function makeClient(initialLocale: string, origin?: string, cookie?: string) {
  return new NextSSRApolloClient({
    defaultContext: {
      locale: initialLocale,
    },
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([
      errorLink,
      localeMiddleware,
      cookieMiddleware(cookie),
      headersMiddleware,
      ...(isServer
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
          ]
        : []),
      getHttpLink(origin),
    ]),
  });
}

/**
 * On locale change update the Apollo client context to include the current locale, which
 * allows us to inject the "@locale" directive into queries via an Apollo link. Required
 * because ApolloNextAppProvider makeClient is only called on initial render.
 */
function UpdateLocale({ children }: React.PropsWithChildren) {
  const locale = useLocale();
  const apolloClient = useApolloClient();

  apolloClient.defaultContext.locale = locale;

  return children;
}

type Props = {
  origin?: string;
  initialLocale: string;
  /**
   * Visitor's cookies must be passed from a Server Component on initialisation
   * to support authentication on the first server render of client components
   */
  cookie?: string;
} & React.PropsWithChildren;

export function ApolloWrapper({
  origin,
  initialLocale,
  children,
  cookie,
}: Props) {
  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient(initialLocale, origin, cookie)}
    >
      <UpdateLocale>{children}</UpdateLocale>
    </ApolloNextAppProvider>
  );
}
