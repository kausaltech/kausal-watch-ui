'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

type Props = {
  message: string;
  loginEnabled: boolean;
  testId?: string;
};

export default function UnpublishedPlan({ message, loginEnabled, testId }: Props) {
  const session = useSession();
  const router = useRouter();
  const t = useTranslations();
  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/');
    }
  }, [session]);

  return (
    <div className="mb-5 rounded px-3 px-sm-4 py-3 py-sm-5 mb-5" data-testid={testId}>
      <div className="container">
        <p className="text-muted">{message}</p>
        <p>
          {loginEnabled && (
            <a href="#" onClick={() => signIn('watch-oidc-provider')}>
              {t('ui-sign-in')}
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
