'use client';

import React, { useMemo } from 'react';

import { getActiveBranch } from 'common/links';
import ApplicationStateBanner from 'components/common/ApplicationStateBanner';
import GlobalNav from 'components/common/GlobalNav';
import SkipToContent from 'components/common/SkipToContent';
import GoogleAnalytics from 'components/GoogleAnalytics';
import { usePlan } from 'context/plan';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useTheme } from 'styled-components';

import { deploymentType } from '@/common/environment';
import { getMetaTitles } from '@/utils/metadata';

import TopToolBar from './common/TopToolBar';
import { useCustomComponent } from './paths/custom';

const getMenuStructure = (pages, rootId) => {
  const menuLevelItems = [];
  pages.forEach((page) => {
    if (page.parent.id === rootId) {
      menuLevelItems.push({
        id: `${page.id}`,
        name: page.page.title,
        slug: page.page.slug,
        urlPath: page.page.urlPath,
        active: false,
        children: getMenuStructure(pages, page.id),
      });
    }
  });
  return menuLevelItems.length > 0 ? menuLevelItems : null;
};

const setActivePages = (navLinks, pathname, activeBranch) => {
  navLinks.forEach((page) => {
    page.active = activeBranch === page.slug || pathname === page.urlPath;
    if (page.children) {
      setActivePages(page.children, pathname, activeBranch);
    }
  });
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

function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const plan = usePlan();
  const theme = useTheme();
  const activeBranch = getActiveBranch(pathname, locale);

  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const { navigationTitle: siteTitle } = getMetaTitles(plan);

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
        pathname,
        activeBranch
      );
      links = links.concat(staticPages);
    }
    return links;
  }, [activeBranch, plan.mainMenu]);

  setActivePages(navLinks, pathname, activeBranch);

  const externalLinks = useMemo(() => {
    return plan.mainMenu.items
      .filter((item) => item.__typename == 'ExternalLinkMenuItem')
      .map((item) => ({
        name: item.linkText,
        url: item.url,
      }));
  }, [plan.mainMenu]);

  const NavComponent = useCustomComponent('GlobalNav', GlobalNav);

  const googleAnalyticsId = theme.settings?.googleAnalyticsId;

  return (
    <header style={{ position: 'relative' }}>
      <SkipToContent />
      <ApplicationStateBanner deploymentType={deploymentType} />
      {isAuthenticated && <TopToolBar />}
      <NavComponent
        activeBranch={activeBranch}
        activePath={pathname}
        siteTitle={siteTitle}
        ownerName={
          plan.generalContent ? plan.generalContent.ownerName : plan.name
        }
        navItems={navLinks}
        externalItems={externalLinks}
        customToolbarItems={theme.settings.customNavbarTools || []}
        sticky={theme.settings.stickyNavigation}
      />
      {googleAnalyticsId && <GoogleAnalytics trackingId={googleAnalyticsId} />}
    </header>
  );
}

export default Header;
