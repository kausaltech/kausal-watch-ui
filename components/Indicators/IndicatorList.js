import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Card, CardBody,
} from 'reactstrap';
import { Link } from '../../routes';

import { aplans } from '../../common/api';
import styled from 'styled-components';

const IndicatorHeader = styled.h4`
  hyphens: auto;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

class IndicatorList extends React.Component {
  static async fetchData() {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    const resp = await aplans.findAll('indicator', {
      'fields[indicator]': ['name', 'unit_name', 'categories'],
    });

    const props = {
      indicators: resp.data,
    };

    return props;
  }

  render() {
    const { indicators } = this.props;
    return (
      <Row className="mb-5">
        {indicators.map(item => (
          <Col lg="4" md="6" key={item.id} className="mb-4 d-flex align-items-stretch">
            <Card>
              <CardBody>
                <Link route="indicator" params={{ id: item.id }} href>
                  <IndicatorHeader>{item.name}</IndicatorHeader>
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

IndicatorList.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.object),
};

export default IndicatorList;
