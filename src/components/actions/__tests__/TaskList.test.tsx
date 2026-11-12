import type * as ReactModule from 'react';

import { ThemeProvider } from '@emotion/react';

import defaultThemeJson from '@kausal/themes/dist/themes/default/theme.json';
import { act, render, screen } from '@testing-library/react';

import { initializeMuiTheme } from '@common/themes/mui-theme/theme';

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

const theme = initializeMuiTheme(defaultThemeJson);

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
    sectionHeadings([{ field: 'in_progress', highlightLateTasks: true }]);
    /* Only the task due yesterday: one due today is not late yet. */
    expect(screen.getAllByText('action-task-late')).toHaveLength(1);
    expect(screen.getByText('Buy the bikes').closest('li')?.textContent).toContain(
      'action-task-late'
    );
  });

  it('marks late not-started tasks when the in-progress section highlights late tasks', () => {
    sectionHeadings([{ field: 'not_started' }, { field: 'in_progress', highlightLateTasks: true }]);
    expect(screen.getByText('Plan the route').closest('li')?.textContent).toContain(
      'action-task-late'
    );
  });

  it('does not mark late not-started tasks without an in-progress section', () => {
    sectionHeadings([{ field: 'not_started' }]);
    expect(screen.queryByText('action-task-late')).toBeNull();
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
    expect(iconTitles('Plan the route')).toEqual(['action-task-due-date']);
  });

  describe('continuous tasks', () => {
    const continuous = {
      id: '6',
      name: 'Run the summer lunches',
      state: 'IN_PROGRESS',
      isContinuous: true,
    };

    function renderSection(sectionTasks: object[], field = 'in_progress') {
      render(
        <ThemeProvider theme={theme}>
          <TaskList tasks={sectionTasks} sections={[{ field, highlightLateTasks: true }]} />
        </ThemeProvider>
      );
    }

    const taskNames = () =>
      [...document.querySelectorAll('.task-title')].map((title) => title.textContent);

    /* The icon's title, and the visible text next to the icon (outside the SVG) */
    function taskMeta(name: string) {
      const icon = screen.getByText(name).closest('li')?.querySelector('svg');
      return {
        iconTitle: icon?.querySelector('title')?.textContent,
        text: icon?.nextElementSibling?.textContent,
      };
    }

    const groupToggles = () =>
      screen
        .getAllByRole('button')
        .map((button) => button.textContent)
        .filter((text) => text?.endsWith(')'));

    const datedTasks = (state: string) =>
      Array.from({ length: 12 }, (_, i) => ({
        id: `d${i}`,
        name: `Task ${i}`,
        state,
        dueAt: `${2025 + (i % 2)}-06-01`,
        completedAt: state === 'COMPLETED' ? `${2025 + (i % 2)}-06-01` : undefined,
      }));

    it('shows the continuous label instead of a date and is never late', () => {
      renderSection([continuous]);
      expect(taskMeta('Run the summer lunches')).toEqual({
        iconTitle: 'action-continuous',
        text: 'action-continuous',
      });
      expect(screen.queryByText('action-task-late')).toBeNull();
    });

    it('shows both the date and the label when a continuous task has a due date', () => {
      renderSection([{ ...continuous, dueAt: '2000-06-15' }]);
      const meta = taskMeta('Run the summer lunches');
      /* A due date that has passed still makes it late */
      expect(meta.iconTitle).toBe('action-task-late');
      expect(meta.text).toMatch(/2000/);
      expect(meta.text).toMatch(/action-continuous$/);
    });

    it('shows the label for a cancelled task without a due date', () => {
      renderSection([{ ...continuous, state: 'CANCELLED' }], 'cancelled');
      expect(taskMeta('Run the summer lunches')).toEqual({
        iconTitle: 'action-task-cancelled',
        text: 'action-continuous',
      });
    });

    it('shows only the completion date for a completed continuous task', () => {
      renderSection(
        [{ ...continuous, state: 'COMPLETED', completedAt: '2000-06-15' }],
        'completed'
      );
      const meta = taskMeta('Run the summer lunches');
      expect(meta.iconTitle).toBe('action-task-completed-on');
      expect(meta.text).toMatch(/2000/);
      expect(meta.text).not.toContain('action-continuous');
    });

    it('lists tasks without a due date first, by name', () => {
      renderSection([
        { id: '1', name: 'Buy the bikes', state: 'IN_PROGRESS', dueAt: yesterday },
        { ...continuous, id: '7', name: 'Water the trees' },
        continuous,
      ]);
      expect(taskNames()).toEqual(['Run the summer lunches', 'Water the trees', 'Buy the bikes']);
    });

    it('lists tasks without a due date first in a newest-first section too', () => {
      const cancelled = { ...continuous, state: 'CANCELLED' };
      renderSection(
        [
          { id: '1', name: 'Old task', state: 'CANCELLED', dueAt: '2024-01-01' },
          { ...cancelled, id: '7', name: 'Water the trees' },
          { id: '2', name: 'New task', state: 'CANCELLED', dueAt: '2025-01-01' },
          cancelled,
        ],
        'cancelled'
      );
      expect(taskNames()).toEqual([
        'Run the summer lunches',
        'Water the trees',
        'New task',
        'Old task',
      ]);
    });

    it('puts tasks without a due date in their own group before the years', () => {
      renderSection([...datedTasks('IN_PROGRESS'), continuous]);
      expect(groupToggles()).toEqual(['action-continuous (1)', '2025 (6)', '2026 (6)']);
    });

    it('puts the group of tasks without a due date first in a newest-first section', () => {
      renderSection(
        [...datedTasks('CANCELLED'), { ...continuous, state: 'CANCELLED' }],
        'cancelled'
      );
      expect(groupToggles()).toEqual(['action-continuous (1)', '2026 (6)', '2025 (6)']);
    });
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
