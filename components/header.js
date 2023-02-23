import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
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
        name: page.page.title,
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
  const activeBranch = getActiveBranch();

  const navLinks = useMemo(() => {
    let links = [];

    const pageMenuItems = plan.mainMenu.items.filter(item => item.__typename == 'PageMenuItem');
    if (pageMenuItems.length > 0) {
      // find one menu item with root as parent to access the id of the rootPage
      const rootItemIndex = pageMenuItems.findIndex((page) => page.parent.page.__typename === 'PlanRootPage');
      const staticPages = getMenuStructure(
        pageMenuItems,
        pageMenuItems[rootItemIndex].parent.id,
        activeBranch,
      );
      links = links.concat(staticPages);
    }
    return links;
  }, [activeBranch, plan.mainMenu]);

  const externalLinks = useMemo(() => {
    return plan.mainMenu.items.filter(item => item.__typename == 'ExternalLinkMenuItem').map(item => ({
      name: item.linkText,
      url: item.url,
    }));
  }, [plan.mainMenu]);

  return (
    <header style={{ position: 'relative' }}>
      <SkipToContent />
      <ApplicationStateBanner deploymentType={site.deploymentType} />
      <GlobalNav
        activeBranch={activeBranch}
        siteTitle={siteTitle}
        ownerName={plan.generalContent ? plan.generalContent.ownerName : plan.name}
        navItems={navLinks}
        externalItems={externalLinks}
      />
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default React.memo(Header);
