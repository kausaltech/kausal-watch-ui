/* eslint-disable react-hooks/rules-of-hooks */
import { type Page, expect } from '@playwright/test';

import { PlanContext, getIdentifiersToTest } from '../common/context.ts';
import { test as coverageTest } from '../common/coverage.ts';

const test = coverageTest.extend<{ ctx: PlanContext }>({});

async function navigateAndCheckLayout(page: Page, url: string, ctx: PlanContext) {
  await page.goto(url);
  await ctx.checkMeta(page);
  await expect(page.locator('nav#branding-navigation-bar')).toBeVisible();
  await expect(page.locator('nav#global-navigation-bar')).toBeVisible();
  await expect(page.locator('main#main')).toBeVisible();
  await expect(page.locator('*[aria-busy=true]')).toHaveCount(0, { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  // temporarily skip accessibility check
  //await ctx.checkAccessibility(page);
}

const testPlan = (planId: string) => {
  const annotatations = [
    {
      type: 'plan',
      description: planId,
    },
    {
      type: 'url',
      description: PlanContext.getBaseURL(planId),
    },
  ];
  test.describe(planId, { annotation: annotatations }, () => {
    test.describe.configure({ mode: 'serial' });

    test.use({
      ctx: async ({}, use) => {
        const planInfo = await PlanContext.fromPlanId(planId);
        await use(planInfo);
      },
    });

    test.beforeEach(async ({ page, ctx }) => {
      ctx.beforeEach(page);
      await navigateAndCheckLayout(page, ctx.baseURL, ctx);
      const modalLocator = page.getByTestId('intro-modal');
      const hasModal = (await modalLocator.count()) > 0;
      if (hasModal) {
        await modalLocator.getByTestId('intro-modal-no-show').click();
        await modalLocator.getByRole('button').click();
        await expect(modalLocator).toBeHidden({ timeout: 1000 });
      }
    });

    test('homepage', async ({ page, ctx }) => {
      const navBar = page.locator('nav#global-navigation-bar');
      await expect(navBar).toBeVisible();
      await expect(page.getByTestId('root-layout')).toBeVisible();
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

      await expect(page.getByRole('tabpanel').first()).toBeVisible({ timeout: 20000 });
      await ctx.waitForLoadingFinished(page);

      // Test direct URL navigation
      await page.goto(`${ctx.baseURL}${listItem.page.urlPath}`);
      await ctx.checkMeta(page);
      await expect(page.getByRole('tabpanel').first()).toBeVisible({ timeout: 20000 });
    });

    test('action details page', async ({ page, ctx }) => {
      test.skip(ctx.plan.actions.length == 0, 'No actions defined in plan');
      await page.goto(ctx.getActionURL(ctx.plan.actions[0]));
      await ctx.checkMeta(page);
      await ctx.waitForLoadingFinished(page);
      const actionDetailsPage = page.locator('.action-main-top');
      await expect(actionDetailsPage).toBeVisible();
      //await page.screenshot({ path: `${planId}_action-details.png` });
    });

    test('category page', async ({ page, ctx }) => {
      const categoryTypeItem = ctx.getCategoryTypeMenuItem();
      test.skip(!categoryTypeItem, 'No category type for plan');

      const items = ctx.getCategoryMenuItems(categoryTypeItem?.page.id);
      test.skip(!items || items.length === 0, 'No category pages for plan');

      const nav = page.locator('nav#global-navigation-bar');
      const categoryTypeLink = nav.getByRole('button', {
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
      test.skip(!items || items.length === 0, 'No children category or content pages for plan');
      const nav = page.locator('nav#global-navigation-bar');
      const emptyPageMenuLink = nav.getByRole('button', {
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
      const staticPageItems = ctx.getStaticPageMenuItems();

      test.skip(!staticPageItems, 'No static pages for plan');
      for (const staticPageItem of staticPageItems) {
        const nav = page.locator('nav#global-navigation-bar');

        console.log('testing static page', staticPageItem);

        const parent = staticPageItem.parent;
        if (parent?.page.__typename !== 'PlanRootPage') {
          const parentButton = nav.getByRole('button', {
            name: parent.page.title,
            exact: true,
          });
          await parentButton.click();
        }

        const staticPageLink = nav.getByRole('link', {
          name: staticPageItem?.page.title,
          exact: true,
        });

        await staticPageLink.click();

        await expect(page.locator('main#main article')).toBeVisible();
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
      const indicatorListItem = ctx.getIndicatorListMenuItem()!;
      test.skip(!indicatorListItem, 'No indicator list for plan');
      const nav = page.locator('nav#global-navigation-bar');
      await nav.getByRole('link', { name: indicatorListItem.page.title, exact: true }).click();
      await page.waitForURL(/.*\/indicators/);
      await ctx.waitForLoadingFinished(page);
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
        const controlsAttributeValue = await indicatorSectionBtn.getAttribute('aria-controls');
        const controlledSection = main.locator(`#${controlsAttributeValue}`);
        const indicatorLink = controlledSection.locator('a').first();

        await indicatorLink.waitFor();
        await indicatorLink.click();

        await expect(main).toBeVisible();
        const h1Span = page.locator('h1 >> span');
        await expect(h1Span).toContainText(indicatorName);
      } else {
        const firstIndicatorLink = main.locator('a').getByText(indicatorName, { exact: true });
        await firstIndicatorLink.waitFor();
        await firstIndicatorLink.click();
        await page.waitForURL(/.*\/indicators\/[0-9]+/);
        await ctx.waitForLoadingFinished(page);
        await expect(main).toBeVisible();
        const h1Span = page.locator('h1 >> span');
        await expect(h1Span).toContainText(indicatorName);
      }
    });

    test('organization page', async ({ page, ctx }) => {
      const organization = ctx.planOrganizations[0];
      test.skip(!organization, 'No organization for plan');
      await page.goto(`${ctx.baseURL}/organizations/${organization.id}`);
      await expect(page.locator('main#main')).toBeVisible();
      const h1 = page.locator('h1');
      await expect(h1).toContainText(organization.name);
      await expect(page.getByTestId('org-actions-container')).toBeVisible();
    });

    test('search', async ({ page, ctx }) => {
      const searchButton = page.getByTestId('nav-search-btn');
      await expect(searchButton).toBeVisible();

      const searchInput = page.getByRole('combobox');
      await expect(searchInput).toBeHidden();
      await searchButton.click();
      await expect(searchInput).toBeVisible();

      await searchInput.fill('test');
      await expect(page.locator('*[aria-busy=true]')).toHaveCount(0);
      const searchLink = page.getByTestId('search-advanced');
      await searchLink.click();
      await ctx.waitForLoadingFinished(page);
      await page.waitForURL('**/search');
      await expect(page.getByTestId('search-form')).toBeVisible();
    });
  });
};

getIdentifiersToTest().forEach((plan) => testPlan(plan));
