import type * as ReactModule from 'react';

import { ThemeProvider } from '@emotion/react';

import defaultThemeJson from '@kausal/themes/dist/themes/default/theme.json';
import type { Theme } from '@kausal/themes/types';
import { act, render, screen } from '@testing-library/react';

import dayjs from '@/common/dayjs';

import TaskList, { hasVisibleTasks } from '../TaskList';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

/* Set to render with the server snapshots, as on the server and in the hydration render */
let mockServerRender = false;
jest.mock('react', () => {
  const actual = jest.requireActual<typeof ReactModule>('react');
  const useSyncExternalStore: typeof actual.useSyncExternalStore = (
    subscribe,
    getSnapshot,
    getServerSnapshot
  ) =>
    mockServerRender && getServerSnapshot
      ? getServerSnapshot()
      : actual.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { ...actual, useSyncExternalStore };
});

jest.mock('@/context/plan', () => ({ usePlan: () => ({ actionListPage: null }) }));

const theme = defaultThemeJson as unknown as Theme;

const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
const today = dayjs().format('YYYY-MM-DD');

const tasks = [
  { id: '1', name: 'Plan the route', state: 'NOT_STARTED', dueAt: yesterday },
  { id: '2', name: 'Buy the bikes', state: 'IN_PROGRESS', dueAt: yesterday },
  { id: '5', name: 'Train the staff', state: 'IN_PROGRESS', dueAt: today },
  {
    id: '3',
    name: 'Hire a coordinator',
    state: 'COMPLETED',
    dueAt: '2026-05-01',
    completedAt: '2026-05-10',
  },
  { id: '4', name: 'Paint the lanes', state: 'CANCELLED', dueAt: '2026-04-01' },
];

type Section = {
  field: string;
  heading?: string | null;
  highlightLateTasks?: boolean | null;
} | null;

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

  it('lists cancelled tasks only when their section is given', () => {
    expect(sectionHeadings([{ field: 'cancelled' }, { field: 'not_started' }])).toEqual([
      'action-tasks-cancelled',
      'action-tasks-todo',
    ]);
    expect(screen.getByText('Paint the lanes')).toBeTruthy();
  });

  /* A newer backend may offer a section this version of the UI cannot show yet. */
  it('skips sections it does not know', () => {
    expect(sectionHeadings([{ field: 'archived' }, { field: 'not_started' }])).toEqual([
      'action-tasks-todo',
    ]);
  });

  it('marks in-progress tasks past their due date when the section highlights late tasks', () => {
    sectionHeadings([{ field: 'in_progress', highlightLateTasks: true }, { field: 'not_started' }]);
    /* Only the in-progress task due yesterday: one due today is not late yet, and the late
       not-started task is in a section that doesn't highlight. */
    expect(screen.getAllByText('action-task-late')).toHaveLength(1);
    expect(screen.getByText('Buy the bikes').closest('li')?.textContent).toContain(
      'action-task-late'
    );
  });

  it('does not mark late tasks by default', () => {
    sectionHeadings([{ field: 'in_progress' }]);
    expect(screen.queryByText('action-task-late')).toBeNull();
  });

  /* The server doesn't know the viewer's date, and the hydration render must match its markup. */
  it('does not mark late tasks when rendered on the server', () => {
    mockServerRender = true;
    try {
      sectionHeadings([{ field: 'in_progress', highlightLateTasks: true }]);
    } finally {
      mockServerRender = false;
    }
    expect(screen.getByText('Buy the bikes')).toBeTruthy();
    expect(screen.queryByText('action-task-late')).toBeNull();
  });

  it("marks a task as late once the viewer's date passes its due date", () => {
    jest.useFakeTimers({ now: new Date(2026, 9, 30, 23, 59) });
    try {
      const dueToday = [
        { id: '1', name: 'Buy the bikes', state: 'IN_PROGRESS', dueAt: '2026-10-30' },
      ];
      render(
        <ThemeProvider theme={theme}>
          <TaskList
            tasks={dueToday}
            sections={[{ field: 'in_progress', highlightLateTasks: true }]}
          />
        </ThemeProvider>
      );
      expect(screen.queryByText('action-task-late')).toBeNull();
      act(() => jest.advanceTimersByTime(2 * 60 * 1000));
      expect(screen.getByText('action-task-late')).toBeTruthy();
    } finally {
      jest.useRealTimers();
    }
  });

  /* Its icon must not announce a cancelled task as one still to do */
  it('labels the icon of a cancelled task as cancelled', () => {
    sectionHeadings([{ field: 'cancelled' }, { field: 'not_started' }]);
    const iconTitles = (name: string) =>
      [...(screen.getByText(name).closest('li')?.querySelectorAll('svg title') ?? [])].map(
        (title) => title.textContent
      );
    expect(iconTitles('Paint the lanes')).toEqual(['action-task-cancelled']);
    expect(iconTitles('Plan the route')).toEqual(['action-task-todo']);
  });

  /* The GraphQL type allows null entries in a stream field. */
  it('skips empty section entries', () => {
    expect(sectionHeadings([null, { field: 'not_started' }])).toEqual(['action-tasks-todo']);
  });
});

describe('hasVisibleTasks', () => {
  it('is true when a task is in a section that is shown', () => {
    expect(hasVisibleTasks(tasks, undefined)).toBe(true);
    expect(hasVisibleTasks(tasks, [{ field: 'cancelled' }])).toBe(true);
  });

  /* Otherwise the tasks block would show its heading with nothing under it. */
  it('is false when all tasks are in sections that are not shown', () => {
    const cancelledOnly = tasks.filter((task) => task.state === 'CANCELLED');
    expect(hasVisibleTasks(cancelledOnly, undefined)).toBe(false);
    expect(hasVisibleTasks(tasks, [null, { field: 'archived' }])).toBe(false);
    expect(hasVisibleTasks([], undefined)).toBe(false);
  });
});
