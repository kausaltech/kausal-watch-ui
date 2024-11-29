import { getRequestConfig } from 'next-intl/server';

const FALLBACKS: Record<string, string> = {
  'en-AU': 'en',
  'en-GB': 'en',
  'de-CH': 'de',
  'es-US': 'es',
  'sv-FI': 'sv',
  default: 'en',
};

type LocaleFiles = 'common' | 'actions' | 'a11y';

async function importLocale(locale: string, file: LocaleFiles) {
  try {
    const translations = (await import(`../locales/${locale}/${file}.json`))
      .default as Record<string, string>;

    return translations;
  } catch {
    console.warn(
      `kausal-watch-ui > Failed to load ${file} translations for ${locale}`
    );

    return {};
  }
}

async function importLocales(locale: string) {
  const translations: Record<string, string> = {
    ...(await importLocale(locale, 'common')),
    ...(await importLocale(locale, 'actions')),
    ...(await importLocale(locale, 'a11y')),
  };

  /**
   * Include fallback translations to avoid needing to add all translations for country
   * specific language variants. E.g. "en" will be imported as the base for "en-GB".
   */
  if (FALLBACKS[locale]) {
    return {
      ...((await importLocales(FALLBACKS[locale])) as Record<string, string>),
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
  let locale = await requestLocale;

  const messages = await importLocales(locale);

  return { messages };
});
