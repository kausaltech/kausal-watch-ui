/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SiteGeneralContentActionTerm } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PlanContext
// ====================================================

export interface PlanContext_primaryActionClassification {
  __typename: "CategoryType";
  id: string;
  identifier: string;
}

export interface PlanContext_secondaryActionClassification {
  __typename: "CategoryType";
  id: string;
  identifier: string;
}

export interface PlanContext_domain {
  __typename: "PlanDomain";
  id: string;
  googleSiteVerificationTag: string | null;
  matomoAnalyticsUrl: string | null;
}

export interface PlanContext_image_large {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_image_small {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_image_social {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_image_rendition {
  __typename: "ImageRendition";
  id: string;
  width: number;
  height: number;
  src: string;
}

export interface PlanContext_image {
  __typename: "Image";
  title: string;
  altText: string;
  imageCredit: string;
  width: number;
  height: number;
  focalPointX: number | null;
  focalPointY: number | null;
  large: PlanContext_image_large | null;
  small: PlanContext_image_small | null;
  social: PlanContext_image_social | null;
  rendition: PlanContext_image_rendition | null;
}

export interface PlanContext_actionSchedules {
  __typename: "ActionSchedule";
  id: string;
  name: string;
  beginsAt: any;
  endsAt: any | null;
}

export interface PlanContext_actionImplementationPhases {
  __typename: "ActionImplementationPhase";
  id: string;
  identifier: string;
  name: string;
  order: number;
}

export interface PlanContext_actionImpacts {
  __typename: "ActionImpact";
  id: string;
  identifier: string;
  name: string;
  order: number;
}

export interface PlanContext_actionStatuses {
  __typename: "ActionStatus";
  id: string;
  identifier: string;
  name: string;
  isCompleted: boolean;
}

export interface PlanContext_impactGroups {
  __typename: "ImpactGroup";
  id: string;
}

export interface PlanContext_primaryOrgs {
  __typename: "Organization";
  id: string;
}

export interface PlanContext_generalContent {
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
  actionTerm: SiteGeneralContentActionTerm;
}

export interface PlanContext_mainMenu_items_PageMenuItem_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage" | "PrivacyPolicyPage" | "AccessibilityStatementPage" | "CategoryTypePage";
  title: string;
  urlPath: string;
  slug: string;
}

export interface PlanContext_mainMenu_items_PageMenuItem_parent_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage" | "PrivacyPolicyPage" | "AccessibilityStatementPage" | "CategoryTypePage";
}

export interface PlanContext_mainMenu_items_PageMenuItem_parent {
  __typename: "PageMenuItem";
  id: string;
  page: PlanContext_mainMenu_items_PageMenuItem_parent_page;
}

export interface PlanContext_mainMenu_items_PageMenuItem {
  __typename: "PageMenuItem";
  id: string;
  page: PlanContext_mainMenu_items_PageMenuItem_page;
  parent: PlanContext_mainMenu_items_PageMenuItem_parent | null;
}

export interface PlanContext_mainMenu_items_ExternalLinkMenuItem {
  __typename: "ExternalLinkMenuItem";
  linkText: string;
  url: string;
}

export type PlanContext_mainMenu_items = PlanContext_mainMenu_items_PageMenuItem | PlanContext_mainMenu_items_ExternalLinkMenuItem;

export interface PlanContext_mainMenu {
  __typename: "MainMenu";
  items: (PlanContext_mainMenu_items | null)[];
}

export interface PlanContext_footer_items_ExternalLinkMenuItem {
  __typename: "ExternalLinkMenuItem";
}

export interface PlanContext_footer_items_PageMenuItem_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage" | "PrivacyPolicyPage" | "AccessibilityStatementPage" | "CategoryTypePage";
  title: string;
  urlPath: string;
  slug: string;
}

export interface PlanContext_footer_items_PageMenuItem_parent_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage" | "PrivacyPolicyPage" | "AccessibilityStatementPage" | "CategoryTypePage";
}

export interface PlanContext_footer_items_PageMenuItem_parent {
  __typename: "PageMenuItem";
  id: string;
  page: PlanContext_footer_items_PageMenuItem_parent_page;
}

export interface PlanContext_footer_items_PageMenuItem_children_page {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage" | "PrivacyPolicyPage" | "AccessibilityStatementPage" | "CategoryTypePage";
  title: string;
  urlPath: string;
  slug: string;
}

export interface PlanContext_footer_items_PageMenuItem_children {
  __typename: "PageMenuItem";
  id: string;
  page: PlanContext_footer_items_PageMenuItem_children_page;
}

export interface PlanContext_footer_items_PageMenuItem {
  __typename: "PageMenuItem";
  id: string;
  page: PlanContext_footer_items_PageMenuItem_page;
  parent: PlanContext_footer_items_PageMenuItem_parent | null;
  children: (PlanContext_footer_items_PageMenuItem_children | null)[] | null;
}

export type PlanContext_footer_items = PlanContext_footer_items_ExternalLinkMenuItem | PlanContext_footer_items_PageMenuItem;

