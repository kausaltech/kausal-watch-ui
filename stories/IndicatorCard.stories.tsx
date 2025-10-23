import type { Meta, StoryObj } from '@storybook/nextjs';

import IndicatorCard from '@/components/indicators/IndicatorCard';

const meta = {
  title: 'Indicators/IndicatorCard',
  component: IndicatorCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    latestValue: {
      value: 123.56,
      date: '21.2.2024',
      unit: 'kg',
    },
    objectid: '12',
    name: 'Average weight',
    resolution: 'day',
  },
} satisfies Meta<typeof IndicatorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Operational: Story = {
  args: {
    level: 'operational',
  },
};
