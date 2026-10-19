import { useMemo } from 'react';

import { usePaths } from '@/context/paths/paths';

/**
 * The plan's Paths scenarios with the baseline name and the first year of
 * the model, as kausal_common's `DimensionalNodeVisualisation` takes them for
 * its baseline and progress tracking lines. Null without a Paths instance.
 */
export function usePathsSite() {
  const paths = usePaths();
  return useMemo(() => {
    if (!paths) return null;
    const { instance, scenarios } = paths;
    return {
      scenarios,
      baselineName: scenarios.find((scenario) => scenario.id === 'baseline')?.name,
      minYear: instance.minimumHistoricalYear,
    };
  }, [paths]);
}
