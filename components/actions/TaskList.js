import React from 'react';
import { ListGroup, ListGroupItem as BaseListGroupItem } from 'reactstrap';
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

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    flex: 0 0 3rem;
  }
`;

const TaskContent = styled.div`
  border-left: 1px solid #333;
  margin-left: 1rem;
  padding-left: 1rem;
`;

const ListGroupItem = styled(BaseListGroupItem)`

  &.state--cancelled .task-header {
    text-decoration: line-through;
  }
`;

class TaskList extends React.Component {
  static parseTimestamp(timestamp) {
    const timeFormat = 'DD.MM.YYYY';
    return moment(timestamp).format(timeFormat);
  }

  render() {
    const t = this.props.t;
    const sortedTasks = this.props.tasks.sort((a, b) => {
      let bdate;
      let adate;

      a.completedAt ? adate = a.completedAt : adate = a.dueAt;
      b.completedAt ? bdate = b.completedAt : bdate = b.dueAt;
      return moment(adate).diff(moment(bdate));
    });

    const doneTasks = sortedTasks
      .filter(item => item.completedAt !== null)
      .map((item, index) => (
        <ListGroupItem key={item.id} className={`state--${item.state}`}>
          <TaskWrapper>
            <TaskMeta>
              <Icon name="check" className="text-black-50 mr-2" alt={t('action-task-done')}/>
              <Date>{TaskList.parseTimestamp(item.completedAt)}</Date>
            </TaskMeta>
            <TaskContent>
              <h6>{item.name}</h6>
              <div className="text-content"><small><span dangerouslySetInnerHTML={{ __html: item.comment }} /></small></div>
            </TaskContent>
          </TaskWrapper>
        </ListGroupItem>
      ));

    const undoneTasks = sortedTasks.map((item, index) => (
      item.completedAt === null
            && (
            <ListGroupItem key={item.id} className={`state--${item.state}`}>
              <TaskWrapper>
                <TaskMeta>
                  <Icon name="calendar" className="text-black-50 mr-2" alt={t('action-task-todo')}/>
                  <Date>{TaskList.parseTimestamp(item.dueAt)}</Date>
                </TaskMeta>
                <TaskContent>
                  <h6>{item.name}</h6>
                  <div className="text-content"><small><span dangerouslySetInnerHTML={{ __html: item.comment }} /></small></div>
                </TaskContent>
              </TaskWrapper>
            </ListGroupItem>
            )
    ));

    return (
      <div>
        { doneTasks.length > 0 && (
          <ListGroup className="mb-5">
            <h5 className="mb-3">{ t('action-tasks-done') }</h5>
            {doneTasks}
          </ListGroup>
        )}
        { undoneTasks.length > 0
          ? (
            <ListGroup className="mb-5">
              <h5 className="mb-3">{ t('action-tasks-todo') }</h5>
              {undoneTasks}
            </ListGroup>
          )
          : <h5>{ t('action-tasks-todo-empty') }</h5>
        }
      </div>

    );
  }
}


export default withTranslation('common')(TaskList);
