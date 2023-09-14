import React from 'react';

import styled from 'styled-components';

const Connection = styled.div`
  position: absolute;
  z-index: 300;
  font-size: 3px;
  border-color: ${(props) => props.color};
  opacity: 0.7;
  &:before {
    content: '';
    position: absolute;
    width: ${(props) => `${Math.abs(props.hLength) / 2 + props.offset}px`};
    left: ${(props) => `${-props.hLength / 2 - props.offset}px`};
    bottom: ${(props) => (props.vLength < 0 ? '0px' : 'none')};
    border-top: 6px solid ${(props) => props.color};
  }
  &:after {
    content: '';
    position: absolute;
    right: ${(props) => (props.hLength >= 0 ? '-7px' : 'auto')};
    left: ${(props) => (props.hLength < 0 ? '7px' : 'auto')};
    bottom: ${(props) => (props.vLength >= 0 ? '-13px' : 'auto')};
    top: ${(props) => (props.vLength < 0 ? '-13px' : 'auto')};
    width: 0;
    height: 0;
    transform: ${(props) => `rotate(${props.direction * 90}deg)`};
    transform-origin: center left;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid ${(props) => props.color};
  }
`;

function Connector(props) {
  const { startPoint, endPoint, color, bend } = props;

  const offset = bend ? bend : 0;
  const edgeWidth = endPoint.x - startPoint.x;
  const edgeHeight = endPoint.y - startPoint.y;
  let direction = 0;

  let edgeStyle = {
    width: `${Math.abs(edgeWidth) / 2 - offset}px`,
    height: `${Math.abs(edgeHeight) + 6}px`,
    borderStyle: 'solid',
  };

  if (edgeWidth >= 0) {
    edgeStyle.left = `${startPoint.x + edgeWidth / 2 - 3 + offset}px`;
    edgeStyle.borderLeftWidth = '6px';
    edgeStyle.borderRightWidth = '0px';
  }

  if (edgeWidth < 0) {
    edgeStyle.left = `${endPoint.x + 3}px`;
    edgeStyle.borderLeftWidth = '0';
    edgeStyle.borderRightWidth = '6px';
    edgeStyle.borderStyle = 'solid';
    direction = 2;
  }

  if (edgeHeight >= 0) {
    edgeStyle.top = `${startPoint.y - 3}px`;
    edgeStyle.borderTopWidth = '0';
    edgeStyle.borderBottomWidth = '6px';

    if (edgeWidth === 0) {
      direction = 1;
    }
  }

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
      hLength={edgeWidth}
      vLength={edgeHeight}
      offset={offset}
      direction={direction}
      style={edgeStyle}
      color={color}
    />
  );
}

export default Connector;
