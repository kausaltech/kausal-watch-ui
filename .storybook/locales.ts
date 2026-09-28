/// <reference types="vite/client" />
/**
 * Message catalogs for the Storybook locale toolbar. Loads every locale file
 * eagerly (a few hundred KB, fine for a dev tool) and layers them with the
 * same fallback chain the app uses, so a story in `sv-FI` sees Finland-Swedish
 * overrides on top of Swedish on top of English exactly like production.
 */
import {
  DEFAULT_LOCALE,
  LOCALE_FILES,
  type LocaleFile,
  getLocaleFallbackChain,
} from '@/config/i18n.fallbacks';

type Messages = Record<string, unknown>;

const files = import.meta.glob<Messages>('../locales/*/*.json', {
  eager: true,
  import: 'default',
});

const catalogs: Record<string, Partial<Record<LocaleFile, Messages>>> = {};
for (const [path, messages] of Object.entries(files)) {
  const match = /\/locales\/([^/]+)\/([^/]+)\.json$/.exec(path);
  if (!match) continue;
  const [, locale, file] = match;
  // Skips helper files such as common.missing.json
  if (!(LOCALE_FILES as readonly string[]).includes(file)) continue;
  (catalogs[locale] ??= {})[file as LocaleFile] = messages;
}

/** Locales that ship at least one message file, English first. */
export const STORYBOOK_LOCALES = Object.keys(catalogs).sort((a, b) =>
  a === DEFAULT_LOCALE ? -1 : b === DEFAULT_LOCALE ? 1 : a.localeCompare(b)
);

const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

/** Toolbar label, e.g. "Swedish (Finland)"; the code itself when unknown to Intl. */
export function getLocaleLabel(locale: string): string {
  try {
    const name = displayNames.of(locale);
    return name && name !== locale ? `${name} (${locale})` : locale;
  } catch {
    return locale;
  }
}

export function getStorybookMessages(locale: string): Messages {
  let messages: Messages = {};
  for (const chainLocale of getLocaleFallbackChain(locale)) {
    for (const file of LOCALE_FILES) {
      messages = { ...messages, ...(catalogs[chainLocale]?.[file] ?? {}) };
    }
  }
  return messages;
}
