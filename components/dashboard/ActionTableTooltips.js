import React from 'react';
import styled from 'styled-components';
import dayjs from 'common/dayjs';
import { getActionTaskTermContext, getActionTermContext } from 'common/i18n';
import Icon from 'components/common/Icon';

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

const PhasesTooltipListItem = styled.li`
  color: ${(props) => (props.active === 'true' ? '#333' : '#ccc')};
`;

const TaskTooltip = styled.div``;

const StatusLabel = styled.div`
  &:before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
    margin-bottom: -0.1em;
    border-radius: 50%;
    background-color: ${(props) => props.theme.graphColors[props.color]};
    color: ${(props) => props.theme.graphColors[props.color]};
  }
`;

const Divider = styled.div`
  margin: ${(props) => props.theme.spaces.s025} 0;
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey030};
`;

export const primaryOrgTooltipContent = (t, primaryOrg) => (
  <div>
    <TooltipTitle>{t('common:primary-organization')}</TooltipTitle>
    {primaryOrg}
  </div>
);

export const tasksTooltipContent = (plan, t, taskCounts) => {
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

export const phasesTooltipContent = (
  t,
  hasImplementationPhases,
  status,
  activePhase,
  merged,
  plan
) => {
  const getMergedName = (mergedWith, planId) => {
    if (mergedWith.plan.id !== planId)
      return `${mergedWith.plan.shortName} ${mergedWith.identifier}`;
    else return mergedWith.identifier;
  };

  const statusDisplay = (
    <StatusLabel color={status?.color}>{status.label}</StatusLabel>
  );
  // If action is merged, display merged status
  if (merged)
    return (
      <TooltipTitle>
        {` ${t(
          'actions:action-status-merged',
          getActionTermContext(plan)
        )}: ${getMergedName(merged, plan.id)}.`}
      </TooltipTitle>
    );
  // If action has no active phase or it's cancelled, or plan has no implementation phases : display only status
  if (
    !activePhase ||
    status?.identifier === 'cancelled' ||
    !hasImplementationPhases
  )
    return statusDisplay;

  return (
    <div>
      {statusDisplay}
      <Divider />
      <TooltipTitle>{t('actions:action-implementation-phase')}:</TooltipTitle>
      <PhasesTooltipList>
        {plan.actionImplementationPhases.map((phase) => (
          <PhasesTooltipListItem
            key={phase.id}
            active={(activePhase?.id === phase.id).toString()}
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

export const responsiblesTooltipContent = (t, theme, parties) => {
  if (parties.length < 1)
    return (
      <div>
        <TooltipTitle>{t('common:responsible-parties')}</TooltipTitle>
      </div>
    );
  return (
    <div>
      <TooltipTitle>{t('common:responsible-parties')}</TooltipTitle>
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

export const indicatorsTooltipContent = (t, theme, relatedIndicators) => {
  const hasIndicators = relatedIndicators.length > 0;
  const hasGoals = relatedIndicators.find(
    (ri) => ri.indicator.goals.length > 0
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
      {}
    </div>
  );
};

export const lastUpdatedTooltipContent = (t, updateDate) => (
  <div>
    <TooltipTitle>{t('common:latest-update')}</TooltipTitle>
    {dayjs(updateDate).format('L')}
  </div>
);

export const impactTooltipContent = (t, impact, impacts) => {
  if (!impact) return null;
  const activeImpact = impacts.find((item) => item.id === impact.id);
  return (
    <div>
      <TooltipTitle>{t('common:impact')}</TooltipTitle>
      {activeImpact.identifier !== '0' && (
        <div>
          {activeImpact.identifier}/{impacts.length - 1}
        </div>
      )}
      {activeImpact.name}
    </div>
  );
};
