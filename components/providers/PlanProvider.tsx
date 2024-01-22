'use client';

import { ReactNode } from 'react';

import { PlanContextFragment } from '@/common/__generated__/graphql';
import PlanContext from '@/context/plan';

type Props = {
  plan: PlanContextFragment;
  children: ReactNode;
};

export default function PlanProvider({ plan, children }: Props) {
  return <PlanContext.Provider value={plan}>{children}</PlanContext.Provider>;
}
