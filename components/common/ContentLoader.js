import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const Loader = styled.div`
  padding: ${(props) => props.theme.spaces.s800}
    ${(props) => props.theme.spaces.s300};
  text-align: center;
`;

const StyledSpinner = styled(Spinner)`
  width: ${(props) => props.theme.spaces.s100};
  height: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.brandDark};
`;

// FIXME: Migrate to function component and add translation
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

    // const { t } = this.props;
    const t = (x) => x;

    if (!displayMessage) {
      return null;
    }

    return (
      <Loader>
        <StyledSpinner type="grow" className="mx-1" />
        <StyledSpinner type="grow" className="mx-1" />
        <StyledSpinner type="grow" className="mx-1" />
        <div className="visually-hidden">{t('loading')}</div>
      </Loader>
    );
  }
}

export default ContentLoader;
