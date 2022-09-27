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

  const theme = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const pendingBarControls = useAnimation();
  const completedBarControls = useAnimation();
  const latestValueControls = useAnimation();

  const canvas = { w: 800, h: 150 };
  const bar = { w: 720, h: 32 };
  const scale = (bar.w - 8) / startValue;

  // const animatedLatestValue = useSpring({ latest: latestValue, from: { latest: startValue } });
  // For simplicity, currently only supports indicators
  // where the goal is towards reduction of a value
  // TODO: catch possible edge cases

  const completedBar = { x: 44, w: (startValue - latestValue) * scale };
  const pendingBar = { x: 44 + completedBar.w, w: (latestValue - goalValue) * scale };
  const goalBar = { x: 44 + completedBar.w + pendingBar.w, w: (goalValue) * scale };

  let reductionCounterFrom = startValue - latestValue;
  const reductionCounterTo = startValue - latestValue;
  const reductionCounterDuration = 3;

  useEffect(() => {
    pendingBarControls.set({
      x: 44,
      width: completedBar.w + pendingBar.w,
    });
    latestValueControls.set({
      opacity: 0,
    });
    completedBarControls.set({
      opacity: 0,
    });
  }, []);

  const sequenceOn = async () => {
    await pendingBarControls.start({
      x: 44 + completedBar.w,
      width: (latestValue - goalValue) * scale,
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
          <BarBase
            x="40"
            y="60"
            width={bar.w}
            height={bar.h}
            fill={theme.themeColors.light}
          />
          <motion.rect
            initial={{ width: 0 }}
            animate={{ width: completedBar.w }}
            x={completedBar.x}
            y="64"
            height={bar.h - 8}
            fill={theme.themeColors.light}
          />
          <line
            x1={completedBar.x}
            x2={completedBar.x}
            y1={10}
            y2={64 + bar.h - 8}
            stroke={theme.themeColors.light}
          />
          <ValueGroup
            transform={`translate(${completedBar.x + 4} 20)`}
            date={graphValues.startYear}
            value={startValue}
            unit={unit}
            locale={i18n.language}
          />
          <text transform={`translate(${completedBar.x + completedBar.w / 2} 110)`} textAnchor="middle">
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
          <motion.rect
            animate={pendingBarControls}
            y="64"
            height={bar.h - 8}
            fill={theme.graphColors.red030}
          />
          <motion.g animate={latestValueControls}>
            <line
              x1={pendingBar.x}
              x2={pendingBar.x}
              y1={10}
              y2={64 + bar.h - 8}
              stroke={theme.themeColors.light}
            />
            <ValueGroup
              transform={`translate(${pendingBar.x + 4} 20)`}
              date={graphValues.latestYear}
              value={latestValue}
              unit={unit}
              locale={i18n.language}
            />
          </motion.g>
          <motion.text
            animate={completedBarControls}
            transform={`translate(${pendingBar.x + pendingBar.w / 2} 110)`}
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
            y="64"
            width={goalBar.w}
            height={bar.h - 8}
            fill={theme.graphColors.green070}
          />
          <line
            x1={goalBar.x}
            x2={goalBar.x}
            y1={10}
            y2={64 + bar.h - 8}
            stroke={theme.themeColors.light}
          />
          <ValueGroup
            transform={`translate(${goalBar.x + 4} 20)`}
            date={graphValues.goalYear}
            value={goalValue}
            unit={unit}
            locale={i18n.language}
          />
          <text transform={`translate(${goalBar.x + goalBar.w / 2} 110)`} textAnchor="middle">
            <DateText>{t('bar-goal')}</DateText>
          </text>
        </svg>
        <div className="text-center"><small>{ note }</small></div>
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
