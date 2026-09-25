# Authentication in Watch UI

Users (plan admins and contact persons) sign in with better-auth, with the
Watch backend as the OIDC provider. The shared setup, the token flow and the
failure modes are documented in
[`kausal_common/src/auth/README.md`](../kausal_common/src/auth/README.md).
This file covers what is specific to Watch.

## Files

| File                                      | Role                                                   |
| ----------------------------------------- | ------------------------------------------------------ |
| `src/config/auth.ts`                      | better-auth instance and server helpers                |
| `src/config/auth-client.ts`               | browser client, `signInWithKausal`, `signOutAndReload` |
| `src/app/api/auth/[...all]/route.ts`      | better-auth route handler                              |
| `src/app/api/auth/route.ts`               | **not user auth**: HTTP Basic challenge, see below     |
| `src/app/api/graphql/route.ts`            | injects the (refreshed) access token                   |
| `src/proxy.ts`                            | token refresh, session, plans query with the token     |
| `src/app/root/[domain]/[lang]/layout.tsx` | seeds `AuthSessionProvider` with the server session    |

## Configuration

`src/config/auth.ts` sets:

- One auth instance per request origin (`createPerOriginKausalAuth`): plans
  are served on many customer domains, so there's no host allowlist. Each
  origin only trusts itself for callback URLs and the CSRF check, as with
  next-auth's `trustHost: true`. The backend only accepts redirect URIs on the
  hostname of a known `PlanDomain`
  (`kausal_watch_extensions/auth_support/redirect_uri.py`).
- `trustedProxyHeaders`: behind Caddy, Next.js only sees the internal origin.
- `omitExpiredAccessToken`: an expired token is left out of the session, so
  pages render anonymously and `TopToolBar` signs the user out.
- `disableRateLimit`: next-auth had no rate limiting, and better-auth's can't
  tell users apart behind ingress + Caddy.

The OAuth callback is `https://<plan hostname>/api/auth/callback/watch-oidc-provider`,
the same as with next-auth (provider id in `src/constants/auth.ts`).
The session cookies are host-only, so each plan hostname has its own session.

## Flows

- **Sign in**: the footer (when `plan.features.allowPublicSiteLogin`) and the
  unpublished-plan page (when `loginEnabled`) call `signInWithKausal()`, which
  returns to the current page.
- **Sign out**: `useHandleSignOut()` signs out and reloads the current page.
  The Django session is not ended (RP-initiated logout is a TODO).
- **Unpublished plans**: the proxy queries `plansForHostname` with the access
  token. For users without access, the backend returns a `RestrictedPlanNode`
  and the proxy rewrites to the unpublished page.
- **Draft content**: `TopToolBar` (shown only when signed in) selects the
  workflow state, stored in the `selected-workflow` cookie.
- **Plans cache**: the proxy caches `plansForHostname` per hostname only for
  requests without an access token.

## Expiry and rejected tokens

1. The proxy and `/api/graphql` refresh an expired access token. If that
   fails, the token is left out of the session and requests are anonymous.
2. `TopToolBar` signs out when the session has no access token or has expired.
3. If the backend rejects the token in the proxy's plans query, the proxy
   retries anonymously, expires the auth cookies and removes them from the
   request, so the page renders anonymously.
4. Client queries: see pledge auth below.
5. RSC queries only log a warning; step 3 has already cleared the session.

## Pledge authentication

Public pledge users authenticate separately with a PIN
(`src/components/pledge/*`). Their token is kept in
`localStorage['pledge-auth-token']` and sent as `X-Public-User-Token`. It is
independent of better-auth:

- The pledge header is only sent when the user has no OAuth access token.
- An `UNAUTHENTICATED` / `invalid_token` error without an OAuth session only
  clears the pledge token (a sign-out would loop, since the pledge token
  survives the reload). With an OAuth session, the error concerns the OAuth
  token and triggers the OAuth recovery.

## HTTP Basic Auth

Hostnames listed in `BASIC_AUTH_FOR_HOSTNAMES` are protected with HTTP Basic
Auth by the proxy, which rewrites unauthenticated requests to `/api/auth`
(`src/app/api/auth/route.ts`) for the 401 challenge. This is unrelated to user
sign-in; the better-auth catch-all only matches `/api/auth/<something>`.
