import * as Sentry from '@sentry/nextjs';
import { getRequestConfig } from 'next-intl/server';

import {
  DEFAULT_LOCALE,
  LOCALE_FILES,
  type LocaleFile,
  getLocaleFallbackChain,
} from './i18n.fallbacks';

type Messages = Record<string, unknown>;

async function importLocale(locale: string, file: LocaleFile): Promise<Messages> {
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

/**
 * Messages for `locale` layered over its fallbacks (base language of a
 * variant, and always English last), so missing keys resolve instead of
 * every variant having to carry a complete set.
 */
async function importLocales(locale: string): Promise<Messages> {
  let messages: Messages = {};
  for (const chainLocale of getLocaleFallbackChain(locale)) {
    for (const file of LOCALE_FILES) {
      messages = { ...messages, ...(await importLocale(chainLocale, file)) };
    }
  }
  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? DEFAULT_LOCALE;
  const messages = await importLocales(locale);

  return {
    locale,
    messages,
  };
});
