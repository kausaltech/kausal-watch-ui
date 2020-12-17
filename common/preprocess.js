import _ from 'lodash';
import { i18n } from 'common/i18n';

// Clean up actionStatus so UI can handle edge cases
const cleanActionStatus = (action, actionStatuses) => {
  const { status } = action;
  // precaution not to mutate original object
  const newStatus = status ? _.cloneDeep(status) : {};

  // if status is undefined, mark it as a status
  if (!status) {
    newStatus.id = '404'; // not nice to invent ids, but we don't use ids as differentiator in the UI
    newStatus.name = i18n.t('action-status-undefined');
    newStatus.identifier = 'undefined';
    newStatus.isCompleted = false;
  }

  // if implementationPhase is completed, make sure status is also completed
  if (action.implementationPhase?.identifier === 'completed' && status.identifier !== 'completed') {
    newStatus.id = '13'; // this is the current completed id in api
    newStatus.name = actionStatuses.find(
      (statusType) => statusType.identifier === 'completed',
    ).name || action.implementationPhase.name;
    newStatus.identifier = 'completed';
    newStatus.isCompleted = true;
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
    severely_late: theme.graphColors.yellow090,
    cancelled: theme.graphColors.grey030,
    merged: theme.graphColors.grey010,
    postponed: theme.graphColors.blue030,
    not_started: theme.graphColors.green010,
    undefined: theme.graphColors.red050,
  };

  statusColor = statusColors[statusIdentifier];

  return statusColor;
};

export { cleanActionStatus, getStatusColor };
