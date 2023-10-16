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
    test.beforeEach(async ({ page }) => {
      return;
      // FIXME: Enable later
      page.on('console', (msg) => {
        if (msg.text().includes('ReactDOM.hydrate is no longer supported'))
          return;
        if (msg.type() === 'error') {
          console.log(msg.text());
          throw new Error('Browser console got error output');
        } else if (msg.type() === 'warning') {
          console.log(msg.text());
          throw new Error('Browser console got warning output');
        }
      });
    });

    test('basic layout', async ({ page, ctx }) => {
      await page.goto(ctx.baseURL);
      await ctx.checkMeta(page);

      await expect(page.locator('nav#branding-navigation-bar')).toBeVisible();
      await expect(page.locator('nav#global-navigation-bar')).toBeVisible();
      await expect(page.locator('main#main')).toBeVisible();
      await expect(page.locator('main#main')).toBeVisible();

      await expect(page).toHaveScreenshot({ fullPage: true });
    });
    test('action list page', async ({ page, ctx }) => {
      const listItem = ctx.getActionListMenuItem()!;
      test.skip(!listItem, 'No action list page for plan');

      await page.goto(ctx.baseURL);
      await ctx.checkMeta(page);

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
      await expect(page).toHaveScreenshot(`action-list-${planId}.png`, {
        fullPage: true,
      });

      // Test direct URL navigation
      await page.goto(`${ctx.baseURL}/${listItem.page.urlPath}`);
      await ctx.checkMeta(page);
      await expect
        .configure({ timeout: 2000 })(page.getByRole('tab').first())
        .toBeVisible();

      //const ss = await page.screenshot({ fullPage: true });
      //expect(ss).toMatchSnapshot('action-list.png');
    });
    test('action details page', async ({ page, ctx }) => {
      test.skip(ctx.plan.actions.length == 0, 'No actions defined in plan');
      await page.goto(ctx.getActionURL(ctx.plan.actions[0]));
      await ctx.checkMeta(page);

      await expect(page.locator('.action-main-top')).toBeVisible();
      await expect(page).toHaveScreenshot({ fullPage: true });
    });
  });

getIdentifiersToTest().forEach((plan) => testPlan(plan));
