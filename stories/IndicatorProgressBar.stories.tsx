import type { Meta, StoryObj } from '@storybook/nextjs';

import IndicatorProgressBar from '@/components/indicators/IndicatorProgressBar';

const meta = {
  title: 'Indicators/IndicatorProgressBar',
  component: IndicatorProgressBar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story, context) => {
      const themeId = context.globals.theme || 'default';
      const theme = context.loaded.themes[themeId];
      return (
        <div
          style={{
            padding: '3em',
            backgroundColor: theme.section.indicatorShowcase.background,
            color: theme.section.indicatorShowcase.color,
            textAlign: 'center',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  tags: ['autodocs'],
  argTypes: {},
  args: {
    indicatorId: '3',
    normalize: false,
    baseValue: {
      date: '2021',
      value: 1900,
      normalizedValue: undefined,
    },
    lastValue: {
      date: '2020',
      value: 590,
      normalizedValue: undefined,
    },
    goalValue: {
      date: '2035',
      value: 23,
      normalizedValue: undefined,
    },
    unit: {
      name: '%',
      normalizedName: '%',
    },
    note: 'Indicator name',
  },
} satisfies Meta<typeof IndicatorProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normalized: Story = {
  args: {
    normalize: true,
    baseValue: {
      date: '2021',
      value: 1263,
      normalizedValue: 14,
    },
    lastValue: {
      date: '2020',
      value: 1120,
      normalizedValue: 11,
    },
    goalValue: {
      date: '2035',
      value: 625,
      normalizedValue: 2,
    },
    unit: {
      name: 'CO₂',
      normalizedName: 'CO₂/pp',
    },
  },
};

export const SmallValues: Story = {
  args: {
    normalize: false,
    baseValue: {
      date: '1245',
      value: 130,
      normalizedValue: undefined,
    },
    lastValue: {
      date: '1520',
      value: 125,
      normalizedValue: undefined,
    },
    goalValue: {
      date: '1734',
      value: 1,
      normalizedValue: undefined,
    },
    unit: {
      name: 'dragons',
      normalizedName: 'dragons',
    },
  },
};
