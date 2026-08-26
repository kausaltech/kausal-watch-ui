import {
  canNormalize,
  getNormalizedUnit,
  getNormalizedValue,
  normalizesByDefault,
} from '../indicatorShowcase.utils';

const POPULATION_ID = '44';

const indicator = {
  common: {
    normalizations: [
      {
        normalizer: { id: POPULATION_ID, identifier: 'population' },
        unit: { shortName: 't CO₂äqu/Einw.', name: 't CO₂-Äqu./Einw.' },
      },
    ],
  },
};

const point = (value: number) => ({
  normalizedValues: [{ normalizerId: POPULATION_ID, value }],
});

describe('getNormalizedValue', () => {
  it('returns the value normalized by population', () => {
    expect(getNormalizedValue(point(6.252), indicator)).toBe(6.252);
  });

  it('returns 0 when the normalized value is 0', () => {
    expect(getNormalizedValue(point(0), indicator)).toBe(0);
  });

  it('returns undefined when the indicator has no population normalizer', () => {
    const other = {
      common: {
        normalizations: [
          {
            normalizer: { id: '99', identifier: 'area' },
            unit: { shortName: 't/km²', name: null },
          },
        ],
      },
    };
    expect(getNormalizedValue(point(6.252), other)).toBeUndefined();
  });

  it('returns undefined when the data point carries no normalized values', () => {
    expect(getNormalizedValue({ normalizedValues: [] }, indicator)).toBeUndefined();
  });

  it('returns undefined when the stored normalized value is null', () => {
    expect(
      getNormalizedValue(
        { normalizedValues: [{ normalizerId: POPULATION_ID, value: null }] },
        indicator
      )
    ).toBeUndefined();
  });

  it('returns undefined when the normalizer ids do not match', () => {
    expect(
      getNormalizedValue({ normalizedValues: [{ normalizerId: '99', value: 1 }] }, indicator)
    ).toBeUndefined();
  });
});

describe('getNormalizedUnit', () => {
  it('prefers the short name', () => {
    expect(getNormalizedUnit(indicator)).toBe('t CO₂äqu/Einw.');
  });

  it('returns an empty string without a population normalizer', () => {
    expect(getNormalizedUnit({ common: null })).toBe('');
  });
});

describe('canNormalize', () => {
  it('is true when the whole series is normalized', () => {
    expect(canNormalize(point(6.252), point(5.344), point(2.5), indicator)).toBe(true);
  });

  it('is true when the goal normalizes to zero', () => {
    expect(canNormalize(point(6.252), point(5.344), point(0), indicator)).toBe(true);
  });

  it('is true when a measured value normalizes to zero', () => {
    expect(canNormalize(point(0), point(5.344), point(2.5), indicator)).toBe(true);
  });

  it('is false when the goal is not normalized', () => {
    expect(canNormalize(point(6.252), point(5.344), { normalizedValues: [] }, indicator)).toBe(
      false
    );
  });

  it('is false when there is no goal at all', () => {
    expect(canNormalize(point(6.252), point(5.344), undefined, indicator)).toBe(false);
  });
});

describe('normalizesByDefault', () => {
  it('is true when the block asks for it and the data supports it', () => {
    expect(normalizesByDefault(true, true)).toBe(true);
  });

  it('is false when the block does not ask for it', () => {
    expect(normalizesByDefault(true, false)).toBe(false);
  });

  it('is false when the block setting is unset', () => {
    expect(normalizesByDefault(true, null)).toBe(false);
    expect(normalizesByDefault(true, undefined)).toBe(false);
  });

  it('is false when the data cannot be normalized, whatever the block says', () => {
    expect(normalizesByDefault(false, true)).toBe(false);
  });
});
