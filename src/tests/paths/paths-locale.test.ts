import { resolvePathsLocale } from '@/utils/paths/paths-locale';

describe('resolvePathsLocale', () => {
  it.each([
    ['a supported locale as it is', 'de-CH', ['de-CH', 'en'], 'de-CH'],
    ['matching case-insensitively', 'de-ch', ['de-CH'], 'de-CH'],
    ['the base language of a variant', 'de-CH', ['de', 'en'], 'de'],
    ['another variant of the language', 'de', ['fi', 'de-CH'], 'de-CH'],
    ['English when the language is not supported', 'de', ['fi', 'en'], 'en'],
    ['an English variant when there is no plain English', 'de', ['fi', 'en-GB'], 'en-GB'],
    ['the default language when there is no English either', 'de', ['fi', 'sv'], 'fi'],
  ])('uses %s', (_description, locale, supportedLanguages, expected) => {
    expect(resolvePathsLocale(locale, supportedLanguages, 'fi')).toBe(expected);
  });

  it('keeps the locale when the supported languages are unknown', () => {
    expect(resolvePathsLocale('de', undefined, undefined)).toBe('de');
  });
});
