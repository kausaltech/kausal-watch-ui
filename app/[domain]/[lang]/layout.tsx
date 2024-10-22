import 'react-medium-image-zoom/dist/styles.css';
import '@/styles/default/main.scss';

import { type ReactNode } from 'react';
import Script from 'next/script';

import * as Sentry from '@sentry/nextjs';
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { PublicEnvScript } from 'next-runtime-env';

import { DayjsLocaleProvider } from '@/common/dayjs';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import { AuthProvider } from '@/components/providers/AuthProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { auth } from '@/config/auth';
import defaultTheme from '@/public/static/themes/default/theme.json';
import { StyledComponentsRegistry } from '@/styles/StyledComponentsRegistry';

type Props = {
  params: { lang: string };
  children: ReactNode;
};

async function AsyncAuthProvider({ children }) {
  const session = await auth();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}

export function generateMetadata(): Metadata {
  const traceData = Sentry.getTraceData();
  const other: Metadata['other'] = {};
  if (traceData.baggage) other.baggage = traceData.baggage;
  if (traceData['sentry-trace'])
    other['sentry-trace'] = traceData['sentry-trace'];
  return {
    other,
  };
}

export default function LangLayout({ params, children }: Props) {
  const messages = useMessages();
  console.log('root layout');
  console.log(Sentry.getActiveSpan()?.spanContext());

  return (
    <html lang={params.lang}>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <Script id="global-this-polyfill" strategy="beforeInteractive">
          {/* https://github.com/vercel/next.js/discussions/58818 */}
          {`!function(t){function e(){var e=this||self;e.globalThis=e,delete t.prototype._T_}"object"!=typeof globalThis&&(this?e():(t.defineProperty(t.prototype,"_T_",{configurable:!0,get:e}),_T_))}(Object);`}
        </Script>
        {/* Initially provide the default theme since the plan theme identifier is loaded asynchronously.
            This prevents errors in root components such as loaders that require a theme */}
        <ThemeProvider theme={defaultTheme}>
          <NextIntlClientProvider locale={params.lang} messages={messages}>
            <StyledComponentsRegistry>
              <DayjsLocaleProvider locale={params.lang}>
                <AsyncAuthProvider>
                  <ApolloWrapper initialLocale={params.lang}>
                    {children}
                  </ApolloWrapper>
                </AsyncAuthProvider>
              </DayjsLocaleProvider>
            </StyledComponentsRegistry>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
