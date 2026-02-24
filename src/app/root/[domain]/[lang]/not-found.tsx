'use client';

import React from 'react';

import type { Theme } from '@kausal/themes/types';
import { useTranslations } from 'next-intl';

import ErrorPage from '@/components/common/ErrorPage';
import ThemeProvider from '@/components/providers/ThemeProvider';
import defaultTheme from '@/public/static/themes/default/theme.json';

export default function NotFound() {
  const t = useTranslations();

  return (
    <ThemeProvider theme={defaultTheme as Theme}>
      <ErrorPage message={t('page-not-found')} testId="root-404-boundary" />
    </ThemeProvider>
  );
}
