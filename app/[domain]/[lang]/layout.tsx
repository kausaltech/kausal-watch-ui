import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { headers } from 'next/headers';

import { StyledComponentsRegistry } from '@/styles/StyledComponentsRegistry';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import ThemeProvider from '@/components/providers/ThemeProvider';
import defaultTheme from '@/public/static/themes/default/theme.json';
import { DayjsLocaleProvider } from '@/common/dayjs';
import '@/styles/default/main.scss';

type Props = {
  params: { lang: string };
  children: ReactNode;
};

export default function LangLayout({ params, children }: Props) {
  const messages = useMessages();
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto');
  const origin = host && protocol ? `${protocol}://${host}` : undefined;

  return (
    <html lang={params.lang}>
      <body>
        {/* Initially provide the default theme since the plan theme identifier is loaded asynchronously.
            This prevents errors in root components such as loaders that require a theme */}
        <ThemeProvider theme={defaultTheme}>
          <NextIntlClientProvider locale={params.lang} messages={messages}>
            <StyledComponentsRegistry>
              <DayjsLocaleProvider locale={params.lang}>
                <ApolloWrapper origin={origin} initialLocale={params.lang}>
                  {children}
                </ApolloWrapper>
              </DayjsLocaleProvider>
            </StyledComponentsRegistry>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
