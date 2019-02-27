import React from 'react';

import { Container } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../routes';

const HeroBanner = styled.div`
  background-image: url('https://source.unsplash.com/Odf8nPEdRX0');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 32em;
  position: relative;
`;

const BannerContent = styled.div`
  padding: 5em 0;
  max-width: 48em;
  color: #ffffff;
  h1 {
    font-size: 48px;
  }
`;

const ThlHero = () => (
  <HeroBanner>
    <Container>
      <BannerContent>
        <h1>Terveyden ja hyvinvoinnin laitoksen kansanterveystrategia</h1>
        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      </BannerContent>
    </Container>
  </HeroBanner>
);

export default ThlHero;
