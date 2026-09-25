# Plan: migrate kausal-watch-ui from next-auth to better-auth

Status: implemented on branch `feat/better-auth` (2026-09-25). See `docs/authentication.md` for the result.

Differences from the plan, found while implementing:

- **Backend**: no changes needed. The prerequisites P2 and P3 already hold: the backend accepts access tokens, issues rotating refresh tokens, and already required PKCE, which next-auth was already using.
- **P1 (callback URLs)**: not needed. better-auth's callback path is `/api/auth/callback/<providerId>`, so keeping next-auth's provider id `watch-oidc-provider` keeps the callback URL unchanged. The UI can be deployed without backend changes or redirect-URI registration.
- **P4 (custom domains)**: not needed. There is one better-auth instance per request origin (`createPerOriginKausalAuth`), each trusting only its own origin, matching next-auth's `trustHost`. A catch-all `allowedHosts` pattern was rejected: better-auth also trusts every allowed host as an origin, which would allow open redirects and cross-origin requests.
- **Rate limiting**: better-auth's rate limiter is turned off for Watch. Behind ingress + Caddy it can't resolve the client IP, so all users would share one bucket of 3 sign-ins per 10 seconds.
- **Pledge errors**: the backend never returns `invalid_token` for pledge tokens; that error comes from the OAuth token. Pledge handling is unchanged when there is no OAuth session. With an OAuth session, the error now triggers OAuth recovery instead of clearing the pledge token.
- **`minneapolis-climate`**: signed-in users go through the GraphQL proxy; anonymous users still bypass it.
- **Not moved to `kausal_common`**: the Apollo error link (Watch's existing `createErrorLink` stays) and the refactor of Paths onto the shared module, which is left for a separate change.

## Goal and constraints

- Migrate from `next-auth@5.0.0-beta.30` to `better-auth`, **preserving every existing auth flow**. The only behavior changes are the deliberate improvements listed below.
- Mirror the kausal-paths-ui setup: `better-auth@^1.7.2` in stateless mode (JWE session cookie cache plus an encrypted account cookie, no database). The Kausal Django backend is the OIDC provider, configured via `genericOAuth` with PKCE.
- Move generic code into `kausal_common` (`kc:`) so Paths and Watch share one implementation.
- **Pledge authentication is out of scope** (see [Pledge authentication](#pledge-authentication-out-of-scope)).

Note: Paths never used next-auth. Its better-auth setup (`8d49f0a8`) was built from scratch, so Watch is the first real migration and there is no precedent for flow parity.

Deliberate improvements that come with the Paths pattern:

- The backend receives the OAuth **access_token** instead of the id_token, if the backend supports this (see P2).
- Access tokens are refreshed; today an expired id_token simply ends the session.
- PKCE.
- The client never holds the OAuth token. `/api/graphql` injects it on the server.
- Sentry and log context get the real Django user id and email. Today the user id is a random UUID and email is missing.

## Pledge authentication (out of scope)

Pledge auth is a separate, custom mechanism for public users who do not correspond to a Django user. They verify with a PIN, and the token is kept in `localStorage['pledge-auth-token']` and sent as `X-Public-User-Token`. It must keep working exactly as today, independent of the OAuth provider:

- No changes to `src/components/pledge/*` (`PledgeSignInFlow`, `SignInDrawer`, `use-pledge-auth.ts`, `use-public-user.ts`, …), the localStorage key, the header, or how `kc:src/graphql/proxy.ts` forwards `x-public-user-token`.
- The shared `kc:src/auth` module knows nothing about pledge.
- There are two touch points in `src/components/providers/ApolloWrapper.tsx`. Both keep their current semantics:
  1. **Header precedence** (`:46`). The pledge header is sent only when there is **no OAuth access token**. Today the check is `context.sessionToken` being falsy. After the migration it uses an equivalent `hasAccessToken` flag from the server-seeded session. Do not use `status !== 'authenticated'` here: a session whose token has lapsed would then stop sending the pledge token.
  2. **Error handling** (`:68-79`). Errors starting with `invalid_token` → `clearPledgeAuth()` only, never an OAuth sign-out (a sign-out would loop because the pledge token survives the redirect). Other `UNAUTHENTICATED` errors → OAuth invalid-token recovery.
- Where a component uses both pledge and OAuth, reach the OAuth functions through `authClient.signIn` / `authClient.signOut` rather than destructuring them. The pledge code already exports `signIn` and `signOut`.

## Phase 0: prerequisites outside the UI (blocking)

| #   | Item                                                                                                                                                                                                                                        | Why                                                                                                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | Register the new callback URL in Django's OIDC application **for every Watch hostname**. It changes from `/api/auth/callback/watch-oidc-provider` to `/api/auth/oauth2/callback/<providerId>`. Keep the old URLs until rollout is complete. | Otherwise sign-in breaks for every tenant.                                                                                                                                                          |
| P2  | Confirm the Watch backend accepts the OAuth **access_token** as a Bearer token. Today Watch sends the id_token.                                                                                                                             | Paths uses access_tokens. If Watch can't, fall back to exposing `idToken` from the account cookie via `customSession`; refresh then only helps if the IdP returns a new id_token on refresh.        |
| P3  | Confirm Django issues refresh tokens to the Watch client, and whether it rotates them.                                                                                                                                                      | Decides whether refresh works, and how exposed Watch is to the multi-pod rotation race documented in Paths.                                                                                         |
| P4  | Populate `AUTH_ALLOWED_HOSTS` with every Watch custom domain (from ingress/helm config). `WILDCARD_DOMAINS` covers `*.watch.kausal.tech` and similar.                                                                                       | better-auth rejects hosts that are not allowed, and Watch has many customer domains. **This is the biggest operational risk.** Find out whether `allowedHosts` can be resolved dynamically instead. |
| P5  | Ensure `AUTH_SECRET` is set explicitly in every deployment.                                                                                                                                                                                 | If it is not, `kc:docker/start-server.sh` generates a random secret per container, and stateless cookies then break across replicas.                                                                |

## Phase 1: shared auth module in `kausal_common` (`kc:src/auth/`)

Extract the module from Paths and parameterize it. Refactor Paths to use it with no behavior change before Watch depends on it.

| Shared file           | Contents                                                                                                                                                                                                                                                                                                                                                                                                                                     | Paths source                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `server.ts`           | `createKausalAuth({ providerId, scopes?, exposeIdToken? })`, which returns a `betterAuth()` instance: `basePath: '/api/auth'`, allowedHosts, JWE `cookieCache` (7 days, `refreshCache`), account cookie, `genericOAuth` with discovery from `getAuthIssuer()` and PKCE, `customSession` exposing `accessToken` (and a `hasAccessToken` flag), `nextCookies()`. Also `mapProfileToUser` so `user.id` and `email` are the real backend values. | `src/lib/auth.ts`                                                   |
| `allowed-hosts.ts`    | `getAllowedHosts()`: each wildcard domain; a `:*` port wildcard only in dev/ci; `AUTH_ALLOWED_HOSTS`; `['localhost']` fallback at build time.                                                                                                                                                                                                                                                                                                | `auth.ts:10-39` (b98d646c, 5e789aab, 69833286)                      |
| `server-helpers.ts`   | `createAuthServerHelpers(auth)`, which provides `getAuthSession`, `getAccessToken` (read-only, safe in RSC), `getFreshAccessToken` (refreshes; Route Handlers, Server Actions and the proxy only) and `getAccessTokenFromHeaders(headers)` for the proxy. Each returns early when there is no session cookie.                                                                                                                                | `src/lib/auth-server.ts` (faf9dac9)                                 |
| `proxy.ts`            | `refreshAccessTokenIfNeeded(auth, req, reqHeaders)`, `mergeRequestCookies`, `getRequestHost(req)` (`x-forwarded-host` → `host` → `nextUrl.host`) and `appendAuthCookies(response, lines)`.                                                                                                                                                                                                                                                   | `src/proxy.ts:198-256, 306, 441-448` (21b0fe81, 13f47691)           |
| `routes.ts`           | `createRecoverInvalidTokenHandler(auth)`, and **one** `safeReturnPath()`, replacing the near-duplicates `safeNextPath` and `getSafeReturnPath`.                                                                                                                                                                                                                                                                                              | `src/app/api/auth/recover-invalid-token/route.ts`, the sign-in page |
| `client.ts`           | `createKausalAuthClient<typeof auth>()` with `customSessionClient`.                                                                                                                                                                                                                                                                                                                                                                          | `src/lib/auth-client.ts`                                            |
| `invalid-token.ts`    | `createInvalidTokenRecovery(signOut)`: runs once (in-flight guard) and then reloads. **The error predicate is supplied by the app**, because Paths and Watch interpret `invalid_token` differently.                                                                                                                                                                                                                                          | `src/lib/invalid-token-recovery.ts` (6978f711)                      |
| `session-context.tsx` | **New.** `AuthSessionProvider`, seeded from the server session, and `useAuthSession()`, which returns `{ status, data }` (`loading \| authenticated \| unauthenticated`).                                                                                                                                                                                                                                                                    | New (see B1)                                                        |
| `kc:src/apollo/links` | `makeAuthErrorLink({ onInvalidToken, isInvalidToken })`.                                                                                                                                                                                                                                                                                                                                                                                     | `src/common/apollo-config.ts:257-270` (b7047a30)                    |

Other `kausal_common` changes:

- `constants/routes.mjs`: rename `NEXT_AUTH_SESSION_PATH = '/api/auth/session'` to `AUTH_SESSION_PATH = '/api/auth/get-session'` (used as a Sentry ignore path). The old value no longer matches anything in Paths.
- `package.json`: add `better-auth` to `peerDependencies`. This follows the existing convention, and Paths enforces it with `strictPeerDependencies`.
- Move the generic parts of Paths' `docs/authentication.md` (token flow by layer, refresh, rotation race, failure modes, cookie inventory) to `kc:docs/authentication.md`. Fix three stale statements along the way:
  - The graphql route uses `getFreshAccessToken`.
  - The body is `useAccountCookie: true`.
  - `:*` is added only in dev/ci.
- Submodule pins differ: Paths is at `88d9ae8`, which is an ancestor of Watch's `d47067d`, and both are behind `origin/main`. Land the module on `main`, then bump both apps.

Stays app-specific:

- Paths: auth gate conditions (`/model`, `isProtected`), registration and instance creation, Django-session tweak state, the sign-in page UI.
- Watch: everything in Phase 2.

## Phase 2: Watch migration, flow by flow

### A. Configuration and route handlers

| Today (next-auth)                                                                                          | After                                                            | Notes                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/config/auth.ts` `NextAuth({...})`                                                                     | `src/lib/auth.ts` = `createKausalAuth({ providerId: 'kausal' })` | The redirect URIs change anyway (P1), so use the shared id.                                                                                                                                      |
| `src/app/api/auth/[...nextauth]/route.ts`                                                                  | `src/app/api/auth/[...all]/route.ts` = `toNextJsHandler(auth)`   |                                                                                                                                                                                                  |
| `src/app/api/auth/route.ts` (HTTP Basic 401 for `BASIC_AUTH_FOR_HOSTNAMES`)                                | **Keep as-is.**                                                  | The catch-all needs at least one path segment, so the two don't conflict. Add a comment explaining why the file exists.                                                                          |
| `fixNextUrl` rebuilds each tenant's origin from `Host`/`X-Forwarded-Proto` (local dev: `X-Forwarded-Host`) | Drop it; `allowedHosts` resolves the origin per host.            | **Verify on staging** behind Caddy/ingress and locally behind the dev proxy (`019e6e882`, `ecce1279`). If callback URLs resolve to the internal origin, wrap the handler with a request rewrite. |
| `logger` → pino + Sentry                                                                                   | better-auth `logger` option, same targets                        |                                                                                                                                                                                                  |
| `trustHost: true`, `AUTH_TRUST_HOST`                                                                       | Remove                                                           | Also remove `AUTH_TRUST_HOST` from `.github/workflows/e2e-image.yaml` (in both repos).                                                                                                           |

### B. Session and token flows

**B1. Server-seeded session (no loading flash)**

- Today: `[lang]/layout.tsx` awaits `auth()`, and `<SessionProvider session>` hydrates immediately, so TopToolBar and the other logged-in UI render without a flash.
- better-auth's `useSession()` fetches `/get-session` after mount. That would add a flash and an extra request on every page load.
- After: the layout calls `getAuthSession()` → `<AuthSessionProvider session>` (kc).
- `Header`, `ActionHero`, `SiteFooter`, `TopToolBar` and `UnpublishedPlan` switch to `useAuthSession()`, with the same `status` values.
- The window-focus refetch is dropped; nothing depends on it.

**B2. Proxy: `PlansByHostname` with Bearer token**

- Today: `auth(...)` wraps the proxy, and `middleware.utils.ts:392` sends `req.auth.idToken` unless `skipAuth`.
- After:
  - Remove the wrapper.
  - `refreshAccessTokenIfNeeded` → `getAccessTokenFromHeaders(mergedReqHeaders)` (decrypts the cookie cache, no network) → `getPlansForHostname(..., accessToken)`.
  - Append rotated Set-Cookies to **every** response type: rewrite, 404 and redirect.
  - `applySecurityHeaders` keeps wrapping the final response (`148c86fd`).
- The middleware cache condition changes from `!req.auth || skipAuth` to `!accessToken || skipAuth`. This is a minor change: a session with no token now uses the anonymous per-hostname cache, which is more correct.
- The Sentry user and log bindings come from the session user (real id and email via `mapProfileToUser`).

**B3. RSC Apollo (`src/utils/apollo-rsc-client.ts`)**

- `await auth()` becomes `getAccessToken()`, which is read-only and never refreshes.
- It is still skipped when `uri` is overridden (Paths API).

**B4. Client Apollo (`src/components/providers/ApolloWrapper.tsx`)**

- Today the client reads `idToken` from `useSession()`, and `makeClient` fixes it on first render. `UpdateApolloContext` no longer refreshes it (the component is unused), so the token can go stale.
- After: `src/app/api/graphql/route.ts` calls `getFreshAccessToken()` and passes it to `proxyGraphQLRequest(req, 'watch', { accessToken })`. The browser never holds the OAuth token, which removes the stale-token problem.
- `noProxy` for `minneapolis-climate` calls the backend directly with a Bearer token. Either route it through `/api/graphql`, or expose `accessToken` to the client only for that case (open question 2).
- The pledge header precedence and error handling are unchanged (see [Pledge authentication](#pledge-authentication-out-of-scope)). The only change is that the non-pledge `UNAUTHENTICATED` branch uses the shared once-only `recoverFromInvalidToken()` instead of a bare `signOut({ redirect: true })`.
- HTTP Basic hosts behave as today: the injected `accessToken` overrides the browser's `Authorization: Basic` only when the user is logged in via OAuth.

### C. Expiry handling: the five layers from `182d5bc22`, mapped

| #   | Today                                                                                                   | After                                                                                                                                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The `jwt` callback strips `idToken` after `exp`.                                                        | Replaced by refresh in the proxy and `/api/graphql`. If refresh fails, `getFreshAccessToken` and `refreshAccessTokenIfNeeded` return null and the request is anonymous. The outcome is the same, but refresh is tried first. |
| 2   | `TopToolBar` signs out if the user is authenticated without an `idToken`, or if `hasSessionExpired`.    | Same effect: sign out if `authenticated && !hasAccessToken`, or if `session.session.expiresAt <= now`. Remove `src/utils/session.utils.ts` or port it to `expiresAt`.                                                        |
| 3   | On `UNAUTHENTICATED`, the proxy retries anonymously and deletes the `authjs.*` cookies.                 | Same retry. Clear the session with `auth.api.signOut({ headers, returnHeaders: true })` and append its Set-Cookies rather than hard-coding cookie names (lesson from 6978f711).                                              |
| 4   | Client error link → `signOut({ redirect: true })`, except pledge `invalid_token` → `clearPledgeAuth()`. | See B4. Pledge handling is unchanged, and OAuth recovery runs once and then reloads.                                                                                                                                         |
| 5   | The RSC error link only logs a warning.                                                                 | **Keep for now.** Layer 3 clears the session before the RSC render. Adopting Paths' `/api/auth/recover-invalid-token` redirect is an optional follow-up.                                                                     |

### D. Sign-in

- Triggers: `SiteFooter` (only when `plan.features.allowPublicSiteLogin`) and `UnpublishedPlan` (only when `loginEnabled`).
- Both change from `signIn('watch-oidc-provider')` to `authClient.signIn.social({ provider: 'kausal', callbackURL: safeReturnPath(location.pathname + location.search) })`.
- This preserves "return to the current user-facing page", not the rewritten `/root/...` URL.
- Watch has no gated routes, so it needs neither the Paths sign-in page nor the proxy auth gate.
- The profile keeps `name`, which TopToolBar shows.

### E. Sign-out

- `useHandleSignOut` (`src/utils/auth.utils.ts`) becomes `await authClient.signOut()` followed by `window.location.reload()`. This matches next-auth's `redirect: true`, which reloads the current page anonymously.
- The TopToolBar menu, the SiteFooter toggle and expiry detection all keep going through it.
- The RP-initiated logout TODO is kept; neither app ends the Django session today.

### F. Unpublished plan

- Unchanged logic:
  - The backend returns `RestrictedPlanNode` or `Plan` depending on the Bearer token (now the access_token, via B2).
  - The proxy rewrites to `/unpublished`.
  - The sign-in button is shown when `loginEnabled`.
  - `router.push('/')` runs once the user is authenticated.
- Known existing edge case, not fixed here: an authenticated but unauthorized user is bounced silently.

### G. Cutover, Storybook, tests, cleanup

- The session cookies change from `authjs.*` to `better-auth.*`, so all users are logged out once. For one release, the proxy deletes leftover `authjs.session-token` and `__Secure-authjs.session-token` cookies.
- Storybook: `<SessionProvider session={null}>` → `<AuthSessionProvider session={null}>`. Still no network fetch.
- Tests:
  - Update the mock in `src/utils/__tests__/apollo-rsc-client.test.ts:48`.
  - Add `kausal_common` unit tests for `getAllowedHosts`, `mergeRequestCookies`, `safeReturnPath` and the error predicates. Paths has no auth tests today.
- CI e2e: add `DEPLOYMENT_TYPE: ci` and `WILDCARD_DOMAINS`, which the dev/ci port wildcard needs.
- Remove:
  - the `next-auth` dependency
  - `src/types/next-auth.d.ts`
  - `src/components/providers/AuthProvider.tsx`
  - the unused `src/app/root/[domain]/[lang]/[plan]/UpdateApolloContext.tsx`
  - `unstable_update`
  - the stale `NEXTAUTH_*` / `src/auth/` lines in `CLAUDE.md` / `AGENTS.md:146`
- Add `docs/authentication.md` with only the Watch-specific parts (pledge coexistence, unpublished flow, HTTP Basic) and link to the shared kc doc.

## Phase 3: verification and rollout

Test on staging with three host types: a `*.watch.kausal.tech` tenant, a custom customer domain, and a `BASIC_AUTH_FOR_HOSTNAMES` host.

| Flow                                            | Expected                                                                                      |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Sign in from the footer                         | Returns to the same page; TopToolBar shows the user's name; no loading flash.                 |
| Sign in from the unpublished page               | An authorized user reaches the full site; an unauthorized user stays on the unpublished page. |
| Workflow/version selector                       | `selected-workflow` draft content works in RSC and client queries.                            |
| Access token expires mid-session                | Refreshed silently (`rotated auth cookies` log); the user stays logged in.                    |
| Refresh token revoked                           | The next page loads logged out; no loop.                                                      |
| Backend returns `UNAUTHENTICATED`               | Proxy retries anonymously and clears cookies; client does exactly one sign-out and reload.    |
| Pledge PIN sign-in, then OAuth login and logout | The pledge session survives both.                                                             |
| Pledge token expired (logged in or out)         | Only the pledge token is cleared; no OAuth sign-out; no loop.                                 |
| Sign-out                                        | The page reloads logged out; all three `better-auth.*` cookies are cleared.                   |
| HTTP Basic host                                 | 401 challenge; GraphQL works after entering credentials.                                      |
| Multiple pods                                   | Log in on pod A, continue on pod B (P5).                                                      |
| `minneapolis-climate`                           | The chosen `noProxy` approach works.                                                          |
| Local dev (`sunnydale.localhost`)               | Callback URLs are correct behind the dev proxy.                                               |

Rollout:

1. Register the new callback URIs (P1).
2. Release the `kausal_common` module and the Paths refactor.
3. Watch on staging.
4. Watch in production. Warn Customer Success about the one-time logout.
5. After one release, remove the old callback URIs and the `authjs` cookie cleanup.

## Open questions

1. Does the Watch backend accept access tokens, and does it issue and rotate refresh tokens? (P2, P3)
2. `minneapolis-climate` `noProxy`: can it go through `/api/graphql`, or does the client keep a token?
3. How is `AUTH_ALLOWED_HOSTS` populated for all custom domains? Is dynamic validation possible? (P4)
4. Is anything still painful in the Paths implementation that isn't visible in the git history? (Ask Juha.)

## Rough estimate

Assuming Phase 0 is resolved:

- Phase 1: about 2–3 days, including the Paths refactor.
- Phase 2: about 3–4 days.
- Phase 3: about 2 days of staging verification.
