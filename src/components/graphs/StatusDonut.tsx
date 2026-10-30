import { useCallback, useMemo, useRef, useState } from 'react';

import { useMediaQuery } from '@mui/material';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useLocale, useTranslations } from 'next-intl';

import { Chart, type ChartHandle } from '@common/components/Chart';

import { useWindowSize } from '@/common/hooks/use-window-size';
import { escapeHtml } from '@/common/utils';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import ChartDownloadButton from '@/components/graphs/ChartDownloadButton';

// The legend under the donut is not in use yet; flip to show it
const SHOW_LEGEND = true;

/* Rows: heading, donut, legend; a subgrid, so the donuts line up across cards */
const GraphCard = styled.div`
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  justify-items: center;
  padding: 1rem;
  margin: 1rem;
  max-width: 260px;
  cursor: pointer;
`;

const GraphHeading = styled.div`
  align-self: end;
`;

const Legend = styled.ul`
  align-self: start;
  width: 100%;
  margin: ${(props) => props.theme.spaces.s100} 0 0;
  padding: 0;
  list-style: none;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s050};
  margin-bottom: ${(props) => props.theme.spaces.s025};
`;

const LegendSwatch = styled.span<{ $color: string }>`
  flex: none;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2px;
  background-color: ${(props) => props.$color};
  /* Outlined, so white segments show */
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 35%);
  forced-color-adjust: none;
`;

const LegendLabel = styled.span`
  flex: 1;
`;

const LegendValue = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBold};
  font-variant-numeric: tabular-nums;
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

const MODAL_CHART_WIDTH = 'min(480px, calc(100vw - 4rem))';
// Space for the labels of small slices above the donut
const MODAL_LABEL_SPACE = 28;
const MODAL_LEGEND_GAP = 24;
const MODAL_LEGEND_ROW_HEIGHT = 22;

/** The modal donut's layout in px, with the legend just under the donut */
function getModalLayout(width: number, maxHeight: number, legendRows: number) {
  const legendHeight = legendRows * MODAL_LEGEND_ROW_HEIGHT;
  const radius = Math.max(
    60,
    Math.min(
      // Leaves room at the sides for labels outside the donut
      width * 0.35,
      (maxHeight - MODAL_LABEL_SPACE - MODAL_LEGEND_GAP - legendHeight) / 2
    )
  );
  const centerY = MODAL_LABEL_SPACE + radius;
  const legendTop = centerY + radius + MODAL_LEGEND_GAP;
  return {
    radius,
    centerX: width / 2,
    centerY,
    legendTop,
    legendHeight,
    height: legendTop + legendHeight,
  };
}

