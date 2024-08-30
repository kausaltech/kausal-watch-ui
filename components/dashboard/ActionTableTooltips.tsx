import React from 'react';

import { ActionStatusSummaryIdentifier } from 'common/__generated__/graphql';
import dayjs from 'common/dayjs';
import { getActionTaskTermContext, getActionTermContext } from 'common/i18n';
import { PhaseTimeline } from 'components/actions/PhaseTimeline';
import ActionAttribute from 'components/common/ActionAttribute';
import Icon from 'components/common/Icon';
import PlanChip from 'components/plans/PlanChip';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import { getTaskCounts } from './cells/TasksStatusCell';
import { ActionListAction, ActionListPlan } from './dashboard.types';

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

interface TooltipProps {
  action: ActionListAction;
}

interface TooltipWithPlanProps extends TooltipProps {
  plan: ActionListPlan;
}

export const OrganizationTooltipContent = ({ action }: TooltipProps) => {
  const t = useTranslations();

  return (
    <div>
      <TooltipTitle>{t('primary-organization')}</TooltipTitle>
      {action.primaryOrg?.name}
    </div>
  );
};

export const TasksTooltipContent = ({ action, plan }: TooltipWithPlanProps) => {
  const t = useTranslations();
  const taskCounts = getTaskCounts(action.tasks, plan, t);

  if (taskCounts.total < 1)
    return (
      <div>
        <TooltipTitle>
          {t('action-no-tasks', getActionTaskTermContext(plan))}
        </TooltipTitle>
      </div>
    );

  return (
    <TaskTooltip>
      <TooltipTitle>
        {t('action-tasks', getActionTaskTermContext(plan))}{' '}
      </TooltipTitle>
      <table>
        <tbody>
          {taskCounts.completed > 0 && (
            <tr>
              <td>{t('tasks-completed', getActionTaskTermContext(plan))}</td>
              <td>{taskCounts.completed}</td>
            </tr>
          )}
          {taskCounts.late > 0 && (
            <tr>
              <td>{t('tasks-late', getActionTaskTermContext(plan))}</td>
              <td>{taskCounts.late}</td>
            </tr>
          )}
          {taskCounts.onTime > 0 && (
            <tr>
              <td>{t('tasks-on-time', getActionTaskTermContext(plan))}</td>
              <td>{taskCounts.onTime}</td>
            </tr>
          )}
        </tbody>
      </table>
    </TaskTooltip>
  );
};

const StyledPhaseTimelineContainer = styled.div`
  margin: ${({ theme }) => theme.spaces.s100} 0;
`;

export const ImplementationPhaseTooltipContent = ({
  action,
  plan,
}: TooltipWithPlanProps) => {
  const t = useTranslations();

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
          'action-status-merged',
          getActionTermContext(plan)
        )}: ${getMergedName(merged, plan.id)}.`}
      </TooltipTitle>
    );
  }

  // If action has no active phase or it's cancelled, or plan has no implementation phases : display only status
  if (
    !activePhase ||
    status?.identifier === ActionStatusSummaryIdentifier.Cancelled
  ) {
    return statusDisplay;
  }

  return (
    <div>
      <TooltipTitle>{t('action-implementation-phase')}:</TooltipTitle>
      <StyledPhaseTimelineContainer>
        {!!action.implementationPhase && (
          <PhaseTimeline
            layout="vertical"
            activePhase={action.implementationPhase}
            phases={plan.actionImplementationPhases}
            isContinuous={action.scheduleContinuous}
          />
        )}
      </StyledPhaseTimelineContainer>
    </div>
  );
};

export const ResponsiblePartiesTooltipContent = ({
  action,
  plan,
}: TooltipWithPlanProps) => {
  const t = useTranslations();
  const theme = useTheme();
  const { organizationTerm } = plan.generalContent;

  const parties = action.responsibleParties;

  if (parties.length < 1)
    return (
      <div>
        <TooltipTitle>
          {t('responsible-parties', { context: organizationTerm })}
        </TooltipTitle>
      </div>
    );

  return (
    <div>
      <TooltipTitle>
        {t('responsible-parties', { context: organizationTerm })}
      </TooltipTitle>
      {/* TODO: Fix missing type property. hasContactPerson is added to actions higher in the component tree */}
      {parties.find((party) => party.hasContactPerson) && (
        <strong>{t('with-contact-persons')}:</strong>
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
        <strong>{t('without-contact-person')}:</strong>
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
  const t = useTranslations();
  const theme = useTheme();

  const hasIndicators =
    action.indicatorsCount != null && action.indicatorsCount > 0;
  const hasGoals = action.hasIndicatorsWithGoals;
  return (
    <div>
      <TooltipTitle>{t('indicators')}</TooltipTitle>
      <Icon.Tachometer
        color={
          hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030
        }
        height="1.2em"
        width="1.2em"
      />
      {hasIndicators
        ? ` ${t('indicators')}: ${action.indicatorsCount}`
        : ` ${t('no-defined-indicators')}`}
      <br />
      <Icon.Bullseye
        color={
          hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030
        }
        height="1.2em"
        width="1.2em"
      />
      {hasGoals ? ` ${t('has-goals')}` : ` ${t('indicator-time-no-goals')}`}
    </div>
  );
};

export const LastUpdatedTooltipContent = ({ action }: TooltipProps) => {
  const t = useTranslations();

  return (
    <div>
      <TooltipTitle>{t('latest-update')}</TooltipTitle>
      {dayjs(action.updatedAt).format('L')}
    </div>
  );
};

export const PlanTooltipContent = ({ action, plan }: TooltipWithPlanProps) => {
  return (
    <div>
      <PlanChip
        planShortName={action.plan?.shortName || action.plan?.name}
        planImage={
          action.plan?.image?.rendition?.src || plan?.image?.rendition?.src
        }
        size="md"
      />
    </div>
  );
};

export const AttributeTooltipContent = ({
  attribute,
  attributeType,
}: TooltipProps) => {
  return (
    <ActionAttribute
      attribute={attribute}
      attributeType={attributeType}
      notitle
    />
  );
};
