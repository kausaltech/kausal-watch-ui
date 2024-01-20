import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { StyledComponentsRegistry } from '@/lib/StyledComponentsRegistry';
import { ApolloWrapper } from '@/lib/ApolloWrapper';
import ThemeProvider from '@/lib/ThemeProvider';
import defaultTheme from '@/public/static/themes/default/theme.json';
import { DayjsLocaleProvider } from '@/common/dayjs';
import '@/styles/default/main.scss';

type Props = {
  params: { lang: string };
  children: ReactNode;
};

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
                <ApolloWrapper initialLocale={params.lang}>
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
