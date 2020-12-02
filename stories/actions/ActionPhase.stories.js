import React from 'react';

import ActionPhase from 'components/actions/ActionPhase';

const actionInProgress = {
  status: 'on_time',
  message: 'Action is in progress and on time',
  reason: '',
  phases: [
    {
      id: 1,
      name: 'Not started',
      completed: true,
      active: false,
    },
    {
      id: 2,
      name: 'Initiation',
      completed: true,
      active: false,
    },
    {
      id: 3,
      name: 'Progress',
      completed: false,
      active: true,
    },
    {
      id: 4,
      name: 'Decision',
      completed: false,
      active: false,
    },
    {
      id: 5,
      name: 'Completed',
      completed: false,
      active: false,
    },
  ],
};

const actionLate = {
  status: 'late',
  message: 'Action has not been started and it is late',
  reason: 'Budget has not been approved',
  phases: [
    {
      id: 1,
      name: 'Not started',
      completed: false,
      active: true,
    },
    {
      id: 2,
      name: 'Initiation',
      completed: false,
      active: false,
    },
    {
      id: 3,
      name: 'Progress',
      completed: false,
      active: false,
    },
    {
      id: 4,
      name: 'Decision',
      completed: false,
      active: false,
    },
    {
      id: 5,
      name: 'Completed',
      completed: false,
      active: false,
    },
  ],
};

export default {
  title: 'Action/Phase',
  component: ActionPhase,
};

const ActionCardTemplate = (args) => <ActionPhase {...args} />;

export const InProgress = ActionCardTemplate.bind({});
InProgress.args = actionInProgress;

export const Late = ActionCardTemplate.bind({});
Late.args = actionLate;
