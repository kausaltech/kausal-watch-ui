import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import SiteContext from 'context/site';

import GlobalNav from 'components/common/GlobalNav';
import SkipToContent from 'components/common/SkipToContent';
import ApplicationStateBanner from 'components/common/ApplicationStateBanner';
import { getActiveBranch } from 'common/links';

const getMenuStructure = ((pages, rootId, activeBranch) => {
  const menuLevelItems = [];
  pages.forEach((page) => {
    if (page.parent.id === rootId) {
      menuLevelItems.push({
        id: `${page.id}`,
        name: page.linkText,
        slug: page.page.slug,
        urlPath: page.page.urlPath,
        active: activeBranch === page.page.slug,
        children: getMenuStructure(pages, page.id),
      });
    }
  });
  return menuLevelItems.length > 0 ? menuLevelItems : null;
});

function Header({ siteTitle }) {
  const plan = useContext(PlanContext);
  const site = useContext(SiteContext);
  const { t } = useTranslation(['common']);
  const hasActionImpacts = plan.impactGroups?.length > 0;
  const activeBranch = getActiveBranch();

  const navLinks = useMemo(() => {
    let links = [];
    if (hasActionImpacts) links.push({
      id: '1',
      name: t('dashboard'),
      slug: 'dashboard',
      urlPath: '/dashboard',
      active: activeBranch === 'dashboard',
    });

    if (plan.mainMenu.items.length > 0) {
      // find one menu item with root as parent to access the id of the rootPage
      const rootItemIndex = plan.mainMenu.items.findIndex((page) => page.parent.page.__typename === 'PlanRootPage');
      const staticPages = getMenuStructure(
        plan.mainMenu.items,
        plan.mainMenu.items[rootItemIndex].parent.id,
        activeBranch,
      );
      links = links.concat(staticPages);
    }
    return links;
  }, [hasActionImpacts, activeBranch, plan.mainMenu]);

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
