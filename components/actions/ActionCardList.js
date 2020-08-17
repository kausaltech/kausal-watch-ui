import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

import ActionCard from './ActionCard';


const ActionGroupHeader = styled.h2`
  border-bottom: 1px solid;
  padding-bottom: ${(props) => props.theme.spaces.s100};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const ActionGroup = styled(Row)`
  margin-bottom: ${(props) => props.theme.spaces.s200};

  .card {
    height: 100%;
  }
`;

function ActionCardList({ actions }) {
  let groups = [];
  const groupMap = {};
  const noGroupItems = [];

  actions.forEach((action) => {
    const cat = action.rootCategory;
    let group;

    if (!cat) {
      noGroupItems.push(action);
      return;
    }
    if (cat.id in groupMap) {
      group = groupMap[cat.id];
    } else {
      group = {
        id: cat.id,
        name: cat.name,
        identifier: cat.identifier,
        elements: [],
      };
      groupMap[cat.id] = group;
      groups.push(group);
    }
    group.elements.push(action);
  });
  groups = groups.sort((g1, g2) => g1.identifier - g2.identifier);

  return (
    <div>
      {groups.map((group) => (
        <ActionGroup key={group.id}>
          <Col xs="12">
            <ActionGroupHeader>{group.name}</ActionGroupHeader>
          </Col>
          {group.elements.map((item) => (
            <Col
              xs="6"
              sm="4"
              lg="3"
              xl="2"
              key={item.id}
              className="mb-4 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
            >
              <ActionCard action={item} />
            </Col>
          ))}
        </ActionGroup>
      ))}
      {noGroupItems && (
        <ActionGroup key="default">
          {noGroupItems.map((item) => (
            <Col
              xs="6"
              sm="4"
              lg="3"
              xl="2"
              key={item.id}
              className="mb-4 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
            >
              <ActionCard action={item} />
            </Col>
          ))}
        </ActionGroup>
      )}
    </div>
  );
}

ActionCardList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionCardList;
