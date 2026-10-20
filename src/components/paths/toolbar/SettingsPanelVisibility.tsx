'use client';

import { useEffect } from 'react';

import { showSettingsPanelVar } from '@common/apollo/paths-cache';

/**
 * Tells the layout's settings panel whether it shows on this page; hidden
 * again once the page goes. Pages render it with `pageShowsPathsSettings`, the
 * rule the layout applies on the server.
 */
export default function SettingsPanelVisibility({ visible }: { visible: boolean }) {
  useEffect(() => {
    showSettingsPanelVar(visible);
    return () => {
      showSettingsPanelVar(false);
    };
  }, [visible]);
  return null;
}
