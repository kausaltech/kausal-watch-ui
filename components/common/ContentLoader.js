import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { withTranslation } from '../../common/i18n';

const pulse = keyframes`
  33% { transform: translateY(10px); }
  66% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Loader = styled.div`
  margin 3rem;
  text-align: center;

  div:nth-child(1) {
    animation: ${pulse} .8s -0.20s infinite ease-in-out;
  }
  div:nth-child(2) {
    animation: ${pulse} .8s -0.10s infinite ease-in-out;
  }
  div:nth-child(3) {
    animation: ${pulse} .8s 0s infinite ease-in-out;
  }
`;

const LoaderSpinner = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin: 3px;
  animation-fill-mode: both;
  display: inline-block;
`;

const ScreenReaders = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
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
    const { t } = this.props;

    if (!displayMessage) {
      return null;
    }

    return (
      <Loader>
        <LoaderSpinner />
        <LoaderSpinner />
        <LoaderSpinner />
        <ScreenReaders>{ t('loading') }</ScreenReaders>
      </Loader>
    );
  }
}

ContentLoader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ContentLoader);
