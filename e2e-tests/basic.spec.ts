import { test as base, expect } from '@playwright/test';
import { PlanContext, getIdentifiersToTest } from './context';
import AxeBuilder from '@axe-core/playwright';

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

    async function checkAccessibility(page) {
      const results = await new AxeBuilder({ page }).analyze();
      const criticalAndSeriousViolations = results.violations.filter(
        (violation) =>
          violation.impact === 'critical' || violation.impact === 'serious'
      );

      if (criticalAndSeriousViolations.length > 0) {
        console.error(
          'Critical and serious accessibility violations:',
          criticalAndSeriousViolations
        );
      }

      expect(criticalAndSeriousViolations).toEqual([]);
    }

    test('basic layout', async ({ page, ctx }) => {
      await expect(page.locator('nav#branding-navigation-bar')).toBeVisible();
      await expect(page.locator('nav#global-navigation-bar')).toBeVisible();
      await expect(page.locator('main#main')).toBeVisible();
      await expect(page.locator('main#main')).toBeVisible();
      await checkAccessibility(page);
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

      await expect
        .configure({ timeout: 15000 })(page.getByRole('tab').first())
        .toBeVisible();

      // Test direct URL navigation
      await page.goto(`${ctx.baseURL}/${listItem.page.urlPath}`);
      await ctx.checkMeta(page);
      await expect
        .configure({ timeout: 2000 })(page.getByRole('tab').first())
        .toBeVisible();
      await checkAccessibility(page);
    });

    test('action details page', async ({ page, ctx }) => {
      test.skip(ctx.plan.actions.length == 0, 'No actions defined in plan');
      await page.goto(ctx.getActionURL(ctx.plan.actions[0]));
      await ctx.checkMeta(page);
      const actionDetailsPage = page.locator('.action-main-top');
      await expect(actionDetailsPage).toBeVisible();
      await checkAccessibility(page);
    });

    test('category pages', async ({ page, ctx }) => {
      test.setTimeout(20000);
      const categoryTypeItem = ctx.getCategoryTypeMenuItem();
      test.skip(!categoryTypeItem, 'No category type for plan');

      const items = ctx.getCategoryMenuItems(categoryTypeItem?.page.id);
      test.skip(!items, 'No category pages for plan');

      for (const item of items) {
        const nav = page.locator('nav#global-navigation-bar');
        const categoryTypeLink = nav.getByRole('link', {
          name: categoryTypeItem?.page.title,
          exact: true,
        });
        await categoryTypeLink.click();

        const link = nav.getByRole('link', {
          name: item.page.title,
          exact: true,
        });
        await link.click();
        await expect(page.locator('main#main')).toBeVisible();
        await checkAccessibility(page);
      }
    });

    test('empty page children pages', async ({ page, ctx }) => {
      const EmptyPageMenuItem = ctx.getEmptyPageMenuItem();
      test.skip(!EmptyPageMenuItem, 'No empty pages for plan');

      const items = ctx.getEmptyPageChildrenItems(EmptyPageMenuItem?.page.id);
      test.skip(!items, 'No children category or content pages for plan');

      for (const item of items) {
        const nav = page.locator('nav#global-navigation-bar');
        const emptyPageMenuLink = nav.getByRole('link', {
          name: EmptyPageMenuItem?.page.title,
          exact: true,
        });
        await emptyPageMenuLink.click();

        const link = nav.getByRole('link', {
          name: item.page.title,
          exact: true,
        });
        await link.click();
        await expect(page.locator('main#main')).toBeVisible();
        await checkAccessibility(page);
      }
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
        await checkAccessibility(page);
      }
    });

    test('indicator list page', async ({ page, ctx }) => {
      test.setTimeout(120000);
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
      await checkAccessibility(page);

      const planIndicators = ctx.getPlanIndicators();

      for (const planIndicator of planIndicators) {
        const indicatorLink = main.getByRole('link', {
          name: planIndicator?.name,
          exact: true,
        });
        await expect(indicatorLink).toBeVisible();
      }
      //add a condition for children indicators links (Aanekoski)
    });

    test('indicator page direct', async ({ page, ctx }) => {
      const planIndicators = ctx.getPlanIndicators();
      test.skip(planIndicators.length == 0, 'No indicators defined in plan');

      const indicatorUrl = ctx.baseURL + '/indicators/' + planIndicators[0]?.id;
      await page.goto(indicatorUrl);
      await ctx.checkMeta(page);

      await expect(page.locator('main#main')).toBeVisible();
      await checkAccessibility(page);
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
      await checkAccessibility(page);
    });

    /*test('language selector', async ({ page, ctx }) => {
      const languageSelector = page.getByTestId('lang-selector');

      test.skip(!languageSelector, 'No language selector for the plan');

      await languageSelector.click();
      await expect(page.locator('dropdown-menu')).toBeVisible();
    });*/
  });

getIdentifiersToTest().forEach((plan) => testPlan(plan));
