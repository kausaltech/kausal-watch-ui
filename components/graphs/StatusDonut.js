import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'common/theme';

const StatusDonut = (props) => {
  const {
    data,
    currentValue,
    colors,
    header
  } = props;
  const theme = useTheme();
  const Plot = dynamic(import('./Plot'));

  if (!process.browser) {
    return null;
  }

  const pieData = data;
  pieData.domain = { column: 0 };
  pieData.hoverinfo = 'label+value+percent';
  pieData.hole = 0.5;
  pieData.type = 'pie';
  pieData.sort = false;
  pieData.direction = 'clockwise';
  pieData.textinfo = 'none';
  const plotColors = colors || [
    theme.graphColors.green090,
    theme.graphColors.green070,
    theme.graphColors.green050,
    theme.graphColors.yellow050,
  ];

  const pieLayout = {
    title: header,
    font: {
      family: theme.fontFamily,
    },
    annotations: [
      {
        font: {
          size: 20,
        },
        showarrow: false,
        text: currentValue,
        x: 0.5,
        y: 0.5,
      },
    ],
    height: 350,
    width: 350,
    showlegend: false,
    colorway: plotColors,
  };

  return <Plot data={[pieData]} layout={pieLayout} />;
};

export default StatusDonut;
