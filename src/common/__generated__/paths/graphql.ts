/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type SetNormalizationFromWidgetMutation_setNormalizer = { __typename: 'SetNormalizerMutation', ok: boolean };

export type SetNormalizationFromWidgetMutation = { __typename: 'Mutation', setNormalizer: SetNormalizationFromWidgetMutation_setNormalizer };


export type SetNormalizationFromWidgetMutationVariables = Exact<{
  id: string | number | null | undefined;
}>;

export type SetParameterMutation_setParameter_parameter_BoolParameterType = { __typename: 'BoolParameterType', isCustomized: boolean, boolValue: boolean | null, boolDefaultValue: boolean | null };

export type SetParameterMutation_setParameter_parameter_NumberParameterType = { __typename: 'NumberParameterType', isCustomized: boolean };

export type SetParameterMutation_setParameter_parameter_StringParameterType = { __typename: 'StringParameterType', isCustomized: boolean };

export type SetParameterMutation_setParameter_parameter_UnknownParameterType = { __typename: 'UnknownParameterType', isCustomized: boolean };

export type SetParameterMutation_setParameter_parameter =
  | SetParameterMutation_setParameter_parameter_BoolParameterType
  | SetParameterMutation_setParameter_parameter_NumberParameterType
  | SetParameterMutation_setParameter_parameter_StringParameterType
  | SetParameterMutation_setParameter_parameter_UnknownParameterType
;

export type SetParameterMutation_setParameter = { __typename: 'SetParameterResult', ok: boolean, parameter: SetParameterMutation_setParameter_parameter | null };

export type SetParameterMutation = { __typename: 'Mutation', setParameter: SetParameterMutation_setParameter };


export type SetParameterMutationVariables = Exact<{
  parameterId: string | number;
  boolValue: boolean | null | undefined;
  numberValue: number | null | undefined;
  stringValue: string | null | undefined;
}>;

export type ActivateScenarioMutation_activateScenario_activeScenario = { __typename: 'ScenarioType', id: string, name: string };

export type ActivateScenarioMutation_activateScenario = { __typename: 'ActivateScenarioResult', ok: boolean, activeScenario: ActivateScenarioMutation_activateScenario_activeScenario };

export type ActivateScenarioMutation = { __typename: 'Mutation', activateScenario: ActivateScenarioMutation_activateScenario };


export type ActivateScenarioMutationVariables = Exact<{
  scenarioId: string | number;
}>;

export type SetGlobalParameterMutation_setParameter_parameter_BoolParameterType = { __typename: 'BoolParameterType', isCustomized: boolean, isCustomizable: boolean, boolValue: boolean | null, boolDefaultValue: boolean | null };

export type SetGlobalParameterMutation_setParameter_parameter_NumberParameterType = { __typename: 'NumberParameterType', isCustomized: boolean, isCustomizable: boolean };

export type SetGlobalParameterMutation_setParameter_parameter_StringParameterType = { __typename: 'StringParameterType', isCustomized: boolean, isCustomizable: boolean };

export type SetGlobalParameterMutation_setParameter_parameter_UnknownParameterType = { __typename: 'UnknownParameterType', isCustomized: boolean, isCustomizable: boolean };

export type SetGlobalParameterMutation_setParameter_parameter =
  | SetGlobalParameterMutation_setParameter_parameter_BoolParameterType
  | SetGlobalParameterMutation_setParameter_parameter_NumberParameterType
  | SetGlobalParameterMutation_setParameter_parameter_StringParameterType
  | SetGlobalParameterMutation_setParameter_parameter_UnknownParameterType
;

export type SetGlobalParameterMutation_setParameter = { __typename: 'SetParameterResult', ok: boolean, parameter: SetGlobalParameterMutation_setParameter_parameter | null };

export type SetGlobalParameterMutation = { __typename: 'Mutation', setParameter: SetGlobalParameterMutation_setParameter };


export type SetGlobalParameterMutationVariables = Exact<{
  parameterId: string | number;
  boolValue: boolean | null | undefined;
  numberValue: number | null | undefined;
  stringValue: string | null | undefined;
}>;

export type SetNormalizationMutation_setNormalizer = { __typename: 'SetNormalizerMutation', ok: boolean };

export type SetNormalizationMutation = { __typename: 'Mutation', setNormalizer: SetNormalizationMutation_setNormalizer };


export type SetNormalizationMutationVariables = Exact<{
  id: string | number | null | undefined;
}>;

export type GetInstanceGoalOutcomeQuery_instance_goals_values = { __typename: 'InstanceYearlyGoalType', year: number, goal: number | null, actual: number | null, isForecast: boolean, isInterpolated: boolean | null };

export type GetInstanceGoalOutcomeQuery_instance_goals_unit = { __typename: 'UnitType', htmlShort: string };

export type GetInstanceGoalOutcomeQuery_instance_goals = { __typename: 'InstanceGoalEntry', values: Array<GetInstanceGoalOutcomeQuery_instance_goals_values>, unit: GetInstanceGoalOutcomeQuery_instance_goals_unit };

export type GetInstanceGoalOutcomeQuery_instance = { __typename: 'InstanceType', id: string, goals: Array<GetInstanceGoalOutcomeQuery_instance_goals> };

export type GetInstanceGoalOutcomeQuery = { __typename: 'Query', instance: GetInstanceGoalOutcomeQuery_instance };


export type GetInstanceGoalOutcomeQueryVariables = Exact<{
  goal: string | number;
}>;

