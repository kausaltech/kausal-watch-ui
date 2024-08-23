/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';

import dayjs from 'common/dayjs';
import { useWindowSize } from 'common/hooks/use-window-size';
import { IndicatorLink } from 'common/links';
import Switch from 'components/common/Switch';
import { animate, motion, useAnimate, useInView } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import styled, { useTheme } from 'styled-components';

const ProgressBarWrapper = styled.div`
  a {
    color: ${({ theme }) => theme.section.indicatorShowcase.color};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

const BarBase = styled.rect``;

const DateText = styled.tspan`
  fill: ${(props) => props.theme.section.indicatorShowcase.color};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 14px;
`;

const ValueText = styled.tspan`
  fill: ${(props) => props.theme.themeColors.black};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 16px;
  font-weight: 700;

  &.negative {
    fill: ${(props) => props.theme.section.indicatorShowcase.color};
  }
`;

const UnitText = styled.tspan`
  fill: ${(props) => props.theme.themeColors.black};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 14px;

  &.negative {
    fill: ${(props) => props.theme.section.indicatorShowcase.color};
  }
`;

const SegmentHeader = styled.tspan`
  fill: ${(props) => props.theme.section.indicatorShowcase.color};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 14px;
  font-weight: bold;
`;

const SegmentValue = styled.tspan`
  fill: ${(props) => props.theme.section.indicatorShowcase.color};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 14px;
`;

const LinkedIndicator = styled.div`
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SourceLink = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const NormalizerChooser = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spaces.s100};
  margin-top: ${(props) => props.theme.spaces.s200};
  padding: ${(props) =>
    `${props.theme.spaces.s050} ${props.theme.spaces.s150}`};

  .form-check-input {
    border-color: ${({ theme }) => theme.section.indicatorShowcase.color};
  }
