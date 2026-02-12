'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { usePrependPlanAndLocale } from '@/common/links';
import GlobalNav from '@/components/common/GlobalNav';
import SkipToContent from '@/components/common/SkipToContent';
import { PLEDGE_PATH } from '@/constants/routes';
import { usePlan } from '@/context/plan';
import { getMetaTitles } from '@/utils/metadata';

const StyledHeader = styled.header`
  position: relative;
`;

/**
 * The PledgeHeader is a stripped back version of the usual Watch header
 * We don't display navigation links to the full plan as the target audience
 * (community users) is different. Users can still access the full KW plan via a
 * link which opens in a new tab.
 */
function PledgeHeader() {
  const plan = usePlan();
  const t = useTranslations();
  const { navigationTitle: siteTitle } = getMetaTitles(plan);

  const pledgeHomeLink = usePrependPlanAndLocale(PLEDGE_PATH);
  const mainPlanLink = usePrependPlanAndLocale('/');

  const externalItems = [
    {
      name: t('pledge-view-full-plan'),
      url: mainPlanLink,
      newTab: true,
      icon: 'arrow-up-right-from-square',
    },
  ];

  return (
    <StyledHeader>
      <SkipToContent />
      <GlobalNav
        activeBranch=""
        siteTitle={siteTitle}
        ownerName={plan.generalContent?.ownerName ?? plan.name}
        navItems={[]}
        externalItems={externalItems}
        customToolbarItems={[]}
        logoLink={pledgeHomeLink}
        hidePlanSelector
        hideSearch
        hideVersionSelector
      />
    </StyledHeader>
  );
}

export default PledgeHeader;
