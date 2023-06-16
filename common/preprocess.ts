import { cloneDeep } from 'lodash';

import { ActionListAction } from '../components/dashboard/ActionList';
import { Action, ActionStatus, ActionImplementationPhase, Plan, Sentiment, ActionStatusSummary, ActionStatusSummaryIdentifier } from './__generated__/graphql';
import { getStatusSummary } from '../common/ActionStatusSummary';
import type { Theme } from '@kausal/themes/types';
import type { Progress } from '../components/dashboard/ActionStatusGraphs';
import type { PlanContextType } from '../context/plan';

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


/*
 Process a list of actions and return an ordered list of statuses for statistics
 */
const getStatusData = (actions: ActionListAction[], actionStatusSummaries: ActionStatusSummary[], theme: Theme) => {

  const progress: Progress = {
    values: [],
    labels: [],
    colors: [],
    good: 0,
    total: '',
  };
  let totalCount = 0;

  const counts: Map<string, number> = new Map();
  for (const action of actions) {
    const {statusSummary: {identifier}} = action;
    const val = 1 + (counts.get(identifier) ?? 0);
    counts.set(identifier, val);
  }
  actionStatusSummaries.forEach(({identifier, label, color, sentiment}) => {
    const statusCount = counts.get(identifier) ?? 0;
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(label);
      progress.colors.push(theme.graphColors[color]);
      if (sentiment == Sentiment.Positive) {
        progress.good = progress.good + statusCount;
      }
    }
    totalCount += statusCount;
  });
  progress.total = `${Math.round((progress.good / totalCount) * 100)}%`;
  return progress;
};

/*
 Process a list of actions and return an ordered list of phases for statistics
 */
const getPhaseData = (actions: ActionListAction[], plan: PlanContextType, theme, t): Progress => {
  const phaseData: Progress = {
    labels: [],
    values: [],
    colors: [],
    good: 0,
    total: '',
  };
  let totalCount = 0;

  const phases = plan.actionImplementationPhases;

  let phaseColors = phases.map(p => theme.graphColors[p.color]).filter(c => c != null);
  if (phaseColors.length != phases.length) {
    phaseColors = [
      theme.graphColors.grey020,
      theme.graphColors.green030,
      theme.graphColors.green050,
      theme.graphColors.green070,
      theme.graphColors.green090,
      theme.graphColors.green090,
      theme.graphColors.grey010,
    ];
  }

  // Process actions and ignore set phase if action's status trumps it
  const phasedActions = actions.map((action) => {
    const { implementationPhase } = action;
    const statusSummary = getStatusSummary(plan, action.statusSummary);
    const base = (statusSummary.isActive && implementationPhase != null)
      ? implementationPhase
      : statusSummary;
    const phase = Object.assign({}, base);
    if (statusSummary.isActive === false) {
      phase.name = `No phase (${phase.name})`;
    }
    if (statusSummary.identifier === ActionStatusSummaryIdentifier.Completed) {
      phase.name = statusSummary.name;
    }
    // TODO: better way to handle phase---summary -matching
    phase.identifier = phase?.identifier?.toLowerCase();
    return { phase };
  });

  phases.forEach((phase, index) => {
    const actionCountOnPhase = phasedActions.filter(
      action => action.phase?.identifier === phase.identifier.toLowerCase());

    phaseData.labels.push(phase.name);
    phaseData.values.push(actionCountOnPhase.length);
    phaseData.colors.push(phaseColors[index]);
    if (phase.identifier !== 'not_started') {
      // TODO: make this an attribute of the phase in the backend
      totalCount += actionCountOnPhase.length;
    }
  });

  const unknownActions = new Set(
    phasedActions.filter(a => (
      !phases.find(p => p.identifier.toLowerCase() === a.phase?.identifier)
    ))
  );
  phaseData.labels.push(t('unknown'));
  phaseData.values.push(unknownActions.size);
  phaseData.colors.push(theme.graphColors.grey010);

  phaseData.total = totalCount.toString();
  return phaseData;
};

type StatusSummary = Plan['actionStatusSummaries'][0];

export { cleanActionStatus, getStatusData, getPhaseData };
