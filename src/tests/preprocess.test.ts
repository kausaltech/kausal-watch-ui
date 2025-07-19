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

const defaultActions = [1, 2, 5]
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

describe('getPhaseData', () => {
  it('returns null for no actions', () => {
    expect(
      getPhaseData([], { actionImplementationPhases: [] }, { graphColors: {} }, mockT)
    ).toEqual(null);
  });
  it('returns the correct series with default actions', () => {
    expect(getPhaseData(defaultActions, defaultPlan, { graphColors: {} }, mockT)).toMatchObject({
      labels: ['Completed', 'In progress', 'Not started'],
      values: [5, 2, 1],
      colors: [undefined, undefined, undefined],
      good: 0,
      total: '7', // substract 1 for the not_started action
    });
  });
  it('returns the correct series with actions that have an inactive status', () => {
    expect(
      getPhaseData(actionsWithInActiveActions, defaultPlan, { graphColors: {} }, mockT)
    ).toMatchObject({
      labels: ['Completed', 'In progress', 'Not started', 'no-phase', 'inactive-actions'],
      values: [5, 2, 1, 1, 8],
      colors: [undefined, undefined, undefined, undefined, undefined],
      good: 0,
      total: '7',
    });
  });
});
