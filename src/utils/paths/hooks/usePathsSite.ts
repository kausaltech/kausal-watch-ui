import { useMemo } from 'react';

import { usePaths } from '@/context/paths/paths';

/**
 * Scenario info for the baseline and progress lines of kausal_common's
 * `DimensionalNodeVisualisation`. Null without a Paths instance.
 *
 * Only fields that don't change when the active scenario does are passed.
 */
export function usePathsSite() {
  const paths = usePaths();
  return useMemo(() => {
    if (!paths) return null;
    const { instance, scenarios } = paths;
    return {
      scenarios: scenarios.map(({ id, kind, actualHistoricalYears }) => ({
        id,
        kind,
        actualHistoricalYears,
      })),
      baselineName: scenarios.find((scenario) => scenario.id === 'baseline')?.name,
      minYear: instance.minimumHistoricalYear,
    };
  }, [paths]);
}
