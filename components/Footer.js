import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from '../common/i18n';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import PlanContext from '../context/plan';
import SiteFooter from './common/SiteFooter';

function Footer(props) {
  const plan = React.useContext(PlanContext);
  const generalContent = plan.generalContent || {};
  const { t } = props;

  let navLinks = [];
  let staticPages = [];
  const hasActionImpacts = plan.actionImpacts.length > 0;

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

  return (
    <>
      <SiteFooter
        siteTitle={generalContent.siteTitle}
        ownerName={generalContent.ownerName}
        ownerUrl={generalContent.ownerUrl}
        creativeCommonsLicense={generalContent.creativeCommonsLicense}
        copyrightText={generalContent.copyrightText}
        navItems={navLinks}
      />
      <ApplicationStateBanner instanceType={plan.instanceType} />
    </>
  );
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Footer);
