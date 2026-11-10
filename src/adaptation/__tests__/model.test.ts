import { buildHazards, buildMeasures, getLatestUpdate, matchHazards } from '../model';
import type { Assessment } from '../providers/ria/types';

const meta = (source: string, updated: string) => ({ source, last_updated_at: updated });

/** An inland community, shaped like a live assessment response. */
const inlandAssessment: Assessment = {
  hazards: {
    flood: {
      available: true,
      hazardScore: 3,
      coastalActive: false,
      floodScoreV3: {
        coastalActivation: { active: false, reason: 'inland' },
        components: {
          riverine: { score: 3, apiHealthy: true },
          pluvial: { score: 2, apiHealthy: true },
          coastal: { score: 0, apiHealthy: false },
        },
      },
      summaryData: { sfhaPercent: 2.1, estimatedPopulationAtRisk: 319 },
      meta: meta('FEMA NFHL', '2026-11-10T14:01:26.216Z'),
    },
    heat: {
      available: true,
      hazardScore: 5,
      current: { hazardScore: 5, year: 2026, summaryData: { averageTemperature: 85.3 } },
      future: { hazardScore: 6, year: 2050, summaryData: {} },
      meta: meta('Open-Meteo', '2026-11-10T14:01:25.578Z'),
    },
    wildfire: { available: true, hazardScore: 0, summaryData: { numberOfFires: 0 } },
    air_quality: { available: false, error: 'upstream timeout', hazardScore: 4 },
  },
};

const byKey = (assessment: Assessment) =>
  Object.fromEntries(buildHazards(assessment).map((hazard) => [hazard.key, hazard]));

describe('buildHazards', () => {
  it('lists hazards by score, with unassessed ones last', () => {
    const keys = buildHazards(inlandAssessment).map((hazard) => hazard.key);
    expect(keys).toEqual(['heat', 'flood', 'wildfire', 'air_quality']);
  });

  it('gives an unavailable hazard no score, even when the payload carries one', () => {
    const { air_quality: air } = byKey(inlandAssessment);
    expect(air).toMatchObject({ score: null, level: null, figures: [], summary: null });
  });

  it('keeps a score of zero as a score', () => {
    expect(byKey(inlandAssessment).wildfire).toMatchObject({ score: 0, level: 'none' });
  });

  it('marks coastal flooding as not applicable inland instead of scoring it zero', () => {
    expect(byKey(inlandAssessment).flood.subScores).toEqual([
      { id: 'flood-pluvial', state: 'scored', score: 2 },
      { id: 'flood-riverine', state: 'scored', score: 3 },
      { id: 'flood-coastal', state: 'not-applicable' },
    ]);
  });

  it('marks a flood component as not assessed when its source failed', () => {
    const assessment: Assessment = {
      hazards: {
        flood: {
          hazardScore: 6,
          floodScoreV3: {
            coastalActivation: { active: true },
            components: {
              riverine: { score: 0, apiHealthy: false },
              pluvial: { score: 4, apiHealthy: true },
              coastal: { score: 7, apiHealthy: true },
            },
          },
        },
      },
    };
    expect(byKey(assessment).flood.subScores).toEqual([
      { id: 'flood-pluvial', state: 'scored', score: 4 },
      { id: 'flood-riverine', state: 'not-assessed' },
      { id: 'flood-coastal', state: 'scored', score: 7 },
    ]);
  });

  it('leaves out figures the payload lacks', () => {
    const { flood, heat } = byKey(inlandAssessment);
    expect(flood.figures.map((figure) => figure.id)).toEqual([
      'flood-sfha-area',
      'flood-population',
    ]);
    expect(heat.figures).toEqual([
      { id: 'heat-average-temperature', format: 'fahrenheit', value: 85.3, year: 2026 },
    ]);
  });

  it('adds value at risk to the flood figures, without a count of facilities when none exist', () => {
    const [, flood] = buildHazards(inlandAssessment, {
      value_at_risk: {
        summaryText: 'An estimated $45.3M is at risk.',
        residential: { housing_units_at_risk: 116 },
        public_assets: { total: { total: 0, at_risk: 0 } },
      },
    });
    expect(flood.narrative).toBe('An estimated $45.3M is at risk.');
    expect(flood.figures.map((figure) => figure.id)).toEqual([
      'flood-sfha-area',
      'flood-population',
      'flood-housing-units',
    ]);
  });

  it('writes no summary for wildfire', () => {
    const { wildfire, heat } = byKey(inlandAssessment);
    expect(wildfire.summary).toBeNull();
    expect(heat.summary).toEqual({ id: 'heat', values: { score: 6, year: 2050 } });
  });
});

describe('getLatestUpdate', () => {
  it('returns the most recent hazard update', () => {
    expect(getLatestUpdate(buildHazards(inlandAssessment))).toBe('2026-11-10T14:01:26.216Z');
  });

  it('returns null when no hazard has an update time', () => {
    expect(getLatestUpdate(buildHazards({ hazards: { drought: { hazardScore: 1 } } }))).toBeNull();
  });
});

describe('matchHazards', () => {
  it.each([
    ['Heat/Smoke/IAQ/Drought (soil moisture)', ['heat', 'drought', 'air_quality']],
    ['Flooding/Heat/stormwater runoff', ['flood', 'heat']],
    ['Heat/Air quality/Drought', ['heat', 'drought', 'air_quality']],
    ['outages/Heat', ['heat']],
    ['', []],
  ])('reads %p as %p', (text, expected) => {
    expect(matchHazards(text)).toEqual(expected);
  });
});

describe('buildMeasures', () => {
  it('parses numbers that arrive as strings, and never reads owner or cost', () => {
    const [measure] = buildMeasures([
      {
        stable_id: 'a1',
        action_title: 'Green streets',
        description_short: 'Short',
        addressed_hazards: 'Flood/Heat',
        match_score: 80,
        implementation_timeline_yrs: '7.5',
        action_lifespan_yrs: 'NA',
        ...{ cost_range: '100-200', lead_department: 'Public Works' },
      },
    ]);
    expect(measure).toEqual({
      id: 'a1',
      name: 'Green streets',
      summary: 'Short',
      description: null,
      hazards: ['flood', 'heat'],
      otherHazards: null,
      matchScore: 80,
      timelineYears: 7.5,
      lifespanYears: null,
    });
  });

  it('orders by match score and skips items without an id or a name', () => {
    const measures = buildMeasures([
      { stable_id: 'low', action_title: 'Low', match_score: 76 },
      { action_title: 'No id' },
      { stable_id: 'high', action_title: 'High', match_score: 100 },
    ]);
    expect(measures.map((measure) => measure.id)).toEqual(['high', 'low']);
  });
});
