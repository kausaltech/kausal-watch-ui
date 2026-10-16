const getBaseLanguage = (locale: string) => locale.split('-')[0].toLowerCase();

/**
 * The language to query Paths data in for a Watch locale.
 *
 * Paths rejects a language its instance does not support, and a Watch plan
 * can offer languages its Paths instance lacks. In that order, use the Watch
 * locale itself, another variant of the same language (`de-CH` → `de`),
 * English, or the instance's default language. The Paths content of the page
 * is then in another language than the rest of it.
 *
 * Without the instance's languages, the Watch locale is used as it is.
 */
export function resolvePathsLocale(
  locale: string,
  supportedLanguages: readonly string[] | null | undefined,
  defaultLanguage: string | null | undefined
): string {
  if (!supportedLanguages?.length) return locale;

  const exact = supportedLanguages.find((lang) => lang.toLowerCase() === locale.toLowerCase());
  if (exact) return exact;

  const findLanguage = (base: string) =>
    supportedLanguages.find((lang) => lang.toLowerCase() === base) ??
    supportedLanguages.find((lang) => getBaseLanguage(lang) === base);

  return findLanguage(getBaseLanguage(locale)) ?? findLanguage('en') ?? defaultLanguage ?? locale;
}
