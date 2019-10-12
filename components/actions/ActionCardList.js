import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import ActionCard from './ActionCard';

function ActionCardList({ actions }) {
  return (
    <Row>
      {actions.map((item) => (
        <Col lg="4" sm="6" key={item.id} className="mb-4 d-flex align-items-stretch">
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
