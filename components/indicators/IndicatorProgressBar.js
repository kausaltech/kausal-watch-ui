/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import dayjs from 'common/dayjs';

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

const ValueGroup = (props) => {
  const { date, value, unit, ...rest } = props;

  return (
    <text {...rest}>
      <DateText>{date}</DateText>
      <ValueText x="0" dy="22">{value}</ValueText>
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
  value: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

const IndicatorProgressBar = (props) => {
  const {
    startDate, startValue,
    latestDate, latestValue,
    goalDate, goalValue,
    unit, note } = props;

  const theme = useContext(ThemeContext);

  const canvas = { w: 800, h: 150 };
  const bar = { w: 720, h: 32 };
  const scale = (bar.w - 8) / startValue;

  // For simplicity, currently only supports indicators
  // where the goal is towards reduction of a value
  // TODO: catch possible edge cases

  const accomplishedBar = { x: 44, w: (startValue - latestValue) * scale };
  const missingBar = { x: 44 + accomplishedBar.w, w: (latestValue - goalValue) * scale };
  const goalBar = { x: 44 + accomplishedBar.w + missingBar.w, w: (goalValue) * scale };

  return (
    <div>
      <svg viewBox={`0 0 ${canvas.w} ${canvas.h}`}>
        <title>a11y title here</title>
        <BarBase
          x="40"
          y="60"
          width={bar.w}
          height={bar.h}
          fill={theme.themeColors.light}
        />
        <BarBase
          x={accomplishedBar.x}
          y="64"
          width={accomplishedBar.w}
          height={bar.h - 8}
          fill={theme.themeColors.light}
        />
        <line
          x1={accomplishedBar.x}
          x2={accomplishedBar.x}
          y1={10}
          y2={64 + bar.h - 8}
          stroke={theme.themeColors.light}
        />
        <ValueGroup
          transform={`translate(${accomplishedBar.x + 4} 20)`}
          date={dayjs(startDate).format('L')}
          value={startValue.toString()}
          unit={unit}
        />
        <text transform={`translate(${accomplishedBar.x + accomplishedBar.w / 2} 110)`} textAnchor="middle">
          <DateText>Vähennetty</DateText>
          <UnitText x="0" dy="20">
            {startValue - latestValue}
            {' '}
            {unit}
          </UnitText>
        </text>

        <BarBase
          x={missingBar.x}
          y="64"
          width={missingBar.w}
          height={bar.h - 8}
          fill={theme.graphColors.red030}
        />
        <line
          x1={missingBar.x}
          x2={missingBar.x}
          y1={10}
          y2={64 + bar.h - 8}
          stroke={theme.themeColors.light}
        />
        <ValueGroup
          transform={`translate(${missingBar.x + 4} 20)`}
          date={dayjs(latestDate).format('L')}
          value={latestValue.toString()}
          unit={unit}
        />
        <text transform={`translate(${missingBar.x + missingBar.w / 2} 110)`} textAnchor="middle">
          <DateText>Vähennettävää</DateText>
          <UnitText x="0" dy="20">
            {latestValue - goalValue}
            {' '}
            {unit}
          </UnitText>
        </text>
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
          date={dayjs(goalDate).format('L')}
          value={goalValue.toString()}
          unit={unit}
        />
        <text transform={`translate(${goalBar.x + goalBar.w / 2} 110)`} textAnchor="middle">
          <DateText>Tavoite</DateText>
        </text>
      </svg>
      <div className="text-center"><small>{ note }</small></div>
    </div>
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
