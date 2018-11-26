import React from 'react'
import { Container } from 'reactstrap';

import styled from 'styled-components';

const TimeScaleBanner = styled.div`
  background-color: ${props => props.theme.helSummer};
`
const EmissionScaleBanner = styled.div`
  background-color: ${props => props.theme.helTram};
`

const IndexHero = () => (
  <div>
    <TimeScaleBanner className="hero-banner-top">
      <Container>
        <p className="lead">Nykyisellä vähennysnopeudella</p>
        <h1 className="display-5">Helsinki on Hiilineutraali</h1>
        <h2 className="display-4">23.3.2076</h2>
        <p>Lue lisää >></p>
      </Container>
    </TimeScaleBanner>
    <EmissionScaleBanner className="hero-banner-bottom">
      <Container>
        <h1 className="display-5">Vähennettävää vielä</h1>
        <h2 className="display-4">1 780 0000 t CO<sub>2</sub>e</h2>
        <p>Lue lisää >></p>
      </Container>
    </EmissionScaleBanner>
  </div>
)

export default IndexHero
