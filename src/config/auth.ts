/* istanbul ignore file */
import { createPerOriginKausalAuth } from '@common/auth/server';
import { createAuthServerHelpers } from '@common/auth/server-helpers';

import { WATCH_AUTH_PROVIDER_ID } from '@/constants/auth';

/**
 * Users sign in with the Watch backend as the OIDC provider. See
 * `kausal_common/src/auth/README.md` for how the session and tokens flow.
 *
 * Plans are served on many customer-controlled domains, so there is one auth
 * instance per request origin, each trusting only its own origin. The backend
 * only accepts redirect URIs on the hostname of a known `PlanDomain`.
 */
export const authForRequest = createPerOriginKausalAuth({
  providerId: WATCH_AUTH_PROVIDER_ID,
  // Behind Caddy the Next.js server only sees the internal origin.
  trustedProxyHeaders: true,
  // An expired token makes the backend reject the whole operation, so leave it
  // out: the request is served anonymously and the UI signs the user out.
  omitExpiredAccessToken: true,
  // next-auth had no rate limiting either; see the option for why.
  disableRateLimit: true,
});

export const {
  getSessionWithCookies,
  getClientAuthSession,
  getAccessToken,
  getFreshAccessToken,
  refreshAccessTokenIfNeeded,
  signOutFromHeaders,
} = createAuthServerHelpers(authForRequest);
