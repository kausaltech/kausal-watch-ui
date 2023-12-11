import React from 'react';

import ActionPhase from 'components/actions/ActionPhase';

const mockPhases = [
  {
    id: '1',
    identifier: 'not_started',
    name: 'Not started',
    description: 'Action has not been started',
  },
  {
    id: '2',
    identifier: 'initiation',
    name: 'Initiation',
    description: 'Action is being initiated',
  },
  {
    id: '3',
    identifier: 'in_progress',
    name: 'In progress',
    description: 'Action is in progress',
  },
  {
    id: '4',
    identifier: 'decision_making',
    name: 'Decision making',
    description: 'Action is in decision making',
  },
  {
    id: '5',
    identifier: 'completed',
    name: 'Completed',
    description: 'Action is completed',
  },
];

const actionInProgress = {
  status: {
    name: 'On Time',
    identifier: 'on_time',
  },
  activePhase: 'in_progress',
  reason: '',
  phases: mockPhases,
};

const actionLate = {
  status: {
    identifier: 'late',
    name: 'Late',
  },
  activePhase: 'not_started',
  reason: 'Budget has not been approved',
  phases: mockPhases,
};

const actionMerged = {
  status: {
    identifier: 'merged',
    name: 'Merged',
  },
  reason: '',
  phases: mockPhases,
};

const actionPostponed = {
  status: {
    identifier: 'postponed',
    name: 'Postponed for now',
  },
  reason: 'Feasibility will be reassessed in 2025',
  phases: mockPhases,
};

const actionCancelled = {
  status: {
    identifier: 'cancelled',
    name: 'Cancelled',
  },
  activePhase: '',
  reason: 'Is not feasible in this point',
  phases: mockPhases,
};

export default {
  title: 'Action/Phase',
  component: ActionPhase,
};

function ActionPhaseTemplate(args) {
  return <ActionPhase {...args} />;
}

export const InProgress = ActionPhaseTemplate.bind({});
InProgress.args = actionInProgress;

export const Late = ActionPhaseTemplate.bind({});
Late.args = actionLate;

export const Postponed = ActionPhaseTemplate.bind({});
Postponed.args = actionPostponed;

export const Merged = ActionPhaseTemplate.bind({});
Merged.args = actionMerged;

export const Cancelled = ActionPhaseTemplate.bind({});
Cancelled.args = actionCancelled;
