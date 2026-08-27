/**
 * Normalization helpers for IndicatorShowcaseBlock.
 *
 * Extracted from the component so the "can this indicator be shown per capita?"
 * predicate can be unit tested: it has to treat a normalized value of 0 as
 * present, which matters for every plan whose target is zero emissions.
 */

const POPULATION_NORMALIZER = 'population';

interface NormalizedValue {
  normalizerId?: string | null;
  value: number | null;
}

interface DataPoint {
  normalizedValues: readonly NormalizedValue[];
}

interface Normalization {
  normalizer: { id: string; identifier?: string | null };
  unit: { shortName?: string | null; name?: string | null };
}

interface NormalizableIndicator {
  common?: { normalizations: readonly Normalization[] } | null;
}

function findPopulationNormalizer(indicator: NormalizableIndicator): Normalization | undefined {
  return indicator.common?.normalizations.find(
    (normalization) => normalization.normalizer.identifier === POPULATION_NORMALIZER
  );
}

export function getNormalizedValue(
  indicatorValue: DataPoint | null | undefined,
  indicator: NormalizableIndicator
): number | undefined {
  const populationNormalizer = findPopulationNormalizer(indicator);
  if (!populationNormalizer || !indicatorValue || indicatorValue.normalizedValues.length === 0) {
    return undefined;
  }
  const normalized = indicatorValue.normalizedValues.find(
    (normed) => normed.normalizerId === populationNormalizer.normalizer.id
  );
  // A null value is as good as no value; callers only deal in numbers.
  return normalized?.value ?? undefined;
}

export function getNormalizedUnit(indicator: NormalizableIndicator): string {
  const populationNormalizer = findPopulationNormalizer(indicator);
  if (!populationNormalizer) {
    return '';
  }
  return populationNormalizer.unit.shortName || populationNormalizer.unit.name || '';
}

/**
 * Only offer normalization when the whole series, goal included, is available
 * per capita. A normalized value of 0 counts as available: a climate neutrality
 * goal of 0 emissions normalizes to 0 per capita.
 */
export function canNormalize(
  firstValue: DataPoint | null | undefined,
  lastValue: DataPoint | null | undefined,
  lastGoal: DataPoint | null | undefined,
  indicator: NormalizableIndicator
): boolean {
  return (
    getNormalizedValue(firstValue, indicator) != null &&
    getNormalizedValue(lastValue, indicator) != null &&
    getNormalizedValue(lastGoal, indicator) != null
  );
}

/**
 * Whether the showcase opens in the per capita view.
 *
 * Driven solely by the block's own setting: the editor decides, not the shape of
 * the data. Normalization still has to be possible at all, so an editor cannot
 * force a per capita view the data cannot support.
 */
export function normalizesByDefault(
  normalizable: boolean,
  indicatorIsNormalized: boolean | null | undefined
): boolean {
  return normalizable && indicatorIsNormalized === true;
}
