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
  const hasActionImpacts = plan.actionImpacts?.length > 0;

  if (hasActionImpacts) navLinks.push({ id: '1', name: t('dashboard'), slug: 'dashboard' });
  navLinks.push({ id: '2', name: t('actions'), slug: 'actions' });
  navLinks.push({ id: '3', name: t('indicators'), slug: 'indicators' });

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
    additionalLinks.push({ id: '1', name: t('accessibility'), slug: 'accessibility' });
  }

  let fundingInstruments = [];
  if (plan.identifier === 'hnh2035') fundingInstruments = [
    {
      id: '1',
      name: 'Climate-KIC (Climate-KIC is supported by the EIT, a body of the European Union)',
      link: '',
      logo: '/static/images/hnh2035/climate-kic-logo-white.svg',
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
        additionalLinks={additionalLinks}
        navItems={navLinks}
        fundingInstruments={fundingInstruments}
      />
      <ApplicationStateBanner instanceType={site.instanceType} />
    </>
  );
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Footer);
