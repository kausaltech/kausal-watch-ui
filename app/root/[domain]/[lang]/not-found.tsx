'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import defaultTheme from '@/public/static/themes/default/theme.json';
import { ErrorPage } from '@/components/common/ErrorPage';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Theme } from '@kausal/themes/types';
export default function NotFound() {
  const t = useTranslations();

  return (
    <ThemeProvider theme={defaultTheme as Theme}>
      <ErrorPage message={t('page-not-found')} />
    </ThemeProvider>
  );
}
