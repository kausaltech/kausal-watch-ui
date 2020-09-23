import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';

import GlobalNav from './common/GlobalNav';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import SkipToContent from './common/SkipToContent';
import { getActiveBranch } from '../common/links';

function Header({ siteTitle }) {
  const plan = useContext(PlanContext);
  const site = useContext(SiteContext);
  const { t } = useTranslation(['common']);
  const hasActionImpacts = plan.impactGroups?.length > 0;
  const activeBranch = getActiveBranch();
  let staticPages = [];

  const navLinks = useMemo(() => {
    let links = [];
    if (hasActionImpacts) links.push({
      id: '1',
      name: t('dashboard'),
      slug: 'dashboard',
      active: activeBranch === 'dashboard',
    });

    links.push({
      id: '2',
      name: t('actions'),
      slug: 'actions',
      active: activeBranch === 'actions',
    });

    links.push({
      id: '3',
      name: t('indicators'),
      slug: 'indicators',
      active: activeBranch === 'indicators',
    });

    if (plan.staticPages) {
      const topMenuPages = plan.staticPages.filter((page) => page.topMenu);
      staticPages = topMenuPages.map((page, index) => (
        {
          id: `s${index}`,
          name: page.name,
          slug: page.slug,
          active: activeBranch === page.slug,
        }
      ));
      links = links.concat(staticPages);
    }
    return links;
  }, [hasActionImpacts, activeBranch, plan.staticPages]);

  return (
    <header style={{ position: 'relative' }}>
      <SkipToContent />
      <ApplicationStateBanner instanceType={site.instanceType} />
      <GlobalNav
        siteTitle={siteTitle}
        ownerName={plan.generalContent ? plan.generalContent.ownerName : plan.name}
        navItems={navLinks}
      />
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default React.memo(Header);
