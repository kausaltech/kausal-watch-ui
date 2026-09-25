/**
 * The provider id of the Watch backend. It determines the OAuth callback path,
 * `/api/auth/callback/watch-oidc-provider`, which the backend accepts on every
 * plan hostname. It was kept from next-auth so that the callback is unchanged.
 */
export const WATCH_AUTH_PROVIDER_ID = 'watch-oidc-provider';
