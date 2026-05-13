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
  margin-top: ${(props) => props.theme.spaces.s050};
  margin-bottom: ${(props) => props.theme.spaces.s050};
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

const MODAL_CHART_WIDTH = 'min(350px, calc(100vw - 4rem))';
const MODAL_CHART_HEIGHT = 'min(430px, calc(100vh - 12rem))';

const ModalChartWrapper = styled.div`
  position: relative;
  width: ${MODAL_CHART_WIDTH};
  height: ${MODAL_CHART_HEIGHT};
  max-width: 100%;
  margin: -0.75rem auto -1rem;

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
  id: string;
  value: number;
  name: string;
  itemStyle: {
    color: string;
  };
  label?: {
    show: boolean;
    position: 'inside' | 'outside';
    formatter: string;
    fontSize: number;
    fontWeight: number;
    fontFamily?: string;
    color?: string;
  };
  labelLine?: {
    show: boolean;
    length?: number;
    length2?: number;
    lineStyle?: {
      color?: string;
      width?: number;
    };
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
const SMALL_SLICE_THRESHOLD = 6;

const getNumberValue = (value: number | string | null | undefined) => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : 0;
};

const isValidColor = (color: string | null | undefined) =>
  typeof color === 'string' && color.trim().length > 0;

const getSlicePercent = (value: number, total: number) => {
  if (!total) return 0;

  return (value / total) * 100;
};

const formatPercent = (value: number, total: number) => {
  if (!total) return '0%';

  return `${Math.round((value / total) * 100)}%`;
};

const formatPrecisePercent = (value: number, total: number) => {
  if (!total) return '0%';

  const percent = (value / total) * 100;
  const roundedPercent = Number(percent.toFixed(2));

  return `${roundedPercent}%`;
};

const getDownloadFilename = (header: string) =>
  header
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '') || 'status-donut';

const getChartItemId = (label: string | undefined, index: number) =>
  label?.trim() ? `${label}-${index}` : `status-donut-item-${index}`;

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
      data.values.map((rawValue, index) => {
        const label = data.labels[index] ?? '';

        return {
          id: getChartItemId(label, index),
          value: getNumberValue(rawValue),
          name: label,
          itemStyle: {
            color: chartColors[index],
          },
          hoverText: hasCustomHoverTexts ? data.hoverTexts?.[index] : undefined,
          text: hasCustomTexts ? data.texts?.[index] : undefined,
        };
      }),
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

  const modalChartData = useMemo<DonutChartItem[]>(
    () =>
      chartData.map((item) => {
        const percent = getSlicePercent(item.value, total);
        const text = item.text ?? formatPrecisePercent(item.value, total);
        const isSmallSlice = percent > 0 && percent < SMALL_SLICE_THRESHOLD;

        return {
          ...item,
          label: {
            show: item.value > 0,
            position: isSmallSlice ? 'outside' : 'inside',
            formatter: text,
            fontSize: 11,
            fontWeight: 700,
            fontFamily,
            color: isSmallSlice ? theme.themeColors.dark : undefined,
          },
          labelLine: {
            show: isSmallSlice,
            length: 10,
            length2: 6,
            lineStyle: {
              color: theme.themeColors.dark,
              width: 1,
            },
          },
        };
      }),
    [chartData, fontFamily, theme.themeColors.dark, total]
  );

  const baseOption = useMemo(
    () => ({
      animation: true,
      animationDuration: 900,
      animationEasing: 'cubicOut' as const,
      animationDelay: (index: number) => index * 80,
      animationDurationUpdate: 450,
      animationEasingUpdate: 'cubicOut' as const,
      animationDelayUpdate: (index: number) => index * 30,
      stateAnimation: {
        duration: 250,
        easing: 'cubicOut' as const,
      },
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
          const percent = formatPercent(Number(params.value), total);

          if (item.hoverText) {
            return `
              <div style="border-left: 4px solid ${color}; padding-left: 8px; max-width: 220px;">
                ${item.hoverText}
              </div>
            `;
          }

          return `
            <div style="min-width: 140px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
                <strong>${params.name}</strong>
              </div>
              <div>${params.value}</div>
              <div style="font-size: 16px; font-weight: 700; margin-top: 2px;">${percent}</div>
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
          padAngle: 0.5,
          stillShowZeroSum: true,
          avoidLabelOverlap: false,
          selectedMode: 'single' as const,
          selectedOffset: 6,
          universalTransition: true,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: theme.themeColors.white,
            borderRadius: 3,
          },
          emphasis: {
            scale: true,
            scaleSize: 6,
            focus: 'self' as const,
            itemStyle: {
              borderWidth: 2,
              borderColor: theme.themeColors.white,
              shadowBlur: 18,
              shadowOffsetY: 5,
              shadowColor: 'rgba(0, 0, 0, 0.24)',
            },
            label: {
              fontWeight: 800,
            },
          },
          blur: {
            itemStyle: {
              opacity: 0.45,
            },
          },
          select: {
            itemStyle: {
              borderWidth: 2,
              borderColor: theme.themeColors.white,
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
    const modalDonutCenter = ['50%', '38%'] as const;

    return {
      ...baseOption,
      toolbox: {
        show: true,
        right: 0,
        top: 0,
        itemSize: 18,
        feature: {
          saveAsImage: {
            show: true,
            type: 'png',
            name: getDownloadFilename(header),
            title: t('download-chart-as-png'),
            pixelRatio: 2,
            backgroundColor: theme.themeColors.white ?? '#ffffff',
          },
        },
      },
      legend: {
        show: true,
        orient: 'vertical' as const,
        left: 'center',
        top: '68%',
        icon: 'circle',
        itemWidth: 9,
        itemHeight: 9,
        itemGap: 6,
        padding: 0,
        selectedMode: true,
        inactiveColor: '#999',
        textStyle: {
          fontFamily,
          fontSize: 12,
          color: theme.themeColors.dark,
          lineHeight: 16,
        },
      },
      series: [
        {
          ...baseOption.series[0],
          data: modalChartData,
          radius: ['28%', '52%'],
          center: modalDonutCenter,
          padAngle: 1,
          avoidLabelOverlap: true,
          minShowLabelAngle: 1,
          selectedMode: 'single' as const,
          selectedOffset: 8,
          universalTransition: true,
          labelLayout: {
            hideOverlap: true,
            moveOverlap: 'shiftY' as const,
          },
          label: {
            show: true,
            fontFamily,
          },
          labelLine: {
            show: true,
            maxSurfaceAngle: 80,
          },
          emphasis: {
            scale: true,
            scaleSize: 8,
            focus: 'self' as const,
            itemStyle: {
              borderWidth: 2,
              borderColor: theme.themeColors.white,
              shadowBlur: 20,
              shadowOffsetY: 6,
              shadowColor: 'rgba(0, 0, 0, 0.26)',
            },
            label: {
              fontWeight: 800,
            },
          },
          select: {
            itemStyle: {
              borderWidth: 2,
              borderColor: theme.themeColors.white,
              shadowBlur: 18,
              shadowOffsetY: 5,
              shadowColor: 'rgba(0, 0, 0, 0.26)',
            },
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
  }, [
    baseOption,
    currentValue,
    fontFamily,
    header,
    modalChartData,
    t,
    theme.themeColors.dark,
    theme.themeColors.white,
  ]);

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
            height={MODAL_CHART_HEIGHT}
            renderer="canvas"
            withResizeLegend={false}
            locale={locale}
          />
        </ModalChartWrapper>
      </Modal>
    </>
  );
};

export default StatusDonut;
