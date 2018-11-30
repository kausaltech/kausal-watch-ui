import React from 'react'

import styled, { keyframes } from 'styled-components';
import helIcons from 'hel-icons/dist/symbol/svg/hel-icons.svg';

const Loader = styled.div`
  height: 300px;
  padding: 6rem 0;
  margin-bottom: 4rem;
  text-align: center;
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
  animation: ${rotate360} infinite 3s linear;
`

class ContentLoader extends React.Component {

  render() {
    let iconUrl = `${helIcons}#sync`;
    return (
      <Loader>
        <h3 className="display-2"><SpinIcon className="icon"><use xlinkHref={iconUrl}></use></SpinIcon></h3>
        <h5>Ladataan</h5>
      </Loader>
    );
  }
}

export default ContentLoader
