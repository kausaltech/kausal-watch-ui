import type { Theme } from '@kausal/themes/types';

import {
  type ActionCardFragment,
  ActionStatusSummaryIdentifier,
} from '@/common/__generated__/graphql';
import type { PlanContextType } from '@/context/plan';

import { getActionColorLegend, getLegendHeadingKind } from '../ActionColorLegend';

const theme = {
  actionContinuousColor: '#00aa00',
  graphColors: {
    green050: '#22cc22',
    green010: '#ddffdd',
    grey010: '#eeeeee',
    grey050: '#888888',
  },
} as unknown as Theme;

const plan = {
  actionStatuses: [
    { id: 's1', identifier: 'on_time', name: 'On time' },
    { id: 's2', identifier: 'in_progress', name: 'In progress' },
    { id: 's3', identifier: 'completed', name: 'Completed' },
  ],
  actionImplementationPhases: [
    { id: 'p1', identifier: 'planning', name: 'Planning', color: '#123456' },
  ],
  actionStatusSummaries: [
    { identifier: ActionStatusSummaryIdentifier.NotStarted, label: 'Not started' },
    { identifier: ActionStatusSummaryIdentifier.Undefined, label: 'Unknown' },
  ],
} as unknown as PlanContextType;

const action = (fields: Record<string, unknown>) =>
  ({
    status: null,
    implementationPhase: null,
    statusSummary: null,
    ...fields,
  }) as unknown as ActionCardFragment;

const labels = { continuous: 'Continuous', notSet: 'Not set' };

describe('getActionColorLegend', () => {
  it('labels each color by the source that supplied it', () => {
    const actions = [
      // No status at all; listed first here but should come last
      action({
        color: 'grey010',
        statusSummary: { identifier: ActionStatusSummaryIdentifier.Undefined },
      }),
      // Phase color wins over the status' fallback color
      action({
        color: '#123456',
        status: { id: 's1', identifier: 'on_time', name: 'On time', color: 'green050' },
        implementationPhase: { id: 'p1', identifier: 'planning', name: 'Planning' },
      }),
      // Two statuses sharing a color end up under one swatch
      action({
        color: 'green050',
        status: { id: 's2', identifier: 'in_progress', name: 'In progress', color: 'green050' },
      }),
      action({
        color: 'green050',
        status: { id: 's1', identifier: 'on_time', name: 'On time', color: 'green050' },
      }),
      // No status, so the summary label is used
      action({
        color: 'green010',
        statusSummary: { identifier: ActionStatusSummaryIdentifier.NotStarted },
      }),
      action({
        color: 'green090',
        scheduleContinuous: true,
        status: { id: 's3', identifier: 'completed', name: 'Completed', color: 'green090' },
        statusSummary: { identifier: ActionStatusSummaryIdentifier.Completed },
      }),
    ];

    const entries = getActionColorLegend(actions, plan, theme, labels);
    expect(entries).toEqual([
      { color: '#22cc22', labels: ['On time', 'In progress'], kinds: ['status'] },
      { color: '#123456', labels: ['Planning'], kinds: ['phase'] },
      { color: '#ddffdd', labels: ['Not started'], kinds: ['status'] },
      { color: '#00aa00', labels: ['Continuous'], kinds: ['continuous'] },
      { color: '#eeeeee', labels: ['Not set'], kinds: ['not-set'] },
    ]);
    expect(getLegendHeadingKind(entries)).toBe('both');
  });

  it('returns nothing when no action color can be explained', () => {
    expect(getActionColorLegend([action({ color: null })], plan, theme, labels)).toEqual([]);
  });

  it('heads the legend by phase when only phases and unset actions show', () => {
    const actions = [
      action({
        color: '#123456',
        implementationPhase: { id: 'p1', identifier: 'planning', name: 'Planning' },
      }),
      action({
        color: 'grey010',
        statusSummary: { identifier: ActionStatusSummaryIdentifier.Undefined },
      }),
    ];
    expect(getLegendHeadingKind(getActionColorLegend(actions, plan, theme, labels))).toBe('phase');
  });
});
