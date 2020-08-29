import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';

import GlobalNav from './common/GlobalNav';
import ApplicationStateBanner from './common/ApplicationStateBanner';
import { getActiveBranch } from '../common/links';


function Header({ t, siteTitle }) {
  const plan = useContext(PlanContext);
  const site = useContext(SiteContext);
  const hasActionImpacts = plan.actionImpacts?.length > 0;
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
    <div>
      <ApplicationStateBanner instanceType={site.instanceType} />
      <GlobalNav
        siteTitle={siteTitle}
        ownerName={plan.generalContent ? plan.generalContent.ownerName : plan.name}
        navItems={navLinks}
      />
    </div>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(React.memo(Header));
