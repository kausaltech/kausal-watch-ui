import React from 'react';

import { Container } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../routes';
import Icon from './Common/Icon';

const TimeScaleBanner = styled.div`
  background-color: ${props => props.theme.brandLight};
`;

const EmissionScaleBanner = styled.div`
  background-color: ${props => props.theme.brandDark};
  color: #fff;
  position: relative;
  padding: 6rem 0 3rem;
  
  .container {
    text-align: center;
  }
  
  &::before {
    content: " ";
    @include koro("storm", $hel-summer, 600);
    width: 100%;
    height: 3rem;
    position: absolute;
    top: -5px;
    transform: rotate(180deg);
  }
`;

const ReadMoreLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    color: inherit;
    text-decoration: none;
    opacity: .8;
  }
`;

const IndexHero = () => (
  <div>
    <TimeScaleBanner className="hero-banner-top">
      <Container>
        <p className="lead">Nykyisellä vähennysnopeudella</p>
        <h1 className="display-5">Helsinki on Hiilineutraali</h1>
        <h2 className="display-4">29.1.2079</h2>
        <Link route="indicator" params={{ id: 5 }} passHref={ true }>
          <ReadMoreLink>
            Lue lisää
            {' '}
            <Icon name="arrowRight" />
          </ReadMoreLink>
        </Link>

      </Container>
    </TimeScaleBanner>
    <EmissionScaleBanner>
      <Container>
        <p className="lead">Tavoitteen saavuttamiseksi</p>
        <h1 className="display-5">vuositasolla vähennettävä vielä</h1>
        <h2 className="display-4">
1 963 000 t CO
          <sub>2</sub>
e
        </h2>
        <Link route="indicator" params={{ id: 5 }} passHref={ true }>
          <ReadMoreLink>
            Lue lisää
            {' '}
            <Icon name="arrowRight" color="white"/>
          </ReadMoreLink>
        </Link>

      </Container>
    </EmissionScaleBanner>
  </div>
);

export default IndexHero;
