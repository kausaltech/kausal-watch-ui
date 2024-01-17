'use client';

import { useEffect } from 'react';
import { captureException } from '@sentry/nextjs';

import { ErrorPage } from '@/components/common/ErrorPage';

type Props = {
  error: Error & { digest?: string };
};

export default function Error({ error }: Props) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return <ErrorPage message={error.message} />;
}
