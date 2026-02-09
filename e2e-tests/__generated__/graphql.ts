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
  GenericStreamFieldInterface: { input: any; output: any; }
  JSONString: { input: string; output: string; }
  PointScalar: { input: any; output: any; }
  PositiveInt: { input: number; output: number; }
  UUID: { input: string; output: string; }
  _Any: { input: any; output: any; }
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

export type CreateOrganizationMutationInput = {
  /** Short version or abbreviation of the organization name to be displayed when it is not necessary to show the full name */
  abbreviation: InputMaybe<Scalars['String']['input']>;
  classification: InputMaybe<Scalars['ID']['input']>;
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  dissolutionDate: InputMaybe<Scalars['Date']['input']>;
  foundingDate: InputMaybe<Scalars['Date']['input']>;
  /** Full name of the organization */
  name: Scalars['String']['input'];
  parent: InputMaybe<Scalars['ID']['input']>;
};

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

export type UpdateOrganizationMutationInput = {
  /** Short version or abbreviation of the organization name to be displayed when it is not necessary to show the full name */
  abbreviation: InputMaybe<Scalars['String']['input']>;
  classification: InputMaybe<Scalars['ID']['input']>;
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  dissolutionDate: InputMaybe<Scalars['Date']['input']>;
  foundingDate: InputMaybe<Scalars['Date']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  /** Full name of the organization */
  name: Scalars['String']['input'];
  parent: InputMaybe<Scalars['ID']['input']>;
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
