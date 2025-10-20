/* istanbul ignore file */
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

/** An enumeration. */
export enum ActionContactPersonRole {
  /** Editor */
  Editor = 'EDITOR',
  /** Moderator */
  Moderator = 'MODERATOR'
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
  /** A simplified short version of name for the general public */
  abbreviation: InputMaybe<Scalars['String']['input']>;
  classification: InputMaybe<Scalars['ID']['input']>;
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  /** A date of dissolution */
  dissolutionDate: InputMaybe<Scalars['Date']['input']>;
  /** A date of founding */
  foundingDate: InputMaybe<Scalars['Date']['input']>;
  /** A primary name, e.g. a legally recognized name */
  name: Scalars['String']['input'];
  parent: InputMaybe<Scalars['ID']['input']>;
};

/** An enumeration. */
export enum DatasetSchemaTimeResolution {
  /** Yearly */
  Yearly = 'YEARLY'
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
export enum IndicatorLevelLevel {
  /** operational */
  Operational = 'OPERATIONAL',
  /** strategic */
  Strategic = 'STRATEGIC',
  /** tactical */
  Tactical = 'TACTICAL'
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
  /** A simplified short version of name for the general public */
  abbreviation: InputMaybe<Scalars['String']['input']>;
  classification: InputMaybe<Scalars['ID']['input']>;
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  /** A date of dissolution */
  dissolutionDate: InputMaybe<Scalars['Date']['input']>;
  /** A date of founding */
  foundingDate: InputMaybe<Scalars['Date']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  /** A primary name, e.g. a legally recognized name */
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

export type GetSitemapQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSitemapQuery = (
  { planIndicators: Array<(
    { id: string }
    & { __typename: 'Indicator' }
  )> | null, plan: (
    { primaryLanguage: string, otherLanguages: Array<string>, actions: Array<(
      { identifier: string }
      & { __typename: 'Action' }
    )>, pages: Array<(
      { urlPath: string }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    )> | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type MultiUseImageFragmentFragment = (
  { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null, large: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null, small: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null, social: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null, rendition: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null }
  & { __typename: 'Image' }
);

export type SearchQueryQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  query: Scalars['String']['input'];
  onlyOtherPlans: InputMaybe<Scalars['Boolean']['input']>;
  clientUrl: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchQueryQuery = (
  { search: (
    { hits: Array<(
      { id: string, title: string, url: string | null, highlight: string | null, plan: (
        { identifier: string, name: string, shortName: string | null, image: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, organization: (
          { name: string }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'Plan' }
      ), object: (
        { identifier: string, primaryOrg: (
          { name: string, logo: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null }
        & { __typename: 'Action' }
      ) | (
        { id: string }
        & { __typename: 'Indicator' }
      ) | null, page: (
        { title: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ) | (
        { title: string, category: (
          { level: (
            { name: string }
            & { __typename: 'CategoryLevel' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'CategoryPage' }
      ) | null }
      & { __typename: 'SearchHit' }
    )> }
    & { __typename: 'SearchResults' }
  ) }
  & { __typename: 'Query' }
);

export type ActionHightlightListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
}>;


export type ActionHightlightListQuery = (
  { planActions: Array<(
    { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, color: string | null, image: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, plan: (
      { id: string }
      & { __typename: 'Plan' }
    ), status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), implementationPhase: (
      { id: string, name: string, identifier: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, parent: (
        { id: string, image: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, parent: (
          { id: string, image: (
            { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type ActionUpdatesQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type ActionUpdatesQuery = (
  { action: (
    { statusUpdates: Array<(
      { id: string, title: string, date: string, content: string, author: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null }
        & { __typename: 'Person' }
      ) | null }
      & { __typename: 'ActionStatusUpdate' }
    )> }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Query' }
);

export type GetActionListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
}>;


export type GetActionListQuery = (
  { planActions: Array<(
    { hasDependencyRelationships: boolean | null, id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, image: (
      { id: string, rendition: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )>, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), implementationPhase: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, mergedWith: (
      { id: string, identifier: string, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, plan: (
      { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type ContactDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  plan: Scalars['ID']['input'];
}>;


export type ContactDetailsQuery = (
  { person: (
    { email: string, organization: (
      { id: string, name: string, ancestors: Array<(
        { id: string, name: string, classification: (
          { id: string, name: string }
          & { __typename: 'OrganizationClass' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null> | null }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Person' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionDependenciesQueryVariables = Exact<{
  action: Scalars['ID']['input'];
  workflow: InputMaybe<WorkflowState>;
}>;


export type ActionDependenciesQuery = (
  { action: (
    { dependencyRole: (
      { id: string, name: string }
      & { __typename: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { preceding: (
        { id: string, dependencyRole: (
          { id: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null }
        & { __typename: 'Action' }
      ), dependent: (
        { id: string, dependencyRole: (
          { id: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null }
        & { __typename: 'Action' }
      ) }
      & { __typename: 'ActionDependencyRelationship' }
    )> }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Query' }
);

export type CreateUserFeedbackMutationVariables = Exact<{
  input: UserFeedbackMutationInput;
}>;


export type CreateUserFeedbackMutation = (
  { createUserFeedback: (
    { feedback: (
      { createdAt: string }
      & { __typename: 'UserFeedbackNode' }
    ) | null, errors: Array<(
      { field: string, messages: Array<string> }
      & { __typename: 'ErrorType' }
    )> }
    & { __typename: 'UserFeedbackMutationPayload' }
  ) | null }
  & { __typename: 'Mutation' }
);

export type GetActionListForBlockQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  category: InputMaybe<Scalars['ID']['input']>;
  clientUrl: InputMaybe<Scalars['String']['input']>;
  workflow: InputMaybe<WorkflowState>;
}>;


export type GetActionListForBlockQuery = (
  { planActions: Array<(
    { hasDependencyRelationships: boolean | null, id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )>, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), implementationPhase: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, mergedWith: (
      { id: string, identifier: string, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, plan: (
      { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type GetActionListForGraphsQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  categoryId: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetActionListForGraphsQuery = (
  { planActions: Array<(
    { color: string | null, scheduleContinuous: boolean, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename: 'ActionTimeliness' }
    ), implementationPhase: (
      { identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type GetCategoryAttributeTypesQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type GetCategoryAttributeTypesQuery = (
  { plan: (
    { id: string, categoryTypes: Array<(
      { id: string, name: string, attributeTypes: Array<(
        { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
          { id: string, identifier: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )>, unit: (
          { id: string, name: string }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      )> }
      & { __typename: 'CategoryType' }
    )> }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type GetCategoriesForTreeMapQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  categoryType: Scalars['ID']['input'];
  attributeType: Scalars['ID']['input'];
}>;


export type GetCategoriesForTreeMapQuery = (
  { planCategories: Array<(
    { id: string, name: string, leadParagraph: string, color: string, image: (
      { id: string, title: string, imageCredit: string, altText: string, rendition: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, path: string, slug: string, url: string | null, urlPath: string, depth: number | null, contentType: string, body: Array<{ __typename: 'ActionListBlock' | 'AdaptiveEmbedBlock' | 'CategoryListBlock' | 'IndicatorGroupBlock' | 'QuestionAnswerBlock' | 'RelatedIndicatorsBlock' } | (
        { value: string }
        & { __typename: 'RichTextBlock' }
      )> | null }
      & { __typename: 'CategoryPage' }
    ) | null, parent: (
      { id: string }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<{ __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeRichText' | 'AttributeText' } | (
      { value: number }
      & { __typename: 'AttributeNumericValue' }
    )> }
    & { __typename: 'Category' }
  )> | null }
  & { __typename: 'Query' }
);

export type CommonCategoryFragmentFragment = (
  { common: (
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'CommonCategory' }
  ) | null }
  & { __typename: 'Category' }
);

export type PlanFragmentFragment = (
  { id: string, categoryTypes: Array<(
    { id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common: (
      { identifier: string, name: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CommonCategoryType' }
    ) | null, categories: Array<(
      { id: string, identifier: string, order: number, name: string, color: string, iconSvgUrl: string | null, parent: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, common: (
        { id: string, identifier: string, name: string, order: number }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  )>, primaryOrgs: Array<(
    { id: string, abbreviation: string | null, name: string }
    & { __typename: 'Organization' }
  )> }
  & { __typename: 'Plan' }
);

export type ActionFragmentFragment = (
  { id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, common: (
      { id: string }
      & { __typename: 'CommonCategory' }
    ) | null }
    & { __typename: 'Category' }
  )>, implementationPhase: (
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
    & { __typename: 'ActionStatusSummary' }
  ), timeliness: (
    { identifier: ActionTimelinessIdentifier }
    & { __typename: 'ActionTimeliness' }
  ), plan?: (
    { id: string, shortName: string | null, name: string, shortIdentifier: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, generalContent: (
      { actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
      & { __typename: 'SiteGeneralContent' }
    ), actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number, color: string }
      & { __typename: 'ActionImplementationPhase' }
    )> }
    & { __typename: 'Plan' }
  ), schedule: Array<(
    { id: string }
    & { __typename: 'ActionSchedule' }
  )>, impact: (
    { id: string, identifier: string }
    & { __typename: 'ActionImpact' }
  ) | null, attributes: Array<(
    { id: string, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeCategoryChoice' }
  ) | (
    { text: string | null, id: string, choice: (
      { id: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    ) | null, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeChoice' }
  ) | (
    { id: string, numericValue: number, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeNumericValue' }
  ) | (
    { value: string, id: string, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeRichText' | 'AttributeText' }
  )>, responsibleParties: Array<(
    { id: string, role: ActionResponsiblePartyRole | null, hasContactPerson: boolean, organization: (
      { id: string, abbreviation: string | null, name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'ActionResponsibleParty' }
  )>, primaryOrg: (
    { id: string, abbreviation: string | null, name: string, logo: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, tasks: Array<(
    { id: string, state: ActionTaskState, dueAt: string }
    & { __typename: 'ActionTask' }
  )>, mergedWith: (
    { id: string, identifier: string, viewUrl: string, plan: (
      { id: string, shortName: string | null, viewUrl: string | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Action' }
);

export type OrganizationFragmentFragment = (
  { id: string, abbreviation: string | null, name: string, contactPersonCount: number, actionCount: number, classification: (
    { name: string }
    & { __typename: 'OrganizationClass' }
  ) | null, parent: (
    { id: string }
    & { __typename: 'Organization' }
  ) | null }
  & { __typename: 'Organization' }
);

export type DashboardActionListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  relatedPlanActions: Scalars['Boolean']['input'];
  path: Scalars['String']['input'];
  workflow: InputMaybe<WorkflowState>;
}>;


export type DashboardActionListQuery = (
  { plan: (
    { id: string, categoryTypes: Array<(
      { id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common: (
        { identifier: string, name: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CommonCategoryType' }
      ) | null, categories: Array<(
        { id: string, identifier: string, order: number, name: string, color: string, iconSvgUrl: string | null, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, common: (
          { id: string, identifier: string, name: string, order: number }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    )>, primaryOrgs: Array<(
      { id: string, abbreviation: string | null, name: string }
      & { __typename: 'Organization' }
    )> }
    & { __typename: 'Plan' }
  ) | null, planActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, common: (
        { id: string }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, implementationPhase: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename: 'ActionTimeliness' }
    ), plan?: (
      { id: string, shortName: string | null, name: string, shortIdentifier: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, generalContent: (
        { actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename: 'SiteGeneralContent' }
      ), actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number, color: string }
        & { __typename: 'ActionImplementationPhase' }
      )> }
      & { __typename: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename: 'ActionSchedule' }
    )>, impact: (
      { id: string, identifier: string }
      & { __typename: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, choice: (
        { id: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, responsibleParties: Array<(
      { id: string, role: ActionResponsiblePartyRole | null, hasContactPerson: boolean, organization: (
        { id: string, abbreviation: string | null, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: string }
      & { __typename: 'ActionTask' }
    )>, mergedWith: (
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName: string | null, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null }
    & { __typename: 'Action' }
  )> | null, relatedPlanActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, common: (
        { id: string }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, implementationPhase: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename: 'ActionTimeliness' }
    ), plan?: (
      { id: string, shortName: string | null, name: string, shortIdentifier: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, generalContent: (
        { actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename: 'SiteGeneralContent' }
      ), actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number, color: string }
        & { __typename: 'ActionImplementationPhase' }
      )> }
      & { __typename: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename: 'ActionSchedule' }
    )>, impact: (
      { id: string, identifier: string }
      & { __typename: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, choice: (
        { id: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, responsibleParties: Array<(
      { id: string, role: ActionResponsiblePartyRole | null, hasContactPerson: boolean, organization: (
        { id: string, abbreviation: string | null, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: string }
      & { __typename: 'ActionTask' }
    )>, mergedWith: (
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName: string | null, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null }
    & { __typename: 'Action' }
  )> | null, planPage: { __typename: 'AccessibilityStatementPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } | (
    { dashboardColumns: Array<(
      { columnLabel: string | null }
      & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'ScheduleContinuousColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { columnLabel: string | null, field: string, attributeType: (
        { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
          { id: string, identifier: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )>, unit: (
          { id: string, name: string }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) | null }
      & { __typename: 'FieldColumnBlock' }
    )> | null }
    & { __typename: 'ActionListPage' }
  ) | null, planOrganizations: Array<(
    { id: string, abbreviation: string | null, name: string, contactPersonCount: number, actionCount: number, classification: (
      { name: string }
      & { __typename: 'OrganizationClass' }
    ) | null, parent: (
      { id: string }
      & { __typename: 'Organization' }
    ) | null }
    & { __typename: 'Organization' }
  )> | null }
  & { __typename: 'Query' }
);

export type GetEmbedActionQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  identifier: Scalars['ID']['input'];
}>;


export type GetEmbedActionQuery = (
  { action: (
    { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, color: string | null, image: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, plan: (
      { id: string }
      & { __typename: 'Plan' }
    ), statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, implementationPhase: (
      { id: string, identifier: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, parent: (
        { id: string, image: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, parent: (
          { id: string, image: (
            { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Query' }
);

export type IndicatorHightlightListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
}>;


export type IndicatorHightlightListQuery = (
  { planIndicators: Array<(
    { id: string, identifier: string | null, name: string, updatedAt: string, level: string | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ), latestValue: (
      { id: string, value: number }
      & { __typename: 'IndicatorValue' }
    ) | null }
    & { __typename: 'Indicator' }
  )> | null }
  & { __typename: 'Query' }
);

export type IndicatorGraphDataQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>;
  plan: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorGraphDataQuery = (
  { plan: (
    { scenarios: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'Scenario' }
    )> }
    & { __typename: 'Plan' }
  ) | null, indicator: (
    { id: string, name: string, timeResolution: IndicatorTimeResolution, showTrendline: boolean, showTotalLine: boolean, desiredTrend: IndicatorDesiredTrend | null, reference: string | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, valueRounding: number | null, dataCategoriesAreStackable: boolean, organization: (
      { id: string, name: string, abbreviation: string | null }
      & { __typename: 'Organization' }
    ), quantity: (
      { id: string, name: string }
      & { __typename: 'Quantity' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, dimensions: Array<(
      { dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
      & { __typename: 'Unit' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, indicators: Array<(
        { id: string, timeResolution: IndicatorTimeResolution, minValue: number | null, maxValue: number | null, organization: (
          { id: string, name: string, abbreviation: string | null }
          & { __typename: 'Organization' }
        ), quantity: (
          { id: string, name: string }
          & { __typename: 'Quantity' }
        ) | null, values: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, categories: Array<(
            { id: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'IndicatorValue' }
        )>, dimensions: Array<(
          { dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string }
              & { __typename: 'DimensionCategory' }
            )> }
            & { __typename: 'Dimension' }
          ) }
          & { __typename: 'IndicatorDimension' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, scenario: (
            { id: string }
            & { __typename: 'Scenario' }
          ) | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'Query' }
);

type AttributesBlockAttribute_AttributeCategoryChoice_Fragment = (
  { id: string, categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )>, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttribute_AttributeChoice_Fragment = (
  { text: string | null, id: string, choice: (
    { id: string, name: string }
    & { __typename: 'AttributeTypeChoiceOption' }
  ) | null, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttribute_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttribute_AttributeRichText_AttributeText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' | 'AttributeText' }
);

export type AttributesBlockAttributeFragment = AttributesBlockAttribute_AttributeCategoryChoice_Fragment | AttributesBlockAttribute_AttributeChoice_Fragment | AttributesBlockAttribute_AttributeNumericValue_Fragment | AttributesBlockAttribute_AttributeRichText_AttributeText_Fragment;

export type AttributesBlockAttributeTypeFragment = (
  { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
    { id: string, identifier: string }
    & { __typename: 'AttributeTypeChoiceOption' }
  )>, unit: (
    { id: string, name: string }
    & { __typename: 'Unit' }
  ) | null }
  & { __typename: 'AttributeType' }
);

type AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment = (
  { id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ), categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )> }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment = (
  { text: string | null, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ), choice: (
    { id: string, name: string }
    & { __typename: 'AttributeTypeChoiceOption' }
  ) | null }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttributeWithNestedType_AttributeRichText_AttributeText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' | 'AttributeText' }
);

export type AttributesBlockAttributeWithNestedTypeFragment = AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment | AttributesBlockAttributeWithNestedType_AttributeRichText_AttributeText_Fragment;

export type ActionCardFragment = (
  { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )>, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier }
    & { __typename: 'ActionStatusSummary' }
  ), implementationPhase: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, primaryOrg: (
    { id: string, abbreviation: string | null, name: string, logo: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, mergedWith: (
    { id: string, identifier: string, plan: (
      { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  ) | null, plan: (
    { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Plan' }
  ) }
  & { __typename: 'Action' }
);

type ActionListFilter_JxzhEOvnBnIzLiXeAUm3xrfiKBjXFpDaL5C3p3Xgq4_Fragment = (
  { field: string, id: string | null }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' }
);

type ActionListFilter_Zf5emmbUjQdAxoEd11HNfN7rZeObw5fUe9AKmN0dV8_Fragment = (
  { field: string, id: string | null }
  & { __typename: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
);

type ActionListFilter_93JyuwkcgTxyAd8Ze7B1Y1YdUFqF72beexGyp3vHk_Fragment = (
  { field: string, id: string | null }
  & { __typename: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' }
);

type ActionListFilter_4HpjKhsrlTf6hxGNhz0QdoSkd5pDwAx5uXeu2jfvi0_Fragment = (
  { field: string, id: string | null }
  & { __typename: 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
);

type ActionListFilter_2Txh4yO4W1VhIfyCaXIuih74QeLatg0aJbS1nrTEbc_Fragment = (
  { field: string, id: string | null }
  & { __typename: 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' }
);

type ActionListFilter_HlPesuqJy5ICdt8i9VuxaO76AiApLIuWcyaZnblsbuk_Fragment = (
  { field: string, id: string | null }
  & { __typename: 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type ActionListFilter_ActionAttributeTypeFilterBlock_Fragment = (
  { showAllLabel: string | null, field: string, id: string | null, attributeType: (
    { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionAttributeTypeFilterBlock' }
);

type ActionListFilter_CategoryTypeFilterBlock_Fragment = (
  { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
    { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
      { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, common: (
        { id: string }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  ) | null }
  & { __typename: 'CategoryTypeFilterBlock' }
);

type ActionListFilter_ContinuousActionFilterBlock_Fragment = (
  { id: string | null, field: string }
  & { __typename: 'ContinuousActionFilterBlock' }
);

export type ActionListFilterFragment = ActionListFilter_JxzhEOvnBnIzLiXeAUm3xrfiKBjXFpDaL5C3p3Xgq4_Fragment | ActionListFilter_Zf5emmbUjQdAxoEd11HNfN7rZeObw5fUe9AKmN0dV8_Fragment | ActionListFilter_93JyuwkcgTxyAd8Ze7B1Y1YdUFqF72beexGyp3vHk_Fragment | ActionListFilter_4HpjKhsrlTf6hxGNhz0QdoSkd5pDwAx5uXeu2jfvi0_Fragment | ActionListFilter_2Txh4yO4W1VhIfyCaXIuih74QeLatg0aJbS1nrTEbc_Fragment | ActionListFilter_HlPesuqJy5ICdt8i9VuxaO76AiApLIuWcyaZnblsbuk_Fragment | ActionListFilter_ActionAttributeTypeFilterBlock_Fragment | ActionListFilter_CategoryTypeFilterBlock_Fragment | ActionListFilter_ContinuousActionFilterBlock_Fragment;

export type ActionListPageFiltersFragment = (
  { primaryFilters: Array<(
    { showAllLabel: string | null, field: string, id: string | null, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { field: string, id: string | null }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
  )> | null, mainFilters: Array<(
    { showAllLabel: string | null, field: string, id: string | null, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { field: string, id: string | null }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
  )> | null, advancedFilters: Array<(
    { showAllLabel: string | null, field: string, id: string | null, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { field: string, id: string | null }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
  )> | null }
  & { __typename: 'ActionListPage' }
);

export type ActionTableColumnFragmentFragment = (
  { dashboardColumns: Array<(
    { columnLabel: string | null }
    & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'ScheduleContinuousColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { columnLabel: string | null, field: string, attributeType: (
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )>, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) | null }
    & { __typename: 'FieldColumnBlock' }
  )> | null }
  & { __typename: 'ActionListPage' }
);

export type CategoryTypeFragmentFragment = (
  { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
    { id: string, order: number, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  )> }
  & { __typename: 'CategoryType' }
);

export type CategoryFragmentFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, large: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, social: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, indicators: Array<(
    { id: string, values: Array<(
      { date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { date: string | null, value: number }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  )>, iconImage: (
    { rendition: (
      { src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename: 'CategoryType' }
  ), attributes: Array<(
    { id: string, key: string }
    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
  ) | (
    { value: string, id: string, key: string }
    & { __typename: 'AttributeRichText' | 'AttributeText' }
  )> }
  & { __typename: 'Category' }
);

export type CategoryWithParentsFragmentFragment = (
  { parent: (
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )> }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type CategoryRecursiveFragmentFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, large: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, social: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, indicators: Array<(
    { id: string, values: Array<(
      { date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { date: string | null, value: number }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  )>, iconImage: (
    { rendition: (
      { src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename: 'CategoryType' }
  ), attributes: Array<(
    { id: string, key: string }
    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
  ) | (
    { value: string, id: string, key: string }
    & { __typename: 'AttributeRichText' | 'AttributeText' }
  )>, parent: (
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )> }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type CategoryTagFragmentFragment = (
  { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, iconImage: (
    { rendition: (
      { src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'Category' }
);

export type CategoryTagWithParentsFragmentFragment = (
  { parent: (
    { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type CategoryTagRecursiveFragmentFragment = (
  { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, iconImage: (
    { rendition: (
      { src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename: 'CategoryType' }
  ), parent: (
    { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type DashboardIndicatorFragmentFragment = (
  { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
    { value: number, date: string | null }
    & { __typename: 'IndicatorValue' }
  ) | null, goals: Array<(
    { value: number, date: string | null }
    & { __typename: 'IndicatorGoal' }
  ) | null> | null, unit: (
    { name: string, shortName: string | null }
    & { __typename: 'Unit' }
  ) }
  & { __typename: 'Indicator' }
);

export type DashboardIndicatorBlockFragmentFragment = (
  { blockType: string, blocks: Array<(
    { blockType: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardRowBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { id: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorAreaChartBlock' }
  ) | (
    { id: string | null, barType: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorBarChartBlock' }
  ) | (
    { id: string | null, helpText: string | null, showTotalLine: boolean | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorLineChartBlock' }
  ) | (
    { helpText: string | null, year: number | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorPieChartBlock' }
  ) | (
    { id: string | null, blockType: string, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorSummaryBlock' }
  ) | (
    { text: string | null, blockType: string }
    & { __typename: 'DashboardParagraphBlock' }
  )> }
  & { __typename: 'DashboardRowBlock' }
);

export type IndicatorListIndicatorFragment = (
  { id: string, name: string, timeResolution: IndicatorTimeResolution, organization: (
    { id: string, name: string }
    & { __typename: 'Organization' }
  ), common: (
    { id: string, name: string, normalizations: Array<(
      { unit: (
        { shortName: string | null }
        & { __typename: 'Unit' }
      ), normalizer: (
        { name: string, id: string, identifier: string | null }
        & { __typename: 'CommonIndicator' }
      ) }
      & { __typename: 'CommonIndicatorNormalization' }
    )>, relatedCauses: Array<(
      { id: string, effectType: RelatedCommonIndicatorEffectType, causalIndicator: (
        { id: string }
        & { __typename: 'CommonIndicator' }
      ) }
      & { __typename: 'RelatedCommonIndicator' }
    )>, relatedEffects: Array<(
      { id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: (
        { id: string }
        & { __typename: 'CommonIndicator' }
      ) }
      & { __typename: 'RelatedCommonIndicator' }
    )> }
    & { __typename: 'CommonIndicator' }
  ) | null, categories: Array<(
    { id: string, name: string, parent: (
      { id: string }
      & { __typename: 'Category' }
    ) | null, type: (
      { id: string, identifier: string }
      & { __typename: 'CategoryType' }
    ), common: (
      { id: string, type: (
        { name: string, identifier: string }
        & { __typename: 'CommonCategoryType' }
      ) }
      & { __typename: 'CommonCategory' }
    ) | null }
    & { __typename: 'Category' }
  )>, latestGraph: (
    { id: string }
    & { __typename: 'IndicatorGraph' }
  ) | null, latestValue: (
    { id: string, date: string | null, value: number, normalizedValues: Array<(
      { normalizerId: string | null, value: number | null }
      & { __typename: 'NormalizedValue' }
    )> }
    & { __typename: 'IndicatorValue' }
  ) | null, dimensions: Array<(
    { dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) }
    & { __typename: 'IndicatorDimension' }
  )>, unit: (
    { shortName: string | null }
    & { __typename: 'Unit' }
  ), plans: Array<(
    { id: string }
    & { __typename: 'Plan' }
  )> }
  & { __typename: 'Indicator' }
);

type StreamFieldFragment_CsWpOaD0dUEdhV96j5U9TnlDssZTxlWikakK8ZjePw_Fragment = (
  { id: string | null, blockType: string, field: string }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
);

type StreamFieldFragment_LEuc4P34OuhAi5tditMvfwrwXsvb6mmls0YluNrk_Fragment = (
  { id: string | null, blockType: string, field: string }
  & { __typename: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' }
);

type StreamFieldFragment_MRtVxdOlrc5lHVq5r6hSwNTpwdXOsPcNfUgGyy36kY_Fragment = (
  { id: string | null, blockType: string, field: string }
  & { __typename: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' }
);

type StreamFieldFragment_QrsC5ckYbmcynV5xfaqbUy6LqMiHUg0fwvYhjs13wIm_Fragment = (
  { id: string | null, blockType: string, field: string }
  & { __typename: 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' }
);

type StreamFieldFragment_4bH6KFsByZvxlHi4Ptyz1GwMbx8AesxU315SRsrMfA_Fragment = (
  { id: string | null, blockType: string, field: string }
  & { __typename: 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' }
);

type StreamFieldFragment_UpdatedAtColumnBlock_Fragment = (
  { id: string | null, blockType: string, field: string }
  & { __typename: 'UpdatedAtColumnBlock' }
);

type StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment = (
  { id: string | null, blockType: string, field: string, blocks: Array<(
    { id: string | null, field: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
  ) | (
    { id: string | null, field: string }
    & { __typename: 'UpdatedAtColumnBlock' }
  ) | (
    { value: string, id: string | null, field: string }
    & { __typename: 'CharBlock' }
  )> }
  & { __typename: 'AccessibilityStatementContactInformationBlock' }
);

type StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment = (
  { id: string | null, blockType: string, field: string, cards: Array<(
    { heading: string | null, lead: string | null, category: (
      { id: string, type: (
        { identifier: string }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'ActionCategoryFilterCardBlock' }
  )> | null }
  & { __typename: 'ActionCategoryFilterCardsBlock' }
);

type StreamFieldFragment_ActionListBlock_Fragment = (
  { id: string | null, heading: string | null, helpText: string | null, blockType: string, field: string, categoryFilter: (
    { id: string }
    & { __typename: 'Category' }
  ) | null, groupByCategoryLevel: (
    { id: string }
    & { __typename: 'CategoryLevel' }
  ) | null }
  & { __typename: 'ActionListBlock' }
);

type StreamFieldFragment_AdaptiveEmbedBlock_Fragment = (
  { fullWidth: boolean | null, id: string | null, blockType: string, field: string, embed: (
    { html: string | null }
    & { __typename: 'EmbedHTMLValue' }
  ) | null }
  & { __typename: 'AdaptiveEmbedBlock' }
);

type StreamFieldFragment_CardListBlock_Fragment = (
  { heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, cards: Array<(
    { heading: string | null, content: string | null, link: string | null, image: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'CardBlock' }
  )> | null }
  & { __typename: 'CardListBlock' }
);

type StreamFieldFragment_CartographyVisualisationBlock_Fragment = (
  { styleOverrides: string | null, id: string | null, blockType: string, field: string, cartographyStyle: string | null, account: (
    { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
    & { __typename: 'CartographyProviderCredentials' }
  ) }
  & { __typename: 'CartographyVisualisationBlock' }
);

type StreamFieldFragment_CategoryListBlock_Fragment = (
  { style: string | null, heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, categoryType: (
    { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  ) | null, category: (
    { id: string, children: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'CategoryListBlock' }
);

type StreamFieldFragment_CategoryTreeMapBlock_Fragment = (
  { heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, valueAttribute: (
    { identifier: string, unit: (
      { shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ), treeMapCategoryType: (
    { identifier: string }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'CategoryTreeMapBlock' }
);

type StreamFieldFragment_CategoryTypeLevelListBlock_Fragment = (
  { heading: string | null, helpText: string | null, id: string | null, blockType: string, field: string, categoryLevel: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ), groupByCategoryLevel: (
    { id: string }
    & { __typename: 'CategoryLevel' }
  ) | null, categoryBlockType: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, indicators: Array<(
        { id: string, name: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'CategoryTypeLevelListBlock' }
);

type StreamFieldFragment_CharBlock_RichTextBlock_TextBlock_Fragment = (
  { value: string, id: string | null, blockType: string, field: string }
  & { __typename: 'CharBlock' | 'RichTextBlock' | 'TextBlock' }
);

type StreamFieldFragment_ChoiceBlock_Fragment = (
  { value: string, id: string | null, blockType: string, field: string, choices: Array<(
    { key: string, value: string }
    & { __typename: 'ChoiceOption' }
  )> }
  & { __typename: 'ChoiceBlock' }
);

type StreamFieldFragment_DashboardRowBlock_Fragment = (
  { id: string | null, blockType: string, field: string, blocks: Array<(
    { blockType: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardRowBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { id: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorAreaChartBlock' }
  ) | (
    { id: string | null, barType: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorBarChartBlock' }
  ) | (
    { id: string | null, helpText: string | null, showTotalLine: boolean | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorLineChartBlock' }
  ) | (
    { helpText: string | null, year: number | null, blockType: string, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorPieChartBlock' }
  ) | (
    { id: string | null, blockType: string, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorSummaryBlock' }
  ) | (
    { text: string | null, blockType: string }
    & { __typename: 'DashboardParagraphBlock' }
  )> }
  & { __typename: 'DashboardRowBlock' }
);

type StreamFieldFragment_FrontPageHeroBlock_Fragment = (
  { layout: string, heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, image: (
    { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, large: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, social: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null }
  & { __typename: 'FrontPageHeroBlock' }
);

type StreamFieldFragment_IndicatorBlock_Fragment = (
  { style: string | null, id: string | null, blockType: string, field: string, indicator: (
    { id: string }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'IndicatorBlock' }
);

type StreamFieldFragment_IndicatorGroupBlock_Fragment = (
  { title: string | null, id: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' } | { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' } | { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' } | { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' } | { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | { __typename: 'UpdatedAtColumnBlock' } | (
    { style: string | null, indicator: (
      { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ), latestValue: (
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'IndicatorBlock' }
  ) | null> | null }
  & { __typename: 'IndicatorGroupBlock' }
);

type StreamFieldFragment_IndicatorShowcaseBlock_Fragment = (
  { title: string | null, body: string | null, id: string | null, blockType: string, field: string, blocks: Array<(
    { id: string | null }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'URLBlock' | 'UpdatedAtColumnBlock' }
  )>, indicator: (
    { id: string, identifier: string | null, name: string, minValue: number | null, maxValue: number | null, unit: (
      { id: string, shortName: string | null, name: string }
      & { __typename: 'Unit' }
    ), latestValue: (
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, common: (
      { id: string, normalizations: Array<(
        { unit: (
          { shortName: string | null, name: string }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null }
    & { __typename: 'Indicator' }
  ) | null, linkButton: (
    { blockType: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'UpdatedAtColumnBlock' }
  ) | (
    { text: string | null, blockType: string, page: (
      { url: string | null, urlPath: string, slug: string }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    ) | null }
    & { __typename: 'PageLinkBlock' }
  ) | null }
  & { __typename: 'IndicatorShowcaseBlock' }
);

type StreamFieldFragment_LargeImageBlock_Fragment = (
  { width: string | null, id: string | null, blockType: string, field: string, image: (
    { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
      { src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null }
  & { __typename: 'LargeImageBlock' }
);

type StreamFieldFragment_PathsOutcomeBlock_Fragment = (
  { heading: string | null, helpText: string | null, outcomeNodeId: string | null, id: string | null, blockType: string, field: string }
  & { __typename: 'PathsOutcomeBlock' }
);

type StreamFieldFragment_QuestionAnswerBlock_Fragment = (
  { heading: string | null, id: string | null, blockType: string, field: string, questions: Array<(
    { question: string, answer: string }
    & { __typename: 'QuestionBlock' }
  )> | null }
  & { __typename: 'QuestionAnswerBlock' }
);

export type StreamFieldFragmentFragment = StreamFieldFragment_CsWpOaD0dUEdhV96j5U9TnlDssZTxlWikakK8ZjePw_Fragment | StreamFieldFragment_LEuc4P34OuhAi5tditMvfwrwXsvb6mmls0YluNrk_Fragment | StreamFieldFragment_MRtVxdOlrc5lHVq5r6hSwNTpwdXOsPcNfUgGyy36kY_Fragment | StreamFieldFragment_QrsC5ckYbmcynV5xfaqbUy6LqMiHUg0fwvYhjs13wIm_Fragment | StreamFieldFragment_4bH6KFsByZvxlHi4Ptyz1GwMbx8AesxU315SRsrMfA_Fragment | StreamFieldFragment_UpdatedAtColumnBlock_Fragment | StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment | StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment | StreamFieldFragment_ActionListBlock_Fragment | StreamFieldFragment_AdaptiveEmbedBlock_Fragment | StreamFieldFragment_CardListBlock_Fragment | StreamFieldFragment_CartographyVisualisationBlock_Fragment | StreamFieldFragment_CategoryListBlock_Fragment | StreamFieldFragment_CategoryTreeMapBlock_Fragment | StreamFieldFragment_CategoryTypeLevelListBlock_Fragment | StreamFieldFragment_CharBlock_RichTextBlock_TextBlock_Fragment | StreamFieldFragment_ChoiceBlock_Fragment | StreamFieldFragment_DashboardRowBlock_Fragment | StreamFieldFragment_FrontPageHeroBlock_Fragment | StreamFieldFragment_IndicatorBlock_Fragment | StreamFieldFragment_IndicatorGroupBlock_Fragment | StreamFieldFragment_IndicatorShowcaseBlock_Fragment | StreamFieldFragment_LargeImageBlock_Fragment | StreamFieldFragment_PathsOutcomeBlock_Fragment | StreamFieldFragment_QuestionAnswerBlock_Fragment;

export type GetActionDetailsQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
  workflow: InputMaybe<WorkflowState>;
}>;


export type GetActionDetailsQuery = (
  { action: (
    { id: string, identifier: string, name: string, officialName: string | null, leadParagraph: string, description: string | null, completion: number | null, color: string | null, updatedAt: string, manualStatusReason: string | null, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, dateFormat: ActionDateFormat | null, workflowStatus: (
      { matchingVersion: (
        { id: string, description: string | null }
        & { __typename: 'WorkflowStateDescription' }
      ) | null }
      & { __typename: 'WorkflowInfoNode' }
    ) | null, image: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, sentiment: Sentiment, isCompleted: boolean, isActive: boolean }
      & { __typename: 'ActionStatusSummary' }
    ), links: Array<(
      { id: string, order: number, url: string, title: string }
      & { __typename: 'ActionLink' }
    )>, mergedActions: Array<(
      { id: string, identifier: string, name: string, officialName: string | null, plan: (
        { id: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    )>, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )>, emissionScopes: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string }
      & { __typename: 'Category' }
    )>, contactPersons: Array<(
      { id: string, person: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null, title: string | null, organization: (
          { name: string }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'Person' }
      ) }
      & { __typename: 'ActionContactPerson' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, responsibleParties: Array<(
      { id: string, role: ActionResponsiblePartyRole | null, specifier: string, organization: (
        { id: string, abbreviation: string | null, name: string, email: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, tasks: Array<(
      { id: string, name: string, dueAt: string, dateFormat: ActionTaskDateFormat | null, completedAt: string | null, comment: string | null, state: ActionTaskState }
      & { __typename: 'ActionTask' }
    )>, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, implementationPhase: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, schedule: Array<(
      { id: string, name: string, beginsAt: string, endsAt: string | null }
      & { __typename: 'ActionSchedule' }
    )>, impact: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImpact' }
    ) | null, statusUpdates: Array<(
      { id: string }
      & { __typename: 'ActionStatusUpdate' }
    )>, relatedIndicators: Array<(
      { id: string, indicator: (
        { id: string, name: string, latestGraph: (
          { id: string }
          & { __typename: 'IndicatorGraph' }
        ) | null, latestValue: (
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        ) | null, actions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'Action' }
        )>, plans: Array<(
          { id: string }
          & { __typename: 'Plan' }
        )> }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'ActionIndicator' }
    )>, relatedActions: Array<(
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    )>, mergedWith: (
      { id: string, identifier: string, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, supersededBy: (
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, supersededActions: Array<(
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    )>, nextAction: (
      { id: string, identifier: string }
      & { __typename: 'Action' }
    ) | null, previousAction: (
      { id: string, identifier: string }
      & { __typename: 'Action' }
    ) | null, attributes: Array<(
      { id: string, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, choice: (
        { id: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, datasets: Array<(
      { uuid: string, schema: (
        { uuid: string, name: string, timeResolution: DatasetSchemaTimeResolution, metrics: Array<(
          { unit: string }
          & { __typename: 'DatasetMetricNode' }
        )>, dimensions: Array<(
          { order: number, dimension: (
            { name: string, uuid: string, categories: Array<(
              { uuid: string, label: string }
              & { __typename: 'DatasetsDimensionCategory' }
            )> }
            & { __typename: 'DatasetsDimension' }
          ) }
          & { __typename: 'DatasetSchemaDimension' }
        )> }
        & { __typename: 'DatasetSchema' }
      ) | null, dataPoints: Array<(
        { uuid: string, value: number | null, date: string, dimensionCategories: Array<(
          { uuid: string, label: string, dimension: (
            { uuid: string }
            & { __typename: 'DatasetsDimension' }
          ) }
          & { __typename: 'DatasetsDimensionCategory' }
        )> }
        & { __typename: 'DataPoint' }
      )> }
      & { __typename: 'Dataset' }
    )>, plan: (
      { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Plan' }
    ), dependencyRole: (
      { id: string, name: string }
      & { __typename: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { preceding: (
        { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
          { id: string, name: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null, status: (
          { id: string, identifier: string, name: string, color: string }
          & { __typename: 'ActionStatus' }
        ) | null, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )>, statusSummary: (
          { identifier: ActionStatusSummaryIdentifier }
          & { __typename: 'ActionStatusSummary' }
        ), implementationPhase: (
          { id: string, identifier: string, name: string }
          & { __typename: 'ActionImplementationPhase' }
        ) | null, primaryOrg: (
          { id: string, abbreviation: string | null, name: string, logo: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null, mergedWith: (
          { id: string, identifier: string, plan: (
            { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
            & { __typename: 'Plan' }
          ) }
          & { __typename: 'Action' }
        ) | null, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ), dependent: (
        { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
          { id: string, name: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null, status: (
          { id: string, identifier: string, name: string, color: string }
          & { __typename: 'ActionStatus' }
        ) | null, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )>, statusSummary: (
          { identifier: ActionStatusSummaryIdentifier }
          & { __typename: 'ActionStatusSummary' }
        ), implementationPhase: (
          { id: string, identifier: string, name: string }
          & { __typename: 'ActionImplementationPhase' }
        ) | null, primaryOrg: (
          { id: string, abbreviation: string | null, name: string, logo: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null, mergedWith: (
          { id: string, identifier: string, plan: (
            { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
            & { __typename: 'Plan' }
          ) }
          & { __typename: 'Action' }
        ) | null, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) }
      & { __typename: 'ActionDependencyRelationship' }
    )> }
    & { __typename: 'Action' }
  ) | null, plan: (
    { actionListPage: (
      { id: string | null, actionDateFormat: string | null, taskDateFormat: string | null, detailsMainTop: Array<(
        { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, fields: Array<(
          { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
            { choiceLabel: string | null, choiceValue: string | null }
            & { __typename: 'FormChoiceBlock' }
          )> }
          & { __typename: 'FormFieldBlock' }
        )> }
        & { __typename: 'ActionContactFormBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<(
          { id: string | null }
          & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
            { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
              { choiceLabel: string | null, choiceValue: string | null }
              & { __typename: 'FormChoiceBlock' }
            )> }
            & { __typename: 'FormFieldBlock' }
          )> }
          & { __typename: 'ActionContactFormBlock' }
        ) | (
          { id: string | null, attributeType: (
            { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
              { id: string, identifier: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )>, unit: (
              { id: string, name: string }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'ActionContentAttributeTypeBlock' }
        ) | (
          { id: string | null, categoryType: (
            { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
              { id: string, order: number, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            )> }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'ActionContentCategoryTypeBlock' }
        ) | (
          { id: string | null, fieldLabel: string | null, caption: string | null }
          & { __typename: 'ActionOfficialNameBlock' }
        ) | (
          { id: string | null, fieldLabel: string | null, fieldHelpText: string | null }
          & { __typename: 'ActionRelatedActionsBlock' }
        ) | (
          { id: string | null, reportField: string | null, reportType: (
            { name: string }
            & { __typename: 'ReportType' }
          ) | null, reportsToCompare: Array<(
            { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
              { attribute: (
                { id: string, categories: Array<(
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, large: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, social: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, iconImage: (
                    { rendition: (
                      { src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )>, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                          { id: string, name: string, namePlural: string | null }
                          & { __typename: 'CategoryLevel' }
                        ) | null, image: (
                          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, large: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, small: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, social: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, rendition: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, indicators: Array<(
                          { id: string, values: Array<(
                            { date: string | null, value: number }
                            & { __typename: 'IndicatorValue' }
                          )>, goals: Array<(
                            { date: string | null, value: number }
                            & { __typename: 'IndicatorGoal' }
                          ) | null> | null, unit: (
                            { name: string, shortName: string | null }
                            & { __typename: 'Unit' }
                          ) }
                          & { __typename: 'Indicator' }
                        )>, iconImage: (
                          { rendition: (
                            { src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, categoryPage: (
                          { id: string | null, title: string, urlPath: string, live: boolean }
                          & { __typename: 'CategoryPage' }
                        ) | null, type: (
                          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                          & { __typename: 'CategoryType' }
                        ), attributes: Array<(
                          { id: string, key: string }
                          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                        ) | (
                          { value: string, id: string, key: string }
                          & { __typename: 'AttributeRichText' | 'AttributeText' }
                        )> }
                        & { __typename: 'Category' }
                      ) | null, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, large: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, social: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, iconImage: (
                        { rendition: (
                          { src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, large: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, social: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, iconImage: (
                      { rendition: (
                        { src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null }
                  & { __typename: 'Category' }
                )>, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeCategoryChoice' }
              ) | (
                { text: string | null, id: string, choice: (
                  { id: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                ) | null, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeChoice' }
              ) | (
                { id: string, numericValue: number, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              ) | null, field: (
                { id: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { id: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
            )> | null }
            & { __typename: 'Report' }
          ) | null> | null }
          & { __typename: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, caption: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { id: string | null, field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'IndicatorCausalChainBlock' }
      ) | (
        { id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
          { uuid: string }
          & { __typename: 'DatasetSchema' }
        ) }
        & { __typename: 'PlanDatasetsBlock' }
      ) | (
        { id: string | null, reportField: string | null, reportType: (
          { name: string }
          & { __typename: 'ReportType' }
        ) | null, reportsToCompare: Array<(
          { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
            { attribute: (
              { id: string, categories: Array<(
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )>, parent: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, large: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, social: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, iconImage: (
                        { rendition: (
                          { src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, large: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, social: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, iconImage: (
                      { rendition: (
                        { src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, large: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, social: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, iconImage: (
                    { rendition: (
                      { src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )> }
                  & { __typename: 'Category' }
                ) | null }
                & { __typename: 'Category' }
              )>, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeCategoryChoice' }
            ) | (
              { text: string | null, id: string, choice: (
                { id: string, name: string }
                & { __typename: 'AttributeTypeChoiceOption' }
              ) | null, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeChoice' }
            ) | (
              { id: string, numericValue: number, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            ) | null, field: (
              { id: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { id: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
          )> | null }
          & { __typename: 'Report' }
        ) | null> | null }
        & { __typename: 'ReportComparisonBlock' }
      )> | null, detailsMainBottom: Array<(
        { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, fields: Array<(
          { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
            { choiceLabel: string | null, choiceValue: string | null }
            & { __typename: 'FormChoiceBlock' }
          )> }
          & { __typename: 'FormFieldBlock' }
        )> }
        & { __typename: 'ActionContactFormBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<(
          { id: string | null }
          & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' }
        ) | (
          { id: string | null }
          & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
            { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
              { choiceLabel: string | null, choiceValue: string | null }
              & { __typename: 'FormChoiceBlock' }
            )> }
            & { __typename: 'FormFieldBlock' }
          )> }
          & { __typename: 'ActionContactFormBlock' }
        ) | (
          { id: string | null, attributeType: (
            { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
              { id: string, identifier: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )>, unit: (
              { id: string, name: string }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'ActionContentAttributeTypeBlock' }
        ) | (
          { id: string | null, categoryType: (
            { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
              { id: string, order: number, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            )> }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'ActionContentCategoryTypeBlock' }
        ) | (
          { id: string | null, fieldLabel: string | null, caption: string | null }
          & { __typename: 'ActionOfficialNameBlock' }
        ) | (
          { id: string | null, fieldLabel: string | null, fieldHelpText: string | null }
          & { __typename: 'ActionRelatedActionsBlock' }
        ) | (
          { id: string | null, reportField: string | null, reportType: (
            { name: string }
            & { __typename: 'ReportType' }
          ) | null, reportsToCompare: Array<(
            { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
              { attribute: (
                { id: string, categories: Array<(
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, large: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, social: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, iconImage: (
                    { rendition: (
                      { src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )>, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                          { id: string, name: string, namePlural: string | null }
                          & { __typename: 'CategoryLevel' }
                        ) | null, image: (
                          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, large: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, small: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, social: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, rendition: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, indicators: Array<(
                          { id: string, values: Array<(
                            { date: string | null, value: number }
                            & { __typename: 'IndicatorValue' }
                          )>, goals: Array<(
                            { date: string | null, value: number }
                            & { __typename: 'IndicatorGoal' }
                          ) | null> | null, unit: (
                            { name: string, shortName: string | null }
                            & { __typename: 'Unit' }
                          ) }
                          & { __typename: 'Indicator' }
                        )>, iconImage: (
                          { rendition: (
                            { src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, categoryPage: (
                          { id: string | null, title: string, urlPath: string, live: boolean }
                          & { __typename: 'CategoryPage' }
                        ) | null, type: (
                          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                          & { __typename: 'CategoryType' }
                        ), attributes: Array<(
                          { id: string, key: string }
                          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                        ) | (
                          { value: string, id: string, key: string }
                          & { __typename: 'AttributeRichText' | 'AttributeText' }
                        )> }
                        & { __typename: 'Category' }
                      ) | null, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, large: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, social: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, iconImage: (
                        { rendition: (
                          { src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, large: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, social: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, iconImage: (
                      { rendition: (
                        { src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null }
                  & { __typename: 'Category' }
                )>, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeCategoryChoice' }
              ) | (
                { text: string | null, id: string, choice: (
                  { id: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                ) | null, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeChoice' }
              ) | (
                { id: string, numericValue: number, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              ) | null, field: (
                { id: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { id: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
            )> | null }
            & { __typename: 'Report' }
          ) | null> | null }
          & { __typename: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, caption: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { id: string | null, field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'IndicatorCausalChainBlock' }
      ) | (
        { id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
          { uuid: string }
          & { __typename: 'DatasetSchema' }
        ) }
        & { __typename: 'PlanDatasetsBlock' }
      ) | (
        { id: string | null, reportField: string | null, reportType: (
          { name: string }
          & { __typename: 'ReportType' }
        ) | null, reportsToCompare: Array<(
          { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
            { attribute: (
              { id: string, categories: Array<(
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )>, parent: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, large: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, social: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, iconImage: (
                        { rendition: (
                          { src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, large: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, social: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, iconImage: (
                      { rendition: (
                        { src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, large: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, social: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, iconImage: (
                    { rendition: (
                      { src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )> }
                  & { __typename: 'Category' }
                ) | null }
                & { __typename: 'Category' }
              )>, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeCategoryChoice' }
            ) | (
              { text: string | null, id: string, choice: (
                { id: string, name: string }
                & { __typename: 'AttributeTypeChoiceOption' }
              ) | null, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeChoice' }
            ) | (
              { id: string, numericValue: number, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            ) | null, field: (
              { id: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { id: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
          )> | null }
          & { __typename: 'Report' }
        ) | null> | null }
        & { __typename: 'ReportComparisonBlock' }
      )> | null, detailsAside: Array<(
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionContactPersonsBlock' | 'ActionScheduleBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { heading: string | null, id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionResponsiblePartiesBlock' }
      )> | null }
      & { __typename: 'ActionListPage' }
    ) | null, actionAttributeTypes: Array<(
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )>, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    )>, generalContent: (
      { actionTerm: SiteGeneralContentActionTerm }
      & { __typename: 'SiteGeneralContent' }
    ) }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionDependenciesFragment = (
  { dependencyRole: (
    { id: string, name: string }
    & { __typename: 'ActionDependencyRole' }
  ) | null, allDependencyRelationships: Array<(
    { preceding: (
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
        { id: string, name: string }
        & { __typename: 'ActionDependencyRole' }
      ) | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ), dependent: (
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
        { id: string, name: string }
        & { __typename: 'ActionDependencyRole' }
      ) | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) }
    & { __typename: 'ActionDependencyRelationship' }
  )> }
  & { __typename: 'Action' }
);

type ActionAsideContentBlocksFragment_ActionContactPersonsBlock_ActionScheduleBlock_Fragment = (
  { id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionContactPersonsBlock' | 'ActionScheduleBlock' }
);

type ActionAsideContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment = (
  { id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, attributeType: (
    { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )>, unit: (
      { id: string, name: string }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionAsideContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment = (
  { id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

type ActionAsideContentBlocksFragment_ActionResponsiblePartiesBlock_Fragment = (
  { heading: string | null, id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionResponsiblePartiesBlock' }
);

export type ActionAsideContentBlocksFragmentFragment = ActionAsideContentBlocksFragment_ActionContactPersonsBlock_ActionScheduleBlock_Fragment | ActionAsideContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment | ActionAsideContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment | ActionAsideContentBlocksFragment_ActionResponsiblePartiesBlock_Fragment;

type ActionMainContentBlocksFragment_ActionContactFormBlock_Fragment = (
  { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, fields: Array<(
    { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
      { choiceLabel: string | null, choiceValue: string | null }
      & { __typename: 'FormChoiceBlock' }
    )> }
    & { __typename: 'FormFieldBlock' }
  )> }
  & { __typename: 'ActionContactFormBlock' }
);

type ActionMainContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment = (
  { id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, attributeType: (
    { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )>, unit: (
      { id: string, name: string }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionMainContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment = (
  { id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

type ActionMainContentBlocksFragment_ActionContentSectionBlock_Fragment = (
  { id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<(
    { id: string | null }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' }
  ) | (
    { id: string | null }
    & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
      { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
        { choiceLabel: string | null, choiceValue: string | null }
        & { __typename: 'FormChoiceBlock' }
      )> }
      & { __typename: 'FormFieldBlock' }
    )> }
    & { __typename: 'ActionContactFormBlock' }
  ) | (
    { id: string | null, attributeType: (
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )>, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionContentAttributeTypeBlock' }
  ) | (
    { id: string | null, categoryType: (
      { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
        { id: string, order: number, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      )> }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'ActionContentCategoryTypeBlock' }
  ) | (
    { id: string | null, fieldLabel: string | null, caption: string | null }
    & { __typename: 'ActionOfficialNameBlock' }
  ) | (
    { id: string | null, fieldLabel: string | null, fieldHelpText: string | null }
    & { __typename: 'ActionRelatedActionsBlock' }
  ) | (
    { id: string | null, reportField: string | null, reportType: (
      { name: string }
      & { __typename: 'ReportType' }
    ) | null, reportsToCompare: Array<(
      { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
        { attribute: (
          { id: string, categories: Array<(
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )>, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, large: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, social: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, iconImage: (
                    { rendition: (
                      { src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )> }
                  & { __typename: 'Category' }
                ) | null, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null }
            & { __typename: 'Category' }
          )>, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeCategoryChoice' }
        ) | (
          { text: string | null, id: string, choice: (
            { id: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          ) | null, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeChoice' }
        ) | (
          { id: string, numericValue: number, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        ) | null, field: (
          { id: string | null }
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
        ) }
        & { __typename: 'ActionAttributeReportValue' }
      ) | (
        { field: (
          { id: string | null }
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
        ) }
        & { __typename: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
      )> | null }
      & { __typename: 'Report' }
    ) | null> | null }
    & { __typename: 'ReportComparisonBlock' }
  ) | null> | null }
  & { __typename: 'ActionContentSectionBlock' }
);

type ActionMainContentBlocksFragment_YzBdkJlHhonWhqjd3WRxe2SdNvKg317QlqgPzcM_Fragment = (
  { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionRelatedActionsBlock' }
);

type ActionMainContentBlocksFragment_UWgtElzWcIrkE20HqBetlMWpkiyr21UnWd1ytrejw0_Fragment = (
  { id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
);

type ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment = (
  { id: string | null, fieldLabel: string | null, caption: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionOfficialNameBlock' }
);

type ActionMainContentBlocksFragment_IndicatorCausalChainBlock_Fragment = (
  { id: string | null, field: string, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'IndicatorCausalChainBlock' }
);

type ActionMainContentBlocksFragment_PlanDatasetsBlock_Fragment = (
  { id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
    { uuid: string }
    & { __typename: 'DatasetSchema' }
  ) }
  & { __typename: 'PlanDatasetsBlock' }
);

type ActionMainContentBlocksFragment_ReportComparisonBlock_Fragment = (
  { id: string | null, reportField: string | null, reportType: (
    { name: string }
    & { __typename: 'ReportType' }
  ) | null, reportsToCompare: Array<(
    { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
      { attribute: (
        { id: string, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )>, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, choice: (
          { id: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      ) | null, field: (
        { id: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { id: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
    )> | null }
    & { __typename: 'Report' }
  ) | null> | null }
  & { __typename: 'ReportComparisonBlock' }
);

export type ActionMainContentBlocksFragmentFragment = ActionMainContentBlocksFragment_ActionContactFormBlock_Fragment | ActionMainContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment | ActionMainContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment | ActionMainContentBlocksFragment_ActionContentSectionBlock_Fragment | ActionMainContentBlocksFragment_YzBdkJlHhonWhqjd3WRxe2SdNvKg317QlqgPzcM_Fragment | ActionMainContentBlocksFragment_UWgtElzWcIrkE20HqBetlMWpkiyr21UnWd1ytrejw0_Fragment | ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment | ActionMainContentBlocksFragment_IndicatorCausalChainBlock_Fragment | ActionMainContentBlocksFragment_PlanDatasetsBlock_Fragment | ActionMainContentBlocksFragment_ReportComparisonBlock_Fragment;

export type ReportComparisonBlockActionContentFragment = (
  { reportField: string | null, reportType: (
    { name: string }
    & { __typename: 'ReportType' }
  ) | null, reportsToCompare: Array<(
    { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
      { attribute: (
        { id: string, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )>, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, choice: (
          { id: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      ) | null, field: (
        { id: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { id: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
    )> | null }
    & { __typename: 'Report' }
  ) | null> | null }
  & { __typename: 'ReportComparisonBlock' }
);

export type ActionCardWithDependencyRoleFragment = (
  { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
    { id: string, name: string }
    & { __typename: 'ActionDependencyRole' }
  ) | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, iconImage: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )>, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier }
    & { __typename: 'ActionStatusSummary' }
  ), implementationPhase: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, primaryOrg: (
    { id: string, abbreviation: string | null, name: string, logo: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, mergedWith: (
    { id: string, identifier: string, plan: (
      { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  ) | null, plan: (
    { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Plan' }
  ) }
  & { __typename: 'Action' }
);

export type GetActionListPageIncludeRelatedQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type GetActionListPageIncludeRelatedQuery = (
  { plan: (
    { actionListPage: (
      { includeRelatedPlans: boolean | null }
      & { __typename: 'ActionListPage' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type GetActionListPageQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  onlyWithActions: Scalars['Boolean']['input'];
}>;


export type GetActionListPageQuery = (
  { plan: (
    { actionListPage: (
      { leadContent: string | null, defaultView: ActionListPageView, headingHierarchyDepth: number, includeRelatedPlans: boolean | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, primaryFilters: Array<(
        { showAllLabel: string | null, field: string, id: string | null, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { field: string, id: string | null }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
              { id: string }
              & { __typename: 'Category' }
            ) | null, common: (
              { id: string }
              & { __typename: 'CommonCategory' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
      )> | null, mainFilters: Array<(
        { showAllLabel: string | null, field: string, id: string | null, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { field: string, id: string | null }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
              { id: string }
              & { __typename: 'Category' }
            ) | null, common: (
              { id: string }
              & { __typename: 'CommonCategory' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
      )> | null, advancedFilters: Array<(
        { showAllLabel: string | null, field: string, id: string | null, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { field: string, id: string | null }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
              { id: string }
              & { __typename: 'Category' }
            ) | null, common: (
              { id: string }
              & { __typename: 'CommonCategory' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
      )> | null }
      & { __typename: 'ActionListPage' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type TemplatedCategoryPageFragmentFragment = (
  { layout: (
    { iconSize: string | null, layoutMainTop: Array<(
      { attributeType: (
        { identifier: string }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    ) | (
      { blocks: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' } | { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' } | { __typename: 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' } | { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' } | { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | { __typename: 'UpdatedAtColumnBlock' } | (
        { value: string }
        & { __typename: 'ChoiceBlock' }
      )> }
      & { __typename: 'CategoryPageProgressBlock' }
    )> | null, layoutMainBottom: Array<(
      { attributeType: (
        { identifier: string }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    ) | { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' } | (
      { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
        { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
          { choiceLabel: string | null, choiceValue: string | null }
          & { __typename: 'FormChoiceBlock' }
        )> }
        & { __typename: 'FormFieldBlock' }
      )> }
      & { __typename: 'CategoryPageContactFormBlock' }
    ) | (
      { id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
        { uuid: string }
        & { __typename: 'DatasetSchema' }
      ) }
      & { __typename: 'CategoryTypeDatasetsBlock' }
    )> | null, layoutAside: Array<(
      { attributeType: (
        { identifier: string }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    )> | null }
    & { __typename: 'CategoryTypePageLevelLayout' }
  ) | null }
  & { __typename: 'CategoryPage' }
);

export type PlanDatasetsBlockFragmentFragment = (
  { uuid: string, schema: (
    { uuid: string, name: string, timeResolution: DatasetSchemaTimeResolution, metrics: Array<(
      { unit: string }
      & { __typename: 'DatasetMetricNode' }
    )>, dimensions: Array<(
      { order: number, dimension: (
        { name: string, uuid: string, categories: Array<(
          { uuid: string, label: string }
          & { __typename: 'DatasetsDimensionCategory' }
        )> }
        & { __typename: 'DatasetsDimension' }
      ) }
      & { __typename: 'DatasetSchemaDimension' }
    )> }
    & { __typename: 'DatasetSchema' }
  ) | null, dataPoints: Array<(
    { uuid: string, value: number | null, date: string, dimensionCategories: Array<(
      { uuid: string, label: string, dimension: (
        { uuid: string }
        & { __typename: 'DatasetsDimension' }
      ) }
      & { __typename: 'DatasetsDimensionCategory' }
    )> }
    & { __typename: 'DataPoint' }
  )> }
  & { __typename: 'Dataset' }
);

export type GetContentPageQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
  onlyWithActions?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetContentPageQuery = (
  { planPage: (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null, body: Array<(
      { id: string | null, blockType: string, field: string }
      & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' }
    ) | (
      { id: string | null, blockType: string, field: string, blocks: Array<(
        { id: string | null, field: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { id: string | null, field: string }
        & { __typename: 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id: string | null, field: string }
        & { __typename: 'CharBlock' }
      )> }
      & { __typename: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { value: string, id: string | null, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> | null }
    & { __typename: 'AccessibilityStatementPage' }
  ) | (
    { leadContent: string | null, defaultView: ActionListPageView, headingHierarchyDepth: number, includeRelatedPlans: boolean | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, primaryFilters: Array<(
      { showAllLabel: string | null, field: string, id: string | null, attributeType: (
        { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'ActionAttributeTypeFilterBlock' }
    ) | (
      { field: string, id: string | null }
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { id: string | null, field: string }
      & { __typename: 'ContinuousActionFilterBlock' }
    )> | null, mainFilters: Array<(
      { showAllLabel: string | null, field: string, id: string | null, attributeType: (
        { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'ActionAttributeTypeFilterBlock' }
    ) | (
      { field: string, id: string | null }
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { id: string | null, field: string }
      & { __typename: 'ContinuousActionFilterBlock' }
    )> | null, advancedFilters: Array<(
      { showAllLabel: string | null, field: string, id: string | null, attributeType: (
        { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'ActionAttributeTypeFilterBlock' }
    ) | (
      { field: string, id: string | null }
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, id: string | null, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { id: string | null, field: string }
      & { __typename: 'ContinuousActionFilterBlock' }
    )> | null }
    & { __typename: 'ActionListPage' }
  ) | (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null, category: (
      { id: string, identifier: string, name: string, kausalPathsNodeUuid: string, leadParagraph: string, color: string, iconSvgUrl: string | null, categoryPage: (
        { id: string | null, urlPath: string }
        & { __typename: 'CategoryPage' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, children: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      )>, parent: (
        { id: string, identifier: string, name: string, color: string, iconSvgUrl: string | null, level: (
          { name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), parent: (
          { identifier: string, name: string, categoryPage: (
            { urlPath: string }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), parent: (
            { identifier: string, name: string, parent: (
              { identifier: string, name: string, categoryPage: (
                { urlPath: string }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), parent: (
                { identifier: string, name: string, categoryPage: (
                  { urlPath: string }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ) }
                & { __typename: 'Category' }
              ) | null }
              & { __typename: 'Category' }
            ) | null, categoryPage: (
              { urlPath: string }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ) }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null, attributes: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, datasets: Array<(
        { uuid: string, schema: (
          { uuid: string, name: string, timeResolution: DatasetSchemaTimeResolution, metrics: Array<(
            { unit: string }
            & { __typename: 'DatasetMetricNode' }
          )>, dimensions: Array<(
            { order: number, dimension: (
              { name: string, uuid: string, categories: Array<(
                { uuid: string, label: string }
                & { __typename: 'DatasetsDimensionCategory' }
              )> }
              & { __typename: 'DatasetsDimension' }
            ) }
            & { __typename: 'DatasetSchemaDimension' }
          )> }
          & { __typename: 'DatasetSchema' }
        ) | null, dataPoints: Array<(
          { uuid: string, value: number | null, date: string, dimensionCategories: Array<(
            { uuid: string, label: string, dimension: (
              { uuid: string }
              & { __typename: 'DatasetsDimension' }
            ) }
            & { __typename: 'DatasetsDimensionCategory' }
          )> }
          & { __typename: 'DataPoint' }
        )> }
        & { __typename: 'Dataset' }
      )> }
      & { __typename: 'Category' }
    ) | null, body: Array<(
      { id: string | null, heading: string | null, helpText: string | null, blockType: string, field: string, categoryFilter: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, groupByCategoryLevel: (
        { id: string }
        & { __typename: 'CategoryLevel' }
      ) | null }
      & { __typename: 'ActionListBlock' }
    ) | (
      { fullWidth: boolean | null, id: string | null, blockType: string, field: string, embed: (
        { html: string | null }
        & { __typename: 'EmbedHTMLValue' }
      ) | null }
      & { __typename: 'AdaptiveEmbedBlock' }
    ) | (
      { style: string | null, heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, categoryType: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null, category: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'CategoryListBlock' }
    ) | (
      { title: string | null, id: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' } | { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' } | { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' } | { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' } | { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | { __typename: 'UpdatedAtColumnBlock' } | (
        { style: string | null, indicator: (
          { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ), latestValue: (
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename: 'IndicatorGroupBlock' }
    ) | (
      { heading: string | null, id: string | null, blockType: string, field: string, questions: Array<(
        { question: string, answer: string }
        & { __typename: 'QuestionBlock' }
      )> | null }
      & { __typename: 'QuestionAnswerBlock' }
    ) | (
      { id: string | null, blockType: string, field: string }
      & { __typename: 'RelatedIndicatorsBlock' }
    ) | (
      { value: string, id: string | null, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> | null, layout: (
      { iconSize: string | null, layoutMainTop: Array<(
        { attributeType: (
          { identifier: string }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      ) | (
        { blocks: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' } | { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' } | { __typename: 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' } | { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' } | { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | { __typename: 'UpdatedAtColumnBlock' } | (
          { value: string }
          & { __typename: 'ChoiceBlock' }
        )> }
        & { __typename: 'CategoryPageProgressBlock' }
      )> | null, layoutMainBottom: Array<(
        { attributeType: (
          { identifier: string }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      ) | { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' } | (
        { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
          { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
            { choiceLabel: string | null, choiceValue: string | null }
            & { __typename: 'FormChoiceBlock' }
          )> }
          & { __typename: 'FormFieldBlock' }
        )> }
        & { __typename: 'CategoryPageContactFormBlock' }
      ) | (
        { id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
          { uuid: string }
          & { __typename: 'DatasetSchema' }
        ) }
        & { __typename: 'CategoryTypeDatasetsBlock' }
      )> | null, layoutAside: Array<(
        { attributeType: (
          { identifier: string }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      )> | null }
      & { __typename: 'CategoryTypePageLevelLayout' }
    ) | null }
    & { __typename: 'CategoryPage' }
  ) | (
    { contentType: string, id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'CategoryTypePage' }
  ) | (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' }
  ) | (
    { leadContent: string | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'PrivacyPolicyPage' }
  ) | (
    { leadParagraph: string | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, headerImage: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, body: Array<(
      { fullWidth: boolean | null, id: string | null, blockType: string, field: string, embed: (
        { html: string | null }
        & { __typename: 'EmbedHTMLValue' }
      ) | null }
      & { __typename: 'AdaptiveEmbedBlock' }
    ) | (
      { styleOverrides: string | null, id: string | null, blockType: string, field: string, cartographyStyle: string | null, account: (
        { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
        & { __typename: 'CartographyProviderCredentials' }
      ) }
      & { __typename: 'CartographyVisualisationBlock' }
    ) | (
      { style: string | null, heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, categoryType: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null, category: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'CategoryListBlock' }
    ) | (
      { heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, valueAttribute: (
        { identifier: string, unit: (
          { shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ), treeMapCategoryType: (
        { identifier: string }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'CategoryTreeMapBlock' }
    ) | (
      { heading: string | null, helpText: string | null, id: string | null, blockType: string, field: string, categoryLevel: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ), groupByCategoryLevel: (
        { id: string }
        & { __typename: 'CategoryLevel' }
      ) | null, categoryBlockType: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, indicators: Array<(
            { id: string, name: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'CategoryTypeLevelListBlock' }
    ) | (
      { id: string | null, blockType: string, field: string, blocks: Array<(
        { blockType: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardRowBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorAreaChartBlock' }
      ) | (
        { id: string | null, barType: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorBarChartBlock' }
      ) | (
        { id: string | null, helpText: string | null, showTotalLine: boolean | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorLineChartBlock' }
      ) | (
        { helpText: string | null, year: number | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorPieChartBlock' }
      ) | (
        { id: string | null, blockType: string, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorSummaryBlock' }
      ) | (
        { text: string | null, blockType: string }
        & { __typename: 'DashboardParagraphBlock' }
      )> }
      & { __typename: 'DashboardRowBlock' }
    ) | (
      { title: string | null, id: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' } | { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' } | { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' } | { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' } | { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | { __typename: 'UpdatedAtColumnBlock' } | (
        { style: string | null, indicator: (
          { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ), latestValue: (
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename: 'IndicatorGroupBlock' }
    ) | (
      { width: string | null, id: string | null, blockType: string, field: string, image: (
        { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'LargeImageBlock' }
    ) | (
      { heading: string | null, helpText: string | null, outcomeNodeId: string | null, id: string | null, blockType: string, field: string }
      & { __typename: 'PathsOutcomeBlock' }
    ) | (
      { heading: string | null, id: string | null, blockType: string, field: string, questions: Array<(
        { question: string, answer: string }
        & { __typename: 'QuestionBlock' }
      )> | null }
      & { __typename: 'QuestionAnswerBlock' }
    ) | (
      { value: string, id: string | null, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> | null, siblings: Array<(
      { id: string | null, title: string, slug: string, live: boolean, urlPath: string }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    )>, parent: (
      { id: string | null, title: string, slug: string, urlPath: string, children: Array<(
        { id: string | null, title: string, slug: string, live: boolean, urlPath: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      )> }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' }
    ) | (
      { childrenUseSecondaryNavigation: boolean | null, id: string | null, title: string, slug: string, urlPath: string, children: Array<(
        { id: string | null, title: string, slug: string, live: boolean, urlPath: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      )> }
      & { __typename: 'EmptyPage' | 'StaticPage' }
    ) | null }
    & { __typename: 'StaticPage' }
  ) | null }
  & { __typename: 'Query' }
);

export type CategoryParentFragmentFragment = (
  { parent: (
    { identifier: string, name: string, categoryPage: (
      { urlPath: string }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type RecursiveCategoryParentFragmentFragment = (
  { parent: (
    { parent: (
      { identifier: string, name: string, parent: (
        { identifier: string, name: string, categoryPage: (
          { urlPath: string }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), parent: (
          { identifier: string, name: string, categoryPage: (
            { urlPath: string }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null, categoryPage: (
        { urlPath: string }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type GetHomePageQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
}>;


export type GetHomePageQuery = (
  { planPage: (
    { id: string | null, slug: string, lastPublishedAt: string | null }
    & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { id: string | null, slug: string, lastPublishedAt: string | null, body: Array<(
      { id: string | null, blockType: string, field: string, cards: Array<(
        { heading: string | null, lead: string | null, category: (
          { id: string, type: (
            { identifier: string }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'ActionCategoryFilterCardBlock' }
      )> | null }
      & { __typename: 'ActionCategoryFilterCardsBlock' }
    ) | (
      { id: string | null, blockType: string, field: string }
      & { __typename: 'ActionHighlightsBlock' | 'ActionStatusGraphsBlock' | 'IndicatorHighlightsBlock' | 'RelatedPlanListBlock' }
    ) | (
      { fullWidth: boolean | null, id: string | null, blockType: string, field: string, embed: (
        { html: string | null }
        & { __typename: 'EmbedHTMLValue' }
      ) | null }
      & { __typename: 'AdaptiveEmbedBlock' }
    ) | (
      { heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, cards: Array<(
        { heading: string | null, content: string | null, link: string | null, image: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'CardBlock' }
      )> | null }
      & { __typename: 'CardListBlock' }
    ) | (
      { style: string | null, heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, categoryType: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, large: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, social: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, iconImage: (
                  { rendition: (
                    { src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, large: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, social: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, iconImage: (
                { rendition: (
                  { src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, large: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null, category: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, large: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'CategoryListBlock' }
    ) | (
      { heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, valueAttribute: (
        { identifier: string, unit: (
          { shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ), treeMapCategoryType: (
        { identifier: string }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'CategoryTreeMapBlock' }
    ) | (
      { id: string | null, blockType: string, field: string, blocks: Array<(
        { blockType: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardRowBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorAreaChartBlock' }
      ) | (
        { id: string | null, barType: string | null, helpText: string | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorBarChartBlock' }
      ) | (
        { id: string | null, helpText: string | null, showTotalLine: boolean | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorLineChartBlock' }
      ) | (
        { helpText: string | null, year: number | null, blockType: string, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorPieChartBlock' }
      ) | (
        { id: string | null, blockType: string, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorSummaryBlock' }
      ) | (
        { text: string | null, blockType: string }
        & { __typename: 'DashboardParagraphBlock' }
      )> }
      & { __typename: 'DashboardRowBlock' }
    ) | (
      { layout: string, heading: string | null, lead: string | null, id: string | null, blockType: string, field: string, image: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, large: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'FrontPageHeroBlock' }
    ) | (
      { title: string | null, id: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' } | { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' } | { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' } | { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' } | { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | { __typename: 'UpdatedAtColumnBlock' } | (
        { style: string | null, indicator: (
          { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ), latestValue: (
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename: 'IndicatorGroupBlock' }
    ) | (
      { title: string | null, body: string | null, id: string | null, blockType: string, field: string, blocks: Array<(
        { id: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id: string | null }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) | (
        { id: string | null }
        & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' }
      ) | (
        { id: string | null }
        & { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' }
      ) | (
        { id: string | null }
        & { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' }
      ) | (
        { id: string | null }
        & { __typename: 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' }
      ) | (
        { id: string | null }
        & { __typename: 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator: (
        { id: string, identifier: string | null, name: string, minValue: number | null, maxValue: number | null, unit: (
          { id: string, shortName: string | null, name: string }
          & { __typename: 'Unit' }
        ), latestValue: (
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        ) | null, values: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, categories: Array<(
            { id: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )> }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, common: (
          { id: string, normalizations: Array<(
            { unit: (
              { shortName: string | null, name: string }
              & { __typename: 'Unit' }
            ), normalizer: (
              { name: string, id: string, identifier: string | null }
              & { __typename: 'CommonIndicator' }
            ) }
            & { __typename: 'CommonIndicatorNormalization' }
          )> }
          & { __typename: 'CommonIndicator' }
        ) | null }
        & { __typename: 'Indicator' }
      ) | null, linkButton: (
        { blockType: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'UpdatedAtColumnBlock' }
      ) | (
        { text: string | null, blockType: string, page: (
          { url: string | null, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename: 'PageLinkBlock' }
      ) | null }
      & { __typename: 'IndicatorShowcaseBlock' }
    ) | (
      { width: string | null, id: string | null, blockType: string, field: string, image: (
        { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'LargeImageBlock' }
    ) | (
      { heading: string | null, helpText: string | null, outcomeNodeId: string | null, id: string | null, blockType: string, field: string }
      & { __typename: 'PathsOutcomeBlock' }
    ) | (
      { value: string, id: string | null, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> }
    & { __typename: 'PlanRootPage' }
  ) | null, plan: (
    { id: string, primaryActionClassification: (
      { categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, color: string, image: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, large: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { live: boolean, id: string | null, title: string, urlPath: string }
          & { __typename: 'CategoryPage' }
        ) | null, level: (
          { name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type GetPlanPageIndicatorListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
}>;


export type GetPlanPageIndicatorListQuery = (
  { planPage: (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { leadContent: string | null, displayInsights: boolean | null, displayLevel: boolean | null, includeRelatedPlans: boolean | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'IndicatorListPage' }
  ) | null }
  & { __typename: 'Query' }
);

export type IndicatorListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  relatedPlanIndicators: Scalars['Boolean']['input'];
}>;


export type IndicatorListQuery = (
  { plan: (
    { id: string, hasIndicatorRelationships: boolean | null, features: (
      { hasActionPrimaryOrgs: boolean }
      & { __typename: 'PlanFeatures' }
    ), categoryTypes: Array<(
      { name: string, id: string, identifier: string, categories: Array<(
        { id: string, identifier: string, order: number, name: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common?: (
          { type: (
            { identifier: string, name: string }
            & { __typename: 'CommonCategoryType' }
          ) }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    )> }
    & { __typename: 'Plan' }
  ) | null, planIndicators?: Array<(
    { level: string | null, id: string, name: string, timeResolution: IndicatorTimeResolution, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, relatedCauses: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, causalIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )>, relatedEffects: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null, categories: Array<(
      { id: string, name: string, parent: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, type: (
        { id: string, identifier: string }
        & { __typename: 'CategoryType' }
      ), common: (
        { id: string, type: (
          { name: string, identifier: string }
          & { __typename: 'CommonCategoryType' }
        ) }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, latestGraph: (
      { id: string }
      & { __typename: 'IndicatorGraph' }
    ) | null, latestValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, dimensions: Array<(
      { dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, unit: (
      { shortName: string | null }
      & { __typename: 'Unit' }
    ), plans: Array<(
      { id: string }
      & { __typename: 'Plan' }
    )> }
    & { __typename: 'Indicator' }
  )> | null, relatedPlanIndicators?: Array<(
    { level: string | null, id: string, name: string, timeResolution: IndicatorTimeResolution, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, relatedCauses: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, causalIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )>, relatedEffects: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null, categories: Array<(
      { id: string, name: string, parent: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, type: (
        { id: string, identifier: string }
        & { __typename: 'CategoryType' }
      ), common: (
        { id: string, type: (
          { name: string, identifier: string }
          & { __typename: 'CommonCategoryType' }
        ) }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, latestGraph: (
      { id: string }
      & { __typename: 'IndicatorGraph' }
    ) | null, latestValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, dimensions: Array<(
      { dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, unit: (
      { shortName: string | null }
      & { __typename: 'Unit' }
    ), plans: Array<(
      { id: string }
      & { __typename: 'Plan' }
    )> }
    & { __typename: 'Indicator' }
  )> | null }
  & { __typename: 'Query' }
);

export type IndicatorDetailsQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>;
  plan: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorDetailsQuery = (
  { indicator: (
    { id: string, identifier: string | null, name: string, level: string | null, description: string | null, timeResolution: IndicatorTimeResolution, desiredTrend: IndicatorDesiredTrend | null, organization: (
      { id: string, name: string, abbreviation: string | null, classification: (
        { id: string, name: string }
        & { __typename: 'OrganizationClass' }
      ) | null, logo: (
        { id: string, rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ), categories: Array<(
      { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, iconImage: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), parent: (
        { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, iconImage: (
              { rendition: (
                { src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ) }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, iconImage: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, iconImage: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )>, common: (
      { id: string, indicators: Array<(
        { id: string, identifier: string | null, organization: (
          { id: string, name: string, abbreviation: string | null, classification: (
            { id: string, name: string }
            & { __typename: 'OrganizationClass' }
          ) | null, logo: (
            { id: string, rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'Indicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null, unit: (
      { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
      & { __typename: 'Unit' }
    ), latestGraph: (
      { id: string }
      & { __typename: 'IndicatorGraph' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, actions: Array<(
      { id: string, identifier: string, name: string, color: string | null, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), categories: Array<(
        { id: string, identifier: string, name: string, image: (
          { rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Category' }
      )>, impact: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImpact' }
      ) | null }
      & { __typename: 'Action' }
    )>, relatedCauses: Array<(
      { id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, causalIndicator: (
        { id: string, name: string, level: string | null, plans: Array<(
          { identifier: string, viewUrl: string | null, parent: (
            { identifier: string }
            & { __typename: 'Plan' }
          ) | null }
          & { __typename: 'Plan' }
        )> }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'RelatedIndicator' }
    )>, relatedEffects: Array<(
      { id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, effectIndicator: (
        { id: string, name: string, level: string | null, plans: Array<(
          { identifier: string, viewUrl: string | null, parent: (
            { identifier: string }
            & { __typename: 'Plan' }
          ) | null }
          & { __typename: 'Plan' }
        )> }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'RelatedIndicator' }
    )>, plans: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, versionName: string, publishedAt: string | null, supersededBy: (
        { id: string }
        & { __typename: 'Plan' }
      ) | null, allRelatedPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, relatedPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, supersededPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, supersedingPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, parent: (
        { id: string }
        & { __typename: 'Plan' }
      ) | null, children: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, copyOf: (
        { id: string }
        & { __typename: 'Plan' }
      ) | null, copies: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )> }
      & { __typename: 'Plan' }
    )> }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionsTableRowFragmentFragment = (
  { id: string, identifier: string, name: string, color: string | null, completion: number | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, implementationPhase: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier }
    & { __typename: 'ActionStatusSummary' }
  ), categories: Array<(
    { id: string, identifier: string, name: string, image: (
      { rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Category' }
  )>, impact: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImpact' }
  ) | null }
  & { __typename: 'Action' }
);

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  plan: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
}>;


export type OrganizationDetailsQuery = (
  { organization: (
    { id: string, name: string, abbreviation: string | null, distinctName: string | null, description: string, url: string, actionCount: number, contactPersonCount: number, classification: (
      { id: string, name: string, identifier: string }
      & { __typename: 'OrganizationClass' }
    ) | null, ancestors: Array<(
      { id: string }
      & { __typename: 'Organization' }
    ) | null> | null, plansWithActionResponsibilities: Array<(
      { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, organization: (
        { id: string, name: string, abbreviation: string | null }
        & { __typename: 'Organization' }
      ), primaryOrgs: Array<(
        { id: string, name: string }
        & { __typename: 'Organization' }
      )>, actionImpacts: Array<(
        { id: string }
        & { __typename: 'ActionImpact' }
      )>, actionStatusSummaries: Array<(
        { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
        & { __typename: 'ActionStatusSummary' }
      )>, image: (
        { rendition: (
          { id: string, src: string, alt: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number }
        & { __typename: 'ActionImplementationPhase' }
      )>, actionStatuses: Array<(
        { id: string, identifier: string, name: string, isCompleted: boolean }
        & { __typename: 'ActionStatus' }
      )>, features: (
        { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
        & { __typename: 'PlanFeatures' }
      ), actions: Array<(
        { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, attributes: Array<(
          { id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeCategoryChoice' }
        ) | (
          { text: string | null, id: string, choice: (
            { id: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          ) | null, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeChoice' }
        ) | (
          { id: string, numericValue: number, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, plan: (
          { id: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ), statusSummary: (
          { identifier: ActionStatusSummaryIdentifier }
          & { __typename: 'ActionStatusSummary' }
        ), schedule: Array<(
          { id: string }
          & { __typename: 'ActionSchedule' }
        )>, status: (
          { id: string, identifier: string, name: string, color: string }
          & { __typename: 'ActionStatus' }
        ) | null, implementationPhase: (
          { id: string, identifier: string, name: string, order: number }
          & { __typename: 'ActionImplementationPhase' }
        ) | null, impact: (
          { id: string, identifier: string }
          & { __typename: 'ActionImpact' }
        ) | null, categories: Array<(
          { id: string }
          & { __typename: 'Category' }
        )>, responsibleParties: Array<(
          { id: string, organization: (
            { id: string, abbreviation: string | null, name: string }
            & { __typename: 'Organization' }
          ) }
          & { __typename: 'ActionResponsibleParty' }
        )>, primaryOrg: (
          { id: string, abbreviation: string | null, name: string, logo: (
            { rendition: (
              { src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null, tasks: Array<(
          { id: string, state: ActionTaskState, dueAt: string }
          & { __typename: 'ActionTask' }
        )>, mergedWith: (
          { id: string, identifier: string, plan: (
            { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
            & { __typename: 'Plan' }
          ) }
          & { __typename: 'Action' }
        ) | null, indicators: Array<(
          { id: string, goals: Array<(
            { id: string }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        )>, relatedIndicators: Array<(
          { id: string, indicatesActionProgress: boolean, indicator: (
            { id: string, goals: Array<(
              { id: string }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'ActionIndicator' }
        )> }
        & { __typename: 'Action' }
      )>, generalContent: (
        { organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename: 'SiteGeneralContent' }
      ) }
      & { __typename: 'Plan' }
    )>, parent: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ) | null, logo: (
      { id: string, altText: string, rendition: (
        { id: string, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, plan: (
    { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, actionListPage: (
      { dashboardColumns: Array<(
        { columnLabel: string | null }
        & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'ScheduleContinuousColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { columnLabel: string | null, field: string, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) | null }
        & { __typename: 'FieldColumnBlock' }
      )> | null }
      & { __typename: 'ActionListPage' }
    ) | null, organization: (
      { id: string, name: string, abbreviation: string | null }
      & { __typename: 'Organization' }
    ), primaryOrgs: Array<(
      { id: string, name: string }
      & { __typename: 'Organization' }
    )>, actionImpacts: Array<(
      { id: string }
      & { __typename: 'ActionImpact' }
    )>, actionStatusSummaries: Array<(
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    )>, image: (
      { rendition: (
        { id: string, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    )>, actionStatuses: Array<(
      { id: string, identifier: string, name: string, isCompleted: boolean }
      & { __typename: 'ActionStatus' }
    )>, features: (
      { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
      & { __typename: 'PlanFeatures' }
    ), actions: Array<(
      { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, attributes: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, choice: (
          { id: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, plan: (
        { id: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ), statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), schedule: Array<(
        { id: string }
        & { __typename: 'ActionSchedule' }
      )>, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, implementationPhase: (
        { id: string, identifier: string, name: string, order: number }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, impact: (
        { id: string, identifier: string }
        & { __typename: 'ActionImpact' }
      ) | null, categories: Array<(
        { id: string }
        & { __typename: 'Category' }
      )>, responsibleParties: Array<(
        { id: string, organization: (
          { id: string, abbreviation: string | null, name: string }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'ActionResponsibleParty' }
      )>, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { rendition: (
            { src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, tasks: Array<(
        { id: string, state: ActionTaskState, dueAt: string }
        & { __typename: 'ActionTask' }
      )>, mergedWith: (
        { id: string, identifier: string, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, indicators: Array<(
        { id: string, goals: Array<(
          { id: string }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename: 'Indicator' }
      )>, relatedIndicators: Array<(
        { id: string, indicatesActionProgress: boolean, indicator: (
          { id: string, goals: Array<(
            { id: string }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'ActionIndicator' }
      )> }
      & { __typename: 'Action' }
    )>, generalContent: (
      { organizationTerm: SiteGeneralContentOrganizationTerm }
      & { __typename: 'SiteGeneralContent' }
    ) }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type OrgContentPlanFragment = (
  { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, organization: (
    { id: string, name: string, abbreviation: string | null }
    & { __typename: 'Organization' }
  ), primaryOrgs: Array<(
    { id: string, name: string }
    & { __typename: 'Organization' }
  )>, actionImpacts: Array<(
    { id: string }
    & { __typename: 'ActionImpact' }
  )>, actionStatusSummaries: Array<(
    { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
    & { __typename: 'ActionStatusSummary' }
  )>, image: (
    { rendition: (
      { id: string, src: string, alt: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, actionImplementationPhases: Array<(
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'ActionImplementationPhase' }
  )>, actionStatuses: Array<(
    { id: string, identifier: string, name: string, isCompleted: boolean }
    & { __typename: 'ActionStatus' }
  )>, features: (
    { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
    & { __typename: 'PlanFeatures' }
  ), actions: Array<(
    { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, attributes: Array<(
      { id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, choice: (
        { id: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, plan: (
      { id: string, viewUrl: string | null }
      & { __typename: 'Plan' }
    ), statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), schedule: Array<(
      { id: string }
      & { __typename: 'ActionSchedule' }
    )>, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, implementationPhase: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, impact: (
      { id: string, identifier: string }
      & { __typename: 'ActionImpact' }
    ) | null, categories: Array<(
      { id: string }
      & { __typename: 'Category' }
    )>, responsibleParties: Array<(
      { id: string, organization: (
        { id: string, abbreviation: string | null, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: string }
      & { __typename: 'ActionTask' }
    )>, mergedWith: (
      { id: string, identifier: string, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, indicators: Array<(
      { id: string, goals: Array<(
        { id: string }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename: 'Indicator' }
    )>, relatedIndicators: Array<(
      { id: string, indicatesActionProgress: boolean, indicator: (
        { id: string, goals: Array<(
          { id: string }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'ActionIndicator' }
    )> }
    & { __typename: 'Action' }
  )>, generalContent: (
    { organizationTerm: SiteGeneralContentOrganizationTerm }
    & { __typename: 'SiteGeneralContent' }
  ) }
  & { __typename: 'Plan' }
);

export type GetPlanContextQueryVariables = Exact<{
  identifier: InputMaybe<Scalars['ID']['input']>;
  hostname: InputMaybe<Scalars['String']['input']>;
  clientUrl: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPlanContextQuery = (
  { plan: (
    { id: string, identifier: string, name: string, shortName: string | null, versionName: string, themeIdentifier: string | null, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers: boolean, publishedAt: string | null, kausalPathsInstanceUuid: string, viewUrl: string | null, actionReportExportViewUrl: string | null, serveFileBaseUrl: string, adminUrl: string | null, accessibilityStatementUrl: string | null, externalFeedbackUrl: string | null, primaryActionClassification: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean, common: (
        { identifier: string }
        & { __typename: 'CommonCategoryType' }
      ) | null }
      & { __typename: 'CategoryType' }
    ) | null, secondaryActionClassification: (
      { id: string, identifier: string }
      & { __typename: 'CategoryType' }
    ) | null, domain: (
      { id: string, basePath: string | null, googleSiteVerificationTag: string | null, matomoAnalyticsUrl: string | null }
      & { __typename: 'PlanDomain' }
    ) | null, image: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, large: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, actionSchedules: Array<(
      { id: string, name: string, beginsAt: string, endsAt: string | null }
      & { __typename: 'ActionSchedule' }
    )>, actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number, color: string }
      & { __typename: 'ActionImplementationPhase' }
    )>, actionDependencyRoles: Array<(
      { id: string, name: string }
      & { __typename: 'ActionDependencyRole' }
    )>, actionImpacts: Array<(
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImpact' }
    )>, actionStatuses: Array<(
      { id: string, identifier: string, name: string, isCompleted: boolean }
      & { __typename: 'ActionStatus' }
    )>, actionStatusSummaries: Array<(
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    )>, actionTimelinessClasses: Array<(
      { identifier: ActionTimelinessIdentifier, label: string, color: string, sentiment: Sentiment, comparison: Comparison, days: number }
      & { __typename: 'ActionTimeliness' }
    )>, impactGroups: Array<(
      { id: string }
      & { __typename: 'ImpactGroup' }
    )>, primaryOrgs: Array<(
      { id: string }
      & { __typename: 'Organization' }
    )>, generalContent: (
      { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm, sitewideAnnouncement: string | null }
      & { __typename: 'SiteGeneralContent' }
    ), mainMenu: (
      { items: Array<(
        { linkText: string, url: string }
        & { __typename: 'ExternalLinkMenuItem' }
      ) | (
        { id: string, page: (
          { title: string, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent: (
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename: 'PageMenuItem' }
        ) | null }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'MainMenu' }
    ) | null, footer: (
      { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
        { id: string, page: (
          { title: string, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent: (
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename: 'PageMenuItem' }
        ) | null, children: Array<(
          { id: string, page: (
            { title: string, urlPath: string, slug: string }
            & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename: 'PageMenuItem' }
        )> | null }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'Footer' }
    ) | null, features: (
      { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, contactPersonsShowPicture: boolean, contactPersonsShowOrganizationAncestors: boolean, enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean }
      & { __typename: 'PlanFeatures' }
    ), allRelatedPlans: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, organization: (
        { name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'Plan' }
    )>, supersededBy: (
      { name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
      & { __typename: 'Plan' }
    ) | null, supersededPlans: Array<(
      { name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
      & { __typename: 'Plan' }
    )>, supersedingPlans: Array<(
      { name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
      & { __typename: 'Plan' }
    )>, children: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, organization: (
        { name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'Plan' }
    )>, parent: (
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, generalContent: (
        { id: string, siteTitle: string }
        & { __typename: 'SiteGeneralContent' }
      ), image: (
        { rendition: (
          { src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, organization: (
        { name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'Plan' }
    ) | null, additionalLinks: (
      { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
        { id: string, crossPlanLink: boolean | null, viewUrl: string | null, page: (
          { title: string, url: string | null, urlPath: string, slug: string, body: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'RichTextBlock' } | (
            { blocks: Array<(
              { field: string }
              & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
            ) | (
              { field: string }
              & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) | (
              { field: string }
              & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' }
            ) | (
              { field: string }
              & { __typename: 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' }
            ) | (
              { field: string }
              & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' }
            ) | (
              { field: string }
              & { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
            ) | (
              { field: string }
              & { __typename: 'UpdatedAtColumnBlock' }
            ) | (
              { value: string, field: string }
              & { __typename: 'CharBlock' }
            )> }
            & { __typename: 'AccessibilityStatementContactInformationBlock' }
          )> | null }
          & { __typename: 'AccessibilityStatementPage' }
        ) | (
          { title: string, url: string | null, urlPath: string, slug: string }
          & { __typename: 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'AdditionalLinks' }
    ) | null, actionListPage: (
      { includeRelatedPlans: boolean | null, actionDateFormat: string | null, taskDateFormat: string | null }
      & { __typename: 'ActionListPage' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null, workflowStates: Array<(
    { id: string, description: string | null }
    & { __typename: 'WorkflowStateDescription' }
  ) | null> | null }
  & { __typename: 'Query' }
);

export type PlanContextFragment = (
  { id: string, identifier: string, name: string, shortName: string | null, versionName: string, themeIdentifier: string | null, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers: boolean, publishedAt: string | null, kausalPathsInstanceUuid: string, viewUrl: string | null, actionReportExportViewUrl: string | null, serveFileBaseUrl: string, adminUrl: string | null, accessibilityStatementUrl: string | null, externalFeedbackUrl: string | null, primaryActionClassification: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean, common: (
      { identifier: string }
      & { __typename: 'CommonCategoryType' }
    ) | null }
    & { __typename: 'CategoryType' }
  ) | null, secondaryActionClassification: (
    { id: string, identifier: string }
    & { __typename: 'CategoryType' }
  ) | null, domain: (
    { id: string, basePath: string | null, googleSiteVerificationTag: string | null, matomoAnalyticsUrl: string | null }
    & { __typename: 'PlanDomain' }
  ) | null, image: (
    { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, large: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, social: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, actionSchedules: Array<(
    { id: string, name: string, beginsAt: string, endsAt: string | null }
    & { __typename: 'ActionSchedule' }
  )>, actionImplementationPhases: Array<(
    { id: string, identifier: string, name: string, order: number, color: string }
    & { __typename: 'ActionImplementationPhase' }
  )>, actionDependencyRoles: Array<(
    { id: string, name: string }
    & { __typename: 'ActionDependencyRole' }
  )>, actionImpacts: Array<(
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'ActionImpact' }
  )>, actionStatuses: Array<(
    { id: string, identifier: string, name: string, isCompleted: boolean }
    & { __typename: 'ActionStatus' }
  )>, actionStatusSummaries: Array<(
    { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
    & { __typename: 'ActionStatusSummary' }
  )>, actionTimelinessClasses: Array<(
    { identifier: ActionTimelinessIdentifier, label: string, color: string, sentiment: Sentiment, comparison: Comparison, days: number }
    & { __typename: 'ActionTimeliness' }
  )>, impactGroups: Array<(
    { id: string }
    & { __typename: 'ImpactGroup' }
  )>, primaryOrgs: Array<(
    { id: string }
    & { __typename: 'Organization' }
  )>, generalContent: (
    { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm, sitewideAnnouncement: string | null }
    & { __typename: 'SiteGeneralContent' }
  ), mainMenu: (
    { items: Array<(
      { linkText: string, url: string }
      & { __typename: 'ExternalLinkMenuItem' }
    ) | (
      { id: string, page: (
        { title: string, urlPath: string, slug: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ), parent: (
        { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
        & { __typename: 'PageMenuItem' }
      ) | null }
      & { __typename: 'PageMenuItem' }
    )> }
    & { __typename: 'MainMenu' }
  ) | null, footer: (
    { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
      { id: string, page: (
        { title: string, urlPath: string, slug: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ), parent: (
        { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
        & { __typename: 'PageMenuItem' }
      ) | null, children: Array<(
        { id: string, page: (
          { title: string, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename: 'PageMenuItem' }
      )> | null }
      & { __typename: 'PageMenuItem' }
    )> }
    & { __typename: 'Footer' }
  ) | null, features: (
    { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, contactPersonsShowPicture: boolean, contactPersonsShowOrganizationAncestors: boolean, enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean }
    & { __typename: 'PlanFeatures' }
  ), allRelatedPlans: Array<(
    { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, organization: (
      { name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Plan' }
  )>, supersededBy: (
    { name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
    & { __typename: 'Plan' }
  ) | null, supersededPlans: Array<(
    { name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
    & { __typename: 'Plan' }
  )>, supersedingPlans: Array<(
    { name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
    & { __typename: 'Plan' }
  )>, children: Array<(
    { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, organization: (
      { name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Plan' }
  )>, parent: (
    { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, generalContent: (
      { id: string, siteTitle: string }
      & { __typename: 'SiteGeneralContent' }
    ), image: (
      { rendition: (
        { src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, organization: (
      { name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Plan' }
  ) | null, additionalLinks: (
    { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
      { id: string, crossPlanLink: boolean | null, viewUrl: string | null, page: (
        { title: string, url: string | null, urlPath: string, slug: string, body: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'RichTextBlock' } | (
          { blocks: Array<(
            { field: string }
            & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
          ) | (
            { field: string }
            & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
          ) | (
            { field: string }
            & { __typename: 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' }
          ) | (
            { field: string }
            & { __typename: 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' }
          ) | (
            { field: string }
            & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' }
          ) | (
            { field: string }
            & { __typename: 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
          ) | (
            { field: string }
            & { __typename: 'UpdatedAtColumnBlock' }
          ) | (
            { value: string, field: string }
            & { __typename: 'CharBlock' }
          )> }
          & { __typename: 'AccessibilityStatementContactInformationBlock' }
        )> | null }
        & { __typename: 'AccessibilityStatementPage' }
      ) | (
        { title: string, url: string | null, urlPath: string, slug: string }
        & { __typename: 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ) }
      & { __typename: 'PageMenuItem' }
    )> }
    & { __typename: 'AdditionalLinks' }
  ) | null, actionListPage: (
    { includeRelatedPlans: boolean | null, actionDateFormat: string | null, taskDateFormat: string | null }
    & { __typename: 'ActionListPage' }
  ) | null }
  & { __typename: 'Plan' }
);

export type GetPlansByHostnameQueryVariables = Exact<{
  hostname: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPlansByHostnameQuery = (
  { plansForHostname: Array<(
    { id: string, identifier: string, otherLanguages: Array<string>, primaryLanguage: string, statusMessage: string | null, loginEnabled: boolean | null, domain: (
      { hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null, domains: Array<(
      { hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null> | null }
    & { __typename: 'Plan' }
  ) | (
    { primaryLanguage: string, statusMessage: string | null, loginEnabled: boolean | null, domain: (
      { hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null, domains: Array<(
      { hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null> | null }
    & { __typename: 'RestrictedPlanNode' }
  ) | null> | null }
  & { __typename: 'Query' }
);

export type IndicatorSparklineGraphDataQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>;
  plan: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorSparklineGraphDataQuery = (
  { plan: (
    { scenarios: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'Scenario' }
    )> }
    & { __typename: 'Plan' }
  ) | null, indicator: (
    { id: string, name: string, timeResolution: IndicatorTimeResolution, showTrendline: boolean, desiredTrend: IndicatorDesiredTrend | null, reference: string | null, minValue: number | null, maxValue: number | null, organization: (
      { id: string, name: string, abbreviation: string | null }
      & { __typename: 'Organization' }
    ), quantity: (
      { id: string, name: string }
      & { __typename: 'Quantity' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, dimensions: Array<(
      { dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
      & { __typename: 'Unit' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, indicators: Array<(
        { id: string, timeResolution: IndicatorTimeResolution, minValue: number | null, maxValue: number | null, organization: (
          { id: string, name: string, abbreviation: string | null }
          & { __typename: 'Organization' }
        ), quantity: (
          { id: string, name: string }
          & { __typename: 'Quantity' }
        ) | null, values: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, categories: Array<(
            { id: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'IndicatorValue' }
        )>, dimensions: Array<(
          { dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string }
              & { __typename: 'DimensionCategory' }
            )> }
            & { __typename: 'Dimension' }
          ) }
          & { __typename: 'IndicatorDimension' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, scenario: (
            { id: string }
            & { __typename: 'Scenario' }
          ) | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'Query' }
);
