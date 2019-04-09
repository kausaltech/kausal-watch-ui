import React from 'react';
import dynamic from 'next/dynamic';
import { Progress } from 'reactstrap';
import { withSize } from 'react-sizeme';
import styled, { withTheme } from 'styled-components';


const Timeline = ({ schedules, allSchedules, size, theme }) => {
  if (!process.browser) {
    return null;
  }

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

  const startYear = parseInt(minDate.split('-')[0], 10);
  const endYear = parseInt(maxDate.split('-')[0], 10);

  const Plot = dynamic(import('react-plotly.js'));
  const data = [
    {
      x: [actStartDate, actEndDate],
      y: [1, 1],
      type: 'scatter',
      mode: 'lines',
      line: {
        width: 18,
        color: theme.brandDark,
      },
    },
  ];
  const layout = {
    showlegend: false,
    showline: true,
    zeroline: true,
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
      dtick: endYear - startYear > 10 ? 'M36' : 'M12',
      ticks: '',
      showgrid: false,
      tickfont: {
        family: 'HelsinkiGrotesk',
        size: 10,
      },
    },
    yaxis: {
      ticks: '',
      visible: false,
    },
    plot_bgcolor: '#e9ecef',
    width: size.width,
    height: 28,
    autosize: true,
  };

  return (
    <Plot data={data} layout={layout} config={{ staticPlot: true }} />
  );
};

export default withTheme(withSize()(Timeline));
