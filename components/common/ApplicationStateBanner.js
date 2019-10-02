import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'reactstrap';

const Banner = styled.div`
  padding: 1.5em 0;
  font-size: 80%;
  background-color: ${props => props.theme.themeColors.black};
  color: ${props => props.theme.themeColors.light};
`;

const State = styled.strong`

  color: ${props => props.theme.brandLight};
  margin-right: .5em;
`;

export default function ApplicationStateBanner(props) {
  const { state } = props;

  return (
    <Banner>
      <Container><State>ALPHA</State> Tämä on palvelun kehitysversio</Container>
    </Banner>
  );
}

ApplicationStateBanner.propTypes = {
  state: PropTypes.string.isRequired,
};
