import { use } from 'react';
import type { ReactNode } from 'react';

import { headers } from 'next/headers';
import Script from 'next/script';

import { NextIntlClientProvider, useMessages } from 'next-intl';
import 'react-medium-image-zoom/dist/styles.css';

import { EnvProvider } from '@common/env/runtime-react';

import { DayjsLocaleProvider } from '@/common/dayjs';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { auth } from '@/config/auth';
import { EmotionRegistry } from '@/styles/StyledComponentsRegistry';
import '@/styles/default/main.scss';

type Props = {
  params: Promise<{ lang: string }>;
  children: ReactNode;
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
        {/* Provide the public environment variables to the client */}
        <EnvProvider />
        {/* Removed default theme provider - expecting before page loading components not to use themes */}
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <EmotionRegistry>
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
          </EmotionRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
