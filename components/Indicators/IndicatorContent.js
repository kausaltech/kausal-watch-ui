import React from 'react';
import { Link } from '../../routes';
import {
  Jumbotron as BaseJumbotron, Alert, Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { aplans } from '../../common/api';
import ContentLoader from '../Common/ContentLoader';
import IndicatorGraph from '../Graphs/IndicatorGraph';


const IndicatorHero = styled(BaseJumbotron)`
  margin-bottom: 2rem;
`;


class IndicatorContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: [],
      relatedIndicators: [],
      indicatorGraphs: [],
      indicators: [],
    };
  }

  componentDidMount() {
    aplans.get(`indicator/${this.props.id}`, {
      params: {
        include: 'related_effects.effect_indicator,related_effects.effect_indicator.latest_graph,related_causes.causal_indicator,related_causes.causal_indicator.latest_graph',
      },
    })
      .then(
        (result) => {
          let relatedIndicators; let indicatorGraphs; let
            indicators = [];
          if (result.data.included) {
            relatedIndicators = result.data.included.filter(item => item.type === 'related_indicator');
            indicatorGraphs = result.data.included.filter(item => item.type === 'indicator_graph');
            indicators = result.data.included.filter(item => item.type === 'indicator');
          }
          this.setState({
            isLoaded: true,
            data: result.data,
            relatedIndicators,
            indicatorGraphs,
            indicators,
          });
        },
      )
      .catch(
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    const { error, isLoaded, data } = this.state;

    if (error) {
      return (
        <Alert color="danger">
Error:
          {error.message}
        </Alert>
      );
    } if (!isLoaded) {
      return <ContentLoader />;
    }
    return (
      <div className="mb-5">
        <IndicatorHero>
          <Container>
            <h5><Link route="indicators"><a>Indikaattorit</a></Link></h5>
            <h1>{data.data.attributes.name}</h1>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: data.data.attributes.description }} />
          </Container>
        </IndicatorHero>
        <Container>
          <Row>
            <Col className="mb-5">
              <h2>Kuvaaja</h2>
              {data.data.relationships.latest_graph.data
                ? <IndicatorGraph graphId={data.data.relationships.latest_graph.data.id} />
                : <h5>Ei kuvaajaa</h5>}
            </Col>
          </Row>


        </Container>
      </div>
    );
  }
}


export default IndicatorContent;
