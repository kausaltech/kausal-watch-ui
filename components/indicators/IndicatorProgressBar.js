/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { motion, useAnimation, animate } from 'framer-motion';
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
  fill: ${(props) => props.theme.themeColors.white};
  font-family: '${(props) => props.theme.fontFamily}';
  font-size: 20px;
  font-weight: 700;
`;

const UnitText = styled.tspan`
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
  const { date, value, unit, locale, ...rest } = props;
  return (
    <text {...rest}>
      <DateText>{date}</DateText>
      <ValueText x="0" dy="22">{formatValue(value, locale)}</ValueText>
      <UnitText>
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
  const completedBarControls = useAnimation();
  const latestValueControls = useAnimation();

  const canvas = { w: 800, h: 150 };
  const barHeight = 16;
  const barMargin = 4;
  const bottomMargin = 90;
  const topMargin = 50;
  const bars = { w: 800, h: 3 * barHeight };
  const scale = bars.w / startValue;

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
    latestValueControls.set({
      opacity: 0,
    });
    completedBarControls.set({
      opacity: 0,
    });
  }, []);

  const sequenceOn = async () => {
    await latestBarControls.start({
      x: bars.w - (latestValue * scale),
      width: latestValue * scale,
      transition: { duration: 3 },
    });
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
          {/* completed bar */}
          <motion.rect
            initial={{ width: 0 }}
            animate={{ width: startBar.w }}
            x={startBar.x}
            y={startBar.y}
            height={barHeight - barMargin}
            fill={theme.graphColors.yellow010}
          />
          <line
            x1={startBar.x}
            x2={startBar.x}
            y1={0}
            y2={bottomMargin + bars.h - barMargin}
            stroke={theme.themeColors.light}
          />
          <ValueGroup
            transform={`translate(${startBar.x + 4} 16)`}
            date={graphValues.startYear}
            value={startValue}
            unit={unit}
            locale={i18n.language}
          />
          <text
            transform={`translate(${(bars.w - latestBar.w) / 2} 116)`}
            textAnchor="middle"
          >
            <DateText>{t('reduced')}</DateText>
            <UnitText x="0" dy="20">
              <Counter
                from={reductionCounterFrom}
                to={reductionCounterTo}
                duration={reductionCounterDuration}
                locale={i18n.language}
              />
              {' '}
              {unit}
            </UnitText>
          </text>
          {/* pending from goal bar */}
          <motion.rect
            animate={latestBarControls}
            y={latestBar.y}
            height={barHeight - barMargin}
            fill={theme.graphColors.red030}
          />
          <motion.g animate={latestValueControls}>
            <line
              x1={latestBar.x}
              x2={latestBar.x}
              y1={0}
              y2={bottomMargin + bars.h - barMargin}
              stroke={theme.themeColors.light}
            />
            <ValueGroup
              transform={`translate(${latestBar.x + 4} 16)`}
              date={graphValues.latestYear}
              value={latestValue}
              unit={unit}
              locale={i18n.language}
            />
          </motion.g>
          <motion.text
            animate={completedBarControls}
            transform={`translate(${bars.w - ((latestBar.w + goalBar.w) / 2)} 116)`}
            textAnchor="middle"
          >
            <DateText>{t('to-reduce')}</DateText>
            <UnitText x="0" dy="20">
              {formatValue(latestValue - goalValue, i18n.language)}
              {' '}
              {unit}
            </UnitText>
          </motion.text>
          <BarBase
            x={goalBar.x}
            y={goalBar.y}
            width={goalBar.w}
            height={barHeight - barMargin}
            fill={theme.graphColors.green050}
          />
          <line
            x1={goalBar.x}
            x2={goalBar.x}
            y1={0}
            y2={bottomMargin + bars.h - barMargin}
            stroke={theme.themeColors.light}
          />
          <ValueGroup
            transform={`translate(${goalBar.x + 4} 16)`}
            date={graphValues.goalYear}
            value={goalValue}
            unit={unit}
            locale={i18n.language}
          />
          <text
            transform={`translate(${goalBar.x + (goalBar.w / 2)} 116)`} textAnchor="middle"
          >
            <DateText>{t('bar-goal')}</DateText>
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
