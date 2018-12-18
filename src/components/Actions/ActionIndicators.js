import React from 'react';
import { Card, CardBody, Col, Badge, Alert } from 'reactstrap';
import createPlotlyComponent from 'react-plotly.js/factory';
import IndicatorGraph from '../Graphs/IndicatorGraph';

import HelIcon from '../Common/HelIcon';

class ActionIndicators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  
  render() {
    const { error, isLoaded, data } = this.state;

    return (
      <div>
      {this.props.indicators.map((indicator) =>
        <div>
          <IndicatorGraph graphId={indicator.relationships.latest_graph.data.id}/>
          <Alert className="mt-3 mb-5">
            Tämä mittari liittyy myös toimenpiteisiin: <Badge>25</Badge> <Badge>28</Badge> <Badge>30</Badge>
            {' '}|{' '}
            <a href={`/indicator/${indicator.id}`}><strong>Katso mittarin tarkemmat tiedot <HelIcon iconName="arrow-right" /></strong></a>
          </Alert>
        </div>
      )}
      </div>
      );
    }
  }

export default ActionIndicators
