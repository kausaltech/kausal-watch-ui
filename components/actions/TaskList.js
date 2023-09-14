import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  ListGroup as BaseListGroup,
  ListGroupItem as BaseListGroupItem,
  Button,
  Collapse,
} from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import dayjs from 'common/dayjs';
import Icon from 'components/common/Icon';
import RichText from 'components/common/RichText';
import { useTranslation } from 'common/i18n';

const Date = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  margin-left: ${(props) => props.theme.spaces.s025};
`;

const TaskWrapper = styled.div`
  display: flex;
`;

const TaskMeta = styled.div`
  flex: 0 0 ${(props) => props.theme.spaces.s800};
`;

const ToggleButton = styled(Button)`
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.themeColors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.open {
    color: ${(props) => props.theme.graphColors.grey050};
  }
`;

const TaskContent = styled.div`
  margin: ${(props) => props.theme.spaces.s025} 0;
  border-left: 1px solid ${(props) => props.theme.themeColors.light};
  padding-left: ${(props) => props.theme.spaces.s100};

  .text-content {
    font-size: ${(props) => props.theme.fontSizeSm};
    font-family: ${(props) => props.theme.fontFamilyTiny};

    p:last-child {
      margin-bottom: 0;
    }
  }

  .task-comment {
    margin-top: ${(props) => props.theme.spaces.s100};
  }

  .task-comment h4 {
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

const ListGroup = styled(BaseListGroup)`
  h4 {
    margin: 0;
    font-size: ${(props) => props.theme.fontSizeBase};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${(props) => props.theme.fontWeightBold};
    line-height: ${(props) => props.theme.lineHeightMd};
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const ListGroupTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBaseLg};
`;

const ListGroupItem = styled(BaseListGroupItem)`
  padding: ${(props) => props.theme.spaces.s050};

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
  const { task, theme, t, completed } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <TaskWrapper>
      {completed ? (
        <TaskMeta>
          <Icon
            name="check"
            color={theme.graphColors.green050}
            alt={t('actions:action-task-done')}
          />
          <Date>{parseTimestamp(task.completedAt)}</Date>
        </TaskMeta>
      ) : (
        <TaskMeta>
          <Icon
            name="calendar"
            color={theme.graphColors.blue070}
            alt={t('actions:action-task-todo')}
          />
          <Date>{parseTimestamp(task.dueAt)}</Date>
        </TaskMeta>
      )}
      <TaskContent>
        <h4 className="task-title">{task.name}</h4>
        {/* Strip HTML tags to see if comment field is actually empty */}
        {task.comment.replace(/(<([^>]+)>)/gi, '').length > 0 && (
          <>
            <ToggleButton
              color="link"
              onClick={toggle}
              size="sm"
              className={isOpen ? 'open' : ''}
            >
              {isOpen
                ? t('actions:action-task-hide-comment')
                : t('actions:action-task-show-comment')}
              <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
            </ToggleButton>
            <Collapse isOpen={isOpen}>
              <div className="task-comment">
                <RichText html={task.comment} />
              </div>
            </Collapse>
          </>
        )}
      </TaskContent>
    </TaskWrapper>
  );
};

function TaskList(props) {
  const { tasks } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const sortedTasks = [...tasks].sort((a, b) => {
    const adate = a.completedAt ? a.completedAt : a.dueAt;
    const bdate = b.completedAt ? b.completedAt : b.dueAt;
    return dayjs(adate).diff(dayjs(bdate));
  });

  const undoneTasks = sortedTasks
    .filter((item) => item.completedAt === null && item.state !== 'CANCELLED')
    .map((item) => (
      <ListGroupItem key={item.id} className={`state--${item.state}`}>
        <Task task={item} theme={theme} t={t} completed={false} />
      </ListGroupItem>
    ));

  const doneTasks = sortedTasks
    .reverse()
    .filter((item) => item.completedAt !== null && item.state !== 'CANCELLED')
    .map((item) => (
      <ListGroupItem key={item.id} className={`state--${item.state}`}>
        <Task task={item} theme={theme} t={t} completed={true} />
      </ListGroupItem>
    ));

  return (
    <div>
      {undoneTasks.length > 0 && (
        <>
          <ListGroupTitle>{t('actions:action-tasks-todo')}</ListGroupTitle>
          <ListGroup className="mb-5">{undoneTasks}</ListGroup>
        </>
      )}
      {doneTasks.length > 0 && (
        <>
          <ListGroupTitle>{t('actions:action-tasks-done')}</ListGroupTitle>
          <ListGroup className="mb-5">{doneTasks}</ListGroup>
        </>
      )}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default TaskList;
