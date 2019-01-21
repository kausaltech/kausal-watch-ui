import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Card, CardBody, Badge,
} from 'reactstrap';

import styled from 'styled-components';
import { Link } from '../../routes';

import { aplans } from '../../common/api';
import Icon from '../Common/Icon';

const IndicatorType = styled.div`
  line-height: 1.5rem;
  text-align: center;
  color: #ffffff;
  background-color: ${(props) => {
    switch (props.level) {
      case 'tactical':
        return props.theme.helCopper;
      case 'operational':
        return props.theme.helFog;
      case 'strategic':
        return props.theme.helCoat;
      default:
        return '#cccccc';
    }
  }};
`;

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
      include: ['latest_graph', 'categories'],
      'fields[indicator]': ['name', 'unit_name', 'updated_at', 'level', 'categories', 'latest_graph'],
      'fields[category]': ['identifier', 'name', 'parent'],
    });
    const props = {
      indicators: resp.data,
    };

    return props;
  }

  sortIndicators(indicators) {
    let sorted = indicators;
    sorted = indicators.sort((a, b) => {
      if (a.level < b.level) {
        return -1;
      }
      if (a.level > b.level) {
        return 1;
      }
      return 0;
    });
    return sorted;
  }

  render() {
    const { indicators } = this.props;
    return (
      <Row className="mb-5">
        {this.sortIndicators(indicators).map(item => (
          <Col lg="4" md="6" key={item.id} className="mb-4 d-flex align-items-stretch">
            <Card>
              <IndicatorType level={item.level}>{item.level || <span>no level</span>}</IndicatorType>
              <CardBody>
                <Link route="indicator" params={{ id: item.id }} href>
                  <IndicatorHeader>{item.name}</IndicatorHeader>
                </Link>
                <div>
                  {item.latest_graph !== null
                  && (
                    <span>
                      <Icon name="chartLine" />
                    </span>
                  )
                  }
                </div>
                {item.categories.map(cat => (
                  <Badge color="light" key={cat.id}>{cat.name}</Badge>
                ))}
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
