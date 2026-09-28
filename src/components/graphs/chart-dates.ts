/**
 * Date handling shared by the IndicatorGraph and the dashboard chart blocks.
 *
 * Date-string handling must be timezone-proof. ECharts parses timezone-less
 * date strings as LOCAL time with its own parser (unlike native `Date`,
 * which treats ISO date-only strings as UTC midnight) — so tick timestamps
 * and hovered data points sit on local calendar boundaries. Format date
 * STRINGS by extracting their calendar parts textually (never through
 * `Date`, whose UTC/local behavior depends on the string format), and
 * format tick TIMESTAMPS with local getters, matching how ECharts placed
 * them.
 */

export type TimeResolution = 'YEAR' | 'MONTH' | 'DAY' | undefined;

const DATE_PARTS_RE = /^(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?$/;

/** Whether a string is a timezone-less calendar date: YYYY, YYYY-MM or YYYY-MM-DD. */
export const isCalendarDate = (value: string): boolean => DATE_PARTS_RE.test(value);

export function normalizeDate(
  d: string | number | null | undefined,
  timeResolution: TimeResolution
): string {
  // Normalized dates use the ISO-padded YYYY-01-01 form; ECharts parses it
  // as local time like every other timezone-less date string it receives.
  // Null dates (schema-permitted) must not fall into Date parsing, where
  // new Date(null) would silently become the 1970 epoch.
  if (d == null) {
    return String(d);
  }
  if (typeof d === 'number') {
    // If it's a number (likely a year), treat it as one
    if (d > 1900 && d < 2100) {
      return `${d}-01-01`;
    }
    return String(d);
  }
  const parts = DATE_PARTS_RE.exec(d);
  if (parts) {
    if (timeResolution === 'YEAR') {
      return `${parts[1]}-01-01`;
    }
    return d;
  }
  const dateObj = new Date(d);
  if (Number.isNaN(dateObj.getTime())) {
    return String(d);
  }
  if (timeResolution === 'YEAR') {
    return `${dateObj.getUTCFullYear()}-01-01`;
  }
  return d;
}

/** Format a date (string, timestamp or Date) as an axis/tooltip label. */
export function formatDateLabel(
  value: string | number | Date | null | undefined,
  timeResolution: TimeResolution
): string {
  if (value == null) {
    return String(value);
  }
  if (typeof value === 'string') {
    const parts = DATE_PARTS_RE.exec(value);
    if (parts) {
      if (timeResolution === 'YEAR') {
        return parts[1];
      }
      const month = (parts[2] ?? '1').padStart(2, '0');
      if (timeResolution === 'MONTH') {
        return `${parts[1]}-${month}`;
      }
      return `${parts[1]}-${month}-${(parts[3] ?? '1').padStart(2, '0')}`;
    }
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  // Timestamps come from ECharts' local-calendar tick placement — read them
  // back with local getters (toISOString would shift the period near
  // midnight boundaries in non-UTC timezones)
  if (timeResolution === 'YEAR') {
    return String(date.getFullYear());
  }
  if (timeResolution === 'MONTH') {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** Timestamp of a date as ECharts places it (local midnight for date strings). */
export function parseChartDate(value: string | number): number {
  const parts = typeof value === 'string' ? DATE_PARTS_RE.exec(value) : null;
  if (parts) {
    return new Date(+parts[1], +(parts[2] ?? 1) - 1, +(parts[3] ?? 1)).getTime();
  }
  return new Date(value).getTime();
}

/** Chronological order; unparseable values sort textually. */
export const compareDates = (a: string | number, b: string | number): number => {
  const dateA = parseChartDate(a);
  const dateB = parseChartDate(b);
  if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
    return String(a).localeCompare(String(b));
  }
  return dateA - dateB;
};

/** Whether all (time) dates fall within one calendar year. */
export function datesSpanSingleYear(allDates: Array<string | number | null>): boolean {
  const years = new Set<string>();
  allDates.forEach((date) => {
    const year = formatDateLabel(date, 'YEAR');
    if (/^\d{4}$/.test(year)) {
      years.add(year);
    }
  });
  return years.size === 1;
}
