import type { Theme } from '@kausal/themes/types';
import { memoize } from 'lodash-es';

import { ActionStatusSummaryIdentifier } from '@/common/__generated__/graphql';
import type { PlanContextType } from '@/context/plan';

export type MinimalActionStatusSummary = {
  identifier: ActionStatusSummaryIdentifier;
};

type ActionStatusSummary = PlanContextType['actionStatusSummaries'][number];

function _getStatusSummary(
  plan: PlanContextType,
  statusSummary: MinimalActionStatusSummary
): ActionStatusSummary {
  const { actionStatusSummaries } = plan;
  if (actionStatusSummaries == null) {
    throw new Error('Plan has no status summaries');
  }
  const summary = actionStatusSummaries.find((s) => s.identifier === statusSummary.identifier);
  if (summary == null) {
    throw new Error('No matching status summary found from plan');
  }
  return summary;
}

const getCacheKey = (plan: PlanContextType, statusSummary: MinimalActionStatusSummary): string => {
  return `${plan.identifier}.${statusSummary.identifier}`;
};

export const getStatusSummary = memoize(_getStatusSummary, getCacheKey);

export const getThemeColor = (color: string, theme: Theme) => {
  return theme.graphColors[color as keyof Theme['graphColors']];
};

export interface ActionWithStatusSummary {
  status?: {
    color?: string;
  } | null;
  statusSummary?: {
    identifier?: ActionStatusSummaryIdentifier;
    label?: string;
  } | null;
  color?: string | null;
  scheduleContinuous?: boolean;
}

const DEFAULT_COLOR = 'grey050';

export const getStatusColorForAction = (action: ActionWithStatusSummary, theme: Theme) => {
  const { color, statusSummary, scheduleContinuous } = action;

  // Override for continuous actions. TODO: move logic to backend
  if (scheduleContinuous && statusSummary?.identifier === ActionStatusSummaryIdentifier.Completed)
    return theme.actionContinuousColor;

  if (color != null) {
    return getThemeColor(color, theme);
  }
  return getThemeColor(DEFAULT_COLOR, theme);
};
