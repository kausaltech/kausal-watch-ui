import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import ActionCard from './ActionCard';

const ActionsList = styled.ul`
  margin-top: ${(props) => props.theme.spaces.s400};
  padding: 0;
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

const ActionGroupList = styled(Row)`
  padding: 0;
`;

const groupActions = (groupBy, actions, theme) => {
  const groupMap = {};
  const groups = [];
  const noGroupItems = [];

  actions.forEach((action) => {
    let cat;
    cat = action.primaryRootCategory;
    if (groupBy === 'primaryOrg') cat = action.primaryOrg;
    if (groupBy === 'none') cat = false;

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
        displayIdentifier: `${(cat.identifier && theme.settings.categories.showIdentifiers) ? cat.identifier : ''}`,
        name: cat.name,
        identifier: cat.identifier || cat.name,
        order: cat.order,
        elements: [],
      };
      groupMap[cat.id] = group;
      groups.push(group);
    }
    group.elements.push(action);
  });

  if (noGroupItems.length) groups.push({
    id: 'zzzz',
    displayIdentifier: '',
    name: '',
    identifier: 'zzzz',
    elements: noGroupItems,
  });

  return groups.sort((g1, g2) => (g1.order - g2.order))
};
function ActionCardList(props) {
  const { actions, groupBy } = props;
  const theme = useTheme();

  const groups = groupActions(groupBy, actions, theme);

  return (
    <ActionsList>
      {groups.map((group) => (
        <ActionGroup key={group.id} tag="li">
          {groups.length > 1 && <Col xs="12">
            <ActionGroupHeader>
              {group.displayIdentifier && (
                <span className="category-identifier">
                  {`${group.displayIdentifier}. `}
                </span>
              )}
              {group.name}
            </ActionGroupHeader>
          </Col>}
          <Col xs="12">
            <ActionGroupList tag="ul">
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
                >
                  <ActionCard action={item} />
                </Col>
              ))}
            </ActionGroupList>
          </Col>
        </ActionGroup>
      ))}
    </ActionsList>
  );
}

ActionCardList.defaultProps = {
  groupBy: 'category',
};

ActionCardList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupBy: PropTypes.string,
};

export default ActionCardList;
