import React from 'react';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import SiteFooter from './common/SiteFooter';

function Footer(props) {
  const plan = React.useContext(PlanContext);
  const site = React.useContext(SiteContext);
  const generalContent = plan.generalContent || {};
  const theme = useTheme();

  const { fundingInstruments, otherLogos } = theme.settings;
  const { t } = useTranslation();
  let navLinks = [];
  let staticPages = [];
  const hasActionImpacts = plan.impactGroups?.length > 0;

  if (hasActionImpacts) navLinks.push({ id: '1', name: t('dashboard'), slug: '/dashboard' }); //

  plan.footer.items?.forEach((navItem) => {
    const children = navItem.children.length > 0 ? [] : null;
    if (children) {
      navItem.children.forEach((child) => {
        children.push({
          id: child.id,
          name: child.linkText,
          slug: child.page.urlPath,
        });
      });
    }
    navLinks.push({
      id: navItem.id,
      name: navItem.linkText,
      slug: navItem.children.length > 0 ? undefined : navItem.page.urlPath,
      children,
    });
  });

  if (plan.staticPages) {
    const topMenuPages = plan.staticPages.filter((page) => page.footer);
    staticPages = topMenuPages.map((page, index) => (
      { id: `s${index}`, name: page.name, slug: page.slug }
    ));
    navLinks = navLinks.concat(staticPages);
  }

  const additionalLinks = [];

  if (plan.accessibilityStatementUrl) {
    additionalLinks.push({ id: '1', name: t('accessibility'), slug: plan.accessibilityStatementUrl });
  }
  else {
    additionalLinks.push({ id: '1', name: t('accessibility'), slug: '/accessibility' });
  }

  const utilityLinks = [];

  if (plan.contactLink) {
    utilityLinks.push({ id: '1', name: t('contact'), slug: plan.contactLink });
  }

  if (plan.feedbackLink) {
    utilityLinks.push({ id: '2', name: t('give-feedback'), slug: plan.feedbackLink });
  }
  else {
    utilityLinks.push({ id: '2', name: t('give-feedback'), slug: '/feedback' });
  }

  if (plan.adminUrl) {
    utilityLinks.push({ id: '3', name: t('admin-login'), slug: plan.adminUrl, icon: 'lock' });
  }

  return (
    <>
      <SiteFooter
        siteTitle={generalContent.siteTitle}
        ownerName={generalContent.ownerName}
        ownerUrl={generalContent.ownerUrl}
        creativeCommonsLicense={generalContent.creativeCommonsLicense}
        copyrightText={generalContent.copyrightText}
        utilityLinks={utilityLinks}
        additionalLinks={additionalLinks}
        navItems={navLinks}
        fundingInstruments={fundingInstruments}
        otherLogos={otherLogos}
      />
      <ApplicationStateBanner instanceType={site.instanceType} />
    </>
  );
}

export default Footer;
