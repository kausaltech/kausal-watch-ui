/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { readableColor } from 'polished';
import { motion, useAnimation, animate } from 'framer-motion';
import { useTranslation } from 'common/i18n';
import dayjs from 'common/dayjs';
import { IndicatorLink } from 'common/links';
import Switch from 'components/common/Switch';
import { useWindowSize } from 'common/hooks/use-window-size';
import { useTheme } from 'common/theme';

const BarBase = styled.rect``;

const DateText = styled.tspan`
  fill: ${(props) => props.theme.themeColors.white};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 14px;
`;

const ValueText = styled.tspan`
  fill: ${(props) => props.theme.themeColors.black};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 16px;
  font-weight: 700;

  &.negative {
    fill: ${(props) => props.theme.themeColors.white};
  }
`;

const UnitText = styled.tspan`
  fill: ${(props) => props.theme.themeColors.black};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 14px;

  &.negative {
    fill: ${(props) => props.theme.themeColors.white};
  }
`;

const SegmentHeader = styled.tspan`
  fill: ${(props) => props.theme.themeColors.white};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 14px;
  font-weight: bold;
`;

const SegmentValue = styled.tspan`
  fill: ${(props) => props.theme.themeColors.white};
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
`;

const formatValue = (value, locale) => {
  return parseFloat(Number(value)).toLocaleString(locale);
};

const findPrecision = (comparableValues) => {
  for (let i = 2; i < 4; i++) {
    const set = new Set(comparableValues.map((value) => value.toPrecision(i)));
    if (set.size === comparableValues.length) {
      return i;
    }
  }
  return 4;
};

const ValueGroup = (props) => {
  const { date, value, unit, negative, ...rest } = props;
  return (
    <text {...rest}>
      <ValueText x="0" dy="16" className={negative ? 'negative' : ''}>
        {value}
      </ValueText>
      <UnitText className={negative ? 'negative' : ''}> {unit}</UnitText>
    </text>
  );
};

ValueGroup.defaultProps = {
  date: '',
};

