import { ThemeProvider } from '@emotion/react';

import type { Theme } from '@kausal/themes/types';
import { act, render } from '@testing-library/react';

import type { ActionListAction } from '../../dashboard.types';
import UpdatedAtCell from '../UpdatedAtCell';

/* The cell only reads a handful of typography tokens off the theme. */
const theme = {
  fontSizeSm: '0.875rem',
  fontFamilyTiny: 'Tiny',
  fontFamilyFallback: 'sans-serif',
  spaces: { s050: '0.25rem' },
} as unknown as Theme;

const UPDATED_AT = '2026-09-18T12:00:00.000Z';

/*
 * `fromNow()` reports "a minute ago" up to 89 seconds and "2 minutes ago" from
 * 90 seconds on, so a server render at 89 seconds and a hydration two seconds
 * later straddle that boundary -- the case the cell has to survive.
 */
const SERVER_NOW = new Date(Date.parse(UPDATED_AT) + 89_000);
const CLIENT_NOW = new Date(Date.parse(UPDATED_AT) + 91_000);

const action = { updatedAt: UPDATED_AT } as ActionListAction;

const cell = (
  <ThemeProvider theme={theme}>
    <UpdatedAtCell action={action} />
  </ThemeProvider>
);

let consoleError: jest.SpyInstance;

beforeEach(() => {
  /* Faking the clock must not take React's scheduling primitives with it. */
  jest.useFakeTimers({ doNotFake: ['queueMicrotask', 'nextTick', 'setImmediate'] });
  consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.useRealTimers();
  consoleError.mockRestore();
});

/*
 * Stands in for the server's HTML. The cell's markup does not depend on which
 * renderer produced it, so rendering it against the server's clock yields the
 * same string `renderToString` would -- and keeps the test off `react-dom`,
 * whose types this repo does not carry.
 */
function markupRenderedAt(now: Date) {
  jest.setSystemTime(now);

  const { container, unmount } = render(cell);
  const html = container.innerHTML;

  unmount();

  return html;
}

/*
 * The cell renders a single element around a single text node. Asserting the
 * lookup succeeded keeps the identity comparisons below from passing vacuously
 * on two nulls if that structure ever changes.
 */
function textNodeOf(container: HTMLElement) {
  const node = container.firstChild?.firstChild;

  expect(node).toBeInstanceOf(Text);

  return node as Text;
}

function hydrateServerMarkup() {
  const container = document.createElement('div');
  container.innerHTML = markupRenderedAt(SERVER_NOW);
  document.body.appendChild(container);

  // What the browser shows before React takes over.
  expect(container.textContent).toBe('a minute ago');
  const serverTextNode = textNodeOf(container);

  jest.setSystemTime(CLIENT_NOW);
  render(cell, { container, hydrate: true });

  return { container, serverTextNode };
}

describe('UpdatedAtCell', () => {
  it('replaces the server text when hydration crosses a fromNow() boundary', () => {
    const { container, serverTextNode } = hydrateServerMarkup();

    expect(container.textContent).toBe('2 minutes ago');
    // The suppressed text is only corrected because the node itself is
    // replaced; patching it in place would have diffed equal and been skipped.
    expect(textNodeOf(container)).not.toBe(serverTextNode);
  });

  it('does not report the suppressed mismatch as a hydration error', () => {
    hydrateServerMarkup();

    expect(consoleError).not.toHaveBeenCalled();
  });

  it('shares one refresh timer across every cell', () => {
    const rows = (
      <ThemeProvider theme={theme}>
        <UpdatedAtCell action={action} />
        <UpdatedAtCell action={action} />
        <UpdatedAtCell action={action} />
      </ThemeProvider>
    );

    jest.setSystemTime(CLIENT_NOW);
    const { unmount } = render(rows);

    expect(jest.getTimerCount()).toBe(1);

    // And the shared timer goes away with the last cell.
    unmount();

    expect(jest.getTimerCount()).toBe(0);
  });

  it('keeps refreshing on the interval after hydration', () => {
    const { container } = hydrateServerMarkup();
    const hydratedTextNode = textNodeOf(container);

    // `advanceTimersByTime` moves the fake clock along with the timers, so set
    // it a minute short of the value the tick should end up reporting.
    jest.setSystemTime(new Date(Date.parse(UPDATED_AT) + 9 * 60_000));
    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    // Refreshing updates the text in place: the remount happens once, at
    // hydration, and every tick after it is an ordinary diff.
    expect(textNodeOf(container)).toBe(hydratedTextNode);

    expect(container.textContent).toBe('10 minutes ago');
  });
});
