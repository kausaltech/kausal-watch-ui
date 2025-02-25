import {
  parseSetCookie,
  RequestCookie,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export type BackendCookieOptions = {
  prefix: string;
};

export function getClientCookies(
  req: NextRequest,
  opts: BackendCookieOptions
): RequestCookie[] {
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

export function getClientCookieAsHeader(
  req: NextRequest,
  opts: BackendCookieOptions
): string | null {
  const cookies = getClientCookies(req, opts);
  if (!cookies.length) return null;
  return cookies
    .map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)}`)
    .join('; ');
}

export function forwardSetCookie(
  clientReq: NextRequest,
  backendResponse: Response,
  opts: BackendCookieOptions
) {
  const setCookieHeaders = backendResponse.headers.getSetCookie();
  if (!setCookieHeaders.length) return;

  // Pass cookies to the client, modify some of the attributes along the way
  setCookieHeaders.forEach((header) => {
    const cookie = parseSetCookie(header);
    if (!cookie) return;

    cookie.sameSite = 'strict';
    cookie.secure = process.env.NODE_ENV === 'production';
    cookie.name = `${opts.prefix}${cookie.name}`;
    cookies().set(cookie);
  });
}
