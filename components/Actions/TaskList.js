import React from 'react';
import { ListGroup, ListGroupItem as BaseListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import moment from '../../common/moment';
import Icon from '../common/Icon';


const Date = styled.span`
  font-weight: 700;
  font-size: 75%;
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
          <div className="task-header">
            <Icon name="check" className="text-black-50 mr-3" />
            <Date>{TaskList.parseTimestamp(item.completedAt)}</Date>
            {' | '}
            <span>{item.name}</span>
          </div>
          <div><small><span dangerouslySetInnerHTML={{ __html: item.comment }} /></small></div>
        </ListGroupItem>
      ));

    const undoneTasks = sortedTasks.map((item, index) => (
      item.completedAt === null
            && (
            <ListGroupItem key={item.id} className={`state--${item.state}`}>
              <div className="task-header">
                <Icon name="calendar" className="text-black-50 mr-3" />
                <Date>{TaskList.parseTimestamp(item.dueAt)}</Date>
                {' | '}
                <span>{item.name}</span>
              </div>
              <div><small><span dangerouslySetInnerHTML={{ __html: item.comment }} /></small></div>
            </ListGroupItem>
            )
    ));

    return (
      <div>
        { doneTasks.length > 0 && (
          <ListGroup className="mb-4">
            <h5>Mitä on tehty?</h5>
            {doneTasks}
          </ListGroup>
        )}
        { undoneTasks.length > 0
          ? (
            <ListGroup className="mb-4">
              <h5>Mitä on tehtävä?</h5>
              {undoneTasks}
            </ListGroup>
          )
          : <h5>Ei tekemättömiä tehtäviä</h5>
        }
      </div>

    );
  }
}


export default TaskList;
