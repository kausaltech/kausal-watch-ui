'use client';

import { ReactNode } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/el';
import 'dayjs/locale/en-au';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import 'dayjs/locale/es-us';
import 'dayjs/locale/fi';
import 'dayjs/locale/fr';
import 'dayjs/locale/fr-ca';
import 'dayjs/locale/sv';
import 'dayjs/locale/sv-fi';
// No dayjs locale available for Somali (so) or Hmong (mww); they fall back to English.
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
// `timezone` (depends on `utc`) lets us format dates in the plan's time zone so
// that the server and client agree, avoiding hydration mismatches for users
// whose local zone differs from the server's.
dayjs.extend(timezone);

export function DayjsLocaleProvider({ locale, children }: { locale: string; children: ReactNode }) {
  dayjs.locale(locale);

  return children;
}

export default dayjs;
