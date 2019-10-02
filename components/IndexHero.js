import React from 'react';

import { Container } from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../routes';
import { IndicatorLink } from '../common/links';
import Icon from './common/Icon';

const TimeScaleBanner = styled.div`
  background-color: ${props => props.theme.brandLight};
`;

const MainPoint = styled.p`
  font-size: 2.5rem;
  line-height: 1;
  font-weight: 600;
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
        <MainPoint>Helsinki on Hiilineutraali</MainPoint>
        <p className="display-4">27.8.2073</p>
        <IndicatorLink id={5}>
          <ReadMoreLink>
            Lue lisää
            {' '}
            <Icon name="arrowRight" />
          </ReadMoreLink>
        </IndicatorLink>

      </Container>
    </TimeScaleBanner>
    <EmissionScaleBanner className="hero-banner-bottom">
      <Container>
        <p className="lead">Tavoitteen saavuttamiseksi</p>
        <MainPoint>vuositasolla vähennettävä vielä</MainPoint>
        <p className="display-4">
1 857 000 t CO
          <sub>2</sub>
e
        </p>
        <IndicatorLink id={5}>
          <ReadMoreLink>
            Lue lisää
            {' '}
            <Icon name="arrowRight" color="white"/>
          </ReadMoreLink>
        </IndicatorLink>

      </Container>
    </EmissionScaleBanner>
  </div>
);

export default IndexHero;
