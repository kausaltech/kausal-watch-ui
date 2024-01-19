'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import defaultTheme from '@/public/static/themes/default/theme.json';
import { ErrorPage } from '@/components/common/ErrorPage';
import ThemeProvider from '@/lib/ThemeProvider';

export default function NotFound() {
  const t = useTranslations();

  return (
    <ThemeProvider theme={defaultTheme}>
      <ErrorPage message={t('page-not-found')} />
    </ThemeProvider>
  );
}
