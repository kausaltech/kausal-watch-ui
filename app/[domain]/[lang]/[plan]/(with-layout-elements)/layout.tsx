'use client';

import { ReactNode } from 'react';
import { GetPlanContextQuery } from '@/common/__generated__/graphql';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePlan } from '@/context/plan';
import { StyledMain } from './StyledMain';

function getTitles(plan: NonNullable<GetPlanContextQuery['plan']>) {
  if (plan.parent) {
    return {
      title: plan.parent.name,
      navigationTitle: plan.parent.generalContent.siteTitle || plan.parent.name,
    };
  }

  return {
    title: plan.generalContent.siteTitle || plan.name,
    navigationTitle: plan.generalContent.siteTitle || plan.name,
  };
}

type Props = {
  children: ReactNode;
};

/**
 * Route group to support adding a header, footer and other
 * layout elements that shouldn't be applied to embeds.
 */
export default function Layout({ children }: Props) {
  const plan = usePlan();
  const { navigationTitle, title } = getTitles(plan);

  return (
    <>
      <Header siteTitle={navigationTitle} />
      <StyledMain id="main">{children}</StyledMain>
      <Footer siteTitle={navigationTitle} />{' '}
    </>
  );
}
