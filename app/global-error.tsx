'use client';

import { captureException } from '@sentry/nextjs';
import { useEffect } from 'react';

import defaultTheme from '@/public/static/themes/default/theme.json';
import { ErrorPage } from '@/components/common/ErrorPage';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Theme } from '@kausal/themes/types';
type Props = {
  error: Error & { digest?: string };
};

export default function GlobalError({ error }: Props) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <ThemeProvider theme={defaultTheme as Theme}>
          <ErrorPage />
        </ThemeProvider>
      </body>
    </html>
  );
}
