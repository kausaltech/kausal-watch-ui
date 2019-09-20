import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledKoro = styled.section`

  &::before {
    content: " ";
    @include koro("storm", $hel-tram, 600);
    background-image: ${props => props.koroShape};
    background-size: ${props => ((props.scale / 100 * 20))}px ${props => ((props.scale / 100 * 800))}px;
    background-position: top;
    background-repeat: repeat-x;
    width: 100%;
    height: $spacer * 3;
    position: absolute;
    top: $spacer * -3;
  }
`;

function getShape(shapeName, shapeColor) {
  switch (shapeName) {
    case 'beat':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 20 800' style='enable-background:new 0 0 20 800;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .kf%7Bfill:%23${shapeColor};%7D %3C/style%3E %3Ctitle%3Ekoro-beat-fog-0%3C/title%3E %3Cpath class='kf' d='M800.7,800h0.3H-1'/%3E %3Cpath class='kf' d='M20,800H0V0c2.8,0,3.5,2.3,3.5,2.3l2.8,8.4c0.6,1.5,1.9,2.5,3.6,2.5c2.8,0,3.6-2.5,3.6-2.5s2.8-8.1,2.8-8.2 C17,1,18.3,0,20,0V800z'/%3E %3C/svg%3E`;
    case 'pulse':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 20 800' style='enable-background:new 0 0 20 800;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .kf%7Bfill:%23#${shapeColor};%7D %3C/style%3E %3Ctitle%3Ekoro-pulse-fog-0%3C/title%3E %3Cpath class='kf' d='M0,799.9l800-0.7'/%3E %3Cpath class='kf' d='M0,800h20V0c-5.1,0-5.1,6.4-10,6.4S4.9,0,0,0V800z'/%3E %3C/svg%3E`;
    case 'storm':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 20 800' style='enable-background:new 0 0 20 800;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .kf%7Bfill:%23${shapeColor};%7D %3C/style%3E %3Ctitle%3Ekoro-storm-fog-0%3C/title%3E %3Cpath class='kf' d='M20,800V0c-2.3,5.5-8.7,8.1-14.3,5.7C3.1,4.7,1.2,2.6,0,0v800H20z'/%3E %3C/svg%3E`;
    case 'wave':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 20 800' style='enable-background:new 0 0 20 800;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .kf%7Bfill:%23${shapeColor};%7D %3C/style%3E %3Ctitle%3Ekoro-wave-fog-0%3C/title%3E %3Cpolygon class='kf' points='0,800 20,800 20,0 9.8,10.1 0,0 '/%3E %3C/svg%3E`;
  }
}

class Koro extends React.Component {
  static defaultProps = {
    style: 'beat',
    color: '#000000',
    scale: '600',
  }

  render() {
    const { style, color, scale, children } = this.props;
    const shape = getShape(style, color);

    return (
      <StyledKoro koroShape={`url("${shape}")`} >
        {children}
      </StyledKoro>
    );
  }
}

Koro.propTypes = {
  style: PropTypes.string,
  color: PropTypes.string,
  scale: PropTypes.string,
};

export default Koro;
