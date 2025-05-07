'use client';

import dayjs from 'dayjs';

import 'dayjs/locale/de';
import 'dayjs/locale/el';
import 'dayjs/locale/en-au';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import 'dayjs/locale/fi';
import 'dayjs/locale/sv';
import 'dayjs/locale/sv-fi';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ReactNode } from 'react';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export function DayjsLocaleProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  dayjs.locale(locale);

  return children;
}

export default dayjs;
