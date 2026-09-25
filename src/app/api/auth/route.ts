/**
 * HTTP Basic Auth challenge for hostnames in `BASIC_AUTH_FOR_HOSTNAMES`; the
 * proxy rewrites unauthenticated requests here. Unrelated to user sign-in,
 * which better-auth handles under `/api/auth/*` (`[...all]/route.ts`).
 */
export function GET(request: Request) {
  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${request.headers.get('host')}"`,
    },
  });
}
