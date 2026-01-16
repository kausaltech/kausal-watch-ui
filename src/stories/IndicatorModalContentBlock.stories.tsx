import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  IndicatorDesiredTrend,
  IndicatorDetailsFieldName,
  type IndicatorDetailsQuery,
  IndicatorNonQuantifiedGoal,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';
import IndicatorModalContentBlock from '@/components/indicators/IndicatorModalContentBlock';

// Mock indicator data
const mockIndicator: NonNullable<IndicatorDetailsQuery['indicator']> = {
  __typename: 'Indicator',
  id: '1',
  identifier: 'test-indicator',
  name: 'Test Indicator',
  description:
    '<p>This is a <strong>test indicator</strong> description with some HTML content.</p>',
  goalDescription: 'The goal is to reduce emissions by 50% by 2030.',
  reference: '<p>Reference information can be found <a href="#">here</a>.</p>',
  updatedAt: '2024-01-15T10:30:00Z',
  timeResolution: 'YEAR' as IndicatorTimeResolution,
  valueRounding: 1,
  desiredTrend: 'DECREASING' as IndicatorDesiredTrend,
  nonQuantifiedGoal: null,
  nonQuantifiedGoalDate: null,
  referenceValue: {
    __typename: 'IndicatorValue',
    id: 'ref-1',
    date: '2020',
    value: 100,
    normalizedValues: [],
  },
  values: [
    {
      __typename: 'IndicatorValue',
      id: 'val-1',
      date: '2021',
      value: 90,
    },
    {
      __typename: 'IndicatorValue',
      id: 'val-2',
      date: '2022',
      value: 85,
    },
    {
      __typename: 'IndicatorValue',
      id: 'val-3',
      date: '2023',
      value: 80,
    },
  ],
  goals: [
    {
      __typename: 'IndicatorGoal',
      id: 'goal-1',
      date: '2030',
      value: 50,
      scenario: null,
    },
  ],
  unit: {
    __typename: 'Unit',
    name: 'kilogram',
    shortName: 'kg',
    id: 'unit-1',
    verboseName: 'kilogram',
    verboseNamePlural: 'kilograms',
  },
  categories: [
    {
      __typename: 'Category',
      id: 'cat-1',
      identifier: 'energy',
      name: 'Energy',
      order: 1,
      color: '#FF5733',
      iconSvgUrl: null,
      helpText: 'Energy categories',
      level: null,
      iconImage: null,
      categoryPage: null,
      parent: null,
      type: {
        __typename: 'CategoryType',
        id: 'type-1',
        name: 'Theme',
        identifier: 'theme',
        hideCategoryIdentifiers: false,
        helpText: 'Theme categories',
        levels: [],
      },
    },
    {
      __typename: 'Category',
      id: 'cat-2',
      identifier: 'transport',
      name: 'Transport',
      order: 2,
      color: '#33FF57',
      iconSvgUrl: null,
      helpText: 'Transport categories',
      level: null,
      iconImage: null,
      categoryPage: null,
      parent: {
        __typename: 'Category',
        id: 'parent-1',
        identifier: 'mobility',
        name: 'Mobility',
        order: 1,
        color: '#3357FF',
        iconSvgUrl: null,
        helpText: 'Mobility categories',
        level: null,
        iconImage: null,
        categoryPage: null,
        parent: null,
        type: {
          __typename: 'CategoryType',
          id: 'type-1',
          name: 'Theme',
          identifier: 'theme',
          hideCategoryIdentifiers: false,
          helpText: 'Theme categories',
          levels: [],
        },
      },
      type: {
        __typename: 'CategoryType',
        id: 'type-1',
        name: 'Theme',
        identifier: 'theme',
        hideCategoryIdentifiers: false,
        helpText: 'Theme categories',
        levels: [],
      },
    },
  ],
  organization: {
    __typename: 'Organization',
    id: 'org-1',
    name: 'City Planning Department',
    abbreviation: 'CPD',
    classification: null,
    logo: null,
  },
  level: null,
  common: null,
  latestGraph: null,
  actions: [],
  relatedCauses: [],
  relatedEffects: [],
  plans: [],
  changeLogMessage: null,
};

const meta = {
  title: 'Indicators/IndicatorModalContentBlock',
  component: IndicatorModalContentBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    block: {
      control: false,
    },
    indicator: {
      control: false,
    },
    hideLegacyLastUpdated: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof IndicatorModalContentBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// IndicatorContentBlock stories
export const DescriptionBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-1',
      blockType: 'indicator_content_block',
      fieldLabel: 'Description',
      fieldHelpText: null,
      field: 'description',
      sourceField: IndicatorDetailsFieldName.Description,
    },
    indicator: mockIndicator,
  },
};

