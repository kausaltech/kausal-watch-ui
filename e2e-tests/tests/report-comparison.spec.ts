import * as apolloModule from '@apollo/client';
import { type Page, expect } from '@playwright/test';

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
  contentSnippet: string;
};

type StreamNode = {
  __typename: string;
  reportField?: string;
  reportType?: { name: string };
  reportsToCompare?: readonly ReportNode[] | null;
};
type ReportNode = {
  name: string;
  valuesForAction?: readonly ValueNode[] | null;
};
type ValueNode = {
  __typename: string;
  field?: { __typename: string; id?: string | null };
  attribute?: { __typename: string; value?: string | null };
};
type ValuesQueryResult = {
  plan: {
    actionListPage: {
      detailsMainTop?: readonly StreamNode[] | null;
      detailsMainBottom?: readonly StreamNode[] | null;
    } | null;
  } | null;
};

const VALUES_QUERY = gql`
  query PlaywrightReportComparisonValues($plan: ID!, $action: ID!) {
    plan(id: $plan) {
      actionListPage {
        detailsMainTop {
          ... on ReportComparisonBlock {
            reportField
            reportsToCompare {
              name
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
        }
        detailsMainBottom {
          ... on ReportComparisonBlock {
            reportField
            reportsToCompare {
              name
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
        }
      }
    }
  }
`;

function findReportComparisonBlock(ctx: PlanContext): ReportComparisonBlockInfo | null {
  const alp = ctx.plan.actionListPage as unknown as {
    detailsMainTop?: readonly StreamNode[] | null;
    detailsMainBottom?: readonly StreamNode[] | null;
  } | null;
  const streams: readonly StreamNode[] = [
    ...(alp?.detailsMainTop ?? []),
    ...(alp?.detailsMainBottom ?? []),
  ];
  const block = streams.find(
    (b) =>
      b.__typename === 'ReportComparisonBlock' &&
      typeof b.reportField === 'string' &&
      !!b.reportType?.name
  );
  if (!block?.reportField || !block.reportType) return null;
  return { reportField: block.reportField, reportTypeName: block.reportType.name };
}

function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function findActionWithReportData(
  ctx: PlanContext,
  block: ReportComparisonBlockInfo
): Promise<ActionWithData | null> {
  for (const action of ctx.plan.actions) {
    const res = await apolloClient.query<ValuesQueryResult>({
      query: VALUES_QUERY,
      variables: { plan: ctx.plan.identifier, action: action.identifier },
      fetchPolicy: 'no-cache',
    });
    const alp = res.data.plan?.actionListPage;
    const streams: readonly StreamNode[] = [
      ...(alp?.detailsMainTop ?? []),
      ...(alp?.detailsMainBottom ?? []),
    ];
    for (const b of streams) {
      if (b.reportField !== block.reportField) continue;
      for (const report of b.reportsToCompare ?? []) {
        for (const value of report.valuesForAction ?? []) {
          if (value.__typename !== 'ActionAttributeReportValue') continue;
          if (value.field?.id !== block.reportField) continue;
          const raw = value.attribute?.value;
          if (typeof raw !== 'string') continue;
          const stripped = toPlainText(raw);
          if (stripped.length < 12) continue;
          return {
            actionIdentifier: action.identifier,
            reportName: report.name,
            contentSnippet: stripped.slice(0, 40),
          };
        }
      }
    }
  }
  return null;
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

      const match = await findActionWithReportData(ctx, block);
      test.skip(match === null, `No action carries data for report field ${block.reportField}`);
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

      const toggle = page
        .locator('button[class*="ReportComparisonBlock-ToggleButton"]')
        .first();
      await toggle.click();

      // Reactstrap animates the collapse in; wait for the open class before asserting content.
      const openCollapse = page.locator('.collapse.show').first();
      await expect(openCollapse).toBeVisible({ timeout: 5000 });

      const reportField = openCollapse
        .locator('[class*="ReportComparisonBlock-ReportField"]')
        .first();
      await expect(reportField.getByText(match.reportName)).toBeVisible();
      await expect(reportField.getByText(match.contentSnippet)).toBeVisible();
    });
  });
});
