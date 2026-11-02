/**
 * Checks that axe cannot make: a keyboard walk, the skip link, reflow at a
 * narrow width and unique page titles. Their findings take the shape of axe
 * violations so that they show up in the same reports.
 */
import { type Page, expect } from '@playwright/test';

import type { AuditedPage, AuditedViolation } from './a11y.ts';

/** How many Tab presses a keyboard walk takes at most. */
const MAX_TABS = Number(process.env.A11Y_MAX_TABS) || 200;

const MAX_NODES = 10;

const UNDERSTANDING = 'https://www.w3.org/WAI/WCAG22/Understanding';

const RULES = {
  'keyboard-trap': {
    impact: 'critical',
    help: 'Keyboard focus must be able to move away from every element (2.1.2)',
    helpUrl: `${UNDERSTANDING}/no-keyboard-trap.html`,
  },
  'focus-hidden': {
    impact: 'serious',
    help: 'Elements that take keyboard focus must be visible (2.4.3)',
    helpUrl: `${UNDERSTANDING}/focus-order.html`,
  },
  'focus-not-visible': {
    impact: 'serious',
    help: 'Focused elements must show a visible focus indicator (2.4.7)',
    helpUrl: `${UNDERSTANDING}/focus-visible.html`,
  },
  'focus-obscured': {
    impact: 'serious',
    help: 'Focused elements must not be entirely hidden by other content (2.4.11)',
    helpUrl: `${UNDERSTANDING}/focus-not-obscured-minimum.html`,
  },
  'skip-link': {
    impact: 'serious',
    help: 'The first focusable element must be a working link to the main content (2.4.1)',
    helpUrl: `${UNDERSTANDING}/bypass-blocks.html`,
  },
  reflow: {
    impact: 'serious',
    help: 'Content must fit a 320px wide viewport without scrolling sideways (1.4.10)',
    helpUrl: `${UNDERSTANDING}/reflow.html`,
  },
  'page-title-unique': {
    impact: 'moderate',
    help: 'Pages must have titles that tell them apart (2.4.2)',
    helpUrl: `${UNDERSTANDING}/page-titled.html`,
  },
  'dialog-focus': {
    impact: 'serious',
    help: 'A dialog must take focus when it opens and give it back when it closes (2.4.3)',
    helpUrl: `${UNDERSTANDING}/focus-order.html`,
  },
  'dialog-escape': {
    impact: 'moderate',
    help: 'A dialog should close with Escape',
    helpUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
  },
} as const;

type CheckId = keyof typeof RULES;
type AuditedNode = AuditedViolation['nodes'][number];
type Described = { target: string; html: string };
type Rect = { x: number; y: number; width: number; height: number };

/** Viewport for the reflow check: 1280px at 400% zoom. */
export const NARROW_VIEWPORT = { width: 320, height: 640 };

/** Collects findings and groups them by rule. */
class Findings {
  private nodes = new Map<CheckId, AuditedNode[]>();

  add(id: CheckId, { target, html }: Described, failureSummary: string) {
    const nodes = this.nodes.get(id) ?? [];
    nodes.push({ target, html, failureSummary });
    this.nodes.set(id, nodes);
  }

  toViolations(): AuditedViolation[] {
    return [...this.nodes].map(([id, nodes]) => ({
      id,
      ...RULES[id],
      nodeCount: nodes.length,
      nodes: nodes.slice(0, MAX_NODES),
    }));
  }
}

declare global {
  interface Window {
    a11yAudit?: { describe: (el: Element) => Described; tabs: number };
  }
}

/** Adds the in-page helper that the checks use to describe elements. */
async function installHelpers(page: Page) {
  await page.evaluate(() => {
    if (window.a11yAudit) return;
    function cssPath(el: Element): string {
      const parts: string[] = [];
      let cur: Element | null = el;
      while (cur && cur !== document.documentElement && parts.length < 5) {
        if (cur.id) {
          parts.unshift(`#${CSS.escape(cur.id)}`);
          break;
        }
        const tag = cur.tagName;
        const siblings = [...(cur.parentElement?.children ?? [])].filter((s) => s.tagName === tag);
        const name = tag.toLowerCase();
        parts.unshift(
          siblings.length > 1 ? `${name}:nth-of-type(${String(siblings.indexOf(cur) + 1)})` : name
        );
        cur = cur.parentElement;
      }
      return parts.join(' > ');
    }
    window.a11yAudit = {
      describe: (el) => {
        const html = el.outerHTML;
        return { target: cssPath(el), html: html.length > 300 ? `${html.slice(0, 300)}…` : html };
      },
      tabs: 0,
    };
  });
}

