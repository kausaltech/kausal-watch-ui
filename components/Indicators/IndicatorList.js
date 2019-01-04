import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import {aplans} from '../../common/api';


class IndicatorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static async fetchData() {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    const resp = await aplans.findAll('indicator', {
      "fields[indicator]": ["name", "unit_name", "categories"],
    })

    const props = {
      indicators: resp.data,
    }

    return props
  }
  
  render() {

    return (
      <div>
        <h1 className="mb-4">Mittarit</h1>
        <Row>
          {this.props.indicators.map(item => (
            <Col lg="4" md="6" key={item.id} className="mb-4 d-flex align-items-stretch">
              <h3>{item.name}</h3>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.object),
}

export default IndicatorList