export type ScenarioFragmentFragment = { __typename: 'ScenarioType', id: string, isActive: boolean, isDefault: boolean, name: string };

export type GetInstanceContextQuery_instance_features = { __typename: 'InstanceFeaturesType', baselineVisibleInGraphs: boolean, hideNodeDetails: boolean, maximumFractionDigits: number | null, showAccumulatedEffects: boolean, showSignificantDigits: number | null };

export type GetInstanceContextQuery_instance_introContent_ActionImpactBlock = { __typename: 'ActionImpactBlock' };

export type GetInstanceContextQuery_instance_introContent_BlockQuoteBlock = { __typename: 'BlockQuoteBlock' };

export type GetInstanceContextQuery_instance_introContent_BooleanBlock = { __typename: 'BooleanBlock' };

export type GetInstanceContextQuery_instance_introContent_CallToActionBlock = { __typename: 'CallToActionBlock' };

export type GetInstanceContextQuery_instance_introContent_CardListBlock = { __typename: 'CardListBlock' };

export type GetInstanceContextQuery_instance_introContent_CategoryBreakdownBlock = { __typename: 'CategoryBreakdownBlock' };

export type GetInstanceContextQuery_instance_introContent_CharBlock = { __typename: 'CharBlock' };

export type GetInstanceContextQuery_instance_introContent_ChoiceBlock = { __typename: 'ChoiceBlock' };

export type GetInstanceContextQuery_instance_introContent_CurrentProgressBarBlock = { __typename: 'CurrentProgressBarBlock' };

export type GetInstanceContextQuery_instance_introContent_DashboardCardBlock = { __typename: 'DashboardCardBlock' };

export type GetInstanceContextQuery_instance_introContent_DateBlock = { __typename: 'DateBlock' };

export type GetInstanceContextQuery_instance_introContent_DateTimeBlock = { __typename: 'DateTimeBlock' };

export type GetInstanceContextQuery_instance_introContent_DecimalBlock = { __typename: 'DecimalBlock' };

export type GetInstanceContextQuery_instance_introContent_DocumentChooserBlock = { __typename: 'DocumentChooserBlock' };

export type GetInstanceContextQuery_instance_introContent_EmailBlock = { __typename: 'EmailBlock' };

export type GetInstanceContextQuery_instance_introContent_EmbedBlock = { __typename: 'EmbedBlock' };

export type GetInstanceContextQuery_instance_introContent_FloatBlock = { __typename: 'FloatBlock' };

export type GetInstanceContextQuery_instance_introContent_FrameworkLandingBlock = { __typename: 'FrameworkLandingBlock' };

export type GetInstanceContextQuery_instance_introContent_GoalProgressBarBlock = { __typename: 'GoalProgressBarBlock' };

export type GetInstanceContextQuery_instance_introContent_ImageBlock = { __typename: 'ImageBlock' };

export type GetInstanceContextQuery_instance_introContent_ImageChooserBlock = { __typename: 'ImageChooserBlock' };

export type GetInstanceContextQuery_instance_introContent_IntegerBlock = { __typename: 'IntegerBlock' };

export type GetInstanceContextQuery_instance_introContent_ListBlock = { __typename: 'ListBlock' };

export type GetInstanceContextQuery_instance_introContent_PageChooserBlock = { __typename: 'PageChooserBlock' };

export type GetInstanceContextQuery_instance_introContent_RawHTMLBlock = { __typename: 'RawHTMLBlock' };

export type GetInstanceContextQuery_instance_introContent_ReferenceProgressBarBlock = { __typename: 'ReferenceProgressBarBlock' };

export type GetInstanceContextQuery_instance_introContent_RegexBlock = { __typename: 'RegexBlock' };

export type GetInstanceContextQuery_instance_introContent_RichTextBlock = { __typename: 'RichTextBlock', field: string, value: string };

export type GetInstanceContextQuery_instance_introContent_ScenarioProgressBarBlock = { __typename: 'ScenarioProgressBarBlock' };

export type GetInstanceContextQuery_instance_introContent_SnippetChooserBlock = { __typename: 'SnippetChooserBlock' };

export type GetInstanceContextQuery_instance_introContent_StaticBlock = { __typename: 'StaticBlock' };

export type GetInstanceContextQuery_instance_introContent_StreamBlock = { __typename: 'StreamBlock' };

export type GetInstanceContextQuery_instance_introContent_StreamFieldBlock = { __typename: 'StreamFieldBlock' };

export type GetInstanceContextQuery_instance_introContent_StructBlock = { __typename: 'StructBlock' };

export type GetInstanceContextQuery_instance_introContent_TextBlock = { __typename: 'TextBlock' };

export type GetInstanceContextQuery_instance_introContent_TimeBlock = { __typename: 'TimeBlock' };

export type GetInstanceContextQuery_instance_introContent_URLBlock = { __typename: 'URLBlock' };

