import { expect } from '@playwright/test';

import { PlanContext } from '../common/context.ts';
import { test as coverageTest } from '../common/coverage.ts';

declare global {
  interface Window {
    __iframesReady?: boolean;
  }
}

const test = coverageTest.extend<{ ctx: PlanContext }>({});

const PLAN_ID = 'sunnydale';

/** A minimal valid PDF (empty single-page document). */
const FAKE_PDF = Buffer.from(
  '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n' +
    '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n' +
    '3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\n' +
    'xref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n' +
    '0000000115 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF'
);

const annotations = [
  { type: 'plan', description: PLAN_ID },
  { type: 'url', description: PlanContext.getBaseURL(PLAN_ID) },
];

test.describe('pdf-export', { annotation: annotations }, () => {
  test.describe.configure({ mode: 'serial' });

  let actionPageUrl: string;

  test.use({
    ctx: async ({}, use) => {
      const planInfo = await PlanContext.fromPlanId(PLAN_ID);
      await use(planInfo);
    },
  });

  test.beforeEach(async ({ page, ctx }) => {
    ctx.beforeEach(page);
  });

  /**
   * Navigate to the first action details page and store its URL for
   * subsequent tests. Also verifies the Download button is visible.
   */
  test('button visibility', async ({ page, ctx }) => {
    // Navigate to action list
    const listItem = ctx.getActionListMenuItem();
    test.skip(!listItem, 'No action list page for plan');

    await page.goto(`${ctx.baseURL}${listItem!.page.urlPath}`, {
      waitUntil: 'domcontentloaded',
    });
    await ctx.waitForLoadingFinished(page);

    // Click first action link
    const firstActionLink = page.locator('a[href*="/actions/"]').first();
    await firstActionLink.waitFor({ state: 'visible' });
    const href = await firstActionLink.getAttribute('href');
    actionPageUrl = href!.startsWith('http') ? href! : `${ctx.baseURL}${href}`;

    await page.goto(actionPageUrl);
    await ctx.waitForLoadingFinished(page);

    // The Download button should be visible
    const downloadButton = page.getByRole('button', { name: /download/i });
    test.skip(
      !(await downloadButton.count()),
      'PDF export button not visible (feature flag likely disabled)'
    );
    await expect(downloadButton).toBeVisible();

    // Click to open menu and verify "Page as PDF" item
    await downloadButton.click();
    const pdfMenuItem = page.getByRole('menuitem', { name: /pdf/i });
    await expect(pdfMenuItem).toBeVisible();
  });

  test('successful pdf export triggers download', async ({ page, ctx }) => {
    test.skip(!actionPageUrl, 'No action page URL from previous test');

    // Mock the export-pdf endpoint to return a fake PDF
    await page.route('**/api/export-pdf', async (route) => {
      const request = route.request();
      const postData = JSON.parse(request.postData()!);

      // Verify the request payload
      expect(postData.path).toContain('/actions/');
      expect(postData.locale).toBeTruthy();

      await route.fulfill({
        status: 200,
        contentType: 'application/pdf',
        headers: {
          'Content-Disposition': 'attachment; filename="export.pdf"',
          'Cache-Control': 'no-store',
        },
        body: FAKE_PDF,
      });
    });

    await page.goto(actionPageUrl);
    await ctx.waitForLoadingFinished(page);

    const downloadButton = page.getByRole('button', { name: /download/i });
    test.skip(
      !(await downloadButton.count()),
      'PDF export button not visible (feature flag likely disabled)'
    );

    // Start waiting for download before triggering
    const downloadPromise = page.waitForEvent('download');

    await downloadButton.click();
    const pdfMenuItem = page.getByRole('menuitem', { name: /pdf/i });
    await pdfMenuItem.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('export.pdf');
  });

  test('print mode sets __iframesReady', async ({ page, ctx }) => {
    test.skip(!actionPageUrl, 'No action page URL from previous test');

    const printUrl = actionPageUrl + (actionPageUrl.includes('?') ? '&' : '?') + 'print=true';
    await page.goto(printUrl);
    await ctx.waitForLoadingFinished(page);

    // PrintProvider should eventually set __iframesReady to true
    await page.waitForFunction(() => window.__iframesReady === true, null, {
      timeout: 30_000,
    });
  });

  test('error state shows message in UI', async ({ page, ctx }) => {
    test.skip(!actionPageUrl, 'No action page URL from previous test');

    // Mock the export-pdf endpoint to return a server error
    await page.route('**/api/export-pdf', async (route) => {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'PDF generation failed' }),
      });
    });

    await page.goto(actionPageUrl);
    await ctx.waitForLoadingFinished(page);

    const downloadButton = page.getByRole('button', { name: /download/i });
    test.skip(
      !(await downloadButton.count()),
      'PDF export button not visible (feature flag likely disabled)'
    );

    await downloadButton.click();
    const pdfMenuItem = page.getByRole('menuitem', { name: /pdf/i });
    await pdfMenuItem.click();

    // The component should display an error message
    const errorMessage = page.locator('text=PDF generation failed');
    await expect(errorMessage).toBeVisible({ timeout: 10_000 });
  });

  test('api rejects non-action paths with 403', async ({ ctx }) => {
    const response = await (
      await import('@playwright/test')
    ).request.newContext({
      baseURL: ctx.baseURL,
    });

    const res = await response.post('/api/export-pdf', {
      data: { path: '/indicators/1', locale: 'en' },
    });

    expect(res.status()).toBe(403);
    const body = await res.json();
    expect(body.error).toContain('action detail pages');

    await response.dispose();
  });
});
