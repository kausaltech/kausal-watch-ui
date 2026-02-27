'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useReactiveVar } from '@apollo/client';
import { isEqual } from 'lodash-es';

import { activeGoalVar } from '@common/apollo/paths-cache';
import {
  downloadData,
  flatten,
  getDefaultSliceConfig,
  parseMetric,
  sliceBy,
  updateChoice,
} from '@common/utils/paths/metric';
import type {
  ExportOptions,
  InstanceGoalInput,
  MetricDimension,
  MetricInput,
  MetricSliceData,
  ParsedMetric,
  SliceConfig,
} from '@common/utils/paths/metric';

type UseDimensionalMetricOptions = {
  /** Sync slice config with active goal changes (default: true) */
  syncWithGoal?: boolean;
};

type UseDimensionalMetricReturn = {
  /** The parsed metric data */
  metric: ParsedMetric;
  /** Current slice configuration */
  sliceConfig: SliceConfig;
  /** Update the slice config */
  setSliceConfig: React.Dispatch<React.SetStateAction<SliceConfig>>;
  /** Get a slice of data based on current config */
  getSlice: (years?: readonly number[]) => MetricSliceData | null;
  /** Update dimension choice and get new config */
  handleChoiceUpdate: (dim: MetricDimension, newChoice: readonly { id: string }[]) => void;
  /** Download data in specified format */
  handleDownload: (format: 'xlsx' | 'csv', options?: ExportOptions) => Promise<void>;
};

/**
 * React hook for working with dimensional metrics.
 *
 * Provides parsed metric data, slice configuration management,
 * and utilities for slicing and downloading data.
 *
 * @param metricData - The raw metric data from GraphQL
 * @param options - Hook options
 * @returns Hook return object with metric, config, and utilities
 */
export function useDimensionalMetric(
  metricData: MetricInput,
  options: UseDimensionalMetricOptions = {}
): UseDimensionalMetricReturn {
  const { syncWithGoal = true } = options;
  const activeGoal = useReactiveVar(activeGoalVar) as InstanceGoalInput | null;

  // Parse metric once when data changes
  const metric = useMemo(() => parseMetric(metricData), [metricData]);

  // Initialize slice config based on active goal
  const defaultConfig = useMemo(
    () => getDefaultSliceConfig(metric, activeGoal),
    [metric, activeGoal]
  );

  const [sliceConfig, setSliceConfig] = useState<SliceConfig>(defaultConfig);

  // Sync with goal changes if enabled
  useEffect(() => {
    if (!syncWithGoal || !activeGoal) return;
    const newDefault = getDefaultSliceConfig(metric, activeGoal);
    if (!isEqual(sliceConfig, newDefault)) {
      setSliceConfig(newDefault);
    }
  }, [syncWithGoal, activeGoal, metric, sliceConfig]);

  // Memoized slice getter
  const getSlice = useCallback(
    (years?: readonly number[]): MetricSliceData | null => {
      if (sliceConfig.dimensionId) {
        return sliceBy(metric, sliceConfig.dimensionId, true, sliceConfig.categories, true, years);
      }
      return flatten(metric, sliceConfig.categories, years);
    },
    [metric, sliceConfig]
  );

  // Choice update handler
  const handleChoiceUpdate = useCallback(
    (dim: MetricDimension, newChoice: readonly { id: string }[]) => {
      setSliceConfig((old) => updateChoice(metric, dim, old, newChoice));
    },
    [metric]
  );

  // Download handler
  const handleDownload = useCallback(
    async (format: 'xlsx' | 'csv', options?: ExportOptions) => {
      await downloadData(metric, sliceConfig, format, options);
    },
    [metric, sliceConfig]
  );

  return {
    metric,
    sliceConfig,
    setSliceConfig,
    getSlice,
    handleChoiceUpdate,
    handleDownload,
  };
}