export type GetInstanceContextQuery_instance_introContent =
  | GetInstanceContextQuery_instance_introContent_ActionImpactBlock
  | GetInstanceContextQuery_instance_introContent_BlockQuoteBlock
  | GetInstanceContextQuery_instance_introContent_BooleanBlock
  | GetInstanceContextQuery_instance_introContent_CallToActionBlock
  | GetInstanceContextQuery_instance_introContent_CardListBlock
  | GetInstanceContextQuery_instance_introContent_CategoryBreakdownBlock
  | GetInstanceContextQuery_instance_introContent_CharBlock
  | GetInstanceContextQuery_instance_introContent_ChoiceBlock
  | GetInstanceContextQuery_instance_introContent_CurrentProgressBarBlock
  | GetInstanceContextQuery_instance_introContent_DashboardCardBlock
  | GetInstanceContextQuery_instance_introContent_DateBlock
  | GetInstanceContextQuery_instance_introContent_DateTimeBlock
  | GetInstanceContextQuery_instance_introContent_DecimalBlock
  | GetInstanceContextQuery_instance_introContent_DocumentChooserBlock
  | GetInstanceContextQuery_instance_introContent_EmailBlock
  | GetInstanceContextQuery_instance_introContent_EmbedBlock
  | GetInstanceContextQuery_instance_introContent_FloatBlock
  | GetInstanceContextQuery_instance_introContent_FrameworkLandingBlock
  | GetInstanceContextQuery_instance_introContent_GoalProgressBarBlock
  | GetInstanceContextQuery_instance_introContent_ImageBlock
  | GetInstanceContextQuery_instance_introContent_ImageChooserBlock
  | GetInstanceContextQuery_instance_introContent_IntegerBlock
  | GetInstanceContextQuery_instance_introContent_ListBlock
  | GetInstanceContextQuery_instance_introContent_PageChooserBlock
  | GetInstanceContextQuery_instance_introContent_RawHTMLBlock
  | GetInstanceContextQuery_instance_introContent_ReferenceProgressBarBlock
  | GetInstanceContextQuery_instance_introContent_RegexBlock
  | GetInstanceContextQuery_instance_introContent_RichTextBlock
  | GetInstanceContextQuery_instance_introContent_ScenarioProgressBarBlock
  | GetInstanceContextQuery_instance_introContent_SnippetChooserBlock
  | GetInstanceContextQuery_instance_introContent_StaticBlock
  | GetInstanceContextQuery_instance_introContent_StreamBlock
  | GetInstanceContextQuery_instance_introContent_StreamFieldBlock
  | GetInstanceContextQuery_instance_introContent_StructBlock
  | GetInstanceContextQuery_instance_introContent_TextBlock
  | GetInstanceContextQuery_instance_introContent_TimeBlock
  | GetInstanceContextQuery_instance_introContent_URLBlock
;

export type GetInstanceContextQuery_instance_goals_outcomeNode = { __typename: 'Node', id: string };

export type GetInstanceContextQuery_instance_goals_dimensions = { __typename: 'InstanceGoalDimension', dimension: string, categories: Array<string>, groups: Array<string> };

export type GetInstanceContextQuery_instance_goals = { __typename: 'InstanceGoalEntry', id: string, label: string | null, default: boolean, disabled: boolean, outcomeNode: GetInstanceContextQuery_instance_goals_outcomeNode, dimensions: Array<GetInstanceContextQuery_instance_goals_dimensions> };

export type GetInstanceContextQuery_instance = { __typename: 'InstanceType', id: string, name: string, themeIdentifier: string | null, owner: string | null, defaultLanguage: string, supportedLanguages: Array<string>, targetYear: number | null, modelEndYear: number, referenceYear: number | null, minimumHistoricalYear: number, maximumHistoricalYear: number | null, leadTitle: string, leadParagraph: string | null, features: GetInstanceContextQuery_instance_features, introContent: Array<GetInstanceContextQuery_instance_introContent> | null, goals: Array<GetInstanceContextQuery_instance_goals> };

export type GetInstanceContextQuery_scenarios = { __typename: 'ScenarioType', id: string, isActive: boolean, isDefault: boolean, name: string };

export type GetInstanceContextQuery_availableNormalizations = { __typename: 'NormalizationType', id: string, label: string, isActive: boolean };

export type GetInstanceContextQuery_parameters_node_ActionNode = { __typename: 'ActionNode', id: string };

export type GetInstanceContextQuery_parameters_node_Node = { __typename: 'Node', id: string };

export type GetInstanceContextQuery_parameters_node =
  | GetInstanceContextQuery_parameters_node_ActionNode
  | GetInstanceContextQuery_parameters_node_Node
;

export type GetInstanceContextQuery_parameters_NumberParameterType_unit = { __typename: 'UnitType', htmlShort: string };

