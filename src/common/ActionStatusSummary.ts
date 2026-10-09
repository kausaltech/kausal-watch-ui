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

const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/**
 * Resolve a color coming from the backend. It is either a key of
 * `theme.graphColors` (e.g. `green050`) or a hex color (e.g. `#24f415`).
 */
export const getThemeColor = (color: string, theme: Theme): string | undefined => {
  if (HEX_COLOR_PATTERN.test(color)) return color;
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

const DEFAULT_COLOR = 'grey050' satisfies keyof Theme['graphColors'];

export const getStatusColorForAction = (action: ActionWithStatusSummary, theme: Theme): string => {
  const { color, statusSummary, scheduleContinuous } = action;

  // Override for continuous actions. TODO: move logic to backend
  if (scheduleContinuous && statusSummary?.identifier === ActionStatusSummaryIdentifier.Completed)
    return theme.actionContinuousColor;

  return (color ? getThemeColor(color, theme) : undefined) ?? theme.graphColors[DEFAULT_COLOR];
};
