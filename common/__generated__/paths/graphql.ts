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
  DateTime: any;
  JSONString: any;
  PositiveInt: any;
  RichText: any;
  UUID: any;
};

export type ActionEfficiency = {
  __typename?: 'ActionEfficiency';
  action: ActionNode;
  costDim: DimensionalMetricType;
  costValues: Array<Maybe<YearlyValue>>;
  efficiencyDivisor?: Maybe<Scalars['Float']>;
  impactDim: DimensionalMetricType;
  impactValues: Array<Maybe<YearlyValue>>;
  unitAdjustmentMultiplier?: Maybe<Scalars['Float']>;
};

export type ActionEfficiencyPairType = {
  __typename?: 'ActionEfficiencyPairType';
  actions: Array<ActionEfficiency>;
  costCutpoint?: Maybe<Scalars['Float']>;
  costNode: Node;
  costUnit: UnitType;
  efficiencyUnit: UnitType;
  graphType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  impactNode: Node;
  impactUnit: UnitType;
  indicatorCutpoint?: Maybe<Scalars['Float']>;
  indicatorUnit: UnitType;
  invertCost: Scalars['Boolean'];
  invertImpact: Scalars['Boolean'];
  label: Scalars['String'];
  plotLimitEfficiency?: Maybe<Scalars['Float']>;
  plotLimitForIndicator?: Maybe<Scalars['Float']>;
};