/** Moves the start of sequential focus navigation to the top of the page. */
async function resetFocus(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    const marker = document.createElement('span');
    marker.tabIndex = -1;
    document.body.prepend(marker);
    marker.focus();
    marker.remove();
  });
}

type FocusInfo = Described & {
  index: number;
  revisit: boolean;
  /** Focus belongs to an iframe or Next's dev tools, so it's not ours to check */
  skip: boolean;
  hidden: boolean;
  obscuredBy: string | null;
  hasOutline: boolean;
  clip: Rect | null;
};

/** Describes the focused element, or returns null when focus has left the page. */
function inspectFocus(): FocusInfo | null {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const helpers = window.a11yAudit!;
  const seen = el.getAttribute('data-a11y-tab');
  const index = seen !== null ? Number(seen) : helpers.tabs++;
  el.setAttribute('data-a11y-tab', String(index));
  const info = { ...helpers.describe(el), index, revisit: seen !== null };
  if (el.tagName === 'IFRAME' || el.tagName === 'NEXTJS-PORTAL') {
    return { ...info, skip: true, hidden: false, obscuredBy: null, hasOutline: true, clip: null };
  }

  function isHidden(node: Element) {
    if (!node.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return true;
    const r = node.getBoundingClientRect();
    if (r.right + window.scrollX <= 0 || r.bottom + window.scrollY <= 0) return true;
    let { left, right, top, bottom } = r;
    for (let a: Element | null = node; a; a = a.parentElement) {
      const s = getComputedStyle(a);
      // The visually-hidden pattern
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      if (s.clip === 'rect(0px, 0px, 0px, 0px)' || s.clipPath === 'inset(50%)') return true;
      if (a === node) continue;
      const ar = a.getBoundingClientRect();
      if (s.overflowX !== 'visible') {
        left = Math.max(left, ar.left);
        right = Math.min(right, ar.right);
      }
      if (s.overflowY !== 'visible') {
        top = Math.max(top, ar.top);
        bottom = Math.min(bottom, ar.bottom);
      }
    }
    return right - left < 1 || bottom - top < 1;
  }

  // Visually hidden inputs show their focus on the label
  const label = (el as HTMLInputElement).labels?.[0];
  const shown = isHidden(el) && label && !isHidden(label) ? label : el;
  const hidden = isHidden(shown);

  const r = shown.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const points = [
    [(r.left + r.right) / 2, (r.top + r.bottom) / 2],
    [r.left + 2, r.top + 2],
    [r.right - 2, r.top + 2],
    [r.left + 2, r.bottom - 2],
    [r.right - 2, r.bottom - 2],
  ].filter(([x, y]) => x >= 0 && y >= 0 && x < vw && y < vh);
  // Transparent overlays, such as a card's stretched link, hide nothing
  function paints(hit: Element) {
    for (let a: Element | null = hit; a && !a.contains(shown); a = a.parentElement) {
      if (['IMG', 'SVG', 'VIDEO', 'CANVAS', 'IFRAME'].includes(a.tagName.toUpperCase()))
        return true;
      const style = getComputedStyle(a);
      if (style.backgroundImage !== 'none') return true;
      if (!/^rgba\(.*, 0\)$|^transparent$/.test(style.backgroundColor)) return true;
    }
    return false;
  }
  let cover: Element | null = null;
  for (const [x, y] of points) {
    const hit = document.elementFromPoint(x, y);
    if (!hit || hit === shown || shown.contains(hit) || hit.contains(shown) || !paints(hit)) {
      cover = null;
      break;
    }
    cover = hit;
  }

  const s = getComputedStyle(shown);
  const hasOutline =
    s.outlineStyle !== 'none' &&
    parseFloat(s.outlineWidth) > 0 &&
    s.outlineColor !== 'rgba(0, 0, 0, 0)';

  // Widgets such as react-select draw the focus ring on a wrapper
  let area = r;
  let wrapper = shown.parentElement;
  for (let level = 0; wrapper && level < 4; level++, wrapper = wrapper.parentElement) {
    const wr = wrapper.getBoundingClientRect();
    if (wr.height > r.height + 32) break;
    area = wr;
  }
  const pad = 6;
  const x = Math.max(0, area.left - pad);
  const y = Math.max(0, area.top - pad);
  const width = Math.min(vw, area.right + pad) - x;
  const height = Math.min(vh, area.bottom + pad) - y;

  return {
    ...info,
    skip: false,
    hidden,
    obscuredBy: cover ? helpers.describe(cover).target : null,
    hasOutline,
    clip: width >= 1 && height >= 1 ? { x, y, width, height } : null,
  };
}

/** Compares the element's surroundings with and without focus. */
async function showsFocus(page: Page, info: FocusInfo): Promise<boolean> {
  if (info.hasOutline || !info.clip) return true;
  const shoot = () => page.screenshot({ clip: info.clip!, timeout: 10_000 });
  const focused = await shoot();
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  const blurred = await shoot();
  await page.evaluate((index) => {
    const el = document.querySelector<HTMLElement>(`[data-a11y-tab="${String(index)}"]`);
    el?.focus({ preventScroll: true });
  }, info.index);
  return !focused.equals(blurred);
}

/**
 * Tabs through the page from the top and checks each focused element: it is
 * visible, it shows focus, it is not covered, and focus can move on from it.
 */
export async function walkKeyboard(page: Page): Promise<AuditedViolation[]> {
  const findings = new Findings();
  await installHelpers(page);
  await page.addStyleTag({
    content: '*, *::before, *::after { transition: none !important; animation: none !important; }',
  });
  await resetFocus(page);
  let previous: FocusInfo | null = null;
  let repeats = 0;
  for (let step = 0; step < MAX_TABS; step++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(inspectFocus);
    if (!info) {
      if (previous) break;
      continue;
    }
    if (info.index === previous?.index) {
      // Focus moves inside the iframe or dev tools
      if (info.skip) continue;
      if (++repeats >= 2) {
        findings.add('keyboard-trap', info, 'Tab does not move focus away from this element');
        break;
      }
      continue;
    }
    repeats = 0;
    // Back at the start
    if (info.revisit) break;
    previous = info;
    if (info.skip) continue;
    if (info.hidden) {
      findings.add('focus-hidden', info, 'Takes keyboard focus while hidden or clipped');
      continue;
    }
    if (info.obscuredBy) {
      findings.add('focus-obscured', info, `Covered by ${info.obscuredBy} when focused`);
    }
    // A screenshot that fails tells nothing either way
    if (!(await showsFocus(page, info).catch(() => true))) {
      findings.add('focus-not-visible', info, 'Looks the same with and without focus');
    }
  }
  await page.keyboard.press('Escape');
  return findings.toViolations();
}

/** Checks that the first Tab stop is a skip link that moves focus to its target. */
export async function checkSkipLink(page: Page): Promise<AuditedViolation[]> {
  const findings = new Findings();
  await installHelpers(page);
  await resetFocus(page);
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const href = el.getAttribute('href');
    const isSkipLink = el.tagName === 'A' && !!href && href.startsWith('#') && href.length > 1;
    return { ...window.a11yAudit!.describe(el), href: isSkipLink ? href : null };
  });
  if (!first?.href) {
    findings.add(
      'skip-link',
      first ?? { target: 'body', html: '<body>' },
      'The first Tab stop is not a link within the page'
    );
    return findings.toViolations();
  }
  await page.keyboard.press('Enter');
  const moved = await page.evaluate((href) => {
    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    const active = document.activeElement;
    return !!target && !!active && target.contains(active);
  }, first.href);
  if (!moved) {
    findings.add('skip-link', first, `Activating it does not move focus to ${first.href}`);
  }
  return findings.toViolations();
}

