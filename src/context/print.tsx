'use client';

import { createContext, useContext } from 'react';

import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

const PrintContext = createContext<boolean>(false);

const IFRAME_LOAD_TRACKER_SCRIPT = `(function() {
  var pending = 0;
  var settled = false;
  var debounceTimer;

  function check() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      if (pending === 0 && !settled) {
        settled = true;
        window.__iframesReady = true;
      }
    }, 200);
  }

  function track(iframe) {
    if (iframe.__tracked) return;
    iframe.__tracked = true;
    settled = false;
    window.__iframesReady = false;
    pending++;
    iframe.addEventListener('load', function() {
      pending--;
      check();
    });
  }

  document.querySelectorAll('iframe').forEach(track);

  new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeName === 'IFRAME') track(node);
        if (node.querySelectorAll) {
          node.querySelectorAll('iframe').forEach(track);
        }
      });
    });
  }).observe(document.body, { childList: true, subtree: true });

  if (pending === 0) {
    window.__iframesReady = true;
  }
})();`;

export function PrintProvider({ children }: React.PropsWithChildren) {
  const searchParams = useSearchParams();
  const isPrint = searchParams.get('print') === 'true';

  return (
    <PrintContext.Provider value={isPrint}>
      {isPrint && (
        <Script id="iframe-load-tracker" strategy="afterInteractive">
          {IFRAME_LOAD_TRACKER_SCRIPT}
        </Script>
      )}
      {children}
    </PrintContext.Provider>
  );
}

export const usePrint = () => useContext(PrintContext);
