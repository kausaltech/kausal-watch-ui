import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import possibleTypes from '@/common/__generated__/possible_types.json';

import { headers as getHeaders } from 'next/headers';
import {
  errorLink,
  httpLink,
  operationEnd,
  operationStart,
} from './utils/apollo.utils';

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

export const { getClient } = registerApolloClient(() => {
  const headers = getHeaders();
  const locale = headers.get('x-next-intl-locale') ?? undefined;

  return new ApolloClient({
    connectToDevTools: false,
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    link: from([
      operationStart,
      errorLink,
      getLocaleMiddleware(locale),
      operationEnd,
      httpLink,
    ]),
  });
});
