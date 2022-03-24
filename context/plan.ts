import { useContext, createContext } from 'react';
import getConfig from 'next/config';
import GET_PLAN_CONTEXT from './queries/plan';
import type { PlanContext_plan } from './queries/__generated__/PlanContext';


export type PlanType = PlanContext_plan;

export function customizePlan(plan: PlanContext_plan): PlanContext_plan {
  const { publicRuntimeConfig } = getConfig();
  const features = {...plan.features};
  if (publicRuntimeConfig.forceFeatures) {
    for (let feat of publicRuntimeConfig.forceFeatures) {
      let enabled = true;
      if (feat[0] === '!') {
        feat = feat.substring(1);
        enabled = false;
      }
      features[feat] = enabled;
    }
  }
  return {
    ...plan,
    features,
  };
}

// @ts-ignore as context will be populated when it is used
const PlanContext = createContext<PlanContext_plan>({});

export { GET_PLAN_CONTEXT };
export const usePlan = () => useContext(PlanContext);
export default PlanContext;
