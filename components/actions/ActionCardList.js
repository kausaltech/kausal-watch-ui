import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

import ActionCard from './ActionCard';


const ActionGroupHeader = styled.h2`
  border-bottom: 1px solid;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const ActionGroup = styled(Row)`
  margin-bottom: 2rem;
`;


function ActionCardList({ actions }) {
  const groups = [];
  const groupMap = {};

  actions.forEach((action) => {
    const cat = action.rootCategory;
    let group;

    if (cat.id in groupMap) {
      group = groupMap[cat.id];
    } else {
      group = {
        name: cat.name,
        elements: [],
      };
      groupMap[cat.id] = group;
      groups.push(group);
    }
    group.elements.push(action);
  });

  return (
    <div>
      {groups.map((group) => (
        <ActionGroup>
          <Col xs="12">
            <ActionGroupHeader>{group.name}</ActionGroupHeader>
          </Col>
          {group.elements.map((item) => (
            <Col xs="6" sm="4" lg="3" xl="2" key={item.id} className="mb-4 d-flex align-items-stretch" style={{'transition': 'all 0.5s ease'}}>
              <ActionCard action={item} />
            </Col>
          ))}
        </ActionGroup>
      ))}
    </div>
  );
}

ActionCardList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionCardList;
