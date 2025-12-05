'use client';

import GlobalIndicatorModal from './GlobalIndicatorModal';

/**
 * Client component wrapper for GlobalIndicatorModal
 * This is needed because the layout is a server component
 */
const GlobalIndicatorModalWrapper = () => {
  return <GlobalIndicatorModal />;
};

export default GlobalIndicatorModalWrapper;
