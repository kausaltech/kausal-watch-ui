/**
 * Accessibility audit of plans, using axe-core and the checks in
 * common/a11y-checks.ts.
 *
 * For each plan it audits the home page, every live menu page (a sample of
 * each category type's categories), a sample of actions, indicators and
 * organizations, and the search page. On each page it also opens what can be
 * opened (menus, filters, tabs, toggletips) and scans what that reveals, and
 * checks reflow at 320px. On the first page of each kind it walks through the
 * page with the keyboard.
 *
 * In plans that open indicators in a modal, the sampled indicators are audited
 * in the modal instead, and the first indicator link found is opened with the
 * keyboard to check how the modal handles focus.
 *
 * Violations do not fail the tests. In the HTML report, each plan's test shows
 * its violation counts as an annotation and attaches a11y-summary.html with the
 * details. a11y-reporter.ts prints a cross-plan summary at the end of the run
 * and writes it to e2e-tests/a11y-results/.
 *
 *   A11Y_AUDIT=1 pnpm exec playwright test a11y-audit --project=chromium
 *
 * Plans come from A11Y_PLAN_IDENTIFIERS (comma-separated), falling back to
 * TEST_PLAN_IDENTIFIERS. Plans whose site requires sign-in, or that the backend
 * does not serve at their test URL, are skipped rather than failed.
 * A11Y_SAMPLE_SIZE (default 3) sets how many of each sampled kind to audit, and
 * A11Y_MAX_TABS (default 200) how far a keyboard walk goes.
 */
import { AxeBuilder } from '@axe-core/playwright';
import { type Locator, type Page, expect, test } from '@playwright/test';

import {
  NARROW_VIEWPORT,
  checkDialog,
  checkReflow,
  checkSkipLink,
  checkTitles,
  checkViolation,
  describeLocator,
  walkKeyboard,
} from '../common/a11y-checks.ts';
import {
  A11Y_ATTACHMENT,
  type AuditedPage,
  type AuditedViolation,
  type PlanAudit,
  formatImpactCounts,
  planAuditHtml,
} from '../common/a11y.ts';
import { PlanContext, getIdentifiersToTest, getPlanAvailability } from '../common/context.ts';

/** WCAG 2.2 AA, which covers EN 301 549 (WCAG 2.1 AA) and adds a few criteria. */
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** How many offending elements to keep per violation; the count is kept in full. */
const MAX_NODES = 10;

const SAMPLE_SIZE = Number(process.env.A11Y_SAMPLE_SIZE) || 3;

/** Elements that open something when clicked */
const TOGGLES = [
  '[aria-expanded="false"]',
  '[role="tab"][aria-selected="false"]',
  // PopoverTip
  'button:has(+ [role="status"].visually-hidden)',
].join(', ');

const DIALOG = '[role="dialog"]';

/** Visible ones only: Next's dev tools have a hidden dialog in their shadow DOM */
const dialogLocator = (page: Page) => page.locator(DIALOG).filter({ visible: true });

const PAGE_KINDS: Record<string, string> = {
  ActionListPage: 'action-list',
  CategoryTypePage: 'category-type',
  CategoryPage: 'category',
  StaticPage: 'content-page',
  IndicatorListPage: 'indicator-list',
};

type PageToAudit = {
  name: string;
  url: string;
  /** Walk through it with the keyboard */
  keyboard: boolean;
  /** The URL opens a dialog, which is what to audit */
  dialog?: boolean;
};

