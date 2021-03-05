/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { motion, useAnimation, animate } from 'framer-motion';
import {useSpring, animated} from 'react-spring';
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
`;

// Use Finnish style numeric display formatting
function beautifyValue(x) {
  let out;
  if (!Number.isInteger(x)) {
    out = Math.round(x);
  } else {
    out = x;
  }
  const s = out.toString();
  const displayNumber = s.replace('.', ',');
  return displayNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const ValueGroup = React.forwardRef((props, ref) => {
  const { date, value, unit, ...rest } = props;

  return (
    <text {...rest} ref={ref}>
      <DateText>{date}</DateText>
      <ValueText x="0" dy="22">{beautifyValue(value)}</ValueText>
      <UnitText>
        {' '}
        {unit}
      </UnitText>
    </text>
  );
});

const AnimatedValueGroup = motion(ValueGroup, { forwardMotionProps: true });

ValueGroup.defaultProps = {
  date: '',
};

ValueGroup.propTypes = {
  date: PropTypes.string,
  value: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

function Counter({ from, to, duration}) {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        ref.current.textContent = beautifyValue(value.toFixed());
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return <tspan ref={ref} />;
}

const IndicatorProgressBar = (props) => {
  const {
    startDate, startValue,
    latestDate, latestValue,
    goalDate, goalValue,
    unit, note, indicatorId,
    animate } = props;

  const theme = useContext(ThemeContext);
  // const [animation, setAnimation] = useState(animate);
  const pendingBarControls = useAnimation();
  const completedBarControls = useAnimation();
  const completedValueControls = useAnimation();
  const latestValueControls = useAnimation();

  const canvas = { w: 800, h: 150 };
  const bar = { w: 720, h: 32 };
  const scale = (bar.w - 8) / startValue;

  //const animatedLatestValue = useSpring({ latest: latestValue, from: { latest: startValue } });
  // For simplicity, currently only supports indicators
  // where the goal is towards reduction of a value
  // TODO: catch possible edge cases

  const completedBar = { x: 44, w: (startValue - latestValue) * scale };
  const pendingBar = { x: 44 + completedBar.w, w: (latestValue - goalValue) * scale };
  const goalBar = { x: 44 + completedBar.w + pendingBar.w, w: (goalValue) * scale };

  let reductionCounterFrom = startValue - latestValue;
  let reductionCounterTo = startValue - latestValue;
  let reductionCounterDuration = 3;

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

  const sequenceOff = async () => {
    await latestValueControls.start({
      opacity: 0,
      transition: { duration: 1 },
    });
    await completedBarControls.start({
      opacity: 0,
      transition: { duration: 1 },
    });
    await pendingBarControls.start({
      x: 44,
      width: (startValue) * scale,
      transition: { duration: 1 },
    });
    completedValueControls.start({
    });
  };

  if (animate === 'off') {
    reductionCounterFrom = startValue - latestValue;
    reductionCounterTo = 0;
    sequenceOff();
  }
  if (animate === 'on') {
    sequenceOn();
    reductionCounterFrom = 0;
  }

  //console.log(pendingBar.w);

  return (
    <IndicatorLink id={indicatorId}>
      <LinkedIndicator>
        <span>{ animate }</span>
        <svg viewBox={`0 0 ${canvas.w} ${canvas.h}`}>
          <title>a11y title here</title>
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
          <AnimatedValueGroup
            transform={`translate(${completedBar.x + 4} 20)`}
            date={dayjs(startDate).format('YYYY')}
            value={startValue.toString()}
            unit={unit}
          />
          <text transform={`translate(${completedBar.x + completedBar.w / 2} 110)`} textAnchor="middle">
            <DateText>Vähennetty</DateText>
            <UnitText x="0" dy="20">
              <Counter
                from={reductionCounterFrom}
                to={reductionCounterTo}
                duration={reductionCounterDuration}
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
              date={dayjs(latestDate).format('YYYY')}
              value={latestValue}
              unit={unit}
            />
          </motion.g>
          <motion.text
            animate={completedBarControls}
            transform={`translate(${pendingBar.x + pendingBar.w / 2} 110)`}
            textAnchor="middle"
          >
            <DateText>Vähennettävää</DateText>
            <UnitText x="0" dy="20">
              {latestValue - goalValue}
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
            date={dayjs(goalDate).format('YYYY')}
            value={goalValue.toString()}
            unit={unit}
          />
          <text transform={`translate(${goalBar.x + goalBar.w / 2} 110)`} textAnchor="middle">
            <DateText>Tavoite</DateText>
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
