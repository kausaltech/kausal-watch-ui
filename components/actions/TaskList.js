import React from 'react';
import { PropTypes } from 'prop-types';
import { ListGroup as BaseListGroup, ListGroupItem as BaseListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import moment from '../../common/moment';
import Icon from '../common/Icon';
import { withTranslation } from '../../common/i18n';

const Date = styled.span`
  font-weight: 700;
  font-size: 75%;
`;

const TaskWrapper = styled.div`
  display: flex;
`;

const TaskMeta = styled.div`
  flex: 0 0 6rem;
`;

const TaskContent = styled.div`
  border-left: 1px solid ${(props) => props.theme.themeColors.light};
  margin-left: .5rem;
  padding-left: 1rem;

  .text-content {
    font-size: .9rem;

    p:last-child {
      margin-bottom: 0;
    }
  }
`;

const ListGroup = styled(BaseListGroup)`

`;

const ListGroupItem = styled(BaseListGroupItem)`
  padding: .5rem;

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
  const timeFormat = 'DD.MM.YYYY';
  return moment(timestamp).format(timeFormat);
}

function TaskList(props) {
  const { t, tasks } = props;
  const sortedTasks = tasks
    .sort((a, b) => {
      const adate = a.completedAt ? a.completedAt : a.dueAt;
      const bdate = b.completedAt ? b.completedAt : b.dueAt;
      return moment(adate).diff(moment(bdate));
    });

  const undoneTasks = sortedTasks
    .filter((item) => item.completedAt === null && item.state !== 'CANCELLED')
    .map((item) => (
      <ListGroupItem key={item.id} className={`state--${item.state}`}>
        <TaskWrapper>
          <TaskMeta>
            <Icon name="calendar" className="text-black-50 mr-2" alt={t('action-task-todo')} />
            <Date>{parseTimestamp(item.dueAt)}</Date>
          </TaskMeta>
          <TaskContent>
            <h6>{item.name}</h6>
            <div
              className="text-content"
              dangerouslySetInnerHTML={{ __html: item.comment }}
            />
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
            <Icon name="check" className="text-black-50 mr-2" alt={t('action-task-done')} />
            <Date>{parseTimestamp(item.completedAt)}</Date>
          </TaskMeta>
          <TaskContent>
            <h6>{item.name}</h6>
            <div
              className="text-content"
              dangerouslySetInnerHTML={{ __html: item.comment }}
            />
          </TaskContent>
        </TaskWrapper>
      </ListGroupItem>
    ));

  return (
    <div>
      { undoneTasks.length > 0
        ? (
          <>
            <h5 className="mb-3">{ t('action-tasks-todo') }</h5>
            <ListGroup className="mb-5">
              {undoneTasks}
            </ListGroup>
          </>
        )
        : <h5 className="text-muted mb-4">{ t('action-tasks-todo-empty') }</h5> }
      { doneTasks.length > 0 && (
        <>
          <h5 className="mb-3">{ t('action-tasks-done') }</h5>
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

export default withTranslation('common')(TaskList);
