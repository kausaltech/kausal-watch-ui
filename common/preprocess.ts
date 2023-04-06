import { cloneDeep } from 'lodash';

import { ActionListAction } from '../components/dashboard/ActionList';
import { Plan, Sentiment } from './__generated__/graphql';

// Clean up actionStatus so UI can handle edge cases
const cleanActionStatus = (action, actionStatuses) => {
  const { status, implementationPhase } = action;
  // precaution not to mutate original object
  const newStatus = status ? cloneDeep(status) : {};

  // if status is missing, mark it as undefined
  // if implementationPhase is completed, make status undefined
  if (!status) {
    newStatus.id = '404'; // not nice to invent ids, but we don't use ids as differentiator in the UI
    newStatus.name = '';
    newStatus.identifier = 'undefined';
    newStatus.isCompleted = false;
  }

  // if implementationPhase is completed, make new status of completed
  if (implementationPhase?.identifier === 'completed') {
    newStatus.id = '13'; // this is the old completed id in api
    newStatus.name = actionStatuses.find(
      (statusType) => statusType.identifier === 'completed',
    )?.name || implementationPhase.name; // TODO -- some plans don't have
    // in practice in db, the names of these are the same
    // status, phase
    // (migrate first) //
    newStatus.identifier = 'completed';
    newStatus.isCompleted = true;
  }

  // if implementationPhase is not_started, and implementationPhase on_time create new status of not_started
  if (implementationPhase?.identifier === 'not_started' && status?.identifier === 'on_time') {
    newStatus.id = '70'; // this is the old not_started id in api
    newStatus.name = status.name;
    newStatus.identifier = 'not_started';
    newStatus.isCompleted = false;
  }

  // if action is merged, mark it as a status
  if (action.mergedWith) {
    newStatus.id = '707'; // not nice to invent ids, but we don't use ids as differentiator in the UI
    newStatus.name = 'merged'; // TODO get translation here somehow, Storybook fails i18n.t
    newStatus.identifier = 'merged';
    newStatus.isCompleted = true;
  }

  return newStatus;
};

const getStatusColor = (color, theme) => {
  return theme.graphColors[color];
  let statusColor = theme.graphColors.grey090;

  const statusColors = {
    on_time: theme.graphColors.green050,
    in_progress: theme.graphColors.green050,
    completed: theme.graphColors.green090,
    late: theme.graphColors.yellow050,
    cancelled: theme.graphColors.grey030,
    merged: theme.graphColors.grey030,
    postponed: theme.graphColors.blue030,
    not_started: theme.graphColors.green010,
    undefined: theme.graphColors.grey010,
  };

  statusColor = statusColors[statusIdentifier];

  return statusColor;
};

/*
 Process a list of actions and return an ordered list of statuses for statistics
 */
const getStatusData = (actions, actionStatusSummaries, theme) => {
  type Progress = {
    values: number[];
    labels: string[];
    colors: string[];
    good: number;
    total: string;
  }

  const progress: Progress = {
    values: [],
    labels: [],
    colors: [],
    good: 0,
    total: '',
  };
  let totalCount = 0;

  console.log(actionStatusSummaries);
  const counts: Map<string, number> = new Map();
  for (const {statusSummary: {identifier}} of actions) {
    const val = (counts.get(identifier)) ?? 0 + 1;
    counts.set(identifier, val);
  }
  actionStatusSummaries.forEach(({identifier, label, color, sentiment}) => {
    const statusCount = counts.get(identifier) ?? 0;
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(label);
      progress.colors.push(getStatusColor(color, theme));
      if (sentiment === Sentiment.Positive) progress.good += 1;
    }
  });

  progress.total = `${Math.round((progress.good / totalCount) * 100)}%`;
  return progress;
};

/*
 Process a list of actions and return an ordered list of phases for statistics
 */
const getPhaseData = (actions, phases, actionStatuses, theme, t) => {
  const phaseData = {
    labels: [],
    values: [],
    colors: [],
    total: 0,
  };

  const phaseColors = [
    theme.graphColors.green010,
    theme.graphColors.green030,
    theme.graphColors.green050,
    theme.graphColors.green070,
    theme.graphColors.green090,
    theme.graphColors.grey010,
  ];

  // Process actions and ignore set phase if action's status trumps it
  const phasedActions = actions.map((action) => {
    const actionStatus = cleanActionStatus(action, actionStatuses);
    const realphase = {
      id: action.implementationPhase?.id,
      identifier: action.implementationPhase?.identifier,
      name: action.implementationPhase?.name,
    };

    if (['cancelled', 'merged', 'postponed', 'completed'].includes(actionStatus.identifier)) {
      realphase.id = actionStatus.id;
      realphase.identifier = actionStatus.identifier;
      realphase.name = `No phase (${actionStatus.name})`;
    }

    if (actionStatus.identifier === 'completed') {
      realphase.name = actionStatus.name;
    }

    return { phase: realphase };
  });

  phases.forEach((phase, index) => {
    const actionCountOnPhase = phasedActions.filter((action) => action.phase.identifier === phase.identifier);

    phaseData.labels.push(phase.name);
    phaseData.values.push(actionCountOnPhase.length);
    phaseData.colors.push(phaseColors[index]);
    phaseData.total += actionCountOnPhase.length;
  });

  phaseData.labels.push(t('unknown'));
  phaseData.values.push(actions.length - phaseData.total);
  phaseData.colors.push(theme.graphColors.grey010);

  return phaseData;
};

type StatusSummary = Plan['actionStatusSummaries'][0];

const mapActionStatusSummaries = (actions: ActionListAction[], statusSummaries: StatusSummary[]) => {
  const summaryById = new Map<StatusSummary['identifier'], StatusSummary>(statusSummaries.map(s => [s.identifier, s]));
  return actions.map(a => (Object.assign({}, a, {statusSummary: summaryById.get(a.statusSummary)})));
}

export { cleanActionStatus, getStatusColor, getStatusData, getPhaseData, mapActionStatusSummaries };
