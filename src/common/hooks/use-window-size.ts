import { useEffect, useState } from 'react';

import debounce from 'lodash/debounce';

type Size = {
  width?: number;
  height?: number;
};

export function useWindowSize(debounceMs: number = 0) {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    const handleResizeDebounced = debounce(handleResize, debounceMs);

    handleResize();
    window.addEventListener('resize', handleResizeDebounced);

    return () => {
      window.removeEventListener('resize', handleResizeDebounced);
    };
  }, [debounceMs]);

  return windowSize;
}
