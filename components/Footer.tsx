'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { usePlan } from 'context/plan';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import SiteFooter, { UtilityLink } from './common/SiteFooter';
import { deploymentType } from '@/common/environment';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { PlanContextFragment } from '@/common/__generated__/graphql';
import { getMetaTitles } from '@/utils/metadata';

type NavItem = NonNullable<PlanContextFragment['footer']>['items'][0];

const getFeedbackUrl = (currentURL) => {
  const feedbackPageUrlBase = '/feedback';
  if (currentURL.startsWith(feedbackPageUrlBase)) {
    return null;
  }
  const feedbackPageQueryPart = `?lastUrl=${encodeURIComponent(currentURL)}`;
  return `${feedbackPageUrlBase}${feedbackPageQueryPart}`;
};

function getNavChildren(navItem: NavItem) {
  if (!navItem || !('children' in navItem)) {
    return [];
  }

  return (navItem.children || [])
    .filter((child): child is NonNullable<typeof child> => !!child)
    .map((child) => ({
      id: child.id,
      name: child.page.title,
      slug: child.page.urlPath,
    }));
}

function Footer() {
  const plan = usePlan();
  const pathname = usePathname();
  const generalContent = plan.generalContent || {};
  const theme = useTheme();

  const { navigationTitle: siteTitle } = getMetaTitles(plan);
  const { fundingInstruments, otherLogos, footerStatement } = theme.settings;
  const t = useTranslations();

  const navLinks = (plan.footer?.items || [])
    .filter((navItem): navItem is NonNullable<typeof navItem> => !!navItem)
    .map((navItem) => {
      if (!navItem || !('id' in navItem)) {
        return null;
      }

      return {
        id: navItem.id,
        name: navItem.page.title,
        slug:
          'children' in navItem && (navItem.children || []).length > 0
            ? undefined
            : navItem.page.urlPath,
        children: getNavChildren(navItem),
      };
    });

  // TODO: Remove this when we have a proper way to add custom links
  const additionalLinks = theme.settings?.customAdditionalLinks || [];
  const hasCustomAccessibilityPage = additionalLinks?.find(
    (link) => link.id === 'accessibility'
  );

  plan.additionalLinks?.items?.map((link) =>
    additionalLinks.push({
      id: link.id,
      name: link.page.title,
      slug: link.page.urlPath,
      url: link.page.url,
      crossPlanLink: link.crossPlanLink,
      viewUrl: link.viewUrl,
    })
  );

  const ownerLinks = theme.settings?.footerOwnerLinks;

  // If there is no custom a11y page set, or if there is no external a11y statement link
  // use the standard a11y statement
  if (
    !plan.additionalLinks.items.find(
      (link) => link.page.__typename === 'AccessibilityStatementPage'
    )
  ) {
    if (plan.accessibilityStatementUrl) {
      additionalLinks.push({
        id: '1',
        name: t('accessibility'),
        slug: plan.accessibilityStatementUrl,
      });
    } else if (!hasCustomAccessibilityPage) {
      additionalLinks.push({
        id: '1',
        name: t('accessibility'),
        slug: '/accessibility',
      });
    }
  }

  const utilityLinks: UtilityLink[] = [];

  if (plan.contactLink) {
    utilityLinks.push({ id: '1', name: t('contact'), slug: plan.contactLink });
  }

  if (plan.externalFeedbackUrl) {
    utilityLinks.push({
      id: '2',
      name: t('give-feedback'),
      slug: plan.externalFeedbackUrl,
    });
  } else if (pathname !== '/feedback') {
    const url = getFeedbackUrl(pathname);
    if (url != null) {
      utilityLinks.push({ id: '2', name: t('give-feedback'), slug: url });
    }
  }

  if (plan.adminUrl) {
    utilityLinks.push({
      id: '3',
      name: t('admin-login'),
      slug: plan.adminUrl,
      icon: 'lock',
    });
  }

  return (
    <>
      <SiteFooter
        siteTitle={siteTitle}
        ownerName={generalContent.ownerName}
        ownerUrl={generalContent.ownerUrl}
        creativeCommonsLicense={generalContent.creativeCommonsLicense}
        copyrightText={generalContent.copyrightText}
        utilityLinks={utilityLinks}
        additionalLinks={additionalLinks}
        navItems={navLinks}
        fundingInstruments={fundingInstruments}
        otherLogos={otherLogos}
        footerStatement={footerStatement}
        ownerLinks={ownerLinks}
      />
      <ApplicationStateBanner deploymentType={deploymentType} />
    </>
  );
}

export default Footer;
