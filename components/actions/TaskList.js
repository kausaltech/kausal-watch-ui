import React from 'react';
import { PropTypes } from 'prop-types';
import { ListGroup as BaseListGroup, ListGroupItem as BaseListGroupItem } from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import dayjs from 'common/dayjs';
import Icon from 'components/common/Icon';
import RichText from 'components/common/RichText';
import { withTranslation } from 'common/i18n';

const Date = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  margin-left: ${(props) => props.theme.spaces.s025};
`;

const TaskWrapper = styled.div`
  display: flex;
`;

const TaskMeta = styled.div`
  margin-top: ${(props) => props.theme.spaces.s050};
  flex: 0 0 ${(props) => props.theme.spaces.s800};
`;

const TaskContent = styled.div`
  border-left: 1px solid ${(props) => props.theme.themeColors.light};
  margin: ${(props) => props.theme.spaces.s050};
  padding-left: ${(props) => props.theme.spaces.s100};

  .text-content {
    font-size: ${(props) => props.theme.fontSizeSm};
    font-family: ${(props) => props.theme.fontFamilyTiny};

    p:last-child {
      margin-bottom: 0;
    }
  }
  .task-comment h4 {
    margin-top: 1rem;
  }

  a {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
    hyphens: auto;
  }
`;

const ListGroup = styled(BaseListGroup)`
  h4 {
    font-size: ${(props) => props.theme.fontSizeBase};
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

const ListGroupTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizeMd};
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

function TaskList(props) {
  const { t, theme, tasks } = props;
  const sortedTasks = [...tasks]
    .sort((a, b) => {
      const adate = a.completedAt ? a.completedAt : a.dueAt;
      const bdate = b.completedAt ? b.completedAt : b.dueAt;
      return dayjs(adate).diff(dayjs(bdate));
    });

  const undoneTasks = sortedTasks
    .filter((item) => item.completedAt === null && item.state !== 'CANCELLED')
    .map((item) => (
      <ListGroupItem key={item.id} className={`state--${item.state}`}>
        <TaskWrapper>
          <TaskMeta>
            <Icon name="calendar" color={theme.themeColors.dark} alt={t('actions:action-task-todo')} />
            <Date>{parseTimestamp(item.dueAt)}</Date>
          </TaskMeta>
          <TaskContent>
            <h4 className="task-title">{item.name}</h4>
            <div className="task-comment">
              {item.comment && (<RichText html={item.comment} />)}
            </div>
          </TaskContent>
        </TaskWrapper>
      </ListGroupItem>
    ));

  const doneTasks = sortedTasks
    .reverse()
    .filter((item) => item.completedAt !== null && item.state !== 'CANCELLED')
    .map((item) => (
      <ListGroupItem key={item.id} className={`state--${item.state}`}>
        <TaskWrapper>
          <TaskMeta>
            <Icon name="check" color={theme.themeColors.dark} alt={t('actions:action-task-done')} />
            <Date>{parseTimestamp(item.completedAt)}</Date>
          </TaskMeta>
          <TaskContent>
            <h4 className="task-title">{item.name}</h4>
            <div className="task-comment">
              {item.comment && (<RichText html={item.comment} />)}
            </div>
          </TaskContent>
        </TaskWrapper>
      </ListGroupItem>
    ));

  return (
    <div>
      { undoneTasks.length > 0
        ? (
          <>
            <ListGroupTitle>{ t('actions:action-tasks-todo') }</ListGroupTitle>
            <ListGroup className="mb-5">
              {undoneTasks}
            </ListGroup>
          </>
        )
        : <h4 className="text-muted mb-4">{ t('actions:action-tasks-todo-empty') }</h4> }
      { doneTasks.length > 0 && (
        <>
          <ListGroupTitle>{ t('actions:action-tasks-done') }</ListGroupTitle>
          <ListGroup className="mb-5">
            {doneTasks}
          </ListGroup>
        </>
      )}
    </div>

  );
}

TaskList.propTypes = {
  t: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withTranslation(['common', 'actions'])(withTheme(TaskList));
