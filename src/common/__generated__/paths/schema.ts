export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSON: { input: Record<string, unknown> | unknown[]; output: Record<string, unknown> | unknown[]; }
  JSONString: { input: string; output: string; }
  PositiveInt: { input: number; output: number; }
  RichText: { input: string; output: string; }
  UUID: { input: string; output: string; }
  _Any: { input: unknown; output: unknown; }
};

export type ActionConfigInput = {
  decisionLevel?: InputMaybe<DecisionLevel>;
  group?: InputMaybe<Scalars['UUID']['input']>;
  noEffectValue?: InputMaybe<Scalars['Float']['input']>;
  nodeClass: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
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

export type AllowedCombinationsRuleInput = {
  enforcement: DatasetRuleEnforcement;
};

export type AssignCategoryInput = {
  category: Scalars['String']['input'];
  dimension: Scalars['String']['input'];
};

export type AssignDimensionInput = {
  category: Scalars['String']['input'];
  dimension: Scalars['String']['input'];
};

/** Bind a dataset metric to an existing input port on a node. */
export type BindDatasetInput = {
  /** UUID or identifier of the dataset to bind. */
  datasetId: Scalars['ID']['input'];
  /** Dataset metric this binding carries. May be omitted only when the dataset exposes exactly one metric. */
  metricId?: InputMaybe<Scalars['ID']['input']>;
  /** Input port to bind to. The port must already exist. */
  portId: Scalars['ID']['input'];
  /** Atomically displace whatever occupies the port — an edge or a dataset binding — instead of rejecting the bind. Validation runs first, so a rejected bind leaves the old binding untouched. Not valid for `multi` ports; delete a specific binding there. */
  replace?: Scalars['Boolean']['input'];
  /** Transformations to apply. When omitted, a working default list is generated; an explicit empty list means none, which a metric-named binding rejects. */
  transformations?: InputMaybe<Array<DatasetTransformationInput>>;
};

export enum ChangeTargetKind {
  ActionGroup = 'ACTION_GROUP',
  DatasetPort = 'DATASET_PORT',
  DataPoint = 'DATA_POINT',
  Dimension = 'DIMENSION',
  DimensionCategory = 'DIMENSION_CATEGORY',
  Edge = 'EDGE',
  Instance = 'INSTANCE',
  Node = 'NODE',
  Unknown = 'UNKNOWN'
}

export type CreateActionGroupInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  /** Optional UUID for the new action group. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nextSibling?: InputMaybe<Scalars['UUID']['input']>;
  previousSibling?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateDataPointCommentInput = {
  isReview?: Scalars['Boolean']['input'];
  isSticky?: Scalars['Boolean']['input'];
  reviewState?: InputMaybe<DataPointCommentReviewState>;
  text: Scalars['String']['input'];
};

export type CreateDataPointInput = {
  date: Scalars['Date']['input'];
  dimensionCategoryIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  metricId: Scalars['UUID']['input'];
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateDataSourceInput = {
  authority?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  edition?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDatasetInput = {
  /** UUIDs of instance dimensions the data points are categorized by, in column order. */
  dimensions?: Array<Scalars['UUID']['input']>;
  /** Optional UUID for the new dataset. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Optional identifier, unique within the instance. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Metrics (value columns) of the dataset; at least one is required. */
  metrics: Array<CreateDatasetMetricInput>;
  name: Scalars['String']['input'];
};

export type CreateDatasetMetricInput = {
  /** Optional UUID for the new metric. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  label: Scalars['String']['input'];
  /** Quantity-kind identifier of what the metric measures. Null means any quantity. */
  quantity?: InputMaybe<Scalars['ID']['input']>;
  unit?: Scalars['String']['input'];
};

export type CreateDatasetSourceReferenceInput = {
  dataPointId?: InputMaybe<Scalars['UUID']['input']>;
  dataSourceId: Scalars['UUID']['input'];
  toDataset?: Scalars['Boolean']['input'];
};