const ModalChartWrapper = styled.div`
  position: relative;
  width: ${MODAL_CHART_WIDTH};
  max-width: 100%;
  margin: -0.75rem auto 0;

  > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

const ModalDownloadRow = styled.div`
  width: ${MODAL_CHART_WIDTH};
  max-width: 100%;
  margin: 0 auto;
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
  font-size: 20px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  ${GraphCard}:hover & {
    box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.themeColors.dark};
    outline-offset: 2px;
  }

  svg {
    color: ${(props) => props.theme.textColor.tertiary};
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

const StatusDonut = ({ data, currentValue, colors, header, helpText }: StatusDonutProps) => {
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();

  const fallbackColors = useMemo(
    () => [
      theme.graphColors.blue070,
      theme.graphColors.blue050,
      theme.graphColors.yellow050,
      theme.graphColors.green050,
      theme.graphColors.grey030,
    ],
    [
      theme.graphColors.blue070,
      theme.graphColors.blue050,
      theme.graphColors.green050,
      theme.graphColors.grey030,
    ]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalChartRef = useRef<ChartHandle>(null);
  // Room for a two-column legend
  const wideModal = useMediaQuery(theme.breakpoints.up('sm'));
  const [modalChartWidth, setModalChartWidth] = useState<number>();
  const { height: windowHeight } = useWindowSize(100);
  const measureModalChart = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setModalChartWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          : fallbackColors[index % fallbackColors.length]
      ),
    [colors, data.values, fallbackColors]
  );

  const chartData = useMemo<DonutChartItem[]>(
    () =>
      data.values.map((rawValue, index) => {
        const label = data.labels[index] ?? '';

        return {
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
      // The legend list under the card already gives the values
      aria: {
        enabled: !SHOW_LEGEND,
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
                ${escapeHtml(item.hoverText)}
              </div>
            `;
          }

          return `
            <div style="min-width: 140px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
                <strong>${escapeHtml(params.name)}</strong>
              </div>
              <div>${escapeHtml(params.value)}</div>
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

  // A vertical legend wraps into a new column at its height
  const legendColumns = wideModal && modalChartData.length > 4 ? 2 : 1;
  const legendRows = Math.ceil(modalChartData.length / legendColumns);
  const modalLayout = useMemo(
    () =>
      modalChartWidth
        ? getModalLayout(
            modalChartWidth,
            // The modal's header and download row take about 14rem
            Math.min(modalChartWidth + 64, (windowHeight ?? 800) - 224),
            legendRows
          )
        : null,
    [modalChartWidth, windowHeight, legendRows]
  );

  const modalOption = useMemo(() => {
    if (!modalLayout) return null;
    const values = chartData
      .filter((item) => item.value > 0)
      .map((item) => `${item.name} ${item.value}`)
      .join(', ');

    return {
      ...baseOption,
      aria: {
        enabled: true,
        label: {
          description: `${header}${currentValue ? ` (${currentValue})` : ''}: ${values}`,
        },
      },
      legend: {
        show: true,
        orient: 'vertical' as const,
        left: 'center',
        top: modalLayout.legendTop,
        height: modalLayout.legendHeight,
        icon: 'circle',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 6,
        padding: 0,
        selectedMode: false,
        inactiveColor: '#999',
        textStyle: {
          fontFamily,
          fontSize: 12,
          color: theme.themeColors.dark,
          lineHeight: 16,
          // Space between the columns
          padding: legendColumns > 1 ? [0, 24, 0, 0] : 0,
        },
      },
      series: [
        {
          ...baseOption.series[0],
          data: modalChartData,
          radius: [modalLayout.radius * 0.52, modalLayout.radius],
          center: [modalLayout.centerX, modalLayout.centerY],
          padAngle: 1,
          avoidLabelOverlap: true,
          minShowLabelAngle: 1,
          selectedMode: 'single' as const,
          selectedOffset: 8,
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
              left: modalLayout.centerX,
              top: modalLayout.centerY,
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
    chartData,
    currentValue,
    fontFamily,
    header,
    modalChartData,
    modalLayout,
    legendColumns,
    theme.themeColors.dark,
    theme.themeColors.white,
  ]);

  return (
    <>
      {/* The card opens the modal on click; keyboard users have the button */}
      <GraphCard onClick={openModal}>
        <GraphHeading>
          <GraphHeader>{header}</GraphHeader>
          {helpText ? <HelpText>{helpText}</HelpText> : null}
        </GraphHeading>

        <ChartWrapper>
          <OpenModalButton
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openModal();
            }}
            aria-label={`${t('expand-embed')}: ${header}`}
          >
            <Icon.Search />
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

        {/* Values as text, not only colours (WCAG 1.4.11) */}
        {SHOW_LEGEND && (
          <Legend>
            {chartData
              .filter((item) => item.value > 0)
              .map((item, index) => (
                <LegendItem key={`${item.name}-${index}`}>
                  <LegendSwatch $color={item.itemStyle.color} />
                  <LegendLabel>{item.name}</LegendLabel>
                  <LegendValue>{item.value}</LegendValue>
                </LegendItem>
              ))}
          </Legend>
        )}
      </GraphCard>

      <Modal isOpen={isModalOpen} onClose={closeModal} header={header} helpText={helpText}>
        <ModalChartWrapper ref={measureModalChart} style={{ height: modalLayout?.height }}>
          {modalOption && modalLayout && (
            <Chart
              ref={modalChartRef}
              isLoading={false}
              data={modalOption}
              height={`${modalLayout.height}px`}
              renderer="canvas"
              withResizeLegend={false}
              locale={locale}
            />
          )}
        </ModalChartWrapper>
        <ModalDownloadRow>
          <ChartDownloadButton
            chartRef={modalChartRef}
            title={header}
            filenameFallback="status-donut"
          />
        </ModalDownloadRow>
      </Modal>
    </>
  );
};

export default StatusDonut;
