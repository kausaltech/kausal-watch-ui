import { cache } from 'react';

import { headers } from 'next/headers';

import { captureException } from '@sentry/nextjs';

import { makePathsClient } from '@common/apollo/paths-client';
import { getLogger } from '@common/logging';

import pathsPossibleTypes from '@/common/__generated__/paths/possible_types.json';
import { PATHS_COOKIE_PREFIX, getBackendCookieHeader } from '@/common/cookies';
import { GET_INSTANCE_LANGUAGES } from '@/queries/paths/get-paths-instance-languages';
import { resolvePathsLocale } from '@/utils/paths/paths-locale';

const pathsRscLogger = getLogger('apollo-paths-rsc');

/** A client per request, Paths instance and query language. */
const getClientForLocale = cache(async (instanceIdentifier: string, locale: string | undefined) => {
  const clientCookies = await getBackendCookieHeader({ prefix: PATHS_COOKIE_PREFIX });

  return makePathsClient({
    instanceIdentifier,
    locale,
    clientCookies: clientCookies ?? undefined,
    possibleTypes: pathsPossibleTypes.possibleTypes,
    logger: pathsRscLogger,
  });
});

/** How long an instance's languages are reused */
const INSTANCE_LANGUAGES_TTL_MS = 5 * 60 * 1000;

type InstanceLanguages = { supportedLanguages: string[]; defaultLanguage: string } | undefined;

/**
 * Each instance's languages, shared across requests: they're public settings.
 * Failures aren't kept.
 */
const instanceLanguages = new Map<
  string,
  { expiresAt: number; languages: Promise<InstanceLanguages> }
>();

function getInstanceLanguages(instanceIdentifier: string): Promise<InstanceLanguages> {
  const cached = instanceLanguages.get(instanceIdentifier);
  if (cached && cached.expiresAt > Date.now()) return cached.languages;

  const languages = getClientForLocale(instanceIdentifier, undefined)
    .then((client) => client.query({ query: GET_INSTANCE_LANGUAGES, fetchPolicy: 'no-cache' }))
    .then(({ data }) => data?.instance);
  instanceLanguages.set(instanceIdentifier, {
    expiresAt: Date.now() + INSTANCE_LANGUAGES_TTL_MS,
    languages,
  });
  languages.catch(() => instanceLanguages.delete(instanceIdentifier));
  return languages;
}

/**
 * The language to query the Paths instance in for this request's locale; see
 * `resolvePathsLocale`.
 */
export const getPathsLocale = cache(async (instanceIdentifier: string) => {
  const locale = (await headers()).get('x-next-intl-locale');
  if (!locale) return undefined;

  try {
    const languages = await getInstanceLanguages(instanceIdentifier);
    return resolvePathsLocale(locale, languages?.supportedLanguages, languages?.defaultLanguage);
  } catch (error) {
    // Querying in the page's locale works whenever the instance supports it
    captureException(error, { extra: { pathsInstance: instanceIdentifier, locale } });
    return locale;
  }
});

/**
 * Apollo client for the Paths API in React Server Components, one per request
 * and Paths instance. It forwards the visitor's Paths session cookies, so
 * session state such as the active scenario matches what the browser sees,
 * and queries in the language `getPathsLocale` picks.
 *
 * For client components use `usePathsQuery` and `usePathsMutation`.
 */
export async function getPathsClient(instanceIdentifier: string) {
  return getClientForLocale(instanceIdentifier, await getPathsLocale(instanceIdentifier));
}
