import * as apolloModule from '@apollo/client';
import AxeBuilder from '@axe-core/playwright';
import { type Page, expect } from '@playwright/test';

import type {
  PlaywrightGetPlanBasicsQuery,
  PlaywrightGetPlanBasicsQueryVariables,
  PlaywrightGetPlanInfoQuery,
  PlaywrightGetPlanInfoQueryVariables,
} from '../__generated__/graphql.ts';

const { ApolloClient, InMemoryCache, gql } =
  'default' in apolloModule ? (apolloModule.default as typeof apolloModule) : apolloModule;

const GRAPHQL_API_URL = process.env.WATCH_BACKEND_URL
  ? `${process.env.WATCH_BACKEND_URL}/v1/graphql/`
  : 'https://api.watch.kausal.tech/v1/graphql/';
const BASE_URL = process.env.TEST_PAGE_BASE_URL || `http://{planId}.localhost:3000`;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPHQL_API_URL,
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
            }
            parent {
              id
              page {
                title
                __typename
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
  }
`;

type PlanInfo = NonNullable<PlaywrightGetPlanInfoQuery['plan']>;
type PlanIndicators = NonNullable<PlaywrightGetPlanInfoQuery['planIndicators']>;
type PlanOrganizations = NonNullable<PlaywrightGetPlanInfoQuery['planOrganizations']>;
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
  baseURL: string;

  constructor(data: PlaywrightGetPlanInfoQuery, baseURL: string, planIndicators: PlanIndicators) {
    this.plan = data.plan!;
    this.planOrganizations = data.planOrganizations ?? [];
    this.baseURL = baseURL;
    this.planIndicators = planIndicators;
  }

  getActionListMenuItem(): ActionListMenuItem | null {
    function isActionList(item: MainMenuItem): item is ActionListMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'ActionListPage') return false;
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

  getStaticPageMenuItem(): StaticPageMenuItem[] {
    function isStaticPageItem(item: MainMenuItem): item is StaticPageMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'StaticPage') return false;
      if (item.children?.length) return false;
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
      await expect(siteName).toHaveAttribute('content', this.plan.generalContent.siteTitle);
    }
  }

  static async fromPlanId(planId: string) {
    const langRes = await apolloClient.query<
      PlaywrightGetPlanBasicsQuery,
      PlaywrightGetPlanBasicsQueryVariables
    >({
      query: GET_PLAN_BASICS,
      variables: { plan: planId },
    });
    const primaryLanguage = langRes.data.plan!.primaryLanguage;
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
    return new PlanContext(data, baseURL, planIndicators);
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
  return baseUrl;
}

export function displayConfiguration() {
  const p = (s: string) => (s + ':').padEnd(22);

  console.log(p('GraphQL URL'), GRAPHQL_API_URL);
  console.log(p('Instances to test'), getIdentifiersToTest().join(', '));
  console.log(p('Base URL'), BASE_URL);
  console.log(p('  URL for Sunnydale'), getPageBaseUrlToTest('sunnydale'));
}
