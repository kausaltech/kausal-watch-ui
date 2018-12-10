import React from 'react';
import axios from 'axios';
import { Jumbotron, Alert, Container, Row, Col } from 'reactstrap';
import ContentLoader from '../Common/ContentLoader';
import TimeSeries from '../Graphs/TimeSeries';
import Opasnet from '../Graphs/Opasnet';

import styled from 'styled-components';


const IndicatorHero = styled(Jumbotron)`
  margin-bottom: 3rem;
  background-color: #998866;
`


class IndicatorContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: []
    };
  }

  componentDidMount() {
    const apiUrl = `${process.env.GATSBY_HNH_API}/indicator/${this.props.indicator}/`;
    axios.get(apiUrl)
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          data: result.data.data,
        });
      })
     .catch(
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    );
  }
  
  render() {
    const { error, isLoaded, data } = this.state;
    let plot;

    if (typeof window !== 'undefined') {
      plot = <TimeSeries />
    } else {
      plot = <Container />
    }
    
    if (error) {
      return <Alert color="danger">Error: {error.message}</Alert>;
    } else if (!isLoaded) {
      return <ContentLoader />;
    } else {
      return (
        <div className="mb-5">
          <IndicatorHero>
            <h5>Indikaattorit</h5>
            <h1>{data.attributes.name}</h1>
          </IndicatorHero>
          <Container>
            <Row><Col>
              <p>Indicator description goes here</p>
            </Col></Row>
            <Row>
              <Col style={{height: '400px'}}>
                <h5>Kehitysennuste</h5>
                {plot}
              </Col>
            </Row>
            <Row>
              <Col style={{height: '400px'}}>
                <h5>Päästövaikutukset</h5>
                <Opasnet />
              </Col>
            </Row>
            <Row>
              <Col style={{height: '400px'}}>
                <h5>Kustannukset</h5>
                {plot}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}


export default IndicatorContent
