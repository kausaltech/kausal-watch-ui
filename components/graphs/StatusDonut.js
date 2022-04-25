import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import Card from 'components/common/Card';
import ContentLoader from 'components/common/ContentLoader';

const GraphCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  max-width: 260px;
`;

const GraphHeader = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const HelpText = styled.p`
  margin-bottom: ${(props) => props.theme.spaces.s200};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Plot = dynamic(
  () => import('./Plot'),
  {
    loading: () => <ContentLoader />,
    ssr: false,
  }
);

const StatusDonut = (props) => {
  const {
    data,
    currentValue,
    colors,
    header,
    helpText,
  } = props;
  const theme = useTheme();
  const { i18n } = useTranslation();

  if (!process.browser) {
    return null;
  }

  const pieData = {
    values: [...data.values],
    labels: [...data.labels],
    domain: { column: 0 },
    hoverinfo: 'label+value+percent',
    hovertemplate: '%{label}<br>%{value}<br>%{percent:.0%}<extra></extra>',
    hole: 0.5,
    type: 'pie',
    sort: false,
    direction: 'clockwise',
    textinfo: 'none',
    marker: {
      colors: [...colors],
    },
    autoMargin: true,
  };
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
      <HelpText>{ helpText }</HelpText>
      <Plot data={[pieData]} layout={pieLayout} config={config} />
    </GraphCard>
  );
};

export default StatusDonut;
