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
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSONString: { input: any; output: any; }
  PointScalar: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ActionContactPersonRole {
  /** Editor */
  Editor = 'EDITOR',
  /** Moderator */
  Moderator = 'MODERATOR'
}

export enum ActionDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

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

export enum ActionResponsiblePartyRole {
  /** Collaborator */
  Collaborator = 'COLLABORATOR',
  /** Unspecified */
  None = 'NONE',
  /** Primary responsible party */
  Primary = 'PRIMARY'
}

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

export enum ActionTaskDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

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

export enum ActionTimelinessIdentifier {
  Acceptable = 'ACCEPTABLE',
  Late = 'LATE',
  Optimal = 'OPTIMAL',
  Stale = 'STALE'
}

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

export enum CartographyProviderCredentialsProvider {
  /** MapBox */
  Mapbox = 'MAPBOX'
}

export enum CategoryTypeSelectWidget {
  /** Multiple */
  Multiple = 'MULTIPLE',
  /** Single */
  Single = 'SINGLE'
}

export enum Comparison {
  Gt = 'GT',
  Lte = 'LTE'
}

export type CreateOrganizationMutationInput = {
  /** A simplified short version of name for the general public */
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  classification?: InputMaybe<Scalars['ID']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A date of dissolution */
  dissolutionDate?: InputMaybe<Scalars['Date']['input']>;
  /** A date of founding */
  foundingDate?: InputMaybe<Scalars['Date']['input']>;
  /** A primary name, e.g. a legally recognized name */
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['ID']['input']>;
};

export enum IndicatorLevelLevel {
  /** operational */
  Operational = 'OPERATIONAL',
  /** strategic */
  Strategic = 'STRATEGIC',
  /** tactical */
  Tactical = 'TACTICAL'
}

export enum IndicatorTimeResolution {
  /** day */
  Day = 'DAY',
  /** month */
  Month = 'MONTH',
  /** year */
  Year = 'YEAR'
}

export enum PlanFeaturesContactPersonsPublicData {
  /** Show all information */
  All = 'ALL',
  /** Show only name, role and affiliation */
  Name = 'NAME',
  /** Do not show contact persons publicly */
  None = 'NONE'
}

export enum PublicationStatus {
  Published = 'PUBLISHED',
  Scheduled = 'SCHEDULED',
  Unpublished = 'UNPUBLISHED'
}

export enum RelatedCommonIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES',
  /** is a part of */
  PartOf = 'PART_OF'
}

export enum RelatedIndicatorConfidenceLevel {
  /** high */
  High = 'HIGH',
  /** low */
  Low = 'LOW',
  /** medium */
  Medium = 'MEDIUM'
}

export enum RelatedIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES',
  /** is a part of */
  PartOf = 'PART_OF'
}

export enum Sentiment {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE'
}

export enum SiteGeneralContentActionTaskTerm {
  /** Milestone */
  Milestone = 'MILESTONE',
  /** Task */
  Task = 'TASK'
}

export enum SiteGeneralContentActionTerm {
  /** Action */
  Action = 'ACTION',
  /** Case study */
  CaseStudy = 'CASE_STUDY',
  /** Strategy */
  Strategy = 'STRATEGY'
}

export enum SiteGeneralContentOrganizationTerm {
  /** Division */
  Division = 'DIVISION',
  /** Organization */
  Organization = 'ORGANIZATION'
}

export type UpdateActionResponsiblePartyMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdateIndicatorMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdateOrganizationMutationInput = {
  /** A simplified short version of name for the general public */
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  classification?: InputMaybe<Scalars['ID']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A date of dissolution */
  dissolutionDate?: InputMaybe<Scalars['Date']['input']>;
  /** A date of founding */
  foundingDate?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** A primary name, e.g. a legally recognized name */
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePersonMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdatePlanMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UserFeedbackMutationInput = {
  action?: InputMaybe<Scalars['ID']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  comment: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export enum UserFeedbackType {
  /** Accessibility */
  Accessibility = 'ACCESSIBILITY',
  /** Action */
  Action = 'ACTION',
  /** General */
  A = 'A_'
}

export enum WorkflowState {
  /** Approved */
  Approved = 'APPROVED',
  /** Draft */
  Draft = 'DRAFT',
  /** Published */
  Published = 'PUBLISHED'
}

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


export type PlaywrightGetPlanBasicsQuery = { __typename?: 'Query', plan?: { __typename?: 'Plan', id: string, identifier: string, primaryLanguage: string, otherLanguages?: Array<string> | null } | null };

export type PlaywrightGetPlanInfoQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  locale: Scalars['String']['input'];
  clientURL: Scalars['String']['input'];
}>;


export type PlaywrightGetPlanInfoQuery = { __typename?: 'Query', plan?: { __typename?: 'Plan', id: string, identifier: string, name: string, shortName?: string | null, primaryLanguage: string, otherLanguages?: Array<string> | null, parent?: { __typename?: 'Plan', identifier: string, name: string } | null, generalContent: { __typename?: 'SiteGeneralContent', id: string, siteTitle: string, siteDescription: string }, actionListPage?: { __typename?: 'ActionListPage', urlPath: string } | null, actions: Array<{ __typename?: 'Action', identifier: string, viewUrl: string }>, mainMenu?: { __typename?: 'MainMenu', items: Array<{ __typename: 'ExternalLinkMenuItem', linkText: string, url: string } | { __typename: 'PageMenuItem', page: { __typename?: 'AccessibilityStatementPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'ActionListPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'CategoryPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'CategoryTypePage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'EmptyPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'ImpactGroupPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'IndicatorListPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'Page', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'PlanRootPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'PrivacyPolicyPage', id?: string | null, title: string, urlPath: string, slug: string } | { __typename?: 'StaticPage', id?: string | null, title: string, urlPath: string, slug: string }, parent?: { __typename?: 'PageMenuItem', id: string, page: { __typename: 'AccessibilityStatementPage' } | { __typename: 'ActionListPage' } | { __typename: 'CategoryPage' } | { __typename: 'CategoryTypePage' } | { __typename: 'EmptyPage' } | { __typename: 'ImpactGroupPage' } | { __typename: 'IndicatorListPage' } | { __typename: 'Page' } | { __typename: 'PlanRootPage' } | { __typename: 'PrivacyPolicyPage' } | { __typename: 'StaticPage' } } | null } | null> } | null } | null, planIndicators?: Array<{ __typename?: 'Indicator', id: string, name: string } | null> | null };
