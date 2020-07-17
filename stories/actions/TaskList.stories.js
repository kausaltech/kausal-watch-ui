import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import TaskList from '../../components/actions/TaskList';

export default {
  title: 'Task List',
};

const tasksList = [
  {
    id: '855',
    name: 'Task that is not completed yet',
    dueAt: '2024-12-31',
    completedAt: null,
    comment: 'But should be eventually completed',
  },
  {
    id: '906',
    name: 'Action description has been edited and published',
    dueAt: '2019-10-23',
    completedAt: '2020-02-19',
    comment: '',
  },
  {
    id: '570',
    name: 'Action has a primary contact person',
    dueAt: '2019-10-23',
    completedAt: '2019-10-23',
    comment: '<p>This description is wrapped in p-tag as it sometimes happens. Can also use <strong>bold</strong> or <em>italic</em> maybe</em></strong></p>',
  },
  {
    id: '854',
    name: 'This task has a link in description and a longer title that wraps on several lines',
    dueAt: '2019-09-17',
    completedAt: '2019-09-17',
    comment: '<p><a href="https://example.com/this-url-does-not-exist">https://example.com/this-url-does-not-exist</a></p>',
  },
];

const TaskLists = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <TaskList
            tasks={tasksList}
          />
        </div>
      </div>
    </div>
  );
};

export const TaskListStory = (theme) => <TaskLists theme={theme} />;
