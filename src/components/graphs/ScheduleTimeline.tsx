import dynamic from 'next/dynamic';

import { useTheme } from '@emotion/react';

import { useTranslations } from 'next-intl';
import type { PlotParams } from 'react-plotly.js';

const Plot = dynamic(() => import('./Plot'), { ssr: false });

type Schedule = {
  beginsAt: string;
  endsAt: string | null;
};

type ScheduleTimelineProps = {
  schedules: Schedule[];
  allSchedules: Schedule[];
};

const ScheduleTimeline = ({ schedules, allSchedules }: ScheduleTimelineProps) => {
  const t = useTranslations();
  const theme = useTheme();

  let minDate: string | undefined;
  let maxDate: string | undefined;
  allSchedules.forEach((sch) => {
    const endsAt = sch.endsAt ?? sch.beginsAt;
    if (!minDate || sch.beginsAt < minDate) {
      minDate = sch.beginsAt;
    }
    if (!maxDate || endsAt > maxDate) {
      maxDate = endsAt;
    }
  });

  let actStartDate: string | undefined;
  let actEndDate: string | undefined;
  schedules.forEach((sch) => {
    const endsAt = sch.endsAt ?? sch.beginsAt;
    if (!actStartDate || sch.beginsAt < actStartDate) {
      actStartDate = sch.beginsAt;
    }
    if (!actEndDate || endsAt > actEndDate) {
      actEndDate = endsAt;
    }
  });

  if (!minDate || !maxDate || !actStartDate || !actEndDate) return null;

  const yearrange = `${parseInt(actStartDate.split('-')[0], 10)} - ${parseInt(
    actEndDate.split('-')[0],
    10
  )}`;
  const description = `${t('action-timeline-between')} ${yearrange}`;

  const startYear = parseInt(minDate.split('-')[0], 10);
  const endYear = parseInt(maxDate.split('-')[0], 10);
  const nrYears = endYear - startYear;
  const dtick = nrYears > 10 ? 'M36' : 'M12';

  const data: PlotParams['data'] = [
    {
      x: [actStartDate, actEndDate],
      y: [1, 1],
      type: 'scatter',
      mode: 'lines',
      line: {
        width: 24,
        color: theme.brandDark,
      },
    },
  ];
  const layout: PlotParams['layout'] = {
    showlegend: false,
    margin: {
      l: 0,
      r: 0,
      t: 0,
      b: 12,
    },
    xaxis: {
      range: [minDate, maxDate],
      autorange: false,
      tickformat: '         %Y', // FUUUUUU
      dtick,
      ticks: '',
      tickangle: 0,
      showgrid: false,
      tickfont: {
        family: `${theme.fontFamilyTiny}`,
        size: 10,
      },
    },
    yaxis: {
      visible: false,
    },
    plot_bgcolor: theme.themeColors.light,
    height: 36,
    autosize: true,
  };

  return (
    <div role="presentation">
      <span className="visually-hidden">{description}</span>
      <div aria-hidden>
        <Plot
          data={data}
          layout={layout}
          config={{ staticPlot: true }}
          style={{ width: '100%' }}
          useResizeHandler
        />
      </div>
    </div>
  );
};

export default ScheduleTimeline;
