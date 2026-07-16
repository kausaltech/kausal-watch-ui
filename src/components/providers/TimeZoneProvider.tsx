'use client';

import type { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';

type Props = {
  locale: string;
  timeZone: string;
  children: ReactNode;
};

/**
 * Pins next-intl date/number formatting to the plan's time zone.
 *
 * Without an explicit time zone, next-intl formats using the server's zone
 * during SSR and the browser's zone on the client, which causes hydration
 * mismatches for users outside the server's zone. The plan's time zone is only
 * known below the root layout, so we override it here.
 *
 * This is a Client Component on purpose: it renders the client variant of
 * `NextIntlClientProvider`, which inherits `messages`/`formats` from the parent
 * provider's context instead of re-serializing the whole message payload into
 * the response (which the Server Component variant would do).
 */
export default function TimeZoneProvider({ locale, timeZone, children }: Props) {
  return (
    <NextIntlClientProvider locale={locale} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
