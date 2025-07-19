'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { ErrorPage } from '@/components/common/ErrorPage';

export default function NotFound() {
  const t = useTranslations();

  return <ErrorPage message={t('page-not-found')} />;
}
