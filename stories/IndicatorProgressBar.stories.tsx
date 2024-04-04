import type { Meta, StoryObj } from '@storybook/react';
import IndicatorProgressBar from '@/components/indicators/IndicatorProgressBar';

const meta = {
  title: 'Indicators/IndicatorProgressBar',
  component: IndicatorProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    indicator: {},
  },
} satisfies Meta<typeof IndicatorProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Operational: Story = {
  args: {
    animate: true,
  },
};