export const DescriptionBlockWithoutLabel: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-1a',
      blockType: 'indicator_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'description',
      sourceField: IndicatorDetailsFieldName.Description,
    },
    indicator: mockIndicator,
  },
};

export const NameBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-2',
      blockType: 'indicator_content_block',
      fieldLabel: 'Name',
      fieldHelpText: null,
      field: 'name',
      sourceField: IndicatorDetailsFieldName.Name,
    },
    indicator: mockIndicator,
  },
};

export const GoalDescriptionBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-3',
      blockType: 'indicator_content_block',
      fieldLabel: 'Goal Description',
      fieldHelpText: null,
      field: 'goal_description',
      sourceField: IndicatorDetailsFieldName.GoalDescription,
    },
    indicator: mockIndicator,
  },
};

export const GoalDescriptionBlockEmpty: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-3a',
      blockType: 'indicator_content_block',
      fieldLabel: 'Goal Description',
      fieldHelpText: null,
      field: 'goal_description',
      sourceField: IndicatorDetailsFieldName.GoalDescription,
    },
    indicator: {
      ...mockIndicator,
      goalDescription: null,
    },
  },
};

export const VisualizationBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-4',
      blockType: 'indicator_content_block',
      fieldLabel: 'Visualization',
      fieldHelpText: null,
      field: 'visualization',
      sourceField: IndicatorDetailsFieldName.Visualization,
    },
    indicator: mockIndicator,
  },
};

export const ReferenceBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-5',
      blockType: 'indicator_content_block',
      fieldLabel: 'References',
      fieldHelpText: null,
      field: 'reference',
      sourceField: IndicatorDetailsFieldName.Reference,
    },
    indicator: mockIndicator,
  },
};

export const ReferenceBlockEmpty: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-5a',
      blockType: 'indicator_content_block',
      fieldLabel: 'References',
      fieldHelpText: null,
      field: 'reference',
      sourceField: IndicatorDetailsFieldName.Reference,
    },
    indicator: {
      ...mockIndicator,
      reference: null,
    },
  },
};

export const UpdatedAtBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-6',
      blockType: 'indicator_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'updated_at',
      sourceField: IndicatorDetailsFieldName.UpdatedAt,
    },
    indicator: mockIndicator,
  },
};

export const UpdatedAtBlockWithLabel: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-6a',
      blockType: 'indicator_content_block',
      fieldLabel: 'Last Updated',
      fieldHelpText: null,
      field: 'updated_at',
      sourceField: IndicatorDetailsFieldName.UpdatedAt,
    },
    indicator: mockIndicator,
  },
};

export const UpdatedAtBlockHidden: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-6b',
      blockType: 'indicator_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'updated_at',
      sourceField: IndicatorDetailsFieldName.UpdatedAt,
    },
    indicator: mockIndicator,
    hideLegacyLastUpdated: true,
  },
};

export const ConnectedActionsBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-7',
      blockType: 'indicator_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'connected_actions',
      sourceField: IndicatorDetailsFieldName.ConnectedActions,
    },
    indicator: mockIndicator,
  },
};

export const CausalityNavBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-8',
      blockType: 'indicator_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'causality_nav',
      sourceField: IndicatorDetailsFieldName.CausalityNav,
    },
    indicator: mockIndicator,
  },
};

export const LevelBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-9',
      blockType: 'indicator_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'level',
      sourceField: IndicatorDetailsFieldName.Level,
    },
    indicator: mockIndicator,
  },
};

export const OrganizationBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-10',
      blockType: 'indicator_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'organization',
      sourceField: IndicatorDetailsFieldName.Organization,
    },
    indicator: mockIndicator,
  },
};

// IndicatorCategoryContentBlock stories
export const CategoryBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorCategoryContentBlock',
      id: 'block-cat-1',
      blockType: 'indicator_category_content_block',
      fieldLabel: 'Themes',
      fieldHelpText: null,
      field: 'categories',
      categoryType: {
        __typename: 'CategoryType',
        id: 'type-1',
        name: 'Theme',
        identifier: 'theme',
        helpText: 'Theme categories',
        hideCategoryIdentifiers: false,
        levels: [],
      },
    },
    indicator: mockIndicator,
  },
};

