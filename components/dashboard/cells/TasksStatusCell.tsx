import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { PlanContextFragment } from 'common/__generated__/graphql';
import { getActionTaskTermContext } from 'common/i18n';
import { ActionListAction } from '../dashboard.types';

interface Props {
  action: ActionListAction;
  plan: PlanContextFragment;
}

export const getTaskCounts = (
  tasks: ActionListAction['tasks'] = [],
  plan,
  t
) => {
  let tasksCount = tasks.length;
  let ontimeTasks = 0;
  let lateTasks = 0;
  let completedTasks = 0;
  const nowDate = new Date();

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

  const displayTasksCount =
    tasksCount === 0
      ? t('actions:action-no-tasks', getActionTaskTermContext(plan))
      : `${tasksCount} ${t(
          'actions:action-tasks-count',
          getActionTaskTermContext(plan)
        )}`;

  return {
    total: tasksCount,
    displayTotal: displayTasksCount,
    onTime: ontimeTasks,
    late: lateTasks,
    completed: completedTasks,
  };
};

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

const TasksStatusCell = ({ action, plan }: Props) => {
  const { t } = useTranslation(['common', 'actions']);
  const taskCounts = getTaskCounts(action.tasks, plan, t);

  return (
    <>
      <TaskStatusViz>
        <div
          className="completed"
          style={{
            width: `${(taskCounts.completed / taskCounts.total) * 100}%`,
          }}
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
      <VizLabel className={taskCounts.total === 0 ? 'disabled' : undefined}>
        {taskCounts.displayTotal}
      </VizLabel>
    </>
  );
};

export default TasksStatusCell;
