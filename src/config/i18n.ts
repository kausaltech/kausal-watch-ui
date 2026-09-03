import * as Sentry from '@sentry/nextjs';
import { getRequestConfig } from 'next-intl/server';

const FALLBACKS: Record<string, string> & { default: string } = {
  'en-AU': 'en',
  'en-GB': 'en',
  'de-CH': 'de',
  'es-US': 'es',
  'sv-FI': 'sv',
  default: 'en',
};

type LocaleFiles = 'common' | 'actions' | 'paths' | 'a11y';
type Messages = Record<string, unknown>;

async function importLocale(locale: string, file: LocaleFiles): Promise<Messages> {
  try {
    const localeModule = (await import(`../../locales/${locale}/${file}.json`)) as {
      default: Messages;
    };

    return localeModule.default;
  } catch (error) {
    console.warn(`kausal-watch-ui > Failed to load ${file} translations for ${locale}`);
    Sentry.captureException(error);
    return {};
  }
}

async function importLocales(locale: string): Promise<Messages> {
  const translations = {
    ...(await importLocale(locale, 'common')),
    ...(await importLocale(locale, 'actions')),
    ...(await importLocale(locale, 'paths')),
    ...(await importLocale(locale, 'a11y')),
  };

  /**
   * Include fallback translations to avoid needing to add all translations for country
   * specific language variants. E.g. "en" will be imported as the base for "en-GB".
   */
  const fallback = FALLBACKS[locale];
  if (fallback) {
    return {
      ...(await importLocales(fallback)),
      ...translations,
    };
  }

  /**
   * Always include English as a final fallback in case translations are missing.
   */
  if (locale !== FALLBACKS.default) {
    return {
      ...(await importLocales(FALLBACKS.default)),
      ...translations,
    };
  }

  return translations;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'en';
  const messages = await importLocales(locale);

  return {
    locale,
    messages,
  };
});
