'use client';

import React, { useEffect } from 'react';

import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';

import ErrorPage from '@/components/common/ErrorPage';

type Props = {
  error: Error & { digest?: string };
};

export default function Error({ error }: Props) {
  const t = useTranslations();
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <ErrorPage message={t('error-occurred')} details={error.message} testId="root-error-boundary" />
  );
}
