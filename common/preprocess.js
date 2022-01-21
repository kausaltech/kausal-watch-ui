import _ from 'lodash';
import { getI18n } from 'common/i18n';

// Clean up actionStatus so UI can handle edge cases
const cleanActionStatus = (action, actionStatuses) => {
  const i18n = getI18n();
  const { status, implementationPhase } = action;
  // precaution not to mutate original object
  const newStatus = status ? _.cloneDeep(status) : {};

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
    )?.name || implementationPhase.name;
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
    newStatus.name = i18n.t('action-status-merged');
    newStatus.identifier = 'merged';
    newStatus.isCompleted = true;
  }

  return newStatus;
};

const getStatusColor = (statusIdentifier, theme) => {
  let statusColor = theme.graphColors.grey090;

  const statusColors = {
    on_time: theme.graphColors.green050,
    in_progress: theme.graphColors.green050,
    completed: theme.graphColors.green090,
    late: theme.graphColors.yellow050,
    cancelled: theme.graphColors.grey030,
    merged: theme.graphColors.grey010,
    postponed: theme.graphColors.blue030,
    not_started: theme.graphColors.green010,
    undefined: theme.graphColors.grey090,
  };

  statusColor = statusColors[statusIdentifier];

  return statusColor;
};

/*
 Process a list of actions and return an ordered list of statuses for statistics
 */
const getStatusData = (actions, actionStatuses, theme) => {
  const progress = {
    values: [],
    labels: [],
    good: 0,
    total: 0,
    colors: [],
  };
  const ORDER_STATUSES = [
    'completed',
    'on_time',
    'in_progress',
    'not_started',
    'late',
    'cancelled',
    'merged',
    'postponed',
    'undefined',
  ];

  let totalCount = 0;

  ORDER_STATUSES.forEach((statusIdentifier) => {
    let statusCount = 0;
    let statusName = '';
    actions.forEach((action) => {
      const actionStatus = cleanActionStatus(action, actionStatuses);
      if (actionStatus.identifier === statusIdentifier) {
        statusCount += 1;
        totalCount += 1;
        statusName = actionStatus.name;
      }
    });
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(statusName);
      progress.colors.push(getStatusColor(statusIdentifier, theme));
      if (['completed', 'on_time', 'in_progress'].includes(statusIdentifier)) progress.good += statusCount;
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

export { cleanActionStatus, getStatusColor, getStatusData, getPhaseData };
