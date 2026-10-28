import { Fragment, useId, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useLocale, useTranslations } from 'next-intl';
import { PropTypes } from 'prop-types';

import dayjs from '@/common/dayjs';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import RichText from '@/components/common/RichText';
import { usePlan } from '@/context/plan';
import { getDateFormat } from '@/utils/dates.utils';

const StyledDate = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  margin-left: ${(props) => props.theme.spaces.s025};
`;

const TaskWrapper = styled.div`
  display: flex;
`;

const TaskMeta = styled.div`
  flex: 0 0 ${(props) => props.theme.spaces.s800};
`;

const ToggleButton = styled(Button)`
  font-weight: ${({ theme }) => theme.fontWeightNormal};
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.themeColors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    background-color: transparent;
  }

  &.open {
    color: ${(props) => props.theme.textColor.tertiary};
  }

  @media print {
    display: none;
  }
`;

const TaskContent = styled.div`
  margin: ${(props) => props.theme.spaces.s025} 0;
  border-left: 1px solid ${(props) => props.theme.themeColors.light};
  padding-left: ${(props) => props.theme.spaces.s100};

  @media print {
    .MuiCollapse-root {
      height: auto !important;
      overflow: visible !important;
      visibility: visible !important;
    }
  }

  .text-content {
    font-size: ${(props) => props.theme.fontSizeSm};
    font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`}

    p:last-child {
      margin-bottom: 0;
    }
  }

  .task-details {
    margin-top: ${(props) => props.theme.spaces.s100};
  }

  .task-details h4 {
    margin-top: 1rem;
  }

  a {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
    hyphens: manual;
  }

  img {
    max-width: 100%;
    height: auto !important;
  }
`;

const ListGroup = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;

  h4 {
    margin: 0;
    font-size: ${(props) => props.theme.fontSizeBase};
    font-family: ${(props) => `${props.theme.fontFamily}, ${props.theme.fontFamilyFallback}`};
    font-weight: ${(props) => props.theme.fontWeightBold};
    line-height: ${(props) => props.theme.lineHeightMd};
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const ListGroupTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizeMd};
`;

const ListGroupItem = styled.li`
  position: relative;
  display: block;
  padding: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.themeColors.white};
  border: 1px solid ${(props) => props.theme.graphColors.grey020};

  & + & {
    border-top-width: 0;
  }

  &:first-child {
    border-top-left-radius: ${(props) => props.theme.cardBorderRadius};
    border-top-right-radius: ${(props) => props.theme.cardBorderRadius};
  }

  &:last-child {
    border-bottom-left-radius: ${(props) => props.theme.cardBorderRadius};
    border-bottom-right-radius: ${(props) => props.theme.cardBorderRadius};
  }

  &.state--cancelled .task-header {
    text-decoration: line-through;
  }
`;

function parseTimestamp(timestamp) {
  const timeFormat = 'L';
  return dayjs(timestamp).format(timeFormat);
}

const Task = (props) => {
  const t = useTranslations();
  const locale = useLocale();
  const { task, theme, completed } = props;
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const toggle = () => setIsOpen(!isOpen);
  const plan = usePlan();

  const dateFormat = task.dateFormat || plan.actionListPage?.taskDateFormat;
  const formattedDueAt = new Date(task.dueAt).toLocaleDateString(locale, getDateFormat(dateFormat));

  return (
    <TaskWrapper>
      {completed ? (
        <TaskMeta>
          <Icon.Check color={theme.graphColors.green050} alt={t('action-task-done')} />
          <StyledDate>{parseTimestamp(task.completedAt)}</StyledDate>
        </TaskMeta>
      ) : (
        <TaskMeta>
          <Icon.Calendar color={theme.graphColors.blue070} alt={t('action-task-todo')} />
          <StyledDate>{formattedDueAt}</StyledDate>
        </TaskMeta>
      )}
      <TaskContent>
        <h4 className="task-title">{task.name}</h4>
        {/* Strip HTML tags to see if details field is actually empty */}
        {task.details?.replace(/(<([^>]+)>)/gi, '').length > 0 && (
          <>
            <ToggleButton
              variant="link"
              onClick={toggle}
              size="small"
              className={isOpen ? 'open' : ''}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {isOpen ? t('action-task-hide-details') : t('action-task-show-details')}
              <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
            </ToggleButton>
            <Collapse in={isOpen} id={panelId}>
              <div className="task-details">
                <RichText html={task.details} />
              </div>
            </Collapse>
          </>
        )}
      </TaskContent>
    </TaskWrapper>
  );
};

const taskShape = {
  completedAt: PropTypes.string,
  dateFormat: PropTypes.string,
  details: PropTypes.string,
  dueAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

Task.propTypes = {
  completed: PropTypes.bool.isRequired,
  task: PropTypes.shape(taskShape).isRequired,
  theme: PropTypes.shape({
    graphColors: PropTypes.shape({
      blue070: PropTypes.string.isRequired,
      green050: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

// How each section of the task list shows its tasks, keyed by the task state the backend names
// the section after.
const SECTIONS = {
  not_started: { state: 'NOT_STARTED', headingKey: 'action-tasks-todo', completed: false },
  in_progress: { state: 'IN_PROGRESS', headingKey: 'action-tasks-doing', completed: false },
  completed: { state: 'COMPLETED', headingKey: 'action-tasks-done', completed: true },
};

// The order the sections had before plan admins could choose it, for backends that don't send one.
const DEFAULT_SECTIONS = [
  { field: 'not_started' },
  { field: 'in_progress' },
  { field: 'completed' },
];

// The sections to show, in order. Skips empty entries and the sections this version of the UI does
// not know yet.
function getSectionConfigs(sections) {
  return (sections ?? DEFAULT_SECTIONS)
    .filter((section) => section && SECTIONS[section.field])
    .map((section) => ({
      ...SECTIONS[section.field],
      field: section.field,
      heading: section.heading,
    }));
}

// Whether any of the tasks is in a section that is shown, so that the tasks block can leave out its
// heading when there is nothing to list under it.
export function hasVisibleTasks(tasks, sections) {
  const states = new Set(getSectionConfigs(sections).map((config) => config.state));
  return tasks.some((task) => states.has(task.state));
}

function TaskList(props) {
  const { tasks, sections } = props;
  const theme = useTheme();
  const t = useTranslations();

  const sortedTasks = [...tasks].sort((a, b) => {
    const adate = a.completedAt ? a.completedAt : a.dueAt;
    const bdate = b.completedAt ? b.completedAt : b.dueAt;
    return dayjs(adate).diff(dayjs(bdate));
  });

  function filterTasks(state, completed) {
    const items = sortedTasks
      .filter((item) => item.state === state)
      .map((item) => (
        <ListGroupItem key={item.id} className={`state--${item.state}`}>
          <Task task={item} theme={theme} completed={completed} />
        </ListGroupItem>
      ));
    // Completed tasks are listed newest first
    return completed ? items.reverse() : items;
  }

  return (
    <div>
      {getSectionConfigs(sections).map((config) => {
        const items = filterTasks(config.state, config.completed);
        if (!items.length) return null;
        return (
          <Fragment key={config.field}>
            <ListGroupTitle>{config.heading || t(config.headingKey)}</ListGroupTitle>
            <ListGroup className="mb-5">{items}</ListGroup>
          </Fragment>
        );
      })}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape(taskShape)).isRequired,
  sections: PropTypes.arrayOf(
    // Stream field entries can be null
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      heading: PropTypes.string,
    })
  ),
};

export default TaskList;
