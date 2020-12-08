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
  statusIdentifier: 'on_time',
  statusName: 'On Time',
  activePhase: 'in_progress',
  reason: '',
  phases: mockPhases,
};

const actionLate = {
  statusIdentifier: 'late',
  statusName: 'Late',
  activePhase: 'not_started',
  reason: 'Budget has not been approved',
  phases: mockPhases,
};

const actionMerged = {
  statusIdentifier: 'merged',
  statusName: 'Merged',
  reason: '',
  phases: mockPhases,
};

const actionPostponed = {
  statusIdentifier: 'postponed',
  statusName: 'Postponed for now',
  reason: 'Feasibility will be reassessed in 2025',
  phases: mockPhases,
};

const actionCancelled = {
  statusIdentifier: 'cancelled',
  statusName: 'Cancelled',
  activePhase: '',
  reason: 'Is not feasible in this point',
  phases: mockPhases,
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

export const Postponed = ActionCardTemplate.bind({});
Postponed.args = actionPostponed;

export const Merged = ActionCardTemplate.bind({});
Merged.args = actionMerged;

export const Cancelled = ActionCardTemplate.bind({});
Cancelled.args = actionCancelled;
