import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Alert } from 'reactstrap';
import IndicatorGraph from '../Graphs/IndicatorGraph';

import Icon from '../Common/Icon';

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
        {this.props.indicators.map(indicator => (
          <div key={indicator.id}>
            {(indicator.latest_graph && indicator.latest_graph.data)
              ? <IndicatorGraph graphId={indicator.latest_graph.id} />
              : (
                <div>
                  <h4>
                    {indicator.name}
                  </h4>
                  <Badge color="light">ei graafia</Badge>
                </div>
              )
            }
            <Alert className="mt-3 mb-5">
            Tämä mittari liittyy myös toimenpiteisiin:
              {' '}
              <Badge>-</Badge>
              {' '}
              <Badge>-</Badge>
              {' '}
              <Badge>-</Badge>
              {' '}
|
              {' '}
              <a href={`/indicator/${indicator.id}`}>
                <strong>
Katso mittarin tarkemmat tiedot
                  <Icon name="arrowRight" color="props.theme.brandDark" />
                </strong>
              </a>
            </Alert>
          </div>
        ))}
      </div>
    );
  }
}

ActionIndicators.propTypes = {
  indicators: PropTypes.array,
};

export default ActionIndicators;
