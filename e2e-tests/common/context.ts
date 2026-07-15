import * as apolloModule from '@apollo/client';
import AxeBuilder from '@axe-core/playwright';
import { type ConsoleMessage, type Page, expect } from '@playwright/test';

import type {
  PlaywrightGetPlanBasicsQuery,
  PlaywrightGetPlanBasicsQueryVariables,
  PlaywrightGetPlanInfoQuery,
  PlaywrightGetPlanInfoQueryVariables,
  PlaywrightGetPlansForHostnameQuery,
  PlaywrightGetPlansForHostnameQueryVariables,
} from '../__generated__/graphql.ts';

const { ApolloClient, InMemoryCache, HttpLink, gql } =
  'default' in apolloModule ? (apolloModule.default as typeof apolloModule) : apolloModule;

const GRAPHQL_API_URL = process.env.WATCH_BACKEND_URL
  ? `${process.env.WATCH_BACKEND_URL}/v1/graphql/`
  : 'https://api.watch.kausal.tech/v1/graphql/';
const BASE_URL = process.env.TEST_PAGE_BASE_URL || `http://{planId}.localhost:3000`;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: GRAPHQL_API_URL }),
});

const GET_PLAN_BASICS = gql`
  query PlaywrightGetPlanBasics($plan: ID!) {
    plan(id: $plan) {
      id
      identifier
      primaryLanguage
      otherLanguages
    }
  }
`;

// Used to tell apart two ways `plan(id:)` can come back empty:
//  - the plan genuinely doesn't exist (typo in TEST_PLAN_IDENTIFIERS) → fail
//  - the plan exists and is reachable by hostname, but has no registered
//    domain so the top-level `plan(id:)` resolver returns null (e.g. an
//    indicators-only plan only reachable via the dev wildcard hostname) → skip
const GET_PLANS_FOR_HOSTNAME = gql`
  query PlaywrightGetPlansForHostname($hostname: String) {
    plansForHostname(hostname: $hostname) {
      ... on Plan {
        identifier
      }
    }
  }
`;

const GET_PLAN_INFO = gql`
  query PlaywrightGetPlanInfo($plan: ID!, $locale: String!, $clientURL: String!)
  @locale(lang: $locale) {
    planOrganizations(plan: $plan, forResponsibleParties: true, forContactPersons: true) {
      id
      name
    }
    plan(id: $plan) {
      id
      identifier
      name
      shortName
      primaryLanguage
      otherLanguages
      parent {
        identifier
        name
      }
      generalContent {
        id
        siteTitle
        siteDescription
      }
      actionListPage {
        urlPath
        includeRelatedPlans
      }
      actions(first: 5) {
        identifier
        viewUrl(clientUrl: $clientURL)
      }
      mainMenu {
        items(withDescendants: true) {
          __typename
          ... on PageMenuItem {
            page {
              id
              title
              urlPath
              slug
              showInMenus
              live
            }
            parent {
              id
              page {
                title
                __typename
                showInMenus
                live
              }
            }
            children {
              id
              page {
                __typename
              }
            }
          }
          ... on ExternalLinkMenuItem {
            linkText
            url
          }
        }
      }
    }
    planIndicators(plan: $plan) {
      id
      name
    }
    relatedPlanActions(plan: $plan, first: 5) {
      identifier
      viewUrl(clientUrl: $clientURL)
    }
  }
`;

type PlanInfo = NonNullable<PlaywrightGetPlanInfoQuery['plan']>;
type PlanIndicators = NonNullable<PlaywrightGetPlanInfoQuery['planIndicators']>;
type PlanOrganizations = NonNullable<PlaywrightGetPlanInfoQuery['planOrganizations']>;
type RelatedPlanActions = NonNullable<PlaywrightGetPlanInfoQuery['relatedPlanActions']>;
type ActionInfo = PlanInfo['actions'][0];

