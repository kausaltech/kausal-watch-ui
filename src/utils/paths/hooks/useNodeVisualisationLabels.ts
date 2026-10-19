import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import type { NodeVisualisationLabels } from '@common/components/paths/DimensionalNodeVisualisation';

/** The translated labels of kausal_common's `DimensionalNodeVisualisation` */
export function useNodeVisualisationLabels(): NodeVisualisationLabels {
  const t = useTranslations();
  return useMemo(
    () => ({
      graph: {
        total: t('plot-total'),
        goal: t('target'),
        baseline: t('plot-baseline'),
        progress: t('calculated-emissions'),
        measured: t('plot-measured'),
        comparisonYear: t('comparison-year'),
        forecast: t('table-scenario-forecast'),
      },
      prediction: t('table-scenario-forecast'),
      controls: {
        breakDownBy: t('plot-break-down-by'),
        filter: t('plot-filter'),
        filterAll: t('plot-filter-all'),
        filterNoData: t('plot-filter-no-data'),
        definition: t('definition'),
      },
      tools: {
        downloadData: t('download-data'),
        downloadError: t('download-error'),
      },
      // The units are HTML
      units: {
        'tco2-e-inhabitant': t.raw('tco2-e-inhabitant') as string,
        'ktco2-e': t.raw('ktco2-e') as string,
      },
    }),
    [t]
  );
}
