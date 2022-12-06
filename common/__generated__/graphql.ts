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
  attributes: Array<AttributeInterface>;
  categories: Array<Category>;
  /** The completion percentage for this action */
  completion?: Maybe<Scalars['Int']>;
  contactPersons?: Maybe<Array<ActionContactPerson>>;
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
  statusUpdates: Array<ActionStatusUpdate>;
  tasks: Array<ActionTask>;
  updatedAt: Scalars['DateTime'];
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

export type ActionContactPersonsBlock = StreamFieldInterface & {
  __typename?: 'ActionContactPersonsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionContentAttributeTypeBlock = StreamFieldInterface & {
  __typename?: 'ActionContentAttributeTypeBlock';
  attributeType: AttributeType;
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionContentCategoryTypeBlock = StreamFieldInterface & {
  __typename?: 'ActionContentCategoryTypeBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  categoryType: CategoryType;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
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

export type ActionDescriptionBlock = StreamFieldInterface & {
  __typename?: 'ActionDescriptionBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
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

/** An enumeration. */
export enum ActionIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES'
}

export type ActionLeadParagraphBlock = StreamFieldInterface & {
  __typename?: 'ActionLeadParagraphBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
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

export type ActionLinksBlock = StreamFieldInterface & {
  __typename?: 'ActionLinksBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
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

export type ActionListFilterBlock = ActionAttributeTypeFilterBlock | ActionImplementationPhaseFilterBlock | ActionScheduleFilterBlock | CategoryTypeFilterBlock | PrimaryOrganizationFilterBlock | ResponsiblePartyFilterBlock;

export type ActionListPage = PageInterface & {
  __typename?: 'ActionListPage';
  advancedFilters?: Maybe<Array<ActionListFilterBlock>>;
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
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
  id?: Maybe<Scalars['ID']>;
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

export type ActionMainContentBlock = ActionContentAttributeTypeBlock | ActionContentCategoryTypeBlock | ActionContentSectionBlock | ActionDescriptionBlock | ActionLeadParagraphBlock | ActionLinksBlock | ActionMergedActionsBlock | ActionOfficialNameBlock | ActionRelatedActionsBlock | ActionRelatedIndicatorsBlock | ActionTasksBlock;

export type ActionMainContentSectionElementBlock = ActionContentAttributeTypeBlock | ActionContentCategoryTypeBlock | ActionDescriptionBlock | ActionLeadParagraphBlock | ActionLinksBlock | ActionMergedActionsBlock | ActionOfficialNameBlock | ActionRelatedActionsBlock | ActionRelatedIndicatorsBlock | ActionTasksBlock;

export type ActionMergedActionsBlock = StreamFieldInterface & {
  __typename?: 'ActionMergedActionsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionOfficialNameBlock = StreamFieldInterface & {
  __typename?: 'ActionOfficialNameBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  caption?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  fieldLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type ActionRelatedActionsBlock = StreamFieldInterface & {
  __typename?: 'ActionRelatedActionsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionRelatedIndicatorsBlock = StreamFieldInterface & {
  __typename?: 'ActionRelatedIndicatorsBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionResponsiblePartiesBlock = StreamFieldInterface & {
  __typename?: 'ActionResponsiblePartiesBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
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
  beginsAt: Scalars['Date'];
  endsAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  plan: Plan;
};

export type ActionScheduleBlock = StreamFieldInterface & {
  __typename?: 'ActionScheduleBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
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
  id: Scalars['ID'];
  identifier: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  name: Scalars['String'];
  plan: Plan;
};

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
  commentFi?: Maybe<Scalars['String']>;
  commentI18n?: Maybe<Scalars['String']>;
  commentSv?: Maybe<Scalars['String']>;
  /** The date when the task was completed */
  completedAt?: Maybe<Scalars['Date']>;
  createdAt: Scalars['DateTime'];
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
  nameFi: Scalars['String'];
  nameI18n: Scalars['String'];
  nameSv: Scalars['String'];
  state: ActionTaskState;
};

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

export type ActionTasksBlock = StreamFieldInterface & {
  __typename?: 'ActionTasksBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ActionTextAttributeTypeReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ActionTextAttributeTypeReportFieldBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
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
  webpquality?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};


export type AplansImageSrcSetArgs = {
  format?: InputMaybe<Scalars['String']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AplansRendition = {
  __typename?: 'AplansRendition';
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


export type AplansRenditionRenditionArgs = {
  bgcolor?: InputMaybe<Scalars['String']>;
  fill?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  jpegquality?: InputMaybe<Scalars['Int']>;
  max?: InputMaybe<Scalars['String']>;
  min?: InputMaybe<Scalars['String']>;
  webpquality?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};


export type AplansRenditionSrcSetArgs = {
  format?: InputMaybe<Scalars['String']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
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

export type AttributeType = {
  __typename?: 'AttributeType';
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
  Text = 'TEXT'
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
  /** Do not set your password or any secret here. These credentials are meant for public use on the public site. */
  accessToken: Scalars['String'];
  account: Scalars['String'];
  /** Currently only MapBox supported. */
  provider: CartographyProviderCredentialsProvider;
};

/** An enumeration. */
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
  styleUrl?: Maybe<Scalars['String']>;
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
};

export type CategoryTypeFilterBlock = StreamFieldInterface & {
  __typename?: 'CategoryTypeFilterBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  categoryType?: Maybe<CategoryType>;
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

/** An enumeration. */
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
  shortDescription?: Maybe<Scalars['String']>;
  type: CommonCategoryType;
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
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  organization?: Maybe<Organization>;
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

export type EmptyPage = PageInterface & {
  __typename?: 'EmptyPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
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
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  items: Array<StreamFieldInterface>;
  rawValue: Scalars['String'];
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
  linkButton?: Maybe<StreamFieldInterface>;
  rawValue: Scalars['String'];
  title?: Maybe<Scalars['String']>;
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
  date?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  indicator: Indicator;
  normalizedValues?: Maybe<Array<Maybe<NormalizedValue>>>;
  value: Scalars['Float'];
};

export type IntegerBlock = StreamFieldInterface & {
  __typename?: 'IntegerBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Int'];
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
  descriptionNoFi: Scalars['String'];
  descriptionNoI18n: Scalars['String'];
  descriptionNoSv: Scalars['String'];
  descriptionYes?: Maybe<Scalars['String']>;
  descriptionYesDa: Scalars['String'];
  descriptionYesDe: Scalars['String'];
  descriptionYesDeCh: Scalars['String'];
  descriptionYesEn: Scalars['String'];
  descriptionYesEnAu: Scalars['String'];
  descriptionYesEnGb: Scalars['String'];
  descriptionYesFi: Scalars['String'];
  descriptionYesI18n: Scalars['String'];
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
  nameFi: Scalars['String'];
  nameI18n: Scalars['String'];
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
  ancestors?: Maybe<Array<Maybe<Organization>>>;
  /** An organization category, e.g. committee */
  classification?: Maybe<OrganizationClass>;
  /** Number of contact persons that are associated with this organization */
  contactPersonCount: Scalars['Int'];
  descendants?: Maybe<Array<Maybe<Organization>>>;
  description: Scalars['String'];
  /** A distinct name for this organization (generated automatically) */
  distinctName?: Maybe<Scalars['String']>;
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
  nameFi: Scalars['String'];
  nameI18n: Scalars['String'];
  nameSv: Scalars['String'];
  /** An organization category, e.g. committee */
  organizationSet: Array<Organization>;
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
export type Plan = {
  __typename?: 'Plan';
  accessibilityStatementUrl?: Maybe<Scalars['String']>;
  actionAttributeTypes: Array<AttributeType>;
  actionImpacts: Array<ActionImpact>;
  actionImplementationPhases: Array<ActionImplementationPhase>;
  actionListPage?: Maybe<ActionListPage>;
  actionSchedules: Array<ActionSchedule>;
  actionStatuses: Array<ActionStatus>;
  actionUpdateAcceptableInterval?: Maybe<Scalars['Int']>;
  actionUpdateTargetInterval?: Maybe<Scalars['Int']>;
  actions: Array<Maybe<Action>>;
  /** Can actions be added and the official metadata edited? */
  actionsLocked: Scalars['Boolean'];
  additionalLinks?: Maybe<AdditionalLinks>;
  adminUrl?: Maybe<Scalars['String']>;
  allRelatedPlans: Array<Maybe<Plan>>;
  categoryType?: Maybe<CategoryType>;
  categoryTypes?: Maybe<Array<Maybe<CategoryType>>>;
  children: Array<Plan>;
  domain?: Maybe<PlanDomain>;
  domains?: Maybe<Array<Maybe<PlanDomain>>>;
  features: PlanFeatures;
  footer?: Maybe<Footer>;
  generalContent: SiteGeneralContent;
  hideActionIdentifiers?: Maybe<Scalars['Boolean']>;
  hideActionLeadParagraph?: Maybe<Scalars['Boolean']>;
  hideActionOfficialName?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  image?: Maybe<Image>;
  impactGroups: Array<Maybe<ImpactGroup>>;
  indicatorLevels: Array<IndicatorLevel>;
  lastActionIdentifier?: Maybe<Scalars['ID']>;
  mainMenu?: Maybe<MainMenu>;
  monitoringQualityPoints: Array<MonitoringQualityPoint>;
  name: Scalars['String'];
  organization: Organization;
  otherLanguages?: Maybe<Array<Scalars['String']>>;
  pages?: Maybe<Array<Maybe<PageInterface>>>;
  parent?: Maybe<Plan>;
  /** Used for primary navigation and grouping of actions */
  primaryActionClassification?: Maybe<CategoryType>;
  primaryLanguage: Scalars['String'];
  primaryOrgs: Array<Maybe<Organization>>;
  relatedPlans: Array<Plan>;
  scenarios: Array<Scenario>;
  /** Leave empty unless specifically required. Action filters based on this category are displayed more prominently than filters of other categories. */
  secondaryActionClassification?: Maybe<CategoryType>;
  serveFileBaseUrl: Scalars['String'];
  shortName?: Maybe<Scalars['String']>;
  themeIdentifier?: Maybe<Scalars['String']>;
  viewUrl?: Maybe<Scalars['String']>;
};


/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanActionsArgs = {
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
export type PlanViewUrlArgs = {
  clientUrl?: InputMaybe<Scalars['String']>;
};

/** A domain (hostname) where an UI for a Plan might live. */
export type PlanDomain = {
  __typename?: 'PlanDomain';
  basePath?: Maybe<Scalars['String']>;
  googleSiteVerificationTag?: Maybe<Scalars['String']>;
  hostname: Scalars['String'];
  id: Scalars['ID'];
  matomoAnalyticsUrl?: Maybe<Scalars['String']>;
};

export type PlanFeatures = {
  __typename?: 'PlanFeatures';
  /** Should custom images for individual actions be allowed */
  allowImagesForActions: Scalars['Boolean'];
  /** Set to enable comparing indicators between organizations */
  enableIndicatorComparison: Scalars['Boolean'];
  /** Enable site-wide search functionality */
  enableSearch: Scalars['Boolean'];
  /** Set if the plan uses meaningful action identifiers */
  hasActionIdentifiers: Scalars['Boolean'];
  /** Set if the plan uses the lead paragraph field */
  hasActionLeadParagraph: Scalars['Boolean'];
  /** Set if the plan uses the official name field */
  hasActionOfficialName: Scalars['Boolean'];
  /** Set if actions have a clear primary organisation (such as multi-city plans) */
  hasActionPrimaryOrgs: Scalars['Boolean'];
  /** Set if the contact persons should be visible in the public UI */
  publicContactPersons: Scalars['Boolean'];
  /** Should the public website contain a link to the admin login? */
  showAdminLink: Scalars['Boolean'];
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

/** The quantity that an indicator measures. */
export type Quantity = {
  __typename?: 'Quantity';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  action?: Maybe<Action>;
  allOrganizations?: Maybe<Array<Maybe<Organization>>>;
  category?: Maybe<Category>;
  indicator?: Maybe<Indicator>;
  myPlans?: Maybe<Array<Maybe<Plan>>>;
  organization?: Maybe<Organization>;
  person?: Maybe<Person>;
  plan?: Maybe<Plan>;
  planActions?: Maybe<Array<Action>>;
  planCategories?: Maybe<Array<Maybe<Category>>>;
  planIndicators?: Maybe<Array<Maybe<Indicator>>>;
  planOrganizations?: Maybe<Array<Maybe<Organization>>>;
  planPage?: Maybe<PageInterface>;
  plansForHostname?: Maybe<Array<Maybe<Plan>>>;
  search?: Maybe<SearchResults>;
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


export type QuerySearchArgs = {
  autocomplete?: InputMaybe<Scalars['String']>;
  includeRelatedPlans?: InputMaybe<Scalars['Boolean']>;
  maxResults?: InputMaybe<Scalars['Int']>;
  onlyOtherPlans?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  plan: Scalars['ID'];
  query?: InputMaybe<Scalars['String']>;
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
  id: Scalars['ID'];
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

export type ReportFieldBlock = StreamFieldInterface & {
  __typename?: 'ReportFieldBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
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

export type SearchHitObject = Action | Indicator;

export type SearchResults = {
  __typename?: 'SearchResults';
  hits?: Maybe<Array<Maybe<SearchHit>>>;
};

export type SiteGeneralContent = {
  __typename?: 'SiteGeneralContent';
  actionTerm: SiteGeneralContentActionTerm;
  copyrightText: Scalars['String'];
  /** If the site is under a Creative Commons license, which CC license it is */
  creativeCommonsLicense: Scalars['String'];
  githubApiRepository: Scalars['String'];
  githubUiRepository: Scalars['String'];
  id: Scalars['ID'];
  /** The text to show when displaying official content */
  officialNameDescription: Scalars['String'];
  ownerName: Scalars['String'];
  ownerUrl: Scalars['String'];
  siteDescription: Scalars['String'];
  siteTitle: Scalars['String'];
};

/** An enumeration. */
export enum SiteGeneralContentActionTerm {
  /** Action */
  Action = 'ACTION',
  /** Strategy */
  Strategy = 'STRATEGY'
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
  id?: InputMaybe<Scalars['Int']>;
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
  errors?: Maybe<Array<Maybe<ErrorType>>>;
};

export type UpdateIndicatorMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  organization: Scalars['ID'];
};

export type UpdateIndicatorMutationPayload = {
  __typename?: 'UpdateIndicatorMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
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
  errors?: Maybe<Array<Maybe<ErrorType>>>;
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
  errors?: Maybe<Array<Maybe<ErrorType>>>;
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
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  plan?: Maybe<Plan>;
};

export type UserFeedbackMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  comment: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  plan: Scalars['ID'];
  url: Scalars['String'];
};

export type UserFeedbackMutationPayload = {
  __typename?: 'UserFeedbackMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  feedback?: Maybe<UserFeedbackNode>;
};

export type UserFeedbackNode = {
  __typename?: 'UserFeedbackNode';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  plan: Plan;
  url: Scalars['String'];
};

export type MultiUseImageFragmentFragment = (
  { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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

export type ActionCardFragment = (
  { id: string, identifier: string, name: string, completion?: number | null, status?: (
    { id: string, identifier: string, name: string }
    & { __typename?: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
      { id: string }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'Category' }
  )>, implementationPhase?: (
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
      { id: string, shortName?: string | null, viewUrl?: string | null }
      & { __typename?: 'Plan' }
    ) }
    & { __typename?: 'Action' }
  ) | null, plan: (
    { id: string, shortName?: string | null, viewUrl?: string | null, image?: (
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

export type GetActionDetailsQueryVariables = Exact<{
  plan: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type GetActionDetailsQuery = (
  { action?: (
    { id: string, identifier: string, name: string, officialName?: string | null, leadParagraph: string, description?: string | null, completion?: number | null, updatedAt: any, manualStatusReason?: string | null, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
    ) | null, links: Array<(
      { id: string, order: number, url: string, title: string }
      & { __typename?: 'ActionLink' }
    )>, mergedActions: Array<(
      { id: string, identifier: string, name: string, officialName?: string | null, plan: (
        { id: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    )>, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, iconSvgUrl?: string | null, helpText: string, iconImage?: (
        { rendition?: (
          { src: string }
          & { __typename?: 'ImageRendition' }
        ) | null }
        & { __typename?: 'Image' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ), level?: (
        { id: string, name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
        { title: string, urlPath: string }
        & { __typename?: 'CategoryPage' }
      ) | null, parent?: (
        { id: string, identifier: string, name: string, color?: string | null, iconSvgUrl?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
        ) | null }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'Category' }
    )>, emissionScopes: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string }
      & { __typename?: 'Category' }
    )>, contactPersons?: Array<(
      { id: string, person: (
        { id: string, firstName: string, lastName: string, avatarUrl?: string | null, title?: string | null, organization: (
          { name: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Person' }
      ) }
      & { __typename?: 'ActionContactPerson' }
    )> | null, primaryOrg?: (
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
        { id: string, abbreviation: string, name: string }
        & { __typename?: 'Organization' }
      ) }
      & { __typename?: 'ActionResponsibleParty' }
    )>, tasks: Array<(
      { id: string, name: string, dueAt: any, completedAt?: any | null, comment?: string | null, state: ActionTaskState }
      & { __typename?: 'ActionTask' }
    )>, status?: (
      { id: string, identifier: string, name: string }
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
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) }
      & { __typename?: 'ActionIndicator' }
    )>, relatedActions: Array<(
      { id: string, identifier: string, name: string, completion?: number | null, status?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
          { id: string }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )>, implementationPhase?: (
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
          { id: string, shortName?: string | null, viewUrl?: string | null }
          & { __typename?: 'Plan' }
        ) }
        & { __typename?: 'Action' }
      ) | null, plan: (
        { id: string, shortName?: string | null, viewUrl?: string | null, image?: (
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
        { id: string, name: string, identifier: string, helpText: string, iconSvgUrl?: string | null, iconImage?: (
          { rendition?: (
            { src: string }
            & { __typename?: 'ImageRendition' }
          ) | null }
          & { __typename?: 'Image' }
        ) | null, categoryPage?: (
          { urlPath: string }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )>, type: (
        { id: string, identifier: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text?: string | null, id: string, choice?: (
        { id: string, name: string }
        & { __typename?: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string }
        & { __typename?: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' }
    )> }
    & { __typename?: 'Action' }
  ) | null, plan?: (
    { actionListPage?: (
      { detailsMainTop?: Array<(
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
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id?: string | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          )> }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, caption?: string | null }
        & { __typename: 'ActionOfficialNameBlock' }
      )> | null, detailsMainBottom?: Array<(
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
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id?: string | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          )> }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
      ) | (
        { id?: string | null, fieldLabel?: string | null, caption?: string | null }
        & { __typename: 'ActionOfficialNameBlock' }
      )> | null, detailsAside?: Array<(
        { id?: string | null }
        & { __typename: 'ActionContactPersonsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' }
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
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { id?: string | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          )> }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
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
    )> }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

type ActionAsideContentBlocksFragment_ActionContactPersonsBlock_ActionResponsiblePartiesBlock_ActionScheduleBlock_Fragment = (
  { id?: string | null }
  & { __typename: 'ActionContactPersonsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' }
);

type ActionAsideContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment = (
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
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionAsideContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment = (
  { id?: string | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    )> }
    & { __typename?: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

export type ActionAsideContentBlocksFragmentFragment = ActionAsideContentBlocksFragment_ActionContactPersonsBlock_ActionResponsiblePartiesBlock_ActionScheduleBlock_Fragment | ActionAsideContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment | ActionAsideContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment;

type ActionMainContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment = (
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
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionMainContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment = (
  { id?: string | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural?: string | null }
      & { __typename?: 'CategoryLevel' }
    )> }
    & { __typename?: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

type ActionMainContentBlocksFragment_NDHrlxHuGxwOyb6bXbqAefI3WWweIyqe1kWObgCSjss_Fragment = (
  { id?: string | null }
  & { __typename: 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionTasksBlock' }
);

type ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment = (
  { id?: string | null, fieldLabel?: string | null, caption?: string | null }
  & { __typename: 'ActionOfficialNameBlock' }
);

export type ActionMainContentBlocksFragmentFragment = ActionMainContentBlocksFragment_ActionContentAttributeTypeBlock_Fragment | ActionMainContentBlocksFragment_ActionContentCategoryTypeBlock_Fragment | ActionMainContentBlocksFragment_NDHrlxHuGxwOyb6bXbqAefI3WWweIyqe1kWObgCSjss_Fragment | ActionMainContentBlocksFragment_ActionOfficialNameBlock_Fragment;

export type ActionHightlightListQueryVariables = Exact<{
  plan: Scalars['ID'];
  first: Scalars['Int'];
  orderBy: Scalars['String'];
}>;


export type ActionHightlightListQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionStatus' }
    ) | null, implementationPhase?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
            { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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

export type ActionsTableFragment = (
  { id: string, identifier: string, name: string, completion?: number | null, status?: (
    { id: string, identifier: string, name: string }
    & { __typename?: 'ActionStatus' }
  ) | null, implementationPhase?: (
    { id: string, identifier: string, name: string }
    & { __typename?: 'ActionImplementationPhase' }
  ) | null, categories: Array<(
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

export type GetActionListQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type GetActionListQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, completion?: number | null, image?: (
      { id: string, rendition?: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, status?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
        { id: string }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )>, implementationPhase?: (
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
        { id: string, shortName?: string | null, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, plan: (
      { id: string, shortName?: string | null, viewUrl?: string | null, image?: (
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

export type GetActionStatusesQueryVariables = Exact<{
  plan: Scalars['ID'];
  actionCategory?: InputMaybe<Scalars['ID']>;
}>;


export type GetActionStatusesQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, plan: (
      { id: string }
      & { __typename?: 'Plan' }
    ), status?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionStatus' }
    ) | null, implementationPhase?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, mergedWith?: (
      { id: string, identifier: string, plan: (
        { id: string, shortName?: string | null, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null }
    & { __typename?: 'Action' }
  )> | null }
  & { __typename?: 'Query' }
);

export type CategoryTagsCategoryFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, iconSvgUrl?: string | null, helpText: string, iconImage?: (
    { rendition?: (
      { src: string }
      & { __typename?: 'ImageRendition' }
    ) | null }
    & { __typename?: 'Image' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename?: 'CategoryType' }
  ), level?: (
    { id: string, name: string, namePlural?: string | null }
    & { __typename?: 'CategoryLevel' }
  ) | null, image?: (
    { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
    { title: string, urlPath: string }
    & { __typename?: 'CategoryPage' }
  ) | null, parent?: (
    { id: string, identifier: string, name: string, color?: string | null, iconSvgUrl?: string | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
    ) | null }
    & { __typename?: 'Category' }
  ) | null }
  & { __typename?: 'Category' }
);

export type CategoryTagsCategoryTypeFragment = (
  { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
    { id: string, order: number, name: string, namePlural?: string | null }
    & { __typename?: 'CategoryLevel' }
  )> }
  & { __typename?: 'CategoryType' }
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

type AttributesBlockAttribute_AttributeCategoryChoice_Fragment = (
  { id: string, categories: Array<(
    { id: string, name: string, identifier: string, helpText: string, iconSvgUrl?: string | null, iconImage?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, categoryPage?: (
      { urlPath: string }
      & { __typename?: 'CategoryPage' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'Category' }
  )>, type: (
    { id: string, identifier: string }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttribute_AttributeChoice_Fragment = (
  { text?: string | null, id: string, choice?: (
    { id: string, name: string }
    & { __typename?: 'AttributeTypeChoiceOption' }
  ) | null, type: (
    { id: string, identifier: string }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttribute_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttribute_AttributeRichText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string }
    & { __typename?: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' }
);

export type AttributesBlockAttributeFragment = AttributesBlockAttribute_AttributeCategoryChoice_Fragment | AttributesBlockAttribute_AttributeChoice_Fragment | AttributesBlockAttribute_AttributeNumericValue_Fragment | AttributesBlockAttribute_AttributeRichText_Fragment;

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
    { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )>, unit?: (
      { id: string, name: string }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ), categories: Array<(
    { id: string, name: string, identifier: string, helpText: string, iconSvgUrl?: string | null, iconImage?: (
      { rendition?: (
        { src: string }
        & { __typename?: 'ImageRendition' }
      ) | null }
      & { __typename?: 'Image' }
    ) | null, categoryPage?: (
      { urlPath: string }
      & { __typename?: 'CategoryPage' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ) }
    & { __typename?: 'Category' }
  )> }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment = (
  { text?: string | null, id: string, type: (
    { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )>, unit?: (
      { id: string, name: string }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ), choice?: (
    { id: string, name: string }
    & { __typename?: 'AttributeTypeChoiceOption' }
  ) | null }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )>, unit?: (
      { id: string, name: string }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttributeWithNestedType_AttributeRichText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string }
      & { __typename?: 'AttributeTypeChoiceOption' }
    )>, unit?: (
      { id: string, name: string }
      & { __typename?: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' }
);

export type AttributesBlockAttributeWithNestedTypeFragment = AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment | AttributesBlockAttributeWithNestedType_AttributeRichText_Fragment;

export type SearchQueryQueryVariables = Exact<{
  plan: Scalars['ID'];
  query: Scalars['String'];
  onlyOtherPlans?: InputMaybe<Scalars['Boolean']>;
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

type StreamFieldFragment_Nt0Ny5j9dUtfvRcCm6chBrwzB_6yHgfSs56exzzlgE_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' }
);

type StreamFieldFragment_UpbHutTqvvP7vH3NajdRyVYiT0v9LbHfavwLxgUDGk_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CartographyVisualisationBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'ImageChooserBlock' | 'IndicatorHighlightsBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
);

type StreamFieldFragment_QhL5Lmu_0ky0s6DonsUlcEdTxyWZlCimTLwbVcHem_Fragment = (
  { id?: string | null, blockType: string, field: string }
  & { __typename?: 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TimeBlock' | 'URLBlock' }
);

type StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment = (
  { id?: string | null, blockType: string, field: string, blocks: Array<(
    { id?: string | null, field: string }
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { id?: string | null, field: string }
    & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
  ) | (
    { value: string, id?: string | null, field: string }
    & { __typename?: 'CharBlock' }
  )> }
  & { __typename?: 'AccessibilityStatementContactInformationBlock' }
);

type StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment = (
  { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' } | { __typename?: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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

type StreamFieldFragment_CardListBlock_Fragment = (
  { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
    { heading?: string | null, content?: string | null, link?: string | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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

type StreamFieldFragment_CategoryListBlock_Fragment = (
  { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
    { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, level?: (
        { name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
        { title: string, urlPath: string }
        & { __typename?: 'CategoryPage' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'CategoryType' }
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
    { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
  { id?: string | null, blockType: string, field: string, items: Array<(
    { id?: string | null }
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { id?: string | null }
    & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
  ) | (
    { style?: string | null, id?: string | null, indicator?: (
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
  )> }
  & { __typename?: 'IndicatorGroupBlock' }
);

type StreamFieldFragment_IndicatorShowcaseBlock_Fragment = (
  { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
    { id?: string | null }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' }
  ) | (
    { id?: string | null }
    & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
  )>, indicator?: (
    { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
      { id: string, shortName?: string | null }
      & { __typename?: 'Unit' }
    ), latestValue?: (
      { id: string, date?: string | null, value: number }
      & { __typename?: 'IndicatorValue' }
    ) | null, values?: Array<(
      { id: string, date?: string | null, value: number }
      & { __typename?: 'IndicatorValue' }
    ) | null> | null, goals?: Array<(
      { id: string, date?: string | null, value: number }
      & { __typename?: 'IndicatorGoal' }
    ) | null> | null }
    & { __typename?: 'Indicator' }
  ) | null, linkButton?: (
    { blockType: string }
    & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { blockType: string }
    & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
  ) | (
    { text?: string | null, blockType: string, page?: (
      { url?: string | null, urlPath: string, slug: string }
      & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    ) | null }
    & { __typename?: 'PageLinkBlock' }
  ) | null }
  & { __typename?: 'IndicatorShowcaseBlock' }
);

type StreamFieldFragment_QuestionAnswerBlock_Fragment = (
  { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' } | { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
    { question?: string | null, answer?: string | null }
    & { __typename?: 'QuestionBlock' }
  ) | null> | null }
  & { __typename?: 'QuestionAnswerBlock' }
);

export type StreamFieldFragmentFragment = StreamFieldFragment_Nt0Ny5j9dUtfvRcCm6chBrwzB_6yHgfSs56exzzlgE_Fragment | StreamFieldFragment_UpbHutTqvvP7vH3NajdRyVYiT0v9LbHfavwLxgUDGk_Fragment | StreamFieldFragment_QhL5Lmu_0ky0s6DonsUlcEdTxyWZlCimTLwbVcHem_Fragment | StreamFieldFragment_AccessibilityStatementContactInformationBlock_Fragment | StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment | StreamFieldFragment_ActionListBlock_Fragment | StreamFieldFragment_CardListBlock_Fragment | StreamFieldFragment_CategoryListBlock_Fragment | StreamFieldFragment_CategoryTreeMapBlock_Fragment | StreamFieldFragment_CharBlock_RichTextBlock_TextBlock_Fragment | StreamFieldFragment_ChoiceBlock_Fragment | StreamFieldFragment_FrontPageHeroBlock_Fragment | StreamFieldFragment_IndicatorBlock_Fragment | StreamFieldFragment_IndicatorGroupBlock_Fragment | StreamFieldFragment_IndicatorShowcaseBlock_Fragment | StreamFieldFragment_QuestionAnswerBlock_Fragment;

export type GetActionListForBlockQueryVariables = Exact<{
  plan: Scalars['ID'];
  category?: InputMaybe<Scalars['ID']>;
}>;


export type GetActionListForBlockQuery = (
  { planActions?: Array<(
    { id: string, identifier: string, name: string, completion?: number | null, status?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, iconSvgUrl?: string | null, type: (
        { id: string }
        & { __typename?: 'CategoryType' }
      ) }
      & { __typename?: 'Category' }
    )>, implementationPhase?: (
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
        { id: string, shortName?: string | null, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ) }
      & { __typename?: 'Action' }
    ) | null, plan: (
      { id: string, shortName?: string | null, viewUrl?: string | null, image?: (
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

export type CategoryListCategoryFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, level?: (
    { name: string, namePlural?: string | null }
    & { __typename?: 'CategoryLevel' }
  ) | null, image?: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
    { title: string, urlPath: string }
    & { __typename?: 'CategoryPage' }
  ) | null, type: (
    { id: string, hideCategoryIdentifiers: boolean }
    & { __typename?: 'CategoryType' }
  ) }
  & { __typename?: 'Category' }
);

export type GetCategoryAttributeTypesQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type GetCategoryAttributeTypesQuery = (
  { plan?: (
    { id: string, categoryTypes?: Array<(
      { id: string, name: string, attributeTypes: Array<(
        { format: AttributeTypeFormat, identifier: string, choiceOptions: Array<(
          { identifier: string }
          & { __typename?: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null> | null }
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
      { id?: string | null, title: string, path: string, slug: string, url?: string | null, urlPath: string, depth?: number | null, contentType: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' } | { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' } | { __typename?: 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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
    ), attributes?: Array<{ __typename?: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeRichText' } | (
      { value: number }
      & { __typename?: 'AttributeNumericValue' }
    )> | null }
    & { __typename?: 'Category' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

export type DashboardActionListQueryVariables = Exact<{
  plan: Scalars['ID'];
}>;


export type DashboardActionListQuery = (
  { plan?: (
    { id: string, categoryTypes?: Array<(
      { id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common?: (
        { identifier: string, name: string }
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
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null> | null, primaryOrgs: Array<(
      { id: string, abbreviation: string, name: string }
      & { __typename?: 'Organization' }
    ) | null> }
    & { __typename?: 'Plan' }
  ) | null, planActions?: Array<(
    { id: string, identifier: string, name: string, completion?: number | null, officialName?: string | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, status?: (
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string }
      & { __typename?: 'Category' }
    )>, implementationPhase?: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, plan: (
      { id: string }
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
      & { __typename: 'AttributeCategoryChoice' | 'AttributeNumericValue' | 'AttributeRichText' }
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
    ) | null, contactPersons?: Array<(
      { id: string, person: (
        { organization: (
          { id: string }
          & { __typename?: 'Organization' }
        ) }
        & { __typename?: 'Person' }
      ) }
      & { __typename?: 'ActionContactPerson' }
    )> | null, tasks: Array<(
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
  )> | null, planOrganizations?: Array<(
    { id: string, abbreviation: string, name: string, contactPersonCount: number, actionCount: number, classification?: (
      { name: string }
      & { __typename?: 'OrganizationClass' }
    ) | null, parent?: (
      { id: string }
      & { __typename?: 'Organization' }
    ) | null }
    & { __typename?: 'Organization' }
  ) | null> | null }
  & { __typename?: 'Query' }
);

type ActionListFilter_9BljUk2pnngShtqd3AdFmIg2Azbeqj9AnkVwN57wFdU_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' }
);

type ActionListFilter_P4wgFz099n0WnQv1ORisoSgA0sQqRgVYgqAeXe8eR84_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' }
);

type ActionListFilter_XPrp3gFVl2Yz1YwJ5PXkwBeYxY5D7M1Dew8Z8PyU_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' }
);

type ActionListFilter_ICs7MrXbp2UuPup5E0ij9F1FuAsoat7Y5v0IpXcxNk0_Fragment = (
  { field: string, id?: string | null }
  & { __typename: 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
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
  { style?: string | null, showAllLabel?: string | null, field: string, id?: string | null, categoryType?: (
    { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
      { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
        { id: string }
        & { __typename?: 'Category' }
      ) | null }
      & { __typename?: 'Category' }
    )> }
    & { __typename?: 'CategoryType' }
  ) | null }
  & { __typename: 'CategoryTypeFilterBlock' }
);

export type ActionListFilterFragment = ActionListFilter_9BljUk2pnngShtqd3AdFmIg2Azbeqj9AnkVwN57wFdU_Fragment | ActionListFilter_P4wgFz099n0WnQv1ORisoSgA0sQqRgVYgqAeXe8eR84_Fragment | ActionListFilter_XPrp3gFVl2Yz1YwJ5PXkwBeYxY5D7M1Dew8Z8PyU_Fragment | ActionListFilter_ICs7MrXbp2UuPup5E0ij9F1FuAsoat7Y5v0IpXcxNk0_Fragment | ActionListFilter_ActionAttributeTypeFilterBlock_Fragment | ActionListFilter_CategoryTypeFilterBlock_Fragment;

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
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style?: string | null, showAllLabel?: string | null, field: string, id?: string | null, categoryType?: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
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
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style?: string | null, showAllLabel?: string | null, field: string, id?: string | null, categoryType?: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
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
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style?: string | null, showAllLabel?: string | null, field: string, id?: string | null, categoryType?: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  )> | null }
  & { __typename?: 'ActionListPage' }
);

export type GetEmbedActionQueryVariables = Exact<{
  plan: Scalars['ID'];
  identifier: Scalars['ID'];
}>;


export type GetEmbedActionQuery = (
  { action?: (
    { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { id: string, identifier: string, name: string }
      & { __typename?: 'ActionStatus' }
    ) | null, implementationPhase?: (
      { id: string, identifier: string }
      & { __typename?: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image?: (
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
            { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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

export type IndicatorGraphDataSmallQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  plan?: InputMaybe<Scalars['ID']>;
}>;


export type IndicatorGraphDataSmallQuery = (
  { indicator?: (
    { id: string, name: string, timeResolution: IndicatorTimeResolution, minValue?: number | null, maxValue?: number | null, quantity?: (
      { id: string, name: string }
      & { __typename?: 'Quantity' }
    ) | null, values?: Array<(
      { id: string, date?: string | null, value: number, categories: Array<(
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
      { id: string, date?: string | null, value: number, scenario?: (
        { id: string, name: string }
        & { __typename?: 'Scenario' }
      ) | null }
      & { __typename?: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName?: string | null, verboseName?: string | null, verboseNamePlural?: string | null }
      & { __typename?: 'Unit' }
    ) }
    & { __typename?: 'Indicator' }
  ) | null }
  & { __typename?: 'Query' }
);

export type IndicatorDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  plan?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<Scalars['ID']>;
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
    ), common?: (
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
      { id: string, identifier: string, name: string, completion?: number | null, status?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionStatus' }
      ) | null, implementationPhase?: (
        { id: string, identifier: string, name: string }
        & { __typename?: 'ActionImplementationPhase' }
      ) | null, categories: Array<(
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
          { id: string, name: string }
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
    )>, categoryTypes?: Array<(
      { id: string, identifier: string, categories: Array<(
        { id: string, identifier: string, order: number, name: string, parent?: (
          { id: string }
          & { __typename?: 'Category' }
        ) | null }
        & { __typename?: 'Category' }
      )> }
      & { __typename?: 'CategoryType' }
    ) | null> | null }
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
      { id: string, date?: string | null, value: number, scenario?: (
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
          { id: string, date?: string | null, value: number, scenario?: (
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

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  planId: Scalars['ID'];
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
      { id: string, name: string, shortName?: string | null, viewUrl?: string | null, organization: (
        { id: string, name: string, abbreviation: string }
        & { __typename?: 'Organization' }
      ), primaryOrgs: Array<(
        { id: string, name: string }
        & { __typename?: 'Organization' }
      ) | null>, actionImpacts: Array<(
        { id: string }
        & { __typename?: 'ActionImpact' }
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
        { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean, publicContactPersons: boolean }
        & { __typename?: 'PlanFeatures' }
      ), actions: Array<(
        { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, plan: (
          { id: string, viewUrl?: string | null }
          & { __typename?: 'Plan' }
        ), schedule: Array<(
          { id: string }
          & { __typename?: 'ActionSchedule' }
        )>, status?: (
          { id: string, identifier: string, name: string }
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
      ) | null> }
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
    { id: string, name: string, shortName?: string | null, viewUrl?: string | null, organization: (
      { id: string, name: string, abbreviation: string }
      & { __typename?: 'Organization' }
    ), primaryOrgs: Array<(
      { id: string, name: string }
      & { __typename?: 'Organization' }
    ) | null>, actionImpacts: Array<(
      { id: string }
      & { __typename?: 'ActionImpact' }
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
      { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean, publicContactPersons: boolean }
      & { __typename?: 'PlanFeatures' }
    ), actions: Array<(
      { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, plan: (
        { id: string, viewUrl?: string | null }
        & { __typename?: 'Plan' }
      ), schedule: Array<(
        { id: string }
        & { __typename?: 'ActionSchedule' }
      )>, status?: (
        { id: string, identifier: string, name: string }
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
    ) | null> }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type OrgContentPlanFragment = (
  { id: string, name: string, shortName?: string | null, viewUrl?: string | null, organization: (
    { id: string, name: string, abbreviation: string }
    & { __typename?: 'Organization' }
  ), primaryOrgs: Array<(
    { id: string, name: string }
    & { __typename?: 'Organization' }
  ) | null>, actionImpacts: Array<(
    { id: string }
    & { __typename?: 'ActionImpact' }
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
    { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean, publicContactPersons: boolean }
    & { __typename?: 'PlanFeatures' }
  ), actions: Array<(
    { id: string, identifier: string, name: string, officialName?: string | null, completion?: number | null, updatedAt: any, scheduleContinuous: boolean, startDate?: any | null, endDate?: any | null, order: number, plan: (
      { id: string, viewUrl?: string | null }
      & { __typename?: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename?: 'ActionSchedule' }
    )>, status?: (
      { id: string, identifier: string, name: string }
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
  ) | null> }
  & { __typename?: 'Plan' }
);

export type GetPlanContextQueryVariables = Exact<{
  identifier?: InputMaybe<Scalars['ID']>;
  hostname?: InputMaybe<Scalars['String']>;
  clientUrl?: InputMaybe<Scalars['String']>;
}>;


export type GetPlanContextQuery = (
  { plan?: (
    { id: string, identifier: string, name: string, shortName?: string | null, themeIdentifier?: string | null, primaryLanguage: string, otherLanguages?: Array<string> | null, hideActionIdentifiers?: boolean | null, viewUrl?: string | null, serveFileBaseUrl: string, adminUrl?: string | null, accessibilityStatementUrl?: string | null, primaryActionClassification?: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename?: 'CategoryType' }
    ) | null, secondaryActionClassification?: (
      { id: string, identifier: string }
      & { __typename?: 'CategoryType' }
    ) | null, domain?: (
      { id: string, googleSiteVerificationTag?: string | null, matomoAnalyticsUrl?: string | null }
      & { __typename?: 'PlanDomain' }
    ) | null, image?: (
      { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImplementationPhase' }
    )>, actionImpacts: Array<(
      { id: string, identifier: string, name: string, order: number }
      & { __typename?: 'ActionImpact' }
    )>, actionStatuses: Array<(
      { id: string, identifier: string, name: string, isCompleted: boolean }
      & { __typename?: 'ActionStatus' }
    )>, impactGroups: Array<(
      { id: string }
      & { __typename?: 'ImpactGroup' }
    ) | null>, primaryOrgs: Array<(
      { id: string }
      & { __typename?: 'Organization' }
    ) | null>, generalContent: (
      { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm }
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
      { enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, publicContactPersons: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean }
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
    ) | null>, children: Array<(
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
          { title: string, urlPath: string, slug: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' } | { __typename?: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
            { blocks: Array<(
              { field: string }
              & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
            ) | (
              { field: string }
              & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
            ) | (
              { field: string }
              & { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
            ) | (
              { field: string }
              & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
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
    ) | null }
    & { __typename?: 'Plan' }
  ) | null }
  & { __typename?: 'Query' }
);

export type PlanContextFragment = (
  { id: string, identifier: string, name: string, shortName?: string | null, themeIdentifier?: string | null, primaryLanguage: string, otherLanguages?: Array<string> | null, hideActionIdentifiers?: boolean | null, viewUrl?: string | null, serveFileBaseUrl: string, adminUrl?: string | null, accessibilityStatementUrl?: string | null, primaryActionClassification?: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename?: 'CategoryType' }
  ) | null, secondaryActionClassification?: (
    { id: string, identifier: string }
    & { __typename?: 'CategoryType' }
  ) | null, domain?: (
    { id: string, googleSiteVerificationTag?: string | null, matomoAnalyticsUrl?: string | null }
    & { __typename?: 'PlanDomain' }
  ) | null, image?: (
    { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
    { id: string, identifier: string, name: string, order: number }
    & { __typename?: 'ActionImplementationPhase' }
  )>, actionImpacts: Array<(
    { id: string, identifier: string, name: string, order: number }
    & { __typename?: 'ActionImpact' }
  )>, actionStatuses: Array<(
    { id: string, identifier: string, name: string, isCompleted: boolean }
    & { __typename?: 'ActionStatus' }
  )>, impactGroups: Array<(
    { id: string }
    & { __typename?: 'ImpactGroup' }
  ) | null>, primaryOrgs: Array<(
    { id: string }
    & { __typename?: 'Organization' }
  ) | null>, generalContent: (
    { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm }
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
    { enableSearch: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, publicContactPersons: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean }
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
  ) | null>, children: Array<(
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
        { title: string, urlPath: string, slug: string, body?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' } | { __typename?: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
          { blocks: Array<(
            { field: string }
            & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
          ) | (
            { field: string }
            & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
          ) | (
            { field: string }
            & { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
          ) | (
            { field: string }
            & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
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
  ) | null }
  & { __typename?: 'Plan' }
);

export type GetPlanPageGeneralQueryVariables = Exact<{
  plan: Scalars['ID'];
  path: Scalars['String'];
}>;


export type GetPlanPageGeneralQuery = (
  { planPage?: (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CartographyVisualisationBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'ImageChooserBlock' | 'IndicatorHighlightsBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TimeBlock' | 'URLBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' } | { __typename?: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, level?: (
            { name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
            { title: string, urlPath: string }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
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
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { id?: string | null, blockType: string, field: string, items: Array<(
        { id?: string | null }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { style?: string | null, id?: string | null, indicator?: (
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
      )> }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' } | { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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
      { id: string, identifier: string, leadParagraph: string, color?: string | null, iconSvgUrl?: string | null, level?: (
        { name: string, namePlural?: string | null }
        & { __typename?: 'CategoryLevel' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename?: 'CategoryType' }
      ), image?: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
        { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, level?: (
          { name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
          { title: string, urlPath: string }
          & { __typename?: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename?: 'CategoryType' }
        ) }
        & { __typename?: 'Category' }
      )>, parent?: (
        { id: string, identifier: string, name: string, color?: string | null, iconSvgUrl?: string | null, level?: (
          { name: string, namePlural?: string | null }
          & { __typename?: 'CategoryLevel' }
        ) | null, image?: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
        ) }
        & { __typename?: 'Category' }
      ) | null, attributes?: Array<(
        { id: string, type: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, name: string, identifier: string, helpText: string, iconSvgUrl?: string | null, iconImage?: (
            { rendition?: (
              { src: string }
              & { __typename?: 'ImageRendition' }
            ) | null }
            & { __typename?: 'Image' }
          ) | null, categoryPage?: (
            { urlPath: string }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text?: string | null, id: string, type: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ), choice?: (
          { id: string, name: string }
          & { __typename?: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string }
            & { __typename?: 'AttributeTypeChoiceOption' }
          )>, unit?: (
            { id: string, name: string }
            & { __typename?: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' }
      )> | null }
      & { __typename?: 'Category' }
    ) | null, body?: Array<(
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CartographyVisualisationBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'ImageChooserBlock' | 'IndicatorHighlightsBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TimeBlock' | 'URLBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' } | { __typename?: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, level?: (
            { name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
            { title: string, urlPath: string }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
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
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { id?: string | null, blockType: string, field: string, items: Array<(
        { id?: string | null }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { style?: string | null, id?: string | null, indicator?: (
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
      )> }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' } | { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
        { question?: string | null, answer?: string | null }
        & { __typename?: 'QuestionBlock' }
      ) | null> | null }
      & { __typename?: 'QuestionAnswerBlock' }
    ) | null> | null }
    & { __typename: 'CategoryPage' }
  ) | (
    { leadContent?: string | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'PrivacyPolicyPage' }
  ) | (
    { leadParagraph?: string | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, headerImage?: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CartographyVisualisationBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'ImageChooserBlock' | 'IndicatorHighlightsBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TimeBlock' | 'URLBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' } | { __typename?: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, level?: (
            { name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
            { title: string, urlPath: string }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
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
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { id?: string | null, blockType: string, field: string, items: Array<(
        { id?: string | null }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { style?: string | null, id?: string | null, indicator?: (
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
      )> }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' } | { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
        { question?: string | null, answer?: string | null }
        & { __typename?: 'QuestionBlock' }
      ) | null> | null }
      & { __typename?: 'QuestionAnswerBlock' }
    ) | null> | null }
    & { __typename: 'StaticPage' }
  ) | null }
  & { __typename?: 'Query' }
);

export type GetActionListPageQueryVariables = Exact<{
  plan: Scalars['ID'];
  path: Scalars['String'];
}>;


export type GetActionListPageQuery = (
  { planPage?: (
    { id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'AccessibilityStatementPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { leadContent?: string | null, defaultView: ActionListPageView, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null, primaryFilters?: Array<(
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
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style?: string | null, showAllLabel?: string | null, field: string, id?: string | null, categoryType?: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
            { id: string }
            & { __typename?: 'Category' }
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
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style?: string | null, showAllLabel?: string | null, field: string, id?: string | null, categoryType?: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
            { id: string }
            & { __typename?: 'Category' }
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
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style?: string | null, showAllLabel?: string | null, field: string, id?: string | null, categoryType?: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent?: (
            { id: string }
            & { __typename?: 'Category' }
          ) | null }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    )> | null }
    & { __typename: 'ActionListPage' }
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
    ) | null, errors?: Array<(
      { field: string, messages: Array<string> }
      & { __typename?: 'ErrorType' }
    ) | null> | null }
    & { __typename?: 'UserFeedbackMutationPayload' }
  ) | null }
  & { __typename?: 'Mutation' }
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
      & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CartographyVisualisationBlock' | 'CategoryTypeFilterBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'ImageChooserBlock' | 'IndicatorHighlightsBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string }
      & { __typename?: 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TimeBlock' | 'URLBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null, field: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null, field: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { value: string, id?: string | null, field: string }
        & { __typename?: 'CharBlock' }
      )> }
      & { __typename?: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' } | { __typename?: 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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
      { heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, cards?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' } | { __typename?: 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
        { heading?: string | null, content?: string | null, link?: string | null, image?: (
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { style?: string | null, heading?: string | null, lead?: string | null, id?: string | null, blockType: string, field: string, categoryType?: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, color?: string | null, level?: (
            { name: string, namePlural?: string | null }
            & { __typename?: 'CategoryLevel' }
          ) | null, image?: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
            { title: string, urlPath: string }
            & { __typename?: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename?: 'CategoryType' }
          ) }
          & { __typename?: 'Category' }
        )> }
        & { __typename?: 'CategoryType' }
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
        { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
      { id?: string | null, blockType: string, field: string, items: Array<(
        { id?: string | null }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { id?: string | null }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { style?: string | null, id?: string | null, indicator?: (
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
      )> }
      & { __typename?: 'IndicatorGroupBlock' }
    ) | (
      { title?: string | null, body?: string | null, id?: string | null, blockType: string, field: string, blocks: Array<(
        { id?: string | null }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' }
      ) | (
        { id?: string | null }
        & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      )>, indicator?: (
        { id: string, identifier?: string | null, name: string, minValue?: number | null, maxValue?: number | null, unit: (
          { id: string, shortName?: string | null }
          & { __typename?: 'Unit' }
        ), latestValue?: (
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null, values?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorValue' }
        ) | null> | null, goals?: Array<(
          { id: string, date?: string | null, value: number }
          & { __typename?: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename?: 'Indicator' }
      ) | null, linkButton?: (
        { blockType: string }
        & { __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { blockType: string }
        & { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' }
      ) | (
        { text?: string | null, blockType: string, page?: (
          { url?: string | null, urlPath: string, slug: string }
          & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename?: 'PageLinkBlock' }
      ) | null }
      & { __typename?: 'IndicatorShowcaseBlock' }
    ) | (
      { heading?: string | null, id?: string | null, blockType: string, field: string, questions?: Array<{ __typename?: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDescriptionBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionRelatedActionsBlock' } | { __typename?: 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionScheduleBlock' | 'ActionScheduleFilterBlock' | 'ActionTasksBlock' | 'ActionTextAttributeTypeReportFieldBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeFilterBlock' | 'CharBlock' | 'ChoiceBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' } | { __typename?: 'EmailBlock' | 'EmbedBlock' | 'FloatBlock' | 'FrontPageHeroBlock' | 'ImageChooserBlock' | 'IndicatorBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorShowcaseBlock' | 'IntegerBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportFieldBlock' | 'ResponsiblePartyFilterBlock' } | { __typename?: 'RichTextBlock' | 'StaticBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' } | (
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
          { title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX?: number | null, focalPointY?: number | null, large?: (
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
          { id?: string | null, title: string, urlPath: string }
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
    { leadContent?: string | null, id?: string | null, slug: string, title: string, lastPublishedAt?: any | null }
    & { __typename: 'IndicatorListPage' }
  ) | null }
  & { __typename?: 'Query' }
);

export type PlanSiteQueryVariables = Exact<{
  identifier: Scalars['ID'];
}>;


export type PlanSiteQuery = (
  { plan?: (
    { pages?: Array<(
      { urlPath: string }
      & { __typename?: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    ) | null> | null, actions: Array<(
      { identifier: string }
      & { __typename?: 'Action' }
    ) | null>, impactGroups: Array<(
      { identifier: string }
      & { __typename?: 'ImpactGroup' }
    ) | null> }
    & { __typename?: 'Plan' }
  ) | null, planIndicators?: Array<(
    { id: string }
    & { __typename?: 'Indicator' }
  ) | null> | null }
  & { __typename?: 'Query' }
);
