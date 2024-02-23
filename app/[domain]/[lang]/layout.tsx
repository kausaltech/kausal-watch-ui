import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { StyledComponentsRegistry } from '@/styles/StyledComponentsRegistry';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import ThemeProvider from '@/components/providers/ThemeProvider';
import defaultTheme from '@/public/static/themes/default/theme.json';
import { DayjsLocaleProvider } from '@/common/dayjs';
import '@/styles/default/main.scss';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { auth } from '@/config/auth';
import { envMetadata } from '@/utils/environment.utils';

type Props = {
  params: { lang: string };
  children: ReactNode;
};

async function AsyncAuthProvider({ children }) {
  const session = await auth();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}

export const metadata = envMetadata;

export default function LangLayout({ params, children }: Props) {
  const messages = useMessages();

  return (
    <html lang={params.lang}>
      <body>
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
