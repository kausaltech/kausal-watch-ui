import React from 'react';

import styled from 'styled-components';

const Connection = styled.div<{
  $hLength: number;
  $vLength: number;
  $offset: number;
  $direction: number;
  $color: string;
  $faded: boolean;
}>`
  position: absolute;
  z-index: 300;
  font-size: 1.2em;
  border-color: ${(props) => props.$color};
  opacity: ${(props) => (props.$faded ? '0.1' : '1')};
  &:before {
    content: '';
    position: absolute;
    width: ${(props) => `${Math.abs(props.$hLength) / 2 + props.$offset}px`};
    left: ${(props) => `${-props.$hLength / 2 - props.$offset}px`};
    bottom: ${(props) => (props.$vLength < 0 ? '0px' : 'none')};
    border-top: 6px solid ${(props) => props.$color};
  }
  &:after {
    content: '';
    position: absolute;
    right: ${(props) => (props.$hLength >= 0 ? '-7px' : 'auto')};
    left: ${(props) => (props.$hLength < 0 ? '7px' : 'auto')};
    bottom: ${(props) => (props.$vLength >= 0 ? '-13px' : 'auto')};
    top: ${(props) => (props.$vLength < 0 ? '-13px' : 'auto')};
    width: 0;
    height: 0;
    transform: ${(props) => `rotate(${props.$direction * 90}deg)`};
    transform-origin: center left;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid ${(props) => props.$color};
  }

  .connection-icon {
    position: absolute;
    bottom: ${(props) => (props.$vLength < 0 ? '-6px' : 'auto')};
    top: ${(props) => (props.$vLength < 0 ? 'auto' : '-6px')};
    left: ${(props) => `${props.$hLength !== 0 ? -props.$hLength / 2 - props.$offset - 8 : -12}px`};
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    background-color: ${(props) => props.$color};
    color: ${(props) => props.theme.themeColors.white};
    border-radius: 50%;
  }
`;

interface ConnectorProps {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  color: string;
  bend?: number;
  icon?: string;
  faded?: boolean;
}

function Connector({ startPoint, endPoint, color, bend, icon, faded = false }: ConnectorProps) {
  const offset = bend ? bend : 0;
  const edgeWidth = endPoint.x - startPoint.x;
  const edgeHeight = endPoint.y - startPoint.y;
  let direction = 0;

  let edgeStyle = {
    width: `${Math.abs(edgeWidth) / 2 - offset}px`,
    height: `${Math.abs(edgeHeight) + 6}px`,
    borderStyle: 'solid',
  };

  // Pointing forward
  if (edgeWidth >= 0) {
    edgeStyle.left = `${startPoint.x + edgeWidth / 2 - 3 + offset}px`;
    edgeStyle.borderLeftWidth = '6px';
    edgeStyle.borderRightWidth = '0px';
  }

  // Pointing backward
  if (edgeWidth < 0) {
    edgeStyle.left = `${endPoint.x + 3}px`;
    edgeStyle.borderLeftWidth = '0';
    edgeStyle.borderRightWidth = '6px';
    edgeStyle.borderStyle = 'solid';
    direction = 2;
  }

  // Pointing down
  if (edgeHeight >= 0) {
    edgeStyle.top = `${startPoint.y - 3}px`;
    edgeStyle.borderTopWidth = '0';
    edgeStyle.borderBottomWidth = '6px';

    if (edgeWidth === 0) {
      direction = 1;
    }
  }

  // Pointing up
  if (edgeHeight < 0) {
    edgeStyle.top = `${endPoint.y - 3}px`;
    edgeStyle.borderTopWidth = '6px';
    edgeStyle.borderBottomWidth = '0';

    if (edgeWidth === 0) {
      direction = -1;
    }
  }

  return (
    <Connection
      $hLength={edgeWidth}
      $vLength={edgeHeight}
      $offset={offset}
      $direction={direction}
      style={edgeStyle}
      $color={color}
      $faded={faded}
    >
      <span className="connection-icon">{icon ? icon : ''}</span>
    </Connection>
  );
}

export default Connector;
