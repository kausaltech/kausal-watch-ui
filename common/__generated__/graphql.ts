export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  JSONString: any;
  PointScalar: any;
  PositiveInt: any;
  UUID: any;
};

export type AccessibilityStatementComplianceStatusBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementComplianceStatusBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type AccessibilityStatementContactFormBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementContactFormBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type AccessibilityStatementContactInformationBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementContactInformationBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type AccessibilityStatementPage = PageInterface & {
  __typename?: 'AccessibilityStatementPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadContent?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type AccessibilityStatementPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type AccessibilityStatementPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type AccessibilityStatementPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type AccessibilityStatementPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type AccessibilityStatementPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type AccessibilityStatementPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type AccessibilityStatementPreparationInformationBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementPreparationInformationBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

/** One action/measure tracked in an action plan. */
export type Action = {
  __typename?: 'Action';
  adminButtons: Array<AdminButton>;
  attributes: Array<AttributeInterface>;
  categories: Array<Category>;
  color?: Maybe<Scalars['String']>;
  /** The completion percentage for this action */
  completion?: Maybe<Scalars['Int']>;
  contactPersons: Array<ActionContactPerson>;
  /** Format of action start and end dates shown in the public UI.             The default for all actions can be specified on the actions page. */
  dateFormat?: Maybe<ActionDateFormat>;
  /** What does this action involve in more detail? */
  description?: Maybe<Scalars['String']>;
  editUrl?: Maybe<Scalars['String']>;
  /** The date when implementation of this action ends */
  endDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  /** The identifier for this action (e.g. number) */
  identifier: Scalars['String'];
  image?: Maybe<Image>;
  /** The impact of this action */
  impact?: Maybe<ActionImpact>;
  impactGroups: Array<ImpactGroupAction>;
  implementationPhase?: Maybe<ActionImplementationPhase>;
  indicators: Array<Indicator>;
  leadParagraph: Scalars['String'];
  links: Array<ActionLink>;
  /** Describe the reason why this action has has this status */
  manualStatusReason?: Maybe<Scalars['String']>;
  /** Set if this action is merged with another action */
  mergedActions: Array<Action>;
  /** Set if this action is merged with another action */
  mergedWith?: Maybe<Action>;
  monitoringQualityPoints: Array<MonitoringQualityPoint>;
  name: Scalars['String'];
  nextAction?: Maybe<Action>;
  /** The name as approved by an official party */
  officialName?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  plan: Plan;
  previousAction?: Maybe<Action>;
  primaryOrg?: Maybe<Organization>;
  relatedActions: Array<Action>;
  relatedIndicators: Array<ActionIndicator>;
  responsibleParties: Array<ActionResponsibleParty>;
  schedule: Array<ActionSchedule>;
  /** Set if the action does not have a start or an end date */
  scheduleContinuous: Scalars['Boolean'];
  similarActions?: Maybe<Array<Maybe<Action>>>;
  /** The date when implementation of this action starts */
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ActionStatus>;
  statusSummary: ActionStatusSummary;
  statusUpdates: Array<ActionStatusUpdate>;
  /** Set if this action is superseded by another action */
  supersededActions: Array<Action>;
  /** Set if this action is superseded by another action */
  supersededBy?: Maybe<Action>;
  tasks: Array<ActionTask>;
  timeliness: ActionTimeliness;
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['UUID'];
  viewUrl: Scalars['String'];
};


/** One action/measure tracked in an action plan. */
export type ActionAttributesArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** One action/measure tracked in an action plan. */
export type ActionCategoriesArgs = {
  categoryType?: InputMaybe<Scalars['ID']>;
};


/** One action/measure tracked in an action plan. */
export type ActionNameArgs = {
  hyphenated?: InputMaybe<Scalars['Boolean']>;
};


/** One action/measure tracked in an action plan. */
export type ActionViewUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']>;
};

export type ActionAsideContentBlock = ActionContactPersonsBlock | ActionContentAttributeTypeBlock | ActionContentCategoryTypeBlock | ActionResponsiblePartiesBlock | ActionScheduleBlock;

export type ActionAttributeReportValue = ReportValueInterface & {
  __typename?: 'ActionAttributeReportValue';
  attribute?: Maybe<AttributeInterface>;
  field: ReportFieldBlock;
};

export type ActionAttributeTypeFilterBlock = StreamFieldInterface & {
  __typename?: 'ActionAttributeTypeFilterBlock';
  attributeType: AttributeType;
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  showAllLabel?: Maybe<Scalars['String']>;
};

export type ActionAttributeTypeReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionAttributeTypeReportFieldBlock';
  attributeType: AttributeType;
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionCategoryFilterCardBlock = StreamFieldInterface & {
  __typename?: 'ActionCategoryFilterCardBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  category?: Maybe<Category>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lead?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionCategoryFilterCardsBlock = StreamFieldInterface & {
  __typename?: 'ActionCategoryFilterCardsBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  cards?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionCategoryReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionCategoryReportFieldBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  categoryType: CategoryType;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionCategoryReportValue = ReportValueInterface & {
  __typename?: 'ActionCategoryReportValue';
  category?: Maybe<Category>;
  field: ReportFieldBlock;
};

export type ActionContactFormBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContactFormBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

/** A Person acting as a contact for an action */
export type ActionContactPerson = {
  __typename?: 'ActionContactPerson';
  action: Action;
  id: Scalars['ID'];
  order: Scalars['Int'];
  person: Person;
  /** Is this person the primary contact person for the action? */
  primaryContact: Scalars['Boolean'];
};

