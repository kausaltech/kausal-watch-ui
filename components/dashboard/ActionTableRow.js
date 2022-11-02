import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import dayjs from 'common/dayjs';
import { getActionTermContext, useTranslation } from 'common/i18n';
import StatusBadge from 'components/common/StatusBadge';
import ActionImpact from 'components/actions/ActionImpact';
import ActionPhase from 'components/actions/ActionPhase';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';
import { cleanActionStatus } from 'common/preprocess';
import {
  primaryOrgTooltipContent,
  tasksTooltipContent,
  phasesTooltipContent,
  responsiblesTooltipContent,
  indicatorsTooltipContent,
  lastUpdatedTooltipContent,
  impactTooltipContent } from './ActionTableTooltips';


const StyledRow = styled.tr`
  font-family: ${(props) => props.theme.fontFamilyContent};

  &.merged {
    opacity: .25;
  }

  td {
    vertical-align: top;
    min-height: 1px;

    &.has-tooltip > a {
      display: block;
      width: 100%;
      height: 100%;
    }

    &.has-tooltip:hover {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }
  }

  a {
    color: ${(props) => props.theme.themeColors.black};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const OrgLogo = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces.s200};
  height: ${(props) => props.theme.spaces.s200};
`;

const StatusDisplay = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  height: 100%;
`;

const ResponsibleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.spaces.s050};
`;

const UpdatedAgo = styled.div`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  white-space: nowrap;
  cursor: default;
  padding: ${(props) => props.theme.spaces.s050};
`;

const TaskTooltip = styled.div`

`;

const TaskStatusViz = styled.div`
  display: flex;
  min-width: ${(props) => props.theme.spaces.s600};
  height: 8px;
  margin-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.themeColors.light};

  .on-time {
    display: inline-block;
    background-color: ${(props) => props.theme.graphColors.green010};
  }
  .late {
    display: inline-block;
    background-color: ${(props) => props.theme.graphColors.yellow050};
  }
  .completed {
    display: inline-block;
    background-color: ${(props) => props.theme.graphColors.green070};
  }
`;

