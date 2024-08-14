import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import AxeBuilder from '@axe-core/playwright';
import { expect, Page } from '@playwright/test';
import type {
  PlaywrightGetPlanBasicsQuery,
  PlaywrightGetPlanBasicsQueryVariables,
  PlaywrightGetPlanInfoQuery,
  PlaywrightGetPlanInfoQueryVariables,
} from 'common/__generated__/graphql';

import { apiUrl } from '@/common/environment';

const API_BASE = apiUrl;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: API_BASE + '/graphql/',
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
  planIndicators: PlanIndicators;
  baseURL: string;

  constructor(plan: PlanInfo, baseURL: string, planIndicators: PlanIndicators) {
    this.plan = plan;
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

  getCategoryMenuItems(
    parentId: string | null | undefined
  ): CategoryMenuItem[] {
    if (!parentId) return [];

    function isCategoryItem(item: MainMenuItem): item is CategoryMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'CategoryPage') return false;
      if (item.parent.id !== parentId) return false;
      return true;
    }
    const items =
      (this.plan.mainMenu?.items ?? []).filter(isCategoryItem) || [];
    return items;
  }

  getEmptyPageMenuItem(): EmptyPageMenuItem | null {
    function isEmptyPageType(item: MainMenuItem): item is EmptyPageMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'EmptyPage') return false;
      return true;
    }
    const item =
      (this.plan.mainMenu?.items ?? []).find(isEmptyPageType) || null;
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
      return (
        item.page.__typename === 'CategoryPage' ||
        item.page.__typename === 'StaticPage'
      );
    }

    const items =
      (this.plan.mainMenu?.items ?? []).filter(isEmptyPageChildItem) || [];
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
    const items =
      (this.plan.mainMenu?.items ?? []).filter(isStaticPageItem) || [];
    return items;
  }

  getIndicatorListMenuItem(): IndicatorListMenuItem | null {
    function isIndicatorList(
      item: MainMenuItem
    ): item is IndicatorListMenuItem {
      if (item?.__typename !== 'PageMenuItem') return false;
      if (item.page.__typename !== 'IndicatorListPage') return false;
      return true;
    }
    const item =
      (this.plan.mainMenu?.items ?? []).find(isIndicatorList) || null;
    return item;
  }

  getPlanIndicators(): PlanIndicators {
    return this.planIndicators;
  }

  async checkMeta(page: Page) {
    const siteName = page.locator('head meta[property="og:site_name"]');
    if (this.plan.parent?.name) {
      await expect(siteName).toHaveAttribute('content', this.plan.parent?.name);
    } else {
      await expect(siteName).toHaveAttribute(
        'content',
        this.plan.generalContent.siteTitle
      );
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
    const primaryLanguage = langRes.data!.plan!.primaryLanguage;
    const baseURL = getPageBaseUrlToTest(planId);
    const res = await apolloClient.query<
      PlaywrightGetPlanInfoQuery,
      PlaywrightGetPlanInfoQueryVariables
    >({
      query: GET_PLAN_INFO,
      variables: { plan: planId, locale: primaryLanguage, clientURL: baseURL },
    });
    const data = res.data!.plan!;
    const planIndicators = res.data!.planIndicators!;
    return new PlanContext(data, baseURL, planIndicators);
  }
}

export async function checkAccessibility(page: Page) {
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page }).analyze();
  const violationsToIgnore = ['frame-title'];
  const criticalAndSeriousViolations = results.violations.filter(
    (violation) =>
      (violation.impact === 'critical' || violation.impact === 'serious') &&
      !violationsToIgnore.includes(violation.id)
  );

  if (criticalAndSeriousViolations.length > 0) {
    console.error(
      'Critical and serious accessibility violations:',
      criticalAndSeriousViolations
    );

    expect(criticalAndSeriousViolations).toEqual([]);
  }
}

export function getIdentifiersToTest(): string[] {
  const val = process.env.TEST_PLAN_IDENTIFIERS || '';
  return val.split(',').map((s) => s.trim());
}

export function getPageBaseUrlToTest(planId: string): string {
  let baseUrl =
    process.env.TEST_PAGE_BASE_URL ||
    `http://{planId}.watch.staging.kausal.tech`;
  baseUrl = baseUrl.replace('{planId}', planId);
  return baseUrl;
}