export type ActionContactPersonsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContactPersonsBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionContentAttributeTypeBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContentAttributeTypeBlock';
  attributeType: AttributeType;
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionContentCategoryTypeBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContentCategoryTypeBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  categoryType: CategoryType;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionContentSectionBlock = StreamFieldInterface & {
  __typename?: 'ActionContentSectionBlock';
  blockType: Scalars['String'];
  blocks?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  helpText?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  layout?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionDashboardColumnBlock = IdentifierColumnBlock | ImpactColumnBlock | ImplementationPhaseColumnBlock | IndicatorsColumnBlock | NameColumnBlock | OrganizationColumnBlock | ResponsiblePartiesColumnBlock | StatusColumnBlock | TasksColumnBlock | UpdatedAtColumnBlock;

export enum ActionDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

export type ActionDescriptionBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionDescriptionBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionHighlightsBlock = StreamFieldInterface & {
  __typename?: 'ActionHighlightsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

/** An impact classification for an action in an action plan. */
export type ActionImpact = {
  __typename?: 'ActionImpact';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  plan: Plan;
};

export type ActionImplementationPhase = {
  __typename?: 'ActionImplementationPhase';
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  plan: Plan;
};

export type ActionImplementationPhaseFilterBlock = StreamFieldInterface & {
  __typename?: 'ActionImplementationPhaseFilterBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionImplementationPhaseReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionImplementationPhaseReportFieldBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionImplementationPhaseReportValue = ReportValueInterface & {
  __typename?: 'ActionImplementationPhaseReportValue';
  field: ReportFieldBlock;
  implementationPhase?: Maybe<ActionImplementationPhase>;
};

/** Link between an action and an indicator. */
export type ActionIndicator = {
  __typename?: 'ActionIndicator';
  action: Action;
  /** What type of effect should the action cause? */
  effectType: ActionIndicatorEffectType;
  id: Scalars['ID'];
  /** Set if the indicator should be used to determine action progress */
  indicatesActionProgress: Scalars['Boolean'];
  indicator: Indicator;
};

export enum ActionIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES'
}

export type ActionLeadParagraphBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionLeadParagraphBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

/** A link related to an action. */
export type ActionLink = {
  __typename?: 'ActionLink';
  action: Action;
  id: Scalars['ID'];
  order: Scalars['Int'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ActionLinksBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionLinksBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionListBlock = StreamFieldInterface & {
  __typename?: 'ActionListBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  categoryFilter?: Maybe<Category>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionListFilterBlock = ActionAttributeTypeFilterBlock | ActionImplementationPhaseFilterBlock | ActionScheduleFilterBlock | ActionStatusFilterBlock | CategoryTypeFilterBlock | PlanFilterBlock | PrimaryOrganizationFilterBlock | ResponsiblePartyFilterBlock;

export type ActionListPage = PageInterface & {
  __typename?: 'ActionListPage';
  actionDateFormat?: Maybe<Scalars['String']>;
  advancedFilters?: Maybe<Array<ActionListFilterBlock>>;
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  dashboardColumns?: Maybe<Array<ActionDashboardColumnBlock>>;
  defaultView: ActionListPageView;
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  detailsAside?: Maybe<Array<ActionAsideContentBlock>>;
  detailsMainBottom?: Maybe<Array<ActionMainContentBlock>>;
  detailsMainTop?: Maybe<Array<ActionMainContentBlock>>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  headingHierarchyDepth: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  includeRelatedPlans?: Maybe<Scalars['Boolean']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadContent?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  mainFilters?: Maybe<Array<ActionListFilterBlock>>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  primaryFilters?: Maybe<Array<ActionListFilterBlock>>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  taskDateFormat?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type ActionListPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ActionListPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ActionListPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ActionListPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ActionListPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ActionListPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export enum ActionListPageView {
  Cards = 'CARDS',
  Dashboard = 'DASHBOARD'
}

export type ActionMainContentBlock = ActionContactFormBlock | ActionContentAttributeTypeBlock | ActionContentCategoryTypeBlock | ActionContentSectionBlock | ActionDescriptionBlock | ActionLeadParagraphBlock | ActionLinksBlock | ActionMergedActionsBlock | ActionOfficialNameBlock | ActionRelatedActionsBlock | ActionRelatedIndicatorsBlock | ActionTasksBlock | ReportComparisonBlock;

export type ActionMainContentSectionElementBlock = ActionContentAttributeTypeBlock | ActionContentCategoryTypeBlock;

export type ActionMergedActionsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionMergedActionsBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionOfficialNameBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionOfficialNameBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  caption?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionRelatedActionsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionRelatedActionsBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionRelatedIndicatorsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionRelatedIndicatorsBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionResponsiblePartiesBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionResponsiblePartiesBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionResponsibleParty = {
  __typename?: 'ActionResponsibleParty';
  action: Action;
  id: Scalars['ID'];
  order: Scalars['Int'];
  organization: Organization;
  role?: Maybe<ActionResponsiblePartyRole>;
  /** The responsibility domain for the organization */
  specifier: Scalars['String'];
};

export type ActionResponsiblePartyReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionResponsiblePartyReportFieldBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionResponsiblePartyReporteportValue = ReportValueInterface & {
  __typename?: 'ActionResponsiblePartyReporteportValue';
  field: ReportFieldBlock;
  responsibleParty?: Maybe<ActionResponsibleParty>;
};

export enum ActionResponsiblePartyRole {
  /** Collaborator */
  Collaborator = 'COLLABORATOR',
  /** Unspecified */
  None = 'NONE',
  /** Primary responsible party */
  Primary = 'PRIMARY'
}

/** A schedule for an action with begin and end dates. */
export type ActionSchedule = {
  __typename?: 'ActionSchedule';
  beginsAt: Scalars['Date'];
  endsAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  plan: Plan;
};

export type ActionScheduleBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionScheduleBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionScheduleFilterBlock = StreamFieldInterface & {
  __typename?: 'ActionScheduleFilterBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

/** The current status for the action ("on time", "late", "completed", etc.). */
export type ActionStatus = {
  __typename?: 'ActionStatus';
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  name: Scalars['String'];
  plan: Plan;
};

export type ActionStatusFilterBlock = StreamFieldInterface & {
  __typename?: 'ActionStatusFilterBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionStatusGraphsBlock = StreamFieldInterface & {
  __typename?: 'ActionStatusGraphsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionStatusReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionStatusReportFieldBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionStatusReportValue = ReportValueInterface & {
  __typename?: 'ActionStatusReportValue';
  field: ReportFieldBlock;
  implementationPhase?: Maybe<ActionStatus>;
};

export type ActionStatusSummary = {
  __typename?: 'ActionStatusSummary';
  /** @deprecated This field is an internal implementation detail; most often you should use action.color */
  color: Scalars['String'];
  identifier: ActionStatusSummaryIdentifier;
  isActive: Scalars['Boolean'];
  isCompleted: Scalars['Boolean'];
  label: Scalars['String'];
  sentiment: Sentiment;
};

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

export type ActionStatusUpdate = {
  __typename?: 'ActionStatusUpdate';
  action: Action;
  author?: Maybe<Person>;
  content: Scalars['String'];
  date: Scalars['Date'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

/**
 * A task that should be completed during the execution of an action.
 *
 * The task will have at least a name and an estimate of the due date.
 */
export type ActionTask = {
  __typename?: 'ActionTask';
  action: Action;
  comment?: Maybe<Scalars['String']>;
  commentDa?: Maybe<Scalars['String']>;
  commentDe?: Maybe<Scalars['String']>;
  commentDeCh?: Maybe<Scalars['String']>;
  commentEn?: Maybe<Scalars['String']>;
  commentEnAu?: Maybe<Scalars['String']>;
  commentEnGb?: Maybe<Scalars['String']>;
  commentEs?: Maybe<Scalars['String']>;
  commentEsUs?: Maybe<Scalars['String']>;
  commentFi?: Maybe<Scalars['String']>;
  commentI18n?: Maybe<Scalars['String']>;
  commentLv?: Maybe<Scalars['String']>;
  commentPt?: Maybe<Scalars['String']>;
  commentPtBr?: Maybe<Scalars['String']>;
  commentSv?: Maybe<Scalars['String']>;
  /** The date when the task was completed */
  completedAt?: Maybe<Scalars['Date']>;
  createdAt: Scalars['DateTime'];
  /** Format of action task due dates shown in the public UI.             The default for all actions can be specified on the actions page. */
  dateFormat?: Maybe<ActionTaskDateFormat>;
  /** The date by which the task should be completed (deadline) */
  dueAt: Scalars['Date'];
  i18n?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  modifiedAt: Scalars['DateTime'];
  name: Scalars['String'];
  nameDa: Scalars['String'];
  nameDe: Scalars['String'];
  nameDeCh: Scalars['String'];
  nameEn: Scalars['String'];
  nameEnAu: Scalars['String'];
  nameEnGb: Scalars['String'];
  nameEs: Scalars['String'];
  nameEsUs: Scalars['String'];
  nameFi: Scalars['String'];
  nameI18n: Scalars['String'];
  nameLv: Scalars['String'];
  namePt: Scalars['String'];
  namePtBr: Scalars['String'];
  nameSv: Scalars['String'];
  state: ActionTaskState;
};

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

export type ActionTasksBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionTasksBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  fieldHelpText?: Maybe<Scalars['String']>;
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String'];
};

export type ActionTimeliness = {
  __typename?: 'ActionTimeliness';
  color: Scalars['String'];
  comparison: Comparison;
  days: Scalars['Int'];
  identifier: ActionTimelinessIdentifier;
  /** @deprecated Generate human-friendly labels in the UI. */
  label: Scalars['String'];
  sentiment: Sentiment;
};

export enum ActionTimelinessIdentifier {
  Acceptable = 'ACCEPTABLE',
  Late = 'LATE',
  Optimal = 'OPTIMAL',
  Stale = 'STALE'
}

export type AdaptiveEmbedBlock = StreamFieldInterface & {
  __typename?: 'AdaptiveEmbedBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  embed?: Maybe<EmbedHtmlValue>;
  field: Scalars['String'];
  fullWidth?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type AdditionalLinks = {
  __typename?: 'AdditionalLinks';
  items: Array<Maybe<MenuItem>>;
};


export type AdditionalLinksItemsArgs = {
  withDescendants?: InputMaybe<Scalars['Boolean']>;
};

export type AdminButton = {
  __typename?: 'AdminButton';
  classname: Scalars['String'];
  label: Scalars['String'];
  target?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type AplansDocument = {
  __typename?: 'AplansDocument';
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type AplansImage = {
  __typename?: 'AplansImage';
  aspectRatio: Scalars['Float'];
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  focalPointHeight?: Maybe<Scalars['Int']>;
  focalPointWidth?: Maybe<Scalars['Int']>;
  focalPointX?: Maybe<Scalars['Int']>;
  focalPointY?: Maybe<Scalars['Int']>;
  height: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  isSvg: Scalars['Boolean'];
  rendition?: Maybe<AplansRendition>;
  sizes: Scalars['String'];
  /** @deprecated Use the `url` attribute */
  src: Scalars['String'];
  srcSet?: Maybe<Scalars['String']>;
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};


export type AplansImageRenditionArgs = {
  bgcolor?: InputMaybe<Scalars['String']>;
  fill?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  jpegquality?: InputMaybe<Scalars['Int']>;
  max?: InputMaybe<Scalars['String']>;
  min?: InputMaybe<Scalars['String']>;
  preserveSvg?: InputMaybe<Scalars['Boolean']>;
  webpquality?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};


export type AplansImageSrcSetArgs = {
  format?: InputMaybe<Scalars['String']>;
  preserveSvg?: InputMaybe<Scalars['Boolean']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AplansRendition = {
  __typename?: 'AplansRendition';
  alt: Scalars['String'];
  backgroundPositionStyle: Scalars['String'];
  file: Scalars['String'];
  filterSpec: Scalars['String'];
  focalPoint?: Maybe<Scalars['String']>;
  focalPointKey: Scalars['String'];
  height: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  image: Image;
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type AttributeCategoryChoice = AttributeInterface & {
  __typename?: 'AttributeCategoryChoice';
  categories: Array<Category>;
  id: Scalars['ID'];
  key: Scalars['String'];
  keyIdentifier: Scalars['String'];
  type: AttributeType;
};

export type AttributeChoice = AttributeInterface & {
  __typename?: 'AttributeChoice';
  choice?: Maybe<AttributeTypeChoiceOption>;
  id: Scalars['ID'];
  key: Scalars['String'];
  keyIdentifier: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  type: AttributeType;
};

export type AttributeInterface = {
  id: Scalars['ID'];
  key: Scalars['String'];
  keyIdentifier: Scalars['String'];
  type: AttributeType;
};

export type AttributeNumericValue = AttributeInterface & {
  __typename?: 'AttributeNumericValue';
  id: Scalars['ID'];
  key: Scalars['String'];
  keyIdentifier: Scalars['String'];
  type: AttributeType;
  value: Scalars['Float'];
};

export type AttributeRichText = AttributeInterface & {
  __typename?: 'AttributeRichText';
  id: Scalars['ID'];
  key: Scalars['String'];
  keyIdentifier: Scalars['String'];
  type: AttributeType;
  value: Scalars['String'];
};

export type AttributeText = AttributeInterface & {
  __typename?: 'AttributeText';
  id: Scalars['ID'];
  key: Scalars['String'];
  keyIdentifier: Scalars['String'];
  type: AttributeType;
  value: Scalars['String'];
};

export type AttributeType = {
  __typename?: 'AttributeType';
  /** If the format is "Category", choose which category type the field values can be chosen from */
  attributeCategoryType?: Maybe<CategoryType>;
  choiceOptions: Array<AttributeTypeChoiceOption>;
  format: AttributeTypeFormat;
  /** If the format is "ordered choice", determines whether the first option is displayed with zero bullets instead of one */
  hasZeroOption: Scalars['Boolean'];
  helpText: Scalars['String'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  /** If the format is "ordered choice", determines whether the choice names are displayed */
  showChoiceNames: Scalars['Boolean'];
  unit?: Maybe<Unit>;
};

export type AttributeTypeChoiceOption = {
  __typename?: 'AttributeTypeChoiceOption';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
};

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

export type BlockQuoteBlock = StreamFieldInterface & {
  __typename?: 'BlockQuoteBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type BooleanBlock = StreamFieldInterface & {
  __typename?: 'BooleanBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Boolean'];
};

export type CardBlock = StreamFieldInterface & {
  __typename?: 'CardBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  content?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  link?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type CardListBlock = StreamFieldInterface & {
  __typename?: 'CardListBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  cards?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lead?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type CartographyProviderCredentials = {
  __typename?: 'CartographyProviderCredentials';
  account: Scalars['String'];
  /** Currently only MapBox supported. */
  provider: CartographyProviderCredentialsProvider;
  /** Do not set your password or any secret here. These credentials are meant for public use on the public site. */
  publicAccessToken: Scalars['String'];
};

export enum CartographyProviderCredentialsProvider {
  /** MapBox */
  Mapbox = 'MAPBOX'
}

export type CartographyVisualisationBlock = StreamFieldInterface & {
  __typename?: 'CartographyVisualisationBlock';
  account?: Maybe<CartographyProviderCredentials>;
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  style?: Maybe<Scalars['String']>;
  styleOverrides?: Maybe<Scalars['String']>;
};

/** A category for actions and indicators. */
export type Category = {
  __typename?: 'Category';
  actions?: Maybe<Array<Action>>;
  attributes?: Maybe<Array<AttributeInterface>>;
  categoryPage?: Maybe<CategoryPage>;
  categoryPages: Array<CategoryPage>;
  children: Array<Category>;
  /** Set if the category has a theme color */
  color?: Maybe<Scalars['String']>;
  common?: Maybe<CommonCategory>;
  externalIdentifier?: Maybe<Scalars['String']>;
  helpText: Scalars['String'];
  iconImage?: Maybe<Image>;
  iconSvgUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  image?: Maybe<Image>;
  indicators: Array<Indicator>;
  leadParagraph: Scalars['String'];
  level?: Maybe<CategoryLevel>;
  name: Scalars['String'];
  order: Scalars['Int'];
  parent?: Maybe<Category>;
  shortDescription?: Maybe<Scalars['String']>;
  type: CategoryType;
  uuid: Scalars['UUID'];
};


/** A category for actions and indicators. */
export type CategoryAttributesArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

/**
 * Hierarchy level within a CategoryType.
 *
 * Root level has order=0, first child level order=1 and so on.
 */
export type CategoryLevel = {
  __typename?: 'CategoryLevel';
  id: Scalars['ID'];
  name: Scalars['String'];
  namePlural?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  type: CategoryType;
};

export type CategoryListBlock = StreamFieldInterface & {
  __typename?: 'CategoryListBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  category?: Maybe<Category>;
  categoryType?: Maybe<CategoryType>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lead?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  style?: Maybe<Scalars['String']>;
};

export type CategoryPage = PageInterface & {
  __typename?: 'CategoryPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  category?: Maybe<Category>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  layout?: Maybe<CategoryTypePageLevelLayout>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type CategoryPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type CategoryPageAsideBlock = CategoryPageAttributeTypeBlock;

export type CategoryPageAttributeTypeBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageAttributeTypeBlock';
  attributeType: AttributeType;
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type CategoryPageBodyBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageBodyBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type CategoryPageCategoryListBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageCategoryListBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type CategoryPageContactFormBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageContactFormBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  description?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type CategoryPageMainBottomBlock = CategoryPageAttributeTypeBlock | CategoryPageBodyBlock | CategoryPageCategoryListBlock | CategoryPageContactFormBlock;

export type CategoryPageMainTopBlock = CategoryPageAttributeTypeBlock | CategoryPageProgressBlock;

export type CategoryPageProgressBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageProgressBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type CategoryTreeMapBlock = StreamFieldInterface & {
  __typename?: 'CategoryTreeMapBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  categoryType?: Maybe<CategoryType>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lead?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  valueAttribute?: Maybe<AttributeType>;
};

/**
 * Type of the categories.
 *
 * Is used to group categories together. One action plan can have several
 * category types.
 */
export type CategoryType = {
  __typename?: 'CategoryType';
  attributeTypes: Array<AttributeType>;
  categories: Array<Category>;
  common?: Maybe<CommonCategoryType>;
  editableForActions: Scalars['Boolean'];
  editableForIndicators: Scalars['Boolean'];
  helpText: Scalars['String'];
  /** Set if the categories do not have meaningful identifiers */
  hideCategoryIdentifiers: Scalars['Boolean'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  leadParagraph?: Maybe<Scalars['String']>;
  levels: Array<CategoryLevel>;
  name: Scalars['String'];
  plan: Plan;
  /** Choose "Multiple" only if more than one category can be selected at a time, otherwise choose "Single" which is the default. */
  selectionType: CategoryTypeSelectWidget;
  shortDescription?: Maybe<Scalars['String']>;
  usableForActions: Scalars['Boolean'];
  usableForIndicators: Scalars['Boolean'];
};


/**
 * Type of the categories.
 *
 * Is used to group categories together. One action plan can have several
 * category types.
 */
export type CategoryTypeCategoriesArgs = {
  onlyRoot?: InputMaybe<Scalars['Boolean']>;
  onlyWithActions?: InputMaybe<Scalars['Boolean']>;
};

export type CategoryTypeFilterBlock = StreamFieldInterface & {
  __typename?: 'CategoryTypeFilterBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  categoryType?: Maybe<CategoryType>;
  depth?: Maybe<Scalars['Int']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  showAllLabel?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
};

export type CategoryTypePage = PageInterface & {
  __typename?: 'CategoryTypePage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  headerImage?: Maybe<Image>;
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadParagraph?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type CategoryTypePageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryTypePageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryTypePageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryTypePageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryTypePagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type CategoryTypePageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type CategoryTypePageLevelLayout = {
  __typename?: 'CategoryTypePageLevelLayout';
  iconSize?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  layoutAside?: Maybe<Array<CategoryPageAsideBlock>>;
  layoutMainBottom?: Maybe<Array<CategoryPageMainBottomBlock>>;
  layoutMainTop?: Maybe<Array<CategoryPageMainTopBlock>>;
};

export enum CategoryTypeSelectWidget {
  /** Multiple */
  Multiple = 'MULTIPLE',
  /** Single */
  Single = 'SINGLE'
}

export type CharBlock = StreamFieldInterface & {
  __typename?: 'CharBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ChoiceBlock = StreamFieldInterface & {
  __typename?: 'ChoiceBlock';
  blockType: Scalars['String'];
  choices: Array<ChoiceOption>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ChoiceOption = {
  __typename?: 'ChoiceOption';
  key: Scalars['String'];
  value: Scalars['String'];
};

/** Collection type */
export type CollectionObjectType = {
  __typename?: 'CollectionObjectType';
  ancestors: Array<Maybe<CollectionObjectType>>;
  commonCategoryType?: Maybe<CommonCategoryType>;
  depth: Scalars['Int'];
  descendants: Array<Maybe<CollectionObjectType>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  numchild: Scalars['Int'];
  path: Scalars['String'];
  plan?: Maybe<Plan>;
};

export type CommonCategory = {
  __typename?: 'CommonCategory';
  categoryInstances: Array<Category>;
  /** Set if the category has a theme color */
  color?: Maybe<Scalars['String']>;
  helpText: Scalars['String'];
  iconImage?: Maybe<Image>;
  iconSvgUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  image?: Maybe<Image>;
  leadParagraph: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  shortDescription?: Maybe<Scalars['String']>;
  type: CommonCategoryType;
  uuid: Scalars['UUID'];
};

export type CommonCategoryType = {
  __typename?: 'CommonCategoryType';
  categories: Array<CommonCategory>;
  editableForActions: Scalars['Boolean'];
  editableForIndicators: Scalars['Boolean'];
  helpText: Scalars['String'];
  /** Set if the categories do not have meaningful identifiers */
  hideCategoryIdentifiers: Scalars['Boolean'];
  identifier: Scalars['String'];
  leadParagraph?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  usableForActions: Scalars['Boolean'];
  usableForIndicators: Scalars['Boolean'];
};

export type CommonIndicator = {
  __typename?: 'CommonIndicator';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
  indicators: Array<Indicator>;
  name: Scalars['String'];
  normalizationIndicators: Array<CommonIndicator>;
  normalizations?: Maybe<Array<Maybe<CommonIndicatorNormalization>>>;
  normalizeByLabel?: Maybe<Scalars['String']>;
  quantity: Quantity;
  relatedCauses: Array<RelatedCommonIndicator>;
  relatedEffects: Array<RelatedCommonIndicator>;
  unit: Unit;
};

export type CommonIndicatorNormalization = {
  __typename?: 'CommonIndicatorNormalization';
  normalizer?: Maybe<CommonIndicator>;
  unit?: Maybe<Unit>;
};

export enum Comparison {
  Gt = 'GT',
  Lte = 'LTE'
}

export type CreateOrganizationMutationInput = {
  /** A simplified short version of name for the general public */
  abbreviation?: InputMaybe<Scalars['String']>;
  classification?: InputMaybe<Scalars['ID']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** A date of dissolution */
  dissolutionDate?: InputMaybe<Scalars['Date']>;
  /** A date of founding */
  foundingDate?: InputMaybe<Scalars['Date']>;
  /** A primary name, e.g. a legally recognized name */
  name: Scalars['String'];
  parent?: InputMaybe<Scalars['ID']>;
};

export type CreateOrganizationMutationPayload = {
  __typename?: 'CreateOrganizationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<ErrorType>;
  organization?: Maybe<Organization>;
};

export type DashboardColumnInterface = {
  columnLabel?: Maybe<Scalars['String']>;
};

export type DateBlock = StreamFieldInterface & {
  __typename?: 'DateBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};


export type DateBlockValueArgs = {
  format?: InputMaybe<Scalars['String']>;
};

export type DateTimeBlock = StreamFieldInterface & {
  __typename?: 'DateTimeBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};


export type DateTimeBlockValueArgs = {
  format?: InputMaybe<Scalars['String']>;
};

export type DecimalBlock = StreamFieldInterface & {
  __typename?: 'DecimalBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Float'];
};

export type DeleteOrganizationMutation = {
  __typename?: 'DeleteOrganizationMutation';
  ok?: Maybe<Scalars['Boolean']>;
};

/**
 * A dimension for indicators.
 *
 * Dimensions will have several dimension categories.
 */
export type Dimension = {
  __typename?: 'Dimension';
  categories: Array<DimensionCategory>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/**
 * A category in a dimension.
 *
 * Indicator values are grouped with this.
 */
export type DimensionCategory = {
  __typename?: 'DimensionCategory';
  dimension: Dimension;
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
};

export type DocumentChooserBlock = StreamFieldInterface & {
  __typename?: 'DocumentChooserBlock';
  blockType: Scalars['String'];
  document: AplansDocument;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type EmailBlock = StreamFieldInterface & {
  __typename?: 'EmailBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type EmbedBlock = StreamFieldInterface & {
  __typename?: 'EmbedBlock';
  blockType: Scalars['String'];
  embed?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawEmbed?: Maybe<Scalars['JSONString']>;
  rawValue: Scalars['String'];
  url: Scalars['String'];
  value: Scalars['String'];
};

export type EmbedHtmlValue = {
  __typename?: 'EmbedHTMLValue';
  html?: Maybe<Scalars['String']>;
};

export type EmptyPage = PageInterface & {
  __typename?: 'EmptyPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type EmptyPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type EmptyPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type EmptyPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type EmptyPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type EmptyPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type EmptyPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type ExternalLinkMenuItem = {
  __typename?: 'ExternalLinkMenuItem';
  linkText: Scalars['String'];
  url: Scalars['String'];
};

export type FieldBlockMetaData = {
  __typename?: 'FieldBlockMetaData';
  hidden?: Maybe<Scalars['Boolean']>;
  restricted?: Maybe<Scalars['Boolean']>;
};

export type FieldBlockMetaInterface = {
  meta?: Maybe<FieldBlockMetaData>;
};

export type FloatBlock = StreamFieldInterface & {
  __typename?: 'FloatBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Float'];
};

export type Footer = {
  __typename?: 'Footer';
  items: Array<Maybe<MenuItem>>;
};


export type FooterItemsArgs = {
  withDescendants?: InputMaybe<Scalars['Boolean']>;
};

export type FrontPageHeroBlock = StreamFieldInterface & {
  __typename?: 'FrontPageHeroBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  layout?: Maybe<Scalars['String']>;
  lead?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type IdentifierColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'IdentifierColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  altText: Scalars['String'];
  focalPointHeight?: Maybe<Scalars['Int']>;
  focalPointWidth?: Maybe<Scalars['Int']>;
  focalPointX?: Maybe<Scalars['Int']>;
  focalPointY?: Maybe<Scalars['Int']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  imageCredit: Scalars['String'];
  rendition?: Maybe<ImageRendition>;
  title: Scalars['String'];
  width: Scalars['Int'];
};


export type ImageRenditionArgs = {
  crop?: InputMaybe<Scalars['Boolean']>;
  size?: InputMaybe<Scalars['String']>;
};

export type ImageChooserBlock = StreamFieldInterface & {
  __typename?: 'ImageChooserBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  image: AplansImage;
  rawValue: Scalars['String'];
};

export type ImageRendition = {
  __typename?: 'ImageRendition';
  alt: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

export type ImpactColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'ImpactColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ImpactGroup = {
  __typename?: 'ImpactGroup';
  actions: Array<ImpactGroupAction>;
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<ImpactGroup>;
  plan: Plan;
  weight?: Maybe<Scalars['Float']>;
};

export type ImpactGroupAction = {
  __typename?: 'ImpactGroupAction';
  action: Action;
  group: ImpactGroup;
  id: Scalars['ID'];
  impact: ActionImpact;
};

export type ImpactGroupPage = PageInterface & {
  __typename?: 'ImpactGroupPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadContent?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type ImpactGroupPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ImpactGroupPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ImpactGroupPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ImpactGroupPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ImpactGroupPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type ImpactGroupPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type ImplementationPhaseColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'ImplementationPhaseColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

/** An indicator with which to measure actions and progress towards strategic goals. */
export type Indicator = {
  __typename?: 'Indicator';
  actions?: Maybe<Array<Maybe<Action>>>;
  categories: Array<Category>;
  common?: Maybe<CommonIndicator>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  dimensions: Array<IndicatorDimension>;
  goals?: Maybe<Array<Maybe<IndicatorGoal>>>;
  id: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
  latestGraph?: Maybe<IndicatorGraph>;
  latestValue?: Maybe<IndicatorValue>;
  level?: Maybe<Scalars['String']>;
  /** What is the maximum value this indicator can reach? It is used in visualizations as the Y axis maximum. */
  maxValue?: Maybe<Scalars['Float']>;
  /** What is the minimum value this indicator can reach? It is used in visualizations as the Y axis minimum. */
  minValue?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  organization: Organization;
  plans: Array<Plan>;
  quantity?: Maybe<Quantity>;
  relatedActions: Array<ActionIndicator>;
  relatedCauses: Array<RelatedIndicator>;
  relatedEffects: Array<RelatedIndicator>;
  timeResolution: IndicatorTimeResolution;
  unit: Unit;
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['UUID'];
  values?: Maybe<Array<Maybe<IndicatorValue>>>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorActionsArgs = {
  plan?: InputMaybe<Scalars['ID']>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorGoalsArgs = {
  plan?: InputMaybe<Scalars['ID']>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorLevelArgs = {
  plan?: InputMaybe<Scalars['ID']>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorValuesArgs = {
  includeDimensions?: InputMaybe<Scalars['Boolean']>;
};

export type IndicatorBlock = StreamFieldInterface & {
  __typename?: 'IndicatorBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  indicator?: Maybe<Indicator>;
  rawValue: Scalars['String'];
  style?: Maybe<Scalars['String']>;
};

/** Mapping of which dimensions an indicator has. */
export type IndicatorDimension = {
  __typename?: 'IndicatorDimension';
  dimension: Dimension;
  id: Scalars['ID'];
  indicator: Indicator;
  order: Scalars['Int'];
};

/** The numeric goal which the organization has set for an indicator. */
export type IndicatorGoal = {
  __typename?: 'IndicatorGoal';
  date?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  indicator: Indicator;
  normalizedValues?: Maybe<Array<Maybe<NormalizedValue>>>;
  scenario?: Maybe<Scenario>;
  value: Scalars['Float'];
};

export type IndicatorGraph = {
  __typename?: 'IndicatorGraph';
  createdAt: Scalars['DateTime'];
  data: Scalars['JSONString'];
  id: Scalars['ID'];
  indicator: Indicator;
};

export type IndicatorGroupBlock = StreamFieldInterface & {
  __typename?: 'IndicatorGroupBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  indicators?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  /** @deprecated Use 'indicators' instead */
  items?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  rawValue: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type IndicatorHighlightsBlock = StreamFieldInterface & {
  __typename?: 'IndicatorHighlightsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

/**
 * The level for an indicator in an action plan.
 *
 * Indicator levels include: operational, tactical and strategic.
 */
export type IndicatorLevel = {
  __typename?: 'IndicatorLevel';
  id: Scalars['ID'];
  indicator: Indicator;
  level: IndicatorLevelLevel;
  plan: Plan;
};

export enum IndicatorLevelLevel {
  /** operational */
  Operational = 'OPERATIONAL',
  /** strategic */
  Strategic = 'STRATEGIC',
  /** tactical */
  Tactical = 'TACTICAL'
}

export type IndicatorListPage = PageInterface & {
  __typename?: 'IndicatorListPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  displayInsights?: Maybe<Scalars['Boolean']>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadContent?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type IndicatorListPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type IndicatorListPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type IndicatorListPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type IndicatorListPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type IndicatorListPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type IndicatorListPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type IndicatorShowcaseBlock = StreamFieldInterface & {
  __typename?: 'IndicatorShowcaseBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  body?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  indicator?: Maybe<Indicator>;
  indicatorIsNormalized?: Maybe<Scalars['Boolean']>;
  linkButton?: Maybe<StreamFieldInterface>;
  rawValue: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export enum IndicatorTimeResolution {
  /** day */
  Day = 'DAY',
  /** month */
  Month = 'MONTH',
  /** year */
  Year = 'YEAR'
}

/** One measurement of an indicator for a certain date/month/year. */
export type IndicatorValue = {
  __typename?: 'IndicatorValue';
  categories: Array<DimensionCategory>;
  date?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  indicator: Indicator;
  normalizedValues?: Maybe<Array<Maybe<NormalizedValue>>>;
  value: Scalars['Float'];
};

export type IndicatorsColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'IndicatorsColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type IntegerBlock = StreamFieldInterface & {
  __typename?: 'IntegerBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Int'];
};

export type LargeImageBlock = StreamFieldInterface & {
  __typename?: 'LargeImageBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  rawValue: Scalars['String'];
  width?: Maybe<Scalars['String']>;
};

export type ListBlockWithIncrementingChildIds = {
  __typename?: 'ListBlockWithIncrementingChildIds';
  items: Array<StreamFieldInterface>;
};

export type MainMenu = {
  __typename?: 'MainMenu';
  items: Array<Maybe<MenuItem>>;
};


export type MainMenuItemsArgs = {
  withDescendants?: InputMaybe<Scalars['Boolean']>;
};

export type MenuItem = ExternalLinkMenuItem | PageMenuItem;

export type MonitoringQualityPoint = {
  __typename?: 'MonitoringQualityPoint';
  actions: Array<Action>;
  descriptionNo?: Maybe<Scalars['String']>;
  descriptionNoDa: Scalars['String'];
  descriptionNoDe: Scalars['String'];
  descriptionNoDeCh: Scalars['String'];
  descriptionNoEn: Scalars['String'];
  descriptionNoEnAu: Scalars['String'];
  descriptionNoEnGb: Scalars['String'];
  descriptionNoEs: Scalars['String'];
  descriptionNoEsUs: Scalars['String'];
  descriptionNoFi: Scalars['String'];
  descriptionNoI18n: Scalars['String'];
  descriptionNoLv: Scalars['String'];
  descriptionNoPt: Scalars['String'];
  descriptionNoPtBr: Scalars['String'];
  descriptionNoSv: Scalars['String'];
  descriptionYes?: Maybe<Scalars['String']>;
  descriptionYesDa: Scalars['String'];
  descriptionYesDe: Scalars['String'];
  descriptionYesDeCh: Scalars['String'];
  descriptionYesEn: Scalars['String'];
  descriptionYesEnAu: Scalars['String'];
  descriptionYesEnGb: Scalars['String'];
  descriptionYesEs: Scalars['String'];
  descriptionYesEsUs: Scalars['String'];
  descriptionYesFi: Scalars['String'];
  descriptionYesI18n: Scalars['String'];
  descriptionYesLv: Scalars['String'];
  descriptionYesPt: Scalars['String'];
  descriptionYesPtBr: Scalars['String'];
  descriptionYesSv: Scalars['String'];
  i18n?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nameDa: Scalars['String'];
  nameDe: Scalars['String'];
  nameDeCh: Scalars['String'];
  nameEn: Scalars['String'];
  nameEnAu: Scalars['String'];
  nameEnGb: Scalars['String'];
  nameEs: Scalars['String'];
  nameEsUs: Scalars['String'];
  nameFi: Scalars['String'];
  nameI18n: Scalars['String'];
  nameLv: Scalars['String'];
  namePt: Scalars['String'];
  namePtBr: Scalars['String'];
  nameSv: Scalars['String'];
  order: Scalars['Int'];
  plan: Plan;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrganization?: Maybe<CreateOrganizationMutationPayload>;
  createUserFeedback?: Maybe<UserFeedbackMutationPayload>;
  deleteOrganization?: Maybe<DeleteOrganizationMutation>;
  updateActionResponsibleParty?: Maybe<UpdateActionResponsiblePartyMutationPayload>;
  updateIndicator?: Maybe<UpdateIndicatorMutationPayload>;
  updateOrganization?: Maybe<UpdateOrganizationMutationPayload>;
  updatePerson?: Maybe<UpdatePersonMutationPayload>;
  updatePlan?: Maybe<UpdatePlanMutationPayload>;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationMutationInput;
};


export type MutationCreateUserFeedbackArgs = {
  input: UserFeedbackMutationInput;
};


export type MutationDeleteOrganizationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateActionResponsiblePartyArgs = {
  input: UpdateActionResponsiblePartyMutationInput;
};


export type MutationUpdateIndicatorArgs = {
  input: UpdateIndicatorMutationInput;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationMutationInput;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonMutationInput;
};


export type MutationUpdatePlanArgs = {
  input: UpdatePlanMutationInput;
};

export type NameColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'NameColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type NormalizedValue = {
  __typename?: 'NormalizedValue';
  normalizerId?: Maybe<Scalars['ID']>;
  value?: Maybe<Scalars['Float']>;
};

export type Organization = {
  __typename?: 'Organization';
  /** A simplified short version of name for the general public */
  abbreviation: Scalars['String'];
  /** Number of actions this organization is responsible for */
  actionCount: Scalars['Int'];
  adminButtons: Array<AdminButton>;
  ancestors?: Maybe<Array<Maybe<Organization>>>;
  /** An organization category, e.g. committee */
  classification?: Maybe<OrganizationClass>;
  /** Number of contact persons that are associated with this organization */
  contactPersonCount: Scalars['Int'];
  descendants?: Maybe<Array<Maybe<Organization>>>;
  description: Scalars['String'];
  /** A distinct name for this organization (generated automatically) */
  distinctName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  location?: Maybe<Scalars['PointScalar']>;
  logo?: Maybe<Image>;
  /** A primary name, e.g. a legally recognized name */
  name: Scalars['String'];
  parent?: Maybe<Organization>;
  plansWithActionResponsibilities: Array<Plan>;
  url: Scalars['String'];
};


export type OrganizationLogoArgs = {
  parentFallback?: InputMaybe<Scalars['Boolean']>;
};


export type OrganizationPlansWithActionResponsibilitiesArgs = {
  exceptPlan?: InputMaybe<Scalars['ID']>;
};

export type OrganizationClass = {
  __typename?: 'OrganizationClass';
  /** The time at which the resource was created */
  createdTime: Scalars['DateTime'];
  i18n?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  /** The time at which the resource was updated */
  lastModifiedTime: Scalars['DateTime'];
  name: Scalars['String'];
  nameDa: Scalars['String'];
  nameDe: Scalars['String'];
  nameDeCh: Scalars['String'];
  nameEn: Scalars['String'];
  nameEnAu: Scalars['String'];
  nameEnGb: Scalars['String'];
  nameEs: Scalars['String'];
  nameEsUs: Scalars['String'];
  nameFi: Scalars['String'];
  nameI18n: Scalars['String'];
  nameLv: Scalars['String'];
  namePt: Scalars['String'];
  namePtBr: Scalars['String'];
  nameSv: Scalars['String'];
  /** An organization category, e.g. committee */
  organizationSet: Array<Organization>;
};

export type OrganizationColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'OrganizationColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type Page = PageInterface & {
  __typename?: 'Page';
  accessibilitystatementpage?: Maybe<AccessibilityStatementPage>;
  actionlistpage?: Maybe<ActionListPage>;
  aliasOf?: Maybe<Page>;
  aliases: Array<Page>;
  ancestors: Array<PageInterface>;
  categorypage?: Maybe<CategoryPage>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  emptypage?: Maybe<EmptyPage>;
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  impactgrouppage?: Maybe<ImpactGroupPage>;
  indicatorlistpage?: Maybe<IndicatorListPage>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  planrootpage?: Maybe<PlanRootPage>;
  previousSiblings: Array<PageInterface>;
  privacypolicypage?: Maybe<PrivacyPolicyPage>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  sitesRootedHere: Array<SiteObjectType>;
  slug: Scalars['String'];
  staticpage?: Maybe<StaticPage>;
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type PageChooserBlock = StreamFieldInterface & {
  __typename?: 'PageChooserBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  page: PageInterface;
  rawValue: Scalars['String'];
};

export type PageInterface = {
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  nextSiblings: Array<PageInterface>;
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type PageInterfaceAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfacePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type PageLinkBlock = StreamFieldInterface & {
  __typename?: 'PageLinkBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  page?: Maybe<PageInterface>;
  rawValue: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type PageMenuItem = {
  __typename?: 'PageMenuItem';
  children?: Maybe<Array<Maybe<PageMenuItem>>>;
  id: Scalars['ID'];
  page: PageInterface;
  parent?: Maybe<PageMenuItem>;
};

export type Person = {
  __typename?: 'Person';
  avatarUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** What is this person's organization */
  organization: Organization;
  title?: Maybe<Scalars['String']>;
};


export type PersonAvatarUrlArgs = {
  size?: InputMaybe<Scalars['String']>;
};

/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type Plan = PlanInterface & {
  __typename?: 'Plan';
  accessibilityStatementUrl?: Maybe<Scalars['String']>;
  actionAttributeTypes: Array<AttributeType>;
  actionImpacts: Array<ActionImpact>;
  actionImplementationPhases: Array<ActionImplementationPhase>;
  actionListPage?: Maybe<ActionListPage>;
  actionSchedules: Array<ActionSchedule>;
  actionStatusSummaries: Array<ActionStatusSummary>;
  actionStatuses: Array<ActionStatus>;
  actionTimelinessClasses: Array<ActionTimeliness>;
  actionUpdateAcceptableInterval?: Maybe<Scalars['Int']>;
  actionUpdateTargetInterval?: Maybe<Scalars['Int']>;
  actions: Array<Action>;
  /** Can actions be added and the official metadata edited? */
  actionsLocked: Scalars['Boolean'];
  additionalLinks?: Maybe<AdditionalLinks>;
  adminUrl?: Maybe<Scalars['String']>;
  allRelatedPlans: Array<Maybe<Plan>>;
  categoryType?: Maybe<CategoryType>;
  categoryTypes: Array<CategoryType>;
  children: Array<Plan>;
  domain?: Maybe<PlanDomain>;
  domains?: Maybe<Array<Maybe<PlanDomain>>>;
  /** If not empty, the system's built-in user feedback feature will be replaced by a link to an external feedback form available at this web address. */
  externalFeedbackUrl?: Maybe<Scalars['String']>;
  features: PlanFeatures;
  footer?: Maybe<Footer>;
  generalContent: SiteGeneralContent;
  hideActionIdentifiers?: Maybe<Scalars['Boolean']>;
  hideActionLeadParagraph?: Maybe<Scalars['Boolean']>;
  hideActionOfficialName?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  /** A unique identifier for the plan used internally to distinguish between plans. This becomes part of the test site URL: https://[identifier].watch-test.kausal.tech. Use lowercase letters and dashes. */
  identifier: Scalars['String'];
  image?: Maybe<Image>;
  impactGroups: Array<Maybe<ImpactGroup>>;
  indicatorLevels: Array<IndicatorLevel>;
  lastActionIdentifier?: Maybe<Scalars['ID']>;
  mainMenu?: Maybe<MainMenu>;
  monitoringQualityPoints: Array<MonitoringQualityPoint>;
  /** The official plan name in full form */
  name: Scalars['String'];
  organization: Organization;
  otherLanguages?: Maybe<Array<Scalars['String']>>;
  pages?: Maybe<Array<Maybe<PageInterface>>>;
  parent?: Maybe<Plan>;
  /** Used for primary navigation and grouping of actions */
  primaryActionClassification?: Maybe<CategoryType>;
  primaryLanguage: Scalars['String'];
  primaryOrgs: Array<Maybe<Organization>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  relatedPlans: Array<Plan>;
  reportTypes: Array<ReportType>;
  scenarios: Array<Scenario>;
  /** Leave empty unless specifically required. Action filters based on this category are displayed more prominently than filters of other categories. */
  secondaryActionClassification?: Maybe<CategoryType>;
  serveFileBaseUrl: Scalars['String'];
  /** A shorter version of the plan name */
  shortName?: Maybe<Scalars['String']>;
  /** Set if this plan is superseded by another plan */
  supersededBy?: Maybe<Plan>;
  supersededPlans: Array<Plan>;
  supersedingPlans: Array<Plan>;
  themeIdentifier?: Maybe<Scalars['String']>;
  /** If this plan has multiple versions, name of this version */
  versionName: Scalars['String'];
  viewUrl?: Maybe<Scalars['String']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanActionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<Scalars['ID']>;
  onlyMine?: InputMaybe<Scalars['Boolean']>;
  responsibleOrganization?: InputMaybe<Scalars['ID']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanCategoryTypeArgs = {
  id: Scalars['ID'];
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanCategoryTypesArgs = {
  usableForActions?: InputMaybe<Scalars['Boolean']>;
  usableForIndicators?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanDomainArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanDomainsArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanImpactGroupsArgs = {
  first?: InputMaybe<Scalars['Int']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanSupersededPlansArgs = {
  recursive?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanSupersedingPlansArgs = {
  recursive?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanViewUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']>;
};

/** A domain (hostname) where an UI for a Plan might live. */
export type PlanDomain = {
  __typename?: 'PlanDomain';
  /** Fill this for a multi-plan site when the plan does not live in the root of the domain. */
  basePath?: Maybe<Scalars['String']>;
  googleSiteVerificationTag?: Maybe<Scalars['String']>;
  /** The fully qualified domain name, eg. climate.cityname.gov. Leave blank if not yet known. */
  hostname: Scalars['String'];
  id: Scalars['ID'];
  matomoAnalyticsUrl?: Maybe<Scalars['String']>;
  status?: Maybe<PublicationStatus>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type PlanFeatures = {
  __typename?: 'PlanFeatures';
  /** Should custom images for individual actions be allowed */
  allowImagesForActions: Scalars['Boolean'];
  /** Should users be able to have authenticated sessions in the public UI? */
  allowPublicSiteLogin: Scalars['Boolean'];
  /** Choose which information about contact persons is visible in the public UI */
  contactPersonsPublicData: PlanFeaturesContactPersonsPublicData;
  /** Set to enable comparing indicators between organizations */
  enableIndicatorComparison: Scalars['Boolean'];
  /** Enable site-wide search functionality */
  enableSearch: Scalars['Boolean'];
  /** Set if there are separate contact persons with publishing rights and others who can only suggest changes */
  hasActionContactPersonRoles: Scalars['Boolean'];
  /** Set if the plan uses meaningful action identifiers */
  hasActionIdentifiers: Scalars['Boolean'];
  /** Set if the plan uses the lead paragraph field */
  hasActionLeadParagraph: Scalars['Boolean'];
  /** Set if the plan uses the official name field */
  hasActionOfficialName: Scalars['Boolean'];
  /** Set if actions have a clear primary organization (such as multi-city plans) */
  hasActionPrimaryOrgs: Scalars['Boolean'];
  /** Set to prevent showing status-specific graphs and other elements if statuses aren't systematically used in this action plan */
  minimalStatuses: Scalars['Boolean'];
  publicContactPersons: Scalars['Boolean'];
  /** Should the public website contain a link to the admin login? */
  showAdminLink: Scalars['Boolean'];
};

export enum PlanFeaturesContactPersonsPublicData {
  /** Show all information */
  All = 'ALL',
  /** Show only name, role and affiliation */
  Name = 'NAME',
  /** Do not show contact persons publicly */
  None = 'NONE'
}

export type PlanFilterBlock = StreamFieldInterface & {
  __typename?: 'PlanFilterBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type PlanInterface = {
  domain?: Maybe<PlanDomain>;
  domains?: Maybe<Array<Maybe<PlanDomain>>>;
  primaryLanguage: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
};


export type PlanInterfaceDomainArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};


export type PlanInterfaceDomainsArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};

export type PlanLink = {
  __typename?: 'PlanLink';
  id?: Maybe<Scalars['ID']>;
};

export type PlanRootPage = PageInterface & {
  __typename?: 'PlanRootPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type PlanRootPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PlanRootPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PlanRootPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PlanRootPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PlanRootPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PlanRootPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type PrimaryOrganizationFilterBlock = StreamFieldInterface & {
  __typename?: 'PrimaryOrganizationFilterBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type PrivacyPolicyPage = PageInterface & {
  __typename?: 'PrivacyPolicyPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadContent?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type PrivacyPolicyPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PrivacyPolicyPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PrivacyPolicyPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PrivacyPolicyPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PrivacyPolicyPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PrivacyPolicyPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export enum PublicationStatus {
  Published = 'PUBLISHED',
  Scheduled = 'SCHEDULED',
  Unpublished = 'UNPUBLISHED'
}

/** The quantity that an indicator measures. */
export type Quantity = {
  __typename?: 'Quantity';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  action?: Maybe<Action>;
  category?: Maybe<Category>;
  indicator?: Maybe<Indicator>;
  myPlans?: Maybe<Array<Maybe<Plan>>>;
  organization?: Maybe<Organization>;
  person?: Maybe<Person>;
  plan?: Maybe<Plan>;
  planActions?: Maybe<Array<Action>>;
  planCategories?: Maybe<Array<Maybe<Category>>>;
  planIndicators?: Maybe<Array<Maybe<Indicator>>>;
  planOrganizations?: Maybe<Array<Organization>>;
  planPage?: Maybe<PageInterface>;
  plansForHostname?: Maybe<Array<Maybe<PlanInterface>>>;
  relatedPlanActions?: Maybe<Array<Action>>;
  search?: Maybe<SearchResults>;
  workflowStates?: Maybe<Array<Maybe<WorkflowStateDescription>>>;
};


export type QueryActionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<Scalars['ID']>;
  plan?: InputMaybe<Scalars['ID']>;
};


export type QueryCategoryArgs = {
  categoryType: Scalars['ID'];
  externalIdentifier: Scalars['ID'];
  plan: Scalars['ID'];
};


export type QueryIndicatorArgs = {
  id?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<Scalars['ID']>;
  plan?: InputMaybe<Scalars['ID']>;
};


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


export type QueryPersonArgs = {
  id: Scalars['ID'];
};


export type QueryPlanArgs = {
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPlanActionsArgs = {
  category?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  plan: Scalars['ID'];
};


export type QueryPlanCategoriesArgs = {
  categoryType?: InputMaybe<Scalars['ID']>;
  plan: Scalars['ID'];
};


export type QueryPlanIndicatorsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  hasData?: InputMaybe<Scalars['Boolean']>;
  hasGoals?: InputMaybe<Scalars['Boolean']>;
  orderBy?: InputMaybe<Scalars['String']>;
  plan: Scalars['ID'];
};


export type QueryPlanOrganizationsArgs = {
  forContactPersons?: InputMaybe<Scalars['Boolean']>;
  forResponsibleParties?: InputMaybe<Scalars['Boolean']>;
  includeRelatedPlans?: InputMaybe<Scalars['Boolean']>;
  plan?: InputMaybe<Scalars['ID']>;
  withAncestors?: InputMaybe<Scalars['Boolean']>;
};


export type QueryPlanPageArgs = {
  path: Scalars['String'];
  plan: Scalars['ID'];
};


export type QueryPlansForHostnameArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};


export type QueryRelatedPlanActionsArgs = {
  category?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  plan: Scalars['ID'];
};


export type QuerySearchArgs = {
  autocomplete?: InputMaybe<Scalars['String']>;
  includeRelatedPlans?: InputMaybe<Scalars['Boolean']>;
  maxResults?: InputMaybe<Scalars['Int']>;
  onlyOtherPlans?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  plan: Scalars['ID'];
  query?: InputMaybe<Scalars['String']>;
};


export type QueryWorkflowStatesArgs = {
  plan: Scalars['ID'];
};

export type QuestionAnswerBlock = StreamFieldInterface & {
  __typename?: 'QuestionAnswerBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  heading?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  questions?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  rawValue: Scalars['String'];
};

export type QuestionBlock = StreamFieldInterface & {
  __typename?: 'QuestionBlock';
  answer?: Maybe<Scalars['String']>;
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type RawHtmlBlock = StreamFieldInterface & {
  __typename?: 'RawHTMLBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type RegexBlock = StreamFieldInterface & {
  __typename?: 'RegexBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type RelatedCommonIndicator = {
  __typename?: 'RelatedCommonIndicator';
  causalIndicator: CommonIndicator;
  effectIndicator: CommonIndicator;
  /** What type of causal effect is there between the indicators */
  effectType: RelatedCommonIndicatorEffectType;
  id: Scalars['ID'];
};

export enum RelatedCommonIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES',
  /** is a part of */
  PartOf = 'PART_OF'
}

/** A causal relationship between two indicators. */
export type RelatedIndicator = {
  __typename?: 'RelatedIndicator';
  causalIndicator: Indicator;
  /** How confident we are that the causal effect is present */
  confidenceLevel: RelatedIndicatorConfidenceLevel;
  effectIndicator: Indicator;
  /** What type of causal effect is there between the indicators */
  effectType: RelatedIndicatorEffectType;
  id: Scalars['ID'];
};

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

export type RelatedIndicatorsBlock = StreamFieldInterface & {
  __typename?: 'RelatedIndicatorsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type RelatedPlanListBlock = StreamFieldInterface & {
  __typename?: 'RelatedPlanListBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  endDate: Scalars['Date'];
  fields?: Maybe<Array<ReportFieldBlock>>;
  identifier: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['Date'];
  type: ReportType;
  valuesForAction?: Maybe<Array<ReportValueInterface>>;
};


export type ReportValuesForActionArgs = {
  actionId?: InputMaybe<Scalars['ID']>;
  actionIdentifier?: InputMaybe<Scalars['ID']>;
};

export type ReportComparisonBlock = StreamFieldInterface & {
  __typename?: 'ReportComparisonBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  reportField?: Maybe<Scalars['String']>;
  reportType?: Maybe<ReportType>;
  reportsToCompare?: Maybe<Array<Maybe<Report>>>;
};

export type ReportFieldBlock = ActionAttributeTypeReportFieldBlock | ActionCategoryReportFieldBlock | ActionImplementationPhaseReportFieldBlock | ActionResponsiblePartyReportFieldBlock | ActionStatusReportFieldBlock;

export type ReportType = {
  __typename?: 'ReportType';
  id: Scalars['ID'];
  name: Scalars['String'];
  plan: Plan;
  reports: Array<Report>;
};

export type ReportTypeFieldChooserBlock = StreamFieldInterface & {
  __typename?: 'ReportTypeFieldChooserBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ReportValueInterface = {
  field: ReportFieldBlock;
};

export type ResponsiblePartiesColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'ResponsiblePartiesColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ResponsiblePartyFilterBlock = StreamFieldInterface & {
  __typename?: 'ResponsiblePartyFilterBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type RestrictedPlanNode = PlanInterface & {
  __typename?: 'RestrictedPlanNode';
  domain?: Maybe<PlanDomain>;
  domains?: Maybe<Array<Maybe<PlanDomain>>>;
  primaryLanguage: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
};


export type RestrictedPlanNodeDomainArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};


export type RestrictedPlanNodeDomainsArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};

export type RichTextBlock = StreamFieldInterface & {
  __typename?: 'RichTextBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type Scenario = {
  __typename?: 'Scenario';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  plan: Plan;
};

export type SearchHit = {
  __typename?: 'SearchHit';
  highlight?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  object?: Maybe<SearchHitObject>;
  page?: Maybe<PageInterface>;
  plan?: Maybe<Plan>;
  relevance?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


export type SearchHitUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']>;
};

export type SearchHitObject = Action | Indicator;

export type SearchResults = {
  __typename?: 'SearchResults';
  hits?: Maybe<Array<Maybe<SearchHit>>>;
};

export enum Sentiment {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE'
}

export type SiteGeneralContent = {
  __typename?: 'SiteGeneralContent';
  actionTaskTerm: SiteGeneralContentActionTaskTerm;
  actionTerm: SiteGeneralContentActionTerm;
  copyrightText: Scalars['String'];
  /** If the site is under a Creative Commons license, which CC license it is */
  creativeCommonsLicense: Scalars['String'];
  githubApiRepository: Scalars['String'];
  githubUiRepository: Scalars['String'];
  id: Scalars['ID'];
  /** The text to show when displaying official content */
  officialNameDescription: Scalars['String'];
  organizationTerm: SiteGeneralContentOrganizationTerm;
  ownerName: Scalars['String'];
  ownerUrl: Scalars['String'];
  siteDescription: Scalars['String'];
  siteTitle: Scalars['String'];
  /** A message prominently displayed in a banner at the top of every page on the public website */
  sitewideAnnouncement?: Maybe<Scalars['String']>;
};

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

export type SiteObjectType = {
  __typename?: 'SiteObjectType';
  hostname: Scalars['String'];
  id: Scalars['ID'];
  /** If true, this site will handle requests for all other hostnames that do not have a site entry of their own */
  isDefaultSite: Scalars['Boolean'];
  page?: Maybe<PageInterface>;
  pages: Array<PageInterface>;
  plan?: Maybe<Plan>;
  /** Set this to something other than 80 if you need a specific port number to appear in URLs (e.g. development on port 8000). Does not affect request handling (so port forwarding still works). */
  port: Scalars['Int'];
  rootPage: Page;
  /** Human-readable name for the site. */
  siteName: Scalars['String'];
};


export type SiteObjectTypePageArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  urlPath?: InputMaybe<Scalars['String']>;
};


export type SiteObjectTypePagesArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type StaticBlock = StreamFieldInterface & {
  __typename?: 'StaticBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type StaticPage = PageInterface & {
  __typename?: 'StaticPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  headerImage?: Maybe<Image>;
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadParagraph?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']>;
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type StaticPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type StaticPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type StaticPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type StaticPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type StaticPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type StaticPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type StatusColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'StatusColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type StreamBlock = StreamFieldInterface & {
  __typename?: 'StreamBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type StreamFieldBlock = StreamFieldInterface & {
  __typename?: 'StreamFieldBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type StreamFieldInterface = {
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type StructBlock = StreamFieldInterface & {
  __typename?: 'StructBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type TagObjectType = {
  __typename?: 'TagObjectType';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TasksColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'TasksColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type TextBlock = StreamFieldInterface & {
  __typename?: 'TextBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type TimeBlock = StreamFieldInterface & {
  __typename?: 'TimeBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};


export type TimeBlockValueArgs = {
  format?: InputMaybe<Scalars['String']>;
};

export type UrlBlock = StreamFieldInterface & {
  __typename?: 'URLBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type Unit = {
  __typename?: 'Unit';
  id: Scalars['ID'];
  name: Scalars['String'];
  shortName?: Maybe<Scalars['String']>;
  verboseName?: Maybe<Scalars['String']>;
  verboseNamePlural?: Maybe<Scalars['String']>;
};

export type UpdateActionResponsiblePartyMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  organization: Scalars['ID'];
};

export type UpdateActionResponsiblePartyMutationPayload = {
  __typename?: 'UpdateActionResponsiblePartyMutationPayload';
  actionResponsibleParty?: Maybe<ActionResponsibleParty>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<ErrorType>;
};

export type UpdateIndicatorMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  organization: Scalars['ID'];
};

export type UpdateIndicatorMutationPayload = {
  __typename?: 'UpdateIndicatorMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<ErrorType>;
  indicator?: Maybe<Indicator>;
};

export type UpdateOrganizationMutationInput = {
  /** A simplified short version of name for the general public */
  abbreviation?: InputMaybe<Scalars['String']>;
  classification?: InputMaybe<Scalars['ID']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** A date of dissolution */
  dissolutionDate?: InputMaybe<Scalars['Date']>;
  /** A date of founding */
  foundingDate?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  /** A primary name, e.g. a legally recognized name */
  name: Scalars['String'];
  parent?: InputMaybe<Scalars['ID']>;
};

export type UpdateOrganizationMutationPayload = {
  __typename?: 'UpdateOrganizationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<ErrorType>;
  organization?: Maybe<Organization>;
};

export type UpdatePersonMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  organization: Scalars['ID'];
};

export type UpdatePersonMutationPayload = {
  __typename?: 'UpdatePersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<ErrorType>;
  person?: Maybe<Person>;
};

export type UpdatePlanMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  organization: Scalars['ID'];
};

export type UpdatePlanMutationPayload = {
  __typename?: 'UpdatePlanMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<ErrorType>;
  plan?: Maybe<Plan>;
};

export type UpdatedAtColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'UpdatedAtColumnBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type UserFeedbackMutationInput = {
  action?: InputMaybe<Scalars['ID']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  comment: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  plan: Scalars['ID'];
  type?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type UserFeedbackMutationPayload = {
  __typename?: 'UserFeedbackMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<ErrorType>;
  feedback?: Maybe<UserFeedbackNode>;
};

export type UserFeedbackNode = {
  __typename?: 'UserFeedbackNode';
  action?: Maybe<Action>;
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isProcessed: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  plan: Plan;
  type?: Maybe<UserFeedbackType>;
  url: Scalars['String'];
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

export type WorkflowStateDescription = {
  __typename?: 'WorkflowStateDescription';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type GetSitemapQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSitemapQuery = (
  { planIndicators?: Array<(
    { id: string }
    & { __typename?: 'Indicator' }
  ) | null> | null, plan?: (
    { primaryLanguage: string, otherLanguages?: Array<string> | null, actions: Array<(
      { identifier: string }
      & { __typename?: 'Action' }
    )>, pages?: Array<(
      { urlPath: string }
      & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    ) | null> | null }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type MultiUseImageFragmentFragment = (
  { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
    { id: string, width: number, height: number, src: string }
    & { __typename?: 'ImageRendition' }
  ) | null, large?: (
    { id: string, width: number, height: number, src: string }
    & { __typename?: 'ImageRendition' }
  ) | null, small?: (
    { id: string, width: number, height: number, src: string }
    & { __typename?: 'ImageRendition' }
  ) | null, social?: (
    { id: string, width: number, height: number, src: string }
    & { __typename?: 'ImageRendition' }
  ) | null, rendition?: (
    { id: string, width: number, height: number, src: string }
    & { __typename?: 'ImageRendition' }
  ) | null }
  & { __typename?: 'Image' }
);

export type GetAutocompleteResultsQueryVariables = Exact<{
  plan: Scalars['ID'];
  term: Scalars['String'];
}>;


export type GetAutocompleteResultsQuery = (
  { search?: (
    { hits?: Array<(
      { id?: string | null, title?: string | null, url?: string | null, highlight?: string | null, plan?: (
        { identifier: string, name: string, shortName?: string | null, image?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Plan' }
      ) | null, object?: (
        { identifier: string }
        & { __typename: 'Action' }
      ) | (
        { id: string }
        & { __typename: 'Indicator' }
      ) | null, page?: (
        { title: string }
        & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ) | (
        { title: string, category?: (
          { level?: (
            { name: string }
            & { __typename?: 'CategoryLevel' }
          ) | null }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'CategoryPage' }
      ) | null }
      & { __typename?: 'SearchHit' }
    ) | null> | null }
    & { __typename?: 'SearchResults' }
  ) | null }
  & { __typename?: 'Query' }
);

export type ActionHightlightListQueryVariables = Exact<{
  plan: Scalars['ID'];
  first: Scalars['Int'];
  orderBy: Scalars['String'];
}>;


export type ActionHightlightListQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, color?: string | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, plan: (
      { id: string }
      & { __typename?: 'Plan' }
    ), status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename?: 'ActionStatusSummary' }
    ), implementationPhase?: (
      { id: string, name: string, identifier: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, parent?: (
        { id: string, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, parent?: (
          { id: string, image?: (
            { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'Action' }
  )> | null }
  & { __typename?: 'Query' }
);

export type ActionUpdatesQueryVariables = Exact<{
  plan: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type ActionUpdatesQuery = (
  { action?: (
    { statusUpdates: Array<(
      { id: string, title: string, date: any, content: string, author?: (
        { id: string, firstName: string, lastName: string, avatarUrl?: string | null }
        & { __typename?: 'Person' }
      ) | null }
      & { __typename?: 'ActionStatusUpdate' }
    )> }
    & { __typename?: 'Action' }
  ) | null }
  & { __typename?: 'Query' }
);

export type GetActionListQueryVariables = Exact<{
  plan: Scalars['ID'];
  clientUrl: Scalars['String'];
}>;


export type GetActionListQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, completion?: number | null, image?: (
      { id: string, rendition?: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
        { id: string }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )>, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename?: 'ActionStatusSummary' }
    ), implementationPhase?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, primaryOrg?: (
      { id: string, abbreviation: string, name: string, logo?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Organization' }
    ) | null, mergedWith?: (
      { id: string, identifier: string, plan: (
        { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, plan: (
      { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Plan' }
    ) }
    & { __typename?: 'Action' }
  )> | null }
  & { __typename?: 'Query' }
);

export type ContactDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ContactDetailsQuery = (
  { person?: (
    { email: string, organization: (
      { id: string, name: string, ancestors?: Array<(
        { name: string, classification?: (
          { id: string, name: string }
          & { __typename?: 'OrganizationClass' }
        ) | null }
        & { __typename?: 'Organization' }
      ) | null> | null }
      & { __typename?: 'Organization' }
    ) }
    & { __typename?: 'Person' }
  ) | null }
  & { __typename?: 'Query' }
);

export type CreateUserFeedbackMutationVariables = Exact<{
  input: UserFeedbackMutationInput;
}>;


export type CreateUserFeedbackMutation = (
  { createUserFeedback?: (
    { feedback?: (
      { createdAt: any }
      & { __typename?: 'UserFeedbackNode' }
    ) | null, errors: Array<(
      { field: string, messages: Array<string> }
      & { __typename?: 'ErrorType' }
    )> }
    & { __typename?: 'UserFeedbackMutationPayload' }
  ) | null }
  & { __typename?: 'Mutation' }
);

export type SearchQueryQueryVariables = Exact<{
  plan: Scalars['ID'];
  query: Scalars['String'];
  onlyOtherPlans?: InputMaybe<Scalars['Boolean']>;
  clientUrl?: InputMaybe<Scalars['String']>;
}>;


export type SearchQueryQuery = (
  { search?: (
    { hits?: Array<(
      { title?: string | null, url?: string | null, highlight?: string | null, plan?: (
        { identifier: string, name: string, shortName?: string | null, image?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, organization: (
          { name: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Plan' }
      ) | null, object?: (
        { identifier: string, primaryOrg?: (
          { name: string, logo?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null }
          & { __typename?: 'Organization' }
        ) | null }
        & { __typename: 'Action' }
      ) | (
        { id: string }
        & { __typename: 'Indicator' }
      ) | null, page?: (
        { title: string }
        & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ) | (
        { title: string, category?: (
          { level?: (
            { name: string }
            & { __typename?: 'CategoryLevel' }
          ) | null }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'CategoryPage' }
      ) | null }
      & { __typename?: 'SearchHit' }
    ) | null> | null }
    & { __typename?: 'SearchResults' }
  ) | null }
  & { __typename?: 'Query' }
);

export type GetWorkflowsQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type GetWorkflowsQuery = (
  { workflowStates?: Array<(
    { id?: string | null, description?: string | null }
    & { __typename?: 'WorkflowStateDescription' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

export type GetActionListForBlockQueryVariables = Exact<{
  plan: Scalars['ID'];
  category?: InputMaybe<Scalars['ID']>;
  clientUrl?: InputMaybe<Scalars['String']>;
}>;


export type GetActionListForBlockQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, completion?: number | null, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
        { id: string }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )>, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename?: 'ActionStatusSummary' }
    ), implementationPhase?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, primaryOrg?: (
      { id: string, abbreviation: string, name: string, logo?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Organization' }
    ) | null, mergedWith?: (
      { id: string, identifier: string, plan: (
        { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, plan: (
      { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Plan' }
    ) }
    & { __typename?: 'Action' }
  )> | null }
  & { __typename?: 'Query' }
);

export type GetActionListForGraphsQueryVariables = Exact<{
  plan: Scalars['ID'];
  categoryId?: InputMaybe<Scalars['ID']>;
}>;


export type GetActionListForGraphsQuery = (
  { planActions?: Array<(
    { color?: string | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename?: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename?: 'ActionTimeliness' }
    ), implementationPhase?: (
      { identifier: string, name: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null }
    & { __typename?: 'Action' }
  )> | null }
  & { __typename?: 'Query' }
);

export type GetCategoryAttributeTypesQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type GetCategoryAttributeTypesQuery = (
  { plan?: (
    { id: string, categoryTypes: Array<(
      { id: string, name: string, attributeTypes: Array<(
        { format: AttributeTypeFormat, identifier: string, choiceOptions: Array<(
          { identifier: string }
          & { __typename?: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      )> }
      & { __typename?: 'CategoryType' }
    )> }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type GetCategoriesForTreeMapQueryVariables = Exact<{
  plan: Scalars['ID'];
  categoryType: Scalars['ID'];
  attributeType: Scalars['ID'];
}>;


export type GetCategoriesForTreeMapQuery = (
  { planCategories?: Array<(
    { id: string, name: string, leadParagraph: string, color?: string | null, image?: (
      { id: string, title: string, imageCredit: string, altText: string, rendition?: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, categoryPage?: (
      { id?: string | null, title: string, path: string, slug: string, url?: string | null, urlPath: string, depth?: number | null, contentType: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' } | { __typename?: 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { value: string }
        & { __typename?: 'RichTextBlock' }
      ) | null> | null }
      & { __typename?: 'CategoryPage' }
    ) | null, parent?: (
      { id: string }
      & { __typename?: 'Category' }
    ) | null, level?: (
      { id: string, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ), attributes?: Array<{ __typename?: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeRichText' | 'AttributeText' } | (
      { value: number }
      & { __typename?: 'AttributeNumericValue' }
    )> | null }
    & { __typename?: 'Category' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

export type CommonCategoryFragmentFragment = (
  { common?: (
    { id: string, identifier: string, name: string, order: number }
    & { __typename?: 'CommonCategory' }
  ) | null }
  & { __typename?: 'Category' }
);

export type PlanFragmentFragment = (
  { id: string, categoryTypes: Array<(
    { id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common?: (
      { identifier: string, name: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CommonCategoryType' }
    ) | null, categories: Array<(
      { id: string, identifier: string, order: number, name: string, color?: string | null, iconSvgUrl?: string | null, parent?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, common?: (
        { id: string, identifier: string, name: string, order: number }
        & { __typename?: 'CommonCategory' }
      ) | null }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'CategoryType' }
  )>, primaryOrgs: Array<(
    { id: string, abbreviation: string, name: string }
    & { __typename?: 'Organization' }
  ) | null> }
  & { __typename?: 'Plan' }
);

export type ActionFragmentFragment = (
  { id: string, identifier: string, name: string, viewUrl?: string, color?: string | null, manualStatusReason?: string | null, completion?: number | null, officialName?: string | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, status?: (
    { id: string, identifier: string, name: string, color?: string | null }
    & { __typename?: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, common?: (
      { id: string }
      & { __typename?: 'CommonCategory' }
    ) | null }
    & { __typename?: 'Category' }
  )>, implementationPhase?: (
    { id: string, identifier: string, name: string, order: number }
    & { __typename?: 'ActionImplementationPhase' }
  ) | null, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
    & { __typename?: 'ActionStatusSummary' }
  ), timeliness: (
    { identifier: ActionTimelinessIdentifier }
    & { __typename?: 'ActionTimeliness' }
  ), plan?: (
    { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null }
    & { __typename?: 'Plan' }
  ), schedule: Array<(
    { id: string }
    & { __typename?: 'ActionSchedule' }
  )>, impact?: (
    { id: string, identifier: string }
    & { __typename?: 'ActionImpact' }
  ) | null, attributes: Array<(
    { id: string, type: (
      { id: string }
      & { __typename?: 'AttributeType' }
    ) }
    & { __typename: 'AttributeCategoryChoice' | 'AttributeNumericValue' | 'AttributeRichText' | 'AttributeText' }
  ) | (
    { id: string, choice?: (
      { id: string, name: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    ) | null, type: (
      { id: string }
      & { __typename?: 'AttributeType' }
    ) }
    & { __typename: 'AttributeChoice' }
  )>, responsibleParties: Array<(
    { id: string, role?: ActionResponsiblePartyRole | null, organization: (
      { id: string, abbreviation: string, name: string }
      & { __typename?: 'Organization' }
    ) }
    & { __typename?: 'ActionResponsibleParty' }
  )>, primaryOrg?: (
    { id: string, abbreviation: string, name: string, logo?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null }
    & { __typename?: 'Organization' }
  ) | null, contactPersons: Array<(
    { id: string, person: (
      { organization: (
        { id: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'Person' }
    ) }
    & { __typename?: 'ActionContactPerson' }
  )>, tasks: Array<(
    { id: string, state: ActionTaskState, dueAt: any }
    & { __typename?: 'ActionTask' }
  )>, mergedWith?: (
    { id: string, identifier: string, plan: (
      { id: string, shortName?: string | null, viewUrl?: string | null }
      & { __typename?: 'Plan' }
    ) }
    & { __typename?: 'Action' }
  ) | null, indicators: Array<(
    { id: string, goals?: Array<(
      { id: string }
      & { __typename?: 'IndicatorGoal' }
    ) | null> | null }
    & { __typename?: 'Indicator' }
  )>, relatedIndicators: Array<(
    { id: string, indicatesActionProgress: boolean, indicator: (
      { id: string, goals?: Array<(
        { id: string }
        & { __typename?: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename?: 'Indicator' }
    ) }
    & { __typename?: 'ActionIndicator' }
  )> }
  & { __typename?: 'Action' }
);

export type OrganizationFragmentFragment = (
  { id: string, abbreviation: string, name: string, contactPersonCount: number, actionCount: number, classification?: (
    { name: string }
    & { __typename?: 'OrganizationClass' }
  ) | null, parent?: (
    { id: string }
    & { __typename?: 'Organization' }
  ) | null }
  & { __typename?: 'Organization' }
);

export type DashboardActionListQueryVariables = Exact<{
  plan: Scalars['ID'];
  relatedPlanActions: Scalars['Boolean'];
  path: Scalars['String'];
}>;


export type DashboardActionListQuery = (
  { plan?: (
    { id: string, categoryTypes: Array<(
      { id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common?: (
        { identifier: string, name: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CommonCategoryType' }
      ) | null, categories: Array<(
        { id: string, identifier: string, order: number, name: string, color?: string | null, iconSvgUrl?: string | null, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, common?: (
          { id: string, identifier: string, name: string, order: number }
          & { __typename?: 'CommonCategory' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    )>, primaryOrgs: Array<(
      { id: string, abbreviation: string, name: string }
      & { __typename?: 'Organization' }
    ) | null> }
    & { __typename?: 'Plan' }
  ) | null, planActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl?: string, color?: string | null, manualStatusReason?: string | null, completion?: number | null, officialName?: string | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, common?: (
        { id: string }
        & { __typename?: 'CommonCategory' }
      ) | null }
      & { __typename?: 'Category' }
    )>, implementationPhase?: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
      & { __typename?: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename?: 'ActionTimeliness' }
    ), plan?: (
      { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename?: 'ActionSchedule' }
    )>, impact?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
        { id: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeNumericValue' | 'AttributeRichText' | 'AttributeText' }
    ) | (
      { id: string, choice?: (
        { id: string, name: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    )>, responsibleParties: Array<(
      { id: string, role?: ActionResponsiblePartyRole | null, organization: (
        { id: string, abbreviation: string, name: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'ActionResponsibleParty' }
    )>, primaryOrg?: (
      { id: string, abbreviation: string, name: string, logo?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Organization' }
    ) | null, contactPersons: Array<(
      { id: string, person: (
        { organization: (
          { id: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Person' }
      ) }
      & { __typename?: 'ActionContactPerson' }
    )>, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: any }
      & { __typename?: 'ActionTask' }
    )>, mergedWith?: (
      { id: string, identifier: string, plan: (
        { id: string, shortName?: string | null, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, indicators: Array<(
      { id: string, goals?: Array<(
        { id: string }
        & { __typename?: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename?: 'Indicator' }
    )>, relatedIndicators: Array<(
      { id: string, indicatesActionProgress: boolean, indicator: (
        { id: string, goals?: Array<(
          { id: string }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'ActionIndicator' }
    )> }
    & { __typename?: 'Action' }
  )> | null, relatedPlanActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl?: string, color?: string | null, manualStatusReason?: string | null, completion?: number | null, officialName?: string | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, common?: (
        { id: string }
        & { __typename?: 'CommonCategory' }
      ) | null }
      & { __typename?: 'Category' }
    )>, implementationPhase?: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
      & { __typename?: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename?: 'ActionTimeliness' }
    ), plan?: (
      { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename?: 'ActionSchedule' }
    )>, impact?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
        { id: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeNumericValue' | 'AttributeRichText' | 'AttributeText' }
    ) | (
      { id: string, choice?: (
        { id: string, name: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    )>, responsibleParties: Array<(
      { id: string, role?: ActionResponsiblePartyRole | null, organization: (
        { id: string, abbreviation: string, name: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'ActionResponsibleParty' }
    )>, primaryOrg?: (
      { id: string, abbreviation: string, name: string, logo?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Organization' }
    ) | null, contactPersons: Array<(
      { id: string, person: (
        { organization: (
          { id: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Person' }
      ) }
      & { __typename?: 'ActionContactPerson' }
    )>, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: any }
      & { __typename?: 'ActionTask' }
    )>, mergedWith?: (
      { id: string, identifier: string, plan: (
        { id: string, shortName?: string | null, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, indicators: Array<(
      { id: string, goals?: Array<(
        { id: string }
        & { __typename?: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename?: 'Indicator' }
    )>, relatedIndicators: Array<(
      { id: string, indicatesActionProgress: boolean, indicator: (
        { id: string, goals?: Array<(
          { id: string }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'ActionIndicator' }
    )> }
    & { __typename?: 'Action' }
  )> | null, planPage?: { __typename: 'AccessibilityStatementPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } | (
    { dashboardColumns?: Array<(
      { columnLabel?: string | null }
      & { __typename: 'IdentifierColumnBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
    )> | null }
    & { __typename: 'ActionListPage' }
  ) | null, planOrganizations?: Array<(
    { id: string, abbreviation: string, name: string, contactPersonCount: number, actionCount: number, classification?: (
      { name: string }
      & { __typename?: 'OrganizationClass' }
    ) | null, parent?: (
      { id: string }
      & { __typename?: 'Organization' }
    ) | null }
    & { __typename?: 'Organization' }
  )> | null }
  & { __typename?: 'Query' }
);

export type GetEmbedActionQueryVariables = Exact<{
  plan: Scalars['ID'];
  identifier: Scalars['ID'];
}>;


export type GetEmbedActionQuery = (
  { action?: (
    { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, color?: string | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, plan: (
      { id: string }
      & { __typename?: 'Plan' }
    ), statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename?: 'ActionStatusSummary' }
    ), status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, implementationPhase?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, parent?: (
        { id: string, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, parent?: (
          { id: string, image?: (
            { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'Action' }
  ) | null }
  & { __typename?: 'Query' }
);

export type IndicatorHightlightListQueryVariables = Exact<{
  plan: Scalars['ID'];
  first: Scalars['Int'];
  orderBy: Scalars['String'];
}>;


export type IndicatorHightlightListQuery = (
  { planIndicators?: Array<(
    { id: string, identifier?: string | null, name: string, updatedAt: any, level?: string | null, unit: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ), latestValue?: (
      { id: string, value: number }
      & { __typename?: 'IndicatorValue' }
    ) | null }
    & { __typename?: 'Indicator' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

export type IndicatorListQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type IndicatorListQuery = (
  { plan?: (
    { id: string, features: (
      { hasActionPrimaryOrgs: boolean }
      & { __typename?: 'PlanFeatures' }
    ), indicatorLevels: Array<(
      { level: IndicatorLevelLevel, indicator: (
        { id: string, name: string, timeResolution: IndicatorTimeResolution, organization: (
          { id: string, name: string }
          & { __typename?: 'Organization' }
        ), common?: (
          { id: string, name: string, normalizations?: Array<(
            { unit?: (
              { shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null, normalizer?: (
              { name: string, id: string, identifier?: string | null }
              & { __typename?: 'CommonIndicator' }
            ) | null }
            & { __typename?: 'CommonIndicatorNormalization' }
          ) | null> | null }
          & { __typename?: 'CommonIndicator' }
        ) | null, categories: Array<(
          { id: string, name: string, parent?: (
            { id: string }
            & { __typename?: 'Category' }
          ) | null, type: (
            { id: string, identifier: string }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )>, latestGraph?: (
          { id: string }
          & { __typename?: 'IndicatorGraph' }
        ) | null, latestValue?: (
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null }
          & { __typename?: 'IndicatorValue' }
        ) | null, unit: (
          { shortName?: string | null }
          & { __typename?: 'Unit' }
        ) }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'IndicatorLevel' }
    )>, categoryTypes: Array<(
      { name: string, id: string, identifier: string, categories: Array<(
        { id: string, identifier: string, order: number, name: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    )> }
    & { __typename?: 'Plan' }
  ) | null, planIndicators?: Array<(
    { id: string, relatedCauses: Array<(
      { id: string, effectType: RelatedIndicatorEffectType, causalIndicator: (
        { id: string }
        & { __typename?: 'Indicator' }
      ), effectIndicator: (
        { id: string }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'RelatedIndicator' }
    )>, common?: (
      { id: string, name: string, indicators: Array<(
        { id: string, organization: (
          { name: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Indicator' }
      )>, relatedCauses: Array<(
        { effectType: RelatedCommonIndicatorEffectType, causalIndicator: (
          { id: string, name: string }
          & { __typename?: 'CommonIndicator' }
        ) }
        & { __typename?: 'RelatedCommonIndicator' }
      )>, relatedEffects: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: (
          { id: string, name: string }
          & { __typename?: 'CommonIndicator' }
        ) }
        & { __typename?: 'RelatedCommonIndicator' }
      )> }
      & { __typename?: 'CommonIndicator' }
    ) | null }
    & { __typename?: 'Indicator' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

export type IndicatorGraphDataQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  plan?: InputMaybe<Scalars['ID']>;
}>;


export type IndicatorGraphDataQuery = (
  { plan?: (
    { scenarios: Array<(
      { id: string, identifier: string, name: string }
      & { __typename?: 'Scenario' }
    )> }
    & { __typename?: 'Plan' }
  ) | null, indicator?: (
    { id: string, name: string, timeResolution: IndicatorTimeResolution, minValue?: number | null, maxValue?: number | null, organization: (
      { id: string, name: string, abbreviation: string }
      & { __typename?: 'Organization' }
    ), quantity?: (
      { id: string, name: string }
      & { __typename?: 'Quantity' }
    ) | null, values?: Array<(
      { id: string, date?: string | null, value: number, normalizedValues?: Array<(
        { normalizerId?: string | null, value?: number | null }
        & { __typename?: 'NormalizedValue' }
      ) | null> | null, categories: Array<(
        { id: string }
        & { __typename?: 'DimensionCategory' }
      )> }
      & { __typename?: 'IndicatorValue' }
    ) | null> | null, dimensions: Array<(
      { dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename?: 'DimensionCategory' }
        )> }
        & { __typename?: 'Dimension' }
      ) }
      & { __typename?: 'IndicatorDimension' }
    )>, goals?: Array<(
      { id: string, date?: string | null, value: number, normalizedValues?: Array<(
        { normalizerId?: string | null, value?: number | null }
        & { __typename?: 'NormalizedValue' }
      ) | null> | null, scenario?: (
        { id: string }
        & { __typename?: 'Scenario' }
      ) | null }
      & { __typename?: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName?: string | null, verboseName?: string | null, verboseNamePlural?: string | null }
      & { __typename?: 'Unit' }
    ), common?: (
      { id: string, name: string, normalizations?: Array<(
        { unit?: (
          { shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null, normalizer?: (
          { name: string, id: string, identifier?: string | null }
          & { __typename?: 'CommonIndicator' }
        ) | null }
        & { __typename?: 'CommonIndicatorNormalization' }
      ) | null> | null, indicators: Array<(
        { id: string, timeResolution: IndicatorTimeResolution, minValue?: number | null, maxValue?: number | null, organization: (
          { id: string, name: string, abbreviation: string }
          & { __typename?: 'Organization' }
        ), quantity?: (
          { id: string, name: string }
          & { __typename?: 'Quantity' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null, categories: Array<(
            { id: string }
            & { __typename?: 'DimensionCategory' }
          )> }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, dimensions: Array<(
          { dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string }
              & { __typename?: 'DimensionCategory' }
            )> }
            & { __typename?: 'Dimension' }
          ) }
          & { __typename?: 'IndicatorDimension' }
        )>, goals?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null, scenario?: (
            { id: string }
            & { __typename?: 'Scenario' }
          ) | null }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName?: string | null, verboseName?: string | null, verboseNamePlural?: string | null }
          & { __typename?: 'Unit' }
        ) }
        & { __typename?: 'Indicator' }
      )> }
      & { __typename?: 'CommonIndicator' }
    ) | null }
    & { __typename?: 'Indicator' }
  ) | null }
  & { __typename?: 'Query' }
);

export type PlaywrightGetPlanBasicsQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type PlaywrightGetPlanBasicsQuery = (
  { plan?: (
    { id: string, identifier: string, primaryLanguage: string, otherLanguages?: Array<string> | null }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type PlaywrightGetPlanInfoQueryVariables = Exact<{
  plan: Scalars['ID'];
  locale: Scalars['String'];
  clientURL: Scalars['String'];
}>;


export type PlaywrightGetPlanInfoQuery = (
  { plan?: (
    { id: string, identifier: string, name: string, shortName?: string | null, primaryLanguage: string, otherLanguages?: Array<string> | null, parent?: (
      { identifier: string, name: string }
      & { __typename?: 'Plan' }
    ) | null, generalContent: (
      { id: string, siteTitle: string, siteDescription: string }
      & { __typename?: 'SiteGeneralContent' }
    ), actionListPage?: (
      { urlPath: string }
      & { __typename?: 'ActionListPage' }
    ) | null, actions: Array<(
      { identifier: string, viewUrl: string }
      & { __typename?: 'Action' }
    )>, mainMenu?: (
      { items: Array<(
        { linkText: string, url: string }
        & { __typename: 'ExternalLinkMenuItem' }
      ) | (
        { page: (
          { id?: string | null, title: string, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent?: (
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename?: 'PageMenuItem' }
        ) | null }
        & { __typename: 'PageMenuItem' }
      ) | null> }
      & { __typename?: 'MainMenu' }
    ) | null }
    & { __typename?: 'Plan' }
  ) | null, planIndicators?: Array<(
    { id: string, name: string }
    & { __typename?: 'Indicator' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

type AttributesBlockAttribute_AttributeCategoryChoice_Fragment = (
  { id: string, categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
      { id: string, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    ) | null, image?: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, iconImage?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, categoryPage?: (
      { id?: string | null, title: string, urlPath: string, live: boolean }
      & { __typename?: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ), parent?: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null, level?: (
          { id: string, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, title: string, urlPath: string, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      ) | null, level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, title: string, urlPath: string, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    ) | null }
    & { __typename?: 'Category' }
  )>, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttribute_AttributeChoice_Fragment = (
  { text?: string | null, id: string, choice?: (
    { id: string, name: string }
    & { __typename?: 'AttributeTypeChoiceOption' }
  ) | null, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttribute_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttribute_AttributeRichText_AttributeText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' | 'AttributeText' }
);

export type AttributesBlockAttributeFragment = AttributesBlockAttribute_AttributeCategoryChoice_Fragment | AttributesBlockAttribute_AttributeChoice_Fragment | AttributesBlockAttribute_AttributeNumericValue_Fragment | AttributesBlockAttribute_AttributeRichText_AttributeText_Fragment;

export type AttributesBlockAttributeTypeFragment = (
  { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
    { id: string, identifier: string }
    & { __typename?: 'AttributeTypeChoiceOption' }
  )>, unit?: (
    { id: string, name: string }
    & { __typename?: 'Unit' }
  ) | null }
  & { __typename: 'AttributeType' }
);

type AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment = (
  { id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ), categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
      { id: string, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    ) | null, image?: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, iconImage?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, categoryPage?: (
      { id?: string | null, title: string, urlPath: string, live: boolean }
      & { __typename?: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ), parent?: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null, level?: (
          { id: string, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, title: string, urlPath: string, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      ) | null, level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, title: string, urlPath: string, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    ) | null }
    & { __typename?: 'Category' }
  )> }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment = (
  { text?: string | null, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ), choice?: (
    { id: string, name: string }
    & { __typename?: 'AttributeTypeChoiceOption' }
  ) | null }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttributeWithNestedType_AttributeRichText_AttributeText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
      { id: string, name: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' | 'AttributeText' }
);

export type AttributesBlockAttributeWithNestedTypeFragment = AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment | AttributesBlockAttributeWithNestedType_AttributeRichText_AttributeText_Fragment;

export type ActionCardFragment = (
  { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, completion?: number | null, status?: (
    { id: string, identifier: string, name: string, color?: string | null }
    & { __typename?: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
      { id: string }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'Category' }
  )>, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier }
    & { __typename?: 'ActionStatusSummary' }
  ), implementationPhase?: (
    { id: string, identifier: string, name: string }
    & { __typename?: 'ActionImplementationPhase' }
  ) | null, primaryOrg?: (
    { id: string, abbreviation: string, name: string, logo?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null }
    & { __typename?: 'Organization' }
  ) | null, mergedWith?: (
    { id: string, identifier: string, plan: (
      { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
      & { __typename?: 'Plan' }
    ) }
    & { __typename?: 'Action' }
  ) | null, plan: (
    { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null }
    & { __typename?: 'Plan' }
  ) }
  & { __typename?: 'Action' }
);

type ActionListFilter_IhjBBwez7fLS40GnTtqRZjjy0Kv1vAh93c8Pfw7sak_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
);

type ActionListFilter_Yd6843xP2XelxNnPKdcDbk203MDs5Q6T1Tb6rBhv7pY_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' }
);

type ActionListFilter_4ScTt4ie8YitgYVvz5GlLw_357S0lTasi8Sapx3PqU_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
);

type ActionListFilter_DA5CmOaKlFnDfcyfLmbDvczqEPiS6OLl8O5B2gztSa_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' }
);

type ActionListFilter_Gi2hvv85vZlZPcrA0h1jHIoERy23S38fsyeyqhZKpts_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type ActionListFilter_ActionAttributeTypeFilterBlock_Fragment = (
  { showAllLabel?: string | null, field: string, id?: string | null, attributeType: (
    { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'ActionAttributeTypeFilterBlock' }
);

type ActionListFilter_CategoryTypeFilterBlock_Fragment = (
  { style?: string | null, showAllLabel?: string | null, depth?: number | null, field: string, id?: string | null, categoryType?: (
    { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
      { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null, common?: (
        { id: string }
        & { __typename?: 'CommonCategory' }
      ) | null }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'CategoryType' }
  ) | null }
  & { __typename: 'CategoryTypeFilterBlock' }
);

export type ActionListFilterFragment = ActionListFilter_IhjBBwez7fLS40GnTtqRZjjy0Kv1vAh93c8Pfw7sak_Fragment | ActionListFilter_Yd6843xP2XelxNnPKdcDbk203MDs5Q6T1Tb6rBhv7pY_Fragment | ActionListFilter_4ScTt4ie8YitgYVvz5GlLw_357S0lTasi8Sapx3PqU_Fragment | ActionListFilter_DA5CmOaKlFnDfcyfLmbDvczqEPiS6OLl8O5B2gztSa_Fragment | ActionListFilter_Gi2hvv85vZlZPcrA0h1jHIoERy23S38fsyeyqhZKpts_Fragment | ActionListFilter_ActionAttributeTypeFilterBlock_Fragment | ActionListFilter_CategoryTypeFilterBlock_Fragment;

export type ActionListPageFiltersFragment = (
  { primaryFilters?: Array<(
    { showAllLabel?: string | null, field: string, id?: string | null, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename?: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { field: string, id?: string | null }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style?: string | null, showAllLabel?: string | null, depth?: number | null, field: string, id?: string | null, categoryType?: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null, common?: (
          { id: string }
          & { __typename?: 'CommonCategory' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  )> | null, mainFilters?: Array<(
    { showAllLabel?: string | null, field: string, id?: string | null, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename?: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { field: string, id?: string | null }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style?: string | null, showAllLabel?: string | null, depth?: number | null, field: string, id?: string | null, categoryType?: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null, common?: (
          { id: string }
          & { __typename?: 'CommonCategory' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  )> | null, advancedFilters?: Array<(
    { showAllLabel?: string | null, field: string, id?: string | null, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename?: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { field: string, id?: string | null }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style?: string | null, showAllLabel?: string | null, depth?: number | null, field: string, id?: string | null, categoryType?: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null, common?: (
          { id: string }
          & { __typename?: 'CommonCategory' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  )> | null }
  & { __typename?: 'ActionListPage' }
);

export type ActionTableColumnFragmentFragment = (
  { dashboardColumns?: Array<(
    { columnLabel?: string | null }
    & { __typename: 'IdentifierColumnBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
  )> | null }
  & { __typename?: 'ActionListPage' }
);

export type CategoryTypeFragmentFragment = (
  { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
    { id: string, order: number, name: string, namePlural?: string | null }
    & { __typename?: 'CategoryLevel' }
  )> }
  & { __typename?: 'CategoryType' }
);

export type CategoryFragmentFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
    { id: string, name: string, namePlural?: string | null }
    & { __typename?: 'CategoryLevel' }
  ) | null, image?: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, large?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, small?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, social?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, rendition?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null, iconImage?: (
    { rendition?: (
      { src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null, categoryPage?: (
    { id?: string | null, title: string, urlPath: string, live: boolean }
    & { __typename?: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename?: 'CategoryType' }
  ) }
  & { __typename?: 'Category' }
);

export type CategoryWithParentsFragmentFragment = (
  { parent?: (
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
          { id: string, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, title: string, urlPath: string, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      ) | null, level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, title: string, urlPath: string, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    ) | null, level?: (
      { id: string, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    ) | null, image?: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, iconImage?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, categoryPage?: (
      { id?: string | null, title: string, urlPath: string, live: boolean }
      & { __typename?: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'Category' }
  ) | null }
  & { __typename?: 'Category' }
);

export type CategoryRecursiveFragmentFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
    { id: string, name: string, namePlural?: string | null }
    & { __typename?: 'CategoryLevel' }
  ) | null, image?: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, large?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, small?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, social?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, rendition?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null, iconImage?: (
    { rendition?: (
      { src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null, categoryPage?: (
    { id?: string | null, title: string, urlPath: string, live: boolean }
    & { __typename?: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename?: 'CategoryType' }
  ), parent?: (
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
          { id: string, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, title: string, urlPath: string, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      ) | null, level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, title: string, urlPath: string, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    ) | null, level?: (
      { id: string, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    ) | null, image?: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, iconImage?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, categoryPage?: (
      { id?: string | null, title: string, urlPath: string, live: boolean }
      & { __typename?: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'Category' }
  ) | null }
  & { __typename?: 'Category' }
);

type StreamFieldFragment_Ize9dJArng6qjN9ZgqxnjBWpTKxclmuDcqywLaE9c_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' }
);

type StreamFieldFragment_P4DZgRiVf47KymI0hetvY2c4nXYoAy7QJhWbSmb9Q_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' }
);

type StreamFieldFragment_K7Lj6Dl_5ZajF5uRZrNfk8JysbyjpOf9Yx86ArHA_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' }
);

type StreamFieldFragment_GRpXjOhhShFNq37UTrxwyvrMDxLtrF59y18indXgl3k_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment = (
  { id?: string | null, blockType: string, field: string, blocks: Array<(
    { id?: string | null, field: string }
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { value: string, id?: string | null, field: string }
    & { __typename?: 'CharBlock' }
  )> }
  & { __typename?: 'AccessibilityStatementContactInformationBlock' }
);

type StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment = (
  { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' } | { __typename?: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
    { heading?: string | null, lead?: string | null, category?: (
      { id: string, type: (
        { identifier: string }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    ) | null }
    & { __typename?: 'ActionCategoryFilterCardBlock' }
  ) | null> | null }
  & { __typename?: 'ActionCategoryFilterCardsBlock' }
);

type StreamFieldFragment_ActionListBlock_Fragment = (
  { id?: string | null, blockType: string, field: string, categoryFilter?: (
    { id: string }
    & { __typename?: 'Category' }
  ) | null }
  & { __typename?: 'ActionListBlock' }
);

type StreamFieldFragment_AdaptiveEmbedBlock_Fragment = (
  { fullWidth?: boolean | null, id?: string | null, blockType: string, field: string, embed?: (
    { html?: string | null }
    & { __typename?: 'EmbedHTMLValue' }
  ) | null }
  & { __typename?: 'AdaptiveEmbedBlock' }
);

type StreamFieldFragment_CardListBlock_Fragment = (
  { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
    { heading?: string | null, content?: string | null, link?: string | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null }
    & { __typename?: 'CardBlock' }
  ) | null> | null }
  & { __typename?: 'CardListBlock' }
);

type StreamFieldFragment_CartographyVisualisationBlock_Fragment = (
  { style?: string | null, styleOverrides?: string | null, id?: string | null, blockType: string, field: string, account?: (
    { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
    & { __typename?: 'CartographyProviderCredentials' }
  ) | null }
  & { __typename?: 'CartographyVisualisationBlock' }
);

type StreamFieldFragment_CategoryListBlock_Fragment = (
  { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
    { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, title: string, urlPath: string, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'CategoryType' }
  ) | null, category?: (
    { id: string, children: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, title: string, urlPath: string, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'Category' }
  ) | null }
  & { __typename?: 'CategoryListBlock' }
);

type StreamFieldFragment_CategoryTreeMapBlock_Fragment = (
  { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, valueAttribute?: (
    { identifier: string, unit?: (
      { shortName?: string | null }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename?: 'AttributeType' }
  ) | null, categoryType?: (
    { identifier: string }
    & { __typename?: 'CategoryType' }
  ) | null }
  & { __typename?: 'CategoryTreeMapBlock' }
);

type StreamFieldFragment_CharBlock_RichTextBlock_TextBlock_Fragment = (
  { value: string, id?: string | null, blockType: string, field: string }
  & { __typename?: 'CharBlock' | 'RichTextBlock' | 'TextBlock' }
);

type StreamFieldFragment_ChoiceBlock_Fragment = (
  { value: string, id?: string | null, blockType: string, field: string, choices: Array<(
    { key: string, value: string }
    & { __typename?: 'ChoiceOption' }
  )> }
  & { __typename?: 'ChoiceBlock' }
);

type StreamFieldFragment_FrontPageHeroBlock_Fragment = (
  { layout?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, image?: (
    { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, large?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, small?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, social?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, rendition?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null }
  & { __typename?: 'FrontPageHeroBlock' }
);

type StreamFieldFragment_IndicatorBlock_Fragment = (
  { style?: string | null, id?: string | null, blockType: string, field: string, indicator?: (
    { id: string }
    & { __typename?: 'Indicator' }
  ) | null }
  & { __typename?: 'IndicatorBlock' }
);

type StreamFieldFragment_IndicatorGroupBlock_Fragment = (
  { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
    { style?: string | null, indicator?: (
      { id: string, identifier?: string | null, name: string, description?: string | null, timeResolution: IndicatorTimeResolution, level?: string | null, unit: (
        { id: string, name: string }
        & { __typename?: 'Unit' }
      ), latestValue?: (
        { id: string, date?: string | null, value: number }
        & { __typename?: 'IndicatorValue' }
      ) | null, goals?: Array<(
        { id: string, date?: string | null, value: number }
        & { __typename?: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename?: 'Indicator' }
    ) | null }
    & { __typename?: 'IndicatorBlock' }
  ) | null> | null }
  & { __typename?: 'IndicatorGroupBlock' }
);

type StreamFieldFragment_IndicatorShowcaseBlock_Fragment = (
  { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
    { id?: string | null }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  )>, indicator?: (
    { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
      { id: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ), latestValue?: (
      { id: string, date?: string | null, value: number }
      & { __typename?: 'IndicatorValue' }
    ) | null, values?: Array<(
      { id: string, date?: string | null, value: number, normalizedValues?: Array<(
        { normalizerId?: string | null, value?: number | null }
        & { __typename?: 'NormalizedValue' }
      ) | null> | null, categories: Array<(
        { id: string }
        & { __typename?: 'DimensionCategory' }
      )> }
      & { __typename?: 'IndicatorValue' }
    ) | null> | null, goals?: Array<(
      { id: string, date?: string | null, value: number, normalizedValues?: Array<(
        { normalizerId?: string | null, value?: number | null }
        & { __typename?: 'NormalizedValue' }
      ) | null> | null }
      & { __typename?: 'IndicatorGoal' }
    ) | null> | null, common?: (
      { id: string, normalizations?: Array<(
        { unit?: (
          { shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null, normalizer?: (
          { name: string, id: string, identifier?: string | null }
          & { __typename?: 'CommonIndicator' }
        ) | null }
        & { __typename?: 'CommonIndicatorNormalization' }
      ) | null> | null }
      & { __typename?: 'CommonIndicator' }
    ) | null }
    & { __typename?: 'Indicator' }
  ) | null, linkButton?: (
    { blockType: string }
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { text?: string | null, blockType: string, page?: (
      { url?: string | null, urlPath: string, slug: string }
      & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    ) | null }
    & { __typename?: 'PageLinkBlock' }
  ) | null }
  & { __typename?: 'IndicatorShowcaseBlock' }
);

type StreamFieldFragment_LargeImageBlock_Fragment = (
  { width?: string | null, id?: string | null, blockType: string, field: string, image?: (
    { title: string, altText: string, width: number, height: number, renditionUncropped?: (
      { src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null }
  & { __typename?: 'LargeImageBlock' }
);

type StreamFieldFragment_QuestionAnswerBlock_Fragment = (
  { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
    { question?: string | null, answer?: string | null }
    & { __typename?: 'QuestionBlock' }
  ) | null> | null }
  & { __typename?: 'QuestionAnswerBlock' }
);

export type StreamFieldFragmentFragment = StreamFieldFragment_Ize9dJArng6qjN9ZgqxnjBWpTKxclmuDcqywLaE9c_Fragment | StreamFieldFragment_P4DZgRiVf47KymI0hetvY2c4nXYoAy7QJhWbSmb9Q_Fragment | StreamFieldFragment_K7Lj6Dl_5ZajF5uRZrNfk8JysbyjpOf9Yx86ArHA_Fragment | StreamFieldFragment_GRpXjOhhShFNq37UTrxwyvrMDxLtrF59y18indXgl3k_Fragment | StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment | StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment | StreamFieldFragment_ActionListBlock_Fragment | StreamFieldFragment_AdaptiveEmbedBlock_Fragment | StreamFieldFragment_CardListBlock_Fragment | StreamFieldFragment_CartographyVisualisationBlock_Fragment | StreamFieldFragment_CategoryListBlock_Fragment | StreamFieldFragment_CategoryTreeMapBlock_Fragment | StreamFieldFragment_CharBlock_RichTextBlock_TextBlock_Fragment | StreamFieldFragment_ChoiceBlock_Fragment | StreamFieldFragment_FrontPageHeroBlock_Fragment | StreamFieldFragment_IndicatorBlock_Fragment | StreamFieldFragment_IndicatorGroupBlock_Fragment | StreamFieldFragment_IndicatorShowcaseBlock_Fragment | StreamFieldFragment_LargeImageBlock_Fragment | StreamFieldFragment_QuestionAnswerBlock_Fragment;

export type GetActionDetailsQueryVariables = Exact<{
  plan: Scalars['ID'];
  id: Scalars['ID'];
  clientUrl: Scalars['String'];
  workflow?: InputMaybe<WorkflowState>;
}>;


export type GetActionDetailsQuery = (
  { action?: (
    { id: string, identifier: string, name: string, officialName?: string | null, leadParagraph: string, description?: string | null, completion?: number | null, color?: string | null, updatedAt: any, manualStatusReason?: string | null, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, dateFormat?: ActionDateFormat | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, sentiment: Sentiment, isCompleted: boolean, isActive: boolean }
      & { __typename?: 'ActionStatusSummary' }
    ), links: Array<(
      { id: string, order: number, url: string, title: string }
      & { __typename?: 'ActionLink' }
    )>, mergedActions: Array<(
      { id: string, identifier: string, name: string, officialName?: string | null, plan: (
        { id: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    )>, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, categoryPage?: (
        { id?: string | null, title: string, urlPath: string, live: boolean }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ), parent?: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
              { id: string, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            ) | null, image?: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, large?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, small?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, social?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, rendition?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, iconImage?: (
              { rendition?: (
                { src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, categoryPage?: (
              { id?: string | null, title: string, urlPath: string, live: boolean }
              & { __typename?: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename?: 'CategoryType' }
            ) }
            & { __typename?: 'Category' }
          ) | null, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null, level?: (
          { id: string, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, title: string, urlPath: string, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'Category' }
    )>, emissionScopes: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string }
      & { __typename?: 'Category' }
    )>, contactPersons: Array<(
      { id: string, person: (
        { id: string, firstName: string, lastName: string, avatarUrl?: string | null, title?: string | null, organization: (
          { name: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Person' }
      ) }
      & { __typename?: 'ActionContactPerson' }
    )>, primaryOrg?: (
      { id: string, abbreviation: string, name: string, logo?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Organization' }
    ) | null, responsibleParties: Array<(
      { id: string, role?: ActionResponsiblePartyRole | null, specifier: string, organization: (
        { id: string, abbreviation: string, name: string, email: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'ActionResponsibleParty' }
    )>, tasks: Array<(
      { id: string, name: string, dueAt: any, dateFormat?: ActionTaskDateFormat | null, completedAt?: any | null, comment?: string | null, state: ActionTaskState }
      & { __typename?: 'ActionTask' }
    )>, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, implementationPhase?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, schedule: Array<(
      { id: string, name: string, beginsAt: any, endsAt?: any | null }
      & { __typename?: 'ActionSchedule' }
    )>, impact?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionImpact' }
    ) | null, statusUpdates: Array<(
      { id: string }
      & { __typename?: 'ActionStatusUpdate' }
    )>, relatedIndicators: Array<(
      { id: string, indicator: (
        { id: string, name: string, latestGraph?: (
          { id: string }
          & { __typename?: 'IndicatorGraph' }
        ) | null, latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, actions?: Array<(
          { id: string, identifier: string, name: string }
          & { __typename?: 'Action' }
        ) | null> | null, plans: Array<(
          { id: string }
          & { __typename?: 'Plan' }
        )> }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'ActionIndicator' }
    )>, relatedActions: Array<(
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
          { id: string }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename?: 'ActionStatusSummary' }
      ), implementationPhase?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionImplementationPhase' }
      ) | null, primaryOrg?: (
        { id: string, abbreviation: string, name: string, logo?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Organization' }
      ) | null, mergedWith?: (
        { id: string, identifier: string, plan: (
          { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
          & { __typename?: 'Plan' }
        ) }
        & { __typename?: 'Action' }
      ) | null, plan: (
        { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    )>, mergedWith?: (
      { id: string, identifier: string, plan: (
        { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, supersededBy?: (
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
          { id: string }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename?: 'ActionStatusSummary' }
      ), implementationPhase?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionImplementationPhase' }
      ) | null, primaryOrg?: (
        { id: string, abbreviation: string, name: string, logo?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Organization' }
      ) | null, mergedWith?: (
        { id: string, identifier: string, plan: (
          { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
          & { __typename?: 'Plan' }
        ) }
        & { __typename?: 'Action' }
      ) | null, plan: (
        { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, supersededActions: Array<(
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
          { id: string }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename?: 'ActionStatusSummary' }
      ), implementationPhase?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionImplementationPhase' }
      ) | null, primaryOrg?: (
        { id: string, abbreviation: string, name: string, logo?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Organization' }
      ) | null, mergedWith?: (
        { id: string, identifier: string, plan: (
          { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
          & { __typename?: 'Plan' }
        ) }
        & { __typename?: 'Action' }
      ) | null, plan: (
        { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    )>, nextAction?: (
      { id: string, identifier: string }
      & { __typename?: 'Action' }
    ) | null, previousAction?: (
      { id: string, identifier: string }
      & { __typename?: 'Action' }
    ) | null, attributes: Array<(
      { id: string, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
          { id: string, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, title: string, urlPath: string, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ), parent?: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                { id: string, name: string, namePlural?: string | null }
                & { __typename?: 'CategoryLevel' }
              ) | null, image?: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, large?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, small?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, social?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, rendition?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, iconImage?: (
                { rendition?: (
                  { src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, categoryPage?: (
                { id?: string | null, title: string, urlPath: string, live: boolean }
                & { __typename?: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename?: 'CategoryType' }
              ) }
              & { __typename?: 'Category' }
            ) | null, level?: (
              { id: string, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            ) | null, image?: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, large?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, small?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, social?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, rendition?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, iconImage?: (
              { rendition?: (
                { src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, categoryPage?: (
              { id?: string | null, title: string, urlPath: string, live: boolean }
              & { __typename?: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename?: 'CategoryType' }
            ) }
            & { __typename?: 'Category' }
          ) | null, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      )>, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
          { id: string, name: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text?: string | null, id: string, choice?: (
        { id: string, name: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
          { id: string, name: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
          { id: string, name: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
          { id: string, name: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, plan: (
      { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Plan' }
    ) }
    & { __typename?: 'Action' }
  ) | null, plan?: (
    { actionListPage?: (
      { actionDateFormat?: string | null, taskDateFormat?: string | null, detailsMainTop?: Array<(
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionContactFormBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          )> }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { id?: string | null, heading?: string | null, helpText?: string | null, layout?: string | null, blocks?: Array<(
          { id?: string | null }
          & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { id?: string | null, attributeType: (
            { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
              { id: string, identifier: string }
              & { __typename?: 'AttributeTypeChoiceOption' }
            )>, unit?: (
              { id: string, name: string }
              & { __typename?: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename?: 'ActionContentAttributeTypeBlock' }
        ) | (
          { id?: string | null, categoryType: (
            { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
              { id: string, order: number, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            )> }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'ActionContentCategoryTypeBlock' }
        ) | (
          { id?: string | null, fieldLabel?: string | null, caption?: string | null }
          & { __typename?: 'ActionOfficialNameBlock' }
        ) | (
          { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null }
          & { __typename?: 'ActionRelatedActionsBlock' }
        ) | (
          { id?: string | null, reportField?: string | null, reportType?: (
            { name: string }
            & { __typename?: 'ReportType' }
          ) | null, reportsToCompare?: Array<(
            { identifier: string, name: string, startDate: any, endDate: any, valuesForAction?: Array<(
              { attribute?: (
                { id: string, categories: Array<(
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                    { id: string, name: string, namePlural?: string | null }
                    & { __typename?: 'CategoryLevel' }
                  ) | null, image?: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, large?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, small?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, social?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, rendition?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, iconImage?: (
                    { rendition?: (
                      { src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, categoryPage?: (
                    { id?: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename?: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename?: 'CategoryType' }
                  ), parent?: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                          { id: string, name: string, namePlural?: string | null }
                          & { __typename?: 'CategoryLevel' }
                        ) | null, image?: (
                          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, large?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, small?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, social?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, rendition?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null }
                          & { __typename?: 'Image' }
                        ) | null, iconImage?: (
                          { rendition?: (
                            { src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null }
                          & { __typename?: 'Image' }
                        ) | null, categoryPage?: (
                          { id?: string | null, title: string, urlPath: string, live: boolean }
                          & { __typename?: 'CategoryPage' }
                        ) | null, type: (
                          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                          & { __typename?: 'CategoryType' }
                        ) }
                        & { __typename?: 'Category' }
                      ) | null, level?: (
                        { id: string, name: string, namePlural?: string | null }
                        & { __typename?: 'CategoryLevel' }
                      ) | null, image?: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, large?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, small?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, social?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, rendition?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, iconImage?: (
                        { rendition?: (
                          { src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, categoryPage?: (
                        { id?: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename?: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename?: 'CategoryType' }
                      ) }
                      & { __typename?: 'Category' }
                    ) | null, level?: (
                      { id: string, name: string, namePlural?: string | null }
                      & { __typename?: 'CategoryLevel' }
                    ) | null, image?: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, large?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, small?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, social?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, rendition?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, iconImage?: (
                      { rendition?: (
                        { src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, categoryPage?: (
                      { id?: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename?: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename?: 'CategoryType' }
                    ) }
                    & { __typename?: 'Category' }
                  ) | null }
                  & { __typename?: 'Category' }
                )>, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeCategoryChoice' }
              ) | (
                { text?: string | null, id: string, choice?: (
                  { id: string, name: string }
                  & { __typename?: 'AttributeTypeChoiceOption' }
                ) | null, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeChoice' }
              ) | (
                { id: string, numericValue: number, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              ) | null, field: (
                { id?: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
              ) }
              & { __typename?: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { id?: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
              ) }
              & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReporteportValue' | 'ActionStatusReportValue' }
            )> | null }
            & { __typename?: 'Report' }
          ) | null> | null }
          & { __typename?: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, caption?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, reportField?: string | null, reportType?: (
          { name: string }
          & { __typename?: 'ReportType' }
        ) | null, reportsToCompare?: Array<(
          { identifier: string, name: string, startDate: any, endDate: any, valuesForAction?: Array<(
            { attribute?: (
              { id: string, categories: Array<(
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                  { id: string, name: string, namePlural?: string | null }
                  & { __typename?: 'CategoryLevel' }
                ) | null, image?: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, large?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, small?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, social?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, rendition?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, iconImage?: (
                  { rendition?: (
                    { src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, categoryPage?: (
                  { id?: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename?: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename?: 'CategoryType' }
                ), parent?: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                        { id: string, name: string, namePlural?: string | null }
                        & { __typename?: 'CategoryLevel' }
                      ) | null, image?: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, large?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, small?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, social?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, rendition?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, iconImage?: (
                        { rendition?: (
                          { src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, categoryPage?: (
                        { id?: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename?: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename?: 'CategoryType' }
                      ) }
                      & { __typename?: 'Category' }
                    ) | null, level?: (
                      { id: string, name: string, namePlural?: string | null }
                      & { __typename?: 'CategoryLevel' }
                    ) | null, image?: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, large?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, small?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, social?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, rendition?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, iconImage?: (
                      { rendition?: (
                        { src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, categoryPage?: (
                      { id?: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename?: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename?: 'CategoryType' }
                    ) }
                    & { __typename?: 'Category' }
                  ) | null, level?: (
                    { id: string, name: string, namePlural?: string | null }
                    & { __typename?: 'CategoryLevel' }
                  ) | null, image?: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, large?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, small?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, social?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, rendition?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, iconImage?: (
                    { rendition?: (
                      { src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, categoryPage?: (
                    { id?: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename?: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename?: 'CategoryType' }
                  ) }
                  & { __typename?: 'Category' }
                ) | null }
                & { __typename?: 'Category' }
              )>, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeCategoryChoice' }
            ) | (
              { text?: string | null, id: string, choice?: (
                { id: string, name: string }
                & { __typename?: 'AttributeTypeChoiceOption' }
              ) | null, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeChoice' }
            ) | (
              { id: string, numericValue: number, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            ) | null, field: (
              { id?: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
            ) }
            & { __typename?: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { id?: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
            ) }
            & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReporteportValue' | 'ActionStatusReportValue' }
          )> | null }
          & { __typename?: 'Report' }
        ) | null> | null }
        & { __typename: 'ReportComparisonBlock' }
      )> | null, detailsMainBottom?: Array<(
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionContactFormBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          )> }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { id?: string | null, heading?: string | null, helpText?: string | null, layout?: string | null, blocks?: Array<(
          { id?: string | null }
          & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { id?: string | null, attributeType: (
            { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
              { id: string, identifier: string }
              & { __typename?: 'AttributeTypeChoiceOption' }
            )>, unit?: (
              { id: string, name: string }
              & { __typename?: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename?: 'ActionContentAttributeTypeBlock' }
        ) | (
          { id?: string | null, categoryType: (
            { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
              { id: string, order: number, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            )> }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'ActionContentCategoryTypeBlock' }
        ) | (
          { id?: string | null, fieldLabel?: string | null, caption?: string | null }
          & { __typename?: 'ActionOfficialNameBlock' }
        ) | (
          { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null }
          & { __typename?: 'ActionRelatedActionsBlock' }
        ) | (
          { id?: string | null, reportField?: string | null, reportType?: (
            { name: string }
            & { __typename?: 'ReportType' }
          ) | null, reportsToCompare?: Array<(
            { identifier: string, name: string, startDate: any, endDate: any, valuesForAction?: Array<(
              { attribute?: (
                { id: string, categories: Array<(
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                    { id: string, name: string, namePlural?: string | null }
                    & { __typename?: 'CategoryLevel' }
                  ) | null, image?: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, large?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, small?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, social?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, rendition?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, iconImage?: (
                    { rendition?: (
                      { src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, categoryPage?: (
                    { id?: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename?: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename?: 'CategoryType' }
                  ), parent?: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                          { id: string, name: string, namePlural?: string | null }
                          & { __typename?: 'CategoryLevel' }
                        ) | null, image?: (
                          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, large?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, small?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, social?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null, rendition?: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null }
                          & { __typename?: 'Image' }
                        ) | null, iconImage?: (
                          { rendition?: (
                            { src: string }
                            & { __typename?: 'ImageRendition' }
                          ) | null }
                          & { __typename?: 'Image' }
                        ) | null, categoryPage?: (
                          { id?: string | null, title: string, urlPath: string, live: boolean }
                          & { __typename?: 'CategoryPage' }
                        ) | null, type: (
                          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                          & { __typename?: 'CategoryType' }
                        ) }
                        & { __typename?: 'Category' }
                      ) | null, level?: (
                        { id: string, name: string, namePlural?: string | null }
                        & { __typename?: 'CategoryLevel' }
                      ) | null, image?: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, large?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, small?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, social?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, rendition?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, iconImage?: (
                        { rendition?: (
                          { src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, categoryPage?: (
                        { id?: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename?: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename?: 'CategoryType' }
                      ) }
                      & { __typename?: 'Category' }
                    ) | null, level?: (
                      { id: string, name: string, namePlural?: string | null }
                      & { __typename?: 'CategoryLevel' }
                    ) | null, image?: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, large?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, small?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, social?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, rendition?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, iconImage?: (
                      { rendition?: (
                        { src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, categoryPage?: (
                      { id?: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename?: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename?: 'CategoryType' }
                    ) }
                    & { __typename?: 'Category' }
                  ) | null }
                  & { __typename?: 'Category' }
                )>, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeCategoryChoice' }
              ) | (
                { text?: string | null, id: string, choice?: (
                  { id: string, name: string }
                  & { __typename?: 'AttributeTypeChoiceOption' }
                ) | null, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeChoice' }
              ) | (
                { id: string, numericValue: number, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                    { id: string, name: string, shortName?: string | null }
                    & { __typename?: 'Unit' }
                  ) | null }
                  & { __typename?: 'AttributeType' }
                ) }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              ) | null, field: (
                { id?: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
              ) }
              & { __typename?: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { id?: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
              ) }
              & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReporteportValue' | 'ActionStatusReportValue' }
            )> | null }
            & { __typename?: 'Report' }
          ) | null> | null }
          & { __typename?: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, caption?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, reportField?: string | null, reportType?: (
          { name: string }
          & { __typename?: 'ReportType' }
        ) | null, reportsToCompare?: Array<(
          { identifier: string, name: string, startDate: any, endDate: any, valuesForAction?: Array<(
            { attribute?: (
              { id: string, categories: Array<(
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                  { id: string, name: string, namePlural?: string | null }
                  & { __typename?: 'CategoryLevel' }
                ) | null, image?: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, large?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, small?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, social?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, rendition?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, iconImage?: (
                  { rendition?: (
                    { src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, categoryPage?: (
                  { id?: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename?: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename?: 'CategoryType' }
                ), parent?: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                        { id: string, name: string, namePlural?: string | null }
                        & { __typename?: 'CategoryLevel' }
                      ) | null, image?: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, large?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, small?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, social?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null, rendition?: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, iconImage?: (
                        { rendition?: (
                          { src: string }
                          & { __typename?: 'ImageRendition' }
                        ) | null }
                        & { __typename?: 'Image' }
                      ) | null, categoryPage?: (
                        { id?: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename?: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename?: 'CategoryType' }
                      ) }
                      & { __typename?: 'Category' }
                    ) | null, level?: (
                      { id: string, name: string, namePlural?: string | null }
                      & { __typename?: 'CategoryLevel' }
                    ) | null, image?: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, large?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, small?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, social?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null, rendition?: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, iconImage?: (
                      { rendition?: (
                        { src: string }
                        & { __typename?: 'ImageRendition' }
                      ) | null }
                      & { __typename?: 'Image' }
                    ) | null, categoryPage?: (
                      { id?: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename?: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename?: 'CategoryType' }
                    ) }
                    & { __typename?: 'Category' }
                  ) | null, level?: (
                    { id: string, name: string, namePlural?: string | null }
                    & { __typename?: 'CategoryLevel' }
                  ) | null, image?: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, large?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, small?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, social?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, rendition?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, iconImage?: (
                    { rendition?: (
                      { src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, categoryPage?: (
                    { id?: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename?: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename?: 'CategoryType' }
                  ) }
                  & { __typename?: 'Category' }
                ) | null }
                & { __typename?: 'Category' }
              )>, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeCategoryChoice' }
            ) | (
              { text?: string | null, id: string, choice?: (
                { id: string, name: string }
                & { __typename?: 'AttributeTypeChoiceOption' }
              ) | null, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeChoice' }
            ) | (
              { id: string, numericValue: number, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
                  { id: string, name: string, shortName?: string | null }
                  & { __typename?: 'Unit' }
                ) | null }
                & { __typename?: 'AttributeType' }
              ) }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            ) | null, field: (
              { id?: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
            ) }
            & { __typename?: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { id?: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
            ) }
            & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReporteportValue' | 'ActionStatusReportValue' }
          )> | null }
          & { __typename?: 'Report' }
        ) | null> | null }
        & { __typename: 'ReportComparisonBlock' }
      )> | null, detailsAside?: Array<(
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionContactPersonsBlock' | 'ActionScheduleBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          )> }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { heading?: string | null, id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionResponsiblePartiesBlock' }
      )> | null }
      & { __typename?: 'ActionListPage' }
    ) | null, actionAttributeTypes: Array<(
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      )>, unit?: (
        { id: string, name: string }
        & { __typename?: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    )>, generalContent: (
      { actionTerm: SiteGeneralContentActionTerm }
      & { __typename?: 'SiteGeneralContent' }
    ) }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

type ActionAsideContentBlocksFragment_ActionContactPersonsBlock_ActionScheduleBlock_Fragment = (
  { id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionContactPersonsBlock' | 'ActionScheduleBlock' }
);

type ActionAsideContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment = (
  { id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null, attributeType: (
    { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )>, unit?: (
      { id: string, name: string }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionAsideContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment = (
  { id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    )> }
    & { __typename?: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

type ActionAsideContentBlocksFragment_ActionResponsiblePartiesBlock_Fragment = (
  { heading?: string | null, id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionResponsiblePartiesBlock' }
);

export type ActionAsideContentBlocksFragmentFragment = ActionAsideContentBlocksFragment_ActionContactPersonsBlock_ActionScheduleBlock_Fragment | ActionAsideContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment | ActionAsideContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment | ActionAsideContentBlocksFragment_ActionResponsiblePartiesBlock_Fragment;

type ActionMainContentBlocksFragment_60920DqMhKMmAyaAImyPh5hRBnjMu8ul9clD1Z4hPw0_Fragment = (
  { id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionContactFormBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
);

type ActionMainContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment = (
  { id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null, attributeType: (
    { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )>, unit?: (
      { id: string, name: string }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionMainContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment = (
  { id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    )> }
    & { __typename?: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

type ActionMainContentBlocksFragment_ActionContentSectionBlock_Fragment = (
  { id?: string | null, heading?: string | null, helpText?: string | null, layout?: string | null, blocks?: Array<(
    { id?: string | null }
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { id?: string | null, attributeType: (
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      )>, unit?: (
        { id: string, name: string }
        & { __typename?: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename?: 'ActionContentAttributeTypeBlock' }
  ) | (
    { id?: string | null, categoryType: (
      { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
        { id: string, order: number, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      )> }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'ActionContentCategoryTypeBlock' }
  ) | (
    { id?: string | null, fieldLabel?: string | null, caption?: string | null }
    & { __typename?: 'ActionOfficialNameBlock' }
  ) | (
    { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null }
    & { __typename?: 'ActionRelatedActionsBlock' }
  ) | (
    { id?: string | null, reportField?: string | null, reportType?: (
      { name: string }
      & { __typename?: 'ReportType' }
    ) | null, reportsToCompare?: Array<(
      { identifier: string, name: string, startDate: any, endDate: any, valuesForAction?: Array<(
        { attribute?: (
          { id: string, categories: Array<(
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
              { id: string, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            ) | null, image?: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, large?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, small?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, social?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, rendition?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, iconImage?: (
              { rendition?: (
                { src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, categoryPage?: (
              { id?: string | null, title: string, urlPath: string, live: boolean }
              & { __typename?: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename?: 'CategoryType' }
            ), parent?: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                    { id: string, name: string, namePlural?: string | null }
                    & { __typename?: 'CategoryLevel' }
                  ) | null, image?: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, large?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, small?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, social?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null, rendition?: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, iconImage?: (
                    { rendition?: (
                      { src: string }
                      & { __typename?: 'ImageRendition' }
                    ) | null }
                    & { __typename?: 'Image' }
                  ) | null, categoryPage?: (
                    { id?: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename?: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename?: 'CategoryType' }
                  ) }
                  & { __typename?: 'Category' }
                ) | null, level?: (
                  { id: string, name: string, namePlural?: string | null }
                  & { __typename?: 'CategoryLevel' }
                ) | null, image?: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, large?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, small?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, social?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, rendition?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, iconImage?: (
                  { rendition?: (
                    { src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, categoryPage?: (
                  { id?: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename?: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename?: 'CategoryType' }
                ) }
                & { __typename?: 'Category' }
              ) | null, level?: (
                { id: string, name: string, namePlural?: string | null }
                & { __typename?: 'CategoryLevel' }
              ) | null, image?: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, large?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, small?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, social?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, rendition?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, iconImage?: (
                { rendition?: (
                  { src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, categoryPage?: (
                { id?: string | null, title: string, urlPath: string, live: boolean }
                & { __typename?: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename?: 'CategoryType' }
              ) }
              & { __typename?: 'Category' }
            ) | null }
            & { __typename?: 'Category' }
          )>, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
              { id: string, name: string, shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null }
            & { __typename?: 'AttributeType' }
          ) }
          & { __typename: 'AttributeCategoryChoice' }
        ) | (
          { text?: string | null, id: string, choice?: (
            { id: string, name: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          ) | null, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
              { id: string, name: string, shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null }
            & { __typename?: 'AttributeType' }
          ) }
          & { __typename: 'AttributeChoice' }
        ) | (
          { id: string, numericValue: number, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
              { id: string, name: string, shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null }
            & { __typename?: 'AttributeType' }
          ) }
          & { __typename: 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
              { id: string, name: string, shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null }
            & { __typename?: 'AttributeType' }
          ) }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        ) | null, field: (
          { id?: string | null }
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
        ) }
        & { __typename?: 'ActionAttributeReportValue' }
      ) | (
        { field: (
          { id?: string | null }
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
        ) }
        & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReporteportValue' | 'ActionStatusReportValue' }
      )> | null }
      & { __typename?: 'Report' }
    ) | null> | null }
    & { __typename?: 'ReportComparisonBlock' }
  ) | null> | null }
  & { __typename: 'ActionContentSectionBlock' }
);

type ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment = (
  { id?: string | null, fieldLabel?: string | null, caption?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionOfficialNameBlock' }
);

type ActionMainContentBlocksFragment_ActionRelatedActionsBlock_Fragment = (
  { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionRelatedActionsBlock' }
);

type ActionMainContentBlocksFragment_ReportComparisonBlock_Fragment = (
  { id?: string | null, reportField?: string | null, reportType?: (
    { name: string }
    & { __typename?: 'ReportType' }
  ) | null, reportsToCompare?: Array<(
    { identifier: string, name: string, startDate: any, endDate: any, valuesForAction?: Array<(
      { attribute?: (
        { id: string, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ), parent?: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                  { id: string, name: string, namePlural?: string | null }
                  & { __typename?: 'CategoryLevel' }
                ) | null, image?: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, large?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, small?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, social?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, rendition?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, iconImage?: (
                  { rendition?: (
                    { src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, categoryPage?: (
                  { id?: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename?: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename?: 'CategoryType' }
                ) }
                & { __typename?: 'Category' }
              ) | null, level?: (
                { id: string, name: string, namePlural?: string | null }
                & { __typename?: 'CategoryLevel' }
              ) | null, image?: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, large?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, small?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, social?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, rendition?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, iconImage?: (
                { rendition?: (
                  { src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, categoryPage?: (
                { id?: string | null, title: string, urlPath: string, live: boolean }
                & { __typename?: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename?: 'CategoryType' }
              ) }
              & { __typename?: 'Category' }
            ) | null, level?: (
              { id: string, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            ) | null, image?: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, large?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, small?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, social?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, rendition?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, iconImage?: (
              { rendition?: (
                { src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, categoryPage?: (
              { id?: string | null, title: string, urlPath: string, live: boolean }
              & { __typename?: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename?: 'CategoryType' }
            ) }
            & { __typename?: 'Category' }
          ) | null }
          & { __typename?: 'Category' }
        )>, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text?: string | null, id: string, choice?: (
          { id: string, name: string }
          & { __typename?: 'AttributeTypeChoiceOption' }
        ) | null, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      ) | null, field: (
        { id?: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
      ) }
      & { __typename?: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { id?: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
      ) }
      & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReporteportValue' | 'ActionStatusReportValue' }
    )> | null }
    & { __typename?: 'Report' }
  ) | null> | null }
  & { __typename: 'ReportComparisonBlock' }
);

export type ActionMainContentBlocksFragmentFragment = ActionMainContentBlocksFragment_60920DqMhKMmAyaAImyPh5hRBnjMu8ul9clD1Z4hPw0_Fragment | ActionMainContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment | ActionMainContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment | ActionMainContentBlocksFragment_ActionContentSectionBlock_Fragment | ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment | ActionMainContentBlocksFragment_ActionRelatedActionsBlock_Fragment | ActionMainContentBlocksFragment_ReportComparisonBlock_Fragment;

export type ReportComparisonBlockActionContentFragment = (
  { reportField?: string | null, reportType?: (
    { name: string }
    & { __typename?: 'ReportType' }
  ) | null, reportsToCompare?: Array<(
    { identifier: string, name: string, startDate: any, endDate: any, valuesForAction?: Array<(
      { attribute?: (
        { id: string, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ), parent?: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                  { id: string, name: string, namePlural?: string | null }
                  & { __typename?: 'CategoryLevel' }
                ) | null, image?: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, large?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, small?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, social?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, rendition?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, iconImage?: (
                  { rendition?: (
                    { src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, categoryPage?: (
                  { id?: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename?: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename?: 'CategoryType' }
                ) }
                & { __typename?: 'Category' }
              ) | null, level?: (
                { id: string, name: string, namePlural?: string | null }
                & { __typename?: 'CategoryLevel' }
              ) | null, image?: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, large?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, small?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, social?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, rendition?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, iconImage?: (
                { rendition?: (
                  { src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, categoryPage?: (
                { id?: string | null, title: string, urlPath: string, live: boolean }
                & { __typename?: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename?: 'CategoryType' }
              ) }
              & { __typename?: 'Category' }
            ) | null, level?: (
              { id: string, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            ) | null, image?: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, large?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, small?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, social?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, rendition?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, iconImage?: (
              { rendition?: (
                { src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, categoryPage?: (
              { id?: string | null, title: string, urlPath: string, live: boolean }
              & { __typename?: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename?: 'CategoryType' }
            ) }
            & { __typename?: 'Category' }
          ) | null }
          & { __typename?: 'Category' }
        )>, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text?: string | null, id: string, choice?: (
          { id: string, name: string }
          & { __typename?: 'AttributeTypeChoiceOption' }
        ) | null, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      ) | null, field: (
        { id?: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
      ) }
      & { __typename?: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { id?: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStatusReportFieldBlock' }
      ) }
      & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReporteportValue' | 'ActionStatusReportValue' }
    )> | null }
    & { __typename?: 'Report' }
  ) | null> | null }
  & { __typename?: 'ReportComparisonBlock' }
);

export type GetActionListPageIncludeRelatedQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type GetActionListPageIncludeRelatedQuery = (
  { plan?: (
    { actionListPage?: (
      { includeRelatedPlans?: boolean | null }
      & { __typename?: 'ActionListPage' }
    ) | null }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type GetActionListPageQueryVariables = Exact<{
  plan: Scalars['ID'];
  onlyWithActions: Scalars['Boolean'];
}>;


export type GetActionListPageQuery = (
  { plan?: (
    { actionListPage?: (
      { leadContent?: string | null, defaultView: ActionListPageView, headingHierarchyDepth: number, includeRelatedPlans?: boolean | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, primaryFilters?: Array<(
        { showAllLabel?: string | null, field: string, id?: string | null, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { field: string, id?: string | null }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style?: string | null, showAllLabel?: string | null, depth?: number | null, field: string, id?: string | null, categoryType?: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
              { id: string }
              & { __typename?: 'Category' }
            ) | null, common?: (
              { id: string }
              & { __typename?: 'CommonCategory' }
            ) | null }
            & { __typename?: 'Category' }
          )> }
          & { __typename?: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      )> | null, mainFilters?: Array<(
        { showAllLabel?: string | null, field: string, id?: string | null, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { field: string, id?: string | null }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style?: string | null, showAllLabel?: string | null, depth?: number | null, field: string, id?: string | null, categoryType?: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
              { id: string }
              & { __typename?: 'Category' }
            ) | null, common?: (
              { id: string }
              & { __typename?: 'CommonCategory' }
            ) | null }
            & { __typename?: 'Category' }
          )> }
          & { __typename?: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      )> | null, advancedFilters?: Array<(
        { showAllLabel?: string | null, field: string, id?: string | null, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { field: string, id?: string | null }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style?: string | null, showAllLabel?: string | null, depth?: number | null, field: string, id?: string | null, categoryType?: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
              { id: string }
              & { __typename?: 'Category' }
            ) | null, common?: (
              { id: string }
              & { __typename?: 'CommonCategory' }
            ) | null }
            & { __typename?: 'Category' }
          )> }
          & { __typename?: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      )> | null }
      & { __typename: 'ActionListPage' }
    ) | null }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type TemplatedCategoryPageFragmentFragment = (
  { layout?: (
    { iconSize?: string | null, layoutMainTop?: Array<(
      { attributeType: (
        { identifier: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    ) | (
      { blocks: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { value: string }
        & { __typename?: 'ChoiceBlock' }
      )> }
      & { __typename: 'CategoryPageProgressBlock' }
    )> | null, layoutMainBottom?: Array<(
      { attributeType: (
        { identifier: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    ) | { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' } | (
      { heading?: string | null, description?: string | null }
      & { __typename: 'CategoryPageContactFormBlock' }
    )> | null, layoutAside?: Array<(
      { attributeType: (
        { identifier: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    )> | null }
    & { __typename: 'CategoryTypePageLevelLayout' }
  ) | null }
  & { __typename?: 'CategoryPage' }
);

export type GetContentPageQueryVariables = Exact<{
  plan: Scalars['ID'];
  path: Scalars['String'];
}>;


export type GetContentPageQuery = (
  { planPage?: (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' } | { __typename?: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, lead?: string | null, category?: (
          { id: string, type: (
            { identifier: string }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'ActionCategoryFilterCardBlock' }
      ) | null> | null }
      & { __typename?: 'ActionCategoryFilterCardsBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { fullWidth?: boolean | null, id?: string | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'CardBlock' }
      ) | null> | null }
      & { __typename?: 'CardListBlock' }
    ) | (
      { style?: string | null, styleOverrides?: string | null, id?: string | null, blockType: string, field: string, account?: (
        { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
        & { __typename?: 'CartographyProviderCredentials' }
      ) | null }
      & { __typename?: 'CartographyVisualisationBlock' }
    ) | (
      { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
      ) | null, category?: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'CategoryListBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, valueAttribute?: (
        { identifier: string, unit?: (
          { shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) | null, categoryType?: (
        { identifier: string }
        & { __typename?: 'CategoryType' }
      ) | null }
      & { __typename?: 'CategoryTreeMapBlock' }
    ) | (
      { value: string, id?: string | null, blockType: string, field: string }
      & { __typename?: 'CharBlock' | 'RichTextBlock' | 'TextBlock' }
    ) | (
      { value: string, id?: string | null, blockType: string, field: string, choices: Array<(
        { key: string, value: string }
        & { __typename?: 'ChoiceOption' }
      )> }
      & { __typename?: 'ChoiceBlock' }
    ) | (
      { layout?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'FrontPageHeroBlock' }
    ) | (
      { style?: string | null, id?: string | null, blockType: string, field: string, indicator?: (
        { id: string }
        & { __typename?: 'Indicator' }
      ) | null }
      & { __typename?: 'IndicatorBlock' }
    ) | (
      { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { style?: string | null, indicator?: (
          { id: string, identifier?: string | null, name: string, description?: string | null, timeResolution: IndicatorTimeResolution, level?: string | null, unit: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ), latestValue?: (
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorValue' }
          ) | null, goals?: Array<(
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename?: 'Indicator' }
        ) | null }
        & { __typename?: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null, categories: Array<(
            { id: string }
            & { __typename?: 'DimensionCategory' }
          )> }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null, common?: (
          { id: string, normalizations?: Array<(
            { unit?: (
              { shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null, normalizer?: (
              { name: string, id: string, identifier?: string | null }
              & { __typename?: 'CommonIndicator' }
            ) | null }
            & { __typename?: 'CommonIndicatorNormalization' }
          ) | null> | null }
          & { __typename?: 'CommonIndicator' }
        ) | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { width?: string | null, id?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, width: number, height: number, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { question?: string | null, answer?: string | null }
        & { __typename?: 'QuestionBlock' }
      ) | null> | null }
      & { __typename?: 'QuestionAnswerBlock' }
    ) | null> | null }
    & { __typename: 'AccessibilityStatementPage' }
  ) | (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'ActionListPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' }
  ) | (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, category?: (
      { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, iconSvgUrl?: string | null, categoryPage?: (
        { urlPath: string }
        & { __typename?: 'CategoryPage' }
      ) | null, level?: (
        { name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ), image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, indicators: Array<(
        { id: string }
        & { __typename?: 'Indicator' }
      )>, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, children: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
          { id: string, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { id?: string | null, title: string, urlPath: string, live: boolean }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )>, parent?: (
        { id: string, identifier: string, name: string, color?: string | null, iconSvgUrl?: string | null, level?: (
          { name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { title: string, urlPath: string }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ), parent?: (
          { identifier: string, name: string, categoryPage?: (
            { urlPath: string }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ), parent?: (
            { identifier: string, name: string, parent?: (
              { identifier: string, name: string, categoryPage?: (
                { urlPath: string }
                & { __typename?: 'CategoryPage' }
              ) | null, type: (
                { id: string, hideCategoryIdentifiers: boolean }
                & { __typename?: 'CategoryType' }
              ), parent?: (
                { identifier: string, name: string, categoryPage?: (
                  { urlPath: string }
                  & { __typename?: 'CategoryPage' }
                ) | null, type: (
                  { id: string, hideCategoryIdentifiers: boolean }
                  & { __typename?: 'CategoryType' }
                ) }
                & { __typename?: 'Category' }
              ) | null }
              & { __typename?: 'Category' }
            ) | null, categoryPage?: (
              { urlPath: string }
              & { __typename?: 'CategoryPage' }
            ) | null, type: (
              { id: string, hideCategoryIdentifiers: boolean }
              & { __typename?: 'CategoryType' }
            ) }
            & { __typename?: 'Category' }
          ) | null }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      ) | null, attributes?: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ), parent?: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, parent?: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
                  { id: string, name: string, namePlural?: string | null }
                  & { __typename?: 'CategoryLevel' }
                ) | null, image?: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, large?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, small?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, social?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null, rendition?: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, iconImage?: (
                  { rendition?: (
                    { src: string }
                    & { __typename?: 'ImageRendition' }
                  ) | null }
                  & { __typename?: 'Image' }
                ) | null, categoryPage?: (
                  { id?: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename?: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename?: 'CategoryType' }
                ) }
                & { __typename?: 'Category' }
              ) | null, level?: (
                { id: string, name: string, namePlural?: string | null }
                & { __typename?: 'CategoryLevel' }
              ) | null, image?: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, large?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, small?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, social?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null, rendition?: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, iconImage?: (
                { rendition?: (
                  { src: string }
                  & { __typename?: 'ImageRendition' }
                ) | null }
                & { __typename?: 'Image' }
              ) | null, categoryPage?: (
                { id?: string | null, title: string, urlPath: string, live: boolean }
                & { __typename?: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename?: 'CategoryType' }
              ) }
              & { __typename?: 'Category' }
            ) | null, level?: (
              { id: string, name: string, namePlural?: string | null }
              & { __typename?: 'CategoryLevel' }
            ) | null, image?: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, large?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, small?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, social?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null, rendition?: (
                { id: string, width: number, height: number, src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, iconImage?: (
              { rendition?: (
                { src: string }
                & { __typename?: 'ImageRendition' }
              ) | null }
              & { __typename?: 'Image' }
            ) | null, categoryPage?: (
              { id?: string | null, title: string, urlPath: string, live: boolean }
              & { __typename?: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename?: 'CategoryType' }
            ) }
            & { __typename?: 'Category' }
          ) | null }
          & { __typename?: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text?: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice?: (
          { id: string, name: string }
          & { __typename?: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit?: (
            { id: string, name: string, shortName?: string | null }
            & { __typename?: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> | null }
      & { __typename?: 'Category' }
    ) | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' } | { __typename?: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, lead?: string | null, category?: (
          { id: string, type: (
            { identifier: string }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'ActionCategoryFilterCardBlock' }
      ) | null> | null }
      & { __typename?: 'ActionCategoryFilterCardsBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { fullWidth?: boolean | null, id?: string | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'CardBlock' }
      ) | null> | null }
      & { __typename?: 'CardListBlock' }
    ) | (
      { style?: string | null, styleOverrides?: string | null, id?: string | null, blockType: string, field: string, account?: (
        { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
        & { __typename?: 'CartographyProviderCredentials' }
      ) | null }
      & { __typename?: 'CartographyVisualisationBlock' }
    ) | (
      { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
      ) | null, category?: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'CategoryListBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, valueAttribute?: (
        { identifier: string, unit?: (
          { shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) | null, categoryType?: (
        { identifier: string }
        & { __typename?: 'CategoryType' }
      ) | null }
      & { __typename?: 'CategoryTreeMapBlock' }
    ) | (
      { value: string, id?: string | null, blockType: string, field: string }
      & { __typename?: 'CharBlock' | 'RichTextBlock' | 'TextBlock' }
    ) | (
      { value: string, id?: string | null, blockType: string, field: string, choices: Array<(
        { key: string, value: string }
        & { __typename?: 'ChoiceOption' }
      )> }
      & { __typename?: 'ChoiceBlock' }
    ) | (
      { layout?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'FrontPageHeroBlock' }
    ) | (
      { style?: string | null, id?: string | null, blockType: string, field: string, indicator?: (
        { id: string }
        & { __typename?: 'Indicator' }
      ) | null }
      & { __typename?: 'IndicatorBlock' }
    ) | (
      { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { style?: string | null, indicator?: (
          { id: string, identifier?: string | null, name: string, description?: string | null, timeResolution: IndicatorTimeResolution, level?: string | null, unit: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ), latestValue?: (
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorValue' }
          ) | null, goals?: Array<(
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename?: 'Indicator' }
        ) | null }
        & { __typename?: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null, categories: Array<(
            { id: string }
            & { __typename?: 'DimensionCategory' }
          )> }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null, common?: (
          { id: string, normalizations?: Array<(
            { unit?: (
              { shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null, normalizer?: (
              { name: string, id: string, identifier?: string | null }
              & { __typename?: 'CommonIndicator' }
            ) | null }
            & { __typename?: 'CommonIndicatorNormalization' }
          ) | null> | null }
          & { __typename?: 'CommonIndicator' }
        ) | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { width?: string | null, id?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, width: number, height: number, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { question?: string | null, answer?: string | null }
        & { __typename?: 'QuestionBlock' }
      ) | null> | null }
      & { __typename?: 'QuestionAnswerBlock' }
    ) | null> | null, layout?: (
      { iconSize?: string | null, layoutMainTop?: Array<(
        { attributeType: (
          { identifier: string }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      ) | (
        { blocks: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { value: string }
          & { __typename?: 'ChoiceBlock' }
        )> }
        & { __typename: 'CategoryPageProgressBlock' }
      )> | null, layoutMainBottom?: Array<(
        { attributeType: (
          { identifier: string }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      ) | { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' } | (
        { heading?: string | null, description?: string | null }
        & { __typename: 'CategoryPageContactFormBlock' }
      )> | null, layoutAside?: Array<(
        { attributeType: (
          { identifier: string }
          & { __typename?: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      )> | null }
      & { __typename: 'CategoryTypePageLevelLayout' }
    ) | null }
    & { __typename: 'CategoryPage' }
  ) | (
    { leadContent?: string | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'PrivacyPolicyPage' }
  ) | (
    { leadParagraph?: string | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, headerImage?: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' } | { __typename?: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, lead?: string | null, category?: (
          { id: string, type: (
            { identifier: string }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'ActionCategoryFilterCardBlock' }
      ) | null> | null }
      & { __typename?: 'ActionCategoryFilterCardsBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { fullWidth?: boolean | null, id?: string | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'CardBlock' }
      ) | null> | null }
      & { __typename?: 'CardListBlock' }
    ) | (
      { style?: string | null, styleOverrides?: string | null, id?: string | null, blockType: string, field: string, account?: (
        { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
        & { __typename?: 'CartographyProviderCredentials' }
      ) | null }
      & { __typename?: 'CartographyVisualisationBlock' }
    ) | (
      { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
      ) | null, category?: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'CategoryListBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, valueAttribute?: (
        { identifier: string, unit?: (
          { shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) | null, categoryType?: (
        { identifier: string }
        & { __typename?: 'CategoryType' }
      ) | null }
      & { __typename?: 'CategoryTreeMapBlock' }
    ) | (
      { value: string, id?: string | null, blockType: string, field: string }
      & { __typename?: 'CharBlock' | 'RichTextBlock' | 'TextBlock' }
    ) | (
      { value: string, id?: string | null, blockType: string, field: string, choices: Array<(
        { key: string, value: string }
        & { __typename?: 'ChoiceOption' }
      )> }
      & { __typename?: 'ChoiceBlock' }
    ) | (
      { layout?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'FrontPageHeroBlock' }
    ) | (
      { style?: string | null, id?: string | null, blockType: string, field: string, indicator?: (
        { id: string }
        & { __typename?: 'Indicator' }
      ) | null }
      & { __typename?: 'IndicatorBlock' }
    ) | (
      { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { style?: string | null, indicator?: (
          { id: string, identifier?: string | null, name: string, description?: string | null, timeResolution: IndicatorTimeResolution, level?: string | null, unit: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ), latestValue?: (
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorValue' }
          ) | null, goals?: Array<(
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename?: 'Indicator' }
        ) | null }
        & { __typename?: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null, categories: Array<(
            { id: string }
            & { __typename?: 'DimensionCategory' }
          )> }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null, common?: (
          { id: string, normalizations?: Array<(
            { unit?: (
              { shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null, normalizer?: (
              { name: string, id: string, identifier?: string | null }
              & { __typename?: 'CommonIndicator' }
            ) | null }
            & { __typename?: 'CommonIndicatorNormalization' }
          ) | null> | null }
          & { __typename?: 'CommonIndicator' }
        ) | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { width?: string | null, id?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, width: number, height: number, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { question?: string | null, answer?: string | null }
        & { __typename?: 'QuestionBlock' }
      ) | null> | null }
      & { __typename?: 'QuestionAnswerBlock' }
    ) | null> | null, siblings: Array<(
      { id?: string | null, title: string, slug: string, live: boolean, urlPath: string }
      & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    )>, parent?: (
      { id?: string | null, title: string, slug: string, urlPath: string, children: Array<(
        { id?: string | null, title: string, slug: string, live: boolean, urlPath: string }
        & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      )> }
      & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' }
    ) | (
      { childrenUseSecondaryNavigation?: boolean | null, id?: string | null, title: string, slug: string, urlPath: string, children: Array<(
        { id?: string | null, title: string, slug: string, live: boolean, urlPath: string }
        & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      )> }
      & { __typename?: 'EmptyPage' | 'StaticPage' }
    ) | null }
    & { __typename: 'StaticPage' }
  ) | null }
  & { __typename?: 'Query' }
);

export type CategoryParentFragmentFragment = (
  { parent?: (
    { identifier: string, name: string, categoryPage?: (
      { urlPath: string }
      & { __typename?: 'CategoryPage' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'Category' }
  ) | null }
  & { __typename?: 'Category' }
);

export type RecursiveCategoryParentFragmentFragment = (
  { parent?: (
    { parent?: (
      { identifier: string, name: string, parent?: (
        { identifier: string, name: string, categoryPage?: (
          { urlPath: string }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ), parent?: (
          { identifier: string, name: string, categoryPage?: (
            { urlPath: string }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      ) | null, categoryPage?: (
        { urlPath: string }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    ) | null }
    & { __typename?: 'Category' }
  ) | null }
  & { __typename?: 'Category' }
);

export type GetHomePageQueryVariables = Exact<{
  plan: Scalars['ID'];
  path: Scalars['String'];
}>;


export type GetHomePageQuery = (
  { planPage?: (
    { id?: string | null, slug: string, lastPublishedAt?: any | null }
    & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { id?: string | null, slug: string, lastPublishedAt?: any | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' } | { __typename?: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, lead?: string | null, category?: (
          { id: string, type: (
            { identifier: string }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'ActionCategoryFilterCardBlock' }
      ) | null> | null }
      & { __typename?: 'ActionCategoryFilterCardsBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { id?: string | null, fullWidth?: boolean | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { id?: string | null, heading?: string | null, lead?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'CardBlock' }
      ) | null> | null }
      & { __typename?: 'CardListBlock' }
    ) | (
      { id?: string | null, style?: string | null, styleOverrides?: string | null, blockType: string, field: string, account?: (
        { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
        & { __typename?: 'CartographyProviderCredentials' }
      ) | null }
      & { __typename?: 'CartographyVisualisationBlock' }
    ) | (
      { id?: string | null, style?: string | null, heading?: string | null, lead?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
      ) | null, category?: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, color?: string | null, iconSvgUrl?: string | null, helpText: string, level?: (
            { id: string, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, large?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, small?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, social?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null, rendition?: (
              { id: string, width: number, height: number, src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { id?: string | null, title: string, urlPath: string, live: boolean }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'CategoryListBlock' }
    ) | (
      { id?: string | null, heading?: string | null, lead?: string | null, blockType: string, field: string, valueAttribute?: (
        { identifier: string, unit?: (
          { shortName?: string | null }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename?: 'AttributeType' }
      ) | null, categoryType?: (
        { identifier: string }
        & { __typename?: 'CategoryType' }
      ) | null }
      & { __typename?: 'CategoryTreeMapBlock' }
    ) | (
      { id?: string | null, value: string, blockType: string, field: string }
      & { __typename?: 'CharBlock' | 'RichTextBlock' | 'TextBlock' }
    ) | (
      { id?: string | null, value: string, blockType: string, field: string, choices: Array<(
        { key: string, value: string }
        & { __typename?: 'ChoiceOption' }
      )> }
      & { __typename?: 'ChoiceBlock' }
    ) | (
      { id?: string | null, layout?: string | null, heading?: string | null, lead?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, large?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, small?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, social?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null, rendition?: (
          { id: string, width: number, height: number, src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'FrontPageHeroBlock' }
    ) | (
      { id?: string | null, style?: string | null, blockType: string, field: string, indicator?: (
        { id: string }
        & { __typename?: 'Indicator' }
      ) | null }
      & { __typename?: 'IndicatorBlock' }
    ) | (
      { id?: string | null, title?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { style?: string | null, indicator?: (
          { id: string, identifier?: string | null, name: string, description?: string | null, timeResolution: IndicatorTimeResolution, level?: string | null, unit: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ), latestValue?: (
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorValue' }
          ) | null, goals?: Array<(
            { id: string, date?: string | null, value: number }
            & { __typename?: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename?: 'Indicator' }
        ) | null }
        & { __typename?: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { id?: string | null, title?: string | null, body?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null, categories: Array<(
            { id: string }
            & { __typename?: 'DimensionCategory' }
          )> }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number, normalizedValues?: Array<(
            { normalizerId?: string | null, value?: number | null }
            & { __typename?: 'NormalizedValue' }
          ) | null> | null }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null, common?: (
          { id: string, normalizations?: Array<(
            { unit?: (
              { shortName?: string | null }
              & { __typename?: 'Unit' }
            ) | null, normalizer?: (
              { name: string, id: string, identifier?: string | null }
              & { __typename?: 'CommonIndicator' }
            ) | null }
            & { __typename?: 'CommonIndicatorNormalization' }
          ) | null> | null }
          & { __typename?: 'CommonIndicator' }
        ) | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { id?: string | null, width?: string | null, blockType: string, field: string, image?: (
        { title: string, altText: string, width: number, height: number, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { id?: string | null, heading?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' } | { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' } | { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' } | { __typename?: 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { question?: string | null, answer?: string | null }
        & { __typename?: 'QuestionBlock' }
      ) | null> | null }
      & { __typename?: 'QuestionAnswerBlock' }
    ) | null> | null }
    & { __typename: 'PlanRootPage' }
  ) | null, plan?: (
    { id: string, primaryActionClassification?: (
      { categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, large?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, small?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, social?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null, rendition?: (
            { id: string, width: number, height: number, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { live: boolean, id?: string | null, title: string, urlPath: string }
          & { __typename?: 'CategoryPage' }
        ) | null, level?: (
          { name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type GetPlanPageIndicatorListQueryVariables = Exact<{
  plan: Scalars['ID'];
  path: Scalars['String'];
}>;


export type GetPlanPageIndicatorListQuery = (
  { planPage?: (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { leadContent?: string | null, displayInsights?: boolean | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'IndicatorListPage' }
  ) | null }
  & { __typename?: 'Query' }
);

export type IndicatorDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  plan?: InputMaybe<Scalars['ID']>;
}>;


export type IndicatorDetailsQuery = (
  { indicator?: (
    { id: string, identifier?: string | null, name: string, level?: string | null, description?: string | null, timeResolution: IndicatorTimeResolution, organization: (
      { id: string, name: string, abbreviation: string, classification?: (
        { id: string, name: string }
        & { __typename?: 'OrganizationClass' }
      ) | null, logo?: (
        { id: string, rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Organization' }
    ), categories: Array<(
      { identifier: string, name: string, id: string, type: (
        { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
          { id: string, order: number, name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        )> }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )>, common?: (
      { id: string, indicators: Array<(
        { id: string, identifier?: string | null, organization: (
          { id: string, name: string, abbreviation: string, classification?: (
            { id: string, name: string }
            & { __typename?: 'OrganizationClass' }
          ) | null, logo?: (
            { id: string, rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Indicator' }
      )> }
      & { __typename?: 'CommonIndicator' }
    ) | null, unit: (
      { id: string, name: string, shortName?: string | null, verboseName?: string | null, verboseNamePlural?: string | null }
      & { __typename?: 'Unit' }
    ), latestGraph?: (
      { id: string }
      & { __typename?: 'IndicatorGraph' }
    ) | null, values?: Array<(
      { id: string, date?: string | null, value: number }
      & { __typename?: 'IndicatorValue' }
    ) | null> | null, goals?: Array<(
      { id: string, date?: string | null, value: number, scenario?: (
        { id: string }
        & { __typename?: 'Scenario' }
      ) | null }
      & { __typename?: 'IndicatorGoal' }
    ) | null> | null, actions?: Array<(
      { id: string, identifier: string, name: string, color?: string | null, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, implementationPhase?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionImplementationPhase' }
      ) | null, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename?: 'ActionStatusSummary' }
      ), categories: Array<(
        { id: string, identifier: string, name: string, image?: (
          { rendition?: (
            { id: string, src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Category' }
      )>, impact?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionImpact' }
      ) | null }
      & { __typename?: 'Action' }
    ) | null> | null, relatedCauses: Array<(
      { id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, causalIndicator: (
        { id: string, name: string, level?: string | null }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'RelatedIndicator' }
    )>, relatedEffects: Array<(
      { id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, effectIndicator: (
        { id: string, name: string, level?: string | null }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'RelatedIndicator' }
    )> }
    & { __typename?: 'Indicator' }
  ) | null }
  & { __typename?: 'Query' }
);

export type ActionsTableRowFragmentFragment = (
  { id: string, identifier: string, name: string, color?: string | null, completion?: number | null, status?: (
    { id: string, identifier: string, name: string, color?: string | null }
    & { __typename?: 'ActionStatus' }
  ) | null, implementationPhase?: (
    { id: string, identifier: string, name: string }
    & { __typename?: 'ActionImplementationPhase' }
  ) | null, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier }
    & { __typename?: 'ActionStatusSummary' }
  ), categories: Array<(
    { id: string, identifier: string, name: string, image?: (
      { rendition?: (
        { id: string, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null }
    & { __typename?: 'Category' }
  )>, impact?: (
    { id: string, identifier: string, name: string }
    & { __typename?: 'ActionImpact' }
  ) | null }
  & { __typename?: 'Action' }
);

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  plan: Scalars['ID'];
  clientUrl: Scalars['String'];
}>;


export type OrganizationDetailsQuery = (
  { organization?: (
    { id: string, name: string, abbreviation: string, distinctName?: string | null, description: string, url: string, actionCount: number, contactPersonCount: number, classification?: (
      { id: string, name: string, identifier: string }
      & { __typename?: 'OrganizationClass' }
    ) | null, ancestors?: Array<(
      { id: string }
      & { __typename?: 'Organization' }
    ) | null> | null, plansWithActionResponsibilities: Array<(
      { id: string, name: string, shortName?: string | null, versionName: string, viewUrl?: string | null, organization: (
        { id: string, name: string, abbreviation: string }
        & { __typename?: 'Organization' }
      ), primaryOrgs: Array<(
        { id: string, name: string }
        & { __typename?: 'Organization' }
      ) | null>, actionImpacts: Array<(
        { id: string }
        & { __typename?: 'ActionImpact' }
      )>, actionStatusSummaries: Array<(
        { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
        & { __typename?: 'ActionStatusSummary' }
      )>, image?: (
        { rendition?: (
          { id: string, src: string, alt: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number }
        & { __typename?: 'ActionImplementationPhase' }
      )>, actionStatuses: Array<(
        { id: string, identifier: string, name: string, isCompleted: boolean }
        & { __typename?: 'ActionStatus' }
      )>, features: (
        { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
        & { __typename?: 'PlanFeatures' }
      ), actions: Array<(
        { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, plan: (
          { id: string, viewUrl?: string | null }
          & { __typename?: 'Plan' }
        ), statusSummary: (
          { identifier: ActionStatusSummaryIdentifier }
          & { __typename?: 'ActionStatusSummary' }
        ), schedule: Array<(
          { id: string }
          & { __typename?: 'ActionSchedule' }
        )>, status?: (
          { id: string, identifier: string, name: string, color?: string | null }
          & { __typename?: 'ActionStatus' }
        ) | null, implementationPhase?: (
          { id: string, identifier: string, name: string, order: number }
          & { __typename?: 'ActionImplementationPhase' }
        ) | null, impact?: (
          { id: string, identifier: string }
          & { __typename?: 'ActionImpact' }
        ) | null, categories: Array<(
          { id: string }
          & { __typename?: 'Category' }
        )>, responsibleParties: Array<(
          { id: string, organization: (
            { id: string, abbreviation: string, name: string }
            & { __typename?: 'Organization' }
          ) }
          & { __typename?: 'ActionResponsibleParty' }
        )>, primaryOrg?: (
          { id: string, abbreviation: string, name: string, logo?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null }
          & { __typename?: 'Organization' }
        ) | null, tasks: Array<(
          { id: string, state: ActionTaskState, dueAt: any }
          & { __typename?: 'ActionTask' }
        )>, mergedWith?: (
          { id: string, identifier: string, plan: (
            { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
            & { __typename?: 'Plan' }
          ) }
          & { __typename?: 'Action' }
        ) | null, indicators: Array<(
          { id: string, goals?: Array<(
            { id: string }
            & { __typename?: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename?: 'Indicator' }
        )>, relatedIndicators: Array<(
          { id: string, indicatesActionProgress: boolean, indicator: (
            { id: string, goals?: Array<(
              { id: string }
              & { __typename?: 'IndicatorGoal' }
            ) | null> | null }
            & { __typename?: 'Indicator' }
          ) }
          & { __typename?: 'ActionIndicator' }
        )> }
        & { __typename?: 'Action' }
      )> }
      & { __typename?: 'Plan' }
    )>, parent?: (
      { id: string, name: string }
      & { __typename?: 'Organization' }
    ) | null, logo?: (
      { id: string, altText: string, rendition?: (
        { id: string, src: string, alt: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null }
    & { __typename?: 'Organization' }
  ) | null, plan?: (
    { id: string, name: string, shortName?: string | null, versionName: string, viewUrl?: string | null, actionListPage?: (
      { dashboardColumns?: Array<(
        { columnLabel?: string | null }
        & { __typename: 'IdentifierColumnBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
      )> | null }
      & { __typename?: 'ActionListPage' }
    ) | null, organization: (
      { id: string, name: string, abbreviation: string }
      & { __typename?: 'Organization' }
    ), primaryOrgs: Array<(
      { id: string, name: string }
      & { __typename?: 'Organization' }
    ) | null>, actionImpacts: Array<(
      { id: string }
      & { __typename?: 'ActionImpact' }
    )>, actionStatusSummaries: Array<(
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
      & { __typename?: 'ActionStatusSummary' }
    )>, image?: (
      { rendition?: (
        { id: string, src: string, alt: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImplementationPhase' }
    )>, actionStatuses: Array<(
      { id: string, identifier: string, name: string, isCompleted: boolean }
      & { __typename?: 'ActionStatus' }
    )>, features: (
      { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
      & { __typename?: 'PlanFeatures' }
    ), actions: Array<(
      { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, plan: (
        { id: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ), statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename?: 'ActionStatusSummary' }
      ), schedule: Array<(
        { id: string }
        & { __typename?: 'ActionSchedule' }
      )>, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, implementationPhase?: (
        { id: string, identifier: string, name: string, order: number }
        & { __typename?: 'ActionImplementationPhase' }
      ) | null, impact?: (
        { id: string, identifier: string }
        & { __typename?: 'ActionImpact' }
      ) | null, categories: Array<(
        { id: string }
        & { __typename?: 'Category' }
      )>, responsibleParties: Array<(
        { id: string, organization: (
          { id: string, abbreviation: string, name: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'ActionResponsibleParty' }
      )>, primaryOrg?: (
        { id: string, abbreviation: string, name: string, logo?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null }
        & { __typename?: 'Organization' }
      ) | null, tasks: Array<(
        { id: string, state: ActionTaskState, dueAt: any }
        & { __typename?: 'ActionTask' }
      )>, mergedWith?: (
        { id: string, identifier: string, plan: (
          { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
          & { __typename?: 'Plan' }
        ) }
        & { __typename?: 'Action' }
      ) | null, indicators: Array<(
        { id: string, goals?: Array<(
          { id: string }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      )>, relatedIndicators: Array<(
        { id: string, indicatesActionProgress: boolean, indicator: (
          { id: string, goals?: Array<(
            { id: string }
            & { __typename?: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename?: 'Indicator' }
        ) }
        & { __typename?: 'ActionIndicator' }
      )> }
      & { __typename?: 'Action' }
    )> }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type OrgContentPlanFragment = (
  { id: string, name: string, shortName?: string | null, versionName: string, viewUrl?: string | null, organization: (
    { id: string, name: string, abbreviation: string }
    & { __typename?: 'Organization' }
  ), primaryOrgs: Array<(
    { id: string, name: string }
    & { __typename?: 'Organization' }
  ) | null>, actionImpacts: Array<(
    { id: string }
    & { __typename?: 'ActionImpact' }
  )>, actionStatusSummaries: Array<(
    { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
    & { __typename?: 'ActionStatusSummary' }
  )>, image?: (
    { rendition?: (
      { id: string, src: string, alt: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null, actionImplementationPhases: Array<(
    { id: string, identifier: string, name: string, order: number }
    & { __typename?: 'ActionImplementationPhase' }
  )>, actionStatuses: Array<(
    { id: string, identifier: string, name: string, isCompleted: boolean }
    & { __typename?: 'ActionStatus' }
  )>, features: (
    { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
    & { __typename?: 'PlanFeatures' }
  ), actions: Array<(
    { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, plan: (
      { id: string, viewUrl?: string | null }
      & { __typename?: 'Plan' }
    ), statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename?: 'ActionStatusSummary' }
    ), schedule: Array<(
      { id: string }
      & { __typename?: 'ActionSchedule' }
    )>, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, implementationPhase?: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, impact?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImpact' }
    ) | null, categories: Array<(
      { id: string }
      & { __typename?: 'Category' }
    )>, responsibleParties: Array<(
      { id: string, organization: (
        { id: string, abbreviation: string, name: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'ActionResponsibleParty' }
    )>, primaryOrg?: (
      { id: string, abbreviation: string, name: string, logo?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Organization' }
    ) | null, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: any }
      & { __typename?: 'ActionTask' }
    )>, mergedWith?: (
      { id: string, identifier: string, plan: (
        { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, indicators: Array<(
      { id: string, goals?: Array<(
        { id: string }
        & { __typename?: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename?: 'Indicator' }
    )>, relatedIndicators: Array<(
      { id: string, indicatesActionProgress: boolean, indicator: (
        { id: string, goals?: Array<(
          { id: string }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'ActionIndicator' }
    )> }
    & { __typename?: 'Action' }
  )> }
  & { __typename?: 'Plan' }
);

export type GetPlanContextQueryVariables = Exact<{
  identifier?: InputMaybe<Scalars['ID']>;
  hostname?: InputMaybe<Scalars['String']>;
  clientUrl?: InputMaybe<Scalars['String']>;
}>;


export type GetPlanContextQuery = (
  { plan?: (
    { id: string, identifier: string, name: string, shortName?: string | null, versionName: string, themeIdentifier?: string | null, primaryLanguage: string, otherLanguages?: Array<string> | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, viewUrl?: string | null, serveFileBaseUrl: string, adminUrl?: string | null, accessibilityStatementUrl?: string | null, externalFeedbackUrl?: string | null, primaryActionClassification?: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean, common?: (
        { identifier: string }
        & { __typename?: 'CommonCategoryType' }
      ) | null }
      & { __typename?: 'CategoryType' }
    ) | null, secondaryActionClassification?: (
      { id: string, identifier: string }
      & { __typename?: 'CategoryType' }
    ) | null, domain?: (
      { id: string, basePath?: string | null, googleSiteVerificationTag?: string | null, matomoAnalyticsUrl?: string | null }
      & { __typename?: 'PlanDomain' }
    ) | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, large?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, small?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, social?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null, rendition?: (
        { id: string, width: number, height: number, src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, actionSchedules: Array<(
      { id: string, name: string, beginsAt: any, endsAt?: any | null }
      & { __typename?: 'ActionSchedule' }
    )>, actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number, color?: string | null }
      & { __typename?: 'ActionImplementationPhase' }
    )>, actionImpacts: Array<(
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImpact' }
    )>, actionStatuses: Array<(
      { id: string, identifier: string, name: string, isCompleted: boolean }
      & { __typename?: 'ActionStatus' }
    )>, actionStatusSummaries: Array<(
      { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
      & { __typename?: 'ActionStatusSummary' }
    )>, actionTimelinessClasses: Array<(
      { identifier: ActionTimelinessIdentifier, label: string, color: string, sentiment: Sentiment, comparison: Comparison, days: number }
      & { __typename?: 'ActionTimeliness' }
    )>, impactGroups: Array<(
      { id: string }
      & { __typename?: 'ImpactGroup' }
    ) | null>, primaryOrgs: Array<(
      { id: string }
      & { __typename?: 'Organization' }
    ) | null>, generalContent: (
      { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm, sitewideAnnouncement?: string | null }
      & { __typename?: 'SiteGeneralContent' }
    ), mainMenu?: (
      { items: Array<(
        { linkText: string, url: string }
        & { __typename: 'ExternalLinkMenuItem' }
      ) | (
        { id: string, page: (
          { title: string, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent?: (
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename?: 'PageMenuItem' }
        ) | null }
        & { __typename: 'PageMenuItem' }
      ) | null> }
      & { __typename?: 'MainMenu' }
    ) | null, footer?: (
      { items: Array<{ __typename?: 'ExternalLinkMenuItem' } | (
        { id: string, page: (
          { title: string, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent?: (
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename?: 'PageMenuItem' }
        ) | null, children?: Array<(
          { id: string, page: (
            { title: string, urlPath: string, slug: string }
            & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename: 'PageMenuItem' }
        ) | null> | null }
        & { __typename?: 'PageMenuItem' }
      ) | null> }
      & { __typename?: 'Footer' }
    ) | null, features: (
      { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean }
      & { __typename?: 'PlanFeatures' }
    ), allRelatedPlans: Array<(
      { id: string, identifier: string, name: string, shortName?: string | null, viewUrl?: string | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, organization: (
        { name: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'Plan' }
    ) | null>, supersededBy?: (
      { name: string, shortName?: string | null, versionName: string, identifier: string, viewUrl?: string | null, publishedAt?: any | null }
      & { __typename?: 'Plan' }
    ) | null, supersededPlans: Array<(
      { name: string, shortName?: string | null, versionName: string, identifier: string, viewUrl?: string | null, publishedAt?: any | null }
      & { __typename?: 'Plan' }
    )>, supersedingPlans: Array<(
      { name: string, shortName?: string | null, versionName: string, identifier: string, viewUrl?: string | null, publishedAt?: any | null }
      & { __typename?: 'Plan' }
    )>, children: Array<(
      { id: string, identifier: string, name: string, shortName?: string | null, viewUrl?: string | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, organization: (
        { name: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'Plan' }
    )>, parent?: (
      { id: string, identifier: string, name: string, shortName?: string | null, viewUrl?: string | null, generalContent: (
        { id: string, siteTitle: string }
        & { __typename?: 'SiteGeneralContent' }
      ), image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, organization: (
        { name: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'Plan' }
    ) | null, additionalLinks?: (
      { items: Array<{ __typename?: 'ExternalLinkMenuItem' } | (
        { id: string, page: (
          { title: string, urlPath: string, slug: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' } | { __typename?: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
            { blocks: Array<(
              { field: string }
              & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
            ) | (
              { field: string }
              & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
            ) | (
              { field: string }
              & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' }
            ) | (
              { field: string }
              & { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
            ) | (
              { field: string }
              & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
            ) | (
              { value: string, field: string }
              & { __typename?: 'CharBlock' }
            )> }
            & { __typename?: 'AccessibilityStatementContactInformationBlock' }
          ) | null> | null }
          & { __typename?: 'AccessibilityStatementPage' }
        ) | (
          { title: string, urlPath: string, slug: string }
          & { __typename?: 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename?: 'PageMenuItem' }
      ) | null> }
      & { __typename?: 'AdditionalLinks' }
    ) | null, actionListPage?: (
      { includeRelatedPlans?: boolean | null, actionDateFormat?: string | null, taskDateFormat?: string | null }
      & { __typename?: 'ActionListPage' }
    ) | null }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type PlanContextFragment = (
  { id: string, identifier: string, name: string, shortName?: string | null, versionName: string, themeIdentifier?: string | null, primaryLanguage: string, otherLanguages?: Array<string> | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, viewUrl?: string | null, serveFileBaseUrl: string, adminUrl?: string | null, accessibilityStatementUrl?: string | null, externalFeedbackUrl?: string | null, primaryActionClassification?: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean, common?: (
      { identifier: string }
      & { __typename?: 'CommonCategoryType' }
    ) | null }
    & { __typename?: 'CategoryType' }
  ) | null, secondaryActionClassification?: (
    { id: string, identifier: string }
    & { __typename?: 'CategoryType' }
  ) | null, domain?: (
    { id: string, basePath?: string | null, googleSiteVerificationTag?: string | null, matomoAnalyticsUrl?: string | null }
    & { __typename?: 'PlanDomain' }
  ) | null, image?: (
    { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, full?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, large?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, small?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, social?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null, rendition?: (
      { id: string, width: number, height: number, src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null, actionSchedules: Array<(
    { id: string, name: string, beginsAt: any, endsAt?: any | null }
    & { __typename?: 'ActionSchedule' }
  )>, actionImplementationPhases: Array<(
    { id: string, identifier: string, name: string, order: number, color?: string | null }
    & { __typename?: 'ActionImplementationPhase' }
  )>, actionImpacts: Array<(
    { id: string, identifier: string, name: string, order: number }
    & { __typename?: 'ActionImpact' }
  )>, actionStatuses: Array<(
    { id: string, identifier: string, name: string, isCompleted: boolean }
    & { __typename?: 'ActionStatus' }
  )>, actionStatusSummaries: Array<(
    { identifier: ActionStatusSummaryIdentifier, label: string, color: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
    & { __typename?: 'ActionStatusSummary' }
  )>, actionTimelinessClasses: Array<(
    { identifier: ActionTimelinessIdentifier, label: string, color: string, sentiment: Sentiment, comparison: Comparison, days: number }
    & { __typename?: 'ActionTimeliness' }
  )>, impactGroups: Array<(
    { id: string }
    & { __typename?: 'ImpactGroup' }
  ) | null>, primaryOrgs: Array<(
    { id: string }
    & { __typename?: 'Organization' }
  ) | null>, generalContent: (
    { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm, sitewideAnnouncement?: string | null }
    & { __typename?: 'SiteGeneralContent' }
  ), mainMenu?: (
    { items: Array<(
      { linkText: string, url: string }
      & { __typename: 'ExternalLinkMenuItem' }
    ) | (
      { id: string, page: (
        { title: string, urlPath: string, slug: string }
        & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ), parent?: (
        { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
        & { __typename?: 'PageMenuItem' }
      ) | null }
      & { __typename: 'PageMenuItem' }
    ) | null> }
    & { __typename?: 'MainMenu' }
  ) | null, footer?: (
    { items: Array<{ __typename?: 'ExternalLinkMenuItem' } | (
      { id: string, page: (
        { title: string, urlPath: string, slug: string }
        & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ), parent?: (
        { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
        & { __typename?: 'PageMenuItem' }
      ) | null, children?: Array<(
        { id: string, page: (
          { title: string, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename: 'PageMenuItem' }
      ) | null> | null }
      & { __typename?: 'PageMenuItem' }
    ) | null> }
    & { __typename?: 'Footer' }
  ) | null, features: (
    { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean }
    & { __typename?: 'PlanFeatures' }
  ), allRelatedPlans: Array<(
    { id: string, identifier: string, name: string, shortName?: string | null, viewUrl?: string | null, image?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, organization: (
      { name: string }
      & { __typename?: 'Organization' }
    ) }
    & { __typename?: 'Plan' }
  ) | null>, supersededBy?: (
    { name: string, shortName?: string | null, versionName: string, identifier: string, viewUrl?: string | null, publishedAt?: any | null }
    & { __typename?: 'Plan' }
  ) | null, supersededPlans: Array<(
    { name: string, shortName?: string | null, versionName: string, identifier: string, viewUrl?: string | null, publishedAt?: any | null }
    & { __typename?: 'Plan' }
  )>, supersedingPlans: Array<(
    { name: string, shortName?: string | null, versionName: string, identifier: string, viewUrl?: string | null, publishedAt?: any | null }
    & { __typename?: 'Plan' }
  )>, children: Array<(
    { id: string, identifier: string, name: string, shortName?: string | null, viewUrl?: string | null, image?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, organization: (
      { name: string }
      & { __typename?: 'Organization' }
    ) }
    & { __typename?: 'Plan' }
  )>, parent?: (
    { id: string, identifier: string, name: string, shortName?: string | null, viewUrl?: string | null, generalContent: (
      { id: string, siteTitle: string }
      & { __typename?: 'SiteGeneralContent' }
    ), image?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, organization: (
      { name: string }
      & { __typename?: 'Organization' }
    ) }
    & { __typename?: 'Plan' }
  ) | null, additionalLinks?: (
    { items: Array<{ __typename?: 'ExternalLinkMenuItem' } | (
      { id: string, page: (
        { title: string, urlPath: string, slug: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' } | { __typename?: 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' } | { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' } | { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' } | { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { blocks: Array<(
            { field: string }
            & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
          ) | (
            { field: string }
            & { __typename?: 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' }
          ) | (
            { field: string }
            & { __typename?: 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImpactColumnBlock' | 'ImplementationPhaseColumnBlock' }
          ) | (
            { field: string }
            & { __typename?: 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
          ) | (
            { field: string }
            & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
          ) | (
            { value: string, field: string }
            & { __typename?: 'CharBlock' }
          )> }
          & { __typename?: 'AccessibilityStatementContactInformationBlock' }
        ) | null> | null }
        & { __typename?: 'AccessibilityStatementPage' }
      ) | (
        { title: string, urlPath: string, slug: string }
        & { __typename?: 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ) }
      & { __typename?: 'PageMenuItem' }
    ) | null> }
    & { __typename?: 'AdditionalLinks' }
  ) | null, actionListPage?: (
    { includeRelatedPlans?: boolean | null, actionDateFormat?: string | null, taskDateFormat?: string | null }
    & { __typename?: 'ActionListPage' }
  ) | null }
  & { __typename?: 'Plan' }
);

export type GetPlansByHostnameQueryVariables = Exact<{
  hostname?: InputMaybe<Scalars['String']>;
}>;


export type GetPlansByHostnameQuery = (
  { plansForHostname?: Array<(
    { id: string, identifier: string, otherLanguages?: Array<string> | null, primaryLanguage: string, domain?: (
      { hostname: string, basePath?: string | null, status?: PublicationStatus | null, statusMessage?: string | null }
      & { __typename?: 'PlanDomain' }
    ) | null, domains?: Array<(
      { hostname: string, basePath?: string | null, status?: PublicationStatus | null, statusMessage?: string | null }
      & { __typename?: 'PlanDomain' }
    ) | null> | null }
    & { __typename?: 'Plan' }
  ) | (
    { primaryLanguage: string, domain?: (
      { hostname: string, basePath?: string | null, status?: PublicationStatus | null, statusMessage?: string | null }
      & { __typename?: 'PlanDomain' }
    ) | null, domains?: Array<(
      { hostname: string, basePath?: string | null, status?: PublicationStatus | null, statusMessage?: string | null }
      & { __typename?: 'PlanDomain' }
    ) | null> | null }
    & { __typename?: 'RestrictedPlanNode' }
  ) | null> | null }
  & { __typename?: 'Query' }
);
