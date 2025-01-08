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

export type AccessibilityStatementComplianceStatusBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementComplianceStatusBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AccessibilityStatementContactFormBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementContactFormBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AccessibilityStatementContactInformationBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementContactInformationBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type AccessibilityStatementPage = PageInterface & {
  __typename?: 'AccessibilityStatementPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  leadContent?: Maybe<Scalars['String']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type AccessibilityStatementPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type AccessibilityStatementPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type AccessibilityStatementPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type AccessibilityStatementPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type AccessibilityStatementPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type AccessibilityStatementPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type AccessibilityStatementPreparationInformationBlock = StreamFieldInterface & {
  __typename?: 'AccessibilityStatementPreparationInformationBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

/** One action/measure tracked in an action plan. */
export type Action = {
  __typename?: 'Action';
  adminButtons: Array<AdminButton>;
  allDependencyRelationships: Array<ActionDependencyRelationship>;
  attributes: Array<AttributeInterface>;
  categories: Array<Category>;
  color?: Maybe<Scalars['String']['output']>;
  /** The completion percentage for this action */
  completion?: Maybe<Scalars['Int']['output']>;
  contactPersons: Array<ActionContactPerson>;
  /** Set if this action has been created by copying another action */
  copies: Array<Action>;
  /** Set if this action has been created by copying another action */
  copyOf?: Maybe<Action>;
  datasets?: Maybe<Array<Maybe<Dataset>>>;
  /** Format of action start and end dates shown in the public UI.             The default for all actions can be specified on the actions page. */
  dateFormat?: Maybe<ActionDateFormat>;
  /** Set if this action has the same role in all its dependency relationships with other actions */
  dependencyRole?: Maybe<ActionDependencyRole>;
  dependentRelationships: Array<ActionDependencyRelationship>;
  /** What does this action involve in more detail? */
  description?: Maybe<Scalars['String']['output']>;
  editUrl?: Maybe<Scalars['String']['output']>;
  /** The date when implementation of this action ends */
  endDate?: Maybe<Scalars['Date']['output']>;
  hasIndicatorsWithGoals?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The identifier for this action (e.g. number) */
  identifier: Scalars['String']['output'];
  image?: Maybe<Image>;
  /** The impact of this action */
  impact?: Maybe<ActionImpact>;
  impactGroups: Array<ImpactGroupAction>;
  implementationPhase?: Maybe<ActionImplementationPhase>;
  indicators: Array<Indicator>;
  indicatorsCount?: Maybe<Scalars['Int']['output']>;
  leadParagraph: Scalars['String']['output'];
  links: Array<ActionLink>;
  /** Describe the reason why this action has this status */
  manualStatusReason?: Maybe<Scalars['String']['output']>;
  /** Set if this action is merged with another action */
  mergedActions: Array<Action>;
  /** Set if this action is merged with another action */
  mergedWith?: Maybe<Action>;
  monitoringQualityPoints: Array<MonitoringQualityPoint>;
  name: Scalars['String']['output'];
  nextAction?: Maybe<Action>;
  /** The name as approved by an official party */
  officialName?: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  plan: Plan;
  previousAction?: Maybe<Action>;
  primaryOrg?: Maybe<Organization>;
  relatedActions: Array<Action>;
  relatedIndicators: Array<ActionIndicator>;
  responsibleParties: Array<ActionResponsibleParty>;
  schedule: Array<ActionSchedule>;
  /** Set if the action does not have a start or an end date */
  scheduleContinuous: Scalars['Boolean']['output'];
  similarActions?: Maybe<Array<Maybe<Action>>>;
  /** The date when implementation of this action starts */
  startDate?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<ActionStatus>;
  statusSummary: ActionStatusSummary;
  statusUpdates: Array<ActionStatusUpdate>;
  /** Set if this action is superseded by another action */
  supersededActions: Array<Action>;
  /** Set if this action is superseded by another action */
  supersededBy?: Maybe<Action>;
  tasks: Array<ActionTask>;
  timeliness: ActionTimeliness;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['UUID']['output'];
  viewUrl: Scalars['String']['output'];
  visibility: ActionVisibility;
  workflowStatus?: Maybe<WorkflowInfoNode>;
};


/** One action/measure tracked in an action plan. */
export type ActionAttributesArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** One action/measure tracked in an action plan. */
export type ActionCategoriesArgs = {
  categoryType?: InputMaybe<Scalars['ID']['input']>;
};


/** One action/measure tracked in an action plan. */
export type ActionContactPersonsArgs = {
  showAllContactPersons?: InputMaybe<Scalars['Boolean']['input']>;
};


/** One action/measure tracked in an action plan. */
export type ActionNameArgs = {
  hyphenated?: InputMaybe<Scalars['Boolean']['input']>;
};


/** One action/measure tracked in an action plan. */
export type ActionViewUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']['input']>;
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
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  showAllLabel?: Maybe<Scalars['String']['output']>;
};

export type ActionAttributeTypeReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionAttributeTypeReportFieldBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type ActionCategoryFilterCardBlock = StreamFieldInterface & {
  __typename?: 'ActionCategoryFilterCardBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  category?: Maybe<Category>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lead?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type ActionCategoryFilterCardsBlock = StreamFieldInterface & {
  __typename?: 'ActionCategoryFilterCardsBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  cards?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type ActionCategoryReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionCategoryReportFieldBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type ActionCategoryReportValue = ReportValueInterface & {
  __typename?: 'ActionCategoryReportValue';
  category?: Maybe<Category>;
  field: ReportFieldBlock;
};

export type ActionContactFormBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContactFormBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  description?: Maybe<Scalars['String']['output']>;
  emailRequired?: Maybe<Scalars['Boolean']['output']>;
  emailVisible?: Maybe<Scalars['Boolean']['output']>;
  feedbackRequired?: Maybe<Scalars['Boolean']['output']>;
  feedbackVisible?: Maybe<Scalars['Boolean']['output']>;
  field: Scalars['String']['output'];
  fields?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

/** A Person acting as a contact for an action. */
export type ActionContactPerson = {
  __typename?: 'ActionContactPerson';
  action: Action;
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  person: Person;
  /** Is this person the primary contact person for the action? */
  primaryContact: Scalars['Boolean']['output'];
  role: ActionContactPersonRole;
};

/** An enumeration. */
export enum ActionContactPersonRole {
  /** Editor */
  Editor = 'EDITOR',
  /** Moderator */
  Moderator = 'MODERATOR'
}

