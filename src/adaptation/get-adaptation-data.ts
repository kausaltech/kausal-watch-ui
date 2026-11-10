import { cache } from 'react';

import { captureException } from '@sentry/nextjs';

import { tryRequest } from '@/utils/api.utils';

import { LINKED_ACTION_IDENTIFIERS, getAdaptationGeoid } from './config';
import {
  type Hazard,
  type HazardKey,
  type Measure,
  buildHazards,
  buildMeasures,
  getLatestUpdate,
} from './model';
import {
  getAssessment,
  getCity,
  getFloodDetail,
  getFloodValueAtRisk,
  getPlans,
} from './providers/ria/client';
import type { Feature } from './providers/ria/types';
import { type LinkedAction, getLinkedAction } from './queries/get-linked-action';

export type AdaptationMapData = {
  /** West, south, east, north. */
  bounds: [number, number, number, number];
  boundary: Feature | null;
  floodZones: Feature[];
};

export type AdaptationData = {
  hazards: Hazard[];
  measures: Measure[];
  linkedActions: Partial<Record<HazardKey, LinkedAction[]>>;
  /** When the most recently updated hazard was updated, as an ISO timestamp. */
  updatedAt: string | null;
  /** Null when the community's extent is unknown. */
  map: AdaptationMapData | null;
};

export type AdaptationResult =
  /** The section is off for the plan. */
  | { status: 'disabled' }
  /** The hazard assessment could not be loaded, so there is nothing to show. */
  | { status: 'unavailable' }
  | { status: 'ok'; data: AdaptationData };

/** Resolves to null when the request fails; the page then leaves that part out. */
async function optional<T>(request: Promise<{ data: T }>): Promise<T | null> {
  try {
    return (await request).data;
  } catch (error) {
    captureException(error);
    return null;
  }
}

async function getLinkedActions(plan: string, geoid: string) {
  const identifiersByHazard = LINKED_ACTION_IDENTIFIERS[geoid] ?? {};
  const entries = await Promise.all(
    Object.entries(identifiersByHazard).map(async ([hazard, identifiers = []]) => {
      const results = await Promise.all(
        identifiers.map((identifier) => tryRequest(getLinkedAction(plan, identifier)))
      );
      const actions = results.map((result) => result.data?.action).filter((a) => a != null);
      return [hazard, actions] as const;
    })
  );
  return Object.fromEntries(entries) as AdaptationData['linkedActions'];
}

/**
 * Loads what the section's pages show for a plan.
 *
 * Only the hazard assessment is required. Each of the other requests may fail
 * without taking the page down.
 */
export const getAdaptationData = cache(async (plan: string): Promise<AdaptationResult> => {
  const geoid = getAdaptationGeoid(plan);
  if (!geoid) return { status: 'disabled' };

  const [assessment, city, floodDetail, floodValueAtRisk, plans, linkedActions] = await Promise.all(
    [
      optional(getAssessment(geoid)),
      optional(getCity(geoid)),
      optional(getFloodDetail(geoid)),
      optional(getFloodValueAtRisk(geoid)),
      optional(getPlans(geoid)),
      getLinkedActions(plan, geoid),
    ]
  );
  if (!assessment) return { status: 'unavailable' };

  const hazards = buildHazards(assessment, floodValueAtRisk);
  return {
    status: 'ok',
    data: {
      hazards,
      measures: buildMeasures(plans?.plans),
      linkedActions,
      updatedAt: getLatestUpdate(hazards),
      map: city?.bbox
        ? {
            bounds: city.bbox,
            boundary: city.boundary ?? null,
            floodZones: floodDetail?.features ?? [],
          }
        : null,
    },
  };
});
