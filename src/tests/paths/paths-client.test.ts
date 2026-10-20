import { describe, expect, it } from '@jest/globals';
import { parse } from 'graphql';

import { makePathsClient } from '@common/apollo/paths-client';

import pathsPossibleTypes from '@/common/__generated__/paths/possible_types.json';

const PARAMETERS_QUERY = parse(`
  query TestParameters {
    parameters {
      ... on ParameterInterface {
        id
        label
      }
    }
  }
`);

describe('makePathsClient in the browser', () => {
  it('rejects a client without an instance', () => {
    expect(() => makePathsClient({ possibleTypes: pathsPossibleTypes.possibleTypes })).toThrow(
      'Neither hostname or identifier set for the instance'
    );
  });

  it('matches interface fragments using the Paths possible types', () => {
    const client = makePathsClient({
      instanceIdentifier: 'zuerich',
      browserProxyPath: '/api/graphql-paths',
      possibleTypes: pathsPossibleTypes.possibleTypes,
    });
    const data = {
      parameters: [{ __typename: 'BoolParameterType', id: 'p1', label: 'Parameter' }],
    };

    client.cache.writeQuery({ query: PARAMETERS_QUERY, data });

    expect(client.cache.readQuery({ query: PARAMETERS_QUERY })).toEqual(data);
  });
});
