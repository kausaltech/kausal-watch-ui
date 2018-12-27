import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Alert } from 'reactstrap';
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
    return (
      <div>
        {this.props.indicators.map((indicator) =>
        <div key={indicator.id}>
           {indicator.relationships.latest_graph.data  ?            
              <IndicatorGraph graphId={indicator.relationships.latest_graph.data.id}/>
                :
              <h2>{indicator.attributes.name} (ei graafia)</h2>
            }
          <Alert className="mt-3 mb-5">
            Tämä mittari liittyy myös toimenpiteisiin: <Badge>25</Badge> <Badge>28</Badge> <Badge>30</Badge>
            {' '}|{' '}
            <a href={`/indicator/${indicator.id}`}>
              <strong>Katso mittarin tarkemmat tiedot <HelIcon iconName="arrow-right" /></strong>
            </a>
          </Alert>
        </div>
      )}
      </div>
      );
    }
  }

ActionIndicators.propTypes = {
  indicators: PropTypes.array
}

export default ActionIndicators
