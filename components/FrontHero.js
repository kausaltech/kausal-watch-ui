import React from 'react';

import { Container } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../routes';

const HeroBanner = styled.div`
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 32em;
  position: relative;
`;

const BannerContent = styled.div`
  padding: 5em 0;
  max-width: 48em;
  margin: 0 auto;
  color: #ffffff;
  text-align: center;
  text-shadow: 3px 3px 8px rgba(0,0,0, 0.3);
  h1 {
    font-size: 48px;
  }
`;

class FrontHero extends React.Component {
  render() {
    const { bgImage, heroText } = this.props;
    return (
      <HeroBanner bgImage={bgImage}>
        <Container>
          <BannerContent>
            <h1>{ heroText }</h1>
          </BannerContent>
        </Container>
      </HeroBanner>
    );
  }
}

export default FrontHero;
