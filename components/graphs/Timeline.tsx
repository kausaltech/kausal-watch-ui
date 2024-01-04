import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'common/dayjs';
import styled from 'styled-components';
import { Badge } from 'reactstrap';

import { useTheme } from 'styled-components';
import type { PlotParams } from 'react-plotly.js';
import { useTranslations } from 'next-intl';

const StatusTitle = styled.div`
  text-align: left;
  line-height: ${(props) => props.theme.spaces.s150};

  .badge {
    /* Awkwardly match category badges size */
    font-size: calc(1.25rem * 0.75);
    background-color: ${(props) => props.theme.brandDark} !important;
    color: ${(props) => props.theme.themeColors.white};
  }
`;

const Plot = dynamic(() => import('./Plot'), { ssr: false });

const Timeline = ({
  startDate: startDateRaw,
  endDate: endDateRaw,
  continuous = false,
}) => {
  const t = useTranslations();
  const theme = useTheme();

  const startDate = startDateRaw ? dayjs(startDateRaw) : undefined; // .format('L');
  const endDate = endDateRaw ? dayjs(endDateRaw) : undefined; // .format('L');

  const plotStartDate = dayjs().isAfter(startDate || dayjs())
    ? startDate
    : dayjs();

  const maxEndDate = dayjs('2050-01-01');
  const plotEndDate = maxEndDate.isBefore(endDate || maxEndDate)
    ? endDate
    : maxEndDate;

  const displayRange = [startDate, endDate];
  if (!startDate && endDate) displayRange[0] = endDate.subtract(2, 'month');
  if (startDate && !endDate) displayRange[1] = startDate.add(2, 'month');
  if (startDate && continuous) displayRange[1] = maxEndDate;
  if (!startDate && !endDate) {
    displayRange[1] = maxEndDate;
    displayRange[0] = dayjs();
  }
  const data = [
    {
      x: [displayRange[0]?.format(), displayRange[1]?.format()],
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
    //showline: true,
    //zeroline: true,
    margin: {
      l: 0,
      r: 0,
      t: 0,
      b: 12,
    },
    xaxis: {
      range: [plotStartDate?.format(), plotEndDate?.format()],
      autorange: false,
      tickformat: '         %Y', // FUUUUUU
      ticks: '',
      tickangle: 0,
      showgrid: false,
      tickfont: {
        family: '`${theme.fontFamilyTiny}`',
        size: 10,
      },
    },
    yaxis: {
      //ticks: "",
      visible: false,
    },
    plot_bgcolor: theme.themeColors.light,
    height: 36,
    autosize: true,
  };

  return (
    <div>
      {/* Hide plot for now, the visualisation logic pending */}
      <div aria-hidden role="presentation" style={{ display: 'none ' }}>
        <Plot
          data={data}
          layout={layout}
          config={{ staticPlot: true }}
          style={{ width: '100%' }}
          useResizeHandler
        />
      </div>
      <StatusTitle>
        {startDate && `${startDate.format('L')} \u2192 `}
        {continuous && <Badge>{`${t('action-continuous')}`}</Badge>}
        {((!startDate && endDate) || (continuous && endDate)) && ' \u2192 '}
        {endDate && `${endDate.format('L')}`}
      </StatusTitle>
    </div>
  );
};

Timeline.propTypes = {
  continuous: PropTypes.bool,
  endDate: PropTypes.string,
  startDate: PropTypes.string,
};

export default Timeline;