/**
 * Checks focus handling of a dialog that the element matching `trigger` has
 * just opened: focus is in the dialog, Escape closes it, and focus goes back
 * to the trigger. Leaves the dialog closed if Escape works.
 */
export async function checkDialog(
  page: Page,
  dialog: string,
  trigger: string
): Promise<AuditedViolation[]> {
  const findings = new Findings();
  await installHelpers(page);
  const describeFocus = () =>
    page.evaluate(
      ({ dialog, trigger }) => {
        const active = document.activeElement;
        const el = active && active !== document.body ? active : null;
        const dialogEl = document.querySelector(dialog);
        return {
          // MUI focuses the dialog's container, which wraps the dialog
          inDialog: !!el && !!dialogEl && (dialogEl.contains(el) || el.contains(dialogEl)),
          onTrigger: !!el?.closest(trigger),
          ...(el ? window.a11yAudit!.describe(el) : { target: 'body', html: '<body>' }),
        };
      },
      { dialog, trigger }
    );

  const opened = await describeFocus();
  if (!opened.inDialog) {
    findings.add('dialog-focus', opened, 'Focus stays outside the dialog when it opens');
  }
  await page.keyboard.press('Escape');
  try {
    await expect(page.locator(dialog).filter({ visible: true })).toHaveCount(0, { timeout: 5000 });
  } catch {
    findings.add('dialog-escape', { target: dialog, html: '' }, 'Escape does not close the dialog');
    return findings.toViolations();
  }
  // Give focus restoration a moment
  await page.waitForTimeout(300);
  const closed = await describeFocus();
  if (!closed.onTrigger) {
    findings.add(
      'dialog-focus',
      closed,
      'Focus does not go back to the element that opened the dialog when it closes'
    );
  }
  return findings.toViolations();
}

