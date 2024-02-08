'use client';

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import { usePlan } from 'context/plan';
import GlobalNav from 'components/common/GlobalNav';
import TopToolBar from './common/TopToolBar';
import SkipToContent from 'components/common/SkipToContent';
import ApplicationStateBanner from 'components/common/ApplicationStateBanner';
import { getActiveBranch } from 'common/links';
import { useTheme } from 'styled-components';
import { deploymentType } from '@/common/environment';

const getMenuStructure = (pages, rootId, activeBranch) => {
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
};

function createLocalizeMenuItem(currentLocale, primaryLocale) {
  return function (menuItem) {
    if (currentLocale === primaryLocale) {
      return menuItem;
    }

    return {
      ...menuItem,
      page: {
        ...menuItem.page,
        urlPath: `/${currentLocale}${menuItem.page.urlPath}`,
      },
    };
  };
}

function Header({ siteTitle }) {
  const pathname = usePathname();
  const locale = useLocale();
  const plan = usePlan();
  const theme = useTheme();
  const activeBranch = getActiveBranch(pathname, locale);

  const navLinks = useMemo(() => {
    let links = [];

    const pageMenuItems = plan.mainMenu.items
      .filter((item) => item.__typename == 'PageMenuItem')
      .map(createLocalizeMenuItem(locale, plan.primaryLanguage));

    if (pageMenuItems.length > 0) {
      // find one menu item with root as parent to access the id of the rootPage
      const rootItemIndex = pageMenuItems.findIndex(
        (page) => page.parent.page.__typename === 'PlanRootPage'
      );
      const staticPages = getMenuStructure(
        pageMenuItems,
        pageMenuItems[rootItemIndex].parent.id,
        activeBranch
      );
      links = links.concat(staticPages);
    }
    return links;
  }, [activeBranch, plan.mainMenu]);

  const externalLinks = useMemo(() => {
    return plan.mainMenu.items
      .filter((item) => item.__typename == 'ExternalLinkMenuItem')
      .map((item) => ({
        name: item.linkText,
        url: item.url,
      }));
  }, [plan.mainMenu]);

  return (
    <header style={{ position: 'relative' }}>
      <SkipToContent />
      <ApplicationStateBanner deploymentType={deploymentType} />
      <TopToolBar />
      <GlobalNav
        activeBranch={activeBranch}
        siteTitle={siteTitle}
        ownerName={
          plan.generalContent ? plan.generalContent.ownerName : plan.name
        }
        navItems={navLinks}
        externalItems={externalLinks}
        customToolbarItems={theme.settings.customNavbarTools || []}
        sticky={theme.settings.stickyNavigation}
      />
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
