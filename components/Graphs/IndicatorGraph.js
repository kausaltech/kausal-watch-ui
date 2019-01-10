import React from 'react';
import {
  Card, CardBody, Col, Alert,
} from 'reactstrap';
import createPlotlyComponent from 'react-plotly.js/factory';
import { aplans } from '../../common/api';

import ContentLoader from '../Common/ContentLoader';

class IndicatorGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: [],
    };
  }

  componentDidMount() {
    aplans.get(`indicator_graph/${this.props.graphId}/`).then(
      (result) => {
        this.setState({
          isLoaded: true,
          data: result.data.data.attributes.data,
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
    const Plot = createPlotlyComponent(window.Plotly);
    return (
      <Card>
        <CardBody>
          <Col sm="12" style={{ height: '400px' }}>
            <Plot
              data={data.data}
              layout={data.layout}
              style={{ width: '100%', height: '100%' }}
            />
          </Col>
        </CardBody>
      </Card>
    );
  }
}


export default IndicatorGraph;
