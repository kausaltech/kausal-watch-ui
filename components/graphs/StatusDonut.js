import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

import Card from 'components/common/Card';
import ContentLoader from 'components/common/ContentLoader';
import Modal from 'components/common/Modal';
import Icon from 'components/common/Icon';
import { useTranslations } from 'next-intl';

const GraphCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  max-width: 260px;
  cursor: pointer;
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
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const PlotWrapper = styled.div`
  position: relative;
`;

const OpenModalButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
  align-item: center;
  justify-content: center;
  z-index: 2;
  border: none;
  font-size: 20px;
  display: inline-block;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: ${(props) => props.theme.btnBorderRadius};

  ${GraphCard}:hover & {
    opacity: 1;
  }
  svg {
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const Plot = dynamic(() => import('./Plot'), {
  loading: () => <ContentLoader />,
  ssr: false,
});

const StatusDonut = (props) => {
  const { data, currentValue, colors, header, helpText } = props;
  const theme = useTheme();
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isServer = typeof window === 'undefined';
  if (isServer) {
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
      family: theme.fontFamilyTiny,
    },
    annotations: !!currentValue
      ? [
          {
            font: {
              size: 20,
            },
            showarrow: false,
            text: currentValue,
            x: 0.5,
            y: 0.5,
          },
        ]
      : undefined,
    height: 175,
    width: 175,
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 0, b: 20, l: 0, r: 0 },
  };
  const config = {
    displaylogo: false,
    locale: t.language,
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

  if (
    data.hoverTexts != null &&
    data.hoverTexts.length === data.values.length
  ) {
    pieData.hoverinfo = 'text';
    pieData.text = data.hoverTexts;
    pieData.hovertemplate = null;
  }
  const pieDataWithTextOnGraph = {
    ...pieData,
    textinfo: 'percent',
  };
  if (data.texts != null && data.texts.length === data.values.length) {
    pieDataWithTextOnGraph.textinfo = 'text';
    pieDataWithTextOnGraph.text = data.texts;
  }

  const pieLayoutWithLegend = {
    ...pieLayout,
    height: 350,
    width: 350,
    showlegend: true,
    legend: {
      y: 0.9,
      yanchor: 'auto',
    },
  };
  const configNoButton = {
    ...config,
    modeBarButtonsToRemove: ['toImage'],
  };
  return (
    <>
      <GraphCard onClick={openModal}>
        <GraphHeader>{header}</GraphHeader>
        <HelpText>{helpText}</HelpText>
        <PlotWrapper>
          <OpenModalButton onClick={openModal} aria-label={t('open')}>
            <Icon name="arrowUpRightFromSquare" />
          </OpenModalButton>
          <Plot
            data={[pieData]}
            layout={pieLayout}
            config={configNoButton}
            onClick={openModal}
          />
        </PlotWrapper>
      </GraphCard>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        header={header}
        helpText={helpText}
      >
        <Plot
          data={[pieDataWithTextOnGraph]}
          layout={pieLayoutWithLegend}
          config={config}
        />
      </Modal>
    </>
  );
};

export default StatusDonut;
