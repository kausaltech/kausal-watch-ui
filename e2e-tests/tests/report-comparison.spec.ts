import * as apolloModule from '@apollo/client';
import { type Page, expect } from '@playwright/test';

import type {
  PlaywrightReportComparisonValuesQuery,
  ReportComparisonProbeFragment,
  ReportComparisonValuesFragment,
} from '../__generated__/graphql.ts';
import {
  PlanContext,
  apolloClient,
  getIdentifiersToTest,
  getPageBaseUrlToTest,
} from '../common/context.ts';
import { test as coverageTest } from '../common/coverage.ts';

const { gql } =
  'default' in apolloModule ? (apolloModule.default as typeof apolloModule) : apolloModule;

type ReportComparisonBlockInfo = { reportField: string; reportTypeName: string };
type ActionWithData = {
  actionIdentifier: string;
  reportName: string;
  /** ISO dates; only the years are used, being the one locale-stable part of the rendering. */
  reportStartDate: string;
  reportEndDate: string;
  /** Exactly the text asserted on, derived in the browser during discovery. */
  contentSnippet: string;
};

/**
 * Discovery and the assertion must agree on what counts as enough text, and must
 * measure it the same way. A whole-value character count disagrees with the rendered
 * line on content split into short paragraphs or list items, and counts entities like
 * `&nbsp;` that the browser renders away.
 */
const MIN_SNIPPET_LENGTH = 12;
const SNIPPET_LENGTH = 40;

/**
 * The two queries select different fields from ReportComparisonBlock, so the traversal is
 * generic over whichever generated fragment the caller asked for. Everything it walks past
 * is irrelevant here (18 union members at the root, 136 when nested), so those stay
 * structural; the blocks it yields are typed by codegen, and a fragment change breaks the
 * consumers instead of drifting silently.
 */
type AnyBlock = { __typename: string };
type SectionOf<F> = AnyBlock & { blocks?: readonly (F | AnyBlock | null)[] | null };
type StreamNodeOf<F> = F | SectionOf<F> | AnyBlock;
type ValuesQueryResult = PlaywrightReportComparisonValuesQuery;

const REPORT_COMPARISON_VALUES_FRAGMENT = gql`
  fragment ReportComparisonValues on ReportComparisonBlock {
    reportField
    reportsToCompare {
      name
      startDate
      endDate
      valuesForAction(actionIdentifier: $action) {
        __typename
        ... on ActionAttributeReportValue {
          field {
            __typename
            ... on StreamFieldInterface {
              id
            }
          }
          attribute {
            __typename
            ... on AttributeRichText {
              value
            }
            ... on AttributeText {
              value
            }
          }
        }
      }
    }
  }
`;

// Mirrors the production layouts in src/queries/get-action.ts: the block may sit at the
// top level of the stream or nested inside an ActionContentSectionBlock.
const VALUES_QUERY = gql`
  ${REPORT_COMPARISON_VALUES_FRAGMENT}
  query PlaywrightReportComparisonValues($plan: ID!, $action: ID!) {
    plan(id: $plan) {
      actionListPage {
        detailsMainTop {
          __typename
          ...ReportComparisonValues
          ... on ActionContentSectionBlock {
            blocks {
              __typename
              ...ReportComparisonValues
            }
          }
        }
        detailsMainBottom {
          __typename
          ...ReportComparisonValues
          ... on ActionContentSectionBlock {
            blocks {
              __typename
              ...ReportComparisonValues
            }
          }
        }
      }
    }
  }
`;

type ActionListPageStreams<F> = {
  detailsMainTop?: readonly (StreamNodeOf<F> | null)[] | null;
  detailsMainBottom?: readonly (StreamNodeOf<F> | null)[] | null;
} | null;

/** Every ReportComparisonBlock in the stream, including ones nested inside content sections. */
function collectReportComparisonBlocks<F extends AnyBlock>(
  alp: ActionListPageStreams<F> | undefined
): F[] {
  const roots = [...(alp?.detailsMainTop ?? []), ...(alp?.detailsMainBottom ?? [])];
  return roots.flatMap((node) => {
    if (node === null) return [];
    if (node.__typename === 'ReportComparisonBlock') return [node as F];
    // Only section blocks carry `blocks`; reading it structurally keeps the traversal
    // independent of which of the 136 nested union members we are looking at.
    const nested = (node as SectionOf<F>).blocks ?? [];
    return nested.filter((child): child is F => child?.__typename === 'ReportComparisonBlock');
  });
}

function findReportComparisonBlock(ctx: PlanContext): ReportComparisonBlockInfo | null {
  const alp: ActionListPageStreams<ReportComparisonProbeFragment> = ctx.plan.actionListPage;
  const block = collectReportComparisonBlocks(alp).find(
    (b) => typeof b.reportField === 'string' && !!b.reportType?.name
  );
  if (!block?.reportField || !block.reportType) return null;
  return { reportField: block.reportField, reportTypeName: block.reportType.name };
}

/**
 * Longest single rendered line of a rich-text value, using the browser as the oracle.
 *
 * Two reasons not to do this with regex in node. Entities: an `&amp;` left encoded
 * would never match the `&` the browser exposes. Block boundaries: `getByText` matches
 * within one element, so a snippet spanning two paragraphs matches nothing. `innerText`
 * separates blocks with newlines, so taking one line keeps the snippet inside one block.
 */
async function longestRenderedLine(page: Page, html: string): Promise<string> {
  return page.evaluate((raw) => {
    const el = document.createElement('div');
    el.innerHTML = raw;
    document.body.appendChild(el);
    const text = el.innerText;
    el.remove();
    const lines = text.split('\n').map((line) => line.replace(/\s+/g, ' ').trim());
    return lines.reduce((longest, line) => (line.length > longest.length ? line : longest), '');
  }, html);
}

