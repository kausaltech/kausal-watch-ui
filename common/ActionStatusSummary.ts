import type { Theme } from '@kausal/themes/types';
import type { PlanContextType } from 'context/plan';
import type { ActionStatusSummary, ActionStatusSummaryIdentifier } from 'common/__generated__/graphql';

export const getStatusSummary = (plan: PlanContextType, statusIdentifier: ActionStatusSummaryIdentifier) => {
  const { actionStatusSummaries } = plan;
  if (actionStatusSummaries == null) {
    throw new Error('Plan has no status summaries');
  }
  const summary = actionStatusSummaries.find(s => (s.identifier === statusIdentifier));
  if (summary == null) {
    throw new Error('No matching status summary found from plan');
  }
  return summary;
}

export const getStatusColor = (color: string, theme: Theme) => {
  return theme.graphColors[color];
};

interface ActionWithStatusSummary {
  statusSummary?: { color?: string, identifier?: string };
}

export const getStatusColorForAction = (action: ActionWithStatusSummary, plan: PlanContextType, theme: Theme) => {
  const ss = action?.statusSummary;
  if (ss == null || (ss?.identifier == null && ss?.color == null)) {
    throw new Error('Action data is missing statusSummary');
  }
  const statusSummary = (ss?.color == null) ? getStatusSummary(plan, ss.identifier) : ss;
  return getStatusColor(statusSummary.color, theme);
}
