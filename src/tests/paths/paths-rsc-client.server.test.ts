/**
 * React's `cache`, which scopes the client to a request, only memoises in its
 * `react-server` build -- the one Next.js loads for a server component.
 *
 * @jest-environment node
 * @jest-environment-options {"customExportConditions": ["react-server", "node"]}
 */
import { getPathsGraphQLUrl } from '@common/env';

import { getPathsInstance } from '@/queries/paths/get-paths-instance';

jest.mock('next/headers', () => ({
  headers: () => Promise.resolve(new Headers({ 'x-next-intl-locale': 'de-CH' })),
  cookies: () =>
    Promise.resolve({
      getAll: () => [
        { name: 'paths_api_sessionid', value: 'paths-session' },
        { name: 'authjs.session-token', value: 'watch-session' },
      ],
    }),
}));

describe('getPathsInstance', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('queries the Paths API with the visitor’s Paths session cookies only', async () => {
    const fetchMock = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () =>
        Promise.resolve(
          new Response(
            JSON.stringify({ data: { instance: { __typename: 'InstanceType', id: 'zuerich' } } }),
            { status: 200, headers: { 'content-type': 'application/json' } }
          )
        )
      );

    const result = await getPathsInstance('zuerich');

    expect(result.data?.instance.id).toBe('zuerich');
    const [url, init] = fetchMock.mock.calls[0];
    const headers = init?.headers as Record<string, string>;
    const body = JSON.parse(init?.body as string) as { variables: Record<string, unknown> };
    expect(url).toBe(getPathsGraphQLUrl());
    expect(body.variables).toMatchObject({ _identifier: 'zuerich', _locale: 'de-CH' });
    expect(headers).toMatchObject({
      cookie: 'sessionid=paths-session',
      'accept-language': 'de-CH',
    });
    expect(headers).not.toHaveProperty('authorization');
  });
});
