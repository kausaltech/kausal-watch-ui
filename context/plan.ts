import { useContext, createContext } from 'react';
import GET_PLAN_CONTEXT from './queries/plan';
import type { PlanContext_plan } from './queries/__generated__/PlanContext';


export type PlanType = PlanContext_plan;

// @ts-ignore as context will be populated when it is used
const PlanContext = createContext<PlanContext_plan>({});

export { GET_PLAN_CONTEXT };
export const usePlan = () => useContext(PlanContext);
export default PlanContext;
