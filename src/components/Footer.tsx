'use client';

import { createElement } from 'react';

import { usePathname } from 'next/navigation';

import { useTheme } from '@emotion/react';

import { useTranslations } from 'next-intl';

import { getDeploymentType } from '@common/env';

import type { PlanContextFragment } from '@/common/__generated__/graphql';
import MonsidoAccessibility from '@/components/MonsidoAccessibility';
import { usePlan } from '@/context/plan';
import { getMetaTitles } from '@/utils/metadata';

import ApplicationStateBanner from './common/ApplicationStateBanner';
import SiteFooter, {
  type FooterAdditionalLink,
  type FooterNavItem,
  type UtilityLink,
} from './common/SiteFooter';
import { useCustomComponent } from './paths/custom';

type NavItem = NonNullable<PlanContextFragment['footer']>['items'][0];
type PageNavItem = Extract<NavItem, { __typename: 'PageMenuItem' }>;
type AdditionalNavItem = NonNullable<PlanContextFragment['additionalLinks']>['items'][number];
type AdditionalPageNavItem = Extract<AdditionalNavItem, { __typename: 'PageMenuItem' }>;

const isPageNavItem = (item: NavItem): item is PageNavItem => item.__typename === 'PageMenuItem';
const isAdditionalPageNavItem = (item: AdditionalNavItem): item is AdditionalPageNavItem =>
  item.__typename === 'PageMenuItem';

const getFeedbackUrl = (currentURL: string) => {
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

  return (navItem.children ?? [])
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
  const generalContent = plan.generalContent ?? {};
  const theme = useTheme();
  const FooterComponent = useCustomComponent('Footer', SiteFooter);
  const { navigationTitle: siteTitle } = getMetaTitles(plan);
  const { fundingInstruments, otherLogos, footerStatement } = theme.settings;
  const t = useTranslations();

  const navLinks: FooterNavItem[] = (plan.footer?.items ?? [])
    .filter(isPageNavItem)
    .map((navItem) => {
      return {
        id: navItem.id,
        name: navItem.page.title,
        slug:
          'children' in navItem && (navItem.children ?? []).length > 0
            ? undefined
            : navItem.page.urlPath,
        children: getNavChildren(navItem),
      } satisfies FooterNavItem;
    });

  // TODO: Remove this when we have a proper way to add custom links
  const additionalLinks: FooterAdditionalLink[] =
    theme.settings?.customAdditionalLinks?.slice() ?? [];
  const hasCustomAccessibilityPage = additionalLinks?.find((link) => link.id === 'accessibility');

  plan.additionalLinks?.items?.filter(isAdditionalPageNavItem).forEach((link) =>
    additionalLinks.push({
      id: link.id,
      name: link.page.title,
      slug: link.page.urlPath,
      url: link.page.url ?? undefined,
      crossPlanLink: link.crossPlanLink ?? undefined,
      viewUrl: link.viewUrl ?? undefined,
    } satisfies FooterAdditionalLink)
  );

  const ownerLinks = theme.settings?.footerOwnerLinks;

  // If there is no custom a11y page set, or if there is no external a11y statement link
  // use the standard a11y statement
  if (
    !plan.additionalLinks?.items.find(
      (link) =>
        link.__typename !== 'ExternalLinkMenuItem' &&
        link.page.__typename === 'AccessibilityStatementPage'
    )
  ) {
    if (plan.accessibilityStatementUrl) {
      additionalLinks.push({
        id: '1',
        name: t('accessibility'),
        slug: plan.accessibilityStatementUrl,
      } satisfies FooterAdditionalLink);
    } else if (!hasCustomAccessibilityPage) {
      additionalLinks.push({
        id: '1',
        name: t('accessibility'),
        slug: '/accessibility',
      } satisfies FooterAdditionalLink);
    }
  }

  const utilityLinks: UtilityLink[] = [];

  if (plan.externalFeedbackUrl) {
    utilityLinks.push({
      id: '2',
      name: t('give-feedback'),
      slug: plan.externalFeedbackUrl,
    });
  } else if (pathname !== '/feedback' && theme.settings.showFeedbackLink !== false) {
    const url = getFeedbackUrl(pathname);
    if (url != null) {
      utilityLinks.push({ id: '2', name: t('give-feedback'), slug: url });
    }
  }

  if (plan.features.showAdminLink && plan.adminUrl) {
    utilityLinks.push({
      id: '3',
      name: t('admin-login'),
      slug: plan.adminUrl,
      icon: 'lock',
    });
  }

  const monsidoToken = theme.settings?.monsidoToken;
  const footer = createElement(FooterComponent, {
    siteTitle,
    ownerName: generalContent.ownerName,
    ownerUrl: generalContent.ownerUrl,
    creativeCommonsLicense: generalContent.creativeCommonsLicense,
    copyrightText: generalContent.copyrightText,
    utilityLinks,
    additionalLinks,
    navItems: navLinks,
    fundingInstruments,
    otherLogos,
    footerStatement,
    ownerLinks,
  });

  return (
    <>
      {footer}
      <ApplicationStateBanner deploymentType={getDeploymentType()} />
      {monsidoToken && <MonsidoAccessibility token={monsidoToken} />}
    </>
  );
}

export default Footer;
