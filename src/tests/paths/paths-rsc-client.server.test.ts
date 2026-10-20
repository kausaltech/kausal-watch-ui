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

type GraphQLBody = { operationName: string; query: string; variables: Record<string, unknown> };

/** Answers the languages query with `supportedLanguages`, and any other query with an instance. */
function mockFetch(supportedLanguages: string[]) {
  return jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
    const { operationName } = JSON.parse(init?.body as string) as GraphQLBody;
    const instance =
      operationName === 'GetInstanceLanguages'
        ? { __typename: 'InstanceType', id: 'zuerich', supportedLanguages, defaultLanguage: 'fi' }
        : { __typename: 'InstanceType', id: 'zuerich' };
    return Promise.resolve(
      new Response(JSON.stringify({ data: { instance } }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    );
  });
}

function getRequest(fetchMock: ReturnType<typeof mockFetch>, operationName: string) {
  const call = fetchMock.mock.calls.find(
    ([, init]) => (JSON.parse(init?.body as string) as GraphQLBody).operationName === operationName
  );
  if (!call) throw new Error(`No ${operationName} request`);
  const [url, init] = call;
  return {
    url: url as string,
    headers: init?.headers as Record<string, string>,
    body: JSON.parse(init?.body as string) as GraphQLBody,
  };
}

describe('getPathsInstance', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('queries the Paths API with the visitor’s Paths session cookies only', async () => {
    const fetchMock = mockFetch(['de-CH', 'en']);

    const result = await getPathsInstance('zuerich');

    expect(result.data?.instance.id).toBe('zuerich');
    const { url, headers, body } = getRequest(fetchMock, 'GetInstanceContext');
    expect(url).toBe(getPathsGraphQLUrl());
    expect(body.variables).toMatchObject({ _identifier: 'zuerich', _locale: 'de-CH' });
    expect(headers).toMatchObject({
      cookie: 'sessionid=paths-session',
      'accept-language': 'de-CH',
    });
    expect(headers).not.toHaveProperty('authorization');
  });

  it('falls back to English when the instance does not support the page’s language', async () => {
    const fetchMock = mockFetch(['fi', 'en']);

    // Another instance, as languages are kept across requests
    await getPathsInstance('zuerich-fi');

    // Paths rejects an unsupported language, so its languages are asked without one
    const languages = getRequest(fetchMock, 'GetInstanceLanguages');
    expect(languages.body.query).not.toContain('@locale');
    const context = getRequest(fetchMock, 'GetInstanceContext');
    expect(context.body.variables).toMatchObject({ _locale: 'en' });
  });

  it('asks an instance for its languages once for many requests', async () => {
    const fetchMock = mockFetch(['de-CH', 'en']);

    await getPathsInstance('zuerich-reused');
    await getPathsInstance('zuerich-reused');

    const languageRequests = fetchMock.mock.calls.filter(
      ([, init]) =>
        (JSON.parse(init?.body as string) as GraphQLBody).operationName === 'GetInstanceLanguages'
    );
    expect(languageRequests).toHaveLength(1);
  });
});
