export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSONString: { input: string; output: string; }
  PointScalar: { input: any; output: any; }
  PositiveInt: { input: number; output: number; }
  UUID: { input: string; output: string; }
  _Any: { input: any; output: any; }
};

export type ActionAttributeValueInput = {
  attributeTypeId: Scalars['ID']['input'];
  choiceId: Scalars['ID']['input'];
};

/** An enumeration. */
export enum ActionContactPersonRole {
  /** Editor */
  Editor = 'EDITOR',
  /** Moderator */
  Moderator = 'MODERATOR'
}

/** An enumeration. */
export enum ActionDashboardFieldName {
  Attribute = 'ATTRIBUTE',
  EndDate = 'END_DATE',
  Identifier = 'IDENTIFIER',
  ImplementationPhase = 'IMPLEMENTATION_PHASE',
  Name = 'NAME',
  PrimaryOrg = 'PRIMARY_ORG',
  RelatedIndicators = 'RELATED_INDICATORS',
  ResponsibleParties = 'RESPONSIBLE_PARTIES',
  ScheduleContinuous = 'SCHEDULE_CONTINUOUS',
  StartDate = 'START_DATE',
  Status = 'STATUS',
  Tasks = 'TASKS',
  UpdatedAt = 'UPDATED_AT'
}

/** An enumeration. */
export enum ActionDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

/** An enumeration. */
export enum ActionIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES'
}

/** One action/measure tracked in an action plan. */
export type ActionInput = {
  attributeValues: InputMaybe<Array<ActionAttributeValueInput>>;
  categoryIds: InputMaybe<Array<Scalars['ID']['input']>>;
  /** What does this action involve in more detail? */
  description: InputMaybe<Scalars['String']['input']>;
  /** The identifier for this action (e.g. number) */
  identifier: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  planId: Scalars['ID']['input'];
  primaryOrgId: InputMaybe<Scalars['ID']['input']>;
};

export enum ActionListPageView {
  Cards = 'CARDS',
  Dashboard = 'DASHBOARD'
}

/** An enumeration. */
export enum ActionList_FiltersFieldName {
  Attribute = 'ATTRIBUTE',
  Categories = 'CATEGORIES',
  ContactPersons = 'CONTACT_PERSONS',
  Dependencies = 'DEPENDENCIES',
  Description = 'DESCRIPTION',
  EndDate = 'END_DATE',
  Identifier = 'IDENTIFIER',
  ImplementationPhase = 'IMPLEMENTATION_PHASE',
  LeadParagraph = 'LEAD_PARAGRAPH',
  Links = 'LINKS',
  ManualStatusReason = 'MANUAL_STATUS_REASON',
  MergedActions = 'MERGED_ACTIONS',
  Name = 'NAME',
  OfficialName = 'OFFICIAL_NAME',
  PrimaryOrg = 'PRIMARY_ORG',
  RelatedActions = 'RELATED_ACTIONS',
  RelatedIndicators = 'RELATED_INDICATORS',
  ResponsibleParties = 'RESPONSIBLE_PARTIES',
  Schedule = 'SCHEDULE',
  ScheduleContinuous = 'SCHEDULE_CONTINUOUS',
  StartDate = 'START_DATE',
  Status = 'STATUS',
  Tasks = 'TASKS',
  UpdatedAt = 'UPDATED_AT'
}

