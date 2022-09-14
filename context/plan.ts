import { useContext, createContext } from 'react';
import getConfig from 'next/config';
import GET_PLAN_CONTEXT from './queries/plan';
import type { PlanContextFragment } from 'common/__generated__/graphql';


export type PlanContextType = PlanContextFragment;

export function customizePlan(plan: PlanContextType): PlanContextType {
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
const PlanContext = createContext<PlanContextType>({});

export { GET_PLAN_CONTEXT };
export const usePlan = () => useContext(PlanContext);
export default PlanContext;
