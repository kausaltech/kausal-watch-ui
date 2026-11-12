import { ActionTaskState } from '@/common/__generated__/graphql';

import type { ActionListAction, ActionListPlan } from '../../dashboard.types';
import { getTaskCounts } from '../TasksStatusCell';

const plan = { id: '1', name: 'Plan' } as ActionListPlan;
const t = ((key: string) => key) as Parameters<typeof getTaskCounts>[2];

function task(id: string, state: ActionTaskState, dueAt: string | null, isContinuous = false) {
  return {
    __typename: 'ActionTask',
    id,
    state,
    dueAt,
    isContinuous,
  } as ActionListAction['tasks'][number];
}

describe('getTaskCounts', () => {
  it('counts open tasks past their due date as late', () => {
    const counts = getTaskCounts(
      [
        task('1', ActionTaskState.InProgress, '2000-01-01'),
        task('2', ActionTaskState.NotStarted, '2999-01-01'),
        task('3', ActionTaskState.Completed, '2000-01-01'),
        task('4', ActionTaskState.Cancelled, '2000-01-01'),
      ],
      plan,
      t
    );
    expect(counts).toMatchObject({ total: 3, late: 1, onTime: 1, completed: 1 });
  });

  /* A continuous task may have no due date, and such a task is never late */
  it('counts open continuous tasks without a due date as on time', () => {
    const counts = getTaskCounts(
      [
        task('1', ActionTaskState.InProgress, null, true),
        task('2', ActionTaskState.NotStarted, null, true),
        task('3', ActionTaskState.InProgress, '2000-01-01', true),
      ],
      plan,
      t
    );
    expect(counts).toMatchObject({ total: 3, late: 1, onTime: 2, completed: 0 });
  });
});
