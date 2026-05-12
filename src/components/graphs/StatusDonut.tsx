import React, { useMemo, useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useLocale, useTranslations } from 'next-intl';

import { Chart } from '@common/components/Chart';

import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';

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
  margin: 0;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: 700;
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const HelpText = styled.p`
  margin-bottom: ${(props) => props.theme.spaces.s200};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 175px;
  height: 175px;

  > div {
    width: 175px !important;
    height: 175px !important;
  }
`;

const MODAL_CHART_SIZE = 'min(350px, calc(100vw - 4rem))';

const ModalChartWrapper = styled.div`
  width: ${MODAL_CHART_SIZE};
  height: ${MODAL_CHART_SIZE};
  max-width: 100%;
  margin: 0 auto;

  > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

const OpenModalButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: ${(props) => props.theme.btnBorderRadius};
  background: ${(props) => props.theme.themeColors.white};
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${GraphCard}:hover & {
    opacity: 1;
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid ${(props) => props.theme.themeColors.primary};
    outline-offset: 2px;
  }

  svg {
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

type DonutData = {
  values: Array<number | string | null | undefined>;
  labels: string[];
  hoverTexts?: string[] | null;
  texts?: string[] | null;
};

type StatusDonutProps = {
  data: DonutData;
  currentValue?: string | number | null;
  colors: Array<string | null | undefined>;
  header: string;
  helpText?: string;
};

type DonutChartItem = {
  value: number;
  name: string;
  itemStyle: {
    color: string;
  };
  hoverText?: string;
  text?: string;
};

type FormatterParams = {
  name: string;
  value: number | string;
  data: DonutChartItem;
  percent?: number;
};

const FALLBACK_COLORS = ['#0f4c63', '#1f77b4', '#ff7f0e', '#2ca02c', '#d9d9d9'];

const getNumberValue = (value: number | string | null | undefined) => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : 0;
};

const isValidColor = (color: string | null | undefined) =>
  typeof color === 'string' && color.trim().length > 0;

const formatPercent = (value: number, total: number) => {
  if (!total) return '0%';

  return `${Math.round((value / total) * 100)}%`;
};

const formatPrecisePercent = (value: number, total: number) => {
  if (!total) return '0%';

  const percent = (value / total) * 100;
  const roundedPercent = Number(percent.toFixed(2));

  return Number.isInteger(roundedPercent) ? `${roundedPercent}%` : `${roundedPercent}%`;
};

const StatusDonut = ({ data, currentValue, colors, header, helpText }: StatusDonutProps) => {
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hasCustomHoverTexts =
    data.hoverTexts != null && data.hoverTexts.length === data.values.length;

  const hasCustomTexts = data.texts != null && data.texts.length === data.values.length;

  const chartColors = useMemo(
    () =>
      data.values.map((_, index) =>
        isValidColor(colors[index])
          ? String(colors[index])
          : FALLBACK_COLORS[index % FALLBACK_COLORS.length]
      ),
    [colors, data.values]
  );

  const chartData = useMemo<DonutChartItem[]>(
    () =>
      data.values.map((rawValue, index) => ({
        value: getNumberValue(rawValue),
        name: data.labels[index] ?? '',
        itemStyle: {
          color: chartColors[index],
        },
        hoverText: hasCustomHoverTexts ? data.hoverTexts?.[index] : undefined,
        text: hasCustomTexts ? data.texts?.[index] : undefined,
      })),
    [
      chartColors,
      data.hoverTexts,
      data.labels,
      data.texts,
      data.values,
      hasCustomHoverTexts,
      hasCustomTexts,
    ]
  );

  const total = useMemo(() => chartData.reduce((sum, item) => sum + item.value, 0), [chartData]);

  const fontFamily = `${theme.fontFamilyTiny}, ${theme.fontFamilyFallback}`;

  const baseOption = useMemo(
    () => ({
      animation: true,
      animationDuration: 900,
      animationEasing: 'cubicOut' as const,
      animationDelay: (index: number) => index * 80,
      animationDurationUpdate: 450,
      animationEasingUpdate: 'cubicOut' as const,
      animationDelayUpdate: (index: number) => index * 30,
      color: chartColors,
      aria: {
        enabled: true,
      },
      legend: {
        show: false,
      },
      textStyle: {
        fontFamily,
      },
      tooltip: {
        trigger: 'item' as const,
        appendToBody: true,
        borderWidth: 0,
        padding: [8, 10],
        backgroundColor: theme.themeColors.white,
        textStyle: {
          fontFamily,
          fontSize: 12,
          color: theme.themeColors.dark,
        },
        extraCssText: 'box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16); border-radius: 6px;',
        formatter: (params: FormatterParams) => {
          const item = params.data;
          const color = item.itemStyle.color;

          if (item.hoverText) {
            return `
              <div style="border-left: 4px solid ${color}; padding-left: 8px;">
                ${item.hoverText}
              </div>
            `;
          }

          return `
            <div style="border-left: 4px solid ${color}; padding-left: 8px;">
              <strong>${params.name}</strong><br />
              ${params.value}<br />
              ${formatPercent(Number(params.value), total)}
            </div>
          `;
        },
      },
      series: [
        {
          type: 'pie' as const,
          data: chartData,
          radius: ['42%', '82%'],
          center: ['50%', '50%'],
          sort: false,
          clockwise: true,
          startAngle: 90,
          minAngle: 0,
          stillShowZeroSum: true,
          avoidLabelOverlap: false,
          selectedMode: false,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: theme.themeColors.white,
            borderRadius: 2,
          },
          emphasis: {
            scale: true,
            scaleSize: 4,
            focus: 'self' as const,
            itemStyle: {
              shadowBlur: 14,
              shadowOffsetY: 4,
              shadowColor: 'rgba(0, 0, 0, 0.22)',
            },
          },
          blur: {
            itemStyle: {
              opacity: 0.45,
            },
          },
          select: {
            itemStyle: {
              shadowBlur: 16,
              shadowOffsetY: 4,
              shadowColor: 'rgba(0, 0, 0, 0.24)',
            },
          },
        },
      ],
      graphic: currentValue
        ? [
            {
              type: 'group' as const,
              left: '50%',
              top: '50%',
              bounding: 'raw' as const,
              silent: true,
              children: [
                {
                  type: 'text' as const,
                  x: 0,
                  y: -1,
                  style: {
                    text: String(currentValue),
                    textAlign: 'center' as const,
                    textVerticalAlign: 'middle' as const,
                    fill: theme.themeColors.dark,
                    fontSize: 16,
                    fontWeight: 400,
                    fontFamily,
                  },
                },
              ],
            },
          ]
        : [],
    }),
    [
      chartColors,
      chartData,
      currentValue,
      fontFamily,
      theme.themeColors.dark,
      theme.themeColors.white,
      total,
    ]
  );

  const modalOption = useMemo(() => {
    const modalDonutCenter = ['50%', '40%'] as const;

    return {
      ...baseOption,
      legend: {
        show: true,
        orient: 'vertical' as const,
        left: 'center',
        bottom: 0,
        icon: 'circle',
        itemWidth: 9,
        itemHeight: 9,
        itemGap: 8,
        textStyle: {
          fontFamily,
          fontSize: 12,
          color: theme.themeColors.dark,
        },
      },
      series: [
        {
          ...baseOption.series[0],
          radius: ['34%', '64%'],
          center: modalDonutCenter,
          label: {
            show: true,
            position: 'inside' as const,
            formatter: (params: FormatterParams) => {
              const item = params.data;

              if (item.text) {
                return item.text;
              }

              return formatPrecisePercent(Number(params.value), total);
            },
            fontSize: 11,
            fontWeight: 700,
            fontFamily,
          },
          labelLine: {
            show: false,
          },
        },
      ],
      graphic: currentValue
        ? [
            {
              type: 'group' as const,
              left: modalDonutCenter[0],
              top: modalDonutCenter[1],
              bounding: 'raw' as const,
              silent: true,
              children: [
                {
                  type: 'text' as const,
                  x: 0,
                  y: -1,
                  style: {
                    text: String(currentValue),
                    textAlign: 'center' as const,
                    textVerticalAlign: 'middle' as const,
                    fill: theme.themeColors.dark,
                    fontSize: 16,
                    fontWeight: 400,
                    fontFamily,
                  },
                },
              ],
            },
          ]
        : [],
    };
  }, [baseOption, currentValue, fontFamily, theme.themeColors.dark, total]);

  return (
    <>
      <GraphCard onClick={openModal}>
        <GraphHeader>{header}</GraphHeader>

        {helpText ? <HelpText>{helpText}</HelpText> : null}

        <ChartWrapper>
          <OpenModalButton
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openModal();
            }}
            aria-label={t('open')}
          >
            <Icon.ArrowUpRightFromSquare />
          </OpenModalButton>

          <Chart
            isLoading={false}
            data={baseOption}
            height="175px"
            renderer="svg"
            withResizeLegend={false}
            locale={locale}
          />
        </ChartWrapper>
      </GraphCard>

      <Modal isOpen={isModalOpen} onClose={closeModal} header={header} helpText={helpText}>
        <ModalChartWrapper>
          <Chart
            isLoading={false}
            data={modalOption}
            height={MODAL_CHART_SIZE}
            renderer="svg"
            withResizeLegend={false}
            locale={locale}
          />
        </ModalChartWrapper>
      </Modal>
    </>
  );
};

export default StatusDonut;
