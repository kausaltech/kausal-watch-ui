import type { ComponentType } from 'react';

import dynamic from 'next/dynamic';

import { useTheme } from 'styled-components';

export const CUSTOM_COMPONENTS = {
  zurich: {
    GlobalNav: dynamic(() => import('@/components/paths/custom/zurich/GlobalNav')),
    Footer: dynamic(() => import('@/components/paths/custom/zurich/Footer')),
  },
};

export const useCustomComponent = (componentName: string, FallbackComponent: ComponentType) => {
  const theme = useTheme();

  return CUSTOM_COMPONENTS[theme.name]?.[componentName] ?? FallbackComponent;
};
