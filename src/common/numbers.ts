import { useCallback, useMemo } from 'react';

import { useLocale } from 'next-intl';

import { formatWithFormatter, makeFormatter } from '@common/utils/format';

import { usePaths } from '@/context/paths/paths';

export const DEFAULT_SIGNIFICANT_DIGITS = 2;

/**
 * Returns a locale-aware axis label formatter for ECharts.
 * Applies locale decimal and thousands separators, leaving precision to ECharts' auto-scaling.
 * Use this for yAxis/xAxis axisLabel.formatter — not for tooltips or other formatted values.
 *
 * @example
 * const formatAxisLabel = useAxisLabelFormatter();
 * yAxis: { axisLabel: { formatter: formatAxisLabel } }
 * // With appended unit:
 * yAxis: { axisLabel: { formatter: (v) => `${formatAxisLabel(v)} kt` } }
 */
export function useAxisLabelFormatter() {
  const locale = useLocale();
  const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  return useCallback((value: number) => formatter.format(value), [formatter]);
}

/**
 * Returns a locale- and instance-settings-aware number formatter function.
 * Significant digits and fraction digits are read from the paths instance context when scope is
 * 'paths', or can be passed explicitly. Per-call overrides are also supported.
 * Falls back to DEFAULT_SIGNIFICANT_DIGITS when neither significant digits nor fraction digits
 * are provided.
 *
 * @param options - 'paths' scope reads significantDigits and fractionDigits from paths context.
 *                  Otherwise pass explicit values or omit for defaults.
 *
 * @example
 * const formatNumber = useNumberFormatter({ scope: 'paths' });
 * formatNumber(1234.5)                              // uses paths instance settings
 * formatNumber(1234.5, 2)                           // override: 2 significant digits
 * formatNumber(1234.5, undefined, 0)               // override: round to integer
 */
export default function useNumberFormatter(
  options: {
    scope?: 'paths';
    maximumSignificantDigits?: number;
    maximumFractionDigits?: number;
  } = {}
) {
  const locale = useLocale();
  const pathsInstance = usePaths();

  const isPathsScope = options.scope === 'paths';
  const maximumSignificantDigits =
    typeof options.maximumSignificantDigits === 'number'
      ? options.maximumSignificantDigits
      : isPathsScope
        ? (pathsInstance?.instance.features.showSignificantDigits ?? undefined)
        : undefined;
  const maximumFractionDigits =
    typeof options.maximumFractionDigits === 'number'
      ? options.maximumFractionDigits
      : isPathsScope
        ? (pathsInstance?.instance.features.maximumFractionDigits ?? undefined)
        : undefined;

  // Create default formatter based on instance settings or options, memoized for performance.
  const formatter = useMemo(
    () =>
      makeFormatter(
        locale,
        maximumSignificantDigits ??
          (typeof maximumFractionDigits === 'number' ? undefined : DEFAULT_SIGNIFICANT_DIGITS),
        maximumFractionDigits
      ),
    [locale, maximumSignificantDigits, maximumFractionDigits]
  );

  // If callback receives overrides, create a new formatter for that call; otherwise use the memoized default.
  return useCallback(
    (
      value: number,
      significantDigitsOverride?: number,
      fractionDigitsOverride?: number,
      localeOverride?: string
    ) => {
      if (
        typeof fractionDigitsOverride === 'number' ||
        typeof significantDigitsOverride === 'number' ||
        localeOverride
      ) {
        return formatWithFormatter(
          makeFormatter(
            localeOverride ?? locale,
            significantDigitsOverride,
            fractionDigitsOverride
          ),
          value
        );
      }
      return formatWithFormatter(formatter, value);
    },
    [locale, formatter]
  );
}
