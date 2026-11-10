import { getDeploymentType } from '@common/env';

/** Path of the section under the plan's root. */
export const ADAPTATION_PATH = '/risks';

/**
 * Parses `ADAPTATION_PLAN_GEOIDS`, a comma-separated list of
 * `plan-identifier:geoid` pairs.
 */
export function parsePlanGeoids(value: string | undefined): Record<string, string> {
  const geoids: Record<string, string> = {};
  for (const entry of (value ?? '').split(',')) {
    const [plan, geoid] = entry.split(':').map((part) => part.trim());
    if (plan && geoid) geoids[plan] = geoid;
  }
  return geoids;
}

/**
 * The Census GEOID whose risk data the plan's site shows, or null when the
 * section is off for the plan.
 *
 * The section is never on in production: the terms for publishing the risk
 * data provider's content are not agreed yet.
 *
 * Reads the server's environment, so call it from server code only.
 */
export function getAdaptationGeoid(planIdentifier: string): string | null {
  if (getDeploymentType() === 'production') return null;
  return parsePlanGeoids(process.env.ADAPTATION_PLAN_GEOIDS)[planIdentifier] ?? null;
}

/**
 * Plan actions that respond to a hazard, by GEOID and hazard key.
 *
 * A stand-in for tagging actions with hazards in the backend. Saying that an
 * action responds to a hazard is a claim the plan's owner makes, so these are
 * listed by hand.
 */
export const LINKED_ACTION_IDENTIFIERS: Record<string, Partial<Record<string, string[]>>> = {
  '0875640': { flood: ['C1.5'] },
};
