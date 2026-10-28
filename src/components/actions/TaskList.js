import { useId, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useLocale, useTranslations } from 'next-intl';
import { PropTypes } from 'prop-types';

import dayjs from '@/common/dayjs';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import RichText from '@/components/common/RichText';
import Tooltip from '@/components/common/Tooltip';
import { usePlan } from '@/context/plan';
import { getDateFormat } from '@/utils/dates.utils';

// Display settings for the task list. Hard-coded for now; each is meant to become an admin or
// theme setting later.
const TASK_LIST_SETTINGS = {
  // Which task sections to show, in this order
  taskSections: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
  // Mark unfinished tasks that are past their due date
  highlightLateTasks: true,
  // Split a section of more than LONG_LIST_THRESHOLD tasks into collapsible groups: 'YEAR' or null
  collapseLongListsBy: 'YEAR',
};

const LONG_LIST_THRESHOLD = 12;

const TASK_SECTIONS = {
  NOT_STARTED: { title: 'action-tasks-todo', newestFirst: false },
  IN_PROGRESS: { title: 'action-tasks-doing', newestFirst: false },
  COMPLETED: { title: 'action-tasks-done', newestFirst: true },
  CANCELLED: { title: 'action-tasks-cancelled', newestFirst: true },
};

const StyledDate = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  margin-left: ${(props) => props.theme.spaces.s025};

  &.cancelled {
    color: ${(props) => props.theme.textColor.tertiary};
  }
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

const TaskAssignees = styled.dl`
  margin: ${(props) => props.theme.spaces.s025} 0 0;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  color: ${(props) => props.theme.textColor.secondary};

  dt {
    display: inline;
    font-weight: ${(props) => props.theme.fontWeightBold};
    margin-right: ${(props) => props.theme.spaces.s025};
  }

  dd {
    display: inline;
    margin: 0;
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

const TaskGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s050};

  @media print {
    .MuiCollapse-root {
      height: auto !important;
      overflow: visible !important;
      visibility: visible !important;
    }
  }
`;

const TaskGroupToggle = styled(Button)`
  font-weight: ${({ theme }) => theme.fontWeightBold};
  padding: 0;
  margin: 0 0 ${(props) => props.theme.spaces.s050};
  color: ${(props) => props.theme.themeColors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    background-color: transparent;
  }
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

  &.state--cancelled .task-title {
    text-decoration: line-through;
  }
`;

// The date a task is sorted and grouped by
function getTaskDate(task) {
  return task.completedAt ?? task.dueAt;
}

// Due and completion dates are plain dates (YYYY-MM-DD), which parse as UTC
// midnight; format them in UTC so they don't shift a day west of Greenwich
function formatTaskDate(date, locale, dateFormat) {
  if (!date) return null;
  return new Date(date).toLocaleDateString(locale, {
    ...getDateFormat(dateFormat),
    timeZone: 'UTC',
  });
}

const Task = (props) => {
  const t = useTranslations();
  const locale = useLocale();
  const { task, theme, late } = props;
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const toggle = () => setIsOpen(!isOpen);
  const plan = usePlan();

  const dateFormat = task.dateFormat || plan.actionListPage?.taskDateFormat;
  // Empty unless the plan has the task assignees feature
  const responsibleParties = task.responsibleParties ?? [];
  const contactPersons = task.contactPersons ?? [];

  let meta;
  if (task.state === 'COMPLETED') {
    meta = {
      icon: Icon.Check,
      color: theme.graphColors.green050,
      label: t('action-task-completed-on'),
      date: task.completedAt,
    };
  } else if (task.state === 'CANCELLED') {
    meta = {
      icon: Icon.Times,
      color: theme.graphColors.grey050,
      label: t('action-task-cancelled'),
      date: task.dueAt,
      dateClassName: 'cancelled',
    };
  } else if (late) {
    meta = {
      icon: Icon.ExclamationCircle,
      color: theme.taskStatusColors.late,
      label: t('action-task-late'),
      date: task.dueAt,
    };
  } else {
    meta = {
      icon: Icon.Calendar,
      color: theme.graphColors.blue070,
      label: t('action-task-due-date'),
      date: task.dueAt,
    };
  }
  const MetaIcon = meta.icon;

  return (
    <TaskWrapper>
      <TaskMeta>
        <Tooltip title={meta.label} describeChild>
          <span>
            <MetaIcon color={meta.color} alt={meta.label} />
            <StyledDate className={meta.dateClassName}>
              {formatTaskDate(meta.date, locale, dateFormat)}
            </StyledDate>
          </span>
        </Tooltip>
      </TaskMeta>
      <TaskContent>
        <h4 className="task-title">{task.name}</h4>
        {(responsibleParties.length > 0 || contactPersons.length > 0) && (
          <TaskAssignees>
            {responsibleParties.length > 0 && (
              <div>
                <dt>
                  {t('responsible-parties', { context: plan.generalContent?.organizationTerm })}:
                </dt>
                <dd>{responsibleParties.map((rp) => rp.organization.name).join(', ')}</dd>
              </div>
            )}
            {contactPersons.length > 0 && (
              <div>
                <dt>{t('contact-persons')}:</dt>
                <dd>
                  {contactPersons
                    .map((cp) => `${cp.person.firstName} ${cp.person.lastName}`.trim())
                    .join(', ')}
                </dd>
              </div>
            )}
          </TaskAssignees>
        )}
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
  contactPersons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      person: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }).isRequired,
    })
  ),
  dateFormat: PropTypes.string,
  details: PropTypes.string,
  dueAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  responsibleParties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      organization: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  state: PropTypes.string.isRequired,
};