async function findActionWithReportData(
  page: Page,
  ctx: PlanContext,
  block: ReportComparisonBlockInfo
): Promise<ActionWithData | null> {
  for (const action of ctx.plan.actions) {
    const res = await apolloClient.query<ValuesQueryResult>({
      query: VALUES_QUERY,
      variables: { plan: ctx.plan.identifier, action: action.identifier },
      fetchPolicy: 'no-cache',
    });
    const streams: ActionListPageStreams<ReportComparisonValuesFragment> | undefined =
      res.data.plan?.actionListPage;
    for (const b of collectReportComparisonBlocks(streams)) {
      if (b.reportField !== block.reportField) continue;
      for (const report of b.reportsToCompare ?? []) {
        if (report === null) continue;
        for (const value of report.valuesForAction ?? []) {
          if (value.__typename !== 'ActionAttributeReportValue') continue;
          if (value.field.id !== block.reportField) continue;
          // Only the text-bearing attribute types carry `value`; the union also covers
          // choice and category attributes, which have no rich text to assert on.
          const attribute = value.attribute;
          const raw =
            attribute?.__typename === 'AttributeRichText' ||
            attribute?.__typename === 'AttributeText'
              ? attribute.value
              : null;
          if (typeof raw !== 'string') continue;
          const snippet = (await longestRenderedLine(page, raw)).slice(0, SNIPPET_LENGTH);
          // Too little rendered text to assert on distinctly; try the next report or action
          // rather than returning a match the assertion would then fail on.
          if (snippet.length < MIN_SNIPPET_LENGTH) continue;
          return {
            actionIdentifier: action.identifier,
            reportName: report.name,
            reportStartDate: report.startDate,
            reportEndDate: report.endDate,
            contentSnippet: snippet,
          };
        }
      }
    }
  }
  return null;
}

/** Regex matching the whole trimmed text of an element, so one name cannot match a longer one. */
function exactly(text: string): RegExp {
  return new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);
}

async function dismissIntroModal(page: Page): Promise<void> {
  const modalLocator = page.getByTestId('intro-modal');
  if ((await modalLocator.count()) === 0) return;
  await modalLocator.getByTestId('intro-modal-no-show').click();
  await modalLocator.getByRole('button').click();
  await expect(modalLocator).toBeHidden({ timeout: 1000 });
}

const test = coverageTest;

getIdentifiersToTest().forEach((planId) => {
  test.describe(`${planId} report comparison`, () => {
    test('renders live report data on an action detail page', async ({ page }) => {
      // Discovery does up to N GraphQL round-trips against a remote backend before
      // the browser work starts; give the whole test more than the 30s default.
      test.setTimeout(90000);
      const ctx = await PlanContext.fromPlanId(planId);
      const block = findReportComparisonBlock(ctx);
      test.skip(block === null, 'Plan has no ReportComparisonBlock configured');
      if (block === null) return;

      // Discovery runs before navigation, deriving its snippet while the page is blank.
      const match = await findActionWithReportData(page, ctx, block);
      test.skip(
        match === null,
        `No action renders at least ${String(MIN_SNIPPET_LENGTH)} characters for report field ${block.reportField}`
      );
      if (match === null) return;

      const baseURL = getPageBaseUrlToTest(planId);
      await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
      await dismissIntroModal(page);

      // Deliberately ignore action.viewUrl: the backend returns it with the plan's
      // production hostname, which would send the test to the live site rather than
      // the dev server under test.
      await page.goto(`${baseURL}/actions/${match.actionIdentifier}`, {
        waitUntil: 'domcontentloaded',
      });

      const heading = page.getByRole('heading', {
        name: block.reportTypeName,
        level: 2,
      });
      await expect(heading).toBeVisible({ timeout: 15000 });

      // Wait for hydration so the toggle's React onClick is bound.
      await page.waitForLoadState('networkidle');

      const toggle = page.locator('button[class*="ReportComparisonBlock-ToggleButton"]').first();
      await toggle.click();

      // Reactstrap animates the collapse in; wait for the open class before asserting content.
      const openCollapse = page.locator('.collapse.show').first();
      await expect(openCollapse).toBeVisible({ timeout: 5000 });

      // Identify the card by name and date range. The probed report need not render first:
      // the backend orders reportsToCompare by start date, the component re-sorts by end
      // date, and reports with no data still render a card. Names are not identities either
      // (the component keys cards by identifier, which it does not put in the DOM), so two
      // reports may share one; the rendered date range distinguishes them. A substring
      // `hasText` over the whole card would additionally match a card whose name merely
      // extends this one, or whose body happens to quote it.
      const exactReportName = page
        .locator('[class*="ReportComparisonBlock-ReportName"]')
        .filter({ hasText: exactly(match.reportName) });
      // dayjs renders the dates in the plan's locale, so only the years are stable enough
      // to match on. Two same-named reports would have to share both to stay ambiguous.
      const reportDates = page
        .locator('[class*="ReportComparisonBlock-ReportDate"]')
        .filter({ hasText: match.reportStartDate.slice(0, 4) })
        .filter({ hasText: match.reportEndDate.slice(0, 4) });
      // The wrapper is excluded by name: ReportFieldComparison contains ReportField.
      const reportCard = openCollapse
        .locator(
          '[class*="ReportComparisonBlock-ReportField"]:not([class*="ReportFieldComparison"])'
        )
        .filter({ has: exactReportName })
        .filter({ has: reportDates });
      await expect(reportCard).toHaveCount(1);
      await expect(reportCard.getByText(match.contentSnippet)).toBeVisible();
    });
  });
});