export type MainMenuItem = NonNullable<PlanInfo['mainMenu']>['items'][0] & {
  parent: {
    id: string;
    page: {
      __typename: string;
    };
  };
};
export type PageMenuItem = MainMenuItem & {
  __typename: 'PageMenuItem';
};
export type ActionListMenuItem = PageMenuItem & {
  page: {
    __typename: 'ActionListPage';
  };
};
export type CategoryMenuItem = PageMenuItem & {
  page: {
    __typename: 'CategoryPage';
  };
};
export type CategoryTypeMenuItem = PageMenuItem & {
  page: {
    __typename: 'CategoryTypePage';
  };
};
export type EmptyPageMenuItem = PageMenuItem & {
  page: {
    __typename: 'EmptyPage';
  };
};
export type StaticPageMenuItem = PageMenuItem & {
  page: {
    __typename: 'StaticPage';
  };
};
export type IndicatorListMenuItem = PageMenuItem & {
  page: {
    __typename: 'IndicatorListPage';
  };
};

export class PlanContext {
  plan: PlanInfo;
  planOrganizations: PlanOrganizations;
  planIndicators: PlanIndicators;
  relatedPlanActions: RelatedPlanActions;
  baseURL: string;
  failedAssetRequests: string[] = [];

  constructor(
    data: PlaywrightGetPlanInfoQuery,
    baseURL: string,
    planIndicators: PlanIndicators,
    relatedPlanActions: RelatedPlanActions
  ) {
    this.plan = data.plan!;
    this.planOrganizations = data.planOrganizations ?? [];
    this.baseURL = baseURL;
    this.planIndicators = planIndicators;
    this.relatedPlanActions = relatedPlanActions;
  }

  beforeEach(page: Page) {
    this.failedAssetRequests = [];

    // Network-level failures (CORS, DNS, connection errors)
    page.on('requestfailed', (request) => {
      const resourceType = request.resourceType();
      const errorText = request.failure()?.errorText ?? '';
      // ERR_ABORTED and friends are fired when navigation cancels in-flight requests;
      // HTTP-level errors (404, 500) are already caught by the response handler.
      if (
        errorText === 'net::ERR_ABORTED' || // chrome
        errorText === 'NS_BINDING_ABORTED' || // firefox
        errorText === 'Load request cancelled' // webkit
      ) {
        return;
      }
      this.failedAssetRequests.push(
        `${resourceType} failed to load: ${request.url()} (${errorText})`
      );
    });

    // HTTP-level failures (404, 500, etc.)
    page.on('response', (response) => {
      const request = response.request();
      const resourceType = request.resourceType();
      const status = response.status();
      if (status >= 200 && status < 400) {
        return;
      }
      this.failedAssetRequests.push(
        `${resourceType} returned HTTP ${response.status()}: ${request.url()}`
      );
    });

    // Unhandled exceptions
    page.on('pageerror', (exception) => {
      throw new Error(exception.toString());
    });

    page.on('console', (msg) => {
      const IGNORE_STARTSWITH = [
        'Public environment',
        '[Client Instrumentation Hook]',
        'Maximum update depth exceeded',
      ];
      const IGNORE_INCLUDES = [
        'Download the React DevTools',
        '[Fast Refresh]',
        'Failed to initialize WebGL',
        'Download the Apollo DevTools',
      ];
      const text = msg.text();
      if (
        IGNORE_STARTSWITH.some((startsWith) => text.startsWith(startsWith)) ||
        IGNORE_INCLUDES.some((includes) => text.includes(includes))
      )
        return;
      console.log(`Console message (${msg.type()}):\n`, msg);
      if (false) {
        // todo: enable this later
        throw new Error('Test produced console output');
      }
    });
  }