type PlanProgress = {
  /** Open an indicator link on the next page that has one */
  indicatorLinkPending: boolean;
};

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
  const pages: PageToAudit[] = [];
  const kinds = new Set<string>();
  const add = (kind: string, label: string | null, url: string, dialog?: boolean) => {
    if (pages.some((p) => p.url === url)) return;
    const name = label ? `${kind}: ${label.slice(0, 40)}` : kind;
    pages.push({ name, url, keyboard: !kinds.has(kind), dialog });
    kinds.add(kind);
  };

  add('home', null, baseURL);
  const categoriesPerParent = new Map<string, number>();
  for (const item of plan.mainMenu?.items ?? []) {
    if (item.__typename !== 'PageMenuItem') continue;
    const { page } = item;
    if (!page.live || !page.showInMenus || page.__typename === 'EmptyPage') continue;
    const kind =
      PAGE_KINDS[page.__typename] ??
      page.__typename.replace(/Page$/, '').replace(/[a-z][A-Z]/g, (s) => `${s[0]}-${s[1]}`);
    if (kind === 'category') {
      // Categories share a template, so a few per category type will do
      const parentId = item.parent?.id ?? '';
      const count = categoriesPerParent.get(parentId) ?? 0;
      if (count >= SAMPLE_SIZE) continue;
      categoriesPerParent.set(parentId, count + 1);
    }
    add(kind.toLowerCase(), page.title, `${baseURL}${page.urlPath}`);
  }
  for (const action of plan.actions.slice(0, SAMPLE_SIZE)) {
    add('action', action.identifier, action.viewUrl);
  }
  for (const indicator of ctx.getPlanIndicators().slice(0, SAMPLE_SIZE)) {
    if (plan.features.indicatorsOpenInModal) {
      add('indicator-modal', indicator.name, `${baseURL}/?indicator=${indicator.id}`, true);
    } else {
      add('indicator', indicator.name, `${baseURL}/indicators/${indicator.id}`);
    }
  }
  for (const organization of ctx.planOrganizations.slice(0, SAMPLE_SIZE)) {
    add('organization', organization.name, `${baseURL}/organizations/${organization.id}`);
  }
  add('search', null, `${baseURL}/search`);
  return pages;
}

async function dismissIntroModal(page: Page) {
  const modal = page.getByTestId('intro-modal');
  if ((await modal.count()) === 0) return;
  await modal.getByTestId('intro-modal-no-show').click();
  await modal.getByRole('button').click();
  await expect(modal).toBeHidden({ timeout: 1000 });
}

async function settle(page: Page) {
  await expect(page.locator('*[aria-busy=true]')).toHaveCount(0, { timeout: 30_000 });
  await page.waitForLoadState('networkidle');
  // Let menus and collapses finish opening
  await page.waitForTimeout(300);
}

async function loadPage(page: Page, url: string) {
  await page.goto(url);
  await dismissIntroModal(page);
  await settle(page);
}

async function openPage(page: Page, { url, dialog }: PageToAudit) {
  await loadPage(page, url);
  if (dialog) {
    await expect(dialogLocator(page)).toBeVisible({ timeout: 30_000 });
    await settle(page);
  }
}

/**
 * Runs axe on the page, or on the part that `include` selects. With `known`,
 * leaves out what an earlier scan of the page already found, so that a scan of
 * an open state lists only what it adds.
 */
async function scan(page: Page, known?: Set<string>, include?: string) {
  const axe = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  if (include) axe.include(include);
  const results = await axe.analyze();
  const keys = new Set<string>();
  const violations: AuditedViolation[] = [];
  for (const v of results.violations) {
    const nodes = v.nodes.filter((node) => {
      const key = `${v.id} ${node.target.join(' ')}`;
      keys.add(key);
      return !known?.has(key);
    });
    if (!nodes.length) continue;
    violations.push({
      id: v.id,
      impact: v.impact ?? null,
      help: v.help,
      helpUrl: v.helpUrl,
      nodeCount: nodes.length,
      nodes: nodes.slice(0, MAX_NODES).map((node) => ({
        target: node.target.join(' '),
        html: node.html,
        failureSummary: node.failureSummary ?? '',
      })),
    });
  }
  return { violations, keys };
}

type StateOptions = {
  /** Selector of the part of the page whose toggles to open */
  root: string;
  max: number;
  prefix?: string;
  /** Close with Escape, which would also close a dialog the toggles are in */
  escape?: boolean;
  /** Follow the first menu link opened, with Enter */
  followMenuLink?: boolean;
};

/** Marks the toggles to open, in document order, and returns how many there are. */
async function markToggles(page: Page, { root, max }: StateOptions) {
  return page.evaluate(
    ({ root, max, selector }) => {
      for (const el of document.querySelectorAll('[data-a11y-state]')) {
        el.removeAttribute('data-a11y-state');
      }
      const scope = document.querySelector(root) ?? document.body;
      const toggles = [...scope.querySelectorAll(selector)]
        .filter(
          (el) =>
            !el.closest('[inert]') &&
            el.checkVisibility({ visibilityProperty: true }) &&
            el.getBoundingClientRect().width > 0
        )
        .slice(0, max);
      toggles.forEach((el, i) => {
        el.setAttribute('data-a11y-state', String(i));
      });
      return toggles.length;
    },
    { root, max, selector: TOGGLES }
  );
}

/** The page a URL points to: plans can link to other plans' hosts */
function pageOf(url: string) {
  const { origin, pathname } = new URL(url);
  return `${origin}${pathname}`;
}

