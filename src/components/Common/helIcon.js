import React from 'react';
import helIcons from 'hel-icons/dist/symbol/svg/hel-icons.svg';
import styled from 'styled-components';

const StyledIcon = styled.svg`
  fill: currentColor;
  width: 1em !important;
  height: 1em !important;
  vertical-align: -0.1em;
  overflow: hidden;
`

class HelIcon extends React.Component {
  render() {
    let iconUrl = `${helIcons}#${this.props.iconName}`
    return (
      <StyledIcon aria-hidden="true"><use xlinkHref={iconUrl}></use></StyledIcon>
    );
  }
}

export default HelIcon
