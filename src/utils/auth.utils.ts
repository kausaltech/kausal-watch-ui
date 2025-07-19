import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { signOut } from 'next-auth/react';

import { authIssuer } from '@/common/environment';

export function useHandleSignOut() {
  const router = useRouter();

  return useCallback(() => {
    signOut({ redirect: true });
    return;
    // TODO: Make this use RP-initiated logout when KW backend supports it.
    // See reference implementation in nzc-data-studio
    router.push(`${authIssuer}/logout?next=${encodeURI(window.location.href)}`);
  }, [router]);
}
