import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from '../common/i18n';
import PlanContext from '../context/plan';

import GlobalNav from './common/GlobalNav';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import { isBranchActive } from '../common/links';

function Header(props) {
  const plan = React.useContext(PlanContext);
  const {
    t, siteTitle,
  } = props;
  const hasActionImpacts = plan.actionImpacts.length > 0;

  let navLinks = [];
  let staticPages = [];

  if (hasActionImpacts) navLinks.push({
    id: '1',
    name: t('dashboard'),
    slug: 'dashboard',
    active: isBranchActive('dashboard'),
  });

  navLinks.push({
    id: '2',
    name: t('actions'),
    slug: 'actions',
    active: isBranchActive('actions'),
  });

  navLinks.push({
    id: '3',
    name: t('indicators'),
    slug: 'indicators',
    active: isBranchActive('indicators'),
  });

  if (plan.staticPages) {
    const topMenuPages = plan.staticPages.filter((page) => page.topMenu);
    staticPages = topMenuPages.map((page, index) => (
      {
        id: `s${index}`,
        name: page.name,
        slug: page.slug,
        active: isBranchActive(page.slug),
      }
    ));
    navLinks = navLinks.concat(staticPages);
  }

  return (
    <div>
      <ApplicationStateBanner instanceType={plan.instanceType} />
      <GlobalNav
        siteTitle={siteTitle}
        navItems={navLinks}
      />
    </div>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Header);
