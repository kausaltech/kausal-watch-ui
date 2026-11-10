import { useFormatter, useTranslations } from 'next-intl';

import type { Figure, Hazard, SubScore } from '../model';

/** Formats the section's scores, figures and dates for display. */
export function useAdaptationFormat() {
  const t = useTranslations();
  const format = useFormatter();

  /** Formats a value that is already in percent, e.g. 2.1 for 2.1%. */
  const percent = (value: number) =>
    format.number(value / 100, { style: 'percent', maximumFractionDigits: 1 });

  const figureValue = (figure: Figure): string => {
    const { value } = figure;
    if (typeof value === 'string') return value;
    switch (figure.format) {
      case 'percent':
        return percent(value);
      case 'usd':
        return format.number(value, {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
          maximumFractionDigits: 1,
        });
      case 'fahrenheit':
        return `${format.number(value, { maximumFractionDigits: 1 })}\u00a0°F`;
      default: {
        const formatted = format.number(value, { maximumFractionDigits: 1 });
        return figure.total == null
          ? formatted
          : t('adaptation-figure-of-total', {
              value: formatted,
              total: format.number(figure.total),
            });
      }
    }
  };

  return {
    hazardName: (hazard: Pick<Hazard, 'key'>) => t(`adaptation-hazard-${hazard.key}`),
    /** The hazard's name for use inside a sentence. */
    hazardNameInline: (hazard: Pick<Hazard, 'key'>) => t(`adaptation-hazard-inline-${hazard.key}`),
    /** "Moderate · 5/10", or "Not assessed" for a hazard without a score. */
    scoreLabel: (hazard: Pick<Hazard, 'score' | 'level'>) =>
      hazard.score == null || hazard.level == null
        ? t('adaptation-not-assessed')
        : t('adaptation-score', {
            level: t(`adaptation-level-${hazard.level}`),
            score: hazard.score,
          }),
    summary: (hazard: Pick<Hazard, 'summary'>): string | null => {
      const { summary } = hazard;
      if (!summary) return null;
      const values = { ...summary.values };
      if (typeof values.percent === 'number') values.percent = percent(values.percent);
      return t(`adaptation-summary-${summary.id}`, values);
    },
    subScoreName: (subScore: SubScore) => {
      const name = t(`adaptation-subscore-${subScore.id}`);
      return subScore.year == null
        ? name
        : t('adaptation-subscore-year', { name, year: String(subScore.year) });
    },
    figureLabel: (figure: Figure) => {
      const label = t(`adaptation-figure-${figure.id}`);
      return figure.year == null
        ? label
        : t('adaptation-figure-year', { label, year: String(figure.year) });
    },
    figureValue,
    date: (iso: string) => format.dateTime(new Date(iso), { dateStyle: 'long' }),
    relativeTime: (iso: string, now: string) => format.relativeTime(new Date(iso), new Date(now)),
  };
}