/** Whether the toggle shows that it is open */
function isOpen(toggle: Locator) {
  return toggle.evaluate((el) => {
    if (el.getAttribute('aria-expanded') === 'true') return true;
    if (el.getAttribute('aria-selected') === 'true') return true;
    // PopoverTip announces its content in the status next to it
    const status = el.nextElementSibling;
    return status?.getAttribute('role') === 'status' && !!status.textContent.trim();
  });
}

/**
 * When focus is on a link in a menu, presses Enter and checks that the link is
 * followed. Returns null when focus is not on such a link.
 */
async function followMenuLink(page: Page): Promise<AuditedViolation[] | null> {
  const current = pageOf(page.url());
  let target: string | null = null;
  // Skip items that link to the current page, which would prove nothing
  for (let tries = 0; tries < 3; tries++) {
    const href = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute('role') === 'menuitem' ? el.getAttribute('href') : null;
    });
    if (!href) return null;
    target = pageOf(new URL(href, page.url()).href);
    if (target !== current) break;
    target = null;
    await page.keyboard.press('ArrowDown');
  }
  if (!target) return null;
  const node = await describeLocator(page, page.locator(':focus'));
  await page.keyboard.press('Enter');
  try {
    await expect.poll(() => pageOf(page.url()), { timeout: 10_000 }).toBe(target);
    return [];
  } catch {
    const failureSummary = 'Enter on the menu item does not follow its link';
    return [checkViolation('keyboard-operable', [{ ...node, failureSummary }])];
  }
}

/**
 * Opens each toggle in turn, with the keyboard if it can, and scans what it
 * reveals.
 */
async function auditStates(
  page: Page,
  pageToAudit: PageToAudit,
  known: Set<string>,
  options: StateOptions
): Promise<AuditedPage[]> {
  const { name, url } = pageToAudit;
  const results: AuditedPage[] = [];
  const count = await markToggles(page, options);
  let followedMenuLink = false;
  for (let i = 0; i < count; i++) {
    const toggle = page.locator(`[data-a11y-state="${String(i)}"]`);
    let reload = false;
    try {
      if (!(await toggle.isVisible())) continue;
      const { label, isTab, key } = await toggle.evaluate((el) => {
        const labelledBy = (el.getAttribute('aria-labelledby') ?? '')
          .split(' ')
          .map((id) => document.getElementById(id)?.textContent ?? '')
          .join(' ');
        const text =
          el.getAttribute('aria-label') ||
          labelledBy.trim() ||
          (el as HTMLInputElement).labels?.[0]?.textContent ||
          el.textContent ||
          '';
        return {
          label: text.trim().replace(/\s+/g, ' ').slice(0, 40),
          isTab: el.getAttribute('role') === 'tab',
          key: el.getAttribute('role') === 'combobox' ? 'ArrowDown' : 'Enter',
        };
      });
      const navigated = () => pageOf(page.url()) !== pageOf(url);
      const node = await describeLocator(page, toggle);
      // As a keyboard user would, then with a click if that does nothing
      await toggle.focus();
      await page.keyboard.press(key);
      await settle(page);
      if (navigated()) {
        reload = true;
        continue;
      }
      const byKeyboard = await isOpen(toggle);
      const keyboardViolations: AuditedViolation[] = [];
      if (!byKeyboard) {
        await toggle.click();
        await settle(page);
        if (navigated()) {
          reload = true;
          continue;
        }
        if (await isOpen(toggle)) {
          const failureSummary = `${key} does not open it, but a click does`;
          keyboardViolations.push(
            checkViolation('keyboard-operable', [{ ...node, failureSummary }])
          );
        }
      }
      const { violations } = await scan(page, known);
      violations.push(...keyboardViolations);
      const state = `${options.prefix ?? ''}${label || 'toggle'} open`;
      results.push({ name, url, state, violations });
      if (byKeyboard && options.followMenuLink && !followedMenuLink) {
        const menuLink = await followMenuLink(page);
        if (menuLink) {
          followedMenuLink = true;
          violations.push(...menuLink);
          reload = true;
          continue;
        }
      }
      // A tab stays selected, so start over from the page as loaded
      if (isTab) {
        reload = true;
        continue;
      }
      if (options.escape !== false) await page.keyboard.press('Escape');
      await page.mouse.move(0, 0);
      if ((await toggle.count()) && (await toggle.getAttribute('aria-expanded')) === 'true') {
        await toggle.click();
      }
      await settle(page);
    } catch {
      reload = true;
    } finally {
      if (reload) {
        await openPage(page, pageToAudit);
        await markToggles(page, options);
      }
    }
  }
  return results;
}

