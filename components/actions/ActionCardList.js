import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import ActionCard from './ActionCard';
import { useTranslations } from 'next-intl';

const ActionsList = styled.ul`
  margin-top: ${(props) => props.theme.spaces.s400};
  padding: 0;
`;

const ActionGroupHeader = styled.h2`
  border-bottom: 1px solid;
  padding-bottom: ${(props) => props.theme.spaces.s100};
  margin-bottom: ${(props) => props.theme.spaces.s200};

  .category-identifier,
  .category-crumb {
    color: ${(props) => props.theme.textColor.tertiary};
  }

  .category-crumb {
    font-size: ${(props) => props.theme.fontSizeLg};
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
const OTHER_GROUP_ID = 'other';

const groupActions = (groupBy, depth, actions, theme, t) => {
  const groupMap = {};
  const groups = [];
  const noGroupItems = [];

  actions.forEach((action) => {
    const { primaryCategories } = action;
    let cat = undefined;
    let categoryCrumb = undefined;
    if (primaryCategories !== undefined) {
      const idx = Math.max(0, primaryCategories.length - 1);
      cat = primaryCategories[idx];
      categoryCrumb =
        primaryCategories.length > 1
          ? primaryCategories.slice(0, idx).map((c) => c.name)
          : undefined;
    }
    if (groupBy === 'primaryOrg') cat = action.primaryOrg;
    if (groupBy === 'none') cat = false;
    if (groupBy === 'plan') cat = action.plan;

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
        crumb: categoryCrumb,
        displayIdentifier: `${
          cat.identifier && !cat.type.hideCategoryIdentifiers
            ? cat.identifier
            : ''
        }`,
        // if cat=plan prefer shortName
        name: cat?.shortName || cat.name,
        identifier: cat.identifier || cat.name,
        order: cat.order,
        elements: [],
      };
      groupMap[cat.id] = group;
      groups.push(group);
    }
    group.elements.push(action);
  });

  if (noGroupItems.length)
    groups.push({
      id: OTHER_GROUP_ID,
      displayIdentifier: '',
      name: t('other'),
      crumb: null,
      identifier: OTHER_GROUP_ID,
      elements: noGroupItems,
    });

  return groups.sort((g1, g2) => g1.order - g2.order);
};

function ActionCardList({
  actions,
  groupBy = 'category',
  headingHierarchyDepth,
  includeRelatedPlans,
  showOtherCategory = true,
}) {
  const theme = useTheme();
  const t = useTranslations();
  const groups = groupActions(
    groupBy,
    headingHierarchyDepth,
    actions,
    theme,
    t
  );
  const actionsById = useMemo(
    () => new Map(actions.map((a) => [a.id, a])),
    [actions]
  );

  const getFullAction = (id) => actionsById.get(id);

  return (
    <ActionsList>
      {groups.map((group) => (
        <ActionGroup key={group.id} tag="li">
          {(groups.length > 1 ||
            (group.id === OTHER_GROUP_ID && showOtherCategory)) && (
            <Col xs="12">
              <ActionGroupHeader>
                {group.crumb && (
                  <>
                    <span className="category-crumb">
                      {group.crumb.join(' ')}
                    </span>
                    <br />
                  </>
                )}
                {group.displayIdentifier && (
                  <span className="category-identifier">
                    {`${group.displayIdentifier}. `}
                  </span>
                )}
                {group.name}
              </ActionGroupHeader>
            </Col>
          )}
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
                  <ActionCard
                    action={item}
                    showPlan={includeRelatedPlans}
                    size="xs"
                    showActionDependencies={true}
                    getFullAction={getFullAction}
                    // showActionDependencies={ // TODO TODO
                    //   !!item.dependencyRole?.id &&
                    //   !!item.allDependencyRelationships?.length
                    // }
                  />
                </Col>
              ))}
            </ActionGroupList>
          </Col>
        </ActionGroup>
      ))}
    </ActionsList>
  );
}

ActionCardList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupBy: PropTypes.string,
  showOtherCategory: PropTypes.bool,
};

export default ActionCardList;
