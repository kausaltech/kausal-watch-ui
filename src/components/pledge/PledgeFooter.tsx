'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import { getDeploymentType } from '@common/env';

import type { TFunction } from '@/common/i18n';
import { usePrependPlanAndLocale } from '@/common/links';
import MonsidoAccessibility from '@/components/MonsidoAccessibility';
import ApplicationStateBanner from '@/components/common/ApplicationStateBanner';
import SiteFooter, {
  type FooterAdditionalLink,
  type UtilityLink,
} from '@/components/common/SiteFooter';
import { type PlanContextType, usePlan } from '@/context/plan';
import { getMetaTitles } from '@/utils/metadata';

const getFeedbackUrl = (currentURL: string) => {
  const feedbackPageUrlBase = '/feedback';
  if (currentURL.startsWith(feedbackPageUrlBase)) {
    return null;
  }
  const feedbackPageQueryPart = `?lastUrl=${encodeURIComponent(currentURL)}`;
  return `${feedbackPageUrlBase}${feedbackPageQueryPart}`;
};

function getAccessibilityLink(plan: PlanContextType, t: TFunction) {
  if (plan.accessibilityStatementUrl) {
    return {
      id: 'accessibility',
      name: t('accessibility'),
      slug: plan.accessibilityStatementUrl,
    };
  }

  return {
    id: 'accessibility',
    name: t('accessibility'),
    slug: '/accessibility',
  };
}

function getUtilityLinks(plan, mainPlanLink, pathname, theme, t) {
  const utilityLinks: UtilityLink[] = [
    {
      id: 'view-full-plan',
      name: t('pledge-view-full-plan'),
      slug: mainPlanLink,
      icon: 'arrow-up-right-from-square',
    },
  ];

  if (theme.settings.showFeedbackLink || plan.externalFeedbackUrl) {
    const url = plan.externalFeedbackUrl || getFeedbackUrl(pathname);

    if (url) {
      utilityLinks.push({
        id: 'feedback',
        name: t('give-feedback'),
        slug: url,
      });
    }
  }

  if (plan.adminUrl) {
    utilityLinks.push({
      id: 'admin',
      name: t('admin-login'),
      slug: plan.adminUrl,
      icon: 'lock',
    });
  }

  return utilityLinks;
}

/**
 * Simplified footer for pledge pages.
 * Excludes links from the full plan but keeps accessibility and
 * utility links (admin, feedback, etc) and adds a link to view
 * the full action plan in a new tab.
 */
function PledgeFooter() {
  const plan = usePlan();
  const pathname = usePathname();
  const generalContent = plan.generalContent || {};
  const theme = useTheme();
  const { navigationTitle: siteTitle } = getMetaTitles(plan);
  const { fundingInstruments, otherLogos, footerStatement } = theme.settings;
  const t = useTranslations();

  const mainPlanLink = usePrependPlanAndLocale('/');
  const utilityLinks: UtilityLink[] = getUtilityLinks(plan, mainPlanLink, pathname, theme, t);
  const additionalLinks: FooterAdditionalLink[] = [getAccessibilityLink(plan, t)];
  const ownerLinks = (theme.settings?.footerOwnerLinks ?? []).map((link, index) => ({
    id: `owner-link-${index}`,
    ...link,
  }));

  const monsidoToken = theme.settings?.monsidoToken;

  return (
    <>
      <SiteFooter
        siteTitle={siteTitle}
        ownerName={generalContent.ownerName ?? ''}
        ownerUrl={generalContent.ownerUrl ?? ''}
        creativeCommonsLicense={generalContent.creativeCommonsLicense ?? ''}
        copyrightText={generalContent.copyrightText ?? ''}
        utilityLinks={utilityLinks}
        additionalLinks={additionalLinks}
        navItems={[]}
        fundingInstruments={fundingInstruments ?? []}
        otherLogos={otherLogos ?? []}
        footerStatement={footerStatement ?? ''}
        ownerLinks={ownerLinks}
      />
      <ApplicationStateBanner deploymentType={getDeploymentType()} />
      {monsidoToken && <MonsidoAccessibility token={monsidoToken} />}
    </>
  );
}

export default PledgeFooter;
