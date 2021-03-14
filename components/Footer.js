import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import SiteFooter from './common/SiteFooter';

function Footer(props) {
  const plan = React.useContext(PlanContext);
  const site = React.useContext(SiteContext);
  const generalContent = plan.generalContent || {};
  const { t } = props;
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

  if (plan.adminLink) {
    utilityLinks.push({ id: '3', name: t('admin-login'), slug: plan.feedbackLink, icon: 'lock' });
  }
  else {
    utilityLinks.push({ id: '3', name: t('admin-login'), slug: '/login', icon: 'lock' });
  }

  let fundingInstruments = [];
  if (plan.identifier === 'hnh2035') fundingInstruments = [
    {
      id: '1',
      name: 'Climate-KIC (Climate-KIC is supported by the EIT, a body of the European Union)',
      link: '',
      logo: '/static/themes/hnh2035/images/climate-kic-logo-white.svg',
    },
  ];

  let otherLogos = [];
  if (plan.identifier === 'lpr-ilmasto') otherLogos = [
    {
      id: '1',
      name: 'European Green Leaf winner 2021 (An initiative of European Comission)',
      link: '',
      logo: '/static/themes/lpr-ilmasto/images/european-green-leaf.svg',
    },
  ];
  if (plan.identifier === 'lahti-ilmasto') otherLogos = [
    {
      id: '1',
      name: 'Lahti, European Green Capital winner 2021 (An initiative of European Comission)',
      link: '',
      logo: '/static/themes/lahti-ilmasto/images/lahti-green-capital-2021.svg',
    },
  ];

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

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Footer);
