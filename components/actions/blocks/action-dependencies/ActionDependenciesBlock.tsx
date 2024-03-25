import React from 'react';
import styled, { css } from 'styled-components';
import { filter, groupBy, map, sortBy, uniqBy } from 'lodash';
import {
  ActionCardFragment,
  GetActionDetailsQuery,
  GetPlanContextQuery,
} from '@/common/__generated__/graphql';
import { ActionDependenciesGroup } from './ActionDependenciesGroup';
import Icon from '@/components/common/Icon';
import { ACTION_CONTENT_MAIN_BOTTOM } from '@/constants/containers';
import { useTranslations } from 'next-intl';
import { getActionTermContext } from '@/common/i18n';
import { usePlan } from '@/context/plan';
import PopoverTip from '@/components/common/PopoverTip';
import { SectionHeader } from '../../ActionContent';

type ActionGroup = {
  id: string;
  title: string;
  actions: ActionCardFragment[];
};

type Props = {
  activeActionId?: string;
  size?: 'default' | 'small';
  actionGroups: ActionGroup[];
  showTitle?: boolean;
  title?: string;
  helpText?: string;
};

const StyledIcon = styled(Icon)``;

const StyledWrapper = styled.div<{ $isVertical: boolean; $isSmall: boolean }>`
  display: flex;
  width: 100%;
  gap: ${({ theme, $isSmall }) =>
    $isSmall ? theme.spaces.s000 : theme.spaces.s025};
  color: ${({ theme }) => theme.graphColors.grey020};

  ${({ theme, $isVertical }) =>
    $isVertical
      ? css`
          flex-direction: column;
          align-items: center;

          ${StyledIcon} {
            transform: rotate(90deg);
          }
        `
      : css`
          @media (max-width: ${theme.breakpointMd}) {
            flex-direction: column;

            ${StyledIcon} {
              transform: rotate(90deg);
            }
          }

          @container ${ACTION_CONTENT_MAIN_BOTTOM} (max-width: ${theme.breakpointSm}) {
            flex-direction: column;

            ${StyledIcon} {
              transform: rotate(90deg);
            }
          }
        `}
`;

function isActionGroupActive(
  actions: ActionCardFragment[],
  activeActionId?: string
) {
  return actions.length === 1 && actions[0].id === activeActionId;
}

type Action = NonNullable<GetActionDetailsQuery['action']>;

export function mapActionToDependencyGroups(
  action: Action | ActionCardFragment,
  actionDependencyRoles: NonNullable<
    GetPlanContextQuery['plan']
  >['actionDependencyRoles']
): ActionGroup[] {
  if (
    !action.dependencyRole ||
    !action.allDependencyRelationships?.length ||
    !actionDependencyRoles?.length
  ) {
    return [];
  }

  function getDependencyRoleName(roleId: string) {
    return (
      actionDependencyRoles.find((role) => role.id === roleId)?.name ?? roleId
    );
  }

  const flatDependencyList = action.allDependencyRelationships.reduce(
    (groups, relationship) => [
      ...groups,
      relationship.preceding,
      relationship.dependent,
    ],
    []
  );
  const uniqueActions = uniqBy(flatDependencyList, 'id');
  const groupedActionsByRole = groupBy(
    filter(uniqueActions, 'dependencyRole.id'),
    'dependencyRole.id'
  );
  const sortedGroupedActions = sortBy(
    map(groupedActionsByRole, (actions, roleId) => ({
      id: roleId,
      title: getDependencyRoleName(roleId),
      actions,
    })),
    (group) => actionDependencyRoles.findIndex((role) => role.id === group.id)
  );

  return sortedGroupedActions;
}

export function ActionDependenciesBlock({
  activeActionId,
  actionGroups,
  size = 'default',
  showTitle = false,
  title,
  helpText,
}: Props) {
  const t = useTranslations();
  const plan = usePlan();

  if (!actionGroups.length) {
    return null;
  }

  return (
    <div>
      {showTitle && (
        <SectionHeader>
          {title || t('action-dependencies', getActionTermContext(plan))}
          {helpText && (
            <PopoverTip
              content={helpText}
              identifier="action-dependencies-help"
            />
          )}
        </SectionHeader>
      )}
      <StyledWrapper
        className="mb-5"
        $isVertical={size === 'small'}
        $isSmall={size === 'small'}
      >
        {actionGroups.map((actionGroup, i) => (
          <React.Fragment key={actionGroup.id}>
            <ActionDependenciesGroup
              title={actionGroup.title}
              isHighlighted={isActionGroupActive(
                actionGroup.actions,
                activeActionId
              )}
              actions={actionGroup.actions}
              size={size}
            />

            {i !== actionGroups.length - 1 && (
              <StyledIcon name="arrow-right" width="2em" height="2em" />
            )}
          </React.Fragment>
        ))}
      </StyledWrapper>
    </div>
  );
}
