import React, { useContext } from 'react';
import styled from 'styled-components';
import dayjs from 'common/dayjs';
import {
  getActionTaskTermContext,
  getActionTermContext,
  useTranslation,
} from 'common/i18n';
import Icon from 'components/common/Icon';
import { ActionListAction } from './dashboard.types';
import { PlanContextFragment } from 'common/__generated__/graphql';
import { getTaskCounts } from './cells/TasksStatusCell';
import { useTheme } from 'common/theme';
import { ActionTableContext } from './ActionStatusTable';

const TooltipTitle = styled.p`
  font-weight: ${(props) => props.theme.fontWeightBold};
  margin-bottom: ${(props) => props.theme.spaces.s025};
`;

const ResponsibleTooltipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ResponsibleTooltipListItem = styled.li``;

const PhasesTooltipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PhasesTooltipListItem = styled.li<{ $active: boolean }>`
  color: ${(props) => (props.$active ? '#333' : '#ccc')};
`;

const TaskTooltip = styled.div``;

const StatusLabel = styled.div<{ $color: string }>`
  &:before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
    margin-bottom: -0.1em;
    border-radius: 50%;
    background-color: ${(props) => props.theme.graphColors[props.$color]};
    color: ${(props) => props.theme.graphColors[props.$color]};
  }
`;

const Divider = styled.div`
  margin: ${(props) => props.theme.spaces.s025} 0;
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey030};
`;

interface TooltipProps {
  action: ActionListAction;
}

interface TooltipWithPlanProps extends TooltipProps {
  plan: PlanContextFragment;
}

export const OrganizationTooltipContent = ({ action }: TooltipProps) => {
  const { t } = useTranslation(['common', 'actions']);

  return (
    <div>
      <TooltipTitle>{t('common:primary-organization')}</TooltipTitle>
      {action.primaryOrg?.name}
    </div>
  );
};

export const TasksTooltipContent = ({ action, plan }: TooltipWithPlanProps) => {
  const { t } = useTranslation(['common', 'actions']);
  const taskCounts = getTaskCounts(action.tasks, plan, t);

  if (taskCounts.total < 1)
    return (
      <div>
        <TooltipTitle>
          {t('actions:action-no-tasks', getActionTaskTermContext(plan))}
        </TooltipTitle>
      </div>
    );

  return (
    <TaskTooltip>
      <TooltipTitle>
        {t('actions:action-tasks', getActionTaskTermContext(plan))}{' '}
      </TooltipTitle>
      <table>
        <tbody>
          {taskCounts.completed > 0 && (
            <tr>
              <td>
                {t('actions:tasks-completed', getActionTaskTermContext(plan))}
              </td>
              <td>{taskCounts.completed}</td>
            </tr>
          )}
          {taskCounts.late > 0 && (
            <tr>
              <td>{t('actions:tasks-late', getActionTaskTermContext(plan))}</td>
              <td>{taskCounts.late}</td>
            </tr>
          )}
          {taskCounts.onTime > 0 && (
            <tr>
              <td>
                {t('actions:tasks-on-time', getActionTaskTermContext(plan))}
              </td>
              <td>{taskCounts.onTime}</td>
            </tr>
          )}
        </tbody>
      </table>
    </TaskTooltip>
  );
};

// TODO: Should we split implementation phase and status?
export const ImplementationPhaseTooltipContent = ({
  action,
}: TooltipWithPlanProps) => {
  const { t } = useTranslation(['common', 'actions']);
  const { plan, config } = useContext(ActionTableContext);

  const activePhase = action.implementationPhase;
  const merged = action.mergedWith;
  const status = action.statusSummary;

  if (!plan) {
    return null;
  }

  const getMergedName = (mergedWith, planId) => {
    if (mergedWith.plan.id !== planId) {
      return `${mergedWith.plan.shortName} ${mergedWith.identifier}`;
    } else {
      return mergedWith.identifier;
    }
  };

  const statusDisplay = (
    <StatusLabel $color={status?.color}>{status.label}</StatusLabel>
  );

  // If action is merged, display merged status
  if (merged) {
    return (
      <TooltipTitle>
        {` ${t(
          'actions:action-status-merged',
          getActionTermContext(plan)
        )}: ${getMergedName(merged, plan.id)}.`}
      </TooltipTitle>
    );
  }

  // If action has no active phase or it's cancelled, or plan has no implementation phases : display only status
  if (!activePhase || status?.identifier === 'cancelled') {
    return statusDisplay;
  }

  return (
    <div>
      {!config.hasPhaseAndStatusColumns && (
        <>
          {statusDisplay}
          <Divider />
        </>
      )}
      <TooltipTitle>{t('actions:action-implementation-phase')}:</TooltipTitle>
      <PhasesTooltipList>
        {plan.actionImplementationPhases.map((phase) => (
          <PhasesTooltipListItem
            key={phase.id}
            $active={activePhase.id === phase.id}
          >
            {phase.name}
            {activePhase?.id === phase.id && status.name && !status.isCompleted
              ? ` (${status.name})`
              : ''}
          </PhasesTooltipListItem>
        ))}
      </PhasesTooltipList>
    </div>
  );
};

