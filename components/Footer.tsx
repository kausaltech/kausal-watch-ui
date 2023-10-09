import React from 'react';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import { useRouter } from 'next/router';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import SiteFooter from './common/SiteFooter';

const getFeedbackUrl = (currentURL) => {
  const feedbackPageUrlBase = '/feedback';
  if (currentURL.startsWith(feedbackPageUrlBase)) {
    return null;
  }
  const feedbackPageQueryPart = `?lastUrl=${encodeURIComponent(currentURL)}`;
  return `${feedbackPageUrlBase}${feedbackPageQueryPart}`;
};

function Footer(props) {
  const plan = React.useContext(PlanContext);
  const site = React.useContext(SiteContext);
  const router = useRouter();
  const generalContent = plan.generalContent || {};
  const theme = useTheme();
  const { siteTitle } = props;

  const { fundingInstruments, otherLogos, footerStatement } = theme.settings;
  const { t } = useTranslation();
  let navLinks = [];
  let staticPages = [];

  plan.footer.items?.forEach((navItem) => {
    const children = navItem.children.length > 0 ? [] : null;
    if (children) {
      navItem.children.forEach((child) => {
        children.push({
          id: child.id,
          name: child.page.title,
          slug: child.page.urlPath,
        });
      });
    }
    navLinks.push({
      id: navItem.id,
      name: navItem.page.title,
      slug: navItem.children.length > 0 ? undefined : navItem.page.urlPath,
      children,
    });
  });

  if (plan.staticPages) {
    const topMenuPages = plan.staticPages.filter((page) => page.footer);
    staticPages = topMenuPages.map((page, index) => ({
      id: `s${index}`,
      name: page.name,
      slug: page.slug,
    }));
    navLinks = navLinks.concat(staticPages);
  }

  const additionalLinks = [];

  plan.additionalLinks.items?.map((link) =>
    additionalLinks.push({
      id: link.id,
      name: link.page.title,
      slug: link.page.urlPath,
    })
  );

  const ownerLinks = theme.settings?.footerAdditionalLinks;

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
    } else {
      additionalLinks.push({
        id: '1',
        name: t('accessibility'),
        slug: '/accessibility',
      });
    }
  }

  const utilityLinks = [];

  if (plan.contactLink) {
    utilityLinks.push({ id: '1', name: t('contact'), slug: plan.contactLink });
  }

  if (plan.externalFeedbackUrl) {
    utilityLinks.push({
      id: '2',
      name: t('give-feedback'),
      slug: plan.externalFeedbackUrl,
    });
  } else {
    const url = getFeedbackUrl(router.asPath);
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
      <ApplicationStateBanner deploymentType={site.deploymentType} />
    </>
  );
}

export default Footer;
