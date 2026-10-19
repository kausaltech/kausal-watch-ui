import React, { useContext } from 'react';

import type { PathsInstanceType } from '@/components/providers/PathsProvider';

const PathsContext = React.createContext<PathsInstanceType | undefined>(undefined);

export const usePaths = () => {
  return useContext(PathsContext);
};

export default PathsContext;
