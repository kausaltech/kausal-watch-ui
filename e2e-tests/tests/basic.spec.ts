import { Page, test as base, expect } from '@playwright/test';

import {
  PlanContext,
  displayConfiguration,
  getIdentifiersToTest,
} from '../context';

const test = base.extend<{ ctx: PlanContext }>({});

async function navigateAndCheckLayout(
  page: Page,
  url: string,
  ctx: PlanContext
) {
  try {
    await page.goto(url);
  } catch (error) {
    if (error.toString().includes('ERR_NETWORK_CHANGED')) {
      await page.goto(url);
    } else {
      throw error;
    }
  }
  await ctx.checkMeta(page);
  await expect(page.locator('nav#branding-navigation-bar')).toBeVisible();
  await expect(page.locator('nav#global-navigation-bar')).toBeVisible();
  await expect(page.locator('main#main')).toBeVisible();
  await ctx.checkAccessibility(page);
}

const testPlan = (planId: string) =>
  test.describe(planId, () => {
    test.describe.configure({ mode: 'serial' });

    test.use({
      ctx: async ({}, use) => {
        const planInfo = await PlanContext.fromPlanId(planId);
        await use(planInfo);
      },
    });

    test.beforeEach(async ({ page, ctx }) => {
      await navigateAndCheckLayout(page, ctx.baseURL, ctx);
    });

    test('action list page', async ({ page, ctx }) => {
      const listItem = ctx.getActionListMenuItem()!;
      test.skip(!listItem, 'No action list page for plan');

      const nav = page.locator('nav#global-navigation-bar');
      const link = nav.getByRole('link', {
        name: listItem.page.title,
        exact: true,
      });

      // Test SPA navigation
      await link.click();
      await ctx.checkMeta(page);

      await expect(page.getByRole('tab').first()).toBeVisible();

      // Test direct URL navigation
      await page.goto(`${ctx.baseURL}/${listItem.page.urlPath}`);
      await ctx.checkMeta(page);
      await expect(page.getByRole('tab').first()).toBeVisible();
    });

    test('action details page', async ({ page, ctx }) => {
      test.skip(ctx.plan.actions.length == 0, 'No actions defined in plan');
      await page.goto(ctx.getActionURL(ctx.plan.actions[0]));
      await ctx.checkMeta(page);
      const actionDetailsPage = page.locator('.action-main-top');
      await expect(actionDetailsPage).toBeVisible();
    });

    test('category page', async ({ page, ctx }) => {
      const categoryTypeItem = ctx.getCategoryTypeMenuItem();
      test.skip(!categoryTypeItem, 'No category type for plan');

      const items = ctx.getCategoryMenuItems(categoryTypeItem?.page.id);
      test.skip(!items || items.length === 0, 'No category pages for plan');

      const nav = page.locator('nav#global-navigation-bar');
      const categoryTypeLink = nav.getByRole('link', {
        name: categoryTypeItem?.page.title,
        exact: true,
      });
      await categoryTypeLink.click();

      const firstItemLink = nav.getByRole('link', {
        name: items[0].page.title,
        exact: true,
      });
      await firstItemLink.click();
      await expect(page.locator('main#main')).toBeVisible();
    });

    test('empty page', async ({ page, ctx }) => {
      const EmptyPageMenuItem = ctx.getEmptyPageMenuItem();
      test.skip(!EmptyPageMenuItem, 'No empty pages for plan');

      const items = ctx.getEmptyPageChildrenItems(EmptyPageMenuItem?.page.id);
      test.skip(
        !items || items.length === 0,
        'No children category or content pages for plan'
      );
      const nav = page.locator('nav#global-navigation-bar');
      const emptyPageMenuLink = nav.getByRole('link', {
        name: EmptyPageMenuItem?.page.title,
        exact: true,
      });
      await emptyPageMenuLink.click();

      const firstItemLink = nav.getByRole('link', {
        name: items[0].page.title,
        exact: true,
      });
      await firstItemLink.click();

      await expect(page.locator('main#main')).toBeVisible();

      const h1 = page.locator('h1');
      await expect(h1).toContainText(items[0].page.title);
    });

    test('static pages', async ({ page, ctx }) => {
      const staticPageItems = ctx.getStaticPageMenuItem();
      test.skip(!staticPageItems, 'No static pages for plan');

      for (const staticPageItem of staticPageItems) {
        const nav = page.locator('nav#global-navigation-bar');

        const staticPageLink = nav.getByRole('link', {
          name: staticPageItem?.page.title,
          exact: true,
        });

        await staticPageLink.click();
        await expect(page.locator('main#main')).toBeVisible();
      }
    });

    test('indicator list page', async ({ page, ctx }) => {
      const IndicatorListItem = ctx.getIndicatorListMenuItem()!;
      test.skip(!IndicatorListItem, 'No indicator list for plan');

      const nav = page.locator('nav#global-navigation-bar');
      const indicatorListLink = nav.getByRole('link', {
        name: IndicatorListItem.page.title,
        exact: true,
      });

      await indicatorListLink.click();
      const main = page.locator('main#main');
      await expect(main).toBeVisible();
    });

    test('indicator page', async ({ page, ctx }) => {
      const IndicatorListItem = ctx.getIndicatorListMenuItem();
      test.skip(!IndicatorListItem, 'No indicator list for plan');
      const nav = page.locator('nav#global-navigation-bar');
      await nav
        .getByRole('link', { name: IndicatorListItem.page.title, exact: true })
        .click();
      const main = page.locator('main#main');
      await expect(main).toBeVisible();
      const planIndicators = ctx.getPlanIndicators();
      test.skip(planIndicators.length === 0, 'No indicators defined in plan');

      const indicatorName = planIndicators[0]?.name;
      await page.waitForSelector(`text=${indicatorName}`, { state: 'visible' });
      const buttonSelector = `role=button[name="${indicatorName}"]`;
      const indicatorSectionBtn = main.locator(buttonSelector);

      const count = await indicatorSectionBtn.count();

      if (count > 0) {
        await indicatorSectionBtn.click();
        const controlsAttributeValue = await indicatorSectionBtn.getAttribute(
          'aria-controls'
        );
        const controlledSection = main.locator(`#${controlsAttributeValue}`);
        const indicatorLink = controlledSection.locator('a').first();

        await indicatorLink.waitFor();
        await indicatorLink.click();

        await expect(main).toBeVisible();
        const h1Span = page.locator('h1 >> span');
        await expect(h1Span).toContainText(indicatorName);
      } else {
        const firstIndicatorLink = main.locator(`a`, {
          hasText: indicatorName,
        });
        await firstIndicatorLink.waitFor();
        await firstIndicatorLink.click();
        await expect(main).toBeVisible();
        const h1Span = page.locator('h1 >> span');
        await expect(h1Span).toContainText(indicatorName);
      }
    });

    test('search', async ({ page, ctx }) => {
      const searchButton = page.locator('data-testid=nav-search-btn');
      const isSearchButtonVisible = await searchButton.isVisible();
      if (isSearchButtonVisible) {
        const searchInput = page.locator('role=combobox');
        await expect(searchInput).toBeHidden();
        await searchButton.click();
        await expect(searchInput).toBeVisible();

        await searchInput.fill('test');
        const searchLink = page.locator('data-testid=search-advanced');
        await searchLink.click();
        await page.waitForURL('**/search');
        await expect(page.locator('data-testid=search-form')).toBeVisible();
      } else {
        console.log('No search button for the plan');
      }
    });
  });

displayConfiguration();
getIdentifiersToTest().forEach((plan) => testPlan(plan));
