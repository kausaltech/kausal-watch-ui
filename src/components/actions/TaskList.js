import { Fragment, useId, useState, useSyncExternalStore } from 'react';

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
  // Split a section of more than LONG_LIST_THRESHOLD tasks into collapsible groups: 'YEAR' or null
  collapseLongListsBy: 'YEAR',
};

const LONG_LIST_THRESHOLD = 12;

const StyledDate = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  margin-left: ${(props) => props.theme.spaces.s025};

  &.cancelled {
    color: ${(props) => props.theme.textColor.tertiary};
  }
`;

// Sits under the date of a continuous task that also has one
const ContinuousNote = styled.span`
  display: block;
`;

const TaskWrapper = styled.div`
  display: flex;
`;

const TaskMeta = styled.div`
  flex: 0 0 ${(props) => props.theme.spaces.s800};
`;

const TaskMetaLabel = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    flex-shrink: 0;
  }
`;

const ToggleButton = styled(Button)`
  font-size: ${(props) => props.theme.fontSizeSm};
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
  /* Can shrink below its longest word, which would otherwise widen a narrow page */
  min-width: 0;
  overflow-wrap: break-word;
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
`;

// The date a task is sorted and grouped by. Null for a continuous task without a due date.
function getTaskDate(task) {
  return task.completedAt ?? task.dueAt ?? null;
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

  // Shown under the due date of a continuous task, or in its place when the task has none
  const continuousLabel = task.isContinuous ? t('action-continuous') : null;

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
  } else if (!task.dueAt) {
    meta = {
      icon: Icon.Sync,
      color: theme.graphColors.blue070,
      label: t('action-continuous'),
      date: null,
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
  const formattedDate = formatTaskDate(meta.date, locale, dateFormat);
  // Completed tasks show only when they were completed
  const note = task.state === 'COMPLETED' ? null : continuousLabel;

  return (
    <TaskWrapper>
      <TaskMeta>
        <Tooltip title={meta.label} describeChild>
          <TaskMetaLabel>
            <MetaIcon color={meta.color} alt={meta.label} />
            <StyledDate className={meta.dateClassName}>
              {formattedDate}
              {formattedDate && note ? <ContinuousNote>{note}</ContinuousNote> : note}
            </StyledDate>
          </TaskMetaLabel>
        </Tooltip>
      </TaskMeta>
      <TaskContent>
        <h4 className="task-title">{task.name}</h4>
        {(responsibleParties.length > 0 || contactPersons.length > 0) && (
          <TaskAssignees>
            {responsibleParties.length > 0 && (
              <div>
                <dt>
                  {t('action-task-responsible-parties', {
                    context: plan.generalContent?.organizationTerm,
                    count: responsibleParties.length,
                  })}
                  :
                </dt>
                <dd>{responsibleParties.map((rp) => rp.organization.name).join(', ')}</dd>
              </div>
            )}
            {contactPersons.length > 0 && (
              <div>
                <dt>{t('action-task-contact-persons', { count: contactPersons.length })}:</dt>
                <dd>
                  {contactPersons
                    .map((cp) => {
                      const name = `${cp.person.firstName} ${cp.person.lastName}`.trim();
                      const org = cp.person.organization?.name;
                      return org ? `${name} (${org})` : name;
                    })
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
        organization: PropTypes.shape({
          name: PropTypes.string,
        }),
      }).isRequired,
    })
  ),
  dateFormat: PropTypes.string,
  details: PropTypes.string,
  // Null only for a continuous task
  dueAt: PropTypes.string,
  id: PropTypes.string.isRequired,
  isContinuous: PropTypes.bool,
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

// How each section of the task list shows its tasks, keyed by the task state the backend names
// the section after.
const SECTIONS = {
  // Has no late-highlight setting of its own and follows the in-progress section's
  not_started: {
    state: 'NOT_STARTED',
    headingKey: 'action-tasks-todo',
    newestFirst: false,
    highlightLateFrom: 'in_progress',
  },
  in_progress: { state: 'IN_PROGRESS', headingKey: 'action-tasks-doing', newestFirst: false },
  completed: { state: 'COMPLETED', headingKey: 'action-tasks-done', newestFirst: true },
  cancelled: { state: 'CANCELLED', headingKey: 'action-tasks-cancelled', newestFirst: true },
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
  const entries = (sections ?? DEFAULT_SECTIONS).filter(
    (section) => section && SECTIONS[section.field]
  );
  const highlightsLate = (field) =>
    !!entries.find((section) => section.field === field)?.highlightLateTasks;
  return entries.map((section) => ({
    ...SECTIONS[section.field],
    field: section.field,
    heading: section.heading,
    highlightLate: highlightsLate(SECTIONS[section.field].highlightLateFrom ?? section.field),
  }));
}

// Whether any of the tasks is in a section that is shown, so that the tasks block can leave out its
// heading when there is nothing to list under it.
export function hasVisibleTasks(tasks, sections) {
  const states = new Set(getSectionConfigs(sections).map((config) => config.state));
  return tasks.some((task) => states.has(task.state));
}

// A string, so that the snapshot stays the same between reads on the same day
const getToday = () => dayjs().format('YYYY-MM-DD');
const getServerToday = () => null;

// Notifies at each local midnight, so that tasks become late while the page stays open
function subscribeToDate(onChange) {
  let timeoutId;
  const schedule = () => {
    const untilMidnight = dayjs().add(1, 'day').startOf('day').diff(dayjs());
    timeoutId = setTimeout(() => {
      onChange();
      schedule();
    }, untilMidnight);
  };
  schedule();
  return () => clearTimeout(timeoutId);
}

function TaskYearGroup(props) {
  const { label, count, defaultOpen, children } = props;
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
        {label} ({count})
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
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

// Group the tasks by the year of their date, keeping their order. Tasks without a date get a group
// of their own, with a null year.
function groupTasksByYear(tasks) {
  const groups = [];
  for (const task of tasks) {
    const date = getTaskDate(task);
    const year = date ? new Date(date).getUTCFullYear() : null;
    const group = groups.at(-1);
    if (group?.year === year) group.tasks.push(task);
    else groups.push({ year, tasks: [task] });
  }
  return groups;
}

function TaskList(props) {
  const { tasks, sections } = props;
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const { collapseLongListsBy } = TASK_LIST_SETTINGS;

  // Sort by date, breaking ties alphabetically whichever way the dates run. Tasks without a date
  // (continuous ones) come first, as ongoing work.
  const compareTasks = (a, b, newestFirst) => {
    const dateA = getTaskDate(a);
    const dateB = getTaskDate(b);
    let byDate;
    if (!dateA || !dateB) byDate = (dateA ? 1 : 0) - (dateB ? 1 : 0);
    else {
      const diff = dayjs(dateA).diff(dayjs(dateB));
      byDate = newestFirst ? -diff : diff;
    }
    return byDate || a.name.localeCompare(b.name, locale);
  };

  // A task is late once the day it was due has passed. "Today" is the viewer's date, which only the
  // browser knows: the server's date can differ, so the server and the hydration render mark no task
  // as late.
  const today = useSyncExternalStore(subscribeToDate, getToday, getServerToday);
  // A task without a due date is never late
  const isLate = (task) =>
    today !== null && !!task.dueAt && dayjs(task.dueAt).isBefore(today, 'day');

  const renderTasks = (sectionTasks, highlightLate) =>
    sectionTasks.map((item) => (
      <ListGroupItem key={item.id} className={`state--${item.state.toLowerCase()}`}>
        <Task task={item} theme={theme} late={highlightLate && isLate(item)} />
      </ListGroupItem>
    ));

  return (
    <div>
      {getSectionConfigs(sections).map((config) => {
        const sectionTasks = tasks
          .filter((item) => item.state === config.state)
          .sort((a, b) => compareTasks(a, b, config.newestFirst));
        if (!sectionTasks.length) return null;
        return (
          <Fragment key={config.field}>
            <ListGroupTitle>{config.heading || t(config.headingKey)}</ListGroupTitle>
            {collapseLongListsBy === 'YEAR' && sectionTasks.length > LONG_LIST_THRESHOLD ? (
              <div className="mb-5">
                {groupTasksByYear(sectionTasks).map((group, index) => (
                  <TaskYearGroup
                    key={group.year ?? 'continuous'}
                    label={group.year ?? t('action-continuous')}
                    count={group.tasks.length}
                    defaultOpen={index === 0}
                  >
                    {renderTasks(group.tasks, config.highlightLate)}
                  </TaskYearGroup>
                ))}
              </div>
            ) : (
              <ListGroup className="mb-5">
                {renderTasks(sectionTasks, config.highlightLate)}
              </ListGroup>
            )}
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
      highlightLateTasks: PropTypes.bool,
    })
  ),
};

export default TaskList;
