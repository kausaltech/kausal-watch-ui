'use client';

import React, { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import { useTheme } from 'styled-components';

import { getDeploymentType } from '@common/env';

import type { PlanContextFragment } from '@/common/__generated__/graphql';
import { getActiveBranch } from '@/common/links';
import { typenameMatches } from '@/common/utils';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ApplicationStateBanner from '@/components/common/ApplicationStateBanner';
import GlobalNav from '@/components/common/GlobalNav';
import SkipToContent from '@/components/common/SkipToContent';
import { usePlan } from '@/context/plan';
import { getMetaTitles } from '@/utils/metadata';

import TopToolBar from './common/TopToolBar';
import { useCustomComponent } from './paths/custom';

type MainMenu = NonNullable<NonNullable<PlanContextFragment['mainMenu']>>;
type MenuItem = MainMenu['items'][number];
type PageMenuItem = MenuItem & {
  __typename: 'PageMenuItem';
};

export type NavItem = {
  id: string;
  name: string;
  slug: string;
  urlPath: string;
  active: boolean;
  children: NavItem[] | null;
};

export type NavItems = NavItem[] | null;

function getMenuStructure(items: MenuItem[], rootId: string): NavItems {
  const menuLevelItems: NavItems = [];
  items.forEach((item) => {
    if (item.__typename !== 'PageMenuItem') return;
    if (item.parent?.id !== rootId) return;
    menuLevelItems.push({
      id: `${item.id}`,
      name: item.page.title,
      slug: item.page.slug,
      urlPath: item.page.urlPath,
      active: false,
      children: getMenuStructure(items, item.id),
    });
  });
  return menuLevelItems.length > 0 ? menuLevelItems : null;
}

// Set active page per pathname and active branch
function setActivePages(navLinks: NavItems, pathname: string, activeBranch: string) {
  let hasActivePage = false;
  navLinks?.forEach((page) => {
    let childHasActivePage = false;
    if (page.children) {
      const activeChild = setActivePages(page.children, pathname, activeBranch);
      if (activeChild) childHasActivePage = true;
    }
    page.active =
      activeBranch === page.slug || decodeURI(pathname) === page.urlPath || childHasActivePage;
    if (page.active) hasActivePage = true;
  });
  return hasActivePage;
}

function createLocalizeMenuItem(currentLocale: string, primaryLocale: string) {
  return function (menuItem: PageMenuItem) {
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

  const navLinks: NavItems = useMemo(() => {
    const mainMenu = plan.mainMenu;
    if (!mainMenu) return [];
    const pageMenuItems = mainMenu.items
      .filter((item) => typenameMatches(item, 'PageMenuItem'))
      .map(createLocalizeMenuItem(locale, plan.primaryLanguage));

    if (!(pageMenuItems.length > 0)) return [];

    // find one menu item with root as parent to access the id of the rootPage
    const rootItem = pageMenuItems.find((item) => item.parent?.page.__typename === 'PlanRootPage');
    if (!rootItem || !rootItem.parent) return [];
    return getMenuStructure(pageMenuItems, rootItem.parent.id);
  }, [activeBranch, plan.mainMenu, locale]);

  setActivePages(navLinks, pathname, activeBranch);

  const externalLinks = useMemo(() => {
    return plan.mainMenu?.items
      .filter((item) => typenameMatches(item, 'ExternalLinkMenuItem'))
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
      <ApplicationStateBanner deploymentType={getDeploymentType()} />
      {isAuthenticated && <TopToolBar />}
      <NavComponent
        activeBranch={activeBranch}
        activePath={pathname}
        siteTitle={siteTitle}
        ownerName={plan.generalContent ? plan.generalContent.ownerName : plan.name}
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
