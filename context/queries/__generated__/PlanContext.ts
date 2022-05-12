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

export interface PlanContext_plan_features {
  __typename: "PlanFeatures";
  /**
   * Enable site-wide search functionality
   */
  enableSearch: boolean | null;
  /**
   * Set if the plan uses meaningful action identifiers
   */
  hasActionIdentifiers: boolean;
  /**
   * Set if the plan uses the official name field
   */
  hasActionOfficialName: boolean;
  /**
   * Set if the plan uses the lead paragraph field
   */
  hasActionLeadParagraph: boolean;
  /**
   * Set if actions have a clear primary organisation (such as multi-city plans)
   */
  hasActionPrimaryOrgs: boolean;
  /**
   * Set if the contact persons should be visible in the public UI
   */
  publicContactPersons: boolean;
  /**
   * Should the public website contain a link to the admin login?
   */
  showAdminLink: boolean;
}

export interface PlanContext_plan_allRelatedPlans_image_rendition {
  __typename: "ImageRendition";
  src: string;
}

export interface PlanContext_plan_allRelatedPlans_image {
  __typename: "Image";
  rendition: PlanContext_plan_allRelatedPlans_image_rendition | null;
}

export interface PlanContext_plan_allRelatedPlans_organization {
  __typename: "Organization";
  /**
   * A primary name, e.g. a legally recognized name
   */
  name: string;
}

export interface PlanContext_plan_allRelatedPlans {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  image: PlanContext_plan_allRelatedPlans_image | null;
  organization: PlanContext_plan_allRelatedPlans_organization;
  viewUrl: string | null;
}

export interface PlanContext_plan_children_image_rendition {
  __typename: "ImageRendition";
  src: string;
}

export interface PlanContext_plan_children_image {
  __typename: "Image";
  rendition: PlanContext_plan_children_image_rendition | null;
}

export interface PlanContext_plan_children_organization {
  __typename: "Organization";
  /**
   * A primary name, e.g. a legally recognized name
   */
  name: string;
}

export interface PlanContext_plan_children {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  image: PlanContext_plan_children_image | null;
  organization: PlanContext_plan_children_organization;
  viewUrl: string | null;
}

export interface PlanContext_plan_parent_generalContent {
  __typename: "SiteGeneralContent";
  id: string;
  siteTitle: string;
}

export interface PlanContext_plan_parent_image_rendition {
  __typename: "ImageRendition";
  src: string;
}

export interface PlanContext_plan_parent_image {
  __typename: "Image";
  rendition: PlanContext_plan_parent_image_rendition | null;
}

export interface PlanContext_plan_parent_organization {
  __typename: "Organization";
  /**
   * A primary name, e.g. a legally recognized name
   */
  name: string;
}

export interface PlanContext_plan_parent {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  generalContent: PlanContext_plan_parent_generalContent | null;
  image: PlanContext_plan_parent_image | null;
  organization: PlanContext_plan_parent_organization;
  viewUrl: string | null;
}

export interface PlanContext_plan {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  themeIdentifier: string | null;
  primaryLanguage: string;
  otherLanguages: string[] | null;
  hideActionIdentifiers: boolean | null;
  domain: PlanContext_plan_domain | null;
  image: PlanContext_plan_image | null;
  serveFileBaseUrl: string;
  actionSchedules: PlanContext_plan_actionSchedules[];
  actionImplementationPhases: PlanContext_plan_actionImplementationPhases[];
  actionImpacts: PlanContext_plan_actionImpacts[];
  actionStatuses: PlanContext_plan_actionStatuses[];
  impactGroups: (PlanContext_plan_impactGroups | null)[];
  primaryOrgs: (PlanContext_plan_primaryOrgs | null)[];
  generalContent: PlanContext_plan_generalContent | null;
  mainMenu: PlanContext_plan_mainMenu | null;
  footer: PlanContext_plan_footer | null;
  adminUrl: string | null;
  accessibilityStatementUrl: string | null;
  features: PlanContext_plan_features;
  allRelatedPlans: (PlanContext_plan_allRelatedPlans | null)[];
  children: PlanContext_plan_children[];
  parent: PlanContext_plan_parent | null;
}

export interface PlanContext {
  plan: PlanContext_plan | null;
}

export interface PlanContextVariables {
  identifier?: string | null;
  hostname?: string | null;
  clientUrl?: string | null;
}
