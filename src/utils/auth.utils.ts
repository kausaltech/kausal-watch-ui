import { useCallback } from 'react';

import { signOut, useSession } from 'next-auth/react';

import { authIssuer } from '@/common/environment';
import { hasSessionExpired } from '@/utils/session.utils';

// The backend's OIDC `end_session_endpoint`.
const LOGOUT_PATH = '/o/logout/';

/**
 * Sign out of this site and end the backend session too. Leaving the backend session alive would
 * sign the next sign-in straight back in to the same account, whichever email was entered.
 */
export function useHandleSignOut() {
  const { data: session } = useSession();
  const idToken = session && !hasSessionExpired(session) ? session.idToken : undefined;

  return useCallback(() => {
    if (!idToken) {
      // Without a current ID token the backend cannot tell which session to end without asking,
      // so only this site's session is cleared.
      void signOut({ redirect: true });
      return;
    }

    const logoutUrl = new URL(`${authIssuer.replace(/\/$/, '')}${LOGOUT_PATH}`);

    logoutUrl.searchParams.set('id_token_hint', idToken);
    logoutUrl.searchParams.set('post_logout_redirect_uri', `${window.location.origin}/`);

    void signOut({ redirect: false }).then(() => window.location.assign(logoutUrl));
  }, [idToken]);
}
