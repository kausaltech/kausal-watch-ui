/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type PlaywrightGetPlanBasicsQuery_plan = { __typename: 'Plan', id: string, identifier: string, primaryLanguage: string, otherLanguages: Array<string> };

export type PlaywrightGetPlanBasicsQuery = { __typename: 'Query', plan: PlaywrightGetPlanBasicsQuery_plan | null };


export type PlaywrightGetPlanBasicsQueryVariables = Exact<{
  plan: string | number;
}>;

export type PlaywrightGetPlanInfoQuery_planOrganizations = { __typename: 'Organization', id: string, name: string };

export type PlaywrightGetPlanInfoQuery_plan_parent = { __typename: 'Plan', identifier: string, name: string };

export type PlaywrightGetPlanInfoQuery_plan_generalContent = { __typename: 'SiteGeneralContent', id: string, siteTitle: string, siteDescription: string };

export type PlaywrightGetPlanInfoQuery_plan_actionListPage = { __typename: 'ActionListPage', urlPath: string, includeRelatedPlans: boolean | null };

export type PlaywrightGetPlanInfoQuery_plan_actions = { __typename: 'Action', identifier: string, viewUrl: string };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_Page = { __typename: 'Page', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_StaticPage = { __typename: 'StaticPage', id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page =
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_AccessibilityStatementPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_ActionListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_CategoryPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_CategoryTypePage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_EmptyPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_ImpactGroupPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_IndicatorListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_Page
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_PlanRootPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_PledgeListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_PrivacyPolicyPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page_StaticPage
;

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_ActionListPage = { __typename: 'ActionListPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryPage = { __typename: 'CategoryPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryTypePage = { __typename: 'CategoryTypePage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_EmptyPage = { __typename: 'EmptyPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_IndicatorListPage = { __typename: 'IndicatorListPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_Page = { __typename: 'Page', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_PlanRootPage = { __typename: 'PlanRootPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_PledgeListPage = { __typename: 'PledgeListPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_StaticPage = { __typename: 'StaticPage', title: string, showInMenus: boolean, live: boolean };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page =
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_AccessibilityStatementPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_ActionListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryTypePage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_EmptyPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_ImpactGroupPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_IndicatorListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_Page
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_PlanRootPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_PledgeListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_PrivacyPolicyPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page_StaticPage
;

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent = { __typename: 'PageMenuItem', id: string, page: PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent_page };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_ActionListPage = { __typename: 'ActionListPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_CategoryPage = { __typename: 'CategoryPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_CategoryTypePage = { __typename: 'CategoryTypePage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_EmptyPage = { __typename: 'EmptyPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_ImpactGroupPage = { __typename: 'ImpactGroupPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_IndicatorListPage = { __typename: 'IndicatorListPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_Page = { __typename: 'Page' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_PlanRootPage = { __typename: 'PlanRootPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_PledgeListPage = { __typename: 'PledgeListPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_StaticPage = { __typename: 'StaticPage' };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page =
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_AccessibilityStatementPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_ActionListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_CategoryPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_CategoryTypePage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_EmptyPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_ImpactGroupPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_IndicatorListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_Page
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_PlanRootPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_PledgeListPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_PrivacyPolicyPage
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page_StaticPage
;

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children = { __typename: 'PageMenuItem', id: string, page: PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children_page };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_ExternalLinkMenuItem = { __typename: 'ExternalLinkMenuItem', linkText: string, url: string };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem = { __typename: 'PageMenuItem', page: PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_page, parent: PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_parent | null, children: Array<PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem_children> | null };

export type PlaywrightGetPlanInfoQuery_plan_mainMenu_items =
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_ExternalLinkMenuItem
  | PlaywrightGetPlanInfoQuery_plan_mainMenu_items_PageMenuItem
;

export type PlaywrightGetPlanInfoQuery_plan_mainMenu = { __typename: 'MainMenu', items: Array<PlaywrightGetPlanInfoQuery_plan_mainMenu_items> };

export type PlaywrightGetPlanInfoQuery_plan = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, primaryLanguage: string, otherLanguages: Array<string>, parent: PlaywrightGetPlanInfoQuery_plan_parent | null, generalContent: PlaywrightGetPlanInfoQuery_plan_generalContent, actionListPage: PlaywrightGetPlanInfoQuery_plan_actionListPage | null, actions: Array<PlaywrightGetPlanInfoQuery_plan_actions>, mainMenu: PlaywrightGetPlanInfoQuery_plan_mainMenu | null };

export type PlaywrightGetPlanInfoQuery_planIndicators = { __typename: 'Indicator', id: string, name: string };

export type PlaywrightGetPlanInfoQuery_relatedPlanActions = { __typename: 'Action', identifier: string, viewUrl: string };

export type PlaywrightGetPlanInfoQuery = { __typename: 'Query', planOrganizations: Array<PlaywrightGetPlanInfoQuery_planOrganizations> | null, plan: PlaywrightGetPlanInfoQuery_plan | null, planIndicators: Array<PlaywrightGetPlanInfoQuery_planIndicators> | null, relatedPlanActions: Array<PlaywrightGetPlanInfoQuery_relatedPlanActions> | null };


export type PlaywrightGetPlanInfoQueryVariables = Exact<{
  plan: string | number;
  locale: string;
  clientURL: string;
}>;
