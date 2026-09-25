import { useCallback } from 'react';

import { signOutAndReload } from '@/config/auth-client';

export function useHandleSignOut() {
  return useCallback(() => {
    // TODO: Make this use RP-initiated logout when KW backend supports it.
    // See reference implementation in nzc-data-studio
    void signOutAndReload();
  }, []);
}
