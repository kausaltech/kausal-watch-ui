import { useMemo } from 'react';

import { useTheme } from '@emotion/react';

import { useLocale, useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

type Schedule = {
  beginsAt: string;
  endsAt: string | null;
};

type ScheduleTimelineProps = {
  schedules: Schedule[];
  allSchedules: Schedule[];
};

/** The earliest start and the latest end of the schedules, as ISO dates */
function getRange(schedules: Schedule[]) {
  let start: string | undefined;
  let end: string | undefined;
  schedules.forEach((sch) => {
    const endsAt = sch.endsAt ?? sch.beginsAt;
    if (!start || sch.beginsAt < start) start = sch.beginsAt;
    if (!end || endsAt > end) end = endsAt;
  });
  return start && end ? { start, end } : null;
}

const getYear = (date: string) => parseInt(date.split('-')[0], 10);

/**
 * A bar showing the action's schedules within the range of all the plan's
 * schedules. Purely visual: the range is given as text for screen readers.
 */
const ScheduleTimeline = ({ schedules, allSchedules }: ScheduleTimelineProps) => {
  const t = useTranslations();
  const theme = useTheme();
  const locale = useLocale();

  const actionRange = useMemo(() => getRange(schedules), [schedules]);
  const option = useMemo((): ECOption | null => {
    const planRange = getRange(allSchedules);
    if (!planRange || !actionRange) return null;
    const nrYears = getYear(planRange.end) - getYear(planRange.start);
    const tickInterval = (nrYears > 10 ? 3 : 1) * YEAR_MS;

    return {
      animation: false,
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 12,
        // The grid background is the track for the plan's whole range
        show: true,
        backgroundColor: theme.themeColors.light,
        borderWidth: 0,
      },
      xAxis: {
        type: 'time',
        min: planRange.start,
        max: planRange.end,
        minInterval: tickInterval,
        maxInterval: tickInterval,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          formatter: '{yyyy}',
          fontFamily: theme.fontFamilyTiny,
          fontSize: 10,
          margin: 2,
          hideOverlap: true,
        },
      },
      yAxis: { type: 'value', show: false },
      series: [
        {
          type: 'line',
          data: [],
          silent: true,
          // The action's range, covering the full height of the track
          markArea: {
            silent: true,
            itemStyle: { color: theme.brandDark, opacity: 1 },
            data: [[{ xAxis: actionRange.start }, { xAxis: actionRange.end }]],
          },
        },
      ],
    };
  }, [allSchedules, actionRange, theme]);

  if (!option || !actionRange) return null;

  const description = `${t('action-timeline-between')} ${getYear(actionRange.start)} - ${getYear(
    actionRange.end
  )}`;

  return (
    <div role="presentation">
      <span className="visually-hidden">{description}</span>
      <div aria-hidden>
        <Chart
          data={option}
          isLoading={false}
          height="36px"
          withResizeLegend={false}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default ScheduleTimeline;
