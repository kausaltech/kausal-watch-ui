import { createContext, useContext } from 'react';

import type { PlanContextFragment } from '@/common/__generated__/graphql';

export type PlanContextType = PlanContextFragment;

const PlanContext = createContext<PlanContextType>(null!);

export const usePlan = () => useContext(PlanContext);
export default PlanContext;
