import * as NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import Link from 'next/link';
import Router from 'next/router';

const {
  appWithTranslation,
  withTranslation,
  Trans,
  useTranslation,
} = NextI18Next;

export function getI18n() {
  return NextI18Next.i18n;
}

export {
  appWithTranslation,
  withTranslation,
  Link,
  Router,
  Trans,
  useTranslation,
};