export type ActionGroupType = {
  __typename?: 'ActionGroupType';
  actions: Array<ActionNode>;
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ActionListPage = PageInterface & {
  __typename?: 'ActionListPage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
  defaultSortOrder: ActionSortOrder;
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
  leadParagraph?: Maybe<Scalars['String']>;
  leadTitle?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  lockedBy?: Maybe<UserType>;
  numchild: Scalars['Int'];
  owner?: Maybe<UserType>;
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showActionComparison?: Maybe<Scalars['Boolean']>;
  showCumulativeImpact?: Maybe<Scalars['Boolean']>;
  showInFooter: Scalars['Boolean'];
  showInMenus: Scalars['Boolean'];
  showOnlyMunicipalActions?: Maybe<Scalars['Boolean']>;
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


export type ActionListPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type ActionNode = NodeInterface & {
  __typename?: 'ActionNode';
  body?: Maybe<Array<StreamFieldInterface>>;
  color?: Maybe<Scalars['String']>;
  decisionLevel?: Maybe<DecisionLevel>;
  description?: Maybe<Scalars['String']>;
  dimensionalFlow?: Maybe<DimensionalFlowType>;
  downstreamNodes: Array<NodeInterface>;
  explanation?: Maybe<Scalars['String']>;
  goal?: Maybe<Scalars['RichText']>;
  goals: Array<NodeGoal>;
  group?: Maybe<ActionGroupType>;
  id: Scalars['ID'];
  impactMetric?: Maybe<ForecastMetricType>;
  indicatorNode?: Maybe<Node>;
  inputNodes: Array<NodeInterface>;
  /** @deprecated Use __typeName instead */
  isAction: Scalars['Boolean'];
  isEnabled: Scalars['Boolean'];
  isVisible: Scalars['Boolean'];
  metric?: Maybe<ForecastMetricType>;
  metricDim?: Maybe<DimensionalMetricType>;
  metrics?: Maybe<Array<ForecastMetricType>>;
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  outcome?: Maybe<DimensionalMetricType>;
  outputNodes: Array<NodeInterface>;
  parameters: Array<ParameterInterface>;
  parentAction?: Maybe<ActionNode>;
  quantity?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['RichText']>;
  shortName?: Maybe<Scalars['String']>;
  subactions: Array<ActionNode>;
  /** @deprecated Replaced by "goals". */
  targetYearGoal?: Maybe<Scalars['Float']>;
  unit?: Maybe<UnitType>;
  upstreamNodes: Array<NodeInterface>;
};


export type ActionNodeDownstreamNodesArgs = {
  maxDepth?: InputMaybe<Scalars['Int']>;
};


export type ActionNodeGoalsArgs = {
  activeGoal?: InputMaybe<Scalars['ID']>;
};


export type ActionNodeImpactMetricArgs = {
  goalId?: InputMaybe<Scalars['ID']>;
  targetNodeId?: InputMaybe<Scalars['ID']>;
};


export type ActionNodeMetricArgs = {
  goalId?: InputMaybe<Scalars['ID']>;
};


export type ActionNodeUpstreamNodesArgs = {
  includeActions?: InputMaybe<Scalars['Boolean']>;
  sameQuantity?: InputMaybe<Scalars['Boolean']>;
  sameUnit?: InputMaybe<Scalars['Boolean']>;
};

/** An enumeration. */
export enum ActionSortOrder {
  /** Cumulative impact */
  CumImpact = 'CUM_IMPACT',
  /** Impact */
  Impact = 'IMPACT',
  /** Standard */
  Standard = 'STANDARD'
}

export type ActivateScenarioMutation = {
  __typename?: 'ActivateScenarioMutation';
  activeScenario?: Maybe<ScenarioType>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type BlockQuoteBlock = StreamFieldInterface & {
  __typename?: 'BlockQuoteBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type BoolParameterType = ParameterInterface & {
  __typename?: 'BoolParameterType';
  defaultValue?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  /** Global ID for the parameter in the instance */
  id: Scalars['ID'];
  isCustomizable: Scalars['Boolean'];
  isCustomized: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  /** ID of parameter in the node's namespace */
  localId?: Maybe<Scalars['ID']>;
  node?: Maybe<NodeInterface>;
  nodeRelativeId?: Maybe<Scalars['ID']>;
  value?: Maybe<Scalars['Boolean']>;
};

export type BooleanBlock = StreamFieldInterface & {
  __typename?: 'BooleanBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Boolean'];
};

export type CardListBlock = StreamFieldInterface & {
  __typename?: 'CardListBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  cards?: Maybe<Array<Maybe<CardListCardBlock>>>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type CardListCardBlock = {
  __typename?: 'CardListCardBlock';
  shortDescription?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

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
  depth: Scalars['Int'];
  descendants: Array<Maybe<CollectionObjectType>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  numchild: Scalars['Int'];
  path: Scalars['String'];
};

export type CreateFrameworkConfigMutation = {
  __typename?: 'CreateFrameworkConfigMutation';
  /** The created framework config instance. */
  frameworkConfig?: Maybe<FrameworkConfig>;
  ok: Scalars['Boolean'];
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

/** An enumeration. */
export enum DecisionLevel {
  Eu = 'EU',
  Municipality = 'MUNICIPALITY',
  Nation = 'NATION'
}

export type DeleteFrameworkConfigMutation = {
  __typename?: 'DeleteFrameworkConfigMutation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type DimensionalFlowType = {
  __typename?: 'DimensionalFlowType';
  id: Scalars['String'];
  links: Array<FlowLinksType>;
  nodes: Array<FlowNodeType>;
  sources: Array<Scalars['String']>;
  unit: UnitType;
};

export type DimensionalMetricGoalEntry = {
  __typename?: 'DimensionalMetricGoalEntry';
  categories: Array<Scalars['String']>;
  groups: Array<Scalars['String']>;
  values: Array<MetricYearlyGoalType>;
};

export type DimensionalMetricType = {
  __typename?: 'DimensionalMetricType';
  dimensions: Array<MetricDimensionType>;
  forecastFrom?: Maybe<Scalars['Int']>;
  goals: Array<DimensionalMetricGoalEntry>;
  id: Scalars['ID'];
  name: Scalars['String'];
  normalizedBy?: Maybe<Node>;
  stackable: Scalars['Boolean'];
  unit: UnitType;
  values: Array<Maybe<Scalars['Float']>>;
  years: Array<Scalars['Int']>;
};

export type DocumentChooserBlock = StreamFieldInterface & {
  __typename?: 'DocumentChooserBlock';
  blockType: Scalars['String'];
  document?: Maybe<DocumentObjectType>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

/**
 * Base document type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type DocumentObjectType = {
  __typename?: 'DocumentObjectType';
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  uploadedByUser?: Maybe<UserType>;
  url: Scalars['String'];
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

export type FloatBlock = StreamFieldInterface & {
  __typename?: 'FloatBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Float'];
};

export type FlowLinksType = {
  __typename?: 'FlowLinksType';
  absoluteSourceValues: Array<Scalars['Float']>;
  isForecast: Scalars['Boolean'];
  sources: Array<Scalars['String']>;
  targets: Array<Scalars['String']>;
  values: Array<Maybe<Scalars['Float']>>;
  year: Scalars['Int'];
};

export type FlowNodeType = {
  __typename?: 'FlowNodeType';
  color?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  label: Scalars['String'];
};

export type ForecastMetricType = {
  __typename?: 'ForecastMetricType';
  baselineForecastValues?: Maybe<Array<YearlyValue>>;
  cumulativeForecastValue?: Maybe<Scalars['Float']>;
  forecastValues: Array<YearlyValue>;
  historicalValues: Array<YearlyValue>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  /** Will be set if the node outputs multiple time-series */
  outputNode?: Maybe<Node>;
  unit?: Maybe<UnitType>;
  yearlyCumulativeUnit?: Maybe<UnitType>;
};


export type ForecastMetricTypeHistoricalValuesArgs = {
  latest?: InputMaybe<Scalars['Int']>;
};

/**
 * Represents a framework for Paths models
 *
 * A framework is a combination of a common computation model,
 * a set of measures (with their default, fallback values),
 * the data that is collected per model instance, and classifications
 * for the default values.
 *
 * This model defines the common metadata for a model, including its name
 * and description. It serves as the top-level container for related components
 * such as dimensions, sections, and measure templates.
 *
 * Attributes:
 *     name (CharField): The name of the framework, limited to 200 characters.
 *     description (TextField): An optional description of the framework.
 */
export type Framework = {
  __typename?: 'Framework';
  config?: Maybe<FrameworkConfig>;
  configs: Array<FrameworkConfig>;
  description: Scalars['String'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  measureTemplate?: Maybe<MeasureTemplate>;
  name: Scalars['String'];
  section?: Maybe<Section>;
  sections: Array<Section>;
};


/**
 * Represents a framework for Paths models
 *
 * A framework is a combination of a common computation model,
 * a set of measures (with their default, fallback values),
 * the data that is collected per model instance, and classifications
 * for the default values.
 *
 * This model defines the common metadata for a model, including its name
 * and description. It serves as the top-level container for related components
 * such as dimensions, sections, and measure templates.
 *
 * Attributes:
 *     name (CharField): The name of the framework, limited to 200 characters.
 *     description (TextField): An optional description of the framework.
 */
export type FrameworkConfigArgs = {
  id: Scalars['ID'];
};


/**
 * Represents a framework for Paths models
 *
 * A framework is a combination of a common computation model,
 * a set of measures (with their default, fallback values),
 * the data that is collected per model instance, and classifications
 * for the default values.
 *
 * This model defines the common metadata for a model, including its name
 * and description. It serves as the top-level container for related components
 * such as dimensions, sections, and measure templates.
 *
 * Attributes:
 *     name (CharField): The name of the framework, limited to 200 characters.
 *     description (TextField): An optional description of the framework.
 */
export type FrameworkMeasureTemplateArgs = {
  id: Scalars['ID'];
};


/**
 * Represents a framework for Paths models
 *
 * A framework is a combination of a common computation model,
 * a set of measures (with their default, fallback values),
 * the data that is collected per model instance, and classifications
 * for the default values.
 *
 * This model defines the common metadata for a model, including its name
 * and description. It serves as the top-level container for related components
 * such as dimensions, sections, and measure templates.
 *
 * Attributes:
 *     name (CharField): The name of the framework, limited to 200 characters.
 *     description (TextField): An optional description of the framework.
 */
export type FrameworkSectionArgs = {
  identifier: Scalars['ID'];
};

/**
 * Represents a configuration of a Framework for a specific instance.
 *
 * This model links a Framework to an InstanceConfig, allowing for customization
 * of framework settings for each organization or instance. It includes fields
 * for specifying the organization name, baseline year, and associated categories.
 */
export type FrameworkConfig = {
  __typename?: 'FrameworkConfig';
  baselineYear: Scalars['Int'];
  framework: Framework;
  id: Scalars['ID'];
  instance?: Maybe<InstanceType>;
  measures: Array<Measure>;
  organizationName: Scalars['String'];
  /** URL for downloading a results file */
  resultsDownloadUrl?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
  /** Public URL for instance dashboard */
  viewUrl?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum FrameworksMeasureTemplatePriorityChoices {
  /** High */
  High = 'HIGH',
  /** Low */
  Low = 'LOW',
  /** Medium */
  Medium = 'MEDIUM'
}

export type ImageChooserBlock = StreamFieldInterface & {
  __typename?: 'ImageChooserBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  image?: Maybe<ImageObjectType>;
  rawValue: Scalars['String'];
};

export type ImageObjectType = {
  __typename?: 'ImageObjectType';
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
  id: Scalars['ID'];
  isSvg: Scalars['Boolean'];
  rendition?: Maybe<ImageRenditionObjectType>;
  renditions: Array<ImageRenditionObjectType>;
  sizes: Scalars['String'];
  /** @deprecated Use the `url` attribute */
  src: Scalars['String'];
  srcSet?: Maybe<Scalars['String']>;
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  uploadedByUser?: Maybe<UserType>;
  url: Scalars['String'];
  width: Scalars['Int'];
};


export type ImageObjectTypeRenditionArgs = {
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


export type ImageObjectTypeSrcSetArgs = {
  format?: InputMaybe<Scalars['String']>;
  preserveSvg?: InputMaybe<Scalars['Boolean']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type ImageRenditionObjectType = {
  __typename?: 'ImageRenditionObjectType';
  alt: Scalars['String'];
  backgroundPositionStyle: Scalars['String'];
  file: Scalars['String'];
  filterSpec: Scalars['String'];
  focalPoint?: Maybe<Scalars['String']>;
  focalPointKey: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  image: ImageObjectType;
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type InstanceBasicConfiguration = {
  __typename?: 'InstanceBasicConfiguration';
  defaultLanguage: Scalars['String'];
  hostname: InstanceHostname;
  identifier: Scalars['String'];
  isProtected: Scalars['Boolean'];
  supportedLanguages: Array<Scalars['String']>;
  themeIdentifier: Scalars['String'];
};

export type InstanceFeaturesType = {
  __typename?: 'InstanceFeaturesType';
  baselineVisibleInGraphs: Scalars['Boolean'];
  showAccumulatedEffects: Scalars['Boolean'];
  showSignificantDigits: Scalars['Int'];
};

export type InstanceGoalDimension = {
  __typename?: 'InstanceGoalDimension';
  categories: Array<Scalars['String']>;
  /** @deprecated replaced with categories */
  category: Scalars['String'];
  dimension: Scalars['String'];
  groups: Array<Scalars['String']>;
};

export type InstanceGoalEntry = {
  __typename?: 'InstanceGoalEntry';
  default: Scalars['Boolean'];
  dimensions: Array<InstanceGoalDimension>;
  disableReason?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  outcomeNode: Node;
  unit: UnitType;
  values: Array<InstanceYearlyGoalType>;
};

export type InstanceHostname = {
  __typename?: 'InstanceHostname';
  basePath?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
};

export type InstanceRootPage = PageInterface & {
  __typename?: 'InstanceRootPage';
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
  lockedBy?: Maybe<UserType>;
  numchild: Scalars['Int'];
  owner?: Maybe<UserType>;
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInFooter: Scalars['Boolean'];
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type InstanceRootPageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type InstanceRootPageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type InstanceRootPageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type InstanceRootPageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type InstanceSiteContent = {
  __typename?: 'InstanceSiteContent';
  id?: Maybe<Scalars['ID']>;
  introContent?: Maybe<Array<Maybe<StreamFieldInterface>>>;
};

export type InstanceType = {
  __typename?: 'InstanceType';
  actionGroups: Array<ActionGroupType>;
  actionListPage?: Maybe<ActionListPage>;
  basePath: Scalars['String'];
  defaultLanguage: Scalars['String'];
  features: InstanceFeaturesType;
  goals: Array<InstanceGoalEntry>;
  hostname?: Maybe<InstanceHostname>;
  id: Scalars['ID'];
  introContent?: Maybe<Array<StreamFieldInterface>>;
  leadParagraph?: Maybe<Scalars['String']>;
  leadTitle?: Maybe<Scalars['String']>;
  maximumHistoricalYear?: Maybe<Scalars['Int']>;
  minimumHistoricalYear: Scalars['Int'];
  modelEndYear: Scalars['Int'];
  name: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
  referenceYear?: Maybe<Scalars['Int']>;
  supportedLanguages: Array<Scalars['String']>;
  targetYear?: Maybe<Scalars['Int']>;
  themeIdentifier?: Maybe<Scalars['String']>;
};


export type InstanceTypeGoalsArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type InstanceTypeHostnameArgs = {
  hostname: Scalars['String'];
};

export type InstanceYearlyGoalType = {
  __typename?: 'InstanceYearlyGoalType';
  actual?: Maybe<Scalars['Float']>;
  goal?: Maybe<Scalars['Float']>;
  isForecast: Scalars['Boolean'];
  isInterpolated?: Maybe<Scalars['Boolean']>;
  year: Scalars['Int'];
};

export type IntegerBlock = StreamFieldInterface & {
  __typename?: 'IntegerBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Int'];
};

export type ListBlock = StreamFieldInterface & {
  __typename?: 'ListBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  items: Array<StreamFieldInterface>;
  rawValue: Scalars['String'];
};

/**
 * Represents the concrete measure for an organization-specific Instance.
 *
 * This model links a MeasureTemplate to a FrameworkConfig, allowing for
 * organization-specific instances of measures. It can override the unit
 * from the template and store internal notes.
 */
export type Measure = {
  __typename?: 'Measure';
  dataPoints: Array<MeasureDataPoint>;
  frameworkConfig: FrameworkConfig;
  id: Scalars['ID'];
  internalNotes: Scalars['String'];
  measureTemplate: MeasureTemplate;
  unit?: Maybe<UnitType>;
};

/**
 * Represents a specific data point for a Measure.
 *
 * This model stores the actual value for a specific year for a given Measure.
 * It provides a way to record and track the data points over time for each
 * organization-specific measure instance.
 */
export type MeasureDataPoint = {
  __typename?: 'MeasureDataPoint';
  id: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MeasureDataPointInput = {
  /** Value for the data point (set to null to remove) */
  value?: InputMaybe<Scalars['Float']>;
  /** Year of the data point. If not given, defaults to the baseline year for the framework instance */
  year?: InputMaybe<Scalars['Int']>;
};

export type MeasureInput = {
  dataPoints?: InputMaybe<Array<MeasureDataPointInput>>;
  /** Internal notes for the measure instance */
  internalNotes?: InputMaybe<Scalars['String']>;
  /** ID (or UUID) of the measure template within a framework */
  measureTemplateId: Scalars['ID'];
};

/**
 * Represents a template for measures within a framework.
 *
 * This model defines the structure and attributes of a measure template,
 * which is used to hold the metadata for the organization-specific
 * measure instances.
 *
 * Attributes:
 *     section (ForeignKey): A reference to the Section this measure template belongs to.
 */
export type MeasureTemplate = {
  __typename?: 'MeasureTemplate';
  defaultDataPoints: Array<MeasureTemplateDefaultDataPoint>;
  defaultValueSource: Scalars['String'];
  id: Scalars['ID'];
  maxValue?: Maybe<Scalars['Float']>;
  measure?: Maybe<Measure>;
  minValue?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  priority: FrameworksMeasureTemplatePriorityChoices;
  timeSeriesMax?: Maybe<Scalars['Float']>;
  unit: UnitType;
  uuid: Scalars['UUID'];
};


/**
 * Represents a template for measures within a framework.
 *
 * This model defines the structure and attributes of a measure template,
 * which is used to hold the metadata for the organization-specific
 * measure instances.
 *
 * Attributes:
 *     section (ForeignKey): A reference to the Section this measure template belongs to.
 */
export type MeasureTemplateMeasureArgs = {
  frameworkConfigId: Scalars['ID'];
};

/**
 * Represents a default (fallback) value for a measure template.
 *
 * This model stores default values for specific years and category combinations
 * for a template. These fallback values can be used when actual data
 * is not available for a specific instance.
 */
export type MeasureTemplateDefaultDataPoint = {
  __typename?: 'MeasureTemplateDefaultDataPoint';
  id: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MetricDimensionCategoryGroupType = {
  __typename?: 'MetricDimensionCategoryGroupType';
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  label: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  originalId: Scalars['ID'];
};

export type MetricDimensionCategoryType = {
  __typename?: 'MetricDimensionCategoryType';
  color?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  label: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  originalId?: Maybe<Scalars['ID']>;
};

export type MetricDimensionType = {
  __typename?: 'MetricDimensionType';
  categories: Array<MetricDimensionCategoryType>;
  groups: Array<MetricDimensionCategoryGroupType>;
  helpText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  label: Scalars['String'];
  originalId?: Maybe<Scalars['ID']>;
};

export type MetricYearlyGoalType = {
  __typename?: 'MetricYearlyGoalType';
  isInterpolated: Scalars['Boolean'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type Mutations = {
  __typename?: 'Mutations';
  activateScenario?: Maybe<ActivateScenarioMutation>;
  createFrameworkConfig?: Maybe<CreateFrameworkConfigMutation>;
  deleteFrameworkConfig?: Maybe<DeleteFrameworkConfigMutation>;
  registerUser?: Maybe<RegisterUser>;
  resetParameter?: Maybe<ResetParameterMutation>;
  setNormalizer?: Maybe<SetNormalizerMutation>;
  setParameter?: Maybe<SetParameterMutation>;
  updateFrameworkConfig?: Maybe<UpdateFrameworkConfigMutation>;
  updateMeasureDataPoint?: Maybe<UpdateMeasureDataPoint>;
  updateMeasureDataPoints?: Maybe<UpdateMeasureDataPoints>;
};


export type MutationsActivateScenarioArgs = {
  id: Scalars['ID'];
};


export type MutationsCreateFrameworkConfigArgs = {
  baselineYear: Scalars['Int'];
  frameworkId: Scalars['ID'];
  instanceIdentifier: Scalars['ID'];
  name: Scalars['String'];
  uuid?: InputMaybe<Scalars['UUID']>;
};


export type MutationsDeleteFrameworkConfigArgs = {
  id: Scalars['ID'];
};


export type MutationsRegisterUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationsResetParameterArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationsSetNormalizerArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationsSetParameterArgs = {
  boolValue?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  numberValue?: InputMaybe<Scalars['Float']>;
  stringValue?: InputMaybe<Scalars['String']>;
};


export type MutationsUpdateFrameworkConfigArgs = {
  baselineYear?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  organizationName?: InputMaybe<Scalars['String']>;
};


export type MutationsUpdateMeasureDataPointArgs = {
  frameworkInstanceId: Scalars['ID'];
  internalNotes?: InputMaybe<Scalars['String']>;
  measureTemplateId: Scalars['ID'];
  value?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationsUpdateMeasureDataPointsArgs = {
  frameworkConfigId: Scalars['ID'];
  measures: Array<MeasureInput>;
};

export type Node = NodeInterface & {
  __typename?: 'Node';
  body?: Maybe<Array<StreamFieldInterface>>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dimensionalFlow?: Maybe<DimensionalFlowType>;
  downstreamNodes: Array<NodeInterface>;
  explanation?: Maybe<Scalars['String']>;
  goals: Array<NodeGoal>;
  id: Scalars['ID'];
  impactMetric?: Maybe<ForecastMetricType>;
  inputNodes: Array<NodeInterface>;
  /** @deprecated Use __typeName instead */
  isAction: Scalars['Boolean'];
  isVisible: Scalars['Boolean'];
  metric?: Maybe<ForecastMetricType>;
  metricDim?: Maybe<DimensionalMetricType>;
  metrics?: Maybe<Array<ForecastMetricType>>;
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  outcome?: Maybe<DimensionalMetricType>;
  outputNodes: Array<NodeInterface>;
  parameters: Array<ParameterInterface>;
  quantity?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['RichText']>;
  shortName?: Maybe<Scalars['String']>;
  /** @deprecated Replaced by "goals". */
  targetYearGoal?: Maybe<Scalars['Float']>;
  unit?: Maybe<UnitType>;
  upstreamActions?: Maybe<Array<ActionNode>>;
  upstreamNodes: Array<NodeInterface>;
};


export type NodeDownstreamNodesArgs = {
  maxDepth?: InputMaybe<Scalars['Int']>;
};


export type NodeGoalsArgs = {
  activeGoal?: InputMaybe<Scalars['ID']>;
};


export type NodeImpactMetricArgs = {
  goalId?: InputMaybe<Scalars['ID']>;
  targetNodeId?: InputMaybe<Scalars['ID']>;
};


export type NodeMetricArgs = {
  goalId?: InputMaybe<Scalars['ID']>;
};


export type NodeUpstreamActionsArgs = {
  decisionLevel?: InputMaybe<DecisionLevel>;
  onlyRoot?: InputMaybe<Scalars['Boolean']>;
};


export type NodeUpstreamNodesArgs = {
  includeActions?: InputMaybe<Scalars['Boolean']>;
  sameQuantity?: InputMaybe<Scalars['Boolean']>;
  sameUnit?: InputMaybe<Scalars['Boolean']>;
};

export type NodeGoal = {
  __typename?: 'NodeGoal';
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type NodeInterface = {
  body?: Maybe<Array<StreamFieldInterface>>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dimensionalFlow?: Maybe<DimensionalFlowType>;
  downstreamNodes: Array<NodeInterface>;
  explanation?: Maybe<Scalars['String']>;
  goals: Array<NodeGoal>;
  id: Scalars['ID'];
  impactMetric?: Maybe<ForecastMetricType>;
  inputNodes: Array<NodeInterface>;
  /** @deprecated Use __typeName instead */
  isAction: Scalars['Boolean'];
  isVisible: Scalars['Boolean'];
  metric?: Maybe<ForecastMetricType>;
  metricDim?: Maybe<DimensionalMetricType>;
  metrics?: Maybe<Array<ForecastMetricType>>;
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  outcome?: Maybe<DimensionalMetricType>;
  outputNodes: Array<NodeInterface>;
  parameters: Array<ParameterInterface>;
  quantity?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['RichText']>;
  shortName?: Maybe<Scalars['String']>;
  /** @deprecated Replaced by "goals". */
  targetYearGoal?: Maybe<Scalars['Float']>;
  unit?: Maybe<UnitType>;
  upstreamNodes: Array<NodeInterface>;
};


export type NodeInterfaceDownstreamNodesArgs = {
  maxDepth?: InputMaybe<Scalars['Int']>;
};


export type NodeInterfaceGoalsArgs = {
  activeGoal?: InputMaybe<Scalars['ID']>;
};


export type NodeInterfaceImpactMetricArgs = {
  goalId?: InputMaybe<Scalars['ID']>;
  targetNodeId?: InputMaybe<Scalars['ID']>;
};


export type NodeInterfaceMetricArgs = {
  goalId?: InputMaybe<Scalars['ID']>;
};


export type NodeInterfaceUpstreamNodesArgs = {
  includeActions?: InputMaybe<Scalars['Boolean']>;
  sameQuantity?: InputMaybe<Scalars['Boolean']>;
  sameUnit?: InputMaybe<Scalars['Boolean']>;
};

export type NormalizationType = {
  __typename?: 'NormalizationType';
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  label: Scalars['String'];
  normalizer: Node;
};

export type NumberParameterType = ParameterInterface & {
  __typename?: 'NumberParameterType';
  defaultValue?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  /** Global ID for the parameter in the instance */
  id: Scalars['ID'];
  isCustomizable: Scalars['Boolean'];
  isCustomized: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  /** ID of parameter in the node's namespace */
  localId?: Maybe<Scalars['ID']>;
  maxValue?: Maybe<Scalars['Float']>;
  minValue?: Maybe<Scalars['Float']>;
  node?: Maybe<NodeInterface>;
  nodeRelativeId?: Maybe<Scalars['ID']>;
  step?: Maybe<Scalars['Float']>;
  unit?: Maybe<UnitType>;
  value?: Maybe<Scalars['Float']>;
};

export type OutcomePage = PageInterface & {
  __typename?: 'OutcomePage';
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
  i18n?: Maybe<Scalars['JSONString']>;
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  leadParagraph: Scalars['String'];
  leadTitle: Scalars['String'];
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  lockedBy?: Maybe<UserType>;
  numchild: Scalars['Int'];
  outcomeNode: Node;
  owner?: Maybe<UserType>;
  pagePtr: Page;
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInFooter?: Maybe<Scalars['Boolean']>;
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type OutcomePageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type OutcomePageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type OutcomePageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type OutcomePageSiblingsArgs = {
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
export type Page = PageInterface & {
  __typename?: 'Page';
  actionlistpage?: Maybe<ActionListPage>;
  aliasOf?: Maybe<Page>;
  aliases: Array<Page>;
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
  instancerootpage?: Maybe<InstanceRootPage>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  lockedBy?: Maybe<UserType>;
  numchild: Scalars['Int'];
  outcomepage?: Maybe<OutcomePage>;
  owner?: Maybe<UserType>;
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
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
  page?: Maybe<PageInterface>;
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
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
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


export type PageInterfaceSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type ParameterInterface = {
  description?: Maybe<Scalars['String']>;
  /** Global ID for the parameter in the instance */
  id: Scalars['ID'];
  isCustomizable: Scalars['Boolean'];
  isCustomized: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  /** ID of parameter in the node's namespace */
  localId?: Maybe<Scalars['ID']>;
  node?: Maybe<NodeInterface>;
  nodeRelativeId?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  action?: Maybe<ActionNode>;
  actionEfficiencyPairs: Array<ActionEfficiencyPairType>;
  actions: Array<ActionNode>;
  activeNormalization?: Maybe<NormalizationType>;
  activeScenario?: Maybe<ScenarioType>;
  availableInstances: Array<InstanceBasicConfiguration>;
  availableNormalizations: Array<NormalizationType>;
  framework?: Maybe<Framework>;
  frameworks?: Maybe<Array<Framework>>;
  impactOverviews: Array<ActionEfficiencyPairType>;
  instance: InstanceType;
  me?: Maybe<UserType>;
  node?: Maybe<NodeInterface>;
  nodes: Array<NodeInterface>;
  page?: Maybe<PageInterface>;
  pages: Array<PageInterface>;
  parameter?: Maybe<ParameterInterface>;
  parameters: Array<ParameterInterface>;
  scenario?: Maybe<ScenarioType>;
  scenarios: Array<ScenarioType>;
  serverDeployment: ServerDeployment;
  unit?: Maybe<UnitType>;
};


export type QueryActionArgs = {
  id: Scalars['ID'];
};


export type QueryActionsArgs = {
  onlyRoot?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAvailableInstancesArgs = {
  hostname?: InputMaybe<Scalars['String']>;
};


export type QueryFrameworkArgs = {
  identifier: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryPageArgs = {
  path: Scalars['String'];
};


export type QueryPagesArgs = {
  inMenu?: InputMaybe<Scalars['Boolean']>;
};


export type QueryParameterArgs = {
  id: Scalars['ID'];
};


export type QueryScenarioArgs = {
  id: Scalars['ID'];
};


export type QueryUnitArgs = {
  value: Scalars['String'];
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

export type RegisterUser = {
  __typename?: 'RegisterUser';
  user?: Maybe<UserType>;
};

export type ResetParameterMutation = {
  __typename?: 'ResetParameterMutation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type RichTextBlock = StreamFieldInterface & {
  __typename?: 'RichTextBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ScenarioType = {
  __typename?: 'ScenarioType';
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

/**
 * Represents a section within a framework.
 *
 * This model defines a hierarchical structure for organizing framework measures.
 * Each section can contain subsections and measure templates.
 */
export type Section = {
  __typename?: 'Section';
  availableYears?: Maybe<Array<Scalars['Int']>>;
  children: Array<Section>;
  descendants: Array<Section>;
  description: Scalars['String'];
  id: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
  measureTemplates: Array<MeasureTemplate>;
  name: Scalars['String'];
  parent?: Maybe<Section>;
  path: Scalars['String'];
  uuid: Scalars['UUID'];
};

export type ServerDeployment = {
  __typename?: 'ServerDeployment';
  buildId?: Maybe<Scalars['String']>;
  deploymentType?: Maybe<Scalars['String']>;
  gitRevision?: Maybe<Scalars['String']>;
};

export type SetNormalizerMutation = {
  __typename?: 'SetNormalizerMutation';
  activeNormalization?: Maybe<NormalizationType>;
  ok: Scalars['Boolean'];
};

export type SetParameterMutation = {
  __typename?: 'SetParameterMutation';
  ok?: Maybe<Scalars['Boolean']>;
  parameter?: Maybe<ParameterInterface>;
};

export type SiteObjectType = {
  __typename?: 'SiteObjectType';
  hostname: Scalars['String'];
  id: Scalars['ID'];
  /** If true, this site will handle requests for all other hostnames that do not have a site entry of their own */
  isDefaultSite: Scalars['Boolean'];
  page?: Maybe<PageInterface>;
  pages: Array<PageInterface>;
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

export type SnippetChooserBlock = StreamFieldInterface & {
  __typename?: 'SnippetChooserBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  snippet?: Maybe<SnippetObjectType>;
};

export type SnippetObjectType = InstanceSiteContent;

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
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  lockedBy?: Maybe<UserType>;
  numchild: Scalars['Int'];
  owner?: Maybe<UserType>;
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInFooter: Scalars['Boolean'];
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

export type StringParameterType = ParameterInterface & {
  __typename?: 'StringParameterType';
  defaultValue?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** Global ID for the parameter in the instance */
  id: Scalars['ID'];
  isCustomizable: Scalars['Boolean'];
  isCustomized: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  /** ID of parameter in the node's namespace */
  localId?: Maybe<Scalars['ID']>;
  node?: Maybe<NodeInterface>;
  nodeRelativeId?: Maybe<Scalars['ID']>;
  value?: Maybe<Scalars['String']>;
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

export type UnitType = {
  __typename?: 'UnitType';
  htmlLong: Scalars['String'];
  htmlShort: Scalars['String'];
  long: Scalars['String'];
  short: Scalars['String'];
};

export type UnknownParameterType = ParameterInterface & {
  __typename?: 'UnknownParameterType';
  description?: Maybe<Scalars['String']>;
  /** Global ID for the parameter in the instance */
  id: Scalars['ID'];
  isCustomizable: Scalars['Boolean'];
  isCustomized: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  /** ID of parameter in the node's namespace */
  localId?: Maybe<Scalars['ID']>;
  node?: Maybe<NodeInterface>;
  nodeRelativeId?: Maybe<Scalars['ID']>;
};

export type UpdateFrameworkConfigMutation = {
  __typename?: 'UpdateFrameworkConfigMutation';
  frameworkConfig?: Maybe<FrameworkConfig>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpdateMeasureDataPoint = {
  __typename?: 'UpdateMeasureDataPoint';
  measureDataPoint?: Maybe<MeasureDataPoint>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpdateMeasureDataPoints = {
  __typename?: 'UpdateMeasureDataPoints';
  createdDataPoints?: Maybe<Array<Maybe<MeasureDataPoint>>>;
  deletedDataPointCount: Scalars['Int'];
  ok?: Maybe<Scalars['Boolean']>;
  updatedDataPoints?: Maybe<Array<Maybe<MeasureDataPoint>>>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type YearlyValue = {
  __typename?: 'YearlyValue';
  value: Scalars['Float'];
  year: Scalars['Int'];
};