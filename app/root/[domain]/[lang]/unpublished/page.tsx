'use client';
//import type { Metadata } from 'next';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  searchParams: { message: string };
};

// export const metadata: Metadata = {
//   title: 'Kausal Watch',
//   robots: 'noindex',
// };

export default function UnpublishedPage({ searchParams }: Props) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/');
    }
  }, [session]);
  return (
    <div className="mb-5 rounded px-3 px-sm-4 py-3 py-sm-5 mb-5">
      <div className="container">
        <p className="text-muted">{searchParams.message}</p>
        <p>
          <a href="#" onClick={() => signIn('watch-oidc-provider')}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
