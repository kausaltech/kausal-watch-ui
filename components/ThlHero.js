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
  margin: 0 auto;
  color: #ffffff;
  text-align: center;
  text-shadow: 3px 3px 8px rgba(0,0,0, 0.3);
  h1 {
    font-size: 48px;
  }
`;

const ThlHero = () => (
  <HeroBanner>
    <Container>
      <BannerContent>
        <h2>Suomessa on tautitaakkaa vielä</h2>
        <h1>1 605 238</h1>
        <h2>haittapainotettua elinvuotta</h2>
        <h1>—</h1>
        <h2>Se on kasvanut vuodesta</h2>
        <h1>2016 vuoteen 2017 1,1 %</h1>
      </BannerContent>
    </Container>
  </HeroBanner>
);

export default ThlHero;