const VizLabel = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: manual;

  &.active {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }

  &.disabled {
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const IndicatorsDisplay = styled.div`
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s050};
`;

const getTaskCounts = (tasks, t) => {
  let tasksCount = tasks.length;
  let ontimeTasks = 0;
  let lateTasks = 0;
  let completedTasks = 0;
  const nowDate = new Date();

  if (!tasks) return (<span />);

  tasks.forEach((task) => {
    const taskDue = new Date(task.dueAt);
    switch (task.state) {
      case 'NOT_STARTED':
      case 'IN_PROGRESS':
        if (taskDue < nowDate) lateTasks += 1;
        else ontimeTasks += 1;
        break;
      case 'COMPLETED':
        completedTasks += 1;
        break;
      default:
        tasksCount -= 1;
    }
  });

  const displayTasksCount = tasksCount === 0
    ? t('actions:action-no-tasks')
    : `${tasksCount} ${t('actions:action-tasks-count')}`;

  return {
    total: tasksCount,
    displayTotal: displayTasksCount,
    onTime: ontimeTasks,
    late: lateTasks,
    completed: completedTasks,
  }
};


const TasksStatusBar = (props) => {
  const { t } = useTranslation(['common', 'actions']);
  const { tasks } = props;
  const taskCounts = getTaskCounts(tasks, t);

  return (
    <>
      <TaskStatusViz>
        <div
          className="completed"
          style={{ width: `${(taskCounts.completed / taskCounts.total) * 100}%` }}
        />
        <div
          className="late"
          style={{ width: `${(taskCounts.late / taskCounts.total) * 100}%` }}
        />
        <div
          className="on-time"
          style={{ width: `${(taskCounts.onTime / taskCounts.total) * 100}%` }}
        />
      </TaskStatusViz>
      <VizLabel className={taskCounts.total === 0 && 'disabled'}>{taskCounts.displayTotal}</VizLabel>
      </>
  );
};

const IndicatorsViz = (props) => {
  const { relatedIndicators } = props;
  const theme = useTheme();
  let hasProgress = false;
  let hasGoals = false;
  const hasIndicators = relatedIndicators.length > 0;

  relatedIndicators.forEach((ri) => {
    const { indicator, indicatesActionProgress } = ri;
    if (indicatesActionProgress) hasProgress = true;
    if (indicator.goals.length > 0) hasGoals = true;
  });

  return (
    <IndicatorsDisplay>
      <Icon
        name="tachometer"
        color={hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
      <Icon
        name="bullseye"
        color={hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
    </IndicatorsDisplay>
  );
};

const ResponsiblesViz = (props) => {
  const { parties } = props;
  const theme = useTheme();
  const contactList = [];
  const noContactList = [];

  parties.forEach((party) => {
    if (party.hasContactPerson) contactList.push(party.organization.id);
    else noContactList.push(party.organization.id);
  });

  return (
    <ResponsibleList>
      { contactList.map((contact) => (
        <Icon name="dot-circle" color={theme.actionOnTimeColor} key={contact} width=".8em" height=".8em" />
      ))}
      { noContactList.map((contact) => (
        <Icon name="circle-outline" color={theme.actionOnTimeColor} key={contact} width=".8em" height=".8em" />
      ))}
    </ResponsibleList>
  );
};

const ActionTableRow = React.memo(function ActionTableRow(props) {
  const { item, plan, planViewUrl, hasResponsibles, hasImpacts, hasIndicators, hasImplementationPhases, popperRef } = props;
  const theme = useTheme();

  const { t } = useTranslation(['common', 'actions']);
  const actionStatus = cleanActionStatus(item, plan.actionStatuses);

  const showTooltip = (evt, content) => {
    content && popperRef(evt.currentTarget, content);
  };

  const hideTooltip = (evt) => {
    popperRef(null, null);
  };
  return (
    <StyledRow>
      { plan.primaryOrgs.length > 0 && (
        <td
          className="logo-column has-tooltip"
          onMouseEnter={(e)=> showTooltip(e, primaryOrgTooltipContent(t, item.primaryOrg?.name))}
          onMouseLeave={(e)=> hideTooltip(e)}
        >
          { item.primaryOrg && (
            <OrgLogo
              src={item.primaryOrg?.logo?.rendition?.src || '/static/themes/default/images/default-avatar-org.png'}
              alt={item.primaryOrg.name}
              id={`L${item.primaryOrg.id}`}
            />
          )}
        </td>
      )}
      { plan.features.hasActionIdentifiers && (
      <td>
        { item.identifier }
        .
      </td>
      )}
      <td className="has-tooltip">
        <ActionLink
          action={item}
          planUrl={planViewUrl}
        >
          { item.name }
        </ActionLink>
      </td>
      <td
        className="has-tooltip"
        onMouseEnter={(e)=>
          showTooltip(e, phasesTooltipContent(
            t, hasImplementationPhases, actionStatus, item.implementationPhase, item.mergedWith, plan
            ))}
        onMouseLeave={(e)=> hideTooltip(e)}
      >
        <StatusDisplay>
          { hasImplementationPhases ? (
            <ActionPhase
              status={actionStatus}
              activePhase={item.implementationPhase}
              reason={item.manualStatusReason}
              mergedWith={item.mergedWith?.identifier}
              phases={plan.actionImplementationPhases}
              compact
            />
          ) : (
            <StatusBadge
              statusIdentifier={actionStatus.identifier}
              statusName={item.mergedWith
                ? t('actions:action-status-merged', getActionTermContext(plan))
                : actionStatus.name}
            />
          )}
        </StatusDisplay>
      </td>
      <td
        className="has-tooltip"
        onMouseEnter={(e)=> showTooltip(e, tasksTooltipContent(t, getTaskCounts(item.tasks, t)))}
        onMouseLeave={(e)=> hideTooltip(e)}
      >
        <TasksStatusBar
          tasks={item.tasks}
        />
      </td>
      { hasResponsibles && (
        <td
          className="has-tooltip"
          onMouseEnter={(e)=> showTooltip(e, responsiblesTooltipContent(t, theme, item.responsibleParties))}
          onMouseLeave={(e)=> hideTooltip(e)}
        >
          <ResponsiblesViz
            parties={item.responsibleParties}
            persons={item.contactPersons}
          />
        </td>
      )}
      { hasImpacts && (
        <td
          className="has-tooltip"
          onMouseEnter={(e)=> showTooltip(e, impactTooltipContent(t, item.impact, plan.actionImpacts))}
          onMouseLeave={(e)=> hideTooltip(e)}
        >
          { item.impact && (
            <ActionImpact
              identifier={item.impact.identifier}
              name=""
              max={plan.actionImpacts.length - 1}
              size="sm"
            />
          )}
        </td>
      )}
      { hasIndicators && (
        <td
          className="has-tooltip"
          onMouseEnter={(e) => showTooltip(e, indicatorsTooltipContent(t, theme, item.relatedIndicators))}
          onMouseLeave={(e)=> hideTooltip(e)}
        >
          { item.relatedIndicators && !item.mergedWith
            && <IndicatorsViz relatedIndicators={item.relatedIndicators}/>}
        </td>
      )}
      <td
        className="has-tooltip"
        onMouseEnter={(e)=> showTooltip(e, lastUpdatedTooltipContent(t, item.updatedAt))}
        onMouseLeave={(e)=> hideTooltip(e)}
      >
        <UpdatedAgo>
          { `${dayjs(item.updatedAt).fromNow(false)}` }
        </UpdatedAgo>
      </td>
    </StyledRow>
  );
});

export default ActionTableRow;