/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import type { Session } from 'next-auth';

import { POST } from '../route';

const mockAuth = jest.fn<Promise<Session | null>, []>();
const mockGetSitemapUrlsForPlan = jest.fn<
  Promise<string[]>,
  [string, string, { authToken?: string }]
>();

jest.mock('@/config/auth', () => ({
  auth: () => mockAuth(),
}));

jest.mock('@/utils/sitemap.server', () => ({
  getSitemapUrlsForPlan: (origin: string, planId: string, options: { authToken?: string }) =>
    mockGetSitemapUrlsForPlan(origin, planId, options),
  getSitemapUrlsForOrigin: () => Promise.resolve([]),
}));

const HOST = 'plan.example.com';
const ORIGIN = `https://${HOST}`;
const ACTION_PATH = '/actions/1';
const ID_TOKEN = 'visitor-id-token';
const SESSION_COOKIE = '__Secure-authjs.session-token';

const mockFetch = jest.fn<Promise<Response>, [string, RequestInit]>();

function makeRequest(cookie?: string) {
  return new NextRequest(`${ORIGIN}/api/export-pdf`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      host: HOST,
      'x-forwarded-proto': 'https',
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify({ path: ACTION_PATH, locale: 'en', plan: 'plan' }),
  });
}

function getGotenbergForm() {
  expect(mockFetch).toHaveBeenCalledTimes(1);
  return mockFetch.mock.calls[0][1].body as FormData;
}

/**
 * Split the Cookie header the way Gotenberg does: its value is a list of
 * `;`-separated tokens, of which one starting with `scope` holds a regular
 * expression of the urls to send the header to, and the rest are joined back
 * together with `; `.
 */
function getSessionHeader() {
  const headers = JSON.parse(getGotenbergForm().get('extraHttpHeaders') as string) as Record<
    string,
    string
  >;
  const tokens = headers.Cookie.split(';');
  const scopeTokens = tokens.filter((token) => token.trim().toLowerCase().startsWith('scope'));
  expect(scopeTokens).toHaveLength(1);
  const scope = scopeTokens[0].replace(/\s/g, '').split('=').slice(1).join('=');
  return {
    cookie: tokens.filter((token) => !scopeTokens.includes(token) && token).join('; '),
    scope: new RegExp(scope),
  };
}

beforeAll(() => {
  process.env.GOTENBERG_URL = 'http://gotenberg';
  global.fetch = mockFetch;
});

beforeEach(() => {
  mockAuth.mockReset();
  mockGetSitemapUrlsForPlan.mockReset();
  mockFetch.mockReset();
  mockFetch.mockResolvedValue(new Response(new Uint8Array([37, 80, 68, 70]), { status: 200 }));
});

/**
 * An internal plan's pages are only readable by a signed-in visitor who has
 * access to the plan: the backend answers anyone else as if it had no pages.
 */
function mockInternalPlan() {
  mockGetSitemapUrlsForPlan.mockImplementation((_origin, _planId, options) =>
    Promise.resolve(options.authToken === ID_TOKEN ? [`${ORIGIN}${ACTION_PATH}`] : [])
  );
}

describe('PDF export of an internal plan', () => {
  beforeEach(mockInternalPlan);

  it('is refused to an anonymous visitor', async () => {
    mockAuth.mockResolvedValue(null);

    const response = await POST(makeRequest());

    expect(response.status).toBe(403);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('is rendered for a signed-in visitor with access to the plan', async () => {
    mockAuth.mockResolvedValue({ idToken: ID_TOKEN, expires: '' } as Session);

    const response = await POST(makeRequest(`${SESSION_COOKIE}=session-value; other=ignored`));

    expect(response.status).toBe(200);
  });

  it("renders the page with the visitor's session", async () => {
    mockAuth.mockResolvedValue({ idToken: ID_TOKEN, expires: '' } as Session);

    await POST(
      makeRequest(`${SESSION_COOKIE}.0=chunk-0; other=ignored; ${SESSION_COOKIE}.1=chunk-1`)
    );

    // Gotenberg's Chromium fetches the page itself, so without the session it
    // would be served the sign-in page instead of the plan.
    const { cookie, scope } = getSessionHeader();
    expect(cookie).toBe(`${SESSION_COOKIE}.0=chunk-0; ${SESSION_COOKIE}.1=chunk-1`);
    expect(scope.test(`${ORIGIN}${ACTION_PATH}?print=true`)).toBe(true);
    expect(scope.test(`${ORIGIN}/_next/static/chunk.js`)).toBe(true);
  });

  it('sends the session to no other host', async () => {
    mockAuth.mockResolvedValue({ idToken: ID_TOKEN, expires: '' } as Session);

    await POST(makeRequest(`${SESSION_COOKIE}=session-value`));

    const { scope } = getSessionHeader();
    expect(scope.test('https://fonts.example.org/font.woff2')).toBe(false);
    expect(scope.test(`https://${HOST}.attacker.test/`)).toBe(false);
    expect(scope.test(`https://attacker.test/?next=${ORIGIN}/`)).toBe(false);
    expect(scope.test(`http://${HOST}/`)).toBe(false);
  });

  it('sends the session to none of the API routes of the host', async () => {
    mockAuth.mockResolvedValue({ idToken: ID_TOKEN, expires: '' } as Session);

    await POST(makeRequest(`${SESSION_COOKIE}=session-value`));

    // The rendering browser has web security disabled, so a cross-origin
    // iframe on the page could read what these return. The session endpoint
    // would give it the visitor's ID token.
    const { scope } = getSessionHeader();
    expect(scope.test(`${ORIGIN}/api/auth/session`)).toBe(false);
    expect(scope.test(`${ORIGIN}/api/export-pdf`)).toBe(false);
    expect(scope.test(`${ORIGIN}/api-docs`)).toBe(true);
  });

  it('keeps the session out of the browser cookie jar', async () => {
    mockAuth.mockResolvedValue({ idToken: ID_TOKEN, expires: '' } as Session);

    await POST(makeRequest(`${SESSION_COOKIE}=session-value`));

    // Gotenberg runs concurrent conversions as tabs of one browser, sharing a
    // cookie jar, so a cookie set there would reach other visitors' exports.
    expect(getGotenbergForm().has('cookies')).toBe(false);
  });
});

describe('PDF export of a public plan', () => {
  beforeEach(() => {
    mockGetSitemapUrlsForPlan.mockResolvedValue([`${ORIGIN}${ACTION_PATH}`]);
  });

  it('sends no cookies for an anonymous visitor', async () => {
    mockAuth.mockResolvedValue(null);

    const response = await POST(makeRequest('other=ignored'));

    expect(response.status).toBe(200);
    expect(getGotenbergForm().has('cookies')).toBe(false);
    expect(getGotenbergForm().has('extraHttpHeaders')).toBe(false);
  });
});
