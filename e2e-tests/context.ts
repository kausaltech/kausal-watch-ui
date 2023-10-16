import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Page, expect } from '@playwright/test';
import type {
  PlaywrightGetPlanBasicsQuery,
  PlaywrightGetPlanBasicsQueryVariables,
  PlaywrightGetPlanInfoQuery,
  PlaywrightGetPlanInfoQueryVariables,
} from 'common/__generated__/graphql';

const API_BASE =
  process.env.APLANS_API_BASE_URL || 'https://api.watch.kausal.tech/v1';

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
        items {
          ... on PageMenuItem {
            page {
              id
              title
              slug
              urlPath
            }
          }
        }
      }
    }
  }
`;

type PlanInfo = NonNullable<PlaywrightGetPlanInfoQuery['plan']>;
type ActionInfo = PlanInfo['actions'][0];

export type MainMenuItem = NonNullable<PlanInfo['mainMenu']>['items'][0];
export type PageMenuItem = MainMenuItem & {
  __typename: 'PageMenuItem';
};
export type ActionListMenuItem = PageMenuItem & {
  page: {
    __typename: 'ActionListPage';
  };
};

export class PlanContext {
  plan: PlanInfo;
  baseURL: string;

  constructor(plan: PlanInfo, baseURL: string) {
    this.plan = plan;
    this.baseURL = baseURL;
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

  async checkMeta(page: Page) {
    const siteName = page.locator('head meta[property="og:site_name"]');
    await expect(siteName).toHaveAttribute(
      'content',
      this.plan.generalContent.siteTitle
    );
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
    const baseURL = `http://${planId}.localhost:3000`;
    const res = await apolloClient.query<
      PlaywrightGetPlanInfoQuery,
      PlaywrightGetPlanInfoQueryVariables
    >({
      query: GET_PLAN_INFO,
      variables: { plan: planId, locale: primaryLanguage, clientURL: baseURL },
    });
    const data = res.data!.plan!;
    return new PlanContext(data, baseURL);
  }
}

export function getIdentifiersToTest(): string[] {
  const val = process.env.TEST_PLAN_IDENTIFIERS || '';
  return val.split(',').map((s) => s.trim());
}
