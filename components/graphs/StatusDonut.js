import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import Card from 'components/common/Card';

const GraphCard = styled.div`
  padding: 1rem;
  margin: 1rem;
  max-width: 260px;
`;

const GraphHeader = styled.h2`
  font-size: 20px;
`;

const StatusDonut = (props) => {
  const {
    data,
    currentValue,
    colors,
    header,
  } = props;
  const theme = useTheme();
  const { i18n } = useTranslation();

  if (!process.browser) {
    return null;
  }

  const Plot = dynamic(import('./Plot'));

  const pieData = data;
  pieData.domain = { column: 0 };
  pieData.hoverinfo = 'label+value+percent';
  pieData.hovertemplate = '%{label}<br>%{value}<br>%{percent:.0%}<extra></extra>';
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
  pieData.autoMargin = true;

  const pieLayout = {
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
    height: 175,
    width: 175,
    showlegend: false,
    colorway: plotColors,
    paper_bgcolor: 'rgba(0,0,0,0)',
    margin: {"t": 0, "b": 0, "l": 0, "r": 0},
  };
  const config = {
    locale: i18n.language,
    locales: {
      fi: {
        format: {
          decimal: ',',
          thousands: ' ',
          grouping: [3],
        },
      },
    },
  };
  return (
    <GraphCard>
      <GraphHeader>{header}</GraphHeader>
      <Plot data={[pieData]} layout={pieLayout} config={config} />
    </GraphCard>
  );
};

export default StatusDonut;
