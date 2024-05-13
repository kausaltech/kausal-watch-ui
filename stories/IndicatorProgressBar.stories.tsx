import type { Meta, StoryObj } from '@storybook/react';
import IndicatorProgressBar from '@/components/indicators/IndicatorProgressBar';
import { themes } from '../.storybook/preview';

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
      const theme = themes[themeId];
      return (
        <div
          style={{
            padding: '3em',
            backgroundColor: theme.section.indicatorShowcase.background,
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
    animate: false,
  },
} satisfies Meta<typeof IndicatorProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Operational: Story = {
  args: {
    animate: true,
  },
};