/** An enumeration. */
export enum ActionResponsiblePartyRole {
  /** Collaborator */
  Collaborator = 'COLLABORATOR',
  /** Unspecified */
  None = 'NONE',
  /** Primary responsible party */
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
export enum ActionVisibility {
  /** Internal */
  Internal = 'INTERNAL',
  /** Public */
  Public = 'PUBLIC'
}

export type AddRelatedOrganizationInput = {
  /** The PK of the organization */
  organizationId: Scalars['ID']['input'];
  /** The PK or identifier of the plan */
  planId: Scalars['ID']['input'];
};

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

/** AttributeType(id, latest_revision, order, instances_editable_by, instances_visible_for, primary_language_lowercase, object_content_type, scope_content_type, scope_id, name, identifier, help_text, format, unit, attribute_category_type, show_choice_names, has_zero_option, max_length, show_in_reporting_tab, icon, primary_language, other_languages, i18n) */
export type AttributeTypeInput = {
  choiceOptions: InputMaybe<Array<ChoiceOptionInput>>;
  /** The format of the attributes with this type */
  format: AttributeTypeFormat;
  helpText: InputMaybe<Scalars['String']['input']>;
  identifier: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  planId: Scalars['ID']['input'];
  unitId: InputMaybe<Scalars['ID']['input']>;
};

/** An enumeration. */
export enum CartographyProviderCredentialsProvider {
  /** MapBox */
  Mapbox = 'MAPBOX'
}

/** A category for actions and indicators. */
export type CategoryInput = {
  identifier: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  order: InputMaybe<Scalars['Int']['input']>;
  parentId: InputMaybe<Scalars['ID']['input']>;
  typeId: Scalars['ID']['input'];
};

/**
 * Type of the categories.
 *
 * Is used to group categories together. One action plan can have several
 * category types.
 */
export type CategoryTypeInput = {
  /** Set if the categories do not have meaningful identifiers */
  hideCategoryIdentifiers: InputMaybe<Scalars['Boolean']['input']>;
  identifier: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  planId: Scalars['ID']['input'];
  /** Whether this category type is the primary action classification. NOTE: A Plan must have exactly one primary action classification. */
  primaryActionClassification: Scalars['Boolean']['input'];
  /** Choose "Multiple" only if more than one category can be selected at a time, otherwise choose "Single" which is the default. */
  selectWidget: InputMaybe<Scalars['String']['input']>;
  usableForActions: InputMaybe<Scalars['Boolean']['input']>;
  usableForIndicators: InputMaybe<Scalars['Boolean']['input']>;
};

/** An enumeration. */
export enum CategoryTypeSelectWidget {
  /** Multiple */
  Multiple = 'MULTIPLE',
  /** Single */
  Single = 'SINGLE'
}

export type ChoiceOptionInput = {
  identifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

/** An enumeration. */
export enum Comparison {
  Gt = 'GT',
  Lte = 'LTE'
}

/** An enumeration. */
export enum DatasetSchemaTimeResolution {
  /** Yearly */
  Yearly = 'YEARLY'
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
export enum IndicatorLevelLevel {
  /** operational */
  Operational = 'OPERATIONAL',
  /** strategic */
  Strategic = 'STRATEGIC',
  /** tactical */
  Tactical = 'TACTICAL'
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

export type InstanceContext = {
  hostname: InputMaybe<Scalars['String']['input']>;
  identifier: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum ModelAction {
  Add = 'ADD',
  Change = 'CHANGE',
  Delete = 'DELETE',
  View = 'VIEW'
}

export type OrganizationInput = {
  /** Short abbreviation (e.g. "NASA", "YM") */
  abbreviation: InputMaybe<Scalars['String']['input']>;
  /** The official name of the organization */
  name: Scalars['String']['input'];
  /** ID of the parent organization; omit for a root organization */
  parentId: InputMaybe<Scalars['ID']['input']>;
  /** Primary language code (ISO 639-1, e.g. "en-US", "fi", "de-CH"). */
  primaryLanguage: Scalars['String']['input'];
};

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

/** PlanFeatures(id, latest_revision, plan, allow_images_for_actions, show_admin_link, allow_public_site_login, expose_unpublished_plan_only_to_authenticated_user, contact_persons_public_data, contact_persons_show_picture, contact_persons_show_organization_ancestors, contact_persons_hide_moderators, has_action_identifiers, show_action_identifiers, has_action_contact_person_roles, minimal_statuses, has_action_official_name, has_action_lead_paragraph, has_action_primary_orgs, enable_search, enable_indicator_comparison, indicator_ordering, moderation_workflow, display_field_visibility_restrictions, output_report_action_print_layout, password_protected, indicators_open_in_modal, enable_change_log, enable_community_engagement, admin_accessibility_conformance_level) */
export type PlanFeaturesInput = {
  /** Set if the plan uses meaningful action identifiers */
  hasActionIdentifiers: InputMaybe<Scalars['Boolean']['input']>;
  /** Set if the plan uses the lead paragraph field */
  hasActionLeadParagraph: InputMaybe<Scalars['Boolean']['input']>;
  /** Set if the plan uses the official name field */
  hasActionOfficialName: InputMaybe<Scalars['Boolean']['input']>;
  /** Set if actions have a clear primary organization (such as multi-city plans) */
  hasActionPrimaryOrgs: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanInput = {
  features: InputMaybe<PlanFeaturesInput>;
  /** A unique identifier for the plan used internally to distinguish between plans. This becomes part of the test site URL: https://[identifier].watch-test.kausal.tech. Use lowercase letters and dashes. */
  identifier: Scalars['ID']['input'];
  /** The official plan name in full form */
  name: Scalars['String']['input'];
  /** The main organization for the plan */
  organizationId: Scalars['ID']['input'];
  /** Additional language codes (ISO 639-1) */
  otherLanguages: Array<Scalars['String']['input']>;
  /** Primary language code (ISO 639-1, e.g. "en-US", "fi", "de-CH") */
  primaryLanguage: Scalars['String']['input'];
  /** A shorter version of the plan name */
  shortName: InputMaybe<Scalars['String']['input']>;
  themeIdentifier: InputMaybe<Scalars['ID']['input']>;
};

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

/** Enum for search operator. */
export enum SearchOperatorEnum {
  And = 'AND',
  Or = 'OR'
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
export enum SiteGeneralContentOrganizationTerm {
  /** Division */
  Division = 'DIVISION',
  /** Organization */
  Organization = 'ORGANIZATION'
}

export type UpdateActionResponsiblePartyMutationInput = {
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdateIndicatorMutationInput = {
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdatePersonMutationInput = {
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdatePlanMutationInput = {
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UserFeedbackMutationInput = {
  action: InputMaybe<Scalars['ID']['input']>;
  additionalFields: InputMaybe<Scalars['String']['input']>;
  category: InputMaybe<Scalars['ID']['input']>;
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  comment: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  pageId: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
  pledge: InputMaybe<Scalars['ID']['input']>;
  type: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export enum WorkflowState {
  Approved = 'APPROVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

/** An enumeration. */
export enum WorkflowStateStatus {
  /** Approved */
  Approved = 'APPROVED',
  /** Cancelled */
  Cancelled = 'CANCELLED',
  /** In progress */
  InProgress = 'IN_PROGRESS',
  /** Needs changes */
  NeedsChanges = 'NEEDS_CHANGES'
}

export type PlaywrightGetPlanBasicsQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type PlaywrightGetPlanBasicsQuery = (
  { plan: (
    { id: string, identifier: string, primaryLanguage: string, otherLanguages: Array<string> }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type PlaywrightGetPlanInfoQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  locale: Scalars['String']['input'];
  clientURL: Scalars['String']['input'];
}>;


export type PlaywrightGetPlanInfoQuery = (
  { planOrganizations: Array<(
    { id: string, name: string }
    & { __typename: 'Organization' }
  )> | null, plan: (
    { id: string, identifier: string, name: string, shortName: string | null, primaryLanguage: string, otherLanguages: Array<string>, parent: (
      { identifier: string, name: string }
      & { __typename: 'Plan' }
    ) | null, generalContent: (
      { id: string, siteTitle: string, siteDescription: string }
      & { __typename: 'SiteGeneralContent' }
    ), actionListPage: (
      { urlPath: string }
      & { __typename: 'ActionListPage' }
    ) | null, actions: Array<(
      { identifier: string, viewUrl: string }
      & { __typename: 'Action' }
    )>, mainMenu: (
      { items: Array<(
        { linkText: string, url: string }
        & { __typename: 'ExternalLinkMenuItem' }
      ) | (
        { page: (
          { id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent: (
          { id: string, page: (
            { title: string, showInMenus: boolean, live: boolean }
            & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename: 'PageMenuItem' }
        ) | null, children: Array<(
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename: 'PageMenuItem' }
        )> | null }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'MainMenu' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null, planIndicators: Array<(
    { id: string, name: string }
    & { __typename: 'Indicator' }
  )> | null }
  & { __typename: 'Query' }
);
