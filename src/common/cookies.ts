import { type RequestCookie, parseSetCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export type BackendCookieOptions = {
  prefix: string;
};

/** Prefix of the Paths API cookies that the Paths proxy route stores for the browser. */
export const PATHS_COOKIE_PREFIX = 'paths_api_';

export function getClientCookies(req: NextRequest, opts: BackendCookieOptions): RequestCookie[] {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return [];
  const prefixedCookies = req.cookies
    .getAll()
    .filter((cookie) => cookie.name.startsWith(opts.prefix));
  return prefixedCookies.map((cookie) => {
    return {
      name: cookie.name.slice(opts.prefix.length),
      value: cookie.value,
    };
  });
}

/**
 * The backend cookies of the request being rendered, as a Cookie header for a
 * server-side request to that backend. For server components; route handlers
 * use `getClientCookieAsHeader`.
 */
export async function getBackendCookieHeader(opts: BackendCookieOptions): Promise<string | null> {
  const cookieStore = await cookies();
  const prefixedCookies = cookieStore
    .getAll()
    .filter((cookie) => cookie.name.startsWith(opts.prefix));
  if (!prefixedCookies.length) return null;
  return prefixedCookies
    .map((cookie) => `${cookie.name.slice(opts.prefix.length)}=${encodeURIComponent(cookie.value)}`)
    .join('; ');
}

export function getClientCookieAsHeader(
  req: NextRequest,
  opts: BackendCookieOptions
): string | null {
  const cookies = getClientCookies(req, opts);
  if (!cookies.length) return null;
  return cookies.map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');
}

export async function forwardSetCookie(
  clientReq: NextRequest,
  backendResponse: Response,
  opts: BackendCookieOptions
) {
  const setCookieHeaders = backendResponse.headers.getSetCookie();
  if (!setCookieHeaders.length) return;

  const clientCookies = await cookies();

  // Pass cookies to the client, modify some of the attributes along the way
  setCookieHeaders.forEach((header) => {
    const cookie = parseSetCookie(header);
    if (!cookie) return;

    cookie.sameSite = 'strict';
    cookie.secure = process.env.NODE_ENV === 'production';
    cookie.name = `${opts.prefix}${cookie.name}`;
    clientCookies.set(cookie);
  });
}
