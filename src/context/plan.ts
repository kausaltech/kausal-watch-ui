import { createContext, useContext } from 'react';

import type { PlanContextFragment } from '@/common/__generated__/graphql';

export type PlanContextType = PlanContextFragment;

// @ts-ignore as context will be populated when it is used
const PlanContext = createContext<PlanContextType>({});

export const usePlan = () => useContext(PlanContext);
export default PlanContext;
