import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { authIssuer } from '@/common/environment';

export function useHandleSignOut() {
  const router = useRouter();

  return () => {
    signOut({ redirect: false });

    /**
     * Redirect to the Admin UI logout page so that the session can be cleared.
     * The user will be redirected back to the `next` query parameter.
     */
    router.push(`${authIssuer}/logout?next=${encodeURI(window.location.href)}`);
  };
}
