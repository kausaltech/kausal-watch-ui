import { type KausalAuthClient, createKausalAuthClient } from '@common/auth/client';
import { createInvalidTokenRecovery } from '@common/auth/invalid-token';
import { safeReturnPath } from '@common/auth/return-path';

import { WATCH_AUTH_PROVIDER_ID } from '@/constants/auth';

let authClient: KausalAuthClient | undefined;

/** Created on first use, so that importing this module has no side effects. */
export function getAuthClient() {
  authClient ??= createKausalAuthClient();
  return authClient;
}

/** Sign in with the Watch backend and return to the current page. */
export function signInWithKausal() {
  const returnTo = safeReturnPath(window.location.pathname + window.location.search);
  return getAuthClient().signIn.social({ provider: WATCH_AUTH_PROVIDER_ID, callbackURL: returnTo });
}

/** Sign out and reload the current page as an anonymous user. */
export async function signOutAndReload() {
  await getAuthClient().signOut();
  window.location.reload();
}

export const recoverFromInvalidToken = createInvalidTokenRecovery(() =>
  Promise.resolve(() => getAuthClient().signOut())
);