Task.propTypes = {
  late: PropTypes.bool,
  task: PropTypes.shape(taskShape).isRequired,
  theme: PropTypes.shape({
    graphColors: PropTypes.shape({
      blue070: PropTypes.string.isRequired,
      green050: PropTypes.string.isRequired,
      grey050: PropTypes.string.isRequired,
    }).isRequired,
    taskStatusColors: PropTypes.shape({
      late: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function TaskYearGroup(props) {
  const { year, count, defaultOpen, children } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <TaskGroup>
      <TaskGroupToggle
        variant="link"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
        {year} ({count})
      </TaskGroupToggle>
      <Collapse in={isOpen} id={panelId}>
        <ListGroup>{children}</ListGroup>
      </Collapse>
    </TaskGroup>
  );
}

TaskYearGroup.propTypes = {
  children: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
};

// Group the tasks by the year of their date, keeping their order
function groupTasksByYear(tasks) {
  const groups = [];
  for (const task of tasks) {
    const year = new Date(getTaskDate(task)).getUTCFullYear();
    const group = groups.at(-1);
    if (group?.year === year) group.tasks.push(task);
    else groups.push({ year, tasks: [task] });
  }
  return groups;
}

function TaskList(props) {
  const { tasks } = props;
  const theme = useTheme();
  const t = useTranslations();
  const { taskSections, highlightLateTasks, collapseLongListsBy } = TASK_LIST_SETTINGS;

  const sortedTasks = [...tasks].sort((a, b) => dayjs(getTaskDate(a)).diff(dayjs(getTaskDate(b))));
  // Due dates are plain dates, so compare them as strings: a task is late from the day after it was due
  const today = dayjs().format('YYYY-MM-DD');

  const isLate = (task) =>
    highlightLateTasks &&
    (task.state === 'NOT_STARTED' || task.state === 'IN_PROGRESS') &&
    task.dueAt < today;

  const renderTasks = (sectionTasks) =>
    sectionTasks.map((item) => (
      <ListGroupItem key={item.id} className={`state--${item.state.toLowerCase()}`}>
        <Task task={item} theme={theme} late={isLate(item)} />
      </ListGroupItem>
    ));

  const sections = taskSections
    .map((state) => {
      const sectionTasks = sortedTasks.filter((item) => item.state === state);
      if (TASK_SECTIONS[state].newestFirst) sectionTasks.reverse();
      return { state, tasks: sectionTasks };
    })
    .filter((section) => section.tasks.length > 0);

  return (
    <div>
      {sections.map(({ state, tasks: sectionTasks }) => (
        <div key={state}>
          <ListGroupTitle>{t(TASK_SECTIONS[state].title)}</ListGroupTitle>
          {collapseLongListsBy === 'YEAR' && sectionTasks.length > LONG_LIST_THRESHOLD ? (
            <div className="mb-5">
              {groupTasksByYear(sectionTasks).map((group, index) => (
                <TaskYearGroup
                  key={group.year}
                  year={group.year}
                  count={group.tasks.length}
                  defaultOpen={index === 0}
                >
                  {renderTasks(group.tasks)}
                </TaskYearGroup>
              ))}
            </div>
          ) : (
            <ListGroup className="mb-5">{renderTasks(sectionTasks)}</ListGroup>
          )}
        </div>
      ))}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape(taskShape)).isRequired,
};

export default TaskList;
