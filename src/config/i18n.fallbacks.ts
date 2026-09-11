/**
 * Locale fallback rules shared by the Next.js request config and Storybook.
 * Pure: no imports from next-intl or Sentry so it can run anywhere.
 */
export const LOCALE_FILES = ['common', 'actions', 'paths', 'a11y'] as const;
export type LocaleFile = (typeof LOCALE_FILES)[number];

export const DEFAULT_LOCALE = 'en';

/**
 * Country-specific variants only override the strings that differ from
 * their base language, so the base is loaded underneath them.
 */
const FALLBACKS: Record<string, string> = {
  'en-AU': 'en',
  'en-GB': 'en',
  'de-CH': 'de',
  'es-US': 'es',
  'sv-FI': 'sv',
};

/**
 * The locales whose messages make up `locale`, lowest priority first: English
 * as the final fallback, then the base language of a variant, then the locale
 * itself. Merge message files in this order so later entries win.
 */
export function getLocaleFallbackChain(locale: string): string[] {
  const chain = [locale];
  const fallback = FALLBACKS[locale];
  if (fallback) {
    chain.unshift(fallback);
  }
  if (chain[0] !== DEFAULT_LOCALE) {
    chain.unshift(DEFAULT_LOCALE);
  }
  return chain;
}
