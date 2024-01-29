import { cloneDeep } from 'lodash';

import { ActionListAction } from '../components/dashboard/ActionList';
import {
  Plan,
  Sentiment,
  ActionStatusSummary,
  ActionStatusSummaryIdentifier,
} from './__generated__/graphql';
import { getStatusSummary } from '../common/ActionStatusSummary';
import type { Theme } from '@kausal/themes/types';
import type { Progress } from '../components/dashboard/ActionStatusGraphs';
import type { PlanContextType } from '../context/plan';
import { TFunction } from './i18n';

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
    newStatus.name =
      actionStatuses.find((statusType) => statusType.identifier === 'completed')
        ?.name || implementationPhase.name; // TODO -- some plans don't have
    // in practice in db, the names of these are the same
    // status, phase
    // (migrate first) //
    newStatus.identifier = 'completed';
    newStatus.isCompleted = true;
  }

  // if implementationPhase is not_started, and implementationPhase on_time create new status of not_started
  if (
    implementationPhase?.identifier === 'not_started' &&
    status?.identifier === 'on_time'
  ) {
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

class DonutSector {
  count: number;

  constructor(
    public label: string,
    public color: string,
    public includeInTotal: boolean
  ) {
    this.count = 0;
  }
  increment() {
    this.count++;
    return this;
  }
}

/*
 Process a list of actions and return an ordered list of statuses for statistics
 */
const getStatusData = (
  actions: ActionListAction[],
  actionStatusSummaries: ActionStatusSummary[],
  theme: Theme,
  unknownLabelText: string = '',
  language: string
) => {
  const progress: Progress = {
    values: [],
    labels: [],
    colors: [],
    texts: [],
    hoverTexts: [],
    good: 0,
    total: '',
  };
  let totalCount = 0;

  const counts: Map<string, number> = new Map();
  const colors: Map<string, string | null> = new Map();
  for (const action of actions) {
    const {
      statusSummary: { identifier },
      color,
    } = action;
    const val = 1 + (counts.get(identifier) ?? 0);
    counts.set(identifier, val);
    colors.set(identifier, color ?? null);
  }
  actionStatusSummaries.forEach(({ identifier, label, color, sentiment }) => {
    const statusCount = counts.get(identifier) ?? 0;
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(
        identifier === ActionStatusSummaryIdentifier.Undefined
          ? unknownLabelText
          : label || unknownLabelText
      );
      progress.colors.push(theme.graphColors[colors.get(identifier) ?? color]);
      if (sentiment === Sentiment.Positive || identifier === 'NOT_STARTED') {
        progress.good += statusCount;
      }
    }
    if (identifier !== ActionStatusSummaryIdentifier.Undefined) {
      totalCount += statusCount;
    }
  });
  progress.total = `${Math.round((progress.good / totalCount) * 100)}%`;
  const numberFormat = new Intl.NumberFormat(language, {
    maximumSignificantDigits: 2,
    style: 'percent',
  });
  for (let i = 0; i < progress.values.length; i++) {
    const label = progress.labels[i];
    let hoverText: string, text: string;
    if (label === unknownLabelText) {
      text = '';
      hoverText = label;
    } else {
      const value = progress.values[i];
      const formattedValue = numberFormat.format(value / totalCount);
      text = formattedValue;
      hoverText = `${label}<br>${value}<br>${formattedValue}`;
    }
    progress.hoverTexts.push(hoverText);
    progress.texts.push(text);
  }
  return progress;
};

/*
 Process a list of actions and return an ordered list of phases for statistics
 */
const getPhaseData = (
  actions: ActionListAction[],
  plan: PlanContextType,
  theme,
  t: TFunction
): Progress | null => {
  const phases = plan.actionImplementationPhases;
  if (phases.length == 0 || actions.length == 0) {
    return null;
  }
  let phaseColors = phases
    .filter((p) => p.color != null)
    .map((p) => theme.graphColors[p.color!]);

  /* We assume that if a custom color has not been set for *all*
     phases in a plan, the sparse colors will not form a coherent
     palette usable for the full graph.  Hence we use these default
     colors for all phases.
   */
  if (phaseColors.length != phases.length) {
    phaseColors = [
      theme.graphColors.green090,
      theme.graphColors.green070,
      theme.graphColors.green050,
      theme.graphColors.green030,
      theme.graphColors.green020,
      theme.graphColors.green010,
      theme.graphColors.grey030,
    ];
  }
  const donutSectorFromPhase = (phase, idx, isNotStartedPhase) => {
    return new DonutSector(
      phase.name,
      isNotStartedPhase
        ? theme.graphColors.grey020
        : phaseColors[idx] ?? theme.graphColors.yellow020,
      !isNotStartedPhase
    );
  };
  // Assumption: the first phase in order corresponds has the semantics of
  // "not started", regardless of identifier
  const notStartedPhase = phases[0];
  const phaseDonutSectorsByIdentifier: Map<string, DonutSector> = new Map(
    // Donut sectors for normal phases
    phases
      .slice()
      .reverse()
      .map((p, idx) => [
        p.identifier,
        donutSectorFromPhase(p, idx, p === notStartedPhase),
      ])
  );
  const inactiveActionsDonutSector: DonutSector = new DonutSector(
    // Donut sector for inactive (cancelled, merged, etc.) actions
    t('inactive-actions'),
    theme.graphColors.grey000,
    false
  );
  inactiveActionsDonutSector;
  const phaselessActionsDonutSector: DonutSector = new DonutSector(
    // Donut sector for active actions without a phase
    t('no-phase'),
    theme.graphColors.grey010,
    false
  );

  for (const action of actions) {
    const statusSummary = getStatusSummary(plan, action.statusSummary);
    if (!statusSummary.isActive && !statusSummary.isCompleted) {
      // Ignoring action phase because action is not active but not completed
      inactiveActionsDonutSector.increment();
      continue;
    }
    if (action.implementationPhase == null) {
      phaselessActionsDonutSector.increment();
      continue;
    }
    phaseDonutSectorsByIdentifier
      .get(action.implementationPhase.identifier)
      ?.increment();
  }

  const allSectors: DonutSector[] = [
    ...phaseDonutSectorsByIdentifier.values(),
    phaselessActionsDonutSector,
    inactiveActionsDonutSector,
  ].filter((s) => s.count > 0);

  return {
    labels: allSectors.map((s) => s.label),
    values: allSectors.map((s) => s.count),
    colors: allSectors.map((s) => s.color),
    good: 0,
    total: allSectors
      .filter((s) => s?.includeInTotal)
      .reduce((prev, cur) => prev + (cur?.count ?? 0), 0)
      .toString(),
  };
};

type StatusSummary = Plan['actionStatusSummaries'][0];

export { cleanActionStatus, getStatusData, getPhaseData };
