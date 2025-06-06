import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import 'react-medium-image-zoom/dist/styles.css';
import { StyledComponentsRegistry } from '@/styles/StyledComponentsRegistry';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import ThemeProvider from '@/components/providers/ThemeProvider';
import defaultTheme from '@/public/static/themes/default/theme.json';
import { Theme } from '@kausal/themes/types';
import { DayjsLocaleProvider } from '@/common/dayjs';
import '@/styles/default/main.scss';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { auth } from '@/config/auth';
import Script from 'next/script';
import { headers } from 'next/headers';

type Props = {
  params: { lang: string };
  children: ReactNode;
};

async function AsyncAuthProvider({ children }) {
  const session = await auth();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}

export default function LangLayout({ params, children }: Props) {
  const messages = useMessages();
  const incomingHeaders = headers();
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
