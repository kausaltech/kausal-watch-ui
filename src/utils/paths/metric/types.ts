import type {
  DimensionalMetricFragment,
  GetInstanceContextQuery,
} from '@/common/__generated__/paths/graphql';

// Re-export the GraphQL input type
export type MetricInput = NonNullable<DimensionalMetricFragment>;

// Raw types from GraphQL
type MetricDimensionInput = MetricInput['dimensions'][0];
type MetricDimensionCategoryInput = MetricDimensionInput['categories'][0];
type MetricCategoryGroupInput = MetricDimensionInput['groups'][0];

// Category from a dimension
export type MetricDimensionCategory = MetricDimensionCategoryInput;

// Enhanced category group with resolved categories
export type MetricCategoryGroup = MetricCategoryGroupInput & {
  readonly categories: readonly MetricDimensionCategory[];
};

// Enhanced dimension with groups resolved
export type MetricDimension = Omit<MetricDimensionInput, 'groups'> & {
  readonly groupsById: ReadonlyMap<string, MetricCategoryGroup>;
  readonly groups: readonly MetricCategoryGroup[];
};

// Dimension categories for a single row
export type DimCats = {
  readonly [dimId: string]: MetricDimensionCategory;
};

// A single data row with dimension category assignments
export type MetricRow = {
  readonly year: number;
  readonly value: number | null;
  readonly dimCats: DimCats;
};

// The parsed/processed metric data structure
export type ParsedMetric = {
  readonly id: string;
  readonly name: string;
  readonly unit: { readonly htmlShort: string; readonly short: string };
  readonly stackable: boolean;
  readonly forecastFrom: number | null;
  readonly years: readonly number[];
  readonly values: readonly (number | null)[];
  readonly dimensions: readonly MetricDimension[];
  readonly dimsById: ReadonlyMap<string, MetricDimension>;
  readonly rows: readonly MetricRow[];
  readonly goals: MetricInput['goals'];
  readonly normalizedBy: MetricInput['normalizedBy'];
};

// Category filter choice for a single dimension
export type CatDimChoice = {
  readonly groups: readonly string[] | null;
  readonly categories: readonly string[];
};

// Filter choices across all dimensions
export type MetricCategoryChoice = {
  readonly [dimId: string]: CatDimChoice | undefined;
};

// Configuration for slicing/grouping data
export type SliceConfig = {
  readonly dimensionId: string | undefined;
  readonly categories: MetricCategoryChoice;
};

// Instance goal type alias (a single goal object)
export type InstanceGoal = GetInstanceContextQuery['instance']['goals'][number];

// Category representation for output
export type MetricCategory = Partial<MetricDimensionCategory | MetricCategoryGroup> &
  Pick<MetricDimensionCategory, 'id' | 'label' | 'color' | 'order'>;

// Values for a category in a slice
export type MetricCategoryValues = {
  readonly category: MetricCategory;
  readonly forecastValues: readonly (number | null)[];
  readonly historicalValues: readonly (number | null)[];
  readonly isNegative: boolean;
  readonly color: string | null;
};

// Data structure for a metric slice
export type MetricSliceData = {
  readonly historicalYears: readonly number[];
  readonly forecastYears: readonly number[];
  readonly categoryValues: readonly MetricCategoryValues[];
  readonly totalValues: MetricCategoryValues | null;
  readonly dimensionLabel: string;
  readonly unit: string;
};

// Single year data result
export type SingleYearData = {
  readonly categoryTypes: readonly {
    readonly id: string;
    readonly type: 'group' | 'category';
    readonly options: readonly string[];
  }[];
  readonly allLabels: readonly {
    readonly id: string;
    readonly label: string;
    readonly color: string | null;
  }[];
  readonly rows: readonly (readonly (number | null)[])[];
};

// Table data result
export type TableData = {
  readonly header: readonly { readonly key: string; readonly label: string }[];
  readonly rows: readonly { readonly [key: string]: string | number | null }[];
  readonly hasTotals: boolean;
  readonly forecastFromColumn: number;
};

// Labels for table creation
export type TableLabels = {
  readonly total?: string;
  readonly type?: string;
  readonly year?: string;
  readonly unit?: string;
  readonly historical?: string;
  readonly forecast?: string;
};

// Export options
export type ExportOptions = {
  readonly years?: readonly number[];
  readonly tableTitle?: string;
  readonly labels?: TableLabels;
};
