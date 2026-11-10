/*
 * Turns the risk data provider's payloads into what the pages render.
 *
 * Nothing here invents a value. A figure the payload lacks is left out, and a
 * score that is missing is null, never zero: "not assessed" and "does not
 * apply here" are different statements from a score of 0.
 */
import type {
  Assessment,
  FloodComponent,
  FloodHazard,
  FloodValueAtRisk,
  HeatHazard,
  PlanItem,
  SviHazard,
} from './providers/ria/types';

/** The provider's hazard keys, in the order hazards with equal scores are listed. */
export const HAZARD_KEYS = ['flood', 'heat', 'svi', 'wildfire', 'drought', 'air_quality'] as const;
export type HazardKey = (typeof HAZARD_KEYS)[number];

export const HAZARD_SLUGS: Record<HazardKey, string> = {
  flood: 'flooding',
  heat: 'extreme-heat',
  svi: 'social-vulnerability',
  wildfire: 'wildfire',
  drought: 'drought',
  air_quality: 'air-quality',
};

export type ScoreLevel = 'none' | 'low' | 'moderate' | 'high' | 'very-high';

export type SubScoreId =
  | 'flood-pluvial'
  | 'flood-riverine'
  | 'flood-coastal'
  | 'heat-current'
  | 'heat-future'
  | 'svi-socioeconomic'
  | 'svi-household'
  | 'svi-minority'
  | 'svi-housing';

export type SubScore = { id: SubScoreId; year?: number } & (
  | { state: 'scored'; score: number }
  /** The hazard cannot occur here, e.g. coastal flooding inland. */
  | { state: 'not-applicable' }
  /** The hazard could occur here, but the provider has no score for it. */
  | { state: 'not-assessed' }
);

export type FigureFormat = 'percent' | 'integer' | 'usd' | 'fahrenheit' | 'text';

export type FigureId =
  | 'flood-sfha-area'
  | 'flood-zone-area'
  | 'flood-population'
  | 'flood-housing-units'
  | 'flood-property-value'
  | 'flood-tax-revenue'
  | 'flood-public-assets'
  | 'heat-average-temperature'
  | 'heat-average-temperature-future'
  | 'wildfire-count'
  | 'wildfire-area'
  | 'drought-category'
  | 'drought-area'
  | 'air-aqi'
  | 'air-pollutant'
  | 'air-monitors'
  | 'svi-tracts'
  | 'svi-vulnerable-tracts'
  | 'svi-vulnerable-population';

export type Figure = {
  id: FigureId;
  format: FigureFormat;
  value: number | string;
  /** The whole that `value` is a part of, for "2 of 7". */
  total?: number;
  year?: number;
};

export type HazardSummaryId = 'flood' | 'heat' | 'drought' | 'air_quality' | 'svi';

/** A sentence about the hazard, filled in from the payload's own figures. */
export type HazardSummary = { id: HazardSummaryId; values: Record<string, string | number> };

export type Hazard = {
  key: HazardKey;
  slug: string;
  /** Null when the provider could not assess the hazard. */
  score: number | null;
  level: ScoreLevel | null;
  sourceName: string | null;
  updatedAt: string | null;
  subScores: SubScore[];
  figures: Figure[];
  summary: HazardSummary | null;
  /** The provider's own prose about the hazard, shown as is. */
  narrative: string | null;
};

export type Measure = {
  id: string;
  name: string;
  summary: string | null;
  description: string | null;
  /** The hazards the measure addresses, as far as the provider's free text names them. */
  hazards: HazardKey[];
  otherHazards: string | null;
  matchScore: number | null;
  timelineYears: number | null;
  lifespanYears: number | null;
};

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const toScore = (value: unknown): number | null =>
  isNumber(value) && value >= 0 && value <= 10 ? value : null;

/** Bands from the provider's API documentation. */
export function getScoreLevel(score: number): ScoreLevel {
  if (score <= 0) return 'none';
  if (score <= 3) return 'low';
  if (score <= 5) return 'moderate';
  if (score <= 7) return 'high';
  return 'very-high';
}

const scored = (id: SubScoreId, value: unknown, year?: number): SubScore => {
  const score = toScore(value);
  const base = year == null ? { id } : { id, year };
  return score == null ? { ...base, state: 'not-assessed' } : { ...base, state: 'scored', score };
};

function getFloodSubScores(flood: FloodHazard): SubScore[] {
  const scoring = flood.floodScoreV3;
  const components = scoring?.components;
  if (!components) return [];

  const component = (id: SubScoreId, data: FloodComponent | undefined) =>
    data?.apiHealthy === false ? ({ id, state: 'not-assessed' } as const) : scored(id, data?.score);

  // An inland community's coastal component arrives as a score of 0 from an
  // unhealthy source. Whether the coast is in play is the only thing that
  // tells "does not apply" from "not assessed".
  const coastalActive = scoring.coastalActivation?.active ?? flood.coastalActive;
  const coastal: SubScore =
    coastalActive === false
      ? { id: 'flood-coastal', state: 'not-applicable' }
      : coastalActive === true
        ? component('flood-coastal', components.coastal)
        : { id: 'flood-coastal', state: 'not-assessed' };

  return [
    component('flood-pluvial', components.pluvial),
    component('flood-riverine', components.riverine),
    coastal,
  ];
}

