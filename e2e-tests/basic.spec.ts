import { test as base, expect } from '@playwright/test';
import { PlanContext, getIdentifiersToTest } from './context';

const test = base.extend<{ ctx: PlanContext }>({});

const testPlan = (planId: string) =>
  test.describe(planId, () => {
    //let plan: PlanInfo;
    test.describe.configure({ mode: 'serial' });

    test.use({
      ctx: async ({}, use) => {
        const planInfo = await PlanContext.fromPlanId(planId);
        await use(planInfo);
      },
    });

    /*
  test.beforeAll(async () => {
    plan = await getPlanInfo(planId);
  })
  */
    test.beforeEach(async ({ page, ctx }) => {
      await page.goto(ctx.baseURL);
      await ctx.checkMeta(page);
      return;
    });

    test('basic layout', async ({ page, ctx }) => {
      await expect(page.locator('nav#branding-navigation-bar')).toBeVisible();
      await expect(page.locator('nav#global-navigation-bar')).toBeVisible();
      await expect(page.locator('main#main')).toBeVisible();
      await expect(page.locator('main#main')).toBeVisible();
      await ctx.checkAccessibility(page);
    });
    test('action list page', async ({ page, ctx }) => {
      test.setTimeout(120000);
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

      await expect
        .configure({ timeout: 15000 })(page.getByRole('tab').first())
        .toBeVisible();

      // Test direct URL navigation
      await page.goto(`${ctx.baseURL}/${listItem.page.urlPath}`);
      await ctx.checkMeta(page);
      await expect
        .configure({ timeout: 2000 })(page.getByRole('tab').first())
        .toBeVisible();
      await ctx.checkAccessibility(page);
    });

    test('action details page', async ({ page, ctx }) => {
      test.setTimeout(100000);
      test.skip(ctx.plan.actions.length == 0, 'No actions defined in plan');
      await page.goto(ctx.getActionURL(ctx.plan.actions[0]));
      await ctx.checkMeta(page);
      const actionDetailsPage = page.locator('.action-main-top');
      await expect(actionDetailsPage).toBeVisible();
      await ctx.checkAccessibility(page);
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
      await ctx.checkAccessibility(page);
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

      await ctx.checkAccessibility(page);
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
        await ctx.checkAccessibility(page);
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
      await ctx.checkAccessibility(page);
    });

    test('indicator page', async ({ page, ctx }) => {
      test.setTimeout(30000);
      const IndicatorListItem = ctx.getIndicatorListMenuItem();
      test.skip(!IndicatorListItem, 'No indicator list for plan');

      const nav = page.locator('nav#global-navigation-bar');
      const indicatorListLink = nav.getByRole('link', {
        name: IndicatorListItem.page.title,
        exact: true,
      });

      await indicatorListLink.click();
      const main = page.locator('main#main');
      await expect(main).toBeVisible();

      const planIndicators = ctx.getPlanIndicators();
      test.skip(planIndicators.length === 0, 'No indicators defined in plan');

      if (planIndicators.length > 0) {
        const firstIndicatorLink = main.getByRole('link', {
          name: planIndicators[0]?.name,
          exact: true,
        });
        await expect(firstIndicatorLink).toBeVisible();
        await firstIndicatorLink.click();
        await expect(main).toBeVisible();
        const h1Span = page.locator('h1 >> span');
        await expect(h1Span).toContainText(planIndicators[0]?.name);
        await ctx.checkAccessibility(page);
      }
    });

    test('indicator page direct', async ({ page, ctx }) => {
      const planIndicators = ctx.getPlanIndicators();
      test.skip(planIndicators.length == 0, 'No indicators defined in plan');

      const indicatorUrl = ctx.baseURL + '/indicators/' + planIndicators[0]?.id;
      await page.goto(indicatorUrl);
      await ctx.checkMeta(page);

      await expect(page.locator('main#main')).toBeVisible();
      await ctx.checkAccessibility(page);
    });

    test('search', async ({ page, ctx }) => {
      const searchButton = page.getByTestId('nav-search-btn');
      test.skip(!searchButton, 'No search button for the plan');
      const searchInput = page.getByRole('combobox');
      await expect(searchInput).toBeHidden();

      await searchButton.click();
      await expect(searchInput).toBeVisible();

      await searchInput.fill('test');
      await searchInput.press('Enter');
      await page.waitForURL('**/search?q=test');
      await expect(page.getByTestId('search-form')).toBeVisible;
      await ctx.checkAccessibility(page);
    });
  });

getIdentifiersToTest().forEach((plan) => testPlan(plan));