ValueGroup.propTypes = {
  date: PropTypes.string,
  value: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
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

function IndicatorProgressBar(props) {
  const { indicator, animate } = props;

  const width = useChartWidth();
  const [isNormalized, setIsNormalized] = useState(false);

  const populationNormalizer = indicator.common?.normalizations.find(
    (normalization) => normalization.normalizer.identifier === 'population'
  );

  const getNormalizedValue = (indicatorValue) => {
    if (populationNormalizer && indicatorValue.normalizedValues.length > 0) {
      const normalized = indicatorValue.normalizedValues.find(
        (normed) => normed.normalizerId === populationNormalizer.normalizer.id
      );
      return normalized?.value;
    } else {
      return undefined;
    }
  };

  const lastGoal = indicator.goals[indicator.goals.length - 1];
  const firstValue = indicator.values[0];
  const lastValue = indicator.values[indicator.values.length - 1];

  const canNormalize =
    getNormalizedValue(firstValue) &&
    getNormalizedValue(lastValue) &&
    getNormalizedValue(lastGoal);

  useEffect(() => {
    if (canNormalize) {
      setIsNormalized(true);
    }
  }, [canNormalize]);

  // The bar is built for showing reduction goals
  // we swap the goal and start values if the goal is to increase
  // TODO: enable the viz to handle goals to increase
  const indicatorId = indicator.id;
  const startDate = firstValue.date;
  const startValue =
    lastGoal.value < firstValue.value
      ? isNormalized
        ? getNormalizedValue(firstValue)
        : firstValue.value
      : isNormalized
      ? getNormalizedValue(lastGoal)
      : lastGoal.value;

  const latestDate = lastValue.date;
  const latestValue = isNormalized
    ? getNormalizedValue(lastValue)
    : lastValue.value;

  const goalDate = lastGoal.date;
  const goalValue =
    lastGoal.value < firstValue.value
      ? isNormalized
        ? getNormalizedValue(lastGoal)
        : lastGoal.value
      : isNormalized
      ? getNormalizedValue(firstValue)
      : firstValue.value;

  const minPrecision = findPrecision([startValue, latestValue, goalValue]);

  const roundedValues = {
    start: startValue.toPrecision(minPrecision),
    latest: latestValue.toPrecision(minPrecision),
    goal: goalValue.toPrecision(isNormalized ? minPrecision : 4),
  };

  const unit = isNormalized
    ? populationNormalizer.unit.shortName
    : indicator.unit.shortName;
  const note = indicator.name;

  const theme = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const latestBarControls = useAnimation();
  const reducedSegmentControls = useAnimation();
  const completedBarControls = useAnimation();
  const latestValueControls = useAnimation();
  const latestSegmentControls = useAnimation();
  const latestSegmentTickControls = useAnimation();

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
  const showReduction = latestValue / roundedValues.start < 0.8; // show reduction if change is more than 20%

  // const animatedLatestValue = useSpring({ latest: latestValue, from: { latest: startValue } });
  // For simplicity, currently only supports indicators
  // where the goal is towards reduction of a value
  // TODO: catch possible edge cases

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
    x: bars.w - roundedValues.goal * scale,
    y: topMargin + 2 * barHeight,
    w: roundedValues.goal * scale,
  };

  let reductionCounterFrom = roundedValues.start - roundedValues.latest;
  const reductionCounterTo = roundedValues.start - roundedValues.latest;
  const reductionCounterDuration = showReduction ? 3 : 0;

  useEffect(() => {
    latestBarControls.set({
      x: 0,
      width: bars.w,
    });
    reducedSegmentControls.set({
      x1: 0,
      x2: 0,
    });
    latestSegmentTickControls.set({
      x1: 0,
      x2: 0,
    });
    latestSegmentControls.set({
      x1: 14,
    });
    latestValueControls.set({
      opacity: 0,
    });
    completedBarControls.set({
      opacity: 0,
    });
  });

  const sequenceOn = async () => {
    await Promise.all([
      latestBarControls.start({
        x: bars.w - roundedValues.latest * scale,
        width: roundedValues.latest * scale,
        transition: { duration: reductionCounterDuration },
      }),
      reducedSegmentControls.start({
        x1: 0,
        x2: latestBar.x - 14,
        transition: { duration: reductionCounterDuration },
      }),
      latestSegmentTickControls.start({
        x1: latestBar.x + 1,
        x2: latestBar.x + 1,
        transition: { duration: reductionCounterDuration },
      }),
      latestSegmentControls.start({
        x1: latestBar.x + 1,
        transition: { duration: reductionCounterDuration },
      }),
    ]);
    await latestValueControls.start({
      opacity: 1,
      transition: { duration: 1 },
    });
    await completedBarControls.start({
      opacity: 1,
      transition: { duration: 1 },
    });
  };

  if (animate) {
    sequenceOn();
    reductionCounterFrom = 0;
  }

  const graphValues = {
    name: note,
    startYear: dayjs(startDate).format('YYYY'),
    latestYear: dayjs(latestDate).format('YYYY'),
    goalYear: dayjs(goalDate).format('YYYY'),
    startValue: `${roundedValues.start} ${unit}`,
    latestValue: `${roundedValues.latest} ${unit}`,
    goalValue: `${roundedValues.goal} ${unit}`,
    reduced: `${reductionCounterTo.toFixed(1)} ${unit}`,
    toBeReduced: `${roundedValues.latest - roundedValues.goal} ${unit}`,
  };
  /*
    On the year {{startYear}} {{name}} was {{startValue}}.
    Latest observed value in {{latestYear}} was {{latestValue}}.
    The goal for the year {{goalYear}} is {{goalValue}}.
    Since {{startYear}} reduction is {{reduced}}.
    {{toBeReduced}} still needs to be reduced before the year {{goalYear}}.;
  */

  return (
    <div>
      {canNormalize && (
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
        <LinkedIndicator>
          <span>{animate}</span>
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
                  initial={{ width: 0 }}
                  animate={{ width: startBar.w }}
                  x={startBar.x}
                  y={startBar.y}
                  height={barHeight - barMargin}
                  fill={startColor}
                />
                <motion.line
                  animate={reducedSegmentControls}
                  y1={segmentsY}
                  y2={segmentsY}
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
                  value={formatValue(roundedValues.start, i18n.language)}
                  unit={unit}
                  locale={i18n.language}
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
                    transform={`translate(${(bars.w - latestBar.w) / 2} ${
                      segmentsY + barMargin * 3
                    })`}
                    textAnchor="middle"
                  >
                    <SegmentHeader>{t('reduced')}</SegmentHeader>
                    <SegmentValue x="0" dy="16">
                      <Counter
                        from={reductionCounterFrom}
                        to={reductionCounterTo}
                        duration={reductionCounterDuration}
                        locale={i18n.language}
                        precision={minPrecision}
                      />{' '}
                      {unit}
                    </SegmentValue>
                  </text>
                )}
              </>
            )}
            {/* pending from goal bar */}
            <motion.rect
              animate={latestBarControls}
              y={latestBar.y}
              height={barHeight - barMargin}
              fill={latestColor}
            />
            <motion.line
              animate={hasStartValue && latestSegmentControls}
              y1={segmentsY}
              x2={goalBar.x - 14}
              y2={segmentsY}
              stroke={latestColor}
              strokeWidth="2"
              markerEnd="url(#toBeReducedArrow)"
            />
            <motion.g animate={hasStartValue && latestValueControls}>
              <line
                x1={latestBar.x + 1}
                x2={latestBar.x + 1}
                y1={latestBar.y}
                y2={segmentsY}
                stroke={latestColor}
                strokeWidth="2"
                strokeDasharray="2,4"
              />
              <ValueGroup
                transform={`translate(${latestBar.x + 4} ${latestBar.y})`}
                date={graphValues.latestYear}
                value={formatValue(roundedValues.latest, i18n.language)}
                unit={unit}
                locale={i18n.language}
                negative={
                  readableColor(
                    latestColor,
                    theme.themeColors.black,
                    theme.themeColors.white
                  ) === theme.themeColors.white
                }
              />
            </motion.g>
            <motion.text
              animate={hasStartValue && completedBarControls}
              transform={`translate(${bars.w - (latestBar.w + goalBar.w) / 2} ${
                segmentsY + barMargin * 3
              })`}
              textAnchor="middle"
            >
              <SegmentHeader>{t('to-reduce')}</SegmentHeader>
              <SegmentValue x="0" dy="16">
                {formatValue(
                  roundedValues.latest - roundedValues.goal,
                  i18n.language
                )}{' '}
                {unit}
              </SegmentValue>
            </motion.text>
            {/* Goal bar */}
            <BarBase
              x={goalBar.x}
              y={goalBar.y}
              width={goalBar.w}
              height={barHeight - barMargin}
              fill={goalColor}
            />
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
              text-anchor={goalBar.w > 120 ? 'start' : 'end'}
              transform={`translate(${
                goalBar.w > 120 ? goalBar.x + 4 : goalBar.x - 8
              } ${goalBar.y})`}
              date={graphValues.goalYear}
              value={formatValue(roundedValues.goal, i18n.language)}
              unit={unit}
              locale={i18n.language}
              negative={
                readableColor(
                  startColor,
                  theme.themeColors.black,
                  theme.themeColors.white
                ) === theme.themeColors.white || goalBar.w < 120
              }
            />
            <text
              transform={`translate(${goalBar.x + goalBar.w / 2} ${
                segmentsY + barMargin * 3
              })`}
              textAnchor="middle"
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
            <text
              transform={`translate(${canvas.w - 10} ${
                goalBar.y + barHeight / 2
              })`}
              textAnchor="end"
            >
              <DateText>{graphValues.goalYear}</DateText>
            </text>
          </svg>
          <SourceLink className="text-end mt-3">{note}</SourceLink>
        </LinkedIndicator>
      </IndicatorLink>
    </div>
  );
}

IndicatorProgressBar.propTypes = {
  indicator: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    unit: PropTypes.shape({
      shortName: PropTypes.string,
    }),
    values: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        value: PropTypes.number,
      })
    ),
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        value: PropTypes.number,
      })
    ),
  }),
  animate: PropTypes.bool,
};

export default IndicatorProgressBar;
