import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { StyledComponentsRegistry } from '@/lib/StyledComponentsRegistry';
import { ApolloWrapper } from '@/lib/ApolloWrapper';
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
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <StyledComponentsRegistry>
            <ApolloWrapper>{children}</ApolloWrapper>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
