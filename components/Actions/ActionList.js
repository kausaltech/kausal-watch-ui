import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert } from 'reactstrap';

import ActionCard from './ActionCard';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        {this.props.actions.map(item => (
          <Col lg="4" sm="6" key={item.id} className="mb-4 d-flex align-items-stretch">
            <ActionCard action={item} />
          </Col>
        ))}
      </Row>
    );
  }
}

ActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
};

export default ActionList;
