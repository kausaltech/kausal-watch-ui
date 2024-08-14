import { expect, test as base } from '@playwright/test';
import {
  getIdentifiersToTest,
  PlanContext,
  checkAccessibility,
} from './context';

const test = base.extend<{ ctx: PlanContext }>({});

const testPlanAccessibility = (planId: string) =>
  test.describe(`Accessibility tests for ${planId}`, () => {
    test.describe.configure({ mode: 'serial' });

    test.use({
      ctx: async ({}, use) => {
        const planInfo = await PlanContext.fromPlanId(planId);
        await use(planInfo);
      },
    });

    test.beforeEach(async ({ page, ctx }) => {
      await page.goto(ctx.baseURL);
    });

    test('Check accessibility on main pages', async ({ page, ctx }) => {
      await checkAccessibility(page);
    });
  });

getIdentifiersToTest().forEach((plan) => testPlanAccessibility(plan));
