'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    __iframesReady?: boolean;
  }
}

function useIframeLoadTracker(isPrint: boolean) {
  useEffect(() => {
    if (!isPrint) {
      return;
    }

    let pending = 0;
    let settled = false;
    let hasIframes = false;
    let debounceTimer: ReturnType<typeof setTimeout>;
    const tracked = new Set<HTMLIFrameElement>();

    // The delay after the last iframe load event before we declare ready.
    // The iframe "load" event fires when the iframe's document finishes
    // loading, but cross-origin content (e.g. embedded charts) may still
    // be rendering via JavaScript after that. Since we can't detect
    // third-party render completion from outside the iframe, we use a
    // fixed delay as a buffer for the content to finish rendering.
    const IFRAME_RENDER_DELAY_MS = 3000;

    function check() {
      clearTimeout(debounceTimer);
      const delay = hasIframes ? IFRAME_RENDER_DELAY_MS : 0;
      debounceTimer = setTimeout(() => {
        if (pending === 0 && !settled) {
          settled = true;
          window.__iframesReady = true;
        }
      }, delay);
    }

    function onLoad() {
      pending--;
      check();
    }

    function track(iframe: HTMLIFrameElement) {
      if (tracked.has(iframe)) return;
      tracked.add(iframe);
      settled = false;
      hasIframes = true;
      window.__iframesReady = false;
      pending++;
      iframe.addEventListener('load', onLoad);

      // Since useEffect runs after paint, iframes already in the DOM may
      // have finished loading before we attach the listener. Likewise,
      // iframes added later via Suspense may already be loaded by the time
      // the MutationObserver fires. Reassigning src forces the browser to
      // re-trigger the load event so we can reliably detect completion.
      if (iframe.src) {
        iframe.src = iframe.src;
      }
    }

    document.querySelectorAll<HTMLIFrameElement>('iframe').forEach(track);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLIFrameElement) track(node);
          if (node instanceof Element) {
            node.querySelectorAll<HTMLIFrameElement>('iframe').forEach(track);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (pending === 0) {
      window.__iframesReady = true;
    }

    return () => {
      clearTimeout(debounceTimer);
      observer.disconnect();
      tracked.forEach((iframe) => iframe.removeEventListener('load', onLoad));
      tracked.clear();
      delete window.__iframesReady;
    };
  }, [isPrint]);
}

export function PrintProvider({ children }: React.PropsWithChildren) {
  const searchParams = useSearchParams();
  const isPrint = searchParams.get('print') === 'true';

  useIframeLoadTracker(isPrint);

  return <>{children}</>;
}
