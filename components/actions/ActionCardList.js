import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import ActionCard from './ActionCard';

const ActionsList = styled.div`
  margin-top: ${(props) => props.theme.spaces.s400};
`;

const ActionGroupHeader = styled.h2`
  border-bottom: 1px solid;
  padding-bottom: ${(props) => props.theme.spaces.s100};
  margin-bottom: ${(props) => props.theme.spaces.s200};

  .category-identifier {
    color: ${(props) => props.theme.graphColors.grey050};
  }
`;

const ActionGroup = styled(Row)`
  margin-bottom: ${(props) => props.theme.spaces.s200};

  .card {
    height: 100%;
  }
`;

function ActionCardList({ actions }) {
  const theme = useTheme();
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
        displayIdentifier: `${theme.settings.categories.showIdentifiers ? cat.identifier : ''}`,
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
    <ActionsList role="list">
      {groups.map((group) => (
        <ActionGroup key={group.id} role="group">
          <Col xs="12">
            <ActionGroupHeader>
              {group.displayIdentifier && (
                <span className="category-identifier">
                  {`${group.displayIdentifier}. `}
                </span>
              )}
              {group.name}
            </ActionGroupHeader>
          </Col>
          {group.elements.map((item) => (
            <Col
              tag="li"
              xs="6"
              sm="4"
              lg="3"
              xl="2"
              key={item.id}
              className="mb-4 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
              role="listitem"
            >
              <ActionCard action={item} />
            </Col>
          ))}
        </ActionGroup>
      ))}
      {noGroupItems && (
        <ActionGroup key="default" role="group">
          {noGroupItems.map((item) => (
            <Col
              xs="6"
              sm="4"
              lg="3"
              xl="2"
              key={item.id}
              className="mb-4 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
              role="listitem"
            >
              <ActionCard action={item} />
            </Col>
          ))}
        </ActionGroup>
      )}
    </ActionsList>
  );
}

ActionCardList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionCardList;
