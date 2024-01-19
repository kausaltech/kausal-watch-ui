import { getRequestConfig } from 'next-intl/server';

const FALLBACKS = {
  'en-AU': 'en',
  'en-GB': 'en',
  'de-CH': 'de',
  'es-US': 'es',
  default: 'en',
};

type LocaleFiles = 'common' | 'actions' | 'a11y';

async function importLocale(locale: string, file: LocaleFiles) {
  try {
    const translations = (await import(`../locales/${locale}/${file}.json`))
      .default;

    return translations;
  } catch {
    console.warn(
      `kausal-watch-ui > Failed to load ${file} translations for ${locale}`
    );

    return {};
  }
}

async function importLocales(locale: string) {
  const translations = {
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
      ...(await importLocales(FALLBACKS[locale])),
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

export default getRequestConfig(async ({ locale }) => {
  const messages = await importLocales(locale);

  return { messages };
});