  getActionListMenuItem(): ActionListMenuItem | null {
    function isActionList(item: MainMenuItem): item is ActionListMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'ActionListPage') return false;
      if (!item.page.showInMenus) return false;
      return true;
    }
    const item = (this.plan.mainMenu?.items ?? []).find(isActionList) || null;
    return item;
  }

  getActionURL(action: ActionInfo) {
    return action.viewUrl;
  }

  getCategoryTypeMenuItem(): CategoryTypeMenuItem | null {
    function isCategoryType(item: MainMenuItem): item is CategoryTypeMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'CategoryTypePage') return false;
      return true;
    }
    const item = (this.plan.mainMenu?.items ?? []).find(isCategoryType) || null;
    return item;
  }

  getCategoryMenuItems(parentId: string | null | undefined): CategoryMenuItem[] {
    if (!parentId) return [];

    function isCategoryItem(item: MainMenuItem): item is CategoryMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'CategoryPage') return false;
      if (item.parent.id !== parentId) return false;
      return true;
    }
    const items = (this.plan.mainMenu?.items ?? []).filter(isCategoryItem) || [];
    return items;
  }

  getEmptyPageMenuItem(): EmptyPageMenuItem | null {
    function isEmptyPageType(item: MainMenuItem): item is EmptyPageMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'EmptyPage') return false;
      return true;
    }
    const item = (this.plan.mainMenu?.items ?? []).find(isEmptyPageType) || null;
    return item;
  }

  getEmptyPageChildrenItems(
    parentId: string | null | undefined
  ): Array<CategoryMenuItem | StaticPageMenuItem> {
    if (!parentId) return [];

    function isEmptyPageChildItem(
      item: MainMenuItem
    ): item is CategoryMenuItem | StaticPageMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.parent?.id !== parentId) return false;
      return item.page.__typename === 'CategoryPage' || item.page.__typename === 'StaticPage';
    }

    const items = (this.plan.mainMenu?.items ?? []).filter(isEmptyPageChildItem) || [];
    return items;
  }

  getStaticPageMenuItems(): StaticPageMenuItem[] {
    function isStaticPageItem(item: MainMenuItem): item is StaticPageMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'StaticPage') return false;
      if (item.children?.length) return false;
      if (!item.page.showInMenus || !item.page.live) return false;
      if (item.parent?.page && (!item.parent.page.showInMenus || !item.parent.page.live))
        return false;
      //if (item.parent.page.__typename !== 'PlanRootPage') return false;
      return true;
    }
    const items = (this.plan.mainMenu?.items ?? []).filter(isStaticPageItem) || [];
    return items;
  }

  getIndicatorListMenuItem(): IndicatorListMenuItem | null {
    function isIndicatorList(item: MainMenuItem): item is IndicatorListMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'IndicatorListPage') return false;
      return true;
    }
    const item = (this.plan.mainMenu?.items ?? []).find(isIndicatorList) || null;
    return item;
  }

  getPlanIndicators(): PlanIndicators {
    return this.planIndicators;
  }

  async checkMeta(page: Page) {
    const siteName = page.locator('meta[property="og:site_name"]');
    await expect(siteName).toBeAttached();
    if (this.plan.parent?.name) {
      await expect(siteName).toHaveAttribute('content', this.plan.parent?.name);
    } else {
      const expected = this.plan.generalContent.siteTitle || this.plan.name;
      await expect(siteName).toHaveAttribute('content', expected);
    }
  }

  static getBaseURL(planId: string) {
    return getPageBaseUrlToTest(planId);
  }

  /**
   * Build a PlanContext for the given plan, or return `null` when the plan
   * cannot be rendered standalone even though it exists (see
   * {@link resolvesViaHostname}). Callers should skip such plans with a
   * warning rather than failing. A plan that exists by neither `plan(id:)`
   * nor hostname resolution throws, since that indicates a misconfigured
   * TEST_PLAN_IDENTIFIERS entry.
   */
  static async fromPlanId(planId: string): Promise<PlanContext | null> {
    const langRes = await apolloClient.query<
      PlaywrightGetPlanBasicsQuery,
      PlaywrightGetPlanBasicsQueryVariables
    >({
      query: GET_PLAN_BASICS,
      variables: { plan: planId },
    });

    if (!langRes.data.plan) {
      if (await resolvesViaHostname(planId)) {
        console.warn(
          `⚠️  Skipping plan "${planId}": it resolves via plansForHostname but not ` +
            `via plan(id:) (likely no registered domain), so it cannot be rendered ` +
            `standalone. This is expected for some plans and is not a test failure.`
        );
        return null;
      }
      throw new Error(
        `Plan "${planId}" could not be resolved by plan(id:) or by hostname. ` +
          `Check the TEST_PLAN_IDENTIFIERS environment variable.`
      );
    }

    const primaryLanguage = langRes.data.plan.primaryLanguage;
    const baseURL = getPageBaseUrlToTest(planId);
    const res = await apolloClient.query<
      PlaywrightGetPlanInfoQuery,
      PlaywrightGetPlanInfoQueryVariables
    >({
      query: GET_PLAN_INFO,
      variables: { plan: planId, locale: primaryLanguage, clientURL: baseURL },
    });
    const data = res.data;
    const planIndicators = res.data.planIndicators!;
    const relatedPlanActions = res.data.relatedPlanActions!;
    return new PlanContext(data, baseURL, planIndicators, relatedPlanActions);
  }

  async waitForLoadingFinished(page: Page) {
    await expect(page.locator('*[aria-busy=true]')).toHaveCount(0, { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    expect(this.failedAssetRequests, 'Some assets failed to load').toEqual([]);
  }

  async checkAccessibility(page: Page) {
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page }).analyze();
    const violationsToIgnore = ['frame-title'];
    const criticalAndSeriousViolations = results.violations.filter(
      (violation) =>
        (violation.impact === 'critical' || violation.impact === 'serious') &&
        !violationsToIgnore.includes(violation.id)
    );

    if (criticalAndSeriousViolations.length > 0) {
      console.error('Critical and serious accessibility violations:', criticalAndSeriousViolations);
    }
    //expect(criticalAndSeriousViolations).toEqual([]);
  }
}

