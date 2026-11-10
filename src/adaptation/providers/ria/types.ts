/*
 * The parts of the risk data provider's payloads that the section reads.
 *
 * The provider's OpenAPI document describes every payload as a bare object, so
 * these come from its examples and from live responses. Every field is
 * optional: one upstream source failing drops fields without failing the
 * request.
 */

/** A GeoJSON feature, passed to the map as is. */
export type Feature = {
  type: 'Feature';
  geometry: { type: string; coordinates: unknown };
  properties: Record<string, unknown> | null;
};

export type Meta = {
  ttl_seconds?: number;
  updated_at?: string;
  last_updated_at?: string;
  expires_at?: string;
  source?: string;
};

export type Envelope<T> = { data: T; meta: Meta };

export type City = {
  name?: string;
  stateAbbr?: string;
  population?: number;
  /** West, south, east, north. */
  bbox?: [number, number, number, number];
  boundary?: Feature;
};

type HazardBase<Summary> = {
  /** False when the upstream source failed; the hazard then has no score. */
  available?: boolean;
  error?: string;
  hazardScore?: number | null;
  summaryData?: Summary;
  meta?: Meta;
};

export type FloodComponent = { score?: number | null; apiHealthy?: boolean };

export type FloodHazard = HazardBase<{
  sfhaPercent?: number;
  percentageOfAreaInFloodZones?: number;
  estimatedPopulationAtRisk?: number;
}> & {
  coastalActive?: boolean;
  floodScoreV3?: {
    coastalActivation?: { active?: boolean; reason?: string };
    components?: {
      riverine?: FloodComponent;
      pluvial?: FloodComponent;
      coastal?: FloodComponent;
    };
  };
};

type HeatPeriod = {
  hazardScore?: number | null;
  year?: number;
  summaryData?: { averageTemperature?: number; maxTemperature?: number };
};

export type HeatHazard = HazardBase<never> & { current?: HeatPeriod; future?: HeatPeriod };

export type WildfireHazard = HazardBase<{
  numberOfFires?: number;
  percentageOfAreaAffected?: number;
}>;

export type DroughtHazard = HazardBase<{
  dominantCategory?: string;
  percentageOfAreaAffected?: number;
}>;

export type AirQualityHazard = HazardBase<{
  averageAQI?: number;
  dominantPollutant?: string;
  numberOfMonitors?: number;
}>;

export type SviHazard = HazardBase<{
  numberOfTractsAnalyzed?: number;
  vulnerableTractsCount?: number;
  estimatedVulnerablePopulation?: number;
}> & {
  scores?: {
    socioeconomic?: number | null;
    household?: number | null;
    minority?: number | null;
    housing?: number | null;
  };
};

export type Assessment = {
  hazards?: {
    flood?: FloodHazard;
    heat?: HeatHazard;
    wildfire?: WildfireHazard;
    drought?: DroughtHazard;
    air_quality?: AirQualityHazard;
    svi?: SviHazard;
  };
};

/** The full flood payload; the section only reads its zone polygons. */
export type FloodDetail = { features?: Feature[] };

export type FloodValueAtRisk = {
  value_at_risk?: {
    summaryText?: string;
    residential?: {
      housing_units_at_risk?: number;
      property_value_at_risk_usd?: number;
      annual_tax_revenue_at_risk_usd?: number;
    };
    public_assets?: { total?: { total?: number; at_risk?: number } };
  };
};

/**
 * A library measure matched to the community. Not a commitment: it has no
 * owner, and its cost fields contradict each other, so the section reads
 * neither.
 */
export type PlanItem = {
  id?: string;
  stable_id?: string;
  match_score?: number;
  action_title?: string;
  description_short?: string;
  description_long?: string;
  addressed_hazards?: string;
  other_hazards?: string;
  /** Numbers arrive as strings, e.g. "3.5". */
  implementation_timeline_yrs?: string;
  action_lifespan_yrs?: string;
};

export type Plans = { plans?: PlanItem[] };
