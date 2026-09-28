import { act, render } from '@testing-library/react';

import { PrintProvider } from '../print';

let searchParams = new URLSearchParams('print=true');

jest.mock('next/navigation', () => ({
  useSearchParams: () => searchParams,
}));

function Page({ busy }: { busy: boolean }) {
  return <div>{busy ? <div aria-busy="true" hidden /> : <p>Content</p>}</div>;
}

// Let the MutationObserver callbacks run, then advance the timers
async function advance(ms: number) {
  await act(async () => {
    await Promise.resolve();
    jest.advanceTimersByTime(ms);
  });
}

describe('<PrintProvider />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    searchParams = new URLSearchParams('print=true');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('does not track readiness outside print mode', async () => {
    searchParams = new URLSearchParams();
    render(
      <PrintProvider>
        <Page busy={false} />
      </PrintProvider>
    );
    await advance(1000);
    expect(window.__printReady).toBeUndefined();
  });

  it('is ready once the page has settled', async () => {
    render(
      <PrintProvider>
        <Page busy={false} />
      </PrintProvider>
    );
    expect(window.__printReady).toBe(false);
    await advance(500);
    expect(window.__printReady).toBe(true);
  });

  it('waits until nothing on the page is busy', async () => {
    const { rerender } = render(
      <PrintProvider>
        <Page busy />
      </PrintProvider>
    );
    await advance(5000);
    expect(window.__printReady).toBe(false);

    rerender(
      <PrintProvider>
        <Page busy={false} />
      </PrintProvider>
    );
    await advance(499);
    expect(window.__printReady).toBe(false);
    await advance(1);
    expect(window.__printReady).toBe(true);
  });

  it('gives up waiting on content that stays busy', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <PrintProvider>
        <Page busy />
      </PrintProvider>
    );
    await advance(19_999);
    expect(window.__printReady).toBe(false);
    await advance(1);
    expect(window.__printReady).toBe(true);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
