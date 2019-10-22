import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import ActionCard from './ActionCard';

function ActionCardList({ actions }) {
  return (
    <Row>
      {actions.map((item) => (
        <Col xs="6" sm="4" lg="3" xl="2" key={item.id} className="mb-4 d-flex align-items-stretch" style={{'transition': 'all 0.5s ease'}}>
          <ActionCard action={item} />
        </Col>
      ))}
    </Row>
  );
}

ActionCardList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionCardList;