export function getIdentifiersToTest(): string[] {
  const val = process.env.TEST_PLAN_IDENTIFIERS || '';
  return val.split(',').map((s) => s.trim());
}

export function getPageBaseUrlToTest(planId: string): string {
  let baseUrl = BASE_URL;
  baseUrl = baseUrl.replace('{planId}', planId);
  // strip tailing slash
  baseUrl = baseUrl.replace(/\/$/, '');
  return baseUrl;
}

/**
 * Check whether a plan is resolvable via `plansForHostname` for its test
 * hostname. The dev/test setup serves each plan at `<planId>.<wildcard>`
 * (e.g. `sunnydale.localhost`), so we resolve the hostname from the plan's
 * base URL and pass the parent domain as the wildcard-domains header — the
 * same mechanism the app's middleware uses.
 */
async function resolvesViaHostname(planId: string): Promise<boolean> {
  let hostname: string;
  try {
    hostname = new URL(getPageBaseUrlToTest(planId)).hostname;
  } catch {
    return false;
  }
  // For `foo.localhost` the wildcard domain is `localhost`; empty when the
  // hostname has no parent label (e.g. plain `localhost`).
  const wildcardDomain = hostname.split('.').slice(1).join('.');

  try {
    const res = await apolloClient.query<
      PlaywrightGetPlansForHostnameQuery,
      PlaywrightGetPlansForHostnameQueryVariables
    >({
      query: GET_PLANS_FOR_HOSTNAME,
      variables: { hostname },
      fetchPolicy: 'no-cache',
      context: wildcardDomain ? { headers: { 'x-wildcard-domains': wildcardDomain } } : undefined,
    });
    return (res.data.plansForHostname ?? []).some(
      (plan) => plan && 'identifier' in plan && plan.identifier === planId
    );
  } catch {
    return false;
  }
}

export function displayConfiguration() {
  const p = (s: string) => (s + ':').padEnd(22);

  console.log(p('GraphQL URL'), GRAPHQL_API_URL);
  console.log(p('Instances to test'), getIdentifiersToTest().join(', '));
  console.log(p('Base URL'), BASE_URL);
  console.log(p('  URL for Sunnydale'), getPageBaseUrlToTest('sunnydale'));
}
