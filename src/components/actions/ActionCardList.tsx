import React from 'react';

import type { Theme } from '@kausal/themes/types';
import { useTranslations } from 'next-intl';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

import type { ActionCardFragment } from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';

import type { ActionListAction, ActionListCategory } from '../dashboard/dashboard.types';
import ActionCard from './ActionCard';

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

type ActionGroup<T extends ActionListAction | ActionCardFragment> = {
  id: string;
  crumb: string[] | null;
  displayIdentifier: string;
  name: string;
  identifier: string;
  order: number;
  elements: T[];
};

function groupActions<T extends ActionListAction | ActionCardFragment>(
  groupBy: ActionCardListProps<T>['groupBy'],
  depth: number,
  actions: T[],
  theme: Theme,
  t: TFunction
) {
  const groupMap: Record<string, ActionGroup<T>> = {};
  const groups: ActionGroup<T>[] = [];
  const noGroupItems: T[] = [];

  actions.forEach((action) => {
    const primaryCategories = 'primaryCategories' in action ? action.primaryCategories : undefined;
    let cat:
      | ActionListAction['primaryOrg']
      | false
      | ActionListAction['plan']
      | ActionCardFragment['plan']
      | ActionListCategory
      | undefined;
    let categoryCrumb: string[] | undefined;
    if (primaryCategories) {
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

    let group: ActionGroup<T>;

    if (!cat) {
      noGroupItems.push(action);
      return;
    }
    if (cat.id in groupMap) {
      group = groupMap[cat.id];
    } else {
      const identifier = 'identifier' in cat && cat.identifier;
      const hideCategoryIdentifiers = 'type' in cat && cat.type.hideCategoryIdentifiers;
      group = {
        id: cat.id,
        crumb: categoryCrumb || null,
        displayIdentifier: `${identifier && !hideCategoryIdentifiers ? identifier : ''}`,
        // if cat=plan prefer shortName
        name: ('shortName' in cat && cat.shortName) || cat.name,
        identifier: ('identifier' in cat && cat.identifier) || cat.name,
        order: ('order' in cat && cat.order) || 0,
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
      order: Infinity,
    });

  return groups.sort((g1, g2) => g1.order - g2.order);
}

type ActionCardListProps<ActionT extends ActionListAction | ActionCardFragment> = {
  actions: ActionT[];
  groupBy: 'category' | 'primaryOrg' | 'none' | 'plan';
  headingHierarchyDepth: number;
  includeRelatedPlans: boolean;
  showOtherCategory?: boolean;
};

function ActionCardList<ActionT extends ActionListAction | ActionCardFragment>({
  actions,
  groupBy = 'category',
  headingHierarchyDepth,
  includeRelatedPlans,
  showOtherCategory = true,
}: ActionCardListProps<ActionT>) {
  const theme = useTheme();
  const t = useTranslations();
  const groups = groupActions(groupBy, headingHierarchyDepth, actions, theme, t);
  const actionsById = new Map(actions.map((a) => [a.id, a]));
  const getFullAction = (id: string) => actionsById.get(id);

  return (
    <ActionsList>
      {groups.map((group) => (
        <ActionGroup key={group.id} tag="li">
          {(groups.length > 1 || (group.id === OTHER_GROUP_ID && showOtherCategory)) && (
            <Col xs="12">
              <ActionGroupHeader>
                {group.crumb && (
                  <>
                    <span className="category-crumb">{group.crumb.join(' ')}</span>
                    <br />
                  </>
                )}
                {group.displayIdentifier && (
                  <span className="category-identifier">{`${group.displayIdentifier}. `}</span>
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
                    getFullAction={getFullAction}
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

export default ActionCardList;
