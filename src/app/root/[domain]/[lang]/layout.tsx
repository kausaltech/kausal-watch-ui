import { use } from 'react';
import type { ReactNode } from 'react';

import { headers } from 'next/headers';
import Script from 'next/script';
import type { Metadata } from 'next/types';

import type { Theme } from '@kausal/themes/types';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import 'react-medium-image-zoom/dist/styles.css';

import { getPublicEnvAsMeta } from '@common/env';

import { DayjsLocaleProvider } from '@/common/dayjs';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import { AuthProvider } from '@/components/providers/AuthProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { auth } from '@/config/auth';
import defaultTheme from '@/public/static/themes/default/theme.json';
import { StyledComponentsRegistry } from '@/styles/StyledComponentsRegistry';
import '@/styles/default/main.scss';

type Props = {
  params: Promise<{ lang: string }>;
  children: ReactNode;
};

export const metadata: Metadata = {
  ...getPublicEnvAsMeta(),
};

async function AsyncAuthProvider({ children }) {
  const session = await auth();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}

export default function LangLayout(props: Props) {
  const params = use(props.params);

  const { children } = props;

  const messages = useMessages();
  const incomingHeaders = use(headers());
  const planIdentifier = incomingHeaders.get('x-plan-identifier')!;
  const planDomain = incomingHeaders.get('x-plan-domain')!;

  return (
    <html lang={params.lang}>
      <body>
        <Script id="global-this-polyfill" strategy="beforeInteractive">
          {/* https://github.com/vercel/next.js/discussions/58818 */}
          {`!function(t){function e(){var e=this||self;e.globalThis=e,delete t.prototype._T_}"object"!=typeof globalThis&&(this?e():(t.defineProperty(t.prototype,"_T_",{configurable:!0,get:e}),_T_))}(Object);`}
        </Script>
        {/* Initially provide the default theme since the plan theme identifier is loaded asynchronously.
            This prevents errors in root components such as loaders that require a theme */}
        <ThemeProvider theme={defaultTheme as Theme}>
          <NextIntlClientProvider locale={params.lang} messages={messages}>
            <StyledComponentsRegistry>
              <DayjsLocaleProvider locale={params.lang}>
                <AsyncAuthProvider>
                  <ApolloWrapper
                    initialLocale={params.lang}
                    planIdentifier={planIdentifier}
                    planDomain={planDomain}
                  >
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