export const ResponsiblePartiesTooltipContent = ({ action }: TooltipProps) => {
  const { t } = useTranslation(['common', 'actions']);
  const theme = useTheme();

  const parties = action.responsibleParties;

  if (parties.length < 1)
    return (
      <div>
        <TooltipTitle>{t('common:responsible-parties')}</TooltipTitle>
      </div>
    );

  return (
    <div>
      <TooltipTitle>{t('common:responsible-parties')}</TooltipTitle>
      {/* TODO: Fix missing type property. hasContactPerson is added to actions higher in the component tree */}
      {parties.find((party) => party.hasContactPerson) && (
        <strong>{t('common:with-contact-persons')}:</strong>
      )}
      <ResponsibleTooltipList>
        {parties.map((party) =>
          party.hasContactPerson ? (
            <ResponsibleTooltipListItem key={party.id}>
              <Icon
                name={party.hasContactPerson ? 'dot-circle' : 'circle-outline'}
                color={theme.actionOnTimeColor}
                width="1em"
                height="1em"
              />{' '}
              {party.organization.abbreviation || party.organization.name}
            </ResponsibleTooltipListItem>
          ) : null
        )}
      </ResponsibleTooltipList>
      {parties.find((party) => !party.hasContactPerson) && (
        <strong>{t('common:without-contact-person')}:</strong>
      )}
      <ResponsibleTooltipList>
        {parties.map((party) =>
          !party.hasContactPerson ? (
            <ResponsibleTooltipListItem key={party.id}>
              <Icon
                name={party.hasContactPerson ? 'dot-circle' : 'circle-outline'}
                color={theme.actionOnTimeColor}
                width="1em"
                height="1em"
              />{' '}
              {party.organization.abbreviation || party.organization.name}
            </ResponsibleTooltipListItem>
          ) : null
        )}
      </ResponsibleTooltipList>
    </div>
  );
};

export const IndicatorsTooltipContent = ({ action }: TooltipProps) => {
  const { t } = useTranslation(['common', 'actions']);
  const theme = useTheme();

  const relatedIndicators = action.relatedIndicators;
  const hasIndicators = relatedIndicators.length > 0;
  const hasGoals = relatedIndicators.find(
    (ri) => ri.indicator.goals?.length ?? 0 > 0
  );
  return (
    <div>
      <TooltipTitle>{t('common:indicators')}</TooltipTitle>
      <Icon
        name="tachometer"
        color={
          hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030
        }
        height="1.2em"
        width="1.2em"
      />
      {hasIndicators
        ? ` ${t('common:indicators')}: ${relatedIndicators.length}`
        : ` ${t('actions:no-defined-indicators')}`}
      <br />
      <Icon
        name="bullseye"
        color={
          hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030
        }
        height="1.2em"
        width="1.2em"
      />
      {hasGoals
        ? ` ${t('common:has-goals')}`
        : ` ${t('common:indicator-time-no-goals')}`}
    </div>
  );
};

export const LastUpdatedTooltipContent = ({ action }: TooltipProps) => {
  const { t } = useTranslation(['common', 'actions']);

  return (
    <div>
      <TooltipTitle>{t('common:latest-update')}</TooltipTitle>
      {dayjs(action.updatedAt).format('L')}
    </div>
  );
};
