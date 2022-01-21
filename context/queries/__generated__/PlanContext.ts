/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlanContext
// ====================================================

export interface PlanContext_plan_domain {
  __typename: "PlanDomain";
  id: string;
  googleSiteVerificationTag: string | null;
  matomoAnalyticsUrl: string | null;
}

export interface PlanContext_plan_image_large {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_plan_image_small {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_plan_image_social {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_plan_image_rendition {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_plan_image {
  __typename: "Image";
  title: string;
  altText: string;
  imageCredit: string;
  width: number;
  height: number;
  focalPointX: number | null;
  focalPointY: number | null;
  large: PlanContext_plan_image_large | null;
  small: PlanContext_plan_image_small | null;
  social: PlanContext_plan_image_social | null;
  rendition: PlanContext_plan_image_rendition | null;
}

export interface PlanContext_plan_actionSchedules {
  __typename: "ActionSchedule";
  id: string;
  name: string;
  beginsAt: any;
  endsAt: any | null;
}

export interface PlanContext_plan_actionImplementationPhases {
  __typename: "ActionImplementationPhase";
  id: string;
  identifier: string;
  name: string;
  order: number;
}

export interface PlanContext_plan_actionImpacts {
  __typename: "ActionImpact";
  id: string;
  identifier: string;
  name: string;
  order: number;
}

export interface PlanContext_plan_actionStatuses {
  __typename: "ActionStatus";
  id: string;
  identifier: string;
  name: string;
  isCompleted: boolean;
}

export interface PlanContext_plan_impactGroups {
  __typename: "ImpactGroup";
  id: string;
}

export interface PlanContext_plan_primaryOrgs {
  __typename: "Organization";
  id: string;
}

export interface PlanContext_plan_generalContent {
  __typename: "SiteGeneralContent";
  id: string;
  siteTitle: string;
  siteDescription: string;
  /**
   * The text to show when displaying official content
   */
  officialNameDescription: string;
  copyrightText: string;
  /**
   * If the site is under a Creative Commons license, which CC license it is
   */
  creativeCommonsLicense: string;
  ownerUrl: string;
  ownerName: string;
}

export interface PlanContext_plan_mainMenu_items_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage";
  urlPath: string;
  slug: string;
}

export interface PlanContext_plan_mainMenu_items_parent_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage";
}

export interface PlanContext_plan_mainMenu_items_parent {
  __typename: "MenuItem";
  id: string;
  page: PlanContext_plan_mainMenu_items_parent_page | null;
}

export interface PlanContext_plan_mainMenu_items {
  __typename: "MenuItem";
  id: string;
  linkText: string;
  page: PlanContext_plan_mainMenu_items_page | null;
  parent: PlanContext_plan_mainMenu_items_parent | null;
}

export interface PlanContext_plan_mainMenu {
  __typename: "MainMenu";
  items: (PlanContext_plan_mainMenu_items | null)[];
}

export interface PlanContext_plan_footer_items_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage";
  urlPath: string;
  slug: string;
}

export interface PlanContext_plan_footer_items_parent_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage";
}

export interface PlanContext_plan_footer_items_parent {
  __typename: "MenuItem";
  id: string;
  page: PlanContext_plan_footer_items_parent_page | null;
}

export interface PlanContext_plan_footer_items_children_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage";
  urlPath: string;
  slug: string;
}

export interface PlanContext_plan_footer_items_children {
  __typename: "MenuItem";
  id: string;
  linkText: string;
  page: PlanContext_plan_footer_items_children_page | null;
}

export interface PlanContext_plan_footer_items {
  __typename: "MenuItem";
  id: string;
  linkText: string;
  page: PlanContext_plan_footer_items_page | null;
  parent: PlanContext_plan_footer_items_parent | null;
  children: (PlanContext_plan_footer_items_children | null)[] | null;
}

export interface PlanContext_plan_footer {
  __typename: "Footer";
  items: (PlanContext_plan_footer_items | null)[];
}

export interface PlanContext_plan {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  primaryLanguage: string;
  otherLanguages: string[] | null;
  /**
   * Set if the plan doesn't have meaningful action identifiers
   */
  hideActionIdentifiers: boolean;
  domain: PlanContext_plan_domain | null;
  image: PlanContext_plan_image | null;
  serveFileBaseUrl: string;
  actionSchedules: PlanContext_plan_actionSchedules[];
  actionImplementationPhases: PlanContext_plan_actionImplementationPhases[];
  actionImpacts: PlanContext_plan_actionImpacts[];
  actionStatuses: PlanContext_plan_actionStatuses[];
  impactGroups: (PlanContext_plan_impactGroups | null)[] | null;
  primaryOrgs: (PlanContext_plan_primaryOrgs | null)[];
  generalContent: PlanContext_plan_generalContent | null;
  mainMenu: PlanContext_plan_mainMenu | null;
  footer: PlanContext_plan_footer | null;
  adminUrl: string | null;
  accessibilityStatementUrl: string | null;
}

export interface PlanContext {
  plan: PlanContext_plan | null;
}

export interface PlanContextVariables {
  identifier?: string | null;
  hostname?: string | null;
}
