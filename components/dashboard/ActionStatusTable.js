import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge } from 'reactstrap';
import styled from 'styled-components';
import moment from 'common/moment';
import ActionImpact from 'components/actions/ActionImpact';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';

const ActionRow = styled.tr`
  &.merged {
    opacity: .6;
  }

  td {
    vertical-align: middle;
  }
`;

const TaskStatusBar = styled.div`
  display: flex;
  min-width: ${(props) => props.theme.spaces.s600};
  height: 16px;
  background-color: #eee;

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
  font-size: ${(props) => props.theme.fontSizeSm};
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

const ActionsStatusTable = (props) =>{
  const { actions } = props;
  const sortedActions = actions.sort((g1, g2) => g1.identifier - g2.identifier);
  console.log(actions);
  return (
    <Table role="list">
      <thead>
        <tr>
          <th>ID</th>
          <th>Action</th>
          <th>Progress</th>
          <th>Tasks</th>
          <th>Responsible</th>
          <th>Impact</th>
          <th>Indicator</th>
          <th>Last update</th>
        </tr>
      </thead>
      <tbody>
        {sortedActions.map((item) => (
          <ActionRow className={item.mergedWith && 'merged'}>
            <td>
              { item.identifier }
            </td>
            <td>
              <ActionLink action={item}>
                { item.name }
              </ActionLink>
            </td>
            <td>
              { !item.mergedWith && (
                <StatusBadge
                  className={`bg-${item.status.identifier}`}
                >
                  {item.status.name}
                </StatusBadge>
              )}
              { item.mergedWith && (
                <StatusBadge>
                  Yhdistetty
                </StatusBadge>
              )}
            </td>
            <td>
              { !item.mergedWith && <TasksStatusBar tasks={item.tasks} /> }
            </td>
            <td>
              {
                !item.mergedWith && item.responsibleParties.map((party) =>
                  <Icon key={party.id} name="circleOutline" color="#ccc" />
                )
              }
            </td>
            <td>
              { !item.mergedWith && item.impact &&
                <ActionImpact
                  identifier={item.impact.identifier}
                  name={item.impact.name}
                />}
            </td>
            <td>
              { item.indicators && !item.mergedWith && (
                <span>{item.indicators.length}</span>
                ) 
              }
            </td>
            <td>
              { !item.mergedWith && moment(item.updatedAt).fromNow(true) }
            </td>
          </ActionRow>
        ))}
      </tbody>
    </Table>
  );
};

ActionsStatusTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusTable;
