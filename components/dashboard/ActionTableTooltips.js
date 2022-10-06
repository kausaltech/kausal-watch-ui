import React from 'react';
import styled from 'styled-components';
import dayjs from 'common/dayjs';
import { getActionTermContext } from 'common/i18n';
import Icon from 'components/common/Icon';

const ResponsibleTooltipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ResponsibleTooltipListItem = styled.li`
`;

const PhasesTooltipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PhasesTooltipListItem = styled.li`
  color: ${(props) => props.active === 'true' ? '#333' : '#ccc'};
`;

const TaskTooltip = styled.div`

`;

export const primaryOrgTooltipContent = (t, primaryOrg) => (
  <div>
    <h5>{ t('common:primary-organization') }</h5>
    { primaryOrg}
  </div>
);

export const tasksTooltipContent = (t, taskCounts) => {
  if (taskCounts.total < 1) return <div><h5>{ t('actions:action-no-tasks') }</h5></div>
  return (
  <TaskTooltip>
    <h5>{ t('actions:action-tasks') } </h5>
    <table>
      <tbody>
        { taskCounts.completed > 0 && (
          <tr>
            <td>{t('actions:tasks-completed')}</td>
            <td>{taskCounts.completed}</td>
          </tr>
        ) }
     { taskCounts.late > 0 && <tr><td>{ t('actions:tasks-late') }</td><td>{ taskCounts.late }</td></tr> }
     { taskCounts.onTime > 0 && <tr><td>{ t('actions:tasks-on-time') }</td><td>{ taskCounts.onTime }</td></tr> }
     </tbody>
    </table>
  </TaskTooltip>
)};

export const phasesTooltipContent = (t, hasImplementationPhases, status, activePhase, merged, plan) => {

  const getMergedName = (mergedWith, planId) => {
    if (mergedWith.plan.id !== planId) return `${mergedWith.plan.shortName} ${mergedWith.identifier}`;
    else return mergedWith.identifier;
  };

  if (merged) return (
    <div>
      <h5>
        { ` ${t('actions:action-status-merged', getActionTermContext(plan))}: ${getMergedName(merged, plan.id)}.` }
      </h5>
    </div>
  )
  if (!activePhase) return (
    <div>
      {!status?.name && <h5>{ t('actions:action-implementation-phase-unknown')}</h5>}
      {status?.name}
    </div>
  )
  if (status?.identifier === 'cancelled') return (
    <div>
      <h5>{ status.name }</h5>
    </div>
  )
  return hasImplementationPhases ?
  (
    <div>
      <h5>{ t('actions:action-implementation-phase') }</h5>
      <PhasesTooltipList>
      {plan.actionImplementationPhases.map((phase) => (
        <PhasesTooltipListItem key={phase.id} active={(activePhase?.id === phase.id).toString()}>
          {phase.name}
          {activePhase?.id === phase.id && status.name && !status.isCompleted ? ` (${status.name})` : ''}
        </PhasesTooltipListItem>
      ))}
      </PhasesTooltipList>
    </div>
  ) : (
    <div>
      <h5>Status</h5>
      {status.name}
    </div>
  )
};

export const responsiblesTooltipContent = (t, theme, parties) => {
  if (parties.length < 1) return (
    <div>
      <h5>{ t('common:responsible-parties') }</h5>
    </div>
  )
  return (
  <div>
    <h5>{ t('common:responsible-parties') }</h5>
    { parties.find((party) => party.hasContactPerson) && <strong>{ t('common:with-contact-persons') }:</strong>}
    <ResponsibleTooltipList>
      {parties.map((party) => (
        party.hasContactPerson ? (
          <ResponsibleTooltipListItem key={party.id}>
            <Icon
              name={party.hasContactPerson ? 'dot-circle' : 'circle-outline'}
              color={theme.actionOnTimeColor}
              width="1em"
              height="1em"
            />
            {' '}
            {party.organization.abbreviation || party.organization.name }
          </ResponsibleTooltipListItem>
        ) : null
      ))}
    </ResponsibleTooltipList>
    { parties.find((party) => !party.hasContactPerson) && <strong>{ t('common:without-contact-person') }:</strong>}
    <ResponsibleTooltipList>
      { parties.map((party) => (
        !party.hasContactPerson ? (
          <ResponsibleTooltipListItem key={party.id}>
            <Icon
              name={party.hasContactPerson ? 'dot-circle' : 'circle-outline'}
              color={theme.actionOnTimeColor}
              width="1em"
              height="1em"
            />
            {' '}
            {party.organization.abbreviation || party.organization.name }
          </ResponsibleTooltipListItem>
        ) : null
      ))}
    </ResponsibleTooltipList>
  </div>
)};

export const indicatorsTooltipContent = (t, theme, relatedIndicators) => {
  const hasIndicators = relatedIndicators.length > 0;
  const hasGoals = relatedIndicators.find((ri) => ri.indicator.goals.length > 0);
  return (
    <div>
      <h5>{ t('common:indicators') }</h5>
      <Icon
        name="tachometer"
        color={hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
      {hasIndicators
        ? ` ${t('common:indicators')}: ${relatedIndicators.length}`
        : ` ${t('actions:no-defined-indicators')}`}<br />
      <Icon
        name="bullseye"
        color={hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
      { hasGoals ? ` ${t('common:has-goals')}` : ` ${t('common:indicator-time-no-goals')}` }
      {}
    </div>
  )
};

export const lastUpdatedTooltipContent = (t, updateDate) => (
  <div>
    <h5>{ t('common:latest-update') }</h5>
    {dayjs(updateDate).format('L')}
  </div>
);

export const impactTooltipContent = (t, impact, impacts) => {
  if (!impact) return null;
  const activeImpact = impacts.find((item) => item.id === impact.id);
  return (
  <div>
    <h5>{ t('common:impact') }</h5>
    {activeImpact.identifier !== '0' && <div>{activeImpact.identifier}/{impacts.length - 1}</div>}
    {activeImpact.name}
  </div>
)};
