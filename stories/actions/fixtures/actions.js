import { components as statusBadgeValues } from '../StatusBadge.stories';

const makeAction = (
  {
    namespace,
    sequence,
    groupName,
    status = makeStatus(statusBadgeValues[1].args),
    responsibleParties = [],
    tasks = [],
    updatedAt = (new Date()).toISOString()
  }
) => ({
  id: sequence,
  order: sequence,
  identifier: `${namespace}-${sequence}`,
  name: `${groupName}${sequence}`,
  status,
  responsibleParties,
  tasks,
  updatedAt
});

const NOW = Date.now()

const makeStatus = (props) => ({
  identifier: props.statusIdentifier,
  name: props.statusName
});

const makeUpdatedAt = (sequence) => {
  let date = new Date();
  date.setTime(NOW - 50000*(2**(sequence+1)));
  return date.toISOString();
};

export const actions = statusBadgeValues.map((sb, sequence) => makeAction({
  namespace: 'SB',
  sequence,
  groupName: 'StatusBadge v',
  status: makeStatus(sb.args),
  updatedAt: makeUpdatedAt(sequence),
}))

export const plan = {
  primaryOrgs: [],
  actionImpacts: [],
  actionStatuses: []
};
