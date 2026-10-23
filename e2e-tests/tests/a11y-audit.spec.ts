/**
 * Accessibility audit of key pages across plans, using axe-core.
 *
 * Violations do not fail the tests. In the HTML report, each plan's test shows
 * its violation counts as an annotation and attaches a11y-summary.html with the
 * details. a11y-reporter.ts prints a cross-plan summary at the end of the run
 * and writes it to e2e-tests/a11y-results/.
 *
 *   A11Y_AUDIT=1 pnpm exec playwright test a11y-audit --project=chromium
 *
 * Plans come from A11Y_PLAN_IDENTIFIERS (comma-separated), falling back to
 * TEST_PLAN_IDENTIFIERS.
 */
import { AxeBuilder } from '@axe-core/playwright';
import { type Page, expect, test } from '@playwright/test';

import {
  A11Y_ATTACHMENT,
  type AuditedPage,
  type PlanAudit,
  formatImpactCounts,
  planAuditHtml,
} from '../common/a11y.ts';
import { PlanContext, getIdentifiersToTest } from '../common/context.ts';

/** WCAG 2.2 AA, which covers EN 301 549 (WCAG 2.1 AA) and adds a few criteria. */
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** How many offending elements to keep per violation; the count is kept in full. */
const MAX_NODES = 10;

type PageToAudit = { name: string; url: string };

function getPlanIdentifiers(): string[] {
  const val = process.env.A11Y_PLAN_IDENTIFIERS;
  if (!val) return getIdentifiersToTest();
  return val
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function getPagesToAudit(ctx: PlanContext): PageToAudit[] {
  const { baseURL, plan } = ctx;
  const pages: (PageToAudit | null)[] = [
    { name: 'home', url: baseURL },
    plan.actionListPage
      ? { name: 'action-list', url: `${baseURL}${plan.actionListPage.urlPath}` }
      : null,
  ];
  const action = plan.actions.at(0);
  if (action) {
    pages.push({ name: 'action', url: action.viewUrl });
  }
  const categoryType = ctx.getCategoryTypeMenuItem();
  const category = ctx.getCategoryMenuItems(categoryType?.page.id).at(0);
  if (category) {
    pages.push({ name: 'category', url: `${baseURL}${category.page.urlPath}` });
  }
  const indicatorList = ctx.getIndicatorListMenuItem();
  if (indicatorList) {
    pages.push({ name: 'indicator-list', url: `${baseURL}${indicatorList.page.urlPath}` });
  }
  const indicator = ctx.getPlanIndicators().at(0);
  if (indicator) {
    pages.push({ name: 'indicator', url: `${baseURL}/indicators/${indicator.id}` });
  }
  const contentPage = ctx.getStaticPageMenuItems().at(0);
  if (contentPage) {
    pages.push({ name: 'content-page', url: `${baseURL}${contentPage.page.urlPath}` });
  }
  const organization = ctx.planOrganizations.at(0);
  if (organization) {
    pages.push({ name: 'organization', url: `${baseURL}/organizations/${organization.id}` });
  }
  pages.push({ name: 'search', url: `${baseURL}/search` });
  return pages.filter((p) => p !== null);
}

async function dismissIntroModal(page: Page) {
  const modal = page.getByTestId('intro-modal');
  if ((await modal.count()) === 0) return;
  await modal.getByTestId('intro-modal-no-show').click();
  await modal.getByRole('button').click();
  await expect(modal).toBeHidden({ timeout: 1000 });
}

async function auditPage(page: Page, { name, url }: PageToAudit): Promise<AuditedPage> {
  await page.goto(url);
  await dismissIntroModal(page);
  await expect(page.locator('*[aria-busy=true]')).toHaveCount(0, { timeout: 30_000 });
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const violations = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact ?? null,
    help: v.help,
    helpUrl: v.helpUrl,
    nodeCount: v.nodes.length,
    nodes: v.nodes.slice(0, MAX_NODES).map((node) => ({
      target: node.target.join(' '),
      html: node.html,
      failureSummary: node.failureSummary ?? '',
    })),
  }));
  return { name, url, violations };
}

const describeAudit = (planId: string) => {
  test(planId, async ({ page }, testInfo) => {
    test.setTimeout(300_000);
    const ctx = await PlanContext.fromPlanId(planId);
    const audit: PlanAudit = { planId, auditedAt: new Date().toISOString(), pages: [] };
    for (const pageToAudit of getPagesToAudit(ctx)) {
      await test.step(pageToAudit.name, async () => {
        try {
          audit.pages.push(await auditPage(page, pageToAudit));
        } catch (error) {
          // Keep auditing the other pages; a broken page shows up in the summary.
          const message = error instanceof Error ? error.message.split('\n')[0] : String(error);
          audit.pages.push({ ...pageToAudit, error: message, violations: [] });
          expect.soft(message, `${pageToAudit.name} could not be audited`).toBe('');
        }
      });
    }
    testInfo.annotations.push({ type: 'a11y elements', description: formatImpactCounts(audit) });
    await testInfo.attach('a11y-summary.html', {
      body: planAuditHtml(audit),
      contentType: 'text/html',
    });
    await testInfo.attach(A11Y_ATTACHMENT, {
      body: JSON.stringify(audit, null, 2),
      contentType: 'application/json',
    });
  });
};

test.describe('accessibility audit', () => {
  test.skip(!process.env.A11Y_AUDIT, 'Set A11Y_AUDIT=1 to run the accessibility audit');
  const planIds = getPlanIdentifiers();
  if (!planIds.length) {
    test('no plans', () => {
      test.skip(true, 'Set A11Y_PLAN_IDENTIFIERS or TEST_PLAN_IDENTIFIERS to choose plans');
    });
  }
  planIds.forEach(describeAudit);
});