/** Checks for sideways scrolling; call with the viewport set to NARROW_VIEWPORT. */
export async function checkReflow(page: Page): Promise<AuditedViolation[]> {
  const findings = new Findings();
  await installHelpers(page);
  const offenders = await page.evaluate(() => {
    const doc = document.documentElement;
    const width = doc.clientWidth;
    if (doc.scrollWidth <= width + 1) return [];
    const overflows = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.right + window.scrollX > width + 1;
    };
    // A scrolling or clipping ancestor keeps the overflow off the page, but
    // only clips absolutely positioned elements if it is their containing block
    const contained = (el: Element) => {
      let absolute = getComputedStyle(el).position === 'absolute';
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        const s = getComputedStyle(a);
        const containingBlock = s.position !== 'static' || s.transform !== 'none';
        if ((!absolute || containingBlock) && s.overflowX !== 'visible') return true;
        if (containingBlock) absolute = s.position === 'absolute';
      }
      return false;
    };
    const found: { target: string; html: string }[] = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (!overflows(el) || contained(el)) continue;
      if (getComputedStyle(el).position === 'fixed') continue;
      // Only the outermost
      if (el.parentElement && el.parentElement !== document.body && overflows(el.parentElement))
        continue;
      found.push(window.a11yAudit!.describe(el));
    }
    return found.length ? found : [{ target: 'html', html: '<html>' }];
  });
  for (const offender of offenders) {
    findings.add(
      'reflow',
      offender,
      'Reaches past the right edge at 320px. Data tables, maps and charts are exempt.'
    );
  }
  return findings.toViolations();
}

/** Adds a finding to each page that shares its title with another audited page. */
export function checkTitles(pages: AuditedPage[]) {
  const byTitle = new Map<string, AuditedPage[]>();
  for (const page of pages) {
    if (page.state || page.title === undefined) continue;
    byTitle.set(page.title, [...(byTitle.get(page.title) ?? []), page]);
  }
  for (const [title, same] of byTitle) {
    if (same.length < 2) continue;
    for (const page of same) {
      const others = same.filter((p) => p !== page).map((p) => p.name);
      page.violations.push({
        id: 'page-title-unique',
        ...RULES['page-title-unique'],
        nodeCount: 1,
        nodes: [
          {
            target: 'title',
            html: `<title>${title}</title>`,
            failureSummary: `Same as ${others.join(', ')}`,
          },
        ],
      });
    }
  }
}