/**
 * Opens the first indicator link on the page with the keyboard, then scans the
 * modal and checks its focus handling. Returns null when there is no link or
 * it does not open a modal.
 */
async function auditIndicatorLink(
  page: Page,
  pageToAudit: PageToAudit,
  known: Set<string>
): Promise<AuditedPage | null> {
  const { name, url } = pageToAudit;
  const link = page.locator('main a[href*="/indicators/"]').filter({ visible: true }).first();
  if (!(await link.count())) return null;
  try {
    await link.evaluate((el) => {
      el.setAttribute('data-a11y-trigger', '');
    });
    await link.focus();
    await page.keyboard.press('Enter');
    try {
      await expect(dialogLocator(page)).toBeVisible({ timeout: 10_000 });
    } catch {
      return null;
    }
    await settle(page);
    const { violations } = await scan(page, known, DIALOG);
    violations.push(...(await checkDialog(page, DIALOG, '[data-a11y-trigger]')));
    return { name, url, state: 'indicator modal opened from a link', violations };
  } finally {
    await openPage(page, pageToAudit);
  }
}

/** Audits one page, pushing its results to `results` as they come in. */
async function auditPage(
  page: Page,
  pageToAudit: PageToAudit,
  results: AuditedPage[],
  progress: PlanProgress
) {
  const { name, url, dialog } = pageToAudit;
  const isHome = name === 'home';
  await openPage(page, pageToAudit);
  const { violations, keys } = await scan(page, undefined, dialog ? DIALOG : undefined);
  const title = dialog ? undefined : await page.title();
  const audited: AuditedPage = { name, url, title, violations };
  results.push(audited);

  if (progress.indicatorLinkPending && !dialog) {
    const opened = await auditIndicatorLink(page, pageToAudit, keys);
    if (opened) {
      results.push(opened);
      progress.indicatorLinkPending = false;
    }
  }

  if (pageToAudit.keyboard) {
    violations.push(...(await walkKeyboard(page)));
    if (isHome) violations.push(...(await checkSkipLink(page)));
    // The walk ends with Escape, which closes the dialog
    if (dialog) await openPage(page, pageToAudit);
  }

  // The header and footer are the same everywhere, so open their toggles only on the home page
  const states = await auditStates(page, pageToAudit, keys, {
    root: dialog ? DIALOG : isHome ? 'body' : 'main',
    max: isHome ? 10 : 5,
    escape: !dialog,
    followMenuLink: isHome,
  });
  results.push(...states);

  const viewport = page.viewportSize();
  await page.setViewportSize(NARROW_VIEWPORT);
  try {
    await settle(page);
    violations.push(...(await checkReflow(page)));
    if (isHome) {
      // The mobile layout, with the header's toggles opened
      const narrow = await scan(page, keys);
      results.push({ name, url, state: '320px wide', violations: narrow.violations });
      const narrowStates = await auditStates(page, pageToAudit, keys, {
        root: 'header',
        max: 3,
        prefix: '320px wide, ',
      });
      results.push(...narrowStates);
    }
  } finally {
    if (viewport) await page.setViewportSize(viewport);
  }
}

const describeAudit = (planId: string) => {
  test(planId, async ({ page }, testInfo) => {
    // Plans behind sign-in (or not served at all) would only audit the gate page, so skip them.
    const availability = await getPlanAvailability(planId);
    test.skip(availability !== 'AVAILABLE', `Not public: ${availability}`);
    const ctx = await PlanContext.fromPlanId(planId);
    const pagesToAudit = getPagesToAudit(ctx);
    const walks = pagesToAudit.filter((p) => p.keyboard).length;
    const progress: PlanProgress = {
      indicatorLinkPending: ctx.plan.features.indicatorsOpenInModal,
    };
    test.setTimeout(60_000 + pagesToAudit.length * 60_000 + walks * 60_000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const audit: PlanAudit = { planId, auditedAt: new Date().toISOString(), pages: [] };
    for (const pageToAudit of pagesToAudit) {
      await test.step(pageToAudit.name, async () => {
        try {
          await auditPage(page, pageToAudit, audit.pages, progress);
        } catch (error) {
          // Keep auditing the other pages; a broken page shows up in the summary.
          const message = error instanceof Error ? error.message.split('\n')[0] : String(error);
          audit.pages.push({ ...pageToAudit, error: message, violations: [] });
          expect.soft(message, `${pageToAudit.name} could not be audited`).toBe('');
        }
      });
    }
    checkTitles(audit.pages);
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