function getHeatSubScores(heat: HeatHazard): SubScore[] {
  const subScores: SubScore[] = [];
  if (heat.current) {
    subScores.push(scored('heat-current', heat.current.hazardScore, heat.current.year));
  }
  if (heat.future) subScores.push(scored('heat-future', heat.future.hazardScore, heat.future.year));
  return subScores;
}

function getSviSubScores(svi: SviHazard): SubScore[] {
  const { scores } = svi;
  if (!scores) return [];
  return [
    scored('svi-socioeconomic', scores.socioeconomic),
    scored('svi-household', scores.household),
    scored('svi-minority', scores.minority),
    scored('svi-housing', scores.housing),
  ];
}

/** Collects the figures whose values are present, in the order given. */
function figures(
  ...candidates: (Omit<Figure, 'value'> & { value: number | string | null | undefined })[]
): Figure[] {
  return candidates.flatMap(({ value, ...rest }) => {
    const present = typeof value === 'string' ? value.trim() !== '' : isNumber(value);
    return present ? [{ ...rest, value: value as number | string }] : [];
  });
}

type Hazards = NonNullable<Assessment['hazards']>;

function getFigures(
  key: HazardKey,
  hazards: Hazards,
  floodValueAtRisk: FloodValueAtRisk | null
): Figure[] {
  switch (key) {
    case 'flood': {
      const summary = hazards.flood?.summaryData;
      const atRisk = floodValueAtRisk?.value_at_risk;
      const assets = atRisk?.public_assets?.total;
      return figures(
        { id: 'flood-sfha-area', format: 'percent', value: summary?.sfhaPercent },
        { id: 'flood-zone-area', format: 'percent', value: summary?.percentageOfAreaInFloodZones },
        { id: 'flood-population', format: 'integer', value: summary?.estimatedPopulationAtRisk },
        {
          id: 'flood-housing-units',
          format: 'integer',
          value: atRisk?.residential?.housing_units_at_risk,
        },
        {
          id: 'flood-property-value',
          format: 'usd',
          value: atRisk?.residential?.property_value_at_risk_usd,
        },
        {
          id: 'flood-tax-revenue',
          format: 'usd',
          value: atRisk?.residential?.annual_tax_revenue_at_risk_usd,
        },
        // "0 of 0" would read as a finding when it means nothing was counted
        ...(isNumber(assets?.total) && assets.total > 0
          ? [
              {
                id: 'flood-public-assets' as const,
                format: 'integer' as const,
                value: assets.at_risk,
                total: assets.total,
              },
            ]
          : [])
      );
    }
    case 'heat': {
      const { current, future } = hazards.heat ?? {};
      return figures(
        {
          id: 'heat-average-temperature',
          format: 'fahrenheit',
          value: current?.summaryData?.averageTemperature,
          year: current?.year,
        },
        {
          id: 'heat-average-temperature-future',
          format: 'fahrenheit',
          value: future?.summaryData?.averageTemperature,
          year: future?.year,
        }
      );
    }
    case 'wildfire': {
      const summary = hazards.wildfire?.summaryData;
      return figures(
        { id: 'wildfire-count', format: 'integer', value: summary?.numberOfFires },
        { id: 'wildfire-area', format: 'percent', value: summary?.percentageOfAreaAffected }
      );
    }
    case 'drought': {
      const summary = hazards.drought?.summaryData;
      return figures(
        { id: 'drought-category', format: 'text', value: summary?.dominantCategory },
        { id: 'drought-area', format: 'percent', value: summary?.percentageOfAreaAffected }
      );
    }
    case 'air_quality': {
      const summary = hazards.air_quality?.summaryData;
      return figures(
        { id: 'air-aqi', format: 'integer', value: summary?.averageAQI },
        { id: 'air-pollutant', format: 'text', value: summary?.dominantPollutant },
        { id: 'air-monitors', format: 'integer', value: summary?.numberOfMonitors }
      );
    }
    case 'svi': {
      const summary = hazards.svi?.summaryData;
      return figures(
        { id: 'svi-tracts', format: 'integer', value: summary?.numberOfTractsAnalyzed },
        {
          id: 'svi-vulnerable-tracts',
          format: 'integer',
          value: summary?.vulnerableTractsCount,
        },
        {
          id: 'svi-vulnerable-population',
          format: 'integer',
          value: summary?.estimatedVulnerablePopulation,
        }
      );
    }
  }
}

/**
 * Wildfire has no summary: its only figure is a count of fire perimeters, and
 * a sentence built on a count of zero would claim more than the data supports.
 */
