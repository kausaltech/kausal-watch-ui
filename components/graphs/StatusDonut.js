import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'common/theme';
import { lighten } from 'polished';

const StatusDonut = (props) => {
  const { data, currentValue } = props;
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
  pieData.textinfo = 'none';
  const plotColors = [
    theme.actionOnTimeColor,
    lighten(0.15, theme.actionOnTimeColor),
    lighten(0.25, theme.actionOnTimeColor),
    theme.actionLateColor,
  ];

  //  ${(props) => lighten(0.15, props.theme.actionSeverelyLateColor)};
  const pieLayout = {
    title: 'Progress',
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
