import React from 'react';

import styled, { keyframes } from 'styled-components';
import Icon from './Icon';

const Loader = styled.div`
  height: 300px;
  padding: 6rem 0;
  margin-bottom: 4rem;
  text-align: center;
  font-size: 4em;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinIcon = styled.div`
  display: inline-block;
  animation: ${rotate360} infinite 2s linear;
`;

class ContentLoader extends React.Component {
  constructor(props) {
    super(props);
    this.enableMessage = this.enableMessage.bind(this);

    this.state = {
      displayMessage: false,
    };
  }

  componentDidMount() {
    // Only display the message and spinner after 250ms has passed
    this.timer = setTimeout(this.enableMessage, 250);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage() {
    this.setState({ displayMessage: true });
  }

  render() {
    const { displayMessage } = this.state;

    if (!displayMessage) {
      return null;
    }

    return (
      <Loader>
        <SpinIcon><Icon name="sync" /></SpinIcon>
        <h5>Ladataan</h5>
      </Loader>
    );
  }
}

export default ContentLoader;
