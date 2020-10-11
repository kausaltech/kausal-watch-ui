import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Badge } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';
import moment from 'common/moment';
import ActionImpact from 'components/actions/ActionImpact';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';

const ActionRow = styled.tr`
  &.merged {
    opacity: .25;
  }

  td {
    vertical-align: middle;
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
  flex-wrap: nowrap;
`;

const UpdatedAgo = styled.div`
  white-space: nowrap;
`;

const TaskStatusBar = styled.div`
  display: flex;
  min-width: ${(props) => props.theme.spaces.s600};
  height: 16px;
  background-color: ${(props) => props.theme.themeColors.light};

  .on-time {
    display: inline-block;
    height: 16px;
    background-color: ${(props) => props.theme.actionOnTimeColor};
  }
  .late {
    display: inline-block;
    height: 16px;
    background-color: ${(props) => props.theme.actionLateColor};
  }
  .completed {
    display: inline-block;
    height: 16px;
    background-color: ${(props) => props.theme.actionNotStartedColor};
  }
`;

const StatusBadge = styled(Badge)`
  font-size: .6rem;
  padding: 6px;
  color: ${(props) => props.theme.themeColors.white};

  &.bg-not_started {
    background-color: ${(props) => props.theme.actionNotStartedColor};
    color: ${(props) => props.theme.themeColors.black};
  }

  &.bg-in_progress {
    background-color: ${(props) => props.theme.actionOnTimeColor};
  }

  &.bg-on_time {
    background-color: ${(props) => props.theme.actionOnTimeColor};
  }

  &.bg-completed {
    background-color: ${(props) => props.theme.actionCompletedColor};
  }

  &.bg-late {
    background-color: ${(props) => props.theme.actionLateColor};
    color: ${(props) => props.theme.themeColors.black};
  }

  &.bg-severely_late {
    background-color: ${(props) => props.theme.actionSeverelyLateColor};
  }
`;

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
        className="on-time"
        style={{ width: `${(ontimeTasks / tasksCount) * 100}%` }}
      />
      <div
        className="late"
        style={{ width: `${(lateTasks / tasksCount) * 100}%` }}
      />
      <div
        className="completed"
        style={{ width: `${(completedTasks / tasksCount) * 100}%` }}
      />
    </TaskStatusBar>
  );
};

const IndicatorsViz = (props) => {
  const {relatedIndicators, indicators} = props;
  const theme = useTheme();
  let hasProgress = false;
  let hasGoal = false;
  relatedIndicators.forEach((indicator) => {
    if (indicator.indicatesActionProgress) {
      hasProgress = indicator.id;
      if (indicator.indicator.goals.length > 0) hasGoal = true;
    };
  });
  return (
    <div>
      <Icon name="tachometer" color={hasProgress ? theme.actionOnTimeColor : theme.actionNotStartedColor} />
      <Icon name="bullseye" color={hasGoal ? theme.actionOnTimeColor : theme.actionNotStartedColor} />
    </div>
  );
};

const ResponsiblesViz = (props) => {
  const { parties, persons } = props;
  const theme = useTheme();
  const contactList = [];
  const noContactList = [];
  console.log(parties, persons);
  parties.forEach((party) => {
    let hasContact = false;
    persons.forEach((person) => {
      if (person.person.organization && person.person.organization.id === party.organization.id) hasContact = true;
    });
    if (hasContact) contactList.push(party.organization.id);
    else noContactList.push(party.organization.id);
  });

  return (
    <ResponsibleList>
      { contactList.map((contact) => <Icon name="dot-circle" color={theme.actionOnTimeColor} key={contact} />)}
      { noContactList.map((contact) => <Icon name="circle-outline" color={theme.actionOnTimeColor} key={contact} />)}
    </ResponsibleList>
  );
};

const ActionsStatusTable = (props) => {
  const { actions } = props;
  const plan = useContext(PlanContext);
  const sortedActions = actions.sort((g1, g2) => g1.identifier - g2.identifier);
  const hasImpacts = plan.actionImpacts.length > 0;

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
                <StatusBadge
                  className={`bg-${item.status.identifier}`}
                >
                  {item.status.name}
                </StatusBadge>
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
                  <IndicatorsViz indicators={item.indicators} relatedIndicators={item.relatedIndicators} />}
              </td>
              <td>
                <UpdatedAgo>{ moment(item.updatedAt).fromNow(true) }</UpdatedAgo>
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
};

export default ActionsStatusTable;
