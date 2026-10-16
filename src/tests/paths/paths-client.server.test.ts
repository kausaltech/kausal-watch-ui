/**
 * @jest-environment node
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { parse } from 'graphql';

import { makePathsClient } from '@common/apollo/paths-client';
import { getPathsGraphQLUrl } from '@common/env';

import pathsPossibleTypes from '@/common/__generated__/paths/possible_types.json';

const GET_INSTANCE_NAME = parse(`
  query GetInstanceName {
    instance {
      id
      name
    }
  }
`);

function mockFetch() {
  return jest.spyOn(globalThis, 'fetch').mockImplementation(async () =>
    Promise.resolve(
      new Response(
        JSON.stringify({
          data: { instance: { __typename: 'InstanceType', id: 'x', name: 'X' } },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      )
    )
  );
}

function getRequest(fetchMock: ReturnType<typeof mockFetch>) {
  const [url, init] = fetchMock.mock.calls[0];
  const headers = init?.headers as Record<string, string>;
  const body = JSON.parse(init?.body as string) as {
    query: string;
    variables: Record<string, unknown>;
  };
  // HttpLink always calls fetch with the uri string
  return { url: url as string, headers, body };
}

describe('makePathsClient on the server', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('queries the Paths API directly with instance, locale and forwarded cookies', async () => {
    const fetchMock = mockFetch();
    const client = makePathsClient({
      instanceIdentifier: 'zuerich',
      locale: 'de',
      clientCookies: 'sessionid=abc',
      possibleTypes: pathsPossibleTypes.possibleTypes,
    });

    await client.query({ query: GET_INSTANCE_NAME });

    const { url, headers, body } = getRequest(fetchMock);
    expect(url).toBe(getPathsGraphQLUrl());
    expect(body.query).toContain('@locale(lang: $_locale)');
    expect(body.query).toContain('@instance(identifier: $_identifier)');
    expect(body.variables).toMatchObject({ _locale: 'de', _identifier: 'zuerich' });
    expect(headers).toMatchObject({
      'x-paths-instance-identifier': 'zuerich',
      'accept-language': 'de',
      cookie: 'sessionid=abc',
    });
    expect(headers).not.toHaveProperty('authorization');
  });
});
