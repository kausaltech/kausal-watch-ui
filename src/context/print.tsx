'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    /** Set in print mode once the page has rendered; the PDF export waits for it. */
    __printReady?: boolean;
  }
}

// Set by ContentLoader (also in SSR HTML) and Chart until rendered
const BUSY_SELECTOR = '[aria-busy="true"]';

// Bridges gaps between chained loads (data arrives, then a chart mounts)
const SETTLE_DELAY_MS = 500;

// The delay after the last iframe load event before we declare ready.
// The iframe "load" event fires when the iframe's document finishes
// loading, but cross-origin content (e.g. embedded charts) may still
// be rendering via JavaScript after that. Since we can't detect
// third-party render completion from outside the iframe, we use a
// fixed delay as a buffer for the content to finish rendering.
const IFRAME_RENDER_DELAY_MS = 3000;

// Print anyway if something stays busy; keep below the export service timeout
const MAX_WAIT_MS = 20_000;

function usePrintReadyTracker(isPrint: boolean) {
  useEffect(() => {
    if (!isPrint) {
      return;
    }

    let pendingIframes = 0;
    let iframesSettleAt = 0;
    let timedOut = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const tracked = new Set<HTMLIFrameElement>();

    window.__printReady = false;

    function evaluate() {
      if (timedOut) {
        window.__printReady = true;
        return;
      }
      const remainingIframeDelay = iframesSettleAt - Date.now();
      if (remainingIframeDelay > 0) {
        window.__printReady = false;
        scheduleEvaluate(remainingIframeDelay);
        return;
      }
      window.__printReady = pendingIframes === 0 && !document.querySelector(BUSY_SELECTOR);
    }

    function scheduleEvaluate(delay = SETTLE_DELAY_MS) {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(evaluate, delay);
    }

    const maxWaitTimer = setTimeout(() => {
      timedOut = true;
      if (!window.__printReady) {
        console.warn(`Page still busy after ${MAX_WAIT_MS} ms, printing anyway`);
      }
      evaluate();
    }, MAX_WAIT_MS);

    function onLoad() {
      pendingIframes--;
      iframesSettleAt = Date.now() + IFRAME_RENDER_DELAY_MS;
      scheduleEvaluate();
    }

    function track(iframe: HTMLIFrameElement) {
      if (tracked.has(iframe)) return;
      tracked.add(iframe);
      window.__printReady = false;
      pendingIframes++;
      iframe.addEventListener('load', onLoad);

      // Since useEffect runs after paint, iframes already in the DOM may
      // have finished loading before we attach the listener. Likewise,
      // iframes added later via Suspense may already be loaded by the time
      // the MutationObserver fires. Reassigning src forces the browser to
      // re-trigger the load event so we can reliably detect completion.
      if (iframe.src) {
        iframe.setAttribute('src', iframe.src);
      }
    }

    document.querySelectorAll<HTMLIFrameElement>('iframe').forEach(track);

    // Re-check once DOM changes have settled
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLIFrameElement) track(node);
          if (node instanceof Element) {
            node.querySelectorAll<HTMLIFrameElement>('iframe').forEach(track);
          }
        });
      });
      scheduleEvaluate();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-busy'],
    });

    scheduleEvaluate();

    return () => {
      clearTimeout(settleTimer);
      clearTimeout(maxWaitTimer);
      observer.disconnect();
      tracked.forEach((iframe) => iframe.removeEventListener('load', onLoad));
      tracked.clear();
      delete window.__printReady;
    };
  }, [isPrint]);
}

export function PrintProvider({ children }: React.PropsWithChildren) {
  const searchParams = useSearchParams();
  const isPrint = searchParams.get('print') === 'true';

  usePrintReadyTracker(isPrint);

  return <>{children}</>;
}
