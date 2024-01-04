'use client';

import React from 'react';

import { ErrorPage } from '@/components/common/ErrorPage';
import { useTranslations } from 'next-intl';
import { usePlan } from '@/context/plan';
import { useTheme } from 'styled-components';

export default function NotFound() {
  const t = useTranslations();

  return <ErrorPage message={t('page-not-found')} />;
}