export interface PlanContext_footer {
  __typename: "Footer";
  items: (PlanContext_footer_items | null)[];
}

export interface PlanContext_features {
  __typename: "PlanFeatures";
  /**
   * Enable site-wide search functionality
   */
  enableSearch: boolean;
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
  /**
   * Set to enable comparing indicators between organizations
   */
  enableIndicatorComparison: boolean;
}

export interface PlanContext_allRelatedPlans_image_rendition {
  __typename: "ImageRendition";
  src: string;
}

export interface PlanContext_allRelatedPlans_image {
  __typename: "Image";
  rendition: PlanContext_allRelatedPlans_image_rendition | null;
}

export interface PlanContext_allRelatedPlans_organization {
  __typename: "Organization";
  /**
   * A primary name, e.g. a legally recognized name
   */
  name: string;
}

export interface PlanContext_allRelatedPlans {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  image: PlanContext_allRelatedPlans_image | null;
  organization: PlanContext_allRelatedPlans_organization;
  viewUrl: string | null;
}

export interface PlanContext_children_image_rendition {
  __typename: "ImageRendition";
  src: string;
}

export interface PlanContext_children_image {
  __typename: "Image";
  rendition: PlanContext_children_image_rendition | null;
}

export interface PlanContext_children_organization {
  __typename: "Organization";
  /**
   * A primary name, e.g. a legally recognized name
   */
  name: string;
}

export interface PlanContext_children {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  image: PlanContext_children_image | null;
  organization: PlanContext_children_organization;
  viewUrl: string | null;
}

export interface PlanContext_parent_generalContent {
  __typename: "SiteGeneralContent";
  id: string;
  siteTitle: string;
}

export interface PlanContext_parent_image_rendition {
  __typename: "ImageRendition";
  src: string;
}

export interface PlanContext_parent_image {
  __typename: "Image";
  rendition: PlanContext_parent_image_rendition | null;
}

export interface PlanContext_parent_organization {
  __typename: "Organization";
  /**
   * A primary name, e.g. a legally recognized name
   */
  name: string;
}

export interface PlanContext_parent {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  generalContent: PlanContext_parent_generalContent | null;
  image: PlanContext_parent_image | null;
  organization: PlanContext_parent_organization;
  viewUrl: string | null;
}

export interface PlanContext_additionalLinks_items_ExternalLinkMenuItem {
  __typename: "ExternalLinkMenuItem";
}

export interface PlanContext_additionalLinks_items_PageMenuItem_page_CategoryPage {
  __typename: "CategoryPage" | "Page" | "PlanRootPage" | "EmptyPage" | "StaticPage" | "ActionListPage" | "IndicatorListPage" | "ImpactGroupPage" | "PrivacyPolicyPage" | "CategoryTypePage";
  title: string;
  slug: string;
}

export interface PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_StreamFieldBlock {
  __typename: "StreamFieldBlock" | "CharBlock" | "TextBlock" | "EmailBlock" | "IntegerBlock" | "FloatBlock" | "DecimalBlock" | "RegexBlock" | "URLBlock" | "BooleanBlock" | "DateBlock" | "TimeBlock" | "DateTimeBlock" | "RichTextBlock" | "RawHTMLBlock" | "BlockQuoteBlock" | "ChoiceBlock" | "StreamBlock" | "StructBlock" | "StaticBlock" | "EmbedBlock" | "ActionHighlightsBlock" | "ActionListBlock" | "CategoryListBlock" | "CategoryTreeMapBlock" | "RelatedPlanListBlock" | "ActionAttributeTypeFilterBlock" | "CategoryTypeFilterBlock" | "ResponsiblePartyFilterBlock" | "PrimaryOrganizationFilterBlock" | "ActionImplementationPhaseFilterBlock" | "ActionScheduleFilterBlock" | "ActionListFilterBlock" | "ActionLeadParagraphBlock" | "ActionDescriptionBlock" | "ActionOfficialNameBlock" | "ActionScheduleBlock" | "ActionLinksBlock" | "ActionTasksBlock" | "ActionMergedActionsBlock" | "ActionRelatedActionsBlock" | "ActionRelatedIndicatorsBlock" | "ActionContactPersonsBlock" | "ActionResponsiblePartiesBlock" | "ActionMainContentBlock" | "ActionAsideContentBlock" | "QuestionBlock" | "QuestionAnswerBlock" | "FrontPageHeroBlock" | "PageLinkBlock" | "CardBlock" | "CardListBlock" | "ActionCategoryFilterCardBlock" | "ActionCategoryFilterCardsBlock" | "AccessibilityStatementComplianceStatusBlock" | "AccessibilityStatementPreparationInformationBlock" | "IndicatorHighlightsBlock" | "IndicatorBlock" | "IndicatorGroupBlock" | "IndicatorShowcaseBlock" | "RelatedIndicatorsBlock" | "PageChooserBlock" | "DocumentChooserBlock" | "ImageChooserBlock" | "SnippetChooserBlock";
}

