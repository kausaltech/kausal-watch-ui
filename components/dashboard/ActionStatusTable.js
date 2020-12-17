import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Badge } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';
import moment from 'common/moment';
import ActionImpact from 'components/actions/ActionImpact';
import ActionPhase from 'components/actions/ActionPhase';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';

const ActionRow = styled.tr`
  &.merged {
    opacity: .25;
  }

  td {
    vertical-align: top;
    line-height: ${(props) => props.theme.lineHeightSm};
  }

  a {
    color: ${(props) => props.theme.themeColors.black};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResponsibleList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const UpdatedAgo = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  white-space: nowrap;
`;

const StatusBar = styled.div`
  height: 8px;
  background-color: #333;

  &.bg-not_started {
    background-color: ${(props) => props.theme.graphColors.blue030};
  }

  &.bg-in_progress, &.bg-on_time {
    background-color: ${(props) => props.theme.graphColors.green050};}
  }

  &.bg-completed {
    background-color: ${(props) => props.theme.graphColors.green090};
  }

  &.bg-late {
    background-color: ${(props) => props.theme.graphColors.yellow050};
  }

  &.bg-severely_late {
    background-color: ${(props) => props.theme.actionSeverelyLateColor};
  }

  &.bg-merged, &.bg-postponed, &.bg-cancelled {
    background-color: ${(props) => props.theme.actionMergedColor};
  }
`;

const TaskStatusBar = styled.div`
  display: flex;
  min-width: ${(props) => props.theme.spaces.s600};
  height: 8px;
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

const StatusDisplay = (props) => {
  const {statusIdentifier, statusName} = props;

  return (
    <>
      <StatusBar className={`bg-${statusIdentifier}`} />
      <small>{ statusName }</small>
    </>
  );
};

const TasksStatusBar = (props) => {
  const { tasks } = props;
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

  return (
    <TaskStatusBar>
      <div
        className="completed"
        style={{ width: `${(completedTasks / tasksCount) * 100}%` }}
      />
      <div
        className="late"
        style={{ width: `${(lateTasks / tasksCount) * 100}%` }}
      />
      <div
        className="on-time"
        style={{ width: `${(ontimeTasks / tasksCount) * 100}%` }}
      />
    </TaskStatusBar>
  );
};

const IndicatorsViz = ({ relatedIndicators }) => {
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
    <div>
      <Icon name="tachometer" color={hasIndicators ? theme.actionOnTimeColor : theme.actionNotStartedColor} height="1.2em" width="1.2em" />
      <Icon name="bullseye" color={hasGoals ? theme.actionOnTimeColor : theme.actionNotStartedColor} height="1.2em" width="1.2em" />
    </div>
  );
};

const ResponsiblesViz = ({ parties }) => {
  const theme = useTheme();
  const contactList = [];
  const noContactList = [];

  parties.forEach((party) => {
    if (party.hasContactPerson) contactList.push(party.organization.id);
    else noContactList.push(party.organization.id);
  });

  return (
    <ResponsibleList>
      { contactList.map((contact) => <Icon name="dot-circle" color={theme.actionOnTimeColor} key={contact} width=".8em" height=".8em" />)}
      { noContactList.map((contact) => <Icon name="circle-outline" color={theme.actionOnTimeColor} key={contact} width=".8em" height=".8em"  />)}
    </ResponsibleList>
  );
};

function isChildOrg(childOrg, parentOrg) {
  function makeTree(org) {
    const ids = [];
    while (org) {
      ids.push(org.id);
      org = org.parent;
    }
    return ids;
  }
  const childTree = makeTree(childOrg);
  const parentTree = [parentOrg.id];
  return childTree.some((id) => parentTree.indexOf(id) >= 0);
}

function processAction(actionIn, orgMap) {
  const action = { ...actionIn };

  action.responsibleParties = actionIn.responsibleParties.map((rp) => {
    const org = orgMap.get(rp.organization.id);
    const found = action.contactPersons.some(({ person }) => {
      if (!person.organization) return false;
      const personOrg = orgMap.get(person.organization.id);
      return isChildOrg(personOrg, org);
    });
    return {
      ...rp,
      hasContactPerson: found,
    };
  });
  return action;
}

const ActionsStatusTable = (props) => {
  const { actions, orgs } = props;
  const orgMap = new Map(orgs.map((org) => [org.id, org]));
  const plan = useContext(PlanContext);
  const sortedActions = actions.sort((g1, g2) => g1.identifier - g2.identifier)
    .map((action) => processAction(action, orgMap));
  const hasImpacts = plan.actionImpacts.length > 0;
  const hasPhases = plan.actionImplementationPhases.length > 0;

  return (
    <Table role="list" className="my-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Action</th>
          <th>Progress</th>
          <th>Tasks</th>
          <th>Responsible</th>
          <th>{ hasImpacts && 'Impact' }</th>
          <th>Indicator</th>
          <th>Last update</th>
        </tr>
      </thead>
      <tbody>
        {sortedActions.map((item) => (
          !item.mergedWith ? (
            <ActionRow key={item.id}>
              <td>
                { item.identifier }
              </td>
              <td>
                <ActionLink action={item}>
                  { item.name }
                </ActionLink>
              </td>
              <td>
                { hasPhases && (
                  <ActionPhase
                    statusIdentifier={item.status.identifier}
                    statusName={item.status.name}
                    activePhase={item.implementationPhase?.id}
                    reason={item.manualStatusReason}
                    mergedWith={item.mergedWith}
                    phases={plan.actionImplementationPhases}
                    compact
                  />
                )}
                { !hasPhases && (
                  <StatusDisplay
                    statusIdentifier={item.status.identifier}
                    statusName={item.status.name}
                  />
                )}
              </td>
              <td>
                <TasksStatusBar tasks={item.tasks} />
              </td>
              <td>
                <ResponsiblesViz parties={item.responsibleParties} persons={item.contactPersons} />
              </td>
              <td>
                { hasImpacts && item.impact
                    && (
                    <ActionImpact
                      identifier={item.impact.identifier}
                      name={item.impact.name}
                      size="sm"
                    />
                    )}
              </td>
              <td>
                { item.relatedIndicators && !item.mergedWith &&
                  <IndicatorsViz relatedIndicators={item.relatedIndicators} />}
              </td>
              <td>
                <UpdatedAgo>{ `${moment(item.updatedAt).fromNow(true)} ago` }</UpdatedAgo>
              </td>
            </ActionRow>
          ) : (
            <ActionRow className="merged">
              <td>
                { item.identifier }
              </td>
              <td colSpan="7">
                { item.name }
              </td>
            </ActionRow>
          )
        ))}
      </tbody>
    </Table>
  );
};

ActionsStatusTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  orgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusTable;
