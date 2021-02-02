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

  if (hasActionImpacts) navLinks.push({ id: '1', name: t('dashboard'), slug: 'dashboard' }); //
  navLinks.push({ id: '2', name: t('actions'), slug: 'actions' });
  navLinks.push({ id: '3', name: t('indicators'), slug: 'indicators' });

  if (plan.pages) {
    const footerPages = plan.pages.filter((page) => page.showInFooter);
    staticPages = footerPages.map((page, index) => (
      { id: `s${index}`, name: page.seoTitle, slug: page.slug }
    ));
    navLinks = navLinks.concat(staticPages);
  }

  const additionalLinks = [];

  if (plan.accessibilityStatementUrl) {
    additionalLinks.push({ id: '1', name: t('accessibility'), slug: plan.accessibilityStatementUrl });
  }
  else {
    additionalLinks.push({ id: '1', name: t('accessibility'), slug: 'accessibility' });
  }

  const utilityLinks = [];

  if (plan.contactLink) {
    utilityLinks.push({ id: '1', name: t('contact'), slug: plan.contactLink });
  }

  if (plan.feedbackLink) {
    utilityLinks.push({ id: '2', name: t('give-feedback'), slug: plan.feedbackLink });
  }
  else {
    utilityLinks.push({ id: '2', name: t('give-feedback'), slug: 'feedback' });
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
