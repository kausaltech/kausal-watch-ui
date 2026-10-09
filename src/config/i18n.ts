import * as Sentry from '@sentry/nextjs';
import { getRequestConfig } from 'next-intl/server';

import {
  DEFAULT_LOCALE,
  LOCALE_FILES,
  type LocaleFile,
  getLocaleFallbackChain,
} from './i18n.fallbacks';

type Messages = Record<string, unknown>;

/** Both webpack and Turbopack tag unresolvable dynamic imports with this code. */
function isModuleNotFound(error: unknown): boolean {
  const code = (error as { code?: unknown } | null)?.code;
  return code === 'MODULE_NOT_FOUND' || code === 'ERR_MODULE_NOT_FOUND';
}

async function importLocale(locale: string, file: LocaleFile): Promise<Messages> {
  try {
    const localeModule = (await import(`../../locales/${locale}/${file}.json`)) as {
      default: Messages;
    };

    return localeModule.default;
  } catch (error) {
    // A locale may ship only some files (or none); the fallback chain covers
    // the rest, so a missing file is expected and not worth a Sentry event.
    if (isModuleNotFound(error)) return {};
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
