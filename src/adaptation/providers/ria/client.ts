import type { Assessment, City, Envelope, FloodDetail, FloodValueAtRisk, Plans } from './types';

const HOUR = 60 * 60;
const DAY = 24 * HOUR;
const TIMEOUT_MS = 30_000;

const getBaseUrl = () => process.env.RIA_API_URL || 'https://kausal.riaresilience.com';

type RequestOptions = {
  /** Seconds a cached response is served before it is refetched in the background. */
  revalidate: number;
  /** Sent as a JSON body with POST when set. */
  body?: Record<string, unknown>;
};

/**
 * Fetches one endpoint through Next's data cache.
 *
 * Visitors are served the cached response, and a refetch that fails leaves the
 * previous response in place, so the provider being down only shows once the
 * cache is empty. `revalidate=true` is never sent: it makes the provider
 * refetch its upstream sources.
 */
async function request<T>(path: string, { revalidate, body }: RequestOptions) {
  const apiKey = process.env.RIA_API_KEY;
  if (!apiKey) {
    throw new Error('RIA_API_KEY is not set');
  }
  const response = await fetch(new URL(path, getBaseUrl()), {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'force-cache',
    next: { revalidate },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Risk data request ${path.split('?')[0]} failed with ${response.status}`);
  }
  return (await response.json()) as Envelope<T>;
}

const query = (geoid: string) => `geoid=${encodeURIComponent(geoid)}`;

export const getCity = (geoid: string) =>
  request<City>(`/api/v1/city/${encodeURIComponent(geoid)}`, { revalidate: 7 * DAY });

/* Air quality, the fastest moving hazard in the assessment, updates hourly. */
export const getAssessment = (geoid: string) =>
  request<Assessment>(`/api/v1/hazards/assessment?${query(geoid)}`, { revalidate: HOUR });

export const getFloodDetail = (geoid: string) =>
  request<FloodDetail>(`/api/v1/hazards/flood?${query(geoid)}`, { revalidate: DAY });

export const getFloodValueAtRisk = (geoid: string) =>
  request<FloodValueAtRisk>(`/api/v1/var/flood?${query(geoid)}`, { revalidate: DAY });

export const getPlans = (geoid: string) =>
  request<Plans>('/api/v1/plans', { revalidate: 12 * HOUR, body: { geoid } });