export type CreateDimensionCategoryInput = {
  dimensionId: Scalars['UUID']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  nextSibling?: InputMaybe<Scalars['ID']['input']>;
  previousSibling?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateDimensionInput = {
  categories?: Array<DimensionCategoryItemInput>;
  /** Optional UUID for the new dimension. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateEdgeInput = {
  fromRef?: InputMaybe<NodePortRefInput>;
  instanceId: Scalars['ID']['input'];
  portRef?: InputMaybe<NodePortRefInput>;
  /** Atomically displace whatever occupies the target port — an edge or a dataset binding — instead of rejecting the edge. Validation runs first, so a rejected edge leaves the old binding untouched. Requires an explicit `toPort` (an auto-selected port is never occupied) and is not valid for `multi` ports. */
  replace?: Scalars['Boolean']['input'];
  transformations?: InputMaybe<Array<EdgeTransformationInput>>;
};

export type CreateInstanceInput = {
  frameworkId: Scalars['String']['input'];
  identifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
};

export type CreateNodeInput = {
  allowNulls?: Scalars['Boolean']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  config: NodeConfigInput;
  description?: InputMaybe<Scalars['String']['input']>;
  i18n?: InputMaybe<Scalars['JSON']['input']>;
  identifier: Scalars['ID']['input'];
  inputDimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  inputPorts?: InputMaybe<Array<InputPortInput>>;
  isOutcome?: Scalars['Boolean']['input'];
  isVisible?: Scalars['Boolean']['input'];
  kind?: NodeKind;
  minimumYear?: InputMaybe<Scalars['Int']['input']>;
  name?: Scalars['String']['input'];
  nodeGroup?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  outputDimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  outputMetrics?: InputMaybe<Array<OutputMetricInput>>;
  outputPorts?: InputMaybe<Array<OutputPortInput>>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateScenarioInput = {
  allActionsEnabled?: Scalars['Boolean']['input'];
  identifier: Scalars['String']['input'];
  instanceId: Scalars['ID']['input'];
  kind?: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export enum DataPointCommentReviewState {
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED'
}

/** BLOCK_EDIT rules reject mutations that introduce new violations; BLOCK_PUBLISH rules allow edits but block publication while violations remain. */
export enum DatasetRuleEnforcement {
  BlockEdit = 'BLOCK_EDIT',
  BlockPublish = 'BLOCK_PUBLISH'
}

export enum DatasetSourceReferenceTarget {
  All = 'ALL',
  Dataset = 'DATASET',
  DataPoint = 'DATA_POINT'
}

/** Exactly one transformation of a dataset binding. Order in the containing list is execution order. */
export type DatasetTransformationInput = {
  assignDimension?: InputMaybe<AssignDimensionInput>;
  dropNulls?: InputMaybe<Scalars['Boolean']['input']>;
  ensureUnit?: InputMaybe<EnsureUnitInput>;
  filterColumn?: InputMaybe<FilterColumnInput>;
  filterDimension?: InputMaybe<FilterDimensionInput>;
  filterTemporal?: InputMaybe<FilterTemporalInput>;
  indexTemporal?: InputMaybe<Scalars['Boolean']['input']>;
  remapLegacyYears?: InputMaybe<Scalars['Boolean']['input']>;
  renameColumn?: InputMaybe<RenameColumnInput>;
  renameItem?: InputMaybe<RenameItemInput>;
  selectMetric?: InputMaybe<Scalars['Boolean']['input']>;
  setForecastFrom?: InputMaybe<SetForecastFromInput>;
  tagOperation?: InputMaybe<TagOperationInput>;
};

/** Which governance level is applicable for an action */
export enum DecisionLevel {
  Eu = 'EU',
  Municipality = 'MUNICIPALITY',
  Nation = 'NATION'
}

/** Desired (benificial) direction for the values of the output of a node */
export enum DesiredOutcome {
  Decreasing = 'decreasing',
  Increasing = 'increasing'
}

export type DimensionCategoryItemInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
};

export enum DimensionKind {
  Common = 'COMMON',
  Node = 'NODE',
  Scenario = 'SCENARIO'
}

export type DimensionSumRuleInput = {
  dimension: Scalars['String']['input'];
  enforcement: DatasetRuleEnforcement;
  target?: Scalars['Float']['input'];
  tolerance?: Scalars['Float']['input'];
};

/** Exactly one transformation of an edge binding. Order in the containing list is execution order. Only the dimension-reshaping transformations are accepted until edges execute the shared transform pipeline. */
export type EdgeTransformationInput = {
  assignDimension?: InputMaybe<AssignDimensionInput>;
  filterDimension?: InputMaybe<FilterDimensionInput>;
};

export type EnsureUnitInput = {
  unit: Scalars['String']['input'];
};

export type FilterColumnInput = {
  column: Scalars['String']['input'];
  dropCol?: Scalars['Boolean']['input'];
  exclude?: Scalars['Boolean']['input'];
  flatten?: Scalars['Boolean']['input'];
  ref?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: Array<Scalars['String']['input']>;
};

export type FilterDimensionInput = {
  categories?: Array<Scalars['String']['input']>;
  dimension: Scalars['String']['input'];
  exclude?: Scalars['Boolean']['input'];
  flatten?: Scalars['Boolean']['input'];
  groups?: Array<Scalars['String']['input']>;
};

export type FilterTemporalInput = {
  maxYear?: InputMaybe<Scalars['Int']['input']>;
  minYear?: InputMaybe<Scalars['Int']['input']>;
};

export type FlattenInput = {
  dimension: Scalars['String']['input'];
};

export type FormulaConfigInput = {
  formula: Scalars['String']['input'];
};

export type FrameworkConfigInput = {
  baselineYear: Scalars['Int']['input'];
  frameworkId: Scalars['ID']['input'];
  /** Identifier for the model instance. Needs to be unique. */
  instanceIdentifier: Scalars['ID']['input'];
  /** Name for the framework configuration instance. Typically the name of the organization. */
  name: Scalars['String']['input'];
  /** Name of the organization. If not set, it will be determined through the user's credentials, if possible. */
  organizationName?: InputMaybe<Scalars['String']['input']>;
  /** Target year for model. */
  targetYear?: InputMaybe<Scalars['Int']['input']>;
  /** UUID for the new framework config. If not set, will be generated automatically. */
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};

/** An enumeration. */
export enum FrameworksMeasureTemplateDefaultValueScalingChoices {
  /** Population */
  Population = 'POPULATION'
}

/** An enumeration. */
export enum FrameworksMeasureTemplatePriorityChoices {
  /** High */
  High = 'HIGH',
  /** Low */
  Low = 'LOW',
  /** Medium */
  Medium = 'MEDIUM'
}

export type InputPortInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Null keeps the existing value when `id` names an existing port; defaults to true for new ports. */
  isEditable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Written into the active request locale; translations in other languages are preserved when `id` names an existing port. */
  label?: InputMaybe<Scalars['String']['input']>;
  multi?: Scalars['Boolean']['input'];
  quantity?: InputMaybe<Scalars['String']['input']>;
  requiredDimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Semantic role from the node class's input port declarations. Null keeps the existing role when `id` names an existing port. */
  role?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type InstanceContext = {
  hostname?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<PreviewMode>;
  /** Run the model in fault-tolerant mode: quarantine node failures and report them as node status (via the node editor) instead of aborting the whole computation. For draft model editing; defaults to false. See docs/architecture/fault-tolerance.md. */
  tolerateNodeFailures?: Scalars['Boolean']['input'];
  version?: InputMaybe<Scalars['UUID']['input']>;
};

export enum InstanceMemberRole {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER',
  SuperAdmin = 'SUPER_ADMIN',
  Viewer = 'VIEWER'
}

export enum LowHigh {
  High = 'HIGH',
  Low = 'LOW'
}

export type MeasureDataPointInput = {
  /** Value for the data point (set to null to remove) */
  value?: InputMaybe<Scalars['Float']['input']>;
  /** Year of the data point. If not given, defaults to the baseline year for the framework instance. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type MeasureInput = {
  dataPoints?: InputMaybe<Array<MeasureDataPointInput>>;
  /** Internal notes for the measure instance */
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  /** ID (or UUID) of the measure template within a framework */
  measureTemplateId: Scalars['ID']['input'];
};

export enum ModelAction {
  Add = 'ADD',
  Change = 'CHANGE',
  Delete = 'DELETE',
  View = 'VIEW'
}

export type NzcCityEssentialData = {
  /** Population of the city */
  population: Scalars['Int']['input'];
  /** Share of renewables in energy production (low or high) */
  renewableMix: LowHigh;
  /** Average yearly temperature (low or high) */
  temperature: LowHigh;
};

export type NoGapsRuleInput = {
  enforcement?: DatasetRuleEnforcement;
};

export type NodeConfigInput = {
  action?: InputMaybe<ActionConfigInput>;
  formula?: InputMaybe<FormulaConfigInput>;
  pipeline?: InputMaybe<PipelineConfigInput>;
  simple?: InputMaybe<SimpleConfigInput>;
};

export enum NodeErrorPhase {
  Computation = 'COMPUTATION',
  Initialization = 'INITIALIZATION'
}

export enum NodeKind {
  Action = 'ACTION',
  Formula = 'FORMULA',
  Pipeline = 'PIPELINE',
  Simple = 'SIMPLE'
}

export enum NodeLayoutSource {
  Auto = 'AUTO',
  User = 'USER'
}

export type NodePortRefInput = {
  nodeUuid: Scalars['UUID']['input'];
  portId: Scalars['UUID']['input'];
};

export enum NodeStatus {
  Degraded = 'DEGRADED',
  Failed = 'FAILED',
  Incomplete = 'INCOMPLETE',
  Ok = 'OK'
}

export enum OperationMessageKind {
  Error = 'ERROR',
  Info = 'INFO',
  Permission = 'PERMISSION',
  Validation = 'VALIDATION',
  Warning = 'WARNING'
}

export type OutputMetricInput = {
  columnId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  portId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  unit: Scalars['String']['input'];
};

export type OutputPortInput = {
  columnId?: InputMaybe<Scalars['String']['input']>;
  dimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Null keeps the existing value when `id` names an existing port; defaults to true for new ports. */
  isEditable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Written into the active request locale; translations in other languages are preserved when `id` names an existing port. */
  label?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  /** Semantic role from the node class's output port declarations. Null keeps the existing role when `id` names an existing port. */
  role?: InputMaybe<Scalars['String']['input']>;
  unit: Scalars['String']['input'];
};

export type PipelineConfigInput = {
  operations?: Array<PipelineOperationInput>;
};

export type PipelineOperationInput = {
  operation: Scalars['String']['input'];
};

/** Which slice of an instance to resolve. `PUBLISHED` (default) serves the latest published revision; `DRAFT` serves the editor's in-progress state and requires edit permission on the instance. */
export enum PreviewMode {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export enum PrimaryLayoutClass {
  Action = 'ACTION',
  ContextSource = 'CONTEXT_SOURCE',
  Core = 'CORE',
  GhostableContextSource = 'GHOSTABLE_CONTEXT_SOURCE',
  Outcome = 'OUTCOME'
}

/** How a problem is presented; every problem blocks publication. */
export enum ProblemSeverity {
  Error = 'ERROR',
  Warning = 'WARNING'
}

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  frameworkId?: InputMaybe<Scalars['ID']['input']>;
  invitationToken?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type RenameColumnInput = {
  column: Scalars['String']['input'];
  newName?: InputMaybe<Scalars['String']['input']>;
};

export type RenameItemInput = {
  column: Scalars['String']['input'];
  newItem: Scalars['String']['input'];
  oldItem: Scalars['String']['input'];
};

export type RequiredCombinationGroupInput = {
  combinations: Array<Scalars['UUID']['input']>;
  id: Scalars['String']['input'];
};

export type RequiredCombinationsRuleInput = {
  enforcement: DatasetRuleEnforcement;
  groups: Array<RequiredCombinationGroupInput>;
};

export enum ScenarioKind {
  Baseline = 'BASELINE',
  Custom = 'CUSTOM',
  Default = 'DEFAULT',
  ProgressTracking = 'PROGRESS_TRACKING'
}

/** Enum for search operator. */
export enum SearchOperatorEnum {
  And = 'AND',
  Or = 'OR'
}

export type SelectCategoriesInput = {
  categories?: Array<Scalars['String']['input']>;
  dimension: Scalars['String']['input'];
  exclude?: Scalars['Boolean']['input'];
  flatten?: Scalars['Boolean']['input'];
};

export type SetForecastFromInput = {
  year: Scalars['Int']['input'];
};

export type SimpleConfigInput = {
  nodeClass: Scalars['String']['input'];
};

export type TagOperationInput = {
  tag: Scalars['String']['input'];
};

export type UpdateActionGroupInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<Scalars['UUID']['input']>;
  previousSibling?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateDataPointCommentInput = {
  isReview?: InputMaybe<Scalars['Boolean']['input']>;
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  reviewState?: InputMaybe<DataPointCommentReviewState>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDataPointInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  dimensionCategoryIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  metricId?: InputMaybe<Scalars['UUID']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDataPointItemInput = {
  dataPointId: Scalars['ID']['input'];
  input: UpdateDataPointInput;
};

export type UpdateDataSourceInput = {
  authority?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  edition?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Change what a dataset binding carries or does. */
export type UpdateDatasetBindingInput = {
  metricId?: InputMaybe<Scalars['ID']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Replaces the whole list; order is execution order. */
  transformations?: InputMaybe<Array<DatasetTransformationInput>>;
};

export type UpdateDatasetInput = {
  datasetId: Scalars['UUID']['input'];
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDatasetMetricInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  /** Quantity-kind identifier of what the metric measures. Set to null to clear. */
  quantity?: InputMaybe<Scalars['ID']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDimensionCategoryInput = {
  categoryId: Scalars['UUID']['input'];
  identifier?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<Scalars['ID']['input']>;
  previousSibling?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateDimensionInput = {
  dimensionId: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Change what an edge binding does. */
export type UpdateEdgeBindingInput = {
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Replaces the whole list; order is execution order. */
  transformations?: InputMaybe<Array<EdgeTransformationInput>>;
};

/** Partial update of one input port. Unset fields are left untouched. */
export type UpdateInputPortInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  isEditable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Written into the active request locale; translations in other languages are preserved. */
  label?: InputMaybe<Scalars['String']['input']>;
  multi?: InputMaybe<Scalars['Boolean']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  requiredDimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  role?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNodeInput = {
  allowNulls?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<NodeConfigInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  i18n?: InputMaybe<Scalars['JSON']['input']>;
  inputDimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  inputPorts?: InputMaybe<Array<InputPortInput>>;
  isOutcome?: InputMaybe<Scalars['Boolean']['input']>;
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<NodeKind>;
  minimumYear?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nodeGroup?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  outputDimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  outputMetrics?: InputMaybe<Array<OutputMetricInput>>;
  outputPorts?: InputMaybe<Array<OutputPortInput>>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateNodeLayoutInput = {
  nodeId: Scalars['ID']['input'];
  source?: NodeLayoutSource;
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

/** Partial update of one output port. Unset fields are left untouched. */
export type UpdateOutputPortInput = {
  columnId?: InputMaybe<Scalars['String']['input']>;
  dimensions?: InputMaybe<Array<Scalars['String']['input']>>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  isEditable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Written into the active request locale; translations in other languages are preserved. */
  label?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateScenarioInput = {
  allActionsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parameterOverrides?: InputMaybe<Scalars['JSON']['input']>;
  scenarioId: Scalars['ID']['input'];
};

export type ValidationRuleInput = {
  /** The rule; set exactly one variant field. */
  rule: ValidationRuleSpecInput;
  /** Identity of an existing rule to keep; omit for a new rule. */
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};

/** One validation rule; exactly one variant field must be set. */
export type ValidationRuleSpecInput = {
  allowedCombinations?: InputMaybe<AllowedCombinationsRuleInput>;
  dimensionSum?: InputMaybe<DimensionSumRuleInput>;
  noGaps?: InputMaybe<NoGapsRuleInput>;
  requiredCombinations?: InputMaybe<RequiredCombinationsRuleInput>;
  valueRange?: InputMaybe<ValueRangeRuleInput>;
};

export type ValueRangeRuleInput = {
  enforcement: DatasetRuleEnforcement;
  exclusiveMax?: Scalars['Boolean']['input'];
  exclusiveMin?: Scalars['Boolean']['input'];
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export enum VisualizationKind {
  Group = 'group',
  Node = 'node'
}
