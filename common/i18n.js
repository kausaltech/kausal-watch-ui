import * as NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import Link from 'next/link';
import Router from 'next/router';
import path from 'path';

const { supportedLanguages } = getConfig().publicRuntimeConfig;

const {
  appWithTranslation,
  withTranslation,
  i18n,
  Trans,
  useTranslation,
} = NextI18Next;

function configureFromPlan(plan) {
}

export {
  appWithTranslation,
  withTranslation,
  i18n,
  Link,
  Router,
  Trans,
  useTranslation,
  configureFromPlan,
};