function getSummary(key: HazardKey, hazards: Hazards): HazardSummary | null {
  switch (key) {
    case 'flood': {
      const percent = hazards.flood?.summaryData?.sfhaPercent;
      return isNumber(percent) ? { id: 'flood', values: { percent } } : null;
    }
    case 'heat': {
      const future = hazards.heat?.future;
      const score = toScore(future?.hazardScore);
      return score != null && isNumber(future?.year)
        ? { id: 'heat', values: { score, year: future.year } }
        : null;
    }
    case 'drought': {
      const percent = hazards.drought?.summaryData?.percentageOfAreaAffected;
      return isNumber(percent) ? { id: 'drought', values: { percent } } : null;
    }
    case 'air_quality': {
      const aqi = hazards.air_quality?.summaryData?.averageAQI;
      return isNumber(aqi) ? { id: 'air_quality', values: { aqi } } : null;
    }
    case 'svi': {
      const summary = hazards.svi?.summaryData;
      const count = summary?.vulnerableTractsCount;
      const total = summary?.numberOfTractsAnalyzed;
      return isNumber(count) && isNumber(total) && total > 0
        ? { id: 'svi', values: { count, total } }
        : null;
    }
    case 'wildfire':
      return null;
  }
}

function getSubScores(key: HazardKey, hazards: Hazards): SubScore[] {
  if (key === 'flood' && hazards.flood) return getFloodSubScores(hazards.flood);
  if (key === 'heat' && hazards.heat) return getHeatSubScores(hazards.heat);
  if (key === 'svi' && hazards.svi) return getSviSubScores(hazards.svi);
  return [];
}

/**
 * The hazards the assessment covers, highest score first. Hazards the provider
 * could not assess come last, without a score.
 */
export function buildHazards(
  assessment: Assessment,
  floodValueAtRisk: FloodValueAtRisk | null = null
): Hazard[] {
  const hazards = assessment.hazards ?? {};
  const built = HAZARD_KEYS.flatMap((key): Hazard[] => {
    const data = hazards[key];
    if (!data) return [];
    const score = data.available === false ? null : toScore(data.hazardScore);
    const assessed = score != null;
    return [
      {
        key,
        slug: HAZARD_SLUGS[key],
        score,
        level: assessed ? getScoreLevel(score) : null,
        sourceName: data.meta?.source ?? null,
        updatedAt: data.meta?.last_updated_at ?? data.meta?.updated_at ?? null,
        subScores: assessed ? getSubScores(key, hazards) : [],
        figures: assessed ? getFigures(key, hazards, floodValueAtRisk) : [],
        summary: assessed ? getSummary(key, hazards) : null,
        narrative:
          assessed && key === 'flood'
            ? (floodValueAtRisk?.value_at_risk?.summaryText ?? null)
            : null,
      },
    ];
  });
  // Array.prototype.sort is stable, so equal scores keep the order of HAZARD_KEYS
  return built.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
}

/** The most recent update among the hazards, as an ISO timestamp. */
export function getLatestUpdate(hazards: Hazard[]): string | null {
  const times = hazards.flatMap((hazard) => {
    const time = hazard.updatedAt ? Date.parse(hazard.updatedAt) : NaN;
    return Number.isNaN(time) ? [] : [time];
  });
  return times.length > 0 ? new Date(Math.max(...times)).toISOString() : null;
}

/*
 * The provider names a measure's hazards in free text, such as
 * "Heat/Smoke/IAQ/Drought (soil moisture)". Smoke and indoor air quality count
 * as air quality: that is the harm the measures address.
 */
const HAZARD_PATTERNS: [HazardKey, RegExp][] = [
  ['flood', /flood|stormwater/i],
  ['heat', /heat/i],
  ['wildfire', /wildfire|bushfire/i],
  ['drought', /drought/i],
  ['air_quality', /air (quality|pollution)|smoke|\biaq\b/i],
];

export function matchHazards(text: string | null | undefined): HazardKey[] {
  if (!text) return [];
  return HAZARD_PATTERNS.flatMap(([key, pattern]) => (pattern.test(text) ? [key] : []));
}

/** Every number in a plan item except the match score arrives as a string. */
const parseNumber = (value: unknown): number | null => {
  if (isNumber(value)) return value;
  if (typeof value !== 'string' || value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const textOrNull = (value: unknown): string | null =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : null;

/** The measures the provider matched to the community, best match first. */
export function buildMeasures(items: PlanItem[] | null | undefined): Measure[] {
  const measures = (items ?? []).flatMap((item): Measure[] => {
    const id = textOrNull(item.stable_id) ?? textOrNull(item.id);
    const name = textOrNull(item.action_title);
    if (!id || !name) return [];
    return [
      {
        id,
        name,
        summary: textOrNull(item.description_short),
        description: textOrNull(item.description_long),
        hazards: matchHazards(item.addressed_hazards),
        otherHazards: textOrNull(item.other_hazards),
        matchScore: parseNumber(item.match_score),
        timelineYears: parseNumber(item.implementation_timeline_yrs),
        lifespanYears: parseNumber(item.action_lifespan_yrs),
      },
    ];
  });
  return measures.sort((a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1));
}
