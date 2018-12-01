import React from 'react'

import styled, { keyframes } from 'styled-components';
import helIcons from 'hel-icons/dist/symbol/svg/hel-icons.svg';

const Loader = styled.div`
  height: 300px;
  padding: 6rem 0;
  margin-bottom: 4rem;
  text-align: center;
  font-size: 4em;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinIcon = styled.svg `
  animation: ${rotate360} infinite 2s linear;
  fill: #000000;
  width: 1em !important;
  height: 1em !important;
  vertical-align: -0.1em;
  overflow: hidden;
`

class ContentLoader extends React.Component {

  render() {
    let iconUrl = `${helIcons}#sync`;
    return (
      <Loader>
        <div><SpinIcon><use xlinkHref={iconUrl}></use></SpinIcon></div>
        <h5>Ladataan</h5>
      </Loader>
    );
  }
}

export default ContentLoader
