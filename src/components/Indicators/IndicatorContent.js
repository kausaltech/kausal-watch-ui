import React from 'react';
import axios from 'axios';
import { Jumbotron, Alert, Container, Row, Col } from 'reactstrap';
import ContentLoader from '../Common/ContentLoader';
import IndicatorGraph from '../Graphs/IndicatorGraph';

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
      data: [],
      relatedIndicators: [], 
      indicatorGraphs: [], 
      indicators: []
    };
  }

  componentDidMount() {
    const apiUrl = `${process.env.GATSBY_HNH_API}/indicator/${this.props.indicator}/`;
    axios.get(apiUrl, {
      params: {
        include: "related_effects.effect_indicator,related_effects.effect_indicator.latest_graph,related_causes.causal_indicator,related_causes.causal_indicator.latest_graph"
      },
      headers: {'Accept': 'application/vnd.api+json'}
    })
    .then(
      (result) => {
        let relatedIndicators, indicatorGraphs, indicators = [];
        if (result.data.included) {
          relatedIndicators = result.data.included.filter(function(item) {
            return item.type === "related_indicator";
          });
          indicatorGraphs = result.data.included.filter(function(item) {
            return item.type === "indicator_graph";
          });
          indicators = result.data.included.filter(function(item) {
            return item.type === "indicator";
          });
        };
        this.setState({
          isLoaded: true,
          data: result.data,
          relatedIndicators: relatedIndicators, 
          indicatorGraphs: indicatorGraphs, 
          indicators: indicators
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
    
    if (error) {
      return <Alert color="danger">Error: {error.message}</Alert>;
    } else if (!isLoaded) {
      return <ContentLoader />;
    } else {
      return (
        <div className="mb-5">
          <IndicatorHero>
            <Container>
              <h5>Indikaattorit</h5>
              <h1>{data.data.attributes.name}</h1>
              <div className="mt-4" dangerouslySetInnerHTML={{__html: data.data.attributes.description}}/>
            </Container>
          </IndicatorHero>
          <Container>
            <Row>
              <Col className="mb-5">
                <h2>Kuvaaja</h2>
                {data.data.relationships.latest_graph.data ?
                  <IndicatorGraph graphId={data.data.relationships.latest_graph.data.id} />
                  :
                  <h5>Ei kuvaajaa</h5>}
              </Col>
            </Row>


          </Container>
        </div>
      );
    }
  }
}


export default IndicatorContent