export type GetInstanceContextQuery_parameters_BoolParameterType = { __typename: 'BoolParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, boolValue: boolean | null, boolDefaultValue: boolean | null, node: GetInstanceContextQuery_parameters_node | null };

export type GetInstanceContextQuery_parameters_NumberParameterType = { __typename: 'NumberParameterType', minValue: number | null, maxValue: number | null, step: number | null, id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, numberValue: number | null, numberDefaultValue: number | null, unit: GetInstanceContextQuery_parameters_NumberParameterType_unit | null, node: GetInstanceContextQuery_parameters_node | null };

export type GetInstanceContextQuery_parameters_StringParameterType = { __typename: 'StringParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, stringValue: string | null, stringDefaultValue: string | null, node: GetInstanceContextQuery_parameters_node | null };

export type GetInstanceContextQuery_parameters_UnknownParameterType = { __typename: 'UnknownParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, node: GetInstanceContextQuery_parameters_node | null };

export type GetInstanceContextQuery_parameters =
  | GetInstanceContextQuery_parameters_BoolParameterType
  | GetInstanceContextQuery_parameters_NumberParameterType
  | GetInstanceContextQuery_parameters_StringParameterType
  | GetInstanceContextQuery_parameters_UnknownParameterType
;

export type GetInstanceContextQuery = { __typename: 'Query', instance: GetInstanceContextQuery_instance, scenarios: Array<GetInstanceContextQuery_scenarios>, availableNormalizations: Array<GetInstanceContextQuery_availableNormalizations>, parameters: Array<GetInstanceContextQuery_parameters> };


export type GetInstanceContextQueryVariables = Exact<{ [key: string]: never; }>;

type ActionParameter_BoolParameterType_Fragment = { __typename: 'BoolParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, boolValue: boolean | null, boolDefaultValue: boolean | null, node: GetInstanceContextQuery_parameters_node | null };

type ActionParameter_NumberParameterType_Fragment = { __typename: 'NumberParameterType', minValue: number | null, maxValue: number | null, step: number | null, id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, numberValue: number | null, numberDefaultValue: number | null, unit: GetInstanceContextQuery_parameters_NumberParameterType_unit | null, node: GetInstanceContextQuery_parameters_node | null };

type ActionParameter_StringParameterType_Fragment = { __typename: 'StringParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, stringValue: string | null, stringDefaultValue: string | null, node: GetInstanceContextQuery_parameters_node | null };

type ActionParameter_UnknownParameterType_Fragment = { __typename: 'UnknownParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, node: GetInstanceContextQuery_parameters_node | null };

export type ActionParameterFragment =
  | ActionParameter_BoolParameterType_Fragment
  | ActionParameter_NumberParameterType_Fragment
  | ActionParameter_StringParameterType_Fragment
  | ActionParameter_UnknownParameterType_Fragment
;

export type CausalGridNodeFragment_group = { __typename: 'ActionGroupType', id: string, name: string, color: string | null };

export type CausalGridNodeFragment_unit = { __typename: 'UnitType', htmlShort: string };

export type CausalGridNodeFragment_inputNodes_ActionNode = { __typename: 'ActionNode', id: string };

export type CausalGridNodeFragment_inputNodes_Node = { __typename: 'Node', id: string };

export type CausalGridNodeFragment_inputNodes =
  | CausalGridNodeFragment_inputNodes_ActionNode
  | CausalGridNodeFragment_inputNodes_Node
;

export type CausalGridNodeFragment_outputNodes_ActionNode = { __typename: 'ActionNode', id: string };

export type CausalGridNodeFragment_outputNodes_Node = { __typename: 'Node', id: string };

export type CausalGridNodeFragment_outputNodes =
  | CausalGridNodeFragment_outputNodes_ActionNode
  | CausalGridNodeFragment_outputNodes_Node
;

export type CausalGridNodeFragment_impactMetric_unit = { __typename: 'UnitType', htmlShort: string };

export type CausalGridNodeFragment_impactMetric_historicalValues = { __typename: 'YearlyValue', year: number, value: number };

export type CausalGridNodeFragment_impactMetric_forecastValues = { __typename: 'YearlyValue', value: number, year: number };

export type CausalGridNodeFragment_impactMetric_baselineForecastValues = { __typename: 'YearlyValue', year: number, value: number };

export type CausalGridNodeFragment_impactMetric_yearlyCumulativeUnit = { __typename: 'UnitType', htmlShort: string };

export type CausalGridNodeFragment_impactMetric = { __typename: 'ForecastMetricType', name: string | null, id: string | null, unit: CausalGridNodeFragment_impactMetric_unit | null, historicalValues: Array<CausalGridNodeFragment_impactMetric_historicalValues>, forecastValues: Array<CausalGridNodeFragment_impactMetric_forecastValues>, baselineForecastValues: Array<CausalGridNodeFragment_impactMetric_baselineForecastValues> | null, yearlyCumulativeUnit: CausalGridNodeFragment_impactMetric_yearlyCumulativeUnit | null };

export type CausalGridNodeFragment_metricDim_dimensions_categories = { __typename: 'MetricDimensionCategoryType', id: string, originalId: string | null, label: string, color: string | null, order: number | null, group: string | null };

export type CausalGridNodeFragment_metricDim_dimensions_groups = { __typename: 'MetricDimensionCategoryGroupType', id: string, originalId: string, label: string, color: string | null, order: number | null };

export type CausalGridNodeFragment_metricDim_dimensions = { __typename: 'MetricDimensionType', id: string, label: string, originalId: string | null, helpText: string | null, categories: Array<CausalGridNodeFragment_metricDim_dimensions_categories>, groups: Array<CausalGridNodeFragment_metricDim_dimensions_groups> };

export type CausalGridNodeFragment_metricDim_goals_values = { __typename: 'MetricYearlyGoalType', year: number, value: number, isInterpolated: boolean };

export type CausalGridNodeFragment_metricDim_goals = { __typename: 'DimensionalMetricGoalEntry', categories: Array<string>, groups: Array<string>, values: Array<CausalGridNodeFragment_metricDim_goals_values> };

export type CausalGridNodeFragment_metricDim_unit = { __typename: 'UnitType', htmlShort: string, htmlLong: string, short: string };

export type CausalGridNodeFragment_metricDim_normalizedBy = { __typename: 'NormalizerNodeType', id: string, name: string };

export type CausalGridNodeFragment_metricDim = { __typename: 'DimensionalMetricType', id: string, name: string, stackable: boolean, forecastFrom: number | null, years: Array<number>, values: Array<number>, dimensions: Array<CausalGridNodeFragment_metricDim_dimensions>, goals: Array<CausalGridNodeFragment_metricDim_goals>, unit: CausalGridNodeFragment_metricDim_unit, normalizedBy: CausalGridNodeFragment_metricDim_normalizedBy | null };

export type CausalGridNodeFragment_parameters_BoolParameterType = { __typename: 'BoolParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, boolValue: boolean | null, boolDefaultValue: boolean | null, node: GetInstanceContextQuery_parameters_node | null };

export type CausalGridNodeFragment_parameters_NumberParameterType = { __typename: 'NumberParameterType', minValue: number | null, maxValue: number | null, step: number | null, id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, numberValue: number | null, numberDefaultValue: number | null, unit: GetInstanceContextQuery_parameters_NumberParameterType_unit | null, node: GetInstanceContextQuery_parameters_node | null };

export type CausalGridNodeFragment_parameters_StringParameterType = { __typename: 'StringParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, stringValue: string | null, stringDefaultValue: string | null, node: GetInstanceContextQuery_parameters_node | null };

export type CausalGridNodeFragment_parameters_UnknownParameterType = { __typename: 'UnknownParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, node: GetInstanceContextQuery_parameters_node | null };

export type CausalGridNodeFragment_parameters =
  | CausalGridNodeFragment_parameters_BoolParameterType
  | CausalGridNodeFragment_parameters_NumberParameterType
  | CausalGridNodeFragment_parameters_StringParameterType
  | CausalGridNodeFragment_parameters_UnknownParameterType
;

export type CausalGridNodeFragment_metric_unit = { __typename: 'UnitType', htmlShort: string };

export type CausalGridNodeFragment_metric_historicalValues = { __typename: 'YearlyValue', year: number, value: number };

export type CausalGridNodeFragment_metric_forecastValues = { __typename: 'YearlyValue', value: number, year: number };

export type CausalGridNodeFragment_metric_baselineForecastValues = { __typename: 'YearlyValue', year: number, value: number };

export type CausalGridNodeFragment_metric = { __typename: 'ForecastMetricType', name: string | null, id: string | null, unit: CausalGridNodeFragment_metric_unit | null, historicalValues: Array<CausalGridNodeFragment_metric_historicalValues>, forecastValues: Array<CausalGridNodeFragment_metric_forecastValues>, baselineForecastValues: Array<CausalGridNodeFragment_metric_baselineForecastValues> | null };

type CausalGridNode_ActionNode_Fragment = { __typename: 'ActionNode', isEnabled: boolean, id: string, name: string, shortDescription: string | null, color: string | null, targetYearGoal: number | null, isVisible: boolean, quantity: string | null, group: CausalGridNodeFragment_group | null, unit: CausalGridNodeFragment_unit | null, inputNodes: Array<CausalGridNodeFragment_inputNodes>, outputNodes: Array<CausalGridNodeFragment_outputNodes>, impactMetric: CausalGridNodeFragment_impactMetric | null, metricDim: CausalGridNodeFragment_metricDim | null, parameters: Array<CausalGridNodeFragment_parameters>, metric: CausalGridNodeFragment_metric | null };

type CausalGridNode_Node_Fragment = { __typename: 'Node', id: string, name: string, shortDescription: string | null, color: string | null, targetYearGoal: number | null, isVisible: boolean, quantity: string | null, unit: CausalGridNodeFragment_unit | null, inputNodes: Array<CausalGridNodeFragment_inputNodes>, outputNodes: Array<CausalGridNodeFragment_outputNodes>, impactMetric: CausalGridNodeFragment_impactMetric | null, metricDim: CausalGridNodeFragment_metricDim | null, parameters: Array<CausalGridNodeFragment_parameters>, metric: CausalGridNodeFragment_metric | null };

export type CausalGridNodeFragment =
  | CausalGridNode_ActionNode_Fragment
  | CausalGridNode_Node_Fragment
;

export type GetNodeContentQuery_node_ActionNode = { __typename: 'ActionNode', isEnabled: boolean, id: string, name: string, shortDescription: string | null, color: string | null, targetYearGoal: number | null, isVisible: boolean, quantity: string | null, group: CausalGridNodeFragment_group | null, unit: CausalGridNodeFragment_unit | null, inputNodes: Array<CausalGridNodeFragment_inputNodes>, outputNodes: Array<CausalGridNodeFragment_outputNodes>, impactMetric: CausalGridNodeFragment_impactMetric | null, metricDim: CausalGridNodeFragment_metricDim | null, parameters: Array<CausalGridNodeFragment_parameters>, metric: CausalGridNodeFragment_metric | null };

export type GetNodeContentQuery_node_Node = { __typename: 'Node', id: string, name: string, shortDescription: string | null, color: string | null, targetYearGoal: number | null, isVisible: boolean, quantity: string | null, unit: CausalGridNodeFragment_unit | null, inputNodes: Array<CausalGridNodeFragment_inputNodes>, outputNodes: Array<CausalGridNodeFragment_outputNodes>, impactMetric: CausalGridNodeFragment_impactMetric | null, metricDim: CausalGridNodeFragment_metricDim | null, parameters: Array<CausalGridNodeFragment_parameters>, metric: CausalGridNodeFragment_metric | null };

export type GetNodeContentQuery_node =
  | GetNodeContentQuery_node_ActionNode
  | GetNodeContentQuery_node_Node
;

export type GetNodeContentQuery = { __typename: 'Query', node: GetNodeContentQuery_node | null };


export type GetNodeContentQueryVariables = Exact<{
  node: string | number;
  goal: string | number | null | undefined;
  targetNodeId: string | number | null | undefined;
}>;

export type GetNodeInfoQuery_node_ActionNode = { __typename: 'ActionNode', id: string, name: string };

export type GetNodeInfoQuery_node_Node = { __typename: 'Node', id: string, name: string };

export type GetNodeInfoQuery_node =
  | GetNodeInfoQuery_node_ActionNode
  | GetNodeInfoQuery_node_Node
;

export type GetNodeInfoQuery = { __typename: 'Query', node: GetNodeInfoQuery_node | null };


export type GetNodeInfoQueryVariables = Exact<{
  node: string | number;
}>;

export type DimensionalNodeMetricFragment_metricDim = { __typename: 'DimensionalMetricType', id: string, name: string, stackable: boolean, forecastFrom: number | null, years: Array<number>, values: Array<number>, dimensions: Array<CausalGridNodeFragment_metricDim_dimensions>, goals: Array<CausalGridNodeFragment_metricDim_goals>, unit: CausalGridNodeFragment_metricDim_unit, normalizedBy: CausalGridNodeFragment_metricDim_normalizedBy | null };

type DimensionalNodeMetric_ActionNode_Fragment = { __typename: 'ActionNode', metricDim: DimensionalNodeMetricFragment_metricDim | null };

type DimensionalNodeMetric_Node_Fragment = { __typename: 'Node', metricDim: DimensionalNodeMetricFragment_metricDim | null };

export type DimensionalNodeMetricFragment =
  | DimensionalNodeMetric_ActionNode_Fragment
  | DimensionalNodeMetric_Node_Fragment
;

export type OutcomeNodeFieldsFragment_metric_unit = { __typename: 'UnitType', short: string, htmlShort: string, htmlLong: string };

export type OutcomeNodeFieldsFragment_metric_forecastValues = { __typename: 'YearlyValue', year: number, value: number };

export type OutcomeNodeFieldsFragment_metric_baselineForecastValues = { __typename: 'YearlyValue', year: number, value: number };

export type OutcomeNodeFieldsFragment_metric_historicalValues = { __typename: 'YearlyValue', year: number, value: number };

export type OutcomeNodeFieldsFragment_metric = { __typename: 'ForecastMetricType', id: string | null, name: string | null, unit: OutcomeNodeFieldsFragment_metric_unit | null, forecastValues: Array<OutcomeNodeFieldsFragment_metric_forecastValues>, baselineForecastValues: Array<OutcomeNodeFieldsFragment_metric_baselineForecastValues> | null, historicalValues: Array<OutcomeNodeFieldsFragment_metric_historicalValues> };

export type OutcomeNodeFieldsFragment_goals = { __typename: 'NodeGoal', year: number, value: number };

export type OutcomeNodeFieldsFragment_unit = { __typename: 'UnitType', short: string, htmlShort: string, htmlLong: string };

export type OutcomeNodeFieldsFragment_inputNodes_ActionNode = { __typename: 'ActionNode', id: string, name: string };

export type OutcomeNodeFieldsFragment_inputNodes_Node = { __typename: 'Node', id: string, name: string };

export type OutcomeNodeFieldsFragment_inputNodes =
  | OutcomeNodeFieldsFragment_inputNodes_ActionNode
  | OutcomeNodeFieldsFragment_inputNodes_Node
;

export type OutcomeNodeFieldsFragment_outputNodes_ActionNode = { __typename: 'ActionNode', id: string };

export type OutcomeNodeFieldsFragment_outputNodes_Node = { __typename: 'Node', id: string };

export type OutcomeNodeFieldsFragment_outputNodes =
  | OutcomeNodeFieldsFragment_outputNodes_ActionNode
  | OutcomeNodeFieldsFragment_outputNodes_Node
;

export type OutcomeNodeFieldsFragment_upstreamActions_parameters_node_ActionNode = { __typename: 'ActionNode', id: string };

export type OutcomeNodeFieldsFragment_upstreamActions_parameters_node_Node = { __typename: 'Node', id: string };

export type OutcomeNodeFieldsFragment_upstreamActions_parameters_node =
  | OutcomeNodeFieldsFragment_upstreamActions_parameters_node_ActionNode
  | OutcomeNodeFieldsFragment_upstreamActions_parameters_node_Node
;

export type OutcomeNodeFieldsFragment_upstreamActions_parameters_BoolParameterType = { __typename: 'BoolParameterType', id: string, nodeRelativeId: string | null, isCustomized: boolean, boolValue: boolean | null, boolDefaultValue: boolean | null, node: OutcomeNodeFieldsFragment_upstreamActions_parameters_node | null };

export type OutcomeNodeFieldsFragment_upstreamActions_parameters_NumberParameterType = { __typename: 'NumberParameterType', id: string, nodeRelativeId: string | null, isCustomized: boolean, node: OutcomeNodeFieldsFragment_upstreamActions_parameters_node | null };

export type OutcomeNodeFieldsFragment_upstreamActions_parameters_StringParameterType = { __typename: 'StringParameterType', id: string, nodeRelativeId: string | null, isCustomized: boolean, node: OutcomeNodeFieldsFragment_upstreamActions_parameters_node | null };

export type OutcomeNodeFieldsFragment_upstreamActions_parameters_UnknownParameterType = { __typename: 'UnknownParameterType', id: string, nodeRelativeId: string | null, isCustomized: boolean, node: OutcomeNodeFieldsFragment_upstreamActions_parameters_node | null };

export type OutcomeNodeFieldsFragment_upstreamActions_parameters =
  | OutcomeNodeFieldsFragment_upstreamActions_parameters_BoolParameterType
  | OutcomeNodeFieldsFragment_upstreamActions_parameters_NumberParameterType
  | OutcomeNodeFieldsFragment_upstreamActions_parameters_StringParameterType
  | OutcomeNodeFieldsFragment_upstreamActions_parameters_UnknownParameterType
;

export type OutcomeNodeFieldsFragment_upstreamActions_group = { __typename: 'ActionGroupType', id: string, name: string, color: string | null };

export type OutcomeNodeFieldsFragment_upstreamActions = { __typename: 'ActionNode', id: string, name: string, goal: string | null, shortName: string | null, shortDescription: string | null, parameters: Array<OutcomeNodeFieldsFragment_upstreamActions_parameters>, group: OutcomeNodeFieldsFragment_upstreamActions_group | null };

export type OutcomeNodeFieldsFragment_metricDim = { __typename: 'DimensionalMetricType', id: string, name: string, stackable: boolean, forecastFrom: number | null, years: Array<number>, values: Array<number>, dimensions: Array<CausalGridNodeFragment_metricDim_dimensions>, goals: Array<CausalGridNodeFragment_metricDim_goals>, unit: CausalGridNodeFragment_metricDim_unit, normalizedBy: CausalGridNodeFragment_metricDim_normalizedBy | null };

export type OutcomeNodeFieldsFragment = { __typename: 'Node', id: string, name: string, color: string | null, order: number | null, shortName: string | null, shortDescription: string | null, targetYearGoal: number | null, quantity: string | null, metric: OutcomeNodeFieldsFragment_metric | null, goals: Array<OutcomeNodeFieldsFragment_goals>, unit: OutcomeNodeFieldsFragment_unit | null, inputNodes: Array<OutcomeNodeFieldsFragment_inputNodes>, outputNodes: Array<OutcomeNodeFieldsFragment_outputNodes>, upstreamActions: Array<OutcomeNodeFieldsFragment_upstreamActions>, metricDim: OutcomeNodeFieldsFragment_metricDim | null };

export type GetOutcomeNodeContentQuery_node_upstreamNodes_ActionNode = { __typename: 'ActionNode' };

export type GetOutcomeNodeContentQuery_node_upstreamNodes_Node = { __typename: 'Node', id: string, name: string, color: string | null, order: number | null, shortName: string | null, shortDescription: string | null, targetYearGoal: number | null, quantity: string | null, metric: OutcomeNodeFieldsFragment_metric | null, goals: Array<OutcomeNodeFieldsFragment_goals>, unit: OutcomeNodeFieldsFragment_unit | null, inputNodes: Array<OutcomeNodeFieldsFragment_inputNodes>, outputNodes: Array<OutcomeNodeFieldsFragment_outputNodes>, upstreamActions: Array<OutcomeNodeFieldsFragment_upstreamActions>, metricDim: OutcomeNodeFieldsFragment_metricDim | null };

export type GetOutcomeNodeContentQuery_node_upstreamNodes =
  | GetOutcomeNodeContentQuery_node_upstreamNodes_ActionNode
  | GetOutcomeNodeContentQuery_node_upstreamNodes_Node
;

export type GetOutcomeNodeContentQuery_node_ActionNode = { __typename: 'ActionNode', upstreamNodes: Array<GetOutcomeNodeContentQuery_node_upstreamNodes> };

export type GetOutcomeNodeContentQuery_node_Node = { __typename: 'Node', id: string, name: string, color: string | null, order: number | null, shortName: string | null, shortDescription: string | null, targetYearGoal: number | null, quantity: string | null, upstreamNodes: Array<GetOutcomeNodeContentQuery_node_upstreamNodes>, metric: OutcomeNodeFieldsFragment_metric | null, goals: Array<OutcomeNodeFieldsFragment_goals>, unit: OutcomeNodeFieldsFragment_unit | null, inputNodes: Array<OutcomeNodeFieldsFragment_inputNodes>, outputNodes: Array<OutcomeNodeFieldsFragment_outputNodes>, upstreamActions: Array<OutcomeNodeFieldsFragment_upstreamActions>, metricDim: OutcomeNodeFieldsFragment_metricDim | null };

export type GetOutcomeNodeContentQuery_node =
  | GetOutcomeNodeContentQuery_node_ActionNode
  | GetOutcomeNodeContentQuery_node_Node
;

export type GetOutcomeNodeContentQuery = { __typename: 'Query', node: GetOutcomeNodeContentQuery_node | null };


export type GetOutcomeNodeContentQueryVariables = Exact<{
  node: string | number;
  goal: string | number | null | undefined;
}>;

export type GetPageQuery_activeScenario = { __typename: 'ScenarioType', id: string };

export type GetPageQuery_page_OutcomePage_outcomeNode_upstreamNodes_ActionNode = { __typename: 'ActionNode' };

export type GetPageQuery_page_OutcomePage_outcomeNode_upstreamNodes_Node = { __typename: 'Node', id: string, name: string, color: string | null, order: number | null, shortName: string | null, shortDescription: string | null, targetYearGoal: number | null, quantity: string | null, metric: OutcomeNodeFieldsFragment_metric | null, goals: Array<OutcomeNodeFieldsFragment_goals>, unit: OutcomeNodeFieldsFragment_unit | null, inputNodes: Array<OutcomeNodeFieldsFragment_inputNodes>, outputNodes: Array<OutcomeNodeFieldsFragment_outputNodes>, upstreamActions: Array<OutcomeNodeFieldsFragment_upstreamActions>, metricDim: OutcomeNodeFieldsFragment_metricDim | null };

export type GetPageQuery_page_OutcomePage_outcomeNode_upstreamNodes =
  | GetPageQuery_page_OutcomePage_outcomeNode_upstreamNodes_ActionNode
  | GetPageQuery_page_OutcomePage_outcomeNode_upstreamNodes_Node
;

export type GetPageQuery_page_OutcomePage_outcomeNode = { __typename: 'Node', id: string, name: string, color: string | null, order: number | null, shortName: string | null, shortDescription: string | null, targetYearGoal: number | null, quantity: string | null, upstreamNodes: Array<GetPageQuery_page_OutcomePage_outcomeNode_upstreamNodes>, metric: OutcomeNodeFieldsFragment_metric | null, goals: Array<OutcomeNodeFieldsFragment_goals>, unit: OutcomeNodeFieldsFragment_unit | null, inputNodes: Array<OutcomeNodeFieldsFragment_inputNodes>, outputNodes: Array<OutcomeNodeFieldsFragment_outputNodes>, upstreamActions: Array<OutcomeNodeFieldsFragment_upstreamActions>, metricDim: OutcomeNodeFieldsFragment_metricDim | null };

export type GetPageQuery_page_ActionListPage = { __typename: 'ActionListPage', id: string | null, title: string };

export type GetPageQuery_page_DashboardPage = { __typename: 'DashboardPage', id: string | null, title: string };

export type GetPageQuery_page_InstanceRootPage = { __typename: 'InstanceRootPage', id: string | null, title: string };

export type GetPageQuery_page_OutcomePage = { __typename: 'OutcomePage', leadTitle: string, leadParagraph: string, id: string | null, title: string, outcomeNode: GetPageQuery_page_OutcomePage_outcomeNode };

export type GetPageQuery_page_Page = { __typename: 'Page', id: string | null, title: string };

export type GetPageQuery_page_StaticPage = { __typename: 'StaticPage', id: string | null, title: string };

export type GetPageQuery_page =
  | GetPageQuery_page_ActionListPage
  | GetPageQuery_page_DashboardPage
  | GetPageQuery_page_InstanceRootPage
  | GetPageQuery_page_OutcomePage
  | GetPageQuery_page_Page
  | GetPageQuery_page_StaticPage
;

export type GetPageQuery = { __typename: 'Query', activeScenario: GetPageQuery_activeScenario, page: GetPageQuery_page | null };


export type GetPageQueryVariables = Exact<{
  path: string;
  goal: string | number | null | undefined;
}>;

export type GetParametersQuery_availableNormalizations = { __typename: 'NormalizationType', id: string, label: string, isActive: boolean };

export type GetParametersQuery_parameters_BoolParameterType = { __typename: 'BoolParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, boolValue: boolean | null, boolDefaultValue: boolean | null, node: GetInstanceContextQuery_parameters_node | null };

export type GetParametersQuery_parameters_NumberParameterType = { __typename: 'NumberParameterType', minValue: number | null, maxValue: number | null, step: number | null, id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, numberValue: number | null, numberDefaultValue: number | null, unit: GetInstanceContextQuery_parameters_NumberParameterType_unit | null, node: GetInstanceContextQuery_parameters_node | null };

export type GetParametersQuery_parameters_StringParameterType = { __typename: 'StringParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, stringValue: string | null, stringDefaultValue: string | null, node: GetInstanceContextQuery_parameters_node | null };

export type GetParametersQuery_parameters_UnknownParameterType = { __typename: 'UnknownParameterType', id: string, label: string | null, description: string | null, nodeRelativeId: string | null, isCustomized: boolean, isCustomizable: boolean, node: GetInstanceContextQuery_parameters_node | null };

export type GetParametersQuery_parameters =
  | GetParametersQuery_parameters_BoolParameterType
  | GetParametersQuery_parameters_NumberParameterType
  | GetParametersQuery_parameters_StringParameterType
  | GetParametersQuery_parameters_UnknownParameterType
;

export type GetParametersQuery = { __typename: 'Query', availableNormalizations: Array<GetParametersQuery_availableNormalizations>, parameters: Array<GetParametersQuery_parameters> };


export type GetParametersQueryVariables = Exact<{ [key: string]: never; }>;

export type GetScenariosQuery_scenarios = { __typename: 'ScenarioType', id: string, name: string, isActive: boolean, isDefault: boolean };

export type GetScenariosQuery = { __typename: 'Query', scenarios: Array<GetScenariosQuery_scenarios> };


export type GetScenariosQueryVariables = Exact<{ [key: string]: never; }>;

export type DimensionalMetricFragment = { __typename: 'DimensionalMetricType', id: string, name: string, stackable: boolean, forecastFrom: number | null, years: Array<number>, values: Array<number>, dimensions: Array<CausalGridNodeFragment_metricDim_dimensions>, goals: Array<CausalGridNodeFragment_metricDim_goals>, unit: CausalGridNodeFragment_metricDim_unit, normalizedBy: CausalGridNodeFragment_metricDim_normalizedBy | null };

export { ScenarioKind } from './schema';