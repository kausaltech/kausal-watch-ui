/**
 * Full-page screenshots of key pages, used to review layout changes during the
 * reactstrap → MUI migration (see docs/reactstrap-migration.md).
 *
 * The pages render live backend data, so the screenshots are not committed.
 * Capture a baseline, then compare a branch against it close in time:
 *
 *   VISUAL_BASELINE=1 pnpm exec playwright test visual-baseline --project=chromium --update-snapshots
 *   VISUAL_BASELINE=1 pnpm exec playwright test visual-baseline --project=chromium
 *
 * Plans come from VISUAL_PLAN_IDENTIFIERS (comma-separated, set it in the
 * gitignored e2e-tests/.env), falling back to TEST_PLAN_IDENTIFIERS.
 */
import path from 'node:path';

import { type Page, expect, test } from '@playwright/test';

import { PlanContext, getIdentifiersToTest } from '../common/context.ts';

/**
 * Viewport widths for the theme breakpoints (sm 600, md 768, lg 1200, xl 1536):
 * a phone, a tablet in portrait (md), a small laptop (md, but above Bootstrap's
 * old lg of 992) and a desktop (lg).
 */
const WIDTHS = [390, 820, 1100, 1440];
const HEIGHT = 900;

/**
 * Charts (ECharts and legacy Plotly) keep re-rendering, so they never produce
 * two identical screenshots in a row. Mask them: the masked box keeps its size,
 * so layout changes still show.
 */
const CHART_SELECTOR = '[_echarts_instance_], .js-plotly-plot';

/**
 * Text rendering jitters by a few dozen pixels between runs, for example where
 * a clamped title is cut off. Layout changes affect thousands of pixels.
 */
const MAX_DIFF_PIXELS = 200;

/** Hides or pins elements that otherwise differ between runs. */
const SCREENSHOT_STYLE = path.resolve(import.meta.dirname, '../common/visual-baseline.css');

type PageToCapture = { name: string; url: string };

function getPlanIdentifiers(): string[] {
  const val = process.env.VISUAL_PLAN_IDENTIFIERS;
  if (!val) return getIdentifiersToTest();
  return val.split(',').map((s) => s.trim());
}

function getPagesToCapture(ctx: PlanContext): PageToCapture[] {
  const { baseURL, plan } = ctx;
  const pages: (PageToCapture | null)[] = [
    { name: 'home', url: baseURL },
    plan.actionListPage
      ? { name: 'action-list', url: `${baseURL}${plan.actionListPage.urlPath}` }
      : null,
  ];
  const action = plan.actions.at(0);
  if (action) {
    pages.push({ name: 'action', url: action.viewUrl });
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
  return pages.filter((p) => p !== null);
}

/**
 * Theme web fonts hide text until they load, and a blank page is stable enough
 * to pass the two-matching-screenshots check. The fonts are declared in the
 * theme stylesheet, so `document.fonts.ready` alone resolves too early if that
 * stylesheet has not been parsed yet.
 */
async function waitForFonts(page: Page) {
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]')).every(
      (link) => link.sheet !== null
    )
  );
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.fonts, (font) => font.load().catch(() => null)));
    await document.fonts.ready;
  });
  await pinWebFonts(page);
}

/**
 * Chrome re-requests URL-sourced web fonts whenever styles change, and every
 * screenshot changes them. Themes using `font-display: fallback` or `block`
 * hide their text until the request finishes, so a screenshot can catch blank
 * text. Re-registering each font from its downloaded bytes avoids this: a font
 * with an in-memory source is never fetched again, and faces added through
 * `document.fonts` take precedence over the CSS ones.
 */
async function pinWebFonts(page: Page) {
  await page.evaluate(async () => {
    const rules = Array.from(document.styleSheets).flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .filter((rule) => rule instanceof CSSFontFaceRule)
          .map((rule) => ({ rule, baseURL: sheet.href ?? document.baseURI }));
      } catch {
        // Cross-origin stylesheets cannot be read.
        return [];
      }
    });
    await Promise.all(
      rules.map(async ({ rule, baseURL }) => {
        const url = /url\(["']?([^"')]+)["']?\)/.exec(rule.style.getPropertyValue('src'))?.[1];
        const family = rule.style.getPropertyValue('font-family').replace(/^["']|["']$/g, '');
        if (!url || !family || url.startsWith('data:')) return;
        try {
          const response = await fetch(new URL(url, baseURL));
          if (!response.ok) return;
          const face = new FontFace(family, await response.arrayBuffer(), {
            weight: rule.style.getPropertyValue('font-weight') || 'normal',
            style: rule.style.getPropertyValue('font-style') || 'normal',
          });
          document.fonts.add(await face.load());
        } catch {
          // Leave fonts that fail to load to the page's own @font-face rules.
        }
      })
    );
  });
}

async function dismissIntroModal(page: Page) {
  const modal = page.getByTestId('intro-modal');
  if ((await modal.count()) === 0) return;
  await modal.getByTestId('intro-modal-no-show').click();
  await modal.getByRole('button').click();
  await expect(modal).toBeHidden({ timeout: 1000 });
}

const describeVisual = (planId: string) => {
  test.describe(planId, () => {
    let ctx: PlanContext;
    test.beforeAll(async () => {
      ctx = await PlanContext.fromPlanId(planId);
    });

    for (const width of WIDTHS) {
      test(`${String(width)}px`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height: HEIGHT });
        for (const { name, url } of getPagesToCapture(ctx)) {
          await test.step(name, async () => {
            await page.goto(url);
            await dismissIntroModal(page);
            await expect(page.locator('*[aria-busy=true]')).toHaveCount(0, { timeout: 30_000 });
            await page.waitForLoadState('networkidle');
            await waitForFonts(page);
            await expect.soft(page).toHaveScreenshot(`${planId}-${name}-${String(width)}.png`, {
              fullPage: true,
              animations: 'disabled',
              mask: [page.locator(CHART_SELECTOR)],
              stylePath: SCREENSHOT_STYLE,
              maxDiffPixels: MAX_DIFF_PIXELS,
              timeout: 15_000,
            });
          });
        }
      });
    }
  });
};

test.describe('visual baseline', () => {
  test.skip(
    !process.env.VISUAL_BASELINE,
    'Set VISUAL_BASELINE=1 to capture or compare screenshots'
  );
  getPlanIdentifiers().forEach(describeVisual);
});
