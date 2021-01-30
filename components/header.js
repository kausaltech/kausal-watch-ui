import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';

import GlobalNav from 'components/common/GlobalNav';
import ApplicationStateBanner from 'components/common/ApplicationStateBanner';
import SkipToContent from 'components/common/SkipToContent';
import { getActiveBranch } from 'common/links';

const getChildren = ((pages, id, activeBranch) => {
  const children = [];
  pages.forEach((page) => {
    if (page.parent.id === id) {
      children.push({
        id: `${page.id}`,
        name: page.linkText,
        slug: page.page.slug,
        active: activeBranch === page.page.slug,
        children: getChildren(pages, page.id),
      });
    }
  });
  return children;
});

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

    if (plan.mainMenu.items.length > 0) {
      // console.log(plan.mainMenu);
      const rootItemIndex = plan.mainMenu.items.findIndex((page) => page.parent.page.__typename === 'PlanRootPage');
      // console.log(rootId);
      const wagtailPages = getChildren(plan.mainMenu.items, plan.mainMenu.items[rootItemIndex].parent.id, activeBranch);
      links = links.concat(wagtailPages);
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
