import { describe, expect, it } from '@jest/globals';

import { getPhaseData } from '@/common/preprocess';

const defaultPhases = [
  {
    identifier: 'not_started',
    name: 'Not started',
  },
  {
    identifier: 'in_progress',
    name: 'In progress',
  },
  {
    identifier: 'completed',
    name: 'Completed',
  },
];

const defaultActions: any[] = [1, 2, 5]
  .map((count, idx) =>
    new Array(count).fill(null).map((count) => ({
      implementationPhase: defaultPhases[idx],
      statusSummary: {
        identifier: 'ON_TIME',
        isActive: true,
        isCompleted: idx == 2,
      },
    }))
  )
  .flat();

const actionsWithInActiveActions = defaultActions
  .concat(
    defaultActions.map((a) =>
      Object.assign({}, a, {
        statusSummary: {
          identifier: 'OUT_OF_SCOPE',
          isActive: false,
          isCompleted: false,
        },
      })
    )
  )
  .concat({
    implementationPhase: null,
    statusSummary: {
      identifier: 'UNDEFINED',
      isActive: true,
      isCompleted: false,
    },
  });

const defaultPlan = {
  actionStatusSummaries: [
    {
      isActive: false,
      identifier: 'COMPLETED',
      isCompleted: true,
      label: 'Completed',
    },
    {
      isActive: true,
      identifier: 'ON_TIME',
      isCompleted: false,
      label: 'On time',
    },
    {
      isActive: true,
      identifier: 'IN_PROGRESS',
      isCompleted: false,
      label: 'In progress',
    },
    {
      isActive: true,
      identifier: 'NOT_STARTED',
      isCompleted: false,
      label: 'Not started',
    },
    {
      isActive: true,
      identifier: 'LATE',
      isCompleted: false,
      label: 'Late',
    },
    {
      isActive: false,
      identifier: 'CANCELLED',
      isCompleted: false,
      label: 'Cancelled or postponed',
    },
    {
      isActive: false,
      identifier: 'OUT_OF_SCOPE',
      isCompleted: false,
      label: 'Out of scope',
    },
    {
      isActive: false,
      identifier: 'MERGED',
      isCompleted: true,
      label: 'Merged',
    },
    {
      isActive: false,
      identifier: 'POSTPONED',
      isCompleted: false,
      label: 'Postponed',
    },
    {
      isActive: true,
      identifier: 'UNDEFINED',
      isCompleted: false,
      label: 'Unknown',
    },
  ],
  actionImplementationPhases: defaultPhases,
};

const mockT = (x) => x;

const getTestPhaseData = (actions: unknown, plan: unknown) =>
  getPhaseData(
    actions as Parameters<typeof getPhaseData>[0],
    plan as Parameters<typeof getPhaseData>[1],
    { graphColors: {} } as Parameters<typeof getPhaseData>[2],
    mockT as Parameters<typeof getPhaseData>[3]
  );

describe('getPhaseData', () => {
  it('returns null for no actions', () => {
    expect(getTestPhaseData([], { actionImplementationPhases: [] })).toEqual(null);
  });
  it('returns the correct series with default actions', () => {
    expect(getTestPhaseData(defaultActions, defaultPlan)).toMatchObject({
      labels: ['Completed', 'In progress', 'Not started'],
      values: [5, 2, 1],
      colors: [undefined, undefined, undefined],
      good: 7,
      total: '8',
    });
  });
  it('returns the correct series with actions that have an inactive status', () => {
    expect(getTestPhaseData(actionsWithInActiveActions, defaultPlan)).toMatchObject({
      labels: ['Completed', 'In progress', 'Not started', 'no-phase', 'inactive-actions'],
      values: [5, 2, 1, 1, 8],
      colors: [undefined, undefined, undefined, undefined, undefined],
      good: 7,
      total: '17',
    });
  });
});
