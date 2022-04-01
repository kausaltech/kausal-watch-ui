import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import StatusBadge from 'components/common/StatusBadge';

export default {
  title: 'Action/ActionStatusTable/StatusBadge',
  includeStories: /^[A-Z]/
};

const Template = args => (
  <div style={{margin: 10}}>
    <StatusBadge {...args} />
  </div>
);

const OnTime = Template.bind({});
OnTime.args = {
  statusIdentifier: 'on_time',
  statusName: 'On Time'
}

const InProgress = Template.bind({});
InProgress.args = {
  statusIdentifier: 'in_progress',
  statusName: 'In Progress'
}

const Completed = Template.bind({});
Completed.args = {
  statusIdentifier: 'completed',
  statusName: 'Completed'
}

const Late = Template.bind({});
Late.args = {
  statusIdentifier: 'late',
  statusName: 'Late'
}

const Cancelled = Template.bind({});
Cancelled.args = {
  statusIdentifier: 'cancelled',
  statusName: 'Cancelled'
}

const Merged = Template.bind({});
Merged.args = {
  statusIdentifier: 'merged',
  statusName: 'Merged'
}

const Postponed = Template.bind({});
Postponed.args = {
  statusIdentifier: 'postponed',
  statusName: 'Postponed'
}

const NotStarted = Template.bind({});
NotStarted.args = {
  statusIdentifier: 'not_started',
  statusName: 'Not started'
}

const Undefined = Template.bind({});
Undefined.args = {
  statusIdentifier: 'undefined',
  statusName: 'Unknown'
}

const NotInKnownStatuses = Template.bind({});
NotInKnownStatuses.args = {
  statusIdentifier: 5,
  statusName: 'This status is not part of the a priori list of known statuses'
}

export const components = [
  NotStarted,
  InProgress,
  OnTime,
  Completed,
  Late,
  Cancelled,
  Merged,
  Postponed,
  Undefined,
  NotInKnownStatuses
]

export const AllStatuses = () => {
  const theme = useContext(ThemeContext);
  const children = components.map((c, idx) => (
    <Template {...Object.assign({}, c.args, {key: `status-${idx}`})} />
  ));
  return <div>{ children }</div>;
}
