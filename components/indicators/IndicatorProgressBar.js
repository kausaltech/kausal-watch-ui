/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { transparentize } from 'polished';
import { motion, useAnimation, animate, MotionConfig } from 'framer-motion';
import { useTranslation } from 'common/i18n';
import dayjs from 'common/dayjs';
import { IndicatorLink } from 'common/links';

const BarBase = styled.rect`
`;

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

const formatValue = (value, locale) => {
  return value.toLocaleString(locale, {maximumFractionDigits: 0})
}

const ValueGroup = (props) => {
  const { date, value, unit, locale, negative, ...rest } = props;
  return (
    <text {...rest}>
      <ValueText x="0" dy="16" className={negative ? 'negative' : ''}>{formatValue(value, locale)}</ValueText>
      <UnitText className={negative ? 'negative' : ''}>
        {' '}
        {unit}
      </UnitText>
    </text>
  );
};

ValueGroup.defaultProps = {
  date: '',
};

ValueGroup.propTypes = {
  date: PropTypes.string,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

function Counter({ from, to, duration, locale}) {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        // ref.current is null when navigating away from the page
        if (!ref.current) return;
        ref.current.textContent = formatValue(value, locale);
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return <tspan ref={ref} />;
}

function IndicatorProgressBar(props) {
  const {
    startDate, startValue,
    latestDate, latestValue,
    goalDate, goalValue,
    unit, note, indicatorId,
    animate } = props;

  console.log(props);
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
  const bars = { w: 800-rightMargin, h: 3 * barHeight };
  const scale = bars.w / startValue;
  const segmentsY = bars.h + barMargin * 2;
  const goalColor = theme.graphColors.green030;
  const latestColor = theme.graphColors.blue030;
  const startColor = theme.graphColors.red030;
  const canvas = { w: bars.w + rightMargin, h: bars.h + topMargin + bottomMargin };

  // const animatedLatestValue = useSpring({ latest: latestValue, from: { latest: startValue } });
  // For simplicity, currently only supports indicators
  // where the goal is towards reduction of a value
  // TODO: catch possible edge cases

  const startBar = {
    x: 0,
    y: topMargin,
    w: startValue * scale
  };
  const latestBar = {
    x: bars.w - (latestValue * scale),
    y: topMargin + barHeight,
    w: latestValue * scale
  };
  const goalBar = {
    x: bars.w - (goalValue * scale),
    y: topMargin + (2 * barHeight),
    w: goalValue * scale
  };

  let reductionCounterFrom = startValue - latestValue;
  const reductionCounterTo = startValue - latestValue;
  const reductionCounterDuration = 3;

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
        x: bars.w - (latestValue * scale),
        width: latestValue * scale,
        transition: { duration: 3 },
      }),
      reducedSegmentControls.start({
        x1: 0,
        x2: latestBar.x - 14,
        transition: { duration: 3 },
      }),
      latestSegmentTickControls.start({
        x1:latestBar.x + 1,
        x2:latestBar.x + 1,
        transition: { duration: 3 },
      }),
      latestSegmentControls.start({
        x1:latestBar.x + 1,
        transition: { duration: 3 },
      })
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
    startValue: `${startValue} ${unit}`,
    latestValue: `${latestValue} ${unit}`,
    goalValue: `${goalValue} ${unit}`,
    reduced: `${reductionCounterTo.toFixed(1)} ${unit}`,
    toBeReduced: `${latestValue - goalValue} ${unit}`,
  };
 /*
    On the year {{startYear}} {{name}} was {{startValue}}.
    Latest observed value in {{latestYear}} was {{latestValue}}.
    The goal for the year {{goalYear}} is {{goalValue}}.
    Since {{startYear}} reduction is {{reduced}}.
    {{toBeReduced}} still needs to be reduced before the year {{goalYear}}.;
  */

  return (
    <IndicatorLink id={indicatorId}>
      <LinkedIndicator>
        <span>{ animate }</span>
        <svg viewBox={`0 0 ${canvas.w} ${canvas.h}`}>
          <title>{t('indicator-progress-bar', graphValues)}</title>
          <defs>
            <marker
              id="reducedArrow"
              markerWidth="7" markerHeight="7"
              refX="0" refY="3.5"
              orient="auto" fill={startColor}
            >
              <polygon points="0 0, 7 3.5, 0 7" />
            </marker>
            <marker
              id="toBeReducedArrow"
              markerWidth="7" markerHeight="7"
              refX="0" refY="3.5"
              orient="auto" fill={latestColor}
            >
              <polygon points="0 0, 7 3.5, 0 7" />
            </marker>
          </defs>
          {/* completed bar */}
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
            stroke-width="2"
            marker-end="url(#reducedArrow)"
          />
          <line
            x1={startBar.x + 1}
            y1={startBar.y}
            x2={startBar.x + 1}
            y2={segmentsY}
            stroke={startColor}
            stroke-width="2"
            stroke-dasharray="2,4"
          />
          <ValueGroup
            transform={`translate(${startBar.x + 4} 0)`}
            date={graphValues.startYear}
            value={startValue}
            unit={unit}
            locale={i18n.language}
          />
          <text
            transform={`translate(${(bars.w - latestBar.w) / 2} ${segmentsY + barMargin * 3})`}
            textAnchor="middle"
          >
            <SegmentHeader>{t('reduced')}</SegmentHeader>
            <SegmentValue x="0" dy="16">
              <Counter
                from={reductionCounterFrom}
                to={reductionCounterTo}
                duration={reductionCounterDuration}
                locale={i18n.language}
              />
              {' '}
              {unit}
            </SegmentValue>
          </text>
          {/* pending from goal bar */}
          <motion.rect
            animate={latestBarControls}
            y={latestBar.y}
            height={barHeight - barMargin}
            fill={latestColor}
          />
          <motion.line
            animate={latestSegmentControls}
            y1={segmentsY}
            x2={goalBar.x - 14}
            y2={segmentsY}
            stroke={latestColor}
            stroke-width="2"
            marker-end="url(#toBeReducedArrow)"
          />
          <motion.g animate={latestValueControls}>
            <line
              x1={latestBar.x + 1}
              x2={latestBar.x + 1}
              y1={latestBar.y}
              y2={segmentsY}
              stroke={latestColor}
              stroke-width="2"
              stroke-dasharray="2,4"
            />
            <ValueGroup
              transform={`translate(${latestBar.x + 4} ${latestBar.y})`}
              date={graphValues.latestYear}
              value={latestValue}
              unit={unit}
              locale={i18n.language}
            />
          </motion.g>
          <motion.text
            animate={completedBarControls}
            transform={`translate(${bars.w - ((latestBar.w + goalBar.w) / 2)} ${segmentsY + barMargin * 3})`}
            textAnchor="middle"
          >
            <SegmentHeader>{t('to-reduce')}</SegmentHeader>
            <SegmentValue x="0" dy="16">
              {formatValue(latestValue - goalValue, i18n.language)}
              {' '}
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
          { goalBar.w > 0 && <line
            x1={goalBar.x + 1}
            y1={goalBar.y}
            x2={goalBar.x + 1}
            y2={segmentsY}
            stroke={goalColor}
            stroke-width="2"
            stroke-dasharray="2,4"
          />}
          <line
            x1={goalBar.x}
            y1={segmentsY}
            x2={goalBar.x + goalBar.w }
            y2={segmentsY}
            stroke={goalColor}
            stroke-width="2"
          />
          <ValueGroup
            transform={`translate(${goalBar.w > 80 ? goalBar.x + 4 : goalBar.x - 50} ${goalBar.y})`}
            date={graphValues.goalYear}
            value={goalValue}
            unit={unit}
            locale={i18n.language}
            negative={goalBar.w < 80}
          />
          <text
            transform={`translate(${goalBar.x + (goalBar.w / 2)} ${segmentsY + barMargin * 3})`} textAnchor="middle"
          >
            <SegmentHeader>{t('bar-goal')}</SegmentHeader>
            <SegmentValue></SegmentValue>
          </text>
          <line
            x1={bars.w - 1}
            x2={bars.w - 1}
            y1={0}
            y2={segmentsY + barMargin}
            stroke={theme.themeColors.light}
          />
          <text
            transform={`translate(${canvas.w - 10} ${startBar.y + (barHeight/2)})`} textAnchor="end"
          >
            <DateText>{graphValues.startYear}</DateText>
          </text>
          <text
            transform={`translate(${canvas.w - 10} ${latestBar.y + (barHeight/2)})`} textAnchor="end"
          >
            <DateText>{graphValues.latestYear}</DateText>
          </text>
          <text
            transform={`translate(${canvas.w - 10} ${goalBar.y + (barHeight/2)})`} textAnchor="end"
          >
            <DateText>{graphValues.goalYear}</DateText>
          </text>
        </svg>
        <SourceLink className="text-end mt-3">
          { note }
        </SourceLink>

      </LinkedIndicator>
    </IndicatorLink>
  );
};

IndicatorProgressBar.defaultProps = {
  startDate: '',
  latestDate: '',
  goalDate: '',
  note: '',
};

IndicatorProgressBar.propTypes = {
  startDate: PropTypes.string,
  startValue: PropTypes.number.isRequired,
  latestDate: PropTypes.string,
  latestValue: PropTypes.number.isRequired,
  goalDate: PropTypes.string,
  goalValue: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  note: PropTypes.string,
};

export default IndicatorProgressBar;