export type ActionContactPersonsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContactPersonsBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionContentAttributeTypeBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContentAttributeTypeBlock';
  attributeType: AttributeType;
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionContentCategoryTypeBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionContentCategoryTypeBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  categoryType: CategoryType;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionContentSectionBlock = StreamFieldInterface & {
  __typename?: 'ActionContentSectionBlock';
  blockType: Scalars['String']['output'];
  blocks?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  layout?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type ActionDashboardColumnBlock = EndDateColumnBlock | FieldColumnBlock | IdentifierColumnBlock | ImplementationPhaseColumnBlock | IndicatorsColumnBlock | NameColumnBlock | OrganizationColumnBlock | ResponsiblePartiesColumnBlock | StartDateColumnBlock | StatusColumnBlock | TasksColumnBlock | UpdatedAtColumnBlock;

/** An enumeration. */
export enum ActionDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

export type ActionDependenciesBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionDependenciesBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionDependencyRelationship = {
  __typename?: 'ActionDependencyRelationship';
  dependent: Action;
  id: Scalars['ID']['output'];
  preceding: Action;
};

export type ActionDependencyRole = {
  __typename?: 'ActionDependencyRole';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ActionDescriptionBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionDescriptionBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionEndDateBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionEndDateBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionHighlightsBlock = StreamFieldInterface & {
  __typename?: 'ActionHighlightsBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

/** An impact classification for an action in an action plan. */
export type ActionImpact = {
  __typename?: 'ActionImpact';
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  plan: Plan;
};

export type ActionImplementationPhase = {
  __typename?: 'ActionImplementationPhase';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  plan: Plan;
};

export type ActionImplementationPhaseFilterBlock = StreamFieldInterface & {
  __typename?: 'ActionImplementationPhaseFilterBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ActionImplementationPhaseReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionImplementationPhaseReportFieldBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
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
  id: Scalars['ID']['output'];
  /** Set if the indicator should be used to determine action progress */
  indicatesActionProgress: Scalars['Boolean']['output'];
  indicator: Indicator;
};

/** An enumeration. */
export enum ActionIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES'
}

export type ActionLeadParagraphBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionLeadParagraphBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

/** A link related to an action. */
export type ActionLink = {
  __typename?: 'ActionLink';
  action: Action;
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ActionLinksBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionLinksBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionListBlock = StreamFieldInterface & {
  __typename?: 'ActionListBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  categoryFilter?: Maybe<Category>;
  field: Scalars['String']['output'];
  groupByCategoryLevel?: Maybe<CategoryLevel>;
  heading?: Maybe<Scalars['String']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type ActionListFilterBlock = ActionAttributeTypeFilterBlock | ActionImplementationPhaseFilterBlock | ActionScheduleFilterBlock | ActionStatusFilterBlock | CategoryTypeFilterBlock | ContinuousActionFilterBlock | PlanFilterBlock | PrimaryOrganizationFilterBlock | ResponsiblePartyFilterBlock;

export type ActionListPage = PageInterface & {
  __typename?: 'ActionListPage';
  actionDateFormat?: Maybe<Scalars['String']['output']>;
  advancedFilters?: Maybe<Array<ActionListFilterBlock>>;
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  dashboardColumns?: Maybe<Array<ActionDashboardColumnBlock>>;
  defaultView: ActionListPageView;
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  detailsAside?: Maybe<Array<ActionAsideContentBlock>>;
  detailsMainBottom?: Maybe<Array<ActionMainContentBlock>>;
  detailsMainTop?: Maybe<Array<ActionMainContentBlock>>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  headingHierarchyDepth: Scalars['Int']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  includeRelatedPlans?: Maybe<Scalars['Boolean']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  leadContent?: Maybe<Scalars['String']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  mainFilters?: Maybe<Array<ActionListFilterBlock>>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  primaryFilters?: Maybe<Array<ActionListFilterBlock>>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  taskDateFormat?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type ActionListPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ActionListPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ActionListPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ActionListPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ActionListPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ActionListPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export enum ActionListPageView {
  Cards = 'CARDS',
  Dashboard = 'DASHBOARD'
}

export type ActionMainContentBlock = ActionContactFormBlock | ActionContentAttributeTypeBlock | ActionContentCategoryTypeBlock | ActionContentSectionBlock | ActionDependenciesBlock | ActionDescriptionBlock | ActionLeadParagraphBlock | ActionLinksBlock | ActionMergedActionsBlock | ActionOfficialNameBlock | ActionRelatedActionsBlock | ActionRelatedIndicatorsBlock | ActionTasksBlock | IndicatorCausalChainBlock | PlanDatasetsBlock | ReportComparisonBlock;

export type ActionMainContentSectionElementBlock = ActionContentAttributeTypeBlock | ActionContentCategoryTypeBlock;

export type ActionManualStatusReasonBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionManualStatusReasonBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionMergedActionsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionMergedActionsBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionOfficialNameBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionOfficialNameBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  caption?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionPrimaryOrgBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionPrimaryOrgBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionRelatedActionsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionRelatedActionsBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionRelatedIndicatorsBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionRelatedIndicatorsBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionResponsiblePartiesBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionResponsiblePartiesBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionResponsibleParty = {
  __typename?: 'ActionResponsibleParty';
  action: Action;
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  organization: Organization;
  role?: Maybe<ActionResponsiblePartyRole>;
  /** The responsibility domain for the organization */
  specifier: Scalars['String']['output'];
};

export type ActionResponsiblePartyReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionResponsiblePartyReportFieldBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type ActionResponsiblePartyReportValue = ReportValueInterface & {
  __typename?: 'ActionResponsiblePartyReportValue';
  field: ReportFieldBlock;
  responsibleParty?: Maybe<ActionResponsibleParty>;
};

/** An enumeration. */
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
  beginsAt: Scalars['Date']['output'];
  endsAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plan: Plan;
};

export type ActionScheduleBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionScheduleBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionScheduleFilterBlock = StreamFieldInterface & {
  __typename?: 'ActionScheduleFilterBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ActionSimpleFieldReportValue = ReportValueInterface & {
  __typename?: 'ActionSimpleFieldReportValue';
  field: ReportFieldBlock;
  value?: Maybe<Scalars['String']['output']>;
};

export type ActionStartDateBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionStartDateBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

/** The current status for the action ("on time", "late", "completed", etc.). */
export type ActionStatus = {
  __typename?: 'ActionStatus';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  isCompleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  plan: Plan;
};

export type ActionStatusFilterBlock = StreamFieldInterface & {
  __typename?: 'ActionStatusFilterBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ActionStatusGraphsBlock = StreamFieldInterface & {
  __typename?: 'ActionStatusGraphsBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ActionStatusReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionStatusReportFieldBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ActionStatusReportValue = ReportValueInterface & {
  __typename?: 'ActionStatusReportValue';
  field: ReportFieldBlock;
  status?: Maybe<ActionStatus>;
};

export type ActionStatusSummary = {
  __typename?: 'ActionStatusSummary';
  /** @deprecated This field is an internal implementation detail; most often you should use action.color */
  color: Scalars['String']['output'];
  identifier: ActionStatusSummaryIdentifier;
  isActive: Scalars['Boolean']['output'];
  isCompleted: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  sentiment: Sentiment;
};

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

export type ActionStatusUpdate = {
  __typename?: 'ActionStatusUpdate';
  action: Action;
  author?: Maybe<Person>;
  content: Scalars['String']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

/**
 * A task that should be completed during the execution of an action.
 *
 * The task will have at least a name and an estimate of the due date.
 */
export type ActionTask = {
  __typename?: 'ActionTask';
  action: Action;
  comment?: Maybe<Scalars['String']['output']>;
  /** The date when the task was completed */
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Format of action task due dates shown in the public UI.             The default for all actions can be specified on the actions page. */
  dateFormat?: Maybe<ActionTaskDateFormat>;
  /** The date by which the task should be completed (deadline) */
  dueAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  state: ActionTaskState;
};

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

export type ActionTasksBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionTasksBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ActionTasksReportValue = ReportValueInterface & {
  __typename?: 'ActionTasksReportValue';
  field: ReportFieldBlock;
  tasks?: Maybe<Scalars['String']['output']>;
};

export type ActionTimeliness = {
  __typename?: 'ActionTimeliness';
  color: Scalars['String']['output'];
  comparison: Comparison;
  days: Scalars['Int']['output'];
  identifier: ActionTimelinessIdentifier;
  /** @deprecated Generate human-friendly labels in the UI. */
  label: Scalars['String']['output'];
  sentiment: Sentiment;
};

/** An enumeration. */
export enum ActionTimelinessIdentifier {
  Acceptable = 'ACCEPTABLE',
  Late = 'LATE',
  Optimal = 'OPTIMAL',
  Stale = 'STALE'
}

export type ActionUpdatedAtBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ActionUpdatedAtBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  fieldHelpText?: Maybe<Scalars['String']['output']>;
  fieldLabel?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

/** An enumeration. */
export enum ActionVisibility {
  /** Internal */
  Internal = 'INTERNAL',
  /** Public */
  Public = 'PUBLIC'
}

export type AdaptiveEmbedBlock = StreamFieldInterface & {
  __typename?: 'AdaptiveEmbedBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  embed?: Maybe<EmbedHtmlValue>;
  field: Scalars['String']['output'];
  fullWidth?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type AdditionalLinks = {
  __typename?: 'AdditionalLinks';
  items: Array<Maybe<MenuItem>>;
};


export type AdditionalLinksItemsArgs = {
  withDescendants?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AdminButton = {
  __typename?: 'AdminButton';
  classname: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  target?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type AplansDocument = {
  __typename?: 'AplansDocument';
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime']['output'];
  file: Scalars['String']['output'];
  fileHash: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  tags: Array<TagObjectType>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AplansImage = {
  __typename?: 'AplansImage';
  aspectRatio: Scalars['Float']['output'];
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime']['output'];
  file: Scalars['String']['output'];
  fileHash: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  focalPointHeight?: Maybe<Scalars['Int']['output']>;
  focalPointWidth?: Maybe<Scalars['Int']['output']>;
  focalPointX?: Maybe<Scalars['Int']['output']>;
  focalPointY?: Maybe<Scalars['Int']['output']>;
  height: Scalars['Int']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  isSvg: Scalars['Boolean']['output'];
  rendition?: Maybe<AplansRendition>;
  sizes: Scalars['String']['output'];
  /** @deprecated Use the `url` attribute */
  src: Scalars['String']['output'];
  srcSet?: Maybe<Scalars['String']['output']>;
  tags: Array<TagObjectType>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};


export type AplansImageRenditionArgs = {
  bgcolor?: InputMaybe<Scalars['String']['input']>;
  fill?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  jpegquality?: InputMaybe<Scalars['Int']['input']>;
  max?: InputMaybe<Scalars['String']['input']>;
  min?: InputMaybe<Scalars['String']['input']>;
  preserveSvg?: InputMaybe<Scalars['Boolean']['input']>;
  webpquality?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};


export type AplansImageSrcSetArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  preserveSvg?: InputMaybe<Scalars['Boolean']['input']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AplansRendition = {
  __typename?: 'AplansRendition';
  alt: Scalars['String']['output'];
  backgroundPositionStyle: Scalars['String']['output'];
  file: Scalars['String']['output'];
  filterSpec: Scalars['String']['output'];
  focalPoint?: Maybe<Scalars['String']['output']>;
  focalPointKey: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  image: Image;
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type AttributeCategoryChoice = AttributeInterface & {
  __typename?: 'AttributeCategoryChoice';
  categories: Array<Category>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  keyIdentifier: Scalars['String']['output'];
  type: AttributeType;
};

export type AttributeChoice = AttributeInterface & {
  __typename?: 'AttributeChoice';
  choice?: Maybe<AttributeTypeChoiceOption>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  keyIdentifier: Scalars['String']['output'];
  text?: Maybe<Scalars['String']['output']>;
  type: AttributeType;
};

export type AttributeInterface = {
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  keyIdentifier: Scalars['String']['output'];
  type: AttributeType;
};

export type AttributeNumericValue = AttributeInterface & {
  __typename?: 'AttributeNumericValue';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  keyIdentifier: Scalars['String']['output'];
  type: AttributeType;
  value: Scalars['Float']['output'];
};

export type AttributeRichText = AttributeInterface & {
  __typename?: 'AttributeRichText';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  keyIdentifier: Scalars['String']['output'];
  type: AttributeType;
  value: Scalars['String']['output'];
};

export type AttributeText = AttributeInterface & {
  __typename?: 'AttributeText';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  keyIdentifier: Scalars['String']['output'];
  type: AttributeType;
  value: Scalars['String']['output'];
};

export type AttributeType = {
  __typename?: 'AttributeType';
  /** If the format is "Category", choose which category type the field values can be chosen from */
  attributeCategoryType?: Maybe<CategoryType>;
  choiceOptions: Array<AttributeTypeChoiceOption>;
  format: AttributeTypeFormat;
  /** If the format is "ordered choice", determines whether the first option is displayed with zero bullets instead of one */
  hasZeroOption: Scalars['Boolean']['output'];
  helpText: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** If the format is "ordered choice", determines whether the choice names are displayed */
  showChoiceNames: Scalars['Boolean']['output'];
  unit?: Maybe<Unit>;
};

export type AttributeTypeChoiceOption = {
  __typename?: 'AttributeTypeChoiceOption';
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
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

export type BlockQuoteBlock = StreamFieldInterface & {
  __typename?: 'BlockQuoteBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type BooleanBlock = StreamFieldInterface & {
  __typename?: 'BooleanBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['Boolean']['output'];
};

export type BudgetDimension = {
  __typename?: 'BudgetDimension';
  categories: Array<BudgetDimensionCategory>;
  name: Scalars['String']['output'];
  scopes: Array<DimensionScope>;
  uuid: Scalars['UUID']['output'];
};

export type BudgetDimensionCategory = {
  __typename?: 'BudgetDimensionCategory';
  dimension: BudgetDimension;
  label: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type CardBlock = StreamFieldInterface & {
  __typename?: 'CardBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  content?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  link?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CardListBlock = StreamFieldInterface & {
  __typename?: 'CardListBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  cards?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lead?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CartographyProviderCredentials = {
  __typename?: 'CartographyProviderCredentials';
  account: Scalars['String']['output'];
  /** Currently only MapBox supported. */
  provider: CartographyProviderCredentialsProvider;
  /** Do not set your password or any secret here. These credentials are meant for public use on the public site. */
  publicAccessToken: Scalars['String']['output'];
};

/** An enumeration. */
export enum CartographyProviderCredentialsProvider {
  /** MapBox */
  Mapbox = 'MAPBOX'
}

export type CartographyVisualisationBlock = StreamFieldInterface & {
  __typename?: 'CartographyVisualisationBlock';
  account?: Maybe<CartographyProviderCredentials>;
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  style?: Maybe<Scalars['String']['output']>;
  styleOverrides?: Maybe<Scalars['String']['output']>;
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
  color?: Maybe<Scalars['String']['output']>;
  common?: Maybe<CommonCategory>;
  datasets?: Maybe<Array<Maybe<Dataset>>>;
  externalIdentifier?: Maybe<Scalars['String']['output']>;
  helpText: Scalars['String']['output'];
  iconImage?: Maybe<Image>;
  iconSvgUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  image?: Maybe<Image>;
  indicators: Array<Indicator>;
  /** Kausal Paths node to link this category to */
  kausalPathsNodeUuid: Scalars['String']['output'];
  leadParagraph: Scalars['String']['output'];
  level?: Maybe<CategoryLevel>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  parent?: Maybe<Category>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  type: CategoryType;
  uuid: Scalars['UUID']['output'];
};


/** A category for actions and indicators. */
export type CategoryAttributesArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/**
 * Hierarchy level within a CategoryType.
 *
 * Root level has order=0, first child level order=1 and so on.
 */
export type CategoryLevel = {
  __typename?: 'CategoryLevel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  namePlural?: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  type: CategoryType;
};

export type CategoryListBlock = StreamFieldInterface & {
  __typename?: 'CategoryListBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  category?: Maybe<Category>;
  categoryType?: Maybe<CategoryType>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lead?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  style?: Maybe<Scalars['String']['output']>;
};

export type CategoryPage = PageInterface & {
  __typename?: 'CategoryPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  category?: Maybe<Category>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  layout?: Maybe<CategoryTypePageLevelLayout>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type CategoryPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryPageAsideBlock = CategoryPageAttributeTypeBlock;

export type CategoryPageAttributeTypeBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageAttributeTypeBlock';
  attributeType: AttributeType;
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CategoryPageBodyBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageBodyBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CategoryPageCategoryListBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageCategoryListBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CategoryPageContactFormBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageContactFormBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  description?: Maybe<Scalars['String']['output']>;
  emailRequired?: Maybe<Scalars['Boolean']['output']>;
  emailVisible?: Maybe<Scalars['Boolean']['output']>;
  feedbackRequired?: Maybe<Scalars['Boolean']['output']>;
  feedbackVisible?: Maybe<Scalars['Boolean']['output']>;
  field: Scalars['String']['output'];
  fields?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CategoryPageMainBottomBlock = CategoryPageAttributeTypeBlock | CategoryPageBodyBlock | CategoryPageCategoryListBlock | CategoryPageContactFormBlock | CategoryTypeDatasetsBlock;

export type CategoryPageMainTopBlock = CategoryPageAttributeTypeBlock | CategoryPageProgressBlock;

export type CategoryPageProgressBlock = StreamFieldInterface & {
  __typename?: 'CategoryPageProgressBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CategoryTreeMapBlock = StreamFieldInterface & {
  __typename?: 'CategoryTreeMapBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  categoryType?: Maybe<CategoryType>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lead?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
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
  editableForActions: Scalars['Boolean']['output'];
  editableForIndicators: Scalars['Boolean']['output'];
  helpText: Scalars['String']['output'];
  /** Set if the categories do not have meaningful identifiers */
  hideCategoryIdentifiers: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  leadParagraph?: Maybe<Scalars['String']['output']>;
  levels: Array<CategoryLevel>;
  name: Scalars['String']['output'];
  plan: Plan;
  /** Choose "Multiple" only if more than one category can be selected at a time, otherwise choose "Single" which is the default. */
  selectionType: CategoryTypeSelectWidget;
  shortDescription?: Maybe<Scalars['String']['output']>;
  usableForActions: Scalars['Boolean']['output'];
  usableForIndicators: Scalars['Boolean']['output'];
};


/**
 * Type of the categories.
 *
 * Is used to group categories together. One action plan can have several
 * category types.
 */
export type CategoryTypeCategoriesArgs = {
  onlyRoot?: InputMaybe<Scalars['Boolean']['input']>;
  onlyWithActions?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryTypeDatasetsBlock = StreamFieldInterface & {
  __typename?: 'CategoryTypeDatasetsBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  datasetSchema: DatasetSchema;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CategoryTypeFilterBlock = StreamFieldInterface & {
  __typename?: 'CategoryTypeFilterBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  categoryType?: Maybe<CategoryType>;
  depth?: Maybe<Scalars['Int']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  showAllLabel?: Maybe<Scalars['String']['output']>;
  style?: Maybe<Scalars['String']['output']>;
};

export type CategoryTypeLevelListBlock = StreamFieldInterface & {
  __typename?: 'CategoryTypeLevelListBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  categoryLevel: CategoryLevel;
  categoryType: CategoryType;
  field: Scalars['String']['output'];
  groupByCategoryLevel?: Maybe<CategoryLevel>;
  heading?: Maybe<Scalars['String']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type CategoryTypePage = PageInterface & {
  __typename?: 'CategoryTypePage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  headerImage?: Maybe<Image>;
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  leadParagraph?: Maybe<Scalars['String']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type CategoryTypePageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryTypePageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryTypePageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryTypePageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryTypePagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type CategoryTypePageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryTypePageLevelLayout = {
  __typename?: 'CategoryTypePageLevelLayout';
  iconSize?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  layoutAside?: Maybe<Array<CategoryPageAsideBlock>>;
  layoutMainBottom?: Maybe<Array<CategoryPageMainBottomBlock>>;
  layoutMainTop?: Maybe<Array<CategoryPageMainTopBlock>>;
};

/** An enumeration. */
export enum CategoryTypeSelectWidget {
  /** Multiple */
  Multiple = 'MULTIPLE',
  /** Single */
  Single = 'SINGLE'
}

export type CharBlock = StreamFieldInterface & {
  __typename?: 'CharBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ChoiceBlock = StreamFieldInterface & {
  __typename?: 'ChoiceBlock';
  blockType: Scalars['String']['output'];
  choices: Array<ChoiceOption>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ChoiceOption = {
  __typename?: 'ChoiceOption';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

/** Collection type */
export type CollectionObjectType = {
  __typename?: 'CollectionObjectType';
  ancestors: Array<Maybe<CollectionObjectType>>;
  commonCategoryType?: Maybe<CommonCategoryType>;
  depth: Scalars['Int']['output'];
  descendants: Array<Maybe<CollectionObjectType>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  numchild: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
};

export type CommonCategory = {
  __typename?: 'CommonCategory';
  categoryInstances: Array<Category>;
  /** Set if the category has a theme color */
  color?: Maybe<Scalars['String']['output']>;
  helpText: Scalars['String']['output'];
  iconImage?: Maybe<Image>;
  iconSvgUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  image?: Maybe<Image>;
  /** Kausal Paths node to link this category to */
  kausalPathsNodeUuid: Scalars['String']['output'];
  leadParagraph: Scalars['String']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  shortDescription?: Maybe<Scalars['String']['output']>;
  type: CommonCategoryType;
  uuid: Scalars['UUID']['output'];
};

export type CommonCategoryType = {
  __typename?: 'CommonCategoryType';
  categories: Array<CommonCategory>;
  editableForActions: Scalars['Boolean']['output'];
  editableForIndicators: Scalars['Boolean']['output'];
  helpText: Scalars['String']['output'];
  /** Set if the categories do not have meaningful identifiers */
  hideCategoryIdentifiers: Scalars['Boolean']['output'];
  identifier: Scalars['String']['output'];
  leadParagraph?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  shortDescription?: Maybe<Scalars['String']['output']>;
  usableForActions: Scalars['Boolean']['output'];
  usableForIndicators: Scalars['Boolean']['output'];
};

export type CommonIndicator = {
  __typename?: 'CommonIndicator';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  indicators: Array<Indicator>;
  name: Scalars['String']['output'];
  normalizationIndicators: Array<CommonIndicator>;
  normalizations?: Maybe<Array<Maybe<CommonIndicatorNormalization>>>;
  normalizeByLabel?: Maybe<Scalars['String']['output']>;
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

/** An enumeration. */
export enum Comparison {
  Gt = 'GT',
  Lte = 'LTE'
}

export type ContinuousActionFilterBlock = StreamFieldInterface & {
  __typename?: 'ContinuousActionFilterBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

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

export type CreateOrganizationMutationPayload = {
  __typename?: 'CreateOrganizationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  organization?: Maybe<Organization>;
};

export type DashboardColumnInterface = {
  columnLabel?: Maybe<Scalars['String']['output']>;
};

export type DataPoint = {
  __typename?: 'DataPoint';
  dataset: Dataset;
  /** Date of this data point in context of the dataset's time resolution */
  date: Scalars['Date']['output'];
  dimensionCategories: Array<BudgetDimensionCategory>;
  uuid: Scalars['UUID']['output'];
  value?: Maybe<Scalars['Float']['output']>;
};

export type Dataset = {
  __typename?: 'Dataset';
  dataPoints: Array<DataPoint>;
  schema?: Maybe<DatasetSchema>;
  scope?: Maybe<DatasetScopeTypeNode>;
  uuid: Scalars['UUID']['output'];
};

export type DatasetSchema = {
  __typename?: 'DatasetSchema';
  dimensionCategories: Array<DatasetSchemaDimensionCategory>;
  name: Scalars['String']['output'];
  scopes: Array<DatasetSchemaScope>;
  /** Time resolution of the time stamps of data points in this dataset */
  timeResolution: DatasetSchemaTimeResolution;
  unit: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type DatasetSchemaDimensionCategory = {
  __typename?: 'DatasetSchemaDimensionCategory';
  category: BudgetDimensionCategory;
  order: Scalars['Int']['output'];
  schema: DatasetSchema;
};

/** Link a dataset schema to a context in which it can be used, such as a plan. */
export type DatasetSchemaScope = {
  __typename?: 'DatasetSchemaScope';
  id: Scalars['ID']['output'];
  schema: DatasetSchema;
  scope?: Maybe<DatasetSchemaScopeTypeNode>;
  scopeId: Scalars['Int']['output'];
};

export type DatasetSchemaScopeTypeNode = CategoryType | Plan;

/** An enumeration. */
export enum DatasetSchemaTimeResolution {
  /** Yearly */
  Yearly = 'YEARLY'
}

export type DatasetScopeTypeNode = Action | Category;

export type DateBlock = StreamFieldInterface & {
  __typename?: 'DateBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};


export type DateBlockValueArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeBlock = StreamFieldInterface & {
  __typename?: 'DateTimeBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};


export type DateTimeBlockValueArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};

export type DecimalBlock = StreamFieldInterface & {
  __typename?: 'DecimalBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type DeleteOrganizationMutation = {
  __typename?: 'DeleteOrganizationMutation';
  ok?: Maybe<Scalars['Boolean']['output']>;
};

/**
 * A dimension for indicators.
 *
 * Dimensions will have several dimension categories.
 */
export type Dimension = {
  __typename?: 'Dimension';
  categories: Array<DimensionCategory>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/**
 * A category in a dimension.
 *
 * Indicator values are grouped with this.
 */
export type DimensionCategory = {
  __typename?: 'DimensionCategory';
  dimension: Dimension;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

/** Link a dimension to a context in which it can be used, such as a plan or a category type. */
export type DimensionScope = {
  __typename?: 'DimensionScope';
  dimension: BudgetDimension;
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  scope?: Maybe<DimensionScopeTypeNode>;
  scopeId: Scalars['Int']['output'];
};

export type DimensionScopeTypeNode = CategoryType | Plan;

export type DocumentChooserBlock = StreamFieldInterface & {
  __typename?: 'DocumentChooserBlock';
  blockType: Scalars['String']['output'];
  document: AplansDocument;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type EmailBlock = StreamFieldInterface & {
  __typename?: 'EmailBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EmbedBlock = StreamFieldInterface & {
  __typename?: 'EmbedBlock';
  blockType: Scalars['String']['output'];
  embed?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawEmbed?: Maybe<Scalars['JSONString']['output']>;
  rawValue: Scalars['String']['output'];
  url: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EmbedHtmlValue = {
  __typename?: 'EmbedHTMLValue';
  html?: Maybe<Scalars['String']['output']>;
};

export type EmptyPage = PageInterface & {
  __typename?: 'EmptyPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type EmptyPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type EmptyPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type EmptyPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type EmptyPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type EmptyPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type EmptyPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type EndDateColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'EndDateColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String']['output'];
  messages: Array<Scalars['String']['output']>;
};

export type ExternalLinkMenuItem = {
  __typename?: 'ExternalLinkMenuItem';
  linkText: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type FieldBlockMetaData = {
  __typename?: 'FieldBlockMetaData';
  hidden?: Maybe<Scalars['Boolean']['output']>;
  restricted?: Maybe<Scalars['Boolean']['output']>;
};

export type FieldBlockMetaInterface = {
  meta?: Maybe<FieldBlockMetaData>;
};

export type FieldColumnBlock = DashboardColumnInterface & StreamFieldInterface & {
  __typename?: 'FieldColumnBlock';
  attributeType?: Maybe<AttributeType>;
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type FloatBlock = StreamFieldInterface & {
  __typename?: 'FloatBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Footer = {
  __typename?: 'Footer';
  items: Array<Maybe<MenuItem>>;
};


export type FooterItemsArgs = {
  withDescendants?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FormChoiceBlock = StreamFieldInterface & {
  __typename?: 'FormChoiceBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  choiceLabel?: Maybe<Scalars['String']['output']>;
  choiceValue?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type FormFieldBlock = StreamFieldInterface & {
  __typename?: 'FormFieldBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  choices?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  field: Scalars['String']['output'];
  fieldLabel?: Maybe<Scalars['String']['output']>;
  fieldRequired?: Maybe<Scalars['Boolean']['output']>;
  fieldType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type FrontPageHeroBlock = StreamFieldInterface & {
  __typename?: 'FrontPageHeroBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  layout?: Maybe<Scalars['String']['output']>;
  lead?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type IdentifierColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'IdentifierColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  altText: Scalars['String']['output'];
  focalPointHeight?: Maybe<Scalars['Int']['output']>;
  focalPointWidth?: Maybe<Scalars['Int']['output']>;
  focalPointX?: Maybe<Scalars['Int']['output']>;
  focalPointY?: Maybe<Scalars['Int']['output']>;
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  imageCredit: Scalars['String']['output'];
  rendition?: Maybe<ImageRendition>;
  title: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};


export type ImageRenditionArgs = {
  crop?: InputMaybe<Scalars['Boolean']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type ImageChooserBlock = StreamFieldInterface & {
  __typename?: 'ImageChooserBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  image: AplansImage;
  rawValue: Scalars['String']['output'];
};

export type ImageRendition = {
  __typename?: 'ImageRendition';
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  src: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ImpactGroup = {
  __typename?: 'ImpactGroup';
  actions: Array<ImpactGroupAction>;
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<ImpactGroup>;
  plan: Plan;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ImpactGroupAction = {
  __typename?: 'ImpactGroupAction';
  action: Action;
  group: ImpactGroup;
  id: Scalars['ID']['output'];
  impact: ActionImpact;
};

export type ImpactGroupPage = PageInterface & {
  __typename?: 'ImpactGroupPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  leadContent?: Maybe<Scalars['String']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type ImpactGroupPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ImpactGroupPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ImpactGroupPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ImpactGroupPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ImpactGroupPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type ImpactGroupPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type ImplementationPhaseColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ImplementationPhaseColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

/** An indicator with which to measure actions and progress towards strategic goals. */
export type Indicator = {
  __typename?: 'Indicator';
  actions?: Maybe<Array<Maybe<Action>>>;
  categories: Array<Category>;
  common?: Maybe<CommonIndicator>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Which trend in the numerical values of this indicator's goals indicates improvement: when the values are increasing or decreasing? */
  desiredTrend?: Maybe<IndicatorDesiredTrend>;
  dimensions: Array<IndicatorDimension>;
  goals?: Maybe<Array<Maybe<IndicatorGoal>>>;
  id: Scalars['ID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  latestGraph?: Maybe<IndicatorGraph>;
  latestValue?: Maybe<IndicatorValue>;
  level?: Maybe<Scalars['String']['output']>;
  /** What is the maximum value this indicator can reach? It is used in visualizations as the Y axis maximum. */
  maxValue?: Maybe<Scalars['Float']['output']>;
  /** What is the minimum value this indicator can reach? It is used in visualizations as the Y axis minimum. */
  minValue?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  organization: Organization;
  plans: Array<Plan>;
  quantity?: Maybe<Quantity>;
  /** What is the reference or source for this indicator? */
  reference?: Maybe<Scalars['String']['output']>;
  relatedActions: Array<ActionIndicator>;
  relatedCauses: Array<RelatedIndicator>;
  relatedEffects: Array<RelatedIndicator>;
  showTotalLine: Scalars['Boolean']['output'];
  showTrendline: Scalars['Boolean']['output'];
  timeResolution: IndicatorTimeResolution;
  unit: Unit;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['UUID']['output'];
  values?: Maybe<Array<Maybe<IndicatorValue>>>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorActionsArgs = {
  plan?: InputMaybe<Scalars['ID']['input']>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorGoalsArgs = {
  plan?: InputMaybe<Scalars['ID']['input']>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorLevelArgs = {
  plan?: InputMaybe<Scalars['ID']['input']>;
};


/** An indicator with which to measure actions and progress towards strategic goals. */
export type IndicatorValuesArgs = {
  includeDimensions?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IndicatorBlock = StreamFieldInterface & {
  __typename?: 'IndicatorBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  indicator?: Maybe<Indicator>;
  rawValue: Scalars['String']['output'];
  style?: Maybe<Scalars['String']['output']>;
};

export type IndicatorCausalChainBlock = FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'IndicatorCausalChainBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

/** An enumeration. */
export enum IndicatorDesiredTrend {
  /** attempt to detect automatically */
  A = 'A_',
  /** decreasing */
  Decreasing = 'DECREASING',
  /** increasing */
  Increasing = 'INCREASING'
}

/** Mapping of which dimensions an indicator has. */
export type IndicatorDimension = {
  __typename?: 'IndicatorDimension';
  dimension: Dimension;
  id: Scalars['ID']['output'];
  indicator: Indicator;
  order: Scalars['Int']['output'];
};

/** The numeric goal which the organization has set for an indicator. */
export type IndicatorGoal = {
  __typename?: 'IndicatorGoal';
  date?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  indicator: Indicator;
  normalizedValues?: Maybe<Array<Maybe<NormalizedValue>>>;
  scenario?: Maybe<Scenario>;
  value: Scalars['Float']['output'];
};

export type IndicatorGraph = {
  __typename?: 'IndicatorGraph';
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['JSONString']['output'];
  id: Scalars['ID']['output'];
  indicator: Indicator;
};

export type IndicatorGroupBlock = StreamFieldInterface & {
  __typename?: 'IndicatorGroupBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  indicators?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  /** @deprecated Use 'indicators' instead */
  items?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  rawValue: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type IndicatorHighlightsBlock = StreamFieldInterface & {
  __typename?: 'IndicatorHighlightsBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

/**
 * The level for an indicator in an action plan.
 *
 * Indicator levels include: operational, tactical and strategic.
 */
export type IndicatorLevel = {
  __typename?: 'IndicatorLevel';
  id: Scalars['ID']['output'];
  indicator: Indicator;
  level: IndicatorLevelLevel;
  plan: Plan;
};

/** An enumeration. */
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
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  displayInsights?: Maybe<Scalars['Boolean']['output']>;
  displayLevel?: Maybe<Scalars['Boolean']['output']>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  includeRelatedPlans?: Maybe<Scalars['Boolean']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  leadContent?: Maybe<Scalars['String']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type IndicatorListPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type IndicatorListPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type IndicatorListPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type IndicatorListPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type IndicatorListPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type IndicatorListPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type IndicatorShowcaseBlock = StreamFieldInterface & {
  __typename?: 'IndicatorShowcaseBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  body?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  indicator?: Maybe<Indicator>;
  indicatorIsNormalized?: Maybe<Scalars['Boolean']['output']>;
  linkButton?: Maybe<StreamFieldInterface>;
  rawValue: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
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
  date?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  indicator: Indicator;
  normalizedValues?: Maybe<Array<Maybe<NormalizedValue>>>;
  value: Scalars['Float']['output'];
};

export type IndicatorsColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'IndicatorsColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type IntegerBlock = StreamFieldInterface & {
  __typename?: 'IntegerBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type LargeImageBlock = StreamFieldInterface & {
  __typename?: 'LargeImageBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  rawValue: Scalars['String']['output'];
  width?: Maybe<Scalars['String']['output']>;
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
  withDescendants?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MenuItem = ExternalLinkMenuItem | PageMenuItem;

export type MonitoringQualityPoint = {
  __typename?: 'MonitoringQualityPoint';
  descriptionNo?: Maybe<Scalars['String']['output']>;
  descriptionYes?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
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
  id?: InputMaybe<Scalars['ID']['input']>;
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

export type NameColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'NameColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type NormalizedValue = {
  __typename?: 'NormalizedValue';
  normalizerId?: Maybe<Scalars['ID']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type Organization = {
  __typename?: 'Organization';
  /** A simplified short version of name for the general public */
  abbreviation: Scalars['String']['output'];
  /** Number of actions this organization is responsible for */
  actionCount: Scalars['Int']['output'];
  adminButtons: Array<AdminButton>;
  ancestors?: Maybe<Array<Maybe<Organization>>>;
  /** An organization category, e.g. committee */
  classification?: Maybe<OrganizationClass>;
  /** Number of contact persons that are associated with this organization */
  contactPersonCount: Scalars['Int']['output'];
  descendants?: Maybe<Array<Maybe<Organization>>>;
  description: Scalars['String']['output'];
  /** A distinct name for this organization (generated automatically) */
  distinctName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['PointScalar']['output']>;
  logo?: Maybe<Image>;
  /** A primary name, e.g. a legally recognized name */
  name: Scalars['String']['output'];
  parent?: Maybe<Organization>;
  plansWithActionResponsibilities: Array<Plan>;
  url: Scalars['String']['output'];
};


export type OrganizationLogoArgs = {
  parentFallback?: InputMaybe<Scalars['Boolean']['input']>;
};


export type OrganizationPlansWithActionResponsibilitiesArgs = {
  exceptPlan?: InputMaybe<Scalars['ID']['input']>;
};

export type OrganizationClass = {
  __typename?: 'OrganizationClass';
  /** The time at which the resource was created */
  createdTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  /** The time at which the resource was updated */
  lastModifiedTime: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
};

export type OrganizationColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'OrganizationColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
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
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  emptypage?: Maybe<EmptyPage>;
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  impactgrouppage?: Maybe<ImpactGroupPage>;
  indicatorlistpage?: Maybe<IndicatorListPage>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  planrootpage?: Maybe<PlanRootPage>;
  previousSiblings: Array<PageInterface>;
  privacypolicypage?: Maybe<PrivacyPolicyPage>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  sitesRootedHere: Array<SiteObjectType>;
  slug: Scalars['String']['output'];
  staticpage?: Maybe<StaticPage>;
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type PageChooserBlock = StreamFieldInterface & {
  __typename?: 'PageChooserBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  page: PageInterface;
  rawValue: Scalars['String']['output'];
};

export type PageInterface = {
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  live: Scalars['Boolean']['output'];
  locked?: Maybe<Scalars['Boolean']['output']>;
  nextSiblings: Array<PageInterface>;
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type PageInterfaceAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PageInterfaceChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PageInterfaceDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PageInterfaceNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PageInterfacePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PageInterfaceSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type PageLinkBlock = StreamFieldInterface & {
  __typename?: 'PageLinkBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  page?: Maybe<PageInterface>;
  rawValue: Scalars['String']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

export type PageMenuItem = {
  __typename?: 'PageMenuItem';
  children?: Maybe<Array<Maybe<PageMenuItem>>>;
  crossPlanLink?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  page: PageInterface;
  parent?: Maybe<PageMenuItem>;
  viewUrl?: Maybe<Scalars['String']['output']>;
};


export type PageMenuItemViewUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']['input']>;
};

export type PathsOutcomeBlock = StreamFieldInterface & {
  __typename?: 'PathsOutcomeBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  outcomeNodeId?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type Person = {
  __typename?: 'Person';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  /** What is this person's organization */
  organization: Organization;
  title?: Maybe<Scalars['String']['output']>;
};


export type PersonAvatarUrlArgs = {
  size?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type Plan = PlanInterface & {
  __typename?: 'Plan';
  accessibilityStatementUrl?: Maybe<Scalars['String']['output']>;
  actionAttributeTypes: Array<AttributeType>;
  actionDependencyRoles: Array<ActionDependencyRole>;
  actionImpacts: Array<ActionImpact>;
  actionImplementationPhases: Array<ActionImplementationPhase>;
  actionListPage?: Maybe<ActionListPage>;
  actionReportExportViewUrl?: Maybe<Scalars['String']['output']>;
  actionSchedules: Array<ActionSchedule>;
  actionStatusSummaries: Array<ActionStatusSummary>;
  actionStatuses: Array<ActionStatus>;
  actionTimelinessClasses: Array<ActionTimeliness>;
  actionUpdateAcceptableInterval?: Maybe<Scalars['Int']['output']>;
  actionUpdateTargetInterval?: Maybe<Scalars['Int']['output']>;
  actions: Array<Action>;
  /** Can actions be added and the official metadata edited? */
  actionsLocked: Scalars['Boolean']['output'];
  additionalLinks?: Maybe<AdditionalLinks>;
  adminUrl?: Maybe<Scalars['String']['output']>;
  allRelatedPlans: Array<Maybe<Plan>>;
  categoryType?: Maybe<CategoryType>;
  categoryTypes: Array<CategoryType>;
  children: Array<Plan>;
  /** Set if this plan has been created by copying another plan */
  copies: Array<Plan>;
  /** Set if this plan has been created by copying another plan */
  copyOf?: Maybe<Plan>;
  domain?: Maybe<PlanDomain>;
  domains?: Maybe<Array<Maybe<PlanDomain>>>;
  /** If not empty, the system's built-in user feedback feature will be replaced by a link to an external feedback form available at this web address. */
  externalFeedbackUrl?: Maybe<Scalars['String']['output']>;
  features: PlanFeatures;
  footer?: Maybe<Footer>;
  generalContent: SiteGeneralContent;
  hasIndicatorRelationships?: Maybe<Scalars['Boolean']['output']>;
  hideActionIdentifiers?: Maybe<Scalars['Boolean']['output']>;
  hideActionLeadParagraph?: Maybe<Scalars['Boolean']['output']>;
  hideActionOfficialName?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** A unique identifier for the plan used internally to distinguish between plans. This becomes part of the test site URL: https://[identifier].watch-test.kausal.tech. Use lowercase letters and dashes. */
  identifier: Scalars['String']['output'];
  image?: Maybe<Image>;
  impactGroups: Array<Maybe<ImpactGroup>>;
  indicatorLevels: Array<IndicatorLevel>;
  /** UUID of the corresponding Kausal Paths instance for Kausal Paths integration */
  kausalPathsInstanceUuid: Scalars['String']['output'];
  lastActionIdentifier?: Maybe<Scalars['ID']['output']>;
  mainMenu?: Maybe<MainMenu>;
  monitoringQualityPoints: Array<MonitoringQualityPoint>;
  /** The official plan name in full form */
  name: Scalars['String']['output'];
  /** The main organization for the plan */
  organization: Organization;
  otherLanguages: Array<Scalars['String']['output']>;
  pages?: Maybe<Array<Maybe<PageInterface>>>;
  parent?: Maybe<Plan>;
  /** Used for primary navigation and grouping of actions */
  primaryActionClassification?: Maybe<CategoryType>;
  primaryLanguage: Scalars['String']['output'];
  primaryOrgs: Array<Maybe<Organization>>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  relatedPlans: Array<Plan>;
  reportTypes: Array<ReportType>;
  scenarios: Array<Scenario>;
  /** Leave empty unless specifically required. Action filters based on this category are displayed more prominently than filters of other categories. */
  secondaryActionClassification?: Maybe<CategoryType>;
  serveFileBaseUrl: Scalars['String']['output'];
  /** A unique short identifier for the plan to be shown in the UI. Could be, e.g., a number or an abbreviation. */
  shortIdentifier?: Maybe<Scalars['String']['output']>;
  /** A shorter version of the plan name */
  shortName?: Maybe<Scalars['String']['output']>;
  /** Set if this plan is superseded by another plan */
  supersededBy?: Maybe<Plan>;
  supersededPlans: Array<Plan>;
  supersedingPlans: Array<Plan>;
  themeIdentifier?: Maybe<Scalars['String']['output']>;
  /** If this plan has multiple versions, name of this version */
  versionName: Scalars['String']['output'];
  viewUrl?: Maybe<Scalars['String']['output']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanActionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  identifier?: InputMaybe<Scalars['ID']['input']>;
  onlyMine?: InputMaybe<Scalars['Boolean']['input']>;
  responsibleOrganization?: InputMaybe<Scalars['ID']['input']>;
  restrictToPubliclyVisible?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanCategoryTypeArgs = {
  id: Scalars['ID']['input'];
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanCategoryTypesArgs = {
  usableForActions?: InputMaybe<Scalars['Boolean']['input']>;
  usableForIndicators?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanDomainArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanDomainsArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanImpactGroupsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanSupersededPlansArgs = {
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanSupersedingPlansArgs = {
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanViewUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']['input']>;
};

export type PlanDatasetsBlock = StreamFieldInterface & {
  __typename?: 'PlanDatasetsBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  datasetSchema: DatasetSchema;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

/** A domain (hostname) where an UI for a Plan might live. */
export type PlanDomain = {
  __typename?: 'PlanDomain';
  /** Fill this for a multi-plan site when the plan does not live in the root of the domain. */
  basePath?: Maybe<Scalars['String']['output']>;
  googleSiteVerificationTag?: Maybe<Scalars['String']['output']>;
  /** The fully qualified domain name, eg. climate.cityname.gov. Leave blank if not yet known. */
  hostname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  matomoAnalyticsUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PublicationStatus>;
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type PlanFeatures = {
  __typename?: 'PlanFeatures';
  /** Should custom images for individual actions be allowed */
  allowImagesForActions: Scalars['Boolean']['output'];
  /** Should users be able to have authenticated sessions in the public UI? */
  allowPublicSiteLogin: Scalars['Boolean']['output'];
  /** Should moderators be hidden from the visible contact persons in the public UI? */
  contactPersonsHideModerators: Scalars['Boolean']['output'];
  /** Choose which information about contact persons is visible in the public UI */
  contactPersonsPublicData: PlanFeaturesContactPersonsPublicData;
  /** When displaying a contact person's contact details, should the contact person's organization be displayed along with all its ancestors? */
  contactPersonsShowOrganizationAncestors: Scalars['Boolean']['output'];
  /** Should profile pictures be shown for contact persons in the public UI? */
  contactPersonsShowPicture: Scalars['Boolean']['output'];
  /** Set to enable comparing indicators between organizations */
  enableIndicatorComparison: Scalars['Boolean']['output'];
  enableModerationWorkflow?: Maybe<Scalars['Boolean']['output']>;
  /** Enable site-wide search functionality */
  enableSearch: Scalars['Boolean']['output'];
  /** Set if there are separate contact persons with publishing rights and others who can only suggest changes */
  hasActionContactPersonRoles: Scalars['Boolean']['output'];
  /** Set if the plan uses meaningful action identifiers */
  hasActionIdentifiers: Scalars['Boolean']['output'];
  /** Set if the plan uses the lead paragraph field */
  hasActionLeadParagraph: Scalars['Boolean']['output'];
  /** Set if the plan uses the official name field */
  hasActionOfficialName: Scalars['Boolean']['output'];
  /** Set if actions have a clear primary organization (such as multi-city plans) */
  hasActionPrimaryOrgs: Scalars['Boolean']['output'];
  /** Set to prevent showing status-specific graphs and other elements if statuses aren't systematically used in this action plan */
  minimalStatuses: Scalars['Boolean']['output'];
  publicContactPersons: Scalars['Boolean']['output'];
  /** Should the public website contain a link to the admin login? */
  showAdminLink: Scalars['Boolean']['output'];
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

export type PlanFilterBlock = StreamFieldInterface & {
  __typename?: 'PlanFilterBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type PlanInterface = {
  domain?: Maybe<PlanDomain>;
  domains?: Maybe<Array<Maybe<PlanDomain>>>;
  primaryLanguage: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PlanInterfaceDomainArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
};


export type PlanInterfaceDomainsArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
};

export type PlanLink = {
  __typename?: 'PlanLink';
  id?: Maybe<Scalars['ID']['output']>;
};

export type PlanRootPage = PageInterface & {
  __typename?: 'PlanRootPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type PlanRootPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PlanRootPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PlanRootPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PlanRootPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PlanRootPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PlanRootPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type PrimaryOrganizationFilterBlock = StreamFieldInterface & {
  __typename?: 'PrimaryOrganizationFilterBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type PrivacyPolicyPage = PageInterface & {
  __typename?: 'PrivacyPolicyPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  leadContent?: Maybe<Scalars['String']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type PrivacyPolicyPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PrivacyPolicyPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PrivacyPolicyPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PrivacyPolicyPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PrivacyPolicyPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type PrivacyPolicyPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum PublicationStatus {
  Published = 'PUBLISHED',
  Scheduled = 'SCHEDULED',
  Unpublished = 'UNPUBLISHED'
}

/** The quantity that an indicator measures. */
export type Quantity = {
  __typename?: 'Quantity';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
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
  relatedPlanIndicators?: Maybe<Array<Indicator>>;
  search?: Maybe<SearchResults>;
  workflowStates?: Maybe<Array<Maybe<WorkflowStateDescription>>>;
};


export type QueryActionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  identifier?: InputMaybe<Scalars['ID']['input']>;
  plan?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCategoryArgs = {
  categoryType: Scalars['ID']['input'];
  externalIdentifier: Scalars['ID']['input'];
  plan: Scalars['ID']['input'];
};


export type QueryIndicatorArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  identifier?: InputMaybe<Scalars['ID']['input']>;
  plan?: InputMaybe<Scalars['ID']['input']>;
  restrictToPubliclyVisible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlanArgs = {
  domain?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPlanActionsArgs = {
  category?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
  restrictToPubliclyVisible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPlanCategoriesArgs = {
  categoryType?: InputMaybe<Scalars['ID']['input']>;
  plan: Scalars['ID']['input'];
};


export type QueryPlanIndicatorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  hasData?: InputMaybe<Scalars['Boolean']['input']>;
  hasGoals?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
};


export type QueryPlanOrganizationsArgs = {
  forContactPersons?: InputMaybe<Scalars['Boolean']['input']>;
  forResponsibleParties?: InputMaybe<Scalars['Boolean']['input']>;
  includeRelatedPlans?: InputMaybe<Scalars['Boolean']['input']>;
  plan?: InputMaybe<Scalars['ID']['input']>;
  withAncestors?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPlanPageArgs = {
  path: Scalars['String']['input'];
  plan: Scalars['ID']['input'];
};


export type QueryPlansForHostnameArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRelatedPlanActionsArgs = {
  category?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
};


export type QueryRelatedPlanIndicatorsArgs = {
  category?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
};


export type QuerySearchArgs = {
  autocomplete?: InputMaybe<Scalars['String']['input']>;
  includeRelatedPlans?: InputMaybe<Scalars['Boolean']['input']>;
  maxResults?: InputMaybe<Scalars['Int']['input']>;
  onlyOtherPlans?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  plan: Scalars['ID']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWorkflowStatesArgs = {
  plan?: InputMaybe<Scalars['ID']['input']>;
};

export type QuestionAnswerBlock = StreamFieldInterface & {
  __typename?: 'QuestionAnswerBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  questions?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  rawValue: Scalars['String']['output'];
};

export type QuestionBlock = StreamFieldInterface & {
  __typename?: 'QuestionBlock';
  answer?: Maybe<Scalars['String']['output']>;
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type RawHtmlBlock = StreamFieldInterface & {
  __typename?: 'RawHTMLBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type RegexBlock = StreamFieldInterface & {
  __typename?: 'RegexBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type RelatedCommonIndicator = {
  __typename?: 'RelatedCommonIndicator';
  causalIndicator: CommonIndicator;
  effectIndicator: CommonIndicator;
  /** What type of causal effect is there between the indicators */
  effectType: RelatedCommonIndicatorEffectType;
  id: Scalars['ID']['output'];
};

/** An enumeration. */
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
  id: Scalars['ID']['output'];
};

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

export type RelatedIndicatorsBlock = StreamFieldInterface & {
  __typename?: 'RelatedIndicatorsBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type RelatedPlanListBlock = StreamFieldInterface & {
  __typename?: 'RelatedPlanListBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Report = {
  __typename?: 'Report';
  endDate: Scalars['Date']['output'];
  fields?: Maybe<Array<ReportFieldBlock>>;
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  type: ReportType;
  valuesForAction?: Maybe<Array<ReportValueInterface>>;
};


export type ReportValuesForActionArgs = {
  actionId?: InputMaybe<Scalars['ID']['input']>;
  actionIdentifier?: InputMaybe<Scalars['ID']['input']>;
};

export type ReportComparisonBlock = StreamFieldInterface & {
  __typename?: 'ReportComparisonBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  reportField?: Maybe<Scalars['String']['output']>;
  reportType?: Maybe<ReportType>;
  reportsToCompare?: Maybe<Array<Maybe<Report>>>;
};

export type ReportFieldBlock = ActionAttributeTypeReportFieldBlock | ActionCategoryReportFieldBlock | ActionDescriptionBlock | ActionEndDateBlock | ActionImplementationPhaseReportFieldBlock | ActionManualStatusReasonBlock | ActionPrimaryOrgBlock | ActionRelatedIndicatorsBlock | ActionResponsiblePartyReportFieldBlock | ActionStartDateBlock | ActionStatusReportFieldBlock | ActionTasksBlock | ActionUpdatedAtBlock;

export type ReportType = {
  __typename?: 'ReportType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plan: Plan;
  reports: Array<Report>;
};

export type ReportTypeFieldChooserBlock = StreamFieldInterface & {
  __typename?: 'ReportTypeFieldChooserBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ReportValueInterface = {
  field: ReportFieldBlock;
};

export type ResponsiblePartiesColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'ResponsiblePartiesColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type ResponsiblePartyFilterBlock = StreamFieldInterface & {
  __typename?: 'ResponsiblePartyFilterBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type RestrictedPlanNode = PlanInterface & {
  __typename?: 'RestrictedPlanNode';
  domain?: Maybe<PlanDomain>;
  domains?: Maybe<Array<Maybe<PlanDomain>>>;
  primaryLanguage: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type RestrictedPlanNodeDomainArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
};


export type RestrictedPlanNodeDomainsArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
};

export type Revision = {
  __typename?: 'Revision';
  createdAt: Scalars['DateTime']['output'];
};

export type RichTextBlock = StreamFieldInterface & {
  __typename?: 'RichTextBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Scenario = {
  __typename?: 'Scenario';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  plan: Plan;
};

export type SearchHit = {
  __typename?: 'SearchHit';
  highlight?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  object?: Maybe<SearchHitObject>;
  page?: Maybe<PageInterface>;
  plan?: Maybe<Plan>;
  relevance?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


export type SearchHitUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']['input']>;
};

export type SearchHitObject = Action | Indicator;

export type SearchResults = {
  __typename?: 'SearchResults';
  hits?: Maybe<Array<Maybe<SearchHit>>>;
};

/** An enumeration. */
export enum Sentiment {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE'
}

export type SiteGeneralContent = {
  __typename?: 'SiteGeneralContent';
  actionTaskTerm: SiteGeneralContentActionTaskTerm;
  actionTerm: SiteGeneralContentActionTerm;
  copyrightText: Scalars['String']['output'];
  /** If the site is under a Creative Commons license, which CC license it is */
  creativeCommonsLicense: Scalars['String']['output'];
  githubApiRepository: Scalars['String']['output'];
  githubUiRepository: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The text to show when displaying official content */
  officialNameDescription: Scalars['String']['output'];
  organizationTerm: SiteGeneralContentOrganizationTerm;
  ownerName: Scalars['String']['output'];
  ownerUrl: Scalars['String']['output'];
  siteDescription: Scalars['String']['output'];
  siteTitle: Scalars['String']['output'];
  /** A message prominently displayed in a banner at the top of every page on the public website */
  sitewideAnnouncement?: Maybe<Scalars['String']['output']>;
};

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

export type SiteObjectType = {
  __typename?: 'SiteObjectType';
  hostname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** If true, this site will handle requests for all other hostnames that do not have a site entry of their own */
  isDefaultSite: Scalars['Boolean']['output'];
  page?: Maybe<PageInterface>;
  pages: Array<PageInterface>;
  plan?: Maybe<Plan>;
  /** Set this to something other than 80 if you need a specific port number to appear in URLs (e.g. development on port 8000). Does not affect request handling (so port forwarding still works). */
  port: Scalars['Int']['output'];
  rootPage: Page;
  /** Human-readable name for the site. */
  siteName: Scalars['String']['output'];
};


export type SiteObjectTypePageArgs = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  urlPath?: InputMaybe<Scalars['String']['input']>;
};


export type SiteObjectTypePagesArgs = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type StartDateColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'StartDateColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type StaticBlock = StreamFieldInterface & {
  __typename?: 'StaticBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type StaticPage = PageInterface & {
  __typename?: 'StaticPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  childrenUseSecondaryNavigation?: Maybe<Scalars['Boolean']['output']>;
  contentType: Scalars['String']['output'];
  depth?: Maybe<Scalars['Int']['output']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  expired: Scalars['Boolean']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  goLiveAt?: Maybe<Scalars['DateTime']['output']>;
  hasUnpublishedChanges: Scalars['Boolean']['output'];
  headerImage?: Maybe<Image>;
  id?: Maybe<Scalars['ID']['output']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  latestRevision?: Maybe<Revision>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  leadParagraph?: Maybe<Scalars['String']['output']>;
  linkInAllChildPlans?: Maybe<Scalars['Boolean']['output']>;
  live: Scalars['Boolean']['output'];
  liveRevision?: Maybe<Revision>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  searchScore?: Maybe<Scalars['Float']['output']>;
  seoTitle: Scalars['String']['output'];
  showInAdditionalLinks?: Maybe<Scalars['Boolean']['output']>;
  showInFooter?: Maybe<Scalars['Boolean']['output']>;
  showInMenus: Scalars['Boolean']['output'];
  siblings: Array<PageInterface>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translationKey: Scalars['UUID']['output'];
  url?: Maybe<Scalars['String']['output']>;
  urlPath: Scalars['String']['output'];
};


export type StaticPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type StaticPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type StaticPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type StaticPageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type StaticPagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type StaticPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  offset?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

export type StatusColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'StatusColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type StreamBlock = StreamFieldInterface & {
  __typename?: 'StreamBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type StreamFieldBlock = StreamFieldInterface & {
  __typename?: 'StreamFieldBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type StreamFieldInterface = {
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type StructBlock = StreamFieldInterface & {
  __typename?: 'StructBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
};

export type TagObjectType = {
  __typename?: 'TagObjectType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type TasksColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'TasksColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type TextBlock = StreamFieldInterface & {
  __typename?: 'TextBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TimeBlock = StreamFieldInterface & {
  __typename?: 'TimeBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};


export type TimeBlockValueArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};

export type UrlBlock = StreamFieldInterface & {
  __typename?: 'URLBlock';
  blockType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  rawValue: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Unit = {
  __typename?: 'Unit';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName?: Maybe<Scalars['String']['output']>;
  verboseName?: Maybe<Scalars['String']['output']>;
  verboseNamePlural?: Maybe<Scalars['String']['output']>;
};

export type UpdateActionResponsiblePartyMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdateActionResponsiblePartyMutationPayload = {
  __typename?: 'UpdateActionResponsiblePartyMutationPayload';
  actionResponsibleParty?: Maybe<ActionResponsibleParty>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
};

export type UpdateIndicatorMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdateIndicatorMutationPayload = {
  __typename?: 'UpdateIndicatorMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  indicator?: Maybe<Indicator>;
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

export type UpdateOrganizationMutationPayload = {
  __typename?: 'UpdateOrganizationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  organization?: Maybe<Organization>;
};

export type UpdatePersonMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdatePersonMutationPayload = {
  __typename?: 'UpdatePersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  person?: Maybe<Person>;
};

export type UpdatePlanMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization: Scalars['ID']['input'];
};

export type UpdatePlanMutationPayload = {
  __typename?: 'UpdatePlanMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  plan?: Maybe<Plan>;
};

export type UpdatedAtColumnBlock = DashboardColumnInterface & FieldBlockMetaInterface & StreamFieldInterface & {
  __typename?: 'UpdatedAtColumnBlock';
  blockType: Scalars['String']['output'];
  blocks: Array<StreamFieldInterface>;
  columnLabel?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<FieldBlockMetaData>;
  rawValue: Scalars['String']['output'];
};

export type UserFeedbackMutationInput = {
  action?: InputMaybe<Scalars['ID']['input']>;
  additionalFields?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pageId?: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type UserFeedbackMutationPayload = {
  __typename?: 'UserFeedbackMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  feedback?: Maybe<UserFeedbackNode>;
};

export type UserFeedbackNode = {
  __typename?: 'UserFeedbackNode';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
};

export type WorkflowInfoNode = {
  __typename?: 'WorkflowInfoNode';
  /** The internal Wagtail workflow state of the action. The current action data returned does not necessarily match this workflowstate. */
  currentWorkflowState?: Maybe<WorkflowStateInfo>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']['output']>;
  latestRevision?: Maybe<Revision>;
  /** The actual version of the action returned when fulfilling this query, based on both the requested workflow directive value used when querying an action, and the available versions of the action itself. */
  matchingVersion?: Maybe<WorkflowStateDescription>;
};

/** An enumeration. */
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
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** Tracks the status of a started Workflow on an object. */
export type WorkflowStateInfo = {
  __typename?: 'WorkflowStateInfo';
  status: WorkflowStateStatus;
  statusMessage?: Maybe<Scalars['String']['output']>;
};

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
  { planIndicators?: Array<(
    { id: string }
    & { __typename?: 'Indicator' }
  ) | null> | null, plan?: (
    { primaryLanguage: string, otherLanguages: Array<string>, actions: Array<(
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

export type SearchQueryQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  query: Scalars['String']['input'];
  onlyOtherPlans?: InputMaybe<Scalars['Boolean']['input']>;
  clientUrl?: InputMaybe<Scalars['String']['input']>;
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

export type ActionHightlightListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
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
  plan: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
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
  plan: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
}>;


export type GetActionListQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, image?: (
      { id: string, rendition?: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, dependencyRole?: (
      { id: string, name: string }
      & { __typename?: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { preceding: (
        { id: string }
        & { __typename?: 'Action' }
      ), dependent: (
        { id: string }
        & { __typename?: 'Action' }
      ) }
      & { __typename?: 'ActionDependencyRelationship' }
    )>, categories: Array<(
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
  id: Scalars['ID']['input'];
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

export type GetActionListForBlockQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  category?: InputMaybe<Scalars['ID']['input']>;
  clientUrl?: InputMaybe<Scalars['String']['input']>;
  workflow?: InputMaybe<WorkflowState>;
}>;


export type GetActionListForBlockQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
      { id: string, identifier: string, name: string, color?: string | null }
      & { __typename?: 'ActionStatus' }
    ) | null, dependencyRole?: (
      { id: string, name: string }
      & { __typename?: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { preceding: (
        { id: string }
        & { __typename?: 'Action' }
      ), dependent: (
        { id: string }
        & { __typename?: 'Action' }
      ) }
      & { __typename?: 'ActionDependencyRelationship' }
    )>, categories: Array<(
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
  plan: Scalars['ID']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetActionListForGraphsQuery = (
  { planActions?: Array<(
    { color?: string | null, scheduleContinuous: boolean, statusSummary: (
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
  plan: Scalars['ID']['input'];
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
  plan: Scalars['ID']['input'];
  categoryType: Scalars['ID']['input'];
  attributeType: Scalars['ID']['input'];
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
      { id?: string | null, title: string, path: string, slug: string, url?: string | null, urlPath: string, depth?: number | null, contentType: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' } | { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
  { id: string, identifier: string, name: string, viewUrl?: string, color?: string | null, manualStatusReason?: string | null, completion?: number | null, officialName?: string | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, indicatorsCount?: number | null, hasIndicatorsWithGoals?: boolean | null, dependencyRole?: (
    { id: string, name: string }
    & { __typename?: 'ActionDependencyRole' }
  ) | null, allDependencyRelationships: Array<(
    { preceding: (
      { id: string }
      & { __typename?: 'Action' }
    ), dependent: (
      { id: string }
      & { __typename?: 'Action' }
    ) }
    & { __typename?: 'ActionDependencyRelationship' }
  )>, status?: (
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
    { id: string, shortName?: string | null, name: string, shortIdentifier?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, generalContent: (
      { actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
      & { __typename?: 'SiteGeneralContent' }
    ), actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number, color?: string | null }
      & { __typename?: 'ActionImplementationPhase' }
    )> }
    & { __typename?: 'Plan' }
  ), schedule: Array<(
    { id: string }
    & { __typename?: 'ActionSchedule' }
  )>, impact?: (
    { id: string, identifier: string }
    & { __typename?: 'ActionImpact' }
  ) | null, attributes: Array<(
    { id: string, type: (
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
    { id: string, identifier: string, viewUrl: string, plan: (
      { id: string, shortName?: string | null, viewUrl?: string | null }
      & { __typename?: 'Plan' }
    ) }
    & { __typename?: 'Action' }
  ) | null }
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
  plan: Scalars['ID']['input'];
  relatedPlanActions: Scalars['Boolean']['input'];
  path: Scalars['String']['input'];
  workflow?: InputMaybe<WorkflowState>;
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
    { id: string, identifier: string, name: string, viewUrl?: string, color?: string | null, manualStatusReason?: string | null, completion?: number | null, officialName?: string | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, indicatorsCount?: number | null, hasIndicatorsWithGoals?: boolean | null, dependencyRole?: (
      { id: string, name: string }
      & { __typename?: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { preceding: (
        { id: string }
        & { __typename?: 'Action' }
      ), dependent: (
        { id: string }
        & { __typename?: 'Action' }
      ) }
      & { __typename?: 'ActionDependencyRelationship' }
    )>, status?: (
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
      { id: string, shortName?: string | null, name: string, shortIdentifier?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, generalContent: (
        { actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename?: 'SiteGeneralContent' }
      ), actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number, color?: string | null }
        & { __typename?: 'ActionImplementationPhase' }
      )> }
      & { __typename?: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename?: 'ActionSchedule' }
    )>, impact?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
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
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName?: string | null, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null }
    & { __typename?: 'Action' }
  )> | null, relatedPlanActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl?: string, color?: string | null, manualStatusReason?: string | null, completion?: number | null, officialName?: string | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, indicatorsCount?: number | null, hasIndicatorsWithGoals?: boolean | null, dependencyRole?: (
      { id: string, name: string }
      & { __typename?: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { preceding: (
        { id: string }
        & { __typename?: 'Action' }
      ), dependent: (
        { id: string }
        & { __typename?: 'Action' }
      ) }
      & { __typename?: 'ActionDependencyRelationship' }
    )>, status?: (
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
      { id: string, shortName?: string | null, name: string, shortIdentifier?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, generalContent: (
        { actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename?: 'SiteGeneralContent' }
      ), actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number, color?: string | null }
        & { __typename?: 'ActionImplementationPhase' }
      )> }
      & { __typename?: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename?: 'ActionSchedule' }
    )>, impact?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
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
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName?: string | null, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null }
    & { __typename?: 'Action' }
  )> | null, planPage?: { __typename: 'AccessibilityStatementPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } | (
    { dashboardColumns?: Array<(
      { columnLabel?: string | null }
      & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { columnLabel?: string | null, field: string, attributeType?: (
        { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
          { id: string, identifier: string }
          & { __typename?: 'AttributeTypeChoiceOption' }
        )>, unit?: (
          { id: string, name: string }
          & { __typename?: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) | null }
      & { __typename: 'FieldColumnBlock' }
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
  plan: Scalars['ID']['input'];
  identifier: Scalars['ID']['input'];
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
  plan: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
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
  plan: Scalars['ID']['input'];
  relatedPlanIndicators: Scalars['Boolean']['input'];
}>;


export type IndicatorListQuery = (
  { plan?: (
    { id: string, hasIndicatorRelationships?: boolean | null, features: (
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
        ) | null, common?: (
          { type: (
            { identifier: string, name: string }
            & { __typename?: 'CommonCategoryType' }
          ) }
          & { __typename?: 'CommonCategory' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    )> }
    & { __typename?: 'Plan' }
  ) | null, planIndicators?: Array<(
    { id: string, common?: (
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
  ) | null> | null, relatedPlanIndicators?: Array<(
    { id: string, name: string, level?: string | null, timeResolution: IndicatorTimeResolution, organization: (
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
    ) | null, latestGraph?: (
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
    ), categories: Array<(
      { id: string, name: string, parent?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null, type: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'CategoryType' }
      ), common?: (
        { id: string, identifier: string, name: string, order: number, type: (
          { identifier: string, name: string }
          & { __typename?: 'CommonCategoryType' }
        ) }
        & { __typename?: 'CommonCategory' }
      ) | null }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'Indicator' }
  )> | null }
  & { __typename?: 'Query' }
);

export type IndicatorGraphDataQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  plan?: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorGraphDataQuery = (
  { plan?: (
    { scenarios: Array<(
      { id: string, identifier: string, name: string }
      & { __typename?: 'Scenario' }
    )> }
    & { __typename?: 'Plan' }
  ) | null, indicator?: (
    { id: string, name: string, timeResolution: IndicatorTimeResolution, showTrendline: boolean, showTotalLine: boolean, desiredTrend?: IndicatorDesiredTrend | null, reference?: string | null, minValue?: number | null, maxValue?: number | null, organization: (
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
  plan: Scalars['ID']['input'];
}>;


export type PlaywrightGetPlanBasicsQuery = (
  { plan?: (
    { id: string, identifier: string, primaryLanguage: string, otherLanguages: Array<string> }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type PlaywrightGetPlanInfoQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  locale: Scalars['String']['input'];
  clientURL: Scalars['String']['input'];
}>;


export type PlaywrightGetPlanInfoQuery = (
  { plan?: (
    { id: string, identifier: string, name: string, shortName?: string | null, primaryLanguage: string, otherLanguages: Array<string>, parent?: (
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
          { id: string, page: (
            { title: string }
            & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename?: 'PageMenuItem' }
        ) | null, children?: Array<(
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename?: 'PageMenuItem' }
        ) | null> | null }
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
  { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
    { id: string, identifier: string, name: string, color?: string | null }
    & { __typename?: 'ActionStatus' }
  ) | null, dependencyRole?: (
    { id: string, name: string }
    & { __typename?: 'ActionDependencyRole' }
  ) | null, allDependencyRelationships: Array<(
    { preceding: (
      { id: string }
      & { __typename?: 'Action' }
    ), dependent: (
      { id: string }
      & { __typename?: 'Action' }
    ) }
    & { __typename?: 'ActionDependencyRelationship' }
  )>, categories: Array<(
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

type ActionListFilter_JxzhEOvnBnIzLiXeAUm3xrfiKBjXFpDaL5C3p3Xgq4_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' }
);

type ActionListFilter_F7iNEpLXhMpoMtoa9GzVuxMnnC7OmMv38tFoDvWjzY_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' }
);

type ActionListFilter_HFq1pZdLf29K8aK7Mq9JzlMaG1oipWghjFb0sgQs_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
);

type ActionListFilter_AZty3r9V3UvrsJMscX3HsZwTrS1guFYaAu5nAr8kxLu_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' }
);

type ActionListFilter_HveN0AvejgCjHhcBTheUhYsod4nyfLdTCz40DeQyKc_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' }
);

type ActionListFilter_BK76UhbfqRdr6gNaDPl3RrINz0IvF4fQko9ExLz8_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
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

type ActionListFilter_ContinuousActionFilterBlock_Fragment = (
  { id?: string | null, field: string }
  & { __typename: 'ContinuousActionFilterBlock' }
);

export type ActionListFilterFragment = ActionListFilter_JxzhEOvnBnIzLiXeAUm3xrfiKBjXFpDaL5C3p3Xgq4_Fragment | ActionListFilter_F7iNEpLXhMpoMtoa9GzVuxMnnC7OmMv38tFoDvWjzY_Fragment | ActionListFilter_HFq1pZdLf29K8aK7Mq9JzlMaG1oipWghjFb0sgQs_Fragment | ActionListFilter_AZty3r9V3UvrsJMscX3HsZwTrS1guFYaAu5nAr8kxLu_Fragment | ActionListFilter_HveN0AvejgCjHhcBTheUhYsod4nyfLdTCz40DeQyKc_Fragment | ActionListFilter_BK76UhbfqRdr6gNaDPl3RrINz0IvF4fQko9ExLz8_Fragment | ActionListFilter_ActionAttributeTypeFilterBlock_Fragment | ActionListFilter_CategoryTypeFilterBlock_Fragment | ActionListFilter_ContinuousActionFilterBlock_Fragment;

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
  ) | (
    { id?: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
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
  ) | (
    { id?: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
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
  ) | (
    { id?: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
  )> | null }
  & { __typename?: 'ActionListPage' }
);

export type ActionTableColumnFragmentFragment = (
  { dashboardColumns?: Array<(
    { columnLabel?: string | null }
    & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { columnLabel?: string | null, field: string, attributeType?: (
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      )>, unit?: (
        { id: string, name: string }
        & { __typename?: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) | null }
    & { __typename: 'FieldColumnBlock' }
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

type StreamFieldFragment_CsWpOaD0dUEdhV96j5U9TnlDssZTxlWikakK8ZjePw_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
);

type StreamFieldFragment_HsbePm8Z3AogDlLher4vaHf3H4o8JlTijdOv0U2lW4_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' }
);

type StreamFieldFragment_BrQxq2kfXinv8Gs4Envdrv2Bq5KRusIfAe4vZyay_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'IdentifierColumnBlock' }
);

type StreamFieldFragment_P30GgJm9RgypxQwDwDstiXmE9U5oAap3hY4fytm1I_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
);

type StreamFieldFragment_DOs77pyfxxPCbzHq47TpQtwEmigT01EfDjKuRlWYs_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment = (
  { id?: string | null, blockType: string, field: string, blocks: Array<(
    { id?: string | null, field: string }
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { value: string, id?: string | null, field: string }
    & { __typename?: 'CharBlock' }
  )> }
  & { __typename?: 'AccessibilityStatementContactInformationBlock' }
);

type StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment = (
  { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' } | { __typename?: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' } | { __typename?: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
  { heading?: string | null, helpText?: string | null, id?: string | null, blockType: string, field: string, categoryFilter?: (
    { id: string }
    & { __typename?: 'Category' }
  ) | null, groupByCategoryLevel?: (
    { id: string }
    & { __typename?: 'CategoryLevel' }
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
  { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
  { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  )>, indicator?: (
    { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
      { id: string, shortName?: string | null, name: string }
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
          { shortName?: string | null, name: string }
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
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
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
    { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped?: (
      { src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null }
  & { __typename?: 'LargeImageBlock' }
);

type StreamFieldFragment_QuestionAnswerBlock_Fragment = (
  { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' } | { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
    { question?: string | null, answer?: string | null }
    & { __typename?: 'QuestionBlock' }
  ) | null> | null }
  & { __typename?: 'QuestionAnswerBlock' }
);

export type StreamFieldFragmentFragment = StreamFieldFragment_CsWpOaD0dUEdhV96j5U9TnlDssZTxlWikakK8ZjePw_Fragment | StreamFieldFragment_HsbePm8Z3AogDlLher4vaHf3H4o8JlTijdOv0U2lW4_Fragment | StreamFieldFragment_BrQxq2kfXinv8Gs4Envdrv2Bq5KRusIfAe4vZyay_Fragment | StreamFieldFragment_P30GgJm9RgypxQwDwDstiXmE9U5oAap3hY4fytm1I_Fragment | StreamFieldFragment_DOs77pyfxxPCbzHq47TpQtwEmigT01EfDjKuRlWYs_Fragment | StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment | StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment | StreamFieldFragment_ActionListBlock_Fragment | StreamFieldFragment_AdaptiveEmbedBlock_Fragment | StreamFieldFragment_CardListBlock_Fragment | StreamFieldFragment_CartographyVisualisationBlock_Fragment | StreamFieldFragment_CategoryListBlock_Fragment | StreamFieldFragment_CategoryTreeMapBlock_Fragment | StreamFieldFragment_CharBlock_RichTextBlock_TextBlock_Fragment | StreamFieldFragment_ChoiceBlock_Fragment | StreamFieldFragment_FrontPageHeroBlock_Fragment | StreamFieldFragment_IndicatorBlock_Fragment | StreamFieldFragment_IndicatorGroupBlock_Fragment | StreamFieldFragment_IndicatorShowcaseBlock_Fragment | StreamFieldFragment_LargeImageBlock_Fragment | StreamFieldFragment_QuestionAnswerBlock_Fragment;

export type GetActionDetailsQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
  workflow?: InputMaybe<WorkflowState>;
}>;


export type GetActionDetailsQuery = (
  { action?: (
    { id: string, identifier: string, name: string, officialName?: string | null, leadParagraph: string, description?: string | null, completion?: number | null, color?: string | null, updatedAt: any, manualStatusReason?: string | null, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, dateFormat?: ActionDateFormat | null, workflowStatus?: (
      { matchingVersion?: (
        { id?: string | null, description?: string | null }
        & { __typename?: 'WorkflowStateDescription' }
      ) | null }
      & { __typename?: 'WorkflowInfoNode' }
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
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, dependencyRole?: (
        { id: string, name: string }
        & { __typename?: 'ActionDependencyRole' }
      ) | null, allDependencyRelationships: Array<(
        { preceding: (
          { id: string }
          & { __typename?: 'Action' }
        ), dependent: (
          { id: string }
          & { __typename?: 'Action' }
        ) }
        & { __typename?: 'ActionDependencyRelationship' }
      )>, categories: Array<(
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
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, dependencyRole?: (
        { id: string, name: string }
        & { __typename?: 'ActionDependencyRole' }
      ) | null, allDependencyRelationships: Array<(
        { preceding: (
          { id: string }
          & { __typename?: 'Action' }
        ), dependent: (
          { id: string }
          & { __typename?: 'Action' }
        ) }
        & { __typename?: 'ActionDependencyRelationship' }
      )>, categories: Array<(
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
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, dependencyRole?: (
        { id: string, name: string }
        & { __typename?: 'ActionDependencyRole' }
      ) | null, allDependencyRelationships: Array<(
        { preceding: (
          { id: string }
          & { __typename?: 'Action' }
        ), dependent: (
          { id: string }
          & { __typename?: 'Action' }
        ) }
        & { __typename?: 'ActionDependencyRelationship' }
      )>, categories: Array<(
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
    )>, datasets?: Array<(
      { uuid: any, schema?: (
        { uuid: any, timeResolution: DatasetSchemaTimeResolution, unit: string, dimensionCategories: Array<(
          { order: number, category: (
            { uuid: any, label: string, dimension: (
              { name: string, uuid: any }
              & { __typename?: 'BudgetDimension' }
            ) }
            & { __typename?: 'BudgetDimensionCategory' }
          ) }
          & { __typename?: 'DatasetSchemaDimensionCategory' }
        )> }
        & { __typename?: 'DatasetSchema' }
      ) | null, dataPoints: Array<(
        { uuid: any, value?: number | null, date: any, dimensionCategories: Array<(
          { uuid: any, label: string, dimension: (
            { uuid: any }
            & { __typename?: 'BudgetDimension' }
          ) }
          & { __typename?: 'BudgetDimensionCategory' }
        )> }
        & { __typename?: 'DataPoint' }
      )> }
      & { __typename?: 'Dataset' }
    ) | null> | null, plan: (
      { id: string, shortName?: string | null, versionName: string, viewUrl?: string | null, hideActionIdentifiers?: boolean | null, image?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'Plan' }
    ), dependencyRole?: (
      { id: string, name: string }
      & { __typename?: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { preceding: (
        { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
          { id: string, identifier: string, name: string, color?: string | null }
          & { __typename?: 'ActionStatus' }
        ) | null, dependencyRole?: (
          { id: string, name: string }
          & { __typename?: 'ActionDependencyRole' }
        ) | null, allDependencyRelationships: Array<(
          { preceding: (
            { id: string }
            & { __typename?: 'Action' }
          ), dependent: (
            { id: string }
            & { __typename?: 'Action' }
          ) }
          & { __typename?: 'ActionDependencyRelationship' }
        )>, categories: Array<(
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
      ), dependent: (
        { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
          { id: string, identifier: string, name: string, color?: string | null }
          & { __typename?: 'ActionStatus' }
        ) | null, dependencyRole?: (
          { id: string, name: string }
          & { __typename?: 'ActionDependencyRole' }
        ) | null, allDependencyRelationships: Array<(
          { preceding: (
            { id: string }
            & { __typename?: 'Action' }
          ), dependent: (
            { id: string }
            & { __typename?: 'Action' }
          ) }
          & { __typename?: 'ActionDependencyRelationship' }
        )>, categories: Array<(
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
      ) }
      & { __typename?: 'ActionDependencyRelationship' }
    )> }
    & { __typename?: 'Action' }
  ) | null, plan?: (
    { actionListPage?: (
      { id?: string | null, actionDateFormat?: string | null, taskDateFormat?: string | null, detailsMainTop?: Array<(
        { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
            { choiceLabel?: string | null, choiceValue?: string | null }
            & { __typename?: 'FormChoiceBlock' }
          ) | null> | null }
          & { __typename?: 'FormFieldBlock' }
        ) | null> | null }
        & { __typename: 'ActionContactFormBlock' }
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
          & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
            { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
              { choiceLabel?: string | null, choiceValue?: string | null }
              & { __typename?: 'FormChoiceBlock' }
            ) | null> | null }
            & { __typename?: 'FormFieldBlock' }
          ) | null> | null }
          & { __typename?: 'ActionContactFormBlock' }
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
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename?: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { id?: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
            )> | null }
            & { __typename?: 'Report' }
          ) | null> | null }
          & { __typename?: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, caption?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { id?: string | null, field: string, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'IndicatorCausalChainBlock' }
      ) | (
        { id?: string | null, heading?: string | null, helpText?: string | null, datasetSchema: (
          { uuid: any }
          & { __typename?: 'DatasetSchema' }
        ) }
        & { __typename: 'PlanDatasetsBlock' }
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
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename?: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { id?: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
          )> | null }
          & { __typename?: 'Report' }
        ) | null> | null }
        & { __typename: 'ReportComparisonBlock' }
      )> | null, detailsMainBottom?: Array<(
        { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
            { choiceLabel?: string | null, choiceValue?: string | null }
            & { __typename?: 'FormChoiceBlock' }
          ) | null> | null }
          & { __typename?: 'FormFieldBlock' }
        ) | null> | null }
        & { __typename: 'ActionContactFormBlock' }
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
          & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' }
        ) | (
          { id?: string | null }
          & { __typename?: 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
            { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
              { choiceLabel?: string | null, choiceValue?: string | null }
              & { __typename?: 'FormChoiceBlock' }
            ) | null> | null }
            & { __typename?: 'FormFieldBlock' }
          ) | null> | null }
          & { __typename?: 'ActionContactFormBlock' }
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
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename?: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { id?: string | null }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
            )> | null }
            & { __typename?: 'Report' }
          ) | null> | null }
          & { __typename?: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, caption?: string | null, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { id?: string | null, field: string, meta?: (
          { restricted?: boolean | null, hidden?: boolean | null }
          & { __typename?: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'IndicatorCausalChainBlock' }
      ) | (
        { id?: string | null, heading?: string | null, helpText?: string | null, datasetSchema: (
          { uuid: any }
          & { __typename?: 'DatasetSchema' }
        ) }
        & { __typename: 'PlanDatasetsBlock' }
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
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename?: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { id?: string | null }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
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

export type ActionDependenciesFragment = (
  { dependencyRole?: (
    { id: string, name: string }
    & { __typename?: 'ActionDependencyRole' }
  ) | null, allDependencyRelationships: Array<(
    { preceding: (
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, dependencyRole?: (
        { id: string, name: string }
        & { __typename?: 'ActionDependencyRole' }
      ) | null, allDependencyRelationships: Array<(
        { preceding: (
          { id: string }
          & { __typename?: 'Action' }
        ), dependent: (
          { id: string }
          & { __typename?: 'Action' }
        ) }
        & { __typename?: 'ActionDependencyRelationship' }
      )>, categories: Array<(
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
    ), dependent: (
      { id: string, identifier: string, name: string, viewUrl: string, color?: string | null, scheduleContinuous: boolean, completion?: number | null, status?: (
        { id: string, identifier: string, name: string, color?: string | null }
        & { __typename?: 'ActionStatus' }
      ) | null, dependencyRole?: (
        { id: string, name: string }
        & { __typename?: 'ActionDependencyRole' }
      ) | null, allDependencyRelationships: Array<(
        { preceding: (
          { id: string }
          & { __typename?: 'Action' }
        ), dependent: (
          { id: string }
          & { __typename?: 'Action' }
        ) }
        & { __typename?: 'ActionDependencyRelationship' }
      )>, categories: Array<(
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
    ) }
    & { __typename?: 'ActionDependencyRelationship' }
  )> }
  & { __typename?: 'Action' }
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

type ActionMainContentBlocksFragment_ActionContactFormBlock_Fragment = (
  { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
    { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
      { choiceLabel?: string | null, choiceValue?: string | null }
      & { __typename?: 'FormChoiceBlock' }
    ) | null> | null }
    & { __typename?: 'FormFieldBlock' }
  ) | null> | null }
  & { __typename: 'ActionContactFormBlock' }
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
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
      { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { choiceLabel?: string | null, choiceValue?: string | null }
        & { __typename?: 'FormChoiceBlock' }
      ) | null> | null }
      & { __typename?: 'FormFieldBlock' }
    ) | null> | null }
    & { __typename?: 'ActionContactFormBlock' }
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
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
        ) }
        & { __typename?: 'ActionAttributeReportValue' }
      ) | (
        { field: (
          { id?: string | null }
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
        ) }
        & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
      )> | null }
      & { __typename?: 'Report' }
    ) | null> | null }
    & { __typename?: 'ReportComparisonBlock' }
  ) | null> | null }
  & { __typename: 'ActionContentSectionBlock' }
);

type ActionMainContentBlocksFragment_ActionDependenciesBlock_ActionDescriptionBlock_ActionRelatedActionsBlock_Fragment = (
  { id?: string | null, fieldLabel?: string | null, fieldHelpText?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionRelatedActionsBlock' }
);

type ActionMainContentBlocksFragment_OFmc25tC7hh34Jgjcq5Pak5Hz06XdNYlLkB9tk_Fragment = (
  { id?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
);

type ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment = (
  { id?: string | null, fieldLabel?: string | null, caption?: string | null, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionOfficialNameBlock' }
);

type ActionMainContentBlocksFragment_IndicatorCausalChainBlock_Fragment = (
  { id?: string | null, field: string, meta?: (
    { restricted?: boolean | null, hidden?: boolean | null }
    & { __typename?: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'IndicatorCausalChainBlock' }
);

type ActionMainContentBlocksFragment_PlanDatasetsBlock_Fragment = (
  { id?: string | null, heading?: string | null, helpText?: string | null, datasetSchema: (
    { uuid: any }
    & { __typename?: 'DatasetSchema' }
  ) }
  & { __typename: 'PlanDatasetsBlock' }
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
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename?: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { id?: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
    )> | null }
    & { __typename?: 'Report' }
  ) | null> | null }
  & { __typename: 'ReportComparisonBlock' }
);

export type ActionMainContentBlocksFragmentFragment = ActionMainContentBlocksFragment_ActionContactFormBlock_Fragment | ActionMainContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment | ActionMainContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment | ActionMainContentBlocksFragment_ActionContentSectionBlock_Fragment | ActionMainContentBlocksFragment_ActionDependenciesBlock_ActionDescriptionBlock_ActionRelatedActionsBlock_Fragment | ActionMainContentBlocksFragment_OFmc25tC7hh34Jgjcq5Pak5Hz06XdNYlLkB9tk_Fragment | ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment | ActionMainContentBlocksFragment_IndicatorCausalChainBlock_Fragment | ActionMainContentBlocksFragment_PlanDatasetsBlock_Fragment | ActionMainContentBlocksFragment_ReportComparisonBlock_Fragment;

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
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename?: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { id?: string | null }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename?: 'ActionCategoryReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
    )> | null }
    & { __typename?: 'Report' }
  ) | null> | null }
  & { __typename?: 'ReportComparisonBlock' }
);

export type GetActionListPageIncludeRelatedQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
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
  plan: Scalars['ID']['input'];
  onlyWithActions: Scalars['Boolean']['input'];
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
      ) | (
        { id?: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
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
      ) | (
        { id?: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
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
      ) | (
        { id?: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
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
      { blocks: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { choiceLabel?: string | null, choiceValue?: string | null }
          & { __typename?: 'FormChoiceBlock' }
        ) | null> | null }
        & { __typename?: 'FormFieldBlock' }
      ) | null> | null }
      & { __typename: 'CategoryPageContactFormBlock' }
    ) | (
      { id?: string | null, heading?: string | null, helpText?: string | null, datasetSchema: (
        { uuid: any }
        & { __typename?: 'DatasetSchema' }
      ) }
      & { __typename: 'CategoryTypeDatasetsBlock' }
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
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
}>;


export type GetContentPageQuery = (
  { planPage?: (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'IdentifierColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' } | { __typename?: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' } | { __typename?: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { heading?: string | null, helpText?: string | null, id?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null, groupByCategoryLevel?: (
        { id: string }
        & { __typename?: 'CategoryLevel' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { fullWidth?: boolean | null, id?: string | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null, name: string }
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
              { shortName?: string | null, name: string }
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
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
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
        { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' } | { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
        { id?: string | null, urlPath: string }
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
          { id?: string | null, title: string, urlPath: string }
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
      )> | null, datasets?: Array<(
        { uuid: any, schema?: (
          { uuid: any, timeResolution: DatasetSchemaTimeResolution, unit: string, dimensionCategories: Array<(
            { order: number, category: (
              { uuid: any, label: string, dimension: (
                { name: string, uuid: any }
                & { __typename?: 'BudgetDimension' }
              ) }
              & { __typename?: 'BudgetDimensionCategory' }
            ) }
            & { __typename?: 'DatasetSchemaDimensionCategory' }
          )> }
          & { __typename?: 'DatasetSchema' }
        ) | null, dataPoints: Array<(
          { uuid: any, value?: number | null, date: any, dimensionCategories: Array<(
            { uuid: any, label: string, dimension: (
              { uuid: any }
              & { __typename?: 'BudgetDimension' }
            ) }
            & { __typename?: 'BudgetDimensionCategory' }
          )> }
          & { __typename?: 'DataPoint' }
        )> }
        & { __typename?: 'Dataset' }
      ) | null> | null }
      & { __typename?: 'Category' }
    ) | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'IdentifierColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' } | { __typename?: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' } | { __typename?: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { heading?: string | null, helpText?: string | null, id?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null, groupByCategoryLevel?: (
        { id: string }
        & { __typename?: 'CategoryLevel' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { fullWidth?: boolean | null, id?: string | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null, name: string }
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
              { shortName?: string | null, name: string }
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
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
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
        { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' } | { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
        { blocks: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
        { id?: string | null, heading?: string | null, description?: string | null, emailVisible?: boolean | null, emailRequired?: boolean | null, feedbackVisible?: boolean | null, feedbackRequired?: boolean | null, fields?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { id?: string | null, fieldLabel?: string | null, fieldType?: string | null, fieldRequired?: boolean | null, choices?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
            { choiceLabel?: string | null, choiceValue?: string | null }
            & { __typename?: 'FormChoiceBlock' }
          ) | null> | null }
          & { __typename?: 'FormFieldBlock' }
        ) | null> | null }
        & { __typename: 'CategoryPageContactFormBlock' }
      ) | (
        { id?: string | null, heading?: string | null, helpText?: string | null, datasetSchema: (
          { uuid: any }
          & { __typename?: 'DatasetSchema' }
        ) }
        & { __typename: 'CategoryTypeDatasetsBlock' }
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
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'IdentifierColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' } | { __typename?: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' } | { __typename?: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { heading?: string | null, helpText?: string | null, id?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null, groupByCategoryLevel?: (
        { id: string }
        & { __typename?: 'CategoryLevel' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { fullWidth?: boolean | null, id?: string | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { title?: string | null, id?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null, name: string }
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
              { shortName?: string | null, name: string }
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
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
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
        { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' } | { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
}>;


export type GetHomePageQuery = (
  { planPage?: (
    { id?: string | null, slug: string, lastPublishedAt?: any | null }
    & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { id?: string | null, slug: string, lastPublishedAt?: any | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'IdentifierColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorHighlightsBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' } | { __typename?: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' } | { __typename?: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { id?: string | null, heading?: string | null, helpText?: string | null, blockType: string, field: string, categoryFilter?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null, groupByCategoryLevel?: (
        { id: string }
        & { __typename?: 'CategoryLevel' }
      ) | null }
      & { __typename?: 'ActionListBlock' }
    ) | (
      { id?: string | null, fullWidth?: boolean | null, blockType: string, field: string, embed?: (
        { html?: string | null }
        & { __typename?: 'EmbedHTMLValue' }
      ) | null }
      & { __typename?: 'AdaptiveEmbedBlock' }
    ) | (
      { id?: string | null, heading?: string | null, lead?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
      { id?: string | null, title?: string | null, blockType: string, field: string, indicators?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null, name: string }
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
              { shortName?: string | null, name: string }
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
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
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
        { title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null }
      & { __typename?: 'LargeImageBlock' }
    ) | (
      { id?: string | null, heading?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' } | { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' } | { __typename?: 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' } | { __typename?: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
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
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
}>;


export type GetPlanPageIndicatorListQuery = (
  { planPage?: (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { leadContent?: string | null, displayInsights?: boolean | null, displayLevel?: boolean | null, includeRelatedPlans?: boolean | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'IndicatorListPage' }
  ) | null }
  & { __typename?: 'Query' }
);

export type IndicatorDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  plan?: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorDetailsQuery = (
  { indicator?: (
    { id: string, identifier?: string | null, name: string, level?: string | null, description?: string | null, timeResolution: IndicatorTimeResolution, desiredTrend?: IndicatorDesiredTrend | null, organization: (
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
  id: Scalars['ID']['input'];
  plan: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
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
        & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { columnLabel?: string | null, field: string, attributeType?: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) | null }
        & { __typename: 'FieldColumnBlock' }
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
  identifier?: InputMaybe<Scalars['ID']['input']>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  clientUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPlanContextQuery = (
  { plan?: (
    { id: string, identifier: string, name: string, shortName?: string | null, versionName: string, themeIdentifier?: string | null, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, viewUrl?: string | null, actionReportExportViewUrl?: string | null, serveFileBaseUrl: string, adminUrl?: string | null, accessibilityStatementUrl?: string | null, externalFeedbackUrl?: string | null, primaryActionClassification?: (
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
    )>, actionDependencyRoles: Array<(
      { id: string, name: string }
      & { __typename?: 'ActionDependencyRole' }
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
      { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, contactPersonsShowPicture: boolean, contactPersonsShowOrganizationAncestors: boolean, enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean }
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
        { id: string, crossPlanLink?: boolean | null, viewUrl?: string | null, page: (
          { title: string, url?: string | null, urlPath: string, slug: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' } | { __typename?: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' } | { __typename?: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
            { blocks: Array<(
              { field: string }
              & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
            ) | (
              { field: string }
              & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
            ) | (
              { field: string }
              & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' }
            ) | (
              { field: string }
              & { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' }
            ) | (
              { field: string }
              & { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
            ) | (
              { field: string }
              & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
            ) | (
              { value: string, field: string }
              & { __typename?: 'CharBlock' }
            )> }
            & { __typename?: 'AccessibilityStatementContactInformationBlock' }
          ) | null> | null }
          & { __typename?: 'AccessibilityStatementPage' }
        ) | (
          { title: string, url?: string | null, urlPath: string, slug: string }
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
  ) | null, workflowStates?: Array<(
    { id?: string | null, description?: string | null }
    & { __typename?: 'WorkflowStateDescription' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

export type PlanContextFragment = (
  { id: string, identifier: string, name: string, shortName?: string | null, versionName: string, themeIdentifier?: string | null, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers?: boolean | null, publishedAt?: any | null, viewUrl?: string | null, actionReportExportViewUrl?: string | null, serveFileBaseUrl: string, adminUrl?: string | null, accessibilityStatementUrl?: string | null, externalFeedbackUrl?: string | null, primaryActionClassification?: (
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
  )>, actionDependencyRoles: Array<(
    { id: string, name: string }
    & { __typename?: 'ActionDependencyRole' }
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
    { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, contactPersonsShowPicture: boolean, contactPersonsShowOrganizationAncestors: boolean, enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean }
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
      { id: string, crossPlanLink?: boolean | null, viewUrl?: string | null, page: (
        { title: string, url?: string | null, urlPath: string, slug: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' } | { __typename?: 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' } | { __typename?: 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' } | { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' } | { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' } | { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { blocks: Array<(
            { field: string }
            & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
          ) | (
            { field: string }
            & { __typename?: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' }
          ) | (
            { field: string }
            & { __typename?: 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' }
          ) | (
            { field: string }
            & { __typename?: 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCausalChainBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' }
          ) | (
            { field: string }
            & { __typename?: 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StartDateColumnBlock' }
          ) | (
            { field: string }
            & { __typename?: 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
          ) | (
            { value: string, field: string }
            & { __typename?: 'CharBlock' }
          )> }
          & { __typename?: 'AccessibilityStatementContactInformationBlock' }
        ) | null> | null }
        & { __typename?: 'AccessibilityStatementPage' }
      ) | (
        { title: string, url?: string | null, urlPath: string, slug: string }
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
  hostname?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPlansByHostnameQuery = (
  { plansForHostname?: Array<(
    { id: string, identifier: string, otherLanguages: Array<string>, primaryLanguage: string, domain?: (
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