export const CategoryBlockWithCustomLabel: Story = {
  args: {
    block: {
      __typename: 'IndicatorCategoryContentBlock',
      id: 'block-cat-2',
      blockType: 'indicator_category_content_block',
      fieldLabel: 'Related Categories',
      fieldHelpText: null,
      field: 'categories',
      categoryType: {
        __typename: 'CategoryType',
        id: 'type-1',
        name: 'Theme',
        identifier: 'theme',
        helpText: 'Theme categories',
        hideCategoryIdentifiers: false,
        levels: [],
      },
    },
    indicator: mockIndicator,
  },
};

export const CategoryBlockWithoutLabel: Story = {
  args: {
    block: {
      __typename: 'IndicatorCategoryContentBlock',
      id: 'block-cat-3',
      blockType: 'indicator_category_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'categories',
      categoryType: {
        __typename: 'CategoryType',
        id: 'type-1',
        name: 'Theme',
        identifier: 'theme',
        helpText: 'Theme categories',
        hideCategoryIdentifiers: false,
        levels: [],
      },
    },
    indicator: mockIndicator,
  },
};

export const CategoryBlockNoCategories: Story = {
  args: {
    block: {
      __typename: 'IndicatorCategoryContentBlock',
      id: 'block-cat-4',
      blockType: 'indicator_category_content_block',
      fieldLabel: 'Themes',
      fieldHelpText: null,
      field: 'categories',
      categoryType: {
        __typename: 'CategoryType',
        id: 'type-2',
        name: 'Sector',
        identifier: 'sector',
        helpText: 'Sector categories',
        hideCategoryIdentifiers: false,
        levels: [],
      },
    },
    indicator: mockIndicator,
  },
};

// IndicatorValueSummaryContentBlock stories
export const ValueSummaryBlock: Story = {
  args: {
    block: {
      __typename: 'IndicatorValueSummaryContentBlock',
      id: 'block-summary-1',
      blockType: 'indicator_value_summary_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'value_summary',
      showReferenceValue: true,
      referenceYear: 2020,
      defaultGoalYear: 2030,
      showCurrentValue: true,
      showGoalValue: true,
      showGoalGap: true,
    },
    indicator: mockIndicator,
  },
};

export const ValueSummaryBlockMinimal: Story = {
  args: {
    block: {
      __typename: 'IndicatorValueSummaryContentBlock',
      id: 'block-summary-2',
      blockType: 'indicator_value_summary_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'value_summary',
      showReferenceValue: false,
      referenceYear: null,
      defaultGoalYear: null,
      showCurrentValue: true,
      showGoalValue: false,
      showGoalGap: false,
    },
    indicator: mockIndicator,
  },
};

export const ValueSummaryBlockCurrentAndGoal: Story = {
  args: {
    block: {
      __typename: 'IndicatorValueSummaryContentBlock',
      id: 'block-summary-3',
      blockType: 'indicator_value_summary_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'value_summary',
      showReferenceValue: false,
      referenceYear: null,
      defaultGoalYear: 2035,
      showCurrentValue: true,
      showGoalValue: true,
      showGoalGap: false,
    },
    indicator: mockIndicator,
  },
};

export const ValueSummaryBlockWithNonQuantifiedGoal: Story = {
  args: {
    block: {
      __typename: 'IndicatorValueSummaryContentBlock',
      id: 'block-summary-4',
      blockType: 'indicator_value_summary_content_block',
      fieldLabel: null,
      fieldHelpText: null,
      field: 'value_summary',
      showReferenceValue: true,
      referenceYear: 2020,
      defaultGoalYear: null,
      showCurrentValue: true,
      showGoalValue: false,
      showGoalGap: false,
    },
    indicator: {
      ...mockIndicator,
      nonQuantifiedGoal: IndicatorNonQuantifiedGoal.Increase,
      nonQuantifiedGoalDate: '2030',
      goals: [],
    },
  },
};

// Edge cases
export const NullBlock: Story = {
  args: {
    block: null,
    indicator: mockIndicator,
  },
};

export const NullIndicator: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-null',
      blockType: 'indicator_content_block',
      fieldLabel: 'Description',
      fieldHelpText: null,
      field: 'description',
      sourceField: IndicatorDetailsFieldName.Description,
    },
    indicator: null,
  },
};

export const UnsupportedSourceField: Story = {
  args: {
    block: {
      __typename: 'IndicatorContentBlock',
      id: 'block-unsupported',
      blockType: 'indicator_content_block',
      fieldLabel: 'Unsupported',
      fieldHelpText: null,
      field: 'unsupported',
      sourceField: null,
    },
    indicator: mockIndicator,
  },
};
