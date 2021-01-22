import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BarBase = styled.rect`

`;

const DateText = styled.tspan`
  fill: #333;
  font-size: 14px;
`;

const ValueText = styled.tspan`
  fill: #333;
  font-size: 20px;
  font-weight: 700;
`;

const UnitText = styled.tspan`
  fill: #333;
  font-size: 14px;
`;

const IndicatorProgressBar = (props) => {
  const {
    startDate, startValue,
    latestDate, latestValue,
    goalDate, goalValue,
    unit } = props;

  const canvas = { w: 800, h:240 };
  const bar = { w: 720, h: 32 };
  const scale = (bar.w-8)/startValue;
  const latestBar = { x: 44, w: (startValue-latestValue)*scale }
  const distanceBar = { x: 44+latestBar.w, w: (latestValue-goalValue)*scale }
  const goalBar = { x: 44+latestBar.w + distanceBar.w, w: (goalValue)*scale }


  return (
    <div>
      <svg viewBox={`0 0 ${canvas.w} ${canvas.h}`}>
        <title>Helsingin päästötilanne</title>
        <BarBase
          x="40" y="60"
          width={bar.w} height={bar.h} fill="#eeeeee"/>
        <BarBase
          x={latestBar.x} y="64"
          width={latestBar.w} height={bar.h-8} fill="grey"/>
        <text transform={`translate(${latestBar.x} 30)`} >
          <DateText>{startDate}</DateText>
          <ValueText x="0" dy="18">{startValue}</ValueText>
          <UnitText>{unit}</UnitText>
        </text>

        <BarBase
          x={distanceBar.x} y="64"
          width={distanceBar.w} height={bar.h-8} fill="red" />
        <text transform={`translate(${distanceBar.x} 30)`} >
          <DateText>{latestDate}</DateText>
          <ValueText x="0" dy="18">{latestValue}</ValueText>
          <UnitText>{unit}</UnitText>
        </text>
        <BarBase
          x={goalBar.x} y="64"
          width={goalBar.w} height={bar.h-8} fill="green"/>
        <text transform={`translate(${goalBar.x} 30)`} >
          <DateText>{goalDate}</DateText>
          <ValueText x="0" dy="18">{goalValue}</ValueText>
          <UnitText>{unit}</UnitText>
        </text>
      </svg>
      {goalValue}

    </div>
  )
}

export default IndicatorProgressBar;