export interface PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock_blocks_StreamFieldBlock {
  __typename: "StreamFieldBlock" | "TextBlock" | "EmailBlock" | "IntegerBlock" | "FloatBlock" | "DecimalBlock" | "RegexBlock" | "URLBlock" | "BooleanBlock" | "DateBlock" | "TimeBlock" | "DateTimeBlock" | "RichTextBlock" | "RawHTMLBlock" | "BlockQuoteBlock" | "ChoiceBlock" | "StreamBlock" | "StructBlock" | "StaticBlock" | "EmbedBlock" | "ActionHighlightsBlock" | "ActionListBlock" | "CategoryListBlock" | "CategoryTreeMapBlock" | "RelatedPlanListBlock" | "ActionAttributeTypeFilterBlock" | "CategoryTypeFilterBlock" | "ResponsiblePartyFilterBlock" | "PrimaryOrganizationFilterBlock" | "ActionImplementationPhaseFilterBlock" | "ActionScheduleFilterBlock" | "ActionListFilterBlock" | "ActionLeadParagraphBlock" | "ActionDescriptionBlock" | "ActionOfficialNameBlock" | "ActionScheduleBlock" | "ActionLinksBlock" | "ActionTasksBlock" | "ActionMergedActionsBlock" | "ActionRelatedActionsBlock" | "ActionRelatedIndicatorsBlock" | "ActionContactPersonsBlock" | "ActionResponsiblePartiesBlock" | "ActionMainContentBlock" | "ActionAsideContentBlock" | "QuestionBlock" | "QuestionAnswerBlock" | "FrontPageHeroBlock" | "PageLinkBlock" | "CardBlock" | "CardListBlock" | "ActionCategoryFilterCardBlock" | "ActionCategoryFilterCardsBlock" | "AccessibilityStatementComplianceStatusBlock" | "AccessibilityStatementPreparationInformationBlock" | "AccessibilityStatementContactInformationBlock" | "IndicatorHighlightsBlock" | "IndicatorBlock" | "IndicatorGroupBlock" | "IndicatorShowcaseBlock" | "RelatedIndicatorsBlock" | "PageChooserBlock" | "DocumentChooserBlock" | "ImageChooserBlock" | "SnippetChooserBlock";
  field: string;
}

export interface PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock_blocks_CharBlock {
  __typename: "CharBlock";
  field: string;
  value: string;
}

export type PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock_blocks = PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock_blocks_StreamFieldBlock | PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock_blocks_CharBlock;

export interface PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock {
  __typename: "AccessibilityStatementContactInformationBlock";
  blocks: PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock_blocks[];
}

export type PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body = PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_StreamFieldBlock | PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body_AccessibilityStatementContactInformationBlock;

export interface PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage {
  __typename: "AccessibilityStatementPage";
  title: string;
  slug: string;
  body: (PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage_body | null)[] | null;
}

export type PlanContext_additionalLinks_items_PageMenuItem_page = PlanContext_additionalLinks_items_PageMenuItem_page_CategoryPage | PlanContext_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage;

export interface PlanContext_additionalLinks_items_PageMenuItem {
  __typename: "PageMenuItem";
  id: string;
  page: PlanContext_additionalLinks_items_PageMenuItem_page;
}

export type PlanContext_additionalLinks_items = PlanContext_additionalLinks_items_ExternalLinkMenuItem | PlanContext_additionalLinks_items_PageMenuItem;

export interface PlanContext_additionalLinks {
  __typename: "AdditionalLinks";
  items: (PlanContext_additionalLinks_items | null)[];
}

export interface PlanContext {
  __typename: "Plan";
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  themeIdentifier: string | null;
  primaryLanguage: string;
  otherLanguages: string[] | null;
  hideActionIdentifiers: boolean | null;
  /**
   * Used for primary navigation and grouping of actions
   */
  primaryActionClassification: PlanContext_primaryActionClassification | null;
  /**
   * Leave empty unless specifically required. Actionfilters based on this category are displayed more prominently than filters of other categories.
   */
  secondaryActionClassification: PlanContext_secondaryActionClassification | null;
  domain: PlanContext_domain | null;
  image: PlanContext_image | null;
  serveFileBaseUrl: string;
  actionSchedules: PlanContext_actionSchedules[];
  actionImplementationPhases: PlanContext_actionImplementationPhases[];
  actionImpacts: PlanContext_actionImpacts[];
  actionStatuses: PlanContext_actionStatuses[];
  impactGroups: (PlanContext_impactGroups | null)[];
  primaryOrgs: (PlanContext_primaryOrgs | null)[];
  generalContent: PlanContext_generalContent | null;
  mainMenu: PlanContext_mainMenu | null;
  footer: PlanContext_footer | null;
  adminUrl: string | null;
  accessibilityStatementUrl: string | null;
  features: PlanContext_features;
  allRelatedPlans: (PlanContext_allRelatedPlans | null)[];
  children: PlanContext_children[];
  parent: PlanContext_parent | null;
  additionalLinks: PlanContext_additionalLinks | null;
}
