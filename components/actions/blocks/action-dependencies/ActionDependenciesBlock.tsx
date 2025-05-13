import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { useEffect, Suspense } from 'react';
import ErrorMessage from 'components/common/ErrorMessage';
import styled, { css } from 'styled-components';
import { filter, groupBy, map, sortBy, uniqBy } from 'lodash';
import { gql } from '@apollo/client';
import {
  ActionCardFragment,
  GetActionDetailsQuery,
  GetPlanContextQuery,
  ActionDependenciesQuery,
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
  action: Action;
  activeActionId?: string;
  size?: 'default' | 'small';
  showTitle?: boolean;
  title?: string;
  helpText?: string;
  getFullAction: (id: string) => Action;
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
  >['actionDependencyRoles'],
  getFullAction: (id: string) => Action
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
  const expandedActions = uniqueActions.map((a) =>
    Object.assign({}, getFullAction(a.id), a)
  );

  const groupedActionsByRole = groupBy(
    filter(expandedActions, 'dependencyRole.id'),
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

const GET_ACTION_DEPS = gql`
  query ActionDependencies($action: ID!) {
    action(id: $action) {
      dependencyRole {
        id
        name
      }
      allDependencyRelationships {
        preceding {
          id
          dependencyRole {
            id
          }
        }
        dependent {
          id
          dependencyRole {
            id
          }
        }
      }
    }
  }
`;

export function ActionDependenciesBlock({
  action,
  activeActionId,
  size = 'default',
  showTitle = false,
  title,
  helpText,
  getFullAction,
}: Props) {
  const t = useTranslations();
  const plan = usePlan();
  const { error, data } = useSuspenseQuery<ActionDependenciesQuery>(
    GET_ACTION_DEPS,
    {
      variables: {
        plan: plan.identifier,
        action: activeActionId,
        // workflow, TODO workflow
      },
    }
  );

  if (error)
    return (
      <ErrorMessage
        message={t('error-loading-actions', getActionTermContext(plan))}
      />
    );

  const actionGroups = mapActionToDependencyGroups(
    data.action,
    plan.actionDependencyRoles,
    getFullAction
  );

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
