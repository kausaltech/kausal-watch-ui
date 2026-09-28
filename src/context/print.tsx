'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { PDF_CONTENT_WIDTH_IN } from '@/utils/pdf-export';

declare global {
  interface Window {
    /** Set in print mode once the page has rendered; the PDF export waits for it. */
    __printReady?: boolean;
  }
}

/** Matches in PDF export rendering, where media queries still see a screen */
export const PRINT_MODE_SELECTOR = '[data-print-mode]';

// Set by ContentLoader (also in SSR HTML) and Chart until rendered
const BUSY_SELECTOR = '[aria-busy="true"]';

// Bridges gaps between chained loads (data arrives, then a chart mounts)
const SETTLE_DELAY_MS = 500;

// Cross-origin iframe content may still render after its load event
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

      // It may have loaded before we listened; reassigning src fires load again
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

  if (!isPrint) {
    return <>{children}</>;
  }

  return (
    <div data-print-mode="" style={{ display: 'contents' }}>
      {/* Draw charts at their printed width */}
      <style>{`html { width: ${PDF_CONTENT_WIDTH_IN}in; }`}</style>
      {children}
    </div>
  );
}
