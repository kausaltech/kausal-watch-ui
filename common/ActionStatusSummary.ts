import { memoize } from 'lodash';
import type { Theme } from '@kausal/themes/types';
import type { PlanContextType } from 'context/plan';
import type { ActionStatusSummary, ActionStatusSummaryIdentifier } from 'common/__generated__/graphql';

export type MinimalActionStatusSummary = {
  identifier: ActionStatusSummaryIdentifier
}

const _getStatusSummary = (plan: PlanContextType, statusSummary: MinimalActionStatusSummary): ActionStatusSummary => {
  const { actionStatusSummaries } = plan;
  if (actionStatusSummaries == null) {
    throw new Error('Plan has no status summaries');
  }
  const summary = actionStatusSummaries.find(s => s.identifier === statusSummary.identifier);
  if (summary == null) {
    throw new Error('No matching status summary found from plan');
  }
  return summary;
}

const getCacheKey = (plan: PlanContextType, statusSummary: MinimalActionStatusSummary): string => {
  return `${plan.identifier}.${statusSummary.identifier}`;
}

export const getStatusSummary = memoize(_getStatusSummary, getCacheKey);

export const getStatusColor = (color: string, theme: Theme) => {
  return theme.graphColors[color];
};

interface ActionWithStatusSummary {
  statusSummary?: { color?: string, identifier?: string };
}

export const getStatusColorForAction = (action: ActionWithStatusSummary, plan: PlanContextType, theme: Theme) => {
  const s = action?.statusSummary;
  if (s == null || (s?.identifier == null && s?.color == null)) {
    throw new Error('Action data is missing statusSummary');
  }
  const statusSummary = (s?.color == null) ? getStatusSummary(plan, s) : s;
  return getStatusColor(statusSummary.color, theme);
}
