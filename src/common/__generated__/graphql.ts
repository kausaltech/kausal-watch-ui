/* istanbul ignore file */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** An enumeration. */
export enum ActionDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

export enum ActionListPageView {
  Cards = 'CARDS',
  Dashboard = 'DASHBOARD'
}

/** Role of an organization in implementing an action */
export enum ActionResponsiblePartyRole {
  Collaborator = 'COLLABORATOR',
  Primary = 'PRIMARY'
}

/** An enumeration. */
export enum ActionStatusSummaryIdentifier {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Late = 'LATE',
  Merged = 'MERGED',
  NotStarted = 'NOT_STARTED',
  OnTime = 'ON_TIME',
  OutOfScope = 'OUT_OF_SCOPE',
  Postponed = 'POSTPONED',
  Undefined = 'UNDEFINED'
}

/** An enumeration. */
export enum ActionTaskDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

/** An enumeration. */
export enum ActionTaskState {
  /** cancelled */
  Cancelled = 'CANCELLED',
  /** completed */
  Completed = 'COMPLETED',
  /** in progress */
  InProgress = 'IN_PROGRESS',
  /** not started */
  NotStarted = 'NOT_STARTED'
}

/** An enumeration. */
export enum ActionTimelinessIdentifier {
  Acceptable = 'ACCEPTABLE',
  Late = 'LATE',
  Optimal = 'OPTIMAL',
  Stale = 'STALE'
}

/** An enumeration. */
export enum AttributeTypeFormat {
  /** Category */
  CategoryChoice = 'CATEGORY_CHOICE',
  /** Numeric */
  Numeric = 'NUMERIC',
  /** Optional choice with optional text */
  OptionalChoice = 'OPTIONAL_CHOICE',
  /** Ordered choice */
  OrderedChoice = 'ORDERED_CHOICE',
  /** Rich text */
  RichText = 'RICH_TEXT',
  /** Text */
  Text = 'TEXT',
  /** Choice */
  UnorderedChoice = 'UNORDERED_CHOICE'
}

/** An enumeration. */
export enum CartographyProviderCredentialsProvider {
  /** MapBox */
  Mapbox = 'MAPBOX'
}

/** An enumeration. */
export enum CategoryTypeSelectWidget {
  /** Multiple */
  Multiple = 'MULTIPLE',
  /** Single */
  Single = 'SINGLE'
}

/** An enumeration. */
export enum Comparison {
  Gt = 'GT',
  Lte = 'LTE'
}

export enum IndicatorCategoryRelationshipType {
  MainGoal = 'MAIN_GOAL',
  SecondaryGoal = 'SECONDARY_GOAL'
}

/** An enumeration. */
export enum IndicatorColumnValueType {
  Earliest = 'EARLIEST',
  Goal = 'GOAL',
  Latest = 'LATEST',
  Reference = 'REFERENCE'
}

/** An enumeration. */
export enum IndicatorDashboardFieldName {
  CausalityNav = 'CAUSALITY_NAV',
  ConnectedActions = 'CONNECTED_ACTIONS',
  Description = 'DESCRIPTION',
  Level = 'LEVEL',
  Name = 'NAME',
  Organization = 'ORGANIZATION',
  Reference = 'REFERENCE',
  Unit = 'UNIT',
  UpdatedAt = 'UPDATED_AT',
  ValueSummary = 'VALUE_SUMMARY',
  Visualization = 'VISUALIZATION'
}

/** An enumeration. */
export enum IndicatorDesiredTrend {
  /** attempt to detect automatically */
  A = 'A_',
  /** decreasing */
  Decreasing = 'DECREASING',
  /** increasing */
  Increasing = 'INCREASING'
}

/** An enumeration. */
export enum IndicatorDetailsFieldName {
  CausalityNav = 'CAUSALITY_NAV',
  ConnectedActions = 'CONNECTED_ACTIONS',
  Description = 'DESCRIPTION',
  FactorValueSummary = 'FACTOR_VALUE_SUMMARY',
  GoalDescription = 'GOAL_DESCRIPTION',
  Level = 'LEVEL',
  Name = 'NAME',
  Organization = 'ORGANIZATION',
  Reference = 'REFERENCE',
  Unit = 'UNIT',
  UpdatedAt = 'UPDATED_AT',
  ValueSummary = 'VALUE_SUMMARY',
  Visualization = 'VISUALIZATION'
}

/** An enumeration. */
export enum IndicatorList_FiltersFieldName {
  Description = 'DESCRIPTION',
  Level = 'LEVEL',
  Name = 'NAME',
  Organization = 'ORGANIZATION',
  Reference = 'REFERENCE',
  Unit = 'UNIT',
  UpdatedAt = 'UPDATED_AT'
}

/** An enumeration. */
export enum IndicatorNonQuantifiedGoal {
  /** Decrease */
  Decrease = 'DECREASE',
  /** Increase */
  Increase = 'INCREASE'
}

/** An enumeration. */
export enum IndicatorTimeResolution {
  /** day */
  Day = 'DAY',
  /** month */
  Month = 'MONTH',
  /** year */
  Year = 'YEAR'
}

/** An enumeration. */
export enum PlanFeaturesContactPersonsPublicData {
  /** Show all information */
  All = 'ALL',
  /** Show all information but only for authenticated users */
  AllForAuthenticated = 'ALL_FOR_AUTHENTICATED',
  /** Show only name, role and affiliation */
  Name = 'NAME',
  /** Do not show contact persons publicly */
  None = 'NONE'
}

/** An enumeration. */
export enum PublicationStatus {
  Published = 'PUBLISHED',
  Scheduled = 'SCHEDULED',
  Unpublished = 'UNPUBLISHED'
}

/** An enumeration. */
export enum RelatedCommonIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES',
  /** is a part of */
  PartOf = 'PART_OF'
}

/** An enumeration. */
export enum RelatedIndicatorConfidenceLevel {
  /** high */
  High = 'HIGH',
  /** low */
  Low = 'LOW',
  /** medium */
  Medium = 'MEDIUM'
}

/** An enumeration. */
export enum RelatedIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES',
  /** is a part of */
  PartOf = 'PART_OF'
}

/** An enumeration. */
export enum Sentiment {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE'
}

/** An enumeration. */
export enum SiteGeneralContentActionTaskTerm {
  /** Milestone */
  Milestone = 'MILESTONE',
  /** Task */
  Task = 'TASK'
}

/** An enumeration. */
export enum SiteGeneralContentActionTerm {
  /** Action */
  Action = 'ACTION',
  /** Case study */
  CaseStudy = 'CASE_STUDY',
  /** Strategy */
  Strategy = 'STRATEGY'
}

/** An enumeration. */
export enum SiteGeneralContentIndicatorTerm {
  /** Indicator */
  Indicator = 'INDICATOR',
  /** Measure */
  Measure = 'MEASURE'
}

/** An enumeration. */
export enum SiteGeneralContentOrganizationTerm {
  /** Division */
  Division = 'DIVISION',
  /** Organization */
  Organization = 'ORGANIZATION'
}

export type UserFeedbackMutationInput = {
  action: string | number | null | undefined;
  additionalFields: string | null | undefined;
  category: string | number | null | undefined;
  clientMutationId: string | null | undefined;
  comment: string | null | undefined;
  email: string | null | undefined;
  id: string | number | null | undefined;
  name: string | null | undefined;
  pageId: string | null | undefined;
  plan: string | number;
  pledge: string | number | null | undefined;
  type: string | null | undefined;
  url: string;
};

export enum WorkflowState {
  Approved = 'APPROVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type HeroImageFragment_full = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string };

export type HeroImageFragment_fullMedium = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string };

export type HeroImageFragment_fullSmall = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string };

export type HeroImageFragment = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null };

export type CardImageFragment_small = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string };

export type CardImageFragment_rendition = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string };

export type CardImageFragment = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type SocialImageFragment_social = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string };

export type SocialImageFragment = { __typename: 'Image', id: string, social: SocialImageFragment_social | null };

export type SearchQuery_search_hits_plan_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type SearchQuery_search_hits_plan_image = { __typename: 'Image', id: string, rendition: SearchQuery_search_hits_plan_image_rendition | null };

export type SearchQuery_search_hits_plan_organization = { __typename: 'Organization', id: string, name: string };

export type SearchQuery_search_hits_plan = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, image: SearchQuery_search_hits_plan_image | null, organization: SearchQuery_search_hits_plan_organization };

export type SearchQuery_search_hits_object_primaryOrg_logo_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type SearchQuery_search_hits_object_primaryOrg_logo = { __typename: 'Image', id: string, rendition: SearchQuery_search_hits_object_primaryOrg_logo_rendition | null };

export type SearchQuery_search_hits_object_primaryOrg = { __typename: 'Organization', id: string, name: string, logo: SearchQuery_search_hits_object_primaryOrg_logo | null };

export type SearchQuery_search_hits_object_Action = { __typename: 'Action', identifier: string, primaryOrg: SearchQuery_search_hits_object_primaryOrg | null };

export type SearchQuery_search_hits_object_Indicator = { __typename: 'Indicator', id: string };

export type SearchQuery_search_hits_object =
  | SearchQuery_search_hits_object_Action
  | SearchQuery_search_hits_object_Indicator
;

export type SearchQuery_search_hits_page_CategoryPage_category_level = { __typename: 'CategoryLevel', id: string, name: string };

export type SearchQuery_search_hits_page_CategoryPage_category = { __typename: 'Category', id: string, level: SearchQuery_search_hits_page_CategoryPage_category_level | null };

export type SearchQuery_search_hits_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, category: SearchQuery_search_hits_page_CategoryPage_category | null };

export type SearchQuery_search_hits_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string };

export type SearchQuery_search_hits_page_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_Page = { __typename: 'Page', id: string | null, title: string };

export type SearchQuery_search_hits_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string };

export type SearchQuery_search_hits_page_StaticPage = { __typename: 'StaticPage', id: string | null, title: string };

export type SearchQuery_search_hits_page =
  | SearchQuery_search_hits_page_AccessibilityStatementPage
  | SearchQuery_search_hits_page_ActionListPage
  | SearchQuery_search_hits_page_CategoryPage
  | SearchQuery_search_hits_page_CategoryTypePage
  | SearchQuery_search_hits_page_EmptyPage
  | SearchQuery_search_hits_page_ImpactGroupPage
  | SearchQuery_search_hits_page_IndicatorListPage
  | SearchQuery_search_hits_page_Page
  | SearchQuery_search_hits_page_PlanRootPage
  | SearchQuery_search_hits_page_PledgeListPage
  | SearchQuery_search_hits_page_PrivacyPolicyPage
  | SearchQuery_search_hits_page_StaticPage
;

export type SearchQuery_search_hits = { __typename: 'SearchHit', id: string, title: string, url: string | null, highlight: string | null, plan: SearchQuery_search_hits_plan, object: SearchQuery_search_hits_object | null, page: SearchQuery_search_hits_page | null };

export type SearchQuery_search = { __typename: 'SearchResults', hits: Array<SearchQuery_search_hits> };

export type SearchQuery = { __typename: 'Query', search: SearchQuery_search };


export type SearchQueryVariables = Exact<{
  plan: string | number;
  query: string;
  onlyOtherPlans: boolean | null | undefined;
  clientUrl: string | null | undefined;
}>;

export type ActionHightlightListQuery_planActions_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ActionHightlightListQuery_planActions_plan = { __typename: 'Plan', id: string };

export type ActionHightlightListQuery_planActions_status = { __typename: 'ActionStatus', id: string, identifier: string, name: string, color: string };

export type ActionHightlightListQuery_planActions_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier };

export type ActionHightlightListQuery_planActions_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, name: string, identifier: string };

export type ActionHightlightListQuery_planActions_categories_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ActionHightlightListQuery_planActions_categories_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ActionHightlightListQuery_planActions_categories_parent_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ActionHightlightListQuery_planActions_categories_parent_parent = { __typename: 'Category', id: string, image: ActionHightlightListQuery_planActions_categories_parent_parent_image | null };

export type ActionHightlightListQuery_planActions_categories_parent = { __typename: 'Category', id: string, image: ActionHightlightListQuery_planActions_categories_parent_image | null, parent: ActionHightlightListQuery_planActions_categories_parent_parent | null };

export type ActionHightlightListQuery_planActions_categories = { __typename: 'Category', id: string, image: ActionHightlightListQuery_planActions_categories_image | null, parent: ActionHightlightListQuery_planActions_categories_parent | null };

export type ActionHightlightListQuery_planActions = { __typename: 'Action', id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, color: string | null, image: ActionHightlightListQuery_planActions_image | null, plan: ActionHightlightListQuery_planActions_plan, status: ActionHightlightListQuery_planActions_status | null, statusSummary: ActionHightlightListQuery_planActions_statusSummary, implementationPhase: ActionHightlightListQuery_planActions_implementationPhase | null, categories: Array<ActionHightlightListQuery_planActions_categories> };

export type ActionHightlightListQuery = { __typename: 'Query', planActions: Array<ActionHightlightListQuery_planActions> | null };


export type ActionHightlightListQueryVariables = Exact<{
  plan: string | number;
  first: number;
  orderBy: string;
}>;

export type ActionUpdatesQuery_action_statusUpdates_author = { __typename: 'Person', id: string, firstName: string, lastName: string, avatarUrl: string | null };

export type ActionUpdatesQuery_action_statusUpdates = { __typename: 'ActionStatusUpdate', id: string, title: string, date: string, content: string, author: ActionUpdatesQuery_action_statusUpdates_author | null };

export type ActionUpdatesQuery_action = { __typename: 'Action', id: string, statusUpdates: Array<ActionUpdatesQuery_action_statusUpdates> };

export type ActionUpdatesQuery = { __typename: 'Query', action: ActionUpdatesQuery_action | null };


export type ActionUpdatesQueryVariables = Exact<{
  plan: string | number;
  id: string | number;
}>;

export type ActionListQuery_planActions_image_rendition = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string, alt: string };

export type ActionListQuery_planActions_image = { __typename: 'Image', id: string, rendition: ActionListQuery_planActions_image_rendition | null };

export type ActionListQuery_planActions_status = { __typename: 'ActionStatus', id: string, identifier: string, name: string, color: string };

export type ActionListQuery_planActions_categories_level = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type ActionListQuery_planActions_categories_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ActionListQuery_planActions_categories_indicators_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number };

export type ActionListQuery_planActions_categories_indicators_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number };

export type ActionListQuery_planActions_categories_indicators_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type ActionListQuery_planActions_categories_indicators = { __typename: 'Indicator', id: string, values: Array<ActionListQuery_planActions_categories_indicators_values>, goals: Array<ActionListQuery_planActions_categories_indicators_goals | null> | null, unit: ActionListQuery_planActions_categories_indicators_unit };

export type ActionListQuery_planActions_categories_indicatorRelationships_indicator = { __typename: 'Indicator', id: string };

export type ActionListQuery_planActions_categories_indicatorRelationships = { __typename: 'IndicatorCategoryRelationship', id: string, type: IndicatorCategoryRelationshipType, indicator: ActionListQuery_planActions_categories_indicatorRelationships_indicator };

export type ActionListQuery_planActions_categories_iconImage_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ActionListQuery_planActions_categories_iconImage = { __typename: 'Image', id: string, rendition: ActionListQuery_planActions_categories_iconImage_rendition | null };

export type ActionListQuery_planActions_categories_categoryPage = { __typename: 'CategoryPage', id: string | null, title: string, urlPath: string, live: boolean };

export type ActionListQuery_planActions_categories_type = { __typename: 'CategoryType', id: string, identifier: string, hideCategoryIdentifiers: boolean };

export type ActionListQuery_planActions_categories_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, key: string };

export type ActionListQuery_planActions_categories_attributes_AttributeChoice = { __typename: 'AttributeChoice', id: string, key: string };

export type ActionListQuery_planActions_categories_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, key: string };

export type ActionListQuery_planActions_categories_attributes_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, key: string };

export type ActionListQuery_planActions_categories_attributes_AttributeText = { __typename: 'AttributeText', value: string, id: string, key: string };

export type ActionListQuery_planActions_categories_attributes =
  | ActionListQuery_planActions_categories_attributes_AttributeCategoryChoice
  | ActionListQuery_planActions_categories_attributes_AttributeChoice
  | ActionListQuery_planActions_categories_attributes_AttributeNumericValue
  | ActionListQuery_planActions_categories_attributes_AttributeRichText
  | ActionListQuery_planActions_categories_attributes_AttributeText
;

export type ActionListQuery_planActions_categories_parent_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ActionListQuery_planActions_categories_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: ActionListQuery_planActions_categories_parent_parent_parent | null, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ActionListQuery_planActions_categories_parent = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: ActionListQuery_planActions_categories_parent_parent | null, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ActionListQuery_planActions_categories = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes>, parent: ActionListQuery_planActions_categories_parent | null };

export type ActionListQuery_planActions_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier };

export type ActionListQuery_planActions_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string };

export type ActionListQuery_planActions_primaryOrg_logo_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ActionListQuery_planActions_primaryOrg_logo = { __typename: 'Image', id: string, rendition: ActionListQuery_planActions_primaryOrg_logo_rendition | null };

export type ActionListQuery_planActions_primaryOrg = { __typename: 'Organization', id: string, abbreviation: string | null, name: string, logo: ActionListQuery_planActions_primaryOrg_logo | null };

export type ActionListQuery_planActions_mergedWith_plan = { __typename: 'Plan', id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null };

export type ActionListQuery_planActions_mergedWith = { __typename: 'Action', id: string, identifier: string, viewUrl: string, plan: ActionListQuery_planActions_mergedWith_plan };

export type ActionListQuery_planActions_plan_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ActionListQuery_planActions_plan_image = { __typename: 'Image', id: string, rendition: ActionListQuery_planActions_plan_image_rendition | null };

export type ActionListQuery_planActions_plan = { __typename: 'Plan', id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: ActionListQuery_planActions_plan_image | null };

export type ActionListQuery_planActions = { __typename: 'Action', hasDependencyRelationships: boolean | null, id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, image: ActionListQuery_planActions_image | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionListQuery = { __typename: 'Query', planActions: Array<ActionListQuery_planActions> | null };


export type ActionListQueryVariables = Exact<{
  plan: string | number;
  clientUrl: string;
}>;

export type ContactDetailsQuery_person_organization_ancestors_classification = { __typename: 'OrganizationClass', id: string, name: string };

export type ContactDetailsQuery_person_organization_ancestors = { __typename: 'Organization', id: string, name: string, classification: ContactDetailsQuery_person_organization_ancestors_classification | null };

export type ContactDetailsQuery_person_organization = { __typename: 'Organization', id: string, name: string, ancestors: Array<ContactDetailsQuery_person_organization_ancestors | null> | null };

export type ContactDetailsQuery_person = { __typename: 'Person', id: string, email: string, organization: ContactDetailsQuery_person_organization };

export type ContactDetailsQuery = { __typename: 'Query', person: ContactDetailsQuery_person | null };


export type ContactDetailsQueryVariables = Exact<{
  id: string | number;
  plan: string | number;
}>;

export type ActionDependenciesQuery_action_dependencyRole = { __typename: 'ActionDependencyRole', id: string, name: string };

export type ActionDependenciesQuery_action_allDependencyRelationships_preceding_dependencyRole = { __typename: 'ActionDependencyRole', id: string };

export type ActionDependenciesQuery_action_allDependencyRelationships_preceding = { __typename: 'Action', id: string, dependencyRole: ActionDependenciesQuery_action_allDependencyRelationships_preceding_dependencyRole | null };

export type ActionDependenciesQuery_action_allDependencyRelationships_dependent_dependencyRole = { __typename: 'ActionDependencyRole', id: string };

export type ActionDependenciesQuery_action_allDependencyRelationships_dependent = { __typename: 'Action', id: string, dependencyRole: ActionDependenciesQuery_action_allDependencyRelationships_dependent_dependencyRole | null };

export type ActionDependenciesQuery_action_allDependencyRelationships = { __typename: 'ActionDependencyRelationship', id: string, preceding: ActionDependenciesQuery_action_allDependencyRelationships_preceding, dependent: ActionDependenciesQuery_action_allDependencyRelationships_dependent };

export type ActionDependenciesQuery_action = { __typename: 'Action', id: string, dependencyRole: ActionDependenciesQuery_action_dependencyRole | null, allDependencyRelationships: Array<ActionDependenciesQuery_action_allDependencyRelationships> };

export type ActionDependenciesQuery = { __typename: 'Query', action: ActionDependenciesQuery_action | null };


export type ActionDependenciesQueryVariables = Exact<{
  action: string | number;
  workflow: WorkflowState | null | undefined;
}>;

export type CreateUserFeedbackMutation_createUserFeedback_feedback = { __typename: 'UserFeedbackNode', id: string, createdAt: string };

export type CreateUserFeedbackMutation_createUserFeedback_errors = { __typename: 'ErrorType', field: string, messages: Array<string> };

export type CreateUserFeedbackMutation_createUserFeedback = { __typename: 'UserFeedbackMutationPayload', feedback: CreateUserFeedbackMutation_createUserFeedback_feedback | null, errors: Array<CreateUserFeedbackMutation_createUserFeedback_errors> };

export type CreateUserFeedbackMutation = { __typename: 'Mutation', createUserFeedback: CreateUserFeedbackMutation_createUserFeedback | null };


export type CreateUserFeedbackMutationVariables = Exact<{
  input: UserFeedbackMutationInput;
}>;

export type ActionListForBlockQuery_planActions = { __typename: 'Action', hasDependencyRelationships: boolean | null, id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionListForBlockQuery = { __typename: 'Query', planActions: Array<ActionListForBlockQuery_planActions> | null };


export type ActionListForBlockQueryVariables = Exact<{
  plan: string | number;
  category: string | number | null | undefined;
  clientUrl: string | null | undefined;
  workflow: WorkflowState | null | undefined;
}>;

export type ActionListForGraphsQuery_planActions_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier };

export type ActionListForGraphsQuery_planActions_timeliness = { __typename: 'ActionTimeliness', identifier: ActionTimelinessIdentifier };

export type ActionListForGraphsQuery_planActions_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string };

export type ActionListForGraphsQuery_planActions = { __typename: 'Action', id: string, color: string | null, scheduleContinuous: boolean, statusSummary: ActionListForGraphsQuery_planActions_statusSummary, timeliness: ActionListForGraphsQuery_planActions_timeliness, implementationPhase: ActionListForGraphsQuery_planActions_implementationPhase | null };

export type ActionListForGraphsQuery = { __typename: 'Query', planActions: Array<ActionListForGraphsQuery_planActions> | null };


export type ActionListForGraphsQueryVariables = Exact<{
  plan: string | number;
  categoryId: string | number | null | undefined;
}>;

export type CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions = { __typename: 'AttributeTypeChoiceOption', id: string, identifier: string, name: string };

export type CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit = { __typename: 'Unit', id: string, name: string };

export type CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes = { __typename: 'AttributeType', id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions>, unit: CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit | null };

export type CategoryAttributeTypesQuery_plan_categoryTypes = { __typename: 'CategoryType', id: string, name: string, attributeTypes: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes> };

export type CategoryAttributeTypesQuery_plan = { __typename: 'Plan', id: string, categoryTypes: Array<CategoryAttributeTypesQuery_plan_categoryTypes> };

export type CategoryAttributeTypesQuery = { __typename: 'Query', plan: CategoryAttributeTypesQuery_plan | null };


export type CategoryAttributeTypesQueryVariables = Exact<{
  plan: string | number;
}>;

export type CategoriesForTreeMapQuery_planCategories_image_rendition = { __typename: 'ImageRendition', id: string, width: number, height: number, src: string, alt: string };

export type CategoriesForTreeMapQuery_planCategories_image = { __typename: 'Image', id: string, title: string, imageCredit: string, altText: string, rendition: CategoriesForTreeMapQuery_planCategories_image_rendition | null };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_ActionListBlock = { __typename: 'ActionListBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_CategoryListBlock = { __typename: 'CategoryListBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_DashboardRowBlock = { __typename: 'DashboardRowBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock' };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body_RichTextBlock = { __typename: 'RichTextBlock', value: string };

export type CategoriesForTreeMapQuery_planCategories_categoryPage_body =
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_ActionListBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_AdaptiveEmbedBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_CategoryListBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_ChangeLogMessageBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_DashboardRowBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_IndicatorGroupBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_QuestionAnswerBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_RelatedIndicatorsBlock
  | CategoriesForTreeMapQuery_planCategories_categoryPage_body_RichTextBlock
;

export type CategoriesForTreeMapQuery_planCategories_categoryPage = { __typename: 'CategoryPage', id: string | null, title: string, path: string, slug: string, url: string | null, urlPath: string, depth: number | null, contentType: string, body: Array<CategoriesForTreeMapQuery_planCategories_categoryPage_body> | null };

export type CategoriesForTreeMapQuery_planCategories_parent = { __typename: 'Category', id: string };

export type CategoriesForTreeMapQuery_planCategories_level = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type CategoriesForTreeMapQuery_planCategories_type = { __typename: 'CategoryType', id: string, hideCategoryIdentifiers: boolean };

export type CategoriesForTreeMapQuery_planCategories_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string };

export type CategoriesForTreeMapQuery_planCategories_attributes_AttributeChoice = { __typename: 'AttributeChoice', id: string };

export type CategoriesForTreeMapQuery_planCategories_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', value: number, id: string };

export type CategoriesForTreeMapQuery_planCategories_attributes_AttributeRichText = { __typename: 'AttributeRichText', id: string };

export type CategoriesForTreeMapQuery_planCategories_attributes_AttributeText = { __typename: 'AttributeText', id: string };

export type CategoriesForTreeMapQuery_planCategories_attributes =
  | CategoriesForTreeMapQuery_planCategories_attributes_AttributeCategoryChoice
  | CategoriesForTreeMapQuery_planCategories_attributes_AttributeChoice
  | CategoriesForTreeMapQuery_planCategories_attributes_AttributeNumericValue
  | CategoriesForTreeMapQuery_planCategories_attributes_AttributeRichText
  | CategoriesForTreeMapQuery_planCategories_attributes_AttributeText
;

export type CategoriesForTreeMapQuery_planCategories = { __typename: 'Category', id: string, name: string, leadParagraph: string, color: string, image: CategoriesForTreeMapQuery_planCategories_image | null, categoryPage: CategoriesForTreeMapQuery_planCategories_categoryPage | null, parent: CategoriesForTreeMapQuery_planCategories_parent | null, level: CategoriesForTreeMapQuery_planCategories_level | null, type: CategoriesForTreeMapQuery_planCategories_type, attributes: Array<CategoriesForTreeMapQuery_planCategories_attributes> };

export type CategoriesForTreeMapQuery = { __typename: 'Query', planCategories: Array<CategoriesForTreeMapQuery_planCategories> | null };


export type CategoriesForTreeMapQueryVariables = Exact<{
  plan: string | number;
  categoryType: string | number;
  attributeType: string | number;
}>;

export type CommonCategoryFragment_common = { __typename: 'CommonCategory', id: string, identifier: string, name: string, order: number };

export type CommonCategoryFragment = { __typename: 'Category', id: string, common?: CommonCategoryFragment_common | null };

export type PlanFragment_categoryTypes_common = { __typename: 'CommonCategoryType', identifier: string, name: string, hideCategoryIdentifiers: boolean };

export type PlanFragment_categoryTypes_categories_parent_common = { __typename: 'CommonCategory', id: string };

export type PlanFragment_categoryTypes_categories_parent = { __typename: 'Category', id: string, common?: PlanFragment_categoryTypes_categories_parent_common | null };

export type PlanFragment_categoryTypes_categories_iconImage_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type PlanFragment_categoryTypes_categories_iconImage = { __typename: 'Image', id: string, rendition: PlanFragment_categoryTypes_categories_iconImage_rendition | null };

export type PlanFragment_categoryTypes_categories_categoryPage = { __typename: 'CategoryPage', id: string | null, live: boolean };

export type PlanFragment_categoryTypes_categories = { __typename: 'Category', identifier: string, order: number, name: string, color: string, iconSvgUrl: string | null, id: string, parent: PlanFragment_categoryTypes_categories_parent | null, iconImage: PlanFragment_categoryTypes_categories_iconImage | null, categoryPage: PlanFragment_categoryTypes_categories_categoryPage | null, common?: CommonCategoryFragment_common | null };

export type PlanFragment_categoryTypes = { __typename: 'CategoryType', id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common: PlanFragment_categoryTypes_common | null, categories: Array<PlanFragment_categoryTypes_categories> };

export type PlanFragment_primaryOrgs = { __typename: 'Organization', id: string, abbreviation: string | null, name: string };

export type PlanFragment = { __typename: 'Plan', id: string, categoryTypes: Array<PlanFragment_categoryTypes>, primaryOrgs: Array<PlanFragment_primaryOrgs> };

export type RelatedPlanFragment_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type RelatedPlanFragment_image = { __typename: 'Image', id: string, rendition: RelatedPlanFragment_image_rendition | null };

export type RelatedPlanFragment_generalContent = { __typename: 'SiteGeneralContent', id: string, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm };

export type RelatedPlanFragment_actionImplementationPhases = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string, order: number, color: string };

export type RelatedPlanFragment = { __typename: 'Plan', shortName?: string | null, name?: string, shortIdentifier?: string | null, versionName?: string, viewUrl?: string | null, hideActionIdentifiers?: boolean, publishedAt?: string | null, id: string, image?: RelatedPlanFragment_image | null, generalContent?: RelatedPlanFragment_generalContent, actionImplementationPhases?: Array<RelatedPlanFragment_actionImplementationPhases> };

export type ActionFragment_status = { __typename: 'ActionStatus', id: string, identifier: string, name: string, color: string };

export type ActionFragment_categories_common = { __typename: 'CommonCategory', id: string };

export type ActionFragment_categories = { __typename: 'Category', id: string, common: ActionFragment_categories_common | null };

export type ActionFragment_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string, order: number };

export type ActionFragment_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier, label: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment };

export type ActionFragment_timeliness = { __typename: 'ActionTimeliness', identifier: ActionTimelinessIdentifier };

export type ActionFragment_plan = { __typename: 'Plan', shortName?: string | null, name?: string, shortIdentifier?: string | null, versionName?: string, viewUrl?: string | null, hideActionIdentifiers?: boolean, publishedAt?: string | null, id: string, image?: RelatedPlanFragment_image | null, generalContent?: RelatedPlanFragment_generalContent, actionImplementationPhases?: Array<RelatedPlanFragment_actionImplementationPhases> };

export type ActionFragment_schedule = { __typename: 'ActionSchedule', id: string };

export type ActionFragment_impact = { __typename: 'ActionImpact', id: string, identifier: string };

export type ActionFragment_attributes_type_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type ActionFragment_attributes_type = { __typename: 'AttributeType', id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: ActionFragment_attributes_type_unit | null };

export type ActionFragment_attributes_AttributeChoice_choice = { __typename: 'AttributeTypeChoiceOption', id: string, name: string };

export type ActionFragment_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, type: ActionFragment_attributes_type };

export type ActionFragment_attributes_AttributeChoice = { __typename: 'AttributeChoice', text: string | null, id: string, choice: ActionFragment_attributes_AttributeChoice_choice | null, type: ActionFragment_attributes_type };

export type ActionFragment_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: ActionFragment_attributes_type };

export type ActionFragment_attributes_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, type: ActionFragment_attributes_type };

export type ActionFragment_attributes_AttributeText = { __typename: 'AttributeText', value: string, id: string, type: ActionFragment_attributes_type };

export type ActionFragment_attributes =
  | ActionFragment_attributes_AttributeCategoryChoice
  | ActionFragment_attributes_AttributeChoice
  | ActionFragment_attributes_AttributeNumericValue
  | ActionFragment_attributes_AttributeRichText
  | ActionFragment_attributes_AttributeText
;

export type ActionFragment_responsibleParties_organization = { __typename: 'Organization', id: string, abbreviation: string | null, name: string };

export type ActionFragment_responsibleParties = { __typename: 'ActionResponsibleParty', id: string, role: ActionResponsiblePartyRole | null, hasContactPerson: boolean, organization: ActionFragment_responsibleParties_organization };

export type ActionFragment_primaryOrg_logo_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ActionFragment_primaryOrg_logo = { __typename: 'Image', id: string, rendition: ActionFragment_primaryOrg_logo_rendition | null };

export type ActionFragment_primaryOrg = { __typename: 'Organization', id: string, abbreviation: string | null, name: string, logo: ActionFragment_primaryOrg_logo | null };

export type ActionFragment_tasks = { __typename: 'ActionTask', id: string, state: ActionTaskState, dueAt: string };

export type ActionFragment_mergedWith_plan = { __typename: 'Plan', id: string, shortName: string | null, viewUrl: string | null };

export type ActionFragment_mergedWith = { __typename: 'Action', id: string, identifier: string, viewUrl: string, plan: ActionFragment_mergedWith_plan };

export type ActionFragment = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: ActionFragment_status | null, categories: Array<ActionFragment_categories>, implementationPhase: ActionFragment_implementationPhase | null, statusSummary: ActionFragment_statusSummary, timeliness: ActionFragment_timeliness, plan: ActionFragment_plan, schedule: Array<ActionFragment_schedule>, impact: ActionFragment_impact | null, attributes: Array<ActionFragment_attributes>, responsibleParties: Array<ActionFragment_responsibleParties>, primaryOrg: ActionFragment_primaryOrg | null, tasks: Array<ActionFragment_tasks>, mergedWith: ActionFragment_mergedWith | null };

export type OrganizationFragment_classification = { __typename: 'OrganizationClass', id: string, name: string };

export type OrganizationFragment_parent = { __typename: 'Organization', id: string };

export type OrganizationFragment = { __typename: 'Organization', id: string, abbreviation: string | null, name: string, contactPersonCount: number, actionCount: number, classification: OrganizationFragment_classification | null, parent: OrganizationFragment_parent | null };

export type DashboardActionListQuery_plan = { __typename: 'Plan', id: string, categoryTypes: Array<PlanFragment_categoryTypes>, primaryOrgs: Array<PlanFragment_primaryOrgs> };

export type DashboardActionListQuery_planActions = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: ActionFragment_status | null, categories: Array<ActionFragment_categories>, implementationPhase: ActionFragment_implementationPhase | null, statusSummary: ActionFragment_statusSummary, timeliness: ActionFragment_timeliness, plan: ActionFragment_plan, schedule: Array<ActionFragment_schedule>, impact: ActionFragment_impact | null, attributes: Array<ActionFragment_attributes>, responsibleParties: Array<ActionFragment_responsibleParties>, primaryOrg: ActionFragment_primaryOrg | null, tasks: Array<ActionFragment_tasks>, mergedWith: ActionFragment_mergedWith | null };

export type DashboardActionListQuery_relatedPlanActions = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: ActionFragment_status | null, categories: Array<ActionFragment_categories>, implementationPhase: ActionFragment_implementationPhase | null, statusSummary: ActionFragment_statusSummary, timeliness: ActionFragment_timeliness, plan: ActionFragment_plan, schedule: Array<ActionFragment_schedule>, impact: ActionFragment_impact | null, attributes: Array<ActionFragment_attributes>, responsibleParties: Array<ActionFragment_responsibleParties>, primaryOrg: ActionFragment_primaryOrg | null, tasks: Array<ActionFragment_tasks>, mergedWith: ActionFragment_mergedWith | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_FieldColumnBlock_attributeType = { __typename: 'AttributeType', id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions>, unit: CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_EndDateColumnBlock = { __typename: 'EndDateColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_FieldColumnBlock = { __typename: 'FieldColumnBlock', columnLabel: string | null, field: string, attributeType: DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_FieldColumnBlock_attributeType | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_NameColumnBlock = { __typename: 'NameColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_StartDateColumnBlock = { __typename: 'StartDateColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_StatusColumnBlock = { __typename: 'StatusColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_TasksColumnBlock = { __typename: 'TasksColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock', columnLabel: string | null };

export type DashboardActionListQuery_planPage_ActionListPage_dashboardColumns =
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_EndDateColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_FieldColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_IdentifierColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_ImplementationPhaseColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_IndicatorsColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_NameColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_OrganizationColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_ResponsiblePartiesColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_ScheduleContinuousColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_StartDateColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_StatusColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_TasksColumnBlock
  | DashboardActionListQuery_planPage_ActionListPage_dashboardColumns_UpdatedAtColumnBlock
;

export type DashboardActionListQuery_planPage_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null };

export type DashboardActionListQuery_planPage_ActionListPage = { __typename: 'ActionListPage', id: string | null, dashboardColumns: Array<DashboardActionListQuery_planPage_ActionListPage_dashboardColumns> | null };

export type DashboardActionListQuery_planPage_CategoryPage = { __typename: 'CategoryPage', id: string | null };

export type DashboardActionListQuery_planPage_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null };

export type DashboardActionListQuery_planPage_EmptyPage = { __typename: 'EmptyPage', id: string | null };

export type DashboardActionListQuery_planPage_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null };

export type DashboardActionListQuery_planPage_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null };

export type DashboardActionListQuery_planPage_Page = { __typename: 'Page', id: string | null };

export type DashboardActionListQuery_planPage_PlanRootPage = { __typename: 'PlanRootPage', id: string | null };

export type DashboardActionListQuery_planPage_PledgeListPage = { __typename: 'PledgeListPage', id: string | null };

export type DashboardActionListQuery_planPage_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null };

export type DashboardActionListQuery_planPage_StaticPage = { __typename: 'StaticPage', id: string | null };

export type DashboardActionListQuery_planPage =
  | DashboardActionListQuery_planPage_AccessibilityStatementPage
  | DashboardActionListQuery_planPage_ActionListPage
  | DashboardActionListQuery_planPage_CategoryPage
  | DashboardActionListQuery_planPage_CategoryTypePage
  | DashboardActionListQuery_planPage_EmptyPage
  | DashboardActionListQuery_planPage_ImpactGroupPage
  | DashboardActionListQuery_planPage_IndicatorListPage
  | DashboardActionListQuery_planPage_Page
  | DashboardActionListQuery_planPage_PlanRootPage
  | DashboardActionListQuery_planPage_PledgeListPage
  | DashboardActionListQuery_planPage_PrivacyPolicyPage
  | DashboardActionListQuery_planPage_StaticPage
;

export type DashboardActionListQuery_planOrganizations = { __typename: 'Organization', id: string, abbreviation: string | null, name: string, contactPersonCount: number, actionCount: number, classification: OrganizationFragment_classification | null, parent: OrganizationFragment_parent | null };

export type DashboardActionListQuery = { __typename: 'Query', plan: DashboardActionListQuery_plan | null, planActions?: Array<DashboardActionListQuery_planActions> | null, relatedPlanActions?: Array<DashboardActionListQuery_relatedPlanActions> | null, planPage: DashboardActionListQuery_planPage | null, planOrganizations: Array<DashboardActionListQuery_planOrganizations> | null };


export type DashboardActionListQueryVariables = Exact<{
  plan: string | number;
  relatedPlanActions: boolean;
  path: string;
  workflow: WorkflowState | null | undefined;
}>;

export type EmbedActionQuery_action_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type EmbedActionQuery_action_plan = { __typename: 'Plan', id: string };

export type EmbedActionQuery_action_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier };

export type EmbedActionQuery_action_status = { __typename: 'ActionStatus', id: string, identifier: string, name: string, color: string };

export type EmbedActionQuery_action_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, name: string, identifier: string };

export type EmbedActionQuery_action_categories_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type EmbedActionQuery_action_categories_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type EmbedActionQuery_action_categories_parent_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type EmbedActionQuery_action_categories_parent_parent = { __typename: 'Category', id: string, image: EmbedActionQuery_action_categories_parent_parent_image | null };

export type EmbedActionQuery_action_categories_parent = { __typename: 'Category', id: string, image: EmbedActionQuery_action_categories_parent_image | null, parent: EmbedActionQuery_action_categories_parent_parent | null };

export type EmbedActionQuery_action_categories = { __typename: 'Category', id: string, image: EmbedActionQuery_action_categories_image | null, parent: EmbedActionQuery_action_categories_parent | null };

export type EmbedActionQuery_action = { __typename: 'Action', id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, color: string | null, image: EmbedActionQuery_action_image | null, plan: EmbedActionQuery_action_plan, statusSummary: EmbedActionQuery_action_statusSummary, status: EmbedActionQuery_action_status | null, implementationPhase: EmbedActionQuery_action_implementationPhase | null, categories: Array<EmbedActionQuery_action_categories> };

export type EmbedActionQuery = { __typename: 'Query', action: EmbedActionQuery_action | null };


export type EmbedActionQueryVariables = Exact<{
  plan: string | number;
  identifier: string | number;
}>;

export type IndicatorHightlightListQuery_planIndicators_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type IndicatorHightlightListQuery_planIndicators_latestValue = { __typename: 'IndicatorValue', id: string, value: number };

export type IndicatorHightlightListQuery_planIndicators = { __typename: 'Indicator', id: string, identifier: string | null, name: string, updatedAt: string, level: string | null, unit: IndicatorHightlightListQuery_planIndicators_unit, latestValue: IndicatorHightlightListQuery_planIndicators_latestValue | null };

export type IndicatorHightlightListQuery = { __typename: 'Query', planIndicators: Array<IndicatorHightlightListQuery_planIndicators> | null };


export type IndicatorHightlightListQueryVariables = Exact<{
  plan: string | number;
  first: number;
  orderBy: string;
}>;

export type CreatePledgeFeedbackMutation_createUserFeedback_feedback = { __typename: 'UserFeedbackNode', id: string, createdAt: string };

export type CreatePledgeFeedbackMutation_createUserFeedback_errors = { __typename: 'ErrorType', field: string, messages: Array<string> };

export type CreatePledgeFeedbackMutation_createUserFeedback = { __typename: 'UserFeedbackMutationPayload', feedback: CreatePledgeFeedbackMutation_createUserFeedback_feedback | null, errors: Array<CreatePledgeFeedbackMutation_createUserFeedback_errors> };

export type CreatePledgeFeedbackMutation = { __typename: 'Mutation', createUserFeedback: CreatePledgeFeedbackMutation_createUserFeedback | null };


export type CreatePledgeFeedbackMutationVariables = Exact<{
  input: UserFeedbackMutationInput;
}>;

export type RegisterPublicUserMutation_pledge_registerUser = { __typename: 'RegisterPublicUserPayload', uuid: string };

export type RegisterPublicUserMutation_pledge = { __typename: 'PledgeMutations', registerUser: RegisterPublicUserMutation_pledge_registerUser | null };

export type RegisterPublicUserMutation = { __typename: 'Mutation', pledge: RegisterPublicUserMutation_pledge };


export type RegisterPublicUserMutationVariables = Exact<{ [key: string]: never; }>;

export type CommitToPledgeMutation_pledge_commitToPledge = { __typename: 'CommitToPledgePayload', committed: boolean };

export type CommitToPledgeMutation_pledge = { __typename: 'PledgeMutations', commitToPledge: CommitToPledgeMutation_pledge_commitToPledge | null };

export type CommitToPledgeMutation = { __typename: 'Mutation', pledge: CommitToPledgeMutation_pledge };


export type CommitToPledgeMutationVariables = Exact<{
  user: string;
  pledge: string | number;
  committed: boolean;
}>;

export type PublicUserDataMutation_pledge_setUserData = { __typename: 'SetUserDataPayload', uuid: string };

export type PublicUserDataMutation_pledge = { __typename: 'PledgeMutations', setUserData: PublicUserDataMutation_pledge_setUserData | null };

export type PublicUserDataMutation = { __typename: 'Mutation', pledge: PublicUserDataMutation_pledge };


export type PublicUserDataMutationVariables = Exact<{
  user: string;
  key: string;
  value: string;
}>;

export type PublicUserQuery_publicUser_commitments_pledge = { __typename: 'Pledge', id: string, slug: string, name: string };

export type PublicUserQuery_publicUser_commitments = { __typename: 'PledgeCommitment', id: string, pledge: PublicUserQuery_publicUser_commitments_pledge | null };

export type PublicUserQuery_publicUser = { __typename: 'PublicUser', id: string, uuid: string, userData: string, commitments: Array<PublicUserQuery_publicUser_commitments> | null };

export type PublicUserQuery = { __typename: 'Query', publicUser: PublicUserQuery_publicUser | null };


export type PublicUserQueryVariables = Exact<{
  user: string;
}>;

export type AttributesBlockAttributeFragment_categories = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes>, parent: ActionListQuery_planActions_categories_parent | null };

export type AttributesBlockAttributeFragment_type_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type AttributesBlockAttributeFragment_type = { __typename: 'AttributeType', id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: AttributesBlockAttributeFragment_type_unit | null };

export type AttributesBlockAttributeFragment_AttributeChoice_choice = { __typename: 'AttributeTypeChoiceOption', id: string, identifier: string, name: string };

type AttributesBlockAttribute_AttributeCategoryChoice_Fragment = { __typename: 'AttributeCategoryChoice', id: string, categories: Array<AttributesBlockAttributeFragment_categories>, type: AttributesBlockAttributeFragment_type };

type AttributesBlockAttribute_AttributeChoice_Fragment = { __typename: 'AttributeChoice', text: string | null, id: string, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null, type: AttributesBlockAttributeFragment_type };

type AttributesBlockAttribute_AttributeNumericValue_Fragment = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeFragment_type };

type AttributesBlockAttribute_AttributeRichText_Fragment = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeFragment_type };

type AttributesBlockAttribute_AttributeText_Fragment = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeFragment_type };

export type AttributesBlockAttributeFragment =
  | AttributesBlockAttribute_AttributeCategoryChoice_Fragment
  | AttributesBlockAttribute_AttributeChoice_Fragment
  | AttributesBlockAttribute_AttributeNumericValue_Fragment
  | AttributesBlockAttribute_AttributeRichText_Fragment
  | AttributesBlockAttribute_AttributeText_Fragment
;

export type AttributesBlockAttributeTypeFragment = { __typename: 'AttributeType', id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions>, unit: CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit | null };

export type AttributesBlockAttributeWithNestedTypeFragment_type_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type AttributesBlockAttributeWithNestedTypeFragment_type = { __typename: 'AttributeType', id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: AttributesBlockAttributeWithNestedTypeFragment_type_unit | null, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions> };

type AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment = { __typename: 'AttributeCategoryChoice', id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, categories: Array<AttributesBlockAttributeFragment_categories> };

type AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment = { __typename: 'AttributeChoice', text: string | null, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null };

type AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeWithNestedTypeFragment_type };

type AttributesBlockAttributeWithNestedType_AttributeRichText_Fragment = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

type AttributesBlockAttributeWithNestedType_AttributeText_Fragment = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type AttributesBlockAttributeWithNestedTypeFragment =
  | AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment
  | AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment
  | AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment
  | AttributesBlockAttributeWithNestedType_AttributeRichText_Fragment
  | AttributesBlockAttributeWithNestedType_AttributeText_Fragment
;

export type ActionCardFragment = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionListFilterFragment_ActionAttributeTypeFilterBlock_attributeType_choiceOptions = { __typename: 'AttributeTypeChoiceOption', id: string, identifier: string, name: string };

export type ActionListFilterFragment_ActionAttributeTypeFilterBlock_attributeType = { __typename: 'AttributeType', id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<ActionListFilterFragment_ActionAttributeTypeFilterBlock_attributeType_choiceOptions> };

export type ActionListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_parent = { __typename: 'Category', id: string };

export type ActionListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_common = { __typename: 'CommonCategory', id: string };

export type ActionListFilterFragment_CategoryTypeFilterBlock_categoryType_categories = { __typename: 'Category', id: string, identifier: string, name: string, order: number, helpText: string, parent: ActionListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_parent | null, common: ActionListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_common | null };

export type ActionListFilterFragment_CategoryTypeFilterBlock_categoryType = { __typename: 'CategoryType', id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<ActionListFilterFragment_CategoryTypeFilterBlock_categoryType_categories> };

type ActionListFilter_AccessibilityStatementComplianceStatusBlock_Fragment = { __typename: 'AccessibilityStatementComplianceStatusBlock', field: string };

type ActionListFilter_AccessibilityStatementContactFormBlock_Fragment = { __typename: 'AccessibilityStatementContactFormBlock', field: string };

type ActionListFilter_AccessibilityStatementContactInformationBlock_Fragment = { __typename: 'AccessibilityStatementContactInformationBlock', field: string };

type ActionListFilter_AccessibilityStatementPreparationInformationBlock_Fragment = { __typename: 'AccessibilityStatementPreparationInformationBlock', field: string };

type ActionListFilter_ActionAttributeTypeFilterBlock_Fragment = { __typename: 'ActionAttributeTypeFilterBlock', showAllLabel: string | null, field: string, attributeType: ActionListFilterFragment_ActionAttributeTypeFilterBlock_attributeType };

type ActionListFilter_ActionAttributeTypeReportFieldBlock_Fragment = { __typename: 'ActionAttributeTypeReportFieldBlock', field: string };

type ActionListFilter_ActionCategoryFilterCardBlock_Fragment = { __typename: 'ActionCategoryFilterCardBlock', field: string };

type ActionListFilter_ActionCategoryFilterCardsBlock_Fragment = { __typename: 'ActionCategoryFilterCardsBlock', field: string };

type ActionListFilter_ActionCategoryReportFieldBlock_Fragment = { __typename: 'ActionCategoryReportFieldBlock', field: string };

type ActionListFilter_ActionContactFormBlock_Fragment = { __typename: 'ActionContactFormBlock', field: string };

type ActionListFilter_ActionContactPersonsBlock_Fragment = { __typename: 'ActionContactPersonsBlock', field: string };

type ActionListFilter_ActionContentAttributeTypeBlock_Fragment = { __typename: 'ActionContentAttributeTypeBlock', field: string };

type ActionListFilter_ActionContentCategoryTypeBlock_Fragment = { __typename: 'ActionContentCategoryTypeBlock', field: string };

type ActionListFilter_ActionContentSectionBlock_Fragment = { __typename: 'ActionContentSectionBlock', field: string };

type ActionListFilter_ActionDependenciesBlock_Fragment = { __typename: 'ActionDependenciesBlock', field: string };

type ActionListFilter_ActionDescriptionBlock_Fragment = { __typename: 'ActionDescriptionBlock', field: string };

type ActionListFilter_ActionEndDateBlock_Fragment = { __typename: 'ActionEndDateBlock', field: string };

type ActionListFilter_ActionHighlightsBlock_Fragment = { __typename: 'ActionHighlightsBlock', field: string };

type ActionListFilter_ActionImplementationPhaseFilterBlock_Fragment = { __typename: 'ActionImplementationPhaseFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

type ActionListFilter_ActionImplementationPhaseReportFieldBlock_Fragment = { __typename: 'ActionImplementationPhaseReportFieldBlock', field: string };

type ActionListFilter_ActionLeadParagraphBlock_Fragment = { __typename: 'ActionLeadParagraphBlock', field: string };

type ActionListFilter_ActionLinksBlock_Fragment = { __typename: 'ActionLinksBlock', field: string };

type ActionListFilter_ActionListBlock_Fragment = { __typename: 'ActionListBlock', field: string };

type ActionListFilter_ActionManualStatusReasonBlock_Fragment = { __typename: 'ActionManualStatusReasonBlock', field: string };

type ActionListFilter_ActionMergedActionsBlock_Fragment = { __typename: 'ActionMergedActionsBlock', field: string };

type ActionListFilter_ActionOfficialNameBlock_Fragment = { __typename: 'ActionOfficialNameBlock', field: string };

type ActionListFilter_ActionPledgesBlock_Fragment = { __typename: 'ActionPledgesBlock', field: string };

type ActionListFilter_ActionPrimaryOrgBlock_Fragment = { __typename: 'ActionPrimaryOrgBlock', field: string };

type ActionListFilter_ActionRelatedActionsBlock_Fragment = { __typename: 'ActionRelatedActionsBlock', field: string };

type ActionListFilter_ActionRelatedIndicatorsBlock_Fragment = { __typename: 'ActionRelatedIndicatorsBlock', field: string };

type ActionListFilter_ActionResponsiblePartiesBlock_Fragment = { __typename: 'ActionResponsiblePartiesBlock', field: string };

type ActionListFilter_ActionResponsiblePartyReportFieldBlock_Fragment = { __typename: 'ActionResponsiblePartyReportFieldBlock', field: string };

type ActionListFilter_ActionScheduleBlock_Fragment = { __typename: 'ActionScheduleBlock', field: string };

type ActionListFilter_ActionScheduleContinuousBlock_Fragment = { __typename: 'ActionScheduleContinuousBlock', field: string };

type ActionListFilter_ActionScheduleFilterBlock_Fragment = { __typename: 'ActionScheduleFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

type ActionListFilter_ActionStartDateBlock_Fragment = { __typename: 'ActionStartDateBlock', field: string };

type ActionListFilter_ActionStatusFilterBlock_Fragment = { __typename: 'ActionStatusFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

type ActionListFilter_ActionStatusGraphsBlock_Fragment = { __typename: 'ActionStatusGraphsBlock', field: string };

type ActionListFilter_ActionStatusReportFieldBlock_Fragment = { __typename: 'ActionStatusReportFieldBlock', field: string };

type ActionListFilter_ActionTasksBlock_Fragment = { __typename: 'ActionTasksBlock', field: string };

type ActionListFilter_ActionUpdatedAtBlock_Fragment = { __typename: 'ActionUpdatedAtBlock', field: string };

type ActionListFilter_AdaptiveEmbedBlock_Fragment = { __typename: 'AdaptiveEmbedBlock', field: string };

type ActionListFilter_BlockQuoteBlock_Fragment = { __typename: 'BlockQuoteBlock', field: string };

type ActionListFilter_BooleanBlock_Fragment = { __typename: 'BooleanBlock', field: string };

type ActionListFilter_CardBlock_Fragment = { __typename: 'CardBlock', field: string };

type ActionListFilter_CardListBlock_Fragment = { __typename: 'CardListBlock', field: string };

type ActionListFilter_CartographyVisualisationBlock_Fragment = { __typename: 'CartographyVisualisationBlock', field: string };

type ActionListFilter_CategoryListBlock_Fragment = { __typename: 'CategoryListBlock', field: string };

type ActionListFilter_CategoryPageAttributeTypeBlock_Fragment = { __typename: 'CategoryPageAttributeTypeBlock', field: string };

type ActionListFilter_CategoryPageBodyBlock_Fragment = { __typename: 'CategoryPageBodyBlock', field: string };

type ActionListFilter_CategoryPageCategoryListBlock_Fragment = { __typename: 'CategoryPageCategoryListBlock', field: string };

type ActionListFilter_CategoryPageContactFormBlock_Fragment = { __typename: 'CategoryPageContactFormBlock', field: string };

type ActionListFilter_CategoryPageProgressBlock_Fragment = { __typename: 'CategoryPageProgressBlock', field: string };

type ActionListFilter_CategoryTreeMapBlock_Fragment = { __typename: 'CategoryTreeMapBlock', field: string };

type ActionListFilter_CategoryTypeDatasetsBlock_Fragment = { __typename: 'CategoryTypeDatasetsBlock', field: string };

type ActionListFilter_CategoryTypeFilterBlock_Fragment = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: ActionListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

type ActionListFilter_CategoryTypeLevelListBlock_Fragment = { __typename: 'CategoryTypeLevelListBlock', field: string };

type ActionListFilter_ChangeLogMessageBlock_Fragment = { __typename: 'ChangeLogMessageBlock', field: string };

type ActionListFilter_CharBlock_Fragment = { __typename: 'CharBlock', field: string };

type ActionListFilter_ChoiceBlock_Fragment = { __typename: 'ChoiceBlock', field: string };

type ActionListFilter_ContinuousActionFilterBlock_Fragment = { __typename: 'ContinuousActionFilterBlock', id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

type ActionListFilter_DashboardHeaderBlock_Fragment = { __typename: 'DashboardHeaderBlock', field: string };

type ActionListFilter_DashboardIndicatorAreaChartBlock_Fragment = { __typename: 'DashboardIndicatorAreaChartBlock', field: string };

type ActionListFilter_DashboardIndicatorBarChartBlock_Fragment = { __typename: 'DashboardIndicatorBarChartBlock', field: string };

type ActionListFilter_DashboardIndicatorLineChartBlock_Fragment = { __typename: 'DashboardIndicatorLineChartBlock', field: string };

type ActionListFilter_DashboardIndicatorPieChartBlock_Fragment = { __typename: 'DashboardIndicatorPieChartBlock', field: string };

type ActionListFilter_DashboardIndicatorSummaryBlock_Fragment = { __typename: 'DashboardIndicatorSummaryBlock', field: string };

type ActionListFilter_DashboardParagraphBlock_Fragment = { __typename: 'DashboardParagraphBlock', field: string };

type ActionListFilter_DashboardRowBlock_Fragment = { __typename: 'DashboardRowBlock', field: string };

type ActionListFilter_DateBlock_Fragment = { __typename: 'DateBlock', field: string };

type ActionListFilter_DateTimeBlock_Fragment = { __typename: 'DateTimeBlock', field: string };

type ActionListFilter_DecimalBlock_Fragment = { __typename: 'DecimalBlock', field: string };

type ActionListFilter_DocumentChooserBlock_Fragment = { __typename: 'DocumentChooserBlock', field: string };

type ActionListFilter_EmailBlock_Fragment = { __typename: 'EmailBlock', field: string };

type ActionListFilter_EmbedBlock_Fragment = { __typename: 'EmbedBlock', field: string };

type ActionListFilter_EndDateColumnBlock_Fragment = { __typename: 'EndDateColumnBlock', field: string };

type ActionListFilter_FieldColumnBlock_Fragment = { __typename: 'FieldColumnBlock', field: string };

type ActionListFilter_FloatBlock_Fragment = { __typename: 'FloatBlock', field: string };

type ActionListFilter_FormChoiceBlock_Fragment = { __typename: 'FormChoiceBlock', field: string };

type ActionListFilter_FormFieldBlock_Fragment = { __typename: 'FormFieldBlock', field: string };

type ActionListFilter_FrontPageHeroAdditionalSettingsBlock_Fragment = { __typename: 'FrontPageHeroAdditionalSettingsBlock', field: string };

type ActionListFilter_FrontPageHeroBlock_Fragment = { __typename: 'FrontPageHeroBlock', field: string };

type ActionListFilter_IdentifierColumnBlock_Fragment = { __typename: 'IdentifierColumnBlock', field: string };

type ActionListFilter_ImageBlock_Fragment = { __typename: 'ImageBlock', field: string };

type ActionListFilter_ImageChooserBlock_Fragment = { __typename: 'ImageChooserBlock', field: string };

type ActionListFilter_ImplementationPhaseColumnBlock_Fragment = { __typename: 'ImplementationPhaseColumnBlock', field: string };

type ActionListFilter_IndicatorBlock_Fragment = { __typename: 'IndicatorBlock', field: string };

type ActionListFilter_IndicatorCategoryColumn_Fragment = { __typename: 'IndicatorCategoryColumn', field: string };

type ActionListFilter_IndicatorCategoryContentBlock_Fragment = { __typename: 'IndicatorCategoryContentBlock', field: string };

type ActionListFilter_IndicatorCausalChainBlock_Fragment = { __typename: 'IndicatorCausalChainBlock', field: string };

type ActionListFilter_IndicatorContentBlock_Fragment = { __typename: 'IndicatorContentBlock', field: string };

type ActionListFilter_IndicatorFactorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorFactorValueSummaryContentBlock', field: string };

type ActionListFilter_IndicatorFilterBlock_Fragment = { __typename: 'IndicatorFilterBlock', field: string };

type ActionListFilter_IndicatorGroupBlock_Fragment = { __typename: 'IndicatorGroupBlock', field: string };

type ActionListFilter_IndicatorHighlightsBlock_Fragment = { __typename: 'IndicatorHighlightsBlock', field: string };

type ActionListFilter_IndicatorListColumn_Fragment = { __typename: 'IndicatorListColumn', field: string };

type ActionListFilter_IndicatorShowcaseBlock_Fragment = { __typename: 'IndicatorShowcaseBlock', field: string };

type ActionListFilter_IndicatorValueColumn_Fragment = { __typename: 'IndicatorValueColumn', field: string };

type ActionListFilter_IndicatorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorValueSummaryContentBlock', field: string };

type ActionListFilter_IndicatorVisualizationContentBlock_Fragment = { __typename: 'IndicatorVisualizationContentBlock', field: string };

type ActionListFilter_IndicatorsColumnBlock_Fragment = { __typename: 'IndicatorsColumnBlock', field: string };

type ActionListFilter_IntegerBlock_Fragment = { __typename: 'IntegerBlock', field: string };

type ActionListFilter_LargeImageBlock_Fragment = { __typename: 'LargeImageBlock', field: string };

type ActionListFilter_NameColumnBlock_Fragment = { __typename: 'NameColumnBlock', field: string };

type ActionListFilter_OrganizationColumnBlock_Fragment = { __typename: 'OrganizationColumnBlock', field: string };

type ActionListFilter_PageChooserBlock_Fragment = { __typename: 'PageChooserBlock', field: string };

type ActionListFilter_PageLinkBlock_Fragment = { __typename: 'PageLinkBlock', field: string };

type ActionListFilter_PathsNodeSummaryBlock_Fragment = { __typename: 'PathsNodeSummaryBlock', field: string };

type ActionListFilter_PathsOutcomeBlock_Fragment = { __typename: 'PathsOutcomeBlock', field: string };

type ActionListFilter_PlanDatasetsBlock_Fragment = { __typename: 'PlanDatasetsBlock', field: string };

type ActionListFilter_PlanFilterBlock_Fragment = { __typename: 'PlanFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

type ActionListFilter_PrimaryOrganizationFilterBlock_Fragment = { __typename: 'PrimaryOrganizationFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

type ActionListFilter_QuestionAnswerBlock_Fragment = { __typename: 'QuestionAnswerBlock', field: string };

type ActionListFilter_QuestionBlock_Fragment = { __typename: 'QuestionBlock', field: string };

type ActionListFilter_RawHtmlBlock_Fragment = { __typename: 'RawHTMLBlock', field: string };

type ActionListFilter_RegexBlock_Fragment = { __typename: 'RegexBlock', field: string };

type ActionListFilter_RelatedIndicatorsBlock_Fragment = { __typename: 'RelatedIndicatorsBlock', field: string };

type ActionListFilter_RelatedPlanListBlock_Fragment = { __typename: 'RelatedPlanListBlock', field: string };

type ActionListFilter_ReportComparisonBlock_Fragment = { __typename: 'ReportComparisonBlock', field: string };

type ActionListFilter_ReportTypeFieldChooserBlock_Fragment = { __typename: 'ReportTypeFieldChooserBlock', field: string };

type ActionListFilter_ResponsiblePartiesColumnBlock_Fragment = { __typename: 'ResponsiblePartiesColumnBlock', field: string };

type ActionListFilter_ResponsiblePartyFilterBlock_Fragment = { __typename: 'ResponsiblePartyFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

type ActionListFilter_RichTextBlock_Fragment = { __typename: 'RichTextBlock', field: string };

type ActionListFilter_ScheduleContinuousColumnBlock_Fragment = { __typename: 'ScheduleContinuousColumnBlock', field: string };

type ActionListFilter_SnippetChooserBlock_Fragment = { __typename: 'SnippetChooserBlock', field: string };

type ActionListFilter_StartDateColumnBlock_Fragment = { __typename: 'StartDateColumnBlock', field: string };

type ActionListFilter_StaticBlock_Fragment = { __typename: 'StaticBlock', field: string };

type ActionListFilter_StatusColumnBlock_Fragment = { __typename: 'StatusColumnBlock', field: string };

type ActionListFilter_StreamBlock_Fragment = { __typename: 'StreamBlock', field: string };

type ActionListFilter_StreamFieldBlock_Fragment = { __typename: 'StreamFieldBlock', field: string };

type ActionListFilter_StructBlock_Fragment = { __typename: 'StructBlock', field: string };

type ActionListFilter_TasksColumnBlock_Fragment = { __typename: 'TasksColumnBlock', field: string };

type ActionListFilter_TextBlock_Fragment = { __typename: 'TextBlock', field: string };

type ActionListFilter_TimeBlock_Fragment = { __typename: 'TimeBlock', field: string };

type ActionListFilter_UrlBlock_Fragment = { __typename: 'URLBlock', field: string };

type ActionListFilter_UpdatedAtColumnBlock_Fragment = { __typename: 'UpdatedAtColumnBlock', field: string };

export type ActionListFilterFragment =
  | ActionListFilter_AccessibilityStatementComplianceStatusBlock_Fragment
  | ActionListFilter_AccessibilityStatementContactFormBlock_Fragment
  | ActionListFilter_AccessibilityStatementContactInformationBlock_Fragment
  | ActionListFilter_AccessibilityStatementPreparationInformationBlock_Fragment
  | ActionListFilter_ActionAttributeTypeFilterBlock_Fragment
  | ActionListFilter_ActionAttributeTypeReportFieldBlock_Fragment
  | ActionListFilter_ActionCategoryFilterCardBlock_Fragment
  | ActionListFilter_ActionCategoryFilterCardsBlock_Fragment
  | ActionListFilter_ActionCategoryReportFieldBlock_Fragment
  | ActionListFilter_ActionContactFormBlock_Fragment
  | ActionListFilter_ActionContactPersonsBlock_Fragment
  | ActionListFilter_ActionContentAttributeTypeBlock_Fragment
  | ActionListFilter_ActionContentCategoryTypeBlock_Fragment
  | ActionListFilter_ActionContentSectionBlock_Fragment
  | ActionListFilter_ActionDependenciesBlock_Fragment
  | ActionListFilter_ActionDescriptionBlock_Fragment
  | ActionListFilter_ActionEndDateBlock_Fragment
  | ActionListFilter_ActionHighlightsBlock_Fragment
  | ActionListFilter_ActionImplementationPhaseFilterBlock_Fragment
  | ActionListFilter_ActionImplementationPhaseReportFieldBlock_Fragment
  | ActionListFilter_ActionLeadParagraphBlock_Fragment
  | ActionListFilter_ActionLinksBlock_Fragment
  | ActionListFilter_ActionListBlock_Fragment
  | ActionListFilter_ActionManualStatusReasonBlock_Fragment
  | ActionListFilter_ActionMergedActionsBlock_Fragment
  | ActionListFilter_ActionOfficialNameBlock_Fragment
  | ActionListFilter_ActionPledgesBlock_Fragment
  | ActionListFilter_ActionPrimaryOrgBlock_Fragment
  | ActionListFilter_ActionRelatedActionsBlock_Fragment
  | ActionListFilter_ActionRelatedIndicatorsBlock_Fragment
  | ActionListFilter_ActionResponsiblePartiesBlock_Fragment
  | ActionListFilter_ActionResponsiblePartyReportFieldBlock_Fragment
  | ActionListFilter_ActionScheduleBlock_Fragment
  | ActionListFilter_ActionScheduleContinuousBlock_Fragment
  | ActionListFilter_ActionScheduleFilterBlock_Fragment
  | ActionListFilter_ActionStartDateBlock_Fragment
  | ActionListFilter_ActionStatusFilterBlock_Fragment
  | ActionListFilter_ActionStatusGraphsBlock_Fragment
  | ActionListFilter_ActionStatusReportFieldBlock_Fragment
  | ActionListFilter_ActionTasksBlock_Fragment
  | ActionListFilter_ActionUpdatedAtBlock_Fragment
  | ActionListFilter_AdaptiveEmbedBlock_Fragment
  | ActionListFilter_BlockQuoteBlock_Fragment
  | ActionListFilter_BooleanBlock_Fragment
  | ActionListFilter_CardBlock_Fragment
  | ActionListFilter_CardListBlock_Fragment
  | ActionListFilter_CartographyVisualisationBlock_Fragment
  | ActionListFilter_CategoryListBlock_Fragment
  | ActionListFilter_CategoryPageAttributeTypeBlock_Fragment
  | ActionListFilter_CategoryPageBodyBlock_Fragment
  | ActionListFilter_CategoryPageCategoryListBlock_Fragment
  | ActionListFilter_CategoryPageContactFormBlock_Fragment
  | ActionListFilter_CategoryPageProgressBlock_Fragment
  | ActionListFilter_CategoryTreeMapBlock_Fragment
  | ActionListFilter_CategoryTypeDatasetsBlock_Fragment
  | ActionListFilter_CategoryTypeFilterBlock_Fragment
  | ActionListFilter_CategoryTypeLevelListBlock_Fragment
  | ActionListFilter_ChangeLogMessageBlock_Fragment
  | ActionListFilter_CharBlock_Fragment
  | ActionListFilter_ChoiceBlock_Fragment
  | ActionListFilter_ContinuousActionFilterBlock_Fragment
  | ActionListFilter_DashboardHeaderBlock_Fragment
  | ActionListFilter_DashboardIndicatorAreaChartBlock_Fragment
  | ActionListFilter_DashboardIndicatorBarChartBlock_Fragment
  | ActionListFilter_DashboardIndicatorLineChartBlock_Fragment
  | ActionListFilter_DashboardIndicatorPieChartBlock_Fragment
  | ActionListFilter_DashboardIndicatorSummaryBlock_Fragment
  | ActionListFilter_DashboardParagraphBlock_Fragment
  | ActionListFilter_DashboardRowBlock_Fragment
  | ActionListFilter_DateBlock_Fragment
  | ActionListFilter_DateTimeBlock_Fragment
  | ActionListFilter_DecimalBlock_Fragment
  | ActionListFilter_DocumentChooserBlock_Fragment
  | ActionListFilter_EmailBlock_Fragment
  | ActionListFilter_EmbedBlock_Fragment
  | ActionListFilter_EndDateColumnBlock_Fragment
  | ActionListFilter_FieldColumnBlock_Fragment
  | ActionListFilter_FloatBlock_Fragment
  | ActionListFilter_FormChoiceBlock_Fragment
  | ActionListFilter_FormFieldBlock_Fragment
  | ActionListFilter_FrontPageHeroAdditionalSettingsBlock_Fragment
  | ActionListFilter_FrontPageHeroBlock_Fragment
  | ActionListFilter_IdentifierColumnBlock_Fragment
  | ActionListFilter_ImageBlock_Fragment
  | ActionListFilter_ImageChooserBlock_Fragment
  | ActionListFilter_ImplementationPhaseColumnBlock_Fragment
  | ActionListFilter_IndicatorBlock_Fragment
  | ActionListFilter_IndicatorCategoryColumn_Fragment
  | ActionListFilter_IndicatorCategoryContentBlock_Fragment
  | ActionListFilter_IndicatorCausalChainBlock_Fragment
  | ActionListFilter_IndicatorContentBlock_Fragment
  | ActionListFilter_IndicatorFactorValueSummaryContentBlock_Fragment
  | ActionListFilter_IndicatorFilterBlock_Fragment
  | ActionListFilter_IndicatorGroupBlock_Fragment
  | ActionListFilter_IndicatorHighlightsBlock_Fragment
  | ActionListFilter_IndicatorListColumn_Fragment
  | ActionListFilter_IndicatorShowcaseBlock_Fragment
  | ActionListFilter_IndicatorValueColumn_Fragment
  | ActionListFilter_IndicatorValueSummaryContentBlock_Fragment
  | ActionListFilter_IndicatorVisualizationContentBlock_Fragment
  | ActionListFilter_IndicatorsColumnBlock_Fragment
  | ActionListFilter_IntegerBlock_Fragment
  | ActionListFilter_LargeImageBlock_Fragment
  | ActionListFilter_NameColumnBlock_Fragment
  | ActionListFilter_OrganizationColumnBlock_Fragment
  | ActionListFilter_PageChooserBlock_Fragment
  | ActionListFilter_PageLinkBlock_Fragment
  | ActionListFilter_PathsNodeSummaryBlock_Fragment
  | ActionListFilter_PathsOutcomeBlock_Fragment
  | ActionListFilter_PlanDatasetsBlock_Fragment
  | ActionListFilter_PlanFilterBlock_Fragment
  | ActionListFilter_PrimaryOrganizationFilterBlock_Fragment
  | ActionListFilter_QuestionAnswerBlock_Fragment
  | ActionListFilter_QuestionBlock_Fragment
  | ActionListFilter_RawHtmlBlock_Fragment
  | ActionListFilter_RegexBlock_Fragment
  | ActionListFilter_RelatedIndicatorsBlock_Fragment
  | ActionListFilter_RelatedPlanListBlock_Fragment
  | ActionListFilter_ReportComparisonBlock_Fragment
  | ActionListFilter_ReportTypeFieldChooserBlock_Fragment
  | ActionListFilter_ResponsiblePartiesColumnBlock_Fragment
  | ActionListFilter_ResponsiblePartyFilterBlock_Fragment
  | ActionListFilter_RichTextBlock_Fragment
  | ActionListFilter_ScheduleContinuousColumnBlock_Fragment
  | ActionListFilter_SnippetChooserBlock_Fragment
  | ActionListFilter_StartDateColumnBlock_Fragment
  | ActionListFilter_StaticBlock_Fragment
  | ActionListFilter_StatusColumnBlock_Fragment
  | ActionListFilter_StreamBlock_Fragment
  | ActionListFilter_StreamFieldBlock_Fragment
  | ActionListFilter_StructBlock_Fragment
  | ActionListFilter_TasksColumnBlock_Fragment
  | ActionListFilter_TextBlock_Fragment
  | ActionListFilter_TimeBlock_Fragment
  | ActionListFilter_UrlBlock_Fragment
  | ActionListFilter_UpdatedAtColumnBlock_Fragment
;

export type ActionListPageFiltersFragment_primaryFilters_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', showAllLabel: string | null, field: string, attributeType: ActionListFilterFragment_ActionAttributeTypeFilterBlock_attributeType };

export type ActionListPageFiltersFragment_primaryFilters_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_primaryFilters_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_primaryFilters_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_primaryFilters_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: ActionListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

export type ActionListPageFiltersFragment_primaryFilters_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_primaryFilters_PlanFilterBlock = { __typename: 'PlanFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_primaryFilters_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_primaryFilters_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_primaryFilters =
  | ActionListPageFiltersFragment_primaryFilters_ActionAttributeTypeFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_ActionImplementationPhaseFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_ActionScheduleFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_ActionStatusFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_CategoryTypeFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_ContinuousActionFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_PlanFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_PrimaryOrganizationFilterBlock
  | ActionListPageFiltersFragment_primaryFilters_ResponsiblePartyFilterBlock
;

export type ActionListPageFiltersFragment_mainFilters_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', showAllLabel: string | null, field: string, attributeType: ActionListFilterFragment_ActionAttributeTypeFilterBlock_attributeType };

export type ActionListPageFiltersFragment_mainFilters_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_mainFilters_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_mainFilters_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_mainFilters_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: ActionListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

export type ActionListPageFiltersFragment_mainFilters_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_mainFilters_PlanFilterBlock = { __typename: 'PlanFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_mainFilters_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_mainFilters_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_mainFilters =
  | ActionListPageFiltersFragment_mainFilters_ActionAttributeTypeFilterBlock
  | ActionListPageFiltersFragment_mainFilters_ActionImplementationPhaseFilterBlock
  | ActionListPageFiltersFragment_mainFilters_ActionScheduleFilterBlock
  | ActionListPageFiltersFragment_mainFilters_ActionStatusFilterBlock
  | ActionListPageFiltersFragment_mainFilters_CategoryTypeFilterBlock
  | ActionListPageFiltersFragment_mainFilters_ContinuousActionFilterBlock
  | ActionListPageFiltersFragment_mainFilters_PlanFilterBlock
  | ActionListPageFiltersFragment_mainFilters_PrimaryOrganizationFilterBlock
  | ActionListPageFiltersFragment_mainFilters_ResponsiblePartyFilterBlock
;

export type ActionListPageFiltersFragment_advancedFilters_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', showAllLabel: string | null, field: string, attributeType: ActionListFilterFragment_ActionAttributeTypeFilterBlock_attributeType };

export type ActionListPageFiltersFragment_advancedFilters_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_advancedFilters_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_advancedFilters_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_advancedFilters_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: ActionListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

export type ActionListPageFiltersFragment_advancedFilters_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_advancedFilters_PlanFilterBlock = { __typename: 'PlanFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_advancedFilters_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_advancedFilters_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string };

export type ActionListPageFiltersFragment_advancedFilters =
  | ActionListPageFiltersFragment_advancedFilters_ActionAttributeTypeFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_ActionImplementationPhaseFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_ActionScheduleFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_ActionStatusFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_CategoryTypeFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_ContinuousActionFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_PlanFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_PrimaryOrganizationFilterBlock
  | ActionListPageFiltersFragment_advancedFilters_ResponsiblePartyFilterBlock
;

export type ActionListPageFiltersFragment = { __typename: 'ActionListPage', id: string | null, primaryFilters: Array<ActionListPageFiltersFragment_primaryFilters> | null, mainFilters: Array<ActionListPageFiltersFragment_mainFilters> | null, advancedFilters: Array<ActionListPageFiltersFragment_advancedFilters> | null };

export type ActionTableColumnFragment = { __typename: 'ActionListPage', id: string | null, dashboardColumns: Array<DashboardActionListQuery_planPage_ActionListPage_dashboardColumns> | null };

export type CategoryTypeFragment_levels = { __typename: 'CategoryLevel', id: string, order: number, name: string, namePlural: string | null };

export type CategoryTypeFragment = { __typename: 'CategoryType', id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<CategoryTypeFragment_levels> };

export type CategoryFragment = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type CategoryWithParentsFragment = { __typename: 'Category', id: string, parent: ActionListQuery_planActions_categories_parent | null };

export type CategoryRecursiveFragment = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes>, parent: ActionListQuery_planActions_categories_parent | null };

export type CategoryHeroImagesFragment_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null };

export type CategoryHeroImagesFragment_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null };

export type CategoryHeroImagesFragment_parent_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null };

export type CategoryHeroImagesFragment_parent_parent_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null };

export type CategoryHeroImagesFragment_parent_parent_parent = { __typename: 'Category', id: string, image: CategoryHeroImagesFragment_parent_parent_parent_image | null };

export type CategoryHeroImagesFragment_parent_parent = { __typename: 'Category', id: string, image: CategoryHeroImagesFragment_parent_parent_image | null, parent: CategoryHeroImagesFragment_parent_parent_parent | null };

export type CategoryHeroImagesFragment_parent = { __typename: 'Category', id: string, image: CategoryHeroImagesFragment_parent_image | null, parent: CategoryHeroImagesFragment_parent_parent | null };

export type CategoryHeroImagesFragment = { __typename: 'Category', id: string, image: CategoryHeroImagesFragment_image | null, parent: CategoryHeroImagesFragment_parent | null };

export type CategoryTagFragment_level = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type CategoryTagFragment_iconImage_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type CategoryTagFragment_iconImage = { __typename: 'Image', id: string, rendition: CategoryTagFragment_iconImage_rendition | null };

export type CategoryTagFragment_categoryPage = { __typename: 'CategoryPage', id: string | null, title: string, urlPath: string, live: boolean };

export type CategoryTagFragment_type_levels = { __typename: 'CategoryLevel', id: string, order: number, name: string, namePlural: string | null };

export type CategoryTagFragment_type = { __typename: 'CategoryType', id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<CategoryTagFragment_type_levels> };

export type CategoryTagFragment = { __typename: 'Category', id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: CategoryTagFragment_level | null, iconImage: CategoryTagFragment_iconImage | null, categoryPage: CategoryTagFragment_categoryPage | null, type: CategoryTagFragment_type };

export type CategoryTagWithParentsFragment_parent_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: CategoryTagFragment_level | null, iconImage: CategoryTagFragment_iconImage | null, categoryPage: CategoryTagFragment_categoryPage | null, type: CategoryTagFragment_type };

export type CategoryTagWithParentsFragment_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: CategoryTagWithParentsFragment_parent_parent_parent | null, level: CategoryTagFragment_level | null, iconImage: CategoryTagFragment_iconImage | null, categoryPage: CategoryTagFragment_categoryPage | null, type: CategoryTagFragment_type };

export type CategoryTagWithParentsFragment_parent = { __typename: 'Category', id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: CategoryTagWithParentsFragment_parent_parent | null, level: CategoryTagFragment_level | null, iconImage: CategoryTagFragment_iconImage | null, categoryPage: CategoryTagFragment_categoryPage | null, type: CategoryTagFragment_type };

export type CategoryTagWithParentsFragment = { __typename: 'Category', id: string, parent: CategoryTagWithParentsFragment_parent | null };

export type CategoryTagRecursiveFragment = { __typename: 'Category', id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: CategoryTagFragment_level | null, iconImage: CategoryTagFragment_iconImage | null, categoryPage: CategoryTagFragment_categoryPage | null, type: CategoryTagFragment_type, parent: CategoryTagWithParentsFragment_parent | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_latestValue = { __typename: 'IndicatorValue', id: string, value: number, date: string | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_goals = { __typename: 'IndicatorGoal', id: string, value: number, date: string | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator = { __typename: 'Indicator', id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_latestValue | null, goals: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_goals | null> | null, unit: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_unit };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension_categories = { __typename: 'DimensionCategory', id: string, name: string };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension_categories> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_dimensionCategory = { __typename: 'DimensionCategory', id: string, name: string, defaultColor: string };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_values = { __typename: 'IndicatorValue', id: string, value: number, date: string | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries = { __typename: 'DashboardIndicatorChartSeries', dimensionCategory: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_dimensionCategory | null, values: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_values | null> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_indicator = { __typename: 'Indicator', id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_latestValue | null, goals: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_goals | null> | null, unit: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_unit };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension_categories> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_chartSeries = { __typename: 'DashboardIndicatorChartSeries', dimensionCategory: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_dimensionCategory | null, values: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_values | null> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_indicator = { __typename: 'Indicator', id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_latestValue | null, goals: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_goals | null> | null, unit: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_unit };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension_categories> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_chartSeries = { __typename: 'DashboardIndicatorChartSeries', dimensionCategory: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_dimensionCategory | null, values: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_values | null> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_indicator = { __typename: 'Indicator', id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_latestValue | null, goals: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_goals | null> | null, unit: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_unit };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension_categories> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_chartSeries = { __typename: 'DashboardIndicatorChartSeries', dimensionCategory: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_dimensionCategory | null, values: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_values | null> };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock_indicator = { __typename: 'Indicator', id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_latestValue | null, goals: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_goals | null> | null, unit: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_unit };

export type DashboardIndicatorBlockFragment_blocks_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionContactFormBlock = { __typename: 'ActionContactFormBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionEndDateBlock = { __typename: 'ActionEndDateBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionLinksBlock = { __typename: 'ActionLinksBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionListBlock = { __typename: 'ActionListBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionPledgesBlock = { __typename: 'ActionPledgesBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionScheduleBlock = { __typename: 'ActionScheduleBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionStartDateBlock = { __typename: 'ActionStartDateBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionTasksBlock = { __typename: 'ActionTasksBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_BlockQuoteBlock = { __typename: 'BlockQuoteBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_BooleanBlock = { __typename: 'BooleanBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CardBlock = { __typename: 'CardBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CardListBlock = { __typename: 'CardListBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryListBlock = { __typename: 'CategoryListBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_CharBlock = { __typename: 'CharBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ChoiceBlock = { __typename: 'ChoiceBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock', text: string | null, blockType: string };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock', id: string | null, helpText: string | null, blockType: string, showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries | null> | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock', id: string | null, helpText: string | null, blockType: string, barType: string | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_chartSeries | null> | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock', id: string | null, helpText: string | null, blockType: string, showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_chartSeries | null> | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock', helpText: string | null, blockType: string, year: number | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_chartSeries | null> | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock', id: string | null, blockType: string, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock_indicator | null };

export type DashboardIndicatorBlockFragment_blocks_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock', text: string | null, blockType: string };

export type DashboardIndicatorBlockFragment_blocks_DashboardRowBlock = { __typename: 'DashboardRowBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_DateBlock = { __typename: 'DateBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_DateTimeBlock = { __typename: 'DateTimeBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_DecimalBlock = { __typename: 'DecimalBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_DocumentChooserBlock = { __typename: 'DocumentChooserBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_EmailBlock = { __typename: 'EmailBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_EmbedBlock = { __typename: 'EmbedBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_EndDateColumnBlock = { __typename: 'EndDateColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_FieldColumnBlock = { __typename: 'FieldColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_FloatBlock = { __typename: 'FloatBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_FormChoiceBlock = { __typename: 'FormChoiceBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_FormFieldBlock = { __typename: 'FormFieldBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ImageBlock = { __typename: 'ImageBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ImageChooserBlock = { __typename: 'ImageChooserBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorBlock = { __typename: 'IndicatorBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorListColumn = { __typename: 'IndicatorListColumn', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorValueColumn = { __typename: 'IndicatorValueColumn', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_IntegerBlock = { __typename: 'IntegerBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_LargeImageBlock = { __typename: 'LargeImageBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_NameColumnBlock = { __typename: 'NameColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_PageChooserBlock = { __typename: 'PageChooserBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_PageLinkBlock = { __typename: 'PageLinkBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_PlanFilterBlock = { __typename: 'PlanFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_QuestionBlock = { __typename: 'QuestionBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_RawHTMLBlock = { __typename: 'RawHTMLBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_RegexBlock = { __typename: 'RegexBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ReportComparisonBlock = { __typename: 'ReportComparisonBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_RichTextBlock = { __typename: 'RichTextBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_SnippetChooserBlock = { __typename: 'SnippetChooserBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_StartDateColumnBlock = { __typename: 'StartDateColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_StaticBlock = { __typename: 'StaticBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_StatusColumnBlock = { __typename: 'StatusColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_StreamBlock = { __typename: 'StreamBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_StreamFieldBlock = { __typename: 'StreamFieldBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_StructBlock = { __typename: 'StructBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_TasksColumnBlock = { __typename: 'TasksColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_TextBlock = { __typename: 'TextBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_TimeBlock = { __typename: 'TimeBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_URLBlock = { __typename: 'URLBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock', blockType: string };

export type DashboardIndicatorBlockFragment_blocks =
  | DashboardIndicatorBlockFragment_blocks_AccessibilityStatementComplianceStatusBlock
  | DashboardIndicatorBlockFragment_blocks_AccessibilityStatementContactFormBlock
  | DashboardIndicatorBlockFragment_blocks_AccessibilityStatementContactInformationBlock
  | DashboardIndicatorBlockFragment_blocks_AccessibilityStatementPreparationInformationBlock
  | DashboardIndicatorBlockFragment_blocks_ActionAttributeTypeFilterBlock
  | DashboardIndicatorBlockFragment_blocks_ActionAttributeTypeReportFieldBlock
  | DashboardIndicatorBlockFragment_blocks_ActionCategoryFilterCardBlock
  | DashboardIndicatorBlockFragment_blocks_ActionCategoryFilterCardsBlock
  | DashboardIndicatorBlockFragment_blocks_ActionCategoryReportFieldBlock
  | DashboardIndicatorBlockFragment_blocks_ActionContactFormBlock
  | DashboardIndicatorBlockFragment_blocks_ActionContactPersonsBlock
  | DashboardIndicatorBlockFragment_blocks_ActionContentAttributeTypeBlock
  | DashboardIndicatorBlockFragment_blocks_ActionContentCategoryTypeBlock
  | DashboardIndicatorBlockFragment_blocks_ActionContentSectionBlock
  | DashboardIndicatorBlockFragment_blocks_ActionDependenciesBlock
  | DashboardIndicatorBlockFragment_blocks_ActionDescriptionBlock
  | DashboardIndicatorBlockFragment_blocks_ActionEndDateBlock
  | DashboardIndicatorBlockFragment_blocks_ActionHighlightsBlock
  | DashboardIndicatorBlockFragment_blocks_ActionImplementationPhaseFilterBlock
  | DashboardIndicatorBlockFragment_blocks_ActionImplementationPhaseReportFieldBlock
  | DashboardIndicatorBlockFragment_blocks_ActionLeadParagraphBlock
  | DashboardIndicatorBlockFragment_blocks_ActionLinksBlock
  | DashboardIndicatorBlockFragment_blocks_ActionListBlock
  | DashboardIndicatorBlockFragment_blocks_ActionManualStatusReasonBlock
  | DashboardIndicatorBlockFragment_blocks_ActionMergedActionsBlock
  | DashboardIndicatorBlockFragment_blocks_ActionOfficialNameBlock
  | DashboardIndicatorBlockFragment_blocks_ActionPledgesBlock
  | DashboardIndicatorBlockFragment_blocks_ActionPrimaryOrgBlock
  | DashboardIndicatorBlockFragment_blocks_ActionRelatedActionsBlock
  | DashboardIndicatorBlockFragment_blocks_ActionRelatedIndicatorsBlock
  | DashboardIndicatorBlockFragment_blocks_ActionResponsiblePartiesBlock
  | DashboardIndicatorBlockFragment_blocks_ActionResponsiblePartyReportFieldBlock
  | DashboardIndicatorBlockFragment_blocks_ActionScheduleBlock
  | DashboardIndicatorBlockFragment_blocks_ActionScheduleContinuousBlock
  | DashboardIndicatorBlockFragment_blocks_ActionScheduleFilterBlock
  | DashboardIndicatorBlockFragment_blocks_ActionStartDateBlock
  | DashboardIndicatorBlockFragment_blocks_ActionStatusFilterBlock
  | DashboardIndicatorBlockFragment_blocks_ActionStatusGraphsBlock
  | DashboardIndicatorBlockFragment_blocks_ActionStatusReportFieldBlock
  | DashboardIndicatorBlockFragment_blocks_ActionTasksBlock
  | DashboardIndicatorBlockFragment_blocks_ActionUpdatedAtBlock
  | DashboardIndicatorBlockFragment_blocks_AdaptiveEmbedBlock
  | DashboardIndicatorBlockFragment_blocks_BlockQuoteBlock
  | DashboardIndicatorBlockFragment_blocks_BooleanBlock
  | DashboardIndicatorBlockFragment_blocks_CardBlock
  | DashboardIndicatorBlockFragment_blocks_CardListBlock
  | DashboardIndicatorBlockFragment_blocks_CartographyVisualisationBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryListBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryPageAttributeTypeBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryPageBodyBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryPageCategoryListBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryPageContactFormBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryPageProgressBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryTreeMapBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryTypeDatasetsBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryTypeFilterBlock
  | DashboardIndicatorBlockFragment_blocks_CategoryTypeLevelListBlock
  | DashboardIndicatorBlockFragment_blocks_ChangeLogMessageBlock
  | DashboardIndicatorBlockFragment_blocks_CharBlock
  | DashboardIndicatorBlockFragment_blocks_ChoiceBlock
  | DashboardIndicatorBlockFragment_blocks_ContinuousActionFilterBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardHeaderBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardParagraphBlock
  | DashboardIndicatorBlockFragment_blocks_DashboardRowBlock
  | DashboardIndicatorBlockFragment_blocks_DateBlock
  | DashboardIndicatorBlockFragment_blocks_DateTimeBlock
  | DashboardIndicatorBlockFragment_blocks_DecimalBlock
  | DashboardIndicatorBlockFragment_blocks_DocumentChooserBlock
  | DashboardIndicatorBlockFragment_blocks_EmailBlock
  | DashboardIndicatorBlockFragment_blocks_EmbedBlock
  | DashboardIndicatorBlockFragment_blocks_EndDateColumnBlock
  | DashboardIndicatorBlockFragment_blocks_FieldColumnBlock
  | DashboardIndicatorBlockFragment_blocks_FloatBlock
  | DashboardIndicatorBlockFragment_blocks_FormChoiceBlock
  | DashboardIndicatorBlockFragment_blocks_FormFieldBlock
  | DashboardIndicatorBlockFragment_blocks_FrontPageHeroAdditionalSettingsBlock
  | DashboardIndicatorBlockFragment_blocks_FrontPageHeroBlock
  | DashboardIndicatorBlockFragment_blocks_IdentifierColumnBlock
  | DashboardIndicatorBlockFragment_blocks_ImageBlock
  | DashboardIndicatorBlockFragment_blocks_ImageChooserBlock
  | DashboardIndicatorBlockFragment_blocks_ImplementationPhaseColumnBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorCategoryColumn
  | DashboardIndicatorBlockFragment_blocks_IndicatorCategoryContentBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorCausalChainBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorContentBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorFactorValueSummaryContentBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorFilterBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorGroupBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorHighlightsBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorListColumn
  | DashboardIndicatorBlockFragment_blocks_IndicatorShowcaseBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorValueColumn
  | DashboardIndicatorBlockFragment_blocks_IndicatorValueSummaryContentBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorVisualizationContentBlock
  | DashboardIndicatorBlockFragment_blocks_IndicatorsColumnBlock
  | DashboardIndicatorBlockFragment_blocks_IntegerBlock
  | DashboardIndicatorBlockFragment_blocks_LargeImageBlock
  | DashboardIndicatorBlockFragment_blocks_NameColumnBlock
  | DashboardIndicatorBlockFragment_blocks_OrganizationColumnBlock
  | DashboardIndicatorBlockFragment_blocks_PageChooserBlock
  | DashboardIndicatorBlockFragment_blocks_PageLinkBlock
  | DashboardIndicatorBlockFragment_blocks_PathsNodeSummaryBlock
  | DashboardIndicatorBlockFragment_blocks_PathsOutcomeBlock
  | DashboardIndicatorBlockFragment_blocks_PlanDatasetsBlock
  | DashboardIndicatorBlockFragment_blocks_PlanFilterBlock
  | DashboardIndicatorBlockFragment_blocks_PrimaryOrganizationFilterBlock
  | DashboardIndicatorBlockFragment_blocks_QuestionAnswerBlock
  | DashboardIndicatorBlockFragment_blocks_QuestionBlock
  | DashboardIndicatorBlockFragment_blocks_RawHTMLBlock
  | DashboardIndicatorBlockFragment_blocks_RegexBlock
  | DashboardIndicatorBlockFragment_blocks_RelatedIndicatorsBlock
  | DashboardIndicatorBlockFragment_blocks_RelatedPlanListBlock
  | DashboardIndicatorBlockFragment_blocks_ReportComparisonBlock
  | DashboardIndicatorBlockFragment_blocks_ReportTypeFieldChooserBlock
  | DashboardIndicatorBlockFragment_blocks_ResponsiblePartiesColumnBlock
  | DashboardIndicatorBlockFragment_blocks_ResponsiblePartyFilterBlock
  | DashboardIndicatorBlockFragment_blocks_RichTextBlock
  | DashboardIndicatorBlockFragment_blocks_ScheduleContinuousColumnBlock
  | DashboardIndicatorBlockFragment_blocks_SnippetChooserBlock
  | DashboardIndicatorBlockFragment_blocks_StartDateColumnBlock
  | DashboardIndicatorBlockFragment_blocks_StaticBlock
  | DashboardIndicatorBlockFragment_blocks_StatusColumnBlock
  | DashboardIndicatorBlockFragment_blocks_StreamBlock
  | DashboardIndicatorBlockFragment_blocks_StreamFieldBlock
  | DashboardIndicatorBlockFragment_blocks_StructBlock
  | DashboardIndicatorBlockFragment_blocks_TasksColumnBlock
  | DashboardIndicatorBlockFragment_blocks_TextBlock
  | DashboardIndicatorBlockFragment_blocks_TimeBlock
  | DashboardIndicatorBlockFragment_blocks_URLBlock
  | DashboardIndicatorBlockFragment_blocks_UpdatedAtColumnBlock
;

export type DashboardIndicatorBlockFragment = { __typename: 'DashboardRowBlock', id: string | null, blockType: string, blocks: Array<DashboardIndicatorBlockFragment_blocks> };

export type DashboardIndicatorFragment = { __typename: 'Indicator', id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_latestValue | null, goals: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_goals | null> | null, unit: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator_unit };

export type ChartDimensionFragment = { __typename: 'Dimension', id: string, name: string, categories: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension_categories> };

export type ChartSeriesFragment = { __typename: 'DashboardIndicatorChartSeries', dimensionCategory: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_dimensionCategory | null, values: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries_values | null> };

type BarChartVisualization_DashboardIndicatorBarChartBlock_Fragment = { __typename: 'DashboardIndicatorBarChartBlock', barType: string | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_chartSeries | null> | null };

type BarChartVisualization_IndicatorDefaultBarChart_Fragment = { __typename: 'IndicatorDefaultBarChart', barType: string | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_chartSeries> };

export type BarChartVisualizationFragment =
  | BarChartVisualization_DashboardIndicatorBarChartBlock_Fragment
  | BarChartVisualization_IndicatorDefaultBarChart_Fragment
;

type LineChartVisualization_DashboardIndicatorLineChartBlock_Fragment = { __typename: 'DashboardIndicatorLineChartBlock', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_chartSeries | null> | null };

type LineChartVisualization_IndicatorDefaultLineChart_Fragment = { __typename: 'IndicatorDefaultLineChart', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_chartSeries> };

export type LineChartVisualizationFragment =
  | LineChartVisualization_DashboardIndicatorLineChartBlock_Fragment
  | LineChartVisualization_IndicatorDefaultLineChart_Fragment
;

type AreaChartVisualization_DashboardIndicatorAreaChartBlock_Fragment = { __typename: 'DashboardIndicatorAreaChartBlock', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries | null> | null };

type AreaChartVisualization_IndicatorDefaultAreaChart_Fragment = { __typename: 'IndicatorDefaultAreaChart', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries> };

export type AreaChartVisualizationFragment =
  | AreaChartVisualization_DashboardIndicatorAreaChartBlock_Fragment
  | AreaChartVisualization_IndicatorDefaultAreaChart_Fragment
;

type PieChartVisualization_DashboardIndicatorPieChartBlock_Fragment = { __typename: 'DashboardIndicatorPieChartBlock', year: number | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_indicator | null, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_chartSeries | null> | null };

type PieChartVisualization_IndicatorDefaultPieChart_Fragment = { __typename: 'IndicatorDefaultPieChart', year: number | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_chartSeries> };

export type PieChartVisualizationFragment =
  | PieChartVisualization_DashboardIndicatorPieChartBlock_Fragment
  | PieChartVisualization_IndicatorDefaultPieChart_Fragment
;

type SummaryVisualization_DashboardIndicatorSummaryBlock_Fragment = { __typename: 'DashboardIndicatorSummaryBlock', indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock_indicator | null };

type SummaryVisualization_IndicatorDefaultSummary_Fragment = { __typename: 'IndicatorDefaultSummary', indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock_indicator };

export type SummaryVisualizationFragment =
  | SummaryVisualization_DashboardIndicatorSummaryBlock_Fragment
  | SummaryVisualization_IndicatorDefaultSummary_Fragment
;

export type IndicatorListIndicatorFragment_organization = { __typename: 'Organization', id: string, name: string };

export type IndicatorListIndicatorFragment_common_normalizations_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type IndicatorListIndicatorFragment_common_normalizations_normalizer = { __typename: 'CommonIndicator', name: string, id: string, identifier: string | null };

export type IndicatorListIndicatorFragment_common_normalizations = { __typename: 'CommonIndicatorNormalization', unit: IndicatorListIndicatorFragment_common_normalizations_unit, normalizer: IndicatorListIndicatorFragment_common_normalizations_normalizer };

export type IndicatorListIndicatorFragment_common_relatedCauses_causalIndicator = { __typename: 'CommonIndicator', id: string };

export type IndicatorListIndicatorFragment_common_relatedCauses = { __typename: 'RelatedCommonIndicator', id: string, effectType: RelatedCommonIndicatorEffectType, causalIndicator: IndicatorListIndicatorFragment_common_relatedCauses_causalIndicator };

export type IndicatorListIndicatorFragment_common_relatedEffects_effectIndicator = { __typename: 'CommonIndicator', id: string };

export type IndicatorListIndicatorFragment_common_relatedEffects = { __typename: 'RelatedCommonIndicator', id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: IndicatorListIndicatorFragment_common_relatedEffects_effectIndicator };

export type IndicatorListIndicatorFragment_common = { __typename: 'CommonIndicator', id: string, name: string, normalizations: Array<IndicatorListIndicatorFragment_common_normalizations>, relatedCauses: Array<IndicatorListIndicatorFragment_common_relatedCauses>, relatedEffects: Array<IndicatorListIndicatorFragment_common_relatedEffects> };

export type IndicatorListIndicatorFragment_categories_parent_level = { __typename: 'CategoryLevel', id: string };

export type IndicatorListIndicatorFragment_categories_parent = { __typename: 'Category', id: string, name: string, color: string, level: IndicatorListIndicatorFragment_categories_parent_level | null };

export type IndicatorListIndicatorFragment_categories_type = { __typename: 'CategoryType', id: string, identifier: string };

export type IndicatorListIndicatorFragment_categories_level = { __typename: 'CategoryLevel', id: string };

export type IndicatorListIndicatorFragment_categories_common_type = { __typename: 'CommonCategoryType', name: string, identifier: string };

export type IndicatorListIndicatorFragment_categories_common = { __typename: 'CommonCategory', id: string, type: IndicatorListIndicatorFragment_categories_common_type };

export type IndicatorListIndicatorFragment_categories = { __typename: 'Category', id: string, name: string, color: string, parent: IndicatorListIndicatorFragment_categories_parent | null, type: IndicatorListIndicatorFragment_categories_type, level: IndicatorListIndicatorFragment_categories_level | null, common: IndicatorListIndicatorFragment_categories_common | null };

export type IndicatorListIndicatorFragment_latestValue_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorListIndicatorFragment_latestValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorListIndicatorFragment_latestValue_normalizedValues> };

export type IndicatorListIndicatorFragment_referenceValue_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorListIndicatorFragment_referenceValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorListIndicatorFragment_referenceValue_normalizedValues> };

export type IndicatorListIndicatorFragment_dimensions_dimension_categories = { __typename: 'DimensionCategory', id: string, name: string };

export type IndicatorListIndicatorFragment_dimensions_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<IndicatorListIndicatorFragment_dimensions_dimension_categories> };

export type IndicatorListIndicatorFragment_dimensions = { __typename: 'IndicatorDimension', id: string, dimension: IndicatorListIndicatorFragment_dimensions_dimension };

export type IndicatorListIndicatorFragment_values_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorListIndicatorFragment_values_categories = { __typename: 'DimensionCategory', id: string };

export type IndicatorListIndicatorFragment_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorListIndicatorFragment_values_normalizedValues>, categories: Array<IndicatorListIndicatorFragment_values_categories> };

export type IndicatorListIndicatorFragment_goals_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorListIndicatorFragment_goals_scenario = { __typename: 'Scenario', id: string };

export type IndicatorListIndicatorFragment_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorListIndicatorFragment_goals_normalizedValues>, scenario: IndicatorListIndicatorFragment_goals_scenario | null };

export type IndicatorListIndicatorFragment_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type IndicatorListIndicatorFragment_plans = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null };

export type IndicatorListIndicatorFragment = { __typename: 'Indicator', id: string, name: string, timeResolution: IndicatorTimeResolution, desiredTrend: IndicatorDesiredTrend | null, valueRounding: number | null, sortKey: string | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: IndicatorListIndicatorFragment_organization, common: IndicatorListIndicatorFragment_common | null, categories: Array<IndicatorListIndicatorFragment_categories>, latestValue: IndicatorListIndicatorFragment_latestValue | null, referenceValue: IndicatorListIndicatorFragment_referenceValue | null, dimensions: Array<IndicatorListIndicatorFragment_dimensions>, values: Array<IndicatorListIndicatorFragment_values>, goals: Array<IndicatorListIndicatorFragment_goals | null> | null, unit: IndicatorListIndicatorFragment_unit, plans: Array<IndicatorListIndicatorFragment_plans> };

export type IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_parent = { __typename: 'Category', id: string };

export type IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_common = { __typename: 'CommonCategory', id: string };

export type IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType_categories = { __typename: 'Category', id: string, identifier: string, name: string, order: number, helpText: string, parent: IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_parent | null, common: IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType_categories_common | null };

export type IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType = { __typename: 'CategoryType', id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType_categories> };

type IndicatorListFilter_AccessibilityStatementComplianceStatusBlock_Fragment = { __typename: 'AccessibilityStatementComplianceStatusBlock', field: string };

type IndicatorListFilter_AccessibilityStatementContactFormBlock_Fragment = { __typename: 'AccessibilityStatementContactFormBlock', field: string };

type IndicatorListFilter_AccessibilityStatementContactInformationBlock_Fragment = { __typename: 'AccessibilityStatementContactInformationBlock', field: string };

type IndicatorListFilter_AccessibilityStatementPreparationInformationBlock_Fragment = { __typename: 'AccessibilityStatementPreparationInformationBlock', field: string };

type IndicatorListFilter_ActionAttributeTypeFilterBlock_Fragment = { __typename: 'ActionAttributeTypeFilterBlock', field: string };

type IndicatorListFilter_ActionAttributeTypeReportFieldBlock_Fragment = { __typename: 'ActionAttributeTypeReportFieldBlock', field: string };

type IndicatorListFilter_ActionCategoryFilterCardBlock_Fragment = { __typename: 'ActionCategoryFilterCardBlock', field: string };

type IndicatorListFilter_ActionCategoryFilterCardsBlock_Fragment = { __typename: 'ActionCategoryFilterCardsBlock', field: string };

type IndicatorListFilter_ActionCategoryReportFieldBlock_Fragment = { __typename: 'ActionCategoryReportFieldBlock', field: string };

type IndicatorListFilter_ActionContactFormBlock_Fragment = { __typename: 'ActionContactFormBlock', field: string };

type IndicatorListFilter_ActionContactPersonsBlock_Fragment = { __typename: 'ActionContactPersonsBlock', field: string };

type IndicatorListFilter_ActionContentAttributeTypeBlock_Fragment = { __typename: 'ActionContentAttributeTypeBlock', field: string };

type IndicatorListFilter_ActionContentCategoryTypeBlock_Fragment = { __typename: 'ActionContentCategoryTypeBlock', field: string };

type IndicatorListFilter_ActionContentSectionBlock_Fragment = { __typename: 'ActionContentSectionBlock', field: string };

type IndicatorListFilter_ActionDependenciesBlock_Fragment = { __typename: 'ActionDependenciesBlock', field: string };

type IndicatorListFilter_ActionDescriptionBlock_Fragment = { __typename: 'ActionDescriptionBlock', field: string };

type IndicatorListFilter_ActionEndDateBlock_Fragment = { __typename: 'ActionEndDateBlock', field: string };

type IndicatorListFilter_ActionHighlightsBlock_Fragment = { __typename: 'ActionHighlightsBlock', field: string };

type IndicatorListFilter_ActionImplementationPhaseFilterBlock_Fragment = { __typename: 'ActionImplementationPhaseFilterBlock', field: string };

type IndicatorListFilter_ActionImplementationPhaseReportFieldBlock_Fragment = { __typename: 'ActionImplementationPhaseReportFieldBlock', field: string };

type IndicatorListFilter_ActionLeadParagraphBlock_Fragment = { __typename: 'ActionLeadParagraphBlock', field: string };

type IndicatorListFilter_ActionLinksBlock_Fragment = { __typename: 'ActionLinksBlock', field: string };

type IndicatorListFilter_ActionListBlock_Fragment = { __typename: 'ActionListBlock', field: string };

type IndicatorListFilter_ActionManualStatusReasonBlock_Fragment = { __typename: 'ActionManualStatusReasonBlock', field: string };

type IndicatorListFilter_ActionMergedActionsBlock_Fragment = { __typename: 'ActionMergedActionsBlock', field: string };

type IndicatorListFilter_ActionOfficialNameBlock_Fragment = { __typename: 'ActionOfficialNameBlock', field: string };

type IndicatorListFilter_ActionPledgesBlock_Fragment = { __typename: 'ActionPledgesBlock', field: string };

type IndicatorListFilter_ActionPrimaryOrgBlock_Fragment = { __typename: 'ActionPrimaryOrgBlock', field: string };

type IndicatorListFilter_ActionRelatedActionsBlock_Fragment = { __typename: 'ActionRelatedActionsBlock', field: string };

type IndicatorListFilter_ActionRelatedIndicatorsBlock_Fragment = { __typename: 'ActionRelatedIndicatorsBlock', field: string };

type IndicatorListFilter_ActionResponsiblePartiesBlock_Fragment = { __typename: 'ActionResponsiblePartiesBlock', field: string };

type IndicatorListFilter_ActionResponsiblePartyReportFieldBlock_Fragment = { __typename: 'ActionResponsiblePartyReportFieldBlock', field: string };

type IndicatorListFilter_ActionScheduleBlock_Fragment = { __typename: 'ActionScheduleBlock', field: string };

type IndicatorListFilter_ActionScheduleContinuousBlock_Fragment = { __typename: 'ActionScheduleContinuousBlock', field: string };

type IndicatorListFilter_ActionScheduleFilterBlock_Fragment = { __typename: 'ActionScheduleFilterBlock', field: string };

type IndicatorListFilter_ActionStartDateBlock_Fragment = { __typename: 'ActionStartDateBlock', field: string };

type IndicatorListFilter_ActionStatusFilterBlock_Fragment = { __typename: 'ActionStatusFilterBlock', field: string };

type IndicatorListFilter_ActionStatusGraphsBlock_Fragment = { __typename: 'ActionStatusGraphsBlock', field: string };

type IndicatorListFilter_ActionStatusReportFieldBlock_Fragment = { __typename: 'ActionStatusReportFieldBlock', field: string };

type IndicatorListFilter_ActionTasksBlock_Fragment = { __typename: 'ActionTasksBlock', field: string };

type IndicatorListFilter_ActionUpdatedAtBlock_Fragment = { __typename: 'ActionUpdatedAtBlock', field: string };

type IndicatorListFilter_AdaptiveEmbedBlock_Fragment = { __typename: 'AdaptiveEmbedBlock', field: string };

type IndicatorListFilter_BlockQuoteBlock_Fragment = { __typename: 'BlockQuoteBlock', field: string };

type IndicatorListFilter_BooleanBlock_Fragment = { __typename: 'BooleanBlock', field: string };

type IndicatorListFilter_CardBlock_Fragment = { __typename: 'CardBlock', field: string };

type IndicatorListFilter_CardListBlock_Fragment = { __typename: 'CardListBlock', field: string };

type IndicatorListFilter_CartographyVisualisationBlock_Fragment = { __typename: 'CartographyVisualisationBlock', field: string };

type IndicatorListFilter_CategoryListBlock_Fragment = { __typename: 'CategoryListBlock', field: string };

type IndicatorListFilter_CategoryPageAttributeTypeBlock_Fragment = { __typename: 'CategoryPageAttributeTypeBlock', field: string };

type IndicatorListFilter_CategoryPageBodyBlock_Fragment = { __typename: 'CategoryPageBodyBlock', field: string };

type IndicatorListFilter_CategoryPageCategoryListBlock_Fragment = { __typename: 'CategoryPageCategoryListBlock', field: string };

type IndicatorListFilter_CategoryPageContactFormBlock_Fragment = { __typename: 'CategoryPageContactFormBlock', field: string };

type IndicatorListFilter_CategoryPageProgressBlock_Fragment = { __typename: 'CategoryPageProgressBlock', field: string };

type IndicatorListFilter_CategoryTreeMapBlock_Fragment = { __typename: 'CategoryTreeMapBlock', field: string };

type IndicatorListFilter_CategoryTypeDatasetsBlock_Fragment = { __typename: 'CategoryTypeDatasetsBlock', field: string };

type IndicatorListFilter_CategoryTypeFilterBlock_Fragment = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

type IndicatorListFilter_CategoryTypeLevelListBlock_Fragment = { __typename: 'CategoryTypeLevelListBlock', field: string };

type IndicatorListFilter_ChangeLogMessageBlock_Fragment = { __typename: 'ChangeLogMessageBlock', field: string };

type IndicatorListFilter_CharBlock_Fragment = { __typename: 'CharBlock', field: string };

type IndicatorListFilter_ChoiceBlock_Fragment = { __typename: 'ChoiceBlock', field: string };

type IndicatorListFilter_ContinuousActionFilterBlock_Fragment = { __typename: 'ContinuousActionFilterBlock', field: string };

type IndicatorListFilter_DashboardHeaderBlock_Fragment = { __typename: 'DashboardHeaderBlock', field: string };

type IndicatorListFilter_DashboardIndicatorAreaChartBlock_Fragment = { __typename: 'DashboardIndicatorAreaChartBlock', field: string };

type IndicatorListFilter_DashboardIndicatorBarChartBlock_Fragment = { __typename: 'DashboardIndicatorBarChartBlock', field: string };

type IndicatorListFilter_DashboardIndicatorLineChartBlock_Fragment = { __typename: 'DashboardIndicatorLineChartBlock', field: string };

type IndicatorListFilter_DashboardIndicatorPieChartBlock_Fragment = { __typename: 'DashboardIndicatorPieChartBlock', field: string };

type IndicatorListFilter_DashboardIndicatorSummaryBlock_Fragment = { __typename: 'DashboardIndicatorSummaryBlock', field: string };

type IndicatorListFilter_DashboardParagraphBlock_Fragment = { __typename: 'DashboardParagraphBlock', field: string };

type IndicatorListFilter_DashboardRowBlock_Fragment = { __typename: 'DashboardRowBlock', field: string };

type IndicatorListFilter_DateBlock_Fragment = { __typename: 'DateBlock', field: string };

type IndicatorListFilter_DateTimeBlock_Fragment = { __typename: 'DateTimeBlock', field: string };

type IndicatorListFilter_DecimalBlock_Fragment = { __typename: 'DecimalBlock', field: string };

type IndicatorListFilter_DocumentChooserBlock_Fragment = { __typename: 'DocumentChooserBlock', field: string };

type IndicatorListFilter_EmailBlock_Fragment = { __typename: 'EmailBlock', field: string };

type IndicatorListFilter_EmbedBlock_Fragment = { __typename: 'EmbedBlock', field: string };

type IndicatorListFilter_EndDateColumnBlock_Fragment = { __typename: 'EndDateColumnBlock', field: string };

type IndicatorListFilter_FieldColumnBlock_Fragment = { __typename: 'FieldColumnBlock', field: string };

type IndicatorListFilter_FloatBlock_Fragment = { __typename: 'FloatBlock', field: string };

type IndicatorListFilter_FormChoiceBlock_Fragment = { __typename: 'FormChoiceBlock', field: string };

type IndicatorListFilter_FormFieldBlock_Fragment = { __typename: 'FormFieldBlock', field: string };

type IndicatorListFilter_FrontPageHeroAdditionalSettingsBlock_Fragment = { __typename: 'FrontPageHeroAdditionalSettingsBlock', field: string };

type IndicatorListFilter_FrontPageHeroBlock_Fragment = { __typename: 'FrontPageHeroBlock', field: string };

type IndicatorListFilter_IdentifierColumnBlock_Fragment = { __typename: 'IdentifierColumnBlock', field: string };

type IndicatorListFilter_ImageBlock_Fragment = { __typename: 'ImageBlock', field: string };

type IndicatorListFilter_ImageChooserBlock_Fragment = { __typename: 'ImageChooserBlock', field: string };

type IndicatorListFilter_ImplementationPhaseColumnBlock_Fragment = { __typename: 'ImplementationPhaseColumnBlock', field: string };

type IndicatorListFilter_IndicatorBlock_Fragment = { __typename: 'IndicatorBlock', field: string };

type IndicatorListFilter_IndicatorCategoryColumn_Fragment = { __typename: 'IndicatorCategoryColumn', field: string };

type IndicatorListFilter_IndicatorCategoryContentBlock_Fragment = { __typename: 'IndicatorCategoryContentBlock', field: string };

type IndicatorListFilter_IndicatorCausalChainBlock_Fragment = { __typename: 'IndicatorCausalChainBlock', field: string };

type IndicatorListFilter_IndicatorContentBlock_Fragment = { __typename: 'IndicatorContentBlock', field: string };

type IndicatorListFilter_IndicatorFactorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorFactorValueSummaryContentBlock', field: string };

type IndicatorListFilter_IndicatorFilterBlock_Fragment = { __typename: 'IndicatorFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string };

type IndicatorListFilter_IndicatorGroupBlock_Fragment = { __typename: 'IndicatorGroupBlock', field: string };

type IndicatorListFilter_IndicatorHighlightsBlock_Fragment = { __typename: 'IndicatorHighlightsBlock', field: string };

type IndicatorListFilter_IndicatorListColumn_Fragment = { __typename: 'IndicatorListColumn', field: string };

type IndicatorListFilter_IndicatorShowcaseBlock_Fragment = { __typename: 'IndicatorShowcaseBlock', field: string };

type IndicatorListFilter_IndicatorValueColumn_Fragment = { __typename: 'IndicatorValueColumn', field: string };

type IndicatorListFilter_IndicatorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorValueSummaryContentBlock', field: string };

type IndicatorListFilter_IndicatorVisualizationContentBlock_Fragment = { __typename: 'IndicatorVisualizationContentBlock', field: string };

type IndicatorListFilter_IndicatorsColumnBlock_Fragment = { __typename: 'IndicatorsColumnBlock', field: string };

type IndicatorListFilter_IntegerBlock_Fragment = { __typename: 'IntegerBlock', field: string };

type IndicatorListFilter_LargeImageBlock_Fragment = { __typename: 'LargeImageBlock', field: string };

type IndicatorListFilter_NameColumnBlock_Fragment = { __typename: 'NameColumnBlock', field: string };

type IndicatorListFilter_OrganizationColumnBlock_Fragment = { __typename: 'OrganizationColumnBlock', field: string };

type IndicatorListFilter_PageChooserBlock_Fragment = { __typename: 'PageChooserBlock', field: string };

type IndicatorListFilter_PageLinkBlock_Fragment = { __typename: 'PageLinkBlock', field: string };

type IndicatorListFilter_PathsNodeSummaryBlock_Fragment = { __typename: 'PathsNodeSummaryBlock', field: string };

type IndicatorListFilter_PathsOutcomeBlock_Fragment = { __typename: 'PathsOutcomeBlock', field: string };

type IndicatorListFilter_PlanDatasetsBlock_Fragment = { __typename: 'PlanDatasetsBlock', field: string };

type IndicatorListFilter_PlanFilterBlock_Fragment = { __typename: 'PlanFilterBlock', field: string };

type IndicatorListFilter_PrimaryOrganizationFilterBlock_Fragment = { __typename: 'PrimaryOrganizationFilterBlock', field: string };

type IndicatorListFilter_QuestionAnswerBlock_Fragment = { __typename: 'QuestionAnswerBlock', field: string };

type IndicatorListFilter_QuestionBlock_Fragment = { __typename: 'QuestionBlock', field: string };

type IndicatorListFilter_RawHtmlBlock_Fragment = { __typename: 'RawHTMLBlock', field: string };

type IndicatorListFilter_RegexBlock_Fragment = { __typename: 'RegexBlock', field: string };

type IndicatorListFilter_RelatedIndicatorsBlock_Fragment = { __typename: 'RelatedIndicatorsBlock', field: string };

type IndicatorListFilter_RelatedPlanListBlock_Fragment = { __typename: 'RelatedPlanListBlock', field: string };

type IndicatorListFilter_ReportComparisonBlock_Fragment = { __typename: 'ReportComparisonBlock', field: string };

type IndicatorListFilter_ReportTypeFieldChooserBlock_Fragment = { __typename: 'ReportTypeFieldChooserBlock', field: string };

type IndicatorListFilter_ResponsiblePartiesColumnBlock_Fragment = { __typename: 'ResponsiblePartiesColumnBlock', field: string };

type IndicatorListFilter_ResponsiblePartyFilterBlock_Fragment = { __typename: 'ResponsiblePartyFilterBlock', field: string };

type IndicatorListFilter_RichTextBlock_Fragment = { __typename: 'RichTextBlock', field: string };

type IndicatorListFilter_ScheduleContinuousColumnBlock_Fragment = { __typename: 'ScheduleContinuousColumnBlock', field: string };

type IndicatorListFilter_SnippetChooserBlock_Fragment = { __typename: 'SnippetChooserBlock', field: string };

type IndicatorListFilter_StartDateColumnBlock_Fragment = { __typename: 'StartDateColumnBlock', field: string };

type IndicatorListFilter_StaticBlock_Fragment = { __typename: 'StaticBlock', field: string };

type IndicatorListFilter_StatusColumnBlock_Fragment = { __typename: 'StatusColumnBlock', field: string };

type IndicatorListFilter_StreamBlock_Fragment = { __typename: 'StreamBlock', field: string };

type IndicatorListFilter_StreamFieldBlock_Fragment = { __typename: 'StreamFieldBlock', field: string };

type IndicatorListFilter_StructBlock_Fragment = { __typename: 'StructBlock', field: string };

type IndicatorListFilter_TasksColumnBlock_Fragment = { __typename: 'TasksColumnBlock', field: string };

type IndicatorListFilter_TextBlock_Fragment = { __typename: 'TextBlock', field: string };

type IndicatorListFilter_TimeBlock_Fragment = { __typename: 'TimeBlock', field: string };

type IndicatorListFilter_UrlBlock_Fragment = { __typename: 'URLBlock', field: string };

type IndicatorListFilter_UpdatedAtColumnBlock_Fragment = { __typename: 'UpdatedAtColumnBlock', field: string };

export type IndicatorListFilterFragment =
  | IndicatorListFilter_AccessibilityStatementComplianceStatusBlock_Fragment
  | IndicatorListFilter_AccessibilityStatementContactFormBlock_Fragment
  | IndicatorListFilter_AccessibilityStatementContactInformationBlock_Fragment
  | IndicatorListFilter_AccessibilityStatementPreparationInformationBlock_Fragment
  | IndicatorListFilter_ActionAttributeTypeFilterBlock_Fragment
  | IndicatorListFilter_ActionAttributeTypeReportFieldBlock_Fragment
  | IndicatorListFilter_ActionCategoryFilterCardBlock_Fragment
  | IndicatorListFilter_ActionCategoryFilterCardsBlock_Fragment
  | IndicatorListFilter_ActionCategoryReportFieldBlock_Fragment
  | IndicatorListFilter_ActionContactFormBlock_Fragment
  | IndicatorListFilter_ActionContactPersonsBlock_Fragment
  | IndicatorListFilter_ActionContentAttributeTypeBlock_Fragment
  | IndicatorListFilter_ActionContentCategoryTypeBlock_Fragment
  | IndicatorListFilter_ActionContentSectionBlock_Fragment
  | IndicatorListFilter_ActionDependenciesBlock_Fragment
  | IndicatorListFilter_ActionDescriptionBlock_Fragment
  | IndicatorListFilter_ActionEndDateBlock_Fragment
  | IndicatorListFilter_ActionHighlightsBlock_Fragment
  | IndicatorListFilter_ActionImplementationPhaseFilterBlock_Fragment
  | IndicatorListFilter_ActionImplementationPhaseReportFieldBlock_Fragment
  | IndicatorListFilter_ActionLeadParagraphBlock_Fragment
  | IndicatorListFilter_ActionLinksBlock_Fragment
  | IndicatorListFilter_ActionListBlock_Fragment
  | IndicatorListFilter_ActionManualStatusReasonBlock_Fragment
  | IndicatorListFilter_ActionMergedActionsBlock_Fragment
  | IndicatorListFilter_ActionOfficialNameBlock_Fragment
  | IndicatorListFilter_ActionPledgesBlock_Fragment
  | IndicatorListFilter_ActionPrimaryOrgBlock_Fragment
  | IndicatorListFilter_ActionRelatedActionsBlock_Fragment
  | IndicatorListFilter_ActionRelatedIndicatorsBlock_Fragment
  | IndicatorListFilter_ActionResponsiblePartiesBlock_Fragment
  | IndicatorListFilter_ActionResponsiblePartyReportFieldBlock_Fragment
  | IndicatorListFilter_ActionScheduleBlock_Fragment
  | IndicatorListFilter_ActionScheduleContinuousBlock_Fragment
  | IndicatorListFilter_ActionScheduleFilterBlock_Fragment
  | IndicatorListFilter_ActionStartDateBlock_Fragment
  | IndicatorListFilter_ActionStatusFilterBlock_Fragment
  | IndicatorListFilter_ActionStatusGraphsBlock_Fragment
  | IndicatorListFilter_ActionStatusReportFieldBlock_Fragment
  | IndicatorListFilter_ActionTasksBlock_Fragment
  | IndicatorListFilter_ActionUpdatedAtBlock_Fragment
  | IndicatorListFilter_AdaptiveEmbedBlock_Fragment
  | IndicatorListFilter_BlockQuoteBlock_Fragment
  | IndicatorListFilter_BooleanBlock_Fragment
  | IndicatorListFilter_CardBlock_Fragment
  | IndicatorListFilter_CardListBlock_Fragment
  | IndicatorListFilter_CartographyVisualisationBlock_Fragment
  | IndicatorListFilter_CategoryListBlock_Fragment
  | IndicatorListFilter_CategoryPageAttributeTypeBlock_Fragment
  | IndicatorListFilter_CategoryPageBodyBlock_Fragment
  | IndicatorListFilter_CategoryPageCategoryListBlock_Fragment
  | IndicatorListFilter_CategoryPageContactFormBlock_Fragment
  | IndicatorListFilter_CategoryPageProgressBlock_Fragment
  | IndicatorListFilter_CategoryTreeMapBlock_Fragment
  | IndicatorListFilter_CategoryTypeDatasetsBlock_Fragment
  | IndicatorListFilter_CategoryTypeFilterBlock_Fragment
  | IndicatorListFilter_CategoryTypeLevelListBlock_Fragment
  | IndicatorListFilter_ChangeLogMessageBlock_Fragment
  | IndicatorListFilter_CharBlock_Fragment
  | IndicatorListFilter_ChoiceBlock_Fragment
  | IndicatorListFilter_ContinuousActionFilterBlock_Fragment
  | IndicatorListFilter_DashboardHeaderBlock_Fragment
  | IndicatorListFilter_DashboardIndicatorAreaChartBlock_Fragment
  | IndicatorListFilter_DashboardIndicatorBarChartBlock_Fragment
  | IndicatorListFilter_DashboardIndicatorLineChartBlock_Fragment
  | IndicatorListFilter_DashboardIndicatorPieChartBlock_Fragment
  | IndicatorListFilter_DashboardIndicatorSummaryBlock_Fragment
  | IndicatorListFilter_DashboardParagraphBlock_Fragment
  | IndicatorListFilter_DashboardRowBlock_Fragment
  | IndicatorListFilter_DateBlock_Fragment
  | IndicatorListFilter_DateTimeBlock_Fragment
  | IndicatorListFilter_DecimalBlock_Fragment
  | IndicatorListFilter_DocumentChooserBlock_Fragment
  | IndicatorListFilter_EmailBlock_Fragment
  | IndicatorListFilter_EmbedBlock_Fragment
  | IndicatorListFilter_EndDateColumnBlock_Fragment
  | IndicatorListFilter_FieldColumnBlock_Fragment
  | IndicatorListFilter_FloatBlock_Fragment
  | IndicatorListFilter_FormChoiceBlock_Fragment
  | IndicatorListFilter_FormFieldBlock_Fragment
  | IndicatorListFilter_FrontPageHeroAdditionalSettingsBlock_Fragment
  | IndicatorListFilter_FrontPageHeroBlock_Fragment
  | IndicatorListFilter_IdentifierColumnBlock_Fragment
  | IndicatorListFilter_ImageBlock_Fragment
  | IndicatorListFilter_ImageChooserBlock_Fragment
  | IndicatorListFilter_ImplementationPhaseColumnBlock_Fragment
  | IndicatorListFilter_IndicatorBlock_Fragment
  | IndicatorListFilter_IndicatorCategoryColumn_Fragment
  | IndicatorListFilter_IndicatorCategoryContentBlock_Fragment
  | IndicatorListFilter_IndicatorCausalChainBlock_Fragment
  | IndicatorListFilter_IndicatorContentBlock_Fragment
  | IndicatorListFilter_IndicatorFactorValueSummaryContentBlock_Fragment
  | IndicatorListFilter_IndicatorFilterBlock_Fragment
  | IndicatorListFilter_IndicatorGroupBlock_Fragment
  | IndicatorListFilter_IndicatorHighlightsBlock_Fragment
  | IndicatorListFilter_IndicatorListColumn_Fragment
  | IndicatorListFilter_IndicatorShowcaseBlock_Fragment
  | IndicatorListFilter_IndicatorValueColumn_Fragment
  | IndicatorListFilter_IndicatorValueSummaryContentBlock_Fragment
  | IndicatorListFilter_IndicatorVisualizationContentBlock_Fragment
  | IndicatorListFilter_IndicatorsColumnBlock_Fragment
  | IndicatorListFilter_IntegerBlock_Fragment
  | IndicatorListFilter_LargeImageBlock_Fragment
  | IndicatorListFilter_NameColumnBlock_Fragment
  | IndicatorListFilter_OrganizationColumnBlock_Fragment
  | IndicatorListFilter_PageChooserBlock_Fragment
  | IndicatorListFilter_PageLinkBlock_Fragment
  | IndicatorListFilter_PathsNodeSummaryBlock_Fragment
  | IndicatorListFilter_PathsOutcomeBlock_Fragment
  | IndicatorListFilter_PlanDatasetsBlock_Fragment
  | IndicatorListFilter_PlanFilterBlock_Fragment
  | IndicatorListFilter_PrimaryOrganizationFilterBlock_Fragment
  | IndicatorListFilter_QuestionAnswerBlock_Fragment
  | IndicatorListFilter_QuestionBlock_Fragment
  | IndicatorListFilter_RawHtmlBlock_Fragment
  | IndicatorListFilter_RegexBlock_Fragment
  | IndicatorListFilter_RelatedIndicatorsBlock_Fragment
  | IndicatorListFilter_RelatedPlanListBlock_Fragment
  | IndicatorListFilter_ReportComparisonBlock_Fragment
  | IndicatorListFilter_ReportTypeFieldChooserBlock_Fragment
  | IndicatorListFilter_ResponsiblePartiesColumnBlock_Fragment
  | IndicatorListFilter_ResponsiblePartyFilterBlock_Fragment
  | IndicatorListFilter_RichTextBlock_Fragment
  | IndicatorListFilter_ScheduleContinuousColumnBlock_Fragment
  | IndicatorListFilter_SnippetChooserBlock_Fragment
  | IndicatorListFilter_StartDateColumnBlock_Fragment
  | IndicatorListFilter_StaticBlock_Fragment
  | IndicatorListFilter_StatusColumnBlock_Fragment
  | IndicatorListFilter_StreamBlock_Fragment
  | IndicatorListFilter_StreamFieldBlock_Fragment
  | IndicatorListFilter_StructBlock_Fragment
  | IndicatorListFilter_TasksColumnBlock_Fragment
  | IndicatorListFilter_TextBlock_Fragment
  | IndicatorListFilter_TimeBlock_Fragment
  | IndicatorListFilter_UrlBlock_Fragment
  | IndicatorListFilter_UpdatedAtColumnBlock_Fragment
;

export type IndicatorListPageFiltersFragment_primaryFilters_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

export type IndicatorListPageFiltersFragment_primaryFilters_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string };

export type IndicatorListPageFiltersFragment_primaryFilters =
  | IndicatorListPageFiltersFragment_primaryFilters_CategoryTypeFilterBlock
  | IndicatorListPageFiltersFragment_primaryFilters_IndicatorFilterBlock
;

export type IndicatorListPageFiltersFragment_mainFilters_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

export type IndicatorListPageFiltersFragment_mainFilters_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string };

export type IndicatorListPageFiltersFragment_mainFilters =
  | IndicatorListPageFiltersFragment_mainFilters_CategoryTypeFilterBlock
  | IndicatorListPageFiltersFragment_mainFilters_IndicatorFilterBlock
;

export type IndicatorListPageFiltersFragment_advancedFilters_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: IndicatorListFilterFragment_CategoryTypeFilterBlock_categoryType | null };

export type IndicatorListPageFiltersFragment_advancedFilters_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string };

export type IndicatorListPageFiltersFragment_advancedFilters =
  | IndicatorListPageFiltersFragment_advancedFilters_CategoryTypeFilterBlock
  | IndicatorListPageFiltersFragment_advancedFilters_IndicatorFilterBlock
;

export type IndicatorListPageFiltersFragment = { __typename: 'IndicatorListPage', id: string | null, primaryFilters: Array<IndicatorListPageFiltersFragment_primaryFilters> | null, mainFilters: Array<IndicatorListPageFiltersFragment_mainFilters> | null, advancedFilters: Array<IndicatorListPageFiltersFragment_advancedFilters> | null };

export type IndicatorListPageFragment_listColumns_categoryType = { __typename: 'CategoryType', id: string, name: string };

export type IndicatorListPageFragment_listColumns_categoryLevel = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type IndicatorListPageFragment_listColumns_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn', id: string | null, columnLabel: string | null, columnHelpText: string | null, categoryType: IndicatorListPageFragment_listColumns_categoryType, categoryLevel: IndicatorListPageFragment_listColumns_categoryLevel | null };

export type IndicatorListPageFragment_listColumns_IndicatorListColumn = { __typename: 'IndicatorListColumn', id: string | null, columnLabel: string | null, columnHelpText: string | null, sourceField: IndicatorDashboardFieldName | null };

export type IndicatorListPageFragment_listColumns_IndicatorValueColumn = { __typename: 'IndicatorValueColumn', id: string | null, columnLabel: string | null, columnHelpText: string | null, sourceField: IndicatorDashboardFieldName | null, isNormalized: boolean, valueType: IndicatorColumnValueType, defaultYear: number | null, hideUnit: boolean, highlightGoalMet: boolean };

export type IndicatorListPageFragment_listColumns =
  | IndicatorListPageFragment_listColumns_IndicatorCategoryColumn
  | IndicatorListPageFragment_listColumns_IndicatorListColumn
  | IndicatorListPageFragment_listColumns_IndicatorValueColumn
;

export type IndicatorListPageFragment = { __typename: 'IndicatorListPage', id: string | null, slug: string, title: string, leadContent: string | null, displayInsights: boolean | null, displayLevel: boolean | null, includeRelatedPlans: boolean | null, listColumns: Array<IndicatorListPageFragment_listColumns> | null, primaryFilters: Array<IndicatorListPageFiltersFragment_primaryFilters> | null, mainFilters: Array<IndicatorListPageFiltersFragment_mainFilters> | null, advancedFilters: Array<IndicatorListPageFiltersFragment_advancedFilters> | null };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContactFormBlock = { __typename: 'ActionContactFormBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionEndDateBlock = { __typename: 'ActionEndDateBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionLinksBlock = { __typename: 'ActionLinksBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionListBlock = { __typename: 'ActionListBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionPledgesBlock = { __typename: 'ActionPledgesBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleBlock = { __typename: 'ActionScheduleBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStartDateBlock = { __typename: 'ActionStartDateBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionTasksBlock = { __typename: 'ActionTasksBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_BlockQuoteBlock = { __typename: 'BlockQuoteBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_BooleanBlock = { __typename: 'BooleanBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CardBlock = { __typename: 'CardBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CardListBlock = { __typename: 'CardListBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryListBlock = { __typename: 'CategoryListBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CharBlock = { __typename: 'CharBlock', value: string, field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ChoiceBlock = { __typename: 'ChoiceBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardRowBlock = { __typename: 'DashboardRowBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DateBlock = { __typename: 'DateBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DateTimeBlock = { __typename: 'DateTimeBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DecimalBlock = { __typename: 'DecimalBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DocumentChooserBlock = { __typename: 'DocumentChooserBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_EmailBlock = { __typename: 'EmailBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_EmbedBlock = { __typename: 'EmbedBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_EndDateColumnBlock = { __typename: 'EndDateColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FieldColumnBlock = { __typename: 'FieldColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FloatBlock = { __typename: 'FloatBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FormChoiceBlock = { __typename: 'FormChoiceBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FormFieldBlock = { __typename: 'FormFieldBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ImageBlock = { __typename: 'ImageBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ImageChooserBlock = { __typename: 'ImageChooserBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorBlock = { __typename: 'IndicatorBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorListColumn = { __typename: 'IndicatorListColumn', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueColumn = { __typename: 'IndicatorValueColumn', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IntegerBlock = { __typename: 'IntegerBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_LargeImageBlock = { __typename: 'LargeImageBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_NameColumnBlock = { __typename: 'NameColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PageChooserBlock = { __typename: 'PageChooserBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PageLinkBlock = { __typename: 'PageLinkBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PlanFilterBlock = { __typename: 'PlanFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_QuestionBlock = { __typename: 'QuestionBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RawHTMLBlock = { __typename: 'RawHTMLBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RegexBlock = { __typename: 'RegexBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ReportComparisonBlock = { __typename: 'ReportComparisonBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RichTextBlock = { __typename: 'RichTextBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_SnippetChooserBlock = { __typename: 'SnippetChooserBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StartDateColumnBlock = { __typename: 'StartDateColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StaticBlock = { __typename: 'StaticBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StatusColumnBlock = { __typename: 'StatusColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StreamBlock = { __typename: 'StreamBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StreamFieldBlock = { __typename: 'StreamFieldBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StructBlock = { __typename: 'StructBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_TasksColumnBlock = { __typename: 'TasksColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_TextBlock = { __typename: 'TextBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_TimeBlock = { __typename: 'TimeBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_URLBlock = { __typename: 'URLBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock', field: string };

export type StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks =
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementComplianceStatusBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactFormBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactInformationBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementPreparationInformationBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeReportFieldBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryReportFieldBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContactFormBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContactPersonsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContentAttributeTypeBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContentCategoryTypeBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionContentSectionBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionDependenciesBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionDescriptionBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionEndDateBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionHighlightsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseReportFieldBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionLeadParagraphBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionLinksBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionListBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionManualStatusReasonBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionMergedActionsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionOfficialNameBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionPledgesBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionPrimaryOrgBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedActionsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedIndicatorsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartiesBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartyReportFieldBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleContinuousBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStartDateBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStatusFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStatusGraphsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionStatusReportFieldBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionTasksBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ActionUpdatedAtBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_AdaptiveEmbedBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_BlockQuoteBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_BooleanBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CardBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CardListBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CartographyVisualisationBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryListBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageAttributeTypeBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageBodyBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageCategoryListBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageContactFormBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryPageProgressBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTreeMapBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeDatasetsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeLevelListBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ChangeLogMessageBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_CharBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ChoiceBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ContinuousActionFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardHeaderBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorAreaChartBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorBarChartBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorLineChartBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorPieChartBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorSummaryBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardParagraphBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DashboardRowBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DateBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DateTimeBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DecimalBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_DocumentChooserBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_EmailBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_EmbedBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_EndDateColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FieldColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FloatBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FormChoiceBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FormFieldBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroAdditionalSettingsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IdentifierColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ImageBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ImageChooserBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ImplementationPhaseColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryColumn
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryContentBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorCausalChainBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorContentBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorFactorValueSummaryContentBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorGroupBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorHighlightsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorListColumn
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorShowcaseBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueColumn
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueSummaryContentBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorVisualizationContentBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IndicatorsColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_IntegerBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_LargeImageBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_NameColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_OrganizationColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PageChooserBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PageLinkBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PathsNodeSummaryBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PathsOutcomeBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PlanDatasetsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PlanFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_PrimaryOrganizationFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_QuestionAnswerBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_QuestionBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RawHTMLBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RegexBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RelatedIndicatorsBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RelatedPlanListBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ReportComparisonBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ReportTypeFieldChooserBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartiesColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartyFilterBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_RichTextBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_ScheduleContinuousColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_SnippetChooserBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StartDateColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StaticBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StatusColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StreamBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StreamFieldBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_StructBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_TasksColumnBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_TextBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_TimeBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_URLBlock
  | StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks_UpdatedAtColumnBlock
;

export type StreamFieldFragment_ActionCategoryFilterCardsBlock_cards_category_type = { __typename: 'CategoryType', id: string, identifier: string };

export type StreamFieldFragment_ActionCategoryFilterCardsBlock_cards_category = { __typename: 'Category', id: string, type: StreamFieldFragment_ActionCategoryFilterCardsBlock_cards_category_type };

export type StreamFieldFragment_ActionCategoryFilterCardsBlock_cards = { __typename: 'ActionCategoryFilterCardBlock', heading: string | null, lead: string | null, category: StreamFieldFragment_ActionCategoryFilterCardsBlock_cards_category };

export type StreamFieldFragment_ActionListBlock_categoryFilter = { __typename: 'Category', id: string };

export type StreamFieldFragment_ActionListBlock_groupByCategoryLevel = { __typename: 'CategoryLevel', id: string };

export type StreamFieldFragment_AdaptiveEmbedBlock_embed = { __typename: 'EmbedHTMLValue', html: string | null };

export type StreamFieldFragment_CardListBlock_cards_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type StreamFieldFragment_CardListBlock_cards = { __typename: 'CardBlock', heading: string | null, content: string | null, link: string | null, image: StreamFieldFragment_CardListBlock_cards_image | null };

export type StreamFieldFragment_CartographyVisualisationBlock_account = { __typename: 'CartographyProviderCredentials', provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string };

export type StreamFieldFragment_CategoryListBlock_categoryType_categories = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes>, parent: ActionListQuery_planActions_categories_parent | null };

export type StreamFieldFragment_CategoryListBlock_categoryType = { __typename: 'CategoryType', id: string, hideCategoryIdentifiers: boolean, categories: Array<StreamFieldFragment_CategoryListBlock_categoryType_categories> };

export type StreamFieldFragment_CategoryListBlock_category_children = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type StreamFieldFragment_CategoryListBlock_category = { __typename: 'Category', id: string, children: Array<StreamFieldFragment_CategoryListBlock_category_children> };

export type StreamFieldFragment_CategoryTreeMapBlock_valueAttribute_unit = { __typename: 'Unit', id: string, shortName: string | null };

export type StreamFieldFragment_CategoryTreeMapBlock_valueAttribute = { __typename: 'AttributeType', id: string, identifier: string, unit: StreamFieldFragment_CategoryTreeMapBlock_valueAttribute_unit | null };

export type StreamFieldFragment_CategoryTreeMapBlock_treeMapCategoryType = { __typename: 'CategoryType', id: string, identifier: string };

export type StreamFieldFragment_CategoryTypeLevelListBlock_categoryLevel = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type StreamFieldFragment_CategoryTypeLevelListBlock_groupByCategoryLevel = { __typename: 'CategoryLevel', id: string };

export type StreamFieldFragment_CategoryTypeLevelListBlock_categoryBlockType_categories_indicators = { __typename: 'Indicator', id: string, name: string, values: Array<ActionListQuery_planActions_categories_indicators_values>, goals: Array<ActionListQuery_planActions_categories_indicators_goals | null> | null, unit: ActionListQuery_planActions_categories_indicators_unit };

export type StreamFieldFragment_CategoryTypeLevelListBlock_categoryBlockType_categories = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, indicators: Array<StreamFieldFragment_CategoryTypeLevelListBlock_categoryBlockType_categories_indicators>, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes>, parent: ActionListQuery_planActions_categories_parent | null };

export type StreamFieldFragment_CategoryTypeLevelListBlock_categoryBlockType = { __typename: 'CategoryType', id: string, identifier: string, hideCategoryIdentifiers: boolean, categories: Array<StreamFieldFragment_CategoryTypeLevelListBlock_categoryBlockType_categories> };

export type StreamFieldFragment_ChoiceBlock_choices = { __typename: 'ChoiceOption', key: string, value: string };

export type StreamFieldFragment_FrontPageHeroBlock_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null };

export type StreamFieldFragment_FrontPageHeroBlock_additionalSettings = { __typename: 'FrontPageHeroAdditionalSettingsBlock', backgroundColour: string | null, fitImage: boolean | null, showImageAccent: boolean | null, backgroundCoversFullSection: boolean | null };

export type StreamFieldFragment_IndicatorBlock_indicator = { __typename: 'Indicator', id: string };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator_unit = { __typename: 'Unit', id: string, name: string };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator_latestValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator = { __typename: 'Indicator', id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator_unit, latestValue: StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator_latestValue | null, goals: Array<StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator_goals | null> | null };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContactFormBlock = { __typename: 'ActionContactFormBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionEndDateBlock = { __typename: 'ActionEndDateBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionLinksBlock = { __typename: 'ActionLinksBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionListBlock = { __typename: 'ActionListBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionPledgesBlock = { __typename: 'ActionPledgesBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionScheduleBlock = { __typename: 'ActionScheduleBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStartDateBlock = { __typename: 'ActionStartDateBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionTasksBlock = { __typename: 'ActionTasksBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_BlockQuoteBlock = { __typename: 'BlockQuoteBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_BooleanBlock = { __typename: 'BooleanBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CardBlock = { __typename: 'CardBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CardListBlock = { __typename: 'CardListBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryListBlock = { __typename: 'CategoryListBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_CharBlock = { __typename: 'CharBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ChoiceBlock = { __typename: 'ChoiceBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardRowBlock = { __typename: 'DashboardRowBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DateBlock = { __typename: 'DateBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DateTimeBlock = { __typename: 'DateTimeBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DecimalBlock = { __typename: 'DecimalBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_DocumentChooserBlock = { __typename: 'DocumentChooserBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_EmailBlock = { __typename: 'EmailBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_EmbedBlock = { __typename: 'EmbedBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_EndDateColumnBlock = { __typename: 'EndDateColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_FieldColumnBlock = { __typename: 'FieldColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_FloatBlock = { __typename: 'FloatBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_FormChoiceBlock = { __typename: 'FormChoiceBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_FormFieldBlock = { __typename: 'FormFieldBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ImageBlock = { __typename: 'ImageBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ImageChooserBlock = { __typename: 'ImageChooserBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock = { __typename: 'IndicatorBlock', style: string | null, indicator: StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock_indicator | null };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorContentBlock = { __typename: 'IndicatorContentBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorListColumn = { __typename: 'IndicatorListColumn' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorValueColumn = { __typename: 'IndicatorValueColumn' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_IntegerBlock = { __typename: 'IntegerBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_LargeImageBlock = { __typename: 'LargeImageBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_NameColumnBlock = { __typename: 'NameColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_PageChooserBlock = { __typename: 'PageChooserBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_PageLinkBlock = { __typename: 'PageLinkBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_PlanFilterBlock = { __typename: 'PlanFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_QuestionBlock = { __typename: 'QuestionBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_RawHTMLBlock = { __typename: 'RawHTMLBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_RegexBlock = { __typename: 'RegexBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ReportComparisonBlock = { __typename: 'ReportComparisonBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_RichTextBlock = { __typename: 'RichTextBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_SnippetChooserBlock = { __typename: 'SnippetChooserBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_StartDateColumnBlock = { __typename: 'StartDateColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_StaticBlock = { __typename: 'StaticBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_StatusColumnBlock = { __typename: 'StatusColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_StreamBlock = { __typename: 'StreamBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_StreamFieldBlock = { __typename: 'StreamFieldBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_StructBlock = { __typename: 'StructBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_TasksColumnBlock = { __typename: 'TasksColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_TextBlock = { __typename: 'TextBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_TimeBlock = { __typename: 'TimeBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_URLBlock = { __typename: 'URLBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock' };

export type StreamFieldFragment_IndicatorGroupBlock_indicators =
  | StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementComplianceStatusBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementContactFormBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementContactInformationBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_AccessibilityStatementPreparationInformationBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionAttributeTypeFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionAttributeTypeReportFieldBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionCategoryFilterCardBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionCategoryFilterCardsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionCategoryReportFieldBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContactFormBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContactPersonsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContentAttributeTypeBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContentCategoryTypeBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionContentSectionBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionDependenciesBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionDescriptionBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionEndDateBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionHighlightsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionImplementationPhaseFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionImplementationPhaseReportFieldBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionLeadParagraphBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionLinksBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionListBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionManualStatusReasonBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionMergedActionsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionOfficialNameBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionPledgesBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionPrimaryOrgBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionRelatedActionsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionRelatedIndicatorsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionResponsiblePartiesBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionResponsiblePartyReportFieldBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionScheduleBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionScheduleContinuousBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionScheduleFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStartDateBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStatusFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStatusGraphsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionStatusReportFieldBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionTasksBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ActionUpdatedAtBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_AdaptiveEmbedBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_BlockQuoteBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_BooleanBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CardBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CardListBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CartographyVisualisationBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryListBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageAttributeTypeBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageBodyBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageCategoryListBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageContactFormBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryPageProgressBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTreeMapBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTypeDatasetsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTypeFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CategoryTypeLevelListBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ChangeLogMessageBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_CharBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ChoiceBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ContinuousActionFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardHeaderBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorAreaChartBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorBarChartBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorLineChartBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorPieChartBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardIndicatorSummaryBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardParagraphBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DashboardRowBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DateBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DateTimeBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DecimalBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_DocumentChooserBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_EmailBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_EmbedBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_EndDateColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_FieldColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_FloatBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_FormChoiceBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_FormFieldBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_FrontPageHeroAdditionalSettingsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_FrontPageHeroBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IdentifierColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ImageBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ImageChooserBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ImplementationPhaseColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorCategoryColumn
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorCategoryContentBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorCausalChainBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorContentBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorFactorValueSummaryContentBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorGroupBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorHighlightsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorListColumn
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorShowcaseBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorValueColumn
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorValueSummaryContentBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorVisualizationContentBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IndicatorsColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_IntegerBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_LargeImageBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_NameColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_OrganizationColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_PageChooserBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_PageLinkBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_PathsNodeSummaryBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_PathsOutcomeBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_PlanDatasetsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_PlanFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_PrimaryOrganizationFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_QuestionAnswerBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_QuestionBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_RawHTMLBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_RegexBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_RelatedIndicatorsBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_RelatedPlanListBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ReportComparisonBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ReportTypeFieldChooserBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ResponsiblePartiesColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ResponsiblePartyFilterBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_RichTextBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_ScheduleContinuousColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_SnippetChooserBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_StartDateColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_StaticBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_StatusColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_StreamBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_StreamFieldBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_StructBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_TasksColumnBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_TextBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_TimeBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_URLBlock
  | StreamFieldFragment_IndicatorGroupBlock_indicators_UpdatedAtColumnBlock
;

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContactFormBlock = { __typename: 'ActionContactFormBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionEndDateBlock = { __typename: 'ActionEndDateBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionLinksBlock = { __typename: 'ActionLinksBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionListBlock = { __typename: 'ActionListBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionPledgesBlock = { __typename: 'ActionPledgesBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionScheduleBlock = { __typename: 'ActionScheduleBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStartDateBlock = { __typename: 'ActionStartDateBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionTasksBlock = { __typename: 'ActionTasksBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_BlockQuoteBlock = { __typename: 'BlockQuoteBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_BooleanBlock = { __typename: 'BooleanBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CardBlock = { __typename: 'CardBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CardListBlock = { __typename: 'CardListBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryListBlock = { __typename: 'CategoryListBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_CharBlock = { __typename: 'CharBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ChoiceBlock = { __typename: 'ChoiceBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardRowBlock = { __typename: 'DashboardRowBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DateBlock = { __typename: 'DateBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DateTimeBlock = { __typename: 'DateTimeBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DecimalBlock = { __typename: 'DecimalBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_DocumentChooserBlock = { __typename: 'DocumentChooserBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_EmailBlock = { __typename: 'EmailBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_EmbedBlock = { __typename: 'EmbedBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_EndDateColumnBlock = { __typename: 'EndDateColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_FieldColumnBlock = { __typename: 'FieldColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_FloatBlock = { __typename: 'FloatBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_FormChoiceBlock = { __typename: 'FormChoiceBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_FormFieldBlock = { __typename: 'FormFieldBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ImageBlock = { __typename: 'ImageBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ImageChooserBlock = { __typename: 'ImageChooserBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorBlock = { __typename: 'IndicatorBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorContentBlock = { __typename: 'IndicatorContentBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorListColumn = { __typename: 'IndicatorListColumn' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorValueColumn = { __typename: 'IndicatorValueColumn' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_IntegerBlock = { __typename: 'IntegerBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_LargeImageBlock = { __typename: 'LargeImageBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_NameColumnBlock = { __typename: 'NameColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_PageChooserBlock = { __typename: 'PageChooserBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_PageLinkBlock = { __typename: 'PageLinkBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_PlanFilterBlock = { __typename: 'PlanFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_QuestionBlock = { __typename: 'QuestionBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_RawHTMLBlock = { __typename: 'RawHTMLBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_RegexBlock = { __typename: 'RegexBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ReportComparisonBlock = { __typename: 'ReportComparisonBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_RichTextBlock = { __typename: 'RichTextBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_SnippetChooserBlock = { __typename: 'SnippetChooserBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_StartDateColumnBlock = { __typename: 'StartDateColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_StaticBlock = { __typename: 'StaticBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_StatusColumnBlock = { __typename: 'StatusColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_StreamBlock = { __typename: 'StreamBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_StreamFieldBlock = { __typename: 'StreamFieldBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_StructBlock = { __typename: 'StructBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_TasksColumnBlock = { __typename: 'TasksColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_TextBlock = { __typename: 'TextBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_TimeBlock = { __typename: 'TimeBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_URLBlock = { __typename: 'URLBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock' };

export type StreamFieldFragment_IndicatorShowcaseBlock_blocks =
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementComplianceStatusBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementContactFormBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementContactInformationBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_AccessibilityStatementPreparationInformationBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionAttributeTypeFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionAttributeTypeReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionCategoryFilterCardBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionCategoryFilterCardsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionCategoryReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContactFormBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContactPersonsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContentAttributeTypeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContentCategoryTypeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionContentSectionBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionDependenciesBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionDescriptionBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionEndDateBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionHighlightsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionImplementationPhaseFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionImplementationPhaseReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionLeadParagraphBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionLinksBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionManualStatusReasonBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionMergedActionsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionOfficialNameBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionPledgesBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionPrimaryOrgBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionRelatedActionsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionRelatedIndicatorsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionResponsiblePartiesBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionResponsiblePartyReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionScheduleBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionScheduleContinuousBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionScheduleFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStartDateBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStatusFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStatusGraphsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionStatusReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionTasksBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ActionUpdatedAtBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_AdaptiveEmbedBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_BlockQuoteBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_BooleanBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CardBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CardListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CartographyVisualisationBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageAttributeTypeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageBodyBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageCategoryListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageContactFormBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryPageProgressBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTreeMapBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTypeDatasetsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTypeFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CategoryTypeLevelListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ChangeLogMessageBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_CharBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ChoiceBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ContinuousActionFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardHeaderBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorAreaChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorBarChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorLineChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorPieChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardIndicatorSummaryBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardParagraphBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DashboardRowBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DateBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DateTimeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DecimalBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_DocumentChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_EmailBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_EmbedBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_EndDateColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_FieldColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_FloatBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_FormChoiceBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_FormFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_FrontPageHeroAdditionalSettingsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_FrontPageHeroBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IdentifierColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ImageBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ImageChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ImplementationPhaseColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorCategoryColumn
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorCategoryContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorCausalChainBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorFactorValueSummaryContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorGroupBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorHighlightsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorListColumn
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorShowcaseBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorValueColumn
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorValueSummaryContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorVisualizationContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IndicatorsColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_IntegerBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_LargeImageBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_NameColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_OrganizationColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_PageChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_PageLinkBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_PathsNodeSummaryBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_PathsOutcomeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_PlanDatasetsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_PlanFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_PrimaryOrganizationFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_QuestionAnswerBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_QuestionBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_RawHTMLBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_RegexBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_RelatedIndicatorsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_RelatedPlanListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ReportComparisonBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ReportTypeFieldChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ResponsiblePartiesColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ResponsiblePartyFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_RichTextBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_ScheduleContinuousColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_SnippetChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_StartDateColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_StaticBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_StatusColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_StreamBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_StreamFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_StructBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_TasksColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_TextBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_TimeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_URLBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_blocks_UpdatedAtColumnBlock
;

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_unit = { __typename: 'Unit', id: string, shortName: string | null, name: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_latestValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_values_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_values_categories = { __typename: 'DimensionCategory', id: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<StreamFieldFragment_IndicatorShowcaseBlock_indicator_values_normalizedValues>, categories: Array<StreamFieldFragment_IndicatorShowcaseBlock_indicator_values_categories> };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_goals_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number, normalizedValues: Array<StreamFieldFragment_IndicatorShowcaseBlock_indicator_goals_normalizedValues> };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_common_normalizations_unit = { __typename: 'Unit', id: string, shortName: string | null, name: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_common_normalizations_normalizer = { __typename: 'CommonIndicator', name: string, id: string, identifier: string | null };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_common_normalizations = { __typename: 'CommonIndicatorNormalization', unit: StreamFieldFragment_IndicatorShowcaseBlock_indicator_common_normalizations_unit, normalizer: StreamFieldFragment_IndicatorShowcaseBlock_indicator_common_normalizations_normalizer };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator_common = { __typename: 'CommonIndicator', id: string, normalizations: Array<StreamFieldFragment_IndicatorShowcaseBlock_indicator_common_normalizations> };

export type StreamFieldFragment_IndicatorShowcaseBlock_indicator = { __typename: 'Indicator', id: string, identifier: string | null, name: string, minValue: number | null, maxValue: number | null, unit: StreamFieldFragment_IndicatorShowcaseBlock_indicator_unit, latestValue: StreamFieldFragment_IndicatorShowcaseBlock_indicator_latestValue | null, values: Array<StreamFieldFragment_IndicatorShowcaseBlock_indicator_values>, goals: Array<StreamFieldFragment_IndicatorShowcaseBlock_indicator_goals | null> | null, common: StreamFieldFragment_IndicatorShowcaseBlock_indicator_common | null };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_CategoryPage = { __typename: 'CategoryPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_EmptyPage = { __typename: 'EmptyPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_Page = { __typename: 'Page', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_StaticPage = { __typename: 'StaticPage', id: string | null, url: string | null, urlPath: string, slug: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page =
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_AccessibilityStatementPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_ActionListPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_CategoryPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_CategoryTypePage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_EmptyPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_ImpactGroupPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_IndicatorListPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_Page
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_PlanRootPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_PledgeListPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_PrivacyPolicyPage
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page_StaticPage
;

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContactFormBlock = { __typename: 'ActionContactFormBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionEndDateBlock = { __typename: 'ActionEndDateBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionLinksBlock = { __typename: 'ActionLinksBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionListBlock = { __typename: 'ActionListBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionPledgesBlock = { __typename: 'ActionPledgesBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionScheduleBlock = { __typename: 'ActionScheduleBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStartDateBlock = { __typename: 'ActionStartDateBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionTasksBlock = { __typename: 'ActionTasksBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_BlockQuoteBlock = { __typename: 'BlockQuoteBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_BooleanBlock = { __typename: 'BooleanBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CardBlock = { __typename: 'CardBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CardListBlock = { __typename: 'CardListBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryListBlock = { __typename: 'CategoryListBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CharBlock = { __typename: 'CharBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ChoiceBlock = { __typename: 'ChoiceBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardRowBlock = { __typename: 'DashboardRowBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DateBlock = { __typename: 'DateBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DateTimeBlock = { __typename: 'DateTimeBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DecimalBlock = { __typename: 'DecimalBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DocumentChooserBlock = { __typename: 'DocumentChooserBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_EmailBlock = { __typename: 'EmailBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_EmbedBlock = { __typename: 'EmbedBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_EndDateColumnBlock = { __typename: 'EndDateColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FieldColumnBlock = { __typename: 'FieldColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FloatBlock = { __typename: 'FloatBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FormChoiceBlock = { __typename: 'FormChoiceBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FormFieldBlock = { __typename: 'FormFieldBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ImageBlock = { __typename: 'ImageBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ImageChooserBlock = { __typename: 'ImageChooserBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorBlock = { __typename: 'IndicatorBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorListColumn = { __typename: 'IndicatorListColumn', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorValueColumn = { __typename: 'IndicatorValueColumn', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IntegerBlock = { __typename: 'IntegerBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_LargeImageBlock = { __typename: 'LargeImageBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_NameColumnBlock = { __typename: 'NameColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageChooserBlock = { __typename: 'PageChooserBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock = { __typename: 'PageLinkBlock', text: string | null, blockType: string, page: StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock_page | null };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PlanFilterBlock = { __typename: 'PlanFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_QuestionBlock = { __typename: 'QuestionBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RawHTMLBlock = { __typename: 'RawHTMLBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RegexBlock = { __typename: 'RegexBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ReportComparisonBlock = { __typename: 'ReportComparisonBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RichTextBlock = { __typename: 'RichTextBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_SnippetChooserBlock = { __typename: 'SnippetChooserBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StartDateColumnBlock = { __typename: 'StartDateColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StaticBlock = { __typename: 'StaticBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StatusColumnBlock = { __typename: 'StatusColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StreamBlock = { __typename: 'StreamBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StreamFieldBlock = { __typename: 'StreamFieldBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StructBlock = { __typename: 'StructBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_TasksColumnBlock = { __typename: 'TasksColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_TextBlock = { __typename: 'TextBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_TimeBlock = { __typename: 'TimeBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_URLBlock = { __typename: 'URLBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock', blockType: string };

export type StreamFieldFragment_IndicatorShowcaseBlock_linkButton =
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementComplianceStatusBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementContactFormBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementContactInformationBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AccessibilityStatementPreparationInformationBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionAttributeTypeFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionAttributeTypeReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionCategoryFilterCardBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionCategoryFilterCardsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionCategoryReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContactFormBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContactPersonsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContentAttributeTypeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContentCategoryTypeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionContentSectionBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionDependenciesBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionDescriptionBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionEndDateBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionHighlightsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionImplementationPhaseFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionImplementationPhaseReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionLeadParagraphBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionLinksBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionManualStatusReasonBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionMergedActionsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionOfficialNameBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionPledgesBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionPrimaryOrgBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionRelatedActionsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionRelatedIndicatorsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionResponsiblePartiesBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionResponsiblePartyReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionScheduleBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionScheduleContinuousBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionScheduleFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStartDateBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStatusFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStatusGraphsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionStatusReportFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionTasksBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ActionUpdatedAtBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_AdaptiveEmbedBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_BlockQuoteBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_BooleanBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CardBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CardListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CartographyVisualisationBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageAttributeTypeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageBodyBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageCategoryListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageContactFormBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryPageProgressBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTreeMapBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTypeDatasetsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTypeFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CategoryTypeLevelListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ChangeLogMessageBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_CharBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ChoiceBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ContinuousActionFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardHeaderBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorAreaChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorBarChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorLineChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorPieChartBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardIndicatorSummaryBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardParagraphBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DashboardRowBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DateBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DateTimeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DecimalBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_DocumentChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_EmailBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_EmbedBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_EndDateColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FieldColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FloatBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FormChoiceBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FormFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FrontPageHeroAdditionalSettingsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_FrontPageHeroBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IdentifierColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ImageBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ImageChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ImplementationPhaseColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorCategoryColumn
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorCategoryContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorCausalChainBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorFactorValueSummaryContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorGroupBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorHighlightsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorListColumn
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorShowcaseBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorValueColumn
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorValueSummaryContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorVisualizationContentBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IndicatorsColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_IntegerBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_LargeImageBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_NameColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_OrganizationColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PageLinkBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PathsNodeSummaryBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PathsOutcomeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PlanDatasetsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PlanFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_PrimaryOrganizationFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_QuestionAnswerBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_QuestionBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RawHTMLBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RegexBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RelatedIndicatorsBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RelatedPlanListBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ReportComparisonBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ReportTypeFieldChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ResponsiblePartiesColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ResponsiblePartyFilterBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_RichTextBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_ScheduleContinuousColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_SnippetChooserBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StartDateColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StaticBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StatusColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StreamBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StreamFieldBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_StructBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_TasksColumnBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_TextBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_TimeBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_URLBlock
  | StreamFieldFragment_IndicatorShowcaseBlock_linkButton_UpdatedAtColumnBlock
;

export type StreamFieldFragment_LargeImageBlock_image_renditionUncropped = { __typename: 'ImageRendition', id: string, src: string };

export type StreamFieldFragment_LargeImageBlock_image = { __typename: 'Image', id: string, title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: StreamFieldFragment_LargeImageBlock_image_renditionUncropped | null };

export type StreamFieldFragment_QuestionAnswerBlock_questions = { __typename: 'QuestionBlock', question: string, answer: string };

type StreamField_AccessibilityStatementComplianceStatusBlock_Fragment = { __typename: 'AccessibilityStatementComplianceStatusBlock', id: string | null, blockType: string, field: string };

type StreamField_AccessibilityStatementContactFormBlock_Fragment = { __typename: 'AccessibilityStatementContactFormBlock', blockType: string, field: string };

type StreamField_AccessibilityStatementContactInformationBlock_Fragment = { __typename: 'AccessibilityStatementContactInformationBlock', id: string | null, blockType: string, field: string, blocks: Array<StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks> };

type StreamField_AccessibilityStatementPreparationInformationBlock_Fragment = { __typename: 'AccessibilityStatementPreparationInformationBlock', id: string | null, blockType: string, field: string };

type StreamField_ActionAttributeTypeFilterBlock_Fragment = { __typename: 'ActionAttributeTypeFilterBlock', blockType: string, field: string };

type StreamField_ActionAttributeTypeReportFieldBlock_Fragment = { __typename: 'ActionAttributeTypeReportFieldBlock', blockType: string, field: string };

type StreamField_ActionCategoryFilterCardBlock_Fragment = { __typename: 'ActionCategoryFilterCardBlock', blockType: string, field: string };

type StreamField_ActionCategoryFilterCardsBlock_Fragment = { __typename: 'ActionCategoryFilterCardsBlock', blockType: string, field: string, cards: Array<StreamFieldFragment_ActionCategoryFilterCardsBlock_cards> | null };

type StreamField_ActionCategoryReportFieldBlock_Fragment = { __typename: 'ActionCategoryReportFieldBlock', blockType: string, field: string };

type StreamField_ActionContactFormBlock_Fragment = { __typename: 'ActionContactFormBlock', blockType: string, field: string };

type StreamField_ActionContactPersonsBlock_Fragment = { __typename: 'ActionContactPersonsBlock', blockType: string, field: string };

type StreamField_ActionContentAttributeTypeBlock_Fragment = { __typename: 'ActionContentAttributeTypeBlock', blockType: string, field: string };

type StreamField_ActionContentCategoryTypeBlock_Fragment = { __typename: 'ActionContentCategoryTypeBlock', blockType: string, field: string };

type StreamField_ActionContentSectionBlock_Fragment = { __typename: 'ActionContentSectionBlock', blockType: string, field: string };

type StreamField_ActionDependenciesBlock_Fragment = { __typename: 'ActionDependenciesBlock', blockType: string, field: string };

type StreamField_ActionDescriptionBlock_Fragment = { __typename: 'ActionDescriptionBlock', blockType: string, field: string };

type StreamField_ActionEndDateBlock_Fragment = { __typename: 'ActionEndDateBlock', blockType: string, field: string };

type StreamField_ActionHighlightsBlock_Fragment = { __typename: 'ActionHighlightsBlock', blockType: string, field: string };

type StreamField_ActionImplementationPhaseFilterBlock_Fragment = { __typename: 'ActionImplementationPhaseFilterBlock', blockType: string, field: string };

type StreamField_ActionImplementationPhaseReportFieldBlock_Fragment = { __typename: 'ActionImplementationPhaseReportFieldBlock', blockType: string, field: string };

type StreamField_ActionLeadParagraphBlock_Fragment = { __typename: 'ActionLeadParagraphBlock', blockType: string, field: string };

type StreamField_ActionLinksBlock_Fragment = { __typename: 'ActionLinksBlock', blockType: string, field: string };

type StreamField_ActionListBlock_Fragment = { __typename: 'ActionListBlock', id: string | null, heading: string | null, helpText: string | null, blockType: string, field: string, categoryFilter: StreamFieldFragment_ActionListBlock_categoryFilter | null, groupByCategoryLevel: StreamFieldFragment_ActionListBlock_groupByCategoryLevel | null };

type StreamField_ActionManualStatusReasonBlock_Fragment = { __typename: 'ActionManualStatusReasonBlock', blockType: string, field: string };

type StreamField_ActionMergedActionsBlock_Fragment = { __typename: 'ActionMergedActionsBlock', blockType: string, field: string };

type StreamField_ActionOfficialNameBlock_Fragment = { __typename: 'ActionOfficialNameBlock', blockType: string, field: string };

type StreamField_ActionPledgesBlock_Fragment = { __typename: 'ActionPledgesBlock', blockType: string, field: string };

type StreamField_ActionPrimaryOrgBlock_Fragment = { __typename: 'ActionPrimaryOrgBlock', blockType: string, field: string };

type StreamField_ActionRelatedActionsBlock_Fragment = { __typename: 'ActionRelatedActionsBlock', blockType: string, field: string };

type StreamField_ActionRelatedIndicatorsBlock_Fragment = { __typename: 'ActionRelatedIndicatorsBlock', blockType: string, field: string };

type StreamField_ActionResponsiblePartiesBlock_Fragment = { __typename: 'ActionResponsiblePartiesBlock', blockType: string, field: string };

type StreamField_ActionResponsiblePartyReportFieldBlock_Fragment = { __typename: 'ActionResponsiblePartyReportFieldBlock', blockType: string, field: string };

type StreamField_ActionScheduleBlock_Fragment = { __typename: 'ActionScheduleBlock', blockType: string, field: string };

type StreamField_ActionScheduleContinuousBlock_Fragment = { __typename: 'ActionScheduleContinuousBlock', blockType: string, field: string };

type StreamField_ActionScheduleFilterBlock_Fragment = { __typename: 'ActionScheduleFilterBlock', blockType: string, field: string };

type StreamField_ActionStartDateBlock_Fragment = { __typename: 'ActionStartDateBlock', blockType: string, field: string };

type StreamField_ActionStatusFilterBlock_Fragment = { __typename: 'ActionStatusFilterBlock', blockType: string, field: string };

type StreamField_ActionStatusGraphsBlock_Fragment = { __typename: 'ActionStatusGraphsBlock', blockType: string, field: string };

type StreamField_ActionStatusReportFieldBlock_Fragment = { __typename: 'ActionStatusReportFieldBlock', blockType: string, field: string };

type StreamField_ActionTasksBlock_Fragment = { __typename: 'ActionTasksBlock', blockType: string, field: string };

type StreamField_ActionUpdatedAtBlock_Fragment = { __typename: 'ActionUpdatedAtBlock', blockType: string, field: string };

type StreamField_AdaptiveEmbedBlock_Fragment = { __typename: 'AdaptiveEmbedBlock', title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: StreamFieldFragment_AdaptiveEmbedBlock_embed | null };

type StreamField_BlockQuoteBlock_Fragment = { __typename: 'BlockQuoteBlock', blockType: string, field: string };

type StreamField_BooleanBlock_Fragment = { __typename: 'BooleanBlock', blockType: string, field: string };

type StreamField_CardBlock_Fragment = { __typename: 'CardBlock', blockType: string, field: string };

type StreamField_CardListBlock_Fragment = { __typename: 'CardListBlock', heading: string | null, lead: string | null, blockType: string, field: string, cards: Array<StreamFieldFragment_CardListBlock_cards> | null };

type StreamField_CartographyVisualisationBlock_Fragment = { __typename: 'CartographyVisualisationBlock', styleOverrides: string | null, blockType: string, field: string, cartographyStyle: string | null, account: StreamFieldFragment_CartographyVisualisationBlock_account };

type StreamField_CategoryListBlock_Fragment = { __typename: 'CategoryListBlock', style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: StreamFieldFragment_CategoryListBlock_categoryType | null, category: StreamFieldFragment_CategoryListBlock_category | null };

type StreamField_CategoryPageAttributeTypeBlock_Fragment = { __typename: 'CategoryPageAttributeTypeBlock', blockType: string, field: string };

type StreamField_CategoryPageBodyBlock_Fragment = { __typename: 'CategoryPageBodyBlock', blockType: string, field: string };

type StreamField_CategoryPageCategoryListBlock_Fragment = { __typename: 'CategoryPageCategoryListBlock', blockType: string, field: string };

type StreamField_CategoryPageContactFormBlock_Fragment = { __typename: 'CategoryPageContactFormBlock', blockType: string, field: string };

type StreamField_CategoryPageProgressBlock_Fragment = { __typename: 'CategoryPageProgressBlock', blockType: string, field: string };

type StreamField_CategoryTreeMapBlock_Fragment = { __typename: 'CategoryTreeMapBlock', heading: string | null, lead: string | null, blockType: string, field: string, valueAttribute: StreamFieldFragment_CategoryTreeMapBlock_valueAttribute, treeMapCategoryType: StreamFieldFragment_CategoryTreeMapBlock_treeMapCategoryType };

type StreamField_CategoryTypeDatasetsBlock_Fragment = { __typename: 'CategoryTypeDatasetsBlock', blockType: string, field: string };

type StreamField_CategoryTypeFilterBlock_Fragment = { __typename: 'CategoryTypeFilterBlock', blockType: string, field: string };

type StreamField_CategoryTypeLevelListBlock_Fragment = { __typename: 'CategoryTypeLevelListBlock', heading: string | null, helpText: string | null, pathsTargetNodeId: string | null, blockType: string, field: string, categoryLevel: StreamFieldFragment_CategoryTypeLevelListBlock_categoryLevel, groupByCategoryLevel: StreamFieldFragment_CategoryTypeLevelListBlock_groupByCategoryLevel | null, categoryBlockType: StreamFieldFragment_CategoryTypeLevelListBlock_categoryBlockType };

type StreamField_ChangeLogMessageBlock_Fragment = { __typename: 'ChangeLogMessageBlock', fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string };

type StreamField_CharBlock_Fragment = { __typename: 'CharBlock', value: string, blockType: string, field: string };

type StreamField_ChoiceBlock_Fragment = { __typename: 'ChoiceBlock', value: string, blockType: string, field: string, choices: Array<StreamFieldFragment_ChoiceBlock_choices> };

type StreamField_ContinuousActionFilterBlock_Fragment = { __typename: 'ContinuousActionFilterBlock', blockType: string, field: string };

type StreamField_DashboardHeaderBlock_Fragment = { __typename: 'DashboardHeaderBlock', blockType: string, field: string };

type StreamField_DashboardIndicatorAreaChartBlock_Fragment = { __typename: 'DashboardIndicatorAreaChartBlock', blockType: string, field: string };

type StreamField_DashboardIndicatorBarChartBlock_Fragment = { __typename: 'DashboardIndicatorBarChartBlock', blockType: string, field: string };

type StreamField_DashboardIndicatorLineChartBlock_Fragment = { __typename: 'DashboardIndicatorLineChartBlock', blockType: string, field: string };

type StreamField_DashboardIndicatorPieChartBlock_Fragment = { __typename: 'DashboardIndicatorPieChartBlock', blockType: string, field: string };

type StreamField_DashboardIndicatorSummaryBlock_Fragment = { __typename: 'DashboardIndicatorSummaryBlock', blockType: string, field: string };

type StreamField_DashboardParagraphBlock_Fragment = { __typename: 'DashboardParagraphBlock', blockType: string, field: string };

type StreamField_DashboardRowBlock_Fragment = { __typename: 'DashboardRowBlock', blockType: string, field: string, id: string | null, blocks: Array<DashboardIndicatorBlockFragment_blocks> };

type StreamField_DateBlock_Fragment = { __typename: 'DateBlock', blockType: string, field: string };

type StreamField_DateTimeBlock_Fragment = { __typename: 'DateTimeBlock', blockType: string, field: string };

type StreamField_DecimalBlock_Fragment = { __typename: 'DecimalBlock', blockType: string, field: string };

type StreamField_DocumentChooserBlock_Fragment = { __typename: 'DocumentChooserBlock', blockType: string, field: string };

type StreamField_EmailBlock_Fragment = { __typename: 'EmailBlock', blockType: string, field: string };

type StreamField_EmbedBlock_Fragment = { __typename: 'EmbedBlock', blockType: string, field: string };

type StreamField_EndDateColumnBlock_Fragment = { __typename: 'EndDateColumnBlock', blockType: string, field: string };

type StreamField_FieldColumnBlock_Fragment = { __typename: 'FieldColumnBlock', blockType: string, field: string };

type StreamField_FloatBlock_Fragment = { __typename: 'FloatBlock', blockType: string, field: string };

type StreamField_FormChoiceBlock_Fragment = { __typename: 'FormChoiceBlock', blockType: string, field: string };

type StreamField_FormFieldBlock_Fragment = { __typename: 'FormFieldBlock', blockType: string, field: string };

type StreamField_FrontPageHeroAdditionalSettingsBlock_Fragment = { __typename: 'FrontPageHeroAdditionalSettingsBlock', blockType: string, field: string };

type StreamField_FrontPageHeroBlock_Fragment = { __typename: 'FrontPageHeroBlock', layout: string, heading: string | null, lead: string | null, blockType: string, field: string, image: StreamFieldFragment_FrontPageHeroBlock_image | null, additionalSettings: StreamFieldFragment_FrontPageHeroBlock_additionalSettings | null };

type StreamField_IdentifierColumnBlock_Fragment = { __typename: 'IdentifierColumnBlock', blockType: string, field: string };

type StreamField_ImageBlock_Fragment = { __typename: 'ImageBlock', blockType: string, field: string };

type StreamField_ImageChooserBlock_Fragment = { __typename: 'ImageChooserBlock', blockType: string, field: string };

type StreamField_ImplementationPhaseColumnBlock_Fragment = { __typename: 'ImplementationPhaseColumnBlock', blockType: string, field: string };

type StreamField_IndicatorBlock_Fragment = { __typename: 'IndicatorBlock', style: string | null, blockType: string, field: string, indicator: StreamFieldFragment_IndicatorBlock_indicator | null };

type StreamField_IndicatorCategoryColumn_Fragment = { __typename: 'IndicatorCategoryColumn', blockType: string, field: string };

type StreamField_IndicatorCategoryContentBlock_Fragment = { __typename: 'IndicatorCategoryContentBlock', blockType: string, field: string };

type StreamField_IndicatorCausalChainBlock_Fragment = { __typename: 'IndicatorCausalChainBlock', blockType: string, field: string };

type StreamField_IndicatorContentBlock_Fragment = { __typename: 'IndicatorContentBlock', blockType: string, field: string };

type StreamField_IndicatorFactorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorFactorValueSummaryContentBlock', blockType: string, field: string };

type StreamField_IndicatorFilterBlock_Fragment = { __typename: 'IndicatorFilterBlock', blockType: string, field: string };

type StreamField_IndicatorGroupBlock_Fragment = { __typename: 'IndicatorGroupBlock', title: string | null, blockType: string, field: string, indicators: Array<StreamFieldFragment_IndicatorGroupBlock_indicators | null> | null };

type StreamField_IndicatorHighlightsBlock_Fragment = { __typename: 'IndicatorHighlightsBlock', blockType: string, field: string };

type StreamField_IndicatorListColumn_Fragment = { __typename: 'IndicatorListColumn', blockType: string, field: string };

type StreamField_IndicatorShowcaseBlock_Fragment = { __typename: 'IndicatorShowcaseBlock', title: string | null, body: string | null, significantDigits: number | null, indicatorIsNormalized: boolean | null, blockType: string, field: string, blocks: Array<StreamFieldFragment_IndicatorShowcaseBlock_blocks>, indicator: StreamFieldFragment_IndicatorShowcaseBlock_indicator | null, linkButton: StreamFieldFragment_IndicatorShowcaseBlock_linkButton | null };

type StreamField_IndicatorValueColumn_Fragment = { __typename: 'IndicatorValueColumn', blockType: string, field: string };

type StreamField_IndicatorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorValueSummaryContentBlock', blockType: string, field: string };

type StreamField_IndicatorVisualizationContentBlock_Fragment = { __typename: 'IndicatorVisualizationContentBlock', blockType: string, field: string };

type StreamField_IndicatorsColumnBlock_Fragment = { __typename: 'IndicatorsColumnBlock', blockType: string, field: string };

type StreamField_IntegerBlock_Fragment = { __typename: 'IntegerBlock', blockType: string, field: string };

type StreamField_LargeImageBlock_Fragment = { __typename: 'LargeImageBlock', width: string | null, blockType: string, field: string, image: StreamFieldFragment_LargeImageBlock_image | null };

type StreamField_NameColumnBlock_Fragment = { __typename: 'NameColumnBlock', blockType: string, field: string };

type StreamField_OrganizationColumnBlock_Fragment = { __typename: 'OrganizationColumnBlock', blockType: string, field: string };

type StreamField_PageChooserBlock_Fragment = { __typename: 'PageChooserBlock', blockType: string, field: string };

type StreamField_PageLinkBlock_Fragment = { __typename: 'PageLinkBlock', blockType: string, field: string };

type StreamField_PathsNodeSummaryBlock_Fragment = { __typename: 'PathsNodeSummaryBlock', blockType: string, field: string };

type StreamField_PathsOutcomeBlock_Fragment = { __typename: 'PathsOutcomeBlock', heading: string | null, helpText: string | null, outcomeNodeId: string | null, blockType: string, field: string };

type StreamField_PlanDatasetsBlock_Fragment = { __typename: 'PlanDatasetsBlock', blockType: string, field: string };

type StreamField_PlanFilterBlock_Fragment = { __typename: 'PlanFilterBlock', blockType: string, field: string };

type StreamField_PrimaryOrganizationFilterBlock_Fragment = { __typename: 'PrimaryOrganizationFilterBlock', blockType: string, field: string };

type StreamField_QuestionAnswerBlock_Fragment = { __typename: 'QuestionAnswerBlock', heading: string | null, blockType: string, field: string, questions: Array<StreamFieldFragment_QuestionAnswerBlock_questions> | null };

type StreamField_QuestionBlock_Fragment = { __typename: 'QuestionBlock', blockType: string, field: string };

type StreamField_RawHtmlBlock_Fragment = { __typename: 'RawHTMLBlock', blockType: string, field: string };

type StreamField_RegexBlock_Fragment = { __typename: 'RegexBlock', blockType: string, field: string };

type StreamField_RelatedIndicatorsBlock_Fragment = { __typename: 'RelatedIndicatorsBlock', blockType: string, field: string };

type StreamField_RelatedPlanListBlock_Fragment = { __typename: 'RelatedPlanListBlock', blockType: string, field: string };

type StreamField_ReportComparisonBlock_Fragment = { __typename: 'ReportComparisonBlock', blockType: string, field: string };

type StreamField_ReportTypeFieldChooserBlock_Fragment = { __typename: 'ReportTypeFieldChooserBlock', blockType: string, field: string };

type StreamField_ResponsiblePartiesColumnBlock_Fragment = { __typename: 'ResponsiblePartiesColumnBlock', blockType: string, field: string };

type StreamField_ResponsiblePartyFilterBlock_Fragment = { __typename: 'ResponsiblePartyFilterBlock', blockType: string, field: string };

type StreamField_RichTextBlock_Fragment = { __typename: 'RichTextBlock', value: string, blockType: string, field: string };

type StreamField_ScheduleContinuousColumnBlock_Fragment = { __typename: 'ScheduleContinuousColumnBlock', blockType: string, field: string };

type StreamField_SnippetChooserBlock_Fragment = { __typename: 'SnippetChooserBlock', blockType: string, field: string };

type StreamField_StartDateColumnBlock_Fragment = { __typename: 'StartDateColumnBlock', blockType: string, field: string };

type StreamField_StaticBlock_Fragment = { __typename: 'StaticBlock', blockType: string, field: string };

type StreamField_StatusColumnBlock_Fragment = { __typename: 'StatusColumnBlock', blockType: string, field: string };

type StreamField_StreamBlock_Fragment = { __typename: 'StreamBlock', blockType: string, field: string };

type StreamField_StreamFieldBlock_Fragment = { __typename: 'StreamFieldBlock', blockType: string, field: string };

type StreamField_StructBlock_Fragment = { __typename: 'StructBlock', blockType: string, field: string };

type StreamField_TasksColumnBlock_Fragment = { __typename: 'TasksColumnBlock', blockType: string, field: string };

type StreamField_TextBlock_Fragment = { __typename: 'TextBlock', value: string, blockType: string, field: string };

type StreamField_TimeBlock_Fragment = { __typename: 'TimeBlock', blockType: string, field: string };

type StreamField_UrlBlock_Fragment = { __typename: 'URLBlock', blockType: string, field: string };

type StreamField_UpdatedAtColumnBlock_Fragment = { __typename: 'UpdatedAtColumnBlock', blockType: string, field: string };

export type StreamFieldFragment =
  | StreamField_AccessibilityStatementComplianceStatusBlock_Fragment
  | StreamField_AccessibilityStatementContactFormBlock_Fragment
  | StreamField_AccessibilityStatementContactInformationBlock_Fragment
  | StreamField_AccessibilityStatementPreparationInformationBlock_Fragment
  | StreamField_ActionAttributeTypeFilterBlock_Fragment
  | StreamField_ActionAttributeTypeReportFieldBlock_Fragment
  | StreamField_ActionCategoryFilterCardBlock_Fragment
  | StreamField_ActionCategoryFilterCardsBlock_Fragment
  | StreamField_ActionCategoryReportFieldBlock_Fragment
  | StreamField_ActionContactFormBlock_Fragment
  | StreamField_ActionContactPersonsBlock_Fragment
  | StreamField_ActionContentAttributeTypeBlock_Fragment
  | StreamField_ActionContentCategoryTypeBlock_Fragment
  | StreamField_ActionContentSectionBlock_Fragment
  | StreamField_ActionDependenciesBlock_Fragment
  | StreamField_ActionDescriptionBlock_Fragment
  | StreamField_ActionEndDateBlock_Fragment
  | StreamField_ActionHighlightsBlock_Fragment
  | StreamField_ActionImplementationPhaseFilterBlock_Fragment
  | StreamField_ActionImplementationPhaseReportFieldBlock_Fragment
  | StreamField_ActionLeadParagraphBlock_Fragment
  | StreamField_ActionLinksBlock_Fragment
  | StreamField_ActionListBlock_Fragment
  | StreamField_ActionManualStatusReasonBlock_Fragment
  | StreamField_ActionMergedActionsBlock_Fragment
  | StreamField_ActionOfficialNameBlock_Fragment
  | StreamField_ActionPledgesBlock_Fragment
  | StreamField_ActionPrimaryOrgBlock_Fragment
  | StreamField_ActionRelatedActionsBlock_Fragment
  | StreamField_ActionRelatedIndicatorsBlock_Fragment
  | StreamField_ActionResponsiblePartiesBlock_Fragment
  | StreamField_ActionResponsiblePartyReportFieldBlock_Fragment
  | StreamField_ActionScheduleBlock_Fragment
  | StreamField_ActionScheduleContinuousBlock_Fragment
  | StreamField_ActionScheduleFilterBlock_Fragment
  | StreamField_ActionStartDateBlock_Fragment
  | StreamField_ActionStatusFilterBlock_Fragment
  | StreamField_ActionStatusGraphsBlock_Fragment
  | StreamField_ActionStatusReportFieldBlock_Fragment
  | StreamField_ActionTasksBlock_Fragment
  | StreamField_ActionUpdatedAtBlock_Fragment
  | StreamField_AdaptiveEmbedBlock_Fragment
  | StreamField_BlockQuoteBlock_Fragment
  | StreamField_BooleanBlock_Fragment
  | StreamField_CardBlock_Fragment
  | StreamField_CardListBlock_Fragment
  | StreamField_CartographyVisualisationBlock_Fragment
  | StreamField_CategoryListBlock_Fragment
  | StreamField_CategoryPageAttributeTypeBlock_Fragment
  | StreamField_CategoryPageBodyBlock_Fragment
  | StreamField_CategoryPageCategoryListBlock_Fragment
  | StreamField_CategoryPageContactFormBlock_Fragment
  | StreamField_CategoryPageProgressBlock_Fragment
  | StreamField_CategoryTreeMapBlock_Fragment
  | StreamField_CategoryTypeDatasetsBlock_Fragment
  | StreamField_CategoryTypeFilterBlock_Fragment
  | StreamField_CategoryTypeLevelListBlock_Fragment
  | StreamField_ChangeLogMessageBlock_Fragment
  | StreamField_CharBlock_Fragment
  | StreamField_ChoiceBlock_Fragment
  | StreamField_ContinuousActionFilterBlock_Fragment
  | StreamField_DashboardHeaderBlock_Fragment
  | StreamField_DashboardIndicatorAreaChartBlock_Fragment
  | StreamField_DashboardIndicatorBarChartBlock_Fragment
  | StreamField_DashboardIndicatorLineChartBlock_Fragment
  | StreamField_DashboardIndicatorPieChartBlock_Fragment
  | StreamField_DashboardIndicatorSummaryBlock_Fragment
  | StreamField_DashboardParagraphBlock_Fragment
  | StreamField_DashboardRowBlock_Fragment
  | StreamField_DateBlock_Fragment
  | StreamField_DateTimeBlock_Fragment
  | StreamField_DecimalBlock_Fragment
  | StreamField_DocumentChooserBlock_Fragment
  | StreamField_EmailBlock_Fragment
  | StreamField_EmbedBlock_Fragment
  | StreamField_EndDateColumnBlock_Fragment
  | StreamField_FieldColumnBlock_Fragment
  | StreamField_FloatBlock_Fragment
  | StreamField_FormChoiceBlock_Fragment
  | StreamField_FormFieldBlock_Fragment
  | StreamField_FrontPageHeroAdditionalSettingsBlock_Fragment
  | StreamField_FrontPageHeroBlock_Fragment
  | StreamField_IdentifierColumnBlock_Fragment
  | StreamField_ImageBlock_Fragment
  | StreamField_ImageChooserBlock_Fragment
  | StreamField_ImplementationPhaseColumnBlock_Fragment
  | StreamField_IndicatorBlock_Fragment
  | StreamField_IndicatorCategoryColumn_Fragment
  | StreamField_IndicatorCategoryContentBlock_Fragment
  | StreamField_IndicatorCausalChainBlock_Fragment
  | StreamField_IndicatorContentBlock_Fragment
  | StreamField_IndicatorFactorValueSummaryContentBlock_Fragment
  | StreamField_IndicatorFilterBlock_Fragment
  | StreamField_IndicatorGroupBlock_Fragment
  | StreamField_IndicatorHighlightsBlock_Fragment
  | StreamField_IndicatorListColumn_Fragment
  | StreamField_IndicatorShowcaseBlock_Fragment
  | StreamField_IndicatorValueColumn_Fragment
  | StreamField_IndicatorValueSummaryContentBlock_Fragment
  | StreamField_IndicatorVisualizationContentBlock_Fragment
  | StreamField_IndicatorsColumnBlock_Fragment
  | StreamField_IntegerBlock_Fragment
  | StreamField_LargeImageBlock_Fragment
  | StreamField_NameColumnBlock_Fragment
  | StreamField_OrganizationColumnBlock_Fragment
  | StreamField_PageChooserBlock_Fragment
  | StreamField_PageLinkBlock_Fragment
  | StreamField_PathsNodeSummaryBlock_Fragment
  | StreamField_PathsOutcomeBlock_Fragment
  | StreamField_PlanDatasetsBlock_Fragment
  | StreamField_PlanFilterBlock_Fragment
  | StreamField_PrimaryOrganizationFilterBlock_Fragment
  | StreamField_QuestionAnswerBlock_Fragment
  | StreamField_QuestionBlock_Fragment
  | StreamField_RawHtmlBlock_Fragment
  | StreamField_RegexBlock_Fragment
  | StreamField_RelatedIndicatorsBlock_Fragment
  | StreamField_RelatedPlanListBlock_Fragment
  | StreamField_ReportComparisonBlock_Fragment
  | StreamField_ReportTypeFieldChooserBlock_Fragment
  | StreamField_ResponsiblePartiesColumnBlock_Fragment
  | StreamField_ResponsiblePartyFilterBlock_Fragment
  | StreamField_RichTextBlock_Fragment
  | StreamField_ScheduleContinuousColumnBlock_Fragment
  | StreamField_SnippetChooserBlock_Fragment
  | StreamField_StartDateColumnBlock_Fragment
  | StreamField_StaticBlock_Fragment
  | StreamField_StatusColumnBlock_Fragment
  | StreamField_StreamBlock_Fragment
  | StreamField_StreamFieldBlock_Fragment
  | StreamField_StructBlock_Fragment
  | StreamField_TasksColumnBlock_Fragment
  | StreamField_TextBlock_Fragment
  | StreamField_TimeBlock_Fragment
  | StreamField_UrlBlock_Fragment
  | StreamField_UpdatedAtColumnBlock_Fragment
;

export type ActionDetailsQuery_action_workflowStatus_matchingVersion = { __typename: 'WorkflowStateDescription', id: string, description: string | null };

export type ActionDetailsQuery_action_workflowStatus = { __typename: 'WorkflowInfoNode', matchingVersion: ActionDetailsQuery_action_workflowStatus_matchingVersion | null };

export type ActionDetailsQuery_action_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null };

export type ActionDetailsQuery_action_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier, label: string, sentiment: Sentiment, isCompleted: boolean, isActive: boolean };

export type ActionDetailsQuery_action_links = { __typename: 'ActionLink', id: string, order: number, url: string, title: string };

export type ActionDetailsQuery_action_mergedActions_plan = { __typename: 'Plan', id: string, viewUrl: string | null };

export type ActionDetailsQuery_action_mergedActions = { __typename: 'Action', id: string, identifier: string, name: string, officialName: string | null, plan: ActionDetailsQuery_action_mergedActions_plan };

export type ActionDetailsQuery_action_categories_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ActionDetailsQuery_action_categories_parent_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: ActionDetailsQuery_action_categories_image | null, level: ActionListQuery_planActions_categories_level | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ActionDetailsQuery_action_categories_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: ActionDetailsQuery_action_categories_image | null, parent: ActionDetailsQuery_action_categories_parent_parent_parent | null, level: ActionListQuery_planActions_categories_level | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ActionDetailsQuery_action_categories_parent = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: ActionDetailsQuery_action_categories_image | null, parent: ActionDetailsQuery_action_categories_parent_parent | null, level: ActionListQuery_planActions_categories_level | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ActionDetailsQuery_action_categories = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: ActionDetailsQuery_action_categories_image | null, parent: ActionDetailsQuery_action_categories_parent | null, level: ActionListQuery_planActions_categories_level | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ActionDetailsQuery_action_emissionScopes = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string };

export type ActionDetailsQuery_action_contactPersons_person_organization = { __typename: 'Organization', id: string, name: string };

export type ActionDetailsQuery_action_contactPersons_person = { __typename: 'Person', id: string, firstName: string, lastName: string, avatarUrl: string | null, title: string | null, organization: ActionDetailsQuery_action_contactPersons_person_organization };

export type ActionDetailsQuery_action_contactPersons = { __typename: 'ActionContactPerson', id: string, person: ActionDetailsQuery_action_contactPersons_person };

export type ActionDetailsQuery_action_primaryOrg_logo_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ActionDetailsQuery_action_primaryOrg_logo = { __typename: 'Image', id: string, rendition: ActionDetailsQuery_action_primaryOrg_logo_rendition | null };

export type ActionDetailsQuery_action_primaryOrg = { __typename: 'Organization', id: string, abbreviation: string | null, name: string, logo: ActionDetailsQuery_action_primaryOrg_logo | null };

export type ActionDetailsQuery_action_responsibleParties_organization = { __typename: 'Organization', id: string, abbreviation: string | null, name: string, email: string };

export type ActionDetailsQuery_action_responsibleParties = { __typename: 'ActionResponsibleParty', id: string, role: ActionResponsiblePartyRole | null, specifier: string, organization: ActionDetailsQuery_action_responsibleParties_organization };

export type ActionDetailsQuery_action_tasks = { __typename: 'ActionTask', id: string, name: string, dueAt: string, dateFormat: ActionTaskDateFormat | null, completedAt: string | null, details: string | null, state: ActionTaskState };

export type ActionDetailsQuery_action_status = { __typename: 'ActionStatus', id: string, identifier: string, name: string, color: string };

export type ActionDetailsQuery_action_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string };

export type ActionDetailsQuery_action_schedule = { __typename: 'ActionSchedule', id: string, name: string, beginsAt: string, endsAt: string | null };

export type ActionDetailsQuery_action_impact = { __typename: 'ActionImpact', id: string, identifier: string, name: string };

export type ActionDetailsQuery_action_statusUpdates = { __typename: 'ActionStatusUpdate', id: string };

export type ActionDetailsQuery_action_relatedIndicators_indicator_latestGraph = { __typename: 'IndicatorGraph', id: string };

export type ActionDetailsQuery_action_relatedIndicators_indicator_latestValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number };

export type ActionDetailsQuery_action_relatedIndicators_indicator_actions = { __typename: 'Action', id: string, identifier: string, name: string };

export type ActionDetailsQuery_action_relatedIndicators_indicator_plans = { __typename: 'Plan', id: string };

export type ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultAreaChart = { __typename: 'IndicatorDefaultAreaChart', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries> };

export type ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultBarChart = { __typename: 'IndicatorDefaultBarChart', barType: string | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_chartSeries> };

export type ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultLineChart = { __typename: 'IndicatorDefaultLineChart', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_chartSeries> };

export type ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultPieChart = { __typename: 'IndicatorDefaultPieChart', year: number | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_chartSeries> };

export type ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultSummary = { __typename: 'IndicatorDefaultSummary', indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock_indicator };

export type ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization =
  | ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultAreaChart
  | ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultBarChart
  | ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultLineChart
  | ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultPieChart
  | ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization_IndicatorDefaultSummary
;

export type ActionDetailsQuery_action_relatedIndicators_indicator = { __typename: 'Indicator', id: string, name: string, latestGraph: ActionDetailsQuery_action_relatedIndicators_indicator_latestGraph | null, latestValue: ActionDetailsQuery_action_relatedIndicators_indicator_latestValue | null, actions: Array<ActionDetailsQuery_action_relatedIndicators_indicator_actions>, plans: Array<ActionDetailsQuery_action_relatedIndicators_indicator_plans>, defaultVisualization: ActionDetailsQuery_action_relatedIndicators_indicator_defaultVisualization | null };

export type ActionDetailsQuery_action_relatedIndicators = { __typename: 'ActionIndicator', id: string, indicatesActionProgress: boolean, indicator: ActionDetailsQuery_action_relatedIndicators_indicator };

export type ActionDetailsQuery_action_relatedActions = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionDetailsQuery_action_mergedWith_plan = { __typename: 'Plan', id: string, shortName: string | null, versionName: string, viewUrl: string | null };

export type ActionDetailsQuery_action_mergedWith = { __typename: 'Action', id: string, identifier: string, plan: ActionDetailsQuery_action_mergedWith_plan };

export type ActionDetailsQuery_action_supersededBy = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionDetailsQuery_action_supersededActions = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionDetailsQuery_action_nextAction = { __typename: 'Action', id: string, identifier: string };

export type ActionDetailsQuery_action_previousAction = { __typename: 'Action', id: string, identifier: string };

export type ActionDetailsQuery_action_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, categories: Array<AttributesBlockAttributeFragment_categories>, type: AttributesBlockAttributeFragment_type };

export type ActionDetailsQuery_action_attributes_AttributeChoice = { __typename: 'AttributeChoice', text: string | null, id: string, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null, type: AttributesBlockAttributeFragment_type };

export type ActionDetailsQuery_action_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeFragment_type };

export type ActionDetailsQuery_action_attributes_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeFragment_type };

export type ActionDetailsQuery_action_attributes_AttributeText = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeFragment_type };

export type ActionDetailsQuery_action_attributes =
  | ActionDetailsQuery_action_attributes_AttributeCategoryChoice
  | ActionDetailsQuery_action_attributes_AttributeChoice
  | ActionDetailsQuery_action_attributes_AttributeNumericValue
  | ActionDetailsQuery_action_attributes_AttributeRichText
  | ActionDetailsQuery_action_attributes_AttributeText
;

export type ActionDetailsQuery_action_changeLogMessage_createdBy = { __typename: 'Person', id: string, firstName: string, lastName: string, avatarUrl: string | null };

export type ActionDetailsQuery_action_changeLogMessage_ActionChangeLogMessage = { __typename: 'ActionChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ActionDetailsQuery_action_changeLogMessage_createdBy | null };

export type ActionDetailsQuery_action_changeLogMessage_CategoryChangeLogMessage = { __typename: 'CategoryChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ActionDetailsQuery_action_changeLogMessage_createdBy | null };

export type ActionDetailsQuery_action_changeLogMessage_IndicatorChangeLogMessage = { __typename: 'IndicatorChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ActionDetailsQuery_action_changeLogMessage_createdBy | null };

export type ActionDetailsQuery_action_changeLogMessage_PageChangeLogMessage = { __typename: 'PageChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ActionDetailsQuery_action_changeLogMessage_createdBy | null };

export type ActionDetailsQuery_action_changeLogMessage =
  | ActionDetailsQuery_action_changeLogMessage_ActionChangeLogMessage
  | ActionDetailsQuery_action_changeLogMessage_CategoryChangeLogMessage
  | ActionDetailsQuery_action_changeLogMessage_IndicatorChangeLogMessage
  | ActionDetailsQuery_action_changeLogMessage_PageChangeLogMessage
;

export type ActionDetailsQuery_action_pledges_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ActionDetailsQuery_action_pledges_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, categories: Array<AttributesBlockAttributeFragment_categories> };

export type ActionDetailsQuery_action_pledges_attributes_AttributeChoice = { __typename: 'AttributeChoice', text: string | null, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null };

export type ActionDetailsQuery_action_pledges_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ActionDetailsQuery_action_pledges_attributes_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ActionDetailsQuery_action_pledges_attributes_AttributeText = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ActionDetailsQuery_action_pledges_attributes =
  | ActionDetailsQuery_action_pledges_attributes_AttributeCategoryChoice
  | ActionDetailsQuery_action_pledges_attributes_AttributeChoice
  | ActionDetailsQuery_action_pledges_attributes_AttributeNumericValue
  | ActionDetailsQuery_action_pledges_attributes_AttributeRichText
  | ActionDetailsQuery_action_pledges_attributes_AttributeText
;

export type ActionDetailsQuery_action_pledges = { __typename: 'Pledge', id: string, name: string, description: string, slug: string, commitmentCount: number, image: ActionDetailsQuery_action_pledges_image | null, attributes: Array<ActionDetailsQuery_action_pledges_attributes> };

export type ActionDetailsQuery_action_datasets_schema_metrics = { __typename: 'DatasetMetricNode', unit: string };

export type ActionDetailsQuery_action_datasets_schema_dimensions_dimension_categories = { __typename: 'DatasetsDimensionCategory', uuid: string, label: string };

export type ActionDetailsQuery_action_datasets_schema_dimensions_dimension = { __typename: 'DatasetsDimension', name: string, uuid: string, categories: Array<ActionDetailsQuery_action_datasets_schema_dimensions_dimension_categories> };

export type ActionDetailsQuery_action_datasets_schema_dimensions = { __typename: 'DatasetSchemaDimension', order: number, dimension: ActionDetailsQuery_action_datasets_schema_dimensions_dimension };

export type ActionDetailsQuery_action_datasets_schema = { __typename: 'DatasetSchema', uuid: string, name: string, timeResolution: string, metrics: Array<ActionDetailsQuery_action_datasets_schema_metrics>, dimensions: Array<ActionDetailsQuery_action_datasets_schema_dimensions> };

export type ActionDetailsQuery_action_datasets_dataPoints_dimensionCategories_dimension = { __typename: 'DatasetsDimension', uuid: string };

export type ActionDetailsQuery_action_datasets_dataPoints_dimensionCategories = { __typename: 'DatasetsDimensionCategory', uuid: string, label: string, dimension: ActionDetailsQuery_action_datasets_dataPoints_dimensionCategories_dimension };

export type ActionDetailsQuery_action_datasets_dataPoints = { __typename: 'DataPoint', uuid: string, value: number | null, date: string, dimensionCategories: Array<ActionDetailsQuery_action_datasets_dataPoints_dimensionCategories> };

export type ActionDetailsQuery_action_datasets = { __typename: 'Dataset', uuid: string, schema: ActionDetailsQuery_action_datasets_schema | null, dataPoints: Array<ActionDetailsQuery_action_datasets_dataPoints> };

export type ActionDetailsQuery_action_plan_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ActionDetailsQuery_action_plan_image = { __typename: 'Image', id: string, rendition: ActionDetailsQuery_action_plan_image_rendition | null };

export type ActionDetailsQuery_action_plan = { __typename: 'Plan', id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, image: ActionDetailsQuery_action_plan_image | null };

export type ActionDetailsQuery_action_dependencyRole = { __typename: 'ActionDependencyRole', id: string, name: string };

export type ActionDetailsQuery_action_allDependencyRelationships_preceding_dependencyRole = { __typename: 'ActionDependencyRole', id: string, name: string };

export type ActionDetailsQuery_action_allDependencyRelationships_preceding = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: ActionDetailsQuery_action_allDependencyRelationships_preceding_dependencyRole | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionDetailsQuery_action_allDependencyRelationships_dependent = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: ActionDetailsQuery_action_allDependencyRelationships_preceding_dependencyRole | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionDetailsQuery_action_allDependencyRelationships = { __typename: 'ActionDependencyRelationship', id: string, preceding: ActionDetailsQuery_action_allDependencyRelationships_preceding, dependent: ActionDetailsQuery_action_allDependencyRelationships_dependent };

export type ActionDetailsQuery_action = { __typename: 'Action', id: string, identifier: string, name: string, officialName: string | null, leadParagraph: string, description: string | null, completion: number | null, color: string | null, updatedAt: string, manualStatusReason: string | null, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, dateFormat: ActionDateFormat | null, workflowStatus: ActionDetailsQuery_action_workflowStatus | null, image: ActionDetailsQuery_action_image | null, statusSummary: ActionDetailsQuery_action_statusSummary, links: Array<ActionDetailsQuery_action_links>, mergedActions: Array<ActionDetailsQuery_action_mergedActions>, categories: Array<ActionDetailsQuery_action_categories>, emissionScopes: Array<ActionDetailsQuery_action_emissionScopes>, contactPersons: Array<ActionDetailsQuery_action_contactPersons>, primaryOrg: ActionDetailsQuery_action_primaryOrg | null, responsibleParties: Array<ActionDetailsQuery_action_responsibleParties>, tasks: Array<ActionDetailsQuery_action_tasks>, status: ActionDetailsQuery_action_status | null, implementationPhase: ActionDetailsQuery_action_implementationPhase | null, schedule: Array<ActionDetailsQuery_action_schedule>, impact: ActionDetailsQuery_action_impact | null, statusUpdates: Array<ActionDetailsQuery_action_statusUpdates>, relatedIndicators: Array<ActionDetailsQuery_action_relatedIndicators>, relatedActions: Array<ActionDetailsQuery_action_relatedActions>, mergedWith: ActionDetailsQuery_action_mergedWith | null, supersededBy: ActionDetailsQuery_action_supersededBy | null, supersededActions: Array<ActionDetailsQuery_action_supersededActions>, nextAction: ActionDetailsQuery_action_nextAction | null, previousAction: ActionDetailsQuery_action_previousAction | null, attributes: Array<ActionDetailsQuery_action_attributes>, changeLogMessage: ActionDetailsQuery_action_changeLogMessage | null, pledges: Array<ActionDetailsQuery_action_pledges>, datasets: Array<ActionDetailsQuery_action_datasets>, plan: ActionDetailsQuery_action_plan, dependencyRole: ActionDetailsQuery_action_dependencyRole | null, allDependencyRelationships: Array<ActionDetailsQuery_action_allDependencyRelationships> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta = { __typename: 'FieldBlockMetaData', restricted: boolean | null, hidden: boolean | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_fields_choices = { __typename: 'FormChoiceBlock', choiceLabel: string | null, choiceValue: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_fields = { __typename: 'FormFieldBlock', id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_fields_choices> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentAttributeTypeBlock_attributeType = { __typename: 'AttributeType', id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions>, unit: CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentCategoryTypeBlock_categoryType = { __typename: 'CategoryType', id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<CategoryTypeFragment_levels> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactFormBlock_fields_choices = { __typename: 'FormChoiceBlock', choiceLabel: string | null, choiceValue: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactFormBlock_fields = { __typename: 'FormFieldBlock', id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactFormBlock_fields_choices> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentAttributeTypeBlock_attributeType = { __typename: 'AttributeType', id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions>, unit: CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentCategoryTypeBlock_categoryType = { __typename: 'CategoryType', id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<CategoryTypeFragment_levels> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportType = { __typename: 'ReportType', id: string, name: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, categories: Array<AttributesBlockAttributeFragment_categories> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeChoice = { __typename: 'AttributeChoice', text: string | null, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeText = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute =
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeCategoryChoice
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeChoice
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeNumericValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeRichText
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute_AttributeText
;

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionEndDateBlock = { __typename: 'ActionEndDateBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionStartDateBlock = { __typename: 'ActionStartDateBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionTasksBlock = { __typename: 'ActionTasksBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field =
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionAttributeTypeReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionCategoryReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionDescriptionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionEndDateBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionImplementationPhaseReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionManualStatusReasonBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionPrimaryOrgBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionRelatedIndicatorsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionResponsiblePartyReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionScheduleContinuousBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionStartDateBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionStatusReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionTasksBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field_ActionUpdatedAtBlock
;

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionAttributeReportValue = { __typename: 'ActionAttributeReportValue', attribute: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_attribute | null, field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionCategoryReportValue = { __typename: 'ActionCategoryReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionDateFieldReportValue = { __typename: 'ActionDateFieldReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionDateTimeFieldReportValue = { __typename: 'ActionDateTimeFieldReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionImplementationPhaseReportValue = { __typename: 'ActionImplementationPhaseReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionResponsiblePartyReportValue = { __typename: 'ActionResponsiblePartyReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionSimpleFieldReportValue = { __typename: 'ActionSimpleFieldReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionSingleRelatedModelFieldReportValue = { __typename: 'ActionSingleRelatedModelFieldReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionStatusReportValue = { __typename: 'ActionStatusReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionTasksReportValue = { __typename: 'ActionTasksReportValue', field: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_field };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction =
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionAttributeReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionCategoryReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionDateFieldReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionDateTimeFieldReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionImplementationPhaseReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionResponsiblePartyReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionSimpleFieldReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionSingleRelatedModelFieldReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionStatusReportValue
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction_ActionTasksReportValue
;

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare = { __typename: 'Report', identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare_valuesForAction> | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactFormBlock = { __typename: 'ActionContactFormBlock', field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactFormBlock_fields> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', field: string, attributeType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentAttributeTypeBlock_attributeType };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', field: string, categoryType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentCategoryTypeBlock_categoryType };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionEndDateBlock = { __typename: 'ActionEndDateBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionLinksBlock = { __typename: 'ActionLinksBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionListBlock = { __typename: 'ActionListBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock', field: string, fieldLabel: string | null, caption: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionPledgesBlock = { __typename: 'ActionPledgesBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionScheduleBlock = { __typename: 'ActionScheduleBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStartDateBlock = { __typename: 'ActionStartDateBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionTasksBlock = { __typename: 'ActionTasksBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_BlockQuoteBlock = { __typename: 'BlockQuoteBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_BooleanBlock = { __typename: 'BooleanBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CardBlock = { __typename: 'CardBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CardListBlock = { __typename: 'CardListBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryListBlock = { __typename: 'CategoryListBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CharBlock = { __typename: 'CharBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ChoiceBlock = { __typename: 'ChoiceBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardRowBlock = { __typename: 'DashboardRowBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DateBlock = { __typename: 'DateBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DateTimeBlock = { __typename: 'DateTimeBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DecimalBlock = { __typename: 'DecimalBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DocumentChooserBlock = { __typename: 'DocumentChooserBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_EmailBlock = { __typename: 'EmailBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_EmbedBlock = { __typename: 'EmbedBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_EndDateColumnBlock = { __typename: 'EndDateColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FieldColumnBlock = { __typename: 'FieldColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FloatBlock = { __typename: 'FloatBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FormChoiceBlock = { __typename: 'FormChoiceBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FormFieldBlock = { __typename: 'FormFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ImageBlock = { __typename: 'ImageBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ImageChooserBlock = { __typename: 'ImageChooserBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorBlock = { __typename: 'IndicatorBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorListColumn = { __typename: 'IndicatorListColumn', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorValueColumn = { __typename: 'IndicatorValueColumn', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IntegerBlock = { __typename: 'IntegerBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_LargeImageBlock = { __typename: 'LargeImageBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_NameColumnBlock = { __typename: 'NameColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PageChooserBlock = { __typename: 'PageChooserBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PageLinkBlock = { __typename: 'PageLinkBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PlanFilterBlock = { __typename: 'PlanFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_QuestionBlock = { __typename: 'QuestionBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RawHTMLBlock = { __typename: 'RawHTMLBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RegexBlock = { __typename: 'RegexBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock = { __typename: 'ReportComparisonBlock', field: string, reportField: string | null, reportType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportType | null, reportsToCompare: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare | null> | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RichTextBlock = { __typename: 'RichTextBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_SnippetChooserBlock = { __typename: 'SnippetChooserBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StartDateColumnBlock = { __typename: 'StartDateColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StaticBlock = { __typename: 'StaticBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StatusColumnBlock = { __typename: 'StatusColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StreamBlock = { __typename: 'StreamBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StreamFieldBlock = { __typename: 'StreamFieldBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StructBlock = { __typename: 'StructBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_TasksColumnBlock = { __typename: 'TasksColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_TextBlock = { __typename: 'TextBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_TimeBlock = { __typename: 'TimeBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_URLBlock = { __typename: 'URLBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock', field: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks =
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementComplianceStatusBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementContactFormBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementContactInformationBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AccessibilityStatementPreparationInformationBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionAttributeTypeFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionAttributeTypeReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionCategoryFilterCardBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionCategoryFilterCardsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionCategoryReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactFormBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContactPersonsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentAttributeTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentCategoryTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionContentSectionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionDependenciesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionDescriptionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionEndDateBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionHighlightsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionImplementationPhaseFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionImplementationPhaseReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionLeadParagraphBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionLinksBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionListBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionManualStatusReasonBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionMergedActionsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionOfficialNameBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionPledgesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionPrimaryOrgBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionRelatedActionsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionRelatedIndicatorsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionResponsiblePartiesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionResponsiblePartyReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionScheduleBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionScheduleContinuousBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionScheduleFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStartDateBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStatusFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStatusGraphsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionStatusReportFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionTasksBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ActionUpdatedAtBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_AdaptiveEmbedBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_BlockQuoteBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_BooleanBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CardBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CardListBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CartographyVisualisationBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryListBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageAttributeTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageBodyBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageCategoryListBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageContactFormBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryPageProgressBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTreeMapBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTypeDatasetsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTypeFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CategoryTypeLevelListBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ChangeLogMessageBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_CharBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ChoiceBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ContinuousActionFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardHeaderBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorAreaChartBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorBarChartBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorLineChartBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorPieChartBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardIndicatorSummaryBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardParagraphBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DashboardRowBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DateBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DateTimeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DecimalBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_DocumentChooserBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_EmailBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_EmbedBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_EndDateColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FieldColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FloatBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FormChoiceBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FormFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FrontPageHeroAdditionalSettingsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_FrontPageHeroBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IdentifierColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ImageBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ImageChooserBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ImplementationPhaseColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorCategoryColumn
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorCategoryContentBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorCausalChainBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorContentBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorFactorValueSummaryContentBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorGroupBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorHighlightsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorListColumn
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorShowcaseBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorValueColumn
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorValueSummaryContentBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorVisualizationContentBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IndicatorsColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_IntegerBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_LargeImageBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_NameColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_OrganizationColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PageChooserBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PageLinkBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PathsNodeSummaryBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PathsOutcomeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PlanDatasetsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PlanFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_PrimaryOrganizationFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_QuestionAnswerBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_QuestionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RawHTMLBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RegexBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RelatedIndicatorsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RelatedPlanListBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportTypeFieldChooserBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ResponsiblePartiesColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ResponsiblePartyFilterBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_RichTextBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ScheduleContinuousColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_SnippetChooserBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StartDateColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StaticBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StatusColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StreamBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StreamFieldBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_StructBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_TasksColumnBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_TextBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_TimeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_URLBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_UpdatedAtColumnBlock
;

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_PlanDatasetsBlock_datasetSchema = { __typename: 'DatasetSchema', uuid: string };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContactFormBlock = { __typename: 'ActionContactFormBlock', field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, fields: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_fields> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, attributeType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentAttributeTypeBlock_attributeType };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, categoryType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentCategoryTypeBlock_categoryType };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock', field: string, id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks | null> | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionLinksBlock = { __typename: 'ActionLinksBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock', field: string, fieldLabel: string | null, caption: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionPledgesBlock = { __typename: 'ActionPledgesBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionTasksBlock = { __typename: 'ActionTasksBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock', field: string, id: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock', field: string, id: string | null, heading: string | null, helpText: string | null, datasetSchema: ActionDetailsQuery_plan_actionListPage_detailsMainTop_PlanDatasetsBlock_datasetSchema };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop_ReportComparisonBlock = { __typename: 'ReportComparisonBlock', field: string, reportField: string | null, reportType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportType | null, reportsToCompare: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare | null> | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainTop =
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContactFormBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentAttributeTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentCategoryTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionDependenciesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionDescriptionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionLeadParagraphBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionLinksBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionMergedActionsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionOfficialNameBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionPledgesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionRelatedActionsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionRelatedIndicatorsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionTasksBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ChangeLogMessageBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_IndicatorCausalChainBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_PlanDatasetsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainTop_ReportComparisonBlock
;

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContactFormBlock = { __typename: 'ActionContactFormBlock', field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, fields: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_fields> };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, attributeType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentAttributeTypeBlock_attributeType };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, categoryType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentCategoryTypeBlock_categoryType };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock', field: string, id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks | null> | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionLinksBlock = { __typename: 'ActionLinksBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock', field: string, fieldLabel: string | null, caption: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionPledgesBlock = { __typename: 'ActionPledgesBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionTasksBlock = { __typename: 'ActionTasksBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock', field: string, id: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock', field: string, id: string | null, heading: string | null, helpText: string | null, datasetSchema: ActionDetailsQuery_plan_actionListPage_detailsMainTop_PlanDatasetsBlock_datasetSchema };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ReportComparisonBlock = { __typename: 'ReportComparisonBlock', field: string, reportField: string | null, reportType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportType | null, reportsToCompare: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare | null> | null };

export type ActionDetailsQuery_plan_actionListPage_detailsMainBottom =
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContactFormBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContentAttributeTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContentCategoryTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionContentSectionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionDependenciesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionDescriptionBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionLeadParagraphBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionLinksBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionMergedActionsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionOfficialNameBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionPledgesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionRelatedActionsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionRelatedIndicatorsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ActionTasksBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ChangeLogMessageBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_IndicatorCausalChainBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_PlanDatasetsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsMainBottom_ReportComparisonBlock
;

export type ActionDetailsQuery_plan_actionListPage_detailsAside_meta = { __typename: 'FieldBlockMetaData', restricted: boolean | null, hidden: boolean | null };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentAttributeTypeBlock_attributeType = { __typename: 'AttributeType', id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions>, unit: CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit | null };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentCategoryTypeBlock_categoryType = { __typename: 'CategoryType', id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<CategoryTypeFragment_levels> };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null, attributeType: ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentAttributeTypeBlock_attributeType };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null, categoryType: ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentCategoryTypeBlock_categoryType };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, heading: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ActionScheduleBlock = { __typename: 'ActionScheduleBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null };

export type ActionDetailsQuery_plan_actionListPage_detailsAside_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

export type ActionDetailsQuery_plan_actionListPage_detailsAside =
  | ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContactPersonsBlock
  | ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentAttributeTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentCategoryTypeBlock
  | ActionDetailsQuery_plan_actionListPage_detailsAside_ActionResponsiblePartiesBlock
  | ActionDetailsQuery_plan_actionListPage_detailsAside_ActionScheduleBlock
  | ActionDetailsQuery_plan_actionListPage_detailsAside_ChangeLogMessageBlock
;

export type ActionDetailsQuery_plan_actionListPage = { __typename: 'ActionListPage', id: string | null, actionDateFormat: string | null, taskDateFormat: string | null, detailsMainTop: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop> | null, detailsMainBottom: Array<ActionDetailsQuery_plan_actionListPage_detailsMainBottom> | null, detailsAside: Array<ActionDetailsQuery_plan_actionListPage_detailsAside> | null };

export type ActionDetailsQuery_plan_actionAttributeTypes = { __typename: 'AttributeType', id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_choiceOptions>, unit: CategoryAttributeTypesQuery_plan_categoryTypes_attributeTypes_unit | null };

export type ActionDetailsQuery_plan_generalContent = { __typename: 'SiteGeneralContent', id: string, actionTerm: SiteGeneralContentActionTerm };

export type ActionDetailsQuery_plan = { __typename: 'Plan', id: string, actionListPage: ActionDetailsQuery_plan_actionListPage | null, actionAttributeTypes: Array<ActionDetailsQuery_plan_actionAttributeTypes>, generalContent: ActionDetailsQuery_plan_generalContent };

export type ActionDetailsQuery = { __typename: 'Query', action: ActionDetailsQuery_action | null, plan: ActionDetailsQuery_plan | null };


export type ActionDetailsQueryVariables = Exact<{
  plan: string | number;
  id: string | number;
  clientUrl: string;
  workflow: WorkflowState | null | undefined;
}>;

export type ActionDependenciesFragment = { __typename: 'Action', id: string, dependencyRole: ActionDetailsQuery_action_dependencyRole | null, allDependencyRelationships: Array<ActionDetailsQuery_action_allDependencyRelationships> };

type ActionAsideContentBlocks_ActionContactPersonsBlock_Fragment = { __typename: 'ActionContactPersonsBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null };

type ActionAsideContentBlocks_ActionContentAttributeTypeBlock_Fragment = { __typename: 'ActionContentAttributeTypeBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null, attributeType: ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentAttributeTypeBlock_attributeType };

type ActionAsideContentBlocks_ActionContentCategoryTypeBlock_Fragment = { __typename: 'ActionContentCategoryTypeBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null, categoryType: ActionDetailsQuery_plan_actionListPage_detailsAside_ActionContentCategoryTypeBlock_categoryType };

type ActionAsideContentBlocks_ActionResponsiblePartiesBlock_Fragment = { __typename: 'ActionResponsiblePartiesBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, heading: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null };

type ActionAsideContentBlocks_ActionScheduleBlock_Fragment = { __typename: 'ActionScheduleBlock', fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsAside_meta | null };

type ActionAsideContentBlocks_ChangeLogMessageBlock_Fragment = { __typename: 'ChangeLogMessageBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

export type ActionAsideContentBlocksFragment =
  | ActionAsideContentBlocks_ActionContactPersonsBlock_Fragment
  | ActionAsideContentBlocks_ActionContentAttributeTypeBlock_Fragment
  | ActionAsideContentBlocks_ActionContentCategoryTypeBlock_Fragment
  | ActionAsideContentBlocks_ActionResponsiblePartiesBlock_Fragment
  | ActionAsideContentBlocks_ActionScheduleBlock_Fragment
  | ActionAsideContentBlocks_ChangeLogMessageBlock_Fragment
;

type ActionMainContentBlocks_ActionContactFormBlock_Fragment = { __typename: 'ActionContactFormBlock', field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, fields: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_fields> };

type ActionMainContentBlocks_ActionContentAttributeTypeBlock_Fragment = { __typename: 'ActionContentAttributeTypeBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, attributeType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentAttributeTypeBlock_attributeType };

type ActionMainContentBlocks_ActionContentCategoryTypeBlock_Fragment = { __typename: 'ActionContentCategoryTypeBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null, categoryType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentCategoryTypeBlock_categoryType };

type ActionMainContentBlocks_ActionContentSectionBlock_Fragment = { __typename: 'ActionContentSectionBlock', field: string, id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks | null> | null };

type ActionMainContentBlocks_ActionDependenciesBlock_Fragment = { __typename: 'ActionDependenciesBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionDescriptionBlock_Fragment = { __typename: 'ActionDescriptionBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionLeadParagraphBlock_Fragment = { __typename: 'ActionLeadParagraphBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionLinksBlock_Fragment = { __typename: 'ActionLinksBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionMergedActionsBlock_Fragment = { __typename: 'ActionMergedActionsBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionOfficialNameBlock_Fragment = { __typename: 'ActionOfficialNameBlock', field: string, fieldLabel: string | null, caption: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionPledgesBlock_Fragment = { __typename: 'ActionPledgesBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionRelatedActionsBlock_Fragment = { __typename: 'ActionRelatedActionsBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionRelatedIndicatorsBlock_Fragment = { __typename: 'ActionRelatedIndicatorsBlock', field: string, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ActionTasksBlock_Fragment = { __typename: 'ActionTasksBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_ChangeLogMessageBlock_Fragment = { __typename: 'ChangeLogMessageBlock', field: string, fieldLabel: string | null, fieldHelpText: string | null };

type ActionMainContentBlocks_IndicatorCausalChainBlock_Fragment = { __typename: 'IndicatorCausalChainBlock', field: string, id: string | null, meta: ActionDetailsQuery_plan_actionListPage_detailsMainTop_meta | null };

type ActionMainContentBlocks_PlanDatasetsBlock_Fragment = { __typename: 'PlanDatasetsBlock', field: string, id: string | null, heading: string | null, helpText: string | null, datasetSchema: ActionDetailsQuery_plan_actionListPage_detailsMainTop_PlanDatasetsBlock_datasetSchema };

type ActionMainContentBlocks_ReportComparisonBlock_Fragment = { __typename: 'ReportComparisonBlock', field: string, reportField: string | null, reportType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportType | null, reportsToCompare: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare | null> | null };

export type ActionMainContentBlocksFragment =
  | ActionMainContentBlocks_ActionContactFormBlock_Fragment
  | ActionMainContentBlocks_ActionContentAttributeTypeBlock_Fragment
  | ActionMainContentBlocks_ActionContentCategoryTypeBlock_Fragment
  | ActionMainContentBlocks_ActionContentSectionBlock_Fragment
  | ActionMainContentBlocks_ActionDependenciesBlock_Fragment
  | ActionMainContentBlocks_ActionDescriptionBlock_Fragment
  | ActionMainContentBlocks_ActionLeadParagraphBlock_Fragment
  | ActionMainContentBlocks_ActionLinksBlock_Fragment
  | ActionMainContentBlocks_ActionMergedActionsBlock_Fragment
  | ActionMainContentBlocks_ActionOfficialNameBlock_Fragment
  | ActionMainContentBlocks_ActionPledgesBlock_Fragment
  | ActionMainContentBlocks_ActionRelatedActionsBlock_Fragment
  | ActionMainContentBlocks_ActionRelatedIndicatorsBlock_Fragment
  | ActionMainContentBlocks_ActionTasksBlock_Fragment
  | ActionMainContentBlocks_ChangeLogMessageBlock_Fragment
  | ActionMainContentBlocks_IndicatorCausalChainBlock_Fragment
  | ActionMainContentBlocks_PlanDatasetsBlock_Fragment
  | ActionMainContentBlocks_ReportComparisonBlock_Fragment
;

export type ReportComparisonBlockActionContentFragment = { __typename: 'ReportComparisonBlock', reportField: string | null, reportType: ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportType | null, reportsToCompare: Array<ActionDetailsQuery_plan_actionListPage_detailsMainTop_ActionContentSectionBlock_blocks_ReportComparisonBlock_reportsToCompare | null> | null };

export type ActionCardWithDependencyRoleFragment = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: ActionDetailsQuery_action_allDependencyRelationships_preceding_dependencyRole | null, status: ActionListQuery_planActions_status | null, categories: Array<ActionListQuery_planActions_categories>, statusSummary: ActionListQuery_planActions_statusSummary, implementationPhase: ActionListQuery_planActions_implementationPhase | null, primaryOrg: ActionListQuery_planActions_primaryOrg | null, mergedWith: ActionListQuery_planActions_mergedWith | null, plan: ActionListQuery_planActions_plan };

export type ActionListPageIncludeRelatedQuery_plan_actionListPage = { __typename: 'ActionListPage', id: string | null, includeRelatedPlans: boolean | null };

export type ActionListPageIncludeRelatedQuery_plan = { __typename: 'Plan', id: string, actionListPage: ActionListPageIncludeRelatedQuery_plan_actionListPage | null };

export type ActionListPageIncludeRelatedQuery = { __typename: 'Query', plan: ActionListPageIncludeRelatedQuery_plan | null };


export type ActionListPageIncludeRelatedQueryVariables = Exact<{
  plan: string | number;
}>;

export type ActionListPageQuery_plan_actionListPage = { __typename: 'ActionListPage', leadContent: string | null, defaultView: ActionListPageView, headingHierarchyDepth: number, includeRelatedPlans: boolean | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, primaryFilters: Array<ActionListPageFiltersFragment_primaryFilters> | null, mainFilters: Array<ActionListPageFiltersFragment_mainFilters> | null, advancedFilters: Array<ActionListPageFiltersFragment_advancedFilters> | null };

export type ActionListPageQuery_plan = { __typename: 'Plan', id: string, actionListPage: ActionListPageQuery_plan_actionListPage | null };

export type ActionListPageQuery = { __typename: 'Query', plan: ActionListPageQuery_plan | null };


export type ActionListPageQueryVariables = Exact<{
  plan: string | number;
  onlyWithActions: boolean;
}>;

export type TemplatedCategoryPageFragment_layout_layoutMainTop_attributeType = { __typename: 'AttributeType', id: string, identifier: string };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContactFormBlock = { __typename: 'ActionContactFormBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionEndDateBlock = { __typename: 'ActionEndDateBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionLinksBlock = { __typename: 'ActionLinksBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionListBlock = { __typename: 'ActionListBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionPledgesBlock = { __typename: 'ActionPledgesBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionScheduleBlock = { __typename: 'ActionScheduleBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStartDateBlock = { __typename: 'ActionStartDateBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionTasksBlock = { __typename: 'ActionTasksBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_BlockQuoteBlock = { __typename: 'BlockQuoteBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_BooleanBlock = { __typename: 'BooleanBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CardBlock = { __typename: 'CardBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CardListBlock = { __typename: 'CardListBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryListBlock = { __typename: 'CategoryListBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CharBlock = { __typename: 'CharBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ChoiceBlock = { __typename: 'ChoiceBlock', value: string };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardRowBlock = { __typename: 'DashboardRowBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DateBlock = { __typename: 'DateBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DateTimeBlock = { __typename: 'DateTimeBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DecimalBlock = { __typename: 'DecimalBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DocumentChooserBlock = { __typename: 'DocumentChooserBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_EmailBlock = { __typename: 'EmailBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_EmbedBlock = { __typename: 'EmbedBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_EndDateColumnBlock = { __typename: 'EndDateColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FieldColumnBlock = { __typename: 'FieldColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FloatBlock = { __typename: 'FloatBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FormChoiceBlock = { __typename: 'FormChoiceBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FormFieldBlock = { __typename: 'FormFieldBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ImageBlock = { __typename: 'ImageBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ImageChooserBlock = { __typename: 'ImageChooserBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorBlock = { __typename: 'IndicatorBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorContentBlock = { __typename: 'IndicatorContentBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorListColumn = { __typename: 'IndicatorListColumn' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorValueColumn = { __typename: 'IndicatorValueColumn' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IntegerBlock = { __typename: 'IntegerBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_LargeImageBlock = { __typename: 'LargeImageBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_NameColumnBlock = { __typename: 'NameColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PageChooserBlock = { __typename: 'PageChooserBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PageLinkBlock = { __typename: 'PageLinkBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PlanFilterBlock = { __typename: 'PlanFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_QuestionBlock = { __typename: 'QuestionBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RawHTMLBlock = { __typename: 'RawHTMLBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RegexBlock = { __typename: 'RegexBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ReportComparisonBlock = { __typename: 'ReportComparisonBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RichTextBlock = { __typename: 'RichTextBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_SnippetChooserBlock = { __typename: 'SnippetChooserBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StartDateColumnBlock = { __typename: 'StartDateColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StaticBlock = { __typename: 'StaticBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StatusColumnBlock = { __typename: 'StatusColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StreamBlock = { __typename: 'StreamBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StreamFieldBlock = { __typename: 'StreamFieldBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StructBlock = { __typename: 'StructBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_TasksColumnBlock = { __typename: 'TasksColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_TextBlock = { __typename: 'TextBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_TimeBlock = { __typename: 'TimeBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_URLBlock = { __typename: 'URLBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks =
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementComplianceStatusBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementContactFormBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementContactInformationBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AccessibilityStatementPreparationInformationBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionAttributeTypeFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionAttributeTypeReportFieldBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionCategoryFilterCardBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionCategoryFilterCardsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionCategoryReportFieldBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContactFormBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContactPersonsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContentAttributeTypeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContentCategoryTypeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionContentSectionBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionDependenciesBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionDescriptionBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionEndDateBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionHighlightsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionImplementationPhaseFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionImplementationPhaseReportFieldBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionLeadParagraphBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionLinksBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionListBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionManualStatusReasonBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionMergedActionsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionOfficialNameBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionPledgesBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionPrimaryOrgBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionRelatedActionsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionRelatedIndicatorsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionResponsiblePartiesBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionResponsiblePartyReportFieldBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionScheduleBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionScheduleContinuousBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionScheduleFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStartDateBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStatusFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStatusGraphsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionStatusReportFieldBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionTasksBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ActionUpdatedAtBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_AdaptiveEmbedBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_BlockQuoteBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_BooleanBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CardBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CardListBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CartographyVisualisationBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryListBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageAttributeTypeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageBodyBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageCategoryListBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageContactFormBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryPageProgressBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTreeMapBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTypeDatasetsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTypeFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CategoryTypeLevelListBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ChangeLogMessageBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_CharBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ChoiceBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ContinuousActionFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardHeaderBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorAreaChartBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorBarChartBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorLineChartBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorPieChartBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardIndicatorSummaryBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardParagraphBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DashboardRowBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DateBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DateTimeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DecimalBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_DocumentChooserBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_EmailBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_EmbedBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_EndDateColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FieldColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FloatBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FormChoiceBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FormFieldBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FrontPageHeroAdditionalSettingsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_FrontPageHeroBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IdentifierColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ImageBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ImageChooserBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ImplementationPhaseColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorCategoryColumn
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorCategoryContentBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorCausalChainBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorContentBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorFactorValueSummaryContentBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorGroupBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorHighlightsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorListColumn
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorShowcaseBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorValueColumn
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorValueSummaryContentBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorVisualizationContentBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IndicatorsColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_IntegerBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_LargeImageBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_NameColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_OrganizationColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PageChooserBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PageLinkBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PathsNodeSummaryBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PathsOutcomeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PlanDatasetsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PlanFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_PrimaryOrganizationFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_QuestionAnswerBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_QuestionBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RawHTMLBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RegexBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RelatedIndicatorsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RelatedPlanListBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ReportComparisonBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ReportTypeFieldChooserBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ResponsiblePartiesColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ResponsiblePartyFilterBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_RichTextBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_ScheduleContinuousColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_SnippetChooserBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StartDateColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StaticBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StatusColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StreamBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StreamFieldBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_StructBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_TasksColumnBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_TextBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_TimeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_URLBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks_UpdatedAtColumnBlock
;

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock', attributeType: TemplatedCategoryPageFragment_layout_layoutMainTop_attributeType };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock', blocks: Array<TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock_blocks> };

export type TemplatedCategoryPageFragment_layout_layoutMainTop_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock', id: string | null, heading: string | null, pathsTargetNodeId: string | null };

export type TemplatedCategoryPageFragment_layout_layoutMainTop =
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageAttributeTypeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_CategoryPageProgressBlock
  | TemplatedCategoryPageFragment_layout_layoutMainTop_PathsNodeSummaryBlock
;

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_attributeType = { __typename: 'AttributeType', id: string, identifier: string };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageContactFormBlock_fields_choices = { __typename: 'FormChoiceBlock', choiceLabel: string | null, choiceValue: string | null };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageContactFormBlock_fields = { __typename: 'FormFieldBlock', id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageContactFormBlock_fields_choices> };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryTypeDatasetsBlock_datasetSchema = { __typename: 'DatasetSchema', uuid: string };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock', attributeType: TemplatedCategoryPageFragment_layout_layoutMainBottom_attributeType };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock' };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock', id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageContactFormBlock_fields> };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock', id: string | null, heading: string | null, helpText: string | null, datasetSchema: TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryTypeDatasetsBlock_datasetSchema };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', fieldLabel: string | null, fieldHelpText: string | null };

export type TemplatedCategoryPageFragment_layout_layoutMainBottom =
  | TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageAttributeTypeBlock
  | TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageBodyBlock
  | TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageCategoryListBlock
  | TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryPageContactFormBlock
  | TemplatedCategoryPageFragment_layout_layoutMainBottom_CategoryTypeDatasetsBlock
  | TemplatedCategoryPageFragment_layout_layoutMainBottom_ChangeLogMessageBlock
;

export type TemplatedCategoryPageFragment_layout = { __typename: 'CategoryTypePageLevelLayout', id: string | null, iconSize: string | null, layoutMainTop: Array<TemplatedCategoryPageFragment_layout_layoutMainTop> | null, layoutMainBottom: Array<TemplatedCategoryPageFragment_layout_layoutMainBottom> | null };

export type TemplatedCategoryPageFragment = { __typename: 'CategoryPage', id: string | null, layout: TemplatedCategoryPageFragment_layout | null };

export type PlanDatasetsBlockFragment_schema_metrics = { __typename: 'DatasetMetricNode', unit: string };

export type PlanDatasetsBlockFragment_schema_dimensions_dimension_categories = { __typename: 'DatasetsDimensionCategory', uuid: string, label: string };

export type PlanDatasetsBlockFragment_schema_dimensions_dimension = { __typename: 'DatasetsDimension', name: string, uuid: string, categories: Array<PlanDatasetsBlockFragment_schema_dimensions_dimension_categories> };

export type PlanDatasetsBlockFragment_schema_dimensions = { __typename: 'DatasetSchemaDimension', order: number, dimension: PlanDatasetsBlockFragment_schema_dimensions_dimension };

export type PlanDatasetsBlockFragment_schema = { __typename: 'DatasetSchema', uuid: string, name: string, timeResolution: string, metrics: Array<PlanDatasetsBlockFragment_schema_metrics>, dimensions: Array<PlanDatasetsBlockFragment_schema_dimensions> };

export type PlanDatasetsBlockFragment_dataPoints_dimensionCategories_dimension = { __typename: 'DatasetsDimension', uuid: string };

export type PlanDatasetsBlockFragment_dataPoints_dimensionCategories = { __typename: 'DatasetsDimensionCategory', uuid: string, label: string, dimension: PlanDatasetsBlockFragment_dataPoints_dimensionCategories_dimension };

export type PlanDatasetsBlockFragment_dataPoints = { __typename: 'DataPoint', uuid: string, value: number | null, date: string, dimensionCategories: Array<PlanDatasetsBlockFragment_dataPoints_dimensionCategories> };

export type PlanDatasetsBlockFragment = { __typename: 'Dataset', uuid: string, schema: PlanDatasetsBlockFragment_schema | null, dataPoints: Array<PlanDatasetsBlockFragment_dataPoints> };

export type ContentPageQuery_planPage_body_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock', id: string | null, blockType: string, field: string };

export type ContentPageQuery_planPage_body_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock', blockType: string, field: string };

export type ContentPageQuery_planPage_body_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock', id: string | null, blockType: string, field: string, blocks: Array<StreamFieldFragment_AccessibilityStatementContactInformationBlock_blocks> };

export type ContentPageQuery_planPage_body_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock', id: string | null, blockType: string, field: string };

export type ContentPageQuery_planPage_body_RichTextBlock = { __typename: 'RichTextBlock', value: string, blockType: string, field: string };

export type ContentPageQuery_planPage_body =
  | ContentPageQuery_planPage_body_AccessibilityStatementComplianceStatusBlock
  | ContentPageQuery_planPage_body_AccessibilityStatementContactFormBlock
  | ContentPageQuery_planPage_body_AccessibilityStatementContactInformationBlock
  | ContentPageQuery_planPage_body_AccessibilityStatementPreparationInformationBlock
  | ContentPageQuery_planPage_body_RichTextBlock
;

export type ContentPageQuery_planPage_CategoryPage_category_categoryPage = { __typename: 'CategoryPage', id: string | null, urlPath: string };

export type ContentPageQuery_planPage_CategoryPage_category_level = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type ContentPageQuery_planPage_CategoryPage_category_type = { __typename: 'CategoryType', id: string, hideCategoryIdentifiers: boolean };

export type ContentPageQuery_planPage_CategoryPage_category_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ContentPageQuery_planPage_CategoryPage_category_indicators = { __typename: 'Indicator', id: string };

export type ContentPageQuery_planPage_CategoryPage_category_iconImage_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ContentPageQuery_planPage_CategoryPage_category_iconImage = { __typename: 'Image', id: string, rendition: ContentPageQuery_planPage_CategoryPage_category_iconImage_rendition | null };

export type ContentPageQuery_planPage_CategoryPage_category_children = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: ActionListQuery_planActions_categories_level | null, image: ActionListQuery_planActions_categories_image | null, indicators: Array<ActionListQuery_planActions_categories_indicators>, indicatorRelationships: Array<ActionListQuery_planActions_categories_indicatorRelationships>, iconImage: ActionListQuery_planActions_categories_iconImage | null, categoryPage: ActionListQuery_planActions_categories_categoryPage | null, type: ActionListQuery_planActions_categories_type, attributes: Array<ActionListQuery_planActions_categories_attributes> };

export type ContentPageQuery_planPage_CategoryPage_category_parent_level = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type ContentPageQuery_planPage_CategoryPage_category_parent_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type ContentPageQuery_planPage_CategoryPage_category_parent_iconImage_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type ContentPageQuery_planPage_CategoryPage_category_parent_iconImage = { __typename: 'Image', id: string, rendition: ContentPageQuery_planPage_CategoryPage_category_parent_iconImage_rendition | null };

export type ContentPageQuery_planPage_CategoryPage_category_parent_categoryPage = { __typename: 'CategoryPage', id: string | null, title: string, urlPath: string };

export type ContentPageQuery_planPage_CategoryPage_category_parent_type = { __typename: 'CategoryType', id: string, hideCategoryIdentifiers: boolean };

export type ContentPageQuery_planPage_CategoryPage_category_parent_parent_categoryPage = { __typename: 'CategoryPage', id: string | null, urlPath: string };

export type ContentPageQuery_planPage_CategoryPage_category_parent_parent_type = { __typename: 'CategoryType', id: string, hideCategoryIdentifiers: boolean };

export type ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, categoryPage: ContentPageQuery_planPage_CategoryPage_category_parent_parent_categoryPage | null, type: ContentPageQuery_planPage_CategoryPage_category_parent_parent_type };

export type ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, categoryPage: ContentPageQuery_planPage_CategoryPage_category_parent_parent_categoryPage | null, type: ContentPageQuery_planPage_CategoryPage_category_parent_parent_type, parent: ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent_parent_parent | null };

export type ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, parent: ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent_parent | null, categoryPage: ContentPageQuery_planPage_CategoryPage_category_parent_parent_categoryPage | null, type: ContentPageQuery_planPage_CategoryPage_category_parent_parent_type };

export type ContentPageQuery_planPage_CategoryPage_category_parent_parent = { __typename: 'Category', id: string, identifier: string, name: string, categoryPage: ContentPageQuery_planPage_CategoryPage_category_parent_parent_categoryPage | null, type: ContentPageQuery_planPage_CategoryPage_category_parent_parent_type, parent: ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent | null };

export type ContentPageQuery_planPage_CategoryPage_category_parent = { __typename: 'Category', id: string, identifier: string, name: string, color: string, iconSvgUrl: string | null, level: ContentPageQuery_planPage_CategoryPage_category_parent_level | null, image: ContentPageQuery_planPage_CategoryPage_category_parent_image | null, iconImage: ContentPageQuery_planPage_CategoryPage_category_parent_iconImage | null, categoryPage: ContentPageQuery_planPage_CategoryPage_category_parent_categoryPage | null, type: ContentPageQuery_planPage_CategoryPage_category_parent_type, parent: ContentPageQuery_planPage_CategoryPage_category_parent_parent | null };

export type ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, categories: Array<AttributesBlockAttributeFragment_categories> };

export type ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeChoice = { __typename: 'AttributeChoice', text: string | null, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null };

export type ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeText = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type ContentPageQuery_planPage_CategoryPage_category_attributes =
  | ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeCategoryChoice
  | ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeChoice
  | ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeNumericValue
  | ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeRichText
  | ContentPageQuery_planPage_CategoryPage_category_attributes_AttributeText
;

export type ContentPageQuery_planPage_CategoryPage_category_datasets = { __typename: 'Dataset', uuid: string, schema: PlanDatasetsBlockFragment_schema | null, dataPoints: Array<PlanDatasetsBlockFragment_dataPoints> };

export type ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_createdBy = { __typename: 'Person', id: string, firstName: string, lastName: string, avatarUrl: string | null };

export type ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_ActionChangeLogMessage = { __typename: 'ActionChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_createdBy | null };

export type ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_CategoryChangeLogMessage = { __typename: 'CategoryChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_createdBy | null };

export type ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_IndicatorChangeLogMessage = { __typename: 'IndicatorChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_createdBy | null };

export type ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_PageChangeLogMessage = { __typename: 'PageChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_createdBy | null };

export type ContentPageQuery_planPage_CategoryPage_category_changeLogMessage =
  | ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_ActionChangeLogMessage
  | ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_CategoryChangeLogMessage
  | ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_IndicatorChangeLogMessage
  | ContentPageQuery_planPage_CategoryPage_category_changeLogMessage_PageChangeLogMessage
;

export type ContentPageQuery_planPage_CategoryPage_category = { __typename: 'Category', id: string, identifier: string, name: string, kausalPathsNodeUuid: string, leadParagraph: string, color: string, iconSvgUrl: string | null, categoryPage: ContentPageQuery_planPage_CategoryPage_category_categoryPage | null, level: ContentPageQuery_planPage_CategoryPage_category_level | null, type: ContentPageQuery_planPage_CategoryPage_category_type, image: ContentPageQuery_planPage_CategoryPage_category_image | null, indicators: Array<ContentPageQuery_planPage_CategoryPage_category_indicators>, iconImage: ContentPageQuery_planPage_CategoryPage_category_iconImage | null, children: Array<ContentPageQuery_planPage_CategoryPage_category_children>, parent: ContentPageQuery_planPage_CategoryPage_category_parent | null, attributes: Array<ContentPageQuery_planPage_CategoryPage_category_attributes>, datasets: Array<ContentPageQuery_planPage_CategoryPage_category_datasets>, changeLogMessage: ContentPageQuery_planPage_CategoryPage_category_changeLogMessage | null };

export type ContentPageQuery_planPage_CategoryPage_body_ActionListBlock = { __typename: 'ActionListBlock', id: string | null, heading: string | null, helpText: string | null, blockType: string, field: string, categoryFilter: StreamFieldFragment_ActionListBlock_categoryFilter | null, groupByCategoryLevel: StreamFieldFragment_ActionListBlock_groupByCategoryLevel | null };

export type ContentPageQuery_planPage_CategoryPage_body_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: StreamFieldFragment_AdaptiveEmbedBlock_embed | null };

export type ContentPageQuery_planPage_CategoryPage_body_CategoryListBlock = { __typename: 'CategoryListBlock', style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: StreamFieldFragment_CategoryListBlock_categoryType | null, category: StreamFieldFragment_CategoryListBlock_category | null };

export type ContentPageQuery_planPage_CategoryPage_body_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string };

export type ContentPageQuery_planPage_CategoryPage_body_DashboardRowBlock = { __typename: 'DashboardRowBlock', blockType: string, field: string, id: string | null, blocks: Array<DashboardIndicatorBlockFragment_blocks> };

export type ContentPageQuery_planPage_CategoryPage_body_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', title: string | null, blockType: string, field: string, indicators: Array<StreamFieldFragment_IndicatorGroupBlock_indicators | null> | null };

export type ContentPageQuery_planPage_CategoryPage_body_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', heading: string | null, blockType: string, field: string, questions: Array<StreamFieldFragment_QuestionAnswerBlock_questions> | null };

export type ContentPageQuery_planPage_CategoryPage_body_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock', blockType: string, field: string };

export type ContentPageQuery_planPage_CategoryPage_body_RichTextBlock = { __typename: 'RichTextBlock', value: string, blockType: string, field: string };

export type ContentPageQuery_planPage_CategoryPage_body =
  | ContentPageQuery_planPage_CategoryPage_body_ActionListBlock
  | ContentPageQuery_planPage_CategoryPage_body_AdaptiveEmbedBlock
  | ContentPageQuery_planPage_CategoryPage_body_CategoryListBlock
  | ContentPageQuery_planPage_CategoryPage_body_ChangeLogMessageBlock
  | ContentPageQuery_planPage_CategoryPage_body_DashboardRowBlock
  | ContentPageQuery_planPage_CategoryPage_body_IndicatorGroupBlock
  | ContentPageQuery_planPage_CategoryPage_body_QuestionAnswerBlock
  | ContentPageQuery_planPage_CategoryPage_body_RelatedIndicatorsBlock
  | ContentPageQuery_planPage_CategoryPage_body_RichTextBlock
;

export type ContentPageQuery_planPage_StaticPage_changeLogMessage_createdBy = { __typename: 'Person', id: string, firstName: string, lastName: string, avatarUrl: string | null };

export type ContentPageQuery_planPage_StaticPage_changeLogMessage = { __typename: 'PageChangeLogMessage', id: string, content: string | null, createdAt: string | null, createdBy: ContentPageQuery_planPage_StaticPage_changeLogMessage_createdBy | null };

export type ContentPageQuery_planPage_StaticPage_headerImage = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, social: SocialImageFragment_social | null };

export type ContentPageQuery_planPage_StaticPage_body_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: StreamFieldFragment_AdaptiveEmbedBlock_embed | null };

export type ContentPageQuery_planPage_StaticPage_body_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock', styleOverrides: string | null, blockType: string, field: string, cartographyStyle: string | null, account: StreamFieldFragment_CartographyVisualisationBlock_account };

export type ContentPageQuery_planPage_StaticPage_body_CategoryListBlock = { __typename: 'CategoryListBlock', style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: StreamFieldFragment_CategoryListBlock_categoryType | null, category: StreamFieldFragment_CategoryListBlock_category | null };

export type ContentPageQuery_planPage_StaticPage_body_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock', heading: string | null, lead: string | null, blockType: string, field: string, valueAttribute: StreamFieldFragment_CategoryTreeMapBlock_valueAttribute, treeMapCategoryType: StreamFieldFragment_CategoryTreeMapBlock_treeMapCategoryType };

export type ContentPageQuery_planPage_StaticPage_body_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock', heading: string | null, helpText: string | null, pathsTargetNodeId: string | null, blockType: string, field: string, categoryLevel: StreamFieldFragment_CategoryTypeLevelListBlock_categoryLevel, groupByCategoryLevel: StreamFieldFragment_CategoryTypeLevelListBlock_groupByCategoryLevel | null, categoryBlockType: StreamFieldFragment_CategoryTypeLevelListBlock_categoryBlockType };

export type ContentPageQuery_planPage_StaticPage_body_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string };

export type ContentPageQuery_planPage_StaticPage_body_DashboardRowBlock = { __typename: 'DashboardRowBlock', blockType: string, field: string, id: string | null, blocks: Array<DashboardIndicatorBlockFragment_blocks> };

export type ContentPageQuery_planPage_StaticPage_body_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', title: string | null, blockType: string, field: string, indicators: Array<StreamFieldFragment_IndicatorGroupBlock_indicators | null> | null };

export type ContentPageQuery_planPage_StaticPage_body_LargeImageBlock = { __typename: 'LargeImageBlock', width: string | null, blockType: string, field: string, image: StreamFieldFragment_LargeImageBlock_image | null };

export type ContentPageQuery_planPage_StaticPage_body_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock', heading: string | null, helpText: string | null, outcomeNodeId: string | null, blockType: string, field: string };

export type ContentPageQuery_planPage_StaticPage_body_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', heading: string | null, blockType: string, field: string, questions: Array<StreamFieldFragment_QuestionAnswerBlock_questions> | null };

export type ContentPageQuery_planPage_StaticPage_body_RichTextBlock = { __typename: 'RichTextBlock', value: string, blockType: string, field: string };

export type ContentPageQuery_planPage_StaticPage_body =
  | ContentPageQuery_planPage_StaticPage_body_AdaptiveEmbedBlock
  | ContentPageQuery_planPage_StaticPage_body_CartographyVisualisationBlock
  | ContentPageQuery_planPage_StaticPage_body_CategoryListBlock
  | ContentPageQuery_planPage_StaticPage_body_CategoryTreeMapBlock
  | ContentPageQuery_planPage_StaticPage_body_CategoryTypeLevelListBlock
  | ContentPageQuery_planPage_StaticPage_body_ChangeLogMessageBlock
  | ContentPageQuery_planPage_StaticPage_body_DashboardRowBlock
  | ContentPageQuery_planPage_StaticPage_body_IndicatorGroupBlock
  | ContentPageQuery_planPage_StaticPage_body_LargeImageBlock
  | ContentPageQuery_planPage_StaticPage_body_PathsOutcomeBlock
  | ContentPageQuery_planPage_StaticPage_body_QuestionAnswerBlock
  | ContentPageQuery_planPage_StaticPage_body_RichTextBlock
;

export type ContentPageQuery_planPage_StaticPage_siblings_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_Page = { __typename: 'Page', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings_StaticPage = { __typename: 'StaticPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_siblings =
  | ContentPageQuery_planPage_StaticPage_siblings_AccessibilityStatementPage
  | ContentPageQuery_planPage_StaticPage_siblings_ActionListPage
  | ContentPageQuery_planPage_StaticPage_siblings_CategoryPage
  | ContentPageQuery_planPage_StaticPage_siblings_CategoryTypePage
  | ContentPageQuery_planPage_StaticPage_siblings_EmptyPage
  | ContentPageQuery_planPage_StaticPage_siblings_ImpactGroupPage
  | ContentPageQuery_planPage_StaticPage_siblings_IndicatorListPage
  | ContentPageQuery_planPage_StaticPage_siblings_Page
  | ContentPageQuery_planPage_StaticPage_siblings_PlanRootPage
  | ContentPageQuery_planPage_StaticPage_siblings_PledgeListPage
  | ContentPageQuery_planPage_StaticPage_siblings_PrivacyPolicyPage
  | ContentPageQuery_planPage_StaticPage_siblings_StaticPage
;

export type ContentPageQuery_planPage_StaticPage_parent_children_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_Page = { __typename: 'Page', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children_StaticPage = { __typename: 'StaticPage', id: string | null, title: string, slug: string, live: boolean, urlPath: string };

export type ContentPageQuery_planPage_StaticPage_parent_children =
  | ContentPageQuery_planPage_StaticPage_parent_children_AccessibilityStatementPage
  | ContentPageQuery_planPage_StaticPage_parent_children_ActionListPage
  | ContentPageQuery_planPage_StaticPage_parent_children_CategoryPage
  | ContentPageQuery_planPage_StaticPage_parent_children_CategoryTypePage
  | ContentPageQuery_planPage_StaticPage_parent_children_EmptyPage
  | ContentPageQuery_planPage_StaticPage_parent_children_ImpactGroupPage
  | ContentPageQuery_planPage_StaticPage_parent_children_IndicatorListPage
  | ContentPageQuery_planPage_StaticPage_parent_children_Page
  | ContentPageQuery_planPage_StaticPage_parent_children_PlanRootPage
  | ContentPageQuery_planPage_StaticPage_parent_children_PledgeListPage
  | ContentPageQuery_planPage_StaticPage_parent_children_PrivacyPolicyPage
  | ContentPageQuery_planPage_StaticPage_parent_children_StaticPage
;

export type ContentPageQuery_planPage_StaticPage_parent_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_EmptyPage = { __typename: 'EmptyPage', childrenUseSecondaryNavigation: boolean | null, id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_Page = { __typename: 'Page', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent_StaticPage = { __typename: 'StaticPage', childrenUseSecondaryNavigation: boolean | null, id: string | null, title: string, slug: string, urlPath: string, children: Array<ContentPageQuery_planPage_StaticPage_parent_children> };

export type ContentPageQuery_planPage_StaticPage_parent =
  | ContentPageQuery_planPage_StaticPage_parent_AccessibilityStatementPage
  | ContentPageQuery_planPage_StaticPage_parent_ActionListPage
  | ContentPageQuery_planPage_StaticPage_parent_CategoryPage
  | ContentPageQuery_planPage_StaticPage_parent_CategoryTypePage
  | ContentPageQuery_planPage_StaticPage_parent_EmptyPage
  | ContentPageQuery_planPage_StaticPage_parent_ImpactGroupPage
  | ContentPageQuery_planPage_StaticPage_parent_IndicatorListPage
  | ContentPageQuery_planPage_StaticPage_parent_Page
  | ContentPageQuery_planPage_StaticPage_parent_PlanRootPage
  | ContentPageQuery_planPage_StaticPage_parent_PledgeListPage
  | ContentPageQuery_planPage_StaticPage_parent_PrivacyPolicyPage
  | ContentPageQuery_planPage_StaticPage_parent_StaticPage
;

export type ContentPageQuery_planPage_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, slug: string, title: string, lastPublishedAt: string | null, body: Array<ContentPageQuery_planPage_body> | null };

export type ContentPageQuery_planPage_ActionListPage = { __typename: 'ActionListPage', leadContent: string | null, defaultView: ActionListPageView, headingHierarchyDepth: number, includeRelatedPlans: boolean | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, primaryFilters: Array<ActionListPageFiltersFragment_primaryFilters> | null, mainFilters: Array<ActionListPageFiltersFragment_mainFilters> | null, advancedFilters: Array<ActionListPageFiltersFragment_advancedFilters> | null };

export type ContentPageQuery_planPage_CategoryPage = { __typename: 'CategoryPage', id: string | null, slug: string, title: string, lastPublishedAt: string | null, category: ContentPageQuery_planPage_CategoryPage_category | null, body: Array<ContentPageQuery_planPage_CategoryPage_body> | null, layout: TemplatedCategoryPageFragment_layout | null };

export type ContentPageQuery_planPage_CategoryTypePage = { __typename: 'CategoryTypePage', contentType: string, id: string | null, slug: string, title: string, lastPublishedAt: string | null };

export type ContentPageQuery_planPage_EmptyPage = { __typename: 'EmptyPage', id: string | null, slug: string, title: string, lastPublishedAt: string | null };

export type ContentPageQuery_planPage_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, slug: string, title: string, lastPublishedAt: string | null };

export type ContentPageQuery_planPage_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, slug: string, title: string, lastPublishedAt: string | null, leadContent: string | null, displayInsights: boolean | null, displayLevel: boolean | null, includeRelatedPlans: boolean | null, listColumns: Array<IndicatorListPageFragment_listColumns> | null, primaryFilters: Array<IndicatorListPageFiltersFragment_primaryFilters> | null, mainFilters: Array<IndicatorListPageFiltersFragment_mainFilters> | null, advancedFilters: Array<IndicatorListPageFiltersFragment_advancedFilters> | null };

export type ContentPageQuery_planPage_Page = { __typename: 'Page', id: string | null, slug: string, title: string, lastPublishedAt: string | null };

export type ContentPageQuery_planPage_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, slug: string, title: string, lastPublishedAt: string | null };

export type ContentPageQuery_planPage_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, slug: string, title: string, lastPublishedAt: string | null };

export type ContentPageQuery_planPage_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', leadContent: string | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null };

export type ContentPageQuery_planPage_StaticPage = { __typename: 'StaticPage', leadParagraph: string | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, changeLogMessage: ContentPageQuery_planPage_StaticPage_changeLogMessage | null, headerImage: ContentPageQuery_planPage_StaticPage_headerImage | null, body: Array<ContentPageQuery_planPage_StaticPage_body> | null, siblings: Array<ContentPageQuery_planPage_StaticPage_siblings>, parent: ContentPageQuery_planPage_StaticPage_parent | null };

export type ContentPageQuery_planPage =
  | ContentPageQuery_planPage_AccessibilityStatementPage
  | ContentPageQuery_planPage_ActionListPage
  | ContentPageQuery_planPage_CategoryPage
  | ContentPageQuery_planPage_CategoryTypePage
  | ContentPageQuery_planPage_EmptyPage
  | ContentPageQuery_planPage_ImpactGroupPage
  | ContentPageQuery_planPage_IndicatorListPage
  | ContentPageQuery_planPage_Page
  | ContentPageQuery_planPage_PlanRootPage
  | ContentPageQuery_planPage_PledgeListPage
  | ContentPageQuery_planPage_PrivacyPolicyPage
  | ContentPageQuery_planPage_StaticPage
;

export type ContentPageQuery = { __typename: 'Query', planPage: ContentPageQuery_planPage | null };


export type ContentPageQueryVariables = Exact<{
  plan: string | number;
  path: string;
  onlyWithActions?: boolean | null | undefined;
}>;

export type CategoryParentFragment = { __typename: 'Category', id: string, parent: ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent_parent_parent | null };

export type RecursiveCategoryParentFragment_parent = { __typename: 'Category', id: string, parent: ContentPageQuery_planPage_CategoryPage_category_parent_parent_parent | null };

export type RecursiveCategoryParentFragment = { __typename: 'Category', id: string, parent: RecursiveCategoryParentFragment_parent | null };

export type DomainSiteVerificationQuery_plansForHostname_domain = { __typename: 'PlanDomain', id: string, googleSiteVerificationTag: string | null };

export type DomainSiteVerificationQuery_plansForHostname_Plan = { __typename: 'Plan', domain: DomainSiteVerificationQuery_plansForHostname_domain | null };

export type DomainSiteVerificationQuery_plansForHostname_RestrictedPlanNode = { __typename: 'RestrictedPlanNode', domain: DomainSiteVerificationQuery_plansForHostname_domain | null };

export type DomainSiteVerificationQuery_plansForHostname =
  | DomainSiteVerificationQuery_plansForHostname_Plan
  | DomainSiteVerificationQuery_plansForHostname_RestrictedPlanNode
;

export type DomainSiteVerificationQuery = { __typename: 'Query', plansForHostname: Array<DomainSiteVerificationQuery_plansForHostname> | null };


export type DomainSiteVerificationQueryVariables = Exact<{
  hostname: string;
}>;

export type HomePageQuery_planPage_PlanRootPage_changeLogMessage_createdBy = { __typename: 'Person', id: string, firstName: string, lastName: string, avatarUrl: string | null };

export type HomePageQuery_planPage_PlanRootPage_changeLogMessage = { __typename: 'PageChangeLogMessage', id: string, content: string | null, createdAt: string | null, createdBy: HomePageQuery_planPage_PlanRootPage_changeLogMessage_createdBy | null };

export type HomePageQuery_planPage_PlanRootPage_body_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock', blockType: string, field: string, cards: Array<StreamFieldFragment_ActionCategoryFilterCardsBlock_cards> | null };

export type HomePageQuery_planPage_PlanRootPage_body_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock', blockType: string, field: string };

export type HomePageQuery_planPage_PlanRootPage_body_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock', blockType: string, field: string };

export type HomePageQuery_planPage_PlanRootPage_body_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: StreamFieldFragment_AdaptiveEmbedBlock_embed | null };

export type HomePageQuery_planPage_PlanRootPage_body_CardListBlock = { __typename: 'CardListBlock', heading: string | null, lead: string | null, blockType: string, field: string, cards: Array<StreamFieldFragment_CardListBlock_cards> | null };

export type HomePageQuery_planPage_PlanRootPage_body_CategoryListBlock = { __typename: 'CategoryListBlock', style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: StreamFieldFragment_CategoryListBlock_categoryType | null, category: StreamFieldFragment_CategoryListBlock_category | null };

export type HomePageQuery_planPage_PlanRootPage_body_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock', heading: string | null, lead: string | null, blockType: string, field: string, valueAttribute: StreamFieldFragment_CategoryTreeMapBlock_valueAttribute, treeMapCategoryType: StreamFieldFragment_CategoryTreeMapBlock_treeMapCategoryType };

export type HomePageQuery_planPage_PlanRootPage_body_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string };

export type HomePageQuery_planPage_PlanRootPage_body_DashboardRowBlock = { __typename: 'DashboardRowBlock', blockType: string, field: string, id: string | null, blocks: Array<DashboardIndicatorBlockFragment_blocks> };

export type HomePageQuery_planPage_PlanRootPage_body_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock', layout: string, heading: string | null, lead: string | null, blockType: string, field: string, image: StreamFieldFragment_FrontPageHeroBlock_image | null, additionalSettings: StreamFieldFragment_FrontPageHeroBlock_additionalSettings | null };

export type HomePageQuery_planPage_PlanRootPage_body_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', title: string | null, blockType: string, field: string, indicators: Array<StreamFieldFragment_IndicatorGroupBlock_indicators | null> | null };

export type HomePageQuery_planPage_PlanRootPage_body_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock', blockType: string, field: string };

export type HomePageQuery_planPage_PlanRootPage_body_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock', title: string | null, body: string | null, significantDigits: number | null, indicatorIsNormalized: boolean | null, blockType: string, field: string, blocks: Array<StreamFieldFragment_IndicatorShowcaseBlock_blocks>, indicator: StreamFieldFragment_IndicatorShowcaseBlock_indicator | null, linkButton: StreamFieldFragment_IndicatorShowcaseBlock_linkButton | null };

export type HomePageQuery_planPage_PlanRootPage_body_LargeImageBlock = { __typename: 'LargeImageBlock', width: string | null, blockType: string, field: string, image: StreamFieldFragment_LargeImageBlock_image | null };

export type HomePageQuery_planPage_PlanRootPage_body_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock', heading: string | null, helpText: string | null, outcomeNodeId: string | null, blockType: string, field: string };

export type HomePageQuery_planPage_PlanRootPage_body_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock', blockType: string, field: string };

export type HomePageQuery_planPage_PlanRootPage_body_RichTextBlock = { __typename: 'RichTextBlock', value: string, blockType: string, field: string };

export type HomePageQuery_planPage_PlanRootPage_body =
  | HomePageQuery_planPage_PlanRootPage_body_ActionCategoryFilterCardsBlock
  | HomePageQuery_planPage_PlanRootPage_body_ActionHighlightsBlock
  | HomePageQuery_planPage_PlanRootPage_body_ActionStatusGraphsBlock
  | HomePageQuery_planPage_PlanRootPage_body_AdaptiveEmbedBlock
  | HomePageQuery_planPage_PlanRootPage_body_CardListBlock
  | HomePageQuery_planPage_PlanRootPage_body_CategoryListBlock
  | HomePageQuery_planPage_PlanRootPage_body_CategoryTreeMapBlock
  | HomePageQuery_planPage_PlanRootPage_body_ChangeLogMessageBlock
  | HomePageQuery_planPage_PlanRootPage_body_DashboardRowBlock
  | HomePageQuery_planPage_PlanRootPage_body_FrontPageHeroBlock
  | HomePageQuery_planPage_PlanRootPage_body_IndicatorGroupBlock
  | HomePageQuery_planPage_PlanRootPage_body_IndicatorHighlightsBlock
  | HomePageQuery_planPage_PlanRootPage_body_IndicatorShowcaseBlock
  | HomePageQuery_planPage_PlanRootPage_body_LargeImageBlock
  | HomePageQuery_planPage_PlanRootPage_body_PathsOutcomeBlock
  | HomePageQuery_planPage_PlanRootPage_body_RelatedPlanListBlock
  | HomePageQuery_planPage_PlanRootPage_body_RichTextBlock
;

export type HomePageQuery_planPage_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_ActionListPage = { __typename: 'ActionListPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_CategoryPage = { __typename: 'CategoryPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_EmptyPage = { __typename: 'EmptyPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_Page = { __typename: 'Page', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, slug: string, lastPublishedAt: string | null, changeLogMessage: HomePageQuery_planPage_PlanRootPage_changeLogMessage | null, body: Array<HomePageQuery_planPage_PlanRootPage_body> };

export type HomePageQuery_planPage_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage_StaticPage = { __typename: 'StaticPage', id: string | null, slug: string, lastPublishedAt: string | null };

export type HomePageQuery_planPage =
  | HomePageQuery_planPage_AccessibilityStatementPage
  | HomePageQuery_planPage_ActionListPage
  | HomePageQuery_planPage_CategoryPage
  | HomePageQuery_planPage_CategoryTypePage
  | HomePageQuery_planPage_EmptyPage
  | HomePageQuery_planPage_ImpactGroupPage
  | HomePageQuery_planPage_IndicatorListPage
  | HomePageQuery_planPage_Page
  | HomePageQuery_planPage_PlanRootPage
  | HomePageQuery_planPage_PledgeListPage
  | HomePageQuery_planPage_PrivacyPolicyPage
  | HomePageQuery_planPage_StaticPage
;

export type HomePageQuery_plan_primaryActionClassification_categories_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type HomePageQuery_plan_primaryActionClassification_categories_categoryPage = { __typename: 'CategoryPage', live: boolean, id: string | null, title: string, urlPath: string };

export type HomePageQuery_plan_primaryActionClassification_categories_level = { __typename: 'CategoryLevel', id: string, name: string, namePlural: string | null };

export type HomePageQuery_plan_primaryActionClassification_categories_parent = { __typename: 'Category', id: string };

export type HomePageQuery_plan_primaryActionClassification_categories_type = { __typename: 'CategoryType', id: string, hideCategoryIdentifiers: boolean };

export type HomePageQuery_plan_primaryActionClassification_categories = { __typename: 'Category', id: string, identifier: string, name: string, leadParagraph: string, color: string, image: HomePageQuery_plan_primaryActionClassification_categories_image | null, categoryPage: HomePageQuery_plan_primaryActionClassification_categories_categoryPage | null, level: HomePageQuery_plan_primaryActionClassification_categories_level | null, parent: HomePageQuery_plan_primaryActionClassification_categories_parent | null, type: HomePageQuery_plan_primaryActionClassification_categories_type };

export type HomePageQuery_plan_primaryActionClassification = { __typename: 'CategoryType', id: string, categories: Array<HomePageQuery_plan_primaryActionClassification_categories> };

export type HomePageQuery_plan = { __typename: 'Plan', id: string, primaryActionClassification: HomePageQuery_plan_primaryActionClassification | null };

export type HomePageQuery = { __typename: 'Query', planPage: HomePageQuery_planPage | null, plan: HomePageQuery_plan | null };


export type HomePageQueryVariables = Exact<{
  plan: string | number;
  path: string;
}>;

export type IndicatorGraphDataQuery_plan_scenarios = { __typename: 'Scenario', id: string, identifier: string, name: string };

export type IndicatorGraphDataQuery_plan = { __typename: 'Plan', id: string, scenarios: Array<IndicatorGraphDataQuery_plan_scenarios> };

export type IndicatorGraphDataQuery_indicator_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null };

export type IndicatorGraphDataQuery_indicator_quantity = { __typename: 'Quantity', id: string, name: string };

export type IndicatorGraphDataQuery_indicator_values_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorGraphDataQuery_indicator_values_categories = { __typename: 'DimensionCategory', id: string };

export type IndicatorGraphDataQuery_indicator_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorGraphDataQuery_indicator_values_normalizedValues>, categories: Array<IndicatorGraphDataQuery_indicator_values_categories> };

export type IndicatorGraphDataQuery_indicator_referenceValue_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorGraphDataQuery_indicator_referenceValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorGraphDataQuery_indicator_referenceValue_normalizedValues> };

export type IndicatorGraphDataQuery_indicator_dimensions_dimension_categories = { __typename: 'DimensionCategory', id: string, name: string, defaultColor: string };

export type IndicatorGraphDataQuery_indicator_dimensions_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<IndicatorGraphDataQuery_indicator_dimensions_dimension_categories> };

export type IndicatorGraphDataQuery_indicator_dimensions = { __typename: 'IndicatorDimension', id: string, dimension: IndicatorGraphDataQuery_indicator_dimensions_dimension };

export type IndicatorGraphDataQuery_indicator_goals_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorGraphDataQuery_indicator_goals_scenario = { __typename: 'Scenario', id: string };

export type IndicatorGraphDataQuery_indicator_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorGraphDataQuery_indicator_goals_normalizedValues>, scenario: IndicatorGraphDataQuery_indicator_goals_scenario | null };

export type IndicatorGraphDataQuery_indicator_datasets_schema_metrics = { __typename: 'DatasetMetricNode', label: string, unit: string, isComputed: boolean };

export type IndicatorGraphDataQuery_indicator_datasets_schema = { __typename: 'DatasetSchema', uuid: string, metrics: Array<IndicatorGraphDataQuery_indicator_datasets_schema_metrics> };

export type IndicatorGraphDataQuery_indicator_datasets_computedDataPoints_metric = { __typename: 'DatasetMetricNode', label: string, unit: string };

export type IndicatorGraphDataQuery_indicator_datasets_computedDataPoints = { __typename: 'ComputedDataPointNode', date: string, value: number | null, metric: IndicatorGraphDataQuery_indicator_datasets_computedDataPoints_metric };

export type IndicatorGraphDataQuery_indicator_datasets = { __typename: 'Dataset', uuid: string, schema: IndicatorGraphDataQuery_indicator_datasets_schema | null, computedDataPoints: Array<IndicatorGraphDataQuery_indicator_datasets_computedDataPoints> };

export type IndicatorGraphDataQuery_indicator_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null };

export type IndicatorGraphDataQuery_indicator_common_normalizations_unit = { __typename: 'Unit', id: string, shortName: string | null };

export type IndicatorGraphDataQuery_indicator_common_normalizations_normalizer = { __typename: 'CommonIndicator', name: string, id: string, identifier: string | null };

export type IndicatorGraphDataQuery_indicator_common_normalizations = { __typename: 'CommonIndicatorNormalization', unit: IndicatorGraphDataQuery_indicator_common_normalizations_unit, normalizer: IndicatorGraphDataQuery_indicator_common_normalizations_normalizer };

export type IndicatorGraphDataQuery_indicator_common_indicators_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null };

export type IndicatorGraphDataQuery_indicator_common_indicators_quantity = { __typename: 'Quantity', id: string, name: string };

export type IndicatorGraphDataQuery_indicator_common_indicators_values_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorGraphDataQuery_indicator_common_indicators_values_categories = { __typename: 'DimensionCategory', id: string };

export type IndicatorGraphDataQuery_indicator_common_indicators_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorGraphDataQuery_indicator_common_indicators_values_normalizedValues>, categories: Array<IndicatorGraphDataQuery_indicator_common_indicators_values_categories> };

export type IndicatorGraphDataQuery_indicator_common_indicators_dimensions_dimension_categories = { __typename: 'DimensionCategory', id: string, name: string, defaultColor: string };

export type IndicatorGraphDataQuery_indicator_common_indicators_dimensions_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<IndicatorGraphDataQuery_indicator_common_indicators_dimensions_dimension_categories> };

export type IndicatorGraphDataQuery_indicator_common_indicators_dimensions = { __typename: 'IndicatorDimension', id: string, dimension: IndicatorGraphDataQuery_indicator_common_indicators_dimensions_dimension };

export type IndicatorGraphDataQuery_indicator_common_indicators_goals_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorGraphDataQuery_indicator_common_indicators_goals_scenario = { __typename: 'Scenario', id: string };

export type IndicatorGraphDataQuery_indicator_common_indicators_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorGraphDataQuery_indicator_common_indicators_goals_normalizedValues>, scenario: IndicatorGraphDataQuery_indicator_common_indicators_goals_scenario | null };

export type IndicatorGraphDataQuery_indicator_common_indicators_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null };

export type IndicatorGraphDataQuery_indicator_common_indicators = { __typename: 'Indicator', id: string, timeResolution: IndicatorTimeResolution, minValue: number | null, maxValue: number | null, organization: IndicatorGraphDataQuery_indicator_common_indicators_organization, quantity: IndicatorGraphDataQuery_indicator_common_indicators_quantity | null, values: Array<IndicatorGraphDataQuery_indicator_common_indicators_values>, dimensions: Array<IndicatorGraphDataQuery_indicator_common_indicators_dimensions>, goals: Array<IndicatorGraphDataQuery_indicator_common_indicators_goals | null> | null, unit: IndicatorGraphDataQuery_indicator_common_indicators_unit };

export type IndicatorGraphDataQuery_indicator_common = { __typename: 'CommonIndicator', id: string, name: string, normalizations: Array<IndicatorGraphDataQuery_indicator_common_normalizations>, indicators: Array<IndicatorGraphDataQuery_indicator_common_indicators> };

export type IndicatorGraphDataQuery_indicator = { __typename: 'Indicator', id: string, name: string, timeResolution: IndicatorTimeResolution, showTrendline: boolean, showTotalLine: boolean, desiredTrend: IndicatorDesiredTrend | null, reference: string | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, valueRounding: number | null, dataCategoriesAreStackable: boolean, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: IndicatorGraphDataQuery_indicator_organization, quantity: IndicatorGraphDataQuery_indicator_quantity | null, values: Array<IndicatorGraphDataQuery_indicator_values>, referenceValue: IndicatorGraphDataQuery_indicator_referenceValue | null, dimensions: Array<IndicatorGraphDataQuery_indicator_dimensions>, goals: Array<IndicatorGraphDataQuery_indicator_goals | null> | null, datasets: Array<IndicatorGraphDataQuery_indicator_datasets>, unit: IndicatorGraphDataQuery_indicator_unit, common: IndicatorGraphDataQuery_indicator_common | null };

export type IndicatorGraphDataQuery = { __typename: 'Query', plan: IndicatorGraphDataQuery_plan | null, indicator: IndicatorGraphDataQuery_indicator | null };


export type IndicatorGraphDataQueryVariables = Exact<{
  id: string | number | null | undefined;
  plan: string | number | null | undefined;
}>;

export type IndicatorListQuery_plan_features = { __typename: 'PlanFeatures', hasActionPrimaryOrgs: boolean };

export type IndicatorListQuery_plan_categoryTypes_categories_parent = { __typename: 'Category', id: string };

export type IndicatorListQuery_plan_categoryTypes_categories_common_type = { __typename: 'CommonCategoryType', identifier: string, name: string };

export type IndicatorListQuery_plan_categoryTypes_categories_common = { __typename: 'CommonCategory', id: string, type: IndicatorListQuery_plan_categoryTypes_categories_common_type };

export type IndicatorListQuery_plan_categoryTypes_categories = { __typename: 'Category', id: string, identifier: string, order: number, name: string, parent: IndicatorListQuery_plan_categoryTypes_categories_parent | null, common?: IndicatorListQuery_plan_categoryTypes_categories_common | null };

export type IndicatorListQuery_plan_categoryTypes = { __typename: 'CategoryType', name: string, id: string, identifier: string, categories: Array<IndicatorListQuery_plan_categoryTypes_categories> };

export type IndicatorListQuery_plan = { __typename: 'Plan', id: string, hasIndicatorRelationships: boolean | null, features: IndicatorListQuery_plan_features, categoryTypes: Array<IndicatorListQuery_plan_categoryTypes> };

export type IndicatorListQuery_planIndicators = { __typename: 'Indicator', level: string | null, id: string, name: string, timeResolution: IndicatorTimeResolution, desiredTrend: IndicatorDesiredTrend | null, valueRounding: number | null, sortKey: string | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: IndicatorListIndicatorFragment_organization, common: IndicatorListIndicatorFragment_common | null, categories: Array<IndicatorListIndicatorFragment_categories>, latestValue: IndicatorListIndicatorFragment_latestValue | null, referenceValue: IndicatorListIndicatorFragment_referenceValue | null, dimensions: Array<IndicatorListIndicatorFragment_dimensions>, values: Array<IndicatorListIndicatorFragment_values>, goals: Array<IndicatorListIndicatorFragment_goals | null> | null, unit: IndicatorListIndicatorFragment_unit, plans: Array<IndicatorListIndicatorFragment_plans> };

export type IndicatorListQuery_relatedPlanIndicators = { __typename: 'Indicator', level: string | null, id: string, name: string, timeResolution: IndicatorTimeResolution, desiredTrend: IndicatorDesiredTrend | null, valueRounding: number | null, sortKey: string | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: IndicatorListIndicatorFragment_organization, common: IndicatorListIndicatorFragment_common | null, categories: Array<IndicatorListIndicatorFragment_categories>, latestValue: IndicatorListIndicatorFragment_latestValue | null, referenceValue: IndicatorListIndicatorFragment_referenceValue | null, dimensions: Array<IndicatorListIndicatorFragment_dimensions>, values: Array<IndicatorListIndicatorFragment_values>, goals: Array<IndicatorListIndicatorFragment_goals | null> | null, unit: IndicatorListIndicatorFragment_unit, plans: Array<IndicatorListIndicatorFragment_plans> };

export type IndicatorListQuery = { __typename: 'Query', plan: IndicatorListQuery_plan | null, planIndicators?: Array<IndicatorListQuery_planIndicators> | null, relatedPlanIndicators?: Array<IndicatorListQuery_relatedPlanIndicators> | null };


export type IndicatorListQueryVariables = Exact<{
  plan: string | number;
  relatedPlanIndicators: boolean;
}>;

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_categoryType = { __typename: 'CategoryType', id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<CategoryTypeFragment_levels> };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_categoryType };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock', id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showFactorValues: boolean | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop =
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorCategoryContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorFactorValueSummaryContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorValueSummaryContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_IndicatorVisualizationContentBlock
;

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_categoryType };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock', id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showFactorValues: boolean | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom =
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorCategoryContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorFactorValueSummaryContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorValueSummaryContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom_IndicatorVisualizationContentBlock
;

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsAside_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_categoryType };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsAside_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsAside_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null };

export type IndicatorDetailsQuery_plan_indicatorListPage_detailsAside =
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsAside_IndicatorCategoryContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsAside_IndicatorContentBlock
  | IndicatorDetailsQuery_plan_indicatorListPage_detailsAside_IndicatorValueSummaryContentBlock
;

export type IndicatorDetailsQuery_plan_indicatorListPage = { __typename: 'IndicatorListPage', id: string | null, detailsMainTop: Array<IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop> | null, detailsMainBottom: Array<IndicatorDetailsQuery_plan_indicatorListPage_detailsMainBottom> | null, detailsAside: Array<IndicatorDetailsQuery_plan_indicatorListPage_detailsAside> | null };

export type IndicatorDetailsQuery_plan = { __typename: 'Plan', id: string, identifier: string, indicatorListPage: IndicatorDetailsQuery_plan_indicatorListPage | null };

export type IndicatorDetailsQuery_indicator_referenceValue_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorDetailsQuery_indicator_referenceValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorDetailsQuery_indicator_referenceValue_normalizedValues> };

export type IndicatorDetailsQuery_indicator_organization_classification = { __typename: 'OrganizationClass', id: string, name: string };

export type IndicatorDetailsQuery_indicator_organization_logo_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type IndicatorDetailsQuery_indicator_organization_logo = { __typename: 'Image', id: string, rendition: IndicatorDetailsQuery_indicator_organization_logo_rendition | null };

export type IndicatorDetailsQuery_indicator_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null, classification: IndicatorDetailsQuery_indicator_organization_classification | null, logo: IndicatorDetailsQuery_indicator_organization_logo | null };

export type IndicatorDetailsQuery_indicator_categories = { __typename: 'Category', id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: CategoryTagFragment_level | null, iconImage: CategoryTagFragment_iconImage | null, categoryPage: CategoryTagFragment_categoryPage | null, type: CategoryTagFragment_type, parent: CategoryTagWithParentsFragment_parent | null };

export type IndicatorDetailsQuery_indicator_common_indicators_organization_classification = { __typename: 'OrganizationClass', id: string, name: string };

export type IndicatorDetailsQuery_indicator_common_indicators_organization_logo_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type IndicatorDetailsQuery_indicator_common_indicators_organization_logo = { __typename: 'Image', id: string, rendition: IndicatorDetailsQuery_indicator_common_indicators_organization_logo_rendition | null };

export type IndicatorDetailsQuery_indicator_common_indicators_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null, classification: IndicatorDetailsQuery_indicator_common_indicators_organization_classification | null, logo: IndicatorDetailsQuery_indicator_common_indicators_organization_logo | null };

export type IndicatorDetailsQuery_indicator_common_indicators = { __typename: 'Indicator', id: string, identifier: string | null, organization: IndicatorDetailsQuery_indicator_common_indicators_organization };

export type IndicatorDetailsQuery_indicator_common = { __typename: 'CommonIndicator', id: string, indicators: Array<IndicatorDetailsQuery_indicator_common_indicators> };

export type IndicatorDetailsQuery_indicator_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null };

export type IndicatorDetailsQuery_indicator_latestGraph = { __typename: 'IndicatorGraph', id: string };

export type IndicatorDetailsQuery_indicator_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number };

export type IndicatorDetailsQuery_indicator_goals_scenario = { __typename: 'Scenario', id: string };

export type IndicatorDetailsQuery_indicator_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number, scenario: IndicatorDetailsQuery_indicator_goals_scenario | null };

export type IndicatorDetailsQuery_indicator_datasets_schema_metrics = { __typename: 'DatasetMetricNode', label: string, unit: string, isComputed: boolean };

export type IndicatorDetailsQuery_indicator_datasets_schema = { __typename: 'DatasetSchema', uuid: string, name: string, metrics: Array<IndicatorDetailsQuery_indicator_datasets_schema_metrics> };

export type IndicatorDetailsQuery_indicator_datasets_computedDataPoints_metric = { __typename: 'DatasetMetricNode', label: string, unit: string };

export type IndicatorDetailsQuery_indicator_datasets_computedDataPoints = { __typename: 'ComputedDataPointNode', date: string, value: number | null, metric: IndicatorDetailsQuery_indicator_datasets_computedDataPoints_metric };

export type IndicatorDetailsQuery_indicator_datasets = { __typename: 'Dataset', uuid: string, schema: IndicatorDetailsQuery_indicator_datasets_schema | null, computedDataPoints: Array<IndicatorDetailsQuery_indicator_datasets_computedDataPoints> };

export type IndicatorDetailsQuery_indicator_actions_status = { __typename: 'ActionStatus', id: string, identifier: string, name: string, color: string };

export type IndicatorDetailsQuery_indicator_actions_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string };

export type IndicatorDetailsQuery_indicator_actions_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier, label: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment };

export type IndicatorDetailsQuery_indicator_actions_mergedWith_plan = { __typename: 'Plan', id: string, shortName: string | null, viewUrl: string | null };

export type IndicatorDetailsQuery_indicator_actions_mergedWith = { __typename: 'Action', id: string, identifier: string, viewUrl: string, plan: IndicatorDetailsQuery_indicator_actions_mergedWith_plan };

export type IndicatorDetailsQuery_indicator_actions_plan = { __typename: 'Plan', id: string, viewUrl: string | null };

export type IndicatorDetailsQuery_indicator_actions_categories_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type IndicatorDetailsQuery_indicator_actions_categories_image = { __typename: 'Image', id: string, rendition: IndicatorDetailsQuery_indicator_actions_categories_image_rendition | null };

export type IndicatorDetailsQuery_indicator_actions_categories = { __typename: 'Category', id: string, identifier: string, name: string, image: IndicatorDetailsQuery_indicator_actions_categories_image | null };

export type IndicatorDetailsQuery_indicator_actions_impact = { __typename: 'ActionImpact', id: string, identifier: string, name: string };

export type IndicatorDetailsQuery_indicator_actions = { __typename: 'Action', id: string, identifier: string, name: string, color: string | null, viewUrl: string, scheduleContinuous: boolean, completion: number | null, status: IndicatorDetailsQuery_indicator_actions_status | null, implementationPhase: IndicatorDetailsQuery_indicator_actions_implementationPhase | null, statusSummary: IndicatorDetailsQuery_indicator_actions_statusSummary, mergedWith: IndicatorDetailsQuery_indicator_actions_mergedWith | null, plan: IndicatorDetailsQuery_indicator_actions_plan, categories: Array<IndicatorDetailsQuery_indicator_actions_categories>, impact: IndicatorDetailsQuery_indicator_actions_impact | null };

export type IndicatorDetailsQuery_indicator_relatedCauses_causalIndicator_plans_parent = { __typename: 'Plan', id: string, identifier: string };

export type IndicatorDetailsQuery_indicator_relatedCauses_causalIndicator_plans = { __typename: 'Plan', id: string, identifier: string, viewUrl: string | null, parent: IndicatorDetailsQuery_indicator_relatedCauses_causalIndicator_plans_parent | null };

export type IndicatorDetailsQuery_indicator_relatedCauses_causalIndicator = { __typename: 'Indicator', id: string, name: string, level: string | null, plans: Array<IndicatorDetailsQuery_indicator_relatedCauses_causalIndicator_plans> };

export type IndicatorDetailsQuery_indicator_relatedCauses = { __typename: 'RelatedIndicator', id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, causalIndicator: IndicatorDetailsQuery_indicator_relatedCauses_causalIndicator };

export type IndicatorDetailsQuery_indicator_relatedEffects_effectIndicator_plans_parent = { __typename: 'Plan', id: string, identifier: string };

export type IndicatorDetailsQuery_indicator_relatedEffects_effectIndicator_plans = { __typename: 'Plan', id: string, identifier: string, viewUrl: string | null, parent: IndicatorDetailsQuery_indicator_relatedEffects_effectIndicator_plans_parent | null };

export type IndicatorDetailsQuery_indicator_relatedEffects_effectIndicator = { __typename: 'Indicator', id: string, name: string, level: string | null, plans: Array<IndicatorDetailsQuery_indicator_relatedEffects_effectIndicator_plans> };

export type IndicatorDetailsQuery_indicator_relatedEffects = { __typename: 'RelatedIndicator', id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, effectIndicator: IndicatorDetailsQuery_indicator_relatedEffects_effectIndicator };

export type IndicatorDetailsQuery_indicator_plans_supersededBy = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_allRelatedPlans = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_relatedPlans = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_supersededPlans = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_supersedingPlans = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_parent = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_children = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_copyOf = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans_copies = { __typename: 'Plan', id: string };

export type IndicatorDetailsQuery_indicator_plans = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, versionName: string, publishedAt: string | null, supersededBy: IndicatorDetailsQuery_indicator_plans_supersededBy | null, allRelatedPlans: Array<IndicatorDetailsQuery_indicator_plans_allRelatedPlans>, relatedPlans: Array<IndicatorDetailsQuery_indicator_plans_relatedPlans>, supersededPlans: Array<IndicatorDetailsQuery_indicator_plans_supersededPlans>, supersedingPlans: Array<IndicatorDetailsQuery_indicator_plans_supersedingPlans>, parent: IndicatorDetailsQuery_indicator_plans_parent | null, children: Array<IndicatorDetailsQuery_indicator_plans_children>, copyOf: IndicatorDetailsQuery_indicator_plans_copyOf | null, copies: Array<IndicatorDetailsQuery_indicator_plans_copies> };

export type IndicatorDetailsQuery_indicator_changeLogMessage_createdBy = { __typename: 'Person', id: string, firstName: string, lastName: string, avatarUrl: string | null };

export type IndicatorDetailsQuery_indicator_changeLogMessage_ActionChangeLogMessage = { __typename: 'ActionChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: IndicatorDetailsQuery_indicator_changeLogMessage_createdBy | null };

export type IndicatorDetailsQuery_indicator_changeLogMessage_CategoryChangeLogMessage = { __typename: 'CategoryChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: IndicatorDetailsQuery_indicator_changeLogMessage_createdBy | null };

export type IndicatorDetailsQuery_indicator_changeLogMessage_IndicatorChangeLogMessage = { __typename: 'IndicatorChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: IndicatorDetailsQuery_indicator_changeLogMessage_createdBy | null };

export type IndicatorDetailsQuery_indicator_changeLogMessage_PageChangeLogMessage = { __typename: 'PageChangeLogMessage', content: string | null, updatedAt: string | null, createdBy: IndicatorDetailsQuery_indicator_changeLogMessage_createdBy | null };

export type IndicatorDetailsQuery_indicator_changeLogMessage =
  | IndicatorDetailsQuery_indicator_changeLogMessage_ActionChangeLogMessage
  | IndicatorDetailsQuery_indicator_changeLogMessage_CategoryChangeLogMessage
  | IndicatorDetailsQuery_indicator_changeLogMessage_IndicatorChangeLogMessage
  | IndicatorDetailsQuery_indicator_changeLogMessage_PageChangeLogMessage
;

export type IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultAreaChart = { __typename: 'IndicatorDefaultAreaChart', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorAreaChartBlock_chartSeries> };

export type IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultBarChart = { __typename: 'IndicatorDefaultBarChart', barType: string | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorBarChartBlock_chartSeries> };

export type IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultLineChart = { __typename: 'IndicatorDefaultLineChart', showTotalLine: boolean | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorLineChartBlock_chartSeries> };

export type IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultPieChart = { __typename: 'IndicatorDefaultPieChart', year: number | null, indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_indicator, dimension: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_dimension | null, chartSeries: Array<DashboardIndicatorBlockFragment_blocks_DashboardIndicatorPieChartBlock_chartSeries> };

export type IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultSummary = { __typename: 'IndicatorDefaultSummary', indicator: DashboardIndicatorBlockFragment_blocks_DashboardIndicatorSummaryBlock_indicator };

export type IndicatorDetailsQuery_indicator_defaultVisualization =
  | IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultAreaChart
  | IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultBarChart
  | IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultLineChart
  | IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultPieChart
  | IndicatorDetailsQuery_indicator_defaultVisualization_IndicatorDefaultSummary
;

export type IndicatorDetailsQuery_indicator = { __typename: 'Indicator', id: string, identifier: string | null, name: string, hideIndicatorGraph: boolean, hideIndicatorTable: boolean, level: string | null, description: string | null, goalDescription: string | null, reference: string | null, timeResolution: IndicatorTimeResolution, valueRounding: number | null, updatedAt: string, desiredTrend: IndicatorDesiredTrend | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, referenceValue: IndicatorDetailsQuery_indicator_referenceValue | null, organization: IndicatorDetailsQuery_indicator_organization, categories: Array<IndicatorDetailsQuery_indicator_categories>, common: IndicatorDetailsQuery_indicator_common | null, unit: IndicatorDetailsQuery_indicator_unit, latestGraph: IndicatorDetailsQuery_indicator_latestGraph | null, values: Array<IndicatorDetailsQuery_indicator_values>, goals: Array<IndicatorDetailsQuery_indicator_goals | null> | null, datasets: Array<IndicatorDetailsQuery_indicator_datasets>, actions: Array<IndicatorDetailsQuery_indicator_actions>, relatedCauses: Array<IndicatorDetailsQuery_indicator_relatedCauses>, relatedEffects: Array<IndicatorDetailsQuery_indicator_relatedEffects>, plans: Array<IndicatorDetailsQuery_indicator_plans>, changeLogMessage: IndicatorDetailsQuery_indicator_changeLogMessage | null, defaultVisualization: IndicatorDetailsQuery_indicator_defaultVisualization | null };

export type IndicatorDetailsQuery = { __typename: 'Query', plan: IndicatorDetailsQuery_plan | null, indicator: IndicatorDetailsQuery_indicator | null };


export type IndicatorDetailsQueryVariables = Exact<{
  id: string | number | null | undefined;
  plan: string | number | null | undefined;
  sitePlan: string | number | null | undefined;
}>;

export type ActionsTableRowFragment = { __typename: 'Action', id: string, identifier: string, name: string, color: string | null, viewUrl: string, scheduleContinuous: boolean, completion: number | null, status: IndicatorDetailsQuery_indicator_actions_status | null, implementationPhase: IndicatorDetailsQuery_indicator_actions_implementationPhase | null, statusSummary: IndicatorDetailsQuery_indicator_actions_statusSummary, mergedWith: IndicatorDetailsQuery_indicator_actions_mergedWith | null, plan: IndicatorDetailsQuery_indicator_actions_plan, categories: Array<IndicatorDetailsQuery_indicator_actions_categories>, impact: IndicatorDetailsQuery_indicator_actions_impact | null };

export type IndicatorCategoryContentBlockFragment = { __typename: 'IndicatorCategoryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: IndicatorDetailsQuery_plan_indicatorListPage_detailsMainTop_categoryType };

export type IndicatorContentBlockFragment = { __typename: 'IndicatorContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null };

export type IndicatorValueSummaryContentBlockFragment = { __typename: 'IndicatorValueSummaryContentBlock', id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null };

export type OrganizationDetailsQuery_organization_classification = { __typename: 'OrganizationClass', id: string, name: string, identifier: string };

export type OrganizationDetailsQuery_organization_ancestors = { __typename: 'Organization', id: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_primaryOrgs = { __typename: 'Organization', id: string, name: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImpacts = { __typename: 'ActionImpact', id: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatusSummaries = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier, label: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_image_rendition = { __typename: 'ImageRendition', id: string, src: string, alt: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_image = { __typename: 'Image', id: string, rendition: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_image_rendition | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImplementationPhases = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string, order: number };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatuses = { __typename: 'ActionStatus', id: string, identifier: string, name: string, isCompleted: boolean };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_features = { __typename: 'PlanFeatures', hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, categories: Array<AttributesBlockAttributeFragment_categories> };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeChoice = { __typename: 'AttributeChoice', text: string | null, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeText = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes =
  | OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeCategoryChoice
  | OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeChoice
  | OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeNumericValue
  | OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeRichText
  | OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes_AttributeText
;

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_plan = { __typename: 'Plan', id: string, viewUrl: string | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_statusSummary = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_schedule = { __typename: 'ActionSchedule', id: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_status = { __typename: 'ActionStatus', id: string, identifier: string, name: string, color: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_implementationPhase = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string, order: number };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_impact = { __typename: 'ActionImpact', id: string, identifier: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_categories = { __typename: 'Category', id: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_responsibleParties_organization = { __typename: 'Organization', id: string, abbreviation: string | null, name: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_responsibleParties = { __typename: 'ActionResponsibleParty', id: string, organization: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_responsibleParties_organization };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_primaryOrg_logo_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_primaryOrg_logo = { __typename: 'Image', id: string, rendition: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_primaryOrg_logo_rendition | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_primaryOrg = { __typename: 'Organization', id: string, abbreviation: string | null, name: string, logo: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_primaryOrg_logo | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_tasks = { __typename: 'ActionTask', id: string, state: ActionTaskState, dueAt: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_mergedWith_plan = { __typename: 'Plan', id: string, shortName: string | null, versionName: string, viewUrl: string | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_mergedWith = { __typename: 'Action', id: string, identifier: string, plan: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_mergedWith_plan };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_indicators_goals = { __typename: 'IndicatorGoal', id: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_indicators = { __typename: 'Indicator', id: string, goals: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_indicators_goals | null> | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_relatedIndicators_indicator_goals = { __typename: 'IndicatorGoal', id: string };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_relatedIndicators_indicator = { __typename: 'Indicator', id: string, goals: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_relatedIndicators_indicator_goals | null> | null };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_relatedIndicators = { __typename: 'ActionIndicator', id: string, indicatesActionProgress: boolean, indicator: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_relatedIndicators_indicator };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions = { __typename: 'Action', id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, attributes: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_attributes>, plan: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_plan, statusSummary: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_statusSummary, schedule: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_schedule>, status: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_status | null, implementationPhase: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_implementationPhase | null, impact: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_impact | null, categories: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_categories>, responsibleParties: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_responsibleParties>, primaryOrg: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_primaryOrg | null, tasks: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_tasks>, mergedWith: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_mergedWith | null, indicators: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_indicators>, relatedIndicators: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions_relatedIndicators> };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities_generalContent = { __typename: 'SiteGeneralContent', id: string, organizationTerm: SiteGeneralContentOrganizationTerm };

export type OrganizationDetailsQuery_organization_plansWithActionResponsibilities = { __typename: 'Plan', id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, organization: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_organization, primaryOrgs: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_primaryOrgs>, actionImpacts: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImpacts>, actionStatusSummaries: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatusSummaries>, image: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_image | null, actionImplementationPhases: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImplementationPhases>, actionStatuses: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatuses>, features: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_features, actions: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions>, generalContent: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_generalContent };

export type OrganizationDetailsQuery_organization_parent = { __typename: 'Organization', id: string, name: string };

export type OrganizationDetailsQuery_organization_logo_rendition = { __typename: 'ImageRendition', id: string, src: string, alt: string };

export type OrganizationDetailsQuery_organization_logo = { __typename: 'Image', id: string, altText: string, rendition: OrganizationDetailsQuery_organization_logo_rendition | null };

export type OrganizationDetailsQuery_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null, distinctName: string | null, description: string, url: string, actionCount: number, contactPersonCount: number, classification: OrganizationDetailsQuery_organization_classification | null, ancestors: Array<OrganizationDetailsQuery_organization_ancestors | null> | null, plansWithActionResponsibilities: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities>, parent: OrganizationDetailsQuery_organization_parent | null, logo: OrganizationDetailsQuery_organization_logo | null };

export type OrganizationDetailsQuery_plan_actionListPage = { __typename: 'ActionListPage', id: string | null, dashboardColumns: Array<DashboardActionListQuery_planPage_ActionListPage_dashboardColumns> | null };

export type OrganizationDetailsQuery_plan = { __typename: 'Plan', id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, actionListPage: OrganizationDetailsQuery_plan_actionListPage | null, organization: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_organization, primaryOrgs: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_primaryOrgs>, actionImpacts: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImpacts>, actionStatusSummaries: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatusSummaries>, image: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_image | null, actionImplementationPhases: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImplementationPhases>, actionStatuses: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatuses>, features: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_features, actions: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions>, generalContent: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_generalContent };

export type OrganizationDetailsQuery = { __typename: 'Query', organization: OrganizationDetailsQuery_organization | null, plan: OrganizationDetailsQuery_plan | null };


export type OrganizationDetailsQueryVariables = Exact<{
  id: string | number;
  plan: string | number;
  clientUrl: string;
}>;

export type OrgContentPlanFragment = { __typename: 'Plan', id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, organization: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_organization, primaryOrgs: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_primaryOrgs>, actionImpacts: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImpacts>, actionStatusSummaries: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatusSummaries>, image: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_image | null, actionImplementationPhases: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionImplementationPhases>, actionStatuses: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actionStatuses>, features: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_features, actions: Array<OrganizationDetailsQuery_organization_plansWithActionResponsibilities_actions>, generalContent: OrganizationDetailsQuery_organization_plansWithActionResponsibilities_generalContent };

export type PlanCategoryTypesQuery_plan_categoryTypes = { __typename: 'CategoryType', id: string, name: string, identifier: string };

export type PlanCategoryTypesQuery_plan = { __typename: 'Plan', id: string, categoryTypes: Array<PlanCategoryTypesQuery_plan_categoryTypes> };

export type PlanCategoryTypesQuery = { __typename: 'Query', plan: PlanCategoryTypesQuery_plan | null };


export type PlanCategoryTypesQueryVariables = Exact<{
  plan: string | number;
}>;

export type PlanContextQuery_plan_primaryActionClassification_common = { __typename: 'CommonCategoryType', identifier: string };

export type PlanContextQuery_plan_primaryActionClassification = { __typename: 'CategoryType', id: string, identifier: string, hideCategoryIdentifiers: boolean, common: PlanContextQuery_plan_primaryActionClassification_common | null };

export type PlanContextQuery_plan_secondaryActionClassification = { __typename: 'CategoryType', id: string, identifier: string };

export type PlanContextQuery_plan_domain = { __typename: 'PlanDomain', id: string, basePath: string | null, googleSiteVerificationTag: string | null, matomoAnalyticsUrl: string | null };

export type PlanContextQuery_plan_image_square = { __typename: 'ImageRendition', id: string, src: string };

export type PlanContextQuery_plan_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, square: PlanContextQuery_plan_image_square | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null, social: SocialImageFragment_social | null };

export type PlanContextQuery_plan_actionSchedules = { __typename: 'ActionSchedule', id: string, name: string, beginsAt: string, endsAt: string | null };

export type PlanContextQuery_plan_actionImplementationPhases = { __typename: 'ActionImplementationPhase', id: string, identifier: string, name: string, order: number, color: string };

export type PlanContextQuery_plan_actionDependencyRoles = { __typename: 'ActionDependencyRole', id: string, name: string };

export type PlanContextQuery_plan_actionImpacts = { __typename: 'ActionImpact', id: string, identifier: string, name: string, order: number };

export type PlanContextQuery_plan_actionStatuses = { __typename: 'ActionStatus', id: string, identifier: string, name: string, isCompleted: boolean };

export type PlanContextQuery_plan_actionStatusSummaries = { __typename: 'ActionStatusSummary', identifier: ActionStatusSummaryIdentifier, label: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment };

export type PlanContextQuery_plan_actionTimelinessClasses = { __typename: 'ActionTimeliness', identifier: ActionTimelinessIdentifier, color: string, sentiment: Sentiment, comparison: Comparison, days: number };

export type PlanContextQuery_plan_impactGroups = { __typename: 'ImpactGroup', id: string };

export type PlanContextQuery_plan_primaryOrgs = { __typename: 'Organization', id: string };

export type PlanContextQuery_plan_generalContent = { __typename: 'SiteGeneralContent', id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm, actionTaskTerm: SiteGeneralContentActionTaskTerm, indicatorTerm: SiteGeneralContentIndicatorTerm, organizationTerm: SiteGeneralContentOrganizationTerm, sitewideAnnouncement: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_Page = { __typename: 'Page', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_StaticPage = { __typename: 'StaticPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_page =
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_AccessibilityStatementPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_ActionListPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_CategoryPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_CategoryTypePage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_EmptyPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_ImpactGroupPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_IndicatorListPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_Page
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_PlanRootPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_PledgeListPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_PrivacyPolicyPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_page_StaticPage
;

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_ActionListPage = { __typename: 'ActionListPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryPage = { __typename: 'CategoryPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_EmptyPage = { __typename: 'EmptyPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_Page = { __typename: 'Page', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_StaticPage = { __typename: 'StaticPage', id: string | null };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page =
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_AccessibilityStatementPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_ActionListPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_CategoryTypePage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_EmptyPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_ImpactGroupPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_IndicatorListPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_Page
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_PlanRootPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_PledgeListPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_PrivacyPolicyPage
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page_StaticPage
;

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent = { __typename: 'PageMenuItem', id: string, page: PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent_page };

export type PlanContextQuery_plan_mainMenu_items_ExternalLinkMenuItem = { __typename: 'ExternalLinkMenuItem', linkText: string, url: string };

export type PlanContextQuery_plan_mainMenu_items_PageMenuItem = { __typename: 'PageMenuItem', id: string, page: PlanContextQuery_plan_mainMenu_items_PageMenuItem_page, parent: PlanContextQuery_plan_mainMenu_items_PageMenuItem_parent | null };

export type PlanContextQuery_plan_mainMenu_items =
  | PlanContextQuery_plan_mainMenu_items_ExternalLinkMenuItem
  | PlanContextQuery_plan_mainMenu_items_PageMenuItem
;

export type PlanContextQuery_plan_mainMenu = { __typename: 'MainMenu', items: Array<PlanContextQuery_plan_mainMenu_items> };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_Page = { __typename: 'Page', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page_StaticPage = { __typename: 'StaticPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_page =
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_AccessibilityStatementPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_ActionListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_CategoryPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_CategoryTypePage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_EmptyPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_ImpactGroupPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_IndicatorListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_Page
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_PlanRootPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_PledgeListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_PrivacyPolicyPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_page_StaticPage
;

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_ActionListPage = { __typename: 'ActionListPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_CategoryPage = { __typename: 'CategoryPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_EmptyPage = { __typename: 'EmptyPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_Page = { __typename: 'Page', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_StaticPage = { __typename: 'StaticPage', id: string | null };

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent_page =
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_AccessibilityStatementPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_ActionListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_CategoryPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_CategoryTypePage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_EmptyPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_ImpactGroupPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_IndicatorListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_Page
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_PlanRootPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_PledgeListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_PrivacyPolicyPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_parent_page_StaticPage
;

export type PlanContextQuery_plan_footer_items_PageMenuItem_parent = { __typename: 'PageMenuItem', id: string, page: PlanContextQuery_plan_footer_items_PageMenuItem_parent_page };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_Page = { __typename: 'Page', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page_StaticPage = { __typename: 'StaticPage', id: string | null, title: string, urlPath: string, slug: string };

export type PlanContextQuery_plan_footer_items_PageMenuItem_children_page =
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_AccessibilityStatementPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_ActionListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_CategoryPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_CategoryTypePage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_EmptyPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_ImpactGroupPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_IndicatorListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_Page
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_PlanRootPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_PledgeListPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_PrivacyPolicyPage
  | PlanContextQuery_plan_footer_items_PageMenuItem_children_page_StaticPage
;

export type PlanContextQuery_plan_footer_items_PageMenuItem_children = { __typename: 'PageMenuItem', id: string, page: PlanContextQuery_plan_footer_items_PageMenuItem_children_page };

export type PlanContextQuery_plan_footer_items_ExternalLinkMenuItem = { __typename: 'ExternalLinkMenuItem' };

export type PlanContextQuery_plan_footer_items_PageMenuItem = { __typename: 'PageMenuItem', id: string, page: PlanContextQuery_plan_footer_items_PageMenuItem_page, parent: PlanContextQuery_plan_footer_items_PageMenuItem_parent | null, children: Array<PlanContextQuery_plan_footer_items_PageMenuItem_children> | null };

export type PlanContextQuery_plan_footer_items =
  | PlanContextQuery_plan_footer_items_ExternalLinkMenuItem
  | PlanContextQuery_plan_footer_items_PageMenuItem
;

export type PlanContextQuery_plan_footer = { __typename: 'Footer', items: Array<PlanContextQuery_plan_footer_items> };

export type PlanContextQuery_plan_features = { __typename: 'PlanFeatures', allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, contactPersonsShowPicture: boolean, contactPersonsShowOrganizationAncestors: boolean, enableSearch: boolean, hideFromSearchEngines: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, indicatorsOpenInModal: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean, enableChangeLog: boolean, enableActionPdfExportInPublicUi: boolean };

export type PlanContextQuery_plan_allRelatedPlans_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type PlanContextQuery_plan_allRelatedPlans_image = { __typename: 'Image', id: string, rendition: PlanContextQuery_plan_allRelatedPlans_image_rendition | null };

export type PlanContextQuery_plan_allRelatedPlans_organization = { __typename: 'Organization', id: string, name: string };

export type PlanContextQuery_plan_allRelatedPlans = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: PlanContextQuery_plan_allRelatedPlans_image | null, organization: PlanContextQuery_plan_allRelatedPlans_organization };

export type PlanContextQuery_plan_supersededBy = { __typename: 'Plan', id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null };

export type PlanContextQuery_plan_supersededPlans = { __typename: 'Plan', id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null };

export type PlanContextQuery_plan_supersedingPlans = { __typename: 'Plan', id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null };

export type PlanContextQuery_plan_children_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type PlanContextQuery_plan_children_image = { __typename: 'Image', id: string, rendition: PlanContextQuery_plan_children_image_rendition | null };

export type PlanContextQuery_plan_children_organization = { __typename: 'Organization', id: string, name: string };

export type PlanContextQuery_plan_children = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: PlanContextQuery_plan_children_image | null, organization: PlanContextQuery_plan_children_organization };

export type PlanContextQuery_plan_parent_generalContent = { __typename: 'SiteGeneralContent', id: string, siteTitle: string };

export type PlanContextQuery_plan_parent_image_rendition = { __typename: 'ImageRendition', id: string, src: string };

export type PlanContextQuery_plan_parent_image = { __typename: 'Image', id: string, rendition: PlanContextQuery_plan_parent_image_rendition | null };

export type PlanContextQuery_plan_parent_organization = { __typename: 'Organization', id: string, name: string };

export type PlanContextQuery_plan_parent = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, generalContent: PlanContextQuery_plan_parent_generalContent, image: PlanContextQuery_plan_parent_image | null, organization: PlanContextQuery_plan_parent_organization };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeFilterBlock = { __typename: 'ActionAttributeTypeFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeReportFieldBlock = { __typename: 'ActionAttributeTypeReportFieldBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardBlock = { __typename: 'ActionCategoryFilterCardBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardsBlock = { __typename: 'ActionCategoryFilterCardsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryReportFieldBlock = { __typename: 'ActionCategoryReportFieldBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContactFormBlock = { __typename: 'ActionContactFormBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContactPersonsBlock = { __typename: 'ActionContactPersonsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContentAttributeTypeBlock = { __typename: 'ActionContentAttributeTypeBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContentCategoryTypeBlock = { __typename: 'ActionContentCategoryTypeBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContentSectionBlock = { __typename: 'ActionContentSectionBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionDependenciesBlock = { __typename: 'ActionDependenciesBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionDescriptionBlock = { __typename: 'ActionDescriptionBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionEndDateBlock = { __typename: 'ActionEndDateBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionHighlightsBlock = { __typename: 'ActionHighlightsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseFilterBlock = { __typename: 'ActionImplementationPhaseFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseReportFieldBlock = { __typename: 'ActionImplementationPhaseReportFieldBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionLeadParagraphBlock = { __typename: 'ActionLeadParagraphBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionLinksBlock = { __typename: 'ActionLinksBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionListBlock = { __typename: 'ActionListBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionManualStatusReasonBlock = { __typename: 'ActionManualStatusReasonBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionMergedActionsBlock = { __typename: 'ActionMergedActionsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionOfficialNameBlock = { __typename: 'ActionOfficialNameBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionPledgesBlock = { __typename: 'ActionPledgesBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionPrimaryOrgBlock = { __typename: 'ActionPrimaryOrgBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedActionsBlock = { __typename: 'ActionRelatedActionsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedIndicatorsBlock = { __typename: 'ActionRelatedIndicatorsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartiesBlock = { __typename: 'ActionResponsiblePartiesBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartyReportFieldBlock = { __typename: 'ActionResponsiblePartyReportFieldBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleBlock = { __typename: 'ActionScheduleBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleContinuousBlock = { __typename: 'ActionScheduleContinuousBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleFilterBlock = { __typename: 'ActionScheduleFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStartDateBlock = { __typename: 'ActionStartDateBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStatusFilterBlock = { __typename: 'ActionStatusFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStatusGraphsBlock = { __typename: 'ActionStatusGraphsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStatusReportFieldBlock = { __typename: 'ActionStatusReportFieldBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionTasksBlock = { __typename: 'ActionTasksBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionUpdatedAtBlock = { __typename: 'ActionUpdatedAtBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AdaptiveEmbedBlock = { __typename: 'AdaptiveEmbedBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_BlockQuoteBlock = { __typename: 'BlockQuoteBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_BooleanBlock = { __typename: 'BooleanBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CardBlock = { __typename: 'CardBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CardListBlock = { __typename: 'CardListBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CartographyVisualisationBlock = { __typename: 'CartographyVisualisationBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryListBlock = { __typename: 'CategoryListBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageAttributeTypeBlock = { __typename: 'CategoryPageAttributeTypeBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageBodyBlock = { __typename: 'CategoryPageBodyBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageCategoryListBlock = { __typename: 'CategoryPageCategoryListBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageContactFormBlock = { __typename: 'CategoryPageContactFormBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageProgressBlock = { __typename: 'CategoryPageProgressBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTreeMapBlock = { __typename: 'CategoryTreeMapBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeDatasetsBlock = { __typename: 'CategoryTypeDatasetsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeFilterBlock = { __typename: 'CategoryTypeFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeLevelListBlock = { __typename: 'CategoryTypeLevelListBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ChangeLogMessageBlock = { __typename: 'ChangeLogMessageBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CharBlock = { __typename: 'CharBlock', value: string, field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ChoiceBlock = { __typename: 'ChoiceBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ContinuousActionFilterBlock = { __typename: 'ContinuousActionFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardHeaderBlock = { __typename: 'DashboardHeaderBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorAreaChartBlock = { __typename: 'DashboardIndicatorAreaChartBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorBarChartBlock = { __typename: 'DashboardIndicatorBarChartBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorLineChartBlock = { __typename: 'DashboardIndicatorLineChartBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorPieChartBlock = { __typename: 'DashboardIndicatorPieChartBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorSummaryBlock = { __typename: 'DashboardIndicatorSummaryBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardParagraphBlock = { __typename: 'DashboardParagraphBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardRowBlock = { __typename: 'DashboardRowBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DateBlock = { __typename: 'DateBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DateTimeBlock = { __typename: 'DateTimeBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DecimalBlock = { __typename: 'DecimalBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DocumentChooserBlock = { __typename: 'DocumentChooserBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_EmailBlock = { __typename: 'EmailBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_EmbedBlock = { __typename: 'EmbedBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_EndDateColumnBlock = { __typename: 'EndDateColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FieldColumnBlock = { __typename: 'FieldColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FloatBlock = { __typename: 'FloatBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FormChoiceBlock = { __typename: 'FormChoiceBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FormFieldBlock = { __typename: 'FormFieldBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroAdditionalSettingsBlock = { __typename: 'FrontPageHeroAdditionalSettingsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroBlock = { __typename: 'FrontPageHeroBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IdentifierColumnBlock = { __typename: 'IdentifierColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ImageBlock = { __typename: 'ImageBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ImageChooserBlock = { __typename: 'ImageChooserBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ImplementationPhaseColumnBlock = { __typename: 'ImplementationPhaseColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorBlock = { __typename: 'IndicatorBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryColumn = { __typename: 'IndicatorCategoryColumn', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryContentBlock = { __typename: 'IndicatorCategoryContentBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorCausalChainBlock = { __typename: 'IndicatorCausalChainBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorContentBlock = { __typename: 'IndicatorContentBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorFactorValueSummaryContentBlock = { __typename: 'IndicatorFactorValueSummaryContentBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorFilterBlock = { __typename: 'IndicatorFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorGroupBlock = { __typename: 'IndicatorGroupBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorHighlightsBlock = { __typename: 'IndicatorHighlightsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorListColumn = { __typename: 'IndicatorListColumn', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorShowcaseBlock = { __typename: 'IndicatorShowcaseBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueColumn = { __typename: 'IndicatorValueColumn', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueSummaryContentBlock = { __typename: 'IndicatorValueSummaryContentBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorVisualizationContentBlock = { __typename: 'IndicatorVisualizationContentBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorsColumnBlock = { __typename: 'IndicatorsColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IntegerBlock = { __typename: 'IntegerBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_LargeImageBlock = { __typename: 'LargeImageBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_NameColumnBlock = { __typename: 'NameColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_OrganizationColumnBlock = { __typename: 'OrganizationColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PageChooserBlock = { __typename: 'PageChooserBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PageLinkBlock = { __typename: 'PageLinkBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PathsNodeSummaryBlock = { __typename: 'PathsNodeSummaryBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PathsOutcomeBlock = { __typename: 'PathsOutcomeBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PlanDatasetsBlock = { __typename: 'PlanDatasetsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PlanFilterBlock = { __typename: 'PlanFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PrimaryOrganizationFilterBlock = { __typename: 'PrimaryOrganizationFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_QuestionBlock = { __typename: 'QuestionBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RawHTMLBlock = { __typename: 'RawHTMLBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RegexBlock = { __typename: 'RegexBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RelatedIndicatorsBlock = { __typename: 'RelatedIndicatorsBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RelatedPlanListBlock = { __typename: 'RelatedPlanListBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ReportComparisonBlock = { __typename: 'ReportComparisonBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ReportTypeFieldChooserBlock = { __typename: 'ReportTypeFieldChooserBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartiesColumnBlock = { __typename: 'ResponsiblePartiesColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartyFilterBlock = { __typename: 'ResponsiblePartyFilterBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RichTextBlock = { __typename: 'RichTextBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ScheduleContinuousColumnBlock = { __typename: 'ScheduleContinuousColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_SnippetChooserBlock = { __typename: 'SnippetChooserBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StartDateColumnBlock = { __typename: 'StartDateColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StaticBlock = { __typename: 'StaticBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StatusColumnBlock = { __typename: 'StatusColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StreamBlock = { __typename: 'StreamBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StreamFieldBlock = { __typename: 'StreamFieldBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StructBlock = { __typename: 'StructBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_TasksColumnBlock = { __typename: 'TasksColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_TextBlock = { __typename: 'TextBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_TimeBlock = { __typename: 'TimeBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_URLBlock = { __typename: 'URLBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_UpdatedAtColumnBlock = { __typename: 'UpdatedAtColumnBlock', field: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks =
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementComplianceStatusBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactFormBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementContactInformationBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AccessibilityStatementPreparationInformationBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionAttributeTypeReportFieldBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryFilterCardsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionCategoryReportFieldBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContactFormBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContactPersonsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContentAttributeTypeBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContentCategoryTypeBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionContentSectionBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionDependenciesBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionDescriptionBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionEndDateBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionHighlightsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionImplementationPhaseReportFieldBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionLeadParagraphBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionLinksBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionListBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionManualStatusReasonBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionMergedActionsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionOfficialNameBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionPledgesBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionPrimaryOrgBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedActionsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionRelatedIndicatorsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartiesBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionResponsiblePartyReportFieldBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleContinuousBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionScheduleFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStartDateBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStatusFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStatusGraphsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionStatusReportFieldBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionTasksBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ActionUpdatedAtBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_AdaptiveEmbedBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_BlockQuoteBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_BooleanBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CardBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CardListBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CartographyVisualisationBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryListBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageAttributeTypeBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageBodyBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageCategoryListBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageContactFormBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryPageProgressBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTreeMapBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeDatasetsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CategoryTypeLevelListBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ChangeLogMessageBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_CharBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ChoiceBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ContinuousActionFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardHeaderBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorAreaChartBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorBarChartBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorLineChartBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorPieChartBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardIndicatorSummaryBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardParagraphBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DashboardRowBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DateBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DateTimeBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DecimalBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_DocumentChooserBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_EmailBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_EmbedBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_EndDateColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FieldColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FloatBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FormChoiceBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FormFieldBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroAdditionalSettingsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_FrontPageHeroBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IdentifierColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ImageBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ImageChooserBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ImplementationPhaseColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryColumn
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorCategoryContentBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorCausalChainBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorContentBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorFactorValueSummaryContentBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorGroupBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorHighlightsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorListColumn
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorShowcaseBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueColumn
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorValueSummaryContentBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorVisualizationContentBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IndicatorsColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_IntegerBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_LargeImageBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_NameColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_OrganizationColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PageChooserBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PageLinkBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PathsNodeSummaryBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PathsOutcomeBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PlanDatasetsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PlanFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_PrimaryOrganizationFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_QuestionAnswerBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_QuestionBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RawHTMLBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RegexBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RelatedIndicatorsBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RelatedPlanListBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ReportComparisonBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ReportTypeFieldChooserBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartiesColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ResponsiblePartyFilterBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_RichTextBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_ScheduleContinuousColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_SnippetChooserBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StartDateColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StaticBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StatusColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StreamBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StreamFieldBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_StructBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_TasksColumnBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_TextBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_TimeBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_URLBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks_UpdatedAtColumnBlock
;

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementComplianceStatusBlock = { __typename: 'AccessibilityStatementComplianceStatusBlock' };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactFormBlock = { __typename: 'AccessibilityStatementContactFormBlock' };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock = { __typename: 'AccessibilityStatementContactInformationBlock', blocks: Array<PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock_blocks> };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementPreparationInformationBlock = { __typename: 'AccessibilityStatementPreparationInformationBlock' };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_RichTextBlock = { __typename: 'RichTextBlock' };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body =
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementComplianceStatusBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactFormBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementContactInformationBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_AccessibilityStatementPreparationInformationBlock
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body_RichTextBlock
;

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string, body: Array<PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_body> | null };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_CategoryPage = { __typename: 'CategoryPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_EmptyPage = { __typename: 'EmptyPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_Page = { __typename: 'Page', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_StaticPage = { __typename: 'StaticPage', id: string | null, title: string, url: string | null, urlPath: string, slug: string };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page =
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_AccessibilityStatementPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_ActionListPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_CategoryPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_CategoryTypePage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_EmptyPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_ImpactGroupPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_IndicatorListPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_Page
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_PlanRootPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_PledgeListPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_PrivacyPolicyPage
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page_StaticPage
;

export type PlanContextQuery_plan_additionalLinks_items_ExternalLinkMenuItem = { __typename: 'ExternalLinkMenuItem' };

export type PlanContextQuery_plan_additionalLinks_items_PageMenuItem = { __typename: 'PageMenuItem', id: string, crossPlanLink: boolean | null, viewUrl: string | null, page: PlanContextQuery_plan_additionalLinks_items_PageMenuItem_page };

export type PlanContextQuery_plan_additionalLinks_items =
  | PlanContextQuery_plan_additionalLinks_items_ExternalLinkMenuItem
  | PlanContextQuery_plan_additionalLinks_items_PageMenuItem
;

export type PlanContextQuery_plan_additionalLinks = { __typename: 'AdditionalLinks', items: Array<PlanContextQuery_plan_additionalLinks_items> };

export type PlanContextQuery_plan_actionListPage = { __typename: 'ActionListPage', id: string | null, includeRelatedPlans: boolean | null, actionDateFormat: string | null, taskDateFormat: string | null };

export type PlanContextQuery_plan = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, versionName: string, themeIdentifier: string | null, timezone: string, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers: boolean, publishedAt: string | null, kausalPathsInstanceUuid: string, viewUrl: string | null, actionReportExportViewUrl: string | null, serveFileBaseUrl: string, adminUrl: string | null, accessibilityStatementUrl: string | null, externalFeedbackUrl: string | null, primaryActionClassification: PlanContextQuery_plan_primaryActionClassification | null, secondaryActionClassification: PlanContextQuery_plan_secondaryActionClassification | null, domain: PlanContextQuery_plan_domain | null, image: PlanContextQuery_plan_image | null, actionSchedules: Array<PlanContextQuery_plan_actionSchedules>, actionImplementationPhases: Array<PlanContextQuery_plan_actionImplementationPhases>, actionDependencyRoles: Array<PlanContextQuery_plan_actionDependencyRoles>, actionImpacts: Array<PlanContextQuery_plan_actionImpacts>, actionStatuses: Array<PlanContextQuery_plan_actionStatuses>, actionStatusSummaries: Array<PlanContextQuery_plan_actionStatusSummaries>, actionTimelinessClasses: Array<PlanContextQuery_plan_actionTimelinessClasses>, impactGroups: Array<PlanContextQuery_plan_impactGroups>, primaryOrgs: Array<PlanContextQuery_plan_primaryOrgs>, generalContent: PlanContextQuery_plan_generalContent, mainMenu: PlanContextQuery_plan_mainMenu | null, footer: PlanContextQuery_plan_footer | null, features: PlanContextQuery_plan_features, allRelatedPlans: Array<PlanContextQuery_plan_allRelatedPlans>, supersededBy: PlanContextQuery_plan_supersededBy | null, supersededPlans: Array<PlanContextQuery_plan_supersededPlans>, supersedingPlans: Array<PlanContextQuery_plan_supersedingPlans>, children: Array<PlanContextQuery_plan_children>, parent: PlanContextQuery_plan_parent | null, additionalLinks: PlanContextQuery_plan_additionalLinks | null, actionListPage: PlanContextQuery_plan_actionListPage | null };

export type PlanContextQuery_workflowStates = { __typename: 'WorkflowStateDescription', id: string, description: string | null };

export type PlanContextQuery = { __typename: 'Query', plan: PlanContextQuery_plan | null, workflowStates: Array<PlanContextQuery_workflowStates | null> | null };


export type PlanContextQueryVariables = Exact<{
  identifier: string | number | null | undefined;
  hostname: string | null | undefined;
  clientUrl: string | null | undefined;
}>;

export type PlanContextFragment = { __typename: 'Plan', id: string, identifier: string, name: string, shortName: string | null, versionName: string, themeIdentifier: string | null, timezone: string, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers: boolean, publishedAt: string | null, kausalPathsInstanceUuid: string, viewUrl: string | null, actionReportExportViewUrl: string | null, serveFileBaseUrl: string, adminUrl: string | null, accessibilityStatementUrl: string | null, externalFeedbackUrl: string | null, primaryActionClassification: PlanContextQuery_plan_primaryActionClassification | null, secondaryActionClassification: PlanContextQuery_plan_secondaryActionClassification | null, domain: PlanContextQuery_plan_domain | null, image: PlanContextQuery_plan_image | null, actionSchedules: Array<PlanContextQuery_plan_actionSchedules>, actionImplementationPhases: Array<PlanContextQuery_plan_actionImplementationPhases>, actionDependencyRoles: Array<PlanContextQuery_plan_actionDependencyRoles>, actionImpacts: Array<PlanContextQuery_plan_actionImpacts>, actionStatuses: Array<PlanContextQuery_plan_actionStatuses>, actionStatusSummaries: Array<PlanContextQuery_plan_actionStatusSummaries>, actionTimelinessClasses: Array<PlanContextQuery_plan_actionTimelinessClasses>, impactGroups: Array<PlanContextQuery_plan_impactGroups>, primaryOrgs: Array<PlanContextQuery_plan_primaryOrgs>, generalContent: PlanContextQuery_plan_generalContent, mainMenu: PlanContextQuery_plan_mainMenu | null, footer: PlanContextQuery_plan_footer | null, features: PlanContextQuery_plan_features, allRelatedPlans: Array<PlanContextQuery_plan_allRelatedPlans>, supersededBy: PlanContextQuery_plan_supersededBy | null, supersededPlans: Array<PlanContextQuery_plan_supersededPlans>, supersedingPlans: Array<PlanContextQuery_plan_supersedingPlans>, children: Array<PlanContextQuery_plan_children>, parent: PlanContextQuery_plan_parent | null, additionalLinks: PlanContextQuery_plan_additionalLinks | null, actionListPage: PlanContextQuery_plan_actionListPage | null };

export type PlansByHostnameQuery_plansForHostname_domain = { __typename: 'PlanDomain', id: string, hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null };

export type PlansByHostnameQuery_plansForHostname_domains = { __typename: 'PlanDomain', id: string, hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null };

export type PlansByHostnameQuery_plansForHostname_Plan = { __typename: 'Plan', id: string, identifier: string, otherLanguages: Array<string>, primaryLanguage: string, statusMessage: string | null, loginEnabled: boolean | null, domain: PlansByHostnameQuery_plansForHostname_domain | null, domains: Array<PlansByHostnameQuery_plansForHostname_domains | null> | null };

export type PlansByHostnameQuery_plansForHostname_RestrictedPlanNode = { __typename: 'RestrictedPlanNode', primaryLanguage: string, statusMessage: string | null, loginEnabled: boolean | null, domain: PlansByHostnameQuery_plansForHostname_domain | null, domains: Array<PlansByHostnameQuery_plansForHostname_domains | null> | null };

export type PlansByHostnameQuery_plansForHostname =
  | PlansByHostnameQuery_plansForHostname_Plan
  | PlansByHostnameQuery_plansForHostname_RestrictedPlanNode
;

export type PlansByHostnameQuery = { __typename: 'Query', plansForHostname: Array<PlansByHostnameQuery_plansForHostname> | null };


export type PlansByHostnameQueryVariables = Exact<{
  hostname: string | null | undefined;
}>;

export type PledgeFragment_image = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null, small: CardImageFragment_small | null, rendition: CardImageFragment_rendition | null };

export type PledgeFragment_attributes_AttributeCategoryChoice = { __typename: 'AttributeCategoryChoice', id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, categories: Array<AttributesBlockAttributeFragment_categories> };

export type PledgeFragment_attributes_AttributeChoice = { __typename: 'AttributeChoice', text: string | null, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type, choice: AttributesBlockAttributeFragment_AttributeChoice_choice | null };

export type PledgeFragment_attributes_AttributeNumericValue = { __typename: 'AttributeNumericValue', id: string, numericValue: number, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type PledgeFragment_attributes_AttributeRichText = { __typename: 'AttributeRichText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type PledgeFragment_attributes_AttributeText = { __typename: 'AttributeText', value: string, id: string, type: AttributesBlockAttributeWithNestedTypeFragment_type };

export type PledgeFragment_attributes =
  | PledgeFragment_attributes_AttributeCategoryChoice
  | PledgeFragment_attributes_AttributeChoice
  | PledgeFragment_attributes_AttributeNumericValue
  | PledgeFragment_attributes_AttributeRichText
  | PledgeFragment_attributes_AttributeText
;

export type PledgeFragment = { __typename: 'Pledge', id: string, name: string, description: string, uuid: string, slug: string, commitmentCount: number, residentCount: number | null, impactStatement: string, localEquivalency: string, image: PledgeFragment_image | null, attributes: Array<PledgeFragment_attributes> };

export type PledgesQuery_planPage_PledgeListPage_backgroundImage = { __typename: 'Image', id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: HeroImageFragment_full | null, fullMedium: HeroImageFragment_fullMedium | null, fullSmall: HeroImageFragment_fullSmall | null };

export type PledgesQuery_planPage_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage' };

export type PledgesQuery_planPage_ActionListPage = { __typename: 'ActionListPage' };

export type PledgesQuery_planPage_CategoryPage = { __typename: 'CategoryPage' };

export type PledgesQuery_planPage_CategoryTypePage = { __typename: 'CategoryTypePage' };

export type PledgesQuery_planPage_EmptyPage = { __typename: 'EmptyPage' };

export type PledgesQuery_planPage_ImpactGroupPage = { __typename: 'ImpactGroupPage' };

export type PledgesQuery_planPage_IndicatorListPage = { __typename: 'IndicatorListPage' };

export type PledgesQuery_planPage_Page = { __typename: 'Page' };

export type PledgesQuery_planPage_PlanRootPage = { __typename: 'PlanRootPage' };

export type PledgesQuery_planPage_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, title: string, leadContent: string | null, backgroundImage: PledgesQuery_planPage_PledgeListPage_backgroundImage | null };

export type PledgesQuery_planPage_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage' };

export type PledgesQuery_planPage_StaticPage = { __typename: 'StaticPage' };

export type PledgesQuery_planPage =
  | PledgesQuery_planPage_AccessibilityStatementPage
  | PledgesQuery_planPage_ActionListPage
  | PledgesQuery_planPage_CategoryPage
  | PledgesQuery_planPage_CategoryTypePage
  | PledgesQuery_planPage_EmptyPage
  | PledgesQuery_planPage_ImpactGroupPage
  | PledgesQuery_planPage_IndicatorListPage
  | PledgesQuery_planPage_Page
  | PledgesQuery_planPage_PlanRootPage
  | PledgesQuery_planPage_PledgeListPage
  | PledgesQuery_planPage_PrivacyPolicyPage
  | PledgesQuery_planPage_StaticPage
;

export type PledgesQuery_plan_pledges_actions = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string };

export type PledgesQuery_plan_pledges = { __typename: 'Pledge', id: string, name: string, description: string, uuid: string, slug: string, commitmentCount: number, residentCount: number | null, impactStatement: string, localEquivalency: string, actions: Array<PledgesQuery_plan_pledges_actions> | null, image: PledgeFragment_image | null, attributes: Array<PledgeFragment_attributes> };

export type PledgesQuery_plan = { __typename: 'Plan', id: string, pledges: Array<PledgesQuery_plan_pledges> | null };

export type PledgesQuery = { __typename: 'Query', planPage: PledgesQuery_planPage | null, plan: PledgesQuery_plan | null };


export type PledgesQueryVariables = Exact<{
  plan: string | number;
}>;

export type PledgeBodyFragment_LargeImageBlock_image_renditionUncropped = { __typename: 'ImageRendition', id: string, src: string };

export type PledgeBodyFragment_LargeImageBlock_image = { __typename: 'Image', id: string, title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: PledgeBodyFragment_LargeImageBlock_image_renditionUncropped | null };

export type PledgeBodyFragment_QuestionAnswerBlock_questions = { __typename: 'QuestionBlock', question: string, answer: string };

type PledgeBody_AccessibilityStatementComplianceStatusBlock_Fragment = { __typename: 'AccessibilityStatementComplianceStatusBlock', blockType: string, field: string };

type PledgeBody_AccessibilityStatementContactFormBlock_Fragment = { __typename: 'AccessibilityStatementContactFormBlock', blockType: string, field: string };

type PledgeBody_AccessibilityStatementContactInformationBlock_Fragment = { __typename: 'AccessibilityStatementContactInformationBlock', blockType: string, field: string };

type PledgeBody_AccessibilityStatementPreparationInformationBlock_Fragment = { __typename: 'AccessibilityStatementPreparationInformationBlock', blockType: string, field: string };

type PledgeBody_ActionAttributeTypeFilterBlock_Fragment = { __typename: 'ActionAttributeTypeFilterBlock', blockType: string, field: string };

type PledgeBody_ActionAttributeTypeReportFieldBlock_Fragment = { __typename: 'ActionAttributeTypeReportFieldBlock', blockType: string, field: string };

type PledgeBody_ActionCategoryFilterCardBlock_Fragment = { __typename: 'ActionCategoryFilterCardBlock', blockType: string, field: string };

type PledgeBody_ActionCategoryFilterCardsBlock_Fragment = { __typename: 'ActionCategoryFilterCardsBlock', blockType: string, field: string };

type PledgeBody_ActionCategoryReportFieldBlock_Fragment = { __typename: 'ActionCategoryReportFieldBlock', blockType: string, field: string };

type PledgeBody_ActionContactFormBlock_Fragment = { __typename: 'ActionContactFormBlock', blockType: string, field: string };

type PledgeBody_ActionContactPersonsBlock_Fragment = { __typename: 'ActionContactPersonsBlock', blockType: string, field: string };

type PledgeBody_ActionContentAttributeTypeBlock_Fragment = { __typename: 'ActionContentAttributeTypeBlock', blockType: string, field: string };

type PledgeBody_ActionContentCategoryTypeBlock_Fragment = { __typename: 'ActionContentCategoryTypeBlock', blockType: string, field: string };

type PledgeBody_ActionContentSectionBlock_Fragment = { __typename: 'ActionContentSectionBlock', blockType: string, field: string };

type PledgeBody_ActionDependenciesBlock_Fragment = { __typename: 'ActionDependenciesBlock', blockType: string, field: string };

type PledgeBody_ActionDescriptionBlock_Fragment = { __typename: 'ActionDescriptionBlock', blockType: string, field: string };

type PledgeBody_ActionEndDateBlock_Fragment = { __typename: 'ActionEndDateBlock', blockType: string, field: string };

type PledgeBody_ActionHighlightsBlock_Fragment = { __typename: 'ActionHighlightsBlock', blockType: string, field: string };

type PledgeBody_ActionImplementationPhaseFilterBlock_Fragment = { __typename: 'ActionImplementationPhaseFilterBlock', blockType: string, field: string };

type PledgeBody_ActionImplementationPhaseReportFieldBlock_Fragment = { __typename: 'ActionImplementationPhaseReportFieldBlock', blockType: string, field: string };

type PledgeBody_ActionLeadParagraphBlock_Fragment = { __typename: 'ActionLeadParagraphBlock', blockType: string, field: string };

type PledgeBody_ActionLinksBlock_Fragment = { __typename: 'ActionLinksBlock', blockType: string, field: string };

type PledgeBody_ActionListBlock_Fragment = { __typename: 'ActionListBlock', blockType: string, field: string };

type PledgeBody_ActionManualStatusReasonBlock_Fragment = { __typename: 'ActionManualStatusReasonBlock', blockType: string, field: string };

type PledgeBody_ActionMergedActionsBlock_Fragment = { __typename: 'ActionMergedActionsBlock', blockType: string, field: string };

type PledgeBody_ActionOfficialNameBlock_Fragment = { __typename: 'ActionOfficialNameBlock', blockType: string, field: string };

type PledgeBody_ActionPledgesBlock_Fragment = { __typename: 'ActionPledgesBlock', blockType: string, field: string };

type PledgeBody_ActionPrimaryOrgBlock_Fragment = { __typename: 'ActionPrimaryOrgBlock', blockType: string, field: string };

type PledgeBody_ActionRelatedActionsBlock_Fragment = { __typename: 'ActionRelatedActionsBlock', blockType: string, field: string };

type PledgeBody_ActionRelatedIndicatorsBlock_Fragment = { __typename: 'ActionRelatedIndicatorsBlock', blockType: string, field: string };

type PledgeBody_ActionResponsiblePartiesBlock_Fragment = { __typename: 'ActionResponsiblePartiesBlock', blockType: string, field: string };

type PledgeBody_ActionResponsiblePartyReportFieldBlock_Fragment = { __typename: 'ActionResponsiblePartyReportFieldBlock', blockType: string, field: string };

type PledgeBody_ActionScheduleBlock_Fragment = { __typename: 'ActionScheduleBlock', blockType: string, field: string };

type PledgeBody_ActionScheduleContinuousBlock_Fragment = { __typename: 'ActionScheduleContinuousBlock', blockType: string, field: string };

type PledgeBody_ActionScheduleFilterBlock_Fragment = { __typename: 'ActionScheduleFilterBlock', blockType: string, field: string };

type PledgeBody_ActionStartDateBlock_Fragment = { __typename: 'ActionStartDateBlock', blockType: string, field: string };

type PledgeBody_ActionStatusFilterBlock_Fragment = { __typename: 'ActionStatusFilterBlock', blockType: string, field: string };

type PledgeBody_ActionStatusGraphsBlock_Fragment = { __typename: 'ActionStatusGraphsBlock', blockType: string, field: string };

type PledgeBody_ActionStatusReportFieldBlock_Fragment = { __typename: 'ActionStatusReportFieldBlock', blockType: string, field: string };

type PledgeBody_ActionTasksBlock_Fragment = { __typename: 'ActionTasksBlock', blockType: string, field: string };

type PledgeBody_ActionUpdatedAtBlock_Fragment = { __typename: 'ActionUpdatedAtBlock', blockType: string, field: string };

type PledgeBody_AdaptiveEmbedBlock_Fragment = { __typename: 'AdaptiveEmbedBlock', blockType: string, field: string };

type PledgeBody_BlockQuoteBlock_Fragment = { __typename: 'BlockQuoteBlock', blockType: string, field: string };

type PledgeBody_BooleanBlock_Fragment = { __typename: 'BooleanBlock', blockType: string, field: string };

type PledgeBody_CardBlock_Fragment = { __typename: 'CardBlock', blockType: string, field: string };

type PledgeBody_CardListBlock_Fragment = { __typename: 'CardListBlock', blockType: string, field: string };

type PledgeBody_CartographyVisualisationBlock_Fragment = { __typename: 'CartographyVisualisationBlock', blockType: string, field: string };

type PledgeBody_CategoryListBlock_Fragment = { __typename: 'CategoryListBlock', blockType: string, field: string };

type PledgeBody_CategoryPageAttributeTypeBlock_Fragment = { __typename: 'CategoryPageAttributeTypeBlock', blockType: string, field: string };

type PledgeBody_CategoryPageBodyBlock_Fragment = { __typename: 'CategoryPageBodyBlock', blockType: string, field: string };

type PledgeBody_CategoryPageCategoryListBlock_Fragment = { __typename: 'CategoryPageCategoryListBlock', blockType: string, field: string };

type PledgeBody_CategoryPageContactFormBlock_Fragment = { __typename: 'CategoryPageContactFormBlock', blockType: string, field: string };

type PledgeBody_CategoryPageProgressBlock_Fragment = { __typename: 'CategoryPageProgressBlock', blockType: string, field: string };

type PledgeBody_CategoryTreeMapBlock_Fragment = { __typename: 'CategoryTreeMapBlock', blockType: string, field: string };

type PledgeBody_CategoryTypeDatasetsBlock_Fragment = { __typename: 'CategoryTypeDatasetsBlock', blockType: string, field: string };

type PledgeBody_CategoryTypeFilterBlock_Fragment = { __typename: 'CategoryTypeFilterBlock', blockType: string, field: string };

type PledgeBody_CategoryTypeLevelListBlock_Fragment = { __typename: 'CategoryTypeLevelListBlock', blockType: string, field: string };

type PledgeBody_ChangeLogMessageBlock_Fragment = { __typename: 'ChangeLogMessageBlock', blockType: string, field: string };

type PledgeBody_CharBlock_Fragment = { __typename: 'CharBlock', blockType: string, field: string };

type PledgeBody_ChoiceBlock_Fragment = { __typename: 'ChoiceBlock', blockType: string, field: string };

type PledgeBody_ContinuousActionFilterBlock_Fragment = { __typename: 'ContinuousActionFilterBlock', blockType: string, field: string };

type PledgeBody_DashboardHeaderBlock_Fragment = { __typename: 'DashboardHeaderBlock', blockType: string, field: string };

type PledgeBody_DashboardIndicatorAreaChartBlock_Fragment = { __typename: 'DashboardIndicatorAreaChartBlock', blockType: string, field: string };

type PledgeBody_DashboardIndicatorBarChartBlock_Fragment = { __typename: 'DashboardIndicatorBarChartBlock', blockType: string, field: string };

type PledgeBody_DashboardIndicatorLineChartBlock_Fragment = { __typename: 'DashboardIndicatorLineChartBlock', blockType: string, field: string };

type PledgeBody_DashboardIndicatorPieChartBlock_Fragment = { __typename: 'DashboardIndicatorPieChartBlock', blockType: string, field: string };

type PledgeBody_DashboardIndicatorSummaryBlock_Fragment = { __typename: 'DashboardIndicatorSummaryBlock', blockType: string, field: string };

type PledgeBody_DashboardParagraphBlock_Fragment = { __typename: 'DashboardParagraphBlock', blockType: string, field: string };

type PledgeBody_DashboardRowBlock_Fragment = { __typename: 'DashboardRowBlock', blockType: string, field: string };

type PledgeBody_DateBlock_Fragment = { __typename: 'DateBlock', blockType: string, field: string };

type PledgeBody_DateTimeBlock_Fragment = { __typename: 'DateTimeBlock', blockType: string, field: string };

type PledgeBody_DecimalBlock_Fragment = { __typename: 'DecimalBlock', blockType: string, field: string };

type PledgeBody_DocumentChooserBlock_Fragment = { __typename: 'DocumentChooserBlock', blockType: string, field: string };

type PledgeBody_EmailBlock_Fragment = { __typename: 'EmailBlock', blockType: string, field: string };

type PledgeBody_EmbedBlock_Fragment = { __typename: 'EmbedBlock', blockType: string, field: string };

type PledgeBody_EndDateColumnBlock_Fragment = { __typename: 'EndDateColumnBlock', blockType: string, field: string };

type PledgeBody_FieldColumnBlock_Fragment = { __typename: 'FieldColumnBlock', blockType: string, field: string };

type PledgeBody_FloatBlock_Fragment = { __typename: 'FloatBlock', blockType: string, field: string };

type PledgeBody_FormChoiceBlock_Fragment = { __typename: 'FormChoiceBlock', blockType: string, field: string };

type PledgeBody_FormFieldBlock_Fragment = { __typename: 'FormFieldBlock', blockType: string, field: string };

type PledgeBody_FrontPageHeroAdditionalSettingsBlock_Fragment = { __typename: 'FrontPageHeroAdditionalSettingsBlock', blockType: string, field: string };

type PledgeBody_FrontPageHeroBlock_Fragment = { __typename: 'FrontPageHeroBlock', blockType: string, field: string };

type PledgeBody_IdentifierColumnBlock_Fragment = { __typename: 'IdentifierColumnBlock', blockType: string, field: string };

type PledgeBody_ImageBlock_Fragment = { __typename: 'ImageBlock', blockType: string, field: string };

type PledgeBody_ImageChooserBlock_Fragment = { __typename: 'ImageChooserBlock', blockType: string, field: string };

type PledgeBody_ImplementationPhaseColumnBlock_Fragment = { __typename: 'ImplementationPhaseColumnBlock', blockType: string, field: string };

type PledgeBody_IndicatorBlock_Fragment = { __typename: 'IndicatorBlock', blockType: string, field: string };

type PledgeBody_IndicatorCategoryColumn_Fragment = { __typename: 'IndicatorCategoryColumn', blockType: string, field: string };

type PledgeBody_IndicatorCategoryContentBlock_Fragment = { __typename: 'IndicatorCategoryContentBlock', blockType: string, field: string };

type PledgeBody_IndicatorCausalChainBlock_Fragment = { __typename: 'IndicatorCausalChainBlock', blockType: string, field: string };

type PledgeBody_IndicatorContentBlock_Fragment = { __typename: 'IndicatorContentBlock', blockType: string, field: string };

type PledgeBody_IndicatorFactorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorFactorValueSummaryContentBlock', blockType: string, field: string };

type PledgeBody_IndicatorFilterBlock_Fragment = { __typename: 'IndicatorFilterBlock', blockType: string, field: string };

type PledgeBody_IndicatorGroupBlock_Fragment = { __typename: 'IndicatorGroupBlock', blockType: string, field: string };

type PledgeBody_IndicatorHighlightsBlock_Fragment = { __typename: 'IndicatorHighlightsBlock', blockType: string, field: string };

type PledgeBody_IndicatorListColumn_Fragment = { __typename: 'IndicatorListColumn', blockType: string, field: string };

type PledgeBody_IndicatorShowcaseBlock_Fragment = { __typename: 'IndicatorShowcaseBlock', blockType: string, field: string };

type PledgeBody_IndicatorValueColumn_Fragment = { __typename: 'IndicatorValueColumn', blockType: string, field: string };

type PledgeBody_IndicatorValueSummaryContentBlock_Fragment = { __typename: 'IndicatorValueSummaryContentBlock', blockType: string, field: string };

type PledgeBody_IndicatorVisualizationContentBlock_Fragment = { __typename: 'IndicatorVisualizationContentBlock', blockType: string, field: string };

type PledgeBody_IndicatorsColumnBlock_Fragment = { __typename: 'IndicatorsColumnBlock', blockType: string, field: string };

type PledgeBody_IntegerBlock_Fragment = { __typename: 'IntegerBlock', blockType: string, field: string };

type PledgeBody_LargeImageBlock_Fragment = { __typename: 'LargeImageBlock', width: string | null, blockType: string, field: string, image: PledgeBodyFragment_LargeImageBlock_image | null };

type PledgeBody_NameColumnBlock_Fragment = { __typename: 'NameColumnBlock', blockType: string, field: string };

type PledgeBody_OrganizationColumnBlock_Fragment = { __typename: 'OrganizationColumnBlock', blockType: string, field: string };

type PledgeBody_PageChooserBlock_Fragment = { __typename: 'PageChooserBlock', blockType: string, field: string };

type PledgeBody_PageLinkBlock_Fragment = { __typename: 'PageLinkBlock', blockType: string, field: string };

type PledgeBody_PathsNodeSummaryBlock_Fragment = { __typename: 'PathsNodeSummaryBlock', blockType: string, field: string };

type PledgeBody_PathsOutcomeBlock_Fragment = { __typename: 'PathsOutcomeBlock', blockType: string, field: string };

type PledgeBody_PlanDatasetsBlock_Fragment = { __typename: 'PlanDatasetsBlock', blockType: string, field: string };

type PledgeBody_PlanFilterBlock_Fragment = { __typename: 'PlanFilterBlock', blockType: string, field: string };

type PledgeBody_PrimaryOrganizationFilterBlock_Fragment = { __typename: 'PrimaryOrganizationFilterBlock', blockType: string, field: string };

type PledgeBody_QuestionAnswerBlock_Fragment = { __typename: 'QuestionAnswerBlock', heading: string | null, blockType: string, field: string, questions: Array<PledgeBodyFragment_QuestionAnswerBlock_questions> | null };

type PledgeBody_QuestionBlock_Fragment = { __typename: 'QuestionBlock', blockType: string, field: string };

type PledgeBody_RawHtmlBlock_Fragment = { __typename: 'RawHTMLBlock', blockType: string, field: string };

type PledgeBody_RegexBlock_Fragment = { __typename: 'RegexBlock', blockType: string, field: string };

type PledgeBody_RelatedIndicatorsBlock_Fragment = { __typename: 'RelatedIndicatorsBlock', blockType: string, field: string };

type PledgeBody_RelatedPlanListBlock_Fragment = { __typename: 'RelatedPlanListBlock', blockType: string, field: string };

type PledgeBody_ReportComparisonBlock_Fragment = { __typename: 'ReportComparisonBlock', blockType: string, field: string };

type PledgeBody_ReportTypeFieldChooserBlock_Fragment = { __typename: 'ReportTypeFieldChooserBlock', blockType: string, field: string };

type PledgeBody_ResponsiblePartiesColumnBlock_Fragment = { __typename: 'ResponsiblePartiesColumnBlock', blockType: string, field: string };

type PledgeBody_ResponsiblePartyFilterBlock_Fragment = { __typename: 'ResponsiblePartyFilterBlock', blockType: string, field: string };

type PledgeBody_RichTextBlock_Fragment = { __typename: 'RichTextBlock', value: string, blockType: string, field: string };

type PledgeBody_ScheduleContinuousColumnBlock_Fragment = { __typename: 'ScheduleContinuousColumnBlock', blockType: string, field: string };

type PledgeBody_SnippetChooserBlock_Fragment = { __typename: 'SnippetChooserBlock', blockType: string, field: string };

type PledgeBody_StartDateColumnBlock_Fragment = { __typename: 'StartDateColumnBlock', blockType: string, field: string };

type PledgeBody_StaticBlock_Fragment = { __typename: 'StaticBlock', blockType: string, field: string };

type PledgeBody_StatusColumnBlock_Fragment = { __typename: 'StatusColumnBlock', blockType: string, field: string };

type PledgeBody_StreamBlock_Fragment = { __typename: 'StreamBlock', blockType: string, field: string };

type PledgeBody_StreamFieldBlock_Fragment = { __typename: 'StreamFieldBlock', blockType: string, field: string };

type PledgeBody_StructBlock_Fragment = { __typename: 'StructBlock', blockType: string, field: string };

type PledgeBody_TasksColumnBlock_Fragment = { __typename: 'TasksColumnBlock', blockType: string, field: string };

type PledgeBody_TextBlock_Fragment = { __typename: 'TextBlock', blockType: string, field: string };

type PledgeBody_TimeBlock_Fragment = { __typename: 'TimeBlock', blockType: string, field: string };

type PledgeBody_UrlBlock_Fragment = { __typename: 'URLBlock', blockType: string, field: string };

type PledgeBody_UpdatedAtColumnBlock_Fragment = { __typename: 'UpdatedAtColumnBlock', blockType: string, field: string };

export type PledgeBodyFragment =
  | PledgeBody_AccessibilityStatementComplianceStatusBlock_Fragment
  | PledgeBody_AccessibilityStatementContactFormBlock_Fragment
  | PledgeBody_AccessibilityStatementContactInformationBlock_Fragment
  | PledgeBody_AccessibilityStatementPreparationInformationBlock_Fragment
  | PledgeBody_ActionAttributeTypeFilterBlock_Fragment
  | PledgeBody_ActionAttributeTypeReportFieldBlock_Fragment
  | PledgeBody_ActionCategoryFilterCardBlock_Fragment
  | PledgeBody_ActionCategoryFilterCardsBlock_Fragment
  | PledgeBody_ActionCategoryReportFieldBlock_Fragment
  | PledgeBody_ActionContactFormBlock_Fragment
  | PledgeBody_ActionContactPersonsBlock_Fragment
  | PledgeBody_ActionContentAttributeTypeBlock_Fragment
  | PledgeBody_ActionContentCategoryTypeBlock_Fragment
  | PledgeBody_ActionContentSectionBlock_Fragment
  | PledgeBody_ActionDependenciesBlock_Fragment
  | PledgeBody_ActionDescriptionBlock_Fragment
  | PledgeBody_ActionEndDateBlock_Fragment
  | PledgeBody_ActionHighlightsBlock_Fragment
  | PledgeBody_ActionImplementationPhaseFilterBlock_Fragment
  | PledgeBody_ActionImplementationPhaseReportFieldBlock_Fragment
  | PledgeBody_ActionLeadParagraphBlock_Fragment
  | PledgeBody_ActionLinksBlock_Fragment
  | PledgeBody_ActionListBlock_Fragment
  | PledgeBody_ActionManualStatusReasonBlock_Fragment
  | PledgeBody_ActionMergedActionsBlock_Fragment
  | PledgeBody_ActionOfficialNameBlock_Fragment
  | PledgeBody_ActionPledgesBlock_Fragment
  | PledgeBody_ActionPrimaryOrgBlock_Fragment
  | PledgeBody_ActionRelatedActionsBlock_Fragment
  | PledgeBody_ActionRelatedIndicatorsBlock_Fragment
  | PledgeBody_ActionResponsiblePartiesBlock_Fragment
  | PledgeBody_ActionResponsiblePartyReportFieldBlock_Fragment
  | PledgeBody_ActionScheduleBlock_Fragment
  | PledgeBody_ActionScheduleContinuousBlock_Fragment
  | PledgeBody_ActionScheduleFilterBlock_Fragment
  | PledgeBody_ActionStartDateBlock_Fragment
  | PledgeBody_ActionStatusFilterBlock_Fragment
  | PledgeBody_ActionStatusGraphsBlock_Fragment
  | PledgeBody_ActionStatusReportFieldBlock_Fragment
  | PledgeBody_ActionTasksBlock_Fragment
  | PledgeBody_ActionUpdatedAtBlock_Fragment
  | PledgeBody_AdaptiveEmbedBlock_Fragment
  | PledgeBody_BlockQuoteBlock_Fragment
  | PledgeBody_BooleanBlock_Fragment
  | PledgeBody_CardBlock_Fragment
  | PledgeBody_CardListBlock_Fragment
  | PledgeBody_CartographyVisualisationBlock_Fragment
  | PledgeBody_CategoryListBlock_Fragment
  | PledgeBody_CategoryPageAttributeTypeBlock_Fragment
  | PledgeBody_CategoryPageBodyBlock_Fragment
  | PledgeBody_CategoryPageCategoryListBlock_Fragment
  | PledgeBody_CategoryPageContactFormBlock_Fragment
  | PledgeBody_CategoryPageProgressBlock_Fragment
  | PledgeBody_CategoryTreeMapBlock_Fragment
  | PledgeBody_CategoryTypeDatasetsBlock_Fragment
  | PledgeBody_CategoryTypeFilterBlock_Fragment
  | PledgeBody_CategoryTypeLevelListBlock_Fragment
  | PledgeBody_ChangeLogMessageBlock_Fragment
  | PledgeBody_CharBlock_Fragment
  | PledgeBody_ChoiceBlock_Fragment
  | PledgeBody_ContinuousActionFilterBlock_Fragment
  | PledgeBody_DashboardHeaderBlock_Fragment
  | PledgeBody_DashboardIndicatorAreaChartBlock_Fragment
  | PledgeBody_DashboardIndicatorBarChartBlock_Fragment
  | PledgeBody_DashboardIndicatorLineChartBlock_Fragment
  | PledgeBody_DashboardIndicatorPieChartBlock_Fragment
  | PledgeBody_DashboardIndicatorSummaryBlock_Fragment
  | PledgeBody_DashboardParagraphBlock_Fragment
  | PledgeBody_DashboardRowBlock_Fragment
  | PledgeBody_DateBlock_Fragment
  | PledgeBody_DateTimeBlock_Fragment
  | PledgeBody_DecimalBlock_Fragment
  | PledgeBody_DocumentChooserBlock_Fragment
  | PledgeBody_EmailBlock_Fragment
  | PledgeBody_EmbedBlock_Fragment
  | PledgeBody_EndDateColumnBlock_Fragment
  | PledgeBody_FieldColumnBlock_Fragment
  | PledgeBody_FloatBlock_Fragment
  | PledgeBody_FormChoiceBlock_Fragment
  | PledgeBody_FormFieldBlock_Fragment
  | PledgeBody_FrontPageHeroAdditionalSettingsBlock_Fragment
  | PledgeBody_FrontPageHeroBlock_Fragment
  | PledgeBody_IdentifierColumnBlock_Fragment
  | PledgeBody_ImageBlock_Fragment
  | PledgeBody_ImageChooserBlock_Fragment
  | PledgeBody_ImplementationPhaseColumnBlock_Fragment
  | PledgeBody_IndicatorBlock_Fragment
  | PledgeBody_IndicatorCategoryColumn_Fragment
  | PledgeBody_IndicatorCategoryContentBlock_Fragment
  | PledgeBody_IndicatorCausalChainBlock_Fragment
  | PledgeBody_IndicatorContentBlock_Fragment
  | PledgeBody_IndicatorFactorValueSummaryContentBlock_Fragment
  | PledgeBody_IndicatorFilterBlock_Fragment
  | PledgeBody_IndicatorGroupBlock_Fragment
  | PledgeBody_IndicatorHighlightsBlock_Fragment
  | PledgeBody_IndicatorListColumn_Fragment
  | PledgeBody_IndicatorShowcaseBlock_Fragment
  | PledgeBody_IndicatorValueColumn_Fragment
  | PledgeBody_IndicatorValueSummaryContentBlock_Fragment
  | PledgeBody_IndicatorVisualizationContentBlock_Fragment
  | PledgeBody_IndicatorsColumnBlock_Fragment
  | PledgeBody_IntegerBlock_Fragment
  | PledgeBody_LargeImageBlock_Fragment
  | PledgeBody_NameColumnBlock_Fragment
  | PledgeBody_OrganizationColumnBlock_Fragment
  | PledgeBody_PageChooserBlock_Fragment
  | PledgeBody_PageLinkBlock_Fragment
  | PledgeBody_PathsNodeSummaryBlock_Fragment
  | PledgeBody_PathsOutcomeBlock_Fragment
  | PledgeBody_PlanDatasetsBlock_Fragment
  | PledgeBody_PlanFilterBlock_Fragment
  | PledgeBody_PrimaryOrganizationFilterBlock_Fragment
  | PledgeBody_QuestionAnswerBlock_Fragment
  | PledgeBody_QuestionBlock_Fragment
  | PledgeBody_RawHtmlBlock_Fragment
  | PledgeBody_RegexBlock_Fragment
  | PledgeBody_RelatedIndicatorsBlock_Fragment
  | PledgeBody_RelatedPlanListBlock_Fragment
  | PledgeBody_ReportComparisonBlock_Fragment
  | PledgeBody_ReportTypeFieldChooserBlock_Fragment
  | PledgeBody_ResponsiblePartiesColumnBlock_Fragment
  | PledgeBody_ResponsiblePartyFilterBlock_Fragment
  | PledgeBody_RichTextBlock_Fragment
  | PledgeBody_ScheduleContinuousColumnBlock_Fragment
  | PledgeBody_SnippetChooserBlock_Fragment
  | PledgeBody_StartDateColumnBlock_Fragment
  | PledgeBody_StaticBlock_Fragment
  | PledgeBody_StatusColumnBlock_Fragment
  | PledgeBody_StreamBlock_Fragment
  | PledgeBody_StreamFieldBlock_Fragment
  | PledgeBody_StructBlock_Fragment
  | PledgeBody_TasksColumnBlock_Fragment
  | PledgeBody_TextBlock_Fragment
  | PledgeBody_TimeBlock_Fragment
  | PledgeBody_UrlBlock_Fragment
  | PledgeBody_UpdatedAtColumnBlock_Fragment
;

export type PledgeQuery_plan_pledge_body_LargeImageBlock = { __typename: 'LargeImageBlock', width: string | null, blockType: string, field: string, image: PledgeBodyFragment_LargeImageBlock_image | null };

export type PledgeQuery_plan_pledge_body_QuestionAnswerBlock = { __typename: 'QuestionAnswerBlock', heading: string | null, blockType: string, field: string, questions: Array<PledgeBodyFragment_QuestionAnswerBlock_questions> | null };

export type PledgeQuery_plan_pledge_body_RichTextBlock = { __typename: 'RichTextBlock', value: string, blockType: string, field: string };

export type PledgeQuery_plan_pledge_body =
  | PledgeQuery_plan_pledge_body_LargeImageBlock
  | PledgeQuery_plan_pledge_body_QuestionAnswerBlock
  | PledgeQuery_plan_pledge_body_RichTextBlock
;

export type PledgeQuery_plan_pledge_actions = { __typename: 'Action', id: string, identifier: string, name: string, viewUrl: string };

export type PledgeQuery_plan_pledge = { __typename: 'Pledge', id: string, name: string, description: string, uuid: string, slug: string, commitmentCount: number, residentCount: number | null, impactStatement: string, localEquivalency: string, body: Array<PledgeQuery_plan_pledge_body> | null, actions: Array<PledgeQuery_plan_pledge_actions> | null, image: PledgeFragment_image | null, attributes: Array<PledgeFragment_attributes> };

export type PledgeQuery_plan = { __typename: 'Plan', id: string, pledge: PledgeQuery_plan_pledge | null };

export type PledgeQuery = { __typename: 'Query', plan: PledgeQuery_plan | null };


export type PledgeQueryVariables = Exact<{
  plan: string | number;
  slug: string;
}>;

export type PledgeFeatureEnabledQuery_plan_features = { __typename: 'PlanFeatures', enableCommunityEngagement: boolean };

export type PledgeFeatureEnabledQuery_plan = { __typename: 'Plan', id: string, features: PledgeFeatureEnabledQuery_plan_features };

export type PledgeFeatureEnabledQuery = { __typename: 'Query', plan: PledgeFeatureEnabledQuery_plan | null };


export type PledgeFeatureEnabledQueryVariables = Exact<{
  plan: string | number;
}>;

export type StorybookIndicatorExplorerQuery_plan_organization = { __typename: 'Organization', id: string, name: string };

export type StorybookIndicatorExplorerQuery_plan = { __typename: 'Plan', id: string, name: string, themeIdentifier: string | null, viewUrl: string | null, organization: StorybookIndicatorExplorerQuery_plan_organization };

export type StorybookIndicatorExplorerQuery_planIndicators_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null };

export type StorybookIndicatorExplorerQuery_planIndicators_latestValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number };

export type StorybookIndicatorExplorerQuery_planIndicators_values_categories = { __typename: 'DimensionCategory', id: string };

export type StorybookIndicatorExplorerQuery_planIndicators_values = { __typename: 'IndicatorValue', id: string, value: number, date: string | null, categories: Array<StorybookIndicatorExplorerQuery_planIndicators_values_categories> };

export type StorybookIndicatorExplorerQuery_planIndicators_goals = { __typename: 'IndicatorGoal', id: string, value: number, date: string | null };

export type StorybookIndicatorExplorerQuery_planIndicators_quantity = { __typename: 'Quantity', id: string, name: string };

export type StorybookIndicatorExplorerQuery_planIndicators_referenceValue = { __typename: 'IndicatorValue', id: string, value: number, date: string | null };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_dimension = { __typename: 'Dimension', id: string, name: string };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultBarChart_dimension = { __typename: 'Dimension', id: string, name: string };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultLineChart_dimension = { __typename: 'Dimension', id: string, name: string };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultPieChart_dimension = { __typename: 'Dimension', id: string, name: string };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultAreaChart = { __typename: 'IndicatorDefaultAreaChart', dimension: StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_dimension | null };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultBarChart = { __typename: 'IndicatorDefaultBarChart', barType: string | null, dimension: StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultBarChart_dimension | null };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultLineChart = { __typename: 'IndicatorDefaultLineChart', dimension: StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultLineChart_dimension | null };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultPieChart = { __typename: 'IndicatorDefaultPieChart', year: number | null, dimension: StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultPieChart_dimension | null };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultSummary = { __typename: 'IndicatorDefaultSummary' };

export type StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization =
  | StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultAreaChart
  | StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultBarChart
  | StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultLineChart
  | StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultPieChart
  | StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization_IndicatorDefaultSummary
;

export type StorybookIndicatorExplorerQuery_planIndicators_dimensions_dimension_categories = { __typename: 'DimensionCategory', id: string, name: string, defaultColor: string };

export type StorybookIndicatorExplorerQuery_planIndicators_dimensions_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<StorybookIndicatorExplorerQuery_planIndicators_dimensions_dimension_categories> };

export type StorybookIndicatorExplorerQuery_planIndicators_dimensions = { __typename: 'IndicatorDimension', id: string, dimension: StorybookIndicatorExplorerQuery_planIndicators_dimensions_dimension };

export type StorybookIndicatorExplorerQuery_planIndicators = { __typename: 'Indicator', id: string, name: string, level: string | null, timeResolution: IndicatorTimeResolution, description: string | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, valueRounding: number | null, desiredTrend: IndicatorDesiredTrend | null, showTrendline: boolean, showTotalLine: boolean, dataCategoriesAreStackable: boolean, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, unit: StorybookIndicatorExplorerQuery_planIndicators_unit, latestValue: StorybookIndicatorExplorerQuery_planIndicators_latestValue | null, values: Array<StorybookIndicatorExplorerQuery_planIndicators_values>, goals: Array<StorybookIndicatorExplorerQuery_planIndicators_goals | null> | null, quantity: StorybookIndicatorExplorerQuery_planIndicators_quantity | null, referenceValue: StorybookIndicatorExplorerQuery_planIndicators_referenceValue | null, defaultVisualization: StorybookIndicatorExplorerQuery_planIndicators_defaultVisualization | null, dimensions: Array<StorybookIndicatorExplorerQuery_planIndicators_dimensions> };

export type StorybookIndicatorExplorerQuery = { __typename: 'Query', plan: StorybookIndicatorExplorerQuery_plan | null, planIndicators: Array<StorybookIndicatorExplorerQuery_planIndicators> | null };


export type StorybookIndicatorExplorerQueryVariables = Exact<{
  plan: string | number;
}>;

export type TestPlanLocaleQuery_plan = { __typename: 'Plan', id: string };

export type TestPlanLocaleQuery = { __typename: 'Query', plan: TestPlanLocaleQuery_plan | null };


export type TestPlanLocaleQueryVariables = Exact<{ [key: string]: never; }>;

export type TestPlanInstanceAndLocaleQuery_plan = { __typename: 'Plan', id: string };

export type TestPlanInstanceAndLocaleQuery = { __typename: 'Query', plan: TestPlanInstanceAndLocaleQuery_plan | null };


export type TestPlanInstanceAndLocaleQueryVariables = Exact<{ [key: string]: never; }>;

export type IndicatorSparklineGraphDataQuery_plan_scenarios = { __typename: 'Scenario', id: string, identifier: string, name: string };

export type IndicatorSparklineGraphDataQuery_plan = { __typename: 'Plan', id: string, scenarios: Array<IndicatorSparklineGraphDataQuery_plan_scenarios> };

export type IndicatorSparklineGraphDataQuery_indicator_referenceValue = { __typename: 'IndicatorValue', id: string, date: string | null, value: number };

export type IndicatorSparklineGraphDataQuery_indicator_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null };

export type IndicatorSparklineGraphDataQuery_indicator_quantity = { __typename: 'Quantity', id: string, name: string };

export type IndicatorSparklineGraphDataQuery_indicator_values_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorSparklineGraphDataQuery_indicator_values_categories = { __typename: 'DimensionCategory', id: string };

export type IndicatorSparklineGraphDataQuery_indicator_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorSparklineGraphDataQuery_indicator_values_normalizedValues>, categories: Array<IndicatorSparklineGraphDataQuery_indicator_values_categories> };

export type IndicatorSparklineGraphDataQuery_indicator_dimensions_dimension_categories = { __typename: 'DimensionCategory', id: string, name: string };

export type IndicatorSparklineGraphDataQuery_indicator_dimensions_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<IndicatorSparklineGraphDataQuery_indicator_dimensions_dimension_categories> };

export type IndicatorSparklineGraphDataQuery_indicator_dimensions = { __typename: 'IndicatorDimension', id: string, dimension: IndicatorSparklineGraphDataQuery_indicator_dimensions_dimension };

export type IndicatorSparklineGraphDataQuery_indicator_goals_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorSparklineGraphDataQuery_indicator_goals_scenario = { __typename: 'Scenario', id: string };

export type IndicatorSparklineGraphDataQuery_indicator_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorSparklineGraphDataQuery_indicator_goals_normalizedValues>, scenario: IndicatorSparklineGraphDataQuery_indicator_goals_scenario | null };

export type IndicatorSparklineGraphDataQuery_indicator_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_normalizations_unit = { __typename: 'Unit', id: string, shortName: string | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_normalizations_normalizer = { __typename: 'CommonIndicator', name: string, id: string, identifier: string | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_normalizations = { __typename: 'CommonIndicatorNormalization', unit: IndicatorSparklineGraphDataQuery_indicator_common_normalizations_unit, normalizer: IndicatorSparklineGraphDataQuery_indicator_common_normalizations_normalizer };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_organization = { __typename: 'Organization', id: string, name: string, abbreviation: string | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_quantity = { __typename: 'Quantity', id: string, name: string };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_values_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_values_categories = { __typename: 'DimensionCategory', id: string };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_values = { __typename: 'IndicatorValue', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators_values_normalizedValues>, categories: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators_values_categories> };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_dimensions_dimension_categories = { __typename: 'DimensionCategory', id: string, name: string };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_dimensions_dimension = { __typename: 'Dimension', id: string, name: string, categories: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators_dimensions_dimension_categories> };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_dimensions = { __typename: 'IndicatorDimension', id: string, dimension: IndicatorSparklineGraphDataQuery_indicator_common_indicators_dimensions_dimension };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_goals_normalizedValues = { __typename: 'NormalizedValue', normalizerId: string | null, value: number | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_goals_scenario = { __typename: 'Scenario', id: string };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_goals = { __typename: 'IndicatorGoal', id: string, date: string | null, value: number, normalizedValues: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators_goals_normalizedValues>, scenario: IndicatorSparklineGraphDataQuery_indicator_common_indicators_goals_scenario | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators_unit = { __typename: 'Unit', id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null };

export type IndicatorSparklineGraphDataQuery_indicator_common_indicators = { __typename: 'Indicator', id: string, timeResolution: IndicatorTimeResolution, minValue: number | null, maxValue: number | null, organization: IndicatorSparklineGraphDataQuery_indicator_common_indicators_organization, quantity: IndicatorSparklineGraphDataQuery_indicator_common_indicators_quantity | null, values: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators_values>, dimensions: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators_dimensions>, goals: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators_goals | null> | null, unit: IndicatorSparklineGraphDataQuery_indicator_common_indicators_unit };

export type IndicatorSparklineGraphDataQuery_indicator_common = { __typename: 'CommonIndicator', id: string, name: string, normalizations: Array<IndicatorSparklineGraphDataQuery_indicator_common_normalizations>, indicators: Array<IndicatorSparklineGraphDataQuery_indicator_common_indicators> };

export type IndicatorSparklineGraphDataQuery_indicator = { __typename: 'Indicator', id: string, name: string, timeResolution: IndicatorTimeResolution, showTrendline: boolean, desiredTrend: IndicatorDesiredTrend | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, reference: string | null, minValue: number | null, maxValue: number | null, referenceValue: IndicatorSparklineGraphDataQuery_indicator_referenceValue | null, organization: IndicatorSparklineGraphDataQuery_indicator_organization, quantity: IndicatorSparklineGraphDataQuery_indicator_quantity | null, values: Array<IndicatorSparklineGraphDataQuery_indicator_values>, dimensions: Array<IndicatorSparklineGraphDataQuery_indicator_dimensions>, goals: Array<IndicatorSparklineGraphDataQuery_indicator_goals | null> | null, unit: IndicatorSparklineGraphDataQuery_indicator_unit, common: IndicatorSparklineGraphDataQuery_indicator_common | null };

export type IndicatorSparklineGraphDataQuery = { __typename: 'Query', plan: IndicatorSparklineGraphDataQuery_plan | null, indicator: IndicatorSparklineGraphDataQuery_indicator | null };


export type IndicatorSparklineGraphDataQueryVariables = Exact<{
  id: string | number | null | undefined;
  plan: string | number | null | undefined;
}>;

export type SitemapQuery_planIndicators = { __typename: 'Indicator', id: string };

export type SitemapQuery_plan_domain = { __typename: 'PlanDomain', id: string, hostname: string, basePath: string | null };

export type SitemapQuery_plan_features = { __typename: 'PlanFeatures', hideFromSearchEngines: boolean };

export type SitemapQuery_plan_actions = { __typename: 'Action', id: string, identifier: string };

export type SitemapQuery_plan_pages_AccessibilityStatementPage = { __typename: 'AccessibilityStatementPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_ActionListPage = { __typename: 'ActionListPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_CategoryPage = { __typename: 'CategoryPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_CategoryTypePage = { __typename: 'CategoryTypePage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_EmptyPage = { __typename: 'EmptyPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_ImpactGroupPage = { __typename: 'ImpactGroupPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_IndicatorListPage = { __typename: 'IndicatorListPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_Page = { __typename: 'Page', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_PlanRootPage = { __typename: 'PlanRootPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_PledgeListPage = { __typename: 'PledgeListPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_PrivacyPolicyPage = { __typename: 'PrivacyPolicyPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages_StaticPage = { __typename: 'StaticPage', id: string | null, urlPath: string };

export type SitemapQuery_plan_pages =
  | SitemapQuery_plan_pages_AccessibilityStatementPage
  | SitemapQuery_plan_pages_ActionListPage
  | SitemapQuery_plan_pages_CategoryPage
  | SitemapQuery_plan_pages_CategoryTypePage
  | SitemapQuery_plan_pages_EmptyPage
  | SitemapQuery_plan_pages_ImpactGroupPage
  | SitemapQuery_plan_pages_IndicatorListPage
  | SitemapQuery_plan_pages_Page
  | SitemapQuery_plan_pages_PlanRootPage
  | SitemapQuery_plan_pages_PledgeListPage
  | SitemapQuery_plan_pages_PrivacyPolicyPage
  | SitemapQuery_plan_pages_StaticPage
;

export type SitemapQuery_plan = { __typename: 'Plan', id: string, primaryLanguage: string, otherLanguages: Array<string>, domain: SitemapQuery_plan_domain | null, features: SitemapQuery_plan_features, actions: Array<SitemapQuery_plan_actions>, pages: Array<SitemapQuery_plan_pages> | null };

export type SitemapQuery = { __typename: 'Query', planIndicators: Array<SitemapQuery_planIndicators> | null, plan: SitemapQuery_plan | null };


export type SitemapQueryVariables = Exact<{
  id: string | number;
  hostname: string | null | undefined;
}>;

export type { DimensionalNodeMetricFragment } from './paths/graphql';
export { ScenarioKind } from './paths/schema';