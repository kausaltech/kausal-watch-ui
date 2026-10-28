import { ThemeProvider } from '@emotion/react';

import defaultThemeJson from '@kausal/themes/dist/themes/default/theme.json';
import type { Theme } from '@kausal/themes/types';
import { render, screen } from '@testing-library/react';

import TaskList, { hasVisibleTasks } from '../TaskList';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('@/context/plan', () => ({ usePlan: () => ({ actionListPage: null }) }));

const theme = defaultThemeJson as unknown as Theme;

const tasks = [
  { id: '1', name: 'Plan the route', state: 'NOT_STARTED', dueAt: '2027-03-01' },
  { id: '2', name: 'Buy the bikes', state: 'IN_PROGRESS', dueAt: '2027-01-01' },
  {
    id: '3',
    name: 'Hire a coordinator',
    state: 'COMPLETED',
    dueAt: '2026-05-01',
    completedAt: '2026-05-10',
  },
  { id: '4', name: 'Paint the lanes', state: 'CANCELLED', dueAt: '2026-04-01' },
];

type Section = { field: string; heading?: string | null } | null;

function sectionHeadings(sections?: Section[]) {
  render(
    <ThemeProvider theme={theme}>
      <TaskList tasks={tasks} sections={sections} />
    </ThemeProvider>
  );
  return screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
}

describe('TaskList', () => {
  /* A backend from before the order could be chosen sends no sections. */
  it('lists to do, in progress and completed when no sections are given', () => {
    expect(sectionHeadings()).toEqual([
      'action-tasks-todo',
      'action-tasks-doing',
      'action-tasks-done',
    ]);
  });

  it('lists the sections in the order given, with their heading overrides', () => {
    expect(
      sectionHeadings([
        { field: 'in_progress', heading: 'Under way' },
        { field: 'not_started', heading: '' },
        { field: 'completed', heading: null },
      ])
    ).toEqual(['Under way', 'action-tasks-todo', 'action-tasks-done']);
  });

  it('leaves out the sections that are not given', () => {
    expect(sectionHeadings([{ field: 'completed' }])).toEqual(['action-tasks-done']);
    expect(screen.queryByText('Plan the route')).toBeNull();
  });

  /* A newer backend may offer a section this version of the UI cannot show yet. */
  it('skips sections it does not know', () => {
    expect(sectionHeadings([{ field: 'cancelled' }, { field: 'not_started' }])).toEqual([
      'action-tasks-todo',
    ]);
    expect(screen.queryByText('Paint the lanes')).toBeNull();
  });

  /* The GraphQL type allows null entries in a stream field. */
  it('skips empty section entries', () => {
    expect(sectionHeadings([null, { field: 'not_started' }])).toEqual(['action-tasks-todo']);
  });
});

describe('hasVisibleTasks', () => {
  it('is true when a task is in a section that is shown', () => {
    expect(hasVisibleTasks(tasks, undefined)).toBe(true);
    expect(hasVisibleTasks(tasks, [{ field: 'completed' }])).toBe(true);
  });

  /* Otherwise the tasks block would show its heading with nothing under it. */
  it('is false when all tasks are in sections that are not shown', () => {
    const cancelledOnly = tasks.filter((task) => task.state === 'CANCELLED');
    expect(hasVisibleTasks(cancelledOnly, undefined)).toBe(false);
    expect(hasVisibleTasks(tasks, [null, { field: 'archived' }])).toBe(false);
    expect(hasVisibleTasks([], undefined)).toBe(false);
  });
});
