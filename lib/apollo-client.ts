import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { gqlUrl } from './api.utils';
import possibleTypes from '@/common/__generated__/possible_types.json';
import { isLocal, isServer } from '@/common/environment';

import { headers as getHeaders } from 'next/headers';

const getLocaleMiddleware = (locale?: string) => {
  return new ApolloLink((operation, forward) => {
    // Inject @locale directive into the query root object
    const { query } = operation;
    const { definitions } = query;
    const definition = definitions[0];

    if (
      !locale ||
      definition.kind !== 'OperationDefinition' ||
      definition.operation !== 'query'
    ) {
      return forward(operation);
    }

    const localeDirective = {
      kind: 'Directive',
      name: {
        kind: 'Name',
        value: 'locale',
      },
      arguments: [
        {
          kind: 'Argument',
          name: { kind: 'Name', value: 'lang' },
          value: { kind: 'StringValue', value: locale, block: false },
        },
      ],
    };

    operation.query = {
      ...query,
      definitions: [
        {
          ...definition,
          directives: [...(definition.directives ?? []), localeDirective],
        },
        ...definitions.slice(1),
      ],
    };

    return forward(operation);
  });
};

const gqlLink = new HttpLink({
  uri: gqlUrl,
  fetchOptions: { cache: 'no-store' },
});

export const { getClient } = registerApolloClient(() => {
  const headers = getHeaders();
  const locale = headers.get('x-next-intl-locale') ?? undefined;

  return new ApolloClient({
    connectToDevTools: isLocal && !isServer,
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    link: from([getLocaleMiddleware(locale), gqlLink]),
  });
});