`;

const formatValue = (value, locale) => {
  return parseFloat(Number(value)).toLocaleString(locale);
};

const findPrecision = (comparableValues) => {
  for (let i = 2; i < 4; i++) {
    const set = new Set(
      comparableValues.map((value) =>
        typeof value === 'number' ? value.toPrecision(i) : value
      )
    );
    if (set.size === comparableValues.length) {
      return i;
    }
  }
  return 4;
};

interface ValueGroup extends SVGTextElement {
  value: string;
  unit: string;
  negative: boolean;
}

const ValueGroup = (props: ValueGroup) => {
  const { value, unit, negative, ...rest } = props;
  return (
    //@ts-expect-error style attribute complex to check
    <text {...rest}>
      <ValueText x="0" dy="16" className={negative ? 'negative' : ''}>
        {value}
      </ValueText>
      <UnitText className={negative ? 'negative' : ''}> {unit}</UnitText>
    </text>
  );
};

function Counter({ from, to, duration, locale, precision }) {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        // ref.current is null when navigating away from the page
        if (!ref.current) return;
        ref.current.textContent = formatValue(value, locale, precision);
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return <tspan ref={ref} />;
}

const CHART_WIDTHS = {
  sm: 400,
  md: 800,
};

function useChartWidth() {
  const theme = useTheme();
  const { width: windowWidth } = useWindowSize(400);
  const [width, setWidth] = useState(CHART_WIDTHS.md);

  useEffect(() => {
    const nextWidth =
      windowWidth < parseInt(theme.breakpointMd)
        ? CHART_WIDTHS.sm
        : CHART_WIDTHS.md;

    if (width !== nextWidth) {
      setWidth(nextWidth);
    }
  }, [width, windowWidth, theme.breakpointMd]);

  return width;
}

type IndicatorType = {
  id: string;
  name: string;
  unit: {
    shortName: string;
  };
  values: Array<{
    date: string;
    value: number;
  }>;
  goals: Array<{
    date: string;
    value: number;
  }>;
};

interface IndicatorProgressBarProps {
  indicatorId;
  normalize: boolean;
  baseValue: {
    value: number;
    normalizedValue?: number;
    date: string;
  };
  lastValue: {
    value: number;
    normalizedValue?: number;
    date: string;
  };
  goalValue: {
    value: number;
    normalizedValue?: number;
    date: string;
  };
  unit: {
    name: string;
    normalizedName?: string;
  };
  note?: string;
}

function IndicatorProgressBar(props: IndicatorProgressBarProps) {
  const {
    indicatorId,
    normalize,
    baseValue,
    lastValue,
    goalValue,
    unit,
    note,
  } = props;

  const width = useChartWidth();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });
  const [isNormalized, setIsNormalized] = useState(false);

  useEffect(() => {
    if (normalize) {
      setIsNormalized(false);
    }
  }, [normalize]);

  // The bar is built for showing reduction goals
  // we swap the goal and start values if the goal is to increase
  // TODO: enable the viz to handle goals to increase
  const startDate = baseValue.date;
  const startValue: number =
    goalValue.value < baseValue.value
      ? isNormalized
        ? baseValue.normalizedValue
        : baseValue.value
      : isNormalized
      ? goalValue.normalizedValue
      : goalValue.value;

  const latestDate = lastValue.date;
  const latestValue = isNormalized
    ? lastValue.normalizedValue
    : lastValue.value;

  const goalDate = goalValue.date;
  const goalDisplayValue =
    goalValue.value < baseValue.value
      ? isNormalized
        ? goalValue.normalizedValue
        : goalValue.value
      : isNormalized
      ? baseValue.normalizedValue
      : baseValue.value;

  const minPrecision = findPrecision([
    startValue,
    latestValue,
    goalDisplayValue,
  ]);

  const roundedValues = {
    start: Number(startValue?.toPrecision(minPrecision)),
    latest: Number(latestValue?.toPrecision(minPrecision)),
    goal: goalDisplayValue
      ? goalDisplayValue.toPrecision(isNormalized ? minPrecision : 4)
      : undefined,
  };

  const displayUnit = isNormalized ? unit.normalizedName : unit.name;

  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();

  const barHeight = 30;
  const barMargin = 8;
  const bottomMargin = 70;
  const rightMargin = 50;
  const topMargin = 0;
  const bars = { w: width - rightMargin, h: 3 * barHeight };
  const scale = bars.w / roundedValues.start;
  const segmentsY = bars.h + barMargin * 2;
  const goalColor = theme.section.indicatorShowcase.goalColor;
  const latestColor = theme.section.indicatorShowcase.latestColor;
  const startColor = theme.section.indicatorShowcase.startColor;
  const canvas = {
    w: bars.w + rightMargin,
    h: bars.h + topMargin + bottomMargin,
  };
  //const hasStartValue = Math.abs(startValue - latestValue)/latestValue > 0.01;
  const hasStartValue = true;
  const showReduction = true; // show reduction if change is more than 20%

  // For simplicity, currently only supports indicators
  // where the goal is towards reduction of a value
  // TODO: catch possible edge cases

  // We cover the cases where goal is very low with MIN_BAR_WIDTH
  // assuming the other values will always be larger for now
  const MIN_BAR_WIDTH = 3;
  const startBar = {
    x: 0,
    y: topMargin,
    w: roundedValues.start * scale,
  };
  const latestBar = {
    x: bars.w - roundedValues.latest * scale,
    y: topMargin + barHeight,
    w: roundedValues.latest * scale,
  };
  const goalBar = {
    x: bars.w - Math.max(MIN_BAR_WIDTH, +roundedValues.goal * scale),
    y: topMargin + 2 * barHeight,
    w:
      roundedValues.goal && +roundedValues.goal > 0
        ? Math.max(MIN_BAR_WIDTH, +roundedValues.goal * scale)
        : 0,
  };

  const reductionCounterFrom = 0;
  const reductionCounterTo = roundedValues.start - roundedValues.latest;
  // Animation length relative to animated bar length
  const reductionCounterDuration = showReduction
    ? 10 * (latestBar.x / bars.w)
    : 0;

  useEffect(() => {
    const sequence = [
      [
        '.latest-text',
        {
          opacity: 0,
        },
        { duration: 0 },
      ],
      [
        '.latest-bar',
        {
          opacity: 1,
        },
        { duration: 0 },
      ],
      [
        '.latest-content > text',
        {
          opacity: 0,
        },
        { duration: 0 },
      ],
      [
        '.start-bar',
        {
          attrX: bars.w - roundedValues.start * scale,
          width: roundedValues.start * scale,
        },
        { duration: reductionCounterDuration },
      ],
      [
        '.completed-line',
        {
          x1: latestBar.x > 14 ? 0 : latestBar.x - 14,
          x2: latestBar.x - 13,
        },
        { at: 0, duration: reductionCounterDuration },
      ],
      [
        '.latest-bar',
        {
          attrX: bars.w - roundedValues.latest * scale,
          width: latestBar.w,
        },
        { at: 0, duration: reductionCounterDuration },
      ],
      [
        '.latest-line',
        {
          x1: latestBar.x + 1,
        },
        { at: 0, duration: reductionCounterDuration },
      ],
      [
        '.latest-content > line',
        {
          x1: latestBar.x + 1,
          x2: latestBar.x + 1,
        },
        { at: 0, duration: reductionCounterDuration },
      ],
      [
        '.latest-content > text',
        {
          opacity: 1,
        },
        { duration: 1 },
      ],
      [
        '.latest-text',
        {
          translateX: spaceTextBlock(bars.w - latestBar.w, ['.reduced-text']),
          translateY: segmentsY + barMargin * 3,
        },
        { duration: 0 },
      ],
      [
        '.latest-text',
        {
          opacity: 1,
        },
        { duration: 1 },
      ],
    ];
    if (isInView) {
      animate(sequence);
    }
  }, [isInView, isNormalized]);

  const graphValues = {
    name: note,
    startYear: dayjs(startDate).format('YYYY'),
    latestYear: dayjs(latestDate).format('YYYY'),
    goalYear: dayjs(goalDate).format('YYYY'),
    startValue: `${roundedValues.start} ${displayUnit}`,
    latestValue: `${roundedValues.latest} ${displayUnit}`,
    goalValue: `${roundedValues.goal} ${displayUnit}`,
    reduced: `${reductionCounterTo.toFixed(1)} ${displayUnit}`,
    toBeReduced: `${roundedValues.latest - roundedValues.goal} ${displayUnit}`,
  };
  /*
    On the year {{startYear}} {{name}} was {{startValue}}.
    Latest observed value in {{latestYear}} was {{latestValue}}.
    The goal for the year {{goalYear}} is {{goalValue}}.
    Since {{startYear}} reduction is {{reduced}}.
    {{toBeReduced}} still needs to be reduced before the year {{goalYear}}.;
  */

  const spaceTextBlock = (intendedX, elementsToCheck) => {
    const isServer = typeof window === 'undefined';
    const margin = 12;
    if (isServer) return intendedX;
    const widthOfBlockingElements = elementsToCheck
      .map((el) => document.querySelector(el)?.getBBox().width)
      .reduce((a, b) => a + b, 0);
    if (intendedX < widthOfBlockingElements)
      return widthOfBlockingElements + margin * elementsToCheck.length;
    else return intendedX;
  };

  return (
    <ProgressBarWrapper>
      {normalize && (
        <NormalizerChooser>
          <Switch
            label={t('indicator-normalize-per-capita')}
            state={isNormalized || false}
            onChange={() => setIsNormalized(!isNormalized)}
            id="normalize-per-capita-switch"
          />
        </NormalizerChooser>
      )}
      <IndicatorLink id={indicatorId}>
        <LinkedIndicator ref={scope}>
          <svg viewBox={`0 0 ${canvas.w} ${canvas.h}`}>
            <title>{t('indicator-progress-bar', graphValues)}</title>
            <defs>
              <marker
                id="reducedArrow"
                markerWidth="7"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
                fill={startColor}
              >
                <polygon points="0 0, 7 3.5, 0 7" />
              </marker>
              <marker
                id="toBeReducedArrow"
                markerWidth="7"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
                fill={latestColor}
              >
                <polygon points="0 0, 7 3.5, 0 7" />
              </marker>
            </defs>
            {/* completed bar */}
            {hasStartValue && (
              <>
                <motion.rect
                  className="start-bar"
                  width={bars.w}
                  y={startBar.y}
                  attrX={0}
                  height={barHeight - barMargin}
                  fill={startColor}
                />
                <line
                  className="completed-line"
                  y1={segmentsY}
                  y2={segmentsY}
                  x1={-15}
                  x2={-14}
                  stroke={startColor}
                  strokeWidth="2"
                  markerEnd="url(#reducedArrow)"
                />
                <line
                  x1={startBar.x + 1}
                  y1={startBar.y}
                  x2={startBar.x + 1}
                  y2={segmentsY}
                  stroke={startColor}
                  strokeWidth="2"
                  strokeDasharray="2,4"
                />
                <ValueGroup
                  transform={`translate(${startBar.x + 4} 0)`}
                  date={graphValues.startYear}
                  value={formatValue(roundedValues.start, locale)}
                  unit={displayUnit}
                  locale={locale}
                  negative={
                    readableColor(
                      startColor,
                      theme.themeColors.black,
                      theme.themeColors.white
                    ) === theme.themeColors.white
                  }
                />
                {showReduction && (
                  <text
                    className="reduced-text"
                    transform={`translate(0 ${segmentsY + barMargin * 3})`}
                    textAnchor="left"
                  >
                    <SegmentHeader>{t('reduced')}</SegmentHeader>
                    <SegmentValue x="0" dy="16">
                      <Counter
                        from={reductionCounterFrom}
                        to={reductionCounterTo}
                        duration={reductionCounterDuration}
                        locale={locale}
                        precision={minPrecision}
                      />{' '}
                      {displayUnit}
                    </SegmentValue>
                  </text>
                )}
              </>
            )}
            {/* pending from goal bar */}
            <motion.rect
              className="latest-bar"
              y={latestBar.y}
              attrX="0"
              width={bars.w}
              height={barHeight - barMargin}
              opacity={0}
              fill={latestColor}
            />
            {goalValue && (
              <line
                className="latest-line"
                y1={segmentsY}
                x1={0}
                x2={goalBar.x - 14}
                y2={segmentsY}
                stroke={latestColor}
                strokeWidth="2"
                markerEnd="url(#toBeReducedArrow)"
              />
            )}
            <g className="latest-content">
              <line
                x1={0}
                x2={0}
                y1={latestBar.y}
                y2={segmentsY}
                stroke={latestColor}
                strokeWidth="2"
                strokeDasharray="2,4"
              />
              <ValueGroup
                transform={`translate(${latestBar.x + 4} ${latestBar.y})`}
                opacity={0}
                date={graphValues.latestYear}
                value={formatValue(roundedValues.latest, locale)}
                unit={displayUnit}
                locale={locale}
                negative={
                  readableColor(
                    latestColor,
                    theme.themeColors.black,
                    theme.themeColors.white
                  ) === theme.themeColors.white
                }
              />
            </g>
            <motion.text
              className="latest-text"
              translateX={bars.w - latestBar.w}
              translateY={segmentsY + barMargin * 3}
              textAnchor="left"
              opacity={0}
            >
              <SegmentHeader>{t('to-reduce')}</SegmentHeader>
              <SegmentValue x="0" dy="16">
                {formatValue(roundedValues.latest - roundedValues.goal, locale)}{' '}
                {displayUnit}
              </SegmentValue>
            </motion.text>
            {/* Goal bar */}
            {goalValue && (
              <BarBase
                x={goalBar.x}
                y={goalBar.y}
                width={goalBar.w}
                height={barHeight - barMargin}
                fill={goalColor}
              />
            )}
            {goalBar.w > 3 && (
              <line
                x1={goalBar.x + 1}
                y1={goalBar.y}
                x2={goalBar.x + 1}
                y2={segmentsY}
                stroke={goalColor}
                strokeWidth="2"
                strokeDasharray="2,4"
              />
            )}
            <line
              x1={goalBar.x}
              y1={segmentsY}
              x2={goalBar.x + goalBar.w}
              y2={segmentsY}
              stroke={goalColor}
              strokeWidth="2"
            />
            <ValueGroup
              textAnchor={goalBar.w > 120 ? 'start' : 'end'}
              transform={`translate(${
                goalBar.w > 120 ? goalBar.x + 4 : goalBar.x - 8
              } ${goalBar.y})`}
              date={graphValues.goalYear}
              value={formatValue(roundedValues.goal, locale)}
              unit={displayUnit}
              locale={locale}
              negative={
                readableColor(
                  startColor,
                  theme.themeColors.black,
                  theme.themeColors.white
                ) === theme.themeColors.white || goalBar.w < 120
              }
            />
            <text
              transform={`translate(${spaceTextBlock(goalBar.x, [
                '.reduced-text',
                '.latest-text',
              ])} ${segmentsY + barMargin * 3})`}
              textAnchor="left"
            >
              <SegmentHeader>{t('bar-goal')}</SegmentHeader>
              <SegmentValue></SegmentValue>
            </text>
            <line
              x1={bars.w - 1}
              x2={bars.w - 1}
              y1={hasStartValue ? 0 : barHeight}
              y2={segmentsY + barMargin}
              stroke={theme.themeColors.light}
            />
            {hasStartValue && (
              <text
                transform={`translate(${canvas.w - 10} ${
                  startBar.y + barHeight / 2
                })`}
                textAnchor="end"
              >
                <DateText>{graphValues.startYear}</DateText>
              </text>
            )}
            <text
              transform={`translate(${canvas.w - 10} ${
                latestBar.y + barHeight / 2
              })`}
              textAnchor="end"
            >
              <DateText>{graphValues.latestYear}</DateText>
            </text>
            {goalValue && (
              <text
                transform={`translate(${canvas.w - 10} ${
                  goalBar.y + barHeight / 2
                })`}
                textAnchor="end"
              >
                <DateText>{graphValues.goalYear}</DateText>
              </text>
            )}
          </svg>
          <SourceLink role="button" tabindex="0" className="text-end mt-3">
            {note}
          </SourceLink>
        </LinkedIndicator>
      </IndicatorLink>
    </ProgressBarWrapper>
  );
}

export default IndicatorProgressBar;
