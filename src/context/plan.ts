import { createContext, useContext } from 'react';

import type { PlanContextFragment } from '@/common/__generated__/graphql';

export type PlanContextType = PlanContextFragment;

// @ts-expect-error -- the context is populated before consumers render.
const PlanContext = createContext<PlanContextType>({});

export const usePlan = () => useContext(PlanContext);
export default PlanContext;
