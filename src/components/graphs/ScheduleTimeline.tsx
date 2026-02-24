import React from 'react';

import dynamic from 'next/dynamic';

import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import type { PlotParams } from 'react-plotly.js';

const Plot = dynamic(() => import('./Plot'), { ssr: false });

const ScheduleTimeline = ({ schedules, allSchedules }) => {
  const t = useTranslations();
  const theme = useTheme();

  let minDate;
  let maxDate;
  allSchedules.forEach((sch) => {
    if (!minDate || sch.beginsAt < minDate) {
      minDate = sch.beginsAt;
    }
    if (!maxDate || sch.endsAt > maxDate) {
      maxDate = sch.endsAt;
    }
  });

  let actStartDate;
  let actEndDate;
  schedules.forEach((sch) => {
    if (!actStartDate || sch.beginsAt < actStartDate) {
      actStartDate = sch.beginsAt;
    }
    if (!actEndDate || sch.endsAt > actEndDate) {
      actEndDate = sch.endsAt;
    }
  });

  const yearrange = `${parseInt(actStartDate.split('-')[0], 10)} - ${parseInt(
    actEndDate.split('-')[0],
    10
  )}`;
  const description = `${t('action-timeline-between')} ${yearrange}`;

  const startYear = parseInt(minDate.split('-')[0], 10);
  const endYear = parseInt(maxDate.split('-')[0], 10);
  const nrYears = endYear - startYear;
  let dtick;

  if (nrYears > 10) dtick = 'M36';
  else dtick = 'M12';

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
